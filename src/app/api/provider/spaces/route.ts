import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getSessionFromRequest } from '@/lib/auth/session';
import {
  createSpace,
  ensureSpaceIndexes,
  listSpacesByProvider,
  Space,
} from '@/lib/repositories/spaces';

type SessionPayload = {
  user?: {
    id?: string;
    role?: string;
  };
};

type CreateSpaceBody = Partial<{
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  hourlyRate: number;
  dailyRate: number;
  currency: string;
  capacity: number;
  amenities: string[];
  availabilityType: Space['availabilityType'];
  customAvailability: Space['customAvailability'];
  images: string[];
  isActive: boolean;
}>;

type ApiResponse<T> = NextResponse<{ data?: T; error?: string }>;

type SpaceSummary = {
  id: string;
  title: string;
  city?: string;
  state?: string;
  hourlyRate: number;
  dailyRate?: number;
  currency: string;
  status: Space['status'];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  images: string[];
};

function requireProviderSession(request: Request): { providerId: ObjectId } | ApiResponse<never> {
  const session = getSessionFromRequest<SessionPayload>(request);

  if (!session?.user?.id || session.user.role !== 'provider') {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  try {
    return { providerId: new ObjectId(session.user.id) };
  } catch {
    return NextResponse.json({ error: 'Invalid provider id' }, { status: 400 });
  }
}

function serializeSpace(space: Space): SpaceSummary {
  return {
    id: space._id?.toString() ?? '',
    title: space.title,
    city: space.city,
    state: space.state,
    hourlyRate: space.hourlyRate,
    dailyRate: space.dailyRate,
    currency: space.currency,
    status: space.status,
    isActive: space.isActive,
    createdAt: space.createdAt.toISOString(),
    updatedAt: space.updatedAt.toISOString(),
    images: space.images ?? [],
  };
}

export async function GET(request: Request): Promise<ApiResponse<SpaceSummary[]>> {
  const sessionResult = requireProviderSession(request);
  if (sessionResult instanceof NextResponse) {
    return sessionResult;
  }

  try {
    await ensureSpaceIndexes();
    const spaces = await listSpacesByProvider(sessionResult.providerId);
    return NextResponse.json({ data: spaces.map(serializeSpace) });
  } catch (error) {
    console.error('Failed to list provider spaces', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<ApiResponse<SpaceSummary>> {
  const sessionResult = requireProviderSession(request);
  if (sessionResult instanceof NextResponse) {
    return sessionResult;
  }

  let payload: CreateSpaceBody;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!payload.title || !payload.hourlyRate) {
    return NextResponse.json({ error: 'Title and hourly rate are required' }, { status: 400 });
  }

  try {
    await ensureSpaceIndexes();
    const created = await createSpace({
      providerId: sessionResult.providerId,
      title: payload.title.trim(),
      description: payload.description?.trim(),
      address: payload.address?.trim(),
      city: payload.city?.trim(),
      state: payload.state?.trim(),
      zipCode: payload.zipCode?.trim(),
      coordinates:
        payload.latitude !== undefined && payload.longitude !== undefined
          ? {
              type: 'Point',
              coordinates: [payload.longitude, payload.latitude],
            }
          : undefined,
      hourlyRate: payload.hourlyRate,
      dailyRate: payload.dailyRate,
      currency: payload.currency ?? 'AUD',
      capacity: payload.capacity,
      amenities: payload.amenities,
      images: payload.images ?? [],
      availabilityType: payload.availabilityType ?? '24_7',
      customAvailability: payload.customAvailability,
      isActive: payload.isActive ?? false,
      status: 'pending',
      verificationNotes: null,
      ratingAverage: 0,
      ratingCount: 0,
    });

    return NextResponse.json({ data: serializeSpace(created) }, { status: 201 });
  } catch (error) {
    console.error('Failed to create provider space', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getSessionFromRequest } from '@/lib/auth/session';
import { findSpaceById, updateSpace, Space } from '@/lib/repositories/spaces';

type SessionPayload = {
  user?: {
    id?: string;
    role?: string;
  };
};

type UpdateSpaceBody = Partial<{
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

type SpaceDetails = {
  id: string;
  title: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  coordinates?: Space['coordinates'];
  hourlyRate: number;
  dailyRate?: number;
  currency: string;
  capacity?: number;
  amenities: string[];
  availabilityType: Space['availabilityType'];
  customAvailability: Space['customAvailability'];
  images: string[];
  isActive: boolean;
  status: Space['status'];
  verificationNotes?: string | null;
  createdAt: string;
  updatedAt: string;
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

function serializeSpace(space: Space): SpaceDetails {
  return {
    id: space._id?.toString() ?? '',
    title: space.title,
    description: space.description,
    address: space.address,
    city: space.city,
    state: space.state,
    zipCode: space.zipCode,
    coordinates: space.coordinates,
    hourlyRate: space.hourlyRate,
    dailyRate: space.dailyRate,
    currency: space.currency,
    capacity: space.capacity,
    amenities: space.amenities ?? [],
    availabilityType: space.availabilityType,
    customAvailability: space.customAvailability ?? [],
    images: space.images ?? [],
    isActive: space.isActive,
    status: space.status,
    verificationNotes: space.verificationNotes ?? null,
    createdAt: space.createdAt.toISOString(),
    updatedAt: space.updatedAt.toISOString(),
  };
}

export async function GET(
  request: Request,
  context: { params: Promise<{ spaceId: string }> },
): Promise<ApiResponse<SpaceDetails>> {
  const sessionResult = requireProviderSession(request);
  if (sessionResult instanceof NextResponse) {
    return sessionResult;
  }

  const { spaceId } = await context.params;

  try {
    const space = await findSpaceById(spaceId);

    if (!space || !space.providerId.equals(sessionResult.providerId)) {
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
    }

    return NextResponse.json({ data: serializeSpace(space) });
  } catch (error) {
    console.error('Failed to load provider space', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ spaceId: string }> },
): Promise<ApiResponse<SpaceDetails>> {
  const sessionResult = requireProviderSession(request);
  if (sessionResult instanceof NextResponse) {
    return sessionResult;
  }

  const { spaceId } = await context.params;

  let payload: UpdateSpaceBody;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    const existing = await findSpaceById(spaceId);
    if (!existing || !existing.providerId.equals(sessionResult.providerId)) {
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
    }

    const updates: Partial<Space> = {
      title: payload.title?.trim() ?? existing.title,
      description: payload.description?.trim() ?? existing.description,
      address: payload.address?.trim() ?? existing.address,
      city: payload.city?.trim() ?? existing.city,
      state: payload.state?.trim() ?? existing.state,
      zipCode: payload.zipCode?.trim() ?? existing.zipCode,
      coordinates:
        payload.latitude !== undefined && payload.longitude !== undefined
          ? {
              type: 'Point',
              coordinates: [payload.longitude, payload.latitude],
            }
          : existing.coordinates,
      hourlyRate: payload.hourlyRate ?? existing.hourlyRate,
      dailyRate: payload.dailyRate ?? existing.dailyRate,
      currency: payload.currency ?? existing.currency,
      capacity: payload.capacity ?? existing.capacity,
      amenities: payload.amenities ?? existing.amenities,
      availabilityType: payload.availabilityType ?? existing.availabilityType,
      customAvailability: payload.customAvailability ?? existing.customAvailability,
      images: payload.images ?? existing.images,
      isActive: payload.isActive ?? existing.isActive,
    };

    await updateSpace(spaceId, updates);
    const updated = await findSpaceById(spaceId);

    return NextResponse.json({ data: serializeSpace(updated!) });
  } catch (error) {
    console.error('Failed to update provider space', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

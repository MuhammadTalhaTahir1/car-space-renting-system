import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getSessionFromRequest } from '@/lib/auth/session';
import { findSpaceById, updateSpace } from '@/lib/repositories/spaces';
import { findProviderProfileByUserId } from '@/lib/repositories/providerProfiles';
import { findUserById } from '@/lib/repositories/users';

type SessionPayload = {
  user?: {
    id?: string;
    role?: string;
  };
};

type UpdateSpaceStatusPayload = {
  status?: 'approved' | 'rejected';
  verificationNotes?: string;
  isActive?: boolean;
};

function requireAdminSession(request: Request): { adminId: ObjectId } | NextResponse<{ error: string }> {
  const session = getSessionFromRequest<SessionPayload>(request);

  if (!session?.user?.id || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  try {
    return { adminId: new ObjectId(session.user.id) };
  } catch {
    return NextResponse.json({ error: 'Invalid admin id' }, { status: 400 });
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ spaceId: string }> },
) {
  const sessionResult = requireAdminSession(request);
  if (sessionResult instanceof NextResponse) {
    return sessionResult;
  }

  const { spaceId } = await context.params;

  let payload: UpdateSpaceStatusPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!payload.status || !['approved', 'rejected'].includes(payload.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    const space = await findSpaceById(spaceId);
    if (!space) {
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
    }

    await updateSpace(spaceId, {
      status: payload.status,
      verificationNotes: payload.verificationNotes ?? null,
      isActive: payload.status === 'approved' ? payload.isActive ?? space.isActive : false,
      approvedBy: payload.status === 'approved' ? sessionResult.adminId : null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update space status', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  context: { params: Promise<{ spaceId: string }> },
) {
  const sessionResult = requireAdminSession(request);
  if (sessionResult instanceof NextResponse) {
    return sessionResult;
  }

  const { spaceId } = await context.params;

  try {
    const space = await findSpaceById(spaceId);
    if (!space) {
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
    }

    const providerIdString = space.providerId.toString();

    const providerUser = await findUserById(providerIdString);
    const providerProfile = await findProviderProfileByUserId(space.providerId);

    return NextResponse.json({
      space: {
        id: space._id?.toString() ?? '',
        providerId: space.providerId.toString(),
        title: space.title,
        description: space.description ?? '',
        address: space.address ?? '',
        city: space.city ?? '',
        state: space.state ?? '',
        zipCode: space.zipCode ?? '',
        coordinates: space.coordinates ?? null,
        hourlyRate: space.hourlyRate,
        dailyRate: space.dailyRate ?? null,
        currency: space.currency,
        capacity: space.capacity ?? null,
        amenities: space.amenities ?? [],
        images: space.images ?? [],
        providerBadge: space.providerBadge ?? null,
        availabilityType: space.availabilityType,
        customAvailability: space.customAvailability ?? [],
        isActive: space.isActive,
        status: space.status,
        verificationNotes: space.verificationNotes ?? null,
        approvedAt: space.approvedAt ? space.approvedAt.toISOString() : null,
        approvedBy: space.approvedBy ? space.approvedBy.toString() : null,
        ratingAverage: space.ratingAverage ?? 0,
        ratingCount: space.ratingCount ?? 0,
        createdAt: space.createdAt.toISOString(),
        updatedAt: space.updatedAt.toISOString(),
      },
      provider: providerUser
        ? {
            id: providerUser._id.toString(),
            fullName: providerUser.fullName,
            email: providerUser.email,
            role: providerUser.role,
          }
        : null,
      profile: providerProfile
        ? {
            businessName: providerProfile.businessName ?? '',
            contactName: providerProfile.contactName ?? '',
            phone: providerProfile.phone ?? '',
            address: providerProfile.address ?? '',
            city: providerProfile.city ?? '',
            state: providerProfile.state ?? '',
            zipCode: providerProfile.zipCode ?? '',
            payoutMethod: providerProfile.payoutMethod ?? '',
            bankAccountLast4: providerProfile.bankAccountLast4 ?? '',
            taxId: providerProfile.taxId ?? '',
            businessType: providerProfile.businessType ?? '',
            status: providerProfile.status,
            verificationNotes: providerProfile.verificationNotes ?? '',
            createdAt: providerProfile.createdAt.toISOString(),
            updatedAt: providerProfile.updatedAt.toISOString(),
          }
        : null,
    });
  } catch (error) {
    console.error('Failed to load space detail', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

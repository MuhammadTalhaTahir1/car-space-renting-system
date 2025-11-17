import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getSessionFromRequest } from '@/lib/auth/session';
import { findSpaceById, updateSpace } from '@/lib/repositories/spaces';

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

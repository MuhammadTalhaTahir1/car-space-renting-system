'use client';

import { apiFetch } from '@/lib/api-client';

type PendingSpace = {
  space: {
    id: string;
    title: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    hourlyRate: number;
    dailyRate?: number;
    currency: string;
    amenities: string[];
    status: 'pending' | 'approved' | 'rejected' | 'archived';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    verificationNotes?: string | null;
  };
  provider: {
    id: string;
    fullName: string;
    email: string;
  } | null;
  profile: {
    businessName?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  } | null;
};

type PendingSpacesResponse = {
  spaces: PendingSpace[];
};

type UpdateSpaceStatusPayload = {
  spaceId: string;
  status: 'approved' | 'rejected';
  verificationNotes?: string;
  isActive?: boolean;
};

type UpdateSpaceStatusResponse = {
  success: boolean;
};

export function fetchPendingSpaces() {
  return apiFetch<PendingSpacesResponse>('/api/admin/spaces/pending');
}

export function updateSpaceStatus({ spaceId, ...body }: UpdateSpaceStatusPayload) {
  return apiFetch<UpdateSpaceStatusResponse>(`/api/admin/spaces/${spaceId}`, {
    method: 'PATCH',
    body,
  });
}

export type { PendingSpace, UpdateSpaceStatusPayload };

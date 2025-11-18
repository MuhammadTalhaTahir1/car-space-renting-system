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

type AdminSpaceDetailResponse = {
  space: {
    id: string;
    providerId: string;
    title: string;
    description: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      type: 'Point';
      coordinates: [number, number];
    } | null;
    hourlyRate: number;
    dailyRate: number | null;
    currency: string;
    capacity: number | null;
    amenities: string[];
    images: string[];
    providerBadge: string | null;
    availabilityType: '24_7' | 'custom' | 'business_hours';
    customAvailability: Array<{
      day: string;
      startTime: string;
      endTime: string;
    }>;
    isActive: boolean;
    status: 'pending' | 'approved' | 'rejected' | 'archived';
    verificationNotes: string | null;
    approvedAt: string | null;
    approvedBy: string | null;
    ratingAverage: number;
    ratingCount: number;
    createdAt: string;
    updatedAt: string;
  };
  provider: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  } | null;
  profile: {
    businessName: string;
    contactName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    payoutMethod: string;
    bankAccountLast4: string;
    taxId: string;
    businessType: string;
    status: string;
    verificationNotes: string;
    createdAt: string;
    updatedAt: string;
  } | null;
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

export function fetchAdminSpaceDetail(spaceId: string) {
  return apiFetch<AdminSpaceDetailResponse>(`/api/admin/spaces/${spaceId}`);
}

export function updateSpaceStatus({ spaceId, ...body }: UpdateSpaceStatusPayload) {
  return apiFetch<UpdateSpaceStatusResponse>(`/api/admin/spaces/${spaceId}`, {
    method: 'PATCH',
    body,
  });
}

export type { PendingSpace, UpdateSpaceStatusPayload, AdminSpaceDetailResponse };

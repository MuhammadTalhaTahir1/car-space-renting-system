'use client';

import { apiFetch } from '@/lib/api-client';

export type ProviderProfile = {
  id: string | null;
  userId: string;
  businessName?: string;
  contactName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  taxId?: string;
  bankAccountLast4?: string;
  businessType?: 'individual' | 'company';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
};

export type ProviderSpaceStatus = 'pending' | 'approved' | 'rejected' | 'archived';
export type ProviderSpaceAvailability = '24_7' | 'custom' | 'business_hours';

export type ProviderSpace = {
  id: string;
  title: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  coordinates?: {
    type: 'Point';
    coordinates: [number, number];
  };
  hourlyRate: number;
  dailyRate?: number;
  currency: string;
  capacity?: number;
  amenities: string[];
  availabilityType: ProviderSpaceAvailability;
  customAvailability: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
  images: string[];
  isActive: boolean;
  status: ProviderSpaceStatus;
  verificationNotes?: string | null;
  createdAt: string;
  updatedAt: string;
};

type ProviderProfileResponse = {
  profile: ProviderProfile;
};

type ProviderSpacesResponse = {
  data: ProviderSpaceSummary[];
};

type ProviderSpaceSummary = {
  id: string;
  title: string;
  city?: string;
  state?: string;
  hourlyRate: number;
  dailyRate?: number;
  currency: string;
  status: ProviderSpaceStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  images: string[];
};

type ProviderSpaceResponse = {
  data: ProviderSpace;
};

type CreateProviderSpacePayload = {
  title: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  hourlyRate: number;
  dailyRate?: number;
  currency?: string;
  capacity?: number;
  amenities?: string[];
  availabilityType?: ProviderSpaceAvailability;
  customAvailability?: ProviderSpace['customAvailability'];
  images?: string[];
  isActive?: boolean;
};

type UpdateProviderSpacePayload = CreateProviderSpacePayload & {
  id: string;
};

export type ToggleSpaceActivationPayload = {
  spaceId: string;
  isActive: boolean;
};

export function fetchProviderProfile() {
  return apiFetch<ProviderProfileResponse>('/api/provider/profile');
}

export function fetchProviderSpaces() {
  return apiFetch<ProviderSpacesResponse>('/api/provider/spaces');
}

export function fetchProviderSpace(spaceId: string) {
  return apiFetch<ProviderSpaceResponse>(`/api/provider/spaces/${spaceId}`);
}

export function createProviderSpace(payload: CreateProviderSpacePayload) {
  return apiFetch<ProviderSpaceResponse>('/api/provider/spaces', {
    method: 'POST',
    body: payload,
  });
}

export function updateProviderSpace(payload: UpdateProviderSpacePayload) {
  const { id, ...body } = payload;
  return apiFetch<ProviderSpaceResponse>(`/api/provider/spaces/${id}`, {
    method: 'PATCH',
    body,
  });
}

export function toggleProviderSpaceActivation({ spaceId, isActive }: ToggleSpaceActivationPayload) {
  return apiFetch<{ success: boolean }>(`/api/provider/spaces/${spaceId}/activate`, {
    method: 'POST',
    body: { isActive },
  });
}

export type { ProviderSpaceSummary };


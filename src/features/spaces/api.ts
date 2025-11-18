'use client';

import { apiFetch } from '@/lib/api-client';

export type PublicSpace = {
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
  description?: string;
  providerBadge?: string | null;
  ratingAverage: number;
  ratingCount: number;
  createdAt: string;
  images: string[];
};

export type PublicSpaceDetail = PublicSpace & {
  state?: string;
  zipCode?: string;
  dailyRate?: number | null;
  capacity?: number | null;
  availabilityType: '24_7' | 'custom' | 'business_hours';
  customAvailability: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
  updatedAt: string;
};

type PublicSpacesResponse = {
  spaces: PublicSpace[];
};

type PublicSpaceResponse = {
  space: PublicSpaceDetail;
};

export function fetchPublicSpaces() {
  return apiFetch<PublicSpacesResponse>('/api/spaces/public');
}

export function fetchPublicSpace(spaceId: string) {
  return apiFetch<PublicSpaceResponse>(`/api/spaces/${spaceId}`);
}

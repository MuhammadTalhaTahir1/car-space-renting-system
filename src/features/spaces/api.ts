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
};

type PublicSpacesResponse = {
  spaces: PublicSpace[];
};

export function fetchPublicSpaces() {
  return apiFetch<PublicSpacesResponse>('/api/spaces/public');
}

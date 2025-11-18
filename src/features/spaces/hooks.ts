'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchPublicSpace, fetchPublicSpaces, PublicSpace, PublicSpaceDetail } from './api';

const PUBLIC_SPACES_QUERY_KEY = ['public-spaces'];
const publicSpaceKey = (spaceId: string) => ['public-space', spaceId];

export function usePublicSpaces() {
  return useQuery<PublicSpace[]>({
    queryKey: PUBLIC_SPACES_QUERY_KEY,
    queryFn: async () => {
      const response = await fetchPublicSpaces();
      return response.spaces;
    },
    staleTime: 1000 * 60, // 1 minute cache for guests
  });
}

export function usePublicSpace(spaceId?: string) {
  return useQuery<PublicSpaceDetail>({
    queryKey: publicSpaceKey(spaceId ?? 'new'),
    queryFn: async () => {
      const response = await fetchPublicSpace(spaceId as string);
      return response.space;
    },
    enabled: Boolean(spaceId),
    retry: false,
  });
}

export type { PublicSpace, PublicSpaceDetail };

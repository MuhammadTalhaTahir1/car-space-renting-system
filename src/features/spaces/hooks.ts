'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchPublicSpaces, PublicSpace } from './api';

const PUBLIC_SPACES_QUERY_KEY = ['public-spaces'];

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

export type { PublicSpace };

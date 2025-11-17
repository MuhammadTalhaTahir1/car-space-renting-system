'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchPendingSpaces, updateSpaceStatus, PendingSpace, UpdateSpaceStatusPayload } from './api';

const PENDING_SPACES_QUERY_KEY = ['admin', 'spaces', 'pending'];

export function usePendingSpaces() {
  return useQuery({
    queryKey: PENDING_SPACES_QUERY_KEY,
    queryFn: fetchPendingSpaces,
    select: (data) => data.spaces,
    retry: false,
  });
}

export function useUpdateSpaceStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateSpaceStatusPayload) => updateSpaceStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PENDING_SPACES_QUERY_KEY });
    },
  });
}

export type { PendingSpace };

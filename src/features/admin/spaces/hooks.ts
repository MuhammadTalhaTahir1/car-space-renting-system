'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  fetchPendingSpaces,
  fetchAdminSpaceDetail,
  updateSpaceStatus,
  PendingSpace,
  UpdateSpaceStatusPayload,
  AdminSpaceDetailResponse,
} from './api';

const PENDING_SPACES_QUERY_KEY = ['admin', 'spaces', 'pending'];
const SPACE_DETAIL_QUERY_KEY = (spaceId: string) => ['admin', 'spaces', 'detail', spaceId];

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

export function useAdminSpace(spaceId: string) {
  return useQuery({
    queryKey: SPACE_DETAIL_QUERY_KEY(spaceId),
    queryFn: () => fetchAdminSpaceDetail(spaceId),
    enabled: Boolean(spaceId),
  });
}

export type { PendingSpace, AdminSpaceDetailResponse };

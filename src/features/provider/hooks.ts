'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  fetchProviderProfile,
  fetchProviderSpace,
  fetchProviderSpaces,
  createProviderSpace,
  updateProviderSpace,
  ProviderProfile,
  ProviderSpace,
  ProviderSpaceSummary,
} from './api';

const PROVIDER_PROFILE_QUERY_KEY = ['provider-profile'];
const PROVIDER_SPACES_QUERY_KEY = ['provider-spaces'];
const providerSpaceKey = (spaceId: string) => ['provider-space', spaceId];

export function useProviderProfile() {
  return useQuery<{ profile: ProviderProfile }, Error>({
    queryKey: PROVIDER_PROFILE_QUERY_KEY,
    queryFn: fetchProviderProfile,
    retry: false,
  });
}

export function useProviderSpaces() {
  return useQuery<ProviderSpaceSummary[], Error>({
    queryKey: PROVIDER_SPACES_QUERY_KEY,
    queryFn: async () => {
      const response = await fetchProviderSpaces();
      return response.data;
    },
  });
}

export function useProviderSpace(spaceId?: string) {
  return useQuery<ProviderSpace, Error>({
    queryKey: providerSpaceKey(spaceId ?? 'new'),
    queryFn: async () => {
      const response = await fetchProviderSpace(spaceId as string);
      return response.data;
    },
    enabled: Boolean(spaceId),
    retry: false,
  });
}

export function useCreateProviderSpace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProviderSpace,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PROVIDER_SPACES_QUERY_KEY });
      if (data?.data?.id) {
        queryClient.invalidateQueries({ queryKey: providerSpaceKey(data.data.id) });
      }
    },
  });
}

export function useUpdateProviderSpace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProviderSpace,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: PROVIDER_SPACES_QUERY_KEY });
      const spaceId = data?.data?.id ?? variables.id;
      if (spaceId) {
        queryClient.invalidateQueries({ queryKey: providerSpaceKey(spaceId) });
      }
    },
  });
}


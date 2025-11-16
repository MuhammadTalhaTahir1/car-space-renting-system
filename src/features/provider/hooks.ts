'use client';

import { useQuery } from "@tanstack/react-query";

import { fetchProviderProfile, ProviderProfile } from "./api";

const PROVIDER_PROFILE_QUERY_KEY = ["provider-profile"];

export function useProviderProfile() {
  return useQuery<{ profile: ProviderProfile }, Error>({
    queryKey: PROVIDER_PROFILE_QUERY_KEY,
    queryFn: fetchProviderProfile,
    retry: false,
  });
}


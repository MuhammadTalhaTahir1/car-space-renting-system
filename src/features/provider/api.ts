'use client';

import { apiFetch } from "@/lib/api-client";

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
  businessType?: "individual" | "company";
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
};

type ProviderProfileResponse = {
  profile: ProviderProfile;
};

export function fetchProviderProfile() {
  return apiFetch<ProviderProfileResponse>("/api/provider/profile");
}


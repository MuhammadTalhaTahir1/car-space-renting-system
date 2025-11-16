import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import { getSessionFromRequest } from "@/lib/auth/session";
import { findProviderProfileByUserId } from "@/lib/repositories/providerProfiles";

type SessionPayload = {
  user?: {
    id?: string;
    role?: string;
  };
};

export async function GET(request: Request) {
  const session = getSessionFromRequest<SessionPayload>(request);
  const userId = session?.user?.id;
  const role = session?.user?.role;

  if (!userId || role !== "provider") {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const profile = await findProviderProfileByUserId(new ObjectId(userId));

    if (!profile) {
      return NextResponse.json(
        { error: "Provider profile not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        profile: {
          id: profile._id?.toString() || null,
          userId: profile.userId.toString(),
          businessName: profile.businessName,
          contactName: profile.contactName,
          phone: profile.phone,
          address: profile.address,
          city: profile.city,
          state: profile.state,
          zipCode: profile.zipCode,
          taxId: profile.taxId,
          bankAccountLast4: profile.bankAccountLast4,
          status: profile.status,
          businessType: profile.businessType,
          createdAt: profile.createdAt.toISOString(),
          updatedAt: profile.updatedAt.toISOString(),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to load provider profile", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}


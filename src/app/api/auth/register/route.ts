import { NextResponse } from "next/server";

import { hashPassword } from "@/lib/auth/password";
import {
  createUser,
  ensureUserIndexes,
  findUserByEmail,
  UserRole,
} from "@/lib/repositories/users";
import {
  createProviderProfile,
  ensureProviderProfileIndexes,
} from "@/lib/repositories/providerProfiles";

type RegisterBody = {
  fullName?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  phone?: string;
};

const ALLOWED_ROLES: UserRole[] = ["consumer", "provider"];

export async function POST(request: Request) {
  let payload: RegisterBody;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { fullName, email, password, role, phone } = payload;

  if (!fullName || !email || !password || !role) {
    return NextResponse.json(
      { error: "fullName, email, password, and role are required" },
      { status: 400 },
    );
  }

  if (!ALLOWED_ROLES.includes(role)) {
    return NextResponse.json(
      { error: "Only consumer or provider registrations are allowed" },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters long" },
      { status: 400 },
    );
  }

  try {
    const trimmedName = fullName.trim();
    if (!trimmedName) {
      return NextResponse.json(
        { error: "fullName cannot be empty" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      return NextResponse.json(
        { error: "email cannot be empty" },
        { status: 400 },
      );
    }
    const sanitizedPhone = phone?.trim();
    const passwordHash = await hashPassword(password);

    await ensureUserIndexes();

    const existingUser = await findUserByEmail(normalizedEmail);
    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 },
      );
    }

    const createdUser = await createUser({
      fullName: trimmedName,
      email: normalizedEmail,
      passwordHash,
      role,
    });

    if (!createdUser._id) {
      return NextResponse.json(
        { error: "Failed to create user account" },
        { status: 500 },
      );
    }

    if (role === "provider") {
      await ensureProviderProfileIndexes();
      await createProviderProfile({
        userId: createdUser._id,
        contactName: trimmedName,
        phone: sanitizedPhone,
        status: "pending",
      });
    }

    return NextResponse.json(
      {
        user: {
          id: createdUser._id.toString(),
          fullName: createdUser.fullName,
          email: createdUser.email,
          role: createdUser.role,
          createdAt: createdUser.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user account", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}


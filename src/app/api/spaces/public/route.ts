import { NextResponse } from 'next/server';

import { listPublicSpaces } from '@/lib/repositories/spaces';

export async function GET() {
  try {
    const spaces = await listPublicSpaces();

    const payload = spaces.map((space) => ({
      id: space._id?.toString() ?? '',
      title: space.title,
      address: space.address,
      city: space.city,
      state: space.state,
      zipCode: space.zipCode,
      hourlyRate: space.hourlyRate,
      dailyRate: space.dailyRate,
      currency: space.currency,
      amenities: space.amenities ?? [],
      description: space.description,
      providerBadge: space.providerBadge ?? null,
      ratingAverage: space.ratingAverage ?? 0,
      ratingCount: space.ratingCount ?? 0,
      createdAt: space.createdAt.toISOString(),
    }));

    return NextResponse.json({ spaces: payload });
  } catch (error) {
    console.error('Failed to load public spaces', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

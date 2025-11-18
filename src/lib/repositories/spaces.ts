import { ObjectId, WithId } from 'mongodb';

import { getDb } from '@/lib/db';

export type SpaceStatus = 'pending' | 'approved' | 'rejected' | 'archived';
export type AvailabilityType = '24_7' | 'custom' | 'business_hours';

export interface Space {
  _id?: ObjectId;
  providerId: ObjectId;
  title: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  coordinates?: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  hourlyRate: number;
  dailyRate?: number;
  currency: string;
  capacity?: number;
  amenities?: string[];
  images?: string[];
  providerBadge?: string;
  availabilityType: AvailabilityType;
  customAvailability?: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
  isActive: boolean;
  status: SpaceStatus;
  verificationNotes?: string | null;
  approvedAt?: Date | null;
  approvedBy?: ObjectId | null;
  ratingAverage?: number;
  ratingCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION = 'spaces';

export async function ensureSpaceIndexes(): Promise<void> {
  const db = await getDb();
  await db.collection<Space>(COLLECTION).createIndexes([
    { key: { providerId: 1 }, name: 'provider_idx' },
    { key: { status: 1 }, name: 'status_idx' },
    { key: { isActive: 1 }, name: 'active_idx' },
    { key: { city: 1 }, name: 'city_idx' },
    { key: { coordinates: '2dsphere' }, name: 'coordinates_2dsphere' },
  ]);
}

export async function createSpace(space: Omit<Space, '_id' | 'createdAt' | 'updatedAt' | 'approvedAt' | 'approvedBy'>): Promise<WithId<Space>> {
  const db = await getDb();
  const now = new Date();
  const doc: Space = {
    ...space,
    currency: space.currency || 'AUD',
    amenities: space.amenities || [],
    images: space.images || [],
    customAvailability: space.customAvailability || [],
    ratingAverage: space.ratingAverage ?? 0,
    ratingCount: space.ratingCount ?? 0,
    approvedAt: space.status === 'approved' ? now : null,
    approvedBy: null,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection<Space>(COLLECTION).insertOne(doc);
  return { _id: result.insertedId, ...doc };
}

export async function listSpacesByProvider(providerId: ObjectId): Promise<WithId<Space>[]> {
  const db = await getDb();
  return db
    .collection<Space>(COLLECTION)
    .find({ providerId })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function listSpacesByStatus(status: SpaceStatus): Promise<WithId<Space>[]> {
  const db = await getDb();
  return db.collection<Space>(COLLECTION).find({ status }).sort({ createdAt: 1 }).toArray();
}

export async function listPublicSpaces(): Promise<WithId<Space>[]> {
  const db = await getDb();
  return db
    .collection<Space>(COLLECTION)
    .find({ status: 'approved', isActive: true })
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();
}

export async function findSpaceById(spaceId: string): Promise<WithId<Space> | null> {
  const db = await getDb();
  return db.collection<Space>(COLLECTION).findOne({ _id: new ObjectId(spaceId) });
}

export async function findPublicSpaceById(spaceId: string): Promise<WithId<Space> | null> {
  const db = await getDb();
  return db
    .collection<Space>(COLLECTION)
    .findOne({ _id: new ObjectId(spaceId), status: 'approved', isActive: true });
}

export async function updateSpace(spaceId: string, updates: Partial<Omit<Space, '_id' | 'createdAt'>>): Promise<void> {
  const db = await getDb();
  const updateDoc: Record<string, unknown> = {
    ...updates,
    updatedAt: new Date(),
  };

  if (updates.status && updates.status === 'approved') {
    updateDoc.approvedAt = updates.approvedAt ?? new Date();
  }

  if (updates.status && updates.status !== 'approved') {
    updateDoc.approvedAt = null;
    updateDoc.approvedBy = null;
  }

  await db.collection<Space>(COLLECTION).updateOne(
    { _id: new ObjectId(spaceId) },
    { $set: updateDoc },
  );
}

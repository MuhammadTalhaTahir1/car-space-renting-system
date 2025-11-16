import { WithId, ObjectId } from "mongodb";
import { getDb } from "../db";

export type UserRole = "admin" | "provider" | "consumer";

export interface User {
  _id?: ObjectId;
  email: string;
  passwordHash: string;
  fullName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION = "users";

export async function findUserByEmail(email: string): Promise<WithId<User> | null> {
  const db = await getDb();
  return db.collection<User>(COLLECTION).findOne({ email: email.toLowerCase() });
}

export async function findUserById(id: string): Promise<WithId<User> | null> {
  const db = await getDb();
  return db
    .collection<User>(COLLECTION)
    .findOne({ _id: new ObjectId(id) });
}

export async function createUser(user: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<WithId<User>> {
  const db = await getDb();
  const now = new Date();
  const doc: User = {
    ...user,
    email: user.email.toLowerCase(),
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection<User>(COLLECTION).insertOne(doc);
  return { _id: result.insertedId, ...doc };
}

export async function updateUserPassword(id: ObjectId, passwordHash: string): Promise<void> {
  const db = await getDb();
  await db.collection<User>(COLLECTION).updateOne(
    { _id: id },
    {
      $set: {
        passwordHash,
        updatedAt: new Date(),
      },
    },
  );
}

export async function ensureUserIndexes(): Promise<void> {
  const db = await getDb();
  await db.collection<User>(COLLECTION).createIndexes([
    {
      key: { email: 1 },
      name: "email_unique",
      unique: true,
    },
    {
      key: { role: 1 },
      name: "role_idx",
    },
  ]);
}


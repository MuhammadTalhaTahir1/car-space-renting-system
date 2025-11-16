This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Setup

Create a `.env.local` in the project root with at least:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority
# Optional: override the default database name (falls back to car-space-renting-system)
MONGODB_DB=car-space-renting-system
```

Restart the dev server after adding or changing environment variables.

## Database Access Helpers

- `src/lib/db.ts` exposes `getMongoClient()` and `getDb()` so API routes reuse a single Mongo connection (hot-reload safe).
- Data access lives in `src/lib/repositories/*`. The helpers perform typed CRUD operations and set indexes (e.g. unique user email).
- Shared auth helpers are in `src/lib/auth/` for password hashing (`bcryptjs`) and setting/clearing the HTTP-only session cookie.

## Auth API Endpoints

| Method | Route                  | Description                                  |
| ------ | ---------------------- | -------------------------------------------- |
| POST   | `/api/auth/register`   | Creates consumer or provider users (auto-creates pending provider profile). |
| POST   | `/api/auth/login`      | Verifies credentials, issues session cookie. |
| POST   | `/api/auth/logout`     | Clears the session cookie.                   |
| GET    | `/api/auth/me`         | Returns the current authenticated user (401 otherwise). |
- **Provider Portal**: `/provider/login` and `/provider/register` now hook into the same auth APIs (provider accounts remain pending until admin approval).
- **Admin Portal**: `/admin/login` authenticates admins via the shared login endpoint and redirects to the admin dashboard.

## Local MongoDB Smoke Test

You can verify connectivity by temporarily adding an API route or using a REPL script:

```ts
import { getDb } from "@/lib/db";

async function healthCheck() {
  const db = await getDb();
  console.log("MongoDB connected:", db.databaseName);
  await db.admin().ping();
}

healthCheck();
```

Remove any temp code once you see the `"MongoDB connected"` message.

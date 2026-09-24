# Deployment Architecture

This document describes how to deploy the Agricultural Marketplace platform using a fully managed serverless architecture: **Vercel** (for the Next.js frontend/backend) and **Supabase** (for the PostgreSQL database).

## 1. Supabase Database Setup

Supabase provides a managed PostgreSQL database. For a Next.js serverless application, connection pooling is critical.

### Steps to create the database:
1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Note your database password safely.
3. Once the project is created, navigate to **Project Settings > Database**.
4. Scroll down to the **Connection string** section and select the **URI** tab.
5. You need **two** connection strings:
   * **Transaction pooler string (`DATABASE_URL`):**
     - Check the box that says "Use connection pooling".
     - Ensure the "Mode" is set to "Transaction".
     - Copy this string. It typically connects to port `6543`.
     - *Important:* Append `?pgbouncer=true&connection_limit=1` to the end of this URL to prevent Prisma connection errors in serverless environments.
   * **Direct connection string (`DIRECT_URL`):**
     - Uncheck the "Use connection pooling" box (or check "Session" mode).
     - Copy this string. It typically connects to port `5432`.

## 2. Vercel Deployment Setup

Vercel is the recommended hosting platform for Next.js applications.

### Steps to deploy:
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import your GitHub repository.
4. Open the **Environment Variables** section during project configuration (or after import in project settings).
5. Add the following required environment variables:

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `DATABASE_URL` | Supabase Transaction Pooler URI | `postgresql://postgres.[ref]:[pw]@aws-0-eu.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1` |
| `DIRECT_URL` | Supabase Direct Connection URI | `postgresql://postgres.[ref]:[pw]@aws-0-eu.pooler.supabase.com:5432/postgres` |
| `NEXTAUTH_URL` | URL of your deployed Vercel app | `https://your-app-name.vercel.app` |
| `NEXTAUTH_SECRET` | Secret key for NextAuth sessions | Generate using `openssl rand -base64 32` |

6. Click **Deploy**. Vercel will automatically detect Next.js, run `npm install`, `npx prisma generate`, and `npm run build`.

## 3. Database Migration and Seeding

After deploying to Vercel (or locally if you configure your `.env` file with the Supabase credentials):

1. **Migrate the schema:** This sets up the tables on Supabase. Run this command locally:
   ```bash
   npx prisma migrate deploy
   ```
   *Note: `migrate deploy` uses the `DIRECT_URL` to run schema changes reliably.*

2. **Seed the database:** Populate the initial demo data (Categories, Admin user, Farmer). Run:
   ```bash
   npm run prisma:seed
   ```
   *(Assuming `npm run prisma:seed` is mapped to `ts-node prisma/seed.ts`)*

## 4. Testing Locally

To test the integration locally before deploying to Vercel:

1. Copy `.env.example` to `.env`.
2. Replace the placeholder Supabase credentials in the `.env` file.
3. Run `npx prisma generate` to build the local Prisma client.
4. Run `npm run dev` to start the Next.js development server.

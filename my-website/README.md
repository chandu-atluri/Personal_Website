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

## Blog posts (Supabase)

Blog posts are stored in [Supabase](https://supabase.com) (hosted Postgres),
not local files — this works the same in `npm run dev` and on serverless
hosts like Vercel, since nothing is written to local disk.

### One-time setup

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase dashboard, open **SQL Editor** and run:

   ```sql
   create table posts (
     slug text primary key,
     title text not null,
     date date not null,
     excerpt text not null,
     content text not null,
     created_at timestamptz not null default now()
   );
   ```

3. Open **Project Settings > API** and copy the **Project URL** and the
   **`service_role` secret key** (not the `anon` key — the service role key
   is what lets the server read/write without configuring Row Level Security
   policies, and it's never sent to the browser).
4. Add both to `.env.local`:

   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```

   Add the same two variables on whatever host you deploy to (e.g. Vercel's
   Environment Variables settings).

### Adding a post

1. Click **New post** on `/blog`, or open the command palette (`⌘K` / `Ctrl K`)
   and run **New blog post**.
2. Fill in the title, excerpt, and content (Markdown) — or click
   **Upload .docx** to convert a Word document into the content field — and
   enter the admin password.
3. Submit — the post is written to Supabase and you're redirected to it
   immediately. No redeploy needed.

The admin password is read from the `BLOG_ADMIN_PASSWORD` environment
variable (see `.env.example`).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

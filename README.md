This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started With Tourism App

1. Clone Project
   ```bash
   git clone https://github.com/joshedwardd/TourismApp.git
   ```

3. Setup Dependencies
   ```bash
   npm install
   ```

2. Set up Environments:
   First add .env.local file in TourismApp and insert this inside file:
   ```bash
    NEXT_PUBLIC_SUPABASE_URL=https://bimleslhgrltecrjctds.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpbWxlc2xoZ3JsdGVjcmpjdGRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NTg3OTMsImV4cCI6MjA2NTUzNDc5M30.8DCc7KgkQJIB4zxugJoiHmKfz_zCZ3yX59UGWpL0YUQ
    SUPABASE_JWT_SECRET = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpbWxlc2xoZ3JsdGVjcmpjdGRzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTk1ODc5MywiZXhwIjoyMDY1NTM0NzkzfQ.kxyUMQrc0hYZSA123-IOwLkn8IeB-  GJvHX188f999GM


   ```

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

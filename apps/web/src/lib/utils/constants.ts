export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const VERCEL_URL = process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`;

// Public
export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
export const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Runtime
export const NEXT_PUBLIC_REVALIDATE_TIME = parseInt(process.env.NEXT_PUBLIC_REVALIDATE_TIME ?? "1");
export const NEXT_PUBLIC_RSS_CACHE_TIME = parseInt(
    process.env.NEXT_PUBLIC_RSS_CACHE_TIME ?? "3600"
);

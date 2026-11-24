/** @type {import('next').NextConfig} */
const nextConfig = {
  // The whole app is a static, installable PWA. `next build` emits `out/`,
  // which can be dropped on any static host (Netlify, Vercel, GitHub Pages,
  // Cloudflare Pages) or served from a USB stick.
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  // The included AI connection runs through the server function in `api/ai.mjs`,
  // so provider keys stay on the server and never ship in the client bundle.
  // Only a yes/no flag is exposed, telling the app the hosted connection exists.
  env: {
    NEXT_PUBLIC_HOSTED_AI:
      process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY ? '1' : '',
  },
};

export default nextConfig;


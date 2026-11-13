/** @type {import('next').NextConfig} */
const nextConfig = {
  // The whole app is a static, installable PWA. `next build` emits `out/`,
  // which can be dropped on any static host (Netlify, Vercel, GitHub Pages,
  // Cloudflare Pages) or served from a USB stick.
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  // Personal build: the owner's keys are present at build time and are exposed
  // to the client bundle so Jacob works out of the box for Angel with no setup.
  // This is a deliberate trade-off for this private app: the keys are visible
  // to anyone who inspects the deployed bundle, so only the Groq key is wired
  // by default and the app warns users in Settings. To stop sharing the key,
  // remove these env vars (or point the app at a server-side proxy) and rebuild.
  env: {
    NEXT_PUBLIC_GROQ_API_KEY:
      process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.GROQ_API_KEY || '',
    NEXT_PUBLIC_DEEPSEEK_API_KEY:
      process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY || '',
    NEXT_PUBLIC_OPENROUTER_API_KEY:
      process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || '',
    NEXT_PUBLIC_OPENAI_API_KEY:
      process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY || '',
    NEXT_PUBLIC_ANTHROPIC_API_KEY:
      process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY || '',
    NEXT_PUBLIC_GEMINI_API_KEY:
      process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '',
  },
};

export default nextConfig;


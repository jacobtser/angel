/** @type {import('next').NextConfig} */
const nextConfig = {
  // The whole app is a static, installable PWA. `next build` emits `out/`,
  // which can be dropped on any static host (Netlify, Vercel, GitHub Pages,
  // Cloudflare Pages) or served from a USB stick.
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  // Personal/local convenience: keys present in env at build time can be exposed
  // to the client bundle so Jacob works out of the box for this private build.
  // For public/production deployments, do NOT ship secrets to the client;
  // use a server-side proxy and configure only the proxy URL in Settings.
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


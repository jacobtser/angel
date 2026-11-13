import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';
import { AppShell } from '@/components/shell/AppShell';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://auntieangel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Auntie Angel — a calmer way to prepare for WASSCE',
    template: '%s · Auntie Angel',
  },
  description:
    'An offline-first WASSCE study companion for English Language, Core Mathematics and Management in Living. Lessons, past questions, literature, games and a Socratic tutor who helps you think.',
  applicationName: 'Auntie Angel',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Auntie Angel',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'Auntie Angel',
    title: 'Auntie Angel — a calmer way to prepare for WASSCE',
    description:
      'English, Core Mathematics and Management in Living, taught in small steps, with a tutor who asks before she tells.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Auntie Angel — WASSCE study companion' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auntie Angel — a calmer way to prepare for WASSCE',
    description:
      'An offline-first study companion for English Language, Core Mathematics and Management in Living.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf7f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1714' },
  ],
};

const themeBoot = `try {
  var raw = localStorage.getItem('auntie-angel:v1');
  var theme = raw ? ((JSON.parse(raw).settings || {}).theme || 'system') : 'system';
  var dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
} catch (error) {}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body className="bg-paper font-sans text-ink antialiased">
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}

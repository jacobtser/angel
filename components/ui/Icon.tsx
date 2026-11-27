import type { SVGProps } from 'react';

export type IconName =
  | 'home'
  | 'book'
  | 'spark'
  | 'play'
  | 'chart'
  | 'settings'
  | 'sun'
  | 'moon'
  | 'flame'
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up-right'
  | 'check'
  | 'check-circle'
  | 'x'
  | 'clock'
  | 'target'
  | 'brain'
  | 'leaf'
  | 'shield'
  | 'star'
  | 'seed'
  | 'compass'
  | 'heart'
  | 'download'
  | 'install'
  | 'wifi-off'
  | 'send'
  | 'mic'
  | 'volume'
  | 'volume-off'
  | 'refresh'
  | 'trophy'
  | 'calendar'
  | 'chevron-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'lock'
  | 'info'
  | 'quote'
  | 'timer'
  | 'menu'
  | 'search'
  | 'pencil'
  | 'plus'
  | 'external'
  | 'layers'
  | 'zap'
  | 'coffee'
  | 'trash'
  | 'user'
  | 'globe'
  | 'headphones'
  | 'video'
  | 'bookmark'
  | 'alert'
  | 'grid'
  | 'graduation'
  | 'eye';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

/**
 * Hand-drawn, single-weight icon set. Keeping these local means the whole
 * interface works offline without an icon-font request.
 */
export function Icon({ name, size = 20, strokeWidth = 1.8, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

const paths: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="M3 10.8 12 3l9 7.8" />
      <path d="M5.5 9.5V21h13V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
      <path d="M8 7h8" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.6 4.7L18 9.3l-4.4 1.6L12 15.6l-1.6-4.7L6 9.3l4.4-1.6z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
      <path d="M5 15l.6 1.7L7.3 17l-1.7.6L5 19.3l-.6-1.7L2.7 17l1.7-.3z" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8.5 5.5 3.5L10 15.5z" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20H2" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />,
  flame: (
    <>
      <path d="M12 22c4 0 7-2.6 7-6.4 0-2.6-1.4-4.6-3.4-6.8-.5 1.4-1.3 2.2-2.3 2.6.3-2.7-1-5.1-3.3-7.4.2 3-1.4 4.6-2.7 6.3A8.4 8.4 0 0 0 5 15.6C5 19.4 8 22 12 22z" />
      <path d="M9.5 17.5c0-1.5 1.1-2.4 2.5-3.7 1.2 1.3 2.5 2.2 2.5 3.8a2.5 2.5 0 0 1-5-.1z" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  'arrow-left': (
    <>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </>
  ),
  'arrow-up-right': (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  check: <path d="m4 12.5 5 5L20 6.5" />,
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.7 2.7L16.5 9" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6 6 18" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  brain: (
    <>
      <path d="M9.5 4.5A3 3 0 0 0 6.7 8a3 3 0 0 0-1.4 5.3A3 3 0 0 0 8 18.7a2.8 2.8 0 0 0 4 1.3V4.9a2.8 2.8 0 0 0-2.5-.4z" />
      <path d="M14.5 4.5A3 3 0 0 1 17.3 8a3 3 0 0 1 1.4 5.3 3 3 0 0 1-2.7 5.4 2.8 2.8 0 0 1-4 1.3V4.9a2.8 2.8 0 0 1 2.5-.4z" />
      <path d="M9 9.5c1 .2 1.7.8 2 1.7M15 9.5c-1 .2-1.7.8-2 1.7" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c-8 0-14 4-14 10a6 6 0 0 0 6 6c6 0 8-8 8-16z" />
      <path d="M4 21c2-6 6-9 12-11" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v6c0 5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.5 7.5-9.5V6z" />
      <path d="m8.5 12 2.4 2.4 4.6-5" />
    </>
  ),
  star: <path d="m12 3 2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8z" />,
  seed: (
    <>
      <path d="M12 21v-8" />
      <path d="M12 13c0-4 3-7 8-7 0 5-3 8-8 8z" />
      <path d="M12 16c0-3-2.3-5-6-5 0 3.5 2.3 5.5 6 5.5z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  heart: <path d="M20.5 5.8a5 5 0 0 0-7.1 0L12 7.2l-1.4-1.4a5 5 0 1 0-7.1 7.1L12 21l8.5-8.1a5 5 0 0 0 0-7.1z" />,
  download: (
    <>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 19v2h16v-2" />
    </>
  ),
  install: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M12 7v6" />
      <path d="m9.5 10.5 2.5 2.5 2.5-2.5" />
      <path d="M10.5 18h3" />
    </>
  ),
  'wifi-off': (
    <>
      <path d="M3 3l18 18" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <path d="M5 13a10 10 0 0 1 4-2.4" />
      <path d="M15 10.6a10 10 0 0 1 4 2.4" />
      <path d="M2 9a15 15 0 0 1 4.2-2.7" />
      <path d="M17.8 6.3A15 15 0 0 1 22 9" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  send: (
    <>
      <path d="m21 3-7.5 18-3.2-7.3L3 10.5z" />
      <path d="M21 3 10.3 13.7" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
    </>
  ),
  volume: (
    <>
      <path d="M4 9h4l5-4v14l-5-4H4z" />
      <path d="M17 8.5a5 5 0 0 1 0 7" />
      <path d="M19.5 6a8.5 8.5 0 0 1 0 12" />
    </>
  ),
  'volume-off': (
    <>
      <path d="M4 9h4l5-4v14l-5-4H4z" />
      <path d="m17 9 5 6M22 9l-5 6" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.8-4L3 10" />
      <path d="M3 4v6h6" />
      <path d="M4 13a8 8 0 0 0 14.8 4L21 14" />
      <path d="M21 20v-6h-6" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
      <path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4" />
      <path d="M12 13v5M8 21h8" />
      <path d="M10 18h4v3h-4z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
      <path d="M8 14h2M14 14h2M8 17.5h2" />
    </>
  ),
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  'chevron-left': <path d="m15 6-6 6 6 6" />,
  lock: (
    <>
      <rect x="4.5" y="10" width="15" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v3" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="7.7" r=".9" fill="currentColor" stroke="none" />
    </>
  ),
  quote: (
    <>
      <path d="M9 7H5v5h4v5H5" />
      <path d="M19 7h-4v5h4v5h-4" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 1.5" />
      <path d="M9 2h6M12 2v3" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  pencil: (
    <>
      <path d="M4 20h4l11-11a2.8 2.8 0 0 0-4-4L4 16z" />
      <path d="m13.5 6.5 4 4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </>
  ),
  zap: <path d="M13 2 4 14h6l-1 8 9-12h-6z" />,
  coffee: (
    <>
      <path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
      <path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M7 3v2M11 2v3M15 3v2" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="13" width="4" height="7" rx="2" />
      <rect x="17" y="13" width="4" height="7" rx="2" />
    </>
  ),
  video: (
    <>
      <rect x="2.5" y="5" width="14" height="14" rx="2.5" />
      <path d="m16.5 9 5-2.5v11l-5-2.5z" />
    </>
  ),
  bookmark: <path d="M6 3h12v18l-6-4-6 4z" />,
  alert: (
    <>
      <path d="M12 3 2.5 20h19z" />
      <path d="M12 9v5" />
      <circle cx="12" cy="17.2" r=".9" fill="currentColor" stroke="none" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  graduation: (
    <>
      <path d="m2 9 10-5 10 5-10 5z" />
      <path d="M6 11.5V16c3 2 9 2 12 0v-4.5" />
      <path d="M22 9v6" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
};

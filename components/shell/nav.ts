import type { IconName } from '@/components/ui/Icon';

export interface NavItem {
  href: string;
  label: string;
  icon: IconName;
  short?: string;
}

export const studyNav: NavItem[] = [
  { href: '/', label: 'Today', icon: 'home', short: 'Today' },
  { href: '/subjects/', label: 'Subjects', icon: 'book', short: 'Subjects' },
  { href: '/literature/', label: 'Literature', icon: 'quote' },
  { href: '/papers/', label: 'Past papers', icon: 'layers' },
  { href: '/practice/', label: 'Practice & mocks', icon: 'target', short: 'Practice' },
  { href: '/games/', label: 'Games', icon: 'play', short: 'Games' },
];

export const youNav: NavItem[] = [
  { href: '/progress/', label: 'Progress', icon: 'chart', short: 'Progress' },
  { href: '/journal/', label: 'Journal & wellbeing', icon: 'heart', short: 'Journal' },
];

export const mobileNav: NavItem[] = [
  { href: '/', label: 'Today', icon: 'home' },
  { href: '/subjects/', label: 'Subjects', icon: 'book' },
  { href: '/practice/', label: 'Practice', icon: 'target' },
  { href: '/games/', label: 'Games', icon: 'play' },
  { href: '/progress/', label: 'Progress', icon: 'chart' },
];

export function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href);
}

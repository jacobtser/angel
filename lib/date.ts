/** Local-date helpers. All study history is keyed by the learner's own day. */

export function isoDay(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(day: string, amount: number): string {
  const d = new Date(`${day}T12:00:00`);
  d.setDate(d.getDate() + amount);
  return isoDay(d);
}

export function daysBetween(from: string, to: string): number {
  const a = new Date(`${from}T12:00:00`).getTime();
  const b = new Date(`${to}T12:00:00`).getTime();
  return Math.round((b - a) / 86_400_000);
}

export function daysUntil(dateString: string, now = new Date()): number {
  const target = new Date(`${dateString}T23:59:59`);
  return Math.ceil((target.getTime() - now.getTime()) / 86_400_000);
}

export function prettyDate(dateString: string, opts?: Intl.DateTimeFormatOptions): string {
  const d = new Date(`${dateString.slice(0, 10)}T12:00:00`);
  return new Intl.DateTimeFormat('en-GB', opts ?? { day: 'numeric', month: 'short', year: 'numeric' }).format(d);
}

export function todayLong(): string {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());
}

export function greeting(now = new Date()): string {
  const h = now.getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Still up';
}

export function isYesterday(day: string, reference = new Date()): boolean {
  return day === addDays(isoDay(reference), -1);
}

export function lastNDays(n: number, end = new Date()): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    days.push(isoDay(d));
  }
  return days;
}

export function formatMinutes(total: number): string {
  if (total < 60) return `${total}m`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function formatClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

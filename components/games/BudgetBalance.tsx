'use client';

import { useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { GameFinish, GameFrame } from './GameFrame';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/cn';

type CategoryId = 'home' | 'food' | 'transport' | 'school' | 'savings';

interface Category {
  id: CategoryId;
  label: string;
  note: string;
  min: number;
  max: number;
  target: number;
  icon: 'home' | 'leaf' | 'compass' | 'book' | 'shield';
}

const INCOME = 1500;

const categories: Category[] = [
  {
    id: 'home',
    label: 'Rent & utilities',
    note: 'Shelter, light, water. This one is hard to renegotiate mid-month.',
    min: 0,
    max: 900,
    target: 450,
    icon: 'home',
  },
  {
    id: 'food',
    label: 'Food',
    note: 'Three meals, mostly cooked at home. Protein and vegetables matter.',
    min: 0,
    max: 900,
    target: 500,
    icon: 'leaf',
  },
  {
    id: 'transport',
    label: 'Transport',
    note: 'School runs, market, and the occasional trotro fare increase.',
    min: 0,
    max: 500,
    target: 180,
    icon: 'compass',
  },
  {
    id: 'school',
    label: 'School & materials',
    note: 'Exercise books, printing, exam fees. Small costs that arrive together.',
    min: 0,
    max: 500,
    target: 180,
    icon: 'book',
  },
  {
    id: 'savings',
    label: 'Savings & emergencies',
    note: 'The buffer that decides whether a bad week becomes a crisis.',
    min: 0,
    max: 600,
    target: 190,
    icon: 'shield',
  },
];

const targetAllocation: Record<CategoryId, number> = {
  home: 450,
  food: 500,
  transport: 180,
  school: 180,
  savings: 190,
};

interface MonthEvent {
  title: string;
  detail: string;
  cost: number;
}

const monthEvents: MonthEvent[] = [
  {
    title: 'The yard tap bursts',
    detail: 'A plumber and a new fitting come to GHS 120 — the kind of bill that never waits for payday.',
    cost: 120,
  },
  {
    title: 'A clinic visit',
    detail: 'Consultation, medicine and transport come to GHS 100. Health does not negotiate.',
    cost: 100,
  },
  {
    title: 'School asks for more',
    detail: 'An exercise book, printing and a fee instalment add up to GHS 110, payable this week.',
    cost: 110,
  },
];

function allocate(amount: number): Record<CategoryId, number> {
  const total = categories.reduce((sum, category) => sum + targetAllocation[category.id], 0);
  const scale = amount / total;
  const next = {} as Record<CategoryId, number>;
  for (const category of categories) {
    next[category.id] = Math.round((targetAllocation[category.id] * scale) / 10) * 10;
  }
  return next;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value / 10) * 10));
}

export function BudgetBalance() {
  const { state, recordGame } = useAppStore();
  const [allocations, setAllocations] = useState<Record<CategoryId, number>>({ ...targetAllocation });
  const [event, setEvent] = useState<MonthEvent>(() => monthEvents[0]);
  const [result, setResult] = useState<null | {
    score: number;
    headline: string;
    body: string;
    covered: boolean;
    lines: { id: CategoryId; label: string; status: string; tone: 'good' | 'warn' | 'bad' }[];
  }>(null);
  const recorded = useRef(false);
  const best = state.games['budget-balance']?.score ?? 0;

  const total = useMemo(
    () => categories.reduce((sum, category) => sum + allocations[category.id], 0),
    [allocations],
  );
  const remaining = INCOME - total;
  const unallocated = Math.max(0, remaining);

  function setAmount(id: CategoryId, value: number, min: number, max: number) {
    setAllocations((current) => ({ ...current, [id]: clamp(value, min, max) }));
  }

  function runMonth() {
    if (recorded.current) return;
    recorded.current = true;
    const buffer = allocations.savings + unallocated;
    const covered = buffer >= event.cost;
    let score = 0;
    const lines: { id: CategoryId; label: string; status: string; tone: 'good' | 'warn' | 'bad' }[] = [];

    const home = allocations.home;
    if (home >= 400) {
      score += 15;
      lines.push({ id: 'home', label: 'Rent & utilities', status: 'Stable', tone: 'good' });
    } else if (home >= 350) {
      score += 8;
      lines.push({ id: 'home', label: 'Rent & utilities', status: 'Workable, but tight', tone: 'warn' });
    } else {
      lines.push({ id: 'home', label: 'Rent & utilities', status: 'At risk of arrears', tone: 'bad' });
    }

    const food = allocations.food;
    if (food >= 450) {
      score += 20;
      lines.push({ id: 'food', label: 'Food', status: 'Enough for the month', tone: 'good' });
    } else if (food >= 380) {
      score += 10;
      lines.push({ id: 'food', label: 'Food', status: 'Thin by the last week', tone: 'warn' });
    } else {
      lines.push({ id: 'food', label: 'Food', status: 'Not enough for three meals', tone: 'bad' });
    }

    const transport = allocations.transport;
    if (transport >= 140) {
      score += 10;
      lines.push({ id: 'transport', label: 'Transport', status: 'Covered', tone: 'good' });
    } else if (transport >= 100) {
      score += 5;
      lines.push({ id: 'transport', label: 'Transport', status: 'Some trips will be cut', tone: 'warn' });
    } else {
      lines.push({ id: 'transport', label: 'Transport', status: 'School runs at risk', tone: 'bad' });
    }

    const school = allocations.school;
    if (school >= 140) {
      score += 15;
      lines.push({ id: 'school', label: 'School & materials', status: 'Covered', tone: 'good' });
    } else if (school >= 100) {
      score += 8;
      lines.push({ id: 'school', label: 'School & materials', status: 'Mostly covered', tone: 'warn' });
    } else {
      lines.push({ id: 'school', label: 'School & materials', status: 'Underfunded', tone: 'bad' });
    }

    if (allocations.savings >= 150) {
      score += 25;
      lines.push({ id: 'savings', label: 'Savings', status: 'A real buffer', tone: 'good' });
    } else if (allocations.savings >= 75) {
      score += 15;
      lines.push({ id: 'savings', label: 'Savings', status: 'Growing, slowly', tone: 'warn' });
    } else if (allocations.savings > 0) {
      score += 5;
      lines.push({ id: 'savings', label: 'Savings', status: 'A very thin cushion', tone: 'warn' });
    } else {
      lines.push({ id: 'savings', label: 'Savings', status: 'Nothing set aside', tone: 'bad' });
    }

    if (total <= INCOME) {
      score += 15;
    } else {
      score = Math.max(0, score - 20);
      lines.push({
        id: 'savings',
        label: 'The budget itself',
        status: `Over by GHS ${(total - INCOME).toLocaleString()}`,
        tone: 'bad',
      });
    }

    if (!covered) score = Math.max(0, score - 25);
    score = Math.max(0, Math.min(100, score));

    const headline =
      score >= 85
        ? 'A stable month, with room to breathe'
        : score >= 65
          ? 'A workable month'
          : score >= 45
            ? 'A tight month, but it held'
            : 'The month ran short';

    const body = covered
      ? `Then ${event.title.toLowerCase()} happened. Your buffer covered the GHS ${event.cost}, so it was an inconvenience instead of a crisis.`
      : `Then ${event.title.toLowerCase()} happened — GHS ${event.cost}. The plan had almost nothing spare, so the cost had to come out of something else.`;

    setResult({ score, headline, body, covered, lines });
    recordGame('budget-balance', score);
  }

  function restart() {
    setAllocations({ ...targetAllocation });
    setEvent(monthEvents[Math.floor(Math.random() * monthEvents.length)]);
    setResult(null);
    recorded.current = false;
  }

  const over = total > INCOME;

  return (
    <GameFrame slug="budget-balance">
      {result ? (
        <GameFinish
          score={result.score}
          best={best}
          label="points · household stability"
          headline={result.headline}
          body={result.body}
          onRestart={restart}
          celebrate={result.score > best}
          extra={
            <div className="mx-auto mt-4 max-w-lg text-left">
              <p className="rounded-xl bg-[var(--bg-sunk)] p-3 text-[0.8rem] leading-relaxed text-soft">
                <strong className="text-ink">{event.title}. </strong>
                {event.detail}{' '}
                {result.covered ? 'Your buffer absorbed it.' : 'Your plan had no real buffer to absorb it.'}
              </p>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {result.lines.map((line, index) => (
                  <li
                    key={`${line.id}-${index}`}
                    className="flex items-center justify-between gap-2 rounded-lg border border-line px-2.5 py-1.5 text-[0.72rem]"
                  >
                    <span className="font-semibold text-soft">{line.label}</span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 font-semibold',
                        line.tone === 'good' && 'text-leaf',
                        line.tone === 'warn' && 'text-[var(--gold-ink)]',
                        line.tone === 'bad' && 'text-rose',
                      )}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background:
                            line.tone === 'good'
                              ? 'var(--leaf)'
                              : line.tone === 'warn'
                                ? 'var(--gold)'
                                : 'var(--rose)',
                        }}
                        aria-hidden="true"
                      />
                      {line.status}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.74rem] leading-relaxed text-muted">
                This is a simplified simulation, not financial advice. The real lesson is the order of the
                decisions: protect shelter and food, fund school, pay savings like a bill, and leave a little
                room for the week you cannot predict.
              </p>
            </div>
          }
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
          <section className="surface p-5 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">Your month</p>
                <h2 className="mt-1 font-display text-xl font-semibold">GHS 1,500, one household</h2>
              </div>
              <div
                className={cn(
                  'rounded-xl px-3 py-2 text-right text-[0.72rem] font-semibold',
                  over ? 'bg-[var(--rose-soft)] text-rose' : 'bg-[var(--leaf-soft)] text-leaf',
                )}
              >
                <p className="tabular font-display text-lg leading-none">
                  GHS {Math.abs(remaining).toLocaleString()}
                </p>
                <p className="mt-0.5">{over ? 'over the income' : 'still unassigned'}</p>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {categories.map((category) => (
                <div key={category.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[var(--gold-soft)] text-[var(--gold-ink)]">
                        <Icon name={category.icon} size={14} />
                      </span>
                      <div>
                        <label htmlFor={`budget-${category.id}`} className="text-[0.84rem] font-semibold text-ink">
                          {category.label}
                        </label>
                        <p className="text-[0.68rem] leading-snug text-muted">{category.note}</p>
                      </div>
                    </div>
                    <span className="tabular shrink-0 rounded-lg border border-line px-2 py-1 text-[0.76rem] font-semibold text-soft">
                      GHS {allocations[category.id].toLocaleString()}
                    </span>
                  </div>
                  <input
                    id={`budget-${category.id}`}
                    type="range"
                    min={category.min}
                    max={category.max}
                    step={10}
                    value={allocations[category.id]}
                    onChange={(event) => setAmount(category.id, Number(event.target.value), category.min, category.max)}
                    className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--bg-sunk)] accent-[var(--gold)]"
                    aria-valuetext={`GHS ${allocations[category.id].toLocaleString()}`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={runMonth} className="btn btn-gold flex-1 sm:flex-none">
                <Icon name="calendar" size={16} />
                Run the month
              </button>
              <button
                type="button"
                onClick={() => setAllocations(allocate(INCOME))}
                className="btn btn-secondary btn-sm"
              >
                <Icon name="refresh" size={14} />
                Reset to a balanced plan
              </button>
            </div>
            {over && (
              <p className="mt-2 flex items-center gap-1.5 text-[0.75rem] font-semibold text-rose">
                <Icon name="alert" size={13} />
                You have allocated more than the household earns. Run it anyway to see the consequence, or
                adjust a line above.
              </p>
            )}
          </section>

          <aside className="space-y-4">
            <div className="surface p-5">
              <p className="eyebrow">The rule of the month</p>
              <h2 className="mt-1 font-display text-lg font-semibold">Protect the base first</h2>
              <ul className="mt-3 space-y-2 text-[0.8rem] leading-relaxed text-soft">
                <li className="flex gap-2">
                  <span className="tick mt-0.5">
                    <Icon name="check" size={11} />
                  </span>
                  Shelter and food are not optional lines.
                </li>
                <li className="flex gap-2">
                  <span className="tick mt-0.5">
                    <Icon name="check" size={11} />
                  </span>
                  Savings works best when it is paid first, like a bill.
                </li>
                <li className="flex gap-2">
                  <span className="tick mt-0.5">
                    <Icon name="check" size={11} />
                  </span>
                  Leave a little unassigned money. A perfect plan with no slack breaks on the first surprise.
                </li>
              </ul>
            </div>

            <div className="surface p-5">
              <p className="eyebrow">This month’s surprise</p>
              <h2 className="mt-1 font-display text-lg font-semibold">{event.title}</h2>
              <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">{event.detail}</p>
              <p className="mt-3 flex items-center gap-1.5 text-[0.72rem] font-semibold text-[var(--gold-ink)]">
                <Icon name="shield" size={13} />
                Could your plan absorb GHS {event.cost}?
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-[var(--bg-sunk)] p-4 text-[0.74rem] leading-relaxed text-muted">
              <p className="flex items-center gap-1.5 font-semibold text-ink">
                <Icon name="info" size={13} className="text-leaf" />
                How scoring works
              </p>
              <p className="mt-1">
                You earn points for protecting essentials, funding school, building a buffer and staying
                within income. A month with no buffer loses points when the surprise arrives. There is no
                perfect household — only the next adjustment.
              </p>
            </div>
          </aside>
        </div>
      )}
    </GameFrame>
  );
}

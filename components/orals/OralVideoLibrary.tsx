'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { oralVideos } from '@/content/oral-videos';
import type { OralVideo, OralVideoSkill } from '@/lib/types';
import { cn } from '@/lib/cn';
import { useAppStore } from '@/lib/store';
import { cacheUrls, isUrlCached, removeCachedUrl, storageEstimate } from '@/lib/offline';

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return 'Size unknown';
  const mb = bytes / (1024 * 1024);
  return `${mb >= 100 ? mb.toFixed(0) : mb.toFixed(1)} MB`;
}

const skillLabels: Record<OralVideoSkill | 'all', string> = {
  all: 'All skills',
  vowels: 'Vowels',
  consonants: 'Consonants',
  stress: 'Stress',
  intonation: 'Intonation',
  rhymes: 'Rhymes',
  general: 'General',
};

function VideoCard({
  video,
  active,
  cached,
  progressPct,
  onSelect,
}: {
  video: OralVideo;
  active: boolean;
  cached: boolean;
  progressPct: number;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full rounded-2xl border p-4 text-left transition-colors',
        active ? 'border-rose bg-[var(--rose-soft)]' : 'border-line bg-elev hover:border-rose',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[0.9rem] font-semibold leading-snug text-ink">{video.title}</p>
        <span className="chip shrink-0">{formatDuration(video.duration)}</span>
      </div>
      <p className="mt-2 text-[0.78rem] leading-relaxed text-muted">{video.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {video.year && <span className="chip chip-gold">{video.year}</span>}
        {video.tests?.length ? <span className="chip">Tests {video.tests.join(', ')}</span> : null}
        <span className="chip"><Icon name="video" size={12} />{video.channel}</span>
        {cached && <span className="chip chip-leaf"><Icon name="check-circle" size={12} />Saved</span>}
      </div>
      {progressPct > 0 && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--bg-soft)]" aria-hidden="true">
          <div className="h-full rounded-full bg-leaf" style={{ width: `${Math.min(100, progressPct)}%` }} />
        </div>
      )}
    </button>
  );
}

export function OralVideoLibrary() {
  const { state, recordVideoProgress } = useAppStore();
  const [selectedId, setSelectedId] = useState<string>(oralVideos[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('all');
  const [skill, setSkill] = useState<OralVideoSkill | 'all'>('all');
  const [cachedMap, setCachedMap] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [storage, setStorage] = useState<{ usage: number; quota: number } | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const years = useMemo(() => {
    const values = Array.from(new Set(oralVideos.map((v) => v.year).filter(Boolean) as string[]));
    return values.sort((a, b) => b.localeCompare(a));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return oralVideos.filter((v) => {
      if (year !== 'all' && v.year !== year) return false;
      if (skill !== 'all' && !(v.skills ?? ['general']).includes(skill)) return false;
      if (!q) return true;
      return [v.title, v.description, v.channel, v.year ?? '', (v.tests ?? []).join(' '), (v.skills ?? []).join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [query, year, skill]);

  const selected = useMemo(
    () => oralVideos.find((v) => v.id === selectedId) ?? filtered[0] ?? oralVideos[0],
    [filtered, selectedId],
  );

  useEffect(() => {
    if (filtered.length && !filtered.some((v) => v.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  useEffect(() => {
    let alive = true;
    void (async () => {
      const entries = await Promise.all(oralVideos.map(async (v) => [v.id, await isUrlCached(v.src)] as const));
      if (alive) setCachedMap(Object.fromEntries(entries));
      const est = await storageEstimate();
      if (alive) setStorage(est);
    })();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    setError(null);
  }, [selected?.id]);

  const selectedProgress = selected ? state.videoProgress[selected.id] : undefined;
  const progressPct = selectedProgress?.durationSeconds
    ? (selectedProgress.watchedSeconds / selectedProgress.durationSeconds) * 100
    : 0;

  async function toggleCache(video: OralVideo) {
    setSaving((s) => ({ ...s, [video.id]: true }));
    try {
      if (cachedMap[video.id]) {
        await removeCachedUrl(video.src);
        setCachedMap((m) => ({ ...m, [video.id]: false }));
      } else {
        const result = await cacheUrls([video.src]);
        setCachedMap((m) => ({ ...m, [video.id]: result.failed.length === 0 }));
        if (result.failed.length) setError('Could not save this video for offline use. Check your connection and try again.');
      }
      const est = await storageEstimate();
      setStorage(est);
    } finally {
      setSaving((s) => ({ ...s, [video.id]: false }));
    }
  }

  function onLoadedMetadata() {
    const el = videoRef.current;
    if (!el || !selected) return;
    const resume = state.videoProgress[selected.id]?.watchedSeconds ?? 0;
    if (resume > 5 && resume < (el.duration || 0) - 5) {
      try { el.currentTime = resume; } catch { /* ignore */ }
    }
  }

  function onTimeUpdate() {
    const el = videoRef.current;
    if (!el || !selected || !Number.isFinite(el.duration)) return;
    if (Math.floor(el.currentTime) % 5 !== 0) return;
    recordVideoProgress(selected.id, el.currentTime, el.duration);
  }

  function onEnded() {
    const el = videoRef.current;
    if (!el || !selected) return;
    recordVideoProgress(selected.id, el.duration || selected.duration, el.duration || selected.duration);
  }

  const totalBytes = oralVideos.reduce((n, v) => n + (v.bytes ?? 0), 0);
  const cachedCount = Object.values(cachedMap).filter(Boolean).length;

  return (
    <section className="mt-5 surface overflow-hidden" aria-labelledby="oral-videos-heading">
      <div className="border-b border-line px-5 py-4 sm:px-6">
        <p className="eyebrow">Video module</p>
        <h2 id="oral-videos-heading" className="mt-1 font-display text-2xl font-semibold">
          WASSCE Oral English exam videos
        </h2>
        <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-muted">
          Watch WASSCE oral English practice and walkthrough videos. Videos are stored locally in this project
          and can be saved for offline use. Each entry keeps its YouTube source for attribution.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <label className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-line bg-elev px-3 py-2 text-sm text-muted">
            <Icon name="search" size={15} />
            <span className="sr-only">Search oral videos</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, test, skill, year, channel"
              className="w-full bg-transparent text-ink outline-none placeholder:text-muted"
            />
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-line bg-elev px-3 py-2 text-sm">
            <span className="text-muted">Year</span>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="bg-transparent text-ink outline-none">
              <option value="all">All</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-line bg-elev px-3 py-2 text-sm">
            <span className="text-muted">Skill</span>
            <select value={skill} onChange={(e) => setSkill(e.target.value as OralVideoSkill | 'all')} className="bg-transparent text-ink outline-none">
              {Object.entries(skillLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <span className="chip"><Icon name="video" size={13} />{filtered.length} video{filtered.length === 1 ? '' : 's'}</span>
          <span className="chip"><Icon name="download" size={13} />{cachedCount}/{oralVideos.length} saved</span>
        </div>
        <p className="mt-3 text-[0.74rem] text-muted">
          Total library size: {formatBytes(totalBytes)}. Saving videos offline uses device storage
          {storage ? ` (${formatBytes(storage.usage)} used of ${formatBytes(storage.quota)})` : ''}.
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:p-6 xl:grid-cols-[1.45fr_.9fr]">
        <div>
          {selected ? (
            <div className="overflow-hidden rounded-[1.5rem] border border-line bg-black/90">
              <video
                ref={videoRef}
                key={selected.src}
                controls
                preload="metadata"
                playsInline
                poster={selected.posterSrc}
                className="aspect-video w-full bg-black"
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={onTimeUpdate}
                onEnded={onEnded}
                onError={() => setError('This video could not be loaded. If the file has not been downloaded yet, run the download script or use the YouTube source link.')}
              >
                <source src={selected.src} type="video/mp4" />
                {selected.captionsSrc ? <track kind="captions" src={selected.captionsSrc} srcLang="en" label="English" /> : null}
                Your browser could not play this video. Use the YouTube link below.
              </video>
              <div className="border-t border-line bg-elev p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xl font-semibold text-ink">{selected.title}</p>
                    <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">{selected.description}</p>
                  </div>
                  <span className="chip">{formatDuration(selected.duration)}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.year && <span className="chip chip-gold">{selected.year}</span>}
                  {selected.tests?.length ? <span className="chip">Tests {selected.tests.join(', ')}</span> : null}
                  {(selected.skills ?? []).map((s) => <span key={s} className="chip">{skillLabels[s]}</span>)}
                  <span className="chip">{selected.channel}</span>
                  <span className="chip">{formatBytes(selected.bytes)}</span>
                  {cachedMap[selected.id] ? <span className="chip chip-leaf">Available offline</span> : <span className="chip">Online/file</span>}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => void toggleCache(selected)} disabled={saving[selected.id]}>
                    <Icon name={cachedMap[selected.id] ? 'check-circle' : 'download'} size={14} />
                    {saving[selected.id] ? 'Saving…' : cachedMap[selected.id] ? 'Remove offline copy' : 'Save for offline'}
                  </button>
                  <a href={selected.sourceUrl ?? `https://www.youtube.com/watch?v=${selected.youtubeId}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                    <Icon name="external" size={14} />
                    Source on YouTube
                  </a>
                </div>
                {progressPct > 0 && (
                  <p className="mt-3 text-[0.74rem] text-muted">
                    Progress: {Math.round(progressPct)}% watched{selectedProgress?.completed ? ' • completed' : ''}.
                  </p>
                )}
                {error && (
                  <div className="mt-3 rounded-xl bg-[var(--gold-soft)] p-3 text-[0.78rem] leading-relaxed text-[var(--gold-ink)]" role="status">
                    <div className="flex items-start gap-2"><Icon name="alert" size={14} /><span>{error}</span></div>
                  </div>
                )}
                {!selected.captionsSrc && (
                  <p className="mt-3 text-[0.72rem] text-muted">
                    Captions/transcript: not yet added for this video. You can still use the YouTube source for captions when available.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-line bg-elev p-6 text-sm text-muted">No videos match your filters.</div>
          )}
        </div>

        <div className="max-h-[42rem] space-y-2 overflow-auto pr-1">
          {filtered.map((video) => {
            const p = state.videoProgress[video.id];
            const pct = p?.durationSeconds ? (p.watchedSeconds / p.durationSeconds) * 100 : 0;
            return (
              <VideoCard
                key={video.id}
                video={video}
                active={video.id === selected?.id}
                cached={Boolean(cachedMap[video.id])}
                progressPct={pct}
                onSelect={() => setSelectedId(video.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

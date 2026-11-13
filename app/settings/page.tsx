'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { ProgressBar } from '@/components/ui/ProgressRing';
import { usePwa, downloadLabel, type DownloadState } from '@/components/providers/PwaProvider';
import { subjects } from '@/content/subjects';
import { isoDay, prettyDate } from '@/lib/date';
import { useAppStore } from '@/lib/store';
import { askTutor, PROVIDER_DEFAULT_MODELS } from '@/lib/tutor';
import { availableTtsKeys, speakSmart, VOICE_STYLES } from '@/lib/speech';
import type { AiSettings } from '@/lib/types';
import { cn } from '@/lib/cn';

const providerModels = PROVIDER_DEFAULT_MODELS;

function Panel({
  icon,
  title,
  description,
  children,
  id,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section className="surface p-5 sm:p-6" aria-labelledby={id}>
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--leaf-soft)] text-leaf">
          {icon}
        </span>
        <div>
          <h2 id={id} className="font-display text-xl font-semibold leading-tight">
            {title}
          </h2>
          {description && <p className="mt-1 max-w-2xl text-[0.82rem] leading-relaxed text-muted">{description}</p>}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  hint: string;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-line p-3">
      <span>
        <span className="block text-[0.84rem] font-semibold text-ink">{label}</span>
        <span className="mt-0.5 block text-[0.72rem] leading-relaxed text-muted">{hint}</span>
      </span>
      <span className="relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span
          className={cn(
            'absolute inset-0 rounded-full border transition-colors',
            checked ? 'border-leaf bg-leaf' : 'border-line-strong bg-[var(--bg-sunk)]',
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            'relative ml-0.5 h-5 w-5 rounded-full bg-elev shadow-sm transition-transform',
            checked && 'translate-x-5',
          )}
          aria-hidden="true"
        />
      </span>
    </label>
  );
}

export default function SettingsPage() {
  const {
    state,
    hydrated,
    updateProfile,
    updateSettings,
    resetAll,
  } = useAppStore();
  const {
    online,
    canInstall,
    installed,
    isIos,
    isSafari,
    install,
    downloadSubject,
    downloadState,
    clearOffline,
    offlineFiles,
    refreshOfflineCount,
  } = usePwa();

  const [name, setName] = useState(state.profile.name);
  const [examDate, setExamDate] = useState(state.profile.examDate);
  const [provisional, setProvisional] = useState(state.profile.examDateIsProvisional);
  const [confidence, setConfidence] = useState(state.profile.confidence);
  const [profileSaved, setProfileSaved] = useState(false);

  const [ai, setAi] = useState<AiSettings>(state.settings.ai);
  const [showKey, setShowKey] = useState(false);
  const [aiSaved, setAiSaved] = useState(false);
  const [test, setTest] = useState<{ status: 'idle' | 'working' | 'ok' | 'error'; message?: string }>({
    status: 'idle',
  });

  const [resetOpen, setResetOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    setName(state.profile.name);
    setExamDate(state.profile.examDate);
    setProvisional(state.profile.examDateIsProvisional);
    setConfidence(state.profile.confidence);
  }, [
    hydrated,
    state.profile.name,
    state.profile.examDate,
    state.profile.examDateIsProvisional,
    state.profile.confidence,
  ]);

  useEffect(() => {
    if (!hydrated) return;
    setAi(state.settings.ai);
  }, [hydrated, state.settings.ai]);

  function saveProfile() {
    updateProfile({
      name: name.trim() || 'Angel',
      examDate,
      examDateIsProvisional: provisional,
      confidence,
      onboarded: true,
    });
    setProfileSaved(true);
  }

  function saveAi() {
    updateSettings({
      ai: {
        provider: ai.provider,
        apiKey: ai.apiKey.trim(),
        model: ai.model.trim() || providerModels[ai.provider],
        proxyUrl: ai.proxyUrl.trim(),
      },
    });
    setAiSaved(true);
    setTest({ status: 'idle' });
  }

  async function testConnection() {
    if (!ai.apiKey.trim() && !ai.proxyUrl.trim()) {
      setTest({ status: 'error', message: 'Add an API key or a proxy URL first.' });
      return;
    }
    setTest({ status: 'working', message: 'Sending one small test message…' });
    try {
      const reply = await askTutor({
        settings: {
          ...ai,
          apiKey: ai.apiKey.trim(),
          model: ai.model.trim() || providerModels[ai.provider],
          proxyUrl: ai.proxyUrl.trim(),
        },
        messages: [{ role: 'user', content: 'Reply in one short sentence confirming you are ready.' }],
        context: { label: 'Connection test', knowledge: 'You are Jacob inside the Auntie Angel WASSCE study app. Reply briefly and clearly.' },
      });
      setTest({ status: 'ok', message: reply.slice(0, 180) });
    } catch (error) {
      setTest({
        status: 'error',
        message: error instanceof Error ? error.message : 'The service could not be reached.',
      });
    }
  }

  function exportBackup() {
    const { ai: savedAi, ...settings } = state.settings;
    const safe = {
      ...state,
      settings: {
        ...settings,
        ai: { ...savedAi, apiKey: '', proxyUrl: '' },
      },
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(safe, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `auntie-angel-backup-${isoDay()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function confirmClearOffline() {
    await clearOffline();
    setClearOpen(false);
  }

  const installedLabel = installed ? 'Installed on this device' : canInstall ? 'Ready to install' : 'Browser install';

  return (
    <div>
      <section className="hero-wash relative overflow-hidden rounded-[2rem] border border-line p-5 sm:p-9">
        <div className="aurora" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="eyebrow">Make it fit you</p>
          <h1 className="display-lg mt-2">Settings</h1>
          <p className="prose-angel mt-3">
            Your name, your date, your device. Auntie Angel has no account and no server holding your study
            record. Everything below is stored in this browser, and you can take it with you or erase it
            whenever you choose.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip chip-leaf">
              <Icon name="lock" size={13} />
              Local-first
            </span>
            <span className={cn('chip', !online && 'chip-gold')}>
              <Icon name={online ? 'globe' : 'wifi-off'} size={13} />
              {online ? 'Online' : 'Offline'}
            </span>
            <span className="chip">
              <Icon name="download" size={13} />
              {offlineFiles} file{offlineFiles === 1 ? '' : 's'} saved
            </span>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-5">
          <Panel
            id="profile-heading"
            icon={<Icon name="user" size={19} />}
            title="Your profile"
            description="The name Jacob uses, and the date the countdown is built on. You can change either at any time."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="settings-name" className="label">
                  What should Jacob call you?
                </label>
                <input
                  id="settings-name"
                  className="input"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setProfileSaved(false);
                  }}
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label htmlFor="settings-date" className="label">
                  Exam date
                </label>
                <input
                  id="settings-date"
                  type="date"
                  className="input"
                  value={examDate}
                  onChange={(event) => {
                    setExamDate(event.target.value);
                    setProfileSaved(false);
                  }}
                />
              </div>
            </div>

            <label className="mt-3 flex items-start gap-2 text-[0.78rem] leading-relaxed text-muted">
              <input
                type="checkbox"
                checked={provisional}
                onChange={(event) => {
                  setProvisional(event.target.checked);
                  setProfileSaved(false);
                }}
                className="mt-0.5 h-4 w-4 accent-[var(--leaf)]"
              />
              This date is provisional. WAEC has not confirmed the 2027 timetable in this app.
            </label>

            <div className="mt-4">
              <span className="label">Confidence today</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setConfidence(value);
                      setProfileSaved(false);
                    }}
                    aria-label={`Confidence ${value} out of 5`}
                    aria-pressed={confidence === value}
                    className={
                      confidence >= value
                        ? 'grid h-10 flex-1 place-items-center rounded-xl bg-[var(--leaf-soft)] text-leaf'
                        : 'grid h-10 flex-1 place-items-center rounded-xl border border-line bg-elev text-muted'
                    }
                  >
                    <Icon name="star" size={17} />
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-[0.72rem] text-muted">
                There is no right answer. This only helps the app choose a gentle starting point.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button type="button" onClick={saveProfile} className="btn btn-primary btn-sm">
                <Icon name="check" size={15} />
                Save profile
              </button>
              {profileSaved && (
                <span className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-leaf" role="status">
                  <Icon name="check-circle" size={13} />
                  Saved
                </span>
              )}
            </div>
          </Panel>

          <Panel
            id="appearance-heading"
            icon={<Icon name="sun" size={19} />}
            title="Appearance & accessibility"
            description="The interface should get out of the way of the work. Adjust it to suit your eyes and your device."
          >
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'light', label: 'Daylight', icon: 'sun' as const },
                  { id: 'dark', label: 'Night', icon: 'moon' as const },
                  { id: 'system', label: 'Follow device', icon: 'globe' as const },
                ] as const
              ).map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => updateSettings({ theme: theme.id })}
                  aria-pressed={state.settings.theme === theme.id}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-[0.76rem] font-semibold transition-colors',
                    state.settings.theme === theme.id
                      ? 'border-leaf bg-[var(--leaf-soft)] text-leaf'
                      : 'border-line bg-elev text-soft hover:border-leaf',
                  )}
                >
                  <Icon name={theme.icon} size={18} />
                  {theme.label}
                </button>
              ))}
            </div>

            <div className="mt-3 space-y-2">
              <Toggle
                checked={state.settings.reducedMotion}
                onChange={(value) => updateSettings({ reducedMotion: value })}
                label="Reduce motion"
                hint="Turn off entrance animations and the drifting background. The app still works exactly the same."
              />
              <Toggle
                checked={state.settings.voiceReplies}
                onChange={(value) => updateSettings({ voiceReplies: value })}
                label="Read Jacob’s replies aloud"
                hint="Jacob can speak with a sweet female voice. Online, the AI providers are tried first; offline, your device voice is used."
              />
              <div className="rounded-xl border border-line bg-elev p-3">
                <p className="text-[0.8rem] font-semibold text-ink">Speaking voice</p>
                <p className="mt-0.5 text-[0.68rem] leading-relaxed text-muted">
                  Pick how Jacob sounds. Provider voices need a connection and a working key; the device voice
                  is the automatic fallback.
                </p>
                <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {VOICE_STYLES.map((style) => {
                    const selected = state.settings.voiceStyle === style.id;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => updateSettings({ voiceStyle: style.id })}
                        aria-pressed={selected}
                        className={cn(
                          'rounded-lg border px-2.5 py-2 text-left transition-colors',
                          selected
                            ? 'border-leaf bg-[var(--leaf-soft)] text-leaf'
                            : 'border-line bg-[var(--bg-elev)] text-soft hover:border-leaf',
                        )}
                      >
                        <span className="block text-[0.76rem] font-semibold">{style.label}</span>
                        <span className="mt-0.5 block text-[0.64rem] leading-snug opacity-80">{style.hint}</span>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    speakSmart(
                      'Hello Angel. I am Jacob, your study companion. You do not have to feel ready to begin — one small step is enough for today.',
                      {
                        style: state.settings.voiceStyle,
                        keys: availableTtsKeys({ provider: ai.provider, apiKey: ai.apiKey }),
                      },
                    )
                  }
                  className="btn btn-ghost btn-sm mt-2"
                >
                  <Icon name="volume" size={15} />
                  Hear a sample
                </button>
              </div>
              <Toggle
                checked={state.settings.reminders}
                onChange={(value) => updateSettings({ reminders: value })}
                label="Break and long-day reminders"
                hint="A gentle pause after a long sitting, and a note after more than three hours in one day. In-app only."
              />
            </div>
          </Panel>

          <Panel
            id="ai-heading"
            icon={<Icon name="spark" size={19} />}
            title="Jacob’s AI"
            description="The tutor works offline with a saved guide. Add a provider key for a deeper back-and-forth. Keys are stored in this browser only."
          >
            <div className="rounded-xl border border-[var(--gold)]/30 bg-[var(--gold-soft)]/60 p-3 text-[0.78rem] leading-relaxed text-soft">
              <p className="flex items-center gap-1.5 font-semibold text-ink">
                <Icon name="shield" size={14} className="text-[var(--gold-ink)]" />
                Read this before adding a key
              </p>
              <p className="mt-1">
                This is a static, offline-first app. A key saved here can be read by anyone with access to this
                browser profile. Do not use a shared device. For a public deployment, point the app at a small
                server-side proxy instead of shipping a key. Never paste a key into a site you do not trust.
              </p>
            </div>

            <div className="mt-3 rounded-xl border border-line bg-elev p-3 text-[0.76rem] leading-relaxed text-soft">
              <p className="font-semibold text-ink">Set up on Angel’s phone (one time)</p>
              <ol className="mt-1.5 list-decimal space-y-1 pl-4">
                <li>
                  Open <strong>console.groq.com</strong> and copy a Groq API key.
                </li>
                <li>
                  Choose <strong>Groq</strong> below, paste the key, and press <strong>Save AI settings</strong>.
                </li>
                <li>
                  Press <strong>Test connection</strong>. The key stays on this phone only.
                </li>
              </ol>
              <p className="mt-1.5 text-[0.7rem] text-muted">
                For the sweet provider voice, accept the Orpheus text-to-speech terms once in the Groq console.
                If it has not been accepted, Jacob automatically uses the phone voice instead.
              </p>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="ai-provider" className="label">
                  Provider
                </label>
                <select
                  id="ai-provider"
                  className="select"
                  value={ai.provider}
                  onChange={(event) => {
                    const provider = event.target.value as AiSettings['provider'];
                    setAi((current) => ({
                      ...current,
                      provider,
                      model: providerModels[provider],
                    }));
                    setAiSaved(false);
                  }}
                >
                  <option value="groq">Groq (fast, online)</option>
                  <option value="openrouter">OpenRouter</option>
                  <option value="deepseek">DeepSeek</option>
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic (Claude)</option>
                  <option value="gemini">Google Gemini</option>
                </select>
              </div>
              <div>
                <label htmlFor="ai-model" className="label">
                  Model
                </label>
                <input
                  id="ai-model"
                  className="input"
                  value={ai.model}
                  onChange={(event) => {
                    setAi((current) => ({ ...current, model: event.target.value }));
                    setAiSaved(false);
                  }}
                  placeholder={providerModels[ai.provider]}
                  spellCheck={false}
                />
              </div>
            </div>

            <div className="mt-3">
              <label htmlFor="ai-key" className="label">
                API key
              </label>
              <div className="flex gap-2">
                <input
                  id="ai-key"
                  className="input"
                  type={showKey ? 'text' : 'password'}
                  value={ai.apiKey}
                  onChange={(event) => {
                    setAi((current) => ({ ...current, apiKey: event.target.value }));
                    setAiSaved(false);
                  }}
                  placeholder="sk-…"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={() => setShowKey((value) => !value)}
                  className="btn btn-secondary btn-sm shrink-0"
                  aria-label={showKey ? 'Hide API key' : 'Show API key'}
                >
                  <Icon name={showKey ? 'eye' : 'lock'} size={15} />
                  {showKey ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="mt-3">
              <label htmlFor="ai-proxy" className="label">
                Proxy URL <span className="font-normal text-muted">(optional, recommended for sharing)</span>
              </label>
              <input
                id="ai-proxy"
                className="input"
                value={ai.proxyUrl}
                onChange={(event) => {
                  setAi((current) => ({ ...current, proxyUrl: event.target.value }));
                  setAiSaved(false);
                }}
                placeholder="https://your-proxy.example/api/tutor"
                autoComplete="off"
                spellCheck={false}
              />
              <p className="mt-1 text-[0.7rem] leading-relaxed text-muted">
                The proxy receives <code className="rounded bg-[var(--bg-sunk)] px-1">{`{ provider, model, system, messages }`}</code>{' '}
                as JSON and should return <code className="rounded bg-[var(--bg-sunk)] px-1">{`{ text }`}</code>.
                If a proxy is set, it is used instead of calling the provider directly.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button type="button" onClick={saveAi} className="btn btn-primary btn-sm">
                <Icon name="check" size={15} />
                Save AI settings
              </button>
              <button
                type="button"
                onClick={() => void testConnection()}
                disabled={test.status === 'working'}
                className="btn btn-secondary btn-sm"
              >
                <Icon name="zap" size={15} />
                {test.status === 'working' ? 'Testing…' : 'Test connection'}
              </button>
              {ai.apiKey && (
                <button
                  type="button"
                  onClick={() => {
                    setAi((current) => ({ ...current, apiKey: '' }));
                    updateSettings({ ai: { ...state.settings.ai, apiKey: '' } });
                    setTest({ status: 'idle' });
                    setAiSaved(false);
                  }}
                  className="btn btn-ghost btn-sm text-rose"
                >
                  <Icon name="trash" size={14} />
                  Clear key
                </button>
              )}
            </div>

            {(aiSaved || test.status !== 'idle') && (
              <p
                role="status"
                className={cn(
                  'mt-3 rounded-xl p-3 text-[0.76rem] leading-relaxed',
                  test.status === 'error'
                    ? 'bg-[var(--rose-soft)] text-soft'
                    : 'bg-[var(--leaf-soft)] text-soft',
                )}
              >
                {test.status === 'ok' && (
                  <>
                    <strong className="text-ink">Connected. </strong>
                    {test.message}
                  </>
                )}
                {test.status === 'error' && (
                  <>
                    <strong className="text-ink">That did not work. </strong>
                    {test.message}
                  </>
                )}
                {test.status === 'working' && test.message}
                {test.status === 'idle' && aiSaved && 'AI settings saved on this device.'}
              </p>
            )}

            <p className="mt-3 text-[0.7rem] leading-relaxed text-muted">
              <strong className="text-ink">Online when connected, offline when needed:</strong> if you are
              online and a key (or proxy) is set, Jacob uses the live AI. If you are offline or the service
              cannot be reached, he falls back to the guide saved on this device. Without a key, the offline
              guide still works.
            </p>
          </Panel>

          <Panel
            id="offline-heading"
            icon={<Icon name="download" size={19} />}
            title="Offline & installation"
            description="Save a subject for the days when data runs out. Saved files live in this browser’s cache; you can remove them at any time."
          >
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[var(--bg-sunk)] p-3">
              <div>
                <p className="text-[0.82rem] font-semibold">{installedLabel}</p>
                <p className="mt-0.5 text-[0.7rem] text-muted">
                  {installed
                    ? 'Open it from your home screen or app list. The saved subjects work without a connection.'
                    : canInstall
                      ? 'Your browser is ready to install Auntie Angel as an app.'
                      : isIos
                        ? 'On iPhone or iPad: Share â†’ Add to Home Screen.'
                        : isSafari
                          ? 'In Safari: File â†’ Add to Dock, or Share â†’ Add to Home Screen.'
                          : 'Look for “Install app” in your browser menu. Installation is optional.'}
                </p>
              </div>
              {!installed && canInstall && (
                <button type="button" onClick={() => void install()} className="btn btn-primary btn-sm">
                  <Icon name="install" size={15} />
                  Install
                </button>
              )}
            </div>

            <div className="mt-3 space-y-2">
              {subjects.map((subject) => {
                const saved = state.downloads[subject.id];
                const download: DownloadState | undefined = downloadState[subject.id];
                const progress = download?.total ? (download.done / download.total) * 100 : 0;
                return (
                  <div key={subject.id} className="rounded-xl border border-line p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[0.84rem] font-semibold">
                          {subject.name}
                          <span className="ml-2 text-[0.65rem] font-semibold uppercase tracking-wide text-muted">
                            Priority {subject.priority}
                          </span>
                        </p>
                        <p className="mt-0.5 text-[0.7rem] text-muted">
                          {subject.paperUrl
                            ? `${subject.paperLabel ?? 'Paper'} · lessons, practice and library pages`
                            : 'Lessons and practice only — no past paper in this folder'}
                        </p>
                        {saved && (
                          <p className="mt-1 flex items-center gap-1 text-[0.68rem] font-semibold text-leaf">
                            <Icon name="check-circle" size={12} />
                            Saved on {prettyDate(saved)}
                          </p>
                        )}
                        {download?.message && (
                          <p className="mt-1 text-[0.68rem] font-semibold text-rose">{download.message}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => void downloadSubject(subject.id)}
                        disabled={download?.status === 'working'}
                        className="btn btn-secondary btn-sm shrink-0"
                      >
                        <Icon name={saved ? 'refresh' : 'download'} size={14} />
                        {downloadLabel(subject.id, state, download)}
                      </button>
                    </div>
                    {download?.status === 'working' && (
                      <ProgressBar
                        value={progress}
                        label={`Saving ${subject.shortName} offline`}
                        className="mt-2"
                        height={5}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-[0.7rem] text-muted">
                {offlineFiles} file{offlineFiles === 1 ? '' : 's'} in the offline library.
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => void refreshOfflineCount()} className="btn btn-ghost btn-sm">
                  <Icon name="refresh" size={14} />
                  Refresh count
                </button>
                <button
                  type="button"
                  onClick={() => setClearOpen(true)}
                  className="btn btn-ghost btn-sm text-rose"
                >
                  <Icon name="trash" size={14} />
                  Clear downloads
                </button>
              </div>
            </div>
          </Panel>
        </div>

        <aside className="space-y-5">
          <Panel
            id="data-heading"
            icon={<Icon name="shield" size={19} />}
            title="Your data"
            description="A backup is a JSON file you can keep somewhere safe. It leaves AI keys out on purpose."
          >
            <div className="space-y-2">
              <button type="button" onClick={exportBackup} className="btn btn-secondary btn-sm w-full">
                <Icon name="download" size={15} />
                Export my progress
              </button>
              <button
                type="button"
                onClick={() => setResetOpen(true)}
                className="btn btn-ghost btn-sm w-full text-rose"
              >
                <Icon name="trash" size={15} />
                Erase all progress
              </button>
            </div>
            <p className="mt-3 text-[0.72rem] leading-relaxed text-muted">
              Created {prettyDate(state.createdAt)}. Progress is mirrored in IndexedDB with a localStorage
              copy. Clearing site data in your browser also erases it, whether or not you use the button above.
            </p>
          </Panel>

          <Panel
            id="sources-heading"
            icon={<Icon name="book" size={19} />}
            title="Sources & honesty"
            description="This is a study companion, not an official WAEC product."
          >
            <ul className="space-y-2 text-[0.76rem] leading-relaxed text-soft">
              <li className="flex gap-2">
                <span className="tick mt-0.5">
                  <Icon name="check" size={11} />
                </span>
                Practice questions are adapted from WAEC papers and examiner reports in this project, or are
                clearly labelled original practice.
              </li>
              <li className="flex gap-2">
                <span className="tick mt-0.5">
                  <Icon name="check" size={11} />
                </span>
                Literature notes cover the Ghana 2022–2026 core English cycle. Confirm the current list with
                your school or ghanawaec.org before relying on it.
              </li>
              <li className="flex gap-2">
                <span className="tick mt-0.5">
                  <Icon name="check" size={11} />
                </span>
                Where a scan was damaged, an answer is marked for checking rather than presented as certain.
              </li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/papers/" className="text-[0.74rem] font-semibold text-leaf hover:underline">
                Past papers
              </Link>
              <span className="text-muted">·</span>
              <Link href="/literature/" className="text-[0.74rem] font-semibold text-leaf hover:underline">
                Literature library
              </Link>
              <span className="text-muted">·</span>
              <a
                href="https://ghanawaec.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[0.74rem] font-semibold text-leaf hover:underline"
              >
                ghanawaec.org
                <Icon name="external" size={11} />
              </a>
            </div>
          </Panel>

          <div className="rounded-2xl border border-line bg-[var(--bg-sunk)] p-5 text-[0.76rem] leading-relaxed text-muted">
            <p className="flex items-center gap-1.5 font-semibold text-ink">
              <Icon name="info" size={14} className="text-leaf" />
              Auntie Angel v1.0
            </p>
            <p className="mt-1">
              Built as a calm, offline-first revision space for a private candidate. No accounts, no tracking,
              no leaderboard of strangers. If something is wrong, the source paper matters more than the app.
            </p>
          </div>
        </aside>
      </div>

      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Erase all progress?"
        description="This removes your XP, streak, quiz history, journal, badges and saved preferences from this browser. It cannot be undone."
        size="sm"
        footer={
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" className="btn btn-ghost" onClick={() => setResetOpen(false)}>
              Keep my progress
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                resetAll();
                setResetOpen(false);
              }}
            >
              <Icon name="trash" size={15} />
              Yes, erase it
            </button>
          </div>
        }
      >
        <p className="text-sm leading-relaxed text-soft">
          Export a backup first if there is any chance you want this record later. Offline files are separate;
          clear those below if you also want the saved pages removed.
        </p>
      </Modal>

      <Modal
        open={clearOpen}
        onClose={() => setClearOpen(false)}
        title="Clear offline downloads?"
        description="This removes the pages and papers saved for offline study. Your progress and journal stay."
        size="sm"
        footer={
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" className="btn btn-ghost" onClick={() => setClearOpen(false)}>
              Keep them
            </button>
            <button type="button" className="btn btn-primary" onClick={() => void confirmClearOffline()}>
              <Icon name="trash" size={15} />
              Clear downloads
            </button>
          </div>
        }
      >
        <p className="text-sm leading-relaxed text-soft">
          You can save a subject again whenever you have a connection. The app shell itself is managed by the
          service worker and stays available.
        </p>
      </Modal>
    </div>
  );
}


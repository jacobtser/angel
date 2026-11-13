'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { usePwa } from '@/components/providers/PwaProvider';
import { subjects } from '@/content/subjects';
import { prettyDate } from '@/lib/date';
import { useAppStore } from '@/lib/store';

export default function OfflinePage() {
  const { online, installed, isIos, isSafari, install, canInstall, downloadSubject, downloadState } = usePwa();
  const { state } = useAppStore();
  const saved = subjects.filter((subject) => state.downloads[subject.id]);

  return (
    <div className="mx-auto max-w-3xl">
      <section className="hero-wash relative overflow-hidden rounded-[2rem] border border-line p-6 sm:p-9">
        <div className="aurora" aria-hidden="true" />
        <div className="relative">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--bg-elev)] text-leaf shadow-soft">
            <Icon name={online ? 'globe' : 'wifi-off'} size={23} />
          </span>
          <p className="eyebrow mt-4">{online ? 'You are back online' : 'No connection, no problem'}</p>
          <h1 className="display-lg mt-2">
            {online ? 'The signal returned.' : 'The saved work is still here.'}
          </h1>
          <p className="prose-angel mt-3">
            {online
              ? 'This is the offline fallback page. You can return to your dashboard, or save another subject now while the connection is good.'
              : 'Auntie Angel keeps the lessons and papers you saved on this device. Open a saved subject below, or read the study notes already in the app. The AI tutor will use the local guide until a connection returns.'}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/" className="btn btn-primary">
              <Icon name="home" size={16} />
              Back to today
            </Link>
            <Link href="/subjects/" className="btn btn-secondary">
              <Icon name="book" size={16} />
              Browse subjects
            </Link>
          </div>
        </div>
      </section>

      <section className="surface mt-5 p-5 sm:p-6" aria-labelledby="saved-heading">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="eyebrow">On this device</p>
            <h2 id="saved-heading" className="mt-1 font-display text-xl font-semibold">
              Saved subjects
            </h2>
          </div>
          <span className="chip">{saved.length} of {subjects.length}</span>
        </div>

        <div className="mt-4 space-y-2">
          {subjects.map((subject) => {
            const when = state.downloads[subject.id];
            const download = downloadState[subject.id];
            return (
              <div
                key={subject.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line p-3"
              >
                <div>
                  <p className="text-[0.86rem] font-semibold">{subject.name}</p>
                  <p className="text-[0.68rem] text-muted">
                    {when ? `Saved ${prettyDate(when)}` : 'Not saved for offline use yet'}
                  </p>
                </div>
                {when ? (
                  <Link
                    href={`/subjects/${subject.id}/`}
                    className="inline-flex items-center gap-1 text-[0.74rem] font-semibold text-leaf hover:underline"
                  >
                    Open
                    <Icon name="arrow-right" size={13} />
                  </Link>
                ) : online ? (
                  <button
                    type="button"
                    onClick={() => void downloadSubject(subject.id)}
                    disabled={download?.status === 'working'}
                    className="btn btn-secondary btn-sm"
                  >
                    <Icon name="download" size={14} />
                    {download?.status === 'working' ? 'Saving…' : 'Save now'}
                  </button>
                ) : (
                  <span className="text-[0.66rem] font-semibold text-muted">Connect once to save</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <section className="surface p-5">
          <p className="eyebrow">Keep it on the device</p>
          <h2 className="mt-1 font-display text-lg font-semibold">Make the app findable</h2>
          <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted">
            {installed
              ? 'Auntie Angel is installed. Look for it on your home screen or in your app list.'
              : isIos
                ? 'On iPhone or iPad, open the Share menu and choose “Add to Home Screen”.'
                : isSafari
                  ? 'In Safari, choose File → Add to Dock, or Share → Add to Home Screen.'
                  : 'Use your browser menu to install Auntie Angel. The app shell then opens without a connection.'}
          </p>
          {!installed && canInstall && (
            <button type="button" onClick={() => void install()} className="btn btn-primary btn-sm mt-3">
              <Icon name="install" size={15} />
              Install app
            </button>
          )}
        </section>

        <section className="surface p-5">
          <p className="eyebrow">When the signal is gone</p>
          <h2 className="mt-1 font-display text-lg font-semibold">Jacob still helps</h2>
          <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted">
            With no connection, the tutor uses the offline guide saved in the app. He may not know every
            detail, and he will say so. Use the lesson explanations, flashcards and past papers you saved —
            those do not need a network.
          </p>
          <Link
            href="/settings/"
            className="mt-3 inline-flex items-center gap-1 text-[0.74rem] font-semibold text-leaf hover:underline"
          >
            Manage offline files
            <Icon name="arrow-right" size={13} />
          </Link>
        </section>
      </div>
    </div>
  );
}

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { cacheSubject, cachedCount, cachesAvailable, clearDownloads } from '@/lib/offline';
import { useAppStore } from '@/lib/store';
import type { SubjectId } from '@/lib/types';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export interface DownloadState {
  status: 'idle' | 'working' | 'done' | 'error';
  done: number;
  total: number;
  message?: string;
}

interface PwaValue {
  online: boolean;
  canInstall: boolean;
  installed: boolean;
  isIos: boolean;
  isSafari: boolean;
  install: () => Promise<'accepted' | 'dismissed' | 'unavailable'>;
  downloadSubject: (subject: SubjectId) => Promise<void>;
  downloadState: Partial<Record<SubjectId, DownloadState>>;
  clearOffline: () => Promise<void>;
  offlineFiles: number;
  refreshOfflineCount: () => Promise<void>;
}

const PwaContext = createContext<PwaValue | null>(null);

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const { state, markDownloaded, clearDownloaded } = useAppStore();
  const [online, setOnline] = useState(true);
  const [canInstall, setCanInstall] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [downloadState, setDownloadState] = useState<Partial<Record<SubjectId, DownloadState>>>({});
  const [offlineFiles, setOfflineFiles] = useState(0);

  const refreshOfflineCount = useCallback(async () => {
    setOfflineFiles(await cachedCount());
  }, []);

  useEffect(() => {
    setOnline(navigator.onLine);
    setInstalled(isStandalone());
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      setCanInstall(true);
    };
    const onInstalled = () => {
      setInstalled(true);
      setCanInstall(false);
      setInstallEvent(null);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);

    void refreshOfflineCount();

    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      const register = () => {
        void navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .then(() => refreshOfflineCount())
          .catch(() => {
            /* an unavailable service worker must never block study */
          });
      };
      if (document.readyState === 'complete') register();
      else window.addEventListener('load', register, { once: true });
    }

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, [refreshOfflineCount]);

  const install = useCallback(async () => {
    if (!installEvent) {
      if (isStandalone()) {
        setInstalled(true);
        return 'unavailable' as const;
      }
      return 'unavailable' as const;
    }
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    setInstallEvent(null);
    setCanInstall(false);
    if (choice.outcome === 'accepted') setInstalled(true);
    return choice.outcome;
  }, [installEvent]);

  const downloadSubject = useCallback(
    async (subject: SubjectId) => {
      if (!cachesAvailable()) {
        setDownloadState((current) => ({
          ...current,
          [subject]: {
            status: 'error',
            done: 0,
            total: 0,
            message: 'This browser does not allow offline storage.',
          },
        }));
        return;
      }

      setDownloadState((current) => ({
        ...current,
        [subject]: { status: 'working', done: 0, total: 0 },
      }));

      const result = await cacheSubject(subject, (done, total) => {
        setDownloadState((current) => ({
          ...current,
          [subject]: { status: 'working', done, total },
        }));
      });

      if (result.cached > 0) markDownloaded(subject);
      setDownloadState((current) => ({
        ...current,
        [subject]: {
          status: result.failed.length ? 'error' : 'done',
          done: result.cached,
          total: result.total,
          message: result.failed.length
            ? `${result.failed.length} file${result.failed.length === 1 ? '' : 's'} could not be saved. Check your connection and try again.`
            : undefined,
        },
      }));
      await refreshOfflineCount();
    },
    [markDownloaded, refreshOfflineCount],
  );

  const clearOffline = useCallback(async () => {
    await clearDownloads();
    clearDownloaded();
    setDownloadState({});
    await refreshOfflineCount();
  }, [clearDownloaded, refreshOfflineCount]);

  const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
  const isIos = /iphone|ipad|ipod/i.test(userAgent);
  const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(userAgent);

  const value = useMemo<PwaValue>(
    () => ({
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
    }),
    [
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
    ],
  );

  return <PwaContext.Provider value={value}>{children}</PwaContext.Provider>;
}

export function usePwa(): PwaValue {
  const value = useContext(PwaContext);
  if (!value) throw new Error('usePwa must be used inside <PwaProvider>');
  return value;
}

/** A download is "saved" if this device recorded it or the cache still knows it. */
export function downloadLabel(
  subject: SubjectId,
  state: ReturnType<typeof useAppStore>['state'],
  download: DownloadState | undefined,
): string {
  if (download?.status === 'working') {
    return download.total ? `Saving ${download.done}/${download.total}…` : 'Saving…';
  }
  if (download?.status === 'error') return 'Try again';
  if (state.downloads[subject]) return 'Saved offline';
  return 'Save offline';
}

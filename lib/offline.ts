'use client';

/**
 * Offline library helpers.
 *
 * The service worker precaches the application shell when the PWA is
 * installed. This module is the explicit, learner-controlled layer: it stores
 * a whole subject's pages and source PDFs in a named cache so she can press
 * "Download for offline" and then study on a bus with no data.
 */
import { allLiterature, subjectById, topicPath, topicsForSubject } from '@/content/subjects';
import type { SubjectId } from './types';

export const OFFLINE_CACHE = 'auntie-angel-downloads-v1';

export interface CacheResult {
  total: number;
  cached: number;
  failed: string[];
}

export function cachesAvailable(): boolean {
  return typeof window !== 'undefined' && 'caches' in window;
}

/** Every route that makes one subject useful without a connection. */
export function subjectOfflineUrls(subjectId: SubjectId): string[] {
  const subject = subjectById[subjectId];
  if (!subject) return [];

  const urls = new Set<string>([
    '/',
    '/subjects/',
    `/subjects/${subjectId}/`,
    '/practice/',
    `/practice/mock/${subjectId}/`,
    '/papers/',
    '/offline/',
  ]);

  for (const topic of topicsForSubject(subjectId)) urls.add(topicPath(topic));

  if (subject.paperUrl) urls.add(subject.paperUrl);

  if (subjectId === 'english') {
    urls.add('/literature/');
    urls.add('/orals/');
    for (const text of allLiterature) urls.add(`/literature/${text.id}/`);
  }

  return Array.from(urls);
}

export async function cacheUrls(
  urls: string[],
  onProgress?: (done: number, total: number) => void,
): Promise<CacheResult> {
  if (!cachesAvailable()) return { total: urls.length, cached: 0, failed: urls };
  const cache = await caches.open(OFFLINE_CACHE);
  const failed: string[] = [];
  let cached = 0;

  for (let i = 0; i < urls.length; i += 1) {
    const url = urls[i];
    try {
      const existing = await cache.match(url);
      if (!existing) {
        const response = await fetch(url, { cache: 'reload' });
        if (!response.ok) throw new Error(String(response.status));
        await cache.put(url, response);
      }
      cached += 1;
    } catch {
      failed.push(url);
    }
    onProgress?.(i + 1, urls.length);
  }

  return { total: urls.length, cached, failed };
}

export async function cacheSubject(subjectId: SubjectId, onProgress?: (done: number, total: number) => void) {
  return cacheUrls(subjectOfflineUrls(subjectId), onProgress);
}

export async function clearDownloads(): Promise<void> {
  if (!cachesAvailable()) return;
  await caches.delete(OFFLINE_CACHE);
}

export async function cachedCount(): Promise<number> {
  if (!cachesAvailable()) return 0;
  const cache = await caches.open(OFFLINE_CACHE);
  const keys = await cache.keys();
  return keys.length;
}

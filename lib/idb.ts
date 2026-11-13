'use client';

/**
 * A deliberately tiny IndexedDB wrapper.
 *
 * The app stores one versioned snapshot under a single key. That is more than
 * enough for a personal learning record and avoids shipping a database library
 * in a bundle that has to work offline on a low-end phone.
 *
 * localStorage is written first (synchronous, survives tab crashes), and
 * IndexedDB is the durable copy. If IndexedDB is unavailable — private mode on
 * some iOS versions — the app silently keeps working on localStorage.
 */

const DB_NAME = 'auntie-angel';
const STORE = 'state';
const KEY = 'snapshot';

function hasIDB(): boolean {
  return typeof window !== 'undefined' && 'indexedDB' in window;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function idbGet<T>(): Promise<T | null> {
  if (!hasIDB()) return null;
  try {
    const db = await openDb();
    return await new Promise<T | null>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(KEY);
      req.onsuccess = () => resolve((req.result as T) ?? null);
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });
  } catch {
    return null;
  }
}

export async function idbSet<T>(value: T): Promise<void> {
  if (!hasIDB()) return;
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(value, KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    // Quota or private-mode failures are non-fatal.
  }
}

export async function idbClear(): Promise<void> {
  if (!hasIDB()) return;
  try {
    const db = await openDb();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).clear();
      tx.oncomplete = () => resolve();
    });
    db.close();
  } catch {
    /* ignore */
  }
}

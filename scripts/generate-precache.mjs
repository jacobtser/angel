/**
 * Build the service worker after `next build` has produced `out/`.
 *
 * The shell is every generated HTML page plus the hashed JS, CSS and font
 * files under `_next/static`. PDFs are deliberately excluded: they are large,
 * and the learner chooses which subject to save through the in-app download
 * button, which writes to the separate `auntie-angel-downloads-v1` cache.
 */
import { createHash } from 'node:crypto';
import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'out');
const templatePath = path.join(root, 'scripts', 'sw-template.js');

function toPosix(value) {
  return value.split(path.sep).join('/');
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

function routeForHtml(relative) {
  const posix = toPosix(relative);
  if (posix === 'index.html') return '/';
  if (posix.endsWith('/index.html')) return `/${posix.slice(0, -'index.html'.length)}`;
  return `/${posix}`;
}

function shouldPrecache(relative) {
  const posix = toPosix(relative);
  if (posix === 'sw.js') return false;
  if (posix.endsWith('.pdf') || posix.endsWith('.map')) return false;
  if (posix.endsWith('.mp4') || posix.endsWith('.webm') || posix.endsWith('.mov')) return false;
  if (posix.startsWith('papers/')) return false;
  if (posix.startsWith('videos/')) return false;
  if (posix.endsWith('.html')) return true;
  if (posix.startsWith('_next/static/')) return true;
  if (posix.startsWith('icons/')) return true;
  return ['manifest.webmanifest', 'og.png', 'favicon.ico'].includes(posix);
}

async function main() {
  try {
    await stat(outDir);
  } catch {
    console.error('No out/ directory found. Run `next build` first.');
    process.exit(1);
  }

  const files = await walk(outDir);
  const urls = [];
  let totalBytes = 0;

  for (const file of files) {
    const relative = path.relative(outDir, file);
    if (!shouldPrecache(relative)) continue;
    urls.push(relative.endsWith('.html') ? routeForHtml(relative) : `/${toPosix(relative)}`);
    totalBytes += (await stat(file)).size;
  }

  urls.sort();
  const version = createHash('sha256')
    .update(urls.join('\n'))
    .update(String(totalBytes))
    .digest('hex')
    .slice(0, 12);

  const template = await readFile(templatePath, 'utf8');
  const worker = template
    .replaceAll('__VERSION__', version)
    .replaceAll('__PRECACHE__', JSON.stringify(urls, null, 2));

  await writeFile(path.join(outDir, 'sw.js'), worker, 'utf8');
  console.log(
    `Service worker ${version}: ${urls.length} files, ${(totalBytes / 1024 / 1024).toFixed(2)} MB precached.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

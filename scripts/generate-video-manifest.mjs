import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'public', 'videos', 'english', 'orals');

async function sha256(file) {
  const buf = await readFile(file);
  return createHash('sha256').update(buf).digest('hex');
}

async function main() {
  const files = (await readdir(dir)).filter((f) => f.endsWith('.mp4')).sort();
  const entries = [];
  for (const f of files) {
    const full = path.join(dir, f);
    const buf = await readFile(full);
    entries.push({
      file: f,
      youtubeId: f.replace(/\.mp4$/, ''),
      bytes: buf.length,
      sha256: createHash('sha256').update(buf).digest('hex'),
    });
  }
  const out = {
    generatedAt: new Date().toISOString(),
    count: entries.length,
    totalBytes: entries.reduce((n, e) => n + e.bytes, 0),
    entries,
  };
  await writeFile(path.join(dir, 'manifest.json'), JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${entries.length} entries to public/videos/english/orals/manifest.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });

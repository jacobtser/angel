import { describe, expect, it } from 'vitest';
import { oralVideos } from '../content/oral-videos';
import fs from 'node:fs';
import path from 'node:path';

describe('oral videos content', () => {
  it('has unique ids and youtubeIds', () => {
    const ids = new Set();
    const yt = new Set();
    for (const v of oralVideos) {
      expect(ids.has(v.id)).toBe(false);
      expect(yt.has(v.youtubeId)).toBe(false);
      ids.add(v.id);
      yt.add(v.youtubeId);
    }
  });

  it('references existing local video files', () => {
    for (const v of oralVideos) {
      const rel = v.src.replace(/^\//, '');
      const file = path.resolve(process.cwd(), 'public', rel);
      expect(fs.existsSync(file), `missing ${v.src}`).toBe(true);
    }
  });
});

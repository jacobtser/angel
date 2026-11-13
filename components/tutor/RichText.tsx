import { cn } from '@/lib/cn';

function inline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={key} className="rounded bg-[var(--bg-sunk)] px-1 py-0.5 text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

/**
 * A deliberately small Markdown renderer for tutor replies.
 *
 * It supports the handful of things Jacob actually uses — paragraphs,
 * bold, inline code, bullets, numbered steps and quotes — without shipping a
 * parser or letting raw HTML through.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushList = () => {
    if (!list) return;
    const Tag = list.ordered ? 'ol' : 'ul';
    blocks.push(
      <Tag
        key={`list-${blocks.length}`}
        className={cn(
          'my-2 space-y-1.5 pl-5',
          list.ordered ? 'list-decimal' : 'list-disc',
          'marker:text-leaf',
        )}
      >
        {list.items.map((item, index) => (
          <li key={index} className="pl-0.5">
            {inline(item, `li-${blocks.length}-${index}`)}
          </li>
        ))}
      </Tag>,
    );
    list = null;
  };

  lines.forEach((raw, index) => {
    const line = raw.trim();
    if (!line) {
      flushList();
      return;
    }

    const ordered = line.match(/^(\d+)[.)]\s+(.*)$/);
    const bullet = line.match(/^[-*+]\s+(.*)$/);
    if (ordered) {
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(ordered[2]);
      return;
    }
    if (bullet) {
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(bullet[1]);
      return;
    }

    flushList();

    if (line.startsWith('>')) {
      blocks.push(
        <blockquote
          key={`q-${index}`}
          className="my-2 border-l-2 border-[var(--gold)] pl-3 text-[0.92em] italic text-soft"
        >
          {inline(line.replace(/^>\s?/, ''), `q-${index}`)}
        </blockquote>,
      );
      return;
    }

    if (line.startsWith('### ')) {
      blocks.push(
        <p key={`h-${index}`} className="mt-3 font-semibold text-ink">
          {inline(line.slice(4), `h-${index}`)}
        </p>,
      );
      return;
    }

    blocks.push(
      <p key={`p-${index}`} className="my-1.5 first:mt-0 last:mb-0">
        {inline(line, `p-${index}`)}
      </p>,
    );
  });
  flushList();

  return <div className={className}>{blocks}</div>;
}


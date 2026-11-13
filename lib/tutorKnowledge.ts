import type { LiteratureText, PastPaper, PastQuestion, SubjectId, SubjectMeta, Topic } from './types';
import { subjectById } from '@/content/subjects';

function trim(s: string | undefined, max = 400): string {
  if (!s) return '';
  const t = s.replace(/\s+/g, ' ').trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

function lines(parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join('\n');
}

export function buildSubjectKnowledge(subjectId: SubjectId): string {
  const s: SubjectMeta | undefined = subjectById[subjectId];
  if (!s) return '';
  const topics = s.topics
    .map((t, i) => `${i + 1}. ${t.title} (${t.difficulty}, ~${t.readMinutes}m): ${trim(t.summary, 180)} — Big idea: ${trim(t.lesson.bigIdea, 180)}`)
    .join('\n');
  return lines([
    `SUBJECT: ${s.name} (priority ${s.priority})`,
    `Tagline: ${s.tagline}`,
    `What this means: ${trim(s.description, 300)}`,
    s.examShape?.length ? `Exam shape:\n- ${s.examShape.join('\n- ')}` : '',
    s.passNote ? `Pass note: ${trim(s.passNote, 220)}` : '',
    `Topics/modules:\n${topics}`,
  ]);
}

export function buildTopicKnowledge(topic: Topic): string {
  const s = subjectById[topic.subject];
  const lesson = topic.lesson;
  const worked = lesson.worked
    .slice(0, 4)
    .map((w, i) => {
      const steps = w.steps.map((st, j) => `  ${j + 1}. ${st.label}: ${trim(st.detail, 220)}`).join('\n');
      return `Worked example ${i + 1}: ${trim(w.question, 260)}\n${steps}\n  Answer: ${trim(w.answer, 260)}\n  Why: ${trim(w.why, 220)}`;
    })
    .join('\n');
  const deeper = lesson.deeper?.slice(0, 4).map((d) => `- ${d.title}: ${trim(d.body, 220)}`).join('\n') || '';
  const quiz = topic.quiz
    .slice(0, 12)
    .map((q, i) => {
      const opts = q.options.map((o, j) => `${String.fromCharCode(65 + j)}. ${trim(o, 120)}`).join(' | ');
      const ans = q.options[q.answer] ? `${String.fromCharCode(65 + q.answer)}. ${trim(q.options[q.answer], 120)}` : String(q.answer);
      return `Q${i + 1} (${q.difficulty || 'core'}): ${trim(q.prompt, 260)}${q.passage ? `\n  Passage: ${trim(q.passage, 260)}` : ''}\n  Options: ${opts}\n  Answer: ${ans}\n  Explanation: ${trim(q.explanation, 260)}`;
    })
    .join('\n');
  const cards = topic.flashcards?.slice(0, 10).map((c) => `- ${trim(c.front, 120)} => ${trim(c.back, 180)}`).join('\n') || '';

  return lines([
    `SUBJECT: ${s?.name || topic.subject}`,
    `TOPIC/MODULE: ${topic.title} (${topic.difficulty}, ~${topic.readMinutes} min read)`,
    `Summary: ${trim(topic.summary, 300)}`,
    `Exam weight/focus: ${trim(topic.examWeight, 220)}`,
    `BIG IDEA: ${trim(lesson.bigIdea, 400)}`,
    lesson.analogy ? `ANALOGY — ${lesson.analogy.title}: ${trim(lesson.analogy.body, 320)}` : '',
    lesson.example ? `EXAMPLE — ${lesson.example.title}: ${trim(lesson.example.body, 320)}` : '',
    worked ? `WORKED EXAMPLES:\n${worked}` : '',
    deeper ? `DEEPER DIVE:\n${deeper}` : '',
    lesson.pitfalls?.length ? `PITFALLS/MISTAKES TO AVOID:\n- ${lesson.pitfalls.join('\n- ')}` : '',
    lesson.examTip ? `EXAM TIP: ${trim(lesson.examTip, 260)}` : '',
    quiz ? `PRACTICE QUESTIONS (with answers/explanations — use for guided checking, not to give away immediately):\n${quiz}` : '',
    cards ? `FLASHCARD FACTS:\n${cards}` : '',
  ]);
}

export function buildLiteratureKnowledge(text: LiteratureText, cycleNote?: string): string {
  const structure = text.structure?.slice(0, 12).map((p) => `- ${p.label} ${p.title}: ${trim(p.summary, 220)}`).join('\n') || '';
  const chars = text.characters?.slice(0, 12).map((c) => `- ${c.name} (${c.role}) traits: ${c.traits?.join(', ') || ''}. Arc: ${trim(c.arc, 200)}`).join('\n') || '';
  const themes = text.themes?.slice(0, 10).map((t) => `- ${t.title}: ${trim(t.body, 220)} Evidence: ${trim(t.evidence, 180)}`).join('\n') || '';
  const symbols = text.symbols?.slice(0, 10).map((s) => `- ${s.name}: ${trim(s.meaning, 180)}`).join('\n') || '';
  const quotes = text.quotes?.slice(0, 12).map((q) => `- “${trim(q.text, 160)}” — ${q.who}. Context: ${trim(q.context, 140)}. Use: ${trim(q.use, 140)}`).join('\n') || '';
  const prompts = text.essayPrompts?.slice(0, 8).map((p, i) => `${i + 1}. ${trim(p, 220)}`).join('\n') || '';
  const focus = text.examFocus?.slice(0, 10).map((f) => `- ${trim(f, 180)}`).join('\n') || '';

  return lines([
    `LITERATURE TEXT: ${text.title} by ${text.author} (${text.genre}, ${text.origin}, ${text.year})`,
    `Cycle: ${text.cycle}`,
    `Setting: ${trim(text.setting, 220)}`,
    `Overview: ${trim(text.blurb, 320)}`,
    `Why it matters: ${trim(text.whyItMatters, 320)}`,
    structure ? `${text.structureLabel || 'Structure'}:\n${structure}` : '',
    chars ? `CHARACTERS:\n${chars}` : '',
    themes ? `THEMES:\n${themes}` : '',
    symbols ? `SYMBOLS/MOTIFS:\n${symbols}` : '',
    quotes ? `KEY QUOTATIONS (use accurately):\n${quotes}` : '',
    prompts ? `ESSAY PROMPTS:\n${prompts}` : '',
    focus ? `EXAM FOCUS:\n${focus}` : '',
    text.sourceNote ? `Source note: ${trim(text.sourceNote, 240)}` : '',
    cycleNote ? `Cycle note: ${trim(cycleNote, 260)}` : '',
  ]);
}

export function buildPaperQuestionKnowledge(paper: PastPaper, item: PastQuestion): string {
  const s = subjectById[paper.subject];
  const steps = item.steps?.length ? `Steps/working:\n${item.steps.map((st, i) => `${i + 1}. ${trim(st, 260)}`).join('\n')}` : '';
  return lines([
    `PAST PAPER: ${paper.label} (${paper.year}, ${s?.name || paper.subject})`,
    paper.note ? `Paper note: ${trim(paper.note, 240)}` : '',
    paper.source ? `Source: ${trim(paper.source, 200)}` : '',
    `ITEM ${item.n}: ${trim(item.q, 600)}`,
    `MODEL ANSWER: ${trim(item.a, 800)}`,
    steps,
    item.why ? `WHY: ${trim(item.why, 400)}` : '',
    item.tip ? `TIP: ${trim(item.tip, 240)}` : '',
    item.flag ? `FLAG: answer/scan uncertain — verify against the original paper.` : '',
    'Guidance: help the learner reason toward the answer; do not reveal the full model answer immediately unless they ask after attempting.',
  ]);
}

export function buildPaperOverviewKnowledge(paper: PastPaper): string {
  const s = subjectById[paper.subject];
  const sample = paper.items.slice(0, 6).map((it) => `- Q${it.n}: ${trim(it.q, 140)} (Ans: ${trim(it.a, 120)})`).join('\n');
  return lines([
    `PAST PAPER: ${paper.label} (${paper.year}, ${s?.name || paper.subject})`,
    paper.note ? `Note: ${trim(paper.note, 260)}` : '',
    paper.source ? `Source: ${trim(paper.source, 200)}` : '',
    `Items: ${paper.items.length}`,
    sample ? `Sample items:\n${sample}` : '',
  ]);
}

export function buildSiteKnowledgeSummary(): string {
  return lines([
    'SITE: Auntie Angel — offline-first WASSCE study companion (English Language, Core Mathematics, Management in Living).',
    'Modules include: subject/topic lessons (big idea, analogy, worked examples, pitfalls, exam tips), practice quizzes/mocks/diagnostics/fix/review cards, past papers with worked/model answers, English literature set-text notes, oral English drills, games, journal/wellbeing, progress/readiness tracking.',
    'Tutor role: Jacob is Socratic, concise by default, detailed when asked; uses on-screen/module knowledge to guide accurately without inventing facts.',
  ]);
}

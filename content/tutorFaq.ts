/**
 * Offline tutor knowledge base.
 *
 * Jacob should still be useful when the network disappears. These
 * entries are matched on keywords and returned as warm, practical replies.
 * They are deliberately Socratic: a question, a small step, an invitation.
 */

export interface TutorFaq {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
}

export const tutorFaqs: TutorFaq[] = [
  {
    id: 'summary',
    keywords: ['summary', 'summarise', 'summarize', 'precis', 'precis'],
    question: 'How do I write a summary without copying the passage?',
    answer:
      'Start by finding the **points**, not the sentences.\n\n1. Read the question and underline exactly what it asks for.\n2. Go back to the passage and mark one phrase for each point.\n3. Cover the passage and say the point out loud in your own words.\n4. Write it down, then count the words.\n\nThe test: if you can read your sentence without looking at the passage and still know the point, it is a summary. If it copies the original phrasing, it is a lift.\n\nTry one point now: what is the main cause in the passage, and what is its effect?',
  },
  {
    id: 'essay',
    keywords: ['essay', 'composition', 'introduction', 'conclusion', 'paragraph', 'letter'],
    question: 'How do I plan an essay quickly?',
    answer:
      'Use five minutes and three lines:\n\n- **Claim:** what am I saying?\n- **Three jobs:** one sentence for each body paragraph.\n- **So what:** why does the claim matter?\n\nFor a formal letter, add the format frame (addresses, date, salutation, heading, close). For an argument, decide whether you agree, disagree, or agree with a condition. A qualified position (“yes, but only when…”) usually gives you more to write than a blunt one.\n\nWhat is the essay question? Give it to me and I will help you shape the three jobs — not write it for you.',
  },
  {
    id: 'maths-stuck',
    keywords: ['maths', 'math', 'algebra', 'equation', 'solve', 'stuck', 'formula'],
    question: 'I’m stuck on a maths question. Where do I start?',
    answer:
      'Do not look for the formula first. Look for **what is known and what is asked**.\n\n1. Write the given values with their units.\n2. Write what you must find.\n3. Ask which relationship connects them (a law, a formula, a ratio).\n4. Substitute, then solve one line at a time.\n\nIf you are still stuck, try a smaller version of the problem with easier numbers. The method usually becomes visible.\n\nPaste the question here (or tell me the topic) and I will ask you one guiding question at a time.',
  },
  {
    id: 'maths-show-work',
    keywords: ['working', 'method marks', 'show', 'steps', 'marks'],
    question: 'Do I have to show all my working?',
    answer:
      'Yes — especially in Paper 2. WAEC awards method marks, so a correct method with an arithmetic slip still earns something. A bare answer with no working earns only the final mark, if that.\n\nWrite the formula, substitute the values, then solve. Label units and, for modular or set questions, write the answer in the form requested (for example a truth set).\n\nWhat question are you working on? Show me your first line and I will tell you whether it is on the right track.',
  },
  {
    id: 'comprehension',
    keywords: ['comprehension', 'passage', 'inference', 'understand', 'reading'],
    question: 'How do I answer comprehension questions faster?',
    answer:
      'Read the **questions first**, then the passage. That sounds backwards, but it gives your brain a hunting list.\n\n- For a “why” question, find the cause, not the topic.\n- For an “inference” question, find the evidence first, then take one careful step beyond it.\n- For a “meaning in context” question, substitute your answer back into the sentence.\n\nNever answer from general knowledge when the passage has its own opinion. The examiner wants the writer’s view.\n\nWhich question type slows you down most?',
  },
  {
    id: 'mil-application',
    keywords: ['mil', 'management', 'family', 'food', 'nutrition', 'budget', 'consumer', 'clothing'],
    question: 'How do I get better at Management in Living?',
    answer:
      'MIL rewards **application**, not definition dumps. For any topic, practise this chain:\n\n- Name the concept.\n- Explain the need it meets.\n- Give a specific Ghanaian example.\n- State one strength and one limitation.\n- Suggest a practical action.\n\nFor a budget question, show income, expenditure and balance. For a nutrition question, link nutrient → function → local source → deficiency. For a family question, name the family type, then discuss roles and resources.\n\nGive me a scenario and I will help you build the chain.',
  },
  {
    id: 'anxiety',
    keywords: ['anxious', 'anxiety', 'panic', 'scared', 'fear', 'nervous', 'fail', 'failing'],
    question: 'I feel like I’m going to fail again.',
    answer:
      'That fear makes sense. You have sat this before, and your brain is trying to protect you from another disappointment. It is not a prediction.\n\nLet’s shrink the next ten minutes. Not the whole exam — just the next question. Read it once. Underline what it asks. Write one step. You are allowed to stop after that if you need to.\n\nIf the fear is sitting on your chest, breathe out longer than you breathe in for five breaths. Then come back. I am here, and we can go slowly.\n\nWhat is the smallest thing you could do right now?',
  },
  {
    id: 'burnout',
    keywords: ['tired', 'burnout', 'exhausted', 'break', 'sleep', 'rest', 'overwhelmed'],
    question: 'I’m exhausted but I feel guilty stopping.',
    answer:
      'Guilt is not evidence that you should keep going. Tired brains make more mistakes, read more slowly and remember less. Rest is not the opposite of preparation; it is part of it.\n\nTry a real break: stand up, drink water, look at something far away, and set a timer for fifteen minutes. No scrolling — scrolling is not rest.\n\nWhen you come back, choose one small task, not the whole syllabus. What would “small” look like today?',
  },
  {
    id: 'flashcards',
    keywords: ['flashcard', 'memory', 'remember', 'forget', 'revise', 'revision'],
    question: 'How do I remember what I revise?',
    answer:
      'Recall beats rereading. Close the book and try to say the idea from memory. If you can, you are learning. If you cannot, look, close again, and retry. The struggle is the point — it is what tells your brain the information matters.\n\nThe app schedules cards with spaced repetition: cards return just before you would forget them. Rate honestly. “Again” is not failure; it is data.\n\nName one thing you want to remember. Say it to me without looking, and I will help you test it.',
  },
  {
    id: 'literature',
    keywords: ['literature', 'novel', 'poem', 'poetry', 'drama', 'character', 'theme', 'quote', 'treasure island', 'kaya', 'umbele'],
    question: 'How do I write a literature answer?',
    answer:
      'Use the **point → evidence → effect** shape.\n\n- **Point:** answer the question in one sentence.\n- **Evidence:** a short quotation or a precise moment from the text.\n- **Effect:** what that evidence shows about character, theme or technique.\n\nFor extract questions, first say who is speaking, to whom, and what is happening. Then analyse. Do not retell the whole plot.\n\nWhich text and question are you working on? I will help you build one paragraph, not hand you a finished essay.',
  },
  {
    id: 'time',
    keywords: ['time', 'clock', 'too slow', 'fast', 'minutes', 'timing'],
    question: 'I always run out of time in exams.',
    answer:
      'Time loss is usually a **decision problem**, not a speed problem. You stay too long on a question because leaving it feels like giving up.\n\nBefore the exam, decide your checkpoints. For a 2-hour paper, know where you should be at 30, 60 and 90 minutes. If a question is still resisting after its share of time, write what you have, mark it, and move on. You can return.\n\nPractise with a timer once this week, even for 20 minutes. What paper are you timing?',
  },
  {
    id: 'who',
    keywords: ['who are you', 'your name', 'Jacob', 'are you real'],
    question: 'Who are you?',
    answer:
      'I’m Jacob — your study companion inside Auntie Angel. I am not a teacher who will make you feel small, and I am not here to hand you answers to copy.\n\nMy job is to ask the next useful question, explain a step you missed, and help you build enough evidence that you trust yourself on exam day.\n\nYou can also use me offline: I have a small bank of study guidance stored on this device. When you are online, I can go deeper.\n\nWhat are we working on today?',
  },
];

export function matchFaq(text: string): TutorFaq | null {
  const lower = text.toLowerCase();
  let best: { faq: TutorFaq; score: number } | null = null;
  for (const faq of tutorFaqs) {
    const score = faq.keywords.reduce((n, k) => (lower.includes(k) ? n + 1 : n), 0);
    if (score > 0 && (!best || score > best.score)) best = { faq, score };
  }
  return best?.faq ?? null;
}


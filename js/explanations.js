/* ============================================================
   Explanations page
   Data lives here so a new question can be added without
   touching markup. Replace sample content with real papers.
   ============================================================ */

const PAPERS = {
  english: {
    title: 'English Language',
    sub: 'Sample paper · Comprehension, grammar and literature.',
    pdf: 'English%20Language/WASSCE/wassce%202023%20english.pdf',
    questions: [
      {
        n: 'Section A · Q1',
        prompt: 'Read the passage and answer the question that follows: "The rain had barely stopped when the children rushed outside, their laughter echoing through the empty compound." What does the phrase "their laughter echoing" suggest about the children?',
        answer: 'It suggests the children were eager, energetic and relieved — and that the compound was quiet enough for sound to carry.',
        steps: [
          'Identify the key phrase: "their laughter echoing through the empty compound".',
          'Note the verb "echoing" — sound bouncing back implies a large, quiet, unoccupied space.',
          '"Rushed outside" signals eagerness and pent-up energy after being kept indoors by rain.',
          'Combine both clues: eagerness + an empty, quiet setting = relief and lively energy.',
          'Write the answer as a full sentence, quoting the phrase to support the point.'
        ],
        tip: 'In comprehension, always anchor your answer in a quoted phrase — examiners award marks for evidence, not just opinion.'
      },
      {
        n: 'Section B · Q3',
        prompt: 'Rewrite the following sentence in reported speech: "I will finish the assignment tomorrow," said Ama.',
        answer: 'Ama said that she would finish the assignment the following day.',
        steps: [
          'Drop the quotation marks and remove the comma.',
          'Add the conjunction "that" after the reporting verb ("said").',
          'Change the pronoun: "I" becomes "she" (the speaker is Ama).',
          'Backshift the tense: "will finish" becomes "would finish".',
          'Change the time expression: "tomorrow" becomes "the following day".'
        ],
        tip: 'Reported speech needs four changes at once — pronoun, tense, time word, and punctuation. Check all four before moving on.'
      }
    ]
  },

  mathematics: {
    title: 'Mathematics',
    sub: 'Sample paper · Algebra, geometry and statistics.',
    pdf: 'Core%20Mathematics/WASSCE/KUULCHAT_2021%20Mathematics.pdf',
    questions: [
      {
        n: 'Q4',
        prompt: 'Simplify: 3(2x − 5) + 4x',
        answer: '10x − 15',
        steps: [
          'Expand the bracket: 3 × 2x = 6x, and 3 × (−5) = −15. So the expression becomes 6x − 15 + 4x.',
          'Group like terms together: (6x + 4x) − 15.',
          'Add the coefficients of x: 6 + 4 = 10.',
          'Write the final simplified expression: 10x − 15.'
        ],
        tip: 'Watch the sign when multiplying a negative: 3 × (−5) = −15, not +15.'
      },
      {
        n: 'Q7',
        prompt: 'A rectangle has a length of (x + 3) cm and a width of 4 cm. If its area is 32 cm², find x.',
        answer: 'x = 5',
        steps: [
          'Recall the area formula: Area = length × width.',
          'Substitute the given values: 4(x + 3) = 32.',
          'Divide both sides by 4: x + 3 = 8.',
          'Subtract 3 from both sides: x = 5.',
          'Check: length = 5 + 3 = 8 cm; 8 × 4 = 32 cm². ✓'
        ],
        tip: 'Always substitute your answer back into the original equation — it catches arithmetic slips in seconds.'
      }
    ]
  },

  management: {
    title: 'Management in Living',
    sub: 'Sample paper · Family, resources and nutrition.',
    pdf: 'papers.html?subject=management',
    questions: [
      {
        n: 'Q2',
        prompt: 'State four ways a family can manage its resources effectively.',
        answer: 'Planning, budgeting, prioritising needs, and reviewing expenditure.',
        steps: [
          'Define the scope: "resources" includes money, time, energy and skills.',
          'Identify planning — deciding goals in advance prevents waste.',
          'Identify budgeting — allocating a specific amount to each need controls spending.',
          'Identify prioritisation — separating needs from wants ensures essentials are covered first.',
          'Identify review — checking spending regularly allows the family to correct course.'
        ],
        tip: 'For "state four ways" questions, give four distinct points. Repeating the same idea in different words earns only one mark.'
      },
      {
        n: 'Q5',
        prompt: 'Explain the importance of protein in the diet of an adolescent.',
        answer: 'Protein supports rapid growth, tissue repair, and the development of muscles and organs during adolescence.',
        steps: [
          'Identify the group: adolescents are undergoing a growth spurt, so requirements are elevated.',
          'State the primary function of protein: growth and repair of body tissues.',
          'Link to adolescence specifically: muscle development, organ growth, and hormone production.',
          'Mention the consequence of deficiency: stunted growth and slow wound healing.'
        ],
        tip: 'When a question names a life stage, your answer must say why that stage matters — generic protein facts alone lose marks.'
      }
    ]
  }
};

const SUBJECT_LABELS = {
  english: 'English Language',
  mathematics: 'Mathematics',
  management: 'Management in Living'
};

function getSubjectKey() {
  const raw = new URLSearchParams(window.location.search).get('subject') || 'mathematics';
  return PAPERS[raw] ? raw : 'mathematics';
}

function render() {
  const key = getSubjectKey();
  const paper = PAPERS[key];

  document.title = `${paper.title} · Detailed Explanations — Kabete YC Smart Exam Hub`;
  document.getElementById('crumb-subject').textContent = paper.title;
  document.getElementById('paper-title').textContent = `${paper.title} — Detailed Explanations`;
  document.getElementById('paper-sub').textContent = paper.sub;
  document.getElementById('download-link').href = paper.pdf;

  const list = document.getElementById('question-list');
  list.innerHTML = paper.questions.map((q, i) => `
    <article class="question-card" ${i === 0 ? '' : ''}>
      <header class="question-head">
        <span class="q-index">${q.n}</span>
        <span class="ai-badge">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg>
          AI breakdown
        </span>
      </header>
      <p class="question-prompt">${q.prompt}</p>
      <div class="answer-box">
        <span class="answer-label">Answer</span>
        <p>${q.answer}</p>
      </div>
      <div class="steps-block">
        <h3>Step-by-step</h3>
        <ol class="steps">
          ${q.steps.map(s => `<li>${s}</li>`).join('')}
        </ol>
      </div>
      <p class="tip"><strong>Exam tip:</strong> ${q.tip}</p>
    </article>
  `).join('');

  document.getElementById('year').textContent = new Date().getFullYear();
}

render();

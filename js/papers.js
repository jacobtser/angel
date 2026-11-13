/* ============================================================
   Paper browser.
   PAPER_FILES maps each subject to the real PDFs already in the
   repo. Paths are URL-encoded because the folders contain spaces.
   When you add a paper, add one line here.
   ============================================================ */

const SUBJECT_META = {
  english: {
    label: 'English Language',
    explain: 'explanations.html?subject=english',
    papers: [
      { name: 'WASSCE 2023 English Language', file: 'English%20Language/WASSCE/wassce%202023%20english.pdf', level: 'WASSCE' },
      { name: 'WASSCE 2020 English Language', file: 'English%20Language/WASSCE/wassce%202020%20english.pdf', level: 'WASSCE' },
      { name: 'WAEC May/June 2016 · Paper 2', file: 'English%20Language/WASSCE/WASSCE_WAEC_MAY_JUNE_2016_ENGLISH_LANGUAGE_PAPER_2_1_THEORY_OBJECTIVES.pdf', level: 'WASSCE' },
      { name: 'WAEC 2012 English Language', file: 'English%20Language/WASSCE/waec-2012-english.pdf', level: 'WASSCE' },
      { name: 'WAEC English Language (LIFEMAG)', file: 'English%20Language/WASSCE/LIFEMAG_waec-_-english.pdf', level: 'WASSCE' },
      { name: 'WAEC English Language', file: 'English%20Language/WASSCE/waec-_-english.pdf', level: 'WASSCE' },
      { name: 'English Language (standard)', file: 'English%20Language/WASSCE/ENGLISH-LANGUAGE.pdf', level: 'WASSCE' },
      { name: 'SS1 English Practice Questions', file: 'English%20Language/WASSCE/SS1-ENGLISH-PRACTICE-QUESTIONS.pdf', level: 'Practice' }
    ]
  },
  mathematics: {
    label: 'Mathematics',
    explain: 'explanations.html?subject=mathematics',
    papers: [
      { name: 'KUULCHAT 2021 Mathematics', file: 'Core%20Mathematics/WASSCE/KUULCHAT_2021%20Mathematics.pdf', level: 'WASSCE' },
      { name: 'General Mathematics / Core Mathematics', file: 'Core%20Mathematics/WASSCE/GENERAL-MATHEMATICS-OR-MATHEMATICS-CORE.pdf', level: 'WASSCE' }
    ]
  },
  management: {
    label: 'Management in Living',
    explain: 'explanations.html?subject=management',
    papers: []
  }
};

function render() {
  const groups = document.getElementById('paper-groups');
  const only = new URLSearchParams(window.location.search).get('subject');
  const keys = only && SUBJECT_META[only] ? [only] : Object.keys(SUBJECT_META);
  const parts = [];

  for (const key of keys) {
    const meta = SUBJECT_META[key];
    const rows = meta.papers.length
      ? meta.papers.map(p => `
          <li class="paper-row">
            <div class="paper-info">
              <span class="paper-name">${p.name}</span>
              <span class="paper-level">${p.level}</span>
            </div>
            <a class="btn btn-outline btn-sm" href="${p.file}" download>Download PDF</a>
          </li>`).join('')
      : `<li class="paper-empty">No past papers uploaded yet. Add PDFs to <code>Management in Living/WASSCE/</code>.</li>`;

    parts.push(`
      <section class="paper-group">
        <div class="paper-group-head">
          <h2>${meta.label}</h2>
          <a class="btn btn-ai btn-sm" href="explanations.html?subject=${key}">Explore explanations</a>
        </div>
        <ul class="paper-list">${rows}</ul>
      </section>`);
  }

  groups.innerHTML = parts.join('');
  const title = document.getElementById('papers-title');
  if (only && SUBJECT_META[only]) {
    title.textContent = `${SUBJECT_META[only].label} — Past Papers`;
    groups.insertAdjacentHTML('beforeend', '<p class="browse-all-wrap"><a class="browse-all" href="papers.html">View papers for all subjects &rarr;</a></p>');
  }
  document.getElementById('year').textContent = new Date().getFullYear();
}

render();

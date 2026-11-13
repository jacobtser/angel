/* ============================================================
   Study guide renderer.
   Guide data lives in js/guides/<subject>.js and registers
   itself on window.GUIDES.
   ============================================================ */

window.GUIDES = window.GUIDES || {};

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderFormat(items) {
  return items.map(f => `
    <div class="format-chip">
      <span class="format-label">${esc(f.label)}</span>
      <span class="format-detail">${esc(f.detail)}</span>
    </div>`).join('');
}

function renderTopics(topics) {
  return topics.map((t, i) => `
    <article class="topic-card">
      <div class="topic-head">
        <span class="topic-num">${String(i + 1).padStart(2, '0')}</span>
        <h3>${esc(t.name)}</h3>
      </div>
      <p class="topic-concept">${esc(t.concept)}</p>
      <ul class="topic-points">
        ${t.points.map(p => `<li>${esc(p)}</li>`).join('')}
      </ul>
    </article>`).join('');
}

function renderQuestions(questions) {
  if (!questions || !questions.length) {
    return `<p class="paper-empty">No questions transcribed for this paper yet. Add entries to the guide data file.</p>`;
  }
  return questions.map(q => `
    <details class="qa" ${q.open ? 'open' : ''}>
      <summary class="qa-summary">
        <span class="qa-n">${esc(q.n)}</span>
        <span class="qa-q">${esc(q.q)}</span>
        ${q.flag ? `<span class="qa-flag" title="Answer uncertain — the source scan is damaged">check</span>` : ''}
        <span class="qa-chevron" aria-hidden="true"></span>
      </summary>
      <div class="qa-body">
        <div class="answer-box">
          <span class="answer-label">Answer</span>
          <p>${esc(q.a)}</p>
        </div>
        ${q.steps && q.steps.length ? `
        <div class="steps-block">
          <h3>Step-by-step</h3>
          <ol class="steps">
            ${q.steps.map(s => `<li>${esc(s)}</li>`).join('')}
          </ol>
        </div>` : ''}
        ${q.why ? `<p class="qa-why">${esc(q.why)}</p>` : ''}
        ${q.tip ? `<p class="tip"><strong>Exam tip:</strong> ${esc(q.tip)}</p>` : ''}
      </div>
    </details>`).join('');
}

function renderWalkthrough(guide) {
  let html = '';
  if (guide.papers && guide.papers.length) {
    html = guide.papers.map(p => `
      <div class="paper-block">
        <h3 class="paper-block-title">${esc(p.name)}</h3>
        ${p.note ? `<p class="paper-block-note">${esc(p.note)}</p>` : ''}
        ${renderQuestions(p.questions)}
      </div>`).join('');
  } else {
    html = renderQuestions(guide.questions);
  }
  if (guide.closingNote) {
    html += `<p class="closing-note">${esc(guide.closingNote)}</p>`;
  }
  return html;
}

function render() {
  const key = new URLSearchParams(window.location.search).get('subject') || 'mathematics';
  const guide = window.GUIDES[key] || window.GUIDES.mathematics;

  document.title = `${guide.label} Study Guide — Kabete YC Smart Exam Hub`;
  document.getElementById('crumb-subject').textContent = guide.label;
  document.getElementById('guide-title').textContent = `${guide.label} — Study Guide`;
  document.getElementById('guide-sub').textContent = guide.summary;
  document.getElementById('guide-format').innerHTML = renderFormat(guide.format);
  document.getElementById('guide-pdf').href = guide.pdf;
  document.getElementById('guide-explain').href = `explanations.html?subject=${key}`;
  document.getElementById('topic-grid').innerHTML = renderTopics(guide.topics);
  document.getElementById('walkthrough-sub').textContent = guide.paperNote;
  document.getElementById('walkthrough').innerHTML = renderWalkthrough(guide);
  document.getElementById('year').textContent = new Date().getFullYear();
}

render();

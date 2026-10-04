import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
const binary = process.env.AGENT_BROWSER_BIN || 'agent-browser';
const baseUrl = process.env.TEST_BASE_URL || 'http://127.0.0.1:8765';
function browser(...args) {
  const result = JSON.parse(execFileSync(binary, ['--session', 'fte-confidence-qa', '--json', ...args], { encoding: 'utf8', timeout: 30000 }));
  assert.equal(result.success, true, JSON.stringify(result.error));
  return result.data;
}
try {
  browser('open', baseUrl);
  browser('set', 'viewport', '390', '844');
  let cases = 0;
  for (const exam of ['gh300', 'ai103', 'ab100']) {
    for (const level of ['low', 'medium', 'high']) {
      for (const correct of [true, false]) {
        for (const allAnswered of [false, true]) {
          browser('eval', `(() => {
            const answered = {};
            if (${allAnswered}) for (const q of window.FTE_CONTENT.questions.filter(q => q.exam === ${JSON.stringify(exam)})) {
              answered[q.id] = {correct:true, attempts:1, correctCount:1, streak:2, intervalDays:1, dueAt:new Date(Date.now()+86400000).toISOString()};
            }
            localStorage.setItem('microsoft-fte-study:v1', JSON.stringify({v:1,answered,modules:{},mock:{},target:{}}));
          })()`);
          browser('open', baseUrl);
          const result = browser('eval', `(() => {
            document.querySelector('[data-nav="practice"]').click();
            document.querySelector('[data-select-exam="${exam}"]').click();
            const id = document.querySelector('.qhead .small').textContent;
            const q = window.FTE_CONTENT.questions.find(q => q.id === id);
            const choice = ${correct} ? q.answer : (q.answer + 1) % q.options.length;
            document.querySelector('[data-choice="' + choice + '"]').click();
            document.querySelector('#check').click();
            window.scrollTo(0, document.body.scrollHeight);
            document.querySelector('[data-confidence="${level}"]').click();
            const saved = JSON.parse(localStorage.getItem('microsoft-fte-study:v1')).answered[id];
            const next = document.querySelector('.qhead .small').textContent;
            const nextQ = window.FTE_CONTENT.questions.find(q => q.id === next);
            return {advanced:next !== id, sameExam:nextQ.exam === q.exam, confidence:saved.confidence,
              correct:saved.correct, scheduled:Number.isFinite(Date.parse(saved.dueAt)),
              intervalDays:saved.intervalDays, unanswered:!document.querySelector('.feedback') && document.querySelector('#check').disabled,
              atTop:window.scrollY === 0};
          })()`);
          assert.deepEqual(result.result, {advanced:true, sameExam:true, confidence:level, correct, scheduled:true,
            intervalDays:correct ? ((allAnswered ? {low:2,medium:3,high:3} : {low:1,medium:2,high:5})[level]) : 1, unanswered:true, atTop:true});
          cases++;
        }
      }
    }
  }
  assert.deepEqual(browser('errors').errors, []);
  browser('screenshot', '/workspace/scratch/fte-confidence.png');
  console.log(`Confidence browser regression passed: ${cases} cases`);
} finally { browser('close'); }

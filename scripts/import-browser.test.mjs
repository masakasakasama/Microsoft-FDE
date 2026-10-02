import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
const binary = process.env.AGENT_BROWSER_BIN || 'agent-browser';
const baseUrl = process.env.TEST_BASE_URL || 'http://127.0.0.1:8765';
function browser(...args) {
  const result = JSON.parse(execFileSync(binary, ['--session', 'fte-import-qa', '--json', ...args], { encoding: 'utf8', timeout: 30000 }));
  assert.equal(result.success, true, JSON.stringify(result.error));
  return result.data;
}
try {
  browser('open', baseUrl);
  browser('eval', `localStorage.setItem('microsoft-fte-study:v1', JSON.stringify({v:1,answered:{q1:{correct:true,streak:2}},modules:{},mock:{},target:{gh300:''}})); location.reload();`);
  browser('eval', `document.querySelector('[data-nav="review"]').click()`);
  const result = browser('eval', `(async () => {
    const key = 'microsoft-fte-study:v1';
    const before = localStorage.getItem(key);
    const beforeHtml = document.querySelector('#app').innerHTML;
    async function memory() {
      const create = URL.createObjectURL, revoke = URL.revokeObjectURL, click = HTMLAnchorElement.prototype.click;
      let blob;
      try {
        URL.createObjectURL = value => { blob = value; return 'blob:fixture' };
        URL.revokeObjectURL = () => {};
        HTMLAnchorElement.prototype.click = () => {};
        document.querySelector('#export').click();
        return JSON.stringify(JSON.parse(await blob.text()));
      } finally { URL.createObjectURL = create; URL.revokeObjectURL = revoke; HTMLAnchorElement.prototype.click = click; }
    }
    const beforeMemory = await memory();
    const originalAlert = window.alert;
    let alerts = 0;
    window.alert = () => alerts++;
    const invoke = text => document.querySelector('#import').onchange({target:{files:[{text:async()=>text}]}});
    try {
      await invoke('{invalid JSON');
      await invoke(JSON.stringify({v:1,answered:null,modules:{},mock:{},target:{}}));
      if (localStorage.getItem(key) !== before || await memory() !== beforeMemory || document.querySelector('#app').innerHTML !== beforeHtml) throw Error('invalid import changed progress');
      const originalSet = Storage.prototype.setItem;
      try {
        Storage.prototype.setItem = function(){ throw new DOMException('full','QuotaExceededError') };
        await invoke(JSON.stringify({v:1,answered:{},modules:{},mock:{},target:{}}));
      } finally { Storage.prototype.setItem = originalSet; }
      if (localStorage.getItem(key) !== before || await memory() !== beforeMemory || document.querySelector('#app').innerHTML !== beforeHtml) throw Error('quota failure changed progress');
      await document.querySelector('#import').onchange({target:{files:[]}});
      if (alerts !== 3) throw Error('expected exactly three import errors');
      const accepted = {v:1,answered:{},modules:{},mock:{},target:{gh300:'2026-11-01'}};
      await invoke(JSON.stringify(accepted));
      if (localStorage.getItem(key) !== JSON.stringify(accepted)) throw Error('valid import not persisted');
      return {invalidJson:true, invalidShape:true, quotaFailure:true, cancel:true, validImport:true};
    } finally { window.alert = originalAlert; }
  })()`);
  assert.equal(result.result.validImport, true);
  assert.deepEqual(browser('errors').errors, []);
  console.log('Browser import regression passed:', result.result);
} finally { browser('close'); }

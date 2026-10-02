(() => {
const {exams,questions}=window.FTE_CONTENT;
const KEY="microsoft-fte-study:v1";
const state=load();
let view="home", selectedExam=currentExamId(), practiceId=null, checked=false, selected=null, examSession=null;

function load(){
  try{
    const p=JSON.parse(localStorage.getItem(KEY)||"null");
    if(p)return window.FTE_PROGRESS.parse(p);
  }catch{}
  return {v:1,answered:{},modules:{},mock:{},target:{gh300:"",ai103:"",ab100:""}};
}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function examQs(id){return questions.filter(q=>q.exam===id)}
function exam(id){return exams.find(e=>e.id===id)}
function stats(id){
  const qs=examQs(id), answered=qs.filter(q=>state.answered[q.id]), correct=qs.filter(q=>state.answered[q.id]?.correct);
  const mastered=qs.filter(q=>(state.answered[q.id]?.streak||0)>=2);
  const modulesDone=exam(id).modules.filter((_,i)=>state.modules[`${id}:${i}`]).length;
  const mock=state.mock[id]?.score||0;
  const readiness=Math.round((answered.length/qs.length)*25+(correct.length/qs.length)*30+(modulesDone/exam(id).modules.length)*15+(mastered.length/qs.length)*10+mock*.20);
  return {total:qs.length,answered:answered.length,correct:correct.length,mastered:mastered.length,modulesDone,mock,readiness:Math.min(100,readiness)}
}
function currentExamId(){
  for(const e of exams){if(statsSafe(e.id)<70)return e.id}
  return "ab100"
}
function statsSafe(id){
  try{
    const qs=examQs(id), answered=qs.filter(q=>state.answered[q.id]), correct=qs.filter(q=>state.answered[q.id]?.correct);
    const mastered=qs.filter(q=>(state.answered[q.id]?.streak||0)>=2);
    const modulesDone=exam(id).modules.filter((_,i)=>state.modules[`${id}:${i}`]).length;
    const mock=state.mock[id]?.score||0;
    return Math.min(100,Math.round((answered.length/qs.length)*25+(correct.length/qs.length)*30+(modulesDone/exam(id).modules.length)*15+(mastered.length/qs.length)*10+mock*.20));
  }catch{return 0}
}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]))}
function pct(x){return Math.max(0,Math.min(100,x))}
function bar(v){return `<div class="progress"><i style="width:${pct(v)}%"></i></div>`}
function currentExam(){return exam(selectedExam)}
function nextQuestion(id=selectedExam){
  const now=Date.now(), qs=examQs(id);
  return qs.find(q=>!state.answered[q.id]) ||
    qs.find(q=>state.answered[q.id]?.dueAt && new Date(state.answered[q.id].dueAt).getTime()<=now) ||
    qs.sort((a,b)=>(state.answered[a.id]?.streak||0)-(state.answered[b.id]?.streak||0))[0];
}
function dueCount(id){
  const now=Date.now();
  return examQs(id).filter(q=>state.answered[q.id]?.dueAt && new Date(state.answered[q.id].dueAt).getTime()<=now).length;
}
function markAnswer(q,idx){
  const prev=state.answered[q.id]||{attempts:0,correctCount:0,streak:0};
  const ok=idx===q.answer;
  state.answered[q.id]={...prev,attempts:prev.attempts+1,correctCount:prev.correctCount+(ok?1:0),streak:ok?prev.streak+1:0,lastSelected:idx,correct:ok,lastAt:new Date().toISOString(),confidence:null,dueAt:null,intervalDays:prev.intervalDays||0};
  save();
}
function confidence(q,level){
  const a=state.answered[q.id]; if(!a)return;
  const factors={low:1.2,medium:2.5,high:3.25}, first={low:1,medium:2,high:5}, back={low:.25,medium:.15,high:.05};
  let days;
  if(a.correct){
    days=a.correctCount<=1?first[level]:Math.max((a.intervalDays||1)+1,Math.round((a.intervalDays||1)*factors[level]));
  }else{
    days=Math.max(1,Math.round(Math.max(1,a.intervalDays||1)*back[level]));
  }
  a.confidence=level;a.intervalDays=days;a.dueAt=new Date(Date.now()+days*86400000).toISOString(); save();
  practice();
}
function nav(){
  return `<nav class="nav">
    ${[["home","Overview"],["study","Study"],["practice","Practice"],["mock","Mock"],["review","Review"]].map(([id,l])=>`<button data-nav="${id}" class="${view===id?"active":""}">${l}</button>`).join("")}
  </nav>`
}
function header(){
 return `<div class="topbar"><div class="brand"><div class="brandmark">FTE</div><div><h1>Microsoft FTE Study</h1><p>GH-300 → AI-103 → AB-100</p></div></div><div class="syncpill">Local progress · ${Object.keys(state.answered).length} answered</div></div>`
}
function shell(body){document.querySelector("#app").innerHTML=`<main class="shell">${header()}${body}</main>${nav()}`; bindNav()}
function bindNav(){document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>{view=b.dataset.nav;checked=false;selected=null;render()})}

function home(){
  const all=exams.map(e=>stats(e.id)), overall=Math.round(all.reduce((s,x)=>s+x.readiness,0)/all.length);
  const current=exam(currentExamId());
  shell(`
    <section class="hero">
      <div class="card"><span class="badge">FTE badge path</span><h2>GH-300から順番に、3試験を潰す</h2><p>CPRE学習アプリと同じ考え方で、網羅率、正答済み率、反復定着、模試を分けて追跡</p></div>
      <div class="card scorebox"><div><div class="label">OVERALL READINESS</div><div class="bigscore">${overall}<small>%</small></div>${bar(overall)}</div><div><div class="label">CURRENT</div><b>${current.code}</b></div></div>
    </section>
    <div class="notice">定着度 = 網羅率25% + 全問題中の正答済み率30% + Study完了15% + 2回以上連続正解10% + 最新模試20%。少数問だけ正解しても過大評価しません</div>
    <div class="section-title"><h2>Certification path</h2><p>推奨順</p></div>
    <section class="grid">${exams.map((e,i)=>examCard(e,i)).join("")}</section>
    <div class="section-title"><h2>Today</h2><p>${new Date().toLocaleDateString("ja-JP")}</p></div>
    <section class="kpis">
      ${all.map((s,i)=>`<div class="card kpi"><span>${exams[i].code}</span><b>${s.readiness}%</b><span>${s.answered}/${s.total} covered · due ${dueCount(exams[i].id)}</span></div>`).join("")}
      <div class="card kpi"><span>Next action</span><b>${current.code}</b><span>${stats(current.id).answered===0?"Study guide → Practice":dueCount(current.id)?"Review due questions":"Continue practice"}</span></div>
    </section>
  `);
  document.querySelectorAll("[data-exam]").forEach(b=>b.onclick=()=>{selectedExam=b.dataset.exam;view=b.dataset.go||"study";render()});
}
function examCard(e,i){
  const s=stats(e.id);
  return `<article class="card examcard"><div class="num">0${i+1}</div><span class="badge">${e.code}</span><h3>${e.code}</h3><div class="name">${esc(e.name)}</div>
    <div class="meta"><span>${e.hours}</span><span>${e.examTime}</span><span>${e.language}</span></div>
    <div class="label">READINESS ${s.readiness}%</div>${bar(s.readiness)}
    <div class="cta"><button class="btn primary" data-exam="${e.id}" data-go="study">Study</button><button class="btn" data-exam="${e.id}" data-go="practice">Practice</button></div></article>`
}
function examTabs(){
  return `<div class="tabs">${exams.map(e=>`<button class="tab ${selectedExam===e.id?"active":""}" data-select-exam="${e.id}">${e.code}</button>`).join("")}</div>`
}
function bindExamTabs(){document.querySelectorAll("[data-select-exam]").forEach(b=>b.onclick=()=>{selectedExam=b.dataset.selectExam;checked=false;selected=null;practiceId=null;render()})}
function study(){
  const e=currentExam(), s=stats(e.id);
  shell(`${examTabs()}
    <div class="section-title"><div><h2>${e.code} Study guide</h2><p>${esc(e.summary)}</p></div><p>Guide: ${e.guideUpdated}</p></div>
    <section class="card"><div class="label">SKILLS MEASURED</div>${e.domains.map(d=>`<div class="domain"><div class="domainhead"><span>${esc(d[0])}</span><span>${d[1]}</span></div><div class="domainbar"><i style="width:${parseInt(d[1])}%"></i></div></div>`).join("")}<p class="small">Source: Microsoft Learn official Study Guide</p></section>
    ${e.publishedRevisionDate?`<section class="card source"><div><b>公式ガイドの改訂</b><p>${esc(e.publishedRevisionDate)} 適用の英語版skills measuredが公開されています。掲載教材の基準日は上記Guideを参照し、受験日と言語に合う公式範囲を確認してください。</p></div><a class="btn" href="${e.source}" target="_blank" rel="noreferrer">改訂内容を確認</a></section>`:""}
    ${e.revisionPreview?.length?`<section class="card"><h3>${esc(e.publishedRevisionDate)} 改訂プレビュー</h3><p class="small">追加の学習範囲です。現在のGuide基準日・完了率・問題の採点は維持しています。</p>${e.revisionPreview.map(m=>`<h4>${esc(m[0])}</h4><p>${esc(m[1])}</p>`).join("")}</section>`:""}
    <div class="section-title"><h2>Modules</h2><p>${s.modulesDone}/${e.modules.length} complete</p></div>
    <section class="module-list">${e.modules.map((m,i)=>`<article class="card module"><h3>${i+1}. ${esc(m[0])}</h3><p>${esc(m[1])}</p><div class="modulefoot"><span class="small">${state.modules[`${e.id}:${i}`]?"完了":"未完了"}</span><button class="btn ${state.modules[`${e.id}:${i}`]?"":"primary"}" data-module="${i}">${state.modules[`${e.id}:${i}`]?"完了を解除":"学習済みにする"}</button></div></article>`).join("")}</section>
    <div class="section-title"><h2>Official source</h2></div><section class="card source"><div><b>${e.code} Study Guide</b><div class="small">${e.guideUpdated} skills measured</div></div><a class="btn" href="${e.source}" target="_blank" rel="noreferrer">Microsoft Learn</a></section>
  `);
  bindExamTabs();
  document.querySelectorAll("[data-module]").forEach(b=>b.onclick=()=>{const k=`${e.id}:${b.dataset.module}`;state.modules[k]=!state.modules[k];save();study()})
}
function practice(){
  const q=practiceId?questions.find(x=>x.id===practiceId):nextQuestion(); if(!q){shell("<div class='card'>No questions</div>");return}
  practiceId=q.id; const a=state.answered[q.id], chosen=selected??(checked?a?.lastSelected:null);
  shell(`${examTabs()}<div class="section-title"><h2>${currentExam().code} Practice</h2><p>${stats(selectedExam).answered}/${stats(selectedExam).total} covered · due ${dueCount(selectedExam)}</p></div>
  <article class="question card"><div class="qhead"><span class="qdomain">${esc(q.domain)}</span><span class="small">${q.id}</span></div><h2 class="qprompt">${esc(q.prompt)}</h2>
  <div class="choices">${q.options.map((o,i)=>`<button class="choice ${chosen===i?"selected":""} ${checked&&i===q.answer?"correct":""} ${checked&&chosen===i&&i!==q.answer?"wrong":""}" data-choice="${i}" ${checked?"disabled":""}><span class="key">${String.fromCharCode(65+i)}</span><span>${esc(o)}</span></button>`).join("")}</div>
  ${!checked?`<div class="cta"><button class="btn primary" id="check" ${selected===null?"disabled":""}>回答する</button><button class="btn" id="skip">次へ</button></div>`:feedback(q,a)}
  </article>`);
  bindExamTabs();
  document.querySelectorAll("[data-choice]").forEach(b=>b.onclick=()=>{selected=Number(b.dataset.choice);practice()});
  const check=document.querySelector("#check"); if(check)check.onclick=()=>{markAnswer(q,selected);checked=true;practice()};
  const skip=document.querySelector("#skip"); if(skip)skip.onclick=()=>nextPractice();
  document.querySelectorAll("[data-confidence]").forEach(b=>b.onclick=()=>confidence(q,b.dataset.confidence));
  const next=document.querySelector("#nextq"); if(next)next.onclick=()=>nextPractice();
}
function feedback(q,a){
  const ok=a?.correct;
  return `<div class="card feedback ${ok?"good":"bad"}"><h3>${ok?"正解":"不正解"}</h3><p>${esc(q.explanation)}</p><div class="conf"><button class="btn" data-confidence="low">自信なし</button><button class="btn" data-confidence="medium">少し迷った</button><button class="btn" data-confidence="high">自信あり</button></div>${a?.dueAt?`<p class="small" style="margin-top:10px">次回復習 ${new Date(a.dueAt).toLocaleDateString("ja-JP")} · ${a.intervalDays}日後</p>`:""}<div class="cta"><button class="btn primary" id="nextq">次の問題</button></div></div>`
}
function nextPractice(){practiceId=null;checked=false;selected=null;practice()}
function mock(){
  const e=currentExam();
  if(!examSession){
    const last=state.mock[e.id];
    shell(`${examTabs()}<div class="section-title"><h2>${e.code} Mock</h2><p>非公式練習模試</p></div><section class="card"><h2>20問、30分</h2><p class="muted">公式問題は転載せず、Study Guideのskills measuredに基づく独自問題から出題します。実際のMicrosoft試験の設問数とは異なります</p>${last?`<p>前回 ${last.score}% · ${new Date(last.at).toLocaleString("ja-JP")}</p>`:""}<div class="cta"><button class="btn primary" id="startmock">開始</button></div></section>`);
    bindExamTabs();document.querySelector("#startmock").onclick=()=>startMock();return;
  }
  renderMockQuestion();
}
function startMock(){
  const pool=[...examQs(selectedExam)].sort(()=>Math.random()-.5).slice(0,20);
  examSession={ids:pool.map(q=>q.id),i:0,answers:{},ends:Date.now()+30*60000};mock()
}
function renderMockQuestion(){
  const q=questions.find(x=>x.id===examSession.ids[examSession.i]), remain=Math.max(0,Math.ceil((examSession.ends-Date.now())/1000));
  if(remain<=0){finishMock();return}
  const chosen=examSession.answers[q.id];
  shell(`<div class="section-title"><h2>${currentExam().code} Mock</h2><p>${examSession.i+1}/${examSession.ids.length} · ${Math.floor(remain/60)}:${String(remain%60).padStart(2,"0")}</p></div>
    <article class="question card"><span class="qdomain">${esc(q.domain)}</span><h2 class="qprompt">${esc(q.prompt)}</h2><div class="choices">${q.options.map((o,i)=>`<button class="choice ${chosen===i?"selected":""}" data-mchoice="${i}"><span class="key">${String.fromCharCode(65+i)}</span><span>${esc(o)}</span></button>`).join("")}</div>
    <div class="cta"><button class="btn" id="mprev" ${examSession.i===0?"disabled":""}>戻る</button><button class="btn primary" id="mnext">${examSession.i===examSession.ids.length-1?"採点":"次へ"}</button></div></article>`);
  document.querySelectorAll("[data-mchoice]").forEach(b=>b.onclick=()=>{examSession.answers[q.id]=Number(b.dataset.mchoice);renderMockQuestion()});
  document.querySelector("#mprev").onclick=()=>{examSession.i=Math.max(0,examSession.i-1);renderMockQuestion()};
  document.querySelector("#mnext").onclick=()=>{if(examSession.i===examSession.ids.length-1)finishMock();else{examSession.i++;renderMockQuestion()}};
}
function finishMock(){
  const qs=examSession.ids.map(id=>questions.find(q=>q.id===id));const correct=qs.filter(q=>examSession.answers[q.id]===q.answer).length;const score=Math.round(correct/qs.length*100);
  state.mock[selectedExam]={score,correct,total:qs.length,at:new Date().toISOString()};save();examSession=null;
  shell(`<section class="card"><span class="badge">${currentExam().code}</span><h2 class="bigscore">${score}%</h2><p>${correct}/${qs.length} correct</p><div class="cta"><button class="btn primary" id="backmock">Mockへ戻る</button><button class="btn" id="gopractice">Practiceへ</button></div></section>`);
  document.querySelector("#backmock").onclick=()=>{view="mock";render()};document.querySelector("#gopractice").onclick=()=>{view="practice";render()}
}
function review(){
  const e=currentExam(), now=Date.now();
  const rows=examQs(e.id).filter(q=>state.answered[q.id] && (!state.answered[q.id].correct || (state.answered[q.id].dueAt&&new Date(state.answered[q.id].dueAt).getTime()<=now) || state.answered[q.id].streak<2))
    .sort((a,b)=>(state.answered[a.id].dueAt||"").localeCompare(state.answered[b.id].dueAt||""));
  shell(`${examTabs()}<div class="section-title"><h2>${e.code} Review</h2><p>${rows.length} items</p></div>${rows.length?`<section class="review-list">${rows.map(q=>{const a=state.answered[q.id];return `<article class="card review-row"><div><h3>${esc(q.prompt)}</h3><p>${esc(q.domain)} · streak ${a.streak||0} · ${a.dueAt?"due "+new Date(a.dueAt).toLocaleDateString("ja-JP"):"未スケジュール"}</p></div><button class="btn" data-review="${q.id}">解く</button></article>`}).join("")}</section>`:`<section class="card"><h3>復習対象なし</h3><p class="muted">Practiceを続けると、誤答や復習期限到来の問題がここに出ます</p></section>`}
  <div class="section-title"><h2>Data</h2></div><section class="card"><p class="muted">進捗はこのブラウザのlocalStorageに保存されます</p><div class="cta"><button class="btn" id="export">Export JSON</button><label class="btn">Import JSON<input type="file" id="import" accept="application/json" hidden></label><button class="btn" id="reset">Reset</button></div></section>`);
  bindExamTabs();
  document.querySelectorAll("[data-review]").forEach(b=>b.onclick=()=>{practiceId=b.dataset.review;checked=false;selected=null;view="practice";render()});
  document.querySelector("#export").onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="microsoft-fte-progress.json";a.click();URL.revokeObjectURL(a.href)};
  document.querySelector("#import").onchange=async ev=>{try{const file=ev.target.files[0];if(!file)return;const p=window.FTE_PROGRESS.parse(JSON.parse(await file.text()));localStorage.setItem(KEY,JSON.stringify(p));Object.assign(state,p);review()}catch{alert("Invalid progress file")}};
  document.querySelector("#reset").onclick=()=>{if(confirm("学習履歴をすべて削除しますか？")){localStorage.removeItem(KEY);location.reload()}}
}
function render(){if(view==="home")home();else if(view==="study")study();else if(view==="practice")practice();else if(view==="mock")mock();else review()}
render();
})();

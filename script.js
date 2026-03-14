
const cfg = window.SD_SITE_CONFIG || {};
const data = window.SD_BOX_DATA || {};
const qs = (s,r=document)=>r.querySelector(s);
const qsa = (s,r=document)=>[...r.querySelectorAll(s)];
function setText(id,v){const el=document.getElementById(id); if(el) el.textContent=v||'';}
function card(item){return `<article class="${item.image || item.file ? 'shape-card':'info-card'}"><img src="${item.image || ('assets/'+item.file)}" alt="${item.name || item.title}"><div class="copy"><h4>${item.name || item.title}</h4><p>${item.desc || ''}</p></div></article>`;}
function fill(sel, items, labelKey='name'){ sel.innerHTML = items.map(i=>`<option>${i[labelKey] || i.title}</option>`).join(''); }
function render(){
  qs('#corrugatedShapeGrid').innerHTML = data.corrugatedShapes.map(card).join('');
  qs('#corrugatedMaterialGrid').innerHTML = data.corrugatedMaterials.map(card).join('');
  qs('#corrugatedFluteGrid').innerHTML = data.corrugatedFlutes.map(card).join('');
  qs('#colorShapeGrid').innerHTML = data.colorShapes.map(card).join('');
  qs('#colorPaperGrid').innerHTML = data.colorPapers.map(card).join('');
  qs('#colorFinishGrid').innerHTML = data.colorFinishes.map(card).join('');
  qs('#smallAdvGrid').innerHTML = data.smallAdvantages.map(card).join('');
  qs('#smallShapeGrid').innerHTML = data.smallShapes.map(card).join('');
}
function setService(service){
  qsa('.seg').forEach(btn=>btn.classList.toggle('active', btn.dataset.service===service));
  qsa('.service-block').forEach(block=>block.classList.toggle('hidden', block.dataset.block!==service));
  buildSummary();
}
function buildSummary(){
  const service = qs('.seg.active')?.dataset.service || '골판박스 주문제작';
  const lines=[`서비스 유형: ${service}`];
  if(service==='골판박스 주문제작'){ lines.push(`박스 형태: ${qs('#corrShapeSelect').value}`); lines.push(`골판지 재질: ${qs('#corrMatSelect').value}`); lines.push(`골판지 두께: ${qs('#corrFluteSelect').value}`); }
  if(service==='칼라박스 주문제작'){ lines.push(`박스 형태: ${qs('#colorShapeSelect').value}`); lines.push(`칼라박스 종이정보: ${qs('#colorPaperSelect').value}`); lines.push(`가공 안내: ${qs('#colorFinishSelect').value}`); }
  if(service==='소량인쇄'){ lines.push(`소량인쇄 박스형태: ${qs('#smallShapeSelect').value}`); }
  lines.push(`사이즈: ${qs('#width').value || '-'} × ${qs('#depth').value || '-'} × ${qs('#height').value || '-'} mm`);
  lines.push(`수량: ${qs('#qty').value || '-'}`);
  lines.push(`인쇄 여부: ${qs('#printOption').value || '-'}`);
  lines.push(`납품지역: ${qs('#deliveryRegion').value || '-'}`);
  qs('#selectionSummary').innerHTML = lines.map(t=>`<div>${t}</div>`).join('');
}
function submitForm(e){
  e.preventDefault();
  if(!cfg.formSubmitAction || cfg.formSubmitAction.includes('CHANGE_ME')){
    alert('config/site-config.js 에 문의 이메일과 formSubmitAction 을 먼저 입력해 주세요.');
    return;
  }
  const form = e.currentTarget;
  const service = qs('.seg.active')?.dataset.service || '';
  const subject = `[${cfg.companyName || '에스디컴퍼니'}] ${service} 견적 문의`;
  const hiddenSubject = document.createElement('input'); hiddenSubject.type='hidden'; hiddenSubject.name='_subject'; hiddenSubject.value=subject;
  const hiddenCaptcha = document.createElement('input'); hiddenCaptcha.type='hidden'; hiddenCaptcha.name='_captcha'; hiddenCaptcha.value='false';
  const hiddenSummary = document.createElement('textarea'); hiddenSummary.name='selectionSummary'; hiddenSummary.style.display='none'; hiddenSummary.value=qs('#selectionSummary').innerText + '\n\n추가 요청사항:\n' + (qs('#note').value || '없음');
  form.append(hiddenSubject, hiddenCaptcha, hiddenSummary);
  form.action = cfg.formSubmitAction; form.method = 'POST'; form.submit();
}
function openMailClient(){
  const service = qs('.seg.active')?.dataset.service || '';
  const body = encodeURIComponent(qs('#selectionSummary').innerText + '\n\n추가 요청사항:\n' + (qs('#note').value || '없음'));
  location.href = `mailto:${cfg.inquiryEmail}?subject=${encodeURIComponent('['+(cfg.companyName||'에스디컴퍼니')+'] '+service+' 견적 문의')}&body=${body}`;
}
document.addEventListener('DOMContentLoaded', ()=>{
  setText('companyPhone', cfg.phone); setText('companyEmail', cfg.inquiryEmail); setText('footerPhone', cfg.phone); setText('footerEmail', cfg.inquiryEmail);
  render();
  fill(qs('#corrShapeSelect'), data.corrugatedShapes); fill(qs('#corrMatSelect'), data.corrugatedMaterials, 'title'); fill(qs('#corrFluteSelect'), data.corrugatedFlutes, 'title');
  fill(qs('#colorShapeSelect'), data.colorShapes); fill(qs('#colorPaperSelect'), data.colorPapers, 'title'); fill(qs('#colorFinishSelect'), data.colorFinishes, 'title'); fill(qs('#smallShapeSelect'), data.smallShapes);
  qsa('.seg').forEach(btn=>btn.addEventListener('click', ()=>setService(btn.dataset.service)));
  qsa('#quote input, #quote select, #quote textarea').forEach(el=>el.addEventListener('input', buildSummary));
  qsa('[data-prefill]').forEach(el=>el.addEventListener('click', ()=>setService(el.dataset.prefill)));
  qsa('[data-jump]').forEach(el=>el.addEventListener('click', ()=>document.querySelector(el.dataset.jump)?.scrollIntoView({behavior:'smooth'})));
  qs('#quoteForm').addEventListener('submit', submitForm); qs('#openMailClientBtn').addEventListener('click', openMailClient);
  qs('#siteSignupBtn').addEventListener('click', ()=>alert('실운영용 사이트가입은 Supabase 또는 Firebase 연결이 필요합니다. README를 참고하세요.'));
  qs('#kakaoLoginBtn').addEventListener('click', ()=>alert('카카오 로그인은 Kakao Developers 앱 등록과 키 입력이 필요합니다.'));
  qs('#naverLoginBtn').addEventListener('click', ()=>alert('네이버 로그인은 네이버 개발자센터 앱 등록과 Client ID 입력이 필요합니다.'));
  buildSummary();
});

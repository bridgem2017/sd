function el(s,r=document){return r.querySelector(s)}; function els(s,r=document){return [...r.querySelectorAll(s)]};
const CFG = window.SD_SITE_CONFIG || {}; const DATA = window.SD_SITE_DATA || {};
function mountLayout(active=''){
  const items=[['corrugated.html','골판지박스'],['colorbox.html','칼라박스'],['portfolio.html','포토폴리오'],['support.html','고객지원'],['quote_corrugated.html','견적문의']];
  const isQuoteActive = ['quote.html','quote_corrugated.html','quote_colorbox.html'].includes(active);
  const navLinks = items.map(([h,l])=>{
    const on = l==='견적문의' ? isQuoteActive : active===h;
    return `<a href="${h}" class="${on?'active':''} ${l==='견적문의'?'cta':''}">${l}</a>`;
  }).join('');
  const drawerLinks = items.map(([h,l])=>{
    const on = l==='견적문의' ? isQuoteActive : active===h;
    return `<a href="${h}" class="mobile-drawer-link ${on?'active':''}">${l}</a>`;
  }).join('');

  document.body.insertAdjacentHTML('afterbegin', `<div class="top-banner"><span>박스 맞춤 인쇄, 패키지 제작 · 샘플부터 견적, 납품까지 한번에</span></div><header class="header"><div class="container header-inner"><button class="hamburger" type="button" aria-label="메뉴 열기" aria-controls="mobileDrawer" aria-expanded="false"><span></span><span></span><span></span></button><a class="brand" href="index.html"><img src="assets/sd-company-logo.png" alt="로고"><span>에스디컴퍼니</span></a><nav class="nav">${navLinks}</nav><div class="mobile-menu"><a class="btn line" href="quote_corrugated.html">견적문의</a></div></div></header><div class="mobile-drawer-backdrop" id="mobileDrawerBackdrop"></div><aside class="mobile-drawer" id="mobileDrawer" aria-hidden="true"><div class="mobile-drawer-head"><strong>메뉴</strong><button class="mobile-drawer-close" type="button" aria-label="메뉴 닫기">×</button></div><nav class="mobile-drawer-nav">${drawerLinks}</nav></aside>`);

  const insertFooter = ()=>{
    if(document.querySelector('.footer')) return;
    document.body.insertAdjacentHTML('beforeend', `<footer class="footer">
  <div class="container footer-shell">
    <div class="footer-brand footer-brand-compact">
      <img src="assets/sd-company-logo-full.png" alt="에스디컴퍼니 로고">
    </div>
    <div class="footer-info-column">
      <div class="footer-bottom-nav">
        <a href="index.html">HOME</a>
        <a href="company.html">회사소개</a>
        <a href="terms.html">이용약관</a>
        <a href="privacy.html">개인정보보호정책</a>
        <a href="directions.html">오시는길</a>
      </div>
      <div class="footer-contact-rows">
        <div class="footer-row">
          <span>대표 : 김운기</span>
          <span>사업자등록번호 : 402-33-94847</span>
          <span>개인정보책임자 : 박성인</span>
        </div>
        <div class="footer-row">
          <span>대표전화 : 0507-1330-1177</span>
          <span>팩스번호 : 070-4253-1177</span>
          <span>상담 메일 : sales@box.re.kr</span>
        </div>
        <div class="footer-row">
          <span>영업시간 : 평일 09:00 - 18:00</span>
          <span>주소 : 경기도 김포시 통진읍 마송2로104번길 155 가동</span>
        </div>
        <div class="footer-row footer-copy">
          <span>Copyrights 2026 SD COMPANY Co.,Ltd. All rights reserved.</span>
        </div>
      </div>
    </div>
  </div>
</footer>`);
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', insertFooter, {once:true});
  else insertFooter();
}
function productCard(p){ return `<article class="product-card"><div class="badge-top">${p.tag||''}</div><img src="${p.img}" alt="${p.name}"><div class="body"><div class="product-meta"><strong>${p.name}</strong><span>${p.minQty||''}</span></div></div></article>`; }

function getEstimateStorageKey(){ return 'sdcompany_estimates_v1'; }
function loadEstimateSubmissions(){
  try{ return JSON.parse(localStorage.getItem(getEstimateStorageKey())||'[]'); }catch(e){ return []; }
}
function saveEstimateSubmission(payload){
  try{
    const items = loadEstimateSubmissions();
    items.unshift(payload);
    localStorage.setItem(getEstimateStorageKey(), JSON.stringify(items.slice(0,300)));
  }catch(e){}
}
function calcEstimate(payload){
  const qty = Number(payload.qty||0);
  const width = Number(payload.width||0);
  const depth = Number(payload.depth||0);
  const height = Number(payload.height||0);
  const volume = Math.max(width*depth*height, 1);
  const familyBase = payload.family==='colorbox' ? 220 : 130;
  const sizeFactor = Math.max(volume / 1200000, 0.45);
  const qtyFactor = qty >= 5000 ? 0.82 : qty >= 2000 ? 0.9 : qty >= 1000 ? 1 : qty >= 500 ? 1.12 : 1.25;
  const finishFactor = payload.family==='colorbox'
    ? ((payload.print||'').includes('양면') ? 1.22 : (payload.print||'').includes('별색') ? 1.16 : 1.08)
      * ((payload.coating||'').includes('라미') ? 1.16 : (payload.coating||'').includes('오버') ? 1.06 : 1)
      * ((payload.option||'').includes('없음') ? 1 : 1.12)
    : ((payload.print||'')==='4도' ? 1.15 : (payload.print||'')==='2도' ? 1.08 : (payload.print||'')==='1도' ? 1.04 : 1)
      * ((payload.flute||'').includes('BA') || (payload.flute||'').includes('BB') ? 1.22 : (payload.flute||'').includes('A골') ? 1.12 : 1.03);
  const unit = Math.round(familyBase * sizeFactor * qtyFactor * finishFactor);
  return {
    estimatedUnitPrice: unit,
    estimatedTotalPrice: unit * Math.max(qty,1),
    sizeScore: Math.round(sizeFactor*100)/100,
    qtyFactor: Math.round(qtyFactor*100)/100,
    finishFactor: Math.round(finishFactor*100)/100
  };
}

document.addEventListener('DOMContentLoaded', ()=>{
  const btn = document.querySelector('.hamburger');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  if(!btn || !drawer || !backdrop) return;

  const openDrawer = ()=>{
    drawer.classList.add('open');
    backdrop.classList.add('show');
    btn.setAttribute('aria-expanded','true');
    drawer.setAttribute('aria-hidden','false');
    document.body.classList.add('drawer-open');
  };
  const closeDrawer = ()=>{
    drawer.classList.remove('open');
    backdrop.classList.remove('show');
    btn.setAttribute('aria-expanded','false');
    drawer.setAttribute('aria-hidden','true');
    document.body.classList.remove('drawer-open');
  };

  btn.addEventListener('click', ()=>{
    if(drawer.classList.contains('open')) closeDrawer(); else openDrawer();
  });
  backdrop.addEventListener('click', closeDrawer);
  if(closeBtn) closeBtn.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeDrawer(); });
});

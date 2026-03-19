
function mountLayout(active=''){
  const items=[['index.html','HOME'],['corrugated.html','골판지 박스'],['colorbox.html','칼라박스'],['box-search.html','전개도 에디터'],['support.html','고객지원'],['quote.html','견적문의']];
  const navLinks = items.map(([h,l])=>`<a href="${h}" class="${active===h?'active':''} ${l==='견적문의'?'cta':''}">${l}</a>`).join('');
  const drawerLinks = items.map(([h,l])=>`<a href="${h}" class="mobile-drawer-link ${active===h?'active':''}">${l}</a>`).join('');
  document.body.insertAdjacentHTML('afterbegin', `<div class="top-banner"><span>에스디컴퍼니 · 맞춤 박스 제작, 샘플 검토부터 견적과 납품까지</span></div><header class="header"><div class="container header-inner"><button class="hamburger" type="button" aria-label="메뉴 열기" aria-controls="mobileDrawer" aria-expanded="false"><span></span><span></span><span></span></button><a class="brand" href="index.html"><img src="assets/sd-company-logo.png" alt="에스디컴퍼니 로고"><span>에스디컴퍼니</span></a><nav class="nav">${navLinks}</nav><div class="mobile-menu"><a class="btn line" href="quote.html">견적문의</a></div></div></header><div class="mobile-drawer-backdrop" id="mobileDrawerBackdrop"></div><aside class="mobile-drawer" id="mobileDrawer" aria-hidden="true"><div class="mobile-drawer-head"><strong>메뉴</strong><button class="mobile-drawer-close" type="button" aria-label="메뉴 닫기">×</button></div><nav class="mobile-drawer-nav">${drawerLinks}</nav></aside>`);
  document.body.insertAdjacentHTML('beforeend', `<footer class="footer"><div class="container footer-shell"><div class="footer-brand footer-brand-compact"><img src="assets/sd-company-logo-full.png" alt="에스디컴퍼니 로고"></div><div class="footer-info-column"><div class="footer-bottom-nav"><a href="index.html">HOME</a><a href="corrugated.html">골판지 박스</a><a href="colorbox.html">칼라박스</a><a href="quote.html">견적문의</a><a href="support.html">고객지원</a></div><div class="footer-contact-rows"><div class="footer-row"><span>에스디컴퍼니 · SD COMPANY</span><span>맞춤 패키지 제작 전문</span><span>We Package Your Growth</span></div><div class="footer-row"><span>대표전화 : 0507-1330-1177</span><span>상담 메일 : sales@box.re.kr</span><span>영업시간 : 평일 09:00 - 18:00</span></div><div class="footer-row"><span>주소 : 경기도 김포시 통진읍 마송2로104번길 155 가동</span></div><div class="footer-row footer-copy"><span>Copyright 2026 SD COMPANY. All rights reserved.</span></div></div></div></div></footer>`);
}

document.addEventListener('DOMContentLoaded', ()=>{
  const btn = document.querySelector('.hamburger');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  if(!btn || !drawer || !backdrop) return;
  const openDrawer = ()=>{drawer.classList.add('open');backdrop.classList.add('show');btn.setAttribute('aria-expanded','true');drawer.setAttribute('aria-hidden','false');document.body.classList.add('drawer-open');};
  const closeDrawer = ()=>{drawer.classList.remove('open');backdrop.classList.remove('show');btn.setAttribute('aria-expanded','false');drawer.setAttribute('aria-hidden','true');document.body.classList.remove('drawer-open');};
  btn.addEventListener('click', ()=> drawer.classList.contains('open')?closeDrawer():openDrawer());
  backdrop.addEventListener('click', closeDrawer);
  if(closeBtn) closeBtn.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeDrawer(); });
});

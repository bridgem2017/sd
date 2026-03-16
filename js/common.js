
function el(s,r=document){return r.querySelector(s)}; function els(s,r=document){return [...r.querySelectorAll(s)]};
const CFG = window.SD_SITE_CONFIG || {}; const DATA = window.SD_SITE_DATA || {};

const ADMIN_KEY = 'SD_ADMIN_OVERRIDES_V1';
function getAdminOverrides(){
  try{ return JSON.parse(localStorage.getItem(ADMIN_KEY) || '{}'); }catch(e){ return {}; }
}
function applyAdminOverrides(){
  const ov = getAdminOverrides();
  if(!ov) return;
  const brandImg = document.querySelector('.brand img');
  if(brandImg && ov.siteLogo){ brandImg.src = ov.siteLogo; }
  const footerImg = document.querySelector('.footer-brand-compact img');
  if(footerImg && ov.footerLogo){ footerImg.src = ov.footerLogo; }
  if(document.body && document.body.dataset.page === 'index' && ov.banners){
    document.querySelectorAll('#mainRollingTrack .hero-roll-card').forEach((card, idx) => {
      const data = ov.banners[idx];
      if(!data) return;
      const img = card.querySelector('img'); if(img && data.image) img.src = data.image;
      const badge = card.querySelector('.mini-badge'); if(badge && data.badge) badge.textContent = data.badge;
      const small = card.querySelector('small'); if(small && data.sub) small.innerHTML = data.sub.replace(/
/g,'<br>');
      const h3 = card.querySelector('h3'); if(h3 && data.title) h3.childNodes[0].textContent = data.title;
      if(data.link) card.href = data.link;
    });
  }
}
function initMainSlider(){
  const banner = document.getElementById('mainRollingBanner');
  const track = document.getElementById('mainRollingTrack');
  const dotsWrap = document.getElementById('mainRollingDots');
  if(!banner || !track || !dotsWrap) return;
  const slides = [...track.children];
  const dots = [...dotsWrap.querySelectorAll('button')];
  let index = 0, timer = null, pausedByDot = false;
  const update = () => {
    const width = banner.clientWidth;
    track.style.transform = `translateX(-${index * width}px)`;
    dots.forEach((d,i)=>d.classList.toggle('active', i===index));
  };
  const stop = () => { if(timer){ clearInterval(timer); timer = null; } };
  const start = () => {
    if(pausedByDot) return;
    stop();
    timer = setInterval(()=>{ index = (index + 1) % slides.length; update(); }, 3600);
  };
  dots.forEach((dot,i)=> dot.addEventListener('click', (e)=>{
    e.preventDefault();
    index = i; pausedByDot = true; stop(); update();
  }));
  banner.addEventListener('mouseenter', stop);
  banner.addEventListener('mouseleave', ()=>{ if(!pausedByDot) start(); });
  dotsWrap.addEventListener('mouseenter', stop);
  dotsWrap.addEventListener('mouseleave', ()=>{ if(!pausedByDot) start(); });
  window.addEventListener('resize', update);
  update(); start();
}
window.addEventListener('DOMContentLoaded', ()=>{ applyAdminOverrides(); initMainSlider(); });

function mountLayout(active=''){
  const items=[['corrugated.html','골판지박스'],['colorbox.html','칼라박스'],['rigid.html','싸바리박스'],['other.html','기타'],['box-search.html','박스검색'],['portfolio.html','포트폴리오'],['support.html','고객지원'],['quote.html','견적문의'],['login.html','로그인']];
  document.body.insertAdjacentHTML('afterbegin', `<div class="top-banner"><span>박스 맞춤 인쇄, 패키지 제작 · 샘플부터 견적, 납품까지 한번에</span></div><header class="header"><div class="container header-inner"><a class="brand" href="index.html"><img src="assets/sd-company-logo.png" alt="로고"><span>에스디컴퍼니</span></a><nav class="nav">${items.map(([h,l])=>`<a href="${h}" class="${active===h?'active':''} ${l==='견적문의'?'cta':''}">${l}</a>`).join('')}</nav><div class="mobile-menu"><a class="btn line" href="quote.html">견적문의</a></div></div></header>`);
  document.body.insertAdjacentHTML('beforeend', `<footer class="footer">
  <div class="container footer-bottom-nav">
    <a href="index.html">HOME</a>
    <span>|</span>
    <a href="company.html">회사소개</a>
    <span>|</span>
    <a href="terms.html">이용약관</a>
    <span>|</span>
    <a href="privacy.html">개인정보보호정책</a>
    <span>|</span>
    <a href="directions.html">오시는길</a>
  </div>
  <div class="container footer-grid footer-contact-only">
    <div class="footer-brand footer-brand-compact">
      <img src="assets/sd-company-logo-footer.png" alt="에스디컴퍼니 로고">
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
</footer>`);
}
function productCard(p){ return `<article class="product-card"><div class="badge-top">${p.tag||''}</div><img src="${p.img}" alt="${p.name}"><div class="body"><div class="product-meta"><strong>${p.name}</strong><span>${p.minQty||''}</span></div></div></article>`; }

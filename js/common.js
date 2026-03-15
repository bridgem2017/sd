
function el(s,r=document){return r.querySelector(s)}; function els(s,r=document){return [...r.querySelectorAll(s)]};
const CFG = window.SD_SITE_CONFIG || {}; const DATA = window.SD_SITE_DATA || {};
function mountLayout(active=''){
  const items=[['company.html','회사 소개'],['corrugated.html','골판지박스'],['colorbox.html','칼라박스'],['rigid.html','싸바리박스'],['other.html','기타'],['box-search.html','박스검색'],['portfolio.html','포트폴리오'],['support.html','고객지원'],['quote.html','견적문의'],['login.html','로그인']];
  document.body.insertAdjacentHTML('afterbegin', `<div class="top-banner"><span>박스 맞춤 인쇄, 패키지 제작 · 샘플부터 견적, 납품까지 한번에</span></div><header class="header"><div class="container header-inner"><a class="brand" href="index.html"><img src="assets/sd-company-logo.png" alt="로고"><span>에스디컴퍼니</span></a><nav class="nav">${items.map(([h,l])=>`<a href="${h}" class="${active===h?'active':''} ${l==='견적문의'?'cta':''}">${l}</a>`).join('')}</nav><div class="mobile-menu"><a class="btn line" href="quote.html">견적문의</a></div></div></header>`);
  document.body.insertAdjacentHTML('beforeend', `<footer class="footer">
    <div class="container footer-grid footer-contact-only">
      <div class="footer-brand">
        <img src="assets/logo-sd-company.png" alt="에스디컴퍼니 로고">
        <div>
          <h3>에스디컴퍼니</h3>
          <p>0507-1330-1177</p>
          <p>sales@box.re.kr</p>
          <p>box.re.kr</p>
        </div>
      </div>
      <div>
        <h4>CONTACT</h4>
        <p>상담 메일: sales@box.re.kr</p>
        <p>대표 전화: 0507-1330-1177</p>
        <p>영업시간: 평일 09:00 - 18:00</p>
        <p>사업장 주소: 경기도 김포시 통진읍 마송2로104번길 155</p>
      </div>
    </div>
  </footer>`);
}
function productCard(p){ return `<article class="product-card"><div class="badge-top">${p.tag||''}</div><img src="${p.img}" alt="${p.name}"><div class="body"><div class="product-meta"><strong>${p.name}</strong><span>${p.minQty||''}</span></div></div></article>`; }


function el(sel, root=document){ return root.querySelector(sel); }
function els(sel, root=document){ return [...root.querySelectorAll(sel)]; }
const CFG = window.SD_SITE_CONFIG || {};
const DATA = window.SD_SITE_DATA || {};
function layoutHeader(active=''){
  const items = [['corrugated.html','골판지박스'],['colorbox.html','칼라박스'],['rigid.html','싸바리박스'],['other.html','기타'],['portfolio.html','포트폴리오'],['support.html','고객지원'],['quote.html','견적문의'],['login.html','로그인']];
  return `<div class="top-banner">신규 회원가입 시 온라인 주문에 사용 가능한 <strong>3% 할인 쿠폰</strong> 지급 &gt; 지금 가입하기</div><header class="header"><div class="container header-inner"><a class="brand" href="index.html"><img src="assets/sd-company-logo.png" alt="에스디컴퍼니 로고"><span>에스디컴퍼니 스타일</span></a><nav class="nav">${items.map(([href,label])=>`<a href="${href}" class="${href===active?'active':''} ${label==='견적문의'?'cta':''}">${label}</a>`).join('')}</nav><div class="mobile-menu"><a class="btn line" href="quote.html">견적문의</a></div></div></header>`;
}
function layoutFooter(){
  return `<footer class="footer"><div class="container footer-grid" style="grid-template-columns:1.4fr 1fr 1fr 1fr"><div><div class="brand" style="font-size:18px"><img src="assets/sd-company-logo.png" alt="logo"><span>${CFG.companyName}</span></div><p>${CFG.phone}</p><p>${CFG.inquiryEmail}</p><p>${CFG.website}</p></div><div><h4>PRODUCTS</h4><a href="corrugated.html">골판지 박스</a><a href="colorbox.html">종이 박스 / 칼라박스</a><a href="rigid.html">싸바리 박스</a><a href="other.html">기타</a></div><div><h4>COMPANY</h4><a href="portfolio.html">포트폴리오</a><a href="support.html">고객지원</a><a href="guide-structure.html">박스 구조 종류</a><a href="guide-process.html">제작 과정</a></div><div><h4>SERVICE</h4><a href="quote.html">견적문의</a><a href="guide-paper.html">종이 선택 가이드</a><a href="support.html#faq">자주 묻는 질문</a></div></div></footer>`;
}
function mountLayout(active){ document.body.insertAdjacentHTML('afterbegin', layoutHeader(active)); document.body.insertAdjacentHTML('beforeend', layoutFooter()); }
function renderProductCards(items, opts={}){ return items.map(item=>`<article class="${opts.product ? 'product-card' : 'card'}">${opts.product&&item.tag?`<div class="badge-top">${item.tag}</div>`:''}<img src="${item.img}" alt="${item.name}"><div class="body"><h4>${item.name}</h4>${item.subtitle?`<p>${item.subtitle}</p>`:''}${item.desc?`<p>${item.desc}</p>`:''}${item.spec?`<div class="tag-row">${item.spec.split(' / ').map(t=>`<span class="tag">${t}</span>`).join('')}</div>`:''}${item.minQty?`<div class="product-meta"><strong>${item.name}</strong><span>${item.minQty}</span></div>`:''}</div></article>`).join(''); }

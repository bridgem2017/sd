
const BOX_CATALOG = {
  corrugated: [{"slug": "a", "name": "A형 박스", "img": "assets/box-types/corr_a.webp", "desc": "상하 플랩을 접어 마감하는 가장 익숙한 골판지 구조입니다. 온라인 배송, 보관, 대량 납품처럼 기본기가 중요한 작업에 특히 안정적입니다.", "shape": "A형 박스"}, {"slug": "b", "name": "B형 박스", "img": "assets/box-types/corr_b.webp", "desc": "뚜껑과 몸통 결합감이 좋아 내용물을 차분하게 감싸는 타입입니다. 세트 구성품이나 반복 개봉이 있는 포장에 잘 어울립니다.", "shape": "B형 박스"}, {"slug": "d", "name": "D형 박스", "img": "assets/box-types/corr_d.webp", "desc": "보자기처럼 감싸 접는 느낌의 구조로 납작한 제품이나 문서, 키트류에 효율적입니다. 포장 후 외형이 단정하게 정리되는 점이 강점입니다.", "shape": "D형 박스"}, {"slug": "g", "name": "G형 박스", "img": "assets/box-types/corr_g.webp", "desc": "배송성과 브랜드 노출을 함께 챙기고 싶을 때 많이 찾는 형태입니다. 개봉 동선이 깔끔하고 전면 인쇄 활용도도 높습니다.", "shape": "G형 박스"}, {"slug": "p", "name": "P형 박스", "img": "assets/box-types/corr_p.webp", "desc": "피자박스처럼 낮고 넓게 펼쳐지는 구조입니다. 납작한 제품, 식품, 키트류처럼 꺼내기 편한 포장에 특히 유리합니다.", "shape": "P형 박스"}, {"slug": "t", "name": "T형 박스", "img": "assets/box-types/corr_t.webp", "desc": "상단 덮개가 길게 열리는 형식이라 진열성과 작업성이 좋습니다. 안내물, 판촉물, 보관형 패키지처럼 보여주는 포장에 적합합니다.", "shape": "T형 박스"}, {"slug": "y", "name": "Y형 박스", "img": "assets/box-types/corr_y.webp", "desc": "손잡이형 또는 상단 결합형으로 응용하기 좋은 구조입니다. 쇼핑백 대체 포장이나 행사형 패키지에 자주 활용됩니다.", "shape": "Y형 박스"}, {"slug": "poster", "name": "포스터형 박스", "img": "assets/box-types/corr_poster.webp", "desc": "길고 슬림한 인쇄물, 포스터, 막대형 구성품을 안전하게 담기 위한 구조입니다. 흔들림을 줄이고 운송 중 휨을 완화하는 데 유리합니다.", "shape": "포스터형 박스"}],
  colorbox: [{"slug": "a", "name": "A형 박스", "img": "assets/box-types/color_a.webp", "desc": "가장 널리 쓰이는 칼라 단상자 계열입니다. 기본 인쇄가 잘 먹고 생산성이 좋아 첫 제작에도 부담이 적습니다.", "shape": "A형 박스"}, {"slug": "b", "name": "B형 박스", "img": "assets/box-types/color_b.webp", "desc": "열고 닫는 구조감이 또렷해 선물형, 세트형 패키지에 잘 어울립니다. 표면 표현을 살리기 좋은 타입입니다.", "shape": "B형 박스"}, {"slug": "c", "name": "C형 박스", "img": "assets/box-types/color_c.webp", "desc": "뚜껑과 바닥 구성이 단정해 화장품, 리빙, 소형 전자기기 박스에 자주 쓰입니다. 개봉감이 깔끔합니다.", "shape": "C형 박스"}, {"slug": "g", "name": "G형 박스", "img": "assets/box-types/color_g.webp", "desc": "배송형과 브랜딩형 사이의 균형이 좋은 칼라박스입니다. 제품 보호와 외관 연출을 함께 챙길 수 있습니다.", "shape": "G형 박스"}, {"slug": "y", "name": "Y형 박스", "img": "assets/box-types/color_y.webp", "desc": "손잡이나 상단 구조를 활용해 이동성과 존재감을 함께 가져가는 형태입니다. 행사, 기프트, 프로모션 패키지에 적합합니다.", "shape": "Y형 박스"}, {"slug": "mono", "name": "단상자 박스", "img": "assets/box-types/color_mono.webp", "desc": "브랜드 패키지의 출발점이 되는 기본 구조입니다. 라벨 감각, 인쇄톤, 코팅 질감까지 가장 표준적으로 적용할 수 있습니다.", "shape": "단상자 박스"}, {"slug": "pillow", "name": "필로우 박스", "img": "assets/box-types/color_pillow.webp", "desc": "곡선이 살아 있는 감성형 구조라 액세서리, 소형 굿즈, 프로모션 포장에 잘 어울립니다.", "shape": "필로우 박스"}, {"slug": "sleeve", "name": "슬리브 박스", "img": "assets/box-types/color_sleeve.webp", "desc": "겉 슬리브와 내부 박스가 분리된 형식으로 언박싱 포인트를 만들기 좋습니다. 간결하지만 고급스러운 인상을 줍니다.", "shape": "슬리브 박스"}, {"slug": "slide", "name": "슬라이드 박스", "img": "assets/box-types/color_slide.webp", "desc": "서랍처럼 밀어 여는 구조라 전달감이 좋고 내부 연출이 살아납니다. 프리미엄 소포장에 잘 맞습니다.", "shape": "슬라이드 박스"}, {"slug": "knockdown", "name": "넉다운 박스", "img": "assets/box-types/color_knockdown.webp", "desc": "보관할 때는 평판에 가깝게, 사용할 때는 빠르게 조립할 수 있는 구조입니다. 물류 효율을 중요하게 볼 때 유리합니다.", "shape": "넉다운 박스"}]
};
function getCatalog(kind){ return BOX_CATALOG[kind] || []; }
function qs(name){ return new URLSearchParams(location.search).get(name) || ''; }
function matchItem(kind){
  const type = qs('type');
  const img = qs('img');
  const item = getCatalog(kind).find(v => v.name===type) || getCatalog(kind).find(v => v.img===img) || getCatalog(kind)[0];
  return item;
}
function mountOrderPage(kind, mode){
  const familyNames = {corrugated:'골판지박스', colorbox:'칼라박스'};
  const titleSuffix = mode==='sample' ? '샘플 요청' : '견적문의';
  const familySel = document.getElementById('boxFamilySelect');
  const shapeSel = document.getElementById('boxShape');
  const mainImg = document.getElementById('mainBoxImage');
  const orderTitle = document.getElementById('orderTitle');
  const orderBadge = document.getElementById('orderBadge');
  const subjectEl = document.getElementById('mailSubject');
  const submitBtn = document.getElementById('submitBtn');
  const form = document.getElementById('mailForm');
  const thumbsWrap = document.querySelector('.order-thumbs');
  const presetBanner = document.getElementById('presetQuoteBanner');
  const presetTitle = document.getElementById('presetQuoteTitle');
  const presetText = document.getElementById('presetQuoteText');
  const focusTarget = document.getElementById('quoteFormPanel');

  let currentKind = kind;
  let currentItem = matchItem(kind);

  function buildThumbs(list, activeName){
    if(!thumbsWrap) return;
    thumbsWrap.innerHTML = list.map(item => `<button type="button" class="order-thumb ${item.name===activeName?'active':''}" data-box-image="${item.img}" data-box-name="${item.name}"><img src="${item.img}" alt="${item.name}"></button>`).join('');
    bindThumbs();
  }

  function fillShapeOptions(list, activeName){
    if(!shapeSel) return;
    shapeSel.innerHTML = list.map(item => `<option value="${item.name}">${item.name}</option>`).join('');
    shapeSel.value = activeName;
  }

  function renderPresetBanner(){
    if(!presetBanner) return;
    const hasPreset = !!qs('type') || !!qs('img') || !!qs('focus');
    presetBanner.hidden = !hasPreset;
    if(!hasPreset) return;
    if(presetTitle) presetTitle.textContent = `${familyNames[currentKind]} · ${currentItem.name} 프리셋이 적용되었습니다.`;
    if(presetText) presetText.textContent = `선택한 ${familyNames[currentKind]}의 ${currentItem.name} 형태가 자동 반영되어 있습니다. 수량, 사이즈, 인쇄 조건만 입력하면 바로 견적 요청이 가능합니다.`;
  }

  function applyFamily(nextKind, preferredName){
    currentKind = nextKind;
    const list = getCatalog(nextKind);
    currentItem = list.find(v => v.name===preferredName) || list[0];
    if(form) form.dataset.family = nextKind;
    if(familySel) familySel.value = nextKind;
    if(orderTitle) orderTitle.textContent = `${familyNames[nextKind]} ${titleSuffix}`;
    if(orderBadge) orderBadge.textContent = `${currentItem.name} ${titleSuffix}`;
    if(mainImg){ mainImg.src = currentItem.img; mainImg.alt = currentItem.name; }
    fillShapeOptions(list, currentItem.name);
    buildThumbs(list, currentItem.name);
    renderPresetBanner();
    if(subjectEl) subjectEl.value = `[에스디컴퍼니] ${familyNames[nextKind]} ${mode==='sample' ? '샘플 요청' : '견적 문의'} - ${currentItem.name}`;
    if(submitBtn) submitBtn.textContent = mode==='sample' ? '샘플 요청' : '견적 요청';
  }

  function bindThumbs(){
    document.querySelectorAll('[data-box-image]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const list = getCatalog(currentKind);
        const found = list.find(v => v.name===btn.dataset.boxName) || list[0];
        currentItem = found;
        if(mainImg){ mainImg.src = found.img; mainImg.alt = found.name; }
        if(shapeSel) shapeSel.value = found.name;
        if(orderBadge) orderBadge.textContent = `${found.name} ${titleSuffix}`;
        renderPresetBanner();
        if(subjectEl) subjectEl.value = `[에스디컴퍼니] ${familyNames[currentKind]} ${mode==='sample' ? '샘플 요청' : '견적 문의'} - ${found.name}`;
        document.querySelectorAll('.order-thumb').forEach(t=>t.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  if(familySel){
    familySel.addEventListener('change', ()=>{
      const nextKind = familySel.value;
      if(nextKind !== currentKind){
        const params = new URLSearchParams(location.search);
        const targetPage = mode==='sample'
          ? (nextKind==='corrugated' ? 'sample_corrugated.html' : 'sample_colorbox.html')
          : (nextKind==='corrugated' ? 'quote_corrugated.html' : 'quote_colorbox.html');
        const nextList = getCatalog(nextKind);
        const preferred = nextList.find(v => v.name===shapeSel?.value) || nextList[0];
        params.set('family', nextKind);
        if(preferred){
          params.set('type', preferred.name);
          params.set('img', preferred.img);
        }
        location.href = `${targetPage}?${params.toString()}`;
        return;
      }
      applyFamily(nextKind, null);
    });
  }
  if(shapeSel){
    shapeSel.addEventListener('change', ()=>{
      const list = getCatalog(currentKind);
      const found = list.find(v => v.name===shapeSel.value) || list[0];
      currentItem = found;
      if(mainImg){ mainImg.src = found.img; mainImg.alt = found.name; }
      if(orderBadge) orderBadge.textContent = `${found.name} ${titleSuffix}`;
      renderPresetBanner();
      if(subjectEl) subjectEl.value = `[에스디컴퍼니] ${familyNames[currentKind]} ${mode==='sample' ? '샘플 요청' : '견적 문의'} - ${found.name}`;
      document.querySelectorAll('.order-thumb').forEach(t=>t.classList.toggle('active', t.dataset.boxName===found.name));
    });
  }

  const requestedFamily = qs('family');
  if(requestedFamily && BOX_CATALOG[requestedFamily]) kind = requestedFamily;
  applyFamily(kind, currentItem.name);
  if(qs('focus')==='form' && focusTarget){
    setTimeout(()=>{ focusTarget.scrollIntoView({behavior:'smooth', block:'start'}); }, 120);
  }
  if(mode==='sample' && form){ initSampleDeliveryFields(form); }
  const firstInput = form ? form.querySelector('input[name="사용제품"]') : null;
  if(firstInput && (qs('focus')==='form' || qs('type'))){
    setTimeout(()=> firstInput.focus(), 200);
  }
} 

function initSampleDeliveryFields(form){
  const methodSel = form.querySelector('#sampleReceiveMethod, select[name="수령방법"]');
  const extraWrap = form.querySelector('#receiveExtraFields');
  if(!methodSel || !extraWrap) return;
  const blocks = {
    '방문요청': `
      <div class="sub-field"><label>방문 희망 주소</label><input name="방문희망주소" placeholder="방문 희망 주소를 입력해 주세요."></div>
    `,
    '택배발송': `
      <div class="sub-field"><label>수령인</label><input name="택배수령인" placeholder="수령인 성함"></div>
      <div class="sub-field"><label>수령인 연락처</label><input name="택배수령인연락처" placeholder="수령인 연락처"></div>
      <div class="sub-field"><label>배송지</label><input name="택배배송지" placeholder="배송지를 입력해 주세요."></div>
    `,
    '화물배송': `
      <div class="sub-field"><label>수령인</label><input name="화물수령인" placeholder="수령인 성함"></div>
      <div class="sub-field"><label>수령인 연락처</label><input name="화물수령인연락처" placeholder="수령인 연락처"></div>
      <div class="sub-field"><label>화물 배송지점</label><input name="화물배송지점" placeholder="화물배송지점을 입력해 주세요."></div>
    `,
    '직접수령': `
      <div class="sub-field"><label>방문희망일</label><input name="방문희망일" type="date"></div>
    `
  };
  function render(){
    const value = methodSel.value || '방문요청';
    extraWrap.innerHTML = blocks[value] || '';
    extraWrap.hidden = !extraWrap.innerHTML.trim();
  }
  methodSel.addEventListener('change', render);
  render();
}
function attachMailForm(formId, successText){
  const form = document.getElementById(formId);
  if(!form) return;

  function appendOrSet(fd, key, value){
    if(fd.has(key)) fd.set(key, value);
    else fd.append(key, value);
  }

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const fd = new FormData(form);
    const payload = {
      createdAt: new Date().toISOString(),
      family: form.dataset.family || '',
      requestType: form.dataset.requestType || '',
      shape: fd.get('박스형태') || '',
      product: fd.get('사용제품') || '',
      company: fd.get('회사명') || '',
      name: fd.get('성함') || fd.get('name') || '',
      email: fd.get('이메일') || fd.get('email') || '',
      phone: fd.get('연락처') || fd.get('phone') || '',
      width: fd.get('가로') || '',
      depth: fd.get('세로') || '',
      height: fd.get('높이') || '',
      qty: fd.get('수량') || '',
      flute: fd.get('골두께') || '',
      surface: fd.get('표면지') || '',
      strength: fd.get('강도') || '',
      print: fd.get('인쇄') || fd.get('인쇄선택') || '',
      paper: fd.get('종이재질') || '',
      coating: fd.get('코팅선택') || '',
      option: fd.get('옵션가공') || '',
      receive: fd.get('수령방법') || '',
      forklift: fd.get('지게차유무') || '',
      receiveVisitAddress: fd.get('방문희망주소') || '',
      parcelReceiver: fd.get('택배수령인') || '',
      parcelReceiverPhone: fd.get('택배수령인연락처') || '',
      parcelAddress: fd.get('택배배송지') || '',
      freightReceiver: fd.get('화물수령인') || '',
      freightReceiverPhone: fd.get('화물수령인연락처') || '',
      freightBranch: fd.get('화물배송지점') || '',
      pickupDate: fd.get('방문희망일') || '',
      memo: fd.get('추가메모') || fd.get('content') || fd.get('샘플용도') || '',
      title: fd.get('title') || ''
    };

    if(form.dataset.requestType === 'quote'){
      const estimate = calcEstimate(payload);
      saveEstimateSubmission({...payload, ...estimate});
    }

    const familyLabel = form.dataset.family === 'colorbox' ? '칼라박스' : '골판지박스';
    const requestLabel = form.dataset.requestType === 'sample' ? '샘플 요청' : '견적 요청';
    const subject = `[${requestLabel}] ${familyLabel} / ${payload.shape || '형태 미지정'} / ${payload.name || payload.company || '고객명 미입력'}`;

    const message = [
      `요청 구분: ${requestLabel}`,
      `제품군: ${familyLabel}`,
      `박스형태: ${payload.shape}`,
      `사용제품: ${payload.product}`,
      `회사명: ${payload.company}`,
      `성함: ${payload.name}`,
      `이메일: ${payload.email}`,
      `연락처: ${payload.phone}`,
      `사이즈(mm): ${payload.width} x ${payload.depth} x ${payload.height}`,
      `수량: ${payload.qty}`,
      payload.flute ? `골두께: ${payload.flute}` : '',
      payload.surface ? `표면지: ${payload.surface}` : '',
      payload.strength ? `강도: ${payload.strength}` : '',
      payload.print ? `인쇄: ${payload.print}` : '',
      payload.paper ? `종이재질: ${payload.paper}` : '',
      payload.coating ? `코팅선택: ${payload.coating}` : '',
      payload.option ? `옵션가공: ${payload.option}` : '',
      payload.receive ? `수령방법: ${payload.receive}` : '',
      payload.forklift ? `지게차유무: ${payload.forklift}` : '',
      payload.receiveVisitAddress ? `방문희망주소: ${payload.receiveVisitAddress}` : '',
      payload.parcelReceiver ? `택배수령인: ${payload.parcelReceiver}` : '',
      payload.parcelReceiverPhone ? `택배수령인연락처: ${payload.parcelReceiverPhone}` : '',
      payload.parcelAddress ? `택배배송지: ${payload.parcelAddress}` : '',
      payload.freightReceiver ? `화물수령인: ${payload.freightReceiver}` : '',
      payload.freightReceiverPhone ? `화물수령인연락처: ${payload.freightReceiverPhone}` : '',
      payload.freightBranch ? `화물배송지점: ${payload.freightBranch}` : '',
      payload.pickupDate ? `방문희망일: ${payload.pickupDate}` : '',
      payload.title ? `제목: ${payload.title}` : '',
      '',
      `[추가 메모 / 샘플 용도]`,
      payload.memo || '-'
    ].filter(Boolean).join('
');

    appendOrSet(fd, '_subject', subject);
    appendOrSet(fd, '_captcha', 'false');
    appendOrSet(fd, '_template', 'table');
    appendOrSet(fd, '_replyto', payload.email || '');
    appendOrSet(fd, 'email', payload.email || '');
    appendOrSet(fd, 'name', payload.name || '');
    appendOrSet(fd, 'message', message);

    try{
      const res = await fetch('https://formsubmit.co/ajax/sales@box.re.kr', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: fd
      });
      const data = await res.json().catch(() => ({}));
      if(res.ok && (data.success !== false)){
        alert(successText);
        form.reset();
      }else{
        alert('메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      }
    }catch(err){
      alert('메일 전송 중 오류가 발생했습니다. sales@box.re.kr 로 직접 연락해 주세요.');
    }
  });
}

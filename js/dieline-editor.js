
(function(){
  const FACE_KEYS=['front','right','back','left','top'];
  const FACE_NAMES={front:'앞면',right:'우측면',back:'뒷면',left:'좌측면',top:'윗면'};
  const STRUCTS={
    corr_a:{title:'골판지 A형',layout:{top:{x:320,y:70,w:320,h:120},left:{x:120,y:200,w:200,h:160},front:{x:320,y:200,w:320,h:160},right:{x:640,y:200,w:200,h:160},back:{x:320,y:360,w:320,h:200}}},
    corr_pizza:{title:'골판지 피자박스',layout:{top:{x:250,y:80,w:460,h:120},left:{x:120,y:200,w:130,h:170},front:{x:250,y:200,w:460,h:170},right:{x:710,y:200,w:130,h:170},back:{x:250,y:370,w:460,h:200}}},
    corr_mailer:{title:'골판지 우편형',layout:{top:{x:280,y:70,w:400,h:110},left:{x:160,y:180,w:120,h:170},front:{x:280,y:180,w:400,h:170},right:{x:680,y:180,w:120,h:170},back:{x:280,y:350,w:400,h:230}}},
    color_mono:{title:'칼라 단상자',layout:{top:{x:280,y:60,w:400,h:110},left:{x:160,y:170,w:120,h:180},front:{x:280,y:170,w:400,h:180},right:{x:680,y:170,w:120,h:180},back:{x:280,y:350,w:400,h:220}}},
    color_sleeve:{title:'칼라 슬리브박스',layout:{top:{x:330,y:110,w:300,h:90},left:{x:160,y:210,w:170,h:170},front:{x:330,y:210,w:300,h:170},right:{x:630,y:210,w:170,h:170},back:{x:330,y:390,w:300,h:150}}},
    color_lidbase:{title:'칼라 상하짝',layout:{top:{x:300,y:70,w:360,h:120},left:{x:170,y:210,w:130,h:150},front:{x:300,y:210,w:360,h:150},right:{x:660,y:210,w:130,h:150},back:{x:300,y:370,w:360,h:210}}}
  };
  const patterns=[
    {name:'라인 플라워', svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="none" stroke="#222" stroke-width="5" stroke-linecap="round" d="M49 88V35M49 35c-8-15-22-18-22-18 0 14 3 24 18 24M49 35c8-15 22-18 22-18 0 14-3 24-18 24M49 58c-10-11-23-11-23-11 4 12 10 22 23 22M49 58c10-11 23-11 23-11-4 12-10 22-23 22"/></svg>'},
    {name:'잎사귀', svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#ff7a30" d="M50 10c16 0 28 13 28 30S63 78 50 90C37 78 22 57 22 40S34 10 50 10z"/></svg>'},
    {name:'리본', svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#6db2ff" d="M18 32h64v18H18z"/><path fill="#14223c" d="M44 32h12v50l-6-7-6 7z"/></svg>'},
    {name:'별', svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#ffd250" d="M50 10l10 24 26 2-20 16 7 25-23-14-23 14 7-25-20-16 26-2z"/></svg>'},
    {name:'원형 로고', svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="#14223c"/><text x="50" y="58" font-size="26" text-anchor="middle" fill="#fff" font-family="Arial">SD</text></svg>'},
    {name:'웨이브', svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="none" stroke="#53c6a1" stroke-width="8" d="M5 56c15 0 15-16 30-16s15 16 30 16 15-16 30-16"/></svg>'}
  ];

  let activeFace='front';
  let FACE_RECTS={};
  let fabricCanvas, renderer, scene, camera, boxMesh, lidMesh;
  let isHydrating=false;
  const faceObjects={front:[],right:[],back:[],left:[],top:[]};
  const faceCanvases={};
  FACE_KEYS.forEach(k=>{const c=document.createElement('canvas'); c.width=1024; c.height=1024; faceCanvases[k]=c;});

  function $(s,r=document){return r.querySelector(s)}
  function $all(s,r=document){return [...r.querySelectorAll(s)]}
  function currentKey(){ return $('#editorStructure').value; }
  function currentStruct(){ return STRUCTS[currentKey()]; }
  function clipForFace(faceKey){ const r=FACE_RECTS[faceKey]; return new fabric.Rect({left:r.x,top:r.y,width:r.w,height:r.h,absolutePositioned:true}); }

  function currentUser(){ return localStorage.getItem('sd_editor_user') || ''; }
  function refreshLoginChip(){
    const chip = $('#editorLoginChip');
    if(!chip) return;
    const user = currentUser();
    chip.textContent = user ? `${user} 로그인됨` : '비로그인 상태';
  }
  function loginPrompt(){
    const existing = currentUser();
    if(existing){
      if(confirm(`${existing} 계정 상태를 해제할까요?`)){
        localStorage.removeItem('sd_editor_user');
        refreshLoginChip();
      }
      return;
    }
    const name = prompt('저장용 이름 또는 아이디를 입력하세요.', 'sd_user');
    if(name){
      localStorage.setItem('sd_editor_user', name);
      refreshLoginChip();
    }
  }

  function initTabs(){
    $all('.editor-tab').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        $all('.editor-tab').forEach(b=>b.classList.remove('active'));
        $all('.editor-tab-panel').forEach(p=>p.classList.remove('active'));
        btn.classList.add('active');
        $('#tab-' + btn.dataset.tab).classList.add('active');
      });
    });
  }

  function initFaceButtons(){
    const wrap = $('#faceButtons');
    wrap.innerHTML = '';
    FACE_KEYS.forEach(key=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='face-btn' + (key===activeFace?' active':'');
      btn.textContent = FACE_NAMES[key];
      btn.dataset.face=key;
      btn.onclick=()=>switchFace(key);
      wrap.appendChild(btn);
    });
  }
  function refreshFaceButtons(){
    $all('.face-btn').forEach(btn=>btn.classList.toggle('active', btn.dataset.face===activeFace));
  }
  function switchFace(face){
    saveCurrentFaceState();
    activeFace = face;
    refreshFaceButtons();
    drawEditorBase();
  }

  function getGuides(key){
    if(key==='corr_pizza'){
      return {
        folds:[[250,200,710,200],[250,370,710,370],[250,200,250,370],[710,200,710,370]],
        cuts:[[120,200,120,370],[840,200,840,370],[250,80,250,200],[710,80,710,200],[250,570,710,570]]
      };
    }
    if(key==='corr_mailer'){
      return {
        folds:[[280,180,680,180],[280,350,680,350],[280,180,280,350],[680,180,680,350]],
        cuts:[[160,180,160,350],[800,180,800,350],[280,70,280,180],[680,70,680,180],[280,580,680,580]]
      };
    }
    return {
      folds:[[320,190,640,190],[320,200,320,560],[640,200,640,560],[320,360,120,360],[640,360,840,360]],
      cuts:[[120,200,120,360],[840,200,840,360],[320,70,320,190],[640,70,640,190],[320,560,640,560]]
    };
  }

  function buildPatternGrid(){
    const grid = $('#patternGrid');
    grid.innerHTML = '';
    patterns.forEach(p=>{
      const el = document.createElement('button');
      el.type='button';
      el.className='pattern-card';
      el.innerHTML = `<div class="pattern-thumb">${p.svg}</div><span>${p.name}</span>`;
      el.onclick=()=>addPattern(p.svg,p.name);
      grid.appendChild(el);
    });
  }

  function initCanvas(){
    fabricCanvas = new fabric.Canvas('dielineCanvas', {
      preserveObjectStacking:true,
      selection:true,
      backgroundColor:'#ffffff'
    });
    fabricCanvas.on('object:modified', persistAndRefresh);
    fabricCanvas.on('selection:created', syncLayers);
    fabricCanvas.on('selection:updated', syncLayers);
  }

  function drawEditorBase(){
    FACE_RECTS = currentStruct().layout;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = '#ffffff';
    fabricCanvas.add(new fabric.Rect({
      left:0, top:0, width:fabricCanvas.width, height:fabricCanvas.height,
      fill:'#ffffff', selectable:false, evented:false, excludeExport:true
    }));

    Object.entries(FACE_RECTS).forEach(([key,r])=>{
      fabricCanvas.add(new fabric.Rect({
        left:r.x, top:r.y, width:r.w, height:r.h,
        fill:'#fbfcff', stroke:'#cfd6e4', strokeWidth:2, rx:16, ry:16,
        selectable:false, evented:false, excludeExport:true, isGuide:true, guideType:'panel'
      }));
      fabricCanvas.add(new fabric.Text(FACE_NAMES[key], {
        left:r.x+12, top:r.y+12, fontSize:18, fontWeight:'700', fill:'#7a89a4',
        selectable:false, evented:false, excludeExport:true, isGuide:true, guideType:'label'
      }));
    });

    const guides = getGuides(currentKey());
    guides.folds.forEach(l=>fabricCanvas.add(new fabric.Line(l,{
      stroke:'#ff5bb7', strokeWidth:2, selectable:false, evented:false, excludeExport:true, isGuide:true, guideType:'fold'
    })));
    guides.cuts.forEach(l=>fabricCanvas.add(new fabric.Line(l,{
      stroke:'#70c9ff', strokeWidth:2, strokeDashArray:[8,6], selectable:false, evented:false, excludeExport:true, isGuide:true, guideType:'cut'
    })));

    hydrateFaceObjects();
    applyGuideVisibility();
    fabricCanvas.renderAll();
    $('#previewTitle').textContent = currentStruct().title + ' 미리보기';
  }

  function saveCurrentFaceState(){
    if(isHydrating) return;
    faceObjects[activeFace] = fabricCanvas.getObjects()
      .filter(o=>o.faceKey===activeFace)
      .map(o=>o.toObject(['faceKey','name','isLocked']));
  }

  function hydrateFaceObjects(){
    isHydrating = true;
    const objs = faceObjects[activeFace] || [];
    fabric.util.enlivenObjects(objs, enlivened=>{
      enlivened.forEach(obj=>{
        obj.faceKey = activeFace;
        obj.clipPath = clipForFace(activeFace);
        obj.transparentCorners = false;
        obj.cornerStyle = 'circle';
        obj.cornerColor = '#ff7a30';
        obj.borderColor = '#ff7a30';
        if(obj.isLocked){ obj.selectable=false; obj.evented=false; }
        fabricCanvas.add(obj);
      });
      isHydrating = false;
      syncLayers();
      update3DTextures();
    });
  }

  function attachObject(obj){
    obj.faceKey = activeFace;
    obj.clipPath = clipForFace(activeFace);
    obj.transparentCorners = false;
    obj.cornerStyle = 'circle';
    obj.cornerColor = '#ff7a30';
    obj.borderColor = '#ff7a30';
    obj.isLocked = false;
    fabricCanvas.add(obj);
    fabricCanvas.setActiveObject(obj);
    persistAndRefresh();
  }

  function addPattern(svgMarkup, name){
    fabric.loadSVGFromString(svgMarkup, (objects, options)=>{
      const item = fabric.util.groupSVGElements(objects, options);
      const r = FACE_RECTS[activeFace];
      item.set({left:r.x+r.w/2-45, top:r.y+r.h/2-45, scaleX:.9, scaleY:.9, name});
      attachObject(item);
    });
  }

  function addText(value){
    if(!value.trim()) return;
    const r = FACE_RECTS[activeFace];
    const text = new fabric.IText(value, {
      left:r.x+22, top:r.y+40,
      fontSize:parseInt($('#fontSize').value || '36', 10),
      fill:$('#fontColor').value || '#15233d',
      fontWeight:'700',
      fontFamily:'Noto Sans KR',
      name:'텍스트'
    });
    attachObject(text);
  }

  function addImageFromUrl(url){
    if(!url) return;
    fabric.Image.fromURL(url, img=>{
      const r = FACE_RECTS[activeFace];
      const scale = Math.min((r.w*.55)/img.width, (r.h*.55)/img.height);
      img.set({left:r.x+30, top:r.y+30, scaleX:scale, scaleY:scale, crossOrigin:'anonymous', name:'이미지'});
      attachObject(img);
    }, {crossOrigin:'anonymous'});
  }

  function syncLayers(){
    const list = $('#layerList');
    list.innerHTML = '';
    const objs = fabricCanvas.getObjects().filter(o=>o.faceKey===activeFace);
    objs.slice().reverse().forEach((obj, i)=>{
      const row = document.createElement('div');
      row.className = 'layer-row';
      row.innerHTML = `<div class="layer-title">${obj.name || obj.type || ('오브젝트 ' + (i+1))}</div>`;
      const title = row.querySelector('.layer-title');
      title.onclick = ()=>{ fabricCanvas.setActiveObject(obj); fabricCanvas.renderAll(); };

      const lock = document.createElement('button');
      lock.type='button'; lock.className='tiny-btn'; lock.textContent = obj.isLocked ? '🔒' : '🔓';
      lock.onclick = ()=>{ obj.isLocked=!obj.isLocked; obj.selectable=!obj.isLocked; obj.evented=!obj.isLocked; persistAndRefresh(); };

      const up = document.createElement('button');
      up.type='button'; up.className='tiny-btn'; up.textContent='↑';
      up.onclick = ()=>{ fabricCanvas.bringForward(obj); persistAndRefresh(); };

      const down = document.createElement('button');
      down.type='button'; down.className='tiny-btn'; down.textContent='↓';
      down.onclick = ()=>{ fabricCanvas.sendBackwards(obj); persistAndRefresh(); };

      row.append(lock, up, down);
      list.appendChild(row);
    });
  }

  function persistAndRefresh(){
    saveCurrentFaceState();
    syncLayers();
    update3DTextures();
    fabricCanvas.renderAll();
  }

  function alignSelected(mode){
    const obj = fabricCanvas.getActiveObject();
    if(!obj) return;
    const r = FACE_RECTS[activeFace];
    if(mode==='left') obj.set({left:r.x+16});
    if(mode==='center') obj.set({left:r.x + r.w/2 - obj.getScaledWidth()/2});
    if(mode==='right') obj.set({left:r.x + r.w - obj.getScaledWidth() - 16});
    persistAndRefresh();
  }

  function applyGuideVisibility(){
    const showCut = $('#toggleCut').checked;
    const showFold = $('#toggleFold').checked;
    fabricCanvas.getObjects().forEach(obj=>{
      if(obj.isGuide && obj.guideType==='cut') obj.visible = showCut;
      if(obj.isGuide && obj.guideType==='fold') obj.visible = showFold;
    });
    fabricCanvas.renderAll();
  }

  function exportPNG(){
    const dataUrl = fabricCanvas.toDataURL({format:'png', multiplier:2});
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'box-re-editor.png';
    a.click();
  }

  function exportSVG(){
    const objs = fabricCanvas.getObjects().filter(o=>!o.excludeExport && !o.isGuide);
    const temp = new fabric.StaticCanvas(null,{width:fabricCanvas.width,height:fabricCanvas.height,backgroundColor:'#ffffff'});
    Promise.all(objs.map(o=>new Promise(resolve=>o.clone(cl=>{cl.clipPath=null; temp.add(cl); resolve();})))).then(()=>{
      temp.renderAll();
      const blob = new Blob([temp.toSVG()], {type:'image/svg+xml;charset=utf-8'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'box-re-editor.svg';
      a.click();
    });
  }

  async function exportPDF(){
    if(!window.jspdf || !window.jspdf.jsPDF){
      const script = document.createElement('script');
      script.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      await new Promise((resolve,reject)=>{script.onload=resolve; script.onerror=reject; document.head.appendChild(script);});
    }
    const dataUrl = fabricCanvas.toDataURL({format:'png', multiplier:2});
    const img = new Image();
    img.onload = ()=>{
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({orientation:img.width>img.height?'landscape':'portrait',unit:'pt',format:'a4'});
      const pw = pdf.internal.pageSize.getWidth();
      const ph = pdf.internal.pageSize.getHeight();
      const ratio = Math.min((pw-40)/img.width, (ph-40)/img.height);
      pdf.addImage(dataUrl,'PNG',(pw-img.width*ratio)/2,20,img.width*ratio,img.height*ratio);
      pdf.save('box-re-editor.pdf');
    };
    img.src = dataUrl;
  }

  function saveProject(){
    const user = currentUser();
    if(!user){
      alert('로그인 후 저장할 수 있습니다. 우측 상단 로그인 버튼을 눌러 이름을 입력하세요.');
      return;
    }
    saveCurrentFaceState();
    const payload = {version:1, structure:currentKey(), activeFace, faceObjects};
    localStorage.setItem(`sd_editor_project_${user}`, JSON.stringify(payload));
    alert('브라우저에 저장되었습니다.');
  }

  function loadProject(){
    const user = currentUser();
    if(!user){
      alert('로그인 후 불러올 수 있습니다.');
      return;
    }
    const raw = localStorage.getItem(`sd_editor_project_${user}`);
    if(!raw){
      alert('저장된 프로젝트가 없습니다.');
      return;
    }
    const data = JSON.parse(raw);
    Object.keys(faceObjects).forEach(k=>faceObjects[k]=data.faceObjects[k] || []);
    $('#editorStructure').value = data.structure || 'corr_a';
    activeFace = data.activeFace || 'front';
    refreshFaceButtons();
    drawEditorBase();
  }

  function pushLead(lead){
    const arr = JSON.parse(localStorage.getItem('sd_quote_leads') || '[]');
    arr.unshift(lead);
    localStorage.setItem('sd_quote_leads', JSON.stringify(arr));
  }

  function connectQuote(){
    const lead = {
      structure: currentStruct().title,
      face: FACE_NAMES[activeFace],
      user: currentUser(),
      savedAt: new Date().toISOString(),
      status: '접수대기'
    };
    pushLead(lead);
    const qs = new URLSearchParams({box: currentStruct().title, face: FACE_NAMES[activeFace], user: currentUser() || ''});
    location.href = `quote.html?${qs.toString()}`;
  }

  function buildFaceTexture(faceKey){
    const c = faceCanvases[faceKey], ctx = c.getContext('2d');
    ctx.clearRect(0,0,c.width,c.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,c.width,c.height);
    const objects = faceObjects[faceKey] || [];
    if(!objects.length){ updateThreeMaterials(); return; }
    const rect = FACE_RECTS[faceKey];
    const temp = new fabric.StaticCanvas(null,{width:rect.w,height:rect.h,backgroundColor:'#ffffff'});
    fabric.util.enlivenObjects(objects, enlivened=>{
      enlivened.forEach(obj=>{ obj.set({left:obj.left-rect.x, top:obj.top-rect.y, clipPath:null}); temp.add(obj); });
      temp.renderAll();
      const img = new Image();
      img.onload = ()=>{ ctx.drawImage(img,0,0,c.width,c.height); updateThreeMaterials(); };
      img.src = temp.toDataURL({format:'png', multiplier:2});
    });
  }

  function update3DTextures(){ FACE_KEYS.forEach(buildFaceTexture); }

  function textureFromCanvas(c){
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }

  function updateThreeMaterials(){
    if(!boxMesh) return;
    boxMesh.material[0].map = textureFromCanvas(faceCanvases.right);
    boxMesh.material[1].map = textureFromCanvas(faceCanvases.left);
    boxMesh.material[2].map = textureFromCanvas(faceCanvases.top);
    boxMesh.material[4].map = textureFromCanvas(faceCanvases.front);
    boxMesh.material[5].map = textureFromCanvas(faceCanvases.back);
    boxMesh.material.forEach(m=>m.needsUpdate=true);
    if(lidMesh){
      lidMesh.material[2].map = textureFromCanvas(faceCanvases.top);
      lidMesh.material.forEach(m=>m.needsUpdate=true);
    }
  }

  function initThree(){
    const wrap = $('#threePreview');
    renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    wrap.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, wrap.clientWidth / wrap.clientHeight, .1, 1000);
    camera.position.set(0,2.2,7.2);

    scene.add(new THREE.AmbientLight(0xffffff,1.5));
    const dir = new THREE.DirectionalLight(0xffffff,1.2);
    dir.position.set(5,8,6);
    scene.add(dir);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(20,20), new THREE.ShadowMaterial({opacity:.14}));
    floor.rotation.x = -Math.PI/2;
    floor.position.y = -1.7;
    scene.add(floor);

    const geom = new THREE.BoxGeometry(4.3,2.2,3.2);
    const mats = [0,1,2,3,4,5].map((_,i)=>new THREE.MeshStandardMaterial({color:i===3?0xd8c0a0:0xffffff}));
    boxMesh = new THREE.Mesh(geom, mats);
    scene.add(boxMesh);

    const lidGeom = new THREE.BoxGeometry(4.32,.14,3.25);
    const lidMats = [0,1,2,3,4,5].map((_,i)=>new THREE.MeshStandardMaterial({color:i===2?0xffffff:0xd8c0a0}));
    lidMesh = new THREE.Mesh(lidGeom, lidMats);
    lidMesh.position.set(0,1.42,-0.5);
    lidMesh.rotation.x = -0.98;
    scene.add(lidMesh);

    (function animate(){
      requestAnimationFrame(animate);
      boxMesh.rotation.y += 0.005;
      lidMesh.rotation.z = Math.sin(Date.now()*0.001)*0.03;
      renderer.render(scene,camera);
    })();

    window.addEventListener('resize', ()=>{
      renderer.setSize(wrap.clientWidth, wrap.clientHeight);
      camera.aspect = wrap.clientWidth / wrap.clientHeight;
      camera.updateProjectionMatrix();
    });
  }

  function bindEvents(){
    $('#editorLoginBtn').onclick = loginPrompt;
    $('#editorStructure').addEventListener('change', drawEditorBase);
    $('#toggleCut').addEventListener('change', applyGuideVisibility);
    $('#toggleFold').addEventListener('change', applyGuideVisibility);
    $('#btnAddText').onclick = ()=>addText($('#textValue').value);
    $all('.quick-text').forEach(el=>el.onclick=()=>addText(el.dataset.text));
    $('#btnAddUrlImage').onclick = ()=>addImageFromUrl($('#imageUrl').value.trim());
    $('#imageLoader').addEventListener('change', e=>{
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = ev=>addImageFromUrl(ev.target.result);
      reader.readAsDataURL(file);
    });
    $('#btnDelete').onclick = ()=>{ const obj=fabricCanvas.getActiveObject(); if(obj && obj.faceKey){ fabricCanvas.remove(obj); persistAndRefresh(); } };
    $('#btnDuplicate').onclick = ()=>{ const obj=fabricCanvas.getActiveObject(); if(!obj) return; obj.clone(cloned=>{ cloned.set({left:obj.left+20, top:obj.top+20, name:obj.name||'복제 오브젝트'}); cloned.faceKey=activeFace; cloned.clipPath=clipForFace(activeFace); fabricCanvas.add(cloned); persistAndRefresh(); }); };
    $('#btnBringFront').onclick = ()=>{ const obj=fabricCanvas.getActiveObject(); if(obj){ fabricCanvas.bringToFront(obj); persistAndRefresh(); } };
    $('#btnSendBack').onclick = ()=>{ const obj=fabricCanvas.getActiveObject(); if(obj){ fabricCanvas.sendBackwards(obj); persistAndRefresh(); } };
    $('#btnAlignLeft').onclick = ()=>alignSelected('left');
    $('#btnAlignCenter').onclick = ()=>alignSelected('center');
    $('#btnAlignRight').onclick = ()=>alignSelected('right');
    $('#btnNew').onclick = ()=>{ Object.keys(faceObjects).forEach(k=>faceObjects[k]=[]); activeFace='front'; refreshFaceButtons(); drawEditorBase(); };
    $('#btnSave').onclick = saveProject;
    $('#btnLoad').onclick = loadProject;
    $('#btnExportPNG').onclick = exportPNG;
    $('#btnExportSVG').onclick = exportSVG;
    $('#btnExportPDF').onclick = exportPDF;
    $('#btnQuote').onclick = connectQuote;
  }

  function init(){
    if(!window.fabric || !window.THREE) return;
    refreshLoginChip();
    initTabs();
    initFaceButtons();
    buildPatternGrid();
    initCanvas();
    bindEvents();
    drawEditorBase();
    initThree();
  }

  document.addEventListener('DOMContentLoaded', init);
})();

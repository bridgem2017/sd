
const PATTERNS=[
 {name:'잎',svg:`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><path fill='#ff7a30' d='M60 12c18 0 32 15 32 34S75 90 60 104C45 90 28 65 28 46S42 12 60 12z'/></svg>`},
 {name:'도트',svg:`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>${Array.from({length:9},(_,i)=>`<circle cx='${20+(i%3)*38}' cy='${20+Math.floor(i/3)*38}' r='8' fill='${i%2?'#1f8cff':'#ff4d6d'}'/>`).join('')}</svg>`},
 {name:'리본',svg:`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><path fill='#6ad24f' d='M14 48h92v24H14z'/><path fill='#182847' d='M53 48h14v56l-7-6-7 6z'/></svg>`},
 {name:'로고',svg:`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><circle cx='60' cy='60' r='42' fill='#17243d'/><text x='60' y='72' font-size='30' fill='white' text-anchor='middle' font-family='Arial'>SD</text></svg>`}
];
const STRUCTS={
 ptype:{label:'P형 박스',dims:{w:500,h:230,d:350},faces:{front:[120,480,520,150],base:[120,330,520,150],left:[20,330,100,150],right:[640,330,100,150],lid:[90,40,590,290]}},
 atype:{label:'A형 박스',dims:{w:500,h:280,d:360},faces:{front:[160,500,480,160],base:[160,340,480,160],left:[60,340,100,160],right:[640,340,100,160],lid:[110,30,580,310]}},
 gtype:{label:'G형 박스',dims:{w:480,h:210,d:330},faces:{front:[140,490,500,140],base:[140,350,500,140],left:[40,350,100,140],right:[640,350,100,140],lid:[120,80,560,270]}}
};
let canvas,activeFace='front',state={front:[],left:[],right:[],base:[],lid:[]},struct='ptype',renderer,scene,camera,mesh;
function faceRect(k){return STRUCTS[struct].faces[k]}
function initEditor(){
  canvas=new fabric.Canvas('editorCanvas',{backgroundColor:'#fff',preserveObjectStacking:true});
  drawTemplate(); init3D(); buildAssets(); buildFaces(); bind();
}
function drawTemplate(){
  canvas.clear(); const f=STRUCTS[struct].faces;
  canvas.add(new fabric.Rect({left:0,top:0,width:980,height:760,fill:'#fff',selectable:false,evented:false}));
  Object.entries(f).forEach(([k,v])=>{
    const [x,y,w,h]=v;
    canvas.add(new fabric.Rect({left:x,top:y,width:w,height:h,fill:k==='lid'?'#fcf7ff':'#faf7f1',stroke:'#cfc7bb',strokeWidth:2,rx:14,ry:14,selectable:false,evented:false,excludeExport:true}));
    canvas.add(new fabric.Text(k==='base'?'바닥':k==='lid'?'뚜껑':k==='front'?'앞면':k==='left'?'좌측':k==='right'?'우측':k,{left:x+10,top:y+8,fontSize:18,fill:'#7d889e',fontWeight:'700',selectable:false,evented:false,excludeExport:true}));
  });
  Object.values(state).flat().forEach(o=>canvas.add(o));
  canvas.renderAll(); updatePreview();
}
function buildFaces(){
  const wrap=document.getElementById('faceGrid');
  wrap.innerHTML=['front','left','right','base','lid'].map(k=>`<button data-face='${k}' class='${k===activeFace?'active':''}'>${k==='base'?'바닥':k==='lid'?'뚜껑':k==='front'?'앞면':k==='left'?'좌측':'우측'}</button>`).join('');
  wrap.querySelectorAll('button').forEach(b=>b.onclick=()=>{activeFace=b.dataset.face;buildFaces();});
}
function buildAssets(){
  const wrap=document.getElementById('assetGrid');
  wrap.innerHTML=PATTERNS.map((p,i)=>`<div class='asset' data-i='${i}'><div class='mini-thumb'>${p.svg}</div><span>${p.name}</span></div>`).join('');
  wrap.querySelectorAll('.asset').forEach(el=>el.onclick=()=>fabric.loadSVGFromString(PATTERNS[+el.dataset.i].svg,(objs,opt)=>{const group=fabric.util.groupSVGElements(objs,opt); const [x,y,w,h]=faceRect(activeFace); group.set({left:x+w/2-50,top:y+h/2-50,scaleX:.8,scaleY:.8,faceKey:activeFace}); state[activeFace].push(group); canvas.add(group); canvas.setActiveObject(group); canvas.renderAll(); updatePreview();})));
}
function bind(){
  document.getElementById('structure').onchange=e=>{struct=e.target.value; drawTemplate(); updateMeta();};
  document.getElementById('btnText').onclick=()=>{const v=document.getElementById('textInput').value.trim(); if(!v)return; const [x,y,w,h]=faceRect(activeFace); const t=new fabric.IText(v,{left:x+w/2-60,top:y+h/2-18,fontSize:38,fill:document.getElementById('color').value,fontWeight:'700',fontFamily:'Noto Sans KR',faceKey:activeFace}); state[activeFace].push(t); canvas.add(t); canvas.setActiveObject(t); canvas.renderAll(); updatePreview();};
  document.getElementById('upload').onchange=e=>{const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=ev=>fabric.Image.fromURL(ev.target.result,img=>{const [x,y,w,h]=faceRect(activeFace); const s=Math.min((w*.5)/img.width,(h*.5)/img.height); img.set({left:x+w/2-img.width*s/2,top:y+h/2-img.height*s/2,scaleX:s,scaleY:s,faceKey:activeFace}); state[activeFace].push(img); canvas.add(img); canvas.setActiveObject(img); canvas.renderAll(); updatePreview();}); r.readAsDataURL(f);};
  document.getElementById('btnDelete').onclick=()=>{const o=canvas.getActiveObject(); if(!o)return; state[activeFace]=state[activeFace].filter(x=>x!==o); canvas.remove(o); updatePreview();};
  document.getElementById('btnSvg').onclick=()=>{const a=document.createElement('a'); const blob=new Blob([canvas.toSVG()],{type:'image/svg+xml'}); a.href=URL.createObjectURL(blob); a.download='box-editor.svg'; a.click();};
  document.getElementById('btnPng').onclick=()=>{const a=document.createElement('a'); a.href=canvas.toDataURL({format:'png',multiplier:2}); a.download='box-editor.png'; a.click();};
  document.getElementById('btnQuote').onclick=()=>{location.href='quote.html?structure='+encodeURIComponent(STRUCTS[struct].label);}
}
function init3D(){
  const el=document.getElementById('preview3d');
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:true}); renderer.setSize(el.clientWidth,el.clientHeight); el.innerHTML=''; el.appendChild(renderer.domElement);
  scene=new THREE.Scene(); camera=new THREE.PerspectiveCamera(35,el.clientWidth/el.clientHeight,.1,100); camera.position.set(0,1.8,7.3);
  const amb=new THREE.AmbientLight(0xffffff,.95); scene.add(amb); const dir=new THREE.DirectionalLight(0xffffff,1.2); dir.position.set(3,5,4); scene.add(dir);
  const geo=new THREE.BoxGeometry(4.8,1.2,3.4); const mat=new THREE.MeshStandardMaterial({color:0xd8c0a6});
  mesh=new THREE.Mesh(geo,mat); mesh.position.y=-1.2; scene.add(mesh);
  function loop(){requestAnimationFrame(loop); mesh.rotation.y=0.55; renderer.render(scene,camera);} loop();
}
function updatePreview(){
  const svg=canvas.toSVG(); const tex=new THREE.CanvasTexture(canvas.lowerCanvasEl); tex.needsUpdate=true;
  if(mesh){mesh.material=new THREE.MeshStandardMaterial({map:tex,color:0xffffff});}
  updateMeta();
}
function updateMeta(){
  document.getElementById('meta').innerHTML=`<strong>${STRUCTS[struct].label}</strong><br>현재 편집면: ${activeFace}<br>요청하신 구조는 GitHub 업로드용 정적 사이트에서도 바로 동작하도록 구성했습니다.`;
}
document.addEventListener('DOMContentLoaded',initEditor);

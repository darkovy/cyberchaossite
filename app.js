const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
let reduced = reducedQuery.matches;
let userMotionChoice = false;
function setMotion(value) {
  reduced = value;
  document.body.classList.toggle('reduced-motion', reduced);
  document.body.classList.toggle('js-motion', !reduced);
  $('#motion-toggle').setAttribute('aria-pressed', String(reduced));
  $('#motion-toggle').textContent = reduced ? 'Hareketi aç' : 'Hareketi azalt';
  if (reduced) { $$('.reveal').forEach(el => el.classList.add('visible')); $('.hero-art').style.transform = ''; }
  requestTick();
}
const characters = [
  {name:'DARKOVY',role:'KAOSUN MERKEZİ',image:'darkovy',color:'#ed623b',description:'Kızıl zırh. Yakıcı güç. Düşman hattının tam ortasında kendine yer aç.',skill:'Kahramanına özgü aktif yetenek',alt:'Darkovy, kırmızı ışıklı zırhı ve alevli eliyle'},
  {name:'QYPCAK',role:'TAKTİK ÜSTÜNLÜK',image:'qypcak',color:'#60b8ea',description:'Kıpçak maskesinin ardında soğukkanlı bir savaşçı. Seri mavi lazerlerle düşman hattını del.',skill:'Sersemletici bomba / Alan kontrolü',alt:'Qypcak, Kıpçak miğferi ve mavi lazer karabinasıyla'},
  {name:'BUSHEAD',role:'ÖZEL TESLİMAT',image:'bushead',color:'#efb66b',description:'Dev fırıncı küreği. Ayılı önlük. Sipariş basit: yolu temizle.',skill:'The Ultimate Baker / Minibüs saldırısı',alt:'BusHead, ayı desenli fırıncı önlüğü ve büyük küreğiyle'},
  {name:'BLACKBEARD',role:'SESİ SONUNA KADAR AÇ',image:'blackbeard',color:'#c698df',description:'Sahne onun. Ses dalgalarıyla savaşın ritmini değiştir; konser alanını düşmana dar et.',skill:'Kahramanına özgü aktif yetenek',alt:'BlackBeard, neon gitarıyla ağır metal savaşçısı'},
  {name:'SALADIN',role:'SINIRLARINI PARÇALA',image:'saladin',color:'#e7ab64',description:'Ham kuvvet, ağır darbeler. Titan Spor Salonu’ndan çıkan güç cepheye taşınıyor.',skill:'Kahramanına özgü aktif yetenek',alt:'Saladin, ağır spor ekipmanıyla güçlü savaşçı'},
  {name:'PROFESSOR G',role:'KAOSUN BİLİMİ',image:'professor',color:'#a4c67b',description:'Veri Bahçesi’nden savaş alanına. Deneysel bir yaklaşım, kendine özgü bir cephanelik.',skill:'Kahramanına özgü aktif yetenek',alt:'Professor G, deneysel bilim ekipmanıyla'},
  {name:'ROBOMAN',role:'PLAZMA ÇEKİRDEĞİ',image:'roboman',color:'#65d5dc',description:'Fildişi zırhın içinde durmayan bir güç. Koluna entegre plazma topuyla düşman hattını erit.',skill:'Plazma topu / Seri enerji atışları',alt:'Roboman, krem ve petrol zırhı ve entegre plazma topuyla'},
  {name:'TIGERMAN',role:'AV BAŞLADI',image:'tigerman',color:'#efa258',description:'Avcı tüfeğiyle yakın mesafeyi kontrol et. Geniş saçma atışlarıyla sürüyü dağıt.',skill:'Avcı tüfeği / Geniş açılı saçmalar',alt:'Tigerman, turuncu kaplan savaşçı ve çift namlulu avcı tüfeği'},
  {name:'SOPHIE',role:'ALTIN IŞIK',image:'sophie',color:'#e9c46c',description:'Beyaz kanatlar, altın zırh ve kutsal asa. Işınlarınla karanlık safları del.',skill:'Kutsal asa / Altın ışınlar',alt:'Sophie, beyaz kanatlı kedi melek ve altın asası'},
  {name:'NIKHA',role:'BÜYÜK İŞTAH',image:'nikha',color:'#6bd4ed',description:'Beyaz kürk, siber zırh ve tek bir dev enerji lokması. Sekerek gelen bir sürprize hazır ol.',skill:'Enerji lokması / Seken atışlar',alt:'Nikha, mavi gözlü iri beyaz kedi ve tavuk bageti'},
  {name:'MAVVY',role:'ÇİFT BIÇAK',image:'mavvy',color:'#72c8ed',description:'Neon bıçaklar düşmanları delip geri döner. Her atışta yeni bir rota çiz.',skill:'Neon bıçaklar / Geri dönen saldırı',alt:'Mavvy, uzun siyah saçları ve iki mavi enerji bıçağıyla'},
  {name:'DARKLORD',role:'MEKANİK ÜSTÜNLÜK',image:'darklord',color:'#de7863',description:'Küçük pilot. Dev mek. Dört parmaklı ağır pençenle kuşatmayı yar.',skill:'Mek pençesi / Geri iten darbeler',alt:'Darklord, çocuk pilotlu siyah kızıl mek ve dört parmaklı pençe'},
  {name:'QUSHU',role:'HOLOGRAFİK ZEKÂ',image:'qushu',color:'#e6c578',description:'Altın devreler ve bir hologram sürüsü. Teknolojiyi kendi tarafına çek.',skill:'Hologram sürüsü / Takip eden dronlar',alt:'Qushu, altın gözlükleri ve holografik baykuş konsoluyla'},
  {name:'0x65',role:'KESKİN PROTOKOL',image:'0x65',color:'#ed7779',description:'Çelik bir kurt. Kızıl bir katana. Yakın safları biç, kesik dalgalarını ileri taşı.',skill:'Siber katana / Enerji kesikleri',alt:'0x65, metal kurt samuray ve kırmızı siber katanası'},
  {name:'FR33SLAV3',role:'ZİNCİRİ KIR',image:'fr33slav3',color:'#bd83e2',description:'Ritmi sen belirle. Ağır zincirli kürenle etrafındaki düşmanları ez.',skill:'Zincirli küre / Dönen ağır saldırı',alt:'Fr33SLaV3, mor saçları ve zincirli ağır çelik küresiyle'},
  {name:'GRANDPA',role:'ESKİ TOPRAK',image:'grandpa',color:'#b1bca5',description:'Tecrübe asla eskimez. Yakınlık mayınlarıyla düşmanın gelişini önceden karşıla.',skill:'Yakınlık mayını / Tuzak kurma',alt:'Grandpa, beyaz bıyığı, yamalı teknolojik paltosu ve bastonuyla'},
  {name:'SIR FERGUSON',role:'FOTON ŞÖVALYESİ',image:'sir_ferguson',color:'#83dce7',description:'Kalkanını kaldır. Uzun foton kılıcınla düşman hatlarını geri it.',skill:'Foton büyük kılıcı / Geniş kesikler',alt:'Sir Ferguson, kapalı şövalye miğferi, kalkan ve foton kılıcıyla'},
  {name:'OTTOMAN',role:'TUĞLA SALVOSU',image:'ottoman',color:'#e2ad65',description:'Gelenek çelikle buluşuyor. Delikli kil tuğlalarla safları parçala ve yavaşlat.',skill:'Tuğla salvosu / Parçalanan mermiler',alt:'Ottoman, beyaz yeniçeri başlığı, kızıl zırhı ve kil tuğlalarıyla'}
];
// Roboman is the public reveal; the remaining roster stays mysterious.
characters.sort((a,b)=>Number(b.image==='roboman')-Number(a.image==='roboman'));
const characterSelector = $('.character-selector');
characterSelector.replaceChildren(...characters.map((character,index)=>{
  const button=document.createElement('button');
  button.type='button';button.dataset.character=String(index);
  button.setAttribute('aria-pressed',String(index===0));
  button.classList.toggle('active',index===0);
  button.append(document.createTextNode(String(index+1).padStart(2,'0')+' '));
  const label=document.createElement('span');label.textContent=character.image==='roboman'?'ROBOMAN':'GİZLİ';button.append(label);
  return button;
}));
$('.hero-index').textContent=`01 / ${String(characters.length).padStart(2,'0')}`;
let characterIndex = 0;
let manualHero = false;
function selectCharacter(index) {
  const c = characters[index];
  const secret = c.image !== 'roboman';
  const displayName = secret ? 'GİZLİ KAHRAMAN' : c.name;
  if (index === characterIndex && $('#character-name').textContent === displayName) return;
  characterIndex = index;
  $('.hero-showcase').classList.toggle('is-secret',secret);
  $('#character-image').src = `assets/${c.image}.webp`;
  $('#character-image').alt = secret ? 'Kimliği gizli kahramanın karanlık silüeti' : c.alt;
  $('#character-name').textContent = displayName;
  $('#character-role').textContent = secret ? 'KİMLİĞİ GİZLİ' : c.role;
  $('#character-description').textContent = secret ? 'Kimliği henüz açıklanmadı. Diğer kahramanları Cyber Chaos’ta keşfet.' : c.description;
  $('#character-skill').textContent = secret ? '' : c.skill;
  $('.skill-line').hidden=secret;
  $('.hero-watermark').textContent = secret ? '???' : c.name;
  $('.hero-index').textContent = `${String(index+1).padStart(2,'0')} / ${String(characters.length).padStart(2,'0')}`;
  $('.hero-showcase').style.setProperty('--hero-color', secret ? '#81978b' : c.color);
  $$('[data-character]').forEach((button,i) => {button.classList.toggle('active',i===index);button.setAttribute('aria-pressed',String(i===index));});
  const activeButton=characterSelector.children[index];
  characterSelector.scrollTo({left:activeButton.offsetLeft-characterSelector.offsetLeft-(characterSelector.clientWidth-activeButton.offsetWidth)/2,behavior:reduced?'instant':'smooth'});
}
$$('[data-character]').forEach(button => button.addEventListener('click', () => { manualHero=true; selectCharacter(Number(button.dataset.character)); }));
$('#character-prev').addEventListener('click',()=>{manualHero=true;selectCharacter((characterIndex+characters.length-1)%characters.length);});
$('#character-next').addEventListener('click',()=>{manualHero=true;selectCharacter((characterIndex+1)%characters.length);});
const maps = [
  {image:'concert',owner:"BLACKBEARD'İN BÖLGESİ",title:'SON SES.\nSON DALGA.',description:'Amfiler, sahne ışıkları ve düşman orduları. Bu konser kolay bitmez.',alt:"BlackBeard'in heavy metal konser alanından gerçek oyun görüntüsü"},
  {image:'base',owner:"QYPCAK'IN BÖLGESİ",title:'MAVİ HAT.\nSICAK TEMAS.',description:'Taktik barikatlar, zırhlı araçlar ve operasyon üssünün servis yolları.',alt:"Qypcak'ın Mavi Hat Operasyon Üssü haritası"},
  {image:'bakery',owner:"BUSHEAD'İN BÖLGESİ",title:'GECE VARDİYASI.\nSICAK ÇATIŞMA.',description:'Fırınlar çalışıyor. Ekmek arabalarının arasında hayatta kalacak bir rota bul.',alt:"BusHead'in Gece Vardiyası Fırını haritası"},
  {image:'dance',owner:"FR33SLAV3'ÜN BÖLGESİ",title:'RİTMİ BUL.\nÇEMBERİ KIR.',description:'Latin dans stüdyosunda sahneye çık. Dalgaların arasında adımlarını doğru seç.',alt:'Latin dans stüdyosundan gerçek oyun görüntüsü'},
  {image:'garden',owner:"PROFESSOR G'NİN BÖLGESİ",title:'DENEY BAŞLADI.\nHAYATTA KAL.',description:'Biyolojik araştırma tankları ve cam geçitler arasında kendi formülünü bul.',alt:'Professor G Veri Bahçesi gerçek oyun görüntüsü'}
];
let mapIndex = 0;
function selectMap(index) {
  mapIndex=(index+maps.length)%maps.length;const m=maps[mapIndex];
  $('#map-image').src=`assets/${m.image}.webp`;$('#map-image').alt=m.alt;
  $('#map-owner').textContent=m.owner;
  $('#map-name').replaceChildren(...m.title.split('\n').flatMap((line,i)=>i?[document.createElement('br'),document.createTextNode(line)]:[document.createTextNode(line)]));
  $('#map-description').textContent=m.description;
  $$('[data-map]').forEach((button,i)=>{button.classList.toggle('active',i===mapIndex);button.setAttribute('aria-pressed',String(i===mapIndex));});
}
$$('[data-map]').forEach(button=>button.addEventListener('click',()=>selectMap(Number(button.dataset.map))));
$('#map-prev').addEventListener('click',()=>selectMap(mapIndex-1));$('#map-next').addEventListener('click',()=>selectMap(mapIndex+1));
const dialog=$('#trailer-dialog'), video=dialog.querySelector('video');
$$('[data-trailer]').forEach(button=>button.addEventListener('click',()=>{dialog.showModal();video.play().catch(()=>{});}));
$('#close-trailer').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>video.pause());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
const revealObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.1});
$$('.reveal').forEach(el=>revealObserver.observe(el));
let ticking=false;
const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,value));
function updateScroll(){
  ticking=false;const y=window.scrollY,h=innerHeight;
  document.documentElement.style.setProperty('--progress',clamp(y/Math.max(1,document.documentElement.scrollHeight-h)));
  if(reduced)return;
  const hero=$('.hero');if(y<hero.offsetHeight) $('.hero-art').style.transform=`translateY(${y*.22}px) scale(${1+y*.000035})`;
  const track=$('.heroes-track'),r=track.getBoundingClientRect();
  if(innerWidth>680 && r.top<=0 && r.bottom>=h){const progress=clamp(-r.top/(track.offsetHeight-h));if(!manualHero)selectCharacter(Math.min(characters.length-1,Math.floor(progress*characters.length)));$('.hero-figure').style.setProperty('--figure-y',`${Math.sin(progress*Math.PI*2)*10}px`);}
  if(r.bottom<0||r.top>h)manualHero=false;
  const vanRect=$('.van-crossing').getBoundingClientRect();if(vanRect.top<h&&vanRect.bottom>0){const p=clamp((h-vanRect.top)/(h+vanRect.height));$('.van').style.setProperty('--van-x',`${(p-.5)*(innerWidth>680?innerWidth*.9:350)}px`);}
}
function requestTick(){if(!ticking){ticking=true;requestAnimationFrame(updateScroll);}}
window.addEventListener('scroll',requestTick,{passive:true});window.addEventListener('resize',requestTick,{passive:true});
$('#motion-toggle').addEventListener('click',()=>{userMotionChoice=true;setMotion(!reduced);});
reducedQuery.addEventListener('change',event=>{if(!userMotionChoice)setMotion(event.matches);});
setMotion(reduced);
$('#year').textContent=new Date().getFullYear();
for(let i=0;i<15;i++){const ember=document.createElement('span');ember.className='ember';ember.style.cssText=`--left:${15+i*5.4}%;--top:${35+(i*17)%60}%;--duration:${5+i%5}s;--delay:-${i*.7}s`;$('.embers').append(ember);}
window.addEventListener('load',requestTick,{once:true});

const SAVE_VERSION = 14; 
const DAY_DURATION = 90;

const INGREDIENTS = {
  beans:{emoji:'🫘',name:'Зёрна',baseCost:2,cap:400},milk:{emoji:'🥛',name:'Молоко',baseCost:3,cap:400},
  sugar:{emoji:'🍬',name:'Сахар',baseCost:1,cap:600},ice:{emoji:'🧊',name:'Лёд',baseCost:2,cap:600},
  cream:{emoji:'🍦',name:'Сливки',baseCost:5,cap:300},chocolate:{emoji:'🍫',name:'Шоколад',baseCost:8,cap:240},
  matcha:{emoji:'🍵',name:'Матча',baseCost:12,cap:200},tea:{emoji:'🌿',name:'Чай',baseCost:6,cap:240},
  flour:{emoji:'🌾',name:'Мука',baseCost:4,cap:400},butter:{emoji:'🧈',name:'Масло',baseCost:7,cap:240},
  berries:{emoji:'🫐',name:'Ягоды',baseCost:10,cap:200},vanilla:{emoji:'🌸',name:'Ваниль',baseCost:15,cap:160}
};

const RECIPES = {
  espresso:{emoji:'☕',name:'Эспрессо',cat:'coffee',base:12,hot:true,iced:false,ing:{beans:2,sugar:1}},
  americano:{emoji:'🫗',name:'Американо',cat:'coffee',base:15,hot:true,iced:true,ing:{beans:2},cost:200},
  cap:{emoji:'🥛',name:'Капучино',cat:'coffee',base:28,hot:true,iced:false,ing:{beans:2,milk:2,sugar:1},cost:600},
  latte:{emoji:'🍼',name:'Латте',cat:'coffee',base:35,hot:true,iced:true,ing:{beans:2,milk:3},cost:1200},
  iceLatte:{emoji:'🧊',name:'Айс-латте',cat:'coffee',base:45,hot:false,iced:true,ing:{beans:2,milk:3,ice:2},cost:2500},
  mocha:{emoji:'🍫',name:'Мокка',cat:'coffee',base:55,hot:true,iced:true,ing:{beans:2,milk:2,chocolate:1},cost:3500},
  raf:{emoji:'🍨',name:'Раф',cat:'coffee',base:70,hot:true,iced:true,ing:{beans:2,cream:2,vanilla:1},cost:6000},
  flatWhite:{emoji:'☕',name:'Флэт Уайт',cat:'coffee',base:40,hot:true,iced:false,ing:{beans:3,milk:2},cost:4500},
  cortado:{emoji:'🥃',name:'Кортадо',cat:'coffee',base:38,hot:true,iced:false,ing:{beans:3,milk:1},cost:4200},
  matchaLatte:{emoji:'🍵',name:'Матча-латте',cat:'tea',base:75,hot:true,iced:true,ing:{matcha:1,milk:3},cost:8000},
  greenTea:{emoji:'🌿',name:'Зелёный чай',cat:'tea',base:30,hot:true,iced:true,ing:{tea:2,sugar:1},cost:1500},
  berryTea:{emoji:'🫐',name:'Ягодный чай',cat:'tea',base:45,hot:true,iced:true,ing:{tea:2,berries:1,sugar:1},cost:4000},
  croissant:{emoji:'🥐',name:'Круассан',cat:'dessert',base:220,hot:false,iced:false,ing:{flour:3,butter:2},cost:4000},
  cake:{emoji:'🍰',name:'Торт',cat:'dessert',base:900,hot:false,iced:false,ing:{flour:4,butter:2,sugar:2,chocolate:1},cost:22000},
  cheesecake:{emoji:'🧀',name:'Чизкейк',cat:'dessert',base:650,hot:false,iced:false,ing:{flour:2,butter:1,sugar:2,cream:2},cost:16000},
  muffin:{emoji:'🧁',name:'Маффин',cat:'dessert',base:180,hot:false,iced:false,ing:{flour:3,sugar:1,butter:1,berries:1},cost:3500},
  tiramisu:{emoji:'🍮',name:'Тирамису',cat:'dessert',base:520,hot:false,iced:false,ing:{flour:2,butter:1,cream:2,chocolate:1},cost:14000},
  doppio:{emoji:'⚡',name:'Доппио',cat:'coffee',base:65,hot:true,iced:false,ing:{beans:4,sugar:1},rebirthReq:1},
  lavenderRaf:{emoji:'🪻',name:'Лавандовый раф',cat:'coffee',base:120,hot:true,iced:true,ing:{beans:2,cream:3,vanilla:2},rebirthReq:2},
  volcanoLatte:{emoji:'🌋',name:'Вулканический латте',cat:'coffee',base:280,hot:true,iced:true,ing:{beans:4,milk:3,chocolate:2},rebirthReq:7},
  divine:{emoji:'✨',name:'Божественный кофе',cat:'coffee',base:3500,hot:true,iced:true,ing:{beans:15,cream:5,vanilla:3,chocolate:2},rebirthReq:20}
};

const STAFF_DEF=[
  {id:'bar1',emoji:'👨‍🍳',name:'Бариста',role:'coffee',speed:0.35,tip:0.05,cost:300,count:0},
  {id:'bar2',emoji:'👩‍🍳',name:'Шеф-бариста',role:'coffee',speed:1.2,tip:0.15,cost:2800,count:0},
  {id:'tea1',emoji:'🍵',name:'Чайный мастер',role:'tea',speed:1.0,tip:0.10,cost:2200,count:0},
  {id:'bak1',emoji:'🥐',name:'Пекарь',role:'dessert',speed:0.6,tip:0.08,cost:3500,count:0},
  {id:'bak2',emoji:'👨‍🍳',name:'Шеф-пекарь',role:'dessert',speed:1.8,tip:0.14,cost:9000,count:0},
  {id:'rob1',emoji:'🤖',name:'Робот-бариста',role:'any',speed:3.0,tip:0.06,cost:15000,count:0},
  {id:'fab1',emoji:'🏭',name:'Фабрика кофе',role:'any',speed:12,tip:0.10,cost:80000,count:0}
];

const SUPPLIERS_DEF=[
  {id:'sup_beans',emoji:'🫘',name:'Обжарщик зёрен',ing:'beans',rate:1.5,cost:800,count:0},
  {id:'sup_milk',emoji:'🥛',name:'Молочная ферма',ing:'milk',rate:2.0,cost:1000,count:0},
  {id:'sup_ice',emoji:'🧊',name:'Льдозавод',ing:'ice',rate:2.5,cost:1200,count:0},
  {id:'sup_bake',emoji:'🌾',name:'Пекарня-поставщик',ing:'flour',rate:1.5,cost:1500,count:0},
  {id:'sup_premium',emoji:'💎',name:'Премиум поставщик',ing:'all',rate:0.8,cost:5000,count:0}
];

const UPGRADES=[
  {id:'u1',name:'Удобные стаканчики',desc:'+8₽ к цене кофе',cost:150,type:'base',val:8},
  {id:'u2',name:'Сиропы',desc:'+25₽ к цене кофе',cost:800,type:'base',val:25},
  {id:'u3',name:'Премиум зерно',desc:'+80₽ к цене кофе',cost:4000,type:'base',val:80},
  {id:'u4',name:'Золотые турки',desc:'+400₽ к цене кофе',cost:25000,type:'base',val:400},
  {id:'u5',name:'Стеллажи',desc:'+50% к складу',cost:6000,type:'cap',val:0.5},
  {id:'u6',name:'Реклама',desc:'+25% клиентов',cost:10000,type:'spawn',val:0.25}
];

const SKINS=[
  {id:'mint',name:'Мята',desc:'Темная мята',class:'',cost:0,unlocked:true},
  {id:'classic',name:'Классика',desc:'Тёплые кофейные тона',class:'skin-classic',cost:5000},
  {id:'rose',name:'Розовая мечта',desc:'Нежная розовая тема',class:'skin-rose',cost:15000},
  {id:'ocean',name:'Океан',desc:'Прохладная синяя тема',class:'skin-ocean',cost:25000},
  {id:'night',name:'Ночная',desc:'Глубокая ночная тема',class:'skin-night',cost:0,rebirthReq:3}
];

const ACHIEVEMENTS=[
  {id:'a1',icon:'☕',title:'Первые чашки',desc:'Продать 100 напитков',target:100,type:'cups',reward:0.05},
  {id:'a2',icon:'💰',title:'Начинающий бизнес',desc:'Заработать 25 000 ₽',target:25000,type:'earned',reward:0.08},
  {id:'a3',icon:'❄️',title:'Ледяной король',desc:'Продать 150 холодных напитков',target:150,type:'iced',reward:0.10},
  {id:'a4',icon:'🔥',title:'Горячая десятка',desc:'Продать 150 горячих напитков',target:150,type:'hot',reward:0.10},
  {id:'a5',icon:'🥐',title:'Кондитер',desc:'Продать 100 десертов',target:100,type:'dessert',reward:0.12},
  {id:'a6',icon:'👨‍🍳',title:'Команда мечты',desc:'Нанять 15 сотрудников',target:15,type:'staff',reward:0.12},
  {id:'a7',icon:'🚚',title:'Автоматизация',desc:'Нанять 5 поставщиков',target:5,type:'suppliers',reward:0.10},
  {id:'a8',icon:'⭐',title:'Уровень 30',desc:'Достичь 30 уровня',target:30,type:'level',reward:0.15},
  {id:'a9',icon:'🏆',title:'Кофейная империя',desc:'Сделать 3 ребирта',target:3,type:'rebirth',reward:0.25},
  {id:'a10',icon:'❤️',title:'Любимая кофейня',desc:'Достичь 50 репутации',target:50,type:'rep',reward:0.10},
  {id:'a11',icon:'🌙',title:'Ночная смена',desc:'Продать 50 заказов ночью',target:50,type:'night',reward:0.12},
  {id:'a12',icon:'📅',title:'Рабочая неделя',desc:'Закрыть 7 дней',target:7,type:'days',reward:0.15}
];

const EVENTS=[
  {id:'morning',name:'☕ Утренний час пик',desc:'Много заказов на кофе',class:'event-morning',effect:'spawn',val:2.5,dur:20},
  {id:'rain',name:'🌧️ Дождь',desc:'Меньше клиентов, все хотят горячее',class:'event-rain',effect:'hot',val:1.5,dur:30},
  {id:'festival',name:'🎉 Фестиваль кофе',desc:'Чаевые ×2',class:'event-festival',effect:'tips',val:2,dur:25},
  {id:'rush',name:'⚡ Обеденный rush',desc:'Заказы появляются очень быстро',class:'event-rush',effect:'spawn',val:3,dur:15},
  {id:'supply',name:'🚚 Оптовая поставка',desc:'Ингредиенты дешевле на 30%',class:'event-supply',effect:'cheap',val:0.7,dur:40},
  {id:'inspection',name:'🔍 Проверка СЭС',desc:'Ошибки снижают репутацию сильнее',class:'event-inspection',effect:'strict',val:2,dur:25}
];

function createDefaultState(){
  const inv={}; Object.keys(INGREDIENTS).forEach(k=>inv[k]=0); inv.beans=20; inv.milk=10; inv.sugar=20; inv.ice=10;
  return {money:200,cups:0,xp:0,level:1,earned:0,totalEarned:0,rebirth:0,rep:0,baseBonus:0,spawnRate:1,capMult:1,recipes:{espresso:true},inv,staff:STAFF_DEF.map(s=>({...s})),suppliers:SUPPLIERS_DEF.map(s=>({...s})),upgrades:UPGRADES.map(u=>({...u, bought:0})),achievements:ACHIEVEMENTS.map(a=>({...a})),skins:SKINS.map(s=>({...s})),activeSkin:'mint',day:1,dayOpen:true,dayTime:0,stats:{iced:0,hot:0,dessert:0,staffHired:0,suppliersHired:0,night:0,daysClosed:0},saveVersion:SAVE_VERSION};
}

let S=createDefaultState();
let currentOrder=null,selectedRecipe='espresso',selectedTemp='hot',orderTimer=0,autoSaveTimer=0,lastTick=performance.now(),stress=0,lastClickTime=0,currentEvent=null,eventTimer=0,nextEventTime=45+Math.random()*45,nightTimer=0,audioCtx=null,dayMoney=0,dayCups=0,dayRep=0,uiTimer=0,needsUIUpdate=true;

const $=id=>document.getElementById(id);

function initAudio(){if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();}
function playSound(type){
  if(!audioCtx)return; try{
    const osc=audioCtx.createOscillator(),gain=audioCtx.createGain(),now=audioCtx.currentTime;
    osc.connect(gain); gain.connect(audioCtx.destination);
    if(type==='click'){osc.type='sine';osc.frequency.setValueAtTime(600,now);osc.frequency.exponentialRampToValueAtTime(300,now+0.1);gain.gain.setValueAtTime(0.1,now);gain.gain.exponentialRampToValueAtTime(0.01,now+0.1);osc.start(now);osc.stop(now+0.1);}
    else if(type==='sell'){osc.type='triangle';osc.frequency.setValueAtTime(800,now);osc.frequency.exponentialRampToValueAtTime(1200,now+0.15);gain.gain.setValueAtTime(0.12,now);gain.gain.exponentialRampToValueAtTime(0.01,now+0.2);osc.start(now);osc.stop(now+0.2);}
    else if(type==='error'){osc.type='sawtooth';osc.frequency.setValueAtTime(200,now);osc.frequency.linearRampToValueAtTime(100,now+0.25);gain.gain.setValueAtTime(0.1,now);gain.gain.exponentialRampToValueAtTime(0.01,now+0.25);osc.start(now);osc.stop(now+0.25);}
    else if(type==='ach'){osc.type='sine';osc.frequency.setValueAtTime(523,now);osc.frequency.setValueAtTime(659,now+0.1);osc.frequency.setValueAtTime(784,now+0.2);gain.gain.setValueAtTime(0.1,now);gain.gain.linearRampToValueAtTime(0,now+0.4);osc.start(now);osc.stop(now+0.4);}
    else if(type==='event'){osc.type='square';osc.frequency.setValueAtTime(440,now);osc.frequency.setValueAtTime(554,now+0.1);osc.frequency.setValueAtTime(659,now+0.2);gain.gain.setValueAtTime(0.08,now);gain.gain.linearRampToValueAtTime(0,now+0.5);osc.start(now);osc.stop(now+0.5);}
    else if(type==='dayend'){osc.type='sine';osc.frequency.setValueAtTime(440,now);osc.frequency.setValueAtTime(349,now+0.2);osc.frequency.setValueAtTime(262,now+0.5);gain.gain.setValueAtTime(0.12,now);gain.gain.linearRampToValueAtTime(0,now+0.8);osc.start(now);osc.stop(now+0.8);}
  }catch(e){}
}

function needXp(){return 100+(S.level-1)*130;}
function rebirthMult(){return 1+S.rebirth*0.25;}
function achMult(){return 1+S.achievements.filter(a=>a.claimed).reduce((s,a)=>s+a.reward,0);}
function totalMult(){return rebirthMult()*achMult();}
function cap(ing){return Math.floor(INGREDIENTS[ing].cap*S.capMult);}
function ingCost(ing){
  let c=INGREDIENTS[ing].baseCost * 10 * (1+S.level*0.02);
  if(currentEvent&&currentEvent.effect==='cheap')c*=currentEvent.val;
  return Math.floor(c);
}
function recipePrice(id,temp){const r=RECIPES[id];if(!r)return 0;let price=r.base+S.baseBonus;if(temp==='iced'&&r.iced)price+=Math.floor(r.base*0.4);return Math.max(1,price);}
function canCraft(id,temp){const r=RECIPES[id];if(!r)return false;if(temp==='iced'&&!r.iced)return false;if(temp==='hot'&&!r.hot)return false;for(const[ing,need]of Object.entries(r.ing)){if((S.inv[ing]||0)<need)return false;}if(temp==='iced'&&(S.inv.ice||0)<1)return false;return true;}

function log(t){$('log').textContent=t;setTimeout(()=>{if($('log').textContent===t)$('log').textContent='';},2200);}

// ШИФРОВАНИЕ СОХРАНЕНИЙ (Защита от изменения блокнотом)
function serializeSave(stateData){
  const jsonStr = JSON.stringify(stateData);
  return btoa(encodeURIComponent(jsonStr)); // Кодируем в Base64
}

function deserializeSave(encodedStr){
  try{
    const jsonStr = decodeURIComponent(atob(encodedStr));
    return JSON.parse(jsonStr);
  }catch(e){
    // Если кодировка повреждена или файл изменен вручную без ума — пробуем прочитать как обычный JSON на всякий случай
    return JSON.parse(encodedStr);
  }
}

function saveGame(){
  const encrypted = serializeSave(S);
  localStorage.setItem('myataCoffeeSecureV14', encrypted);
}

function loadGame(){
  try{
    const raw = localStorage.getItem('myataCoffeeSecureV14') || localStorage.getItem('myataCoffeeRebirthV13') || localStorage.getItem('myataCoffeeRebirthV12');
    if(!raw)return;
    const loaded = deserializeSave(raw);
    if(!loaded || typeof loaded.money !== 'number') return;
    
    S={...S,...loaded};
    if(!S.staff||S.staff.length!==STAFF_DEF.length)S.staff=STAFF_DEF.map(s=>({...s}));
    if(!S.suppliers||S.suppliers.length!==SUPPLIERS_DEF.length)S.suppliers=SUPPLIERS_DEF.map(s=>({...s}));
    if(!S.achievements||S.achievements.length!==ACHIEVEMENTS.length)S.achievements=ACHIEVEMENTS.map(a=>({...a}));
    if(!S.skins||S.skins.length!==SKINS.length)S.skins=SKINS.map(s=>({...s}));
    if(!S.upgrades||S.upgrades.length!==UPGRADES.length)S.upgrades=UPGRADES.map(u=>({...u, bought:0}));
    if(!S.inv){S.inv={};Object.keys(INGREDIENTS).forEach(k=>S.inv[k]=0);}
    Object.keys(INGREDIENTS).forEach(k=>{if(S.inv[k]==null)S.inv[k]=0});
    if(!S.recipes)S.recipes={espresso:true};
    if(!S.stats)S.stats={iced:0,hot:0,dessert:0,staffHired:0,suppliersHired:0,night:0,daysClosed:0};
    if(!S.activeSkin)S.activeSkin='mint';
    if(S.dayOpen===undefined)S.dayOpen=true;
    if(S.totalEarned===undefined)S.totalEarned=S.earned||0;
    S.saveVersion=SAVE_VERSION;
  }catch(e){console.error('Ошибка загрузки сохранения:',e);}
}

function exportSave(){
  const encrypted = serializeSave(S);
  const blob=new Blob([encrypted],{type:'text/plain'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`myata_secure_save_day${S.day}.dat`;
  document.body.appendChild(a);a.click();a.remove();
  URL.revokeObjectURL(url);
  log('📤 Защищенное сохранение экспортировано');
  playSound('click');
}

function importSave(file){
  const reader=new FileReader();
  reader.onload=(e)=>{
    try{
      const loaded = deserializeSave(e.target.result);
      if(!loaded || typeof loaded.money!=='number'){
        log('❌ Неверный или поврежденный файл'); playSound('error'); return;
      }
      S={...S,...loaded};
      if(!S.upgrades)S.upgrades=UPGRADES.map(u=>({...u, bought:0}));
      applySkin(S.activeSkin);
      saveGame();
      log('📥 Сохранение успешно загружено');
      playSound('ach');
      needsUIUpdate=true;
      buildStaticDOM();
    }catch(err){
      log('❌ Ошибка импорта файла'); playSound('error');
    }
  };
  reader.readAsText(file);
}

function applySkin(id){const skin=S.skins.find(s=>s.id===id);if(!skin)return;S.activeSkin=id;applyTimeEffects();}
function buySkin(id){const skin=S.skins.find(s=>s.id===id);if(!skin||skin.unlocked)return;if(skin.rebirthReq&&S.rebirth<skin.rebirthReq){log('🔒 Нужен ребирт '+skin.rebirthReq);return;}if(S.money<skin.cost){log('💸 Не хватает денег');return;}S.money-=skin.cost;skin.unlocked=true;log('🎨 Скин "'+skin.name+'" открыт!');playSound('sell');activateSkin(id);}
function activateSkin(id){const skin=S.skins.find(s=>s.id===id);if(!skin||!skin.unlocked){log('🔒 Скин не открыт');return;}applySkin(id);log('🎨 Тема: '+skin.name);playSound('click');needsUIUpdate=true;}
function repTier(){if(S.rep<10)return{name:'Неизвестно',mult:1};if(S.rep<30)return{name:'Популярно',mult:1.05};if(S.rep<60)return{name:'Любимо',mult:1.12};if(S.rep<100)return{name:'Легенда',mult:1.2};return{name:'Иконка',mult:1.3};}
function getTimeOfDay(){if(S.dayTime<0.25)return{name:'Утро',class:'morning'};if(S.dayTime<0.5)return{name:'День',class:'day'};if(S.dayTime<0.75)return{name:'Вечер',class:'evening'};return{name:'Ночь',class:'night'};}
function applyTimeEffects(){const t=getTimeOfDay();const skin=S.skins.find(s=>s.id===S.activeSkin);document.body.className=(skin?skin.class:'')+' '+t.class;$('timeName').textContent=t.name;$('timeFill').style.width=(S.dayTime*100)+'%';}
function startEvent(){const pool=EVENTS.filter(e=>{if(e.id==='morning')return getTimeOfDay().name==='Утро';if(e.id==='rush')return getTimeOfDay().name==='День';return true;});currentEvent={...pool[Math.floor(Math.random()*pool.length)]};eventTimer=currentEvent.dur;playSound('event');log('🎲 Событие: '+currentEvent.name);renderEvent();}
function endEvent(){currentEvent=null;renderEvent();}
function renderEvent(){const b=$('eventBanner');if(!currentEvent){b.style.display='none';$('eventText').textContent='Спокойный день';return;}b.style.display='block';b.className='event-banner '+currentEvent.class;b.textContent=currentEvent.name+' — '+currentEvent.desc+' ('+Math.ceil(eventTimer)+'с)';$('eventText').textContent=currentEvent.name;}
function closeDay(){S.dayOpen=false;currentOrder=null;playSound('dayend');const bonus=Math.min(50,Math.floor(dayMoney/500));S.money+=bonus;S.stats.daysClosed++;$('modalDay').textContent=S.day;$('modalMoney').textContent=Math.floor(dayMoney)+' ₽';$('modalCups').textContent=dayCups;const repChange=S.rep-dayRep;$('modalRep').textContent=(repChange>=0?'+':'')+repChange;$('modalBonus').textContent='+'+bonus+' ₽';let comment='Неплохой день!';if(dayMoney>5000)comment='Отличный день! Кофейня процветает.';if(dayMoney>15000)comment='Потрясающий день! Ты настоящий магнат кофе.';if(dayMoney<500)comment='Слабый день... Завтра будет лучше!';$('modalComment').textContent=comment;$('dayOverlay').classList.add('show');checkAchievements();needsUIUpdate=true;}
function openMorning(){S.day++;S.dayOpen=true;S.dayTime=0;dayMoney=0;dayCups=0;dayRep=S.rep;nightTimer=0;$('dayOverlay').classList.remove('show');log('☀️ День '+S.day+' начался!');playSound('event');needsUIUpdate=true;}

function generateOrder(){
  const unlocked=Object.keys(RECIPES).filter(id=>S.recipes[id]);
  const count=Math.random()<0.35?2:1;
  const items=[];
  let pool=unlocked;
  const timeName=getTimeOfDay().name;
  if(timeName==='Утро')pool=unlocked.filter(id=>RECIPES[id].cat==='coffee');
  if(timeName==='Вечер')pool=unlocked.filter(id=>RECIPES[id].cat==='dessert'||RECIPES[id].cat==='tea');
  if(pool.length===0)pool=unlocked;
  
  const id=pool[Math.floor(Math.random()*pool.length)];
  const r=RECIPES[id];
  let temp='neutral';
  if(r.cat!=='dessert'){
    let icedChance=0.30+(S.rebirth*0.02);
    if(currentEvent&&currentEvent.effect==='hot')icedChance=0.05;
    if(timeName==='Ночь')icedChance=0.5;
    temp=Math.random()<icedChance?'iced':'hot';
  }
  
  for(let i=0;i<count;i++){ items.push({id,temp}); }
  currentOrder={items,time:25};
  renderOrder();
}

function renderOrder(){
  const card=$('orderCard');
  if(!S.dayOpen){card.className='';card.innerHTML='<div class="emoji">🌙</div><div class="name">Кофейня закрыта</div><div class="hint">Ночь — отдыхай, планируй завтра. Нажми "Открыть утром".</div>';$('coffeeBtn').disabled=true;return;}
  if(!currentOrder||currentOrder.items.length===0){card.className='';card.innerHTML='<div class="emoji">🍃</div><div class="name">Заказов пока нет</div><div class="hint">Кликай по кружке, чтобы приготовить выбранный рецепт</div>';$('coffeeBtn').disabled=true;return;}
  
  card.className='active';
  let html='<div class="order-items">';
  currentOrder.items.forEach(it=>{
    const r=RECIPES[it.id];
    const t=it.temp==='hot'?'🔥 Горячий':it.temp==='iced'?'❄️ Со льдом':'🥡 Еда';
    html+=`<div class="oitem"><span>${r.emoji}</span><span>${r.name}</span><span class="t ${it.temp}">${t}</span></div>`;
  });
  html+=`</div><div class="hint">Осталось ${Math.ceil(currentOrder.time)}с (Осталось чашек: ${currentOrder.items.length})</div>`;
  card.innerHTML=html;
  $('coffeeBtn').disabled=false;
}

function floatText(text,x,y,color='#27ae60'){const el=document.createElement('div');el.className='float';el.textContent=text;el.style.left=x+'px';el.style.top=y+'px';el.style.color=color;document.body.appendChild(el);setTimeout(()=>el.remove(),1100);}
function flashElement(el){el.classList.add('flash');setTimeout(()=>el.classList.remove('flash'),400);}

function fulfillOrder(manual=true,clickEvent=null){
  if(!S.dayOpen||!currentOrder||currentOrder.items.length===0)return;

  if(manual){
    const now=performance.now();
    const delta=now-lastClickTime;
    lastClickTime=now;
    if(delta<250)stress+=18;else stress=Math.max(0,stress-8);
    if(stress>100)stress=100;
    if(stress>80){
      log('🔥 Бариста перегрет! Замедляйся');
      $('coffeeBtn').classList.add('overheat');
      setTimeout(()=>$('coffeeBtn').classList.remove('overheat'),400);
      playSound('error');
      S.rep=Math.max(0,S.rep-(currentEvent&&currentEvent.effect==='strict'?2:1));
      currentOrder=null; renderOrder(); needsUIUpdate=true; return;
    }
  }

  const it = currentOrder.items[0];
  const r=RECIPES[it.id];
  const temp=r.cat==='dessert'?'neutral':it.temp;
  
  const needed={...r.ing};
  if(temp==='iced') needed.ice = (needed.ice||0)+1;

  for(const[ing,n]of Object.entries(needed)){
    if((S.inv[ing]||0)<n){
      if(manual){log('🥡 Не хватает '+INGREDIENTS[ing].name); playSound('error');}
      return;
    }
  }

  for(const[ing,n]of Object.entries(needed)) S.inv[ing]-=n;

  let price=recipePrice(it.id,temp);
  let perfect=true;
  if(manual){
    if(selectedRecipe!==it.id){price*=0.6;perfect=false;}
    else if(r.cat!=='dessert'&&selectedTemp!==temp){price*=0.7;perfect=false;}
  }

  if(r.cat==='dessert')S.stats.dessert++;
  else if(temp==='iced')S.stats.iced++;
  else S.stats.hot++;
  if(getTimeOfDay().name==='Ночь')S.stats.night++;

  let tipMult=1;
  if(currentEvent&&currentEvent.effect==='tips')tipMult*=currentEvent.val;
  tipMult*=repTier().mult;

  currentOrder.items.shift();
  const isComplete = currentOrder.items.length === 0;

  if(isComplete) {
    if(manual){
      if(perfect){
        tipMult+=0.2+(stress/500); S.rep+=1;
        log('✅ Заказ полностью выполнен!'); playSound('sell');
      } else {
        tipMult=0.9; log('⚠️ Выполнено, но с ошибками'); playSound('error');
      }
    } else {
      let maxTip=0; S.staff.forEach(s=>{if(s.count>0&&s.tip>maxTip)maxTip=s.tip;});
      tipMult+=maxTip; if(Math.random()<0.2)S.rep+=1;
      log('🤖 Авто-заказ выполнен'); playSound('sell');
    }
    currentOrder=null;
  } else {
    if(manual) { playSound('click'); }
  }

  let total = Math.floor(price * tipMult * totalMult());
  S.money+=total; S.earned+=total; S.totalEarned+=total;
  S.cups+=1; S.xp+=14; dayMoney+=total; dayCups+=1;

  if(clickEvent&&clickEvent.clientX)floatText('+'+total+'₽',clickEvent.clientX,clickEvent.clientY);
  else floatText('+'+total+'₽',window.innerWidth/2,window.innerHeight/2);

  flashElement($('leftPanel'));
  checkLevelUp(); checkAchievements(); needsUIUpdate=true;
}

function checkLevelUp(){while(S.xp>=needXp()){S.xp-=needXp();S.level++;log('🎉 Уровень '+S.level+'!');playSound('ach');}}
function staffSpeedFor(cat){return S.staff.reduce((sum,s)=>{if(s.count<1)return sum;if(s.role==='any'||s.role===cat)return sum+s.speed*s.count;return sum;},0);}
function totalStaffSpeed(){return staffSpeedFor('coffee')+staffSpeedFor('tea')+staffSpeedFor('dessert');}

function staffWork(dt){
  if(!S.dayOpen)return;
  let speed=totalStaffSpeed();
  if(currentEvent&&currentEvent.effect==='spawn')speed*=currentEvent.val;
  if(speed<=0)return;
  orderTimer+=speed*dt;
  while(orderTimer>=1){
    orderTimer-=1;
    if(!currentOrder)generateOrder();
    if(currentOrder && currentOrder.items.length > 0){
      const it = currentOrder.items[0];
      const r = RECIPES[it.id];
      const temp = r.cat==='dessert'?'neutral':it.temp;
      const needed = {...r.ing};
      if(temp==='iced') needed.ice = (needed.ice||0)+1;

      let ok=true;
      for(const[ing,n]of Object.entries(needed)){
        if((S.inv[ing]||0)<n){ ok=false; break; }
      }
      
      if(ok) fulfillOrder(false);
      else{
        log('🥡 Персонал ждёт ингредиенты');
        currentOrder.time-=2;
      }
    }
  }
}

function buyStaff(idx){const s=S.staff[idx];if(S.money<s.cost){log('💸 Не хватает денег');return;}S.money-=s.cost;s.count++;s.cost=Math.floor(s.cost*1.25);S.stats.staffHired++;log('👨‍🍳 '+s.name+' нанят!');playSound('ach');checkAchievements();needsUIUpdate=true;}
function upgradeStaff(idx){const s=S.staff[idx];const c=Math.floor(s.cost*2.2);if(s.count<1){log('Сначала найми сотрудника');return;}if(S.money<c){log('💸 Не хватает денег');return;}S.money-=c;s.speed*=1.15;s.tip+=0.02;log('📈 '+s.name+' прокачан!');playSound('sell');needsUIUpdate=true;}
function buySupplier(idx){const s=S.suppliers[idx];if(S.money<s.cost){log('💸 Не хватает денег');return;}S.money-=s.cost;s.count++;s.cost=Math.floor(s.cost*1.35);S.stats.suppliersHired++;log('🚚 '+s.name+' нанят!');playSound('ach');checkAchievements();needsUIUpdate=true;}
function suppliersWork(dt){S.suppliers.forEach(s=>{if(s.count<1)return;if(s.ing==='all')Object.keys(INGREDIENTS).forEach(k=>{S.inv[k]=Math.min(cap(k),S.inv[k]+s.rate*s.count*dt);});else S.inv[s.ing]=Math.min(cap(s.ing),S.inv[s.ing]+s.rate*s.count*dt);});}
function buyUpgrade(idx){const u=S.upgrades[idx];if(S.money<u.cost){log('💸 Не хватает денег');playSound('error');return;}S.money-=u.cost;u.bought++;if(u.type==='base')S.baseBonus+=u.val;if(u.type==='cap')S.capMult+=u.val;if(u.type==='spawn')S.spawnRate+=u.val;u.cost=Math.floor(u.cost*1.5);log('✨ Улучшение куплено!');playSound('sell');needsUIUpdate=true;}
function checkAchievements(){S.achievements.forEach(a=>{if(a.done)return;let val=0;switch(a.type){case'cups':val=S.cups;break;case'earned':val=S.totalEarned;break;case'iced':val=S.stats.iced;break;case'hot':val=S.stats.hot;break;case'dessert':val=S.stats.dessert;break;case'staff':val=S.stats.staffHired;break;case'suppliers':val=S.stats.suppliersHired;break;case'level':val=S.level;break;case'rebirth':val=S.rebirth;break;case'rep':val=S.rep;break;case'night':val=S.stats.night;break;case'days':val=S.stats.daysClosed;break;}if(val>=a.target){a.done=true;log('🏆 Достижение: '+a.title+'!');playSound('ach');}});}
function claimAchievement(idx){const a=S.achievements[idx];if(!a.done||a.claimed)return;a.claimed=true;log('🎁 Бонус: +'+(a.reward*100).toFixed(0)+'% к доходу');playSound('ach');needsUIUpdate=true;}

function doRebirth(){
  if(S.earned<100000){log('🔒 Нужно заработать 100 000 ₽ за этот цикл');return;}
  S.rebirth++; S.money=200; S.cups=0; S.xp=0; S.level=1; S.earned=0; S.rep=0; S.baseBonus=0; S.spawnRate=1; S.capMult=1;
  S.recipes={espresso:true}; S.inv={}; Object.keys(INGREDIENTS).forEach(k=>S.inv[k]=0);
  S.inv.beans=20; S.inv.milk=10; S.inv.sugar=20; S.inv.ice=10;
  S.staff=STAFF_DEF.map(s=>({...s})); S.suppliers=SUPPLIERS_DEF.map(s=>({...s})); S.upgrades=UPGRADES.map(u=>({...u, bought:0}));
  S.stats={iced:0,hot:0,dessert:0,staffHired:0,suppliersHired:0,night:0,daysClosed:0};
  S.day=1; S.dayOpen=true; S.dayTime=0; dayMoney=0; dayCups=0; dayRep=0;
  currentOrder=null; orderTimer=0; stress=0;
  log('🔄 РЕБИРТ! Бонус +'+(S.rebirth*25)+'%'); playSound('ach'); needsUIUpdate=true;
}

let resEls={},recipeEls={},invEls={},staffEls=[],suppEls=[],upgEls=[],skinEls=[],achEls=[],domBuilt=false;

function buildStaticDOM(){
  domBuilt=false;
  const resBox=$('resRow');resBox.innerHTML='';resEls={};
  Object.entries(INGREDIENTS).forEach(([k,v])=>{const div=document.createElement('div');div.className='res';div.innerHTML=`<span style="font-size:18px">${v.emoji}</span><span class="n" id="res-n-${k}">0</span><span class="cap">${v.name}</span>`;resBox.appendChild(div);resEls[k]=div.querySelector('.n');});
  
  const recipeBox=$('recipeCards');recipeBox.innerHTML='';recipeEls={};
  Object.entries(RECIPES).forEach(([id,r])=>{const div=document.createElement('div');div.className='card cat-'+r.cat;const catName=r.cat==='coffee'?'Кофе':r.cat==='tea'?'Чай':'Десерт';const ingText=Object.entries(r.ing).map(([k,n])=>INGREDIENTS[k]?INGREDIENTS[k].name+'×'+n:'').filter(Boolean).join(', ');const tempBtns=r.cat!=='dessert'?`<div class="temp-row"><button class="hot" data-id="${id}" data-t="hot">🔥</button><button class="iced" data-id="${id}" data-t="iced">❄️</button></div>`:'';div.innerHTML=`<span class="cat">${catName}</span><div class="emoji">${r.emoji}</div><b>${r.name}</b><div class="cost" id="recipe-cost-${id}">???</div><div class="ing">${ingText}</div>${tempBtns}<button class="buy recipe-btn" data-id="${id}" id="recipe-btn-${id}" style="margin-top:5px;width:100%">Готовить</button>`;recipeBox.appendChild(div);recipeEls[id]={card:div,cost:div.querySelector('.cost'),btn:div.querySelector('.recipe-btn'),hot:div.querySelector('.hot'),iced:div.querySelector('.iced')};});
  
  const invBox=$('invGrid');invBox.innerHTML='';invEls={};
  Object.entries(INGREDIENTS).forEach(([k,v])=>{const div=document.createElement('div');div.className='inv-cell';div.innerHTML=`<span class="emoji">${v.emoji}</span><span class="n" id="inv-n-${k}">0</span><span class="cap">${v.name}</span><button class="btn small buy-ing" data-ing="${k}" id="inv-btn-${k}" style="margin-top:3px">Купить</button>`;invBox.appendChild(div);invEls[k]={n:div.querySelector('.n'),btn:div.querySelector('.buy-ing')};});
  
  const staffBox=$('staffList');staffBox.innerHTML='';staffEls=[];
  S.staff.forEach((s,idx)=>{const div=document.createElement('div');div.className='staff-card';div.innerHTML=`<div class="head"><div style="display:flex;gap:8px;align-items:center"><span class="emoji">${s.emoji}</span><div><div class="name">${s.name}</div><div class="lvl" id="staff-lvl-${idx}">Нанято: 0</div></div></div><button class="btn" id="staff-hire-${idx}">Нанять ${s.cost}₽</button></div><div class="stats" id="staff-stats-${idx}">Скорость: ${s.speed.toFixed(1)} заказа/сек</div><div class="actions"><button class="btn secondary small" id="staff-upg-${idx}">Обучить</button></div>`;staffBox.appendChild(div);staffEls.push({lvl:$(`staff-lvl-${idx}`),hire:$(`staff-hire-${idx}`),stats:$(`staff-stats-${idx}`),upg:$(`staff-upg-${idx}`)});});
  
  const suppBox=$('suppList');suppBox.innerHTML='';suppEls=[];
  S.suppliers.forEach((s,idx)=>{const div=document.createElement('div');div.className='supp';const ingName=s.ing==='all'?'всё':INGREDIENTS[s.ing].name;div.innerHTML=`<div class="head"><div style="display:flex;gap:8px;align-items:center"><span style="font-size:24px">${s.emoji}</span><div><div class="name">${s.name}</div><div class="desc">Поставляет: ${ingName}</div></div></div><button class="btn" id="supp-hire-${idx}">Нанять ${s.cost}₽</button></div><div class="rate" id="supp-rate-${idx}">+${s.rate}/сек за штуку • Нанято: 0</div>`;suppBox.appendChild(div);suppEls.push({hire:$(`supp-hire-${idx}`),rate:$(`supp-rate-${idx}`)});});
  
  const upgBox=$('upgradeList');upgBox.innerHTML='';upgEls=[];
  S.upgrades.forEach((u,idx)=>{const div=document.createElement('div');div.className='item';div.innerHTML=`<div class="meta"><div class="title">${u.name}</div><div class="desc">${u.desc}</div></div><button class="btn" id="upg-btn-${idx}">Купить ${u.cost}₽</button>`;upgBox.appendChild(div);upgEls.push(div.querySelector('button'));});

  const skinBox=$('skinList');skinBox.innerHTML='';skinEls=[];
  const colors={mint:'#2e6f49',classic:'#795548',rose:'#d81b60',ocean:'#1e88e5',night:'#1c1f24'};
  S.skins.forEach((skin,idx)=>{const div=document.createElement('div');div.className='skin-card';div.innerHTML=`<div style="display:flex;gap:10px;align-items:center"><div class="preview" style="background:${colors[skin.id]}"></div><div><div class="name">${skin.name}</div><div class="desc">${skin.desc}</div></div></div><div id="skin-btn-wrap-${idx}"></div>`;skinBox.appendChild(div);skinEls.push({wrap:$(`skin-btn-wrap-${idx}`)});});
  
  const achBox=$('achList');achBox.innerHTML='';achEls=[];
  S.achievements.forEach((a,idx)=>{const div=document.createElement('div');div.className='ach';div.innerHTML=`<div class="icon">${a.icon}</div><div class="info"><div class="title">${a.title}</div><div class="desc">${a.desc}</div><div class="progress" id="ach-prog-${idx}">0/0 (0%)</div></div><div class="reward" id="ach-reward-${idx}">+${(a.reward*100).toFixed(0)}%</div>`;achBox.appendChild(div);achEls.push({div:div,prog:$(`ach-prog-${idx}`),reward:$(`ach-reward-${idx}`)});});
  
  attachHandlers();domBuilt=true;
}

function attachHandlers(){
  document.querySelectorAll('.recipe-btn').forEach(b=>b.onclick=()=>{
    const id=b.dataset.id;
    const r=RECIPES[id];
    if(!S.recipes[id]){
      if(r.rebirthReq&&S.rebirth<r.rebirthReq){log('🔒 Нужен ребирт '+r.rebirthReq);return;}
      if(S.money<r.cost){log('💸 Не хватает денег');return;}
      S.money-=r.cost; S.recipes[id]=true; log('✨ Рецепт "'+r.name+'" открыт!'); playSound('ach');
    } else {
      selectedRecipe=id;
      if(r.cat==='dessert') selectedTemp='neutral';
      if(currentOrder && currentOrder.items.length > 0 && currentOrder.items[0].id === id && S.dayOpen) {
          fulfillOrder(true);
      } else {
          log('Выбран рецепт: ' + r.name);
          $('coffeeBtn').classList.add('flash');
      }
    }
    needsUIUpdate=true;
  });
  
  document.querySelectorAll('.temp-row button').forEach(b=>b.onclick=(e)=>{
    e.stopPropagation(); selectedRecipe=b.dataset.id; selectedTemp=b.dataset.t; needsUIUpdate=true;
  });
  
  document.querySelectorAll('.buy-ing').forEach(b=>b.onclick=()=>{
    const k=b.dataset.ing;
    const cost=ingCost(k);
    if(S.money<cost){log('💸 Нет денег');playSound('error');return;}
    if(S.inv[k]>=cap(k)){log('📦 Склад полон');return;}
    S.money-=cost;
    S.inv[k]=Math.min(cap(k),S.inv[k]+10);
    log('🥡 Куплено '+INGREDIENTS[k].name);
    playSound('click');needsUIUpdate=true;
  });

  S.staff.forEach((s,idx)=>{if($(`staff-hire-${idx}`)) $(`staff-hire-${idx}`).onclick=()=>buyStaff(idx); if($(`staff-upg-${idx}`)) $(`staff-upg-${idx}`).onclick=()=>upgradeStaff(idx);});
  S.suppliers.forEach((s,idx)=>{if($(`supp-hire-${idx}`)) $(`supp-hire-${idx}`).onclick=()=>buySupplier(idx);});
  S.upgrades.forEach((u,idx)=>{if($(`upg-btn-${idx}`)) $(`upg-btn-${idx}`).onclick=()=>{initAudio();buyUpgrade(idx);};});
}

function updateStaticDOM(){
  if(!domBuilt)return;
  Object.keys(INGREDIENTS).forEach(k=>{if(resEls[k])resEls[k].textContent=Math.floor(S.inv[k]);});
  
  Object.entries(RECIPES).forEach(([id,r])=>{
    const el=recipeEls[id];if(!el)return;
    const unlocked=!!S.recipes[id];
    el.card.style.opacity=unlocked?'1':'0.55';
    if(unlocked){
      const craftTemp=r.cat==='dessert'?'neutral':selectedTemp;
      el.cost.textContent=recipePrice(id,'hot')+'₽ / '+recipePrice(id,'iced')+'₽';
      const can=canCraft(id,craftTemp);
      el.btn.disabled=!can;
      el.btn.textContent='Готовить';
      if(el.hot){el.hot.classList.toggle('active',selectedRecipe===id&&selectedTemp==='hot');el.iced.classList.toggle('active',selectedRecipe===id&&selectedTemp==='iced');}
    }else{
      if(r.rebirthReq){el.btn.disabled=S.rebirth<r.rebirthReq;el.btn.textContent='🔒 Ребирт '+r.rebirthReq+'+';}
      else{el.btn.disabled=S.money<r.cost;el.btn.textContent='Открыть '+r.cost+'₽';}
      el.cost.textContent='???';
    }
  });
  
  Object.keys(INGREDIENTS).forEach(k=>{if(invEls[k]){invEls[k].n.textContent=Math.floor(S.inv[k]);invEls[k].btn.textContent='10шт / '+ingCost(k)+'₽';}});
  
  S.staff.forEach((s,idx)=>{const el=staffEls[idx];if(!el)return;el.lvl.textContent='Нанято: '+s.count;el.hire.textContent='Нанять '+s.cost+'₽';const upCost=Math.floor(s.cost*2.2);el.upg.textContent='Обучить '+upCost+'₽';el.upg.disabled=s.count<1;el.stats.textContent=`Скорость: ${s.speed.toFixed(1)} заказа/сек • Роль: ${s.role==='coffee'?'кофе':s.role==='tea'?'чай':s.role==='dessert'?'десерты':'универсал'} • Чаевые: ${(s.tip*100).toFixed(0)}%`;el.hire.disabled=S.money<s.cost;});
  S.suppliers.forEach((s,idx)=>{const el=suppEls[idx];if(!el)return;el.hire.textContent='Нанять '+s.cost+'₽';el.hire.disabled=S.money<s.cost;el.rate.textContent=`+${s.rate}/сек за штуку • Нанято: ${s.count}`;});
  S.upgrades.forEach((u,idx)=>{const btn=upgEls[idx];if(btn){btn.textContent=`Купить ${u.cost}₽ `+(u.bought>0?`(${u.bought})`:'');btn.disabled=S.money<u.cost;}});
  
  S.skins.forEach((skin,idx)=>{const el=skinEls[idx];if(!el)return;const isActive=S.activeSkin===skin.id;el.wrap.innerHTML='';if(isActive)el.wrap.innerHTML='<span style="color:var(--ok);font-weight:800">✓ Активно</span>';else if(skin.unlocked){const btn=document.createElement('button');btn.className='btn small activate-skin';btn.textContent='Применить';btn.onclick=()=>activateSkin(skin.id);el.wrap.appendChild(btn);}else if(skin.rebirthReq)el.wrap.innerHTML='<button class="btn small" disabled>🔒 Ребирт '+skin.rebirthReq+'</button>';else{const btn=document.createElement('button');btn.className='btn small buy-skin';btn.textContent='Купить '+skin.cost+'₽';btn.disabled=S.money<skin.cost;btn.onclick=()=>buySkin(skin.id);el.wrap.appendChild(btn);}});
  S.achievements.forEach((a,idx)=>{const el=achEls[idx];if(!el)return;let val=0;switch(a.type){case'cups':val=S.cups;break;case'earned':val=S.totalEarned;break;case'iced':val=S.stats.iced;break;case'hot':val=S.stats.hot;break;case'dessert':val=S.stats.dessert;break;case'staff':val=S.stats.staffHired;break;case'suppliers':val=S.stats.suppliersHired;break;case'level':val=S.level;break;case'rebirth':val=S.rebirth;break;case'rep':val=S.rep;break;case'night':val=S.stats.night;break;case'days':val=S.stats.daysClosed;break;}const pct=Math.min(100,Math.floor(val/a.target*100));el.prog.textContent=`${Math.min(val,a.target)}/${a.target} (${pct}%)`;el.div.className='ach'+(a.done?' done':'');el.reward.innerHTML=a.claimed?'✅':a.done?`<button class="btn claim" data-i="${idx}">+${(a.reward*100).toFixed(0)}%</button>`:`+${(a.reward*100).toFixed(0)}%`;});document.querySelectorAll('.claim').forEach(b=>b.onclick=()=>claimAchievement(+b.dataset.i));
}

function updateUI(){
  try{
    if(!domBuilt){buildStaticDOM();}
    $('money').textContent=Math.floor(S.money);$('cups').textContent=S.cups;$('level').textContent=S.level;
    if($('dayNum'))$('dayNum').textContent=S.day;
    $('xp').textContent=Math.floor(S.xp);$('need').textContent=needXp();$('xpbar').style.width=Math.min(100,S.xp/needXp()*100)+'%';$('achDone').textContent=S.achievements.filter(a=>a.claimed).length;$('achTotal').textContent=S.achievements.length;$('rebirthCount').textContent=S.rebirth;$('bonus').textContent=S.rebirth*25;$('rep').textContent=S.rep;const tier=repTier();$('repName').textContent=tier.name;$('autoRate').textContent=totalStaffSpeed().toFixed(1);$('statusText').textContent=S.dayOpen?'Открыто':'Закрыто';const sr=RECIPES[selectedRecipe]||RECIPES['espresso'];const displayTemp=sr.cat==='dessert'?'нейтральный':selectedTemp==='hot'?'горячий':'со льдом';const clickTemp=sr.cat==='dessert'?'neutral':selectedTemp;$('click').textContent=Math.floor(recipePrice(selectedRecipe,clickTemp)*totalMult()*tier.mult);$('clickInfo').textContent=sr.name+' • '+displayTemp;$('btnHot').className='toggle-btn hot'+(selectedTemp==='hot'?' active':'');$('btnIced').className='toggle-btn iced'+(selectedTemp==='iced'?' active':'');$('btnHot').disabled=sr.cat==='dessert';$('btnIced').disabled=sr.cat==='dessert';$('stressFill').style.width=stress+'\%';$('rebirthBtn').disabled=S.earned<100000;
    if($('rebirthEarned'))$('rebirthEarned').textContent = Math.floor(S.earned).toLocaleString('ru-RU');
    
    renderOrder();updateStaticDOM();
  }catch(e){console.error('updateUI error:',e);}
}

function gameLoop(now){
  const dt=Math.min(1,(now-lastTick)/1000);lastTick=now;
  if(S.dayOpen){S.dayTime+=dt/DAY_DURATION;if(S.dayTime>=1){S.dayTime=1;closeDay();}}else{nightTimer+=dt;}
  applyTimeEffects();
  eventTimer-=dt;if(currentEvent){if(eventTimer<=0)endEvent();else renderEvent();}else if(S.dayOpen){nextEventTime-=dt;if(nextEventTime<=0){startEvent();nextEventTime=45+Math.random()*75;}}
  suppliersWork(dt);
  if(S.dayOpen){let spawn=S.spawnRate;if(currentEvent&&currentEvent.effect==='spawn')spawn*=currentEvent.val;if(getTimeOfDay().name==='Ночь')spawn*=0.6;if(getTimeOfDay().name==='Утро')spawn*=1.2;if(!currentOrder){orderTimer+=spawn*dt;if(orderTimer>=1){orderTimer-=1;generateOrder();}}else{currentOrder.time-=dt;if(currentOrder.time<=0){log('😞 Клиент ушёл');S.rep=Math.max(0,S.rep-(currentEvent&&currentEvent.effect==='strict'?3:1));currentOrder=null;renderOrder();}}staffWork(dt);}
  stress=Math.max(0,stress-dt*8);
  autoSaveTimer+=dt;if(autoSaveTimer>=30){autoSaveTimer=0;saveGame();log('💾 Автосохранение');}
  uiTimer+=dt;if(uiTimer>=0.25||needsUIUpdate){uiTimer=0;needsUIUpdate=false;updateUI();}else{$('timeFill').style.width=(S.dayTime*100)+'%';}
  requestAnimationFrame(gameLoop);
}

function init(){
  loadGame();applySkin(S.activeSkin);dayRep=S.rep;
  buildStaticDOM();
  function switchTab(tab){document.querySelectorAll('.tab, .bottom-nav button').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.tab[data-tab="'+tab+'"], .bottom-nav button[data-tab="'+tab+'"]').forEach(x=>x.classList.add('active'));['recipes','storage','staff','suppliers','upgrades','skins','ach','rebirth'].forEach(x=>$(x).style.display=x===tab?'block':'none');}
  document.querySelectorAll('.tab').forEach(t=>{t.onclick=()=>{initAudio();switchTab(t.dataset.tab);needsUIUpdate=true;};});
  document.querySelectorAll('.bottom-nav button').forEach(t=>{t.onclick=()=>{initAudio();switchTab(t.dataset.tab);needsUIUpdate=true;};});
  $('coffeeBtn').onclick=(e)=>{initAudio();if(!S.dayOpen){log('🌙 Сейчас ночь, кофейня закрыта');return;}if(!currentOrder)generateOrder();if(currentOrder)fulfillOrder(true,e);};
  $('btnHot').onclick=()=>{selectedTemp='hot';needsUIUpdate=true;};$('btnIced').onclick=()=>{selectedTemp='iced';needsUIUpdate=true;};
  $('rebirthBtn').onclick=()=>{initAudio();doRebirth();};$('saveBtn').onclick=()=>{saveGame();log('💾 Сохранено!');playSound('click');};
  $('exportBtn').onclick=()=>{initAudio();exportSave();};
  $('importBtn').onclick=()=>{initAudio();$('importFile').click();};
  $('importFile').onchange=(e)=>{if(e.target.files[0])importSave(e.target.files[0]);};$('resetBtn').onclick=()=>{if(confirm('Точно сбросить ВСЁ?')){localStorage.removeItem('myataCoffeeSecureV14'); location.reload();}};
  $('openMorningBtn').onclick=()=>{initAudio();openMorning();};
  needsUIUpdate=true;requestAnimationFrame(gameLoop);
}

init();

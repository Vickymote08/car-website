// Shared data + helpers for the SellMyStuff prototype pages.
// Prototype only: listings live in this browser (localStorage), nothing is sent anywhere.

const SMS_LOGO = '<svg width="36" height="36" viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="smsG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2563eb"/><stop offset="1" stop-color="#22c55e"/></linearGradient></defs><rect width="48" height="48" rx="13" fill="url(#smsG)"/><path d="M15 19h18l-1.8 17.2a2 2 0 0 1-2 1.8H18.8a2 2 0 0 1-2-1.8z" fill="#fff"/><path d="M19 19v-2.5a5 5 0 0 1 10 0V19" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><path d="M20 29.5l2.8 2.8 5.4-5.6" fill="none" stroke="#2563eb" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const CATS = {
  electronics:{name:'Electronics',emoji:'💻',bg:'linear-gradient(135deg,#dbeafe,#e0e7ff)'},
  phones:{name:'Phones',emoji:'📱',bg:'linear-gradient(135deg,#e0e7ff,#f3e8ff)'},
  books:{name:'Books',emoji:'📚',bg:'linear-gradient(135deg,#fef3c7,#fde68a)'},
  furniture:{name:'Furniture',emoji:'🪑',bg:'linear-gradient(135deg,#ffedd5,#fde68a)'},
  cycles:{name:'Cycles',emoji:'🚲',bg:'linear-gradient(135deg,#dcfce7,#ccfbf1)'},
  audio:{name:'Audio',emoji:'🎧',bg:'linear-gradient(135deg,#fce7f3,#e0e7ff)'},
  appliances:{name:'Appliances',emoji:'🧊',bg:'linear-gradient(135deg,#cffafe,#dbeafe)'},
  fashion:{name:'Fashion',emoji:'👟',bg:'linear-gradient(135deg,#fee2e2,#fce7f3)'}
};

const SEED = [
  {id:'s1',title:'Dell Inspiron 15 Laptop (i5, 8GB)',cat:'electronics',emoji:'💻',price:28500,score:8.6,km:3.2,area:'Kothrud',seller:'Aditya K.',rating:4.8,age:'2 years',defects:['Minor scratches'],desc:'Used for college projects. Battery holds 4+ hours. Comes with original charger and box.',days:1},
  {id:'s2',title:'iPhone 12 (128 GB, Blue)',cat:'phones',emoji:'📱',price:31000,score:9.1,km:5.8,area:'Viman Nagar',seller:'Sneha P.',rating:4.9,age:'3 years',defects:[],desc:'Battery health 86%. Always used with a case and screen guard. Bill available.',days:0},
  {id:'s3',title:'Engineering Mechanics + Thermodynamics set',cat:'books',emoji:'📚',price:650,score:7.4,km:0.8,area:'MIT-ADT Campus',seller:'Rohan D.',rating:4.6,age:'1 year',defects:['Surface wear'],desc:'First-year textbooks, some highlighting in chapters 3–5. Great for MIT-ADT FY students.',days:2},
  {id:'s4',title:'Study table with drawer',cat:'furniture',emoji:'🪑',price:2400,score:7.9,km:4.1,area:'Loni Kalbhor',seller:'Priya M.',rating:4.7,age:'2 years',defects:['Minor scratches'],desc:'Sturdy engineered wood. Easy to dismantle for transport.',days:3},
  {id:'s5',title:'Hero Sprint 21-speed geared cycle',cat:'cycles',emoji:'🚲',price:6800,score:8.2,km:7.5,area:'Hadapsar',seller:'Karan S.',rating:4.5,age:'1.5 years',defects:['Surface wear'],desc:'Serviced last month. New brake pads. Lock included.',days:1},
  {id:'s6',title:'Sony WH-1000XM4 Headphones',cat:'audio',emoji:'🎧',price:11500,score:9.4,km:9.3,area:'Baner',seller:'Neha R.',rating:5.0,age:'2 years',defects:[],desc:'Excellent noise cancelling. Carry case and cable included.',days:0},
  {id:'s7',title:'Samsung 192L single-door fridge',cat:'appliances',emoji:'🧊',price:7200,score:7.1,km:11.2,area:'Wakad',seller:'Amit J.',rating:4.4,age:'4 years',defects:['Dents','Surface wear'],desc:'Cooling works perfectly. Small dent on the side panel (see passport).',days:4},
  {id:'s8',title:'Nike Air Zoom Pegasus (UK 9)',cat:'fashion',emoji:'👟',price:2900,score:8.0,km:6.4,area:'Koregaon Park',seller:'Ishita V.',rating:4.7,age:'8 months',defects:['Minor wear'],desc:'Worn for about 20 runs. Cleaned and deodorised.',days:2},
  {id:'s9',title:'HP 24" Full-HD Monitor',cat:'electronics',emoji:'🖥️',price:6500,score:8.8,km:2.5,area:'Kothrud',seller:'Vivek T.',rating:4.8,age:'1 year',defects:[],desc:'IPS panel, no dead pixels. HDMI cable included.',days:1},
  {id:'s10',title:'Casio fx-991ES Plus calculator',cat:'books',emoji:'🧮',price:600,score:8.9,km:1.1,area:'MIT-ADT Campus',seller:'Tanvi G.',rating:4.9,age:'1 year',defects:[],desc:'Exam-approved scientific calculator. Works perfectly.',days:0},
  {id:'s11',title:'JBL Flip 5 Bluetooth speaker',cat:'audio',emoji:'🔊',price:4200,score:6.8,km:13.9,area:'Pimpri',seller:'Sahil N.',rating:4.3,age:'3 years',defects:['Minor scratches','Surface wear'],desc:'Loud and waterproof. Some scuffs on the grille.',days:5},
  {id:'s12',title:'OnePlus Nord CE 3 (8/128)',cat:'phones',emoji:'📱',price:14500,score:8.4,km:8.8,area:'Aundh',seller:'Mehul B.',rating:4.6,age:'1 year',defects:['Minor scratches'],desc:'Original box and charger. No repairs.',days:3}
];

const store = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d }catch(e){ return d } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch(e){} }
};
const myListings = () => store.get('sms_my_listings', []);
const allListings = () => [...myListings(), ...SEED];

const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
const scoreColor = s => s >= 8.5 ? '#16a34a' : s >= 7 ? '#2563eb' : s >= 5 ? '#d97706' : '#dc2626';
const scoreGrade = s => s >= 8.5 ? 'Excellent' : s >= 7 ? 'Very good' : s >= 5 ? 'Good' : 'Fair';
const scoreChip = s => `<span class="score" style="background:${scoreColor(s)}">${s.toFixed(1)}<small>/10</small></span>`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function toast(msg){
  let t = document.querySelector('.toast');
  if(!t){ t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t) }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600);
}

function topbar(active){
  const name = store.get('sms_user', 'Rahul Sharma');
  const ini = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return `<header class="top"><div class="wrap">
    <a href="index.html" class="brand">${SMS_LOGO}<span>SellMyStuff</span></a>
    <nav>
      <a href="index.html">Home</a>
      <a href="browse.html" class="${active==='browse'?'on':''}">Browse</a>
      <a href="sell.html" class="${active==='sell'?'on':'cta'}">${active==='sell'?'Sell':'+ Sell an item'}</a>
    </nav>
    <a href="login.html" class="user" title="${esc(name)}">${esc(ini)}</a>
  </div></header>`;
}

// ─── HERO CAROUSEL ───
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.getElementById('heroDots');
let autoTimer;

slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'hdot' + (i === 0 ? ' active' : '');
    d.onclick = () => goSlide(i);
    dotsContainer.appendChild(d);
});

function goSlide(n) {
    slides[currentSlide].style.display = 'none';
    document.querySelectorAll('.hdot')[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].style.display = 'flex';
    document.querySelectorAll('.hdot')[currentSlide].classList.add('active');
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goSlide(currentSlide + 1), 5000);
}
function nextSlide() { goSlide(currentSlide + 1); }
function prevSlide() { goSlide(currentSlide - 1); }

slides.forEach((s, i) => { s.style.display = i === 0 ? 'flex' : 'none'; });
autoTimer = setInterval(() => goSlide(currentSlide + 1), 5000);

// touch swipe
let ts = 0;
document.getElementById('heroSection').addEventListener('touchstart', e => ts = e.touches[0].clientX);
document.getElementById('heroSection').addEventListener('touchend', e => {
    const dx = ts - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) dx > 0 ? nextSlide() : prevSlide();
});

// ─── DATA ───
const catData = [
    { icon: '⚙️', label: 'Engine Parts', color: '#e8a020', id: 'engine' },
    { icon: '🛑', label: 'Brakes & Rotors', color: '#e11d48', id: 'brakes' },
    { icon: '🔧', label: 'Suspension', color: '#6366f1', id: 'suspension' },
    { icon: '⚡', label: 'Electrical & EV', color: '#00d4aa', id: 'electrical' },
    { icon: '🔩', label: 'Transmission', color: '#f59e0b', id: 'transmission' },
    { icon: '🚗', label: 'Body Parts', color: '#3b82f6', id: 'body' },
    { icon: '🏎️', label: 'Tyres & Wheels', color: '#8b5cf6', id: 'tyres' },
    { icon: '🌡️', label: 'Cooling & HVAC', color: '#06b6d4', id: 'cooling' },
    { icon: '🪑', label: 'Interior', color: '#ec4899', id: 'interior' },
    { icon: '💨', label: 'Exhaust & Fuel', color: '#ef4444', id: 'exhaust' },
    { icon: '🔦', label: 'Headlights & Fog', color: '#fbbf24', id: 'body' },
    { icon: '🪝', label: 'Filters & Fluids', color: '#10b981', id: 'engine' },
    { icon: '🛢️', label: 'Oil & Lubricants', color: '#d97706', id: 'engine' },
    { icon: '🔋', label: 'EV Battery Packs', color: '#00d4aa', id: 'electrical' },
    { icon: '📡', label: 'Sensors & ECU', color: '#8b5cf6', id: 'electrical' },
    { icon: '🪛', label: 'Repair Tools', color: '#6b7280', id: 'engine' },
    { icon: '🏁', label: 'Performance Mods', color: '#f43f5e', id: 'engine' },
    { icon: '🚙', label: 'Wiper Systems', color: '#64748b', id: 'body' },
];

const allProducts = [
    // Engine
    { name:'Forged Piston Set (Set of 4)', cat:'engine', type:'petrol', price:'₹8,499', orig:'₹12,000', badge:'deal', img:'https://images.unsplash.com/photo-1598972825301-49666e409385?w=400&h=300&fit=crop', brand:'MAHLE', rating:4.7, rev:342 },
    { name:'Common Rail Fuel Injector', cat:'engine', type:'diesel', price:'₹6,200', orig:'₹9,000', badge:'oem', img:'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', brand:'Bosch', rating:4.9, rev:218 },
    { name:'Electric Motor Controller 96V', cat:'engine', type:'ev', price:'₹22,000', orig:'₹28,000', badge:'new', img:'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop', brand:'Danfoss', rating:4.8, rev:91 },
    { name:'Timing Chain Kit', cat:'engine', type:'petrol', price:'₹4,100', orig:'₹5,800', badge:'hot', img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop', brand:'Febi', rating:4.6, rev:156 },
    { name:'Diesel Turbocharger GTB2256V', cat:'engine', type:'diesel', price:'₹18,500', orig:'₹24,000', badge:'deal', img:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop', brand:'Garrett', rating:4.8, rev:89 },
    { name:'Cylinder Head Gasket Set', cat:'engine', type:'petrol', price:'₹2,800', orig:'', badge:'oem', img:'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop', brand:'Victor Reinz', rating:4.5, rev:203 },
    // Brakes
    { name:'Brembo Front Brake Pads', cat:'brakes', type:'universal', price:'₹3,200', orig:'₹4,800', badge:'deal', img:'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop', brand:'Brembo', rating:4.9, rev:567 },
    { name:'Ventilated Disc Rotor (Pair)', cat:'brakes', type:'universal', price:'₹4,500', orig:'₹6,200', badge:'hot', img:'https://images.unsplash.com/photo-1600661653561-30c924791c32?w=400&h=300&fit=crop', brand:'StopTech', rating:4.7, rev:334 },
    { name:'ABS Sensor — Front Wheel', cat:'brakes', type:'ev', price:'₹1,100', orig:'', badge:'new', img:'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop', brand:'Bosch', rating:4.6, rev:112 },
    { name:'Brake Caliper (Remanufactured)', cat:'brakes', type:'petrol', price:'₹5,800', orig:'₹8,000', badge:'deal', img:'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop', brand:'A1 Cardone', rating:4.4, rev:78 },
    // Suspension
    { name:'Monroe Shock Absorber (Pair)', cat:'suspension', type:'universal', price:'₹6,400', orig:'₹9,200', badge:'deal', img:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop', brand:'Monroe', rating:4.8, rev:421 },
    { name:'Ball Joint Lower Control Arm', cat:'suspension', type:'petrol', price:'₹1,600', orig:'₹2,400', badge:'hot', img:'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&h=300&fit=crop', brand:'Moog', rating:4.5, rev:188 },
    { name:'Air Suspension Compressor', cat:'suspension', type:'diesel', price:'₹12,000', orig:'₹16,500', badge:'oem', img:'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop', brand:'Arnott', rating:4.7, rev:63 },
    { name:'EV Adaptive Damper Module', cat:'suspension', type:'ev', price:'₹8,500', orig:'₹11,000', badge:'new', img:'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop', brand:'Continental', rating:4.6, rev:47 },
    // Electrical / EV
    { name:'LFP Battery Module 72V 100Ah', cat:'electrical', type:'ev', price:'₹48,000', orig:'₹62,000', badge:'new', img:'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop', brand:'CATL OEM', rating:4.9, rev:201 },
    { name:'LED Headlight Assembly (Pair)', cat:'electrical', type:'universal', price:'₹5,200', orig:'₹8,000', badge:'deal', img:'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&h=300&fit=crop', brand:'Osram', rating:4.8, rev:354 },
    { name:'Alternator 90A Rebuilt', cat:'electrical', type:'petrol', price:'₹4,800', orig:'', badge:'hot', img:'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop', brand:'Bosch', rating:4.6, rev:142 },
    { name:'BMS Battery Management System', cat:'electrical', type:'ev', price:'₹11,500', orig:'₹15,000', badge:'new', img:'https://images.unsplash.com/photo-1558444458-5c455962afc9?w=400&h=300&fit=crop', brand:'Daly', rating:4.7, rev:88 },
    { name:'Diesel Glow Plug Set (×4)', cat:'electrical', type:'diesel', price:'₹2,400', orig:'₹3,600', badge:'deal', img:'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop', brand:'NGK', rating:4.5, rev:167 },
    // Transmission
    { name:'Clutch Kit (Disc + Pressure Plate)', cat:'transmission', type:'petrol', price:'₹7,200', orig:'₹10,500', badge:'deal', img:'https://images.unsplash.com/photo-1600661653561-30c924791c32?w=400&h=300&fit=crop', brand:'LuK', rating:4.8, rev:298 },
    { name:'Diesel Dual-Mass Flywheel', cat:'transmission', type:'diesel', price:'₹14,000', orig:'₹19,000', badge:'oem', img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop', brand:'Sachs', rating:4.7, rev:134 },
    { name:'CVT Transmission Oil', cat:'transmission', type:'universal', price:'₹1,800', orig:'', badge:'hot', img:'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop', brand:'Motul', rating:4.6, rev:445 },
    { name:'EV Single-Speed Reducer', cat:'transmission', type:'ev', price:'₹32,000', orig:'₹42,000', badge:'new', img:'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop', brand:'ZF', rating:4.8, rev:56 },
    // Body
    { name:'Front Bumper Cover (Unpainted)', cat:'body', type:'universal', price:'₹3,600', orig:'₹5,200', badge:'deal', img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop', brand:'Taiwan OEM', rating:4.3, rev:211 },
    { name:'Xenon / HID Headlight Kit', cat:'body', type:'petrol', price:'₹4,100', orig:'₹6,800', badge:'hot', img:'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop', brand:'Philips', rating:4.7, rev:389 },
    { name:'Fog Light Assembly LED', cat:'body', type:'universal', price:'₹2,200', orig:'₹3,400', badge:'deal', img:'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop', brand:'Hella', rating:4.6, rev:276 },
    { name:'Side Mirror Assembly (Power)', cat:'body', type:'universal', price:'₹3,800', orig:'', badge:'oem', img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop', brand:'BLIC', rating:4.4, rev:134 },
    // Tyres
    { name:'MRF ZVTS 185/65 R15', cat:'tyres', type:'universal', price:'₹4,200', orig:'₹5,100', badge:'deal', img:'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop', brand:'MRF', rating:4.7, rev:528 },
    { name:'CEAT SecuraDrive 195/65 R15', cat:'tyres', type:'universal', price:'₹3,900', orig:'₹4,800', badge:'hot', img:'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', brand:'CEAT', rating:4.6, rev:342 },
    { name:'Continental EcoContact 6 (EV)', cat:'tyres', type:'ev', price:'₹6,800', orig:'₹8,200', badge:'new', img:'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop', brand:'Continental', rating:4.9, rev:187 },
    { name:'Alloy Wheel 16" 5-Spoke', cat:'tyres', type:'universal', price:'₹7,500', orig:'₹10,000', badge:'deal', img:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop', brand:'Enkei', rating:4.8, rev:213 },
    // Cooling
    { name:'Aluminum Radiator Assembly', cat:'cooling', type:'petrol', price:'₹5,600', orig:'₹8,000', badge:'deal', img:'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop', brand:'Denso', rating:4.7, rev:167 },
    { name:'EV Thermal Management Kit', cat:'cooling', type:'ev', price:'₹18,000', orig:'₹24,000', badge:'new', img:'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop', brand:'Modine', rating:4.8, rev:72 },
    { name:'AC Compressor Rebuild Kit', cat:'cooling', type:'diesel', price:'₹8,200', orig:'₹11,500', badge:'hot', img:'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&h=300&fit=crop', brand:'Sanden', rating:4.5, rev:98 },
    // Interior
    { name:'Digital Instrument Cluster', cat:'interior', type:'universal', price:'₹6,500', orig:'₹9,200', badge:'new', img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop', brand:'Nippon Seiki', rating:4.6, rev:156 },
    { name:'EV Range Indicator Display', cat:'interior', type:'ev', price:'₹4,200', orig:'', badge:'new', img:'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop', brand:'VDO', rating:4.7, rev:88 },
    { name:'Seat Foam Cushion Set', cat:'interior', type:'universal', price:'₹2,800', orig:'₹3,800', badge:'deal', img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop', brand:'Recaro Compat.', rating:4.5, rev:211 },
    // Exhaust
    { name:'DPF Diesel Particulate Filter', cat:'exhaust', type:'diesel', price:'₹12,500', orig:'₹17,000', badge:'deal', img:'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', brand:'Delphi', rating:4.6, rev:143 },
    { name:'Catalytic Converter Universal', cat:'exhaust', type:'petrol', price:'₹9,800', orig:'₹14,000', badge:'oem', img:'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop', brand:'Walker', rating:4.7, rev:167 },
    { name:'High-Flow Sports Air Filter', cat:'exhaust', type:'petrol', price:'₹1,400', orig:'₹2,200', badge:'hot', img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop', brand:'K&N', rating:4.8, rev:489 },
];

// ─── RENDER CATEGORY GRID ───
const catGrid = document.getElementById('catGrid');
catData.forEach(c => {
    catGrid.innerHTML += `
    <a href="#${c.id}" class="cat-card">
        <div class="cat-card-icon" style="background:${c.color}22;color:${c.color}">${c.icon}</div>
        <span>${c.label}</span>
    </a>`;
});

// ─── RENDER PRODUCT CARDS ───
function typeLabel(t) {
    if(t==='ev') return '<span class="pcard-type type-ev">⚡ EV</span>';
    if(t==='petrol') return '<span class="pcard-type type-petrol">🔥 Petrol</span>';
    if(t==='diesel') return '<span class="pcard-type type-diesel">⚙️ Diesel</span>';
    return '<span class="pcard-type type-universal">Universal</span>';
}
function badgeClass(b) {
    return {deal:'badge-deal',new:'badge-new',hot:'badge-hot',oem:'badge-oem'}[b]||'badge-oem';
}
function stars(r) {
    let s=''; for(let i=0;i<5;i++) s+=`<i class="fas fa-star" style="opacity:${i<Math.round(r)?1:0.25}"></i>`; return s;
}
function buildCard(p) {
    const encoded = encodeURIComponent(JSON.stringify(p));
    return `
    <div class="pcard" onclick="goToDetail('${encoded}')">
        <div class="pcard-img">
            <img src="${p.img}" alt="${p.name}" loading="lazy">
            <span class="pcard-badge ${badgeClass(p.badge)}">${p.badge.toUpperCase()}</span>
            <div class="pcard-fav" onclick="event.stopPropagation();toggleFav(this)"><i class="far fa-heart"></i></div>
            ${typeLabel(p.type)}
        </div>
        <div class="pcard-body">
            <div class="pcard-compat">${p.brand}</div>
            <div class="pcard-name">${p.name}</div>
            <div class="pcard-prices">
                <span class="pcard-price">${p.price}</span>
                ${p.orig?`<span class="pcard-original">${p.orig}</span>`:''}
            </div>
            <div class="pcard-rating">${stars(p.rating)} <span>${p.rating} (${p.rev})</span></div>
            <button class="btn-cart" onclick="event.stopPropagation();addCart(this)">Add to Cart</button>
        </div>
    </div>`;
}

function renderSection(id, catFilter, maxItems) {
    const el = document.getElementById(id+'Scroll');
    if(!el) return;
    const items = allProducts.filter(p => p.cat === catFilter);
    el.innerHTML = items.slice(0, maxItems||items.length).map(buildCard).join('');
}

// Render all sections
renderSection('engine','engine');
renderSection('brakes','brakes');
renderSection('suspension','suspension');
renderSection('electrical','electrical');
renderSection('transmission','transmission');
renderSection('body','body');
renderSection('tyres','tyres');
renderSection('cooling','cooling');
renderSection('interior','interior');
renderSection('exhaust','exhaust');

// Deals — pick badge:deal items from all
const dealsEl = document.getElementById('dealsScroll');
dealsEl.innerHTML = allProducts.filter(p=>p.badge==='deal').slice(0,8).map(buildCard).join('');

// ─── INTERACTIONS ───
let cartCount = 0;
function addCart(btn) {
    cartCount++;
    document.getElementById('cartCount').textContent = cartCount;
    document.getElementById('fabCount').textContent = cartCount;
    btn.textContent = '✓ Added!';
    btn.style.background = 'var(--ev)'; btn.style.color = '#000'; btn.style.borderColor = 'var(--ev)';
    setTimeout(() => { btn.textContent = 'Add to Cart'; btn.style.background=''; btn.style.color=''; btn.style.borderColor=''; }, 1800);
}
function toggleFav(el) {
    el.innerHTML = el.innerHTML.includes('far') ? '<i class="fas fa-heart" style="color:#e11d48"></i>' : '<i class="far fa-heart"></i>';
}
function goToDetail(encoded) {
    const data = encodeURIComponent(encoded);
window.location.href = `car_productdetail.html?p=${data}`;
}
function setActive(btn, cls) {
    btn.closest('.type-filter').querySelectorAll('.type-btn').forEach(b => {
        b.className = 'type-btn';
    });
    btn.className = 'type-btn ' + cls;
}
function scrollToSection(id) { document.getElementById(id).scrollIntoView({behavior:'smooth'}); }
function filterByType(type, pill) {
    document.querySelectorAll('.cat-pill').forEach(p=>p.classList.remove('active'));
    pill.classList.add('active');
}

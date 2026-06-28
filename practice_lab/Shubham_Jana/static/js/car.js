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

let allProducts = [];

// ─── RENDER CATEGORY GRID ───
const catGrid = document.getElementById('catGrid');
if (catGrid) {
    catData.forEach(c => {
        catGrid.innerHTML += `
        <a href="#${c.id}" class="cat-card">
            <div class="cat-card-icon" style="background:${c.color}22;color:${c.color}">${c.icon}</div>
            <span>${c.label}</span>
        </a>`;
    });
}

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

async function loadCarProducts() {
    const productsUrl = window.CAR_PRODUCTS_URL || '/static/data/car-products.json';
    try {
        const response = await fetch(productsUrl);
        if (!response.ok) throw new Error(`Failed to load car products (${response.status})`);
        const data = await response.json();
        allProducts = data;

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
        if (dealsEl) {
            dealsEl.innerHTML = allProducts.filter(p=>p.badge==='deal').slice(0,8).map(buildCard).join('');
        }
    } catch (error) {
        console.error('Error loading car products:', error);
    }
}

// Call product loading
loadCarProducts();

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

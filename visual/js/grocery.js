// --- UI Interactions ---
let settingsOpen = false;
function toggleSettings() {
    settingsOpen = !settingsOpen;
    const panel = document.getElementById('settingsPanel');
    const btn = document.getElementById('settingsBtn');
    if (panel) panel.classList.toggle('open', settingsOpen);
    if (btn) btn.classList.toggle('active', settingsOpen);
    document.getElementById('navBackdrop')?.classList.toggle('active', settingsOpen);
    if (mobileOpen) closeMobile();
}
function closeSettings() {
    settingsOpen = false;
    document.getElementById('settingsPanel')?.classList.remove('open');
    document.getElementById('settingsBtn')?.classList.remove('active');
}
function toggleSetting(id) { document.getElementById('toggle-' + id)?.classList.toggle('on'); }

let mobileOpen = false, searchOpen = false;
function toggleMobile() {
    mobileOpen = !mobileOpen;
    const panel = document.getElementById('mobilePanel');
    const icon = document.getElementById('hamburgerIcon');
    const backdrop = document.getElementById('navBackdrop');
    if (mobileOpen) {
        if (panel) { panel.style.display = 'flex'; requestAnimationFrame(() => panel.classList.add('open')); }
        if (icon) icon.className = 'bi bi-x-lg';
        backdrop?.classList.add('active');
    } else { closeMobile(); }
}
function closeMobile() {
    mobileOpen = false;
    const panel = document.getElementById('mobilePanel');
    const icon = document.getElementById('hamburgerIcon');
    if (panel) {
        panel.classList.remove('open');
        setTimeout(() => { if (!mobileOpen) panel.style.display = 'none'; }, 350);
    }
    if (icon) icon.className = 'bi bi-list';
}
function closeAll() { closeMobile(); closeSettings(); document.getElementById('navBackdrop')?.classList.remove('active'); }
function toggleSearch() {
    searchOpen = !searchOpen;
    const overlay = document.getElementById('searchOverlay');
    if (overlay) overlay.classList.toggle('active', searchOpen);
    if (searchOpen) setTimeout(() => document.getElementById('searchInput')?.focus(), 300);
}
function clearNavSearch() {
    const input = document.getElementById('navSearchInput');
    const clear = document.getElementById('navSearchClear');
    if (input) input.value = '';
    clear?.classList.remove('visible');
    input?.focus();
}

// --- WISHLIST DRAWER TOGGLE ---
function toggleFavDrawer() {
    document.getElementById('favDrawer')?.classList.toggle('open');
    document.getElementById('favBackdrop')?.classList.toggle('open');
}

// --- WISHLIST LOGIC ---
let wishlist = JSON.parse(localStorage.getItem('pbssd_wishlist') || '[]');

function toggleWishlist(product) {
    const index = wishlist.findIndex(item => item.name === product.name);
    if (index === -1) {
        wishlist.push(product);
        Swal.fire({ title: 'Added to Wishlist!', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500, icon: 'success', background: '#FAFAF7', color: '#1A1A1A' });
    } else {
        wishlist.splice(index, 1);
        Swal.fire({ title: 'Removed from Wishlist', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500, icon: 'info', background: '#FAFAF7', color: '#1A1A1A' });
    }
    localStorage.setItem('pbssd_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    syncWishlistButtons();
}

function updateWishlistUI() {
    const drawerBody = document.getElementById('favDrawerBody');
    const badge = document.getElementById('favIconBadge');
    const drawerCount = document.getElementById('favDrawerCount');

    if (!drawerBody || !badge) return;

    badge.innerText = wishlist.length;
    badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    if (drawerCount) drawerCount.innerText = wishlist.length;

    if (wishlist.length === 0) {
        drawerBody.innerHTML = `
          <div class="fav-empty">
            <div class="fav-empty-icon"><i class="bi bi-heart"></i></div>
            <h5>Nothing saved yet</h5>
            <p>Tap the heart on any product to save it here.</p>
          </div>
        `;
    } else {
        drawerBody.innerHTML = `
          <div class="fav-grid">
            ${wishlist.map((item, idx) => `
              <div class="fav-item">
                <img src="${item.img}" class="fav-item-img" alt="${item.name}">
                <div style="flex:1;">
                  <h6 style="font-weight:600;margin:0;font-size:0.9rem;">${item.name}</h6>
                  <p style="color:var(--sage);font-weight:700;margin:4px 0 0;font-size:0.85rem;">${item.price}</p>
                </div>
                <button onclick="removeFromWishlist(${idx})" style="background:none;border:none;color:var(--gray);cursor:pointer;font-size:1.1rem;padding:5px;"><i class="bi bi-trash"></i></button>
              </div>
            `).join('')}
          </div>
        `;
    }
}

window.removeFromWishlist = (index) => {
    wishlist.splice(index, 1);
    localStorage.setItem('pbssd_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    syncWishlistButtons();
};

function syncWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const card = btn.closest('.product-card');
        const name = card.querySelector('h3')?.innerText;
        const isWishlisted = wishlist.some(item => item.name === name);
        btn.classList.toggle('active', isWishlisted);
        btn.innerHTML = isWishlisted ? '<i class="bi bi-heart-fill"></i>' : '<i class="bi bi-heart"></i>';
    });
}

// --- CART STATE LOGIC (IndexedDB) ---
let cartDB;
const cartRequest = indexedDB.open('PBSSDCartDB', 2);
cartRequest.onupgradeneeded = (e) => {
    const db = e.target.result;
    if (!db.objectStoreNames.contains('cart_state')) db.createObjectStore('cart_state');
    if (!db.objectStoreNames.contains('cart_items')) {
        db.createObjectStore('cart_items', { keyPath: 'id', autoIncrement: true });
    }
};
cartRequest.onsuccess = (e) => {
    cartDB = e.target.result;
    refreshCartBadge();
};

function getCartBadgeEl() {
    return document.getElementById('cart-badge') || document.getElementById('cartBadge');
}
function refreshCartBadge() {
    if (!cartDB) return;
    const tx = cartDB.transaction(['cart_items'], 'readonly');
    const store = tx.objectStore('cart_items');
    const getReq = store.getAll();
    getReq.onsuccess = () => {
        const items = getReq.result;
        const total = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
        const badge = getCartBadgeEl();
        if (badge) badge.innerText = total;

        // Sync legacy counter for other site components
        const stateTx = cartDB.transaction(['cart_state'], 'readwrite');
        stateTx.objectStore('cart_state').put(total, 'count');
    };
}

function checkAuth() {
    const user = JSON.parse(localStorage.getItem('pbssd_user'));
    const loginNav = document.getElementById('login-nav-btn');
    const profileNav = document.getElementById('user-profile-btn');
    const nameDesktop = document.getElementById('user-nav-name');
    const loginNavMobile = document.getElementById('login-nav-btn-mobile');
    const profileNavMobile = document.getElementById('user-profile-btn-mobile');
    const nameMobile = document.getElementById('user-nav-name-mobile');
    if (user) {
        loginNav?.classList.add('d-none');
        profileNav?.classList.remove('d-none');
        loginNavMobile?.classList.add('d-none');
        profileNavMobile?.classList.remove('d-none');
        if (nameDesktop) nameDesktop.innerText = user.name || 'Profile';
        if (nameMobile) nameMobile.innerText = user.name || 'Profile';
    }
}

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => { if (preloader) { preloader.style.opacity = '0'; preloader.style.visibility = 'hidden'; } }, 1000);
    AOS.init({ duration: 900, once: true, offset: 80, easing: 'ease-out-cubic' });
    checkAuth();

    // --- DYNAMICALLY ADD WISHLIST BUTTONS TO ALL PRODUCTS ---
    document.querySelectorAll('.product-card').forEach(card => {
        const imgContainer = card.querySelector('.product-img');
        if (!imgContainer) return;

        imgContainer.style.position = 'relative';

        const name = card.querySelector('h3')?.innerText;
        const price = card.querySelector('.price')?.innerText;
        const img = card.querySelector('img')?.src;

        const btn = document.createElement('button');
        btn.className = 'wishlist-btn';
        btn.innerHTML = '<i class="bi bi-heart"></i>';
        btn.onclick = (e) => {
            e.stopPropagation();
            toggleWishlist({ name, price, img });
        };

        imgContainer.appendChild(btn);
    });

    // --- REDIRECT TO DETAILS PAGE ON CARD CLICK ---
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.wishlist-btn') || e.target.closest('.add-btn')) return;

            const name = card.querySelector('h3')?.innerText;
            const price = card.querySelector('.price')?.innerText;
            const img = card.querySelector('img')?.src;
            const sub = card.querySelector('.sub')?.innerText;
            const badge = card.querySelector('.product-badge')?.innerText || '';

            window.location.href = `grocery_productDetails.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&img=${encodeURIComponent(img)}&sub=${encodeURIComponent(sub)}&badge=${encodeURIComponent(badge)}`;
        });
    });

    updateWishlistUI();
    syncWishlistButtons();

    const nav = document.querySelector('.navbar');
    const catBar = document.getElementById('categoryNavBar');
    if (nav && catBar) catBar.style.top = (nav.getBoundingClientRect().height + 4) + 'px';
});

// ── SLIDER ──
const track = document.getElementById('slidesTrack');
const dotsContainer = document.getElementById('sliderDots');
const totalSlides = track.children.length;
let current = 0;
let autoTimer;

// Build dots
for (let i = 0; i < totalSlides; i++) {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(d);
}

function goTo(n) {
    current = (n + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
    resetTimer();
}

function resetTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 4500);
}

document.getElementById('arrowPrev').addEventListener('click', () => goTo(current - 1));
document.getElementById('arrowNext').addEventListener('click', () => goTo(current + 1));

// Swipe support
let startX = 0;
track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
});

resetTimer();

// ── CATEGORY PILLS ──
document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
        document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const targetId = pill.getAttribute('data-target');
        if (targetId === 'all') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - 20;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ── SLIDER BUTTONS TO SECTIONS ──
document.querySelectorAll('.slide-actions .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        if (targetId) {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                // Sync active pill
                document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
                const targetPill = document.querySelector(`.pill[data-target="${targetId}"]`);
                if (targetPill) targetPill.classList.add('active');
            }
        }
    });
});

// ── BAG COUNTER ──
document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (!localStorage.getItem('pbssd_user')) {
            new bootstrap.Modal(document.getElementById('userLoginModal')).show();
            return;
        }

        const card = btn.closest('.product-card') || btn.closest('.slide-pcard');
        if (!card) return;

        let name, price, img;
        if (card.classList.contains('product-card')) {
            name = card.querySelector('h3')?.innerText;
            price = card.querySelector('.price')?.innerText;
            img = card.querySelector('.product-img img')?.src;
        } else {
            name = card.querySelector('.sp-name')?.innerText;
            price = card.querySelector('.sp-price')?.innerText;
            img = card.querySelector('.sp-emoji img')?.src;
        }

        if (cartDB) {
            const tx = cartDB.transaction(['cart_items'], 'readwrite');
            const store = tx.objectStore('cart_items');
            const getReq = store.getAll();

            getReq.onsuccess = () => {
                const items = getReq.result;
                const existingItem = items.find(i => i.name === name);

                if (existingItem) {
                    existingItem.quantity = (existingItem.quantity || 1) + 1;
                    store.put(existingItem);
                } else {
                    store.add({ name, price, img, quantity: 1, timestamp: Date.now() });
                }
            };

            tx.oncomplete = () => {
                refreshCartBadge();

                // Dual-storage sync for broad compatibility
                let lsCart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
                const exLs = lsCart.find(i => i.name === name);
                if (exLs) exLs.quantity = (exLs.quantity || 1) + 1;
                else lsCart.push({ id: Date.now(), name, price, image: img, quantity: 1 });
                localStorage.setItem('pbssd_cart', JSON.stringify(lsCart));

                const orig = btn.textContent;
                btn.textContent = '✓';
                btn.style.background = 'var(--sage)';
                btn.style.color = '#fff';
                setTimeout(() => {
                    btn.textContent = orig;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 1200);

                Swal.fire({
                    title: 'Added to Bag!',
                    text: `${name} is ready for checkout.`,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    icon: 'success',
                    background: '#FAFAF7'
                });
            };
        }
    });
});

// ── SCROLL FADE IN ──
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.style.opacity = 1; });
}, { threshold: 0.1 });
document.querySelectorAll('.product-card').forEach(c => observer.observe(c));

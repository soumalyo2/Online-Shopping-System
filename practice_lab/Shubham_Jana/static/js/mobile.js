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

    // --- WISHLIST LOGIC ---
    let favourites = JSON.parse(localStorage.getItem('pbssd_mobile_favs') || '[]');
    let favDrawerOpen = false;

    function toggleFavDrawer() {
        favDrawerOpen = !favDrawerOpen;
        document.getElementById('favDrawer')?.classList.toggle('open', favDrawerOpen);
        document.getElementById('favBackdrop')?.classList.toggle('open', favDrawerOpen);
    }

    function toggleFavourite(productId, btn) {
        const isFav = favourites.includes(productId);
        if (isFav) {
            favourites = favourites.filter(id => id !== productId);
            if (btn) {
                btn.classList.remove('active');
                const icon = btn.querySelector('i');
                if (icon) icon.className = 'bi bi-heart';
            }
            const iconBadge = document.getElementById('favIconBadge');
            if (iconBadge) {
                iconBadge.textContent = favourites.length;
                iconBadge.style.display = favourites.length === 0 ? 'none' : 'flex';
            }
            localStorage.setItem('pbssd_mobile_favs', JSON.stringify(favourites));
            renderFavDrawer();
            Swal.fire({ title: 'Removed from Favourites', toast: true, position: 'top-end', showConfirmButton: false, timer: 1200, icon: 'info', background: '#FAFAF7', color: '#1A1A1A' });
        } else {
            favourites.push(productId);
            if (btn) {
                btn.classList.add('active');
                const icon = btn.querySelector('i');
                if (icon) icon.className = 'bi bi-heart-fill';
            }
            const iconBadge = document.getElementById('favIconBadge');
            if (iconBadge) {
                iconBadge.textContent = favourites.length;
                iconBadge.style.display = 'flex';
            }
            localStorage.setItem('pbssd_mobile_favs', JSON.stringify(favourites));
            renderFavDrawer();
            Swal.fire({ title: 'Saved to Favourites!', toast: true, position: 'top-end', showConfirmButton: false, timer: 1400, icon: 'success', background: '#FAFAF7', color: '#1A1A1A' });
        }
    }

    function removeFromFavourites(productId) {
        favourites = favourites.filter(id => id !== productId);
        localStorage.setItem('pbssd_mobile_favs', JSON.stringify(favourites));
        const iconBadge = document.getElementById('favIconBadge');
        if (iconBadge) {
            iconBadge.textContent = favourites.length;
            iconBadge.style.display = favourites.length === 0 ? 'none' : 'flex';
        }
        renderFavDrawer();
        syncWishlistButtons();
    }

    function renderFavDrawer() {
        const grid = document.getElementById('favGrid');
        const empty = document.getElementById('favEmpty');
        const count = document.getElementById('favDrawerCount');
        if (!grid || !empty || !count) return;
        count.textContent = favourites.length;
        if (favourites.length === 0) {
            empty.style.display = 'flex';
            grid.innerHTML = '';
            return;
        }
        empty.style.display = 'none';
        grid.innerHTML = favourites.map(id => {
            const p = mobileProducts.find(x => x.id === id);
            if (!p) return '';
            return `
            <div class="fav-item" id="fav-item-${id}">
                <img src="${p.image}" class="fav-item-img" alt="${p.name}" style="width:72px;height:72px;border-radius:10px;object-fit:cover;">
                <div class="fav-item-info" style="flex:1;margin-left:12px;">
                    <div class="fav-item-name" style="font-weight:600;font-size:0.9rem;">${p.name}</div>
                    <div><span class="fav-item-price" style="color:var(--primary-mobile);font-weight:700;">${p.price}</span></div>
                    <div class="fav-item-actions" style="display:flex;gap:8px;margin-top:8px;">
                        <button class="fav-add-btn" onclick="handleAddToCart('${p.name.replace(/'/g, "\\'")}', '${p.price}', '${p.image}', ${p.id})" style="font-size:0.75rem;padding:4px 10px;background:var(--primary-mobile);color:white;border:none;border-radius:6px;">Add</button>
                        <button class="fav-remove-btn" onclick="removeFromFavourites(${id})" style="background:none;border:none;color:var(--gray);"><i class="bi bi-trash3"></i></button>
                    </div>
                </div>
            </div>`;
        }).join('');
    }

    function syncWishlistButtons() {
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const card = btn.closest('.product-card');
            const id = parseInt(card?.dataset.id);
            const isFav = favourites.includes(id);
            btn.classList.toggle('active', isFav);
            btn.innerHTML = isFav ? '<i class="bi bi-heart-fill"></i>' : '<i class="bi bi-heart"></i>';
        });
    }

    // --- CART STATE LOGIC (IndexedDB) ---
    let cartDB;
    const cartRequest = indexedDB.open('PBSSDCartDB', 1);
    cartRequest.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('cart_state')) db.createObjectStore('cart_state');
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
        const tx = cartDB.transaction(['cart_state'], 'readonly');
        const store = tx.objectStore('cart_state');
        const getReq = store.get('count');
        getReq.onsuccess = () => {
            const badge = getCartBadgeEl();
            if (badge) badge.innerText = getReq.result || 0;
        };
    }

    function checkAuth() {
        const user = JSON.parse(localStorage.getItem('pbssd_user'));
        const loginNav = document.getElementById('login-nav-btn');
        const profileNav = document.getElementById('user-profile-btn');
        const loginNavMobile = document.getElementById('login-nav-btn-mobile');
        const profileNavMobile = document.getElementById('user-profile-btn-mobile');
        const nameDesktop = document.getElementById('user-nav-name');
        const nameMobile = document.getElementById('user-nav-name-mobile');

        if (user) {
            loginNav?.classList.add('d-none');
            loginNavMobile?.classList.add('d-none');
            profileNav?.classList.remove('d-none');
            profileNavMobile?.classList.remove('d-none');
            if (nameDesktop) nameDesktop.innerText = user.name || 'Profile';
            if (nameMobile) nameMobile.innerText = user.name || 'Profile';
        } else {
            loginNav?.classList.remove('d-none');
            loginNavMobile?.classList.remove('d-none');
            profileNav?.classList.add('d-none');
            profileNavMobile?.classList.add('d-none');
        }
    }

    function handleAddToCart(name, price, img, productId) {
        if (!localStorage.getItem('pbssd_user')) {
            new bootstrap.Modal(document.getElementById('userLoginModal')).show();
            return;
        }
        let lsCart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
        const exLs = lsCart.find(i => i.id === productId);
        if (exLs) exLs.quantity = (exLs.quantity || 1) + 1;
        else lsCart.push({ id: productId, name, price, image: img, quantity: 1 });
        localStorage.setItem('pbssd_cart', JSON.stringify(lsCart));

        const count = lsCart.reduce((sum, item) => sum + item.quantity, 0);
        const badge = getCartBadgeEl();
        if (badge) badge.innerText = count;

        if (cartDB) {
            const tx = cartDB.transaction(['cart_state'], 'readwrite');
            tx.objectStore('cart_state').put(count, 'count');
        }
        
        Swal.fire({ title: 'Added to Bag!', text: `${name} is ready for checkout.`, toast: true, position: 'top-end', showConfirmButton: false, timer: 1500, icon: 'success', background: '#FAFAF7' });
    }

    // --- SLIDER LOGIC ---
    const track = document.getElementById('slidesTrack');
    const dotsContainer = document.getElementById('sliderDots');
    const totalSlides = track.children.length;
    let current = 0;
    let autoTimer;

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
        autoTimer = setInterval(() => goTo(current + 1), 5000);
    }

    document.getElementById('arrowPrev').addEventListener('click', () => goTo(current - 1));
    document.getElementById('arrowNext').addEventListener('click', () => goTo(current + 1));
    resetTimer();

    // --- MOBILE PRODUCTS DATA ---
    const mobileProducts = [
        { id: 1001, name: 'Galaxy S24 Ultra', brand: 'samsung', category: 'smartphones', price: '₹1,24,999', image: 'https://images.unsplash.com/photo-1690788056245-025bd89708a1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Ftc3VuZyUyMG1vYmlsZXxlbnwwfHwwfHx8MA%3D%3D', sub: '12GB RAM · 512GB Storage', badge: 'NEW' },
        { id: 1002, name: 'Galaxy Tab S9', brand: 'samsung', category: 'tablets', price: '₹72,999', image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=80&w=400https://images.unsplash.com/photo-1726839643381-901c3eabffb8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGlwaG9uZSUyMG1vYmlsZXxlbnwwfHwwfHx8MA%3D%3D', sub: 'AMOLED Display · S-Pen', badge: 'BEST' },
        { id: 1003, name: 'iPhone 15 Pro', brand: 'iphone', category: 'smartphones', price: '₹1,29,900', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba3f21?auto=format&fit=crop&q=80&w=400', sub: 'Titanium · A17 Pro', badge: 'HOT' },
        { id: 1004, name: 'iPad Air M2', brand: 'iphone', category: 'tablets', price: '₹54,900', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400', sub: 'M2 Chip · 11-inch', badge: 'POPULAR' },
        { id: 1005, name: 'Realme GT 5', brand: 'realme', category: 'smartphones', price: '₹34,999', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=400', sub: '240W Charging · SD 8 Gen 2', badge: 'FAST' },
        { id: 1006, name: 'Moto Edge 50 Pro', brand: 'motorola', category: 'smartphones', price: '₹31,999', image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&q=80&w=400', sub: 'Pantone Display', badge: 'NEW' },
        { id: 1007, name: 'Poco X6 Pro', brand: 'poco', category: 'smartphones', price: '₹26,999', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=400', sub: 'Dimensity 8300 Ultra', badge: 'GAMING' },
        { id: 1008, name: 'Nothing Phone (2)', brand: 'nothing', category: 'smartphones', price: '₹39,999', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=400', sub: 'Glyph Interface', badge: 'UNIQUE' },
        { id: 1009, name: 'Xiaomi 14', brand: 'mi', category: 'smartphones', price: '₹69,999', image: 'https://images.unsplash.com/photo-1656758211671-b0c364e4b508?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eGlhb21pJTIwbW9iaWxlfGVufDB8fDB8fHww', sub: 'Leica Optics', badge: 'PREMIUM' },
        { id: 1010, name: 'Tecno Phantom V Fold', brand: 'tecno', category: 'smartphones', price: '₹69,999', image: 'https://images.unsplash.com/photo-1656758211671-b0c364e4b508?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eGlhb21pJTIwbW9iaWxlfGVufDB8fDB8fHww', sub: 'Foldable Display', badge: 'INNOVATION' },
        { id: 1011, name: 'CMF Phone 1', brand: 'cmf', category: 'smartphones', price: '₹15,999', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=400', sub: 'Modular Design', badge: 'VALUE' },
        { id: 1012, name: 'Redmi Note 13 Pro+', brand: 'redmi', category: 'smartphones', price: '₹31,999', image: 'https://images.unsplash.com/photo-1546054454-aa26a3479857?auto=format&fit=crop&q=80&w=400https://images.unsplash.com/photo-1635434651542-bcd747240352?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVkbWklMjBtb2JpbGV8ZW58MHx8MHx8fDA%3D', sub: '200MP Camera', badge: 'POPULAR' },
        { id: 1013, name: 'Wireless Buds Pro', brand: 'accessories', category: 'accessories', price: '₹4,999', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&q=80&w=400', sub: 'Noise Cancelling', badge: 'BEST' },
        { id: 1014, name: 'Galaxy Watch 6', brand: 'samsung', category: 'wearables', price: '₹32,999', image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&q=80&w=400', sub: 'Health Tracking', badge: 'HOT' },
        { id: 1015, name: 'Galaxy Z Fold 5', brand: 'samsung', category: 'smartphones', price: '₹1,54,999', image: 'https://images.unsplash.com/photo-1610940882244-18ac607d8575?auto=format&fit=crop&q=80&w=400', sub: 'Foldable Excellence', badge: 'LUXURY' },
        { id: 1016, name: 'iPhone 15', brand: 'iphone', category: 'smartphones', price: '₹79,900', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba3f21?auto=format&fit=crop&q=80&w=400', sub: 'Dynamic Island · A16 Bionic', badge: 'TRENDING' },
        { id: 1017, name: 'Realme Narzo 70 Pro', brand: 'realme', category: 'smartphones', price: '₹19,999', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=400', sub: 'Horizon Glass Design', badge: 'VALUE' },
        { id: 1018, name: 'Moto Razr 50 Ultra', brand: 'motorola', category: 'smartphones', price: '₹89,999', image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&q=80&w=400', sub: 'Large External Display', badge: 'FOLDABLE' },
        { id: 1019, name: 'Poco F6', brand: 'poco', category: 'smartphones', price: '₹29,999', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=400', sub: 'Snapdragon 8s Gen 3', badge: 'PERFORMANCE' },
        { id: 1020, name: 'Nothing Phone (2a)', brand: 'nothing', category: 'smartphones', price: '₹23,999', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=400', sub: 'Fresh Eyes · Glyph Lite', badge: 'LATEST' },
        { id: 1021, name: 'Xiaomi 14 Ultra', brand: 'mi', category: 'smartphones', price: '₹99,999', image: 'https://images.unsplash.com/photo-1546054454-aa26a3479857?auto=format&fit=crop&q=80&w=400', sub: '1-inch Main Sensor', badge: 'CAMERA' },
        { id: 1022, name: 'Tecno Camon 30 Premier', brand: 'tecno', category: 'smartphones', price: '₹39,999', image: 'https://images.unsplash.com/photo-1604671871544-c523154333c7?auto=format&fit=crop&q=80&w=400', sub: 'PolarAce Imaging System', badge: 'NEW' },
        { id: 1023, name: 'CMF Buds', brand: 'accessories', category: 'accessories', price: '₹2,499', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&q=80&w=400', sub: 'ANC · Ultra Bass', badge: 'BEST BUY' },
        { id: 1024, name: 'Redmi 13C', brand: 'redmi', category: 'smartphones', price: '₹8,999', image: 'https://images.unsplash.com/photo-1546054454-aa26a3479857?auto=format&fit=crop&q=80&w=400', sub: 'Budget King', badge: 'BESTSELLER' }
    ];

    function renderProductCard(p) {
        const isFav = favourites.includes(p.id);
        return `
            <div class="product-card" data-id="${p.id}" onclick="window.location.href='mobile_productDetails.html?id=${p.id}'">
                <div class="product-img">
                    <img src="${p.image}" alt="${p.name}">
                    ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
                    <button class="wishlist-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavourite(${p.id}, this)">
                        <i class="bi bi-heart${isFav ? '-fill' : ''}"></i>
                    </button>
                </div>
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <div class="sub">${p.sub}</div>
                    <div class="product-footer d-flex justify-content-between align-items-center">
                        <span class="price">${p.price}</span>
                        <button class="add-btn" onclick="event.stopPropagation(); handleAddToCart('${p.name.replace(/'/g, "\\'")}', '${p.price}', '${p.image}', ${p.id})">+</button>
                    </div>
                </div>
            </div>`;
    }

    function renderProductSections(brand = 'all') {
        const secs = ['smartphones', 'tablets', 'wearables', 'accessories'];
        secs.forEach(sec => {
            const grid = document.querySelector(`#${sec}-section .product-grid`);
            const sectionWrapper = document.getElementById(`${sec}-section`);
            if (!grid) return;
            const filtered = mobileProducts.filter(p => p.category === sec && (brand === 'all' || p.brand === brand));
            grid.innerHTML = filtered.map(renderProductCard).join('');
            sectionWrapper.style.display = filtered.length > 0 ? 'block' : 'none';
        });
    }

    // --- CATEGORY PILLS ---
    document.querySelectorAll('.pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const brand = pill.getAttribute('data-brand');
            renderProductSections(brand);
        });
    });

    // --- INITIALIZATION ---
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        setTimeout(() => { if (preloader) { preloader.style.opacity = '0'; preloader.style.visibility = 'hidden'; } }, 1000);
        AOS.init({ duration: 900, once: true });
        checkAuth();
        renderProductSections();
        const iconBadge = document.getElementById('favIconBadge');
        if (iconBadge) {
            iconBadge.textContent = favourites.length;
            iconBadge.style.display = favourites.length === 0 ? 'none' : 'flex';
        }

        renderFavDrawer();
        syncWishlistButtons();

        const cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
        const badge = getCartBadgeEl();
        if (badge) badge.innerText = cart.reduce((s, i) => s + i.quantity, 0);

        const nav = document.querySelector('.navbar');
        const catBar = document.getElementById('categoryNavBar');
        if (nav && catBar) catBar.style.top = (nav.getBoundingClientRect().height + 4) + 'px';
        window.addEventListener('scroll', () => {
            if (nav && catBar) {
                const navH = nav.getBoundingClientRect().height;
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled'); catBar.classList.add('scrolled'); catBar.style.top = (navH - 10) + 'px';
                } else {
                    nav.classList.remove('scrolled'); catBar.classList.remove('scrolled'); catBar.style.top = (navH + 4) + 'px';
                }
            }
        });
    });

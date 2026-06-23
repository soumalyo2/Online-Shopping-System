
        const WN_TOTAL = 5, WN_DURATION = 4500;
        let wnCurrent = 0, wnTimer = null;
        const wnTrack = document.getElementById('wnTrack');
        const wnDotsEl = document.getElementById('wnDots');
        const wnBar = document.getElementById('wnProgressBar');
        const wnBox = document.getElementById('wnSlideshow');
        for (let i = 0; i < WN_TOTAL; i++) {
            const d = document.createElement('button');
            d.className = 'wn-dot' + (i === 0 ? ' active' : '');
            d.setAttribute('aria-label', 'Slide ' + (i + 1));
            d.addEventListener('click', () => wnGoTo(i));
            wnDotsEl.appendChild(d);
        }
        function wnUpdateDots() { wnDotsEl.querySelectorAll('.wn-dot').forEach((d, i) => d.classList.toggle('active', i === wnCurrent)); }
        function wnGoTo(idx) { wnCurrent = ((idx % WN_TOTAL) + WN_TOTAL) % WN_TOTAL; wnTrack.style.transform = `translateX(-${wnCurrent * 100}%)`; wnUpdateDots(); wnResetTimer(); }
        function wnRunProgress() { wnBar.style.transition = 'none'; wnBar.style.width = '0%'; void wnBar.offsetWidth; wnBar.style.transition = `width ${WN_DURATION}ms linear`; wnBar.style.width = '100%'; }
        function wnResetTimer() { clearInterval(wnTimer); wnRunProgress(); wnTimer = setInterval(() => wnGoTo(wnCurrent + 1), WN_DURATION); }
        wnBox.addEventListener('mouseenter', () => { clearInterval(wnTimer); const computed = getComputedStyle(wnBar).width; wnBar.style.transition = 'none'; wnBar.style.width = computed; });
        wnBox.addEventListener('mouseleave', () => wnResetTimer());
        let wnTouchX = 0;
        wnBox.addEventListener('touchstart', e => { wnTouchX = e.touches[0].clientX; }, { passive: true });
        wnBox.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - wnTouchX; if (Math.abs(dx) > 40) wnGoTo(wnCurrent + (dx < 0 ? 1 : -1)); }, { passive: true });
        wnResetTimer();


        // Keep tempIndex UI interactions
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

        // --- CORE LOGIC from index.html ---
        const PRODUCTS_PER_CAT = 7;

        // =====================================================================
        // 🔗 CATEGORY PAGE LINKS — Add your page paths below for each category
        // =====================================================================
        const CAT_PAGE_LINKS = {
            'Grocery': 'grocery.html',          // TODO: LINK → Grocery
            'Fashion': 'fashion.html',          // TODO: LINK → Fashion
            'Mobiles': '#',                                      // TODO: LINK → Mobiles
            'Beauty': ' beauty.html',           // TODO: LINK → Beauty
            'Electronics': '#',                                      // TODO: LINK → Electronics
            'Home': '#',                                      // TODO: LINK → Home
            'Appliances': '#',                                      // TODO: LINK → Appliances
            'Toys': '#',                                      // TODO: LINK → Toys
            'Food': '#',                                      // TODO: LINK → Food
            'Auto': '#',                                      // TODO: LINK → Auto
            '2 Wheelers': ' two_Wheelers.html',       // TODO: LINK → 2 Wheelers
            'Books': '#',                                      // TODO: LINK → Books
            'Furniture': '#',                                      // TODO: LINK → Furniture
            'Sports': '#',                                      // TODO: LINK → Sports
            'Medicines': '#',                                      // TODO: LINK → Medicines
        };
        // =====================================================================

        function renderProductCard(p) {
            const isFav = favourites.includes(p.id);
            return `
                <div class="pcard" onclick="window.location.href='product_detail.html?id=${p.id}'">
                    <div class="pcard-img-wrap">
                        <img src="${p.image}" class="pcard-img" alt="${p.name}" loading="lazy">
                        <button class="pcard-wish ${isFav ? 'active' : ''}" id="wish-${p.id}" onclick="event.stopPropagation(); toggleFavourite(${p.id}, this)" title="Add to favourites">
                            <i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i>
                        </button>
                    </div>
                    <div class="pcard-body">
                        <h6 class="pcard-name" title="${p.name}">${p.name}</h6>
                        <div class="pcard-stars mb-2">
                            ${'<i class="bi bi-star-fill"></i>'.repeat(p.rating)}
                            ${'<i class="bi bi-star" style="color:#e5e5e0;"></i>'.repeat(5 - p.rating)}
                        </div>
                        <div class="pcard-footer">
                            <div class="pcard-price">${p.price}</div>
                            <button class="pcard-add-btn" onclick="event.stopPropagation(); addToCart(${p.id})" title="Add to cart">
                                <i class="bi bi-plus-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderProducts() {
            const container = document.getElementById('product-sections');
            if (!container) return;
            container.innerHTML = categories.map(cat => {
                const catProducts = products.filter(p => p.section === cat);
                const sectionId = cat.replace(/\s+/g, '-');
                const visibleProducts = catProducts.slice(0, PRODUCTS_PER_CAT);
                const hasMore = catProducts.length > PRODUCTS_PER_CAT;
                const pageLink = CAT_PAGE_LINKS[cat] || '#';

                const viewAllCard = hasMore ? `
                    <div class="viewall-card" onclick="window.location.href='${pageLink}'">
                        <div class="viewall-card-inner">
                            <div class="viewall-icon"><i class="bi bi-grid-3x3-gap-fill"></i></div>
                            <div class="viewall-count">+${catProducts.length - PRODUCTS_PER_CAT} more</div>
                            <div class="viewall-label">View All</div>
                        </div>
                    </div>` : '';

                return `
                    <div class="cat-section" id="${sectionId}-section" data-aos="fade-up">
                        <div class="cat-section-head">
                            <div class="cat-section-left">
                                <div class="cat-icon-blob" style="background:#f0f0ed;color:var(--primary-nature);"><i class="bi bi-grid"></i></div>
                                <div class="cat-section-meta">
                                    <h3 class="cat-section-title">${cat}</h3>
                                    <span class="cat-section-count">${catProducts.length} products</span>
                                </div>
                            </div>
                            <div class="cat-section-line"></div>
                        </div>
                        <div class="cat-scroll-wrap">
                            <div class="cat-scroll" id="cat-scroll-${sectionId}">
                                ${visibleProducts.map(p => renderProductCard(p)).join('')}
                                ${viewAllCard}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function filterProducts(cat, el) {
            document.querySelectorAll('.cat-pill, .category-pill').forEach(p => p.classList.remove('active'));
            if (el) el.classList.add('active');
            if (cat === 'All') {
                const shop = document.getElementById('shop');
                if (shop) window.scrollTo({ top: shop.offsetTop - 130, behavior: 'smooth' });
                return;
            }
            const target = document.getElementById(`${cat.replace(/\s+/g, '-')}-section`);
            if (target) window.scrollTo({ top: target.offsetTop - 130, behavior: 'smooth' });
        }

        // --- AUTH LOGIC from index.html ---
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
                if (user.photo) {
                    const img = document.getElementById('user-nav-photo');
                    if (img) { img.src = user.photo; img.style.display = 'inline-block'; }
                }
            } else {
                loginNav?.classList.remove('d-none');
                loginNavMobile?.classList.remove('d-none');
                profileNav?.classList.add('d-none');
                profileNavMobile?.classList.add('d-none');
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            const input = document.getElementById('navSearchInput');
            const clear = document.getElementById('navSearchClear');
            input?.addEventListener('input', () => clear?.classList.toggle('visible', input.value.length > 0));
            checkAuth();
        });

        document.getElementById('modalLoginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('modalEmail')?.value;
            const pass = document.getElementById('modalPass')?.value;
            const request = indexedDB.open('PBSSDFreshAuthDB', 1);
            request.onsuccess = (event) => {
                const db = event.target.result;
                const tx = db.transaction(['users'], 'readonly');
                const store = tx.objectStore('users');
                const getReq = store.get(email);
                getReq.onsuccess = () => {
                    const user = getReq.result;
                    if (user && user.password === pass) {
                        localStorage.setItem('pbssd_user', JSON.stringify({ name: user.name, email: user.email, photo: user.photo }));
                        bootstrap.Modal.getInstance(document.getElementById('userLoginModal'))?.hide();
                        checkAuth();
                        Swal.fire({ icon: 'success', title: 'Welcome back!', timer: 1500, showConfirmButton: false });
                    } else {
                        Swal.fire({ icon: 'error', title: 'Invalid credentials' });
                    }
                };
            };
        });

        function handleLogout() {
            localStorage.removeItem('pbssd_user');
            window.location.reload();
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            if (!localStorage.getItem('pbssd_user')) {
                new bootstrap.Modal(document.getElementById('userLoginModal')).show();
                return;
            }
            let cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) existingItem.quantity += 1;
            else cart.push({ ...product, quantity: 1 });
            localStorage.setItem('pbssd_cart', JSON.stringify(cart));
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            const badge = getCartBadgeEl();
            if (badge) badge.innerText = count;
            if (cartDB) {
                const tx = cartDB.transaction(['cart_state'], 'readwrite');
                tx.objectStore('cart_state').put(count, 'count');
            }
            Swal.fire({
                title: 'Added!', toast: true, position: 'top-end',
                showConfirmButton: false, timer: 1500, icon: 'success',
                background: '#FAFAF7', color: '#1A1A1A'
            });
        }

        function quickView(id) {
            if (!localStorage.getItem('pbssd_user')) {
                new bootstrap.Modal(document.getElementById('userLoginModal')).show();
                return;
            }
            const p = products.find(x => x.id === id);
            if (!p) return;
            Swal.fire({
                title: p.name,
                text: p.description,
                imageUrl: p.image,
                imageWidth: 400,
                confirmButtonText: 'Great!',
                background: '#FAFAF7', color: '#1A1A1A'
            });
        }

        // Category nav fades
        const catScroll = document.getElementById('category-filters');
        const catWrap = document.getElementById('catOverflowWrap');
        function updateCatFades() {
            if (!catScroll || !catWrap) return;
            const { scrollLeft, scrollWidth, clientWidth } = catScroll;
            catWrap.classList.toggle('show-left', scrollLeft > 8);
            catWrap.classList.toggle('hide-right', scrollLeft + clientWidth >= scrollWidth - 8);
        }
        catScroll?.addEventListener('scroll', updateCatFades, { passive: true });
        window.addEventListener('resize', updateCatFades);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (searchOpen) toggleSearch(); if (mobileOpen) closeAll(); } });

        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.navbar');
            const catBar = document.getElementById('categoryNavBar');
            if (!nav || !catBar) return;
            const navH = nav.getBoundingClientRect().height;
            if (window.scrollY > 50) { nav.classList.add('scrolled'); catBar.classList.add('scrolled'); catBar.style.top = (navH - 10) + 'px'; }
            else { nav.classList.remove('scrolled'); catBar.classList.remove('scrolled'); catBar.style.top = (navH + 4) + 'px'; }
        });

        // Keep favourites feature from temp page
        let favourites = [];
        let favDrawerOpen = false;
        function toggleFavDrawer() {
            favDrawerOpen = !favDrawerOpen;
            document.getElementById('favDrawer')?.classList.toggle('open', favDrawerOpen);
            document.getElementById('favBackdrop')?.classList.toggle('open', favDrawerOpen);
        }
        function toggleFavourite(productId, btn) {
            const isFav = favourites.includes(productId);
            if (isFav) {
                // Remove from favourites
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
                renderFavDrawer();
                Swal.fire({ title: 'Removed from Favourites', toast: true, position: 'top-end', showConfirmButton: false, timer: 1200, icon: 'info', background: '#FAFAF7', color: '#1A1A1A' });
            } else {
                // Add to favourites
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
                renderFavDrawer();
                Swal.fire({ title: 'Saved to Favourites!', toast: true, position: 'top-end', showConfirmButton: false, timer: 1400, icon: 'success', background: '#FAFAF7', color: '#1A1A1A' });
            }
        }
        function addToFavourites(productId, btn) {
            if (favourites.includes(productId)) return;
            toggleFavourite(productId, btn);
        }
        function removeFromFavourites(productId) {
            favourites = favourites.filter(id => id !== productId);
            const iconBadge = document.getElementById('favIconBadge');
            if (iconBadge) {
                iconBadge.textContent = favourites.length;
                iconBadge.style.display = favourites.length === 0 ? 'none' : 'flex';
            }
            renderFavDrawer();
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
                const p = products.find(x => x.id === id);
                if (!p) return '';
                return `
                <div class="fav-item" id="fav-item-${id}">
                    <img src="${p.image}" class="fav-item-img" alt="${p.name}">
                    <div class="fav-item-info">
                        <div class="fav-item-name">${p.name}</div>
                        <div><span class="fav-item-price">${p.price}</span></div>
                        <div class="fav-item-actions">
                            <button class="fav-add-btn" onclick="addToCart(${id})"><i class="bi bi-bag-plus"></i> Add to Cart</button>
                            <button class="fav-remove-btn" onclick="removeFromFavourites(${id})" title="Remove"><i class="bi bi-trash3"></i></button>
                        </div>
                    </div>
                </div>`;
            }).join('');
        }

        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            setTimeout(() => { if (preloader) { preloader.style.opacity = '0'; preloader.style.visibility = 'hidden'; } }, 1000);
            AOS.init({ duration: 900, once: true, offset: 80, easing: 'ease-out-cubic' });
            renderProducts();
            checkAuth();
            const cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
            const badge = getCartBadgeEl();
            if (badge) badge.innerText = cart.reduce((s, i) => s + i.quantity, 0);
            setTimeout(updateCatFades, 50);
            const nav = document.querySelector('.navbar');
            const catBar = document.getElementById('categoryNavBar');
            if (nav && catBar) catBar.style.top = (nav.getBoundingClientRect().height + 4) + 'px';
        });
  
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

        // --- CART STATE ---
        let cartDB;
        const cartRequest = indexedDB.open('PBSSDCartDB', 2);
        cartRequest.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('cart_state')) db.createObjectStore('cart_state');
            if (!db.objectStoreNames.contains('cart_items')) {
                db.createObjectStore('cart_items', { keyPath: 'id', autoIncrement: true });
            }
        };
        cartRequest.onsuccess = (e) => { cartDB = e.target.result; refreshCartBadge(); };
        function refreshCartBadge() {
            if (!cartDB) return;
            const tx = cartDB.transaction(['cart_state'], 'readonly');
            const store = tx.objectStore('cart_state');
            const getReq = store.get('count');
            getReq.onsuccess = () => {
                const badge = document.getElementById('cart-badge');
                if (badge) badge.innerText = getReq.result || 0;
            };
        }

        function checkAuth() {
            const user = JSON.parse(localStorage.getItem('pbssd_user'));
            const loginNav = document.getElementById('login-nav-btn');
            const profileNav = document.getElementById('user-profile-btn');
            const nameDesktop = document.getElementById('user-nav-name');
            if (user) {
                loginNav?.classList.add('d-none');
                profileNav?.classList.remove('d-none');
                if (nameDesktop) nameDesktop.innerText = user.name || 'Profile';
            }
        }

        // Hero Slider Logic
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.hero-slide');
        function showSlide(index) {
            if (index >= slides.length) currentSlideIndex = 0;
            else if (index < 0) currentSlideIndex = slides.length - 1;
            else currentSlideIndex = index;
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlideIndex);
            });
            document.querySelectorAll('.slider-dots .dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlideIndex);
            });
        }
        function currentSlide(n) { showSlide(n); }
        setInterval(() => { currentSlideIndex++; showSlide(currentSlideIndex); }, 5000);

        // --- ADD TO CART LOGIC ---
        document.querySelectorAll('.add-cart-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                if (!localStorage.getItem('pbssd_user')) {
                    new bootstrap.Modal(document.getElementById('userLoginModal')).show();
                    return;
                }
                const card = this.closest('.product-card');
                const name = card.querySelector('h3').innerText;
                const price = card.querySelector('.price').innerText;
                const image = card.querySelector('.product-img').src;

                let cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
                const existingItem = cart.find(item => item.name === name);
                if (existingItem) existingItem.quantity += 1;
                else cart.push({ id: Date.now(), name, price, image, quantity: 1 });
                localStorage.setItem('pbssd_cart', JSON.stringify(cart));

                const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
                const badge = document.getElementById('cart-badge');
                if (badge) {
                    badge.innerText = totalQty;
                    if (cartDB) {
                        const tx = cartDB.transaction(['cart_state'], 'readwrite');
                        tx.objectStore('cart_state').put(totalQty, 'count');
                    }
                }

                this.innerHTML = '<i class="fas fa-check"></i>';
                this.classList.add('added');
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-plus"></i>';
                    this.classList.remove('added');
                }, 1500);

                Swal.fire({
                    title: 'Added to bag!',
                    text: `${name} is ready for checkout.`,
                    icon: 'success', toast: true, position: 'top-end',
                    showConfirmButton: false, timer: 1500, background: '#FAFAF7'
                });
            });
        });

        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            setTimeout(() => { if (preloader) { preloader.style.opacity = '0'; preloader.style.visibility = 'hidden'; } }, 1000);
            AOS.init({ duration: 900, once: true, offset: 80, easing: 'ease-out-cubic' });
            checkAuth();
            const nav = document.querySelector('.navbar');
            const catBar = document.getElementById('categoryNavBar');
            const updatePos = () => {
                if (!nav || !catBar) return;
                const navH = nav.getBoundingClientRect().height;
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled'); catBar.classList.add('scrolled'); catBar.style.top = (navH - 10) + 'px';
                } else {
                    nav.classList.remove('scrolled'); catBar.classList.remove('scrolled'); catBar.style.top = (navH + 4) + 'px';
                }
            };
            window.addEventListener('scroll', updatePos);
            updatePos();
        });
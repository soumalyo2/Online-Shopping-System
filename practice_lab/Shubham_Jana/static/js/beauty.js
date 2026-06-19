   /* ── UI Logic from style.css/index.html ── */
    let settingsOpen = false;
    function toggleSettings() {
      settingsOpen = !settingsOpen;
      const panel = document.getElementById('settingsPanel');
      const btn = document.getElementById('settingsBtn');
      if (panel) panel.classList.toggle('open', settingsOpen);
      if (btn) btn.classList.toggle('active', settingsOpen);
      document.getElementById('navBackdrop')?.classList.toggle('active', settingsOpen);
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
    const cartRequest = indexedDB.open('PBSSDCartDB', 1);
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

    /* ── Wishlist Logic ── */
    let wishlist = JSON.parse(localStorage.getItem('pbssd_wishlist') || '[]');

    function tw(el) {
      const pcard = el.closest('.pcard') || el.closest('.tcard');
      const dataEl = pcard.querySelector('[data-name]');
      
      if (dataEl) {
        const name = dataEl.dataset.name;
        const price = dataEl.dataset.price;
        const imgFilename = dataEl.dataset.img;
        const img = imgFilename.startsWith('../') ? imgFilename : `../assets/${imgFilename}`;
        
        const product = { name, price: `$${price}.00`, img };
        const index = wishlist.findIndex(item => item.name === name);
        
        if (index === -1) {
          wishlist.push(product);
          showT(`${name} added to wishlist`);
        } else {
          wishlist.splice(index, 1);
          showT(`${name} removed from wishlist`);
        }
        
        localStorage.setItem('pbssd_wishlist', JSON.stringify(wishlist));
        updateWishlistUI();
        syncWishlistButtons();
      }
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
          <div class="fav-grid" style="display: flex; flex-direction: column; gap: 12px;">
            ${wishlist.map((item, idx) => `
              <div class="fav-item" style="display: flex; align-items: center; gap: 14px; background: white; border: 0.5px solid var(--border); border-radius: 14px; padding: 12px;">
                <img src="${item.img}" style="width: 60px; height: 60px; border-radius: 10px; object-fit: cover;" alt="${item.name}">
                <div style="flex:1;">
                  <h6 style="font-weight:600;margin:0;font-size:0.85rem;">${item.name}</h6>
                  <p style="color:var(--pk500);font-weight:700;margin:4px 0 0;font-size:0.8rem;">${item.price}</p>
                </div>
                <button onclick="removeFromWishlist(${idx})" style="background:none;border:none;color:var(--ts);cursor:pointer;font-size:1.1rem;padding:5px;"><i class="bi bi-trash"></i></button>
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

    function toggleFavDrawer() {
      document.getElementById('favDrawer')?.classList.toggle('open');
      document.getElementById('favBackdrop')?.classList.toggle('open');
    }

    /* ── Beauty Specific Hero Slider ── */
    const htrack = document.getElementById('htrack');
    const hslides = document.querySelectorAll('.hslide');
    const hdots = document.querySelectorAll('.hdot');
    let hi = 0, hTimer;
    function goH(idx) {
      hslides[hi].classList.remove('act');
      hi = (idx + hslides.length) % hslides.length;
      hslides[hi].classList.add('act');
      htrack.style.transform = `translateX(-${hi * 100}%)`;
      hdots.forEach((d, i) => d.classList.toggle('active', i === hi));
    }
    function startH() { clearInterval(hTimer); hTimer = setInterval(() => goH(hi + 1), 5200) }
    hslides[0].classList.add('act');
    document.getElementById('hnext').addEventListener('click', () => { goH(hi + 1); startH() });
    document.getElementById('hprev').addEventListener('click', () => { goH(hi - 1); startH() });
    hdots.forEach(d => d.addEventListener('click', () => { goH(+d.dataset.i); startH() }));
    let htx = 0;
    htrack.addEventListener('touchstart', e => htx = e.touches[0].clientX, { passive: true });
    htrack.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - htx; if (Math.abs(dx) > 40) { goH(hi + (dx < 0 ? 1 : -1)); startH() } }, { passive: true });
    startH();

    function atc(btn, name, price) {
      // Update badge count in UI
      const badge = document.getElementById('cart-badge');
      if (badge) {
        let count = parseInt(badge.innerText) || 0;
        count++;
        badge.innerText = count;

        // Update IndexedDB for persistence across pages
        if (cartDB) {
          const tx = cartDB.transaction(['cart_state'], 'readwrite');
          tx.objectStore('cart_state').put(count, 'count');
        }
      }

      btn.classList.add('added', 'pop'); btn.innerHTML = '<i class="bi bi-check"></i>';
      showT(`${name} added!`);
      setTimeout(() => { btn.classList.remove('added', 'pop'); btn.innerHTML = '<i class="bi bi-plus"></i>' }, 2000);
    }

    /* ── Toast ── */
    let tt;
    function showT(msg) { clearTimeout(tt); document.getElementById('tmsg').textContent = msg; document.getElementById('toast').classList.add('show'); tt = setTimeout(() => document.getElementById('toast').classList.remove('show'), 2800) }

    function syncWishlistButtons() {
      document.querySelectorAll('.pwish').forEach(btn => {
        const pcard = btn.closest('.pcard') || btn.closest('.tcard');
        const dataEl = pcard.querySelector('[data-name]');
        if (dataEl) {
          const name = dataEl.dataset.name;
          const isWishlisted = wishlist.some(item => item.name === name);
          btn.classList.toggle('active', isWishlisted);
          btn.querySelector('i').className = isWishlisted ? 'bi bi-heart-fill' : 'bi bi-heart';
        }
      });
    }

    /* ── Product Carousel ── */
    const ctrack = document.getElementById('ctrack');
    const cslides = document.querySelectorAll('.cslide');
    const cdotsEl = document.getElementById('cdots');
    let cur = 0;
    function getV() { if (window.innerWidth <= 600) return 1; if (window.innerWidth <= 900) return 2; if (window.innerWidth <= 1100) return 4; return 5 }
    let vis = getV();

    function buildD() {
      cdotsEl.innerHTML = '';
      const tot = Math.ceil(cslides.length / vis);
      for (let i = 0; i < tot; i++) { const d = document.createElement('div'); d.className = 'cdot' + (i === cur ? ' active' : ''); d.addEventListener('click', () => goC(i)); cdotsEl.appendChild(d) }
    }
    function goC(idx) {
      const tot = Math.ceil(cslides.length / vis);
      cur = Math.max(0, Math.min(idx, tot - 1));
      const w = cslides[0].offsetWidth + 22.4;
      ctrack.style.transform = `translateX(-${cur * vis * w}px)`;
      document.querySelectorAll('.cdot').forEach((d, i) => d.classList.toggle('active', i === cur));
    }
    document.getElementById('cnext').addEventListener('click', () => goC(cur < Math.ceil(cslides.length / vis) - 1 ? cur + 1 : 0));
    document.getElementById('cprev').addEventListener('click', () => goC(cur > 0 ? cur - 1 : Math.ceil(cslides.length / vis) - 1));
    setInterval(() => goC(cur < Math.ceil(cslides.length / vis) - 1 ? cur + 1 : 0), 4200);
    window.addEventListener('resize', () => { vis = getV(); cur = 0; ctrack.style.transform = 'translateX(0)'; buildD() });
    buildD();

    /* ── Scroll Reveal ── */
    const revEls = document.querySelectorAll('.rev');
    const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target) } }) }, { threshold: .1 });
    revEls.forEach(el => io.observe(el));

    window.addEventListener('load', () => {
      const preloader = document.getElementById('preloader');
      setTimeout(() => { if (preloader) { preloader.style.opacity = '0'; preloader.style.visibility = 'hidden'; } }, 1000);
      AOS.init({ duration: 900, once: true, offset: 80, easing: 'ease-out-cubic' });
      checkAuth();
      
      updateWishlistUI();
      syncWishlistButtons();

      // --- REDIRECT TO DETAILS PAGE ON CARD CLICK ---
      document.querySelectorAll('.pcard, .tcard').forEach(card => {
        card.addEventListener('click', (e) => {
          // Don't redirect if clicking buttons
          if (e.target.closest('.pwish') || e.target.closest('.atc')) return;

          const dataEl = card.querySelector('[data-name]');
          if (!dataEl) return;

          const name = dataEl.dataset.name;
          const price = dataEl.dataset.price;
          const imgFilename = dataEl.dataset.img;
          const img = imgFilename.startsWith('../') ? imgFilename : `../assets/${imgFilename}`;
          const cat = dataEl.dataset.cat;
          const badge = card.querySelector('.badge, .tbadge')?.innerText || '';

          window.location.href = `beauty_productDetails.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&img=${encodeURIComponent(img)}&cat=${encodeURIComponent(cat)}&badge=${encodeURIComponent(badge)}`;
        });
      });

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

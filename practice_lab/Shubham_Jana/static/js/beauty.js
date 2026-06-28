// =============================================
// beauty.js — Dynamic rendering from beauty-products.json
// Theme: Beauty products marketplace
// =============================================

(function() {
  let heroSlides = [];
  let featuredProducts = [];
  let beautyCategories = [];
  let trendingProducts = [];

  let wishlist = JSON.parse(localStorage.getItem('pbssd_wishlist') || '[]');

  // Render Hero Slides from data
  function renderHeroSlides() {
    const htrack = document.getElementById('htrack');
    const hstrip = document.getElementById('hstrip');
    const hdots = document.getElementById('hdots');
    
    if (!htrack || !heroSlides) return;

    htrack.innerHTML = '';
    hstrip.innerHTML = '';
    hdots.innerHTML = '';

    heroSlides.forEach((slide, idx) => {
      // Create slide element
      const slideEl = document.createElement('div');
      slideEl.className = `hslide hs${idx + 1}`;
      slideEl.innerHTML = `
        <div class="hblob hb${idx + 1}a"></div>
        <div class="hblob hb${idx + 1}b"></div>
        <div class="hcw">
          <div class="htxt">
            <div class="htag"><i class="bi ${slide.icon}"></i> ${slide.category}</div>
            <h1 class="hh1">${slide.title}</h1>
            <p class="hsub">${slide.desc}</p>
            <div class="hctas">
              ${slide.ctas.map(cta => `<a href="${cta.href}" class="btn btn-pink"><i class="bi ${cta.icon}"></i> ${cta.text}</a>`).join('')}
            </div>
            <div class="hstats">
              ${slide.stats.map(stat => `
                <div>
                  <div class="hsn">${stat.number}<span>${stat.unit}</span></div>
                  <div class="hsl">${stat.label}</div>
                </div>
              `).join('')}
            </div>
          </div>
          ${slide.featured.map((featured, fidx) => `
            <div class="hvis">
              <div class="hring hr1"></div>
              <div class="hring hr2"></div>
              <div class="hframe hi${idx + 1}" ${fidx > 0 ? `style="border-radius:180px var(--rlg) var(--rlg) var(--rlg)"` : ''}>
                <div class="hillo"><img src="${featured.img}" alt="${featured.name}" class="himg"></div>
              </div>
              <div class="hchip hc${fidx === 0 ? 'a' : 'b'}">
                <div class="chlbl">${featured.label}</div>
                <div class="chval">${featured.name}</div>
                <div class="chst">${featured.rating}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      htrack.appendChild(slideEl);

      // Create strip indicator
      const stripEl = document.createElement('div');
      stripEl.className = `hsi${idx === 0 ? ' active' : ''}`;
      stripEl.dataset.i = idx;
      hstrip.appendChild(stripEl);

      // Create dot
      const dotEl = document.createElement('div');
      dotEl.className = `hdot${idx === 0 ? ' active' : ''}`;
      dotEl.dataset.i = idx;
      hdots.appendChild(dotEl);
    });
  }

  // Render Featured Products
  function renderFeaturedProducts() {
    const grid = document.getElementById('featured-products-grid');
    if (!grid || !featuredProducts) return;

    grid.innerHTML = featuredProducts.map((product, idx) => {
      const paClass = ['pa1', 'pa2', 'pa6', 'pa4', 'pa7', 'pa9', 'pa5', 'pa10', 'pa11', 'pa3', 'pa8', 'pa12'][idx] || 'pa1';
      const rdClass = ['rd1', 'rd2', 'rd3', 'rd4'][idx] || 'rd1';
      const colorClasses = [
        { tla: 'pcp', bra: 'pcg' },
        { tla: 'pcg', bra: 'pcp' },
        { tla: 'pcp', bra: 'pcu' },
        { tla: 'pcn', bra: 'pcg' },
        { tla: 'pcu', bra: 'pcp' },
        { tla: 'pcg', bra: 'pcp' },
        { tla: 'pcp', bra: 'pcg' },
        { tla: 'pcp', bra: 'pcu' },
        { tla: 'pcu', bra: 'pcn' },
        { tla: 'pcu', bra: 'pcp' },
        { tla: 'pcn', bra: 'pcg' },
        { tla: 'pcg', bra: 'pcu' }
      ][idx] || { tla: 'pcp', bra: 'pcg' };

      return `
        <div class="pcard rev ${rdClass}">
          <div class="pimgw" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}" data-cat="${product.category}">
            <div class="part ${paClass}">
              <div class="pcirc pctla ${colorClasses.tla}"></div>
              <img src="static/assets/${product.img}" alt="${product.name}" class="pimg">
              <div class="pcirc pcbra ${colorClasses.bra}"></div>
            </div>
            <div class="pbadges"><span class="badge ${product.badgeClass}">${product.badge}</span></div>
            <div class="pwish" onclick="event.stopPropagation(); tw(this)"><i class="bi bi-heart"></i></div>
          </div>
          <div class="pinfo">
            <div class="pcat">${product.category}</div>
            <div class="pname">${product.name}</div>
            <div class="prat"><span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span><span class="rc">(${product.reviews.toLocaleString()})</span></div>
            <div class="pfoot">
              <div class="pprice">
                <span class="pcur">$${product.price}.00</span>
                ${product.originalPrice ? `<span class="pold">$${product.originalPrice}.00</span>` : ''}
              </div>
              <button class="atc" onclick="atc(this,'${product.name}',${product.price})"><i class="bi bi-plus"></i></button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Categories
  function renderCategories() {
    const catgrid = document.getElementById('category-grid');
    if (!catgrid || !beautyCategories) return;

    catgrid.innerHTML = beautyCategories.map((cat, idx) => {
      const rdClass = ['rd1', 'rd2', 'rd3', 'rd4'][idx] || 'rd1';
      return `
        <div class="catcard rev ${rdClass}">
          <div class="catbg"><img src="${cat.img}" alt="${cat.name}"></div>
          <div class="catinfo">
            <div class="catname">${cat.name}</div>
            <div class="catcnt">${cat.count} Products</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Trending Products
  function renderTrendingProducts() {
    const ctrack = document.getElementById('ctrack');
    if (!ctrack || !trendingProducts) return;

    ctrack.innerHTML = trendingProducts.map((product, idx) => {
      const paClass = ['pa1', 'pa2', 'pa6', 'pa4', 'pa9', 'pa5', 'pa11', 'pa3', 'pa8', 'pa10'][idx] || 'pa1';
      return `
        <div class="cslide">
          <div class="tcard">
            <div class="timg ${paClass}" style="height:210px" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}" data-cat="${product.category}">
              <img src="static/assets/${product.img}" alt="${product.name}" class="pimg">
              <div class="tbadge"><i class="bi ${product.badgeIcon}"></i> ${product.badge}</div>
              <div class="pwish" onclick="event.stopPropagation(); tw(this)"><i class="bi bi-heart"></i></div>
            </div>
            <div class="tinf">
              <div class="tname">${product.name}</div>
              <div class="trat"><span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span><span style="color:var(--ts)">${product.rating} (${(product.reviews / 1000).toFixed(1)}k)</span></div>
              <div class="tfoot"><span class="tprice">$${product.price}.00</span></div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ── Wishlist Logic ── */
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

  function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    localStorage.setItem('pbssd_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    syncWishlistButtons();
  }

  function syncWishlistButtons() {
    document.querySelectorAll('.pwish').forEach(btn => {
      const pcard = btn.closest('.pcard') || btn.closest('.tcard');
      const dataEl = pcard.querySelector('[data-name]');
      if (dataEl) {
        const name = dataEl.dataset.name;
        const isWishlisted = wishlist.some(item => item.name === name);
        btn.classList.toggle('active', isWishlisted);
        const icon = btn.querySelector('i');
        if (icon) icon.className = isWishlisted ? 'bi bi-heart-fill' : 'bi bi-heart';
      }
    });
  }

  /* ── Add To Cart ── */
  function atc(btn, name, price) {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      let count = parseInt(badge.innerText) || 0;
      count++;
      badge.innerText = count;

      if (typeof cartDB !== 'undefined' && cartDB) {
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
  function showT(msg) { 
    clearTimeout(tt); 
    const toast = document.getElementById('toast');
    const tmsg = document.getElementById('tmsg');
    if (tmsg) tmsg.textContent = msg; 
    if (toast) toast.classList.add('show'); 
    tt = setTimeout(() => { if (toast) toast.classList.remove('show'); }, 2800);
  }

  /* ── Beauty Specific Hero Slider ── */
  function initHeroSlider() {
    const htrack = document.getElementById('htrack');
    const hslides = document.querySelectorAll('.hslide');
    const hdots = document.querySelectorAll('.hdot');
    let hi = 0, hTimer;
    
    function goH(idx) {
      if (hslides.length === 0) return;
      hslides[hi].classList.remove('act');
      hi = (idx + hslides.length) % hslides.length;
      hslides[hi].classList.add('act');
      if (htrack) htrack.style.transform = `translateX(-${hi * 100}%)`;
      hdots.forEach((d, i) => d.classList.toggle('active', i === hi));
    }
    
    function startH() { clearInterval(hTimer); hTimer = setInterval(() => goH(hi + 1), 5200) }
    
    if (hslides.length > 0) {
      hslides[0].classList.add('act');
      document.getElementById('hnext')?.addEventListener('click', () => { goH(hi + 1); startH() });
      document.getElementById('hprev')?.addEventListener('click', () => { goH(hi - 1); startH() });
      hdots.forEach(d => d.addEventListener('click', () => { goH(+d.dataset.i); startH() }));
      let htx = 0;
      if (htrack) {
        htrack.addEventListener('touchstart', e => htx = e.touches[0].clientX, { passive: true });
        htrack.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - htx; if (Math.abs(dx) > 40) { goH(hi + (dx < 0 ? 1 : -1)); startH() } }, { passive: true });
      }
      startH();
    }
  }

  /* ── Product Carousel ── */
  function buildTrendingCarousel() {
    const ctrack = document.getElementById('ctrack');
    const cslides = document.querySelectorAll('.cslide');
    const cdotsEl = document.getElementById('cdots');
    let cur = 0;
    
    if (!ctrack || cslides.length === 0 || !cdotsEl) return;

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
    
    document.getElementById('cnext')?.addEventListener('click', () => goC(cur < Math.ceil(cslides.length / vis) - 1 ? cur + 1 : 0));
    document.getElementById('cprev')?.addEventListener('click', () => goC(cur > 0 ? cur - 1 : Math.ceil(cslides.length / vis) - 1));
    setInterval(() => goC(cur < Math.ceil(cslides.length / vis) - 1 ? cur + 1 : 0), 4200);
    window.addEventListener('resize', () => { vis = getV(); cur = 0; ctrack.style.transform = 'translateX(0)'; buildD() });
    buildD();
  }

  /* ── Redirect to detail page on card click ── */
  function setupCardRedirects() {
    document.querySelectorAll('.pcard, .tcard').forEach(card => {
      card.addEventListener('click', (e) => {
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
  }

  /* ── Scroll Reveal ── */
  function setupScrollReveal() {
    const revEls = document.querySelectorAll('.rev');
    const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target) } }) }, { threshold: .1 });
    revEls.forEach(el => io.observe(el));
  }

  // Fetch data dynamically and render
  async function loadBeautyProducts() {
    const productsUrl = window.BEAUTY_PRODUCTS_URL || '/static/data/beauty-products.json';
    try {
      const response = await fetch(productsUrl);
      if (!response.ok) throw new Error(`Failed to load beauty products (${response.status})`);
      const data = await response.json();
      
      heroSlides = data.heroSlides || [];
      featuredProducts = data.featuredProducts || [];
      beautyCategories = data.categories || [];
      trendingProducts = data.trendingProducts || [];

      // Render sections
      renderHeroSlides();
      renderFeaturedProducts();
      renderCategories();
      renderTrendingProducts();

      // Setup interactions after rendering
      initHeroSlider();
      buildTrendingCarousel();
      setupCardRedirects();
      setupScrollReveal();
      
      updateWishlistUI();
      syncWishlistButtons();
    } catch (error) {
      console.error('Error loading beauty products:', error);
    }
  }

  // Load handler
  window.addEventListener('load', () => {
    loadBeautyProducts();
  });

  // Expose necessary functions globally for HTML inline handlers
  window.atc = atc;
  window.tw = tw;
  window.removeFromWishlist = removeFromWishlist;
})();

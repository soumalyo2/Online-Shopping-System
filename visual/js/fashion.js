let products = [];

async function loadProducts() {
  const productsUrl = window.FASHION_PRODUCTS_URL || '../data/fashion-products.json';
  try {
    const response = await fetch(productsUrl);
    if (!response.ok) throw new Error(`Failed to load products (${response.status})`);
    const data = await response.json();
    products = Array.isArray(data) ? data : (data.products || []);
    renderFashionProducts(activeFilter);
    updateCartUI();
    updateWishlistUI();
  } catch (error) {
    console.error('Failed to load fashion products:', error);
    const grid = document.getElementById('productsGrid');
    if (grid) {
      grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">Products could not be loaded. Please refresh the page.</div>';
    }
  }
}

// ── STATE ──────────────────────────────────────────────────── ────────────────────────────────────────────────────
let cart      = JSON.parse(localStorage.getItem('luxe_cart') || '[]');
let wishlist  = JSON.parse(localStorage.getItem('luxe_wishlist') || '[]');
let activeFilter = 'all';

// ── SAVE STATE ───────────────────────────────────────────────
function saveState() {
  localStorage.setItem('luxe_cart', JSON.stringify(cart));
  localStorage.setItem('luxe_wishlist', JSON.stringify(wishlist));
}

// ── 3D CARD MOUSE PARALLAX ──────────────────────────────────
const card3d = document.getElementById('hero3dCard');
document.addEventListener('mousemove', e => {
  if (!card3d) return;
  const xRatio = (e.clientX / window.innerWidth  - 0.5) * 2;
  const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
  card3d.style.animation = 'none';
  card3d.style.transform = `translateY(-50%) rotateY(${xRatio*12}deg) rotateX(${-yRatio*8}deg)`;
});

// ── REVEAL ON SCROLL ────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── STAR RENDERER ───────────────────────────────────────────
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) s += '★';
    else if (i === full && half) s += '½';
    else s += '☆';
  }
  return s;
}

// ── RENDER PRODUCTS ─────────────────────────────────────────
function renderFashionProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = filter === 'all'  ? products
    : filter === 'sale' ? products.filter(p => p.tag === 'sale')
    : filter === 'new'  ? products.filter(p => p.tag === 'new')
    : products.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((p, i) => {
    const isWishlisted = wishlist.some(w => w.id === p.id);
    const discount     = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

    return `
    <div class="product-card reveal" style="transition-delay:${i * 0.07}s" data-id="${p.id}">

      <div class="product-img-wrap" onclick="openDetails(${p.id})">
        <div class="product-img">
          <img
            src="${p.image}"
            alt="${p.name}"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80'"
          />
        </div>

        <div class="product-badges">
          ${p.badge ? `<span class="badge ${p.tag==='new'?'badge-new':p.tag==='sale'?'badge-sale':'badge-hot'}">${p.badge}</span>` : ''}
          ${discount >= 10 ? `<span class="badge badge-discount">-${discount}%</span>` : ''}
        </div>

        <div class="product-actions">
          <button class="action-btn wishlist-btn ${isWishlisted ? 'wishlisted' : ''}"
            onclick="event.stopPropagation(); toggleWishlist(${p.id})"
            title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}"
            id="wbtn-${p.id}">
            ${isWishlisted ? '❤️' : '🤍'}
          </button>
          <button class="action-btn" onclick="event.stopPropagation(); openDetails(${p.id})" title="Quick View">👁</button>
          <button class="action-btn" onclick="event.stopPropagation(); addToCart(${p.id})" title="Add to Cart">🛒</button>
        </div>
      </div>

      <div class="product-info">
        <div class="product-category">${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <div class="stars">${renderStars(p.rating)}</div>
          <span class="rating-count">${p.reviews ? `(${p.reviews})` : ''}</span>
        </div>

        <!-- Color dots -->
        ${p.colors ? `
        <div class="product-colors">
          ${p.colors.map(c => `<span class="color-dot" style="background:${c};" title="${c}"></span>`).join('')}
        </div>` : ''}

        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">₹${p.price.toLocaleString()}</span>
            ${p.oldPrice ? `<span class="price-old">₹${p.oldPrice.toLocaleString()}</span>` : ''}
          </div>
          <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${p.id})">
            <i class="bi bi-bag-plus"></i> Add
          </button>
        </div>
      </div>
    </div>`;
  }).join('');

  grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

renderFashionProducts();

function filterFashionProducts(btn, filter) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = filter;
  const grid = document.getElementById('productsGrid');
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(12px)';
  setTimeout(() => {
    renderFashionProducts(filter);
    grid.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    grid.style.opacity    = '1';
    grid.style.transform  = 'translateY(0)';
  }, 250);
}

function filterCategory(cat) {
  document.querySelectorAll('.filter-tab').forEach(t => {
    t.classList.toggle('active', t.textContent.trim().toLowerCase() === cat || (cat === 'all' && t.textContent.trim().toLowerCase() === 'all'));
  });
  document.getElementById('sale')?.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const tabToActivate = document.querySelector(`.filter-tab`);
    filterFashionProducts(tabToActivate, cat === 'all' ? 'all' : cat);
  }, 600);
}

// ── CART ────────────────────────────────────────────────────
function addToCart(id) {
  const product  = products.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(i => i.id === id);
  if (existing) { existing.qty++; }
  else { cart.push({ ...product, qty: 1 }); }
  saveState();
  updateCartUI();
  showToast(`🛒 ${product.name} added to bag!`, '#5A8A5A');
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveState();
  updateCartUI();
  showToast('Item removed from bag.', '#C4714A');
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveState();
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);

  // Badge (multiple places)
  document.querySelectorAll('#cart-badge, .cart-count-badge').forEach(el => {
    if (el) el.textContent = count;
  });

  const itemsEl = document.getElementById('cartItems');
  const footer  = document.getElementById('cartFooter');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-icon">🛍</span>
        <div class="cart-empty-text">Your bag is empty.<br>Start shopping!</div>
        <button onclick="closeCart()" style="margin-top:16px;padding:10px 24px;border-radius:50px;border:1.5px solid var(--charcoal);background:transparent;font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;">Continue Shopping</button>
      </div>`;
    if (footer) footer.style.display = 'none';
  } else {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const savings = cart.reduce((s, i) => s + ((i.oldPrice || i.price) - i.price) * i.qty, 0);

    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item" id="ci-${item.id}">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;"
            onerror="this.src='https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=200&q=80'" />
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.category.charAt(0).toUpperCase()+item.category.slice(1)} · Size M</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
            <button class="qty-btn remove-btn" onclick="removeFromCart(${item.id})" title="Remove" style="margin-left:8px;color:#C4714A;">🗑</button>
          </div>
        </div>
        <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString()}</div>
      </div>`).join('');

    document.getElementById('cartTotal').textContent = '₹' + total.toLocaleString();

    // Savings line
    const savingsEl = document.getElementById('cartSavings');
    if (savingsEl) {
      savingsEl.innerHTML = savings > 0
        ? `<div style="color:#5A8A5A;font-size:0.78rem;text-align:right;margin-bottom:8px;">You save ₹${savings.toLocaleString()} 🎉</div>`
        : '';
    }

    if (footer) footer.style.display = 'block';
  }
}

function openCart() {
  document.getElementById('cartOverlay')?.classList.add('open');
  document.getElementById('cartDrawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

// Cart button — support both old and new HTML
const cartBtn = document.getElementById('cartBtn') || document.querySelector('[title="Cart"]');
if (cartBtn) cartBtn.addEventListener('click', openCart);

// Nav bag icon (from original HTML uses onclick="window.location.href='cart.html'" — override it)
document.querySelectorAll('[title="Cart"]').forEach(btn => {
  btn.onclick = (e) => { e.preventDefault(); openCart(); };
});

function checkout() {
  if (cart.length === 0) { showToast('Your bag is empty!', '#C4714A'); return; }
  closeCart();
  showToast('🚀 Redirecting to checkout…', '#C9A96E');
  setTimeout(() => showToast('✅ Order placed successfully! Thank you!', '#5A8A5A'), 2000);
}

// ── WISHLIST ────────────────────────────────────────────────
function toggleWishlist(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const idx = wishlist.findIndex(w => w.id === id);
  const btn = document.getElementById(`wbtn-${id}`);

  if (idx > -1) {
    wishlist.splice(idx, 1);
    if (btn) { btn.textContent = '🤍'; btn.classList.remove('wishlisted'); }
    showToast(`💔 ${product.name} removed from wishlist`, '#C4714A');
  } else {
    wishlist.push({ ...product });
    if (btn) { btn.textContent = '❤️'; btn.classList.add('wishlisted'); }
    showToast(`❤️ ${product.name} saved to wishlist!`, '#e11d48');
  }

  saveState();
  updateWishlistUI();
}

function updateWishlistUI() {
  const count = wishlist.length;
  const badge = document.getElementById('favIconBadge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  const container = document.getElementById('favItemsContainer');
  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-icon">🤍</span>
        <div class="cart-empty-text">No favourites yet.<br>Tap ❤️ on any product!</div>
      </div>`;
  } else {
    container.innerHTML = wishlist.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;"
            onerror="this.src='https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=200&q=80'" />
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.category.charAt(0).toUpperCase()+item.category.slice(1)}</div>
          <div style="display:flex;gap:8px;margin-top:8px;">
            <button onclick="addToCart(${item.id})" style="padding:6px 14px;border-radius:50px;border:none;background:var(--charcoal);color:white;font-size:0.72rem;cursor:pointer;letter-spacing:0.05em;">
              🛒 Add to Bag
            </button>
            <button onclick="toggleWishlist(${item.id})" style="padding:6px 14px;border-radius:50px;border:1px solid #e11d48;background:transparent;color:#e11d48;font-size:0.72rem;cursor:pointer;">
              Remove
            </button>
          </div>
        </div>
        <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
      </div>`).join('');
  }
}

function toggleFavDrawer() {
  const drawer  = document.getElementById('favDrawer');
  const overlay = document.getElementById('favOverlay');
  if (!drawer) return;
  const isOpen = drawer.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
  if (isOpen) updateWishlistUI();
}

function closeFavDrawer() {
  document.getElementById('favDrawer')?.classList.remove('open');
  document.getElementById('favOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ── PRODUCT DETAIL MODAL ────────────────────────────────────
let currentDetailId = null;
let selectedSize    = null;
let selectedColor   = null;

function openDetails(id) {
  const p = products.find(pr => pr.id === id);
  if (!p) return;
  currentDetailId = id;
  selectedSize  = p.sizes ? p.sizes[1] || p.sizes[0] : 'M';
  selectedColor = p.colors ? p.colors[0] : null;

  // Basic info
  document.getElementById('pd-title').textContent  = p.name;
  document.getElementById('pd-cat').textContent    = p.category.charAt(0).toUpperCase() + p.category.slice(1) + "'s Collection";
  document.getElementById('pd-price').textContent  = '₹' + p.price.toLocaleString();
  document.getElementById('pd-old-price').textContent = p.oldPrice ? '₹' + p.oldPrice.toLocaleString() : '';
  document.getElementById('pd-main-img').src       = p.image;
  document.getElementById('pd-desc').textContent   = p.desc || `This ${p.name} is a must-have for your wardrobe. Crafted with premium materials and designed for both comfort and style.`;
  document.getElementById('pd-material').textContent = p.material || 'Premium Fabric';

  // Discount badge
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const badgeEl  = document.getElementById('pd-badge');
  if (badgeEl) {
    if (p.badge) {
      badgeEl.textContent = p.badge + (discount >= 10 ? ` · ${discount}% OFF` : '');
      badgeEl.style.display = 'block';
      badgeEl.className = 'pd-badge ' + (p.tag === 'new' ? 'badge-new' : p.tag === 'sale' ? 'badge-sale' : 'badge-hot');
    } else { badgeEl.style.display = 'none'; }
  }

  // Rating
  const ratingEl = document.getElementById('pd-rating');
  if (ratingEl) ratingEl.innerHTML = `<span class="stars">${renderStars(p.rating)}</span> <span>(${p.reviews || 0} reviews)</span>`;

  // Gallery thumbnails
  const thumbsEl = document.getElementById('pd-thumbs');
  const imgs     = p.images || [p.image];
  if (thumbsEl) {
    thumbsEl.innerHTML = imgs.map((src, i) =>
      `<div class="thumb-item ${i===0?'active':''}" onclick="switchPDImage('${src}', this)">
        <img src="${src}" alt="View ${i+1}" onerror="this.src='https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=200&q=80'">
       </div>`
    ).join('');
  }

  // Size selector
  const sizeSel = document.getElementById('pd-size-selector');
  if (sizeSel && p.sizes) {
    sizeSel.innerHTML = `
      <div class="pd-option-label">Size: <strong id="pd-selected-size">${selectedSize}</strong></div>
      <div class="size-btn-group">
        ${p.sizes.map(sz =>
          `<button class="size-btn ${sz===selectedSize?'active':''}" onclick="selectPDSize('${sz}', this)">${sz}</button>`
        ).join('')}
      </div>`;
  }

  // Color selector
  const colorSel = document.getElementById('pd-color-selector');
  if (colorSel && p.colors) {
    colorSel.innerHTML = `
      <div class="pd-option-label">Colour: <strong id="pd-selected-color">${selectedColor}</strong></div>
      <div class="color-btn-group">
        ${p.colors.map((c, i) =>
          `<button class="color-swatch ${i===0?'active':''}" style="background:${c};" onclick="selectPDColor('${c}', this)" title="${c}"></button>`
        ).join('')}
      </div>`;
  }

  // Wishlist button state in modal
  const pdWishBtn = document.getElementById('pd-wishlist-btn');
  if (pdWishBtn) {
    const isWished = wishlist.some(w => w.id === id);
    pdWishBtn.innerHTML = isWished ? '❤️ Wishlisted' : '🤍 Wishlist';
    pdWishBtn.classList.toggle('wishlisted', isWished);
  }

  // Add to cart button
  const addBtn = document.getElementById('pd-add-to-cart-btn');
  if (addBtn) addBtn.onclick = () => { addToCart(p.id); closeDetails(); };

  // Related products
  renderRelatedInPD(p.category, id);

  document.getElementById('productDetailOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDetails() {
  document.getElementById('productDetailOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
  currentDetailId = null;
}

function switchPDImage(src, el) {
  const mainImg = document.getElementById('pd-main-img');
  if (mainImg) {
    mainImg.style.opacity = '0';
    setTimeout(() => { mainImg.src = src; mainImg.style.opacity = '1'; }, 200);
  }
  document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function selectPDSize(sz, el) {
  selectedSize = sz;
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  const label = document.getElementById('pd-selected-size');
  if (label) label.textContent = sz;
}

function selectPDColor(c, el) {
  selectedColor = c;
  document.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  const label = document.getElementById('pd-selected-color');
  if (label) label.textContent = c;
}

function togglePDWishlist() {
  if (currentDetailId) {
    toggleWishlist(currentDetailId);
    const btn = document.getElementById('pd-wishlist-btn');
    if (btn) {
      const isWished = wishlist.some(w => w.id === currentDetailId);
      btn.innerHTML = isWished ? '❤️ Wishlisted' : '🤍 Wishlist';
      btn.classList.toggle('wishlisted', isWished);
    }
  }
}

function sharePDProduct() {
  const p = products.find(pr => pr.id === currentDetailId);
  if (!p) return;
  if (navigator.share) {
    navigator.share({ title: p.name, text: `Check out ${p.name} at ₹${p.price.toLocaleString()} on LUXE!`, url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast('🔗 Link copied to clipboard!', '#C9A96E');
  }
}

function renderRelatedInPD(category, excludeId) {
  const container = document.getElementById('pd-related-scroll');
  if (!container) return;
  const related = products.filter(p => p.category === category && p.id !== excludeId).slice(0, 5);
  container.innerHTML = related.map(p => `
    <div class="pd-related-item" onclick="openDetails(${p.id})">
      <div class="pr-img">
        <img src="${p.image}" alt="${p.name}"
          onerror="this.src='https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=200&q=80'" />
      </div>
      <div class="pr-info">
        <div class="pr-name">${p.name}</div>
        <div class="pr-price">₹${p.price.toLocaleString()}</div>
      </div>
    </div>`).join('');
}

// Close detail on overlay click
document.getElementById('productDetailOverlay')?.addEventListener('click', e => {
  if (e.target.id === 'productDetailOverlay') closeDetails();
});

// ── NAV SEARCH (inline) ──────────────────────────────────────
const navSearchInput = document.getElementById('navSearchInput');
const navSearchClear = document.getElementById('navSearchClear');

if (navSearchInput) {
  navSearchInput.addEventListener('input', e => {
    const val = e.target.value.trim().toLowerCase();
    if (navSearchClear) navSearchClear.style.display = val ? 'flex' : 'none';

    if (!val) { renderFashionProducts(activeFilter); return; }

    const grid = document.getElementById('productsGrid');
    const matched = products.filter(p =>
      p.name.toLowerCase().includes(val) ||
      p.category.toLowerCase().includes(val) ||
      (p.tag && p.tag.toLowerCase().includes(val))
    );

    // scroll to products
    document.getElementById('sale')?.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      if (!grid) return;
      grid.innerHTML = matched.length === 0
        ? `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">No results found for "<strong>${val}</strong>"</div>`
        : matched.map((p, i) => {
            const isWishlisted = wishlist.some(w => w.id === p.id);
            return `
            <div class="product-card reveal visible" style="transition-delay:${i*0.06}s" data-id="${p.id}">
              <div class="product-img-wrap" onclick="openDetails(${p.id})">
                <div class="product-img">
                  <img src="${p.image}" alt="${p.name}" loading="lazy"
                    onerror="this.src='https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80'" />
                </div>
                <div class="product-badges">
                  ${p.badge ? `<span class="badge ${p.tag==='new'?'badge-new':p.tag==='sale'?'badge-sale':'badge-hot'}">${p.badge}</span>` : ''}
                </div>
                <div class="product-actions">
                  <button class="action-btn wishlist-btn ${isWishlisted?'wishlisted':''}" onclick="event.stopPropagation();toggleWishlist(${p.id})" id="wbtn-${p.id}">${isWishlisted?'❤️':'🤍'}</button>
                  <button class="action-btn" onclick="event.stopPropagation();openDetails(${p.id})">👁</button>
                  <button class="action-btn" onclick="event.stopPropagation();addToCart(${p.id})">🛒</button>
                </div>
              </div>
              <div class="product-info">
                <div class="product-category">${p.category.charAt(0).toUpperCase()+p.category.slice(1)}</div>
                <div class="product-name">${p.name}</div>
                <div class="product-rating"><div class="stars">${renderStars(p.rating)}</div><span class="rating-count">(${p.reviews||0})</span></div>
                <div class="product-footer">
                  <div class="product-price">
                    <span class="price-current">₹${p.price.toLocaleString()}</span>
                    ${p.oldPrice?`<span class="price-old">₹${p.oldPrice.toLocaleString()}</span>`:''}
                  </div>
                  <button class="add-to-cart" onclick="event.stopPropagation();addToCart(${p.id})"><i class="bi bi-bag-plus"></i> Add</button>
                </div>
              </div>
            </div>`;
          }).join('');
    }, 200);
  });
}

function clearNavSearch() {
  if (navSearchInput) navSearchInput.value = '';
  if (navSearchClear) navSearchClear.style.display = 'none';
  renderFashionProducts(activeFilter);
}

// ── OVERLAY SEARCH (existing) ────────────────────────────────
function toggleSearch() {
  document.getElementById('searchOverlay')?.classList.toggle('open');
}
function closeSearch() {
  document.getElementById('searchOverlay')?.classList.remove('open');
}
function handleSearch(val) { /* handled via navSearch */ }
function quickSearch(term) {
  if (navSearchInput) {
    navSearchInput.value = term;
    navSearchInput.dispatchEvent(new Event('input'));
  }
  showToast(`🔍 Searching for "${term}"…`, '#5A8A5A');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeSearch(); closeCart(); closeDetails(); closeFavDrawer(); }
});

// ── TOAST ───────────────────────────────────────────────────
function showToast(msg, accent = '#5A8A5A') {
  const toast   = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.querySelector('.toast-icon');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  if (toastIcon) toastIcon.style.color = accent;
  toast.style.borderLeft = `3px solid ${accent}`;

  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── NEWSLETTER ──────────────────────────────────────────────
function subscribeNewsletter() {
  const input = document.getElementById('emailInput');
  if (!input) return;
  const email = input.value.trim();
  if (!email || !email.includes('@')) { showToast('⚠️ Please enter a valid email!', '#C4714A'); return; }
  input.value = '';
  showToast('🎉 Welcome to URBAN MART! Check your inbox.', '#5A8A5A');
}

// ── COUNTDOWN ───────────────────────────────────────────────
let endTime = Date.now() + (2 * 24 * 3600 + 14 * 3600 + 38 * 60 + 22) * 1000;
function updateCountdown() {
  const diff = Math.max(0, endTime - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000)  / 60000);
  const s = Math.floor((diff % 60000)    / 1000);
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = String(v).padStart(2,'0'); };
  set('cdDays', d); set('cdHours', h); set('cdMins', m); set('cdSecs', s);
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ── NAVBAR SCROLL ────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── INIT ─────────────────────────────────────────────────────
updateCartUI();
updateWishlistUI();
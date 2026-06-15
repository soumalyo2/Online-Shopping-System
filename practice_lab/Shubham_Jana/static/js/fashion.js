// ── DATA ────────────────────────────────────────────────────
const products = [
  // MEN
  { id: 1,  name: 'Oxford Button Shirt',  category: 'men',   tag: 'new',  price: 1299,  oldPrice: 1799,  rating: 4.8, reviews: 124, badge: 'New',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Oxford Cotton', colors: ['#FFFFFF','#87CEEB','#F5F5DC'], sizes: ['S','M','L','XL','XXL'],
    desc: 'A classic Oxford Button Shirt crafted from premium 100% cotton. Perfect for both casual and semi-formal occasions with a relaxed yet polished fit.'
  },
  { id: 5,  name: 'Chino Trousers',       category: 'men',   tag: 'sale', price: 1599,  oldPrice: 2199,  rating: 4.6, reviews: 91,  badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Stretch Cotton', colors: ['#C8A882','#2F4F4F','#1C1C1E'], sizes: ['28','30','32','34','36'],
    desc: 'Slim-fit Chino Trousers in premium stretch cotton. Versatile wardrobe staple that transitions seamlessly from office to weekend outings.'
  },
  { id: 9,  name: 'Leather Jacket',        category: 'men',   tag: 'hot',  price: 5999,  oldPrice: 7999,  rating: 4.9, reviews: 203, badge: 'Hot',
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac55?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1520975916090-3105956dac55?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Genuine Leather', colors: ['#1C1C1E','#4A3728','#8B4513'], sizes: ['S','M','L','XL'],
    desc: 'Premium genuine leather biker jacket with asymmetric zip closure. A bold statement piece with quilted shoulder panels and multiple pockets.'
  },
  { id: 10, name: 'Wool Overcoat',          category: 'men',   tag: 'new',  price: 8999,  oldPrice: 12999, rating: 4.8, reviews: 156, badge: 'New',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548778943-5bbeeb1ba6c1?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Wool Blend', colors: ['#708090','#2F4F4F','#8B7355'], sizes: ['S','M','L','XL','XXL'],
    desc: 'Elegant double-breasted Wool Overcoat with a full lining. Timeless silhouette designed to keep you warm and stylish through the colder months.'
  },
  { id: 11, name: 'Slim Fit Suit',          category: 'men',   tag: 'sale', price: 12999, oldPrice: 18999, rating: 4.9, reviews: 89,  badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1594938298603-a85c8b9e4e8d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594938298603-a85c8b9e4e8d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Italian Wool', colors: ['#1C1C1E','#36454F','#4A4A4A'], sizes: ['38','40','42','44','46'],
    desc: 'A sharp slim-fit two-piece suit tailored in Italian wool blend. Features a notch lapel jacket with a flat-front trouser for a refined silhouette.'
  },

  // WOMEN
  { id: 2,  name: 'Floral Wrap Dress',     category: 'women', tag: 'hot',  price: 1899,  oldPrice: 2499,  rating: 4.9, reviews: 87,  badge: 'Hot',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Chiffon', colors: ['#FFB6C1','#FF69B4','#FFF0F5'], sizes: ['XS','S','M','L','XL'],
    desc: 'A graceful floral wrap dress in lightweight chiffon. The self-tie waist creates a flattering silhouette perfect for brunch, beach, or evening outings.'
  },
  { id: 4,  name: 'Silk Blazer',           category: 'women', tag: 'new',  price: 4299,  oldPrice: 5999,  rating: 4.9, reviews: 203, badge: 'New',
    image: 'https://images.unsplash.com/photo-1590770426020-6a4ae9d31a1a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590770426020-6a4ae9d31a1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Silk Blend', colors: ['#FFFFF0','#F5F5DC','#1C1C1E'], sizes: ['XS','S','M','L'],
    desc: 'The Signature Silk Blazer redefines power dressing. Crafted from a premium silk blend with a structured silhouette and sleek single-button closure.'
  },
  { id: 6,  name: 'Embroidered Kurta',     category: 'women', tag: 'hot',  price: 2199,  oldPrice: 2999,  rating: 4.8, reviews: 167, badge: 'Hot',
    image: 'https://images.unsplash.com/photo-1583391733956-6c782764ecb5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c782764ecb5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Pure Cotton', colors: ['#FFE4B5','#DDA0DD','#98FB98'], sizes: ['XS','S','M','L','XL','XXL'],
    desc: 'Beautifully hand-embroidered kurta in pure cotton fabric. Intricate thread work around the neckline and hem adds an elegant ethnic charm.'
  },
  { id: 12, name: 'Velvet Midi Dress',     category: 'women', tag: 'new',  price: 3499,  oldPrice: 4999,  rating: 4.7, reviews: 134, badge: 'New',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Crushed Velvet', colors: ['#722F37','#191970','#2F4F4F'], sizes: ['XS','S','M','L','XL'],
    desc: 'A luxurious velvet midi dress with a figure-skimming fit. Ruched detailing, adjustable straps, and a side slit make it effortlessly glamorous.'
  },
  { id: 13, name: 'Cashmere Sweater',      category: 'women', tag: 'sale', price: 2999,  oldPrice: 4499,  rating: 4.9, reviews: 245, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Pure Cashmere', colors: ['#F5F5DC','#C8A882','#FFDAB9'], sizes: ['XS','S','M','L','XL'],
    desc: 'Indulge in the warmth of pure cashmere. This relaxed-fit crew-neck sweater is unbelievably soft, breathable, and a wardrobe essential for cooler days.'
  },
  { id: 14, name: 'Leather Handbag',       category: 'women', tag: null,   price: 5499,  oldPrice: 7499,  rating: 4.8, reviews: 98,  badge: null,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Full-Grain Leather', colors: ['#8B4513','#1C1C1E','#C8A882'], sizes: ['One Size'],
    desc: 'A structured tote crafted in full-grain leather with a gold-tone hardware finish. Spacious interior with suede lining and magnetic snap closure.'
  },

  // KIDS
  { id: 3,  name: 'Denim Joggers',         category: 'kids',  tag: 'sale', price: 799,   oldPrice: 1199,  rating: 4.7, reviews: 56,  badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1519457431-7571897d41ef?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519457431-7571897d41ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Stretch Denim', colors: ['#708090','#1C1C1E','#4169E1'], sizes: ['2Y','3Y','4Y','5Y','6Y','7Y'],
    desc: 'Comfy and cool denim joggers designed for active kids. Elasticated waist with drawstring and ribbed cuffs for easy movement and all-day comfort.'
  },
  { id: 7,  name: 'Graphic Tee Set',       category: 'kids',  tag: 'new',  price: 599,   oldPrice: 899,   rating: 4.5, reviews: 44,  badge: 'New',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533827432537-70133748f5c8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Pure Cotton', colors: ['#FFFFFF','#FFD700','#FF6347'], sizes: ['2Y','3Y','4Y','5Y','6Y','7Y','8Y'],
    desc: 'Fun and vibrant graphic tee set featuring playful prints. Made from 100% soft cotton — gentle on skin, easy to wash and perfect for everyday wear.'
  },
  { id: 15, name: 'Cotton Dress',          category: 'kids',  tag: 'hot',  price: 1299,  oldPrice: 1799,  rating: 4.8, reviews: 78,  badge: 'Hot',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Organic Cotton', colors: ['#FFB6C1','#FFFACD','#E6E6FA'], sizes: ['2Y','3Y','4Y','5Y','6Y'],
    desc: 'A pretty A-line cotton dress with smocked detailing. Lightweight, breathable fabric keeps little ones comfortable all day. Perfect for playdates and parties.'
  },
  { id: 16, name: 'Kids Blazer',           category: 'kids',  tag: 'new',  price: 2199,  oldPrice: 2999,  rating: 4.6, reviews: 67,  badge: 'New',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519457431-7571897d41ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Poly-Wool Blend', colors: ['#1C1C1E','#36454F','#8B0000'], sizes: ['2Y','3Y','4Y','5Y','6Y','7Y','8Y'],
    desc: 'A smart mini-me blazer tailored in soft poly-wool blend. Single-button closure with notch lapels — perfect for school events, weddings or festive occasions.'
  },
  { id: 17, name: 'Sneakers Set',          category: 'kids',  tag: 'sale', price: 999,   oldPrice: 1499,  rating: 4.7, reviews: 112, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Canvas + Rubber', colors: ['#FFFFFF','#FF6347','#4169E1'], sizes: ['UK 1','UK 2','UK 3','UK 4','UK 5'],
    desc: 'Trendy velcro-strap sneakers bundled with a matching no-show sock set. Lightweight sole with cushioned insoles for all-day comfort and support.'
  }
];

// ── STATE ────────────────────────────────────────────────────
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
function renderProducts(filter = 'all') {
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

renderProducts();

function filterProducts(btn, filter) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = filter;
  const grid = document.getElementById('productsGrid');
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(12px)';
  setTimeout(() => {
    renderProducts(filter);
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
    filterProducts(tabToActivate, cat === 'all' ? 'all' : cat);
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

    if (!val) { renderProducts(activeFilter); return; }

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
  renderProducts(activeFilter);
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
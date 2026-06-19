// =============================================
// Homesmart_AllProducts.js — All Products Page
// Uses shared allProducts from Homesmart_Data.js
// =============================================

// --- Liked products state ---
let likedProducts = JSON.parse(localStorage.getItem('hs_liked') || '[]');

function isLiked(productName) {
    return likedProducts.includes(productName);
}

function toggleLike(productName, btn) {
    const idx = likedProducts.indexOf(productName);
    if (idx > -1) {
        likedProducts.splice(idx, 1);
        btn.classList.remove('liked');
        btn.innerHTML = '<i class="far fa-heart"></i>';
    } else {
        likedProducts.push(productName);
        btn.classList.add('liked');
        btn.innerHTML = '<i class="fas fa-heart"></i>';
    }
    localStorage.setItem('hs_liked', JSON.stringify(likedProducts));
}

function renderStars(rating) {
    let html = '';
    const full = Math.floor(rating);
    const hasHalf = rating - full >= 0.3;
    const empty = 5 - full - (hasHalf ? 1 : 0);
    for (let i = 0; i < full; i++) html += '<i class="fas fa-star"></i>';
    if (hasHalf) html += '<i class="fas fa-star-half-alt"></i>';
    for (let i = 0; i < empty; i++) html += '<i class="far fa-star empty"></i>';
    return html;
}

function formatPrice(p) {
    return '$' + p.toLocaleString('en-US', { minimumFractionDigits: p % 1 !== 0 ? 2 : 0 });
}

function renderAllProducts(products) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';

    products.forEach((p, idx) => {
        const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
        const liked = isLiked(p.name);
        const card = document.createElement('div');
        card.className = 'all-product-card';

        card.innerHTML = `
            <div class="apc-image-wrap">
                <img src="${p.img}" alt="${p.name}" loading="lazy">
                <span class="apc-badge ${p.badgeClass}">${p.badge}</span>
                <button class="apc-like-btn ${liked ? 'liked' : ''}" onclick="event.stopPropagation(); toggleLike('${p.name.replace(/'/g, "\\'")}', this)">
                    <i class="${liked ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="apc-info">
                <div class="apc-category">${p.category}</div>
                <div class="apc-name">${p.name}</div>
                <div class="apc-desc">${p.desc}</div>
                <div class="apc-rating">
                    <div class="apc-stars">${renderStars(p.rating)}</div>
                    <span class="apc-rating-text">${p.rating} (${p.reviews.toLocaleString()})</span>
                </div>
                <div class="apc-price-row">
                    <div>
                        <span class="apc-price">${formatPrice(p.price)}</span>
                        ${p.originalPrice ? `<span class="apc-original-price">${formatPrice(p.originalPrice)}</span>` : ''}
                    </div>
                    ${discount > 0 ? `<span class="apc-discount">${discount}% OFF</span>` : ''}
                </div>
                <div class="apc-actions">
                    <button class="apc-btn-cart" onclick="event.stopPropagation();"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                    <button class="apc-btn-buy" onclick="event.stopPropagation(); window.location.href='ProductDetails.html?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(formatPrice(p.price))}&img=${encodeURIComponent(p.img)}&cat=${encodeURIComponent(p.category)}&rating=${p.rating}&reviews=${p.reviews}${p.originalPrice ? '&originalPrice=' + encodeURIComponent(formatPrice(p.originalPrice)) : ''}&desc=${encodeURIComponent(p.desc)}&badge=${encodeURIComponent(p.badge)}'"><i class="fas fa-bolt"></i> Buy Now</button>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            window.location.href = `ProductDetails.html?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(formatPrice(p.price))}&img=${encodeURIComponent(p.img)}&cat=${encodeURIComponent(p.category)}&rating=${p.rating}&reviews=${p.reviews}${p.originalPrice ? '&originalPrice=' + encodeURIComponent(formatPrice(p.originalPrice)) : ''}&desc=${encodeURIComponent(p.desc)}&badge=${encodeURIComponent(p.badge)}`;
        });
        grid.appendChild(card);
    });

    const countEl = document.getElementById('results-count');
    if (countEl) countEl.textContent = products.length;
}

let activeFilter = 'all';

function filterProducts(category) {
    activeFilter = category;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === category);
    });
    if (category === 'all') {
        renderAllProducts(allProducts);
    } else {
        renderAllProducts(allProducts.filter(p => p.category.toLowerCase().includes(category.toLowerCase())));
    }
}

function sortProducts(criteria) {
    let sorted = [...allProducts];
    if (activeFilter !== 'all') {
        sorted = sorted.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));
    }
    switch (criteria) {
        case 'price-low': sorted.sort((a, b) => a.price - b.price); break;
        case 'price-high': sorted.sort((a, b) => b.price - a.price); break;
        case 'rating': sorted.sort((a, b) => b.rating - a.rating); break;
        case 'reviews': sorted.sort((a, b) => b.reviews - a.reviews); break;
    }
    renderAllProducts(sorted);
}

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

document.addEventListener('DOMContentLoaded', () => {
    initBackToTop();
    initCustomDropdown();
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterProducts(btn.dataset.filter));
    });

    // Check for filter in URL
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get('filter');
    if (filterParam) {
        filterProducts(filterParam);
    } else {
        renderAllProducts(allProducts);
    }
});

// --- Custom Dropdown Logic ---
function initCustomDropdown() {
    const dropdown = document.getElementById('sort-dropdown');
    const trigger = document.getElementById('dropdown-trigger');
    const menu = document.getElementById('dropdown-menu');
    const label = document.getElementById('dropdown-label');
    const backdrop = document.getElementById('dropdown-backdrop');
    const items = menu ? menu.querySelectorAll('.dropdown-item') : [];

    if (!dropdown || !trigger || !menu) return;

    function openDropdown() {
        dropdown.classList.add('open');
        if (backdrop) backdrop.classList.add('visible');
    }

    function closeDropdown() {
        dropdown.classList.remove('open');
        if (backdrop) backdrop.classList.remove('visible');
    }

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.contains('open') ? closeDropdown() : openDropdown();
    });

    if (backdrop) {
        backdrop.addEventListener('click', closeDropdown);
    }

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) closeDropdown();
    });

    // Keyboard: Escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDropdown();
    });

    items.forEach(item => {
        item.addEventListener('click', () => {
            const value = item.dataset.value;
            const text = item.querySelector('span').textContent;
            
            // Update label
            label.textContent = 'Sort: ' + text;

            // Update active state
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Close dropdown
            closeDropdown();

            // Trigger sort
            sortProducts(value);
        });
    });
}


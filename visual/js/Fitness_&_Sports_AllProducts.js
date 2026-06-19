// =============================================
// Fitness_&_Sports_AllProducts.js — All Products Page
// Aggregates products from every section/category
// (Product data is sourced from Fitness_&_Sports_Data.js)
// =============================================


// --- Liked products state (stored in localStorage) ---
let likedProducts = JSON.parse(localStorage.getItem('fs_liked') || '[]');

function isLiked(pId) {
    return likedProducts.includes(pId);
}

function toggleLike(pId, btn) {
    const idx = likedProducts.indexOf(pId);
    if (idx > -1) {
        likedProducts.splice(idx, 1);
        btn.classList.remove('liked');
        btn.innerHTML = '<i class="far fa-heart"></i>';
    } else {
        likedProducts.push(pId);
        btn.classList.add('liked');
        btn.innerHTML = '<i class="fas fa-heart"></i>';
    }
    localStorage.setItem('fs_liked', JSON.stringify(likedProducts));
}

function isInCart(pId) {
    const cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
    return cart.some(item => item.id === pId);
}

function addToCart(pId, pName, pPrice, pImg, btn) {
    const numericPrice = typeof pPrice === 'number' ? pPrice : parseFloat(pPrice.toString().replace(/[^0-9.]/g, '')) || 0;
    let cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');

    const existingIndex = cart.findIndex(item => item.id === pId);
    if (existingIndex > -1) {
        cart.splice(existingIndex, 1);
        localStorage.setItem('pbssd_cart', JSON.stringify(cart));
        if (btn) btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
    } else {
        cart.push({ id: pId, name: pName, price: numericPrice, image: pImg, quantity: 1 });
        localStorage.setItem('pbssd_cart', JSON.stringify(cart));
        if (btn) btn.innerHTML = '<i class="fas fa-check"></i> Added';
    }
}

function buyNow(pId, pName, pPrice, pImg) {
    const numericPrice = typeof pPrice === 'number' ? pPrice : parseFloat(pPrice.toString().replace(/[^0-9.]/g, '')) || 0;
    sessionStorage.setItem('um_cart', JSON.stringify([{ id: pId, name: pName, price: numericPrice, image: pImg, quantity: 1 }]));
    window.location.href = '../../templates/payment_gateway.html';
}

// --- Generate Star HTML ---
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

// --- Format Price ---
function formatPrice(p) {
    return '$' + p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// --- Render All Product Cards ---
function renderAllProducts(products) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = '';

    products.forEach((p, idx) => {
        const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
        const liked = isLiked(p.id);
        const inCart = isInCart(p.id);

        const card = document.createElement('div');
        card.className = 'all-product-card';
        card.dataset.index = idx;

        card.innerHTML = `
            <div class="apc-image-wrap">
                <img src="${p.img}" alt="${p.name}" loading="lazy">
                ${p.badge ? `<span class="apc-badge ${p.badgeClass}">${p.badge}</span>` : ''}
                <button class="apc-like-btn ${liked ? 'liked' : ''}" onclick="event.stopPropagation(); toggleLike('${p.id}', this)">
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
                    <button class="apc-btn-cart" onclick="event.stopPropagation(); addToCart('${p.id}', '${p.name.replace(/'/g, "\\'")}', ${p.price}, '${p.img}', this)">
                        <i class="fas ${inCart ? 'fa-check' : 'fa-shopping-cart'}"></i> ${inCart ? 'Added' : 'Add to Cart'}
                    </button>
                    <button class="apc-btn-buy" onclick="event.stopPropagation(); buyNow('${p.id}', '${p.name.replace(/'/g, "\\'")}', ${p.price}, '${p.img}')">
                        <i class="fas fa-bolt"></i> Buy Now
                    </button>
                </div>
            </div>
        `;

        // Click card → go to product details
        card.addEventListener('click', () => {
            window.location.href = `Fitness_&_Sports_ProductDetails.html?id=${p.id}&name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(formatPrice(p.price))}&img=${encodeURIComponent(p.img)}&cat=${encodeURIComponent(p.category)}&rating=${p.rating}&reviews=${p.reviews}${p.originalPrice ? '&originalPrice=' + encodeURIComponent(formatPrice(p.originalPrice)) : ''}&desc=${encodeURIComponent(p.desc)}&badge=${encodeURIComponent(p.badge)}`;
        });

        grid.appendChild(card);
    });

    // Update results count
    const countEl = document.getElementById('results-count');
    if (countEl) countEl.textContent = products.length;
}

// --- Filter Logic ---
let activeFilter = 'all';

function filterProducts(category) {
    activeFilter = category;

    // Update active button styling
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === category);
    });

    if (category === 'all') {
        renderAllProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.categoryKey.toLowerCase() === category.toLowerCase() || p.category.toLowerCase().includes(category.toLowerCase()));
        renderAllProducts(filtered);
    }
}

// --- Sort Logic ---
function sortProducts(criteria) {
    let sorted = [...allProducts];
    if (activeFilter !== 'all') {
        sorted = sorted.filter(p => p.categoryKey.toLowerCase() === activeFilter.toLowerCase() || p.category.toLowerCase().includes(activeFilter.toLowerCase()));
    }

    switch (criteria) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'reviews':
            sorted.sort((a, b) => b.reviews - a.reviews);
            break;
        default: // 'featured' — original order
            break;
    }

    renderAllProducts(sorted);
}

// --- Back to Top Button ---
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    initBackToTop();
    initCustomDropdown();

    // Bind Filter buttons
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
            if (label) label.textContent = 'Sort: ' + text;

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

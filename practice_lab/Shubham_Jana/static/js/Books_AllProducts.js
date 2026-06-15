// =============================================
// Books_AllProducts.js — All Products Page
// Full book database with filtering, sorting, likes
// =============================================

// --- Full Book Database ---
// Loaded from Books_Data.js


// --- Liked products state (stored in localStorage) ---
let likedProducts = JSON.parse(localStorage.getItem('books_liked') || '[]');

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
    localStorage.setItem('books_liked', JSON.stringify(likedProducts));
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
    return '₹' + p.toLocaleString('en-IN');
}

function buyNow(pName, pPrice, pImg) {
    const numericPrice = parseInt(String(pPrice).replace(/[^0-9]/g, ''));
    const product = {
        name: pName,
        price: numericPrice,
        image: pImg
    };
    sessionStorage.setItem('um_cart', JSON.stringify([product]));
    window.location.href = '../../templates/payment_gateway.html';
}

function isInCart(pName) {
    let cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
    return cart.some(item => item.name === pName);
}

function addToCart(pName, pPrice, pImg, btn) {
    const numericPrice = parseInt(String(pPrice).replace(/[^0-9]/g, ''));
    let cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
    
    const existingIndex = cart.findIndex(item => item.name === pName);

    if (existingIndex > -1) {
        // Remove
        cart.splice(existingIndex, 1);
        localStorage.setItem('pbssd_cart', JSON.stringify(cart));
    } else {
        // Add
        cart.push({
            name: pName,
            price: numericPrice,
            image: pImg,
            quantity: 1
        });
        localStorage.setItem('pbssd_cart', JSON.stringify(cart));
    }

    if (btn) {
        const inCart = isInCart(pName);
        btn.classList.toggle('added', inCart);
        btn.innerHTML = inCart ? `<i class="fas fa-check"></i> Added` : `<i class="fas fa-shopping-cart"></i> Add`;
    }

    if (window.updateCartBadge) window.updateCartBadge();
    
    // Simple toast notification
    const toast = document.createElement('div');
    const isNowAdded = isInCart(pName);
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${isNowAdded ? '#2d5a27' : '#e11d48'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    toast.innerHTML = `<i class="fas ${isNowAdded ? 'fa-check-circle' : 'fa-info-circle'}"></i> ${pName} ${isNowAdded ? 'added to' : 'removed from'} cart!`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add animations for toast if not already present
if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.innerHTML = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// --- Render All Product Cards ---
function renderAllProducts(products) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = '';

    products.forEach((p, idx) => {
        const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
        const liked = isLiked(p.name);

        const card = document.createElement('div');
        card.className = 'all-product-card';
        card.dataset.index = idx;

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
                <div class="apc-author">by ${p.author}</div>
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
                    <button class="apc-btn-cart ${isInCart(p.name) ? 'added' : ''}" onclick="event.stopPropagation(); addToCart('${p.name.replace(/'/g, "\\'")}', '${formatPrice(p.price)}', '${p.img}', this)">
                        <i class="fas ${isInCart(p.name) ? 'fa-check' : 'fa-shopping-cart'}"></i> ${isInCart(p.name) ? 'Added' : 'Add'}
                    </button>
                    <button class="apc-btn-buy" onclick="event.stopPropagation(); buyNow('${p.name.replace(/'/g, "\\'")}', '${formatPrice(p.price)}', '${p.img}')">
                        <i class="fas fa-bolt"></i> Buy
                    </button>
                </div>
            </div>
        `;

        // Click card → go to product details
        card.addEventListener('click', () => {
            window.location.href = `Books_ProductDetails.html?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(formatPrice(p.price))}&img=${encodeURIComponent(p.img)}&cat=${encodeURIComponent(p.category)}&rating=${p.rating}&reviews=${p.reviews}${p.originalPrice ? '&originalPrice=' + encodeURIComponent(formatPrice(p.originalPrice)) : ''}&desc=${encodeURIComponent(p.desc)}&badge=${encodeURIComponent(p.badge)}&author=${encodeURIComponent(p.author)}`;
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
    } else if (category === 'liked') {
        const liked = allProducts.filter(p => isLiked(p.name));
        renderAllProducts(liked);
    } else {
        const filtered = allProducts.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
        renderAllProducts(filtered);
    }
}

// --- Sort Logic ---
function sortProducts(criteria) {
    let sorted = [...allProducts];
    if (activeFilter !== 'all') {
        if (activeFilter === 'liked') {
            sorted = sorted.filter(p => isLiked(p.name));
        } else {
            sorted = sorted.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));
        }
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
    // Check for category filter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');

    if (catParam) {
        // Try to find a filter button that matches the category
        // The data-filter values are often lowercase versions of the category
        filterProducts(catParam.toLowerCase());
    } else {
        renderAllProducts(allProducts);
    }

    initBackToTop();
    initCustomDropdown();

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterProducts(btn.dataset.filter));
    });
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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDropdown();
    });

    items.forEach(item => {
        item.addEventListener('click', () => {
            const value = item.dataset.value;
            const text = item.querySelector('span').textContent;

            label.textContent = 'Sort: ' + text;

            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            closeDropdown();
            sortProducts(value);
        });
    });
}

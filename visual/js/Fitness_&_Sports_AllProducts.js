// =============================================
// Fitness_&_Sports_AllProducts.js — All Products Page
// Aggregates products from every section/category
// =============================================

// Full Product Data for Fitness & Sports
const allProducts = [
    {
        id: "fs-1",
        name: "Pro-Series Treadmill Z1",
        category: "Gym & Strength",
        categoryKey: "gym",
        price: 899,
        originalPrice: 1200,
        rating: 4.9,
        reviews: 1200,
        img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=400&h=300&fit=crop",
        badge: "Flagship",
        badgeClass: "badge-new",
        desc: "Commercial-grade motor and advanced cushioning for the ultimate running experience."
    },
    {
        id: "fs-2",
        name: "Adjustable Dumbbell Set",
        category: "Gym & Strength",
        categoryKey: "gym",
        price: 249,
        originalPrice: 349,
        rating: 4.8,
        reviews: 3400,
        img: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=400&h=300&fit=crop",
        badge: "Best Seller",
        badgeClass: "badge-best",
        desc: "Replace 15 sets of weights with one compact system."
    },
    {
        id: "fs-3",
        name: "Premium Yoga Mat Pro",
        category: "Yoga & Pilates",
        categoryKey: "yoga",
        price: 75,
        originalPrice: 95,
        rating: 5.0,
        reviews: 850,
        img: "https://images.unsplash.com/photo-1592432678886-dd0452fba3d1?q=80&w=400&h=300&fit=crop",
        badge: "Eco-Friendly",
        badgeClass: "badge-new",
        desc: "Sustainable materials and non-slip surface."
    },
    {
        id: "fs-4",
        name: "Performance Football",
        category: "Outdoor Sports",
        categoryKey: "outdoor",
        price: 45,
        originalPrice: null,
        rating: 4.7,
        reviews: 580,
        img: "https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?q=80&w=400&h=300&fit=crop",
        badge: "Match Grade",
        badgeClass: "badge-deal",
        desc: "High-performance aerodynamic design for official matches."
    },
    {
        id: "fs-5",
        name: "Boxing Gloves Pro",
        category: "Combat Sports",
        categoryKey: "combat",
        price: 85,
        originalPrice: 110,
        rating: 4.8,
        reviews: 2100,
        img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=400&h=300&fit=crop",
        badge: "Top Rated",
        badgeClass: "badge-best",
        desc: "Professional protection and wrist support."
    },
    {
        id: "fs-6",
        name: "Eco Yoga Block",
        category: "Yoga & Pilates",
        categoryKey: "yoga",
        price: 15,
        originalPrice: 22,
        rating: 4.5,
        reviews: 420,
        img: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=400&h=300&fit=crop",
        badge: "New",
        badgeClass: "badge-new",
        desc: "High-density foam for support and alignment."
    },
    {
        id: "fs-7",
        name: "Speed Jump Rope",
        category: "Gym & Strength",
        categoryKey: "gym",
        price: 12,
        originalPrice: null,
        rating: 4.6,
        reviews: 1500,
        img: "https://images.unsplash.com/photo-1590502160462-094ba45283fc?q=80&w=400&h=300&fit=crop",
        badge: "Amazon Choice",
        badgeClass: "badge-best",
        desc: "Tangle-free design with ball bearings for smooth rotation."
    },
    {
        id: "fs-8",
        name: "Resistance Band Set",
        category: "Gym & Strength",
        categoryKey: "gym",
        price: 35,
        originalPrice: 70,
        rating: 4.4,
        reviews: 980,
        img: "https://images.unsplash.com/photo-1517130591727-4422e661be48?q=80&w=400&h=300&fit=crop",
        badge: "50% OFF",
        badgeClass: "badge-deal",
        desc: "Stackable bands for all fitness levels."
    }
];

// --- Liked products state (stored in localStorage) ---
let likedProducts = JSON.parse(localStorage.getItem('fs_liked') || '[]');

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
    localStorage.setItem('fs_liked', JSON.stringify(likedProducts));
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
                    <button class="apc-btn-cart" onclick="event.stopPropagation();">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="apc-btn-buy" onclick="event.stopPropagation(); window.location.href='Fitness_&_Sports_ProductDetails.html?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(formatPrice(p.price))}&img=${encodeURIComponent(p.img)}&cat=${encodeURIComponent(p.category)}&rating=${p.rating}&reviews=${p.reviews}${p.originalPrice ? '&originalPrice=' + encodeURIComponent(formatPrice(p.originalPrice)) : ''}&desc=${encodeURIComponent(p.desc)}&badge=${encodeURIComponent(p.badge)}'">
                        <i class="fas fa-bolt"></i> Buy Now
                    </button>
                </div>
            </div>
        `;

        // Click card → go to product details
        card.addEventListener('click', () => {
            window.location.href = `Fitness_&_Sports_ProductDetails.html?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(formatPrice(p.price))}&img=${encodeURIComponent(p.img)}&cat=${encodeURIComponent(p.category)}&rating=${p.rating}&reviews=${p.reviews}${p.originalPrice ? '&originalPrice=' + encodeURIComponent(formatPrice(p.originalPrice)) : ''}&desc=${encodeURIComponent(p.desc)}&badge=${encodeURIComponent(p.badge)}`;
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
    // Generate initial grid
    renderAllProducts(allProducts);
    initBackToTop();
    initCustomDropdown();

    // Bind Filter buttons
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

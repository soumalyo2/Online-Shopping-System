// =============================================
// 2_Wheelers_AllProducts.js — Dynamic Grid Logic
// =============================================

let activeFilter = 'all';
let currentSort = 'featured';

const productsGrid = document.getElementById('products-grid');
const resultsCount = document.getElementById('results-count');

function renderAllProducts(products) {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No products found matching your criteria.</p>
                <button class="btn-primary" onclick="filterProducts('all')">View All Products</button>
            </div>
        `;
        if (resultsCount) resultsCount.innerText = '0';
        return;
    }

    products.forEach(p => {
        const numericPrice = typeof p.price === 'number' ? p.price : parseInt(p.price.toString().replace(/[^0-9]/g, ''));
        const formattedPrice = '₹' + numericPrice.toLocaleString('en-IN');
        const badgeText = p.badge || "New";
        const badgeClass = p.badgeClass || "badge-new";

        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-aos', 'fade-up');
        card.onclick = () => {
            window.location.href = `2_Wheelers_ProductDetails.html?id=${p.id}&name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(formattedPrice)}&img=${encodeURIComponent(p.img)}&cat=${encodeURIComponent(p.category)}&badge=${encodeURIComponent(badgeText)}&rating=${p.rating}&reviews=${p.reviews}${p.originalPrice ? '&originalPrice=' + encodeURIComponent('₹' + p.originalPrice.toLocaleString('en-IN')) : ''}&desc=${encodeURIComponent(p.desc)}`;
        };

        card.dataset.id = p.id;
        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${p.img}" class="product-image" alt="${p.name}">
                <span class="product-badge ${badgeClass}">${badgeText}</span>
                <button class="like-btn ${isLiked(p.name) ? 'liked' : ''}" onclick="event.stopPropagation(); toggleLike('${p.name.replace(/'/g, "\\'")}', this)">
                    <i class="${isLiked(p.name) ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="category-info">${p.category}</div>
                <h3>${p.name}</h3>
                <div class="rating">
                    <i class="fas fa-star"></i> ${p.rating} <span>(${p.reviews.toLocaleString()})</span>
                </div>
                <div class="product-price">
                    <span class="price-current">${formattedPrice}</span>
                    ${p.originalPrice ? `<span class="price-original">₹${p.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                </div>
                <div class="action-buttons">
                    <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${p.id}', '${p.name.replace(/'/g, "\\'")}', '${formattedPrice}', '${p.img}')">
                        <i class="fas fa-shopping-cart"></i> ADD
                    </button>
                    <button class="btn-buy-now" onclick="event.stopPropagation(); buyNow('${p.id}', '${p.name.replace(/'/g, "\\'")}', '${formattedPrice}', '${p.img}')">
                        <i class="fas fa-bolt"></i> Buy Now
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });

    if (resultsCount) resultsCount.innerText = products.length;
    updateCardIcons(); // Sync button states after render
}

// Live Search Logic
function initSearch() {
    const searchInput = document.getElementById('navSearchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allProducts.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );
        renderAllProducts(filtered);
    });
}

function filterProducts(category) {
    activeFilter = category;
    const tagline = document.getElementById('search-tagline');
    const title = document.getElementById('search-title');

    // Update active button styling
    const filterMap = {
        'electric': 'Electric Bikes',
        'mountain': 'Mountain Bikes',
        'road': 'Road Bikes',
        'helmet': 'Cycling Helmets',
        'jacket': 'Motorcycle Jackets',
        'glove': 'Motorcycle Gloves',
        'boot': 'Motorcycle Boots',
        'protective': 'Protective Gear',
        'light': 'Bike Lights',
        'apparel': 'Cycling Apparel',
        'shoes': 'Cycling Shoes',
        'kids': 'Kids Gear',
        'tool': 'Bike Tools',
        'bag': 'Panniers & Bags',
        'phone': 'Phone Mounts',
        'pedal': 'Pedals',
        'chain': 'Chain Care',
        'sunglasses': 'Cycling Sunglasses',
        'fender': 'Fenders',
        'rack': 'Racks & Carriers',
        'mirror': 'Mirrors',
        'grip': 'Grips & Tape',
        'motorcycle': 'Motorcycles',
        'scooter': 'Scooters',
        'electric-scooter': 'Electric Scooters',
        'deals': 'deals',
        'featured': 'featured'
    };

    document.querySelectorAll('.filter-btn').forEach(btn => {
        const btnFilter = btn.dataset.filter;
        btn.classList.toggle('active', btnFilter === category || filterMap[btnFilter] === category);
    });

    let filtered = [];
    if (category === 'all') {
        filtered = [...allProducts];
        if (tagline) tagline.innerText = "EXPLORE OUR COLLECTION";
        if (title) title.innerText = "All Products";
    } else if (category === 'deals') {
        filtered = allProducts.filter(p => p.originalPrice);
        if (tagline) tagline.innerText = "LIMITED TIME OFFERS";
        if (title) title.innerText = "Today's Top Deals";
    } else if (category === 'featured') {
        filtered = [...allProducts].sort((a, b) => b.reviews - a.reviews);
        if (tagline) tagline.innerText = "RIDER FAVORITES";
        if (title) title.innerText = "Best Sellers of the Week";
    } else if (category === 'liked') {
        const liked = JSON.parse(localStorage.getItem('2wheelers_liked') || '[]');
        filtered = allProducts.filter(p => liked.includes(p.name));
        if (tagline) tagline.innerText = "YOUR WISHLIST";
        if (title) title.innerText = "Liked Products";
    } else {
        filtered = allProducts.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
        if (tagline) tagline.innerText = `EXPLORE ${category.toUpperCase()}`;
        if (title) title.innerText = category;
    }

    applySort(filtered);
}

function applySort(products) {
    let sorted = [...products];
    switch (currentSort) {
        case 'price-low':
            sorted.sort((a, b) => {
                const priceA = typeof a.price === 'number' ? a.price : parseInt(a.price.toString().replace(/[^0-9]/g, ''));
                const priceB = typeof b.price === 'number' ? b.price : parseInt(b.price.toString().replace(/[^0-9]/g, ''));
                return priceA - priceB;
            });
            break;
        case 'price-high':
            sorted.sort((a, b) => {
                const priceA = typeof a.price === 'number' ? a.price : parseInt(a.price.toString().replace(/[^0-9]/g, ''));
                const priceB = typeof b.price === 'number' ? b.price : parseInt(b.price.toString().replace(/[^0-9]/g, ''));
                return priceB - priceA;
            });
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'reviews':
            sorted.sort((a, b) => b.reviews - a.reviews);
            break;
    }
    renderAllProducts(sorted);
}

function toggleLike(pName, btn) {
    let liked = JSON.parse(localStorage.getItem('2wheelers_liked') || '[]');
    const idx = liked.indexOf(pName);
    if (idx > -1) {
        liked.splice(idx, 1);
        btn.classList.remove('liked');
        btn.innerHTML = '<i class="far fa-heart"></i>';
    } else {
        liked.push(pName);
        btn.classList.add('liked');
        btn.innerHTML = '<i class="fas fa-heart"></i>';
    }
    localStorage.setItem('2wheelers_liked', JSON.stringify(liked));
}

function isLiked(pName) {
    const liked = JSON.parse(localStorage.getItem('2wheelers_liked') || '[]');
    return liked.includes(pName);
}

function buyNow(pId, pName, pPrice, pImg) {
    const numericPrice = parseInt(pPrice.replace(/[^0-9]/g, ''));
    const product = {
        id: pId,
        name: pName,
        price: numericPrice,
        image: pImg,
        quantity: 1
    };
    // Direct purchase uses a temp cart for checkout
    sessionStorage.setItem('um_cart', JSON.stringify([product]));
    window.location.href = '../../templates/payment_gateway.html';
}

function addToCart(pId, pName, pPrice, pImg) {
    const numericPrice = parseInt(pPrice.replace(/[^0-9]/g, ''));
    let cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
    
    const existingIndex = cart.findIndex(item => (pId && item.id === pId) || (!pId && item.name === pName));
    if (existingIndex > -1) {
        cart.splice(existingIndex, 1);
        localStorage.setItem('pbssd_cart', JSON.stringify(cart));
        showToast(`${pName} removed from cart!`, false);
    } else {
        cart.push({
            id: pId,
            name: pName,
            price: numericPrice,
            image: pImg,
            quantity: 1
        });
        localStorage.setItem('pbssd_cart', JSON.stringify(cart));
        showToast(`${pName} added to cart!`, true);
    }
    
    if (window.updateCartBadge) window.updateCartBadge();
    updateCardIcons(); // Real-time UI update
}

function updateCardIcons() {
    let cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
    const cartIds = cart.map(item => item.id);
    const cartNames = cart.map(item => item.name);
    
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        const card = btn.closest('.product-card');
        if (!card) return;
        const pId = card.dataset.id;
        const pName = card.querySelector('h3').innerText;
        
        const isInCart = (pId && cartIds.includes(pId)) || (!pId && cartNames.includes(pName));
        
        if (isInCart) {
            btn.innerHTML = '<i class="fas fa-check"></i> ADDED';
            btn.classList.add('added');
        } else {
            btn.innerHTML = '<i class="fas fa-shopping-cart"></i> ADD';
            btn.classList.remove('added');
        }
    });
}

function showToast(msg, isAdd = true) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${isAdd ? 'var(--primary-green)' : '#e11d48'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    toast.innerHTML = `<i class="fas ${isAdd ? 'fa-check-circle' : 'fa-info-circle'}"></i> ${msg}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Sorting logic
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
        const val = item.dataset.value;
        currentSort = val;
        
        // UI Update
        document.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const label = document.getElementById('dropdown-label');
        if (label) label.innerText = `Sort: ${item.querySelector('span').innerText}`;
        
        filterProducts(activeFilter);
    });
});

// Category pills logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        filterProducts(btn.dataset.filter);
    });
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    // Check for URL parameters for filtering or searching
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    const searchParam = urlParams.get('search');

    if (searchParam) {
        // Handle Search
        const query = searchParam.toLowerCase();
        const results = allProducts.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) ||
            p.desc.toLowerCase().includes(query)
        );
        renderAllProducts(results);
        
        // Update UI
        const resultsTagline = document.getElementById('search-tagline');
        const resultsTitle = document.getElementById('search-title');
        if (resultsTagline) resultsTagline.innerText = "SEARCH RESULTS";
        if (resultsTitle) resultsTitle.innerText = `Searching for "${searchParam.toUpperCase()}"`;
        activeFilter = 'all'; // Reset filter state
    } else if (filterParam) {
        // Map common filter IDs to categories
        const filterMap = {
            'electric': 'Electric Bikes',
            'mountain': 'Mountain Bikes',
            'road': 'Road Bikes',
            'helmet': 'Cycling Helmets',
            'jacket': 'Motorcycle Jackets',
            'glove': 'Motorcycle Gloves',
            'boot': 'Motorcycle Boots',
            'protective': 'Protective Gear',
            'light': 'Bike Lights',
            'apparel': 'Cycling Apparel',
            'shoes': 'Cycling Shoes',
            'kids': 'Kids Gear',
            'tool': 'Bike Tools',
            'bag': 'Panniers & Bags',
            'phone': 'Phone Mounts',
            'pedal': 'Pedals',
            'chain': 'Chain Care',
            'sunglasses': 'Cycling Sunglasses',
            'fender': 'Fenders',
            'rack': 'Racks & Carriers',
            'mirror': 'Mirrors',
            'grip': 'Grips & Tape',
            'motorcycle': 'Motorcycles',
            'scooter': 'Scooters',
            'electric-scooter': 'Electric Scooters',
            'deals': 'deals',
            'featured': 'featured'
        };
        const targetCategory = filterMap[filterParam] || filterParam;
        filterProducts(targetCategory);
        
        // Update active state on filter buttons if applicable
        document.querySelectorAll('.filter-btn').forEach(btn => {
            const btnFilter = btn.dataset.filter;
            if (btnFilter === filterParam || btnFilter === targetCategory || filterMap[btnFilter] === targetCategory) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    } else {
        renderAllProducts(allProducts);
    }
    initSearch(); // Start listening for live search

    // Initialize AOS
    if (window.AOS) {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true
        });
    }
});

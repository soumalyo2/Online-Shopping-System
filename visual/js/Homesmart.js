// =============================================
// Homesmart.js — Dynamic Rendering Engine
// Standardized architecture matching Fitness & Sports / 2 Wheelers
// =============================================

// Hero Carousel Dynamic Data
const heroProducts = [
    { 
        name: "Emerald Ceramic Pot Set", 
        price: "$129.99", 
        tag: "BEST DEAL", 
        img: "../assets/cookware_category_green_1775381016223.png", 
        link: "ProductDetails.html?name=Emerald%20Ceramic%20Pot%20Set&price=$129.99&img=../assets/cookware_category_green_1775381016223.png&cat=Cookware&rating=4.8&reviews=3200&originalPrice=$189.99&desc=Eco-friendly%20ceramic%20with%20non-stick%20coating.%20Set%20of%205%20pots%20and%20pans%20for%20healthy%2C%20oil-free%20cooking.&badge=Best%20Seller",
        bg: "linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('../assets/hero_banner_green_ecommerce_1775380995226.png')",
        desc: "Upgrade your kitchen with our top-rated eco-friendly ceramic pot set. Healthier cooking, elegant design."
    },
    { 
        name: "Smart Kitchen Combo", 
        price: "$199.00", 
        tag: "TRENDING NOW", 
        img: "https://images.unsplash.com/photo-1556910110-ad52744d7c1f?q=80&w=600&h=600&fit=crop", 
        link: "ProductDetails.html?name=Smart+Kitchen+Combo&price=$199&img=https://images.unsplash.com/photo-1556910110-ad52744d7c1f?q=80&w=400&h=300&fit=crop&cat=Deals&rating=4.7&reviews=2450&originalPrice=$399&desc=Multi-functional%20automated%20kitchen%20tools.&badge=50%25%20OFF",
        bg: "linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1513519245088-0e12902e15ca?q=80&w=1600&h=900&fit=crop')",
        desc: "The ultimate automated kitchen experience. Multi-functional tools to save your time and space."
    },
    { 
        name: "Luxury Sofa Set Lux", 
        price: "$1,200", 
        tag: "BEST SELLER", 
        img: "https://images.unsplash.com/photo-1493663214224-992ca251d102?q=80&w=600&h=600&fit=crop", 
        link: "ProductDetails.html?name=Luxury%20Sofa%20Set%20Lux&price=$1,200&img=https://images.unsplash.com/photo-1493663214224-992ca251d102?q=80&w=400&h=300&fit=crop&cat=Deals&rating=4.9&reviews=1890&originalPrice=$1,800&desc=Hand-stitched%20premium%20velvet%20upholstery.&badge=Best%20Seller",
        bg: "linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=1600&h=900&fit=crop')",
        desc: "Supreme comfort meets modern architecture. Hand-stitched premium velvet for an elegant living room."
    },
    { 
        name: "Nordic Minimalist Vase", 
        price: "$32.00", 
        tag: "TRENDING NOW", 
        img: "https://images.unsplash.com/photo-1581783598307-5bbe6ed40e5a?q=80&w=600&h=600&fit=crop", 
        link: "ProductDetails.html?name=Nordic%20Minimalist%20Vase&price=$32.00&img=https://images.unsplash.com/photo-1581783598307-5bbe6ed40e5a?q=80&w=400&h=300&fit=crop&cat=Trending&rating=4.5&reviews=1560&badge=Trending",
        bg: "#111827",
        desc: "A timeless ceramic piece that brings Scandinavian simplicity to your shelf or table."
    },
    { 
        name: "Bamboo Serving Tray", 
        price: "$24.50", 
        tag: "BEST DEAL", 
        img: "https://images.unsplash.com/photo-1513519245088-0e12902e15ca?q=80&w=600&h=600&fit=crop", 
        link: "ProductDetails.html?name=Bamboo%20Serving%20Tray&price=$24.50&img=https://images.unsplash.com/photo-1513519245088-0e12902e15ca?q=400&h=300&fit=crop&cat=Best+Deals&rating=4.4&reviews=2100&originalPrice=$35&badge=Best%20Deal",
        bg: "#064e3b",
        desc: "Sustainable, durable, and naturally beautiful. Perfect for breakfast in bed or hosting guests."
    },
    { 
        name: "Velvet Cushion Set", 
        price: "$45.00", 
        tag: "BEST SELLER", 
        img: "https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=600&h=600&fit=crop", 
        link: "ProductDetails.html?name=Velvet%20Cushion%20Set&price=$45.00&img=https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=400&h=300&fit=crop&cat=Bestsellers&rating=4.6&reviews=2340&originalPrice=$65&badge=Best%20Seller",
        bg: "#4c1d95",
        desc: "Plush textures and vibrant tones. Transform any sofa into a sanctuary of softness."
    }
];

// Carousel DOM elements
const carouselInner = document.getElementById('hero-carousel-inner');
const carouselDots = document.getElementById('hero-carousel-nav');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const progressFill = document.getElementById('carousel-progress-fill');

let currentHeroSlide = 0;
let carouselTimer;
const SLIDE_DURATION = 6000;

function renderHeroCarousel() {
    if (!carouselInner || !carouselDots) return;
    
    heroProducts.forEach((product, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = product.bg;
        
        slide.innerHTML = `
            <div class="hero-content">
                <div class="hero-text">
                    <span class="category-tag">${product.tag}</span>
                    <h1>The Best For <span style="color:var(--accent-green)">Your Home</span></h1>
                    <p>${product.desc}</p>
                </div>
                <div class="hero-product-display">
                    <div class="hero-card">
                        <img src="${product.img}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="hero-price">${product.price}</p>
                        <button class="btn-light" onclick="window.location.href='${product.link}'">VIEW PRODUCT</button>
                    </div>
                </div>
            </div>
        `;
        carouselInner.appendChild(slide);
        
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.onclick = () => showHeroSlide(index, index > currentHeroSlide ? 'next' : 'prev');
        carouselDots.appendChild(dot);
    });

    if (prevBtn) prevBtn.onclick = () => prevHeroSlide();
    if (nextBtn) nextBtn.onclick = () => nextHeroSlide();
    
    startCarouselAutoPlay();
}

function showHeroSlide(index, direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (index === currentHeroSlide) return;
    
    slides.forEach(s => s.classList.remove('next-slide', 'prev-slide', 'active'));
    dots.forEach(d => d.classList.remove('active'));
    
    currentHeroSlide = index;
    const activeSlide = slides[currentHeroSlide];
    activeSlide.classList.add('active');
    activeSlide.classList.add(direction === 'next' ? 'next-slide' : 'prev-slide');
    dots[currentHeroSlide].classList.add('active');
    
    startCarouselAutoPlay();
}

function nextHeroSlide() {
    let next = (currentHeroSlide + 1) % heroProducts.length;
    showHeroSlide(next, 'next');
}

function prevHeroSlide() {
    let prev = (currentHeroSlide - 1 + heroProducts.length) % heroProducts.length;
    showHeroSlide(prev, 'prev');
}

function startCarouselAutoPlay() {
    clearInterval(carouselTimer);
    
    if (progressFill) {
        progressFill.style.transition = 'none';
        progressFill.style.width = '0%';
        progressFill.offsetHeight; 
        progressFill.style.transition = `width ${SLIDE_DURATION}ms linear`;
        progressFill.style.width = '100%';
    }

    carouselTimer = setInterval(nextHeroSlide, SLIDE_DURATION);
}

// =============================================
// Dynamic Product Rendering Engine
// =============================================

function renderProductCard(p) {
    const isItemLiked = isLiked(p.id);
    const inCart = isInCart(p.id, p.name);
    
    const priceDisplay = typeof p.price === 'number' ? '$' + p.price.toLocaleString('en-US', { minimumFractionDigits: p.price % 1 !== 0 ? 2 : 0 }) : p.price;
    const origPriceDisplay = p.originalPrice ? (typeof p.originalPrice === 'number' ? '$' + p.originalPrice.toLocaleString('en-US', { minimumFractionDigits: p.originalPrice % 1 !== 0 ? 2 : 0 }) : p.originalPrice) : '';

    return `
    <div class="product-card" data-aos="fade-up" onclick="window.location.href='../template/ProductDetails.html?id=${p.id}&name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(priceDisplay)}&img=${encodeURIComponent(p.img)}&cat=${encodeURIComponent(p.category)}&rating=${p.rating}&reviews=${p.reviews}&originalPrice=${encodeURIComponent(origPriceDisplay)}&desc=${encodeURIComponent(p.desc || '')}&badge=${encodeURIComponent(p.badge || '')}'">
        <div class="image-wrapper">
            <img src="${p.img}" class="product-image" alt="${p.name}">
            ${p.badge ? `<span class="product-badge ${p.badgeClass}">${p.badge}</span>` : ''}
            <button class="like-btn ${isItemLiked ? 'liked' : ''}" onclick="event.stopPropagation(); toggleLike('${p.id}', this)">
                <i class="${isItemLiked ? 'fas' : 'far'} fa-heart"></i>
            </button>
        </div>
        <div class="product-info">
            <p class="product-brand">${p.category}</p>
            <h3>${p.name}</h3>
            <div class="rating">
                <i class="fas fa-star"></i> ${p.rating} <span>(${p.reviews.toLocaleString()})</span>
            </div>
            <div class="product-price">
                <span class="price-current">${priceDisplay}</span>
                ${origPriceDisplay ? `<span class="price-original">${origPriceDisplay}</span>` : ''}
            </div>
            <div class="action-buttons">
                <button class="btn-add-cart ${inCart ? 'added' : ''}" onclick="event.stopPropagation(); addToCart('${p.id}', '${p.name.replace(/'/g, "\\'")}', '${priceDisplay}', '${p.img}', this)">
                    <i class="fas ${inCart ? 'fa-check' : 'fa-shopping-cart'}"></i> ${inCart ? 'ADDED' : 'ADD'}
                </button>
                <button class="btn-buy-now" onclick="event.stopPropagation(); buyNow('${p.id}', '${p.name.replace(/'/g, "\\'")}', '${priceDisplay}', '${p.img}')">
                    <i class="fas fa-bolt"></i> Buy
                </button>
            </div>
        </div>
    </div>
    `;
}

function renderSection(containerId, title, tagline, products, viewAllLink, bgColor = '#ffffff') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = `
        <section class="container" style="background: ${bgColor};">
            <div class="section-header">
                <div>
                    <span class="section-tagline">${tagline}</span>
                    <h2>${title}</h2>
                </div>
                <a href="${viewAllLink}" class="view-all">Shop All <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="product-scroll-container">
                ${products.map(p => renderProductCard(p)).join('')}
            </div>
        </section>
    `;
    container.innerHTML = html;
}

function renderDynamicContent() {
    if (typeof allProducts === 'undefined') return;

    // Top Deals
    const topDeals = allProducts.filter(p => p.originalPrice).slice(0, 4);
    renderSection('top-deals-container', "Today's Top Deals", 'LIMITED TIME ONLY', topDeals, '../template/Homesmart_AllProducts.html', '#fff8f8');

    // Best Sellers
    const bestSellers = allProducts.filter(p => p.rating >= 4.7).slice(0, 4);
    renderSection('best-sellers-container', 'Best Sellers of the Week', 'CUSTOMER FAVORITES', bestSellers, '../template/Homesmart_AllProducts.html', 'var(--light-green)');

    // Premium Collection
    const premium = allProducts.filter(p => p.price > 100).slice(0, 4);
    renderSection('signature-gallery-container', 'Premium Collection', 'LUXURY LIVING', premium, '../template/Homesmart_AllProducts.html', '#ffffff');

    // Dynamic Categories
    const categoriesContainer = document.getElementById('dynamic-categories');
    if (categoriesContainer) {
        const homeCategories = [
            { name: "Cookware", tagline: "KITCHEN MASTERCLASS", filter: "cookware" },
            { name: "Kitchen", tagline: "GOURMET ESSENTIALS", filter: "kitchen" },
            { name: "Furniture", tagline: "TIMELESS COMFORT", filter: "furniture" },
            { name: "Home Decor", tagline: "AESTHETIC TOUCH", filter: "decor" },
            { name: "Lighting", tagline: "ILLUMINATE YOUR HOME", filter: "lighting" },
            { name: "Storage", tagline: "ORGANIZED LIVING", filter: "storage" },
            { name: "Bathroom", tagline: "SPA AT HOME", filter: "bathroom" },
            { name: "Drinkware", tagline: "SIP IN STYLE", filter: "drinkware" },
            { name: "Insect Protection", tagline: "SUMMER SAFE", filter: "insect" },
            { name: "Home Covers", tagline: "SHIELD YOUR GEAR", filter: "covers" },
            { name: "Hardware Tools", tagline: "BUILD IT RIGHT", filter: "hardware" },
            { name: "Furnishing", tagline: "COZY SPACES", filter: "furnishing" },
            { name: "Mats & Decor", tagline: "SOFT UNDERFOOT", filter: "mats" },
            { name: "Pooja Needs", tagline: "SACRED SPACE", filter: "pooja" },
            { name: "Bath Linen", tagline: "SOFT & ABSORBENT", filter: "bathlinen" },
            { name: "Gardening", tagline: "GROW YOUR GREEN", filter: "gardening" },
            { name: "Wall Art", tagline: "VIBRANT WALLS", filter: "wallart" },
            { name: "Cleaning", tagline: "SPARKLE & SHINE", filter: "cleaning" },
            { name: "Dining", tagline: "GATHER AROUND", filter: "dining" },
            { name: "Utilities", tagline: "EVERYDAY ESSENTIALS", filter: "utilities" }
        ];

        let catHtml = '';
        homeCategories.forEach((catObj, index) => {
            const catProducts = allProducts.filter(p => p.category === catObj.name).slice(0, 4);
            if (catProducts.length > 0) {
                const bg = index % 2 === 0 ? '#ffffff' : 'var(--light-green)';
                catHtml += `
                    <section class="container" style="background: ${bg};">
                        <div class="section-header">
                            <div>
                                <span class="section-tagline">${catObj.tagline}</span>
                                <h2>${catObj.name}</h2>
                            </div>
                            <a href="../template/Homesmart_AllProducts.html?filter=${catObj.filter}" class="view-all">View All <i class="fas fa-chevron-right"></i></a>
                        </div>
                        <div class="product-scroll-container">
                            ${catProducts.map(p => renderProductCard(p)).join('')}
                        </div>
                    </section>
                `;
            }
        });
        categoriesContainer.innerHTML = catHtml;
    }
}

// =============================================
// Cart, Wishlist & State Management
// =============================================

function buyNow(pId, pName, pPrice, pImg) {
    const numericPrice = parseInt(pPrice.replace(/[^0-9]/g, '')) || 0;
    sessionStorage.setItem('um_cart', JSON.stringify([{ id: pId, name: pName, price: numericPrice, image: pImg, quantity: 1 }]));
    window.location.href = '../../templates/payment_gateway.html';
}

function addToCart(pId, pName, pPrice, pImg, btn) {
    const numericPrice = parseInt(pPrice.replace(/[^0-9]/g, '')) || 0;
    let cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');

    const existingIndex = cart.findIndex(item => (pId && item.id === pId) || (!pId && item.name === pName));
    if (existingIndex > -1) {
        cart.splice(existingIndex, 1);
        localStorage.setItem('pbssd_cart', JSON.stringify(cart));
        showToast(`${pName} removed from cart!`, false);
        if (btn) {
            btn.classList.remove('added');
            btn.innerHTML = `<i class="fas fa-shopping-cart"></i> ADD`;
        }
    } else {
        cart.push({ id: pId, name: pName, price: numericPrice, image: pImg, quantity: 1 });
        localStorage.setItem('pbssd_cart', JSON.stringify(cart));
        showToast(`${pName} added to cart!`, true);
        if (btn) {
            btn.classList.add('added');
            btn.innerHTML = `<i class="fas fa-check"></i> ADDED`;
        }
    }

    if (window.updateCartBadge) window.updateCartBadge();
    syncHardcodedButtons();
}

function showToast(msg, isAdd = true) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    if (!isAdd) toast.style.background = '#e11d48';
    toast.innerHTML = `<i class="fas ${isAdd ? 'fa-check-circle' : 'fa-info-circle'}"></i> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function syncHardcodedButtons() {
    const cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
    const cartIds = cart.map(item => item.id);
    const cartNames = cart.map(item => item.name);

    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes('addToCart')) {
            const match = onclickAttr.match(/addToCart\('([^']*)',\s*'([^']*)/);
            if (match) {
                const pId = match[1];
                const pName = match[2];
                const inCart = (pId && cartIds.includes(pId)) || (!pId && cartNames.includes(pName));
                
                btn.classList.toggle('added', inCart);
                btn.innerHTML = inCart ? `<i class="fas fa-check"></i> ADDED` : `<i class="fas fa-shopping-cart"></i> ADD`;
            }
        }
    });
}

function toggleLike(pId, btn) {
    let liked = JSON.parse(localStorage.getItem('hs_liked') || '[]');
    const idx = liked.indexOf(pId);
    if (idx > -1) {
        liked.splice(idx, 1);
        btn.classList.remove('liked');
        btn.innerHTML = '<i class="far fa-heart"></i>';
    } else {
        liked.push(pId);
        btn.classList.add('liked');
        btn.innerHTML = '<i class="fas fa-heart"></i>';
    }
    localStorage.setItem('hs_liked', JSON.stringify(liked));
}

function isLiked(pId) {
    const liked = JSON.parse(localStorage.getItem('hs_liked') || '[]');
    return liked.includes(pId);
}

function syncLikes() {
    const liked = JSON.parse(localStorage.getItem('hs_liked') || '[]');
    document.querySelectorAll('.like-btn').forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes('toggleLike')) {
            const match = onclickAttr.match(/toggleLike\('([^']+)/);
            if (match && match[1]) {
                const pId = match[1];
                const isItemLiked = liked.includes(pId);
                btn.classList.toggle('liked', isItemLiked);
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fas', isItemLiked);
                    icon.classList.toggle('far', !isItemLiked);
                }
            }
        }
    });
}

function isInCart(pId, pName) {
    const cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
    return cart.some(item => (pId && item.id === pId) || (!pId && item.name === pName));
}

// =============================================
// Toast & Dynamic Styles Injection
// =============================================

if (!document.getElementById('hs-dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'hs-dynamic-styles';
    style.innerHTML = `
        .toast-notification {
            position: fixed; bottom: 20px; right: 20px; background: var(--primary-green);
            color: white; padding: 1rem 2rem; border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 10000;
            animation: slideIn 0.3s ease-out;
        }
        .toast-notification.fade-out { animation: slideOut 0.3s ease-in forwards; }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
    `;
    document.head.appendChild(style);
}

// =============================================
// Initialize on DOM Ready
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    renderHeroCarousel();
    renderDynamicContent();
    syncHardcodedButtons();
    syncLikes();
    
    // Initialize AOS
    if (window.AOS) {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }
});

// =============================================
// 2_Wheelers.js — Fully Dynamic Landing Page
// =============================================

// Hero Products will be derived from Master Database
let heroProducts = [];

// DOM Elements
const carouselInner = document.getElementById('hero-carousel-inner');
const carouselDots = document.getElementById('hero-carousel-nav');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const progressFill = document.getElementById('carousel-progress-fill');

let currentHeroSlide = 0;
let carouselTimer;
const SLIDE_DURATION = 5000;

// Filter State
let currentSort = 'featured';
let activeFilter = 'all';

// Render Hero Carousel
function renderHeroCarousel() {
    if (!carouselInner || !carouselDots) return;
    
    // Derived Hero Products (ensure we have data)
    if (typeof allProducts !== 'undefined' && allProducts.length > 0) {
        heroProducts = allProducts.slice(0, 6).map((p, i) => {
            // Curated high-end backgrounds for different categories
            let bgImg = '';
            if (p.category.includes('Electric')) {
                bgImg = "url('https://images.unsplash.com/photo-1558981403-c5f91cbcf523?q=80&w=1600&h=900&fit=crop')";
            } else if (p.category.includes('Mountain')) {
                bgImg = "url('https://images.unsplash.com/photo-1544191133-728b7f83733a?q=80&w=1600&h=900&fit=crop')";
            } else if (p.category.includes('Road')) {
                bgImg = "url('https://images.unsplash.com/photo-1471506480208-8a93acc6c0bb?q=80&w=1600&h=900&fit=crop')";
            } else {
                bgImg = "url('https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=1600&h=900&fit=crop')";
            }

            return {
                ...p,
                tag: p.badge || "FEATURED",
                bg: `linear-gradient(rgba(7, 15, 7, 0.8), rgba(7, 15, 7, 0.6)), ${bgImg}`
            };
        });
    } else {
        console.warn("2_Wheelers_Data.js: allProducts not found or empty.");
        return;
    }

    carouselInner.innerHTML = '';
    carouselDots.innerHTML = '';

    heroProducts.forEach((product, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = product.bg;
        slide.style.backgroundSize = 'cover';
        slide.style.backgroundPosition = 'center';

        const formattedPrice = '₹' + (typeof product.price === 'number' ? product.price.toLocaleString('en-IN') : product.price);

        slide.innerHTML = `
            <div class="hero-content">
                <div class="hero-text">
                    <span class="category-tag">${product.tag}</span>
                    <h1>Ride The <span style="color:var(--accent-green)">Future</span></h1>
                    <p>${product.desc}</p>
                </div>
                <div class="hero-product-display">
                    <div class="hero-card">
                        <img src="${product.img}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="hero-price">${formattedPrice}</p>
                        <button class="btn-light" onclick="window.location.href='2_Wheelers_ProductDetails.html?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(formattedPrice)}&img=${encodeURIComponent(product.img)}&cat=${encodeURIComponent(product.category)}&rating=${product.rating}&reviews=${product.reviews}${product.originalPrice ? '&originalPrice=₹' + product.originalPrice.toLocaleString('en-IN') : ''}&desc=${encodeURIComponent(product.desc)}&badge=${encodeURIComponent(product.badge || '')}'">VIEW PRODUCT</button>
                    </div>
                </div>
            </div>
        `;
        carouselInner.appendChild(slide);

        const dot = document.createElement('button');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => showHeroSlide(index, index > currentHeroSlide ? 'next' : 'prev');
        carouselDots.appendChild(dot);
    });

    if (prevBtn) prevBtn.onclick = () => { prevHeroSlide(); };
    if (nextBtn) nextBtn.onclick = () => { nextHeroSlide(); };

    initSwipeHandlers();
    startCarouselAutoPlay();
}

function showHeroSlide(index, direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    if (slides.length === 0) return;

    index = ((index % heroProducts.length) + heroProducts.length) % heroProducts.length;

    if (index === currentHeroSlide) return;

    slides.forEach(s => {
        s.classList.remove('next-slide', 'prev-slide', 'active');
    });
    dots.forEach(d => d.classList.remove('active'));

    currentHeroSlide = index;
    const activeSlide = slides[currentHeroSlide];
    activeSlide.classList.add('active');
    activeSlide.classList.add(direction === 'next' ? 'next-slide' : 'prev-slide');
    dots[currentHeroSlide].classList.add('active');

    resetCarouselAutoPlay();
}

function nextHeroSlide() { showHeroSlide(currentHeroSlide + 1, 'next'); }
function prevHeroSlide() { showHeroSlide(currentHeroSlide - 1, 'prev'); }

function startCarouselAutoPlay() {
    if (carouselTimer) clearInterval(carouselTimer);
    if (progressFill) {
        progressFill.style.transition = 'none';
        progressFill.style.width = '0%';
        progressFill.offsetHeight; // Reflow
        progressFill.style.transition = `width ${SLIDE_DURATION}ms linear`;
        progressFill.style.width = '100%';
    }
    carouselTimer = setInterval(nextHeroSlide, SLIDE_DURATION);
}

function resetCarouselAutoPlay() {
    startCarouselAutoPlay();
}

function initSwipeHandlers() {
    let isDragging = false, dragStartX = 0, dragStartTime = 0;
    const SLIDE_THRESHOLD = 50;

    const start = (e) => {
        isDragging = true;
        dragStartX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        dragStartTime = Date.now();
        if (carouselInner) carouselInner.style.cursor = 'grabbing';
    };

    const end = (e) => {
        if (!isDragging) return;
        isDragging = false;
        if (carouselInner) carouselInner.style.cursor = 'grab';
        const endX = e.type.includes('touch') ? e.changedTouches[0].clientX : e.clientX;
        const diff = endX - dragStartX;
        const time = Date.now() - dragStartTime;

        if (Math.abs(diff) > SLIDE_THRESHOLD || (Math.abs(diff) > 20 && time < 250)) {
            diff > 0 ? prevHeroSlide() : nextHeroSlide();
        }
    };

    if (carouselInner) {
        carouselInner.addEventListener('mousedown', start);
        window.addEventListener('mouseup', end);
        carouselInner.addEventListener('touchstart', start, { passive: true });
        carouselInner.addEventListener('touchend', end, { passive: true });
    }
}

// Sync genre tabs with the dynamic category-nav-bar position
window.addEventListener('scroll', () => {
    const genreTabs = document.querySelector('.genre-tabs');
    const catBar = document.getElementById('categoryNavBar');
    if (!genreTabs || !catBar) return;

    const catBarTop = parseInt(window.getComputedStyle(catBar).top) || 142;
    const catBarHeight = catBar.getBoundingClientRect().height;

    genreTabs.style.top = `${catBarTop + catBarHeight}px`;
});

function scrollToGenre(genreId) {
    if (genreId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    // Try multiple ID patterns
    const target = document.getElementById(`section-${genreId}`) ||
        document.getElementById(`sec-${genreId}`) ||
        document.getElementById(genreId.toLowerCase().replace(/\s+/g, '-'));

    if (target) {
        const offset = target.offsetTop - 120; // Adjusted for sticky nav
        window.scrollTo({ top: offset, behavior: 'smooth' });
    }
}

const brands = [
    { name: "Giant Bicycles", genre: "Road & Mountain", bio: "The world's largest bicycle manufacturer, setting standards in carbon and alloy.", img: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=200&h=200&fit=crop" },
    { name: "Specialized", genre: "Premium Performance", bio: "Built for riders, by riders. Innovating in aerodynamics and professional racing gear.", img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=200&h=200&fit=crop" },
    { name: "Trek Bikes", genre: "Hybrid & Electric", bio: "American engineering focused on sustainability and off-road excellence.", img: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=200&h=200&fit=crop" }
];

function renderBrandSpotlight() {
    const grid = document.getElementById('brand-spotlight-grid');
    if (!grid) return;
    grid.innerHTML = '';
    brands.forEach(brand => {
        const card = document.createElement('div');
        card.className = 'author-card';
        card.innerHTML = `
            <img src="${brand.img}" alt="${brand.name}" class="author-avatar">
            <h4>${brand.name}</h4>
            <div class="author-genre">${brand.genre}</div>
            <p class="author-bio">${brand.bio}</p>
        `;
        grid.appendChild(card);
    });
}

function renderGenreTabs() {
    const navContainer = document.getElementById('dynamic-nav-pills');
    if (!navContainer) return;

    // Fixed / Core Tabs
    const coreTabs = [
        { id: 'hero', name: 'Featured', icon: 'fas fa-home' },
        { id: 'shop', name: 'All', icon: 'fas fa-th' },
        { type: 'link', href: '2_Wheelers_AllProducts.html', name: 'Catalog', icon: 'fas fa-external-link-alt' }
    ];

    // Dynamic Category Tabs from DB
    const allowedCategories = [
        'Motorcycles', 'Electric Bikes', 'Electric Scooters', 'Scooters', 'Mountain Bikes', 
        'Road Bikes', 'Cycling Helmets', 'Motorcycle Jackets', 'Motorcycle Gloves', 
        'Motorcycle Boots', 'Protective Gear', 'Bike Lights', 'Cycling Apparel', 
        'Cycling Shoes', 'Kids Gear', 'Bike Tools', 'Panniers & Bags', 
        'Phone Mounts', 'Pedals', 'Chain Care', 'Cycling Sunglasses', 
        'Fenders', 'Racks & Carriers', 'Mirrors', 'Grips & Tape'
    ];
    const categories = [...new Set(allProducts.map(p => p.category))]
        .filter(cat => allowedCategories.includes(cat));
    
    // Sort based on allowedCategories order
    categories.sort((a, b) => allowedCategories.indexOf(a) - allowedCategories.indexOf(b));

    // Icon mapping for categories
    const iconMap = {
        'Motorcycles': 'fas fa-motorcycle',
        'Electric Bikes': 'fas fa-bolt',
        'Mountain Bikes': 'fas fa-mountain',
        'Road Bikes': 'fas fa-road',
        'Scooters': 'fas fa-moped',
        'Electric Scooters': 'fas fa-plug',
        'Cycling Helmets': 'fas fa-helmet-safety',
        'Kids Gear': 'fas fa-child',
        'Bike Accessories': 'fas fa-gear'
    };

    let html = '';

    // Render Core Tabs
    coreTabs.forEach(tab => {
        if (tab.type === 'link') {
            html += `<button class="filter-btn" onclick="window.location.href='${tab.href}'"><i class="${tab.icon}"></i> ${tab.name}</button>`;
        } else {
            html += `<button class="filter-btn ${tab.id === 'hero' ? 'active' : ''}" onclick="scrollToGenre('${tab.id}')"><i class="${tab.icon}"></i> ${tab.name}</button>`;
        }
    });

    // Render Category Tabs
    categories.forEach(cat => {
        const id = cat.toLowerCase().replace(/\s+/g, '-');
        const icon = iconMap[cat] || 'fas fa-tag';
        html += `<button class="filter-btn" onclick="scrollToGenre('${id}')"><i class="${icon}"></i> ${cat}</button>`;
    });

    navContainer.innerHTML = html;
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

function syncLikes() {
    const liked = JSON.parse(localStorage.getItem('2wheelers_liked') || '[]');
    document.querySelectorAll('.like-btn').forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes('toggleLike')) {
            const match = onclickAttr.match(/toggleLike\('([^']+)'/);
            if (match && match[1]) {
                const pName = match[1];
                const isItemLiked = liked.includes(pName);
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

function renderProductCard(p) {
    const numericPrice = typeof p.price === 'number' ? p.price : parseInt(p.price.toString().replace(/[^0-9]/g, ''));
    const formattedPrice = '₹' + numericPrice.toLocaleString('en-IN');
    const badgeText = p.badge || "New";
    const badgeClass = p.badgeClass || "badge-new";

    return `
        <div class="product-card" data-aos="fade-up" onclick="window.location.href='2_Wheelers_ProductDetails.html?id=${p.id}&name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(formattedPrice)}&img=${encodeURIComponent(p.img)}&cat=${encodeURIComponent(p.category)}&badge=${encodeURIComponent(badgeText)}&rating=${p.rating}&reviews=${p.reviews}${p.originalPrice ? '&originalPrice=' + encodeURIComponent('₹' + p.originalPrice.toLocaleString('en-IN')) : ''}&desc=${encodeURIComponent(p.desc)}'">
            <div class="image-wrapper">
                <img src="${p.img}" class="product-image" alt="${p.name}">
                <span class="product-badge ${badgeClass}">${badgeText}</span>
                <button class="like-btn ${isLiked(p.name) ? 'liked' : ''}" onclick="event.stopPropagation(); toggleLike('${p.name.replace(/'/g, "\\'")}', this)">
                    <i class="${isLiked(p.name) ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <p class="product-brand">${p.category}</p>
                <h3>${p.name}</h3>
                <div class="rating">
                    <i class="fas fa-star"></i> ${p.rating} <span>(${p.reviews.toLocaleString()})</span>
                </div>
                <div class="product-price">
                    <span class="price-current">${formattedPrice}</span>
                    ${p.originalPrice ? `<span class="price-original">₹${p.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                </div>
                <div class="action-buttons">
                    <button class="btn-add-cart ${isInCart(p.id, p.name) ? 'added' : ''}" onclick="event.stopPropagation(); addToCart('${p.id}', '${p.name.replace(/'/g, "\\'")}', '${formattedPrice}', '${p.img}', this)">
                        <i class="fas ${isInCart(p.id, p.name) ? 'fa-check' : 'fa-shopping-cart'}"></i> ${isInCart(p.id, p.name) ? 'ADDED' : 'ADD'}
                    </button>
                    <button class="btn-buy-now" onclick="event.stopPropagation(); buyNow('${p.id}', '${p.name.replace(/'/g, "\\'")}', '${formattedPrice}', '${p.img}')">
                        <i class="fas fa-bolt"></i> Buy
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderSection(containerId, title, tagline, products, viewAllLink, bg = '#ffffff') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <section class="container" id="section-${containerId.replace('-container', '')}" style="background: ${bg};">
            <div class="section-header">
                <div>
                    <span class="section-tagline">${tagline.toUpperCase()}</span>
                    <h2>${title}</h2>
                </div>
                <a href="${viewAllLink}" class="view-all">View All <i class="fas fa-chevron-right"></i></a>
            </div>
            <div class="product-scroll-container">
                ${products.map(p => renderProductCard(p)).join('')}
            </div>
        </section>
    `;
}

function renderDynamicContent() {
    // 1. Top Deals (Products with originalPrice)
    const topDeals = allProducts.filter(p => p.originalPrice).slice(0, 4);
    renderSection('top-deals-container', "Today's Top Deals", "LIMITED TIME OFFERS", topDeals, "2_Wheelers_AllProducts.html?filter=deals");

    // 2. Best Sellers (High rating/reviews)
    const bestSellers = [...allProducts].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
    renderSection('best-sellers-container', "Best Sellers of the Week", "RIDER FAVORITES", bestSellers, "2_Wheelers_AllProducts.html?filter=featured", "var(--light-green)");

    // 3. Signature Gallery (Featured motorcycles)
    const signatureBikes = allProducts.filter(p => p.category === "Motorcycles").slice(0, 4);
    renderSection('signature-gallery-container', "Motorcycles", "PREMIUM COLLECTION", signatureBikes, "2_Wheelers_AllProducts.html?filter=motorcycle");
    // Explicitly set ID for scrolling from nav
    const sigSection = document.getElementById('section-signature-gallery');
    if (sigSection) sigSection.id = 'sec-motorcycles';

    // 4. ALL Dynamic Categories from Database (Excluding those already rendered)
    const container = document.getElementById('dynamic-categories');
    if (!container) return;
    container.innerHTML = '';

    // Allowed categories that match the filter buttons in AllProducts
    const allowedCategories = [
        'Electric Bikes', 'Electric Scooters', 'Scooters', 'Mountain Bikes', 
        'Road Bikes', 'Cycling Helmets', 'Motorcycle Jackets', 'Motorcycle Gloves', 
        'Motorcycle Boots', 'Protective Gear', 'Bike Lights', 'Cycling Apparel', 
        'Cycling Shoes', 'Kids Gear', 'Bike Tools', 'Panniers & Bags', 
        'Phone Mounts', 'Pedals', 'Chain Care', 'Cycling Sunglasses', 
        'Fenders', 'Racks & Carriers', 'Mirrors', 'Grips & Tape'
    ];

    // Get unique categories that are in the allowed list and not already rendered (Motorcycles)
    const categories = [...new Set(allProducts.map(p => p.category))]
        .filter(cat => cat !== 'Motorcycles' && allowedCategories.includes(cat));

    // Sort them so Bikes come first
    categories.sort((a, b) => {
        const orderA = allowedCategories.indexOf(a);
        const orderB = allowedCategories.indexOf(b);
        return orderA - orderB;
    });

    categories.forEach((cat, index) => {
        const catProducts = allProducts.filter(p => p.category === cat).slice(0, 5);
        if (catProducts.length === 0) return;

        // Mapping of DB categories to AllProducts filter parameters
        const filterMap = {
            'Kids Gear': 'kids',
            'Electric Bikes': 'electric',
            'Electric Scooters': 'electric-scooter',
            'Scooters': 'scooter',
            'Mountain Bikes': 'mountain',
            'Road Bikes': 'road',
            'Cycling Helmets': 'helmet',
            'Motorcycle Jackets': 'jacket',
            'Motorcycle Gloves': 'glove',
            'Motorcycle Boots': 'boot',
            'Protective Gear': 'protective',
            'Bike Lights': 'light',
            'Cycling Apparel': 'apparel',
            'Cycling Shoes': 'shoes',
            'Bike Tools': 'tool',
            'Panniers & Bags': 'bag',
            'Phone Mounts': 'phone',
            'Pedals': 'pedal',
            'Chain Care': 'chain',
            'Cycling Sunglasses': 'sunglasses',
            'Fenders': 'fender',
            'Racks & Carriers': 'rack',
            'Mirrors': 'mirror',
            'Grips & Tape': 'grip'
        };
        const filterVal = filterMap[cat] || cat;

        const sectionId = cat.toLowerCase().replace(/\s+/g, '-');
        const section = document.createElement('section');
        section.className = 'container';
        section.id = `sec-${sectionId}`;
        section.style.background = index % 2 === 0 ? '#ffffff' : 'var(--light-green)';

        section.innerHTML = `
            <div class="section-header">
                <div>
                    <span class="section-tagline">EXPLORE ${cat.toUpperCase()}</span>
                    <h2>${cat}</h2>
                </div>
                <a href="2_Wheelers_AllProducts.html?filter=${encodeURIComponent(filterVal)}" class="view-all">View All <i class="fas fa-chevron-right"></i></a>
            </div>
            <div class="product-scroll-container">
                ${catProducts.map(p => renderProductCard(p)).join('')}
            </div>
        `;
        container.appendChild(section);
    });

    // 5. Final "Explore All" Section
    const allMix = [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 5);
    const finalSec = document.createElement('div');
    finalSec.id = 'sec-shop';
    container.appendChild(finalSec);
    renderSection(finalSec.id, "Explore Our Full Collection", "ALL PRODUCTS", allMix, "2_Wheelers_AllProducts.html", 'var(--light-green)');
}

function buyNow(pId, pName, pPrice, pImg) {
    const numericPrice = parseInt(pPrice.replace(/[^0-9]/g, ''));
    // Direct purchase uses a temp cart for checkout session
    sessionStorage.setItem('um_cart', JSON.stringify([{ id: pId, name: pName, price: numericPrice, image: pImg, quantity: 1 }]));
    window.location.href = '../../templates/payment_gateway.html';
}

function addToCart(pId, pName, pPrice, pImg, btn) {
    const numericPrice = parseInt(pPrice.replace(/[^0-9]/g, ''));
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
            // New signature: addToCart('pId', 'pName', ...)
            const match = onclickAttr.match(/addToCart\('([^']*)',\s*'([^']*)'/);
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

// Add Toast Styles
if (!document.getElementById('dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
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

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderHeroCarousel();
    renderDynamicContent();
    renderBrandSpotlight();
    renderGenreTabs(); // Render dynamic navigation pills
    syncHardcodedButtons();
    syncLikes();
    initSearch(); // Initialize search listeners
    
    // Initialize AOS with premium settings
    if (window.AOS) {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }
});

function initSearch() {
    const searchInputs = ['navSearchInput', 'searchInput'];
    searchInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const query = input.value.trim();
                    if (query) {
                        applyFilter('search', query);
                        // Close search overlay if open
                        const overlay = document.getElementById('searchOverlay');
                        if (overlay) overlay.classList.remove('active');
                        document.getElementById('navBackdrop')?.classList.remove('active');
                    }
                }
            });
        }
    });
}

function applyFilter(type, value) {
    const section = document.getElementById('search-results-section');
    const grid = document.getElementById('search-results-grid');
    const tagline = document.getElementById('search-tagline');
    const title = document.getElementById('search-title');

    if (!section || !grid) return;

    activeFilter = value;
    section.style.display = 'block';

    let results = [];
    if (type === 'search') {
        tagline.innerText = "SEARCH RESULTS";
        title.innerText = `Searching for "${value.toUpperCase()}"`;
        results = allProducts.filter(p =>
            p.name.toLowerCase().includes(value.toLowerCase()) ||
            p.category.toLowerCase().includes(value.toLowerCase()) ||
            p.desc.toLowerCase().includes(value.toLowerCase())
        );
    } else {
        tagline.innerText = "EXPLORE CATEGORY";
        title.innerText = value;
        results = allProducts.filter(p => p.category.toLowerCase() === value.toLowerCase());
    }

    renderFilteredResults(results);

    const offset = section.offsetTop - 150;
    window.scrollTo({ top: offset, behavior: 'smooth' });
}

function renderFilteredResults(products) {
    const grid = document.getElementById('search-results-grid');
    if (!grid) return;

    // Apply Sort
    let sorted = [...products];
    switch (currentSort) {
        case 'price-low': sorted.sort((a, b) => a.price - b.price); break;
        case 'price-high': sorted.sort((a, b) => b.price - a.price); break;
        case 'rating': sorted.sort((a, b) => b.rating - a.rating); break;
        case 'reviews': sorted.sort((a, b) => b.reviews - a.reviews); break;
    }

    grid.innerHTML = sorted.length > 0
        ? sorted.map(p => renderProductCard(p)).join('')
        : `<div style="grid-column:1/-1; text-align:center; padding: 3rem; color: #666;">No products found matching your criteria.</div>`;
}

function clearFilter() {
    const section = document.getElementById('search-results-section');
    if (section) section.style.display = 'none';
    activeFilter = 'all';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initSortDropdown() {
    const trigger = document.getElementById('dropdown-trigger');
    const menu = document.getElementById('dropdown-menu');
    const label = document.getElementById('dropdown-label');
    const backdrop = document.getElementById('dropdown-backdrop');
    if (!trigger || !menu) return;

    trigger.onclick = () => {
        menu.classList.toggle('show');
        backdrop?.classList.toggle('show');
    };

    if (backdrop) backdrop.onclick = () => {
        menu.classList.remove('show');
        backdrop.classList.remove('show');
    };

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.onclick = () => {
            currentSort = item.dataset.value;
            label.innerText = `Sort: ${item.querySelector('span').innerText}`;
            document.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            menu.classList.remove('show');
            backdrop?.classList.remove('show');

            // Re-render search results if open
            if (document.getElementById('search-results-section').style.display !== 'none') {
                applyFilter(activeFilter.includes(' ') ? 'category' : 'search', activeFilter);
            }
        };
    });
}

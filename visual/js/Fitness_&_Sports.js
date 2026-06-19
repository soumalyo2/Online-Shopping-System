// =============================================
// Fitness_&_Sports.js — Hero Carousel + Dynamic Products
// Theme: Green & White (Sporty Brand)
// =============================================

// Hero Carousel Dynamic Data for Fitness & Sports
const heroProducts = [
    { 
        name: "Pro-Series Treadmill Z1", 
        price: "$899.00", 
        tag: "ELITE PERFORMANCE", 
        img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&h=600&fit=crop", 
        link: "Fitness_&_Sports_ProductDetails.html?name=Pro-Series%20Treadmill%20Z1&price=$899.00&img=https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&h=600&fit=crop&cat=Equipment&rating=4.9&reviews=1200&originalPrice=$1200&desc=Commercial-grade%20motor%20and%20advanced%20cushioning%20for%20the%20ultimate%20running%20experience.&badge=Flagship",
        bg: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&h=900&fit=crop')",
        desc: "Push your limits with our most advanced treadmill. Precision engineering for elite athletes."
    },
    { 
        name: "Adjustable Dumbbell Set", 
        price: "$249.00", 
        tag: "TOP RATED", 
        img: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=600&h=600&fit=crop", 
        link: "Fitness_&_Sports_ProductDetails.html?name=Adjustable%20Dumbbell%20Set&price=$249.00&img=https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=600&h=600&fit=crop&cat=Strength&rating=4.8&reviews=3400&originalPrice=$349&desc=Replace%2015%20sets%20of%20weights%20with%20one%20compact%2C%20easy-to-use%20system.&badge=Best%20Seller",
        bg: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&h=900&fit=crop')",
        desc: "Space-saving design meets heavy-duty performance. The only weights you'll ever need for your home gym."
    },
    { 
        name: "Premium Yoga Mat Pro", 
        price: "$75.00", 
        tag: "MINDFULNESS", 
        img: "https://images.unsplash.com/photo-1592432678886-dd0452fba3d1?q=80&w=600&h=600&fit=crop", 
        link: "Fitness_&_Sports_ProductDetails.html?name=Premium%20Yoga%20Mat%20Pro&price=$75.00&img=https://images.unsplash.com/photo-1592432678886-dd0452fba3d1?q=80&w=600&h=600&fit=crop&cat=Yoga&rating=5.0&reviews=850&originalPrice=$95&desc=Extra%20grip%20and%20superior%20cushioning%20for%20your%20daily%20practice.&badge=Eco-Friendly",
        bg: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&h=900&fit=crop')",
        desc: "Sustainable materials and non-slip surface. Elevate your yoga journey with pro-grade equipment."
    }
];

// DOM Elements
const carouselInner = document.getElementById('hero-carousel-inner');
const carouselDots = document.getElementById('hero-carousel-nav');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const progressFill = document.getElementById('carousel-progress-fill');

let currentHeroSlide = 0;
let carouselTimer;
const SLIDE_DURATION = 5000; // 5 seconds auto-slide (gives user time to interact)

// ---- Swipe / Drag State ----
let isDragging = false;
let dragStartX = 0;
let dragCurrentX = 0;
let dragStartTime = 0;
const SWIPE_THRESHOLD = 50;       // min px to count as swipe
const VELOCITY_THRESHOLD = 0.3;   // px/ms — fast flick triggers even short swipes

// Render Hero Carousel
function renderHeroCarousel() {
    if (!carouselInner || !carouselDots) return;

    heroProducts.forEach((product, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = product.bg;
        slide.style.backgroundSize = 'cover';
        slide.style.backgroundPosition = 'center';

        slide.innerHTML = `
            <div class="hero-content">
                <div class="hero-text">
                    <span class="category-tag">${product.tag}</span>
                    <h1>Train Like A <span style="color:var(--accent-green)">Champion</span></h1>
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

    if (prevBtn) prevBtn.onclick = () => { prevHeroSlide(); };
    if (nextBtn) nextBtn.onclick = () => { nextHeroSlide(); };

    // Attach touch + mouse swipe handlers
    initSwipeHandlers();

    startCarouselAutoPlay();
}

// Show Slide — circular loop via modulo
function showHeroSlide(index, direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');

    // Wrap index for circular loop
    index = ((index % heroProducts.length) + heroProducts.length) % heroProducts.length;

    if (index === currentHeroSlide) return;

    slides.forEach(s => {
        s.classList.remove('next-slide', 'prev-slide', 'active');
        s.style.transform = '';
        s.style.opacity = '';
    });
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

// Auto-Play with Progress Bar
function startCarouselAutoPlay() {
    clearInterval(carouselTimer);

    if (progressFill) {
        progressFill.style.transition = 'none';
        progressFill.style.width = '0%';
        progressFill.offsetHeight; // force reflow
        progressFill.style.transition = `width ${SLIDE_DURATION}ms linear`;
        progressFill.style.width = '100%';
    }

    carouselTimer = setInterval(nextHeroSlide, SLIDE_DURATION);
}

function pauseCarouselAutoPlay() {
    clearInterval(carouselTimer);
    if (progressFill) {
        progressFill.style.transition = 'none';
        progressFill.style.width = progressFill.offsetWidth + 'px'; // freeze
    }
}

// =============================================
// Touch + Mouse Swipe / Drag Handlers
// =============================================
function initSwipeHandlers() {
    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) return;

    // Prevent image dragging interfering
    carousel.addEventListener('dragstart', e => e.preventDefault());

    // --- Touch Events ---
    carousel.addEventListener('touchstart', onDragStart, { passive: true });
    carousel.addEventListener('touchmove', onDragMove, { passive: false });
    carousel.addEventListener('touchend', onDragEnd);
    carousel.addEventListener('touchcancel', onDragEnd);

    // --- Mouse Events ---
    carousel.addEventListener('mousedown', onDragStart);
    carousel.addEventListener('mousemove', onDragMove);
    carousel.addEventListener('mouseup', onDragEnd);
    carousel.addEventListener('mouseleave', onDragEnd);
}

function getClientX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
}

function onDragStart(e) {
    // Don't hijack button clicks
    if (e.target.closest('.carousel-control, .carousel-dot, .btn-light, .add-to-cart')) return;

    isDragging = true;
    dragStartX = getClientX(e);
    dragCurrentX = dragStartX;
    dragStartTime = Date.now();

    pauseCarouselAutoPlay();

    // Add grabbing cursor
    document.querySelector('.hero-carousel').style.cursor = 'grabbing';

    // Show active slide immediately for drag feedback
    const activeSlide = document.querySelectorAll('.carousel-slide')[currentHeroSlide];
    if (activeSlide) {
        activeSlide.style.transition = 'none';
    }
}

function onDragMove(e) {
    if (!isDragging) return;

    // Prevent vertical scroll while swiping horizontally
    if (e.cancelable && e.touches) e.preventDefault();

    dragCurrentX = getClientX(e);
    const deltaX = dragCurrentX - dragStartX;

    // Visual drag feedback — shift the active slide
    const activeSlide = document.querySelectorAll('.carousel-slide')[currentHeroSlide];
    if (activeSlide) {
        const dampedDelta = deltaX * 0.4; // Dampen for smooth feel
        activeSlide.style.transform = `translateX(${dampedDelta}px)`;
        // Slight opacity reduction while dragging
        activeSlide.style.opacity = `${1 - Math.abs(deltaX) / 1500}`;
    }
}

function onDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;

    document.querySelector('.hero-carousel').style.cursor = '';

    const deltaX = dragCurrentX - dragStartX;
    const elapsed = Date.now() - dragStartTime;
    const velocity = Math.abs(deltaX) / elapsed; // px/ms

    // Reset the visual offset on the current slide
    const activeSlide = document.querySelectorAll('.carousel-slide')[currentHeroSlide];
    if (activeSlide) {
        activeSlide.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        activeSlide.style.transform = '';
        activeSlide.style.opacity = '';
    }

    // Determine swipe direction — threshold or velocity based
    if (Math.abs(deltaX) > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
        if (deltaX < 0) {
            // Swiped LEFT → go to NEXT slide (circular)
            nextHeroSlide();
        } else {
            // Swiped RIGHT → go to PREV slide (circular)
            prevHeroSlide();
        }
    } else {
        // Didn't swipe far enough — snap back and resume auto-play
        startCarouselAutoPlay();
    }
}

// =============================================
// Dynamic Product Categories — Fitness & Sports
// =============================================

function renderProductCard(p) {
    const isItemLiked = isLiked(p.id);
    const inCart = isInCart(p.id, p.name);
    
    // Format price if needed
    const priceDisplay = typeof p.price === 'number' ? '$' + p.price.toFixed(2) : p.price;
    const origPriceDisplay = p.originalPrice ? (typeof p.originalPrice === 'number' ? '$' + p.originalPrice.toFixed(2) : p.originalPrice) : '';

    return `
    <div class="product-card" data-aos="fade-up" onclick="window.location.href='../template/Fitness_&_Sports_ProductDetails.html?id=${p.id}&name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(priceDisplay)}&img=${encodeURIComponent(p.img)}&cat=${encodeURIComponent(p.category)}&rating=${p.rating}&reviews=${p.reviews}&originalPrice=${encodeURIComponent(origPriceDisplay)}&desc=${encodeURIComponent(p.desc || '')}&badge=${encodeURIComponent(p.badge || '')}'">
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
    renderSection('top-deals-container', 'Action-Packed Deals', 'LIMITED TIME OFFERS', topDeals, '../template/Fitness_&_Sports_AllProducts.html', '#f8fff9');

    // Best Sellers
    const bestSellers = allProducts.filter(p => p.rating >= 4.8).slice(0, 4);
    renderSection('best-sellers-container', 'Best Sellers of the Week', 'ATHLETE FAVORITES', bestSellers, '../template/Fitness_&_Sports_AllProducts.html', 'var(--light-green)');

    // Premium Collection
    const premium = allProducts.filter(p => p.price > 100).slice(0, 4);
    renderSection('signature-gallery-container', 'Pro Gear Gallery', 'PREMIUM COLLECTION', premium, '../template/Fitness_&_Sports_AllProducts.html', '#ffffff');

    // Dynamic Categories
    const categoriesContainer = document.getElementById('dynamic-categories');
    if (categoriesContainer) {
        const fitnessCategories = [
            { name: "Gym & Strength", tagline: "BUILT DIFFERENT", filter: "gym" },
            { name: "Yoga & Pilates", tagline: "FIND YOUR FLOW", filter: "yoga" },
            { name: "Outdoor Sports", tagline: "PLAY THE GAME", filter: "outdoor" },
            { name: "Combat Sports", tagline: "FIGHT FOR IT", filter: "combat" },
            { name: "Aquatic Fitness", tagline: "DIVE IN", filter: "aquatic" },
            { name: "Recovery Gear", tagline: "RESTORE BALANCE", filter: "recovery" }
        ];

        let catHtml = '';
        fitnessCategories.forEach((catObj, index) => {
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
                            <a href="../template/Fitness_&_Sports_AllProducts.html?filter=${catObj.filter}" class="view-all">View All <i class="fas fa-chevron-right"></i></a>
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

function toggleLike(pId, btn) {
    let liked = JSON.parse(localStorage.getItem('fs_liked') || '[]');
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
    localStorage.setItem('fs_liked', JSON.stringify(liked));
}

function isLiked(pId) {
    const liked = JSON.parse(localStorage.getItem('fs_liked') || '[]');
    return liked.includes(pId);
}

function syncLikes() {
    const liked = JSON.parse(localStorage.getItem('fs_liked') || '[]');
    document.querySelectorAll('.like-btn').forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes('toggleLike')) {
            const match = onclickAttr.match(/toggleLike\('([^']+)'/);
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

// Initialize on DOM ready
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

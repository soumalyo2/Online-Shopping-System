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
const fitnessCategories = [
    { name: "Gym & Strength", tagline: "BUILT DIFFERENT" },
    { name: "Yoga & Pilates", tagline: "FIND YOUR FLOW" },
    { name: "Outdoor Sports", tagline: "PLAY THE GAME" },
    { name: "Combat Sports", tagline: "FIGHT FOR IT" },
    { name: "Aquatic Fitness", tagline: "DIVE IN" },
    { name: "Recovery Gear", tagline: "RESTORE BALANCE" }
];

const basicProducts = [
    { name: "Eco Yoga Block", price: "$15.00", img: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=400&h=300&fit=crop" },
    { name: "Performance Football", price: "$45.00", img: "https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?q=80&w=400&h=300&fit=crop" },
    { name: "Boxing Gloves Pro", price: "$85.00", img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=400&h=300&fit=crop" },
    { name: "Speed Jump Rope", price: "$12.50", img: "https://images.unsplash.com/photo-1590502160462-094ba45283fc?q=80&w=400&h=300&fit=crop" }
];

const badges = [
    { text: "Best Seller", class: "badge-best" },
    { text: "Today's Deal", class: "badge-deal" },
    { text: "New", class: "badge-new" },
    { text: "Trending", class: "badge-best" }
];

function renderDynamicCategories() {
    const container = document.getElementById('dynamic-categories');
    if (!container) return;

    fitnessCategories.forEach((catObj, index) => {
        const section = document.createElement('section');
        section.className = 'container';
        // Alternate white and light-green backgrounds
        section.style.background = index % 2 === 0 ? '#ffffff' : 'var(--light-green)';

        section.innerHTML = `
            <div class="section-header">
                <div>
                    <span class="section-tagline">${catObj.tagline}</span>
                    <h2>${catObj.name}</h2>
                </div>
                <a href="Fitness_&_Sports_AllProducts.html" class="view-all">View All <i class="fas fa-chevron-right"></i></a>
            </div>
            <div class="product-scroll-container">
                ${basicProducts.map(p => {
            const b = badges[Math.floor(Math.random() * badges.length)];
            return `
                    <div class="product-card" onclick="window.location.href='Fitness_&_Sports_ProductDetails.html?name=${encodeURIComponent(catObj.name + ' ' + p.name)}&price=${encodeURIComponent(p.price)}&img=${encodeURIComponent(p.img)}&cat=${encodeURIComponent(catObj.name)}&badge=${encodeURIComponent(b.text)}'">
                        <div class="image-wrapper">
                            <img src="${p.img}" class="product-image" alt="${p.name}">
                            <span class="product-badge ${b.class}">${b.text}</span>
                        </div>
                        <div class="product-info">
                            <h3>${p.name}</h3>
                            <p class="product-price">${p.price}</p>
                            <button class="add-to-cart" onclick="event.stopPropagation();">Add to Cart</button>
                        </div>
                    </div>
                    `;
        }).join('')}
            </div>
        `;
        container.appendChild(section);
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    renderHeroCarousel();
    renderDynamicCategories();
});

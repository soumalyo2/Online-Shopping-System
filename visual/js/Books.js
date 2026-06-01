// =============================================
// Books.js — Hero Carousel + Dynamic Genre Sections
// Theme: Standardized UrbanMart Nature/Green
// =============================================

// Hero Carousel Dynamic Data
const heroProducts = [
    {
        name: "The Midnight Library",
        price: "₹1,519",
        tag: "BESTSELLER",
        img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&h=600&fit=crop",
        link: "Books_ProductDetails.html?name=The Midnight Library&price=₹1,519&img=https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&h=600&fit=crop&cat=Fiction&rating=4.9&reviews=42000&originalPrice=₹2,319&desc=A dazzling novel about all the choices that go into a life well lived.&badge=Bestseller",
        bg: "linear-gradient(rgba(45, 90, 39, 0.85), rgba(27, 48, 34, 0.85)), url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&h=900&fit=crop')",
        desc: "Between life and death there is a library. Every book contains a different version of your life. Discover the #1 bestselling phenomenon."
    },
    {
        name: "Atomic Habits",
        price: "₹1,359",
        tag: "SELF-IMPROVEMENT",
        img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&h=600&fit=crop",
        link: "Books_ProductDetails.html?name=Atomic Habits&price=₹1,359&img=https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&h=600&fit=crop&cat=Self-Help&rating=4.8&reviews=85000&originalPrice=₹2,239&desc=The life-changing million-copy bestseller. Build good habits, break bad ones.&badge=Phenomenon",
        bg: "linear-gradient(rgba(45, 90, 39, 0.85), rgba(27, 48, 34, 0.85)), url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1600&h=900&fit=crop')",
        desc: "Tiny changes, remarkable results. Learn the proven system that millions have used to transform their daily routines forever."
    },
    {
        name: "Dune",
        price: "₹1,199",
        tag: "SCI-FI EPIC",
        img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&h=600&fit=crop",
        link: "Books_ProductDetails.html?name=Dune&price=₹1,199&img=https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&h=600&fit=crop&cat=Sci-Fi&rating=4.9&reviews=67000&originalPrice=₹1,999&desc=The monumental sci-fi saga. A stunning blend of adventure and mysticism.&badge=Legendary",
        bg: "linear-gradient(rgba(45, 90, 39, 0.85), rgba(27, 48, 34, 0.85)), url('https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1600&h=900&fit=crop')",
        desc: "The greatest science fiction novel of all time. A masterwork of imagination set on the desert planet Arrakis."
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
const SLIDE_DURATION = 5000;

// Render Hero Carousel
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
                    <h1>Your Next Great <span style="color:var(--accent-green)">Read</span> Awaits</h1>
                    <p>${product.desc}</p>
                </div>
                <div class="hero-product-display">
                    <div class="hero-card">
                        <img src="${product.img}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="hero-price">${formatPrice(product.price)}</p>
                        <button class="btn-light" onclick="window.location.href='${product.link}'">VIEW BOOK</button>
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

    startCarouselAutoPlay();
}

function showHeroSlide(index, direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');

    index = ((index % heroProducts.length) + heroProducts.length) % heroProducts.length;
    if (index === currentHeroSlide) return;

    slides.forEach(s => s.classList.remove('active', 'next-slide', 'prev-slide'));
    dots.forEach(d => d.classList.remove('active'));

    const activeSlide = slides[index];
    activeSlide.classList.add('active');
    activeSlide.classList.add(direction === 'next' ? 'next-slide' : 'prev-slide');
    dots[index].classList.add('active');
    currentHeroSlide = index;

    startCarouselAutoPlay();
}

function nextHeroSlide() { showHeroSlide(currentHeroSlide + 1, 'next'); }
function prevHeroSlide() { showHeroSlide(currentHeroSlide - 1, 'prev'); }

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

// Master database loaded from Books_Data.js
// Building genreData dynamically from allProducts
const genreData = {
    horror: {
        tagline: "SPINE-CHILLING READS",
        title: "Horror",
        products: allProducts.filter(p => p.category === "Horror").slice(0, 4)
    },
    autobiography: {
        tagline: "REAL STORIES, REAL LIVES",
        title: "Autobiography",
        products: allProducts.filter(p => p.category === "Autobiography").slice(0, 4)
    },
    drama: {
        tagline: "STORIES THAT MOVE YOU",
        title: "Drama",
        products: allProducts.filter(p => p.category === "Drama").slice(0, 5)
    },
    scifi: {
        tagline: "BEYOND IMAGINATION",
        title: "Sci-Fi",
        id: "sci-fi",
        products: allProducts.filter(p => p.category === "Sci-Fi").slice(0, 4)
    },
    fantasy: {
        tagline: "WORLDS OF WONDER",
        title: "Fantasy",
        id: "fantasy",
        products: allProducts.filter(p => p.category === "Fantasy").slice(0, 4)
    },
    romance: {
        tagline: "LOVE IN EVERY PAGE",
        title: "Romance",
        products: allProducts.filter(p => p.category === "Romance").slice(0, 4)
    },
    mystery: {
        tagline: "UNRAVEL THE TRUTH",
        title: "Mystery",
        products: allProducts.filter(p => p.category === "Mystery").slice(0, 4)
    },
    selfhelp: {
        tagline: "TRANSFORM YOUR LIFE",
        title: "Self-Help",
        products: allProducts.filter(p => p.category === "Self-Help").slice(0, 4)
    },
    history: {
        tagline: "LESSONS FROM THE PAST",
        title: "History",
        products: allProducts.filter(p => p.category === "History").slice(0, 4)
    },
    youngadult: {
        tagline: "YOUTH & ADVENTURE",
        title: "Young Adult",
        id: "young-adult",
        products: allProducts.filter(p => p.category === "Young Adult").slice(0, 4)
    },
    poetry: {
        tagline: "ART IN VERSE",
        title: "Poetry",
        products: allProducts.filter(p => p.category === "Poetry").slice(0, 4)
    },
    nonfiction: {
        tagline: "KNOWLEDGE & TRUTH",
        title: "Non-Fiction",
        id: "non-fiction",
        products: allProducts.filter(p => p.category === "Non-Fiction").slice(0, 4)
    },
    classic: {
        tagline: "TIMELESS MASTERPIECES",
        title: "Classics",
        id: "classic",
        products: allProducts.filter(p => p.category === "Classic").slice(0, 4)
    },
    manga: {
        tagline: "VISUAL STORYTELLING",
        title: "Manga",
        products: allProducts.filter(p => p.category === "Manga").slice(0, 4)
    }
};

// Map display names to the key for cleaner look
Object.keys(genreData).forEach(key => {
    // Ensure img property is present for the card renderer
    genreData[key].products = genreData[key].products.map(p => ({
        ...p,
        img: p.img || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&h=300&fit=crop"
    }));
});

function scrollToGenre(genreId) {
    if (genreId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const target = document.getElementById(`genre-${genreId}`);
    if (target) {
        const offset = target.offsetTop - 120; // Adjusted for sticky nav
        window.scrollTo({ top: offset, behavior: 'smooth' });
    }

    // Update active state in nav
    document.querySelectorAll('.genre-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('onclick').includes(`'${genreId}'`));
    });
}

// Sync genre tabs with the dynamic category-nav-bar position
window.addEventListener('scroll', () => {
    const genreTabs = document.querySelector('.genre-tabs');
    const catBar = document.getElementById('categoryNavBar');
    if (!genreTabs || !catBar) return;

    // Get current top of cat bar (which is updated by navbar.js)
    const catBarTop = parseInt(window.getComputedStyle(catBar).top);
    const catBarHeight = catBar.getBoundingClientRect().height;

    // Set genre tabs to be directly below it
    genreTabs.style.top = `${catBarTop + catBarHeight}px`;
});


const badgesPool = [
    { text: "Bestseller", class: "badge-best" },
    { text: "Trending", class: "badge-deal" },
    { text: "New", class: "badge-new" }
];

function renderDynamicGenres() {
    const container = document.getElementById('dynamic-categories');
    if (!container) return;

    Object.keys(genreData).forEach((key, index) => {
        const genre = genreData[key];
        const sectionId = genre.id || key;
        const section = document.createElement('section');
        section.className = 'container';
        section.id = `genre-${sectionId}`;
        section.style.background = index % 2 === 0 ? 'var(--book-warm-bg)' : 'var(--book-section-alt)';

        section.innerHTML = `
            <div class="section-header">
                <div>
                    <span class="section-tagline">${genre.tagline}</span>
                    <h2>${genre.title}</h2>
                </div>
                <a href="Books_AllProducts.html?cat=${encodeURIComponent(genre.title)}" class="view-all">View All <i class="fas fa-chevron-right"></i></a>
            </div>
            <div class="product-scroll-container">
                ${genre.products.map(p => {
            const b = badgesPool[Math.floor(Math.random() * badgesPool.length)];
            return `
                    <div class="product-card" onclick="window.location.href='Books_ProductDetails.html?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(p.price)}&img=${encodeURIComponent(p.img)}&cat=${encodeURIComponent(genre.title)}&badge=${encodeURIComponent(b.text)}'">
                        <div class="image-wrapper">
                            <img src="${p.img}" class="product-image" alt="${p.name}">
                            <span class="product-badge ${b.class}">${b.text}</span>
                            <button class="like-btn ${isLiked(p.name) ? 'liked' : ''}" onclick="event.stopPropagation(); toggleLike('${p.name.replace(/'/g, "\\'")}', this)">
                                <i class="${isLiked(p.name) ? 'fas' : 'far'} fa-heart"></i>
                            </button>
                        </div>
                        <div class="product-info">
                            <h3>${p.name}</h3>
                            <p class="author-name" style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.5rem;">by ${p.author}</p>
                            <div class="rating">
                                <i class="fas fa-star" style="color:#f1c40f"></i> 4.8 <span>(1.2k)</span>
                            </div>
                            <div class="product-price">
                                <span class="price-current">${formatPrice(p.price)}</span>
                            </div>
                            <div class="action-buttons">
                                <button class="btn-add-cart ${isInCart(p.name) ? 'added' : ''}" onclick="event.stopPropagation(); addToCart('${p.name.replace(/'/g, "\\'")}', '${p.price}', '${p.img}', this)">
                                    <i class="fas ${isInCart(p.name) ? 'fa-check' : 'fa-shopping-cart'}"></i> ${isInCart(p.name) ? 'Added' : 'Add'}
                                </button>
                                <button class="btn-buy-now" onclick="event.stopPropagation(); buyNow('${p.name.replace(/'/g, "\\'")}', '${p.price}', '${p.img}')">
                                    <i class="fas fa-bolt"></i> Buy
                                </button>
                            </div>
                        </div>
                    </div>`;
        }).join('')}
            </div>
        `;
        container.appendChild(section);
    });
}

// Authors
const featuredAuthors = [
    { name: "Stephen King", genre: "Horror / Thriller", bio: "The master of fear. Over 350 million copies sold worldwide.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop" },
    { name: "Michelle Obama", genre: "Autobiography", bio: "Former First Lady. Her memoir broke all publishing records.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&fit=crop" },
    { name: "Colleen Hoover", genre: "Romance", bio: "Social media phenomenon and queen of contemporary romance.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop" }
];

function renderFeaturedAuthors() {
    const grid = document.getElementById('author-spotlight-grid');
    if (!grid) return;
    featuredAuthors.forEach(author => {
        const card = document.createElement('div');
        card.className = 'author-card';
        card.innerHTML = `
            <img src="${author.img}" alt="${author.name}" class="author-avatar">
            <h4>${author.name}</h4>
            <div class="author-genre">${author.genre}</div>
            <p class="author-bio">${author.bio}</p>
        `;
        grid.appendChild(card);
    });
}

// Logic Functions
function toggleLike(pName, btn) {
    let liked = JSON.parse(localStorage.getItem('books_liked') || '[]');
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
    localStorage.setItem('books_liked', JSON.stringify(liked));
}

// --- Helper Functions ---
function formatPrice(p) {
    if (!p) return '';
    if (typeof p === 'string' && p.includes('₹')) return p;
    const num = parseInt(String(p).replace(/[^0-9]/g, '')) || 0;
    return '₹' + num.toLocaleString('en-IN');
}

function isInCart(pName) {
    let cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
    return cart.some(item => item.name === pName);
}

function isLiked(pName) {
    const liked = JSON.parse(localStorage.getItem('books_liked') || '[]');
    return liked.includes(pName);
}

function addToCart(pName, pPrice, pImg, btn) {
    const numericPrice = parseInt(String(pPrice).replace(/[^0-9]/g, ''));
    let cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');

    const existingIndex = cart.findIndex(item => item.name === pName);

    if (existingIndex > -1) {
        // Remove from cart
        cart.splice(existingIndex, 1);
        localStorage.setItem('pbssd_cart', JSON.stringify(cart));
        showToast(`${pName} removed from cart!`, false);

        if (btn) {
            btn.classList.remove('added');
            btn.innerHTML = `<i class="fas fa-shopping-cart"></i> Add`;
        }
    } else {
        // Add to cart
        cart.push({
            name: pName,
            price: numericPrice,
            image: pImg,
            quantity: 1
        });
        localStorage.setItem('pbssd_cart', JSON.stringify(cart));
        showToast(`${pName} added to cart!`, true);

        if (btn) {
            btn.classList.add('added');
            btn.innerHTML = `<i class="fas fa-check"></i> Added`;
        }
    }

    if (window.updateCartBadge) window.updateCartBadge();
    syncHardcodedButtons(); // Sync all other instances on the page
}

function showToast(msg, isAdd = true) {
    const toast = document.createElement('div');
    toast.style.cssText = `position:fixed;bottom:20px;right:20px;background:${isAdd ? '#2d5a27' : '#e11d48'};color:white;padding:1rem 2rem;border-radius:12px;z-index:10000;box-shadow:0 10px 30px rgba(0,0,0,0.2);animation:slideIn 0.3s ease-out;`;
    toast.innerHTML = `<i class="fas ${isAdd ? 'fa-check-circle' : 'fa-info-circle'}"></i> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderHeroCarousel();
    renderFeaturedAuthors();
    renderDynamicGenres();
    syncHardcodedButtons();
    syncLikes();
});

function syncLikes() {
    const liked = JSON.parse(localStorage.getItem('books_liked') || '[]');
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

function syncHardcodedButtons() {
    const cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
    // Target both standard and carousel-style cart buttons
    document.querySelectorAll('.btn-add-cart, .add-to-cart').forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        if (onclickAttr && (onclickAttr.includes('addToCart') || onclickAttr.includes('quickAdd'))) {
            const match = onclickAttr.match(/(?:addToCart|quickAdd)\('([^']+)'/);
            if (match && match[1]) {
                const pName = match[1];
                const inCart = cart.some(item => item.name === pName);
                btn.classList.toggle('added', inCart);

                // Keep the icon and text consistent with the design
                if (inCart) {
                    btn.innerHTML = `<i class="fas fa-check"></i> Added`;
                } else {
                    const isCarousel = btn.classList.contains('add-to-cart');
                    btn.innerHTML = isCarousel ? `<i class="fas fa-plus"></i> ADD` : `<i class="fas fa-shopping-cart"></i> Add`;
                }
            }
        }
    });
}

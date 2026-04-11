// =============================================
// Fitness_&_Sports_ProductDetails.js
// Features: Dynamic stars, like button, badge,
// discount %, description, image gallery, related sports
// =============================================

// --- URL Parameters ---
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name') || 'Fitness Gear';
const price = urlParams.get('price') || '$0.00';
const img = urlParams.get('img') || 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=400&h=300&fit=crop';
const cat = urlParams.get('cat') || 'Fitness & Sports';
const rating = parseFloat(urlParams.get('rating')) || 4.8;
const reviews = parseInt(urlParams.get('reviews')) || 1200;
const originalPrice = urlParams.get('originalPrice') || '';
const desc = urlParams.get('desc') || 'High-performance gear designed for your active lifestyle.';
const badge = urlParams.get('badge') || '';

// --- Update Basic UI ---
document.getElementById('product-title').innerText = name;
document.getElementById('product-price').innerText = price;
document.getElementById('product-img').src = img;
document.getElementById('category-name').innerText = cat;
document.title = name + " - Fitness & Sports";

// --- Dynamic Star Rating ---
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

const ratingContainer = document.getElementById('rating-container');
if (ratingContainer) {
    ratingContainer.innerHTML = `
        ${renderStars(rating)}
        <span>(${rating} • ${reviews.toLocaleString()} Reviews)</span>
    `;
}

// --- Dynamic Description ---
const descEl = document.getElementById('product-desc');
if (descEl && desc) {
    descEl.innerText = desc;
}

// --- Original Price & Discount Badge ---
if (originalPrice) {
    const origEl = document.getElementById('original-price');
    const discEl = document.getElementById('discount-badge');

    // Parse prices for discount calculation
    const currentNum = parseFloat(price.replace(/[^0-9.]/g, ''));
    const origNum = parseFloat(originalPrice.replace(/[^0-9.]/g, ''));

    if (origEl) {
        origEl.textContent = originalPrice;
        origEl.style.display = 'inline';
    }

    if (discEl && origNum > currentNum) {
        const discountPct = Math.round((1 - currentNum / origNum) * 100);
        if (discountPct > 0) {
            discEl.textContent = discountPct + '% OFF';
            discEl.style.display = 'inline-flex';
        }
    }
}

// --- Product Badge ---
const badgeEl = document.getElementById('product-badge');
if (badgeEl && badge) {
    badgeEl.textContent = badge;
    badgeEl.style.display = 'inline-block';
}

// --- Like / Wishlist Button ---
let likedProducts = JSON.parse(localStorage.getItem('fs_liked') || '[]');

function isLiked(productName) {
    return likedProducts.includes(productName);
}

function toggleLike(productName) {
    const btn = document.getElementById('like-btn');
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

const likeBtn = document.getElementById('like-btn');
if (likeBtn) {
    // Set initial state
    if (isLiked(name)) {
        likeBtn.classList.add('liked');
        likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
    }
    likeBtn.addEventListener('click', () => toggleLike(name));
}

// --- Image Gallery Logic ---
const mainImg = document.getElementById('product-img');
const thumbList = document.getElementById('thumb-list');

const galleryImages = [
    img,
    "https://images.unsplash.com/photo-1517130591727-4422e661be48?q=80&w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1590502160462-094ba45283fc?q=80&w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=400&h=300&fit=crop"
];

if (thumbList && mainImg) {
    galleryImages.forEach((src, idx) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.className = `thumbnail ${idx === 0 ? 'active' : ''}`;
        thumb.onclick = () => {
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = src;
                mainImg.style.opacity = '1';
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            }, 300);
        };
        thumbList.appendChild(thumb);
    });
}

// --- Generate 20 Dynamic Related Sports Products ---
const sportsRelatedPool = [
    { name: "Speed Jump Rope", price: "$12.50", img: "https://images.unsplash.com/photo-1590502160462-094ba45283fc?q=80&w=400&h=300&fit=crop", rating: 4.6, reviews: 1540 },
    { name: "Boxing Gloves Pro", price: "$85.00", img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=400&h=300&fit=crop", rating: 4.8, reviews: 2100 },
    { name: "Eco Yoga Block", price: "$15.00", img: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=400&h=300&fit=crop", rating: 4.5, reviews: 420 },
    { name: "Resistance Bands", price: "$35.00", img: "https://images.unsplash.com/photo-1517130591727-4422e661be48?q=80&w=400&h=300&fit=crop", rating: 4.4, reviews: 980 }
];

const scroll = document.getElementById('related-scroll');
if (scroll) {
    for (let i = 0; i < 20; i++) {
        const baseProduct = sportsRelatedPool[i % sportsRelatedPool.length];
        const p = {
            name: i < sportsRelatedPool.length ? baseProduct.name : `${baseProduct.name} v${Math.floor(i / sportsRelatedPool.length) + 1}`,
            price: baseProduct.price,
            img: baseProduct.img,
            rating: baseProduct.rating,
            reviews: baseProduct.reviews
        };

        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.minWidth = '240px';
        card.onclick = () => window.location.href = `Fitness_&_Sports_ProductDetails.html?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(p.price)}&img=${encodeURIComponent(p.img)}&cat=Related&rating=${p.rating}&reviews=${p.reviews}`;
        
        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${p.img}" alt="${p.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <div class="related-stars">${renderStars(p.rating)}</div>
                <p class="product-price">${p.price}</p>
            </div>
        `;
        scroll.appendChild(card);
    }
}

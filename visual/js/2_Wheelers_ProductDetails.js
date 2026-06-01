// =============================================
// 2_Wheelers_ProductDetails.js
// Features: Dynamic stars, like button, badge,
// discount %, description — matching AllProducts
// =============================================

// --- URL Parameters ---
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id') || '';
const name = urlParams.get('name') || 'Premium Bike';
const price = urlParams.get('price') || '₹79,920';
const img = urlParams.get('img') || 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400&h=300&fit=crop';
const cat = urlParams.get('cat') || '2 Wheelers';
const rating = parseFloat(urlParams.get('rating')) || 4.7;
const reviews = parseInt(urlParams.get('reviews')) || 1850;
const originalPrice = urlParams.get('originalPrice') || '';
const desc = urlParams.get('desc') || '';
const badge = urlParams.get('badge') || '';

// --- Update Basic UI ---
document.getElementById('product-title').innerText = name;
document.getElementById('product-price').innerText = price;
document.getElementById('product-img').src = img;
document.getElementById('category-name').innerText = cat;
document.title = name + " - 2 Wheelers";

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
let likedProducts = JSON.parse(localStorage.getItem('2w_liked') || '[]');

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
    localStorage.setItem('2w_liked', JSON.stringify(likedProducts));
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
    "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400&h=300&fit=crop"
];

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

// --- Dynamic Related Products from Database ---
function renderRelatedProducts() {
    const scroll = document.getElementById('related-scroll');
    if (!scroll || typeof allProducts === 'undefined') return;
    
    // Find products in the same category or just random if none found
    let related = allProducts.filter(p => p.category === cat && p.name !== name).slice(0, 10);
    if (related.length < 5) {
        related = [...related, ...allProducts.filter(p => p.category !== cat).slice(0, 10 - related.length)];
    }
    
    scroll.innerHTML = '';
    related.forEach(p => {
        const numericPrice = typeof p.price === 'number' ? p.price : parseInt(p.price.toString().replace(/[^0-9]/g, ''));
        const formattedPrice = '₹' + numericPrice.toLocaleString('en-IN');
        const badgeText = p.badge || "New";
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.minWidth = '240px';
        card.setAttribute('data-aos', 'fade-up');
        card.onclick = () => {
            window.location.href = `2_Wheelers_ProductDetails.html?id=${p.id}&name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(formattedPrice)}&img=${encodeURIComponent(p.img)}&cat=${encodeURIComponent(p.category)}&badge=${encodeURIComponent(badgeText)}&rating=${p.rating}&reviews=${p.reviews}${p.originalPrice ? '&originalPrice=' + encodeURIComponent('₹' + p.originalPrice.toLocaleString('en-IN')) : ''}&desc=${encodeURIComponent(p.desc)}`;
        };
        
        const inCart = isInCart(p.id, p.name);
        card.dataset.id = p.id;
        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${p.img}" alt="${p.name}" class="product-image">
            </div>
            <div class="product-info">
                <p class="product-brand" style="font-size: 0.7rem; margin-bottom: 4px;">${p.category}</p>
                <h3>${p.name}</h3>
                <div class="related-stars">${renderStars(p.rating)}</div>
                <p class="product-price">${formattedPrice}</p>
                <div class="action-buttons">
                    <button class="btn-add-cart ${inCart ? 'added' : ''}" onclick="event.stopPropagation(); addToCart('${p.id}', '${p.name.replace(/'/g, "\\'")}', '${formattedPrice}', '${p.img}', this)">
                        <i class="fas ${inCart ? 'fa-check' : 'fa-shopping-cart'}"></i> ${inCart ? 'ADDED' : 'ADD'}
                    </button>
                </div>
            </div>
        `;
        scroll.appendChild(card);
    });
}

function isInCart(pId, pName) {
    const cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
    return cart.some(item => (pId && item.id === pId) || (!pId && item.name === pName));
}

// Call it
renderRelatedProducts();

// --- Cart Functionality ---
function addToCart(pId = id, pName = name, pPrice = price, pImg = img, btn = null) {
    const numericPrice = parseInt(pPrice.replace(/[^0-9]/g, ''));
    let cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
    
    // Check by ID or Name
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
    updateCartButtonState();
}

function updateCartButtonState() {
    const cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
    const cartIds = cart.map(item => item.id);
    const cartNames = cart.map(item => item.name);
    
    // 1. Update Main Button
    const mainBtn = document.querySelector('.action-btns .btn-add-cart');
    const mainInCart = cart.some(item => (id && item.id === id) || (!id && item.name === name));
    if (mainBtn) {
        if (mainInCart) {
            mainBtn.innerHTML = '<i class="fas fa-check"></i> ADDED';
            mainBtn.classList.add('added');
        } else {
            mainBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> ADD';
            mainBtn.classList.remove('added');
        }
    }

    // 2. Update Related Product Buttons
    document.querySelectorAll('#related-scroll .btn-add-cart').forEach(btn => {
        const card = btn.closest('.product-card');
        if (!card) return;
        const pId = card.dataset.id;
        const pName = card.querySelector('h3').innerText;
        
        const inCart = (pId && cartIds.includes(pId)) || (!pId && cartNames.includes(pName));
        
        if (inCart) {
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
        bottom: 30px;
        right: 30px;
        background: ${isAdd ? 'var(--primary-green)' : '#e11d48'};
        color: white;
        padding: 1.2rem 2.5rem;
        border-radius: 15px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.25);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    toast.innerHTML = `<i class="fas ${isAdd ? 'fa-check-circle' : 'fa-info-circle'}" style="font-size: 1.2rem;"></i> ${msg}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = 'all 0.4s ease-in';
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// --- Buy Now Functionality ---
function buyNow(pName, pPrice, pImg) {
    const numericPrice = parseInt(pPrice.replace(/[^0-9]/g, ''));
    const product = {
        id: id,
        name: pName,
        price: numericPrice,
        image: pImg,
        quantity: 1
    };
    sessionStorage.setItem('um_cart', JSON.stringify([product]));
    window.location.href = '../../templates/payment_gateway.html';
}

// Wire the buttons
document.addEventListener('DOMContentLoaded', () => {
    const buyBtn = document.querySelector('.btn-buy');
    if (buyBtn) {
        buyBtn.onclick = () => buyNow(name, price, img);
    }
    
    const addBtn = document.querySelector('.btn-add-cart');
    if (addBtn) {
        addBtn.onclick = () => addToCart();
    }
    
    updateCartButtonState();
    
    // Initialize AOS
    if (window.AOS) {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true
        });
    }
});

// =============================================
// Books_ProductDetails.js
// Features: Dynamic stars, like button, badge,
// discount %, description, author — Books theme
// =============================================

// --- URL Parameters ---
// --- URL Parameters ---
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name') || 'A Great Book';
const rawPrice = urlParams.get('price') || '1199';
const img = urlParams.get('img') || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&h=300&fit=crop';
const cat = urlParams.get('cat') || 'Books';
const rating = parseFloat(urlParams.get('rating')) || 4.7;
const reviews = parseInt(urlParams.get('reviews')) || 1850;
const originalPrice = urlParams.get('originalPrice') || '';
const desc = urlParams.get('desc') || '';
const badge = urlParams.get('badge') || '';
const author = urlParams.get('author') || '';

function formatPrice(p) {
    if (!p) return '';
    if (typeof p === 'string' && p.includes('₹')) return p;
    const num = parseInt(String(p).replace(/[^0-9]/g, '')) || 0;
    return '₹' + num.toLocaleString('en-IN');
}

const price = formatPrice(rawPrice);

// --- Update Basic UI ---
document.getElementById('product-title').innerText = name;
document.getElementById('product-price').innerText = price;
document.getElementById('product-img').src = img;
document.getElementById('category-name').innerText = cat;
document.title = name + " — BookShelf";

// --- Author ---
const authorEl = document.getElementById('book-author');
if (authorEl && author) {
    authorEl.innerText = 'by ' + author;
}

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
let likedProducts = JSON.parse(localStorage.getItem('books_liked') || '[]');

function isLiked(productName) {
    return likedProducts.includes(productName);
}

function toggleLike(productName, btn) {
    // If no specific button passed, try to find the main one
    const targetBtn = btn || document.getElementById('like-btn');
    const idx = likedProducts.indexOf(productName);
    
    if (idx > -1) {
        likedProducts.splice(idx, 1);
        if (targetBtn) {
            targetBtn.classList.remove('liked');
            targetBtn.innerHTML = '<i class="far fa-heart"></i>';
        }
    } else {
        likedProducts.push(productName);
        if (targetBtn) {
            targetBtn.classList.add('liked');
            targetBtn.innerHTML = '<i class="fas fa-heart"></i>';
        }
    }
    localStorage.setItem('books_liked', JSON.stringify(likedProducts));
}

const mainLikeBtn = document.getElementById('like-btn');
if (mainLikeBtn) {
    if (isLiked(name)) {
        mainLikeBtn.classList.add('liked');
        mainLikeBtn.innerHTML = '<i class="fas fa-heart"></i>';
    }
    mainLikeBtn.addEventListener('click', () => toggleLike(name, mainLikeBtn));
}

// --- Image Gallery Logic ---
const mainImg = document.getElementById('product-img');
const thumbList = document.getElementById('thumb-list');

const galleryImages = [
    img,
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=400&h=300&fit=crop"
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

// --- Generate 20 Dynamic Related Book Products ---
const relatedProductsPool = [
    { name: "The Midnight Library", author: "Matt Haig", price: "₹1,519", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&h=300&fit=crop", rating: 4.9, reviews: 42000 },
    { name: "Atomic Habits", author: "James Clear", price: "₹1,359", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&h=300&fit=crop", rating: 4.8, reviews: 85000 },
    { name: "Sapiens", author: "Yuval Noah Harari", price: "₹1,519", img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400&h=300&fit=crop", rating: 4.8, reviews: 72000 },
    { name: "Dune", author: "Frank Herbert", price: "₹1,199", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&h=300&fit=crop", rating: 4.9, reviews: 67000 },
    { name: "Gone Girl", author: "Gillian Flynn", price: "₹1,199", img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&h=300&fit=crop", rating: 4.7, reviews: 89000 },
    { name: "Becoming", author: "Michelle Obama", price: "₹1,279", img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400&h=300&fit=crop", rating: 4.9, reviews: 54000 },
    { name: "Normal People", author: "Sally Rooney", price: "₹1,279", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&h=300&fit=crop", rating: 4.6, reviews: 38000 },
    { name: "It Ends with Us", author: "Colleen Hoover", price: "₹1,279", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&h=300&fit=crop", rating: 4.6, reviews: 120000 },
    { name: "1984", author: "George Orwell", price: "₹959", img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&h=300&fit=crop", rating: 4.8, reviews: 105000 },
    { name: "The Hobbit", author: "J.R.R. Tolkien", price: "₹1,039", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&h=300&fit=crop", rating: 4.9, reviews: 89000 }
];

// --- Populate Related Products (Readers also enjoyed) ---
const scroll = document.getElementById('related-scroll');
if (scroll) {
    for (let i = 0; i < 20; i++) {
        const baseProduct = relatedProductsPool[i % relatedProductsPool.length];
        const p = {
            name: i < relatedProductsPool.length ? baseProduct.name : `${baseProduct.name} v${Math.floor(i / relatedProductsPool.length) + 1}`,
            author: baseProduct.author,
            price: baseProduct.price,
            img: baseProduct.img,
            rating: baseProduct.rating,
            reviews: baseProduct.reviews
        };

        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.minWidth = '240px';
        card.onclick = () => window.location.href = `Books_ProductDetails.html?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(p.price)}&img=${encodeURIComponent(p.img)}&cat=Related&rating=${p.rating}&reviews=${p.reviews}&author=${encodeURIComponent(p.author)}`;

        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${p.img}" alt="${p.name}" class="product-image">
                <button class="pd-like-btn ${isLiked(p.name) ? 'liked' : ''}" style="position: absolute; top: 10px; right: 10px; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;" onclick="event.stopPropagation(); toggleLike('${p.name.replace(/'/g, "\\'")}', this)">
                    <i class="${isLiked(p.name) ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="related-author">by ${p.author}</p>
                <div class="related-stars">${renderStars(p.rating)}</div>
                <p class="product-price">${formatPrice(p.price)}</p>
                <button class="add-to-cart ${isInCart(p.name) ? 'added' : ''}" onclick="event.stopPropagation(); quickAdd('${p.name.replace(/'/g, "\\'")}', '${p.price}', '${p.img}', this)">
                    <i class="fas ${isInCart(p.name) ? 'fa-check' : 'fa-plus'}"></i> ${isInCart(p.name) ? 'Added' : 'ADD'}
                </button>
            </div>
        `;
        scroll.appendChild(card);
    }
}

// --- Populate Bought Together ---
const boughtTogetherScroll = document.getElementById('bought-together-scroll');
if (boughtTogetherScroll) {
    // Pick different ones for variety
    const boughtTogetherPool = [...relatedProductsPool].reverse();
    for (let i = 0; i < 10; i++) {
        const p = boughtTogetherPool[i % boughtTogetherPool.length];
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.minWidth = '220px';
        card.onclick = () => window.location.href = `Books_ProductDetails.html?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(p.price)}&img=${encodeURIComponent(p.img)}&cat=Bought Together&rating=${p.rating}&reviews=${p.reviews}&author=${encodeURIComponent(p.author)}`;

        card.innerHTML = `
            <div class="image-wrapper" style="height: 180px; position: relative;">
                <img src="${p.img}" alt="${p.name}" class="product-image">
                <button class="pd-like-btn ${isLiked(p.name) ? 'liked' : ''}" style="position: absolute; top: 10px; right: 10px; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;" onclick="event.stopPropagation(); toggleLike('${p.name.replace(/'/g, "\\'")}', this)">
                    <i class="${isLiked(p.name) ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <h3 style="font-size: 0.95rem;">${p.name}</h3>
                <p class="related-author">by ${p.author}</p>
                <p class="product-price" style="font-size: 1.1rem;">${formatPrice(p.price)}</p>
                <button class="add-to-cart ${isInCart(p.name) ? 'added' : ''}" style="padding: 6px 12px; font-size: 0.75rem;" onclick="event.stopPropagation(); quickAdd('${p.name.replace(/'/g, "\\'")}', '${p.price}', '${p.img}', this)">
                    <i class="fas ${isInCart(p.name) ? 'fa-check' : 'fa-plus'}"></i> ${isInCart(p.name) ? 'Added' : 'ADD'}
                </button>
            </div>
        `;
        boughtTogetherScroll.appendChild(card);
    }
}

// Quick Add function for carousels
window.quickAdd = (pName, pPrice, pImg, btn) => {
    addToCart(pName, pPrice, pImg, btn);
};

// --- Cart Functionality ---
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
        // Remove from cart
        cart.splice(existingIndex, 1);
        localStorage.setItem('pbssd_cart', JSON.stringify(cart));
        showToast(`${pName} removed from cart!`, false);
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

function syncHardcodedButtons() {
    const cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
    // Main button
    const mainBtn = document.querySelector('.btn-add-cart');
    if (mainBtn && name === urlParams.get('name')) { // Only if it's the current main product
        const inCart = cart.some(item => item.name === name);
        mainBtn.classList.toggle('added', inCart);
        mainBtn.innerHTML = inCart ? `<i class="fas fa-check"></i> Added` : `<i class="fas fa-shopping-cart"></i> ADD TO CART`;
    }

    // Related carousel buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes('quickAdd')) {
            const match = onclickAttr.match(/quickAdd\('([^']+)'/);
            if (match && match[1]) {
                const pName = match[1];
                const inCart = cart.some(item => item.name === pName);
                btn.classList.toggle('added', inCart);
                btn.innerHTML = inCart ? `<i class="fas fa-check"></i> Added` : `<i class="fas fa-plus"></i> ADD`;
            }
        }
    });
}

function syncLikes() {
    const liked = JSON.parse(localStorage.getItem('books_liked') || '[]');
    // Main like btn
    const mainLike = document.getElementById('like-btn');
    if (mainLike) {
        const isMainLiked = liked.includes(name);
        mainLike.classList.toggle('liked', isMainLiked);
        mainLike.innerHTML = isMainLiked ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    }

    // Carousel like buttons
    document.querySelectorAll('.pd-like-btn').forEach(btn => {
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

// Attach to buttons
document.addEventListener('DOMContentLoaded', () => {
    syncHardcodedButtons();
    syncLikes();
    
    document.querySelector('.btn-buy')?.addEventListener('click', () => buyNow(name, price, img));
    document.querySelector('.btn-add-cart')?.addEventListener('click', (e) => addToCart(name, price, img, e.currentTarget));
});

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

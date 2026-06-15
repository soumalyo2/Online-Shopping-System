// =============================================
// grocery_productDetails.js
// Handles dynamic population and interactions
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    
    const name = params.get('name');
    const price = params.get('price');
    const img = params.get('img');
    const sub = params.get('sub');
    const badge = params.get('badge');

    if (name) {
        document.getElementById('product-title').innerText = name;
        document.title = `${name} - sprout. Details`;
    }
    if (price) document.getElementById('product-price').innerText = price;
    if (img) document.getElementById('product-img').src = img;
    if (sub) document.getElementById('spec-weight').innerText = sub;
    
    if (badge) {
        const badgeEl = document.getElementById('product-badge');
        badgeEl.innerText = badge;
        badgeEl.style.display = 'block';
    }

    // --- WISHLIST SYNC ---
    const likeBtn = document.getElementById('like-btn');
    let wishlist = JSON.parse(localStorage.getItem('pbssd_wishlist') || '[]');
    
    const checkWishlist = () => {
        const isLiked = wishlist.some(item => item.name === name);
        likeBtn.classList.toggle('liked', isLiked);
        likeBtn.innerHTML = isLiked ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    };
    checkWishlist();

    likeBtn.addEventListener('click', () => {
        const index = wishlist.findIndex(item => item.name === name);
        if (index === -1) {
            wishlist.push({ name, price, img });
            Swal.fire({ title: 'Saved!', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500, icon: 'success' });
        } else {
            wishlist.splice(index, 1);
        }
        localStorage.setItem('pbssd_wishlist', JSON.stringify(wishlist));
        checkWishlist();
    });

    // --- ADD TO CART SYNC ---
    const atcBtn = document.getElementById('pd-atc-btn');
    atcBtn.addEventListener('click', () => {
        if (!localStorage.getItem('pbssd_user')) {
            Swal.fire({
                title: 'Login Required',
                text: 'Please sign in to add items to your bag.',
                icon: 'info',
                confirmButtonColor: '#5A8A5A'
            });
            return;
        }

        // IndexedDB Logic for persistence (matching grocery.html - Version 2)
        const request = indexedDB.open('PBSSDCartDB', 2);
        
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('cart_state')) db.createObjectStore('cart_state');
            if (!db.objectStoreNames.contains('cart_items')) {
                db.createObjectStore('cart_items', { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = (e) => {
            const db = e.target.result;
            const tx = db.transaction(['cart_items'], 'readwrite');
            const store = tx.objectStore('cart_items');
            
            const getReq = store.getAll();
            getReq.onsuccess = () => {
                const items = getReq.result;
                const existingItem = items.find(i => i.name === name);
                
                if (existingItem) {
                    existingItem.quantity = (existingItem.quantity || 1) + 1;
                    store.put(existingItem);
                } else {
                    store.add({ name, price, img, quantity: 1, timestamp: Date.now() });
                }
                
                // Visual Feedback
                atcBtn.innerHTML = '<i class="fas fa-check"></i> ADDED';
                atcBtn.style.background = '#5A8A5A';
                atcBtn.style.color = '#fff';
                
                Swal.fire({
                    title: 'Added to bag!',
                    text: `${name} is ready for checkout.`,
                    icon: 'success', 
                    toast: true, 
                    position: 'top-end',
                    showConfirmButton: false, 
                    timer: 1500
                });

                setTimeout(() => {
                    atcBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> ADD TO BAG';
                    atcBtn.style.background = '';
                    atcBtn.style.color = '';
                }, 2000);
            };

            tx.oncomplete = () => {
                // Update cart state count
                const countTx = db.transaction(['cart_items'], 'readonly');
                const countStore = countTx.objectStore('cart_items');
                const getAllReq = countStore.getAll();
                getAllReq.onsuccess = () => {
                    const total = getAllReq.result.reduce((acc, item) => acc + (item.quantity || 1), 0);
                    const finalTx = db.transaction(['cart_state'], 'readwrite');
                    finalTx.objectStore('cart_state').put(total, 'count');
                };

                // Update legacy localStorage
                let lsCart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
                const exLs = lsCart.find(i => i.name === name);
                if (exLs) exLs.quantity = (exLs.quantity || 1) + 1;
                else lsCart.push({ id: Date.now(), name, price, image: img, quantity: 1 });
                localStorage.setItem('pbssd_cart', JSON.stringify(lsCart));
            };
        };
    });
});
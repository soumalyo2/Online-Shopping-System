// =============================================
// beauty_data.js — Master Product Database
// shared across beauty.html and beauty_allProducts.html
// =============================================

// Hero Slider Products (6 slides)
const heroSlides = [
    {
        id: 1,
        title: "Glow <em>Naturally</em>,<br>Shine Confidently",
        category: "New Skincare Collection",
        icon: "bi-stars",
        desc: "Science-backed, plant-powered formulas that transform skin from within. Radiance you can feel every day.",
        ctas: [
            { text: "Shop Skincare", href: "#products", icon: "bi-stars" },
            { text: "Explore Trends", href: "#trending", icon: "fa-light" }
        ],
        stats: [
            { number: "50", unit: "K+", label: "Happy Clients" },
            { number: "200", unit: "+", label: "Products" },
            { number: "98", unit: "%", label: "Natural" }
        ],
        featured: [
            { label: "Best Seller", name: "Velvet Serum", rating: "★★★★★ 4.9", img: "static/assets/Velvet Serum.jpg" },
            { label: "New Drop", name: "Rose Elixir", rating: "★★★★★ 5.0", img: "static/assets/Rose Elixir.jpg" }
        ]
    },
    {
        id: 2,
        title: "Bold <em>Colour</em>,<br>Pure Confidence",
        category: "Summer Makeup Edit",
        icon: "bi-palette",
        desc: "Pigment-rich, long-lasting makeup made from the purest botanical pigments. Express yourself freely.",
        ctas: [
            { text: "Shop Makeup", href: "#products", icon: "bi-brush" },
            { text: "All Looks", href: "#categories", icon: "fa-light" }
        ],
        stats: [
            { number: "120", unit: "+", label: "Shades" },
            { number: "24", unit: "H", label: "Long Wear" },
            { number: "100", unit: "%", label: "Vegan" }
        ],
        featured: [
            { label: "Trending", name: "Velvet Lip", rating: "★★★★★ 4.8", img: "static/assets/Velvet Lip.jpg" },
            { label: "Fan Fave", name: "Cloud Foundation", rating: "★★★★★ 4.9", img: "static/assets/Cloud Foundation.jpg" }
        ]
    },
    {
        id: 3,
        title: "Silky <em>Smooth</em>,<br>Salon Worthy",
        category: "Luxury Haircare Range",
        icon: "bi-wind",
        desc: "Argan, keratin and botanical repair treatments that restore brilliance and strength to every strand.",
        ctas: [
            { text: "Shop Haircare", href: "#products", icon: "bi-wind" },
            { text: "See Reviews", href: "#trending", icon: "fa-light" }
        ],
        stats: [
            { number: "56", unit: "+", label: "Hair Products" },
            { number: "0", unit: "%", label: "Sulfates" },
            { number: "30", unit: "K+", label: "Reviews" }
        ],
        featured: [
            { label: "Top Rated", name: "Argan Elixir", rating: "★★★★★ 5.0", img: "static/assets/Argan Elixir.jpg" },
            { label: "New", name: "Keratin Mask", rating: "★★★★★ 4.9", img: "static/assets/Keratin Mask.jpg" }
        ]
    },
    {
        id: 4,
        title: "Scents That <em>Linger</em>,<br>Memories That Stay",
        category: "Signature Fragrances",
        icon: "bi-gem",
        desc: "Handcrafted in Grasse, our perfumes tell stories of rose gardens, warm amber and fresh ocean air.",
        ctas: [
            { text: "Shop Fragrance", href: "#products", icon: "bi-magic" },
            { text: "Find Your Scent", href: "#categories", icon: "fa-light" }
        ],
        stats: [
            { number: "38", unit: "+", label: "Fragrances" },
            { number: "8", unit: "H+", label: "Longevity" },
            { number: "100", unit: "%", label: "Cruelty-Free" }
        ],
        featured: [
            { label: "Iconic", name: "Santal Bloom", rating: "★★★★★ 5.0", img: "static/assets/Santal Bloom.jpg" },
            { label: "Limited Ed", name: "White Tea EDP", rating: "★★★★★ 4.9", img: "static/assets/White Tea EDP.jpg" }
        ]
    },
    {
        id: 5,
        title: "Total <em>Body</em>,<br>Ultimate Comfort",
        category: "Organic Body Care",
        icon: "bi-droplet",
        desc: "Nourish your skin from head to toe with our ultra-hydrating body butters and revitalizing sea salt scrubs.",
        ctas: [
            { text: "Shop Body Care", href: "#products", icon: "bi-water" },
            { text: "Daily Rituals", href: "#trending", icon: "fa-light" }
        ],
        stats: [
            { number: "45", unit: "+", label: "Body Products" },
            { number: "100", unit: "%", label: "Organic" },
            { number: "24", unit: "H", label: "Hydration" }
        ],
        featured: [
            { label: "Eco Friendly", name: "Shea Butter", rating: "★★★★★ 4.9", img: "static/assets/Shea Butter.jpg" },
            { label: "Refreshing", name: "Sea Salt Scrub", rating: "★★★★★ 5.0", img: "static/assets/Sea Salt Scrub.jpg" }
        ]
    },
    {
        id: 6,
        title: "Master <em>Tools</em>,<br>Perfect Results",
        category: "Premium Beauty Tools",
        icon: "bi-lightning-charge",
        desc: "Elevate your routine with professional-grade tools designed to enhance absorption and define your natural features.",
        ctas: [
            { text: "Shop Tools", href: "#products", icon: "bi-tools" },
            { text: "How-to Guide", href: "#categories", icon: "fa-light" }
        ],
        stats: [
            { number: "25", unit: "+", label: "Beauty Tools" },
            { number: "Pro", unit: "", label: "Grade" },
            { number: "Restorative", unit: "", label: "Wellness" }
        ],
        featured: [
            { label: "Restorative", name: "Jade Roller", rating: "★★★★★ 4.9", img: "static/assets/Jade Roller.jpg" },
            { label: "Essential", name: "Silk Eye Mask", rating: "★★★★★ 5.0", img: "static/assets/Silk Eye Mask.jpg" }
        ]
    }
];

// Featured Products (12 cards)
const featuredProducts = [
    { name: "Velvet Rose Serum", price: 48, originalPrice: 65, img: "Velvet Serum.jpg", category: "Skincare", badge: "New", badgeClass: "bn", rating: 5, reviews: 2418 },
    { name: "Golden Glow Moisturiser", price: 38, img: "Golden Glow Moisturiser.jpg", category: "Skincare", badge: "🔥 Hot", badgeClass: "bh", rating: 5, reviews: 1892 },
    { name: "Petal Lip & Blush Duo", price: 52, originalPrice: 65, img: "Velvet Lip.jpg", category: "Makeup", badge: "−20%", badgeClass: "bs", rating: 4, reviews: 986 },
    { name: "Emerald Hair Elixir", price: 42, img: "Argan Elixir.jpg", category: "Haircare", badge: "New", badgeClass: "bn", rating: 5, reviews: 3021 },
    { name: "Lavender Cloud Cream", price: 55, originalPrice: 65, img: "Lavender Cloud Cream.jpg", category: "Skincare", badge: "⭐ VIP", badgeClass: "bv", rating: 5, reviews: 2108 },
    { name: "Santal Bloom EDP", price: 88, img: "Santal Bloom.jpg", category: "Fragrance", badge: "⭐ Top Pick", badgeClass: "bh", rating: 5, reviews: 1654 },
    { name: "Glow Drops SPF 50", price: 36, img: "White Tea EDP.jpg", category: "Skincare", badge: "New", badgeClass: "bn", rating: 5, reviews: 877 },
    { name: "Micellar Bubble Cleanser", price: 28, originalPrice: 33, img: "Sea Salt Scrub.jpg", category: "Skincare", badge: "−15%", badgeClass: "bs", rating: 4, reviews: 742 },
    { name: "Retinol Night Repair", price: 62, img: "Keratin Mask.jpg", category: "Skincare", badge: "🔥 Hot", badgeClass: "bh", rating: 5, reviews: 1340 },
    { name: "Blur & Perfect Primer", price: 44, originalPrice: 55, img: "Jade Roller.jpg", category: "Makeup", badge: "⭐ VIP", badgeClass: "bv", rating: 5, reviews: 2570 },
    { name: "Hydra-Boost Hair Mask", price: 34, img: "Silk Eye Mask.jpg", category: "Haircare", badge: "New", badgeClass: "bn", rating: 5, reviews: 980 },
    { name: "Diamond Mist Body Spray", price: 45, originalPrice: 60, img: "Diamond Mist Body Spray.jpg", category: "Fragrance", badge: "−25%", badgeClass: "bs", rating: 5, reviews: 1120 }
];

// Categories (4 cards)
const categories = [
    { name: "Skincare", count: 84, img: "static/assets/skincare.avif" },
    { name: "Makeup", count: 112, img: "static/assets/makeup.jpg" },
    { name: "Haircare", count: 56, img: "static/assets/hair car.jpg" },
    { name: "Fragrance", count: 38, img: "static/assets/frangance.jpg" }
];

// Trending Products (10 carousel slides)
const trendingProducts = [
    { name: "Glow Essence Drops", price: 58, img: "Cloud Foundation.jpg", category: "Skincare", badge: "#1 Best Seller", badgeIcon: "bi-fire", rating: 5, reviews: 4200 },
    { name: "Honey Butter Eye Cream", price: 44, img: "Rose Elixir.jpg", category: "Skincare", badge: "Staff Pick", badgeIcon: "bi-star", rating: 4.9, reviews: 2800 },
    { name: "Velvet Matte Lipstick", price: 32, img: "Velvet Lip.jpg", category: "Makeup", badge: "Iconic", badgeIcon: "bi-trophy", rating: 4.8, reviews: 3500 },
    { name: "Argan Repair Treatment", price: 46, img: "Argan Elixir.jpg", category: "Haircare", badge: "Eco Choice", badgeIcon: "bi-flower1", rating: 4.9, reviews: 1900 },
    { name: "White Tea Parfum", price: 98, img: "White Tea EDP.jpg", category: "Fragrance", badge: "Luxe", badgeIcon: "bi-gem", rating: 5, reviews: 1200 },
    { name: "Illuminating Highlighter", price: 39, img: "Cloud Foundation.jpg", category: "Makeup", badge: "Trending", badgeIcon: "bi-lightning-charge", rating: 4.9, reviews: 2100 },
    { name: "Peptide Night Cream", price: 72, img: "Keratin Mask.jpg", category: "Skincare", badge: "Night Hero", badgeIcon: "bi-moon", rating: 5, reviews: 3300 },
    { name: "12-Pan Eyeshadow Palette", price: 65, img: "Santal Bloom.jpg", category: "Makeup", badge: "Colour Pop", badgeIcon: "bi-palette", rating: 4.8, reviews: 4700 },
    { name: "HA Plumping Toner", price: 36, img: "Sea Salt Scrub.jpg", category: "Skincare", badge: "Hydration+", badgeIcon: "bi-droplet", rating: 4.9, reviews: 1600 },
    { name: "Vitamin C Brightening Kit", price: 85, img: "Jade Roller.jpg", category: "Skincare", badge: "Clean Beauty", badgeIcon: "bi-stars", rating: 5, reviews: 5100 }
];

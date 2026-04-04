const categories = [
    'Health & Wellness', 'Beauty & Personal Care', 'Pet Supplies', 'Baby & Kids', 
    'Office & Stationery', 'Home Appliances', 'Smart Home & IoT', 'Footwear', 
    'Jewelry & Watches', 'Groceries & Gourmet Food', 'Bags & Luggage', 
    'Musical Instruments', 'Gardening & Outdoor', 'Industrial & Scientific (B2B)', 
    'Digital Products & Services'
];

const productPool = [
    { name: 'Multivitamins', price: '₹1,200', img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500' },
    { name: 'Face Serum', price: '₹899', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500' },
    { name: 'Dog Food', price: '₹2,500', img: 'https://images.unsplash.com/photo-1589924691106-906f13979416?w=500' },
    { name: 'Baby Monitor', price: '₹4,500', img: 'https://images.unsplash.com/photo-1555252333-978fead06d0c?w=500' },
    { name: 'Notebook Set', price: '₹599', img: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500' },
    { name: 'Air Purifier', price: '₹12,999', img: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=500' },
    { name: 'Smart Bulb', price: '₹999', img: 'https://images.unsplash.com/photo-1550524513-317059df8c52?w=500' },
    { name: 'Running Shoes', price: '₹3,200', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
    { name: 'Smartwatch', price: '₹5,499', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
    { name: 'Organic Quinoa', price: '₹450', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500' },
    { name: 'Travel Suitcase', price: '₹7,500', img: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=500' },
    { name: 'Acoustic Guitar', price: '₹6,800', img: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500' },
    { name: 'Indoor Planter', price: '₹1,299', img: 'https://images.unsplash.com/photo-1485955900106-19499164c88b?w=500' },
    { name: 'Power Drill', price: '₹4,200', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500' },
    { name: 'Software License', price: '₹2,999', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500' }
];

const products = [];
for (let i = 0; i < 60; i++) {
    const template = productPool[i % productPool.length];
    products.push({
        id: i,
        name: `${template.name} v${i}`,
        section: categories[i % 6],
        price: template.price,
        rating: Math.floor(Math.random() * 2) + 4,
        description: 'This is a premium product curated with high quality materials. It comes with a 1-year manufacturer warranty and a 30-day return policy.',
        image: template.img
    });
}
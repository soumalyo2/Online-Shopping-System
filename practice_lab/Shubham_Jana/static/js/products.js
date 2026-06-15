const categories = [
    'Grocery', 'Fashion', 'Mobiles', 'Beauty', 'Electronics',
    'Home', 'Appliances', 'Toys', 'Food', 'Auto',
    'Books', 'Furniture', 'Sports', 'Medicines'
];

// ═══════════════════════════════════════════════════════════════
// Fully hand-curated catalog — every product is unique
// ═══════════════════════════════════════════════════════════════
const _catalog = {

// ── Grocery ────────────────────────────────────────────────────
'Grocery': [
    { name: 'Organic Quinoa — 1 kg',           price: '₹449',    rating: 5, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500', desc: 'USDA-certified organic white quinoa. Gluten-free superfood, high in protein.' },
    { name: 'Cold-Pressed Olive Oil 500 ml',   price: '₹899',    rating: 5, img: 'https://images.unsplash.com/photo-1474979266404-7eaabf005b15?w=500', desc: 'First cold-pressed extra virgin olive oil from Andalusia.' },
    { name: 'Himalayan Pink Salt — 1 kg',      price: '₹199',    rating: 4, img: 'https://images.unsplash.com/photo-1518110925495-5fe2c8e5e981?w=500', desc: '100 % natural Himalayan rock salt, rich in 84 trace minerals.' },
    { name: 'Organic Raw Honey — 500 g',       price: '₹599',    rating: 5, img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500', desc: 'Unprocessed wildflower honey with pollen. No additives, no heating.' },
    { name: 'Basmati Rice — Aged 2 yr, 5 kg',  price: '₹749',    rating: 4, img: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500', desc: 'Extra-long grain aged basmati. Aromatic and fluffy when cooked.' },
    { name: 'Dry Fruits Mix — Premium 500 g',  price: '₹999',    rating: 5, img: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=500', desc: 'Almonds, cashews, walnuts, pistachios and raisins. No salt, no oil.' },
    { name: 'Italian Pasta Variety Pack',      price: '₹549',    rating: 4, img: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=500', desc: 'Penne, fusilli, spaghetti and farfalle. Durum wheat semolina, 4 × 250 g.' },
    { name: 'Assorted Exotic Tea Box (50 bags)',price: '₹699',   rating: 5, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500', desc: 'Gift box with 10 flavours: Earl Grey, Jasmine, Matcha, Chai Masala & more.' },
    { name: 'Matcha Green Tea Powder 100 g',   price: '₹799',    rating: 4, img: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500', desc: 'Ceremonial-grade Uji matcha from Japan. Stone-ground, vibrant green.' },
    { name: 'Artisan Dark Chocolate 72 %',     price: '₹349',    rating: 4, img: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=500', desc: 'Single-origin Ecuadorian cacao bar. Vegan, sugar-free, monk fruit sweetened.' },
],

// ── Fashion ────────────────────────────────────────────────────
'Fashion': [
    { name: 'Slim Fit Linen Shirt — Sky Blue',  price: '₹1,499', rating: 5, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500', desc: 'Breathable pure linen shirt with button-down collar. Perfect for summer.' },
    { name: 'High-Waist Wide Leg Jeans',        price: '₹1,999', rating: 4, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500', desc: 'Relaxed wide-leg denim in vintage wash. 100 % cotton, non-stretch.' },
    { name: 'Printed Floral Maxi Dress',        price: '₹2,499', rating: 5, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', desc: 'Flowing georgette maxi dress with tropical floral print and tie waist.' },
    { name: 'Classic Polo T-Shirt — Navy',      price: '₹799',   rating: 4, img: 'https://images.unsplash.com/photo-1625910513413-5fc2600fff9b?w=500', desc: 'Piqué cotton polo with ribbed collar and two-button placket.' },
    { name: 'Leather Belt — Reversible',        price: '₹999',   rating: 4, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', desc: 'Genuine leather reversible belt (black/brown) with brushed steel buckle.' },
    { name: 'Embroidered Kurta Set — Festive',  price: '₹3,499', rating: 5, img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500', desc: 'Silk-blend kurta with chikankari embroidery, pajama and dupatta set.' },
    { name: 'Oversized Hoodie — Charcoal',      price: '₹1,299', rating: 4, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500', desc: '360 gsm French terry hoodie with kangaroo pocket and drop shoulders.' },
    { name: 'Aviator Sunglasses — Gold Frame',  price: '₹1,799', rating: 5, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500', desc: 'Polarised UV400 aviators with gold metal frame and gradient brown lenses.' },
    { name: 'Cotton Chinos — Olive Green',      price: '₹1,199', rating: 4, img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500', desc: 'Stretch cotton chinos with tapered fit and comfortable flex waistband.' },
    { name: 'Silk Saree — Kanjivaram Style',    price: '₹5,999', rating: 5, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500', desc: 'Art silk saree with traditional zari border and contrast pallu. Blouse included.' },
],

// ── Mobiles ────────────────────────────────────────────────────
'Mobiles': [
    { name: 'Flagship 5G Phone — 256 GB',       price: '₹49,999', rating: 5, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', desc: '6.7" AMOLED 120 Hz, Snapdragon 8 Gen 3, 50 MP triple camera, 5000 mAh.' },
    { name: 'Mid-Range 5G — 128 GB',            price: '₹18,999', rating: 4, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500', desc: '6.5" FHD+ 90 Hz display, Dimensity 7200, 64 MP camera, fast charge.' },
    { name: 'Budget Smartphone 4G — 64 GB',     price: '₹8,999',  rating: 4, img: 'https://images.unsplash.com/photo-1580910051074-3eb694886f50?w=500', desc: '6.4" HD+ display, dual SIM, 13 MP camera, 5000 mAh battery.' },
    { name: 'Wireless Earbuds — ANC Pro',       price: '₹4,999',  rating: 5, img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=500', desc: 'Active noise cancellation with 30 hr battery, IPX5, low-latency game mode.' },
    { name: 'Phone Case — Rugged Armor',        price: '₹599',    rating: 4, img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500', desc: 'Military-grade drop protection with textured grip and raised camera ring.' },
    { name: '65 W GaN Charger — USB-C',         price: '₹1,999',  rating: 5, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500', desc: 'Ultra-compact GaN charger with PD 3.0, charges laptop + phone simultaneously.' },
    { name: 'Foldable Flip Phone — 512 GB',     price: '₹79,999', rating: 5, img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500', desc: '6.7" foldable AMOLED, Snapdragon 8 Gen 3, flex mode, 50 MP camera.' },
    { name: 'Tempered Glass Screen Guard',      price: '₹299',    rating: 4, img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500', desc: '9H hardness, anti-fingerprint, edge-to-edge coverage, easy install kit.' },
    { name: 'Power Bank — 20,000 mAh',          price: '₹1,499',  rating: 4, img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500', desc: '22.5 W fast charge, USB-C PD, LED indicator, slim aluminium body.' },
    { name: 'Smartwatch — AMOLED 1.4"',         price: '₹5,499',  rating: 5, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', desc: 'Always-on AMOLED with SpO2, GPS, 5 ATM water resistance, 14-day battery.' },
],

// ── Beauty ─────────────────────────────────────────────────────
'Beauty': [
    { name: 'Vitamin C Brightening Serum',      price: '₹899',   rating: 5, img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500', desc: '20 % Vitamin C + Hyaluronic Acid serum for radiant, even-toned skin.' },
    { name: 'Retinol Night Cream 50 ml',        price: '₹1,349', rating: 4, img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500', desc: 'Encapsulated retinol + peptides for fine-line reduction while you sleep.' },
    { name: 'Charcoal Peel-Off Mask',           price: '₹499',   rating: 4, img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500', desc: 'Activated charcoal mask that unclogs pores and removes blackheads instantly.' },
    { name: 'Rose Water Facial Toner 200 ml',   price: '₹299',   rating: 5, img: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=500', desc: 'Steam-distilled pure rose water. Hydrates, tightens pores & sets makeup.' },
    { name: 'Hair Growth Oil — Onion & Argan',  price: '₹599',   rating: 4, img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500', desc: 'Cold-pressed onion + argan oil blend that strengthens roots & reduces fall.' },
    { name: 'SPF 50+ Sunscreen Gel 100 ml',     price: '₹749',   rating: 5, img: 'https://images.unsplash.com/photo-1556227834-09f1de7a7d14?w=500', desc: 'Lightweight, non-greasy UV gel with PA++++ protection for Indian skin.' },
    { name: 'Luxury Perfume — Oud & Amber',     price: '₹3,499', rating: 5, img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500', desc: 'Long-lasting Eau de Parfum with warm oud, amber and sandalwood notes.' },
    { name: 'Keratin Shampoo 300 ml',           price: '₹449',   rating: 4, img: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500', desc: 'Sulfate-free keratin-infused shampoo for silky, frizz-free hair.' },
    { name: 'Lip Balm Trio — Berry Collection', price: '₹349',   rating: 4, img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500', desc: 'Set of 3 tinted lip balms with shea butter, vitamin E & natural berry hues.' },
    { name: 'Electric Facial Cleansing Brush',  price: '₹1,799', rating: 5, img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500', desc: 'Sonic vibration brush with 3 speed settings for deep, gentle pore cleansing.' },
],

// ── Electronics ────────────────────────────────────────────────
'Electronics': [
    { name: 'Noise-Cancelling Headphones',      price: '₹7,999',  rating: 5, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', desc: '40 mm drivers, ANC, 30 hr battery, fold-flat design. Hi-Res Audio cert.' },
    { name: 'Mechanical Gaming Keyboard',       price: '₹3,499',  rating: 4, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500', desc: 'Hot-swappable switches, per-key RGB, tri-mode (BT/2.4 G/USB-C).' },
    { name: '4K Webcam — Autofocus',            price: '₹4,999',  rating: 5, img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500', desc: '4K 30 fps webcam with AI face-tracking, low-light correction and privacy cover.' },
    { name: 'Portable Bluetooth Speaker',       price: '₹2,499',  rating: 4, img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500', desc: 'IPX7 waterproof, 20 W stereo sound, 12 hr playback, USB-C quick charge.' },
    { name: 'USB-C Docking Station 12-in-1',    price: '₹5,999',  rating: 5, img: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500', desc: 'Triple display dock: HDMI 4K, DisplayPort, Ethernet, SD slot, 100 W PD pass-through.' },
    { name: 'Condenser Mic — USB Studio',       price: '₹3,999',  rating: 5, img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500', desc: 'Cardioid USB mic with gain knob, zero-latency monitoring. Podcast-ready.' },
    { name: 'Wireless Ergonomic Mouse',         price: '₹1,199',  rating: 4, img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500', desc: 'Vertical grip mouse with silent clicks, USB-C charging and 3 DPI levels.' },
    { name: 'External SSD — 1 TB USB 3.2',     price: '₹6,499',  rating: 5, img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500', desc: '1050 MB/s read, shock-resistant aluminium body, USB-C with A adapter.' },
    { name: 'Smart LED Desk Lamp',              price: '₹1,599',  rating: 4, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=500', desc: 'Touch-control LED lamp with 5 colour temps, USB port and 30-min timer.' },
    { name: '27" 4K Monitor — IPS HDR400',     price: '₹24,999', rating: 5, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500', desc: '27" 4K IPS, 95 % DCI-P3, HDR400, USB-C 65 W charging, height adjust.' },
],

// ── Home ───────────────────────────────────────────────────────
'Home': [
    { name: 'Cotton Bedsheet Set — King',       price: '₹1,999', rating: 5, img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500', desc: '300 TC percale cotton bedsheet with 2 pillow covers. Soft, breathable.' },
    { name: 'Scented Candle — Vanilla Orchid',  price: '₹599',   rating: 4, img: 'https://images.unsplash.com/photo-1602607015806-0698d8acefec?w=500', desc: 'Hand-poured soy wax candle, 45-hour burn time, cotton wick, glass jar.' },
    { name: 'Wall Art Print Set — Botanical',   price: '₹1,299', rating: 4, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500', desc: 'Set of 3 museum-quality botanical prints on 250 gsm matte art paper.' },
    { name: 'Memory Foam Pillow — Cooling Gel', price: '₹1,499', rating: 5, img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500', desc: 'Contoured gel-infused memory foam with bamboo cover. Ortho-certified.' },
    { name: 'Ceramic Dinner Set — 18 pcs',      price: '₹3,499', rating: 5, img: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=500', desc: 'Handcrafted stoneware set: 6 dinner plates, 6 side plates, 6 bowls.' },
    { name: 'Woven Cotton Throw Blanket',       price: '₹899',   rating: 4, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500', desc: 'Chunky knit throw in natural cotton. 130 × 170 cm, machine washable.' },
    { name: 'LED String Lights — Warm White',   price: '₹399',   rating: 4, img: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500', desc: '10 m / 100 LED fairy lights with 8 modes. USB + remote. Indoor/outdoor.' },
    { name: 'Self-Watering Indoor Planter',     price: '₹1,299', rating: 5, img: 'https://images.unsplash.com/photo-1485955900106-19499164c88b?w=500', desc: 'Matte ceramic planter with hidden reservoir and cotton wicking system.' },
    { name: 'Bathroom Organiser Shelf — Bamboo',price: '₹1,799', rating: 4, img: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=500', desc: '3-tier bamboo corner shelf. Water-resistant finish, tool-free assembly.' },
    { name: 'Smart Aroma Diffuser — 300 ml',    price: '₹1,599', rating: 5, img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500', desc: 'Ultrasonic mist diffuser with app, 7 LED colours and auto shut-off.' },
],

// ── Appliances ─────────────────────────────────────────────────
'Appliances': [
    { name: 'HEPA Air Purifier — 400 sq ft',    price: '₹12,999', rating: 5, img: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=500', desc: 'True HEPA H13 filter removes 99.97 % PM2.5 with real-time AQI display.' },
    { name: 'Cold-Press Slow Juicer',           price: '₹6,499',  rating: 4, img: 'https://images.unsplash.com/photo-1622597476783-86cd6c5fe49d?w=500', desc: 'Slow-masticating juicer that preserves nutrients. Quiet 60 dB motor.' },
    { name: 'Robot Vacuum Cleaner — LiDAR',     price: '₹19,999', rating: 5, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', desc: 'LiDAR navigation robot vacuum with mopping, app control and 150-min runtime.' },
    { name: 'Stand Mixer 1000 W — 5 L Bowl',    price: '₹8,499',  rating: 5, img: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=500', desc: 'Planetary action mixer with dough hook, whisk and paddle. 10-speed dial.' },
    { name: 'Automatic Bread Maker',            price: '₹5,999',  rating: 5, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500', desc: '19 pre-set programmes, 3 crust shades, GF mode. 1 – 1.5 kg loaf capacity.' },
    { name: 'Cordless Handheld Vacuum',         price: '₹4,999',  rating: 4, img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500', desc: '22 kPa suction, 35-min runtime. HEPA filtration, lightweight 1.5 kg body.' },
    { name: 'Steam Iron — 2400 W Ceramic',      price: '₹2,499',  rating: 4, img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500', desc: 'Ceramic soleplate with 40 g/min continuous steam and anti-drip system.' },
    { name: 'Tower Fan — Bladeless 43 inch',    price: '₹7,999',  rating: 4, img: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500', desc: 'Oscillating bladeless tower fan with 10 speeds, remote and sleep timer.' },
    { name: 'Electric Kettle — Glass 1.7 L',    price: '₹1,499',  rating: 5, img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500', desc: 'Borosilicate glass kettle with blue LED, auto shut-off and keep-warm mode.' },
    { name: 'Instant Water Heater 3 L',         price: '₹3,799',  rating: 4, img: 'https://images.unsplash.com/photo-1585659722982-789758793322?w=500', desc: 'Tankless instant geyser with temperature display and child-lock safety.' },
],

// ── Toys ───────────────────────────────────────────────────────
'Toys': [
    { name: 'LEGO City Space Station — 562 pcs', price: '₹3,999', rating: 5, img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500', desc: 'Build a modular space station with shuttle, lab and 5 astronaut minifigs.' },
    { name: 'Remote Control Monster Truck',      price: '₹2,499', rating: 4, img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500', desc: '1:16 scale 4WD RC truck, 2.4 GHz, rechargeable Li-ion, all-terrain tyres.' },
    { name: 'Kids Drawing Tablet 10 inch',       price: '₹1,199', rating: 4, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500', desc: 'LCD e-writer doodle pad with rainbow screen and one-click erase.' },
    { name: 'Plush Stuffed Elephant — 40 cm',    price: '₹699',   rating: 5, img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500', desc: 'Ultra-soft hypoallergenic plush toy. Machine washable, toddler-safe.' },
    { name: 'Montessori Busy Board',             price: '₹1,599', rating: 5, img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500', desc: 'Wooden sensory board with latches, zippers, buttons and buckles.' },
    { name: 'Science Experiment Kit — 40 Labs',  price: '₹1,299', rating: 4, img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500', desc: '40 hands-on experiments: volcano, crystals, circuits and slime. Ages 8+.' },
    { name: 'Wooden Train Set — 80 Pieces',      price: '₹2,999', rating: 5, img: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500', desc: 'Beechwood track set with bridges, engines, wagons and station. Ages 3+.' },
    { name: 'Kids Telescope — 70 mm Refractor',  price: '₹3,499', rating: 4, img: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=500', desc: 'Entry telescope with 70 mm aperture, aluminium tripod and phone adapter.' },
    { name: 'Board Game — Strategy World Map',   price: '₹1,799', rating: 4, img: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=500', desc: 'Territory-based strategy game for 2-6 players. 45-90 minute gameplay.' },
    { name: 'DIY Robotics Kit — Build & Code',   price: '₹4,999', rating: 5, img: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=500', desc: '6-axis robot arm with Arduino, 100+ parts. Learn coding while building.' },
],

// ── Food ───────────────────────────────────────────────────────
'Food': [
    { name: 'Protein Granola — Dark Choco',      price: '₹499',   rating: 5, img: 'https://images.unsplash.com/photo-1517093602195-b40af9688267?w=500', desc: '15 g protein per serving, dark chocolate clusters with oats and almonds.' },
    { name: 'Cold Brew Coffee Concentrate',      price: '₹599',   rating: 4, img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500', desc: 'Single-origin Arabica cold brew concentrate. Makes 10 cups. No sugar added.' },
    { name: 'Peanut Butter — Crunchy 1 kg',     price: '₹449',   rating: 5, img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&q=90', desc: 'Stone-ground peanut butter with roasted peanut chunks. No palm oil.' },
    { name: 'Muesli Mix — Tropical Fruits',      price: '₹399',   rating: 4, img: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=500', desc: 'Oats, mango, pineapple, papaya, coconut and chia seeds. No artificial flavours.' },
    { name: 'Almond Flour — Blanched 500 g',     price: '₹699',   rating: 4, img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500', desc: 'Ultra-fine blanched almond flour for keto, gluten-free baking.' },
    { name: 'Instant Ramen Variety Box (12 pcs)',price: '₹599',   rating: 4, img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500', desc: 'Korean-style ramyeon in 4 flavours: spicy, cheese, black bean, kimchi.' },
    { name: 'Organic Apple Cider Vinegar 500 ml',price: '₹349',  rating: 5, img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500', desc: 'Unfiltered ACV with "the mother". Raw, unpasteurised, 5 % acidity.' },
    { name: 'Air-Fried Veggie Chips 150 g',      price: '₹249',   rating: 4, img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500', desc: 'Sweet potato, beetroot, spinach chips. 50 % less fat than regular chips.' },
    { name: 'Whey Protein Bar — Box of 12',      price: '₹1,499', rating: 5, img: 'https://images.unsplash.com/photo-1622484211148-971e35f23ffc?w=500', desc: '20 g protein per bar, chocolate brownie flavour, gluten-free.' },
    { name: 'Kombucha — Mixed Berry 330 ml',     price: '₹199',   rating: 4, img: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=500', desc: 'Raw, naturally fermented kombucha with live cultures. Low sugar.' },
],

// ── Auto ───────────────────────────────────────────────────────
'Auto': [
    { name: 'Dash Cam — 4K Front + Rear',       price: '₹7,999', rating: 5, img: 'https://images.unsplash.com/photo-1616455579100-2ceaa4eb4e2b?w=500', desc: '4K front + 1080p rear dual dash cam with GPS, night vision and parking mode.' },
    { name: 'Car Vacuum — Cordless 8000 Pa',     price: '₹2,499', rating: 4, img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80', desc: 'Handheld cordless car vacuum with HEPA filter and crevice attachments.' },
    { name: 'Leather Seat Covers — Full Set',    price: '₹4,999', rating: 4, img: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=500', desc: 'Universal fit PU leather covers with airbag-compatible side seam.' },
    { name: 'Tyre Inflator — Digital 12 V',      price: '₹1,799', rating: 5, img: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=500', desc: 'Preset pressure auto-stop inflator with LED light and 3 nozzle adapters.' },
    { name: 'Car Phone Mount — Wireless Charge', price: '₹1,499', rating: 4, img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=500', desc: '15 W wireless charging mount with auto-clamp and air-vent clip.' },
    { name: 'Paint Protection Film — 5 m Roll',  price: '₹3,499', rating: 5, img: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500', desc: 'Self-healing TPU film for bonnet and bumper. UV and scratch resistant.' },
    { name: 'LED Headlight Bulbs H7 — Pair',     price: '₹2,999', rating: 5, img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500', desc: '20,000 lumen, 6000 K white, plug-and-play. Canbus-compatible, fan-cooled.' },
    { name: 'Jump Starter + Power Bank 12 V',    price: '₹4,499', rating: 5, img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80', desc: 'Start any car up to 6 L petrol/3 L diesel. Also charges laptops & phones.' },
    { name: 'Car Interior LED Strip Kit',        price: '₹799',   rating: 4, img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500', desc: 'App-controlled RGB LED strips with music sync. 4 strips, USB powered.' },
    { name: 'Silicone Wiper Blades — 24"+18"',   price: '₹649',   rating: 4, img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=500&q=80', desc: 'Silicone-coated blades for streak-free visibility. All-season performance.' },
],

// ── Books ──────────────────────────────────────────────────────
'Books': [
    { name: 'Atomic Habits — James Clear',       price: '₹399',   rating: 5, img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', desc: 'The bestselling guide to building good habits and breaking bad ones.' },
    { name: 'Sapiens — Yuval Noah Harari',       price: '₹499',   rating: 5, img: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500', desc: 'A brief history of humankind. Paperback edition.' },
    { name: 'The Psychology of Money',            price: '₹349',   rating: 4, img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500', desc: 'Timeless lessons on wealth, greed and happiness by Morgan Housel.' },
    { name: 'Clean Code — Robert C. Martin',      price: '₹649',   rating: 5, img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500', desc: 'A handbook of agile software craftsmanship. Essential for developers.' },
    { name: 'The Alchemist — Paulo Coelho',       price: '₹299',   rating: 4, img: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500', desc: 'A fable about following your dreams. International bestseller, translated in 80 languages.' },
    { name: 'Deep Work — Cal Newport',            price: '₹379',   rating: 4, img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500', desc: 'Rules for focused success in a distracted world.' },
    { name: 'Ikigai — The Japanese Secret',       price: '₹299',   rating: 5, img: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500', desc: 'Discover the Japanese secret to a long, happy and purposeful life.' },
    { name: 'System Design Interview Vol. 1',     price: '₹899',   rating: 5, img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500', desc: 'Step-by-step guide to system design questions for tech interviews.' },
    { name: 'Thinking, Fast and Slow',            price: '₹449',   rating: 4, img: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=500', desc: 'Nobel laureate Daniel Kahneman on the two systems that drive how we think.' },
    { name: 'The Midnight Library — Matt Haig',   price: '₹349',   rating: 4, img: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500', desc: 'A dazzling novel about all the choices that go into a life well lived.' },
],

// ── Furniture ──────────────────────────────────────────────────
'Furniture': [
    { name: 'Ergonomic Office Chair — Mesh',      price: '₹12,999', rating: 5, img: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500', desc: 'High-back mesh chair with lumbar support, 4D armrests and tilt lock.' },
    { name: 'Solid Wood Study Desk — Walnut',     price: '₹8,999',  rating: 5, img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500', desc: 'Sheesham wood desk with cable grommet, 2 drawers and 120 × 60 cm top.' },
    { name: 'Bookshelf — 5 Tier Industrial',      price: '₹4,999',  rating: 4, img: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500', desc: 'Metal frame + engineered wood. Wall-anchorable, holds 75 kg per shelf.' },
    { name: '3-Seater Sofa — Fabric, Grey',       price: '₹24,999', rating: 5, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500', desc: 'High-density foam cushions with linen-blend upholstery and tapered legs.' },
    { name: 'TV Console — Fluted Panel',          price: '₹7,499',  rating: 4, img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&q=80', desc: 'Fluted-front TV unit fitting 65" screens. Cable management and soft-close drawers.' },
    { name: 'Bedside Table — Rattan & Wood',      price: '₹3,499',  rating: 4, img: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=500', desc: 'Mango wood with natural rattan door. Single drawer + open shelf.' },
    { name: 'Bar Stool Set (2) — Metal Frame',    price: '₹5,999',  rating: 4, img: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=500', desc: '75 cm counter-height stools with PU leather cushion and footrest.' },
    { name: 'Wardrobe — 3 Door with Mirror',      price: '₹18,999', rating: 5, img: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=500', desc: 'Engineered wood wardrobe with mirror, hanging rail, shelves and drawers.' },
    { name: 'Coffee Table — Marble Top Round',    price: '₹6,999',  rating: 5, img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500', desc: '80 cm round marble-top table with gold-finish iron legs.' },
    { name: 'Floating Wall Shelf Set (3 pcs)',    price: '₹1,499',  rating: 4, img: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=500&q=80', desc: 'Pine wood floating shelves in 3 sizes with invisible brackets.' },
],

// ── Sports ─────────────────────────────────────────────────────
'Sports': [
    { name: 'Running Shoes — Flyknit Mesh',       price: '₹3,299', rating: 5, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', desc: 'Lightweight flyknit uppers with responsive foam midsole. 8 mm heel drop.' },
    { name: 'Yoga Mat — 6 mm Eco TPE',            price: '₹999',   rating: 4, img: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500', desc: 'Non-slip, eco-friendly TPE yoga mat with alignment lines and carry strap.' },
    { name: 'Resistance Bands Set (5 pcs)',       price: '₹649',   rating: 4, img: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500', desc: 'Latex-free loop bands in 5 resistance levels for home workouts.' },
    { name: 'Cricket Bat — English Willow',       price: '₹4,999', rating: 5, img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500', desc: 'Grade A English willow bat with treble spring handle and full face.' },
    { name: 'Football — FIFA Pro Match Ball',     price: '₹2,499', rating: 5, img: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=500', desc: 'Thermal-bonded FIFA Quality Pro ball. Size 5, hand-stitched panels.' },
    { name: 'Adjustable Dumbbell Set — 24 kg',    price: '₹6,999', rating: 5, img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500', desc: 'Quick-adjust dial system: 2.5 – 24 kg per dumbbell. Replaces 15 sets.' },
    { name: 'Badminton Racket — Graphite',        price: '₹1,799', rating: 4, img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500', desc: 'Full graphite shaft, isometric head, pre-strung at 24 lbs. With cover.' },
    { name: 'Camping Tent — 4 Person',            price: '₹5,999', rating: 5, img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500', desc: 'Double-wall tent with rainfly, vestibule and 3-season ventilation.' },
    { name: 'Swimming Goggles — Anti-Fog',        price: '₹699',   rating: 4, img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500', desc: 'Silicone seal goggles with UV protection, adjustable nose bridge.' },
    { name: 'Foam Roller — Deep Tissue',          price: '₹1,199', rating: 4, img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500', desc: 'High-density EVA foam roller for myofascial release and recovery.' },
],

// ── Medicines ──────────────────────────────────────────────────
'Medicines': [
    { name: 'Organic Multivitamin Complex',       price: '₹1,249', rating: 5, img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500', desc: 'Plant-based multivitamins with 23 essential nutrients for daily health.' },
    { name: 'Omega-3 Fish Oil Capsules',          price: '₹799',   rating: 5, img: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=500', desc: 'Molecularly distilled 1000 mg softgels. Supports heart, brain & joints.' },
    { name: 'Digital Blood Pressure Monitor',     price: '₹1,899', rating: 5, img: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500', desc: 'Clinically validated upper-arm monitor with Bluetooth, memory for 2 users.' },
    { name: 'Digital Infrared Thermometer',       price: '₹1,499', rating: 5, img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=500', desc: 'Contactless forehead thermometer with instant 0.5 s reading and fever alarm.' },
    { name: 'Herbal Sleep Aid Capsules',          price: '₹549',   rating: 4, img: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=500', desc: 'Melatonin + Ashwagandha + Chamomile blend for natural, restful sleep.' },
    { name: 'Electrolyte Hydration Sachets (30)', price: '₹349',   rating: 4, img: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=500', desc: 'Zero-sugar electrolyte mix with sodium, potassium & magnesium.' },
    { name: 'Vitamin D3 + K2 Drops',             price: '₹499',   rating: 4, img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500', desc: '1000 IU D3 + 45 mcg K2 per drop. Coconut oil base, 300 servings.' },
    { name: 'Biotin Tablets 10,000 mcg',          price: '₹399',   rating: 4, img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=500', desc: 'High-potency biotin for hair, skin and nail health. 120 veg capsules.' },
    { name: 'Probiotic Gut Health Capsules',      price: '₹699',   rating: 5, img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500', desc: '50 billion CFU, 16 strains with delayed-release capsules.' },
    { name: 'First Aid Kit — 220 Pieces',         price: '₹999',   rating: 5, img: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500', desc: 'Comprehensive first-aid kit with bandages, antiseptic, scissors and more.' },
],

};

// ═══════════════════════════════════════════════════════════════
// Category-specific related images (real Unsplash photos)
// Each category gets 3 related images shown alongside the main image
// ═══════════════════════════════════════════════════════════════
const _catExtraImgs = {
    'Grocery': [
        'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600',
        'https://images.unsplash.com/photo-1506617564039-2f3b650b7010?w=600',
        'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600',
    ],
    'Fashion': [
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600',
        'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600',
        'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600',
    ],
    'Mobiles': [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600',
        'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600',
        'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=600',
    ],
    'Beauty': [
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600',
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600',
        'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=600',
    ],
    'Electronics': [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600',
        'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=600',
    ],
    'Home': [
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600',
        'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
    ],
    'Appliances': [
        'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600',
        'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600',
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600',
    ],
    'Toys': [
        'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600',
        'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600',
        'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600',
    ],
    'Food': [
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600',
        'https://images.unsplash.com/photo-1476224203421-9ac39bcb3df1?w=600',
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600',
    ],
    'Auto': [
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    ],
    'Books': [
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600',
        'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
    ],
    'Furniture': [
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600',
        'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600',
    ],
    'Sports': [
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600',
        'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600',
    ],
    'Medicines': [
        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600',
        'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600',
    ],
};

// ═══════════════════════════════════════════════════════════════
// Build the flat products array from the catalog
// ═══════════════════════════════════════════════════════════════
const products = [];
let _pid = 0;
categories.forEach(cat => {
    const extras = _catExtraImgs[cat] || [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    ];
    const items = _catalog[cat] || [];
    items.forEach(item => {
        products.push({
            id: _pid,
            name: item.name,
            section: cat,
            price: item.price,
            rating: item.rating,
            description: item.desc,
            image: item.img,
            images: [ item.img, extras[0], extras[1], extras[2] ]
        });
        _pid++;
    });
});

let toastTimeout;
let pdCartDB;

const pdCartRequest = indexedDB.open('PBSSDCartDB', 1);
pdCartRequest.onupgradeneeded = (e) => {
    const db = e.target.result;
    if (!db.objectStoreNames.contains('cart_state')) {
        db.createObjectStore('cart_state');
    }
};
pdCartRequest.onsuccess = (e) => {
    pdCartDB = e.target.result;
};

        function showToast() {
            const cartToast = document.getElementById('cart-toast');
            if (cartToast) {
                cartToast.classList.add('show');
                clearTimeout(toastTimeout);
                toastTimeout = setTimeout(() => {
                    cartToast.classList.remove('show');
                }, 5000);
            }
        }

        function closeToast() {
            const cartToast = document.getElementById('cart-toast');
            if (cartToast) {
                clearTimeout(toastTimeout);
                cartToast.classList.remove('show');
            }
        }

        window.addEventListener('load', () => {
            
            const urlParams = new URLSearchParams(window.location.search);
            const productId = parseInt(urlParams.get('id'));

            
            const product = products.find(p => p.id === productId);

            const container = document.getElementById('product-content');
            if (!container) return;

            if (product) {
                
                container.innerHTML = `
                    <div id="cart-toast" class="cart-toast">
                        <div class="toast-icon">
                            <i class="bi bi-check-circle-fill"></i>
                        </div>
                        <div class="toast-content">
                            <p class="fw-bold mb-1">Added to Cart!</p>
                            <a href="visual/template/cart.html" class="btn btn-sm btn-light">Checkout</a>
                        </div>
                        <button class="toast-close" onclick="closeToast()">&times;</button>
                    </div>
                    <main class="c-prduct-d py-5">
                        <div class="row g-5">
                            <div class="col-lg-5">
                                <div class="c-singale-image-box-left">
                                    <div style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff" class="swiper mySwiper2">
                                        <div class="swiper-wrapper">
                                            ${product.images.map(src => `<div class="swiper-slide"><img src="${src}" class="product-img" alt="${product.name}" loading="lazy"></div>`).join('')}
                                        </div>
                                        <div class="swiper-button-next"></div>
                                        <div class="swiper-button-prev"></div>
                                    </div>
                                    <div thumbsSlider="" class="swiper mySwiper">
                                        <div class="swiper-wrapper">
                                            ${product.images.map(src => `<div class="swiper-slide"><img src="${src}" class="product-img" alt="${product.name}" loading="lazy"></div>`).join('')}
                                        </div>
                                    </div>
                                </div>    
                            </div>
                            
                            <div class="col-lg-6">
                                <div class="c-product-con">
                                    <span class="badge bg-success mb-2">${product.section}</span>
                                    <h1 class="heading-lora fw-bold mb-3">${product.name}</h1>
                                    <div class="c-price-product">
                                        <span class="c-normal-p">₹${(parseInt(product.price.replace(/\D/g, '')) + 400).toLocaleString('en-IN')}</span>
                                        <span class="c-discount-p color-nature">${product.price}</span>
                                    </div>
                                    <div class="mb-3 text-warning">
                                        ${'<i class="bi bi-star-fill"></i>'.repeat(product.rating)}
                                        ${'<i class="bi bi-star"></i>'.repeat(5 - product.rating)}
                                    </div>
                                    <p class="lead text-secondary mb-5">${product.description}</p>
                                    <div class="c-delivery-banner">
                                        <img src="visual/assets/delivery-banner.jpg" alt="">
                                    </div>
                                    
                                    <div class="c-actions-wrapper">
                                        <div class="c-quantity-selector mb-4">
                                            <label for="quantity" class="form-label fw-bold">Quantity</label>
                                            <select class="form-select" id="quantity" style="width: 100%;">
                                                <option selected>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                
                                        <div class="gap-3 mb-4">
                                            <button class="btn btn-buy-now flex-grow-1" onclick="openCheckoutModal()">Buy It Now</button>
                                            <button class="btn btn-add-cart flex-grow-1">Add to Cart</button>
                                            <button class="btn btn-favourite flex-grow-1"><i class="bi bi-heart"></i><span style="font-size: 1rem;font-weight: 700;margin-left: 5px"> Add to favourites</span></button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </main>
                `;
                document.title = `${product.name} | PBSSD Fresh`;

                setTimeout(() => {
                    var swiper = new Swiper(".mySwiper", {
                        loop: true,
                        spaceBetween: 10,
                        slidesPerView: 4,
                        freeMode: true,
                        watchSlidesProgress: true,
                    });
                    var swiper2 = new Swiper(".mySwiper2", {
                        loop: true,
                        spaceBetween: 10,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        thumbs: {
                            swiper: swiper,
                        },
                    });
                }, 0);

                const addToCartBtn = document.querySelector('.btn-add-cart');
                if (addToCartBtn) {
                    addToCartBtn.addEventListener('click', (event) => {
                        event.preventDefault();
                        const quantitySelect = document.getElementById('quantity');
                        const selectedQty = parseInt(quantitySelect?.value || '1', 10);
                        const quantity = Number.isNaN(selectedQty) ? 1 : selectedQty;

                        if (!localStorage.getItem('pbssd_user')) {
                            window.location.href = 'visual/template/login.html';
                            return;
                        }

                        let cart = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
                        const existingItem = cart.find(item => item.id === product.id);
                        if (existingItem) {
                            existingItem.quantity += quantity;
                        } else {
                            cart.push({ ...product, quantity });
                        }
                        localStorage.setItem('pbssd_cart', JSON.stringify(cart));

                        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
                        if (pdCartDB) {
                            const tx = pdCartDB.transaction(['cart_state'], 'readwrite');
                            tx.objectStore('cart_state').put(count, 'count');
                        }
                        showToast();
                    });
                }

                // ── Favourite button wiring ──────────────────────────────────
                const favBtn   = document.getElementById('pd-fav-btn');
                const favIcon  = document.getElementById('pd-fav-icon');
                const favLabel = document.getElementById('pd-fav-label');

                function _getFavs() {
                    return JSON.parse(localStorage.getItem('pbssd_favourites') || '[]');
                }
                function _setFavs(arr) {
                    localStorage.setItem('pbssd_favourites', JSON.stringify(arr));
                }
                function _applyFavState(isFav) {
                    if (isFav) {
                        favIcon.className  = 'bi bi-heart-fill';
                        favLabel.textContent = ' Saved to Favourites';
                        favBtn.style.background = '#fff0f3';
                        favBtn.style.color = '#e11d48';
                        favBtn.style.borderColor = '#f1aec0';
                    } else {
                        favIcon.className  = 'bi bi-heart';
                        favLabel.textContent = ' Add to Favourites';
                        favBtn.style.background = '';
                        favBtn.style.color = '';
                        favBtn.style.borderColor = '';
                    }
                }

                // Set initial state based on localStorage
                _applyFavState(_getFavs().includes(product.id));

                if (favBtn) {
                    favBtn.addEventListener('click', () => {
                        let favs = _getFavs();
                        const idx = favs.indexOf(product.id);
                        if (idx === -1) {
                            // Add
                            favs.push(product.id);
                            _setFavs(favs);
                            _applyFavState(true);
                            // Bounce animation
                            favBtn.style.transform = 'scale(1.08)';
                            setTimeout(() => favBtn.style.transform = '', 200);
                            if (typeof Swal !== 'undefined') {
                                Swal.fire({ title: 'Saved to Favourites!', toast: true, position: 'top-end', showConfirmButton: false, timer: 1400, icon: 'success', background: '#FAFAF7', color: '#1A1A1A' });
                            }
                        } else {
                            // Remove
                            favs.splice(idx, 1);
                            _setFavs(favs);
                            _applyFavState(false);
                            if (typeof Swal !== 'undefined') {
                                Swal.fire({ title: 'Removed from Favourites', toast: true, position: 'top-end', showConfirmButton: false, timer: 1200, icon: 'info', background: '#FAFAF7', color: '#1A1A1A' });
                            }
                        }
                    });
                }

                window.openCheckoutModal = () => {
                    document.getElementById('checkoutProgress').style.width = '33%';
                    document.getElementById('checkoutProgress').classList.remove('bg-success');
                    document.getElementById('step-address').classList.remove('d-none');
                    document.getElementById('step-payment').classList.add('d-none');
                    document.getElementById('step-thankyou').classList.add('d-none');
                    
                    const paymentStep = document.getElementById('step-payment');
                    const buttons = paymentStep.querySelectorAll('button');
                    buttons.forEach(btn => btn.disabled = false);
                    buttons[1].innerText = 'Place Order';
                    
                    const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
                    modal.show();
                };

                window.nextStep = (step) => {
                    if (step === 2) {
                        document.getElementById('checkoutProgress').style.width = '66%';
                        document.getElementById('step-address').classList.add('d-none');
                        document.getElementById('step-payment').classList.remove('d-none');
                    } else if (step === 1) {
                        document.getElementById('checkoutProgress').style.width = '33%';
                        document.getElementById('step-address').classList.remove('d-none');
                        document.getElementById('step-payment').classList.add('d-none');
                    }
                };

                window.processOrder = () => {
                    document.getElementById('checkoutProgress').style.width = '100%';
                    
                    const paymentStep = document.getElementById('step-payment');
                    const buttons = paymentStep.querySelectorAll('button');
                    buttons.forEach(btn => btn.disabled = true);
                    buttons[1].innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...';

                    setTimeout(() => {
                        document.getElementById('step-payment').classList.add('d-none');
                        document.getElementById('step-thankyou').classList.remove('d-none');
                        document.getElementById('checkoutProgress').classList.add('bg-success');
                    }, 1500);
                };

                window.clearCart = () => {
                    window.location.href = 'index.html';
                };
            } else {
                container.innerHTML = `<div class="col-12 text-center"><h2>Product not found</h2><a href="index.html">Return to home</a></div>`;
            }
        });

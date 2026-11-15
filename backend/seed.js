// backend/seed.js
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');
const premiumProducts = [
  // --- HOSTEL ESSENTIALS ---
  {
    productId: 1,
    name: "Minimalist Laundry Hamper",
    category: "Hostel Essentials",
    price: 299,
    img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop"
  },
  {
    productId: 2,
    name: "Memory Foam Mattress Topper",
    category: "Hostel Essentials",
    price: 799,
     img: "https://www.hindustantimes.com/ht-img/img/2026/01/27/1600x900/logo/Memory_foam_mattress_topper_1769506996491_1769507001023.png"
  },
  {
    productId: 3,
    name: "Adjustable Desk Lamp",
    category: "Hostel Essentials",
    price: 499,
    img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop"
  },
  {
    productId: 4,
    name: "Stackable Storage Cubes",
    category: "Hostel Essentials",
    price: 499,
    img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop"
  },
  {
    productId: 5,
    name: "Compact Coffee Maker",
    category: "Hostel Essentials",
    price: 699,
    img: "https://images.unsplash.com/photo-1716623135997-690d6712b9a3?auto=format&fit=crop&fm=jpg&q=80&w=800"
  },

  // --- ELECTRONICS ---
  {
    productId: 6,
    name: "Noise Cancelling Headphones",
    category: "Electronics",
    price: 1499,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
  },
  {
    productId: 7,
    name: "Scientific Calculator",
    category: "Electronics",
    price: 399,
    img: "https://images.unsplash.com/photo-1574607407408-1e681c46041d?q=80&w=800&auto=format&fit=crop"
  },
  {
    productId: 8,
    name: "20,000mAh Power Bank",
    category: "Electronics",
    price: 699,
    img: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=800&auto=format&fit=crop"
  },
  {
    productId: 9,
    name: "Ergonomic Wireless Mouse",
    category: "Electronics",
    price: 299,
    img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop"
  },
  {
    productId: 10,
    name: "Surge Protector Power Strip",
    category: "Electronics",
    price: 299,
    img: "https://www.brennenstuhl.es/temp/explorer/files/shop_articles/es-ES/images/4007123150496_1159540376____application______019631______xx.300dpi.jpg"
  },

  // --- STATIONERY ---
  {
    productId: 11,
    name: "Hardcover Ruled Notebook",
    category: "Stationery",
    price: 149,
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop"
  },
  {
    productId: 12,
    name: "Precision Gel Pens (Set of 6)",
    category: "Stationery",
    price: 60,
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop"
  },
  {
    productId: 13,
    name: "Minimalist Desk Organizer",
    category: "Stationery",
    price: 199,
    img: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=800&auto=format&fit=crop"
  },
  {
    productId: 14,
    name: "Architect's Drafting Tools",
    category: "Stationery",
    price: 299,
    img: "https://images.unsplash.com/photo-1603901622056-0a5bee231395?auto=format&fit=crop&w=800&q=80"
  },
  {
    productId: 15,
    name: "Pastel Highlighters",
    category: "Stationery",
    price: 99,
    img: "https://sta-live-cdn.b-cdn.net/thumbnail/4b/0d/df/1673617267/STABILO_swing_cool_Pastel_header2_1920x1920.jpg"
  },

  // --- TREKKING ESSENTIALS ---
  {
    productId: 16,
    name: "All-Weather Hiking Backpack",
    category: "Trekking Essentials",
    price: 999,
    img: "https://images.unsplash.com/photo-1760715651666-c3e408bfdda7?auto=format&fit=crop&w=800&q=80"
  },
  {
    productId: 17,
    name: "Insulated Steel Water Bottle",
    category: "Trekking Essentials",
    price: 299,
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop"
  },
  {
    productId: 18,
    name: "Heavy-Duty Trekking Boots",
    category: "Trekking Essentials",
    price: 1499,
    img: "https://www.nord-spur.co.uk/cdn/shop/collections/2_fe0e93c0-668a-40dc-936b-ad31c51a047c.png?v=1774950234&width=1080"
  },
  {
    productId: 19,
    name: "Magnetic Navigation Compass",
    category: "Trekking Essentials",
    price: 199,
    img: "https://www.vacation-dodecanese.com/images/how-to-choose-the-right-gear-for-your-mountain-adventure.jpeg"
  },
  {
    productId: 20,
    name: "Compact Survival Multi-Tool",
    category: "Trekking Essentials",
    price: 499,
    img: "https://images.unsplash.com/photo-1607456646472-824a797b26a4?auto=format&fit=crop&w=800&q=80"
  }
];
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Clearing old data...');
    await Product.deleteMany({}); 
    console.log('Inserting 20 INR premium products...');
    await Product.insertMany(premiumProducts);
    console.log('Success! Database seamlessly seeded.');
    process.exit();
  })
  .catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1);
  });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Product = require('./models/Product');

const app = express();

// CORS Configuration
const allowedOrigins = [
    'http://localhost:5173',
    'https://equipu.vercel.app'
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health Check
app.get('/', (req, res) => {
    res.send('EquipU API is running!');
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

// GET: Fetch all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();

        const formattedProducts = products.map(p => ({
            id: p.productId,
            name: p.name,
            category: p.category,
            price: `₹${p.price}`,
            img: p.img
        }));

        res.json(formattedProducts);

    } catch (error) {
        console.error('Error fetching products:', error);

        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
});

// POST: Add a product
app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(400).json({
            message: 'Error adding product',
            error: error.message
        });
    }
});

// Connect MongoDB and start server
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Connected to MongoDB');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}

startServer();

// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Product = require('./models/Product');

const app = express();
app.use(cors()); // Opens your API to your React frontend
app.use(express.json()); // Allows the server to accept JSON data

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- API ROUTES ---

// GET: Fetch all products for the React frontend
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    
    const formattedProducts = products.map(p => ({
      id: p.productId,
      name: p.name,
      category: p.category,
      price: `₹${p.price}`, // <-- CHANGE THIS LINE FROM '$' TO '₹'
      img: p.img
    }));

    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Optional POST: Quick route to add a product via Postman/Insomnia
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error adding product', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
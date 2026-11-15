// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Using productId to match your exact 'id: 1' structure, 
  // as MongoDB automatically generates its own alphanumeric '_id'.
  productId: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  img: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt dates
});

module.exports = mongoose.model('Product', productSchema);
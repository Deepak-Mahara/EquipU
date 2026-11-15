import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Checkout from './pages/Checkout'; // Import Checkout
import CartDrawer from './components/CartDrawer';
// Add this to your imports at the top
import Orders from './pages/Orders';

// Add this inside your <Routes>

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen w-full flex flex-col bg-white relative">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} /> {/* Add Checkout Route */}
            <Route path="/orders" element={<Orders />} />
          </Routes>
          
          <Footer />
          <CartDrawer />
        </div>
      </Router>
    </CartProvider>
  );
}
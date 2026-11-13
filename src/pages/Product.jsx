import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Product() {
  const { id } = useParams(); 
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false); // State for the popup
  
  const { addToCart, setIsCartOpen } = useCart(); 
  
  const product = mockProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
        <Link to="/shop" className="text-blue-600 hover:underline">Return to Shop</Link>
      </main>
    );
  }

  // Handle adding to cart and showing the popup
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowToast(true);
    
    // Hide the popup after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-12 py-16 flex flex-col lg:flex-row gap-16 items-start relative">
        
        {/* Left Column: Large Image */}
        <div className="w-full lg:w-1/2 shrink-0">
          <div className="aspect-square bg-gray-100 rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
            <img 
              src={product.img} 
              alt={product.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out" 
            />
          </div>
        </div>

        {/* Right Column: Product Information */}
        <div className="w-full lg:w-1/2 flex flex-col py-6">
          <span className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-3">
            {product.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {product.name}
          </h1>
          <span className="text-3xl font-medium text-gray-800 mb-8">
            {product.price}
          </span>
          
          <p className="text-gray-600 mb-10 leading-relaxed text-lg">
            High-quality, durable campus essential designed to make your daily routine smoother. Built for students, approved by EquipU.
          </p>

          {/* Quantity Selector */}
          <div className="mb-10">
            <span className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Quantity
            </span>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-colors text-xl font-medium"
              >
                -
              </button>
              <span className="text-2xl font-semibold w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-colors text-xl font-medium"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 text-white rounded-full py-4 px-8 font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex-1 bg-blue-600 text-white rounded-full py-4 px-8 font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              View Cart
            </button>
          </div>
        </div>
        
      </main>

      {/* Toast Notification Popup */}
      <div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center gap-3 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-medium">Item added to cart</span>
      </div>
    </>
  );
}
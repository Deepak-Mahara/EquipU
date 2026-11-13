import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { setIsCartOpen, cartCount } = useCart();

  const shopCategories = [
    "All Products",
    "Hostel Essentials",
    "Electronics",
    "Stationery",
    "Trekking Essentials"
  ];

  return (
    <nav className="grid grid-cols-3 items-center px-12 py-4 bg-white/90 backdrop-blur-md text-gray-800 h-16 shrink-0 shadow-sm relative z-50">
      
      {/* 1. Left Column: Logo */}
      <div className="flex items-center justify-start">
        <Link to="/" className="text-2xl font-black tracking-tighter text-blue-600 cursor-pointer">
          EquipU
        </Link>
      </div>

      {/* 2. Center Column: Navigation Links */}
      <div className="flex items-center justify-center space-x-12 font-medium">
        <Link to="/" className="hover:text-blue-600 transition-colors py-4">Home</Link>
        
        {/* Shop Dropdown Wrapper */}
        <div className="relative group py-4">
          <Link to="/shop" className="hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer">
            Shop
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          
          <div className="absolute top-full left-0 w-full h-4" />

          <div className="absolute top-[calc(100%+1rem)] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-3">
            <div className="w-[600px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-6">
              <div className="grid grid-cols-3 gap-4">
                {shopCategories.map((category, index) => (
                  <Link 
                    key={index}
                    to={category === "All Products" ? "/shop" : `/shop?category=${encodeURIComponent(category)}`}
                    className="group/card flex flex-col items-center justify-center h-28 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  >
                    <span className="text-sm font-semibold text-gray-700 group-hover/card:text-blue-600 text-center px-3 leading-snug">
                      {category}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Link to="/about" className="hover:text-blue-600 transition-colors py-4">About</Link>
      </div>

      {/* 3. Right Column: Cart Icon */}
      <div className="flex items-center justify-end">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 text-gray-800 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-blue-600 text-white text-[10px] font-bold border-2 border-white rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
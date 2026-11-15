import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { setIsCartOpen, cartCount } = useCart();
  
  // Easter Egg State
  const originalLogo = "EquipU.";
  const [logoText, setLogoText] = useState(originalLogo);
  const [isScrambling, setIsScrambling] = useState(false);

  const shopCategories = [
    "All Products",
    "Hostel Essentials",
    "Electronics",
    "Stationery",
    "Trekking Essentials"
  ];

  // Pure Cipher Shuffle Logic (No routing, no redirecting)
  const handleLogoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isScrambling) return; 
    setIsScrambling(true);

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iterations = 0;
    
    const interval = setInterval(() => {
      setLogoText(originalLogo.split("").map((letter, index) => {
        if (index < iterations) {
          return originalLogo[index]; 
        }
        return letters[Math.floor(Math.random() * 26)]; 
      }).join(""));
      
      if (iterations >= originalLogo.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      
      iterations += 1 / 4; 
    }, 30);
  };

  return (
    <nav className="flex items-center justify-between px-8 md:px-12 py-8 bg-[#FAF9F6] text-stone-900 sticky top-0 z-50 transition-all duration-300">
      
      {/* Left: Logo with Easter Egg (Pure Span, No Routing) */}
      <div className="flex-1 flex items-center justify-start z-20">
        <span 
          onClick={handleLogoClick}
          className="text-3xl font-serif tracking-tight text-stone-900 cursor-pointer select-none"
        >
          {logoText}
        </span>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center justify-center space-x-12 z-20">
        <Link 
          to="/" 
          className="text-[11px] uppercase tracking-[0.2em] font-medium text-stone-500 hover:text-stone-900 transition-colors"
        >
          Home
        </Link>
        
        {/* Standard Dropdown */}
        <div className="relative group py-4">
          <Link 
            to="/shop" 
            className="text-[11px] uppercase tracking-[0.2em] font-medium text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            Shop
            <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          
          <div className="absolute top-full left-0 w-full h-2" />

          <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2 z-50">
            <div className="w-56 bg-[#FAF9F6] border border-stone-200/60 shadow-xl shadow-stone-900/5 py-4">
              <div className="flex flex-col gap-1">
                {shopCategories.map((category, index) => (
                  <Link 
                    key={index}
                    to={category === "All Products" ? "/shop" : `/shop?category=${encodeURIComponent(category)}`}
                    className="group/item flex items-center justify-between px-6 py-2 transition-colors"
                  >
                    <span className={`relative text-[10px] uppercase tracking-widest font-medium text-stone-500 group-hover/item:text-stone-900 transition-colors pb-0.5
                      after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-stone-900 after:transition-all after:duration-[400ms] after:ease-[cubic-bezier(0.25,0.1,0.25,1)] after:w-0 group-hover/item:after:w-full
                    `}>
                      {category}
                    </span>
                    <svg className="w-3 h-3 text-stone-900 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Link 
          to="/about" 
          className="text-[11px] uppercase tracking-[0.2em] font-medium text-stone-500 hover:text-stone-900 transition-colors"
        >
          About
        </Link>

        {/* NEW: Your Orders Link */}
        <Link 
          to="/orders" 
          className="text-[11px] uppercase tracking-[0.2em] font-medium text-stone-500 hover:text-stone-900 transition-colors"
        >
          Your Orders
        </Link>
      </div>

      {/* Right: Cart Icon */}
      <div className="flex-1 flex items-center justify-end z-20">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 text-stone-900 hover:text-stone-500 transition-colors flex items-center group"
          aria-label="Open cart"
        >
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-stone-900 text-white text-[9px] font-medium rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
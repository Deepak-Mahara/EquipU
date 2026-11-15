import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems } = useCart();

  // Safely calculate the cart total from items to avoid NaN issues with formatted strings
  const safeCartTotal = cartItems.reduce((total, item) => {
    const numericPrice = parseFloat(String(item.price).replace(/[^0-9.-]+/g, "")) || 0;
    return total + (numericPrice * item.quantity);
  }, 0);

  // Shipping is now free for all orders
  const shipping = 0;
  const tax = safeCartTotal * 0.08;
  const grandTotal = safeCartTotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center py-32 bg-[#FAF9F6]">
        <div className="text-center max-w-lg w-full flex flex-col items-center">
          <span className="text-stone-400 font-serif italic text-xl mb-8">
            Your cart is beautifully empty.
          </span>
          <Link 
            to="/shop" 
            className="inline-block bg-stone-900 text-white py-4 px-10 text-xs uppercase tracking-[0.15em] font-medium hover:bg-black transition-colors duration-300"
          >
            Discover Essentials
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-[1400px] w-full mx-auto px-8 md:px-12 py-16 flex flex-col lg:flex-row gap-16 bg-[#FAF9F6] min-h-screen">
      
      {/* Left Column: Cart Items List */}
      <div className="w-full lg:w-[65%] flex flex-col">
        <h1 className="text-4xl font-serif text-stone-900 mb-12 tracking-tight">Checkout</h1>
        
        <div className="border-t border-stone-200">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 py-4 border-b border-stone-200 text-[10px] font-medium text-stone-500 uppercase tracking-widest">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>
          
          <div className="divide-y divide-stone-200">
            {cartItems.map((item) => {
              // Safely extract numeric price handling commas and currency symbols
              const numericPrice = parseFloat(String(item.price).replace(/[^0-9.-]+/g, "")) || 0;
              const rowTotal = numericPrice * item.quantity;
              
              return (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-6 py-8 items-center group">
                  
                  {/* Product Info */}
                  <div className="col-span-1 sm:col-span-6 flex items-center gap-6">
                    {/* Taller, editorial image aspect ratio */}
                    <div className="w-20 h-28 bg-stone-100 shrink-0 border border-stone-200">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-stone-500 mb-2 block">{item.category}</span>
                      <h3 className="font-serif text-stone-900 text-lg leading-snug mb-1">{item.name}</h3>
                      <span className="text-stone-500 font-sans text-sm block">{item.price} each</span>
                    </div>
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-1 sm:col-span-3 flex sm:justify-center">
                    <div className="px-4 py-2 border border-stone-200 bg-white text-stone-900 text-sm">
                      Qty: {item.quantity}
                    </div>
                  </div>
                  
                  {/* Row Total */}
                  <div className="col-span-1 sm:col-span-3 flex sm:justify-end">
                    <span className="text-lg font-sans tracking-wide text-stone-900">₹{rowTotal.toFixed(2)}</span>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="w-full lg:w-[35%] shrink-0">
        <div className="bg-white border border-stone-200 p-8 md:p-10 sticky top-32">
          <h2 className="text-sm font-sans uppercase tracking-widest text-stone-900 mb-8">Order Summary</h2>
          
          <div className="space-y-4 mb-8 text-sm font-sans tracking-wide text-stone-600">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span className="text-stone-900">₹{safeCartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Estimated Tax (8%)</span>
              <span className="text-stone-900">₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping</span>
              <span className="text-stone-900">Free</span>
            </div>
          </div>
          
          <div className="border-t border-stone-200 pt-6 mb-10">
            <div className="flex justify-between items-end">
              <span className="text-[11px] uppercase tracking-widest text-stone-500 font-medium mb-1">Grand Total</span>
              <span className="text-3xl font-serif text-stone-900">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={() => alert("Checkout flow to be implemented next!")}
            className="w-full bg-stone-900 text-white py-4 text-xs uppercase tracking-[0.15em] font-medium hover:bg-black transition-colors duration-300"
          >
            Confirm & Pay
          </button>
          
          <p className="text-[10px] uppercase tracking-widest text-stone-400 text-center mt-6 flex items-center justify-center gap-2">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure Checkout
          </p>
        </div>
      </div>
      
    </main>
  );
}
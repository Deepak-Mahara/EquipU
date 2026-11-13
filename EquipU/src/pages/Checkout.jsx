import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, cartTotal } = useCart();

  // Simple placeholders for tax and shipping calculations
  const shipping = cartTotal > 0 ? 5.00 : 0;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center py-20 bg-gray-50">
        <div className="bg-white p-10 rounded-3xl shadow-sm text-center max-w-lg w-full border border-gray-100">
          <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any essentials to your cart yet.</p>
          <Link to="/shop" className="inline-block bg-blue-600 text-white rounded-full py-3 px-8 font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-[1400px] w-full mx-auto px-12 py-12 flex flex-col lg:flex-row gap-12 bg-gray-50">
      
      {/* Left Column: Cart Items List */}
      <div className="w-full lg:w-[65%] flex flex-col">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Checkout</h1>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="hidden sm:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {cartItems.map((item) => {
              // Extract numeric price for calculation
              const numericPrice = parseFloat(item.price.replace('$', ''));
              const rowTotal = numericPrice * item.quantity;
              
              return (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-6 p-6 items-center">
                  
                  {/* Product Info */}
                  <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                    <div className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-blue-500 mb-1 block">{item.category}</span>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h3>
                      <span className="text-gray-500 font-medium text-sm mt-1 block">{item.price} each</span>
                    </div>
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-1 sm:col-span-3 flex sm:justify-center">
                    <div className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 font-semibold">
                      Qty: {item.quantity}
                    </div>
                  </div>
                  
                  {/* Row Total */}
                  <div className="col-span-1 sm:col-span-3 flex sm:justify-end">
                    <span className="text-xl font-bold text-gray-900">${rowTotal.toFixed(2)}</span>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="w-full lg:w-[35%] shrink-0">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>Estimated Tax (8%)</span>
              <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-gray-900">${shipping.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-6 mb-8">
            <div className="flex justify-between items-end">
              <span className="text-gray-900 font-bold text-lg">Grand Total</span>
              <span className="text-3xl font-extrabold text-blue-600">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={() => alert("Checkout flow to be implemented next!")}
            className="w-full bg-gray-900 text-white rounded-full py-4 font-bold text-lg hover:bg-gray-800 transition-colors shadow-xl shadow-gray-900/20"
          >
            Buy Now
          </button>
          
          <p className="text-xs text-gray-400 text-center mt-6 flex items-center justify-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure Checkout
          </p>
        </div>
      </div>
      
    </main>
  );
}
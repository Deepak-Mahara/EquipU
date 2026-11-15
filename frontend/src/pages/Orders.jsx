import React from 'react';
import { Link } from 'react-router-dom';

// Mock data representing confirmed orders after checkout, updated to Rupees
const mockOrders = [
  {
    id: "EQ-84729",
    date: "October 12, 2026",
    total: "₹2,400.00",
    status: "Delivered",
    items: [
      { id: 1, name: "Noise Cancelling Headphones", category: "Electronics", quantity: 1, price: "₹1,900.00", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop" },
      { id: 2, name: "Scientific Calculator", category: "Electronics", quantity: 1, price: "₹500.00", img: "https://images.unsplash.com/photo-1574607407408-1e681c46041d?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  {
    id: "EQ-73911",
    date: "September 04, 2026",
    total: "₹1,100.00",
    status: "Processing",
    items: [
      { id: 3, name: "Mattress Topper", category: "Hostel Essentials", quantity: 1, price: "₹1100.00", img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=600&auto=format&fit=crop" }
    ]
  }
];

export default function Orders() {
  return (
    <main className="flex-1 w-full bg-white border-t border-stone-200 min-h-[calc(100vh-88px)] py-16 lg:py-24">
      <div className="max-w-[1000px] mx-auto px-8 md:px-12">
        
        {/* Page Header */}
        <div className="border-b border-stone-200 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tighter mb-4">
              Your Orders.
            </h1>
            <p className="text-stone-500 font-sans text-sm tracking-wide max-w-md">
              Review your past purchases and track the status of your current campus essentials.
            </p>
          </div>
          <Link 
            to="/shop" 
            className="text-[10px] uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors border-b border-stone-300 hover:border-stone-900 pb-1 w-fit"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Orders List */}
        {mockOrders.length === 0 ? (
          <div className="py-24 text-center">
            <span className="text-stone-400 font-serif italic text-xl block mb-6">
              You haven't placed any orders yet.
            </span>
            <Link 
              to="/shop" 
              className="inline-block bg-stone-900 text-white py-4 px-8 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-black transition-colors duration-300"
            >
              Start Exploring
            </Link>
          </div>
        ) : (
          <div className="flex flex-col space-y-16">
            {mockOrders.map((order) => (
              <div key={order.id} className="flex flex-col">
                
                {/* Order Meta Header - Architectural Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-6 border-b border-stone-200 mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-stone-400 font-semibold">Order Number</span>
                    <span className="text-sm font-sans text-stone-900">{order.id}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-stone-400 font-semibold">Date Placed</span>
                    <span className="text-sm font-sans text-stone-900">{order.date}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-stone-400 font-semibold">Total Amount</span>
                    <span className="text-sm font-sans text-stone-900">{order.total}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-stone-400 font-semibold">Status</span>
                    <span className={`text-sm font-sans flex items-center gap-2 ${
                      order.status === 'Delivered' ? 'text-stone-900' : 'text-stone-500'
                    }`}>
                      {order.status === 'Processing' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-pulse" />
                      )}
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="flex flex-col gap-6">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-6 items-center group">
                      
                      {/* Item Image - Paper-toned background against pure white canvas */}
                      <div className="w-24 h-24 shrink-0 bg-[#FAF9F6] border border-stone-200 overflow-hidden">
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                        />
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase tracking-widest text-stone-400 mb-1">
                            {item.category}
                          </span>
                          <span className="text-base font-serif text-stone-900 leading-tight">
                            {item.name}
                          </span>
                          <span className="text-xs font-sans text-stone-500 mt-2 sm:hidden">
                            Qty: {item.quantity} • {item.price}
                          </span>
                        </div>
                        
                        <div className="hidden sm:flex items-center gap-12 text-sm font-sans text-stone-900">
                          <span className="text-stone-500 text-xs tracking-wide">Qty: {item.quantity}</span>
                          <span>{item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-12 mt-auto shrink-0 w-full">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Top Section: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Left Column: Shop */}
          <div>
            <h4 className="text-white text-base font-bold uppercase tracking-wider mb-6">
              Shop
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#all" className="hover:text-blue-500 transition-colors">All Products</a></li>
              <li><a href="#hostel" className="hover:text-blue-500 transition-colors">Hostel Essentials</a></li>
              <li><a href="#electronics" className="hover:text-blue-500 transition-colors">Electronics</a></li>
            </ul>
          </div>
          
          {/* Center Column: More Categories */}
          <div>
            <h4 className="text-white text-base font-bold uppercase tracking-wider mb-6">
              Explore
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#stationery" className="hover:text-blue-500 transition-colors">Stationery</a></li>
              <li><a href="#trekking" className="hover:text-blue-500 transition-colors">Trekking Essentials</a></li>
              <li><a href="#about" className="hover:text-blue-500 transition-colors">About EquipU</a></li>
            </ul>
          </div>

          {/* Right Column: Support & Policies */}
          <div className="md:text-right">
            <h4 className="text-white text-base font-bold uppercase tracking-wider mb-6">
              Support
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#contact" className="hover:text-blue-500 transition-colors">Contact Us</a></li>
              <li><a href="#care" className="hover:text-blue-500 transition-colors">Customer Care</a></li>
              <li><a href="#delivery" className="hover:text-blue-500 transition-colors">Delivery Information</a></li>
              <li><a href="#refund" className="hover:text-blue-500 transition-colors">Refund Policy</a></li>
              <li><a href="#privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Divider, Logo, and Trademark */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          
          {/* Bottom Left: Logo */}
          <div className="text-2xl font-black tracking-tighter text-blue-600 mb-4 md:mb-0 cursor-pointer">
            EquipU
          </div>
          
          {/* Bottom Right: Trademark & Copyright */}
          <div className="text-xs text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} EquipU. All rights reserved. Trademarks belong to their respective owners.
          </div>

        </div>
      </div>
    </footer>
  );
}
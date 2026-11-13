import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { mockProducts } from '../data/products'; 

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef(null);
  
  // Read current states from the URL
  const activeCategory = searchParams.get("category") || "All Products";
  const activeSort = searchParams.get("sort") || "recommended";

  const categories = [
    "All Products", "Hostel Essentials", "Electronics", "Stationery", "Trekking Essentials"
  ];

  const sortOptions = [
    { id: 'recommended', label: 'Recommended' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'name-asc', label: 'Name: A to Z' }
  ];

  // 1. Filter by Category
  let displayedProducts = activeCategory === "All Products" 
    ? [...mockProducts] 
    : mockProducts.filter(product => product.category === activeCategory);

  // 2. Sort the Filtered Products
  displayedProducts.sort((a, b) => {
    const priceA = parseFloat(a.price.replace('$', ''));
    const priceB = parseFloat(b.price.replace('$', ''));

    if (activeSort === 'price-asc') return priceA - priceB;
    if (activeSort === 'price-desc') return priceB - priceA;
    if (activeSort === 'name-asc') return a.name.localeCompare(b.name);
    return 0; // Default (Recommended) keeps original array order
  });

  // Smart URL parameter updating to preserve existing filters when sorting (and vice versa)
  const handleCategoryClick = (cat) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat === "All Products") {
      newParams.delete("category");
    } else {
      newParams.set("category", cat);
    }
    setSearchParams(newParams);
  };

  const handleSortClick = (sortId) => {
    const newParams = new URLSearchParams(searchParams);
    if (sortId === "recommended") {
      newParams.delete("sort");
    } else {
      newParams.set("sort", sortId);
    }
    setSearchParams(newParams);
    setIsSortOpen(false);
  };

  // Close the sort dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Find the active sort label for the UI
  const currentSortLabel = sortOptions.find(opt => opt.id === activeSort)?.label || "Recommended";

  return (
    <main className="flex-1 max-w-[1600px] w-full mx-auto px-12 py-10 flex gap-12">
      
      {/* Left Sidebar */}
      <aside className="w-[20%] shrink-0 flex flex-col">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Browse by</h3>
        <ul className="flex flex-col space-y-4">
          {categories.map((cat) => (
            <li key={cat}>
              <button 
                onClick={() => handleCategoryClick(cat)}
                className={`text-left w-full text-[15px] transition-colors duration-200 ${
                  activeCategory === cat ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Right Content Area */}
      <section className="w-[80%] flex flex-col">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div className="text-gray-500 font-medium text-sm">
            Showing {displayedProducts.length} {displayedProducts.length === 1 ? 'Product' : 'Products'}
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="text-sm font-medium text-gray-600 hover:text-blue-600 flex items-center gap-2 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
            
            {/* Custom Sort Dropdown */}
            <div className="relative" ref={sortDropdownRef}>
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors focus:outline-none"
              >
                <span>Sort by: {currentSortLabel}</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div 
                className={`absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-10 transition-all duration-200 origin-top-right ${
                  isSortOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                }`}
              >
                <div className="py-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSortClick(option.id)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        activeSort === option.id 
                          ? 'bg-blue-50 text-blue-600 font-semibold' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer block"
            >
              <div className="h-48 w-full bg-gray-100 overflow-hidden">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex flex-col h-[140px]">
                <span className="text-xs font-semibold text-blue-500 mb-1">{product.category}</span>
                <h4 className="text-gray-900 font-semibold text-lg mb-2 line-clamp-2">{product.name}</h4>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-gray-900 font-bold">{product.price}</span>
                  <button className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                    +
                  </button>
                </div>
              </div>
            </Link>
          ))}
          
          {displayedProducts.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No products found matching your criteria.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
import React, { useState } from 'react';

export default function Hero() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-gray-900">
      {/* Background Image Container */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${
          isRevealed ? 'blur-none scale-100' : 'blur-2xl scale-105'
        }`}
        style={{ 
          // Placeholder campus/student image - replace URL later
          backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')" 
        }}
      >
        {/* Dark overlay to ensure the switch is always visible */}
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-1000" />
      </div>

      {/* Interactive Switch (Positioned at 3/4th center) */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <span className={`mb-6 text-sm font-bold tracking-[0.2em] text-white uppercase transition-opacity duration-500 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}>
          Interact to Reveal
        </span>
        
        {/* The Switch/Wheel */}
        <button
          onMouseEnter={() => setIsRevealed(true)}
          onMouseLeave={() => setIsRevealed(false)}
          onClick={() => console.log('Switch clicked - future routing/logic here')}
          className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-white/20 hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer group"
        >
          {/* Inner mechanical element of the switch */}
          <div className={`w-8 h-8 rounded-full shadow-inner transition-colors duration-500 ${
            isRevealed ? 'bg-blue-500' : 'bg-white'
          }`} />
        </button>
      </div>
    </div>
  );
}
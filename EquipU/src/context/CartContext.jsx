import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add item or update quantity if it already exists
  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    // Removed the automatic drawer opening from here
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Convert the string price (e.g. "$15") into a float before calculating the sum
  const cartTotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, updateQuantity, removeItem, cartTotal, cartCount, isCartOpen, setIsCartOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for easy access
export const useCart = () => useContext(CartContext);
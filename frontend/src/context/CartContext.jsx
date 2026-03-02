import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(p => p.id === product.id);

      if (exist) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((a, b) => a + b.qty, 0);

  const removeFromCart = (id) => {
  setCart(prev => prev.filter(p => p.id !== id));
};

const decreaseQty = (id) => {
  setCart(prev =>
    prev
      .map(p =>
        p.id === id ? { ...p, qty: p.qty - 1 } : p
      )
      .filter(p => p.qty > 0)
  );
};

const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
        value={{
            cart,
            addToCart,
            removeFromCart,
            decreaseQty,
            clearCart,
            cartCount,
        }}
        >
      {children}
    </CartContext.Provider>
  );
}
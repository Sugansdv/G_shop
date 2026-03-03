import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {

  /* ================= SAFE INITIAL STATE ================= */

  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (err) {
      console.error("Invalid cart JSON in localStorage");
      localStorage.removeItem("cart");
      return [];
    }
  });

  const [discount, setDiscount] = useState(() => {
    const storedDiscount = localStorage.getItem("discount");
    return storedDiscount ? Number(storedDiscount) : 0;
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    return localStorage.getItem("appliedCoupon") || "";
  });

  /* ================= LOCAL STORAGE SYNC ================= */

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save cart to localStorage");
    }
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("discount", discount.toString());
  }, [discount]);

  useEffect(() => {
    localStorage.setItem("appliedCoupon", appliedCoupon);
  }, [appliedCoupon]);

  /* ================= CART FUNCTIONS ================= */

  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(p => p.id === product.id);

      let updatedCart;

      if (exist) {
        updatedCart = prev.map(p =>
          p.id === product.id
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      } else {
        updatedCart = [...prev, { ...product, qty: product.qty || 1 }];
      }

      return updatedCart;
    });

    removeCoupon(); // Remove coupon if cart changes
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
    removeCoupon();
  };

  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(p =>
          p.id === id ? { ...p, qty: p.qty - 1 } : p
        )
        .filter(p => p.qty > 0)
    );

    removeCoupon();
  };

  const clearCart = () => {
    setCart([]);
    removeCoupon();
  };

  /* ================= COUPON FUNCTIONS ================= */

  const applyCoupon = (couponCode, discountAmount) => {
    setAppliedCoupon(couponCode);
    setDiscount(discountAmount);
  };

  const removeCoupon = () => {
    setAppliedCoupon("");
    setDiscount(0);
  };

  /* ================= CART COUNT ================= */

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQty,
        clearCart,
        cartCount,

        // Coupon values
        discount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
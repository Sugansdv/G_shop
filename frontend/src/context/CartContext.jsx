import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {

  /* ================= CART STATE ================= */

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [discount, setDiscount] = useState(() => {
    return Number(localStorage.getItem("discount")) || 0;
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    return localStorage.getItem("appliedCoupon") || "";
  });

  /* ================= LOCAL STORAGE SYNC ================= */

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("discount", discount);
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
        updatedCart = [...prev, { ...product, qty: 1 }];
      }

      return updatedCart;
    });

    // ⚠️ Remove coupon if cart changes
    removeCoupon();
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

  /* ================= COUNT ================= */

  const cartCount = cart.reduce((a, b) => a + b.qty, 0);

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
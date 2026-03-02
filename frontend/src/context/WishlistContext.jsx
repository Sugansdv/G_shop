import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
  setWishlist(prev => {
    const exist = prev.find(p => p.id === product.id);

    if (exist)
      return prev.filter(p => p.id !== product.id);

    return [
      ...prev,
      {
        ...product,
        addedAt: new Date()
      }
    ];
  });
};

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, wishlistCount }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
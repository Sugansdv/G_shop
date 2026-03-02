import React from "react";
import { useNavigate } from "react-router-dom";
import wishlistIcon from "../assets/navbar/wishlist.png";
import addIcon from "../assets/navbar/cart.png";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

export default function ProductCard({ product }) {

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();


  const goToProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={goToProduct}
      className="bg-white rounded-lg shadow relative p-3 cursor-pointer hover:shadow-lg transition"
    >

      {/* ===== DISCOUNT ===== */}
      {product.offer_percent > 0 && (
        <span
          className="absolute top-3 left-0 text-white font-semibold text-md px-4 py-1 rounded-r-full"
          style={{ background: "#343A38" }}
        >
          {product.offer_percent}% Off
        </span>
      )}

      {/* ===== WISHLIST ===== */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center rounded-full cursor-pointer"
        style={{ border: "2px solid #A1555599" }}
      >
        <img src={wishlistIcon} alt="wishlist" className="w-4 h-4" />
      </div>

      {/* ===== IMAGE ===== */}
      <img
        src={product.image}
        alt={product.name}
        className="max-h-36 w-full object-contain mt-4"
      />

      {/* ===== ROW 1 ===== */}
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-gray-400">
          {product.category_name}
        </p>

        <div className="flex items-center text-sm">
          <span>{product.rating}</span>
          <span className="text-yellow-400 ml-1">★</span>
        </div>
      </div>

      {/* ===== TITLE ===== */}
      <h3 className="font-semibold text-lg mt-1">
        {product.name}
      </h3>

      {/* ===== WEIGHT ===== */}
      <p className="text-gray-500 text-sm">
        {product.weight}{" "}
        {product.weight_unit_display || product.weight_unit}
      </p>

      {/* ===== PRICE + BUTTONS ===== */}
      <div className="flex items-center justify-between mt-3">

        {/* PRICE */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">
            ₹ {product.price}
          </span>

          {product.old_price && (
            <span className="text-gray-400 line-through text-sm">
              ₹ {product.old_price}
            </span>
          )}
        </div>

        {/* BUTTONS */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex gap-2"
        >
          <button
           onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
            className="flex items-center gap-1 text-white px-3 py-1 rounded-full text-sm"
            style={{ background: "#1C8057" }}
          >
            <img src={addIcon} alt="add" className="w-4 h-4" />
            ADD
          </button>


          <button
            onClick={(e) => {
              e.stopPropagation();

              if (!isAuthenticated) {
                navigate("/login");
                return;
              }

              addToCart(product);
              navigate("/checkout");
            }}
            className="px-3 py-1 rounded-full text-sm font-medium"
            style={{ background: "#F9C51A" }}
          >
            Buy now
          </button>

        </div>

      </div>

    </div>
  );
}
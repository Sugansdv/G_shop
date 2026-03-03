import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import wishlistIcon from "../assets/navbar/wishlist.png";
import facebookIcon from "../assets/images/facebook.png";
import twitterIcon from "../assets/images/twitter.png";
import instagramIcon from "../assets/images/instagram.png";
import pinterestIcon from "../assets/images/pinterest.png";

export default function ProductDetail() {

  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { addToCart, clearCart } = useCart();


  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}/`).then(res => {
      setProduct(res.data);
      setMainImage(res.data.image);
    });
  }, [id]);

const handleAddToCart = () => {
  addToCart({
    ...product,
    qty: qty,  
  });
};

 const handleBuyNow = () => {
  if (!isAuthenticated) {
    navigate("/login?next=/checkout");
    return;
  }

  clearCart(); 

  addToCart({
    ...product,
    qty: qty,
  });

  navigate("/checkout");
};

  if (!product) return <p>Loading...</p>;

  const shareUrl = window.location.href;

  const gallery = [
    product.image,
    ...(product.images || []).map(i => i.image),
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-12">

      {/* ================= LEFT IMAGE AREA ================= */}
      <div className="bg-[#EFE6F2] p-6 rounded-lg shadow-[12px_4px_4px_0px_#00000040]">

       <div className="w-full h-[420px] flex items-center justify-center">
  <img
    src={mainImage}
    alt="product"
    className="max-w-full max-h-full object-contain"
  />
</div>

        {/* THUMBNAILS */}
        <div className="flex gap-6 justify-center mt-6">
          {gallery.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setMainImage(img)}
              className={`
                w-24 h-24 bg-white rounded-lg cursor-pointer p-2
                border-2
                ${mainImage === img
                  ? "border-green-600"
                  : "border-gray-300"}
              `}
            />
          ))}
        </div>
      </div>

      {/* ================= RIGHT DETAILS ================= */}
      <div className="mt-20">

        <p className="text-gray-500">{product.category_name}</p>

        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <span className="text-xs border px-3 py-2 rounded-full bg-[#F6F2F2]">
            In stock
          </span>
        </div>

        {/* RATING */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-yellow-400 text-3xl gap-5">
            ★★★★★
          </span>
          <span className="font-medium">
            {product.rating} (245 Review)
          </span>
        </div>

        {/* PRICE */}
        <div className="flex gap-4 items-center mt-6">
          <span className="text-4xl font-bold">
            ₹ {product.price}
          </span>

          {product.old_price && (
            <span className="text-gray-400 line-through text-xl">
              ₹ {product.old_price}
            </span>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="mt-4 text-gray-600">
          {product.description}
        </p>

        {/* WEIGHT OPTIONS */}
        <div className="mt-6">
          <p className="font-semibold mb-2">Weight</p>

          <div className="flex gap-3">
            {["500 g", "1 Kg", "2 Kg", "5 Kg"].map(w => (
              <button
                key={w}
                className="px-4 py-2 border rounded-full hover:bg-green-600 hover:text-white"
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* QTY + BUTTONS */}
        <div className="flex items-center gap-4 mt-6">

          {/* QTY */}
          <div className="flex items-center border rounded-full overflow-hidden">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="px-4 py-2 border-r-2"
            >−</button>

            <span className="px-6">{qty}</span>

            <button
              onClick={() => setQty(q => q + 1)}
              className="px-4 py-2 border-l-2"
            >+</button>
          </div>

          <button
  onClick={handleAddToCart}
  className="bg-green-700 text-white px-6 py-3 rounded-full"
>
  Add To Cart
</button>

<button
  onClick={handleBuyNow}
  className="bg-yellow-400 px-6 py-3 rounded-full font-semibold"
>
  Buy Now
</button>

          {/* WISHLIST */}
          <button className="border rounded-full p-3">
            <img src={wishlistIcon} className="w-5" />
          </button>
        </div>

        {/* SKU + TAGS */}
        <div className="mt-8 space-y-2 text-sm">
          <p><b>SKU :</b> {product.sku}</p>
          <p><b>Tags :</b> {product.tags}</p>
        </div>

        {/* SHARE */}
        <div className="flex items-center gap-4 mt-2">

          <span className="font-semibold">Share :</span>

          <a href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank">
            <img src={facebookIcon} className="w-5" />
          </a>

          <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank">
            <img src={twitterIcon} className="w-5" />
          </a>

          <a href="https://instagram.com" target="_blank">
            <img src={instagramIcon} className="w-5" />
          </a>

          <a href={`https://pinterest.com/pin/create/button/?url=${shareUrl}`} target="_blank">
            <img src={pinterestIcon} className="w-5" />
          </a>

        </div>

      </div>
    </div>
  );
}
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {

  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const shareLink = window.location.origin + "/wishlist";

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* ================= HEADER ================= */}
      <div className="bg-yellow-400 rounded-xl p-4 grid grid-cols-5 font-semibold">
        <p>Product</p>
        <p>Price</p>
        <p>Date Added</p>
        <p>In Stock</p>
        <p></p>
      </div>

      {/* ================= ITEMS ================= */}
      {wishlist.map(item => (

        <div
          key={item.id}
          className="grid grid-cols-5 items-center border-b py-6"
        >

          {/* PRODUCT */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => toggleWishlist(item)}
              className="text-xl"
            >
              ✕
            </button>

            <img
              src={item.image}
              className="w-14 h-14 rounded"
            />

            <div>
              <p>{item.name}</p>
              <span className="text-gray-400 text-sm">
                {item.weight} {item.weight_unit}
              </span>
            </div>
          </div>

          {/* PRICE */}
          <p>₹ {item.price}</p>

          {/* DATE ADDED */}
          <p>
            {new Date().toLocaleDateString()}
          </p>

          {/* STOCK */}
          <p className="text-gray-500">
            {item.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* ADD TO CART */}
          <button
            onClick={() => addToCart(item)}
            className="bg-green-700 text-white px-5 py-2 rounded-full w-fit"
          >
            Add to Cart
          </button>

        </div>

      ))}

      {/* ================= SHARE LINK ================= */}
      <div className="flex items-center justify-between mt-10">

        <div className="flex items-center gap-4">

          <span className="font-semibold">
            Wishlist link
          </span>

          <input
            value={shareLink}
            readOnly
            className="border rounded-full px-4 py-2 w-64"
          />

          <button
            onClick={() => navigator.clipboard.writeText(shareLink)}
            className="bg-green-700 text-white px-4 py-2 rounded-full"
          >
            Copy link
          </button>

        </div>

        <button className="bg-green-700 text-white px-6 py-2 rounded-full">
          Order Track
        </button>

      </div>

    </div>
  );
}
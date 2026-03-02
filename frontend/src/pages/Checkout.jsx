import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

  const { cart, cartCount, removeFromCart, decreaseQty } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  /* ---------- TOTAL PRICE ---------- */
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      {/* USER INFO */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <p><b>User:</b> {user?.username}</p>
        <p><b>Email:</b> {user?.email}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* CART ITEMS */}
        <div className="md:col-span-2 bg-white shadow rounded-lg p-5">

          <h2 className="font-semibold mb-4">
            Order Items ({cartCount})
          </h2>

          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹ {item.price} × {item.qty}
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white shadow rounded-lg p-5 h-fit">

          <h2 className="font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>{cartCount}</span>
          </div>

          <div className="flex justify-between mb-4 font-bold">
            <span>Total Price</span>
            <span>₹ {totalPrice}</span>
          </div>

          <button
            className="
              w-full
              bg-[#1C8057]
              text-white
              py-3
              rounded-lg
              hover:bg-green-700
            "
            onClick={() => alert("Payment integration coming soon")}
          >
            Place Order
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-3 underline text-sm"
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>
  );
}
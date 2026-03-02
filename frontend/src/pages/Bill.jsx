import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Bill() {

  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();

  /* ===== CALCULATIONS ===== */

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = subtotal >= 500 ? 0 : 20;
  const tax = 0;
  const total = subtotal + shipping + tax;

  /* clear cart after success */
  const handleContinue = () => {
    clearCart();
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-8">

      {/* SUCCESS MESSAGE */}
      <div className="bg-green-100 text-green-700 p-5 rounded-lg text-center mb-8">
        <h1 className="text-2xl font-bold">
          ✅ Payment Successful
        </h1>
        <p>Your order has been placed successfully.</p>
      </div>

      {/* BILL CARD */}
      <div className="bg-white shadow rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Order Bill
        </h2>

        {/* CUSTOMER */}
        <div className="mb-6 text-sm">
          <p><b>Customer:</b> {user?.username}</p>
          <p><b>Email:</b> {user?.email}</p>
          <p><b>Status:</b> Order Placed</p>
          <p><b>Payment:</b> Paid</p>
        </div>

        {/* ITEMS */}
        <div className="border-t pt-4">

          {cart.map(item => (
            <div
              key={item.id}
              className="flex justify-between py-2"
            >
              <span>
                {item.name} × {item.qty}
              </span>

              <span>
                ₹ {(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          ))}

        </div>

        <hr className="my-4" />

        {/* SUMMARY */}
        <div className="space-y-2 text-sm">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? "Free" : `₹ ${shipping}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹ {tax}</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹ {total.toFixed(2)}</span>
          </div>

        </div>

      </div>

      {/* BUTTON */}
      <div className="text-center mt-8">
        <button
          onClick={handleContinue}
          className="
            bg-[#1C8057]
            text-white
            px-8
            py-3
            rounded-full
            hover:bg-green-700
          "
        >
          Continue Shopping
        </button>
      </div>

    </div>
  );
}
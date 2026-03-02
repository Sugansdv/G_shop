import { useState } from "react";
import { useCart } from "../context/CartContext";
import {
  createOrder,
  createPayment,
} from "../api/orderApi";
import { verifyPayment } from "../api/orderApi";

export default function Checkout() {

  const { cart } = useCart();

  /* ================= STATE ================= */

  const [saved, setSaved] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [message, setMessage] = useState("");

  /* ================= PRICE CALC ================= */

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = subtotal >= 500 ? 0 : 20;
  const tax = 0;
  const discount = 10;

  const total = subtotal + shipping + tax - discount;

  /* ================= SAVE BILLING ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData(e.target);

      const orderData = {
  first_name: form.get("first_name"),
  last_name: form.get("last_name"),
  company: form.get("company"),
  country: form.get("country"),
  street_address: form.get("street_address"),
  city: form.get("city"),
  state: form.get("state"),
  zip_code: form.get("zip_code"),
  phone: form.get("phone"),
  email: form.get("email"),

  subtotal,
  shipping,
  tax,
  total,

  items: cart.map(item => ({
    product_name: item.name,
    price: Number(item.price),
    qty: item.qty,
  })),
};

      const res = await createOrder(orderData);

      setSaved(true);
      setOrderId(res.data.order_id);
      setMessage("✅ Address updated. Now proceed to checkout.");

    } catch (err) {
      console.error(err);
      alert("Failed to save billing details");
    }
  };

  /* ================= RAZORPAY PAYMENT ================= */

  const handleCheckout = async () => {

    if (!saved) {
      alert("Please submit billing details first.");
      return;
    }

    try {

      const res = await createPayment(orderId);

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: res.data.currency,
        order_id: res.data.razorpay_order_id,

        name: "Grocery Store",
        description: "Order Payment",

       handler: async function (response) {

            await verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
            });

            window.location.href = "/bill";
        },

        theme: {
          color: "#1C8057",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
  console.error("PAYMENT ERROR:", err.response?.data);
  alert(
    err.response?.data?.error ||
    "Payment initialization failed"
  );
}
  };

  /* ================= UI ================= */

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

        {/* ================= BILLING FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 space-y-5"
        >

          <h2 className="text-2xl font-semibold">
            Billing Details
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <Input label="First Name *" name="first_name" />
            <Input label="Last Name *" name="last_name" />
          </div>

          <Input label="Company NAME (OPTIONAL)" name="company" />
          <Input label="Country *" name="country" />
          <Input label="Street Address *" name="street_address" />
          <Input label="City *" name="city" />
          <Input label="State *" name="state" />
          <Input label="Zip Code *" name="zip_code" />
          <Input label="Phone *" name="phone" />
          <Input label="Email *" name="email" />

          <div className="text-center pt-6">
            <button
              type="submit"
              className="
                bg-[#1C8057]
                text-white
                px-10
                py-3
                rounded-full
                hover:bg-green-700
              "
            >
              Submit Address
            </button>
          </div>

          {message && (
            <p className="text-green-600 text-center font-medium">
              {message}
            </p>
          )}

        </form>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="bg-white rounded-xl shadow p-6 h-fit sticky top-10">

          <h3 className="font-semibold mb-6">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? "Free" : `₹ ${shipping}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹ {tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Coupon Discount</span>
              <span>₹ {discount.toFixed(2)}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>

          </div>

          <button
            onClick={handleCheckout}
            disabled={!saved}
            className={`
              w-full mt-6 py-3 rounded-full text-white
              ${saved
                ? "bg-[#1C8057] hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"}
            `}
          >
            Proceed to Checkout
          </button>

        </div>

      </div>
    </div>
  );
}


/* ================= INPUT COMPONENT ================= */

function Input({ label, name }) {
  return (
    <div>
      <label className="block mb-2 text-sm">
        {label}
      </label>

      <input
        name={name}
        required
        className="
          w-full
          border
          rounded-lg
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-green-600
        "
      />
    </div>
  );
}
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import {
  createOrder,
  createPayment,
} from "../api/orderApi";
import { verifyPayment } from "../api/orderApi";
import { getAddresses } from "../api/addressApi";

export default function Checkout() {

  const { cart, clearCart, discount, appliedCoupon } = useCart();
  

  /* ================= STATE ================= */

  const [saved, setSaved] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [message, setMessage] = useState("");
  const [addressType, setAddressType] = useState("delivery");
  const [savedAddress, setSavedAddress] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
  loadAddress();
}, []);

const loadAddress = async () => {
  try {

    const res = await getAddresses();

    if (res.data.length > 0) {
      setSavedAddress(res.data[0]);
      setFormData(res.data[0]);
    }

  } catch (err) {
    console.error(err);
  }
};


const handleAddressType = (type) => {

  setAddressType(type);

if (type === "delivery") {

  if (savedAddress) {
    setFormData(savedAddress);
  }

}

  if (type === "billing") {
    setFormData({
      first_name: "",
      last_name: "",
      company: "",
      country: "",
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
      phone: "",
      email: "",
    });
  }

};

  /* ================= PRICE CALC ================= */

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = subtotal >= 500 ? 0 : 20;
  const tax = 0;

  const total = subtotal + shipping + tax - discount;

/* ================= SAVE BILLING ================= */

const handleSubmit = async (e) => {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  try {

    const orderData = {

      ...formData,   // address from delivery or billing form

      coupon_code: appliedCoupon,

      subtotal: subtotal.toString(),
      shipping: shipping.toString(),
      tax: tax.toString(),
      total: total.toString(),

      items: cart.map(item => ({
        product_name: item.name,
        price: Number(item.price),
        qty: item.qty,
      })),

    };

    const res = await createOrder(orderData);

    setSaved(true);
    setOrderId(res.data.order_id);

    setMessage("Address updated. Now proceed to checkout.");

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

      if (res.data.message === "Free order - no payment required") {
        clearCart();
        window.location.href = `/bill/${orderId}`;
        return;
      }


      const options = {
  key: res.data.key,
  amount: res.data.amount,
  currency: res.data.currency,
  order_id: res.data.razorpay_order_id,

  name: "Grocery Store",
  description: "Order Payment",

  prefill: {
    name: `${formData.first_name} ${formData.last_name}`,
    email: formData.email,
    contact: formData.phone,
  },

  theme: {
    color: "#1C8057",
  },

  handler: async function (response) {

    try {

      await verifyPayment({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });

      clearCart();
      window.location.href = `/bill/${orderId}`;

    } catch (err) {

      console.error("Verification failed:", err);
      alert("Payment verification failed");

    }

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

          <div className="flex gap-6 mb-6">

  <label className="flex items-center gap-2">
    <input
      type="radio"
      checked={addressType === "delivery"}
      onChange={() => handleAddressType("delivery")}
    />
    Delivery Address
  </label>

  <label className="flex items-center gap-2">
    <input
      type="radio"
      checked={addressType === "billing"}
      onChange={() => handleAddressType("billing")}
    />
    Use Different Billing Address
  </label>

</div>

          <h2 className="text-2xl font-semibold">
            Billing Details
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <Input
  label="First Name *"
  name="first_name"
  value={formData.first_name || ""}
  onChange={(e) => {
    setFormData({ ...formData, first_name: e.target.value });
    setSaved(false);
  }}
/>

            <Input
  label="Last Name *"
  name="last_name"
  value={formData.last_name || ""}
  onChange={(e) => {
    setFormData({ ...formData, last_name: e.target.value });
    setSaved(false);
  }}
/>
          </div>

          <Input
  label="Company NAME (OPTIONAL)"
  name="company"
  value={formData.company || ""}
  onChange={(e) => {
    setFormData({ ...formData, company: e.target.value });
    setSaved(false);
  }}
  required={false}
/>
          <Input
  label="Country *"
  name="country"
  value={formData.country || ""}
  onChange={(e) => {
    setFormData({ ...formData, country: e.target.value });
    setSaved(false);
  }}
/>
          <Input
  label="Street Address *"
  name="street_address"
  value={formData.street_address || ""}
  onChange={(e) => {
    setFormData({ ...formData, street_address: e.target.value });
    setSaved(false);
  }}
/>
          <Input
  label="City *"
  name="city"
  value={formData.city || ""}
  onChange={(e) => {
    setFormData({ ...formData, city: e.target.value });
    setSaved(false);
  }}
/>
          <Input
  label="State *"
  name="state"
  value={formData.state || ""}
  onChange={(e) => {
    setFormData({ ...formData, state: e.target.value });
    setSaved(false);
  }}
/>
          <Input
  label="Zip Code *"
  name="zip_code"
  value={formData.zip_code || ""}
  onChange={(e) => {
    setFormData({ ...formData, zip_code: e.target.value });
    setSaved(false);
  }}
/>

          <Input
  label="Phone *"
  name="phone"
  value={formData.phone || ""}
  onChange={(e) => {
    setFormData({ ...formData, phone: e.target.value });
    setSaved(false);
  }}
/>
          <Input
  label="Email *"
  name="email"
  value={formData.email || ""}
  onChange={(e) => {
    setFormData({ ...formData, email: e.target.value });
    setSaved(false);
  }}
/>

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

function Input({ label, name, value, onChange, required = true }) {

  return (

    <div>

      <label className="block mb-2 text-sm">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        required={required}
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
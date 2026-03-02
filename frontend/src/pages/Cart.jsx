import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const {
    cart,
    addToCart,
    removeFromCart,
    decreaseQty,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = subtotal > 500 ? 0 : 20;
  const tax = 0;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-8">

      {/* ================= CART ITEMS ================= */}
      <div className="md:col-span-2">

        {/* HEADER */}
        <div className="bg-yellow-400 rounded-xl p-4 grid grid-cols-4 font-semibold">
          <p>Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>

        {cart.map(item => (

          <div
            key={item.id}
            className="grid grid-cols-4 items-center border-b py-6"
          >

            {/* PRODUCT */}
            <div className="flex items-center gap-3">

              <button
                onClick={() => removeFromCart(item.id)}
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

            {/* QTY */}
            <div className="flex items-center border rounded-full w-fit">

              <button
                onClick={() => decreaseQty(item.id)}
                className="px-3"
              >
                −
              </button>

              <span className="px-4">{item.qty}</span>

              <button
                onClick={() => addToCart(item)}
                className="px-3"
              >
                +
              </button>

            </div>

            {/* SUBTOTAL */}
            <p>₹ {(item.price * item.qty).toFixed(2)}</p>

          </div>

        ))}

        {/* COUPON + CLEAR */}
        <div className="flex justify-between mt-6">

          <div className="flex gap-3">
            <input
              placeholder="Coupon code"
              className="border rounded-full px-4 py-2"
            />

            <button className="bg-green-700 text-white px-6 rounded-full">
              Apply coupon
            </button>
          </div>

          <button
            onClick={clearCart}
            className="underline"
          >
            Clear Shopping Cart
          </button>

        </div>

      </div>

      {/* ================= ORDER SUMMARY ================= */}
      <div className="border rounded-xl p-6 h-fit">

        <h2 className="font-semibold mb-6">
          Order Summary
        </h2>

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
            <span>₹ {shipping}</span>
          </div>

          <div className="flex justify-between">
            <span>Taxes</span>
            <span>₹ {tax}</span>
          </div>

          <hr />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹ {total.toFixed(2)}</span>
          </div>

        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full mt-6 bg-green-700 text-white py-3 rounded-full"
        >
          Proceed to Checkout
        </button>

      </div>
    </div>
  );
}
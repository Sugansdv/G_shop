import { useState } from "react";
import axios from "../api/axios";
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  CubeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);

  const handleTrack = async () => {
    try {
      const res = await axios.post("/orders/track/", {
        order_id: orderId,
        email,
      });
      setOrder(res.data);
    } catch (err) {
      alert("Order not found");
    }
  };

  const steps = [
    { label: "Order Placed", icon: ClipboardDocumentListIcon, key: "placed_at" },
    { label: "Accepted", icon: CheckCircleIcon, key: "accepted_at" },
    { label: "In Progress", icon: CubeIcon, key: "processing_at" },
    { label: "On the Way", icon: TruckIcon, key: "on_the_way_at" },
    { label: "Delivered", icon: TruckIcon, key: "delivered_at" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow">

        {!order ? (
          <>
            <p className="text-sm text-gray-600 mb-8">
              To track your order please enter your Order ID and Billing Email.
            </p>

            <div className="space-y-6 max-w-md">
              <div>
                <label className="font-medium">Order ID*</label>
                <input
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full border rounded-full px-6 py-3 mt-2"
                />
              </div>

              <div>
                <label className="font-medium">Billing Email*</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-full px-6 py-3 mt-2"
                />
              </div>

              <button
                onClick={handleTrack}
                className="bg-green-700 text-white px-8 py-3 rounded-full"
              >
                Track Order
              </button>
            </div>
          </>
        ) : (
          <>
            {/* HEADER */}
            <h2 className="text-2xl font-semibold mb-1">
              Order Status
            </h2>
            <p className="text-gray-500 mb-8">
              Order ID : #{order.id}
            </p>

            {/* STATUS TRACKER */}
            {/* STATUS TRACKER OR CANCEL MESSAGE */}

{order.order_status === "cancelled" ? (

  <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-xl text-center mb-12">
    <h3 className="text-lg font-semibold">
      You cancelled the order
    </h3>
    <p className="text-sm mt-2">
      This order has been cancelled and will not be delivered.
    </p>
    <p className="text-sm mt-2">
      Your payment will be refunded within 3-5 business days if it was already processed.
    </p>
  </div>

) : (

  <div className="border rounded-2xl p-8 mb-12">
    <div className="relative flex justify-between items-center">

      {/* Background Line */}
      <div className="absolute top-20 left-0 w-full h-1 bg-gray-200"></div>

      {/* Active Line */}
      <div
        className="absolute top-20 left-0 h-1 bg-green-600 transition-all duration-500"
        style={{
          width: `${(order.current_step / (steps.length - 1)) * 100}%`,
        }}
      ></div>

      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index <= order.current_step;

        return (
          <div
            key={index}
            className="flex flex-col items-center flex-1 relative z-10"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl border-2
              ${
                isActive
                  ? "bg-green-50 border-green-600 text-green-600"
                  : "bg-gray-50 border-gray-300 text-gray-400"
              }`}
            >
              <Icon className="w-6 h-6" />
            </div>

            <p className="text-sm mt-3 font-medium text-center">
              {step.label}
            </p>

            <p className="text-xs text-gray-400 mt-5">
              {order[step.key]
                ? new Date(order[step.key]).toLocaleDateString()
                : "Expected"}
            </p>

          </div>
        );
      })}

    </div>
  </div>

)}

            {/* PRODUCT SECTION */}
            <div>
              <div className="bg-yellow-400 px-6 py-3 rounded-xl font-semibold mb-4">
                Product
              </div>

              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-6 border-b"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                    <div>
                      <p className="font-medium">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.weight}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">
                    ₹ {(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
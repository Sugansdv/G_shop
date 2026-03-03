import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  CubeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

export default function TrackStatus() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`/orders/${id}/`);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const steps = [
    {
      label: "Order Placed",
      icon: ClipboardDocumentListIcon,
      date: order.placed_at,
    },
    {
      label: "Accepted",
      icon: CheckCircleIcon,
      date: order.accepted_at,
    },
    {
      label: "In Progress",
      icon: CubeIcon,
      date: order.processing_at,
    },
    {
      label: "On the Way",
      icon: TruckIcon,
      date: order.on_the_way_at,
    },
    {
      label: "Delivered",
      icon: TruckIcon,
      date: order.delivered_at,
    },
  ];

  const progressWidth =
    (order.current_step / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow">

        {/* HEADER */}
        <h2 className="text-2xl font-semibold mb-1">
          Order Status
        </h2>
        <p className="text-gray-500 mb-8">
          Order ID : #{order.id}
        </p>

        {/* STATUS TRACKER */}
        <div className="border rounded-2xl p-8 mb-12">
          <div className="relative flex justify-between items-center">

            {/* Background Line */}
            <div className="absolute top-10 left-0 w-full h-1 bg-gray-200"></div>

            {/* Active Line */}
            <div
              className="absolute top-10 left-0 h-1 bg-green-600 transition-all duration-500"
              style={{ width: `${progressWidth}%` }}
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
                    className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 ${
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

                  <p className="text-xs text-gray-400 mt-1">
                    {step.date
                      ? new Date(step.date).toLocaleDateString()
                      : "Expected"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* PRODUCT SECTION */}
        <div>
          <div className="bg-yellow-400 px-6 py-3 rounded-xl font-semibold mb-4">
            Product
          </div>

          {order.items.map((item, index) => (
            <div
              key={index}
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

      </div>
    </div>
  );
}
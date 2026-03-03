import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

export default function Bill() {

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

  if (!order) return <div className="p-10">Loading...</div>;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  const downloadInvoice = async () => {
  try {
    const res = await axios.get(
      `/orders/${id}/invoice/`,
      {
        responseType: "blob", // VERY IMPORTANT
      }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice_${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

  } catch (err) {
    console.error("Invoice download failed:", err);
  }
};

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Your order is completed !
          </h1>
          <p className="text-gray-600 mt-2">
            Thanks you . Your Order has been completed
          </p>
        </div>

        {/* INFO BAR */}
        <div className="bg-yellow-400 text-black grid grid-cols-5 gap-4 p-4 rounded-lg text-sm font-medium mb-8">

          <div>
            <p className="font-semibold">Order ID</p>
            <p>#{order.id}</p>
          </div>

          <div>
            <p className="font-semibold">Payment Method</p>
            <p>Razorpay</p>
          </div>

          <div>
            <p className="font-semibold">Transaction ID</p>
            <p>{order.razorpay_payment_id}</p>
          </div>

          <div>
            <p className="font-semibold">Estimated Delivery Date</p>
            <p>{deliveryDate.toDateString()}</p>
          </div>

          <div className="text-right mt-6">
          <button
            onClick={downloadInvoice}
            className="bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Download Invoice
          </button>
        </div>

        </div>

        {/* ORDER DETAILS */}
        <div className="border rounded-xl p-6">

          <div className="flex justify-between mb-6">
            <h2 className="text-lg font-semibold">
              Order Details
            </h2>
            <button className="border px-4 py-1 rounded-full text-sm">
              Sub Total
            </button>
          </div>

          {/* PRODUCTS */}
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-4 border-b"
            >
              <div>
                <p className="font-medium">
                  {item.product_name}
                </p>
                <p className="text-sm text-gray-500">
                  {item.weight} 
                </p>
              </div>

              <p>
                ₹ {(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}

          {/* SUMMARY */}
          <div className="pt-6 space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {order.shipping === 0
                  ? "₹ 00.00"
                  : `₹ ${order.shipping}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹ {order.tax}</span>
            </div>

            <div className="flex justify-between">
              <span>Coupon Discount</span>
              <span>₹ 10.00</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹ {order.total}</span>
            </div>

          </div>

        </div>

        {/* DOWNLOAD BUTTON */}
        

      </div>

    </div>
  );
}
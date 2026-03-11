import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyOrders,
  requestCancelOrder,
  addReview,
} from "../../api/orderApi";

export default function MyOrders() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [reviewItem, setReviewItem] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= CANCEL ORDER ================= */

  const cancelOrder = async (id) => {

    if (!window.confirm("Cancel this order?")) return;

    try {
      await requestCancelOrder(id);
      alert("Cancel request sent");
      fetchOrders();
    } catch {
      alert("Unable to cancel order");
    }
  };

  /* ================= SUBMIT REVIEW ================= */

  const submitReview = async () => {

    try {

      await addReview({
        product_name: reviewItem.product_name,
        rating,
        comment,
      });

      alert("Review submitted");

      setReviewItem(null);
      setComment("");
      setRating(5);

    } catch {
      alert("Failed to submit review");
    }
  };

  return (

    <div className="space-y-10">

      {orders.map((order) => (

        <div
          key={order.id}
          className="bg-[#f3eeec] rounded-2xl p-6"
        >

          {/* HEADER */}

          <div className="bg-yellow-400 rounded-xl grid grid-cols-4 px-6 py-4 text-sm font-medium mb-6">

            <div>
              <p className="text-xs text-gray-700">Order ID</p>
              <p className="font-semibold">#{order.id}</p>
            </div>

            <div>
              <p className="text-xs text-gray-700">Payment Method</p>
              <p className="font-semibold">Razorpay</p>
            </div>

            <div>
              <p className="text-xs text-gray-700">Total Payment</p>
              <p className="font-semibold">₹ {order.total}</p>
            </div>

            <div>
              <p className="text-xs text-gray-700">
                Estimated Delivery Date
              </p>
              <p className="font-semibold">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>

          </div>


          {/* PRODUCTS */}

          {order.items.map((item, i) => (

            <div
              key={i}
              className="flex justify-between items-center py-5 border-b"
            >

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>

                <div>
                  <p className="font-medium">
                    {item.product_name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.qty}
                  </p>
                </div>

              </div>

              <div className="flex gap-4 items-center">

                <p className="font-medium">
                  ₹ {(item.price * item.qty).toFixed(2)}
                </p>

                {order.order_status === "delivered" && (

                  <button
                    onClick={() => setReviewItem(item)}
                    className="bg-green-700 text-white px-4 py-2 rounded-full text-sm"
                  >
                    Add Review
                  </button>

                )}

              </div>

            </div>

          ))}


          {/* STATUS */}

          <div className="flex items-center gap-4 mt-6">

            <span className="px-5 py-1 rounded-full border text-sm">

              {order.order_status}

            </span>

          </div>


          {/* ACTION BUTTONS */}

          <div className="flex items-center mt-6">

            <div className="flex gap-4">

              <button
                onClick={() => navigate("/track-order")}
                className="bg-green-700 text-white px-6 py-2 rounded-full text-sm"
              >
                Track Order
              </button>

              <button
                onClick={() => navigate(`/bill/${order.id}`)}
                className="border px-6 py-2 rounded-full text-sm"
              >
                Invoice
              </button>

            </div>


            {order.order_status !== "cancelled" &&
              order.order_status !== "delivered" &&
              order.cancel_status === "none" && (

                <button
                  onClick={() => cancelOrder(order.id)}
                  className="ml-auto text-green-700 font-medium text-sm"
                >
                  Cancel Order
                </button>

              )}

          </div>

        </div>

      ))}


      {/* REVIEW FORM */}

      {reviewItem && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h3 className="text-lg font-semibold mb-4">
              Review {reviewItem.product_name}
            </h3>

            <label className="text-sm">Rating</label>

            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border w-full p-2 rounded mt-1 mb-4"
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Bad</option>
            </select>

            <label className="text-sm">Comment</label>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border w-full p-2 rounded mt-1 mb-4"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setReviewItem(null)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={submitReview}
                className="bg-green-700 text-white px-4 py-2 rounded"
              >
                Submit
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}
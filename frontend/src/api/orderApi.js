import api from "./axios";

/* ================= CREATE ORDER ================= */
/* Save billing address + order */

export const createOrder = (data) =>
  api.post("/orders/create/", data);



/* ================= CREATE PAYMENT ================= */
/* Generate Razorpay Order */

export const createPayment = (orderId) =>
  api.post("/orders/payment/", {
    order_id: orderId,
  });



/* ================= VERIFY PAYMENT ================= */
/* (used later after Razorpay success) */

export const verifyPayment = (data) =>
  api.post("/orders/verify-payment/", data);


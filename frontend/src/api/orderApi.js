import api from "./axios";

/* ================= CREATE ORDER ================= */
/* Save billing address + order */

export const createOrder = (data) => {
  return api.post("/orders/create/", data);
};



/* ================= CREATE PAYMENT ================= */
/* Generate Razorpay Order */

export const createPayment = (orderId) => {
  return api.post("/orders/payment/", {
    order_id: orderId,
  });
};



/* ================= VERIFY PAYMENT ================= */
/* Verify Razorpay signature */

export const verifyPayment = (data) => {
  return api.post("/orders/verify-payment/", data);
};



/* ================= GET USER ORDERS ================= */
/* Used in MyOrders page */

export const getMyOrders = () => {
  return api.get("/orders/my-orders/");
};



/* ================= CANCEL ORDER REQUEST ================= */
/* User sends cancel request (admin approves later) */

export const requestCancelOrder = (orderId) => {
  return api.post(`/orders/${orderId}/request-cancel/`);
};



/* ================= DOWNLOAD INVOICE ================= */
/* Returns PDF file */

export const downloadInvoice = (orderId) => {
  return api.get(`/orders/${orderId}/invoice/`, {
    responseType: "blob",
  });
};



/* ================= TRACK ORDER ================= */
/* Used in TrackOrder page */

export const trackOrder = (data) => {
  return api.post("/orders/track/", data);
};



export const addReview = (data) =>
  api.post("/orders/add-review/", data);
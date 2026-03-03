import api from "./axios";

/* ================= APPLY COUPON ================= */

export const applyCoupon = async (code) => {
  const response = await api.post("/orders/apply-coupon/", {
    code: code,
  });

  return response.data;
};
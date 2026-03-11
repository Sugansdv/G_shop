import api from "./axios";

/* ================= GET ADDRESSES ================= */

export const getAddresses = () =>
  api.get("/orders/addresses/");


/* ================= ADD ADDRESS ================= */

export const addAddress = (data) =>
  api.post("/orders/addresses/", data);


/* ================= DELETE ADDRESS ================= */

export const deleteAddress = (id) =>
  api.delete(`/orders/addresses/${id}/delete/`);


/* ================= UPDATE ADDRESS ================= */

export const updateAddress = (id, data) =>
  api.put(`/orders/addresses/${id}/update/`, data);
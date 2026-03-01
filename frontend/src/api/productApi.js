import api from "./axios";

export const fetchProducts = (params) =>
  api.get("/products/", { params });

export const fetchCategories = () =>
  api.get("/categories/");
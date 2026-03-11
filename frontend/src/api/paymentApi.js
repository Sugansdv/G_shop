import api from "./axios";

export const getCards = () =>
  api.get("/orders/cards/");

export const saveCard = (data) =>
  api.post("/orders/cards/add/", data);
import api from "./axios";

export const changePassword = (data) =>
  api.post("/accounts/change-password/", data);
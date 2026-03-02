import api from "./axios";

/* ---------- REGISTER ---------- */
export const registerUser = (data) => {
  return api.post("/accounts/register/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/* ---------- LOGIN ---------- */
export const loginUser = (data) => {
  return api.post("/accounts/login/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
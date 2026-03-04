import api from "./axios";

/* ---------- GET PROFILE ---------- */
export const getProfile = () => {
  return api.get("/accounts/profile/");
};

/* ---------- UPDATE PROFILE ---------- */
export const updateProfile = (data) => {
  return api.put("/accounts/profile/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
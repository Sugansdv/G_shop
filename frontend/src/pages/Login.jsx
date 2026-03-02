import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import bg from "../assets/images/login_bg.png";
import userImg from "../assets/images/user.png";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const redirectTo =
    new URLSearchParams(location.search).get("next") || "/";

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- INPUT ---------- */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------- LOGIN ---------- */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await loginUser(form);

      login({
        username: res.data.username,
      });

      navigate(redirectTo);

    } catch (err) {
      const errors = err.response?.data;

      if (errors?.detail) {
        setError(errors.detail);
      } else {
        setError("Invalid username or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center -my-16">

      {/* ===== BACKGROUND IMAGE ===== */}
      <img
        src={bg}
        alt="background"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-screen w-[800px] object-contain pointer-events-none"
      />


      {/* ===== LOGIN FORM LEFT SIDE ===== */}
      <div className="absolute left-72 z-10 flex items-center h-screen pl-10 md:pl-24">

        <form
          onSubmit={handleLogin}
          className="
            w-[380px]
            text-white
            p-10
          "
        >

          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <img src={userImg} className="w-20" />
          </div>

          <h1 className="text-2xl text-center font-serif mb-8">
            WELCOME
          </h1>

          <Input
            label="Username"
            name="username"
            onChange={handleChange}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />

          <p className="text-right text-sm mt-1 cursor-pointer">
            Forgot Password?
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-300 text-sm text-center mt-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-yellow-400
              text-green-900
              font-bold
              py-3
              rounded-md
              mt-6
              hover:bg-[#0D5C44]
              hover:border-x-emerald-950
              hover:text-yellow-400
              transition
            "
          >
            {loading ? "Logging in..." : "LOG IN"}
          </button>

        </form>
      </div>
    </div>
  );
}


/* ---------- INPUT ---------- */

function Input({ label, type = "text", name, onChange }) {
  return (
    <div className="mb-6">
      <label className="block mb-2">{label}</label>

      <input
        type={type}
        name={name}
        onChange={onChange}
        required
        className="
          w-full
          bg-transparent
          border-b-2
          border-yellow-400
          outline-none
          py-2
        "
      />
    </div>
  );
}
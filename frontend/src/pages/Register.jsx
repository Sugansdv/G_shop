import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import bg from "../assets/images/register_bg.png";
import registerBtn from "../assets/images/register.png";
import signinBtn from "../assets/images/sign_in.png";

export default function Register() {

  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const redirectTo =
    new URLSearchParams(location.search).get("next") || "/";

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  /* ---------- INPUT CHANGE ---------- */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------- REGISTER ---------- */
  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      /* ✅ AUTO LOGIN */
      login({
        username: form.username,
        email: form.email,
      });

      /* ✅ REDIRECT HOME */
      navigate(redirectTo);

    } catch (err) {

  console.log(err.response?.data);

  const errors = err.response?.data;

  if (errors?.username) {
    alert(errors.username[0]);
  } else if (errors?.email) {
    alert(errors.email[0]);
  } else {
    alert("Registration failed");
  }
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center my-10">

      {/* BACKGROUND */}
      <img
        src={bg}
        alt="bg"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-screen object-contain pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-white mb-5">
          Register
        </h1>

        <form className="space-y-5" onSubmit={handleRegister}>

          <Input label="Name" name="username" onChange={handleChange} />

          <Input label="Email" name="email" onChange={handleChange} />

          <Input label="Phone Number" name="phone" onChange={handleChange} />

          <Input label="Password" type="password" name="password" onChange={handleChange} />

          <Input label="Confirm Password" type="password" name="confirmPassword" onChange={handleChange} />

          {/* REGISTER BUTTON */}
          <div className="flex justify-center mt-8">
            <button type="submit" disabled={loading}>
              <img
                src={registerBtn}
                className={`w-60 h-10 transition ${
                  loading ? "opacity-50" : "hover:scale-105"
                }`}
              />
            </button>
          </div>

          {/* SIGN IN BUTTON */}
          <div className="flex justify-center mt-4">
            <img
              src={signinBtn}
              onClick={() => navigate("/login")}
              className="w-60 h-10 cursor-pointer hover:scale-105"
            />
          </div>

        </form>
      </div>
    </div>
  );
}

/* ---------- INPUT COMPONENT ---------- */

function Input({ label, type = "text", name, onChange }) {
  return (
    <div>
      <label className="text-white block mb-1">{label}</label>

      <input
        type={type}
        name={name}
        onChange={onChange}
        required
        className="
          w-full
          bg-transparent
          border border-white/70
          rounded-md
          px-4 py-3
          text-white
          placeholder-white/70
          outline-none
        "
      />
    </div>
  );
}
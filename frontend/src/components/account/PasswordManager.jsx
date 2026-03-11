import { useState } from "react";
import { changePassword } from "../../api/passwordApi";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function PasswordManager() {

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {

      const res = await changePassword(form);

      alert(res.data.message);

      // logout after password change
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";

    } catch (err) {

      alert(err.response?.data?.error || "Password update failed");

    }

  };

  return (

    <div className="max-w-md">

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* CURRENT PASSWORD */}

        <PasswordInput
          label="Password *"
          value={form.current_password}
          show={showCurrent}
          toggle={() => setShowCurrent(!showCurrent)}
          onChange={(e) =>
            setForm({ ...form, current_password: e.target.value })
          }
        />

        <p className="text-right text-sm text-red-500 cursor-pointer">
          Forgot Password ?
        </p>

        {/* NEW PASSWORD */}

        <PasswordInput
          label="New Password"
          value={form.new_password}
          show={showNew}
          toggle={() => setShowNew(!showNew)}
          onChange={(e) =>
            setForm({ ...form, new_password: e.target.value })
          }
        />

        {/* CONFIRM PASSWORD */}

        <PasswordInput
          label="Confirm New Password"
          value={form.confirm_password}
          show={showConfirm}
          toggle={() => setShowConfirm(!showConfirm)}
          onChange={(e) =>
            setForm({ ...form, confirm_password: e.target.value })
          }
        />

        <button
          className="bg-green-700 text-white px-6 py-3 rounded-full"
        >
          Update Password
        </button>

      </form>

    </div>

  );
}

function PasswordInput({ label, value, onChange, show, toggle }) {

  return (

    <div>

      <label className="block mb-2">
        {label}
      </label>

      <div className="relative">

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="Enter Password"
          required
          className="
            w-full
            border
            rounded-full
            px-5
            py-3
            pr-12
            outline-none
          "
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-4 top-3"
        >
          {show ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>

      </div>

    </div>

  );
}
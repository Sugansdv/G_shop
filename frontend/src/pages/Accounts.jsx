import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import PersonalInfo from "../components/account/PersonalInfo";

export default function Accounts() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const [active, setActive] = useState("personal");

  const handleLogout = () => {
    logout();          // same logout used in Navbar
    navigate("/login");     // redirect after logout
  };

  return (

    <div className="max-w-6xl mx-auto mt-16 flex gap-12">

      {/* ================= SIDEBAR ================= */}

      <div className="w-64 flex flex-col gap-4">

        <SidebarButton
          label="Personal Information"
          active={active === "personal"}
          onClick={() => setActive("personal")}
        />

        <SidebarButton
          label="My Orders"
          active={active === "orders"}
          onClick={() => setActive("orders")}
        />

        <SidebarButton
          label="Manage Address"
          active={active === "address"}
          onClick={() => setActive("address")}
        />

        <SidebarButton
          label="Payment Method"
          active={active === "payment"}
          onClick={() => setActive("payment")}
        />

        <SidebarButton
          label="Password Manager"
          active={active === "password"}
          onClick={() => setActive("password")}
        />

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="
          border
          border-red-400
          text-red-500
          p-3
          rounded-lg
          text-left
          hover:bg-red-50
          "
        >
          Logout
        </button>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="flex-1">

        {active === "personal" && <PersonalInfo />}

        {active === "orders" && (
          <Placeholder title="My Orders" />
        )}

        {active === "address" && (
          <Placeholder title="Manage Address" />
        )}

        {active === "payment" && (
          <Placeholder title="Payment Method" />
        )}

        {active === "password" && (
          <Placeholder title="Password Manager" />
        )}

      </div>

    </div>
  );
}


/* ================= SIDEBAR BUTTON ================= */

function SidebarButton({ label, active, onClick }) {

  return (

    <button
      onClick={onClick}
      className={`
        p-3
        rounded-lg
        text-left
        border
        transition

        ${active
          ? "bg-yellow-400 border-yellow-400 font-medium"
          : "border-gray-300 hover:bg-gray-50"}
      `}
    >
      {label}
    </button>

  );

}


/* ================= TEMP PLACEHOLDER ================= */

function Placeholder({ title }) {

  return (

    <div className="bg-gray-100 p-10 rounded-lg">

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
        This section will be implemented next.
      </p>

    </div>

  );

}
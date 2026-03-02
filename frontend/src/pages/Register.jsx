import bg from "../assets/images/register_bg.png";
import registerBtn from "../assets/images/register.png";
import signinBtn from "../assets/images/sign_in.png";

export default function Register() {
  return (
    <div className="relative min-h-screen flex items-center justify-center my-10">

      {/* ===== CENTERED BACKGROUND ===== */}
      <img
        src={bg}
        alt="bg"
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          max-h-screen
          object-contain
          pointer-events-none
        "
      />

      {/* ===== FORM OVER BG ===== */}
      <div className="relative z-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-white mt-1 mb-5">
          Register
        </h1>

        <form className="space-y-5">

          <Input label="Name" placeholder="Name" />
          <Input label="Email" placeholder="Email" />
          <Input label="Phone Number" placeholder="Phone Number" />
          <Input label="Password" type="password" placeholder="Password" />
          <Input label="Confirm password" type="password" placeholder="Confirm password" />
<div className="flex justify-center mt-8">
  <img
    src={registerBtn}
    className="
      w-60 h-10 cursor-pointer
      transition-all duration-300
      hover:scale-105
      hover:-translate-y-1
      hover:drop-shadow-lg
    "
  />
</div>

{/* SIGNIN BUTTON */}
<div className="flex justify-center mt-4">
  <img
    src={signinBtn}
    className="
      w-60 h-10 cursor-pointer
      transition-all duration-300
      hover:scale-105
      hover:-translate-y-1
      hover:drop-shadow-lg
    "
  />
</div>

        </form>

      </div>
    </div>
  );
}

/* ===== INPUT ===== */

function Input({ label, type = "text", placeholder }) {
  return (
    <div>
      <label className="text-white block mb-1">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
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
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/navbar/logo.png";
import locationIcon from "../assets/navbar/location.png";
import truckIcon from "../assets/navbar/truck.png";
import offersIcon from "../assets/navbar/offers.png";
import lensIcon from "../assets/navbar/lens.png";
import wishlistIcon from "../assets/navbar/wishlist.png";
import cartIcon from "../assets/navbar/cart.png";
import userIcon from "../assets/navbar/user.png";
import yellowBox from "../assets/navbar/browse_cat.png";
import arrow from "../assets/navbar/down_arrow.png";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";


export default function Navbar() {
  const [location, setLocation] = useState("Tirunelveli, Tamil Nadu");
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const [openAccount, setOpenAccount] = useState(false);

  return (
    <div className="w-full">

      {/* ================= FIRST ROW ================= */}
      <div className="bg-[#F9C51A] text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2 flex-wrap gap-2">

          <p>call us : + 91 996576569</p>

          <p className="font-semibold text-center">
            Sign up and GET 50%OFF for first order.
            <span className="cursor-pointer ml-1 text-[#060C09]">
              Sign up now
            </span>
          </p>

          <div className="flex items-center gap-5">

  <div className="flex items-center gap-1 cursor-pointer pr-5 border-r border-white">
    <img src={locationIcon} className="w-4" />
    Deliver to 411017
  </div>

  <div className="flex items-center gap-1 cursor-pointer pr-5 border-r border-white">
    <img src={truckIcon} className="w-4" />
    Track your order
  </div>

  <div className="flex items-center gap-1 cursor-pointer">
    <img src={offersIcon} className="w-4" />
    All Offers
  </div>

</div>
        </div>
      </div>

      {/* ================= SECOND ROW ================= */}
      <div className="bg-[#1C8057] text-white">

        <div className="max-w-7xl mx-auto px-4 py-4">

          <div className="flex flex-wrap items-center justify-between gap-4">

            {/* LOGO */}
            <div className="ms-16 flex items-center gap-4">
              <img src={logo} className="w-20" />
            </div>

            {/* LOCATION */}
           <div className="flex items-center cursor-pointer">

  {/* Map Icon */}
  <img src={locationIcon} className="w-4 h-4 mr-2" />

  {/* Location Select */}
  <select
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="appearance-none bg-[#1C8057] font-semibold outline-none cursor-pointer"
  >
    <option className="text-black">
      Tirunelveli, Tamil Nadu
    </option>
    <option className="text-black">
      Chennai, Tamil Nadu
    </option>
    <option className="text-black">
      Bangalore, Karnataka
    </option>
  </select>

  {/* Arrow */}
  <img src={arrow} className="w-3 h-2 ml-1" />

</div>

            {/* SEARCH BAR */}
            <div className="flex-1 max-w-xl w-full">
              <div className="bg-[#63B895] rounded-full flex items-center px-4 py-2">

                <select className="bg-transparent outline-none text-sm mr-4 border-r border-[#cbb3b3]">
                  <option>All Categories</option>
                </select>

                <input
                  type="text"
                  placeholder="Search for products"
                  className="flex-1 bg-transparent outline-none placeholder-white"
                />

                <img src={lensIcon} className="w-5 cursor-pointer" />
              </div>
            </div>

            {/* ICONS */}
            <div className="flex items-center gap-5">

              <div className="relative">
  <Link to="/wishlist" className="relative">
    <img src={wishlistIcon} className="w-6 cursor-pointer" />
</Link>

  {wishlistCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {wishlistCount}
    </span>
  )}
</div>

              <div className="relative">
  <Link to="/cart" className="relative">
  <img src={cartIcon} className="w-6" />
</Link>

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {cartCount}
    </span>
  )}
</div>

              <div className="relative">

  {/* ---------- NOT LOGGED IN ---------- */}
  {!isAuthenticated ? (
  <Link to="/login">
    <img src={userIcon} className="w-6 cursor-pointer" />
  </Link>
) : (
  <Link to="/account" className="flex items-center gap-2">
    <img src={userIcon} className="w-6" />
    <span className="hidden md:block font-semibold">
      Hello {user.username}
    </span>
  </Link>
)}

</div>
            </div>
          </div>

         {/* ======= MENU ROW ======= */}
<div className="flex items-center mt-4 gap-24">

  {/* Yellow Box */}
  <div
    className="w-[220px] h-[45px] rounded-lg bg-no-repeat bg-cover"
    style={{
      backgroundImage: `url(${yellowBox})`,
    }}
  />

  {/* Menu Container */}
  <div className="flex flex-1 justify-between items-center">

    {/* Left Menu Links */}
    <div className="flex flex-wrap gap-12 font-medium text-md">
      <a href="/">Home</a>
      <a href="/product">Shop</a>
      <a href="/products?category=Fruits">Fruits</a>
      <a href="/products?category=Vegetables">Vegetables</a>
      <a href="/products?category=Beverages">Beverages</a>
      <a href="/about">About us</a>
      <a href="/faq">FAQ</a>
      <a href="/blogs">Blogs</a>
    </div>

    {/* Right Side Recently View */}
    <div className="flex items-center gap-2 text-yellow-300 cursor-pointer">
      <span>Recently view</span>
      <img src={arrow} className="w-3 h-2 cursor-pointer" />
    </div>

  </div>

</div>

        </div>
      </div>
    </div>
  );
}
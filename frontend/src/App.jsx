import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Bill from "./pages/Bill";
import FAQ from "./pages/FAQ";
import AboutSection from "./pages/AboutSection";

import TrackOrder from "./pages/TrackOrder";
import TrackStatus from "./pages/TrackStatus";
// import Profile from "./pages/Profile"; // ✅ Add this

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Products />} />

        {/* Products */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Cart & Wishlist */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Profile (Navbar dropdown uses this) */}
        {/* <Route path="/profile" element={<Profile />} /> */}

        {/* Checkout & Orders */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/bill/:id" element={<Bill />} />

        {/* Info Pages */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<AboutSection />} />

        {/* TRACK ORDER FORM */}
        <Route path="/track-order" element={<TrackOrder />} />

        {/* TRACK STATUS PAGE */}
        <Route path="/track-status/:id" element={<TrackStatus />} />

        {/* Optional 404 Page */}
        <Route path="*" element={<h1 className="text-center mt-10 text-2xl">404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
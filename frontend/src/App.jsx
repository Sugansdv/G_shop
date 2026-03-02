import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
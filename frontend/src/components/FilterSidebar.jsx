import { useEffect, useState } from "react";
import { fetchCategories } from "../api/productApi";

export default function FilterSidebar({ filters, setFilters }) {

  const [categories, setCategories] = useState([]);

  /* ---------- PRICE STATE ---------- */
  const [price, setPrice] = useState({
    min: 100,
    max: 1000,
  });

  useEffect(() => {
    fetchCategories().then(res =>
      setCategories(res.data.results)
    );
  }, []);

  /* ---------- UPDATE FILTER ---------- */

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  /* ---------- PRICE SLIDER ---------- */

  const handlePriceChange = (type, value) => {

    const newPrice = {
      ...price,
      [type]: Number(value),
    };

    setPrice(newPrice);

    setFilters(prev => ({
      ...prev,
      price_min: newPrice.min,
      price_max: newPrice.max,
      page: 1,
    }));
  };

  /* ---------- BRANDS ---------- */

  const brands = [
    "Fresh Harvest",
    "Nature's products",
    "Good Grains",
    "Farm Fresh",
    "Frozen Foods",
    'Healthy Choice',
    "Ferrero Rocher",
  ];

  return (
    <div className="w-72 flex flex-col
                    h-[calc(100vh-120px)] rounded">

      {/* HEADER */}
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">Filter Options</h2>
      </div>

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* ================= CATEGORY ================= */}
        <div>
          <h3 className="font-semibold mb-2">Category</h3>

          {categories.map(cat => (
            <label key={cat.id} className="flex items-center mb-1">
              <input
                type="checkbox"
                onChange={() =>
                  updateFilter("category", cat.id)
                }
              />
              <span className="ml-2">{cat.name}</span>
            </label>
          ))}
        </div>

        <hr />

        {/* ================= PRICE BAR ================= */}
        <div>
          <h3 className="font-semibold mb-2">Price</h3>

          <p className="mb-3 font-medium">
            ₹ {price.min} — ₹ {price.max}
          </p>

          {/* MIN SLIDER */}
          <input
            type="range"
            min="0"
            max="1000"
            value={price.min}
            onChange={(e) =>
              handlePriceChange("min", e.target.value)
            }
            className="w-full accent-green-700"
          />

          {/* MAX SLIDER */}
          <input
            type="range"
            min="0"
            max="1000"
            value={price.max}
            onChange={(e) =>
              handlePriceChange("max", e.target.value)
            }
            className="w-full accent-green-700 mt-2"
          />
        </div>

        <hr />

        {/* ================= REVIEW ================= */}
        <div>
          <h3 className="font-semibold mb-2">Review</h3>

          {[5,4,3,2,1].map(star => (
            <label key={star} className="flex items-center mb-1">
              <input
                type="checkbox"
                onChange={() =>
                  updateFilter("rating_range", String(star))
                }
              />

              <span className="ml-2 text-yellow-400">
                {"★".repeat(star)}
                <span className="text-purple-300">
                  {"★".repeat(5-star)}
                </span>
              </span>
            </label>
          ))}
        </div>

        <hr />

        {/* ================= BRAND ================= */}
        <div>
          <h3 className="font-semibold mb-2">Brand</h3>

          {brands.map(b => (
            <label key={b} className="flex items-center mb-1">
              <input
                type="checkbox"
                onChange={() => updateFilter("brand", b)}
              />
              <span className="ml-2">{b}</span>
            </label>
          ))}
        </div>

        <hr />

        {/* ================= AVAILABILITY ================= */}
        <div>
          <h3 className="font-semibold mb-2">Availability</h3>

          <label className="flex items-center">
            <input
              type="checkbox"
              onChange={() => updateFilter("in_stock", true)}
            />
            <span className="ml-2">In Stock</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              onChange={() => updateFilter("in_stock", false)}
            />
            <span className="ml-2">Out Of Stock</span>
          </label>
        </div>

      </div>

      {/* FIXED BUTTON */}
      <div className="p-4 border-t">
        <button className="w-full bg-green-700 text-white py-3 rounded-lg">
          Submit
        </button>
      </div>

    </div>
  );
}
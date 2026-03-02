import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";

import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import ActiveFilters from "../components/ActiveFilters";

export default function Products() {

  /* ================= STATE ================= */

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    ordering: null,
    category: "",
    brand: "",
    in_stock: "",
    price_min: "",
    price_max: "",
    rating_range: "",
  });

  /* ================= LOAD PRODUCTS ================= */

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, v]) => v !== "" && v !== null
      )
    );

      const res = await fetchProducts(filters);

      setProducts(res.data.results || []);
      setTotal(res.data.count || 0);

    } catch (err) {
      console.error("Product fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= PAGINATION COUNT ================= */

  const start = total === 0
    ? 0
    : (filters.page - 1) * 12 + 1;

  const end = Math.min(filters.page * 12, total);

  /* ================= UI ================= */

  return (
    <div className="flex gap-6">

      {/* ================= FILTER SIDEBAR ================= */}
      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
      />

      {/* ================= PRODUCT AREA ================= */}
      <div className="flex-1 p-6">

        {/* ===== HEADER ===== */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">

          <p className="text-sm font-medium">
            Showing {start}-{end} of {total} results
          </p>

          {/* SORT */}
          <select
  value={filters.ordering ?? ""}
  onChange={(e) =>
    setFilters(prev => ({
      ...prev,
      ordering: e.target.value || null,
      page: 1,
    }))
  }
  className="border rounded px-3 py-2 text-sm"
>
            <option value="">Default sorting</option>
            <option value="price">Price Low → High</option>
            <option value="-price">Price High → Low</option>
            <option value="-rating">Top Rated</option>
            <option value="-created_at">Newest</option>
          </select>

        </div>

       {/* ===== ACTIVE FILTER ROW ===== */}
<div className="flex items-center gap-4 mb-6 flex-wrap">

  <p className="font-semibold text-sm whitespace-nowrap">
    Active Filters:
  </p>

  <ActiveFilters
    filters={filters}
    setFilters={setFilters}
  />

</div>

        {/* ===== PRODUCTS GRID ===== */}
        {loading ? (

          <div className="text-center py-20 text-gray-500">
            Loading products...
          </div>

        ) : (

          <div
            className="
            grid
            [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]
            gap-8
            bg-[#F0DEF6]
            p-6
            rounded-lg
          "
          >
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>

        )}

        {/* ===== PAGINATION ===== */}
        <Pagination
          total={total}
          filters={filters}
          setFilters={setFilters}
        />

      </div>
    </div>
  );
}
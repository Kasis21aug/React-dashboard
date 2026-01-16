import { useEffect, useState } from "react";
import {
  getProducts,
  updateProductTitle,
  deleteProduct,
} from "../api/productApi";
import ProductTable from "../components/ProductTable";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    priceRange: "",
    ratingRange: "",
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const PRICE_RANGES = [
  { label: "₹0 - ₹50", min: 0, max: 50 },
  { label: "₹51 - ₹200", min: 51, max: 200 },
  { label: "₹201 - ₹500", min: 201, max: 500 },
  { label: "₹501 - ₹1000", min: 501, max: 1000 },
  { label: "₹1000+", min: 1001, max: Infinity },
  ];

const RATING_RANGES = [
  { label: "1 - 2", min: 1, max: 2 },
  { label: "2 - 3", min: 2, max: 3 },
  { label: "3 - 4", min: 3, max: 4 },
  { label: "4 - 5", min: 4, max: 5 },
  ];


//   function applyFilters(list, filtersObj) {
//     return list.filter((p) => {
//       return (
//         (filtersObj.brand === "" || p.brand === filtersObj.brand) &&
//         (filtersObj.category === "" || p.category === filtersObj.category) &&
//         (filtersObj.price === "" || p.price === Number(filtersObj.price)) &&
//         (filtersObj.rating === "" || p.rating === Number(filtersObj.rating))
//       );
//     });
//   }
   function applyFilters(list, filtersObj) {
  return list.filter((p) => {
    const brandMatch =
      filtersObj.brand === "" || p.brand === filtersObj.brand;

    const categoryMatch =
      filtersObj.category === "" || p.category === filtersObj.category;

    const priceMatch =
      filtersObj.priceRange === "" ||
      (() => {
        const range = PRICE_RANGES.find((r) => r.label === filtersObj.priceRange);
        if (!range) return true;
        return p.price >= range.min && p.price <= range.max;
      })();

    const ratingMatch =
      filtersObj.ratingRange === "" ||
      (() => {
        const range = RATING_RANGES.find((r) => r.label === filtersObj.ratingRange);
        if (!range) return true;
        return p.rating >= range.min && p.rating <= range.max;
      })();

    return brandMatch && categoryMatch && priceMatch && ratingMatch;
  });
}


  function getUniqueValues(list, key) {
    return [...new Set(list.map((item) => item[key]))];
  }

  function resetFilters() {
    setFilters({
      brand: "",
      category: "",
      priceRange: "",
      ratingRange: "",
    });
  }

  const filteredProducts = applyFilters(products, filters);

  // Dynamic dropdown options (apply all other filters except itself)
  const brandOptions = getUniqueValues(
    applyFilters(products, { ...filters, brand: "" }),
    "brand"
  );

  const categoryOptions = getUniqueValues(
    applyFilters(products, { ...filters, category: "" }),
    "category"
  );

  

  async function handleSaveTitle(id, newTitle) {
    const updatedProducts = await updateProductTitle(id, newTitle);
    setProducts(updatedProducts);
  }

  async function handleDelete(id) {
    const updatedProducts = await deleteProduct(id);
    setProducts(updatedProducts);
  }

  const isAnyFilterActive =
    filters.brand || filters.category || filters.priceRange || filters.ratingRange;

  if (loading) return <p className="status-text">Loading products...</p>;
  if (error) return <p className="status-text error-text">{error}</p>;

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Product Dashboard</h2>

      {/* Filters UI */}
      <div className="filter-bar">
        {/* Brand Filter */}
        <select
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        >
          <option value="">All Brands</option>
          {brandOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          {categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Price Filter */}
              <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              >
                  <option value="">All Prices</option>
                  {PRICE_RANGES.map((range) => (
                      <option key={range.label} value={range.label}>
                          {range.label}
                      </option>
                  ))}
              </select>


        {/* Rating Filter */}
              <select
                  value={filters.ratingRange}
                  onChange={(e) => setFilters({ ...filters, ratingRange: e.target.value })}
              >
                  <option value="">All Ratings</option>
                  {RATING_RANGES.map((range) => (
                      <option key={range.label} value={range.label}>
                          {range.label}
                      </option>
                  ))}
              </select>


        {/* Reset Button */}
        {isAnyFilterActive && (
          <button className="reset-btn" onClick={resetFilters}>
            Reset Filters
          </button>
        )}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 ? (
        <p className="no-results">No results found</p>
      ) : (
        <ProductTable
          products={filteredProducts}
          onSaveTitle={handleSaveTitle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Dashboard;

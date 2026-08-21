import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, X, ArrowUpDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosInstance from "./api/axios";
import { ProductCard } from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

const JEWELRY_CATEGORIES = ["All", "Necklaces", "Earrings", "Jhumkas", "Rings", "Bracelets", "Bangles", "Matha Sets", "Hair Accessories", "Jewelry Sets"];

const SORTS = [
  { value: "featured",    label: "Featured" },
  { value: "newest",      label: "New Arrivals" },
  { value: "price-asc",   label: "Price: Low to High" },
  { value: "price-desc",  label: "Price: High to Low" },
  { value: "rating-desc", label: "Top Rated" },
];

function CategoryPill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200"
      style={
        active
          ? { background: "var(--mj-charcoal)", color: "white" }
          : { background: "var(--mj-cream)", color: "var(--mj-text-muted)", border: "1px solid var(--mj-border)" }
      }
    >
      {children}
    </button>
  );
}

export default function Products() {
  const [searchParams] = useSearchParams();

  const [query, setQuery]         = useState(searchParams.get("search") || "");
  const [category, setCategory]   = useState("All");
  const [maxPrice, setMaxPrice]   = useState("");
  const [sort, setSort]           = useState(searchParams.get("sort") || "featured");
  const [page, setPage]           = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen]   = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("product/get-products", {
        params: {
          search: query,
          page,
          limit: 12,
          category: category === "All" ? "" : category,
          maxPrice,
          sort,
        },
      });
      if (res.data.success) {
        setProducts(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [query, category, maxPrice, sort, page]);

  const MAX_PRICE = products.length > 0
    ? Math.max(...products.map((p) => p.productPrice || 0), 50000)
    : 50000;

  const currentPage = Math.min(page, totalPages);

  return (
    <>
      <Navbar />
      <div style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}>

        {/* Page header */}
        <div style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}
          className="py-14 px-6 text-center">
          <p className="subheading mb-3">The Collection</p>
          <h1 className="heading-display text-5xl sm:text-6xl">All Jewelry</h1>
          <p className="mt-4 text-sm" style={{ color: "var(--mj-text-muted)" }}>
            Handcrafted pieces for every occasion
          </p>
        </div>

        <div className="container-mj py-10">

          {/* Search + Sort + Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: "var(--mj-text-light)" }} />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search jewelry..."
                className="w-full pl-10 pr-10 py-3 text-sm rounded-lg"
                style={{ background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-charcoal)", outline: "none" }}
              />
              {query && (
                <button type="button" onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--mj-text-light)" }}>
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <button type="button" onClick={() => { setSortOpen(v => !v); setFiltersOpen(false); }}
                className="flex items-center gap-2 px-4 py-3 text-xs font-semibold rounded-lg transition-colors"
                style={{ background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
                <ArrowUpDown className="w-4 h-4" />
                {SORTS.find(s => s.value === sort)?.label}
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                    className="absolute right-0 z-30 mt-2 w-52 rounded-xl shadow-xl overflow-hidden"
                    style={{ background: "white", border: "1px solid var(--mj-border)" }}>
                    {SORTS.map(s => (
                      <button key={s.value} type="button"
                        onClick={() => { setSort(s.value); setSortOpen(false); setPage(1); }}
                        className="block w-full px-4 py-3 text-left text-xs font-medium transition-colors"
                        style={{ color: sort === s.value ? "var(--mj-gold-dark)" : "var(--mj-warm-brown)",
                                 background: sort === s.value ? "var(--mj-cream)" : "transparent" }}>
                        {s.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filters toggle */}
            <button type="button"
              onClick={() => { setFiltersOpen(v => !v); setSortOpen(false); }}
              className="flex items-center gap-2 px-4 py-3 text-xs font-semibold rounded-lg transition-colors"
              style={{ background: filtersOpen ? "var(--mj-charcoal)" : "white",
                       color: filtersOpen ? "white" : "var(--mj-warm-brown)",
                       border: "1px solid var(--mj-border)" }}>
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filter panel */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
                className="overflow-hidden">
                <div className="p-6 mb-6 rounded-xl" style={{ background: "white", border: "1px solid var(--mj-border)" }}>
                  {/* Category pills */}
                  <div className="mb-6">
                    <p className="subheading mb-3">Category</p>
                    <div className="flex flex-wrap gap-2">
                      {JEWELRY_CATEGORIES.map(c => (
                        <CategoryPill key={c} active={category === c} onClick={() => { setCategory(c); setPage(1); }}>
                          {c}
                        </CategoryPill>
                      ))}
                    </div>
                  </div>

                  {/* Price range */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="subheading">Max Price</p>
                      <p className="text-xs font-bold" style={{ color: "var(--mj-charcoal)" }}>
                        Rs. {Number(maxPrice || MAX_PRICE).toLocaleString("en-PK")}
                      </p>
                    </div>
                    <input type="range" min={0} max={MAX_PRICE} step={500}
                      value={maxPrice || MAX_PRICE}
                      onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }}
                      className="mj-range w-full" />
                    <div className="flex justify-between mt-1 text-[10px]" style={{ color: "var(--mj-text-light)" }}>
                      <span>Rs. 0</span>
                      <span>Rs. {Number(MAX_PRICE).toLocaleString("en-PK")}</span>
                    </div>
                  </div>

                  {(category !== "All" || maxPrice) && (
                    <button type="button"
                      onClick={() => { setCategory("All"); setMaxPrice(""); setPage(1); }}
                      className="mt-4 text-xs font-semibold underline-offset-2 hover:underline"
                      style={{ color: "var(--mj-rose)" }}>
                      Clear Filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category quick-pills (always visible) */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
            {JEWELRY_CATEGORIES.map(c => (
              <CategoryPill key={c} active={category === c} onClick={() => { setCategory(c); setPage(1); }}>
                {c}
              </CategoryPill>
            ))}
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--mj-border-light)" }}>
                  <div className="skeleton aspect-[3/4]" />
                  <div className="p-4 space-y-2">
                    <div className="skeleton h-3 rounded w-2/3" />
                    <div className="skeleton h-4 rounded w-full" />
                    <div className="skeleton h-3 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center gap-5 py-24 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "var(--mj-blush)" }}>
                <Search className="w-7 h-7" style={{ color: "var(--mj-rose)" }} />
              </div>
              <h2 className="heading-display text-2xl">No jewelry found</h2>
              <p className="text-sm" style={{ color: "var(--mj-text-muted)" }}>
                Try adjusting your search or filters.
              </p>
              <button type="button"
                onClick={() => { setQuery(""); setCategory("All"); setMaxPrice(""); setPage(1); }}
                className="px-6 py-2.5 btn-gold rounded-lg text-xs">
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs mb-6" style={{ color: "var(--mj-text-muted)" }}>
                {products.length} piece{products.length !== 1 ? "s" : ""} found
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {products.map((product, i) => (
                    <ProductCard key={product._id} product={product} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button type="button" onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex w-9 h-9 items-center justify-center rounded-full transition-colors disabled:opacity-30"
                style={{ background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                return (
                  <button key={n} type="button" onClick={() => setPage(n)}
                    className="flex w-9 h-9 items-center justify-center rounded-full text-xs font-bold transition-colors"
                    style={n === currentPage
                      ? { background: "var(--mj-charcoal)", color: "white" }
                      : { background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
                    {n}
                  </button>
                );
              })}

              <button type="button" onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex w-9 h-9 items-center justify-center rounded-full transition-colors disabled:opacity-30"
                style={{ background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

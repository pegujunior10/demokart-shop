"use client";
import { useMemo, useState } from "react";
import products from "@/data/products";
import Header from "./Header";
import Hero from "./Hero";
import CategoryFilter from "./CategoryFilter";
import SortSelect from "./SortSelect";
import ProductGrid from "./ProductGrid";
import Footer from "./Footer";

// Easy-to-change constants
const CATEGORIES = ["All", "Electronics", "Fashion", "Home", "Books"];
const SORT_OPTIONS = [
  { value: "featured", label: "Sort" },
  { value: "price-asc", label: "Price: Low to high" },
  { value: "price-desc", label: "Price: High to low" },
  { value: "rating", label: "Customer rating" },
  { value: "reviews", label: "Most reviewed" },
  { value: "discount", label: "Biggest discount" },
  { value: "name-asc", label: "Name: A to Z" },
];

const discount = (p) => (p.originalPrice ? (p.originalPrice - p.price) / p.originalPrice : 0);

// "featured" has no comparator, so products keep their original order
const SORTERS = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  reviews: (a, b) => b.reviews - a.reviews,
  discount: (a, b) => discount(b) - discount(a),
  "name-asc": (a, b) => a.name.localeCompare(b.name),
};

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("featured");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    // filter() already returns a copy; spread keeps the original untouched either way
    const result = [...products].filter(
      (p) =>
        (selectedCategory === "All" || p.category === selectedCategory) &&
        p.name.toLowerCase().includes(q)
    );
    const sorter = SORTERS[sortOrder];
    if (sorter) result.sort(sorter);
    return result;
  }, [selectedCategory, sortOrder, query]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSortOrder("featured");
    setQuery("");
  };

  const n = visible.length;

  return (
    <>
      <Header query={query} onQueryChange={setQuery} />
      <Hero />
      <main id="products" className="mx-auto w-full max-w-7xl flex-1 scroll-mt-20 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CategoryFilter categories={CATEGORIES} active={selectedCategory} onChange={setSelectedCategory} />
          <SortSelect options={SORT_OPTIONS} value={sortOrder} onChange={setSortOrder} />
        </div>
        <p className="mb-6 mt-5 text-sm text-zinc-600" aria-live="polite">
          Showing {n} {n === 1 ? "product" : "products"}
        </p>
        <div className="min-h-[60vh]">
          <div key={`${selectedCategory}|${sortOrder}|${query}`} className="animate-[fadeIn_250ms_ease-out]">
            <ProductGrid products={visible} onClear={clearFilters} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

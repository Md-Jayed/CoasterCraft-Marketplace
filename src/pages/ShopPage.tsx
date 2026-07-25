import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Star,
  RotateCcw,
  Grid,
  List,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { CategoryId, FilterState, Product } from '../types';
import { useShop } from '../context/ShopContext';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist, searchQuery, setSearchQuery } = useShop();

  const categoryParam = searchParams.get('category') as CategoryId | null;
  const wishlistParam = searchParams.get('wishlist') === 'true';

  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: searchParams.get('search') || searchQuery || '',
    category: categoryParam || 'all',
    minPrice: 0,
    maxPrice: 100,
    rating: 0,
    difficulty: 'all',
    sortBy: 'featured'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const q = searchParams.get('search');
    const c = searchParams.get('category') as CategoryId | null;
    if (q !== null) {
      setFilterState((prev) => ({ ...prev, searchQuery: q }));
    }
    if (c !== null) {
      setFilterState((prev) => ({ ...prev, category: c }));
    }
  }, [searchParams]);

  // Filtered & Sorted products calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Wishlist filter override
      if (wishlistParam && !wishlist.some((w) => w.id === product.id)) {
        return false;
      }

      // Search
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.categoryName.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesCategory && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // Category
      if (filterState.category !== 'all' && product.categoryId !== filterState.category) {
        return false;
      }

      // Price USD Range
      if (product.priceUSD < filterState.minPrice || product.priceUSD > filterState.maxPrice) {
        return false;
      }

      // Rating
      if (filterState.rating > 0 && product.rating < filterState.rating) {
        return false;
      }

      // Difficulty
      if (
        filterState.difficulty !== 'all' &&
        product.specs.difficulty.toLowerCase() !== filterState.difficulty.toLowerCase()
      ) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-low') {
        return a.priceUSD - b.priceUSD;
      }
      if (filterState.sortBy === 'price-high') {
        return b.priceUSD - a.priceUSD;
      }
      if (filterState.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (filterState.sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      // 'featured' default
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [filterState, wishlistParam, wishlist]);

  const resetFilters = () => {
    setFilterState({
      searchQuery: '',
      category: 'all',
      minPrice: 0,
      maxPrice: 100,
      rating: 0,
      difficulty: 'all',
      sortBy: 'featured'
    });
    setSearchParams({});
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen text-gray-100 bg-gray-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" /> CoasterCraft Marketplace
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              {wishlistParam ? 'Your Saved Wishlist' : 'All Theme Park Tycoon 2 Builds'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden py-2.5 px-4 rounded-xl bg-gray-900 border border-gray-800 text-xs font-bold text-gray-200 flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" /> Filters
            </button>

            {/* View Mode Switcher */}
            <div className="hidden sm:flex items-center rounded-xl bg-gray-900 border border-gray-800 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={filterState.sortBy}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterState['sortBy']
                }))
              }
              className="px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-xs font-bold text-gray-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Releases</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* LEFT SIDEBAR FILTERS (Desktop + Mobile overlay) */}
          <div
            className={`lg:block ${
              mobileFilterOpen ? 'fixed inset-0 z-50 bg-gray-950 p-6 overflow-y-auto' : 'hidden'
            }`}
          >
            {mobileFilterOpen && (
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-800 lg:hidden">
                <h3 className="text-lg font-bold text-white">Filter Marketplace</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 rounded-xl bg-gray-900 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="space-y-6 sticky top-28 p-6 rounded-3xl bg-gray-900/80 border border-gray-800 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Filter className="w-4 h-4 text-cyan-400" /> Filters
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-xs text-gray-400 hover:text-cyan-400 flex items-center gap-1 font-semibold transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Search Filter Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Search Build</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={filterState.searchQuery}
                    onChange={(e) =>
                      setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }))
                    }
                    placeholder="Search titles, tags..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Category</label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => setFilterState((prev) => ({ ...prev, category: 'all' }))}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                      filterState.category === 'all'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-[10px] text-gray-500">{PRODUCTS.length}</span>
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilterState((prev) => ({ ...prev, category: cat.id }))}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                        filterState.category === cat.id
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-gray-500">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-gray-300 mb-2">
                  <span>Price Range (USD)</span>
                  <span className="text-emerald-400 font-bold">${filterState.maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={filterState.maxPrice}
                  onChange={(e) =>
                    setFilterState((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
                  }
                  className="w-full accent-cyan-400 bg-gray-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>$0</span>
                  <span>$50</span>
                  <span>$100+</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Minimum Rating</label>
                <div className="flex items-center gap-2">
                  {[0, 4.0, 4.5, 4.8].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => setFilterState((prev) => ({ ...prev, rating: stars }))}
                      className={`flex-1 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                        filterState.rating === stars
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                          : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      {stars === 0 ? 'All' : `${stars}+ ★`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Build Difficulty</label>
                <select
                  value={filterState.difficulty}
                  onChange={(e) =>
                    setFilterState((prev) => ({ ...prev, difficulty: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Beginner">Beginner (1 Plot / Fast)</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert (Multi-plot Mega)</option>
                </select>
              </div>

              {mobileFilterOpen && (
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-cyan-500 text-gray-950 font-bold text-xs"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
              )}
            </div>
          </div>

          {/* RIGHT PRODUCT GRID */}
          <div className="lg:col-span-3">
            {/* Active Filters Bar */}
            <div className="flex items-center justify-between mb-6 text-xs text-gray-400">
              <div>
                Showing <strong className="text-gray-100">{filteredProducts.length}</strong> creations
              </div>

              {wishlistParam && (
                <div className="flex items-center gap-2 text-rose-400 font-semibold bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30">
                  Wishlist Filter Active
                </div>
              )}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-gray-900/60 border border-gray-800 max-w-md mx-auto my-12">
                <div className="p-4 rounded-full bg-gray-800 w-fit mx-auto text-gray-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-200 mb-1">No creations match your filters</h3>
                <p className="text-xs text-gray-400 mb-6">
                  Try adjusting your price range, search query, or category selection.
                </p>
                <button
                  onClick={resetFilters}
                  className="py-2.5 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold text-xs transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
                }
              >
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

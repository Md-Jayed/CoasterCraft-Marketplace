import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  Zap,
  Star,
  ShieldCheck,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShoppingBag,
  CheckCircle,
  Flame,
  Layers,
  Wrench,
  Compass,
  Palette,
  Crown,
  Waves,
  Landmark
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { REVIEWS } from '../data/reviews';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

export const HomePage: React.FC = () => {
  const { setQuickViewProduct } = useShop();
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 6);

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const categoryIconMap: Record<string, React.ReactNode> = {
    'roller-coasters': <Sparkles className="w-6 h-6 text-cyan-400" />,
    'theme-parks': <Landmark className="w-6 h-6 text-blue-400" />,
    'water-rides': <Waves className="w-6 h-6 text-sky-400" />,
    'decorations': <Palette className="w-6 h-6 text-emerald-400" />,
    'starter-parks': <Zap className="w-6 h-6 text-amber-400" />,
    'mega-parks': <Crown className="w-6 h-6 text-indigo-400" />,
    'custom-builds': <Wrench className="w-6 h-6 text-rose-400" />
  };

  return (
    <div className="min-h-screen text-gray-100 bg-gray-950">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12 pb-20 border-b border-gray-800/60">
        {/* Gaming Background Art Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=2000"
            alt="Theme Park Tycoon 2 Coaster Background"
            className="w-full h-full object-cover opacity-25 scale-105 filter brightness-90 saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-transparent to-gray-950/90" />
        </div>

        {/* Neon Ambient Glow Lights */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-6 shadow-lg shadow-cyan-500/10 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Official Roblox Theme Park Tycoon 2 Build Store</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]"
          >
            Premium Roblox <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
              Theme Park Tycoon 2
            </span>{' '}
            Creations
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed mb-10 font-normal"
          >
            Buy professionally designed roller coasters, parks, rides, and decorations to upgrade your Roblox experience.
            Instant blueprint code imports, smooth tracking, and max cash flow layouts.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/shop"
              className="py-4 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-gray-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-gray-950" />
              Shop Now
            </Link>

            <Link
              to="/featured"
              className="py-4 px-8 rounded-2xl bg-gray-900/90 hover:bg-gray-800 text-gray-100 font-bold text-sm border border-gray-700/80 hover:border-cyan-500/50 transition-all backdrop-blur-md flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              Featured Builds
            </Link>

            <Link
              to="/categories"
              className="py-4 px-8 rounded-2xl bg-gray-900/60 hover:bg-gray-800 text-gray-300 hover:text-white font-bold text-sm border border-gray-800 transition-all backdrop-blur-md"
            >
              Categories
            </Link>
          </motion.div>

          {/* Trust Stat Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 rounded-3xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-xl text-left"
          >
            <div className="p-3">
              <div className="text-2xl font-black text-cyan-400">1,200+</div>
              <div className="text-xs text-gray-400 font-medium">Parks Delivered</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-black text-amber-400 flex items-center gap-1">
                4.98 <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <div className="text-xs text-gray-400 font-medium">Customer Rating</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-gray-400 font-medium">Roblox Compatible</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-black text-blue-400">Instant</div>
              <div className="text-xs text-gray-400 font-medium">Blueprint Key Code</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" /> Explore By Category
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Browse Creations
            </h2>
          </div>
          <Link
            to="/categories"
            className="mt-4 md:mt-0 text-sm font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
          >
            View All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/shop?category=${cat.id}`}
                className="group relative block rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-cyan-500/50 shadow-xl transition-all duration-300 h-64"
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-75 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />

                <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                  <div className="p-3 rounded-2xl bg-gray-950/80 border border-gray-800 w-fit backdrop-blur-md">
                    {categoryIconMap[cat.id]}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {cat.name}
                      </h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                        {cat.itemCount} Builds
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="py-20 bg-gray-900/50 border-y border-gray-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> Hand-Crafted Masterpieces
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Featured Builds
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Tested for zero track bugs, optimized guest throughput, and maximum Theme Park Tycoon 2 income generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} onQuickView={setQuickViewProduct} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 py-3.5 px-8 rounded-2xl bg-gray-800 hover:bg-gray-700 text-sm font-bold text-gray-100 border border-gray-700 transition-all shadow-lg"
            >
              Browse All {PRODUCTS.length} Creations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - FOUR ANIMATED CARDS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2">The CoasterCraft Guarantee</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Why Choose Us</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ y: -8 }}
            className="p-8 rounded-3xl bg-gray-900/90 border border-gray-800 hover:border-cyan-500/50 shadow-xl backdrop-blur-md transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Professional Designs</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every roller coaster and park layout is built by Level 100 TP2 legends with smooth track physics and zero clipping.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="p-8 rounded-3xl bg-gray-900/90 border border-gray-800 hover:border-cyan-500/50 shadow-xl backdrop-blur-md transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Fast Delivery</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Receive instant blueprint import code strings or connect 1-on-1 on VIP servers for rapid installation.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="p-8 rounded-3xl bg-gray-900/90 border border-gray-800 hover:border-cyan-500/50 shadow-xl backdrop-blur-md transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Affordable Pricing</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Get world-class mega park designs at unbeatable Robux & USD prices with zero hidden fees.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="p-8 rounded-3xl bg-gray-900/90 border border-gray-800 hover:border-cyan-500/50 shadow-xl backdrop-blur-md transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Trusted Roblox Builder</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Over 1,200 satisfied Roblox players with 24/7 Discord support and a 100% money-back fit guarantee.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS SLIDER */}
      <section className="py-20 bg-gray-900/60 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">Verified Reviews</span>
          <h2 className="text-3xl font-black text-white mb-12">What Our Customers Say</h2>

          {/* Review Slider Box */}
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gray-950 border border-gray-800 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8 text-left">
              <img
                src={REVIEWS[activeReviewIndex].buildImage}
                alt=""
                className="w-full md:w-56 h-48 rounded-2xl object-cover border border-gray-800 shadow-lg shrink-0"
              />

              <div className="flex-1">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-md">
                    Verified Buyer
                  </span>
                </div>

                <p className="text-base sm:text-lg text-gray-200 italic leading-relaxed mb-6 font-normal">
                  "{REVIEWS[activeReviewIndex].comment}"
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={REVIEWS[activeReviewIndex].avatar}
                    alt={REVIEWS[activeReviewIndex].author}
                    className="w-10 h-10 rounded-full object-cover border border-cyan-400"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-gray-100">{REVIEWS[activeReviewIndex].author}</h4>
                    <p className="text-xs text-cyan-400 font-medium">{REVIEWS[activeReviewIndex].buildTitle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center justify-end gap-2 mt-8 pt-6 border-t border-gray-800/80">
              <button
                onClick={prevReview}
                className="p-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 transition-colors"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                className="p-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 transition-colors"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-10 sm:p-16 text-center border border-cyan-500/40 shadow-2xl bg-gradient-to-r from-cyan-950 via-gray-900 to-blue-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Ready to Build Your Dream Theme Park?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
              Explore hundreds of custom roller coasters, starter cash-flow parks, and mega resorts. Instant delivery & 24/7 VIP installation support.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 py-4 px-10 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-gray-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/30 transition-all transform hover:scale-105"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

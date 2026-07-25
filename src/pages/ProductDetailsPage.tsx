import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  ShoppingBag,
  Zap,
  Heart,
  ShieldCheck,
  Clock,
  Maximize2,
  CheckCircle2,
  Share2,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  MessageSquare,
  ThumbsUp,
  Award
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { REVIEWS } from '../data/reviews';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

export const ProductDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, setIsCheckoutOpen, showToast } = useShop();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const isWishlisted = isInWishlist(product.id);

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 3);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link Copied!', 'Product page URL copied to clipboard.', 'success');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Review Submitted', 'Thank you for reviewing this Theme Park Tycoon 2 creation!', 'success');
    setReviewModalOpen(false);
    setNewReviewText('');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link to="/" className="hover:text-cyan-400">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <Link to="/shop" className="hover:text-cyan-400">Shop</Link>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <Link to={`/shop?category=${product.categoryId}`} className="hover:text-cyan-400">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span className="text-gray-200 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl group">
              <img
                src={product.images[selectedImgIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute top-4 right-4 p-2.5 rounded-2xl bg-gray-950/80 hover:bg-cyan-600 text-white backdrop-blur-md border border-gray-800 transition-colors shadow-lg"
                title="Fullscreen Preview"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-gray-950/80 backdrop-blur-md text-xs font-semibold text-cyan-300 border border-cyan-500/30">
                {product.categoryName}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`relative w-24 aspect-video rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImgIndex === idx
                        ? 'border-cyan-400 scale-105 shadow-lg shadow-cyan-500/30'
                        : 'border-gray-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Creator & Badges */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src={product.creator.avatar}
                    alt={product.creator.name}
                    className="w-7 h-7 rounded-full object-cover border border-cyan-400"
                  />
                  <div>
                    <span className="text-xs font-bold text-gray-200">{product.creator.name}</span>
                    <span className="ml-2 text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                      {product.creator.badge}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/30 text-xs font-bold text-amber-300">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating.toFixed(2)}</span>
                  <span className="text-gray-400">({product.reviewCount} reviews)</span>
                </div>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-xl">
                  In Stock • Instant Delivery
                </span>
              </div>

              {/* Price Banner Box */}
              <div className="p-5 rounded-3xl bg-gray-900 border border-gray-800 mb-6 flex items-baseline justify-between">
                <div>
                  <div className="text-3xl font-black text-emerald-400 flex items-center gap-2">
                    <span className="text-xl font-bold">R$</span> {product.priceRobux.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">
                    Equivalency: ${product.priceUSD.toFixed(2)} USD
                  </div>
                </div>

                {product.specs.tp2StatBoost && (
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-gray-400 font-semibold block">TP2 Income Rate</span>
                    <span className="text-xs font-black text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30 inline-block mt-1">
                      {product.specs.tp2StatBoost}
                    </span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                {product.shortDescription}
              </p>

              {/* Quick Spec Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8 text-xs">
                <div className="p-3.5 rounded-2xl bg-gray-900 border border-gray-800">
                  <span className="text-gray-500 block">Plot Size</span>
                  <span className="font-bold text-gray-200 mt-0.5 block">{product.specs.plotSize}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-gray-900 border border-gray-800">
                  <span className="text-gray-500 block">Difficulty</span>
                  <span className="font-bold text-cyan-300 mt-0.5 block">{product.specs.difficulty}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-gray-900 border border-gray-800">
                  <span className="text-gray-500 block">Piece Count</span>
                  <span className="font-bold text-gray-200 mt-0.5 block">{product.specs.pieceCount.toLocaleString()} blocks</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-gray-900 border border-gray-800">
                  <span className="text-gray-500 block">Est. Build Time</span>
                  <span className="font-bold text-amber-300 mt-0.5 block">{product.specs.buildTime}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-4 px-6 rounded-2xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-sm font-bold text-gray-100 flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-cyan-400" /> Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-2xl border transition-all ${
                    isWishlisted
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                      : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-gray-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 fill-current" /> Buy Now (Instant Code)
              </button>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="mb-20">
          <div className="flex border-b border-gray-800 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 px-6 text-sm font-bold transition-colors relative whitespace-nowrap ${
                activeTab === 'description' ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Description & Features
              {activeTab === 'description' && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 px-6 text-sm font-bold transition-colors relative whitespace-nowrap ${
                activeTab === 'specs' ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Technical Specifications
              {activeTab === 'specs' && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 px-6 text-sm font-bold transition-colors relative whitespace-nowrap ${
                activeTab === 'reviews' ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Reviews ({product.reviewCount})
              {activeTab === 'reviews' && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 min-h-[250px]">
            {activeTab === 'description' && (
              <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
                <p className="text-base text-gray-200">{product.fullDescription}</p>

                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Included Features & Scenery</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-950/60 border border-gray-800/80">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
                  <span className="text-gray-500 block mb-1">Theme Style</span>
                  <span className="font-bold text-gray-100 text-sm">{product.specs.themeStyle}</span>
                </div>
                <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
                  <span className="text-gray-500 block mb-1">Plot Footprint</span>
                  <span className="font-bold text-gray-100 text-sm">{product.specs.plotSize}</span>
                </div>
                <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
                  <span className="text-gray-500 block mb-1">In-Game Difficulty</span>
                  <span className="font-bold text-cyan-300 text-sm">{product.specs.difficulty}</span>
                </div>
                <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
                  <span className="text-gray-500 block mb-1">Primitive / Track Pieces</span>
                  <span className="font-bold text-gray-100 text-sm">{product.specs.pieceCount.toLocaleString()}</span>
                </div>
                {product.specs.maxSpeed && (
                  <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
                    <span className="text-gray-500 block mb-1">Top Speed</span>
                    <span className="font-bold text-amber-300 text-sm">{product.specs.maxSpeed}</span>
                  </div>
                )}
                {product.specs.inversions !== undefined && (
                  <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
                    <span className="text-gray-500 block mb-1">Inversions</span>
                    <span className="font-bold text-gray-100 text-sm">{product.specs.inversions} Loops/Rolls</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
                  <div>
                    <h3 className="text-xl font-bold text-white">Customer Feedback</h3>
                    <p className="text-xs text-gray-400">Verified buyer ratings for {product.name}</p>
                  </div>
                  <button
                    onClick={() => setReviewModalOpen(true)}
                    className="py-2.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold text-xs"
                  >
                    Write a Review
                  </button>
                </div>

                <div className="space-y-4">
                  {REVIEWS.map((rev) => (
                    <div key={rev.id} className="p-5 rounded-2xl bg-gray-950 border border-gray-800">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <img src={rev.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-cyan-400" />
                          <div>
                            <span className="text-sm font-bold text-gray-100">{rev.author}</span>
                            <span className="text-[10px] text-gray-500 block">{rev.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="pt-8 border-t border-gray-800">
            <h2 className="text-2xl font-black text-white mb-8">Related Creations You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-gray-900 text-gray-300 hover:text-white"
            >
              ✕
            </button>
            <img
              src={product.images[selectedImgIndex] || product.images[0]}
              alt=""
              className="max-w-full max-h-[90vh] object-contain rounded-2xl"
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

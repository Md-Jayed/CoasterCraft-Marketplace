import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, ShieldCheck, Zap, Clock, Maximize2, CheckCircle, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useShop();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  if (!quickViewProduct) return null;

  const handleClose = () => {
    setQuickViewProduct(null);
    setSelectedImgIndex(0);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl shadow-cyan-500/10 overflow-hidden z-10 text-white my-8"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-gray-950/80 hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Section */}
            <div className="p-6 bg-gray-950/60 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-gray-800">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-800 bg-gray-900">
                <img
                  src={quickViewProduct.images[selectedImgIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-xs font-semibold text-cyan-300 backdrop-blur-md">
                  {quickViewProduct.categoryName}
                </span>
              </div>

              {/* Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`relative w-20 aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImgIndex === idx
                          ? 'border-cyan-400 scale-105 shadow-md shadow-cyan-500/30'
                          : 'border-gray-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Creator Card */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-900/80 border border-gray-800 mt-auto">
                <img
                  src={quickViewProduct.creator.avatar}
                  alt={quickViewProduct.creator.name}
                  className="w-10 h-10 rounded-full object-cover border border-cyan-400"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-100">{quickViewProduct.creator.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                      {quickViewProduct.creator.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{quickViewProduct.creator.tp2Level}</p>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Title & Rating */}
                <h2 className="text-2xl font-black text-gray-100 mb-2 leading-tight">
                  {quickViewProduct.name}
                </h2>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 text-xs font-bold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{quickViewProduct.rating.toFixed(2)}</span>
                    <span className="text-gray-400">({quickViewProduct.reviewCount} reviews)</span>
                  </div>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-cyan-400 font-medium">100% Roblox Compatible</span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-gray-950/80 border border-gray-800">
                  <div className="text-2xl font-black text-emerald-400 flex items-center gap-1.5">
                    <span className="text-emerald-500 text-xl font-bold">R$</span>
                    {quickViewProduct.priceRobux.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300 font-medium">
                    (${quickViewProduct.priceUSD.toFixed(2)} USD)
                  </div>
                  {quickViewProduct.originalPriceUSD && (
                    <div className="text-xs text-gray-500 line-through ml-auto">
                      ${quickViewProduct.originalPriceUSD.toFixed(2)} USD
                    </div>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  {quickViewProduct.shortDescription}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
                  <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800/80">
                    <span className="text-gray-500 block">Plot Size</span>
                    <span className="font-bold text-gray-200 mt-0.5 block">{quickViewProduct.specs.plotSize}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800/80">
                    <span className="text-gray-500 block">Difficulty</span>
                    <span className="font-bold text-cyan-300 mt-0.5 block">{quickViewProduct.specs.difficulty}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800/80">
                    <span className="text-gray-500 block">Piece Count</span>
                    <span className="font-bold text-gray-200 mt-0.5 block">{quickViewProduct.specs.pieceCount.toLocaleString()} blocks</span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800/80">
                    <span className="text-gray-500 block">Est. Build Time</span>
                    <span className="font-bold text-amber-300 mt-0.5 block">{quickViewProduct.specs.buildTime}</span>
                  </div>
                </div>

                {/* Key Features Bullet List */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Key Features</span>
                  {quickViewProduct.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                <button
                  onClick={() => {
                    addToCart(quickViewProduct, 1);
                    handleClose();
                  }}
                  className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
                <Link
                  to={`/product/${quickViewProduct.slug}`}
                  onClick={handleClose}
                  className="py-3.5 px-5 rounded-2xl bg-gray-800 hover:bg-gray-700 text-sm font-semibold text-gray-200 transition-colors flex items-center gap-1.5"
                >
                  Full Page <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

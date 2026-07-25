import React from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingBag, Eye, Heart, Zap, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const isWishlisted = isInWishlist(product.id);

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      setQuickViewProduct(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-cyan-500/50 shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden backdrop-blur-sm"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-950">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
          loading="lazy"
        />

        {/* Overlay Darkening Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/30 opacity-80" />

        {/* Category & Badge Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 px-2.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md">
            {product.categoryName}
          </span>
          {product.isBestseller && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-400/40 px-2.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
              <Sparkles className="w-3 h-3" /> Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md">
              <Zap className="w-3 h-3" /> New
            </span>
          )}
        </div>

        {/* Action Buttons Top Right (Wishlist & QuickView) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            aria-label="Wishlist"
            className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 ${
              isWishlisted
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105'
                : 'bg-gray-900/70 text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleQuickViewClick}
            aria-label="Quick View"
            className="p-2 rounded-xl bg-gray-900/70 text-gray-300 hover:text-white hover:bg-cyan-600 backdrop-blur-md transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Robux Price Badge Pill Bottom Left of Image */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-md backdrop-blur-md">
            <span className="text-emerald-400">R$</span> {product.priceRobux.toLocaleString()}
          </div>
          <div className="text-xs text-gray-300 font-medium px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm">
            ${product.priceUSD.toFixed(2)} USD
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Creator Info */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <img
              src={product.creator.avatar}
              alt={product.creator.name}
              className="w-5 h-5 rounded-full object-cover border border-cyan-500/40"
            />
            <span className="font-medium text-gray-300 truncate max-w-[130px]">
              {product.creator.name}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 text-xs text-amber-300 font-semibold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(2)}</span>
            <span className="text-gray-500">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <Link to={`/product/${product.slug}`} className="group/title block mb-2">
          <h3 className="text-base font-bold text-gray-100 group-hover/title:text-cyan-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4 flex-1">
          {product.shortDescription}
        </p>

        {/* Specs Highlights */}
        <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-gray-950/60 border border-gray-800/80 text-[11px] text-gray-300">
          <div>
            <span className="text-gray-500 block">Plot Size</span>
            <span className="font-semibold text-gray-200">{product.specs.plotSize}</span>
          </div>
          <div>
            <span className="text-gray-500 block">Difficulty</span>
            <span className="font-semibold text-cyan-300">{product.specs.difficulty}</span>
          </div>
        </div>

        {/* Footer Card Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-800/80 mt-auto">
          <Link
            to={`/product/${product.slug}`}
            className="flex-1 text-center py-2 px-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 transition-colors"
          >
            Details
          </Link>
          <button
            onClick={() => addToCart(product, 1)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

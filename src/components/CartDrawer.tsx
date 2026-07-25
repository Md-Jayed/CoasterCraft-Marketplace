import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Plus, Minus, Tag, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotalUSD,
    cartTotalRobux,
    cartSubtotalUSD,
    cartSubtotalRobux,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen
  } = useShop();

  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-gray-900 border-l border-gray-800 shadow-2xl flex flex-col text-white"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-gray-950/60">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-100">Your Shopping Cart</h2>
                <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="p-5 rounded-full bg-gray-800/60 border border-gray-700/50 mb-4 text-gray-500">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h3 className="text-base font-bold text-gray-200">Your cart is empty</h3>
                  <p className="text-xs text-gray-400 max-w-xs mt-1 mb-6">
                    Explore our marketplace for roller coasters, mega parks, and custom Roblox builds!
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="py-2.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-xs font-bold text-gray-950 transition-colors"
                  >
                    Browse Creations
                  </button>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="p-4 rounded-2xl bg-gray-950/60 border border-gray-800 flex gap-4 items-center relative group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-20 rounded-xl object-cover border border-gray-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">
                        {product.categoryName}
                      </span>
                      <h4 className="text-sm font-bold text-gray-100 truncate mt-0.5">{product.name}</h4>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs font-bold text-emerald-400">
                          R$ {product.priceRobux.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          (${product.priceUSD.toFixed(2)})
                        </span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center rounded-lg bg-gray-900 border border-gray-800 p-0.5">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 text-gray-400 hover:text-white rounded hover:bg-gray-800"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-gray-200">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 text-gray-400 hover:text-white rounded hover:bg-gray-800"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-1.5 text-gray-500 hover:text-rose-400 rounded-lg transition-colors ml-auto"
                          title="Remove Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Summary & Checkout Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-800 bg-gray-950/80 space-y-4">
                {/* Promo Code Form */}
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-xs">
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      <span>Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-emerald-400 hover:text-emerald-200 font-bold underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (e.g. TYCOON10)"
                      className="flex-1 px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-cyan-400 border border-cyan-500/30"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Subtotal / Total Calculation */}
                <div className="space-y-2 text-xs text-gray-300 pt-2 border-t border-gray-800/80">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>R$ {cartSubtotalRobux.toLocaleString()} (${cartSubtotalUSD.toFixed(2)})</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Discount ({appliedPromo.discountPercent}%)</span>
                      <span>- R$ {Math.round(cartSubtotalRobux * (appliedPromo.discountPercent / 100)).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-gray-100 pt-2 border-t border-gray-800">
                    <span>Total Amount</span>
                    <div className="text-right">
                      <div className="text-emerald-400 text-base font-bold">
                        R$ {cartTotalRobux.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400">(${cartTotalUSD.toFixed(2)} USD)</div>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  Proceed to Instant Checkout
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Instant Blueprint Code & VIP Server Delivery</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Copy, Download, ShieldCheck, Sparkles, Send, Gamepad2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotalUSD,
    cartTotalRobux,
    clearCart,
    showToast
  } = useShop();

  const [robloxUsername, setRobloxUsername] = useState('');
  const [discordUsername, setDiscordUsername] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'blueprint' | 'vipsession'>('blueprint');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [generatedReceipt, setGeneratedReceipt] = useState<{
    orderId: string;
    blueprintKey: string;
    itemsCount: number;
    date: string;
  } | null>(null);

  if (!isCheckoutOpen) return null;

  const handleClose = () => {
    setIsCheckoutOpen(false);
    if (isCompleted) {
      clearCart();
      setIsCompleted(false);
      setGeneratedReceipt(null);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!robloxUsername.trim()) {
      showToast('Roblox Username Required', 'Please enter your Roblox username for key validation.', 'warning');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const orderId = 'CC-ORDER-' + Math.floor(100000 + Math.random() * 900000);
      const blueprintKey = 'TP2-COASTER-' + Array.from({ length: 4 }, () => Math.random().toString(36).substring(2, 6).toUpperCase()).join('-');
      setGeneratedReceipt({
        orderId,
        blueprintKey,
        itemsCount: cart.length,
        date: new Date().toLocaleDateString()
      });
      setIsProcessing(false);
      setIsCompleted(true);
      showToast('Order Complete!', 'Your Theme Park Tycoon 2 blueprint keys have been generated!', 'success');
    }, 1500);
  };

  const copyKey = () => {
    if (generatedReceipt) {
      navigator.clipboard.writeText(generatedReceipt.blueprintKey);
      showToast('Copied to Clipboard!', 'Blueprint Key copied.', 'success');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl overflow-hidden z-10 text-white p-6 sm:p-8 my-8"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isCompleted ? (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-100">Roblox Checkout</h3>
                  <p className="text-xs text-gray-400">Instant Blueprint Delivery for Theme Park Tycoon 2</p>
                </div>
              </div>

              {/* Cart Quick Summary */}
              <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 mb-6 space-y-2 text-xs">
                <div className="flex justify-between font-semibold text-gray-300">
                  <span>Selected Builds ({cart.length})</span>
                  <span className="text-emerald-400 font-bold">R$ {cartTotalRobux.toLocaleString()} (${cartTotalUSD.toFixed(2)})</span>
                </div>
                <div className="space-y-1 text-gray-400 pt-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between truncate">
                      <span className="truncate pr-2">• {item.quantity}x {item.product.name}</span>
                      <span className="shrink-0 text-gray-300">R$ {item.product.priceRobux * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Form */}
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Your Roblox Username <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={robloxUsername}
                    onChange={(e) => setRobloxUsername(e.target.value)}
                    placeholder="e.g. CoasterFan_2026"
                    className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">Used to whitelist your account for in-game blueprint slot placement.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Discord Username (Optional for VIP Support)
                  </label>
                  <input
                    type="text"
                    value={discordUsername}
                    onChange={(e) => setDiscordUsername(e.target.value)}
                    placeholder="e.g. coasterking#0001"
                    className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Delivery Preference</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('blueprint')}
                      className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                        deliveryMethod === 'blueprint'
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                          : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      <span className="font-bold block text-gray-200">Instant Blueprint String</span>
                      Import directly in-game
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('vipsession')}
                      className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                        deliveryMethod === 'vipsession'
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                          : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      <span className="font-bold block text-gray-200">VIP Server Co-Build</span>
                      Master Builder joins you
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-gray-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
                        Generating Keys...
                      </span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 fill-current" />
                        Complete Order (Demo)
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Guaranteed Fit & Compatibility with Theme Park Tycoon 2</span>
                </div>
              </form>
            </div>
          ) : (
            /* Completed Order Screen */
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-black text-gray-100 mb-1">Order Complete!</h3>
              <p className="text-xs text-gray-400 mb-6">
                Thank you, <strong>{robloxUsername}</strong>! Your Roblox Theme Park Tycoon 2 creation keys are ready.
              </p>

              {/* Receipt Box */}
              <div className="p-5 rounded-2xl bg-gray-950 border border-gray-800 text-left space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs border-b border-gray-800/80 pb-2">
                  <span className="text-gray-400">Order ID:</span>
                  <span className="font-mono font-bold text-gray-200">{generatedReceipt?.orderId}</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 mb-1">Your TP2 Blueprint Key:</label>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-900 border border-cyan-500/40 font-mono text-xs font-bold text-cyan-300">
                    <span className="flex-1 truncate">{generatedReceipt?.blueprintKey}</span>
                    <button
                      onClick={copyKey}
                      className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors"
                      title="Copy Key"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-gray-400 leading-relaxed bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                  <p className="font-semibold text-gray-300 mb-1">Instructions to Redeem:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-400">
                    <li>Launch Roblox & open Theme Park Tycoon 2.</li>
                    <li>Open the Blueprints tab & paste your key.</li>
                    <li>Select an empty plot and press <strong>Import Build</strong>!</li>
                  </ol>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3.5 px-6 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 transition-colors"
              >
                Done & Return to Marketplace
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

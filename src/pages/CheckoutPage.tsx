import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  CreditCard,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  Copy,
  Download,
  Gamepad2,
  ArrowLeft,
  ArrowRight,
  Zap,
  RefreshCw,
  AlertCircle,
  HelpCircle,
  Check,
  QrCode,
  Ticket,
  Percent,
  Plus,
  Trash2,
  Printer,
  ShoppingBag
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

type PaymentMethod = 'gamepass' | 'card' | 'paypal' | 'giftcard' | 'crypto';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartSubtotalUSD,
    cartSubtotalRobux,
    cartTotalUSD,
    cartTotalRobux,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    clearCart,
    showToast,
    removeFromCart,
    updateQuantity
  } = useShop();

  // If cart is empty, allow picking a fallback default product so the checkout page is always functional and testable!
  const displayCart = cart.length > 0 ? cart : [{ product: PRODUCTS[0], quantity: 1 }];

  // Stepper State
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [robloxUsername, setRobloxUsername] = useState('');
  const [isUsernameVerified, setIsUsernameVerified] = useState(false);
  const [isVerifyingUser, setIsVerifyingUser] = useState(false);
  const [email, setEmail] = useState('');
  const [discordTag, setDiscordTag] = useState('');
  const [deliveryPreference, setDeliveryPreference] = useState<'blueprint' | 'vipsession' | 'gamepass'>('blueprint');

  // Payment Selection State
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('gamepass');

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [billingZip, setBillingZip] = useState('');

  // Gift Card State
  const [giftCardPin, setGiftCardPin] = useState('');
  const [giftCardApplied, setGiftCardApplied] = useState(false);

  // Add-on Bumps State
  const [addOns, setAddOns] = useState<{
    speedBuild: boolean;
    lifetimeUpdates: boolean;
    customTerrain: boolean;
  }>({
    speedBuild: false,
    lifetimeUpdates: false,
    customTerrain: false
  });

  // Promo Input
  const [promoInput, setPromoInput] = useState('');

  // Processing & Confirmation State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState<{
    orderId: string;
    blueprintKey: string;
    robloxUsername: string;
    totalUSD: number;
    totalRobux: number;
    date: string;
    paymentMethodName: string;
  } | null>(null);

  // Calculate Add-on totals
  const addOnRobuxTotal =
    (addOns.speedBuild ? 250 : 0) +
    (addOns.lifetimeUpdates ? 150 : 0) +
    (addOns.customTerrain ? 350 : 0);

  const addOnUSDTotal =
    (addOns.speedBuild ? 2.99 : 0) +
    (addOns.lifetimeUpdates ? 1.99 : 0) +
    (addOns.customTerrain ? 3.99 : 0);

  const calculatedBaseRobux = cart.length > 0 ? cartTotalRobux : PRODUCTS[0].priceRobux;
  const calculatedBaseUSD = cart.length > 0 ? cartTotalUSD : PRODUCTS[0].priceUSD;

  const finalTotalRobux = calculatedBaseRobux + addOnRobuxTotal - (giftCardApplied ? 500 : 0);
  const finalTotalUSD = Math.max(0, calculatedBaseUSD + addOnUSDTotal - (giftCardApplied ? 5.00 : 0));

  // Roblox Username Verification Simulation
  const handleVerifyUsername = () => {
    if (!robloxUsername.trim()) {
      showToast('Roblox Username Required', 'Please type your Roblox account name.', 'warning');
      return;
    }
    setIsVerifyingUser(true);
    setTimeout(() => {
      setIsVerifyingUser(false);
      setIsUsernameVerified(true);
      showToast('Roblox Account Verified!', `Successfully linked profile for @${robloxUsername}.`, 'success');
    }, 800);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  const handleApplyGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (giftCardPin.trim().length >= 8) {
      setGiftCardApplied(true);
      showToast('Gift Card Applied!', '$5.00 (R$ 500) credit applied to order.', 'success');
    } else {
      showToast('Invalid PIN', 'Please enter a valid 12-digit Roblox Gift Card PIN.', 'warning');
    }
  };

  // Complete Order Simulation
  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!robloxUsername.trim()) {
      showToast('Roblox Username Required', 'Please enter your Roblox username before paying.', 'warning');
      setCurrentStep(1);
      return;
    }

    if (!email.trim()) {
      showToast('Email Required', 'Please enter your email to receive your blueprint key.', 'warning');
      setCurrentStep(1);
      return;
    }

    setIsProcessing(true);
    setProcessingStage('Connecting to Roblox API...');

    setTimeout(() => {
      setProcessingStage('Whitelisting @' + robloxUsername + ' for TP2 blueprint import...');
    }, 800);

    setTimeout(() => {
      setProcessingStage('Processing secure payment transaction...');
    }, 1600);

    setTimeout(() => {
      setProcessingStage('Generating encrypted Theme Park Tycoon 2 blueprint key...');
    }, 2400);

    setTimeout(() => {
      const generatedOrderId = 'CC-' + Math.floor(100000 + Math.random() * 900000);
      const generatedKey =
        'TP2-' +
        Array.from({ length: 4 }, () => Math.random().toString(36).substring(2, 6).toUpperCase()).join('-');

      const methodNames: Record<PaymentMethod, string> = {
        gamepass: 'Roblox Gamepass / Group Funds',
        card: 'Credit / Debit Card (Stripe SSL)',
        paypal: 'PayPal Express Checkout',
        giftcard: 'Roblox Gift Card PIN',
        crypto: 'Cryptocurrency (Instant Settlement)'
      };

      setOrderReceipt({
        orderId: generatedOrderId,
        blueprintKey: generatedKey,
        robloxUsername,
        totalUSD: finalTotalUSD,
        totalRobux: finalTotalTotalRobux(),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        paymentMethodName: methodNames[selectedPayment]
      });

      setIsProcessing(false);
      setIsOrderComplete(true);
      clearCart();
      showToast('Payment Successful!', 'Your Theme Park Tycoon 2 blueprint code is ready!', 'success');
    }, 3200);
  };

  function finalTotalTotalRobux() {
    return Math.max(0, finalTotalRobux);
  }

  const copyBlueprintKey = () => {
    if (orderReceipt) {
      navigator.clipboard.writeText(orderReceipt.blueprintKey);
      showToast('Key Copied!', 'Blueprint key copied to clipboard.', 'success');
    }
  };

  const handleDownloadBackup = () => {
    if (!orderReceipt) return;
    const content = `=====================================================
COASTERCRAFT - THEME PARK TYCOON 2 BLUEPRINT RECEIPT
=====================================================
Order ID: ${orderReceipt.orderId}
Date: ${orderReceipt.date}
Roblox Account: @${orderReceipt.robloxUsername}
Payment Method: ${orderReceipt.paymentMethodName}

YOUR THEME PARK TYCOON 2 BLUEPRINT IMPORT KEY:
${orderReceipt.blueprintKey}

INSTRUCTIONS TO IMPORT IN ROBLOX:
1. Open Roblox and launch Theme Park Tycoon 2.
2. Open the In-Game Shop / Blueprints Menu.
3. Paste the key above into the "Import Blueprint String" box.
4. Select an empty plot and confirm placement!

For 24/7 VIP Installation Assistance, join discord.gg/coastercraft
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${orderReceipt.orderId}-TP2-Blueprint.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Download Started', 'Blueprint backup file saved to downloads.', 'info');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link & Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Marketplace
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
            <Lock className="w-4 h-4 text-emerald-400" /> 256-Bit SSL Encrypted Checkout
          </div>
        </div>

        {/* Progress Stepper Bar */}
        <div className="mb-10 p-6 rounded-3xl bg-gray-900 border border-gray-800 shadow-xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 pb-2 sm:pb-0 font-bold text-xs transition-colors ${
                currentStep >= 1 ? 'text-cyan-400' : 'text-gray-500'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                  currentStep >= 1
                    ? 'bg-cyan-500 text-gray-950 shadow-md shadow-cyan-500/30'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                1
              </div>
              <span>1. Roblox Account & Items</span>
            </button>

            <button
              onClick={() => setCurrentStep(2)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 pb-2 sm:pb-0 font-bold text-xs transition-colors ${
                currentStep >= 2 ? 'text-cyan-400' : 'text-gray-500'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                  currentStep >= 2
                    ? 'bg-cyan-500 text-gray-950 shadow-md shadow-cyan-500/30'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                2
              </div>
              <span>2. Payment Method</span>
            </button>

            <button
              onClick={() => {
                if (robloxUsername) setCurrentStep(3);
                else showToast('Enter Username', 'Please enter your Roblox username first.', 'warning');
              }}
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 pb-2 sm:pb-0 font-bold text-xs transition-colors ${
                currentStep === 3 ? 'text-cyan-400' : 'text-gray-500'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                  currentStep === 3
                    ? 'bg-cyan-500 text-gray-950 shadow-md shadow-cyan-500/30'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                3
              </div>
              <span>3. Confirmation & Key</span>
            </button>
          </div>
        </div>

        {!isOrderComplete ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column - Forms & Steps (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* STEP 1: Roblox Account & Delivery Setup */}
              <div
                className={`p-8 rounded-3xl bg-gray-900 border transition-all ${
                  currentStep === 1
                    ? 'border-cyan-500/50 shadow-2xl shadow-cyan-950/20'
                    : 'border-gray-800 opacity-90'
                }`}
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Gamepad2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Roblox Account Link</h2>
                      <p className="text-xs text-gray-400">Where should we deliver your TP2 blueprint key?</p>
                    </div>
                  </div>
                  {currentStep > 1 && (
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-bold text-cyan-400 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Roblox Username Field with Live Verification Button */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Roblox Username <span className="text-rose-400">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          required
                          value={robloxUsername}
                          onChange={(e) => {
                            setRobloxUsername(e.target.value);
                            setIsUsernameVerified(false);
                          }}
                          placeholder="e.g. CoasterKing2026"
                          className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                        />
                        {isUsernameVerified && (
                          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleVerifyUsername}
                        disabled={isVerifyingUser}
                        className="px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-cyan-300 border border-cyan-500/30 shrink-0 transition-colors"
                      >
                        {isVerifyingUser ? 'Checking...' : isUsernameVerified ? 'Verified ✓' : 'Verify Account'}
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Required for in-game Theme Park Tycoon 2 blueprint slot whitelisting.
                    </p>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    />
                    <p className="text-[11px] text-gray-500 mt-1">
                      Your blueprint backup string & PDF receipt will be emailed here.
                    </p>
                  </div>

                  {/* Discord Tag */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Discord Tag (Optional for 24/7 Live Support)
                    </label>
                    <input
                      type="text"
                      value={discordTag}
                      onChange={(e) => setDiscordTag(e.target.value)}
                      placeholder="e.g. coasterbuilder#0001"
                      className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Delivery Mode Choice */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-gray-300 mb-2">Delivery Mode</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setDeliveryPreference('blueprint')}
                        className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                          deliveryPreference === 'blueprint'
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                            : 'bg-gray-950 border-gray-800 text-gray-400'
                        }`}
                      >
                        <span className="block font-black text-gray-100">Instant Blueprint String</span>
                        <span className="text-[10px] text-gray-400 block mt-0.5">Copy-paste in TP2</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryPreference('vipsession')}
                        className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                          deliveryPreference === 'vipsession'
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                            : 'bg-gray-950 border-gray-800 text-gray-400'
                        }`}
                      >
                        <span className="block font-black text-gray-100">VIP Server Assist</span>
                        <span className="text-[10px] text-gray-400 block mt-0.5">Master builder joins</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryPreference('gamepass')}
                        className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                          deliveryPreference === 'gamepass'
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                            : 'bg-gray-950 border-gray-800 text-gray-400'
                        }`}
                      >
                        <span className="block font-black text-gray-100">Direct Gamepass Gift</span>
                        <span className="text-[10px] text-gray-400 block mt-0.5">Roblox gift transfer</span>
                      </button>
                    </div>
                  </div>

                  {currentStep === 1 && (
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (!robloxUsername.trim()) {
                            showToast('Username Required', 'Please enter your Roblox username.', 'warning');
                            return;
                          }
                          setCurrentStep(2);
                        }}
                        className="w-full py-3.5 px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
                      >
                        Continue to Payment Method <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 2: Payment Method Selection */}
              <div
                className={`p-8 rounded-3xl bg-gray-900 border transition-all ${
                  currentStep === 2
                    ? 'border-cyan-500/50 shadow-2xl shadow-cyan-950/20'
                    : 'border-gray-800 opacity-90'
                }`}
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Select Payment Option</h2>
                      <p className="text-xs text-gray-400">Pay using Robux, Credit Card, PayPal, Gift Card or Crypto</p>
                    </div>
                  </div>
                </div>

                {/* Payment Option Tabs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
                  {[
                    { id: 'gamepass', label: 'Robux', icon: Gamepad2 },
                    { id: 'card', label: 'Card / Visa', icon: CreditCard },
                    { id: 'paypal', label: 'PayPal', icon: Wallet },
                    { id: 'giftcard', label: 'Gift Card', icon: Ticket },
                    { id: 'crypto', label: 'Crypto', icon: QrCode }
                  ].map((method) => {
                    const Icon = method.icon;
                    const isActive = selectedPayment === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedPayment(method.id as PaymentMethod)}
                        className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                          isActive
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                            : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-panels per Payment Method */}
                <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800">
                  {/* OPTION 1: Robux Gamepass */}
                  {selectedPayment === 'gamepass' && (
                    <div className="space-y-4 text-xs">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <Gamepad2 className="w-5 h-5" /> Pay with Robux (Gamepass or Group Funds)
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        Purchase our official Roblox Gamepass badge equal to <strong>R$ {finalTotalTotalRobux().toLocaleString()}</strong> or send Group Funds payout. Once purchased, your TP2 blueprint key is generated instantly.
                      </p>

                      <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
                        <div className="flex justify-between text-gray-300">
                          <span>Gamepass Name:</span>
                          <span className="font-bold text-white">CoasterCraft VIP Blueprint Pass</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Price in Robux:</span>
                          <span className="font-bold text-emerald-400">R$ {finalTotalTotalRobux().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Verification Time:</span>
                          <span className="font-bold text-cyan-300">Instant (&lt; 2 Seconds)</span>
                        </div>
                      </div>

                      <a
                        href="https://www.roblox.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-cyan-300 font-bold border border-cyan-500/30"
                      >
                        Open Official Roblox Gamepass Page ↗
                      </a>
                    </div>
                  )}

                  {/* OPTION 2: Credit / Debit Card (Stripe) */}
                  {selectedPayment === 'card' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-gray-300">
                        <span className="font-bold text-white">Credit or Debit Card</span>
                        <span className="text-[10px] text-gray-500">Visa • Mastercard • Amex • Discover</span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Full Name as on card"
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-100 focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-gray-400 mb-1">Card Number</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="4532 •••• •••• 8892"
                              maxLength={19}
                              className="w-full px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-100 focus:outline-none focus:border-cyan-500 font-mono"
                            />
                            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM / YY"
                              maxLength={5}
                              className="w-full px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-100 focus:outline-none focus:border-cyan-500 font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-gray-400 mb-1">CVC / CVV</label>
                            <input
                              type="text"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              placeholder="123"
                              maxLength={4}
                              className="w-full px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-100 focus:outline-none focus:border-cyan-500 font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* OPTION 3: PayPal */}
                  {selectedPayment === 'paypal' && (
                    <div className="space-y-3 text-xs text-center py-2">
                      <Wallet className="w-8 h-8 text-blue-400 mx-auto mb-1" />
                      <h4 className="font-bold text-white text-sm">PayPal & Pay in 4</h4>
                      <p className="text-gray-400 max-w-sm mx-auto">
                        Pay safely with your PayPal balance, connected bank, or split into 4 interest-free payments.
                      </p>
                      <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-300 font-semibold inline-block">
                        Pay-in-4 Schedule: 4 payments of ${(finalTotalUSD / 4).toFixed(2)} USD
                      </div>
                    </div>
                  )}

                  {/* OPTION 4: Gift Card */}
                  {selectedPayment === 'giftcard' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                        <Ticket className="w-4 h-4" /> Roblox Gift Card or CoasterCraft Store Credit
                      </div>
                      <form onSubmit={handleApplyGiftCard} className="flex gap-2">
                        <input
                          type="text"
                          value={giftCardPin}
                          onChange={(e) => setGiftCardPin(e.target.value)}
                          placeholder="Enter 12-digit Gift Card PIN"
                          className="flex-1 px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-100 focus:outline-none focus:border-cyan-500 font-mono"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs"
                        >
                          Redeem PIN
                        </button>
                      </form>
                      {giftCardApplied && (
                        <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> $5.00 Gift Credit Active
                        </div>
                      )}
                    </div>
                  )}

                  {/* OPTION 5: Crypto */}
                  {selectedPayment === 'crypto' && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center gap-2 text-cyan-300 font-bold">
                        <QrCode className="w-4 h-4" /> Instant Crypto Settlement (BTC / SOL / USDT)
                      </div>
                      <p className="text-gray-400">
                        Send equivalent crypto amount to our automated merchant wallet:
                      </p>
                      <div className="p-3 rounded-xl bg-gray-900 border border-cyan-500/30 font-mono text-[11px] text-cyan-300 flex items-center justify-between">
                        <span className="truncate">0x71C...39F8A4b2901c80A3</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('0x71C80A39F8A4b2901c80A3');
                            showToast('Address Copied', 'Wallet address copied.', 'info');
                          }}
                          className="p-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Proceed to Final Review Button */}
                {currentStep === 2 && (
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="w-full py-4 px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
                    >
                      Review Order & Generate Key <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* STEP 3: Final Confirmation Action Box */}
              {currentStep === 3 && (
                <div className="p-8 rounded-3xl bg-gradient-to-r from-gray-900 via-gray-900 to-cyan-950/60 border border-cyan-500/50 shadow-2xl">
                  <h3 className="text-xl font-black text-white mb-2">Ready to Complete Purchase?</h3>
                  <p className="text-xs text-gray-300 mb-6 leading-relaxed">
                    By clicking below, your Theme Park Tycoon 2 blueprint key will be generated instantly and linked to Roblox user <strong>@{robloxUsername || 'Not Specified'}</strong>.
                  </p>

                  <form onSubmit={handleCompleteOrder}>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 hover:from-emerald-300 hover:to-blue-400 text-gray-950 font-black text-sm uppercase tracking-wider shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-3">
                          <RefreshCw className="w-5 h-5 animate-spin text-gray-950" />
                          <span>{processingStage || 'Processing Payment...'}</span>
                        </div>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 fill-current" /> Pay R$ {finalTotalTotalRobux().toLocaleString()} (${finalTotalUSD.toFixed(2)} USD) & Get Instant Key
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary & Bumps (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Cart Summary Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-cyan-400" /> Order Summary
                  </h3>
                  <span className="text-xs text-gray-400 font-semibold">
                    {displayCart.length} {displayCart.length === 1 ? 'Build' : 'Builds'}
                  </span>
                </div>

                {/* Item List */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {displayCart.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex gap-3 items-center p-3 rounded-2xl bg-gray-950/80 border border-gray-800/80"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover border border-gray-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-100 truncate">{product.name}</h4>
                        <span className="text-[10px] text-gray-400 block">{product.categoryName}</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs font-bold text-emerald-400">
                            R$ {(product.priceRobux * quantity).toLocaleString()}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            (${(product.priceUSD * quantity).toFixed(2)})
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-gray-400 px-2 py-1 rounded bg-gray-900">
                        x{quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input Form */}
                <div className="pt-2">
                  {appliedPromo ? (
                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs flex justify-between items-center text-emerald-300 font-semibold">
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-emerald-400" />
                        <span>Code {appliedPromo.code} ({appliedPromo.discountPercent}% OFF)</span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-xs text-emerald-400 hover:underline font-bold"
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
                        className="flex-1 px-3 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-cyan-300 border border-cyan-500/30"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Order Bumps / Upgrades Section */}
                <div className="pt-4 border-t border-gray-800 space-y-3">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                    Optional Build Upgrades
                  </span>

                  <label className="flex items-start gap-3 p-3 rounded-2xl bg-gray-950 border border-gray-800 cursor-pointer hover:border-cyan-500/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={addOns.speedBuild}
                      onChange={(e) => setAddOns({ ...addOns, speedBuild: e.target.checked })}
                      className="mt-1 rounded bg-gray-900 border-gray-700 text-cyan-500 focus:ring-0"
                    />
                    <div className="text-xs">
                      <div className="flex justify-between font-bold text-gray-200">
                        <span>VIP Speed Build Assist</span>
                        <span className="text-emerald-400">+R$ 250 ($2.99)</span>
                      </div>
                      <p className="text-[10px] text-gray-400">Master builder joins your VIP server to place pieces instantly.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-2xl bg-gray-950 border border-gray-800 cursor-pointer hover:border-cyan-500/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={addOns.lifetimeUpdates}
                      onChange={(e) => setAddOns({ ...addOns, lifetimeUpdates: e.target.checked })}
                      className="mt-1 rounded bg-gray-900 border-gray-700 text-cyan-500 focus:ring-0"
                    />
                    <div className="text-xs">
                      <div className="flex justify-between font-bold text-gray-200">
                        <span>Lifetime Blueprint Updates</span>
                        <span className="text-emerald-400">+R$ 150 ($1.99)</span>
                      </div>
                      <p className="text-[10px] text-gray-400">Free access to all future track & scenery re-designs.</p>
                    </div>
                  </label>
                </div>

                {/* Final Calculation Table */}
                <div className="space-y-2 pt-4 border-t border-gray-800 text-xs text-gray-300">
                  <div className="flex justify-between text-gray-400">
                    <span>Base Subtotal</span>
                    <span>R$ {calculatedBaseRobux.toLocaleString()} (${calculatedBaseUSD.toFixed(2)})</span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Discount ({appliedPromo.discountPercent}%)</span>
                      <span>- R$ {Math.round(calculatedBaseRobux * (appliedPromo.discountPercent / 100))}</span>
                    </div>
                  )}

                  {addOnRobuxTotal > 0 && (
                    <div className="flex justify-between text-cyan-300 font-semibold">
                      <span>Optional Upgrades</span>
                      <span>+ R$ {addOnRobuxTotal} (${addOnUSDTotal.toFixed(2)})</span>
                    </div>
                  )}

                  {giftCardApplied && (
                    <div className="flex justify-between text-amber-300 font-semibold">
                      <span>Gift Card Credit</span>
                      <span>- R$ 500 ($5.00)</span>
                    </div>
                  )}

                  <div className="flex justify-between text-base font-black text-white pt-3 border-t border-gray-800">
                    <span>Final Amount Due</span>
                    <div className="text-right">
                      <div className="text-emerald-400 font-extrabold text-lg">
                        R$ {finalTotalTotalRobux().toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400 font-normal">
                        (${finalTotalUSD.toFixed(2)} USD)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Guarantee Box */}
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Guaranteed Compatible & Safe
                  </div>
                  <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                    All blueprints built with 100% legitimate in-game TP2 primitives. Zero ban risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* RECEIPT & CONFIRMATION SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 uppercase tracking-wider inline-block mb-2">
              Payment Confirmed
            </span>

            <h2 className="text-3xl font-black text-white mb-2">Thank You For Your Order!</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto mb-8">
              Your Theme Park Tycoon 2 creation is ready! We have emailed the key to <strong>{email}</strong> and whitelisted Roblox user <strong>@{orderReceipt?.robloxUsername}</strong>.
            </p>

            {/* Receipt Box */}
            <div className="p-6 rounded-3xl bg-gray-950 border border-gray-800 text-left space-y-4 mb-8">
              <div className="flex flex-wrap justify-between items-center text-xs border-b border-gray-800/80 pb-3 gap-2">
                <div>
                  <span className="text-gray-500 block">Order Reference:</span>
                  <span className="font-mono font-bold text-gray-100 text-sm">{orderReceipt?.orderId}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 block">Date & Time:</span>
                  <span className="text-gray-300">{orderReceipt?.date}</span>
                </div>
              </div>

              {/* Blueprint String Display */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">
                  Your Theme Park Tycoon 2 Blueprint Key:
                </label>
                <div className="flex items-center gap-2 p-4 rounded-2xl bg-gray-900 border border-cyan-500/50 font-mono text-sm sm:text-base font-black text-cyan-300 shadow-inner">
                  <span className="flex-1 truncate tracking-wider">{orderReceipt?.blueprintKey}</span>
                  <button
                    onClick={copyBlueprintKey}
                    className="p-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
                    title="Copy Key"
                  >
                    <Copy className="w-4 h-4" /> Copy Key
                  </button>
                </div>
              </div>

              {/* Instructions Guide */}
              <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 text-xs text-gray-300 space-y-2">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> How to Import in Theme Park Tycoon 2:
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-gray-400 text-[11px] leading-relaxed">
                  <li>Launch Roblox and open <strong>Theme Park Tycoon 2</strong>.</li>
                  <li>Open the <strong>Blueprints / Slot Import</strong> menu.</li>
                  <li>Paste key <strong>{orderReceipt?.blueprintKey}</strong> into the import box.</li>
                  <li>Select your park plot and press <strong>Place Blueprint</strong>!</li>
                </ol>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownloadBackup}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 border border-gray-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-cyan-400" /> Download Blueprint Text Backup
              </button>

              <button
                onClick={() => navigate('/shop')}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-colors"
              >
                Return to Shop
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

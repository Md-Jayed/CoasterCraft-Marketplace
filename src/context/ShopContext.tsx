import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ToastMessage } from '../types';

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  toasts: ToastMessage[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  appliedPromo: { code: string; discountPercent: number } | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  cartSubtotalUSD: number;
  cartSubtotalRobux: number;
  cartTotalUSD: number;
  cartTotalRobux: number;
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('coastercraft_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('coastercraft_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('coastercraft_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('coastercraft_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast('Added to Cart', `${product.name} is in your cart!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Removed from Cart', 'Item removed from your shopping cart.', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast('Wishlist Updated', `Removed ${product.name} from wishlist.`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast('Wishlist Updated', `Saved ${product.name} to wishlist!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'TYCOON10' || cleanCode === 'ROBLOX10') {
      setAppliedPromo({ code: cleanCode, discountPercent: 10 });
      showToast('Promo Code Applied', '10% discount applied to your order!', 'success');
      return true;
    } else if (cleanCode === 'MEGA20') {
      setAppliedPromo({ code: cleanCode, discountPercent: 20 });
      showToast('VIP Code Applied', '20% VIP discount applied!', 'success');
      return true;
    } else {
      showToast('Invalid Code', 'Try code "TYCOON10" for 10% off.', 'warning');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo Code Removed', 'Discount removed.', 'info');
  };

  const cartSubtotalUSD = cart.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  const cartSubtotalRobux = cart.reduce((sum, item) => sum + item.product.priceRobux * item.quantity, 0);

  const discountMultiplier = appliedPromo ? (100 - appliedPromo.discountPercent) / 100 : 1;
  const cartTotalUSD = cartSubtotalUSD * discountMultiplier;
  const cartTotalRobux = Math.round(cartSubtotalRobux * discountMultiplier);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        toasts,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        appliedPromo,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        showToast,
        removeToast,
        applyPromoCode,
        removePromoCode,
        cartSubtotalUSD,
        cartSubtotalRobux,
        cartTotalUSD,
        cartTotalRobux,
        cartCount,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

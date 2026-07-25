import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { FeaturedBuildsPage } from './pages/FeaturedBuildsPage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-gray-950 font-sans text-gray-100 selection:bg-cyan-500 selection:text-gray-950">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:slug" element={<ProductDetailsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/featured" element={<FeaturedBuildsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />

          {/* Global Modals & Drawers */}
          <QuickViewModal />
          <CartDrawer />
          <CheckoutModal />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </ShopProvider>
  );
}

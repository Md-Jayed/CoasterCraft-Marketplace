import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Search,
  User,
  Menu,
  X,
  Compass,
  Layers,
  HelpCircle,
  Mail,
  Info,
  Flame,
  Gamepad2,
  Check,
  ChevronDown
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Featured Builds', path: '/featured' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-950/90 backdrop-blur-xl border-b border-gray-800/80 shadow-2xl shadow-cyan-950/20'
            : 'bg-gradient-to-b from-gray-950/95 via-gray-950/80 to-transparent border-b border-gray-800/40'
        }`}
      >
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 py-1.5 px-4 text-center text-xs font-semibold text-white tracking-wide shadow-inner hidden sm:block">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span className="px-2 py-0.5 rounded bg-black/20 text-[10px] font-bold uppercase tracking-wider">NEW</span>
            <span>Use code <strong className="underline decoration-cyan-300">TYCOON10</strong> for 10% OFF all Roller Coasters & Mega Parks!</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-gray-950 font-black shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 group-hover:scale-105 transition-all duration-300">
                <Gamepad2 className="w-6 h-6 text-gray-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                    Coaster<span className="text-cyan-400">Craft</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    TP2
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">
                  Roblox Marketplace
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 shadow-sm shadow-cyan-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-xl bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 transition-colors"
                title="Search Products"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/shop?wishlist=true"
                className="relative p-2.5 rounded-xl bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 transition-colors"
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-rose-400 fill-rose-500/20' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 py-2 px-3 sm:px-3.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs transition-all shadow-md shadow-cyan-500/10"
              >
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-gray-950 font-black text-[11px]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Profile Dropdown Button */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-2.5 rounded-xl bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 transition-colors flex items-center gap-1"
                >
                  <User className="w-4 h-4 text-cyan-400" />
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl p-4 text-xs z-50 text-white"
                    >
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-800 mb-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-gray-950">
                          TP2
                        </div>
                        <div>
                          <p className="font-bold text-gray-100">Guest Tycoon</p>
                          <p className="text-[10px] text-gray-400">Roblox Connected</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Link
                          to="/shop"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
                        >
                          <Compass className="w-4 h-4 text-cyan-400" />
                          <span>Browse Creations</span>
                        </Link>
                        <Link
                          to="/featured"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
                        >
                          <Flame className="w-4 h-4 text-amber-400" />
                          <span>Featured Mega Parks</span>
                        </Link>
                        <Link
                          to="/contact"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
                        >
                          <Mail className="w-4 h-4 text-emerald-400" />
                          <span>Custom Order Request</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-800 bg-gray-950/95 px-4 py-4 backdrop-blur-xl"
            >
              <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search roller coasters, mega parks, water rides..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold text-xs transition-colors"
                >
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Slide-down Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-800 bg-gray-950/95 px-6 py-6 space-y-3 backdrop-blur-2xl"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    location.pathname === link.path
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-gray-300 hover:bg-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

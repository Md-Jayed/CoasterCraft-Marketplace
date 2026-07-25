import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Heart, Send, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400 text-xs pt-16 pb-12 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800/80">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-gray-950 font-black shadow-lg shadow-cyan-500/20">
                <Gamepad2 className="w-6 h-6 text-gray-950" />
              </div>
              <div>
                <span className="text-xl font-black text-white">
                  Coaster<span className="text-cyan-400">Craft</span>
                </span>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  Theme Park Tycoon 2 Marketplace
                </p>
              </div>
            </Link>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              The premier community marketplace for custom Roblox Theme Park Tycoon 2 creations.
              Elevate your park with world-record roller coasters, 4-plot mega resorts, and detailed scenery.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Roblox Safe
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold text-[11px]">
                <Sparkles className="w-3.5 h-3.5" /> Instant Delivery
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-100 uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/shop" className="hover:text-cyan-400 transition-colors">
                  Shop Marketplace
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-cyan-400 transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link to="/featured" className="hover:text-cyan-400 transition-colors">
                  Featured Builds
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">
                  About Our Builder
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-cyan-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div>
            <h4 className="text-sm font-bold text-gray-100 uppercase tracking-wider mb-4">Legal & Support</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact & Custom Orders
                </Link>
              </li>
              <li>
                <Link to="/faq#installation" className="hover:text-cyan-400 transition-colors">
                  Installation Guide
                </Link>
              </li>
              <li>
                <Link to="/faq#refunds" className="hover:text-cyan-400 transition-colors">
                  Guarantee & Refund Policy
                </Link>
              </li>
              <li>
                <a href="#privacy" className="hover:text-cyan-400 transition-colors" onClick={(e) => e.preventDefault()}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-cyan-400 transition-colors" onClick={(e) => e.preventDefault()}>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Community & Socials */}
          <div>
            <h4 className="text-sm font-bold text-gray-100 uppercase tracking-wider mb-4">Join Community</h4>
            <p className="text-gray-400 leading-relaxed mb-4 text-[11px]">
              Connect with 15,000+ Theme Park Tycoon 2 enthusiasts on our Discord!
            </p>

            <div className="flex flex-wrap gap-2">
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-500 hover:bg-cyan-500/10 text-gray-300 hover:text-cyan-400 transition-all font-bold flex items-center gap-1.5"
              >
                <span>Discord</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-rose-500 hover:bg-rose-500/10 text-gray-300 hover:text-rose-400 transition-all font-bold"
              >
                <span>YouTube</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-400 hover:bg-cyan-400/10 text-gray-300 hover:text-cyan-300 transition-all font-bold"
              >
                <span>TikTok</span>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-400 hover:bg-blue-400/10 text-gray-300 hover:text-blue-400 transition-all font-bold"
              >
                <span>X (Twitter)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>
            © {new Date().getFullYear()} CoasterCraft Marketplace. Not affiliated with or endorsed by Roblox Corporation or Theme Park Tycoon 2 developers.
          </p>
          <div className="flex items-center gap-1">
            Crafted for <span className="text-cyan-400 font-semibold">Theme Park Tycoon 2</span> Enthusiasts
          </div>
        </div>
      </div>
    </footer>
  );
};

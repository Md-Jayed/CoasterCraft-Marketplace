import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Search, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { Link } from 'react-router-dom';

export const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-delivery-1');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Delivery', 'Installation', 'Roblox Requirements', 'Refunds', 'Support'];

  const filteredFaqs = FAQS.filter((faq) => {
    if (activeCategory !== 'All' && faq.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
            <HelpCircle className="w-4 h-4 text-cyan-400" /> Support Center
          </span>
          <h1 className="text-4xl font-black text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            Everything you need to know about purchasing, importing, and installing Roblox Theme Park Tycoon 2 creations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. gamepasses, refunds, blueprint import)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-900 border border-gray-800 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500 shadow-xl"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-500/10'
                  : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-gray-900 border border-gray-800 text-gray-400 text-xs">
              No questions found matching "{searchQuery}".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden transition-colors hover:border-gray-700"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left font-bold text-sm text-gray-100 flex items-center justify-between gap-4"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 pb-5 text-xs text-gray-300 leading-relaxed border-t border-gray-800/60 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Support Callout Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-gray-900 via-gray-900 to-cyan-950/40 border border-cyan-500/30 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-xs text-gray-400 mb-6">Our master builders operate 24/7 on Discord to assist with custom orders & slot installation.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold text-xs"
          >
            <MessageSquare className="w-4 h-4" /> Contact Support Team
          </Link>
        </div>
      </div>
    </div>
  );
};

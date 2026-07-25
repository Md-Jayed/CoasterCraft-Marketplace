import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Explore By Type
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Roblox Build Categories
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Find the exact creation you need to upgrade your Theme Park Tycoon 2 account—from extreme giga coasters to max profit starter parks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                to={`/shop?category=${cat.id}`}
                className="group relative flex flex-col h-80 rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-cyan-500/50 shadow-2xl transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-70 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

                <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-xs font-bold text-cyan-300 backdrop-blur-md">
                      {cat.itemCount} Products
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed mb-4 line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                      Explore Category <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

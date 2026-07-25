import React from 'react';
import { Flame, Sparkles, Crown } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const FeaturedBuildsPage: React.FC = () => {
  const featured = PRODUCTS.filter((p) => p.isFeatured || p.isBestseller);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
            <Flame className="w-4 h-4 text-amber-400" /> Top Tier Creations
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Featured Mega Parks & Record Builds
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Our most popular, highest rated, and largest multi-plot Theme Park Tycoon 2 builds. Hand-picked for outstanding visual aesthetics and maximum income performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};

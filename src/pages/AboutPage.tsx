import React from 'react';
import { Award, ShieldCheck, Flame, Sparkles, CheckCircle2, Gamepad2, Heart, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Master Roblox Architects
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-6">
            The Story Behind CoasterCraft
          </h1>
          <p className="text-base text-gray-300 leading-relaxed">
            Crafting world-record roller coasters and 4-plot mega resorts for the Roblox Theme Park Tycoon 2 community since 2018.
          </p>
        </div>

        {/* Creator Bio & Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 p-8 sm:p-12 rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl">
          <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-gray-800 bg-gray-950">
            <img
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200"
              alt="Roblox TP2 Master Builder Studio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-gray-950/80 backdrop-blur-md border border-cyan-500/30">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold">
                  Level 100
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">CoasterKing_RBLX & ArchitectVortex</h4>
                  <p className="text-xs text-gray-400">Head Builders & Founders of CoasterCraft</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Over 10,000+ Hours in Theme Park Tycoon 2
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              CoasterCraft was founded by a team of obsessive theme park enthusiasts and veteran Roblox builders. Having spent years perfecting precision banking, zero-clipping collision techniques, and primitive block architectural details, we noticed a major problem: building a top-tier coaster or mega park in TP2 takes hundreds of hours of painstaking placement.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              We created CoasterCraft to give every player instant access to world-class roller coasters, max cash-flow starter parks, and full-resort blueprints without the trial-and-error frustration.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-gray-200">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>15+ First Place wins in official Roblox Theme Park Tycoon 2 community build contests.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-200">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>Zero-bug smooth custom tracking engineered using mathematical curve modeling.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-200">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>100% legitimate in-game building tools—no hacks, no exploits, 100% account safe.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics & Achievements Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 text-center">
            <div className="text-3xl sm:text-4xl font-black text-cyan-400 mb-1">1,200+</div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Parks & Coasters Built</div>
          </div>
          <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 text-center">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 mb-1">4.98 ★</div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Average Customer Rating</div>
          </div>
          <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 text-center">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1">99.8%</div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Satisfaction Rate</div>
          </div>
          <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 text-center">
            <div className="text-3xl sm:text-4xl font-black text-blue-400 mb-1">15,000+</div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Discord Community</div>
          </div>
        </div>

        {/* Our Build Process */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-white">Our 5-Step Build Methodology</h2>
          <p className="text-xs text-gray-400 mt-2">How every CoasterCraft creation is brought to life</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Concept Design', desc: 'Theme selection & plot footprint layout' },
            { step: '02', title: 'Precision Track', desc: 'Custom smooth banking & velocity tuning' },
            { step: '03', title: 'Scenery Detailing', desc: 'Primitive block architecture & lighting' },
            { step: '04', title: 'Guest Flow Math', desc: 'Pathing optimization for max TP2 cash flow' },
            { step: '05', title: 'Final Testing', desc: 'Multi-hour stress testing for zero lag' }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-gray-900 border border-gray-800 text-center relative">
              <span className="text-2xl font-black text-cyan-400 block mb-2">{item.step}</span>
              <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-neon-velocity',
    name: 'Neon Velocity: Hydraulic Launch Coaster',
    slug: 'neon-velocity-launch-coaster',
    categoryId: 'roller-coasters',
    categoryName: 'Roller Coasters',
    priceUSD: 14.99,
    priceRobux: 1200,
    originalPriceUSD: 19.99,
    rating: 4.95,
    reviewCount: 142,
    creator: {
      name: 'CoasterKing_RBLX',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200',
      badge: 'Master Builder',
      tp2Level: 'Level 100 TP2 Legend',
      rating: 4.9,
      salesCount: 1240
    },
    shortDescription: 'Ultra-smooth hydraulic launch coaster featuring 115 mph launch speed, 6 inversions, and synchronized RGB neon light shows.',
    fullDescription: 'Neon Velocity is engineered for maximum thrill and park rating in Theme Park Tycoon 2. Designed with custom precision banking and zero clipping, this coaster includes a zero-G roll, cobra roll, and an underground glowing laser tunnel. Built with high guest throughput in mind.',
    features: [
      '0 to 115 MPH launch in 1.8 seconds',
      '6 smooth inversions with zero track bumps',
      'Fully animated neon RGB tunnel lighting',
      'Custom queue line with aesthetic station house',
      'Optimized piece count to eliminate lag'
    ],
    images: [
      'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: {
      difficulty: 'Intermediate',
      plotSize: '1 Plot (50x50m)',
      buildTime: '25 mins',
      pieceCount: 3820,
      maxSpeed: '115 mph',
      inversions: 6,
      tp2StatBoost: '+$3,200/min Income',
      themeStyle: 'Cyberpunk Neon'
    },
    isFeatured: true,
    isBestseller: true,
    tags: ['Coaster', 'Neon', 'Launch', 'High Speed', 'Inversions']
  },
  {
    id: 'prod-aetheria-skylines',
    name: 'Aetheria Skylines: Futuristic Mega Park',
    slug: 'aetheria-skylines-mega-park',
    categoryId: 'mega-parks',
    categoryName: 'Mega Parks',
    priceUSD: 49.99,
    priceRobux: 4000,
    originalPriceUSD: 69.99,
    rating: 4.98,
    reviewCount: 89,
    creator: {
      name: 'ArchitectVortex',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      badge: 'Verified Developer',
      tp2Level: 'Level 100 TP2 Legend',
      rating: 5.0,
      salesCount: 890
    },
    shortDescription: 'A colossal 4-plot sci-fi mega park featuring 8 coasters, monorail system, custom food plazas, and automated park lighting.',
    fullDescription: 'Aetheria Skylines is the pinnacle of Theme Park Tycoon 2 engineering. Spanning 4 full plots, this mega park houses a Giga Coaster, Flying Coaster, Inverted Loop Coaster, Log Flume, Ferris Wheel, and over 15 custom shops. Includes custom terrain terraforming, floating islands, and automated guest pathways.',
    features: [
      'Complete 4-Plot max size theme park',
      '8 fully operational custom roller coasters',
      'Elevated monorail transit system connecting all lands',
      'Massive income stream ($15,000+/min TP2 profit)',
      '100% smoothed pathways and no queue bottlenecks'
    ],
    images: [
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: {
      difficulty: 'Expert',
      plotSize: '4 Plots (100x100m)',
      buildTime: '2.5 Hours',
      pieceCount: 18450,
      maxSpeed: '128 mph',
      inversions: 18,
      tp2StatBoost: '+$16,500/min Income',
      themeStyle: 'Sci-Fi / Cyberpunk'
    },
    isFeatured: true,
    isNew: true,
    tags: ['Mega Park', '4 Plot', 'Full Resort', 'Monorail', 'High Income']
  },
  {
    id: 'prod-kraken-fury',
    name: "Kraken's Fury: 8-Inversion Floorless Coaster",
    slug: 'kraken-fury-floorless-coaster',
    categoryId: 'roller-coasters',
    categoryName: 'Roller Coasters',
    priceUSD: 16.50,
    priceRobux: 1350,
    originalPriceUSD: 22.00,
    rating: 4.89,
    reviewCount: 96,
    creator: {
      name: 'CoasterKing_RBLX',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200',
      badge: 'Master Builder',
      tp2Level: 'Level 100 TP2 Legend',
      rating: 4.9,
      salesCount: 1240
    },
    shortDescription: 'Deep ocean themed floorless coaster plunging into a misty kraken cavern with 8 intense inversions and water splash effects.',
    fullDescription: 'Dunk your park visitors into the abyss! Kraken’s Fury combines custom water splash emitters, custom kraken tentacle scenery built with primitive blocks, and an 8-inversion layout featuring a dive loop, immelmann, and interlocking corkscrews.',
    features: [
      'Custom 3D primitive block Kraken monster scenery',
      'Submerged water splash trigger zone',
      '8 head-spinning inversions with silky smooth transition banking',
      'Themed station with ship wreck decorations'
    ],
    images: [
      'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: {
      difficulty: 'Advanced',
      plotSize: '1.5 Plots',
      buildTime: '45 mins',
      pieceCount: 5200,
      maxSpeed: '92 mph',
      inversions: 8,
      tp2StatBoost: '+$4,100/min Income',
      themeStyle: 'Nautical / Pirate'
    },
    isFeatured: false,
    isBestseller: true,
    tags: ['Floorless', 'Kraken', 'Water Splash', 'Pirate', 'Inversions']
  },
  {
    id: 'prod-mystic-falls',
    name: 'Mystic Falls: Enchanted Log Flume & Splash Mountain',
    slug: 'mystic-falls-log-flume',
    categoryId: 'water-rides',
    categoryName: 'Water Rides',
    priceUSD: 18.99,
    priceRobux: 1500,
    originalPriceUSD: 24.99,
    rating: 4.92,
    reviewCount: 68,
    creator: {
      name: 'FloraStudio_Builds',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      badge: 'Top Scenery Designer',
      tp2Level: 'Level 88 TP2 Master',
      rating: 4.92,
      salesCount: 620
    },
    shortDescription: 'An immersive 5-minute fairytale log flume ride through bioluminescent cavern tunnels and a dramatic 70ft splash drop.',
    fullDescription: 'Bring magical water adventures to your park! Mystic Falls is decorated with custom waterfalls, glowing mushrooms, rockwork caverns, and twin splash drops. Guests flock to this ride, giving your park massive popularity ratings.',
    features: [
      'Bioluminescent cave lighting using custom glow props',
      'Twin drops with high-impact water splash effects',
      'Custom rock terrain surrounding the entire flume track',
      'Includes adjacent photo booth gift shop stall'
    ],
    images: [
      'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: {
      difficulty: 'Intermediate',
      plotSize: '2 Plots',
      buildTime: '1 Hour',
      pieceCount: 6400,
      maxSpeed: '45 mph',
      inversions: 0,
      tp2StatBoost: '+$5,000/min Income',
      themeStyle: 'Fantasy / Nature'
    },
    isFeatured: true,
    tags: ['Water Ride', 'Log Flume', 'Splash', 'Cave', 'Fantasy']
  },
  {
    id: 'prod-elysium-starter',
    name: 'Elysium Heights: Max Cash Flow Starter Park',
    slug: 'elysium-heights-starter-park',
    categoryId: 'starter-parks',
    categoryName: 'Starter Parks',
    priceUSD: 8.99,
    priceRobux: 750,
    originalPriceUSD: 12.99,
    rating: 4.97,
    reviewCount: 210,
    creator: {
      name: 'TycoonPro_RBLX',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      badge: 'Money Meta Expert',
      tp2Level: 'Level 95 TP2 Master',
      rating: 4.96,
      salesCount: 2450
    },
    shortDescription: 'The ultimate beginner budget park layout engineered specifically to generate $8,000+/min with minimal start money.',
    fullDescription: 'Stuck with low money in Theme Park Tycoon 2? Elysium Heights uses the optimal guest pathing math to keep guests buying food and riding rides without leaving. Comes with 1 budget wooden coaster, 4 flat rides, 12 shops, and clean paved plazas.',
    features: [
      'Generates $8,000+ per minute cash flow',
      'Compact 1-plot blueprint fits any starting park',
      'No expensive gamepasses required to install',
      'Includes food court & toilet plazas configured for max satisfaction'
    ],
    images: [
      'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: {
      difficulty: 'Beginner',
      plotSize: '1 Plot (50x50m)',
      buildTime: '15 mins',
      pieceCount: 1950,
      maxSpeed: '55 mph',
      inversions: 1,
      tp2StatBoost: '+$8,200/min Income',
      themeStyle: 'Clean Modern'
    },
    isFeatured: true,
    isBestseller: true,
    tags: ['Starter', 'Fast Money', 'Budget', 'Compact', 'Beginner']
  },
  {
    id: 'prod-valhalla-titan',
    name: 'Valhalla Titan: RMC Hybrid Mega Coaster',
    slug: 'valhalla-titan-rmc-hybrid-coaster',
    categoryId: 'roller-coasters',
    categoryName: 'Roller Coasters',
    priceUSD: 22.00,
    priceRobux: 1800,
    originalPriceUSD: 29.99,
    rating: 4.96,
    reviewCount: 115,
    creator: {
      name: 'CoasterKing_RBLX',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200',
      badge: 'Master Builder',
      tp2Level: 'Level 100 TP2 Legend',
      rating: 4.9,
      salesCount: 1240
    },
    shortDescription: 'Massive wooden structure with steel hybrid track, 90-degree drop, stall inversions, and intense airtime hills.',
    fullDescription: 'Modelled after real-life RMC hyper hybrid coasters like Steel Vengeance! Valhalla Titan towers over your park with intricate custom wooden framework, a terrifying 90-degree drop into a trench, and 5 heartline rolls.',
    features: [
      'Realistic wooden trestle framework built block-by-block',
      '90° vertical drop into custom ravine scenery',
      '5 zero-gravity stall inversions',
      'Maximum excitement rating (5 Stars in TP2)'
    ],
    images: [
      'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: {
      difficulty: 'Expert',
      plotSize: '2 Plots',
      buildTime: '1.2 Hours',
      pieceCount: 9800,
      maxSpeed: '88 mph',
      inversions: 5,
      tp2StatBoost: '+$6,800/min Income',
      themeStyle: 'Viking / Wooden RMC'
    },
    isFeatured: true,
    tags: ['RMC', 'Hybrid Coaster', 'Wooden', 'Airtime', 'Viking']
  },
  {
    id: 'prod-gothic-citadel-entrance',
    name: 'Gothic Citadel Main Entrance & Fountain Plaza',
    slug: 'gothic-citadel-main-entrance',
    categoryId: 'decorations',
    categoryName: 'Decorations & Scenery',
    priceUSD: 9.99,
    priceRobux: 800,
    originalPriceUSD: 14.99,
    rating: 4.88,
    reviewCount: 74,
    creator: {
      name: 'FloraStudio_Builds',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      badge: 'Top Scenery Designer',
      tp2Level: 'Level 88 TP2 Master',
      rating: 4.92,
      salesCount: 620
    },
    shortDescription: 'Grand gothic archway entrance gate, ticket booths, animated dancing fountain, and detailed floral landscaping.',
    fullDescription: 'Give your theme park a jaw-dropping first impression! The Gothic Citadel Entrance features detailed stone columns, spiked iron gates, integrated turnstiles, ticket kiosks, and a central tiered fountain with light shows.',
    features: [
      'Custom architectural arches built with precision primitives',
      'Central interactive multi-tiered fountain',
      'Integrated guest turnstiles and ticket booth counters',
      'Includes decorative lanterns and custom floral flowerbeds'
    ],
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: {
      difficulty: 'Beginner',
      plotSize: '0.5 Plot',
      buildTime: '20 mins',
      pieceCount: 2450,
      themeStyle: 'Gothic Castle'
    },
    isFeatured: false,
    tags: ['Entrance', 'Gothic', 'Fountain', 'Plaza', 'Scenery']
  },
  {
    id: 'prod-quantum-leap-4d',
    name: 'Quantum Leap: 4D Rotating Wing Coaster',
    slug: 'quantum-leap-4d-flying-coaster',
    categoryId: 'roller-coasters',
    categoryName: 'Roller Coasters',
    priceUSD: 24.99,
    priceRobux: 2000,
    originalPriceUSD: 34.99,
    rating: 4.99,
    reviewCount: 52,
    creator: {
      name: 'ArchitectVortex',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      badge: 'Verified Developer',
      tp2Level: 'Level 100 TP2 Legend',
      rating: 5.0,
      salesCount: 890
    },
    shortDescription: 'Mind-bending 4D coaster with seats that independently spin 360 degrees as riders traverse futuristic spacetime portals.',
    fullDescription: 'Push the limits of Theme Park Tycoon 2 physics! Quantum Leap features seat rotation timing perfectly synced with track drops, portal scenery rings, and sound effect triggers.',
    features: [
      'Synchronized 360-degree seat rotation axis',
      'Sci-fi portal rings with particle neon aesthetics',
      'Double launch track sequence',
      'Includes custom portal station bay'
    ],
    images: [
      'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: {
      difficulty: 'Expert',
      plotSize: '2 Plots',
      buildTime: '1 Hour',
      pieceCount: 7800,
      maxSpeed: '102 mph',
      inversions: 12,
      tp2StatBoost: '+$7,200/min Income',
      themeStyle: 'Sci-Fi Spacetime'
    },
    isFeatured: true,
    isNew: true,
    tags: ['4D Coaster', 'Sci-Fi', 'Spinning Seats', 'Portal', 'Thrill']
  },
  {
    id: 'prod-atlantis-resort',
    name: 'Atlantis Lagoon: Waterpark & Wave Pool Resort',
    slug: 'atlantis-lagoon-waterpark-resort',
    categoryId: 'theme-parks',
    categoryName: 'Theme Parks',
    priceUSD: 32.00,
    priceRobux: 2600,
    originalPriceUSD: 45.00,
    rating: 4.91,
    reviewCount: 61,
    creator: {
      name: 'FloraStudio_Builds',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      badge: 'Top Scenery Designer',
      tp2Level: 'Level 88 TP2 Master',
      rating: 4.92,
      salesCount: 620
    },
    shortDescription: 'Tropical water resort featuring 4 multi-slide towers, wave pool, lazy river, and underwater dining glass dome.',
    fullDescription: 'Turn your TP2 plot into a 5-star tropical getaway! Atlantis Lagoon blends custom water slide builds with lazy river currents, cabanas, palm tree landscaping, and a central underwater glass dining dome.',
    features: [
      '4 high-speed body water slide towers',
      'Enclosed underwater glass dome with view into water tank',
      'Lazy river looping around the entire island resort',
      'Custom beach cabanas, sunbeds, and tropical flora'
    ],
    images: [
      'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: {
      difficulty: 'Advanced',
      plotSize: '2 Plots',
      buildTime: '1.5 Hours',
      pieceCount: 11200,
      tp2StatBoost: '+$9,800/min Income',
      themeStyle: 'Tropical Resort'
    },
    isFeatured: false,
    tags: ['Waterpark', 'Slides', 'Tropical', 'Resort', 'Lazy River']
  },
  {
    id: 'prod-cyberpunk-scenery-pack',
    name: 'Cyberpunk Neon Signboards & Billboard Deco Pack',
    slug: 'cyberpunk-neon-signboards-pack',
    categoryId: 'decorations',
    categoryName: 'Decorations & Scenery',
    priceUSD: 6.99,
    priceRobux: 550,
    originalPriceUSD: 9.99,
    rating: 4.85,
    reviewCount: 128,
    creator: {
      name: 'ArchitectVortex',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      badge: 'Verified Developer',
      tp2Level: 'Level 100 TP2 Legend',
      rating: 5.0,
      salesCount: 890
    },
    shortDescription: 'Collection of 35+ ready-to-place glowing neon signs, holographic billboards, street lamps, and futuristic vending machines.',
    fullDescription: 'Instantly elevate any coaster station or plaza! This decoration pack includes glowing kanji/neon signs, holographic ride logos, sci-fi overhead street gantries, futuristic vending stalls, and trash bins.',
    features: [
      '35+ modular decorative assets',
      'Low piece count for zero park lag',
      'Fits seamlessly onto any shop or station exterior',
      'Color-customizable neon neon lighting blocks'
    ],
    images: [
      'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: {
      difficulty: 'Beginner',
      plotSize: 'Modular / Any Plot',
      buildTime: '5 mins',
      pieceCount: 850,
      themeStyle: 'Cyberpunk'
    },
    isFeatured: false,
    isBestseller: true,
    tags: ['Scenery', 'Neon', 'Cyberpunk', 'Signs', 'Deco']
  },
  {
    id: 'prod-custom-park-slot-build',
    name: 'Bespoke Custom Park / Coaster Slot Build Service',
    slug: 'bespoke-custom-park-slot-build-service',
    categoryId: 'custom-builds',
    categoryName: 'Custom Builds',
    priceUSD: 79.99,
    priceRobux: 6500,
    originalPriceUSD: 99.99,
    rating: 5.0,
    reviewCount: 42,
    creator: {
      name: 'CoasterKing_RBLX',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200',
      badge: 'Master Builder',
      tp2Level: 'Level 100 TP2 Legend',
      rating: 4.9,
      salesCount: 1240
    },
    shortDescription: 'Work 1-on-1 with a top Roblox TP2 builder! We design a custom park or coaster directly on your designated save slot.',
    fullDescription: 'Want a completely unique, 1-of-1 theme park or record-breaking hypercoaster built specifically for your Roblox account? Order this custom service and our master builders will coordinate via Discord to craft your dream park in TP2.',
    features: [
      '1-on-1 direct building collaboration on your save slot',
      'Custom theme, layout, coaster physics, and color palette of your choice',
      'Guaranteed 5-Star guest rating & maximum income optimization',
      'Includes full delivery within 48-72 hours with progress updates'
    ],
    images: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: {
      difficulty: 'Expert',
      plotSize: 'Up to 4 Plots',
      buildTime: '48-72 Hours',
      pieceCount: 20000,
      tp2StatBoost: '+$20,000+/min Income',
      themeStyle: '100% Customized'
    },
    isFeatured: true,
    isNew: true,
    tags: ['Custom Build', '1-on-1', 'Bespoke', 'Discord VIP', 'Unique']
  },
  {
    id: 'prod-overlord-spooky-manor',
    name: 'Overlord Manor: Dark Ride & Haunted Wooden Coaster',
    slug: 'overlord-manor-haunted-coaster',
    categoryId: 'roller-coasters',
    categoryName: 'Roller Coasters',
    priceUSD: 17.99,
    priceRobux: 1450,
    originalPriceUSD: 23.99,
    rating: 4.93,
    reviewCount: 81,
    creator: {
      name: 'ArchitectVortex',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      badge: 'Verified Developer',
      tp2Level: 'Level 100 TP2 Legend',
      rating: 5.0,
      salesCount: 890
    },
    shortDescription: 'Haunted mansion dark ride section leading into an explosive indoor-outdoor wooden coaster with foggy graveyard scenery.',
    fullDescription: 'Creep out your guests with style! Overlord Manor starts with a slow dark ride section through an animatronic haunted castle before blasting riders outside on a wooden coaster through misty fog and glowing pumpkin patches.',
    features: [
      'Dark ride indoors section with custom fog machines',
      'Graveyard scenery with animated skeletons and custom spires',
      'High capacity dual station platform',
      'High terror & excitement guest ratings'
    ],
    images: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: {
      difficulty: 'Intermediate',
      plotSize: '1.5 Plots',
      buildTime: '40 mins',
      pieceCount: 5800,
      maxSpeed: '78 mph',
      inversions: 2,
      tp2StatBoost: '+$4,800/min Income',
      themeStyle: 'Gothic / Spooky'
    },
    isFeatured: false,
    tags: ['Spooky', 'Haunted', 'Dark Ride', 'Wooden Coaster', 'Graveyard']
  }
];

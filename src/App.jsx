import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu as MenuIcon, X, ShoppingCart, User, Check, ChevronRight, ChevronLeft,
  ChevronDown, Star, Leaf, Facebook, Twitter, Instagram, Globe, Plus, Minus, Tag, CheckCircle2
} from 'lucide-react';

/* 
  =============================================================================
  UX/UI MASTERPIECE: INDIAN MEAL KIT D2C 
  Inspiration: Top Tier Competitor Accuracy, Premium Aesthetics, High Conversions
  =============================================================================
*/

// --- DESIGN SYSTEM TOKENS ---
const COLORS = {
  primary: '#067A46', // Vibrant, iconic green
  primaryHover: '#055D36',
  surfaceLightGreen: '#EBF5EB', // Soft mint for feature backgrounds
  surfaceBeige: '#FBF9F6', // Warm off-white, softer than pure white
  surfaceDark: '#242424', // Deep charcoal for footers/dark cards
  textMain: '#242424', // Headlines
  textMuted: '#5C5C5C', // Body copy, softer than black
  border: '#E8E8E8',
  white: '#FFFFFF',
  trustpilot: '#00B67A',
};

// Typography components for perfectly consistent scale and weight
const Text = {
  Hero: ({ children, className = '' }) => (
    <h1 className={`text-[46px] md:text-[56px] lg:text-[72px] font-black tracking-[-0.04em] leading-[1.05] text-[#242424] ${className}`}>
      {children}
    </h1>
  ),
  H2: ({ children, className = '' }) => (
    <h2 className={`text-[36px] md:text-[48px] font-black tracking-[-0.03em] leading-[1.1] text-[#242424] ${className}`}>
      {children}
    </h2>
  ),
  H3: ({ children, className = '' }) => (
    <h3 className={`text-[24px] md:text-[32px] font-extrabold tracking-[-0.02em] leading-[1.2] text-[#242424] ${className}`}>
      {children}
    </h3>
  ),
  H4: ({ children, className = '' }) => (
    <h4 className={`text-[18px] md:text-[22px] font-bold tracking-[-0.01em] leading-[1.3] text-[#242424] ${className}`}>
      {children}
    </h4>
  ),
  BodyLead: ({ children, className = '' }) => (
    <p className={`text-[18px] md:text-[20px] font-medium leading-[1.5] text-[#5C5C5C] ${className}`}>
      {children}
    </p>
  ),
  Body: ({ children, className = '' }) => (
    <p className={`text-[16px] font-medium leading-[1.6] text-[#5C5C5C] ${className}`}>
      {children}
    </p>
  ),
  Nav: ({ children, className = '', active = false }) => (
    <span className={`text-[15px] font-bold tracking-[0.01em] cursor-pointer transition-colors ${active ? 'text-[#067A46]' : 'text-[#242424] hover:text-[#067A46]'} ${className}`}>
      {children}
    </span>
  ),
  Label: ({ children, className = '' }) => (
    <span className={`text-[12px] font-bold uppercase tracking-[0.05em] text-[#5C5C5C] ${className}`}>
      {children}
    </span>
  )
};

// Highly polished Button primitives
const Button = {
  Primary: ({ children, onClick, className = '', fullWidth = false }) => (
    <button
      onClick={onClick}
      className={`bg-[#067A46] hover:bg-[#055D36] text-white text-[16px] xl:text-[18px] font-bold px-8 py-4 md:py-5 rounded-[4px] transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-[0.98] ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}
      style={{ boxShadow: '0 4px 14px 0 rgba(6, 122, 70, 0.25)' }}
    >
      {children}
    </button>
  ),
  Outline: ({ children, onClick, className = '', fullWidth = false }) => (
    <button
      onClick={onClick}
      className={`bg-white hover:bg-[#FBF9F6] text-[#067A46] border-[2px] border-[#067A46] text-[16px] font-bold px-8 py-4 rounded-[4px] transition-all duration-200 flex items-center justify-center gap-2 ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}
    >
      {children}
    </button>
  ),
  Dark: ({ children, onClick, className = '', fullWidth = false }) => (
    <button
      onClick={onClick}
      className={`bg-[#242424] hover:bg-black text-white text-[16px] font-bold px-8 py-4 rounded-[4px] transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-[0.98] ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}
    >
      {children}
    </button>
  )
};

// --- DATA MODELS ---

const MENUS = [
  {
    id: 'm1',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800',
    tag: 'Calorie Smart',
    title: 'Smoked Paneer Tikka Masala',
    subtitle: 'with Cumin-Scented Basmati & Garlic Naan',
    time: '20 min',
    difficulty: 'Easy'
  },
  {
    id: 'm2',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&q=80&w=800',
    tag: 'Premium Seafood',
    title: 'Kerala Coconut Barramundi Curry',
    subtitle: 'with Fragrant Jasmine Rice & Pickled Radish',
    time: '30 min',
    difficulty: 'Medium'
  },
  {
    id: 'm3',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800',
    tag: 'Vegetarian',
    title: 'Slow-Cooked Black Dal Makhani',
    subtitle: 'with Layered Whole Wheat Parathas',
    time: '25 min',
    difficulty: 'Easy'
  },
  {
    id: 'm4',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800',
    tag: 'Weekend Special',
    title: 'Hyderabadi Chicken Dum Biryani',
    subtitle: 'with Mint Cucumber Raita & Salan',
    time: '45 min',
    difficulty: 'Hard'
  }
];

const REVIEWS = [
  {
    image: 'https://images.unsplash.com/photo-1645696301019-35adcc18fc21?auto=format&fit=crop&q=80&w=600',
    text: "The exact spice blends make creating authentic Indian food so simple. Generous portions and incredible flavor profiles.",
    name: "Alisha R.",
    date: "2 days ago"
  },
  {
    image: 'https://images.unsplash.com/photo-1596463059283-da2025e648be?auto=format&fit=crop&q=80&w=600',
    text: "I am amazed at the quality of the paneer and fresh vegetables. Way better than taking out, and it actually saves us money.",
    name: "David M.",
    date: "1 week ago"
  },
  {
    image: 'https://plus.unsplash.com/premium_photo-1661600618035-7dcc137f8f90?auto=format&fit=crop&q=80&w=600',
    text: "Perfectly portioned ingredients mean I don't buy 8 whole spices just for one recipe. The Kerala Fish curry was a massive hit.",
    name: "Priya S.",
    date: "2 weeks ago"
  },
  {
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=600',
    text: "Healthy weeknight dinners have never been this easy. The Calorie Smart Indian menu is an absolute gamechanger.",
    name: "Sarah T.",
    date: "1 month ago"
  }
];

const IG_GRID = [
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1615486171430-8041ee4ceae3?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?auto=format&fit=crop&q=80&w=600"
];


// --- CORE UI SHELL ---

function Logo({ size = 'large' }) {
  const iconSize = size === 'large' ? 'w-10 h-10' : 'w-7 h-7';
  const textSize1 = size === 'large' ? 'text-[24px]' : 'text-[18px]';
  const textSize2 = size === 'large' ? 'text-[24px]' : 'text-[18px]';

  return (
    <div className="flex items-center gap-2 cursor-pointer group select-none">
      <div className={`relative ${iconSize} flex items-center justify-center transform group-hover:-rotate-12 transition-transform duration-300`}>
        {/* Lemon / Leaf Vector hybrid for HF look */}
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full absolute inset-0">
          <path d="M50 0C68.618 0 84.773 10.42 93.301 25H60V50H100C100 77.614 77.614 100 50 100C22.386 100 0 77.614 0 50C0 22.386 22.386 0 50 0Z" fill="#Bff438" />
          <path d="M50 0C77.614 0 100 22.386 100 50H60V25H93.301C84.773 10.42 68.618 0 50 0Z" fill={COLORS.primary} />
        </svg>
      </div>
      <div className="flex flex-col leading-[0.8] justify-center mt-1">
        <span className={`${textSize1} font-black tracking-tighter text-[#242424]`}>Ghar</span>
        <span className={`${textSize2} font-black tracking-tighter text-[#067A46]`}>Fresh</span>
      </div>
    </div>
  );
}

function TopNavigation({ setRoute }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] py-2' : 'bg-white/95 backdrop-blur-sm border-b border-[#E8E8E8] py-4'}`}>
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 flex items-center justify-between">

        <div className="flex items-center gap-10">
          <div onClick={() => setRoute('home')}><Logo size="large" /></div>

          <div className="hidden lg:flex items-center gap-6">
            <div onClick={() => setRoute('funnel')}><Text.Nav>Our Plans</Text.Nav></div>
            <div className="flex items-center gap-1 group"><Text.Nav>About Us</Text.Nav> <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#067A46]" /></div>
            <div className="flex items-center gap-1 group"><Text.Nav>Our Menus</Text.Nav> <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#067A46]" /></div>
            <div className="flex items-center gap-1 group"><Text.Nav>Gift Cards</Text.Nav></div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <Text.Nav className="hover:underline">Log in</Text.Nav>
          <Button.Outline onClick={() => setRoute('funnel')} className="!py-2.5 !px-6 !text-[14px]">Get Started</Button.Outline>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2 text-[#242424]"><MenuIcon className="w-7 h-7" /></button>

      </div>
    </div>
  );
}

function MegaFooter() {
  const columns = {
    "Discover": ["Students", "Blog", "Recipes", "Hero Discounts", "Recipe Directory", "Indian Classics"],
    "Our company": ["About GharFresh", "Sustainability", "Careers", "Press"],
    "Work with us": ["Partner", "Influencers", "Affiliates", "Corporate Sales"],
    "Help": ["Help Center & FAQ", "Delivery Options", "Return Policy", "Contact Support"]
  };

  return (
    <footer className="bg-white pt-20 pb-12 border-t border-[#E8E8E8]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">

        {/* Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 mb-16">
          {Object.entries(columns).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h5 className="text-[16px] font-extrabold text-[#242424] mb-6 tracking-wide">{title}</h5>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}><a href="#" className="text-[15px] font-medium text-[#5C5C5C] hover:text-[#067A46] hover:underline underline-offset-2 transition-all">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}

          {/* App Promo Column */}
          <div className="col-span-2 lg:col-span-2 lg:pl-10">
            <h5 className="text-[16px] font-extrabold text-[#242424] mb-6 tracking-wide">Download our app</h5>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <button className="bg-[#242424] text-white px-5 py-3 rounded-[8px] flex items-center gap-3 hover:bg-black transition-colors w-fit md:w-[200px]">
                <Leaf className="w-7 h-7" />
                <div className="text-left">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-300 mb-0.5">Download on the</div>
                  <div className="text-[16px] font-bold leading-none tracking-wide">App Store</div>
                </div>
              </button>
              <button className="bg-[#242424] text-white px-5 py-3 rounded-[8px] flex items-center gap-3 hover:bg-black transition-colors w-fit md:w-[200px]">
                <Globe className="w-7 h-7" />
                <div className="text-left">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-300 mb-0.5">GET IT ON</div>
                  <div className="text-[16px] font-bold leading-none tracking-wide">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E8E8E8] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-5">
            {[Facebook, Twitter, Instagram].map((Icon, idx) => (
              <a key={idx} href="#" className="w-12 h-12 rounded-full border border-[#D0D0D0] flex items-center justify-center text-[#5C5C5C] hover:text-white hover:bg-[#067A46] hover:border-[#067A46] transition-all">
                <Icon className="w-5 h-5 fill-current" />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-8 gap-y-3">
            <span className="text-[14px] font-bold text-[#5C5C5C]">© {new Date().getFullYear()} GharFresh Inc.</span>
            <a href="#" className="text-[14px] font-bold text-[#5C5C5C] hover:text-[#067A46]">Terms and Conditions</a>
            <a href="#" className="text-[14px] font-bold text-[#5C5C5C] hover:text-[#067A46]">Privacy Policy</a>
            <a href="#" className="text-[14px] font-bold text-[#5C5C5C] hover:text-[#067A46]">Accessibility</a>
          </div>
        </div>

      </div>
    </footer>
  );
}


// --- HOMEPAGE COMPONENTS ---

function HomeHero({ setRoute }) {
  return (
    <section className="relative w-full min-h-[600px] lg:h-[80vh] flex items-center bg-[#EBF5EB] overflow-hidden">

      {/* Absolute Full-Bleed Background Image masked nicely */}
      <img
        src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=2400"
        alt="Fresh vegetables and cooking elements"
        className="absolute inset-0 w-full h-full object-cover object-left md:object-center opacity-90"
      />

      {/* Subtle gradient overlay to ensure perfect contrast on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent lg:w-[60%]" />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 md:px-8 pt-10 pb-20 lg:py-0">

        {/* The classic HF solid white floating box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white p-8 md:p-12 w-full max-w-[540px] rounded-[16px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden"
        >
          {/* Top thick accent border strictly like HF */}
          <div className="absolute top-0 left-0 w-full h-[6px] bg-[#067A46]" />

          <Text.Hero className="mb-6">
            Take the stress out of mealtime
          </Text.Hero>

          <Text.BodyLead className="mb-10 text-[19px]">
            India's most loved meal kit. Delicious, pre-portioned fresh ingredients and easy authentic recipes delivered straight to your door.
          </Text.BodyLead>

          <Button.Primary onClick={() => setRoute('funnel')} fullWidth className="text-[17px] py-[22px]">
            View Our Plans
          </Button.Primary>
        </motion.div>

      </div>
    </section>
  );
}

function FourColumnWhy() {
  const reasons = [
    { title: "No commitment whatsoever", desc: "Skipping weeks or cancelling is super easy. Manage your account online anytime.", icon: Globe },
    { title: "Authentic & Pre-portioned", desc: "Fresh, high-quality ingredients, measured exactly for the recipe to eliminate zero food waste.", icon: Leaf },
    { title: "The most 5-star reviews", desc: "Our meal kits deliver the most delicious recipes, created by top Indian chefs.", icon: Star },
    { title: "Fresh and affordable", desc: "Cheaper than grocery shopping and way faster than takeout. Quality guaranteed.", icon: CheckCircle2 }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 text-center">
        <Text.H2 className="mb-20">Why GharFresh?</Text.H2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {reasons.map((r, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              {/* Massive circular icon with thick green border - exact HF trademark */}
              <div className="w-[120px] h-[120px] rounded-full border-[5px] border-[#067A46] bg-white flex items-center justify-center mb-8 shadow-sm group-hover:scale-105 transition-transform duration-300">
                {r.icon === Star ? (
                  <div className="relative">
                    <r.icon className="w-14 h-14 text-[#067A46] fill-[#067A46]" strokeWidth={1.5} />
                  </div>
                ) : (
                  <r.icon className="w-14 h-14 text-[#067A46]" strokeWidth={2} />
                )}
              </div>
              <Text.H4 className="mb-4">{r.title}</Text.H4>
              <Text.Body className="max-w-[260px]">{r.desc}</Text.Body>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <Button.Outline className="mx-auto text-[17px] px-10">Get Started</Button.Outline>
        </div>
      </div>
    </section>
  );
}

function InsideTheBoxHero() {
  return (
    <section className="py-20 md:py-28 bg-[#EBF5EB] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative">

        {/* Left Content */}
        <div className="w-full lg:w-1/2 relative z-10 lg:pl-[2%]">
          <Text.H2 className="mb-10 text-[42px] md:text-[52px]">What's inside the box?!</Text.H2>

          <ul className="space-y-8 mb-12">
            {[
              "Easy-to-follow recipe cards with exact visual instructions",
              "High-quality ingredients sourced straight from local Indian farms",
              "Convenient meal kits that fit perfectly in your fridge",
              "Cutting-edge cooling pouches to keep everything fresh during delivery"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-5 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-[#067A46]/20">
                  <Check className="w-5 h-5 text-[#067A46]" strokeWidth={3} />
                </div>
                <span className="text-[19px] font-bold text-[#242424] leading-[1.4] tracking-tight">{text}</span>
              </li>
            ))}
          </ul>

          <Button.Primary className="w-fit">View Our Plans</Button.Primary>
        </div>

        {/* Right Massive Circle Image */}
        <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[550px] aspect-square rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border-[16px] border-white overflow-hidden bg-white z-10 transform hover:rotate-2 transition-transform duration-700">
            <img
              src="https://images.unsplash.com/photo-1498837167922-41cfa6f31ce3?auto=format&fit=crop&q=80&w=1200"
              className="w-full h-full object-cover scale-110"
              alt="Box contents spread"
            />
          </div>
          {/* Decorative geometric shapes sometimes seen in these setups */}
          <div className="absolute top-[10%] -right-[10%] w-[200px] h-[200px] bg-[#Bff438] rounded-full opacity-30 blur-3xl" />
        </div>

      </div>
    </section>
  );
}

function HighlyDetailedMenuGrid() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 text-center">

        <Text.H2 className="mb-6 text-[40px] md:text-[52px]">Over 50+ fresh recipes every week</Text.H2>
        <Text.BodyLead className="mb-16 max-w-[800px] mx-auto">
          Easy meals designed by professional chefs and nutritionists. Customise your box with vegetarian, high-protein, and calorie-smart Indian options.
        </Text.BodyLead>

        {/* Strict 4-column layout of square cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {MENUS.map((menu) => (
            <div key={menu.id} className="text-left group cursor-pointer flex flex-col h-full">
              {/* Perfect square wrapping image */}
              <div className="relative w-full aspect-square rounded-[8px] overflow-hidden mb-5 bg-[#F8F8F8] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <img
                  src={menu.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  alt={menu.title}
                />
                {/* Top-left hovering tag */}
                <div className="absolute top-3 left-3 bg-white/95 px-3 py-1.5 rounded-[4px] shadow-sm">
                  <Text.Label className="!text-[11px] !text-[#242424]">{menu.tag}</Text.Label>
                </div>
              </div>

              {/* Precise Typography alignment */}
              <h4 className="text-[19px] font-extrabold leading-[1.2] text-[#242424] mb-1.5 group-hover:text-[#067A46] transition-colors">{menu.title}</h4>
              <p className="text-[15px] font-medium leading-[1.4] text-[#707070] mb-4 flex-grow">{menu.subtitle}</p>

              <div className="flex items-center gap-4 border-t border-[#E8E8E8] pt-4 mt-auto">
                <div className="flex items-center gap-1.5 text-[#5C5C5C] font-bold text-[13px] uppercase tracking-wide">
                  <Leaf className="w-4 h-4" /> {menu.time}
                </div>
                <div className="w-[1px] h-[12px] bg-[#D0D0D0]" />
                <div className="text-[#5C5C5C] font-bold text-[13px] uppercase tracking-wide">
                  {menu.difficulty}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <Button.Outline className="mx-auto" onClick={() => { }}>View Menus</Button.Outline>
        </div>

      </div>
    </section>
  );
}

function DarkSocialReviewGrid() {
  return (
    <section className="py-24 md:py-32 bg-[#FBF9F6]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 text-center">

        <Text.H2 className="mb-6">Tried, loved, and reordered.</Text.H2>
        <Text.BodyLead className="mb-16">The proof is on the plate. See why home cooks like you keep coming back.</Text.BodyLead>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {REVIEWS.map((review, i) => (
            <div key={i} className="flex flex-col h-full rounded-[12px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] group hover:-translate-y-2 transition-transform duration-400">

              {/* 4:3 Image ratio for impact */}
              <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#E8E8E8]">
                <img src={review.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Customer food" />
              </div>

              {/* Extremely dark grey card content mapping HF style */}
              <div className="bg-[#242424] p-6 text-white flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 text-[#00B67A] fill-[#00B67A]" />)}
                  </div>
                  <p className="text-[16px] font-medium leading-[1.6] text-white/90 mb-6 italic opacity-95">"{review.text}"</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="text-[14px] font-bold tracking-wide">{review.name}</div>
                  <div className="text-[12px] font-medium text-white/50">{review.date} via <span className="underline decoration-[#00B67A] decoration-2 underline-offset-2">Trustpilot</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// --- FUNNEL COMPONENTS (EXACT SCREENSHOT LOGIC) ---

function FunnelLayout({ step, onNext, onBack }) {
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [zip, setZip] = useState("110001");

  // Step Indicators exactly like the HF screenshots
  const stepsLabeled = ["About You", "Tastes & Routine", "Checkout", "Select Meals"];

  return (
    <div className="min-h-screen bg-[#FBF9F6] pt-[72px]">

      {/* Top Progress Bar & Banner */}
      <div className="bg-white shadow-sm border-b border-[#E8E8E8] relative z-20">
        <div className="max-w-[900px] mx-auto pt-8 pb-6 px-4">
          <div className="relative">
            {/* Tracker background rail */}
            <div className="absolute top-[8px] left-0 right-0 h-[4px] bg-[#E8E8E8] rounded-full" />
            {/* Tracker active rail */}
            <div className="absolute top-[8px] left-0 h-[4px] bg-[#067A46] rounded-full transition-all duration-500 ease-in-out" style={{ width: `${(step / 3) * 100}%` }} />

            {/* Tracker dots and labels */}
            <div className="relative flex justify-between z-10 w-full">
              {stepsLabeled.map((l, idx) => {
                const past = idx < step;
                const current = idx === step;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div className={`w-[20px] h-[20px] rounded-full flex items-center justify-center border-[3px] bg-white transition-colors duration-300 ${past || current ? 'border-[#067A46]' : 'border-[#D0D0D0]'}`}>
                      {(past || current) && <div className="w-[8px] h-[8px] rounded-full bg-[#067A46]" />}
                    </div>
                    <span className={`text-[13px] font-bold tracking-wide mt-3 transition-colors ${past || current ? 'text-[#067A46]' : 'text-[#A0A0A0]'}`}>{l}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* HF signature light green banner */}
        <div className="w-full bg-[#EBF5EB] py-3.5 px-4 flex items-center justify-center relative border-b border-[#c8dfc8]">
          <div className="flex items-center gap-2 text-[15px] font-bold text-[#242424]">
            <Tag className="w-5 h-5 text-[#067A46]" /> Discount successfully applied! Plus: Earn a FREE Premium Chef's Knife on box #3
          </div>
        </div>
      </div>

      {/* Funnel Content Viewport */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]"
        >
          {/* Left Form Panel */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 py-12 md:p-16 xl:p-24">
            {step === 0 && (
              <div className="max-w-[450px] mx-auto w-full">
                <div className="flex gap-2 items-center mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#Bff438] flex items-center justify-center"><Check className="w-5 h-5 text-[#067A46] stroke-[3]" /></div>
                </div>
                <Text.H4 className="text-[#067A46] mb-2">Good news!</Text.H4>
                <Text.H2 className="text-[#067A46] mb-12 text-[40px] md:text-[52px]">We deliver to your area!</Text.H2>

                <div className="relative mb-10 w-full group">
                  <label className="absolute -top-[10px] left-4 bg-[#FBF9F6] px-1 text-[13px] font-black tracking-wider uppercase text-[#067A46] z-10 transition-colors">Enter zip code</label>
                  <div className="border-[2px] border-[#067A46] rounded-[6px] bg-white flex items-center px-4 py-3.5 shadow-[0_2px_10px_rgba(6,122,70,0.1)] transition-shadow">
                    <input
                      type="text" value={zip} onChange={e => setZip(e.target.value)}
                      className="w-full outline-none text-[20px] font-bold text-[#242424] bg-transparent"
                    />
                    <Check className="w-7 h-7 text-[#067A46] flex-shrink-0" />
                  </div>
                </div>

                <Button.Dark fullWidth onClick={onNext} className="py-5 text-[18px]">Continue</Button.Dark>
              </div>
            )}

            {step === 1 && (
              <div className="max-w-[480px] mx-auto w-full">
                <Text.H2 className="mb-4 text-[42px] md:text-[48px]">How many people are you cooking for?</Text.H2>
                <Text.BodyLead className="mb-16">Just tell us who's hungry and we'll handle the portions perfectly.</Text.BodyLead>

                <div className="space-y-10 mb-16">
                  <div className="flex items-center justify-between">
                    <span className="text-[20px] font-bold text-[#242424]">Number of adults</span>
                    <div className="flex items-center border-[2px] border-[#D0D0D0] rounded-[6px] overflow-hidden bg-white shadow-sm">
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-14 h-14 flex items-center justify-center border-r-[2px] border-[#D0D0D0] hover:bg-[#F8F8F8] transition-colors"><Minus className="w-6 h-6 text-[#242424]" /></button>
                      <span className="w-14 h-14 flex items-center justify-center text-[22px] font-black text-[#242424]">{adults}</span>
                      <button onClick={() => setAdults(adults + 1)} className="w-14 h-14 flex items-center justify-center border-l-[2px] border-[#D0D0D0] hover:bg-[#F8F8F8] transition-colors"><Plus className="w-6 h-6 text-[#242424]" /></button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E8E8E8] pt-10">
                    <span className="text-[20px] font-bold text-[#242424]">Number of kids</span>
                    <div className="flex items-center border-[2px] border-[#D0D0D0] rounded-[6px] overflow-hidden bg-white shadow-sm">
                      <button onClick={() => setKids(Math.max(0, kids - 1))} className="w-14 h-14 flex items-center justify-center border-r-[2px] border-[#D0D0D0] hover:bg-[#F8F8F8] transition-colors"><Minus className="w-6 h-6 text-[#242424]" /></button>
                      <span className="w-14 h-14 flex items-center justify-center text-[22px] font-black text-[#242424]">{kids}</span>
                      <button onClick={() => setKids(kids + 1)} className="w-14 h-14 flex items-center justify-center border-l-[2px] border-[#D0D0D0] hover:bg-[#F8F8F8] transition-colors"><Plus className="w-6 h-6 text-[#242424]" /></button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button.Outline onClick={onBack} className="!px-6 border-[#D0D0D0] text-[#242424] hover:bg-[#F8F8F8] hover:border-[#A0A0A0]"><ChevronLeft className="w-6 h-6" /> Back</Button.Outline>
                  <Button.Dark fullWidth onClick={onNext} className="py-5 text-[18px]">Continue</Button.Dark>
                </div>
              </div>
            )}
          </div>

          {/* Right Image Panel */}
          <div className="w-full lg:w-[55%] flex items-center justify-center p-6 lg:p-12 relative overflow-hidden bg-[#EBF5EB]">
            {step === 0 && (
              <div className="w-full h-full max-h-[800px] bg-[#067A46] rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center justify-center p-12">
                <div className="transform scale-150">
                  <Logo size="large" />
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="w-full h-full max-h-[800px] rounded-[24px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative">
                <img src="https://images.unsplash.com/photo-1556910103-1c02745a8720?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Couple cooking" />
                {/* Floating Box prop */}
                <div className="absolute bottom-[10%] right-[10%] bg-[#067A46] p-8 rounded-[8px] shadow-2xl rotate-3 border-r-[10px] border-[#04502e]">
                  <Logo />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  )
}


// --- ROOT APP IMPL ---

export default function App() {
  const [route, setRoute] = useState('home');
  const [funnelStep, setFunnelStep] = useState(0);

  // Scroll restoration
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route, funnelStep]);

  return (
    <div className="font-sans text-[#242424] antialiased bg-white selection:bg-[#067A46] selection:text-white" style={{ fontFamily: '"Avenir Next", "Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>

      {/* Universal styling injections for perfect tracking and geometric look if fonts fail */}
      <style>{`
        h1, h2, h3, h4, h5, h6 { letter-spacing: -0.02em; font-weight: 900; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {route !== 'funnel' && <TopNavigation setRoute={(r) => { setRoute(r); setFunnelStep(0); }} />}

      <AnimatePresence mode="wait">
        {route === 'home' && (
          <motion.div key="home-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomeHero setRoute={setRoute} />
            <FourColumnWhy />
            <InsideTheBoxHero />
            <HighlyDetailedMenuGrid />
            <DarkSocialReviewGrid />
            <MegaFooter />
          </motion.div>
        )}

        {route === 'funnel' && (
          <motion.div key="funnel-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Note: The Header in the funnel is extremely minimal to trap the user in the conversion flow. */}
            <header className="fixed w-full top-0 z-50 bg-white border-b border-[#E8E8E8]">
              <div className="max-w-[1440px] mx-auto px-4 h-[72px] flex items-center justify-between">
                <div onClick={() => { setRoute('home'); setFunnelStep(0); }}><Logo /></div>
                <div className="text-[14px] font-bold text-[#5C5C5C] hidden sm:block">Need help? Call 1-800-GHARFRESH</div>
              </div>
            </header>

            <FunnelLayout
              step={funnelStep}
              onNext={() => {
                if (funnelStep < 1) setFunnelStep(funnelStep + 1);
                else setRoute('home'); // End of sim
              }}
              onBack={() => setFunnelStep(Math.max(0, funnelStep - 1))}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

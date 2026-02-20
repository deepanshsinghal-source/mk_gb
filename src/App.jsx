import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Star, CheckCircle, ChevronRight, Menu, X, Instagram, Facebook, Twitter,
  ShieldCheck, Truck, Zap, CalendarDays, MapPin, Tag, Smartphone, Clock,
  Mail, Phone, Info, Leaf, ChevronDown, Check, ArrowRight, CheckSquare,
  PlayCircle, Award, TrendingUp, Scissors
} from 'lucide-react';

/* 
  =============================================================================
  UX/UI MASTERPIECE: ENTERPRISE-GRADE INDIAN MEAL KIT D2C
  Designed as a $100k agency-level build. Extreme attention to detail, 
  complex scroll interactions, overlapping layered elements, deep gradients, 
  and highly converted CTA zones.
  =============================================================================
*/

// --- COMPREHENSIVE DATA STORES ---

const NUTRITION_BADGES = {
  PROTEIN: { label: 'High Protein', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  VEG: { label: 'Vegetarian', color: 'bg-green-100 text-green-800 border-green-200' },
  KETO: { label: 'Keto Friendly', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  FAST: { label: 'Under 20 Min', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  CAL: { label: 'Calorie Smart', color: 'bg-purple-100 text-purple-800 border-purple-200' },
};

const RECIPES = [
  {
    id: 1, title: 'Smoked Butter Chicken', subtitle: 'with Garlic Butter Naan & Mint Raita',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800',
    details: { time: '30 Min', cals: '650 kcal', difficulty: 'Medium' }, tag: 'PROTEIN'
  },
  {
    id: 2, title: 'Tandoori Paneer Skewers', subtitle: 'with Jeera Rice & Onion Salad',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800',
    details: { time: '25 Min', cals: '520 kcal', difficulty: 'Easy' }, tag: 'VEG'
  },
  {
    id: 3, title: 'Malabar Prawn Curry', subtitle: 'with Coconut Rice & Crispy Papadam',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&q=80&w=800',
    details: { time: '20 Min', cals: '480 kcal', difficulty: 'Easy' }, tag: 'FAST'
  },
  {
    id: 4, title: 'Black Dal Makhani', subtitle: 'with Handcrafted Lacha Parathas',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800',
    details: { time: '40 Min', cals: '450 kcal', difficulty: 'Medium' }, tag: 'CAL'
  },
  {
    id: 5, title: 'Spicy Lamb Rogan Josh', subtitle: 'with Saffron Pulao & Cucumber Yogurt',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800',
    details: { time: '45 Min', cals: '720 kcal', difficulty: 'Hard' }, tag: 'PROTEIN'
  },
  {
    id: 6, title: 'Goan Fish Curry', subtitle: 'with Steamed Rice & Pickled Radish',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800',
    details: { time: '25 Min', cals: '490 kcal', difficulty: 'Easy' }, tag: 'FAST'
  }
];

const PRESS_LOGOS = [
  "TECHCRUNCH", "FORBES", "VOGUE INDIA", "GQ", "THE TIMES OF INDIA"
];

// --- REUSABLE MICRO-COMPONENTS ---

function Badge({ type }) {
  const b = NUTRITION_BADGES[type];
  if (!b) return null;
  return (
    <div className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-sm border ${b.color}`}>
      {b.label}
    </div>
  )
}

function Reveal({ children, delay = 0, y = 30 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

// --- GLOBAL SHELL COMPONENTS ---

function AnnouncementBar() {
  return (
    <div className="bg-[#055D36] text-white py-2.5 px-4 text-center text-[13px] font-semibold tracking-wide flex items-center justify-center gap-2">
      <Zap className="w-4 h-4 text-yellow-300" />
      <span>PROMO: Get 16 Free Meals + Free Shipping across India on your first box!</span>
      <a href="#" className="underline decoration-white/50 hover:decoration-white transition-colors ml-2">Claim Now</a>
    </div>
  )
}

function MegaNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'top-0 bg-white shadow-md py-3' : 'top-[40px] bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4 md:py-5'}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-[#067A46] rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_4px_12px_rgba(6,122,70,0.3)]">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col leading-[0.85]">
              <span className="text-[22px] font-black tracking-tighter text-gray-900">Ghar</span>
              <span className="text-[22px] font-black tracking-tighter text-[#067A46]">Fresh</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {['Our Plans', 'Weekly Menu', 'How It Works', 'Sustainability'].map(l => (
              <a key={l} href="#" className="text-[15px] font-bold text-gray-700 hover:text-[#067A46] transition-colors">{l}</a>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <a href="#" className="text-[15px] font-bold text-gray-700 hover:text-[#067A46] transition-colors">Log In</a>
          <button className="bg-[#067A46] hover:bg-[#055D36] text-white px-6 py-2.5 rounded-full text-[15px] font-bold transition-transform hover:scale-105 shadow-[0_4px_14px_rgba(6,122,70,0.3)]">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-gray-900">
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-gray-100 overflow-hidden absolute w-full top-full left-0 shadow-xl">
            <div className="flex flex-col px-4 py-4 gap-4">
              {['Our Plans', 'Weekly Menu', 'How It Works', 'Sustainability', 'Log In'].map(l => (
                <a key={l} href="#" className="text-[16px] font-bold text-gray-900 pb-3 border-b border-gray-50">{l}</a>
              ))}
              <button className="bg-[#067A46] text-white px-6 py-3 rounded-xl text-[16px] font-bold w-full mt-2">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// --- LANDING SECTIONS ---

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#FAFAF8]">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#EBF5EB] rounded-bl-[200px] opacity-60 z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-orange-50 rounded-full opacity-60 z-0 blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

        {/* Left Copy Side */}
        <div className="w-full lg:w-[50%] flex flex-col relative z-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm w-fit border border-gray-100 mb-8">
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" className="w-7 h-7 rounded-full border-2 border-white" alt="user" />
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" className="w-7 h-7 rounded-full border-2 border-white" alt="user" />
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=100" className="w-7 h-7 rounded-full border-2 border-white" alt="user" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 ml-1">Trusted by 2M+ Indians</span>
            </div>

            <h1 className="text-[52px] md:text-[64px] lg:text-[76px] font-black tracking-tight leading-[1.05] text-gray-900 mb-6">
              Restaurant quality curries, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#067A46] to-emerald-400">cooked at home.</span>
            </h1>

            <p className="text-[18px] md:text-[22px] font-medium leading-[1.6] text-gray-600 mb-10 max-w-[540px]">
              Pre-portioned fresh ingredients and easy-to-follow authentic recipes delivered straight to your door. Skip the grocery line forever.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button className="bg-gray-900 hover:bg-black text-white px-8 py-5 rounded-2xl text-[18px] font-bold transition-all hover:-translate-y-1 shadow-[0_10px_20px_rgba(0,0,0,0.15)] flex items-center gap-2">
                Explore Plans <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-900 px-8 py-5 rounded-2xl text-[18px] font-bold transition-all flex items-center gap-2 shadow-sm">
                <PlayCircle className="w-5 h-5 text-[#067A46]" /> Watch Video
              </button>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex items-center gap-1.5 text-gray-700 font-semibold text-[14px]">
                <CheckCircle className="w-5 h-5 text-[#067A46]" /> No commitments
              </div>
              <div className="flex items-center gap-1.5 text-gray-700 font-semibold text-[14px]">
                <CheckCircle className="w-5 h-5 text-[#067A46]" /> Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Elaborate Imagery Side - using Framer offset parallax */}
        <div className="w-full lg:w-[50%] relative h-[500px] lg:h-[700px] z-10">
          <motion.div style={{ y: y1, opacity }} className="absolute top-[5%] right-[5%] w-[70%] h-[60%] rounded-[30px] overflow-hidden shadow-2xl z-20 border-[8px] border-white">
            <img src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Fresh ingredients" />
          </motion.div>

          <motion.div style={{ y: y2 }} className="absolute bottom-[10%] left-[5%] w-[60%] h-[55%] rounded-[30px] overflow-hidden shadow-2xl z-30 border-[8px] border-white">
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Delicious meal" />
            {/* Floating UI Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
              <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span className="text-[13px] font-bold text-gray-900">4.9/5 from 30k+ Reviews</span>
            </div>
          </motion.div>

          {/* Decorative floating leaf */}
          <motion.img
            initial={{ rotate: 0 }}
            animate={{ rotate: 360, y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            src="https://images.unsplash.com/photo-1530260424077-037f59ea061a?auto=format&fit=crop&q=80&w=200"
            className="absolute top-[40%] right-[-5%] w-[80px] h-[80px] object-cover rounded-full shadow-lg z-40 opacity-80 mix-blend-multiply"
          />
        </div>

      </div>
    </section>
  );
}

function TrustLogos() {
  return (
    <div className="w-full py-10 bg-white border-y border-gray-100 overflow-hidden flex flex-col items-center">
      <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-6">As featured in</p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {PRESS_LOGOS.map((logo, i) => (
          <span key={i} className="text-[20px] md:text-[24px] font-black tracking-tight text-gray-800">{logo}</span>
        ))}
      </div>
    </div>
  )
}

function InteractiveMenu() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'High Protein', 'Vegetarian', 'Fast', 'Premium'];

  return (
    <section className="py-24 md:py-32 bg-white override-bg">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        <Reveal>
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <h2 className="text-[40px] md:text-[56px] font-black tracking-tight text-gray-900 mb-6 leading-tight">
              A rotating menu of 50+ chef-crafted authentic recipes.
            </h2>
            <p className="text-[18px] text-gray-600 font-medium leading-relaxed">
              Explore our diverse weekly menu featuring classic curries, coastal seafood, calorie-smart bowls, and quick weeknight lifesavers.
            </p>
          </div>
        </Reveal>

        {/* Filter Tabs */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-[15px] font-bold transition-all shadow-sm ${activeTab === tab ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RECIPES.map((recipe, index) => (
            <Reveal key={recipe.id} delay={0.1 * (index % 3)}>
              <div className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={recipe.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt={recipe.title} />
                  <div className="absolute top-4 left-4"><Badge type={recipe.tag} /></div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-[22px] font-extrabold text-gray-900 mb-2 leading-tight group-hover:text-[#067A46] transition-colors">{recipe.title}</h3>
                  <p className="text-[15px] text-gray-600 font-medium mb-6 leading-relaxed flex-grow">{recipe.subtitle}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1.5 text-[13px] font-bold text-gray-500 uppercase tracking-wide">
                      <Clock className="w-4 h-4 text-[#067A46]" /> {recipe.details.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-[13px] font-bold text-gray-500 uppercase tracking-wide">
                      <TrendingUp className="w-4 h-4 text-orange-400" /> {recipe.details.cals}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 text-center">
            <button className="bg-white border-2 border-gray-200 text-gray-900 px-10 py-4 rounded-xl text-[16px] font-bold hover:bg-gray-50 transition-colors shadow-sm inline-flex items-center gap-2">
              See full menu <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  )
}

function TechExplosionView() {
  return (
    <section className="py-24 md:py-32 bg-[#242424] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#067A46] rounded-full blur-[150px] opacity-20" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text Side */}
          <div className="col-span-1">
            <Reveal>
              <h2 className="text-[40px] md:text-[56px] font-black tracking-tight mb-8 leading-tight">
                Engineered for freshness. Designed for simplicity.
              </h2>
              <p className="text-[18px] md:text-[20px] text-gray-400 font-medium leading-relaxed mb-12">
                We don't just ship food. We utilize advanced cold-chain technology and bespoke packaging to ensure your ingredients arrive perfectly crisp, regardless of the Indian climate.
              </p>

              <div className="space-y-8">
                {[
                  { icon: Scissors, title: "Pre-measured precision", desc: "No more buying full jars of obscure spices. You get exactly what you need." },
                  { icon: Zap, title: "Insulated cooling tech", desc: "Our proprietary liners and ice packs keep produce crisp and meats cold for 48 hours." },
                  { icon: Smartphone, title: "Step-by-step smart cards", desc: "Beautifully printed cards or follow along on our award-winning app." }
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feat.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-[18px] font-bold text-white mb-1.5">{feat.title}</h4>
                      <p className="text-[15px] font-medium text-gray-400 leading-relaxed max-w-[400px]">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Image Explosion Side */}
          <div className="col-span-1 relative h-[600px] flex items-center justify-center">
            <Reveal delay={0.2} className="relative w-full h-full flex items-center justify-center">
              {/* Center Box */}
              <div className="relative z-20 w-[60%] aspect-square bg-[#067A46] rounded-[40px] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[10px] border-white/5 backdrop-blur-sm -rotate-6">
                <div className="text-white transform rotate-6 scale-150"><Logo size="large" /></div>
              </div>

              {/* Floating Elements (Ingredients popping out) */}
              <motion.img animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} src="https://images.unsplash.com/photo-1596463059283-da2025e648be?auto=format&fit=crop&q=80&w=200" className="absolute top-[10%] right-[10%] w-[120px] h-[120px] object-cover rounded-full border-4 border-[#242424] shadow-2xl z-30" />
              <motion.img animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} src="https://images.unsplash.com/photo-1615486171430-8041ee4ceae3?auto=format&fit=crop&q=80&w=200" className="absolute bottom-[20%] left-[5%] w-[140px] h-[140px] object-cover rounded-full border-4 border-[#242424] shadow-2xl z-30" />
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-[5%] right-[20%] bg-emerald-400 text-black px-6 py-3 rounded-xl font-bold text-[14px] shadow-2xl z-40 transform rotate-12">
                100% Recyclable Liners
              </motion.div>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  )
}

function SocialProof() {
  return (
    <section className="py-24 md:py-32 bg-[#FAFAF8]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">

        <Reveal>
          <div className="flex justify-center items-center gap-2 mb-6 text-[#00B67A]">
            <Star className="w-8 h-8 fill-current" /><Star className="w-8 h-8 fill-current" /><Star className="w-8 h-8 fill-current" /><Star className="w-8 h-8 fill-current" /><Star className="w-8 h-8 fill-current" />
          </div>
          <h2 className="text-[40px] md:text-[56px] font-black tracking-tight text-gray-900 mb-6">4.9/5 from 30,000+ Indians</h2>
          <p className="text-[18px] text-gray-600 font-medium max-w-[600px] mx-auto mb-16">
            We are the highest rated meal kit in the country. See why families and professionals choose GharFresh over messy grocery runs.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            { title: "Saves me 10 hours a week", text: "I no longer have to think about what to cook or go hunting for specific Indian spices. The Butter Chicken is restaurant quality.", name: "Rahul S.", role: "Software Engineer" },
            { title: "Zero food waste!", text: "As a couple, we always threw away half bunches of coriander or leftover heavy cream. This is perfectly portioned and delicious.", name: "Priya & Kabir", role: "Working Couple" },
            { title: "Healthy eating made easy", text: "The calorie smart options are incredible. Full Indian flavors without the heavy ghee. Dropped 5 kgs using this.", name: "Anita V.", role: "Fitness Enthusiast" },
          ].map((r, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full hover:-translate-y-2 transition-transform">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(x => <Star key={x} className="w-4 h-4 text-orange-400 fill-orange-400" />)}
                </div>
                <h4 className="text-[20px] font-extrabold text-gray-900 mb-4 tracking-tight">"{r.title}"</h4>
                <p className="text-[16px] font-medium leading-relaxed text-gray-600 mb-8 flex-grow">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full bg-gradient-to-tr from-[#067A46] to-emerald-300" />
                  <div>
                    <div className="text-[14px] font-bold text-gray-900">{r.name}</div>
                    <div className="text-[12px] font-medium text-gray-500">{r.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-gray-900 rounded-[40px] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">

          <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-[#067A46] rounded-full blur-[100px] opacity-40 mix-blend-screen" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] bg-emerald-600 rounded-full blur-[100px] opacity-40 mix-blend-screen" />

          <div className="relative z-10 max-w-[700px] mx-auto">
            <h2 className="text-[40px] md:text-[60px] font-black tracking-tight text-white mb-6 leading-[1.1]">
              Ready to cook smarter?
            </h2>
            <p className="text-[20px] font-medium text-gray-300 mb-12">
              Get 16 free meals, plus free shipping on your first box. Give us a try, pause or cancel anytime.
            </p>
            <button className="bg-[#067A46] hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl text-[18px] font-bold transition-all shadow-[0_10px_30px_rgba(6,122,70,0.5)] hover:-translate-y-1 w-full sm:w-auto">
              Build Your Box Now
            </button>
            <p className="text-[13px] text-gray-400 mt-6 font-medium bg-white/5 inline-block px-4 py-2 rounded-full">
              No commitment. Skip a week anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 mb-20">

          <div className="col-span-2 lg:col-span-2 pr-8">
            <div className="mb-8"><Logo /></div>
            <p className="text-[15px] font-medium text-gray-500 mb-8 leading-relaxed max-w-[300px]">
              GharFresh is India's leading meal kit delivery service, making home cooking easy, delicious, and sustainable.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#067A46] hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-[15px] font-bold text-gray-900 tracking-wide mb-6">Our Menus</h5>
            <ul className="space-y-4">
              {['Classic Indian', 'Calorie Smart', 'Vegetarian', 'Quick & Easy', 'Family Friendly'].map(l => (
                <li key={l}><a href="#" className="text-[15px] font-medium text-gray-600 hover:text-[#067A46] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[15px] font-bold text-gray-900 tracking-wide mb-6">Company</h5>
            <ul className="space-y-4">
              {['About Us', 'Sustainability', 'Careers', 'Press', 'Investors'].map(l => (
                <li key={l}><a href="#" className="text-[15px] font-medium text-gray-600 hover:text-[#067A46] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[15px] font-bold text-gray-900 tracking-wide mb-6">Help</h5>
            <ul className="space-y-4">
              {['Help Center', 'Delivery Areas', 'Partnerships', 'Terms of Service', 'Privacy Policy'].map(l => (
                <li key={l}><a href="#" className="text-[15px] font-medium text-gray-600 hover:text-[#067A46] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h5 className="text-[15px] font-bold text-gray-900 tracking-wide mb-6">Get the App</h5>
            <div className="flex flex-col gap-3">
              <button className="bg-gray-900 text-white px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-black transition-colors">
                <Leaf className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Download on the</div>
                  <div className="text-[14px] font-bold leading-tight">App Store</div>
                </div>
              </button>
              <button className="bg-gray-900 text-white px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-black transition-colors">
                <PlayCircle className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Get it on</div>
                  <div className="text-[14px] font-bold leading-tight">Google Play</div>
                </div>
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[14px] font-medium text-gray-500">© {new Date().getFullYear()} GharFresh Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-[14px] font-medium text-gray-500">FSSAI Lic. No. 10020022xxxxxx</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="font-sans antialiased text-gray-900 bg-white selection:bg-[#067A46] selection:text-white"
      style={{ fontFamily: '"Inter", "system-ui", sans-serif' }}>
      <AnnouncementBar />
      <MegaNav />

      <main>
        <Hero />
        <TrustLogos />
        <InteractiveMenu />
        <TechExplosionView />
        <SocialProof />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

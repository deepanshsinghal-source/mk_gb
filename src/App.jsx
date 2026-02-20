import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ShoppingCart, Search, Info, Check, ChevronRight, ChevronLeft, ChevronDown,
  Star, Leaf, Facebook, Twitter, Instagram, Globe, Plus, Minus, Tag, MapPin, CheckCircle
} from "lucide-react";
import cx from "classnames";

// ============================================================================
// THEME & CONFIGURATION: EXACT REPLICA OF PROVIDED SCREENSHOTS
// ============================================================================

const THEME = {
  green: "#067A46", // Signature HF Green
  greenHover: "#055D36",
  greenLight: "#d5ecd4", // The light green banner color
  beige: "#FAFAF8", // The off-white background color used everywhere
  textBlack: "#242424", // The deep charcoal black used for headers and buttons
  textGray: "#707070", // The medium gray used for subtitles
  borderGray: "#EFEFEF",
  darkCard: "#2C2C2C", // The dark grey used for review cards
  white: "#FFFFFF",
};

// Typography utility classes to perfectly match the tight geometric sans-serif
const TYPO = {
  h1: "text-[52px] md:text-[68px] font-[900] tracking-[-0.03em] leading-[1.05] text-[#242424]",
  h2: "text-[36px] md:text-[44px] font-[900] tracking-[-0.02em] leading-[1.1] text-[#242424]",
  h3: "text-[24px] md:text-[32px] font-[800] tracking-[-0.01em] leading-[1.2] text-[#242424]",
  h4: "text-[18px] md:text-[22px] font-[800] tracking-[-0.01em] leading-[1.2] text-[#242424]",
  body: "text-[16px] md:text-[18px] font-[500] leading-[1.5] text-[#707070]",
  bodySmall: "text-[14px] font-[500] leading-[1.4] text-[#707070]",
  nav: "text-[15px] font-[700] tracking-[0.01em] text-[#242424]",
  button: "text-[16px] font-[700] tracking-[0.02em] uppercase",
};

// ============================================================================
// MASSIVE MOCK DATABASE FOR INDIAN CONTEXT
// ============================================================================

const RECIPES = [
  {
    id: "r1",
    title: "Paneer Tikka Masala",
    subtitle: "with Cumin-Scented Basmati Rice & Garlicky Naan",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800",
    tags: ["Vegetarian", "Top Rated"],
    time: "20 min",
    cals: "650 kcal",
  },
  {
    id: "r2",
    title: "Kerala Coconut Fish Curry",
    subtitle: "with Steamed Rice & Pickled Red Onions",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&q=80&w=800",
    tags: ["High Protein", "Pescatarian"],
    time: "30 min",
    cals: "520 kcal",
  },
  {
    id: "r3",
    title: "Classic Dal Makhani",
    subtitle: "with Whole Wheat Lacha Parathas & Mint Raita",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
    tags: ["Vegetarian", "Calorie Smart"],
    time: "25 min",
    cals: "480 kcal",
  },
  {
    id: "r4",
    title: "Hyderabadi Chicken Dum Biryani",
    subtitle: "with Cooling Cucumber Raita & Mirchi ka Salan",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    tags: ["Family Friendly", "Premium"],
    time: "45 min",
    cals: "850 kcal",
  },
  {
    id: "r5",
    title: "Mumbai Pav Bhaji",
    subtitle: "with Buttery Toasted Buns & Chopped Onion Mix",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800",
    tags: ["Vegetarian", "Fast"],
    time: "20 min",
    cals: "550 kcal",
  },
  {
    id: "r6",
    title: "Amritsari Chole Bhature",
    subtitle: "with Spiced Chickpeas & Fluffy Bread",
    image: "https://images.unsplash.com/photo-1538448834771-08103c8008ed?auto=format&fit=crop&q=80&w=800",
    tags: ["Vegetarian", "Weekend Special"],
    time: "35 min",
    cals: "720 kcal",
  },
];

const REVIEWS = [
  {
    name: "Samantha",
    source: "Trustpilot",
    text: "The variety of Indian regional dishes is great, the portions are generous and the delivery is excellent. Highly recommended for busy professionals.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a8720?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Nicole Orestano",
    source: "Trustpilot",
    text: "I am amazed at the amount of food... we have enough to feed our family of 4 plus lunch for my husband the next day. The Paneer Tikka is restaurant quality.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Paul Knox",
    source: "Trustpilot",
    text: "On time every week. Good food. Easy to make even if you're not experienced with Indian spices. The step-by-step cards are foolproof.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Cheryl McMillan",
    source: "Trustpilot",
    text: "I love how easy and convenient these meals are. The variety is outstanding as well, from rich curries to light coastal fish dishes.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
  },
];

// Reusable Circular Plate Images mimicking the transparent PNGs in the screenshots
const PLATES = [
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600"
];

// ============================================================================
// SHARED UI COMPONENTS
// ============================================================================

function Logo({ className = "w-[32px] h-[32px]" }) {
  return (
    <div className="flex items-center gap-1.5 cursor-pointer select-none">
      {/* Lime icon inspired by HF */}
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0C68.618 0 84.773 10.42 93.301 25H60V50H100C100 77.614 77.614 100 50 100C22.386 100 0 77.614 0 50C0 22.386 22.386 0 50 0Z" fill="#Bff438" />
        <path d="M50 0C77.614 0 100 22.386 100 50H60V25H93.301C84.773 10.42 68.618 0 50 0Z" fill="#067A46" />
      </svg>
      <div className="flex flex-col leading-[0.85]">
        <span className="text-[18px] font-[900] tracking-tight uppercase" style={{ color: THEME.textBlack }}>Ghar</span>
        <span className="text-[18px] font-[900] tracking-tight uppercase" style={{ color: THEME.textBlack }}>Fresh</span>
      </div>
    </div>
  );
}

function PrimaryButton({ children, onClick, className = "", fullWidth = false }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "bg-[#242424] hover:bg-black text-white rounded-[4px] px-8 py-[18px] transition-all duration-200 border-[1.5px] border-transparent",
        TYPO.button,
        fullWidth ? "w-full" : "w-auto",
        className
      )}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, onClick, className = "", fullWidth = false }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "bg-white hover:bg-gray-50 text-[#242424] rounded-[4px] px-8 py-[18px] transition-all duration-200 border-[1.5px] border-[#c0c0c0]",
        TYPO.button,
        fullWidth ? "w-full" : "w-auto",
        className
      )}
    >
      {children}
    </button>
  );
}

// ============================================================================
// GLOBAL SHELL: NAVIGATION & FOOTER
// ============================================================================

function Header({ currentRoute, setRoute }) {
  const [scrolled, setScrolled] = useState(false);
  const isFunnel = currentRoute === "funnel";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={cx(
        "fixed w-full top-0 z-50 transition-all duration-200",
        scrolled ? "bg-white border-b border-gray-200" : "bg-white border-b border-transparent"
      )}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">

          <div className="flex items-center gap-8 h-full">
            <div onClick={() => setRoute("home")}>
              <Logo />
            </div>

            {!isFunnel && (
              <nav className="hidden lg:flex items-center space-x-1 h-full">
                {['Our Plans', 'About Us', 'Our Menus', 'Our Meal Kits', 'Gift Cards', 'Sustainability', 'Partnerships'].map((link) => (
                  <button
                    key={link}
                    onClick={() => link === 'Our Plans' ? setRoute('funnel') : null}
                    className="h-full px-3 text-[#242424] hover:text-[#067A46] font-[700] text-[15px] flex items-center gap-1 group border-b-2 border-transparent hover:border-[#067A46]"
                  >
                    {link}
                    {(link === 'About Us' || link === 'Our Menus' || link === 'Our Meal Kits' || link === 'Sustainability' || link === 'Partnerships') && (
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#067A46]" />
                    )}
                  </button>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-6">
            {!isFunnel && (
              <button className="hidden lg:block border-[1.5px] border-gray-300 rounded-[4px] px-5 py-2 font-[700] text-[14px] text-[#242424] hover:bg-gray-50">
                Log in
              </button>
            )}
            {isFunnel && (
              <div className="hidden lg:block">
                <span className="text-[12px] font-[600] text-gray-500 mr-4">Questions? Call 1800-GHAR-FRESH</span>
                <button className="border-[1.5px] border-gray-300 rounded-[4px] px-5 py-2 font-[700] text-[14px] text-[#242424] hover:bg-gray-50">
                  Log in
                </button>
              </div>
            )}
            <div className="relative cursor-pointer">
              <ShoppingCart className="w-6 h-6 text-[#242424]" />
              {isFunnel && <span className="absolute -top-1.5 -right-1.5 bg-[#f96e46] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">1</span>}
            </div>
          </div>

        </div>
      </header>
      <div className="h-[72px]" />
    </>
  );
}

function Footer() {
  const links = {
    "GharFresh": ["Students", "Blog", "Recipes", "Hero Discounts", "Recipe Directory", "California Supply Chains Act", "Delivery Options"],
    "Our company": ["Meal Kit Group", "Sustainability", "Careers", "Press"],
    "Work with us": ["Partner", "Influencers", "Affiliates"],
    "Contact us": ["Help Center & FAQ", "Partnership Inquiries", "Corporate Sales"]
  };

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-12 mb-16">

          {Object.entries(links).map(([cat, list]) => (
            <div key={cat} className="col-span-1">
              <h5 className="font-[800] text-[16px] text-[#242424] mb-4">{cat}</h5>
              <ul className="space-y-3">
                {list.map(item => (
                  <li key={item}>
                    <a href="#" className="font-[500] text-[14px] text-[#707070] hover:text-[#067A46] hover:underline decoration-[#067A46] underline-offset-2">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 lg:col-span-2">
            <h5 className="font-[800] text-[16px] text-[#242424] mb-4">Download the app</h5>
            <div className="flex flex-col gap-3">
              <button className="bg-black text-white px-4 py-2.5 rounded-[6px] w-[160px] flex items-center gap-2 hover:bg-black/90">
                <Info className="w-6 h-6" />
                <div className="text-left flex flex-col justify-center">
                  <span className="text-[10px] font-[600] uppercase text-gray-300 leading-none mb-1">Download on the</span>
                  <span className="text-[16px] font-[700] leading-none">App Store</span>
                </div>
              </button>
              <button className="bg-black text-white px-4 py-2.5 rounded-[6px] w-[160px] flex items-center gap-2 hover:bg-black/90">
                <Info className="w-6 h-6" />
                <div className="text-left flex flex-col justify-center">
                  <span className="text-[10px] font-[600] uppercase text-gray-300 leading-none mb-1">GET IT ON</span>
                  <span className="text-[16px] font-[700] leading-none">Google Play</span>
                </div>
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#067A46] hover:border-[#067A46] transition-colors">
                <Icon className="w-5 h-5 fill-current" />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-2 font-[500] text-[14px] text-[#707070]">
            <span className="hidden lg:inline mr-2">© {new Date().getFullYear()} GharFresh Inc.</span>
            <a href="#" className="hover:text-[#067A46] hover:underline">Terms and Conditions</a>
            <a href="#" className="hover:text-[#067A46] hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-[#067A46] hover:underline">Accessibility</a>
          </div>
          <span className="lg:hidden font-[500] text-[14px] text-[#707070] mt-2">© {new Date().getFullYear()} GharFresh Inc.</span>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// PAGE: LANDING / HOME (EXACT VISUAL REPLICA)
// ============================================================================

function HomeHero({ setRoute }) {
  return (
    <section className="relative w-full min-h-[600px] lg:h-[75vh] flex items-center justify-center overflow-hidden bg-[#FAFAF8]">

      {/* Absolute positioning of floating circular plates of food (mimicking screenshots) */}
      <img src={PLATES[0]} className="absolute -left-10 lg:left-[5%] top-[10%] w-[180px] lg:w-[280px] h-[180px] lg:h-[280px] object-cover rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.15)] z-10" />
      <img src={PLATES[1]} className="absolute -right-10 lg:right-[5%] top-[5%] w-[200px] lg:w-[320px] h-[200px] lg:h-[320px] object-cover rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.15)] z-10" />
      <img src={PLATES[2]} className="absolute -left-20 lg:left-[10%] bottom-[5%] w-[220px] lg:w-[340px] h-[220px] lg:h-[340px] object-cover rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.15)] z-10" />
      <img src={PLATES[3]} className="absolute -right-10 lg:right-[8%] bottom-[10%] w-[150px] lg:w-[240px] h-[150px] lg:h-[240px] object-cover rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.15)] z-10" />

      {/* Central rectangular green platter mimicking bottom-left in user's hero screenshot */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-[5%] left-[30%] hidden xl:flex gap-4 p-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] bg-[#6ba860] w-[320px] z-10"
      >
        <img src="https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=200" className="w-[80px] h-[80px] rounded-full object-cover shadow-inner" />
        <div className="flex flex-col gap-2">
          <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200" className="w-[100px] h-[80px] rounded-[12px] object-cover shadow-inner" />
          <img src="https://images.unsplash.com/photo-1606850239634-9279144fa506?auto=format&fit=crop&q=80&w=200" className="w-[100px] h-[60px] rounded-[12px] object-cover shadow-inner" />
        </div>
      </motion.div>

      {/* Central Text Content */}
      <div className="relative z-20 text-center max-w-[500px] px-4 pt-10">
        <h1 className={cx(TYPO.h1, "mb-4")}>Dinner done right.<br />Every night.</h1>
        <div className="mt-8 flex justify-center w-[120px] mx-auto h-[6px] bg-[#242424] rounded-full opacity-30" />
      </div>

    </section>
  );
}

function RecipeCarousel({ setRoute }) {
  return (
    <section className="py-24 bg-[#FAFAF8] border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#242424]">
        <h2 className={cx(TYPO.h2, "mb-4")}>Tried, loved, and reordered.</h2>
        <p className={cx(TYPO.body, "mb-12")}>Our recipe subscription's top-rated meals, chosen again and again by home cooks like you.</p>

        {/* Horizontal Carousel Representation */}
        <div className="relative mb-16 px-6">
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x no-scrollbar hide-scroll">
            {RECIPES.map((r, i) => (
              <div key={r.id} className="min-w-[340px] md:min-w-[400px] snap-center text-left bg-white pt-4 pb-8 border-b-4 border-transparent hover:border-[#067A46] transition-colors group cursor-pointer">
                <div className="aspect-[4/3] rounded-[4px] overflow-hidden mb-6 relative shadow-sm group-hover:shadow-md transition-shadow">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                </div>
                <h4 className={cx(TYPO.h4, "mb-1 group-hover:text-[#067A46] transition-colors")}>{r.title}</h4>
                <p className={cx(TYPO.bodySmall, "line-clamp-2")}>{r.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Arrow Overlays */}
          <button className="absolute right-0 top-1/3 bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] z-10 hover:scale-105 transition-transform"><ChevronRight className="w-8 h-8 text-[#242424]" /></button>
          <button className="absolute left-0 top-1/3 bg-white w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] z-10 hover:scale-105 transition-transform opacity-50 cursor-not-allowed"><ChevronLeft className="w-8 h-8 text-[#242424]" /></button>
        </div>

        <PrimaryButton onClick={() => setRoute('funnel')}>See Pricing & Plans</PrimaryButton>
      </div>
    </section>
  );
}

function DarkReviews() {
  return (
    <section className="py-24 bg-[#FAFAF8]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={cx(TYPO.h2, "mb-4")}>Why millions love GharFresh</h2>
        <p className={cx(TYPO.body, "mb-16")}>The proof is on the plate. See why home cooks like you keep coming back.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, i) => (
            <div key={i} className="flex flex-col h-full rounded-[8px] overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="h-[220px] w-full relative">
                <img src={review.image} className="w-full h-full object-cover" />
              </div>
              <div className="bg-[#2C2C2C] p-6 text-left flex-grow flex flex-col justify-between text-white">
                <p className="text-[15px] font-[500] leading-[1.5] mb-6 opacity-90 block">"{review.text}"</p>
                <div>
                  <span className="text-[13px] font-[700] block">{review.name}, from <span className="underline decoration-[#00B67A] underline-offset-2">Trustpilot</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeBottomCTA({ setRoute }) {
  return (
    <section className="py-32 bg-[#FAFAF8] relative overflow-hidden flex items-center justify-center text-center">
      <img src={PLATES[0]} className="absolute -left-20 top-10 w-[300px] h-[300px] object-cover rounded-full shadow-2xl z-10" />
      <img src={PLATES[1]} className="absolute -right-20 bottom-10 w-[300px] h-[300px] object-cover rounded-full shadow-2xl z-10" />
      <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=200" className="absolute left-[15%] bottom-[10%] w-[120px] h-[120px] object-cover rounded-full shadow-lg z-10 opacity-70" />

      <div className="relative z-20 max-w-[800px] mx-auto px-4">
        <h2 className={cx("text-[48px] md:text-[64px] font-[900] tracking-[-0.03em] leading-[1.05] text-[#242424] uppercase text-shadow-sm mb-6")}>
          Delicious. Healthy.<br />Ready for your kitchen.
        </h2>
        <p className={cx(TYPO.body, "mb-10 text-[20px]")}>Tasty meals made simple, so healthy habits stick.</p>
        <PrimaryButton onClick={() => setRoute('funnel')}>See Pricing & Plans</PrimaryButton>
      </div>
    </section>
  );
}

// ============================================================================
// PAGE: FUNNEL (EXACT MULTI-STEP REPLICA)
// ============================================================================

function FunnelProgress({ step }) {
  const steps = ["About You", "Tastes & Routine", "Checkout", "Select Meals"];

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[900px] mx-auto pt-6 pb-4 px-4">
        <div className="flex justify-between relative mb-2">
          {/* Background line */}
          <div className="absolute top-1.5 left-0 w-full h-[3px] bg-gray-200 rounded-full z-0" />

          {/* Active Line (calculates width based on step) */}
          <div className="absolute top-1.5 left-0 h-[3px] bg-[#067A46] rounded-full z-10 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />

          {steps.map((label, idx) => {
            const isActive = idx === step;
            const isPast = idx < step;
            return (
              <div key={label} className="relative z-20 flex flex-col items-center flex-1">
                <div className={cx(
                  "w-[15px] h-[15px] rounded-full flex items-center justify-center border-2 bg-white transition-colors duration-300",
                  (isActive || isPast) ? "border-[#067A46]" : "border-gray-200"
                )}>
                  {(isActive || isPast) && <div className="w-[7px] h-[7px] bg-[#067A46] rounded-full" />}
                </div>
                <span className={cx(
                  "text-[12px] font-[700] tracking-wide mt-2 transition-colors duration-300",
                  (isActive || isPast) ? "text-[#067A46]" : "text-gray-400"
                )}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Light Green Promo Banner exactly like screenshot */}
      <div className="w-full bg-[#d5ecd4] py-3 px-4 flex items-center justify-center relative">
        <div className="flex items-center gap-2 text-[14px] font-[700] text-[#242424]">
          <Tag className="w-4 h-4" /> Discount successfully applied! Plus for a limited time: earn a FREE Premium Chef's Knife on box #3
        </div>
        <button className="absolute right-4 top-1/2 -translate-y-1/2">
          <X className="w-5 h-5 text-[#242424]" />
        </button>
      </div>
    </div>
  );
}

function FunnelStep1({ setStep }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col lg:flex-row min-h-[70vh]">

      {/* Left Form Side */}
      <div className="w-full lg:w-[45%] bg-[#FAFAF8] p-8 md:p-16 flex flex-col justify-center">
        <div className="max-w-[400px] mx-auto w-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-[#Bff438] rounded-full p-1"><Check className="w-4 h-4 text-[#067A46]" /></div>
          </div>
          <h3 className="text-[18px] font-[800] text-[#067A46] mb-2">Good news!</h3>
          <h2 className={cx(TYPO.h2, "mb-10 text-[#067A46]")}>We deliver to your area!</h2>

          <div className="relative mb-6">
            <label className="absolute -top-2.5 left-3 bg-[#FAFAF8] px-1 text-[12px] font-[700] text-[#067A46]">Enter zip code</label>
            <div className="border-[1.5px] border-[#067A46] rounded-[4px] px-4 py-4 flex items-center justify-between bg-white">
              <input type="text" value="90010" readOnly className="outline-none text-[16px] font-[500] text-[#242424] w-full" />
              <Check className="w-5 h-5 text-[#067A46]" />
            </div>
          </div>

          <PrimaryButton onClick={() => setStep(1)} fullWidth>Continue</PrimaryButton>
        </div>
      </div>

      {/* Right Image Side (Green Box with Logo as seen in screenshot) */}
      <div className="w-full lg:w-[55%] p-4 lg:p-8 flex items-center justify-center bg-[#FAFAF8]">
        <div className="w-full h-full min-h-[400px] bg-[#067A46] rounded-[24px] flex items-center justify-center shadow-sm">
          <Logo className="w-[80px] h-[80px] text-white fill-white" />
        </div>
      </div>

    </motion.div>
  );
}

function FunnelStep2({ setStep }) {
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col lg:flex-row min-h-[70vh]">

      {/* Left Form Side */}
      <div className="w-full lg:w-[45%] bg-[#FAFAF8] p-8 md:p-16 flex flex-col justify-center">
        <div className="max-w-[450px] mx-auto w-full">

          <h2 className={cx(TYPO.h2, "mb-4")}>How many people are you cooking for?</h2>
          <p className={cx(TYPO.body, "mb-12 text-[#242424]")}>Just tell us who's hungry and we'll handle the portions.</p>

          <div className="space-y-8 mb-16">
            {/* Adult Counter */}
            <div className="flex items-center justify-between">
              <span className="text-[18px] font-[500] text-[#242424]">Number of adults</span>
              <div className="flex items-center border-[1.5px] border-[#c0c0c0] rounded-[6px] overflow-hidden bg-white">
                <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 border-r border-[#c0c0c0]"><Minus className="w-5 h-5 text-[#707070]" /></button>
                <span className="w-12 h-12 flex items-center justify-center font-[800] text-[18px] text-[#242424]">{adults}</span>
                <button onClick={() => setAdults(adults + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 border-l border-[#c0c0c0]"><Plus className="w-5 h-5 text-[#707070]" /></button>
              </div>
            </div>

            {/* Kids Counter */}
            <div className="flex items-center justify-between">
              <span className="text-[18px] font-[500] text-[#242424]">Number of kids</span>
              <div className="flex items-center border-[1.5px] border-[#c0c0c0] rounded-[6px] overflow-hidden bg-white">
                <button onClick={() => setKids(Math.max(0, kids - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 border-r border-[#c0c0c0]"><Minus className="w-5 h-5 text-[#707070]" /></button>
                <span className="w-12 h-12 flex items-center justify-center font-[800] text-[18px] text-[#242424]">{kids}</span>
                <button onClick={() => setKids(kids + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 border-l border-[#c0c0c0]"><Plus className="w-5 h-5 text-[#707070]" /></button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <OutlineButton onClick={() => setStep(0)} className="px-6"><ChevronLeft className="w-6 h-6" /> Back</OutlineButton>
            <PrimaryButton onClick={() => setStep(2)} fullWidth>Continue</PrimaryButton>
          </div>
        </div>
      </div>

      {/* Right Image Side (Lifestyle cooking image matching screenshot) */}
      <div className="w-full lg:w-[55%] p-4 lg:p-8 flex items-center justify-center bg-[#FAFAF8]">
        <div className="w-full h-full min-h-[400px] rounded-[24px] overflow-hidden shadow-sm relative">
          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200"
            className="w-full h-full object-cover"
          />
          {/* Simulate the green box in the photo */}
          <div className="absolute bottom-10 right-10 bg-[#067A46] w-[140px] h-[100px] rounded-[4px] shadow-2xl flex items-center justify-center rotate-3 border-r-8 border-[#04502e]">
            <Logo className="text-white fill-white scale-75" />
          </div>
        </div>
      </div>

    </motion.div>
  );
}

function FunnelStep3({ setRoute }) {
  // Mocking the preferences step to complete the visual flow
  const prefs = [
    { title: "Meat & Veggies", icon: Globe },
    { title: "Veggie", icon: Leaf },
    { title: "Family Friendly", icon: Star },
    { title: "Fit & Wholesome", icon: CheckCircle }
  ];
  const [selected, setSelected] = useState([0]);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#FAFAF8] min-h-[70vh] py-16 px-4">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className={cx(TYPO.h2, "mb-4")}>Personalise your plan</h2>
        <p className={cx(TYPO.body, "mb-12 text-[#242424]")}>Choose your preferences so we can recommend the perfect recipes.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {prefs.map((p, i) => {
            const active = selected.includes(i);
            return (
              <div
                key={i}
                onClick={() => active ? setSelected(selected.filter(x => x !== i)) : setSelected([...selected, i])}
                className={cx(
                  "bg-white border-2 rounded-[6px] p-6 flex flex-col items-center gap-4 cursor-pointer transition-colors shadow-sm",
                  active ? "border-[#067A46] bg-[#f4f8f4]" : "border-gray-200 hover:border-gray-400"
                )}
              >
                <p.icon className={cx("w-10 h-10", active ? "text-[#067A46]" : "text-[#707070]")} />
                <span className={cx("font-[700] text-[15px]", active ? "text-[#067A46]" : "text-[#242424]")}>{p.title}</span>
              </div>
            )
          })}
        </div>

        <p className="text-[12px] font-[600] text-[#707070] uppercase tracking-wider mb-6">Final Step: Checkout simulated</p>
        <PrimaryButton onClick={() => setRoute('home')} className="px-16 mx-auto">Complete Signup</PrimaryButton>
      </div>
    </motion.div>
  )
}

function FunnelRoot({ setRoute }) {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <FunnelProgress step={step} />

      <AnimatePresence mode="wait">
        {step === 0 && <FunnelStep1 key="s1" setStep={setStep} />}
        {step === 1 && <FunnelStep2 key="s2" setStep={setStep} />}
        {step === 2 && <FunnelStep3 key="s3" setRoute={setRoute} />}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// APP ENTRY POINT + ROUTER
// ============================================================================

export default function App() {
  const [route, setRoute] = useState('home'); // 'home', 'funnel'

  useEffect(() => { window.scrollTo(0, 0); }, [route]);

  return (
    <div className="min-h-screen font-sans antialiased bg-[#FAFAF8] selection:bg-[#067A46] selection:text-white">
      <Header currentRoute={route} setRoute={setRoute} />

      <AnimatePresence mode="wait">
        {route === 'home' && (
          <motion.main key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomeHero setRoute={setRoute} />
            <RecipeCarousel setRoute={setRoute} />
            <DarkReviews />
            <HomeBottomCTA setRoute={setRoute} />
            <Footer />
          </motion.main>
        )}

        {route === 'funnel' && (
          <motion.main key="funnel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FunnelRoot setRoute={setRoute} />
            {/* Note: HF funnel hides top nav links and main footer, only shows very simple legal links */}
            <div className="bg-[#FAFAF8] text-center border-t border-gray-200 py-6 text-[12px] font-[500] text-gray-500">
              <p>By continuing you agree to our Terms and Conditions.</p>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

    </div>
  );
}

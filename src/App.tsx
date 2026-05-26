import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowUpRight, 
  Search, 
  Sparkles, 
  Globe, 
  Compass, 
  ArrowLeft, 
  Terminal, 
  Check, 
  MessageSquareCode,
  Snowflake,
  Shield,
  Layers,
  Sparkle,
  Mail,
  Phone,
  ChevronDown,
  ArrowRight
} from "lucide-react";


const PRODUCTS = [
  {
    id: "01",
    name: "Polaris Cryo-Thermal Suit",
    tag: "TAILOR",
    image: "https://res.cloudinary.com/dnp2iuquh/image/upload/v1779611633/Gemini_Generated_Image_hdvvsehdvvsehdvv-removebg-preview_pemtdb.png",
    spec: "SPEC-09 // v1.1",
    price: "$580",
    desc: "Technical high-altitude utility jacket with advanced thermal-lined fabric, ideal for extreme environment protection and streamlined movement.",
    detail: "Formulated with ultra-bulky crinkled high-density membranes that create air-insulation buffers. Engineered with modular memory-folds and adaptive thermal properties designed for the extreme cold.",
    icon: Snowflake,
    iconColor: "text-blue-400"
  },
  {
    id: "02",
    name: "Nomad Tailored Suit",
    tag: "SUIT",
    image: "https://res.cloudinary.com/dnp2iuquh/image/upload/v1779611665/Gemini_Generated_Image_nur3h3nur3h3nur3-removebg-preview_xxrgli.png",
    spec: "SPEC-14 // v2.0",
    price: "$490",
    desc: "Sophisticated charcoal tailored suit jacket with structured shoulders, optimized for a sleek and modern professional silhouette.",
    detail: "A speculative synthesis of classic tailoring and tactical ergonomics. Completed with a high-neck white undershirt block, fluid knee pleats, and technical lightweight fabrics.",
    icon: Shield,
    iconColor: "text-amber-500"
  },
  {
    id: "03",
    name: "Polaris Cryo-Thermal Suit",
    tag: "PUFFER",
    image: "https://res.cloudinary.com/dnp2iuquh/image/upload/v1779611679/Gemini_Generated_Image_lj1iyplj1iyplj1i-removebg-preview_1_rzmm2f.png",
    spec: "SPEC-22 // v3.4",
    price: "$345",
    desc: "Heavyweight quilted puffer jacket in a deep bronze, paired with earth-tone tactical trousers for enhanced insulation and utility.",
    detail: "Formulated with ultra-bulky crinkled high-density membranes that create air-insulation buffers. Engineered with modular memory-folds and adaptive thermal properties designed for the extreme cold.",
    icon: Sparkle,
    iconColor: "text-purple-400"
  },
  {
    id: "04",
    name: "Aether Sculpt Hoodie",
    tag: "HOOD",
    image: "https://res.cloudinary.com/dnp2iuquh/image/upload/v1779611614/Gemini_Generated_Image_f8vdirf8vdirf8vd-removebg-preview_ia80ac.png",
    spec: "SPEC-04 // v1.0",
    price: "$240",
    desc: "An architectural, sculptural pullover designed with futuristic fluid draping, defining a sleek, avant-garde silhouette for the modern frontier.",
    detail: "Constructed from heavy-weight, high-density cotton membrane. Features precision engineered structural geometric panelling and an adaptive, high-volume hood for maximum presence.",
    icon: Layers,
    iconColor: "text-neutral-400"
  }
];

// Inline highly precise custom-drawn SVG for the Polaris logo
// Sweeping white crescent and North Star dot
const PolarisLogo = () => (
  <svg 
    className="w-5 h-5 text-white transition-transform duration-500 hover:rotate-45" 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    id="polaris-nav-logo-svg"
  >
    {/* Clean sweeping orbit curve */}
    <path 
      d="M 28 42 C 28 65, 45 80, 68 76 C 78 74, 82 64, 80 54" 
      stroke="white" 
      strokeWidth="8" 
      strokeLinecap="round" 
    />
    {/* Inner polaris/north star circle */}
    <circle cx="58" cy="40" r="10" fill="white" />
  </svg>
);

// Mute sound effects or simulated explore results data
const RESEARCH_PRESETS = [
  {
    topic: "Solar Sail Navigation in Deep Space",
    summary: "Utilizing photon radiation momentum from stars to propel spacecraft without fuel. Key challenges include sail material durability, attitude control, and thermal radiation degradation over multi-decade celestial transits.",
    nodes: ["Kinetic Propulsion", "Radiation Pressure", "Materials Engineering"],
    sources: ["NASA Jet Propulsion Laboratory", "The Planetary Society", "Journal of Spacecraft & Rockets"]
  },
  {
    topic: "Neural Projections in Human Vision",
    summary: "Exploratory trace of visual signal propagation from retinal photoreceptors through the optic chiasm into the lateral geniculate nucleus (LGN), concluding in the primary visual cortex (V1) for spatial feature encoding.",
    nodes: ["Photoreception", "LGN Pathway", "V1 Spatial Encoding"],
    sources: ["Nature Neuroscience", "The Visual Neuroscience Library", "Max Planck Institute"]
  },
  {
    topic: "The Architecture of Minimalist Interfaces",
    summary: "The philosophy of clarity through reduction. By utilizing intentional spacing, unified typographical weight, and structural honesty, interfaces serve as frictionless portals for user intention rather than demanding focus.",
    nodes: ["Frictionless Design", "Negative Space Theory", "Typographical Hierarchy"],
    sources: ["Deiter Rams Principles", "Polaris UI Lab Notes", "UX Design Association Quarterly"]
  }
];

const BoomerangVideo = ({ 
  src, 
  children, 
  autoPlay = true, 
  muted = true, 
  playsInline = true, 
  className,
  id,
  ...props 
}: any) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isRewinding = false;
    let rewindStartTime = 0;
    let startCurrentTime = 0;
    let animationFrameId: number;

    const loop = (now: number) => {
      if (!video) return;

      if (isRewinding) {
        const elapsed = (now - rewindStartTime) / 1000;
        const reverseSpeedMultiplier = 1.05; 
        const targetTime = startCurrentTime - elapsed * reverseSpeedMultiplier;

        if (isNaN(targetTime) || targetTime <= 0.05) {
          isRewinding = false;
          video.currentTime = 0;
          video.play().catch(() => {});
        } else if (!video.seeking) {
          video.currentTime = targetTime;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    const handleEnded = () => {
      if (isRewinding) return;
      const duration = video.duration;
      if (isNaN(duration) || !isFinite(duration) || duration <= 0) {
        video.currentTime = 0;
        video.play().catch(() => {});
        return;
      }
      isRewinding = true;
      video.pause();
      startCurrentTime = duration;
      rewindStartTime = performance.now();
    };

    const handleTimeUpdate = () => {
      const duration = video.duration;
      if (!isRewinding && duration && !isNaN(duration) && isFinite(duration) && video.currentTime >= duration - 0.08) {
        handleEnded();
      }
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);
    animationFrameId = requestAnimationFrame(loop);

    if (autoPlay) {
      video.play().catch(() => {});
    }

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay={autoPlay}
      muted={muted}
      playsInline={playsInline}
      className={className}
      id={id}
      loop={false}
      {...props}
    >
      {children}
    </video>
  );
};

export default function App() {
  const [isExploring, setIsExploring] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [researchState, setResearchState] = useState<"idle" | "searching" | "synthesizing" | "completed">("idle");
  const [activePresetResult, setActivePresetResult] = useState<typeof RESEARCH_PRESETS[0] | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(() => {
    const defaultIndex = PRODUCTS.findIndex(p => p.name === "Bronze Puffer Suit");
    return defaultIndex !== -1 ? defaultIndex : 0;
  });

  const [formState, setFormState] = useState({ name: "", email: "", industry: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: false, email: false });

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isNameEmpty = !formState.name.trim();
    const isEmailEmpty = !formState.email.trim() || !formState.email.includes("@");
    
    setFormErrors({
      name: isNameEmpty,
      email: isEmailEmpty
    });

    if (isNameEmpty || isEmailEmpty) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitSuccess(true);
    }, 1200);
  };


  const steps = [
    "Formulating research parameters...",
    "Scanning peer-reviewed scientific journals...",
    "Correlating data sources in real-time...",
    "Synthesizing visual clarity timeline..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (researchState === "searching") {
      setActiveStepIndex(0);
      interval = setInterval(() => {
        setActiveStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setResearchState("completed");
            return prev;
          }
        });
      }, 950);
    }
    return () => clearInterval(interval);
  }, [researchState]);

  const triggerPresetSearch = (preset: typeof RESEARCH_PRESETS[0]) => {
    setActivePresetResult(preset);
    setSearchQuery(preset.topic);
    setResearchState("searching");
  };

  const handleCustomSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Build custom dynamic result on the fly matching user input
    const customResult = {
      topic: searchQuery,
      summary: `Exploring context around "${searchQuery}". This indicates an inquiry into specialized intelligence networks. Our knowledge nodes are currently synthesizing direct factual links, cross-referencing reliable digital logs, and generating semantic hierarchies.`,
      nodes: ["Specialized Inquiry", "Semantic Synthesis", "Factual Grounding"],
      sources: ["Global Digital Archive", "Real-Time Knowledge Broker", "Polaris Retrieval Model"]
    };
    
    setActivePresetResult(customResult);
    setResearchState("searching");
  };

  return (
    <div 
      className="relative w-full h-screen bg-black text-white flex flex-col items-center selection:bg-neutral-800 overflow-y-auto overflow-x-hidden scroll-smooth"
      id="polaris-viewport-wrapper"
    >
      {/* Immersive background looping character video */}
      <BoomerangVideo
        src="https://res.cloudinary.com/dnp2iuquh/video/upload/v1779525995/Character_qkarnb-ezremove_jxsa8r.mp4"
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-80"
        id="polaris-bg-video"
      />

      {/* Background ambient lighting - Ultra-subtle visual depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" id="bg-spotlights">
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neutral-900/10 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute bottom-10 left-[50%] -translate-x-1/2 w-[80%] h-[150px] bg-neutral-900/5 rounded-full blur-[120px]" />
      </div>

      {/* Floating Header Nav Pill */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 right-4 sm:right-8 z-50"
        id="polaris-nav-container"
      >
        <div className="flex items-center justify-between gap-1 sm:gap-2 px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-xs sm:text-[13px] font-normal text-neutral-400">
          <a 
            href="#home" 
            onClick={(e) => handleScrollToSection(e, "home")}
            className="hover:text-white hover:bg-white/10 transition-all duration-300 py-1 px-2.5 rounded-full cursor-pointer"
          >
            Home
          </a>
          <a 
            href="#clothes" 
            onClick={(e) => handleScrollToSection(e, "clothes")}
            className="hover:text-white hover:bg-white/10 transition-all duration-300 py-1 px-2.5 rounded-full cursor-pointer"
          >
            Clothes
          </a>
          
          <div className="flex items-center justify-center p-1 cursor-pointer transition-transform duration-300 hover:scale-110" id="polaris-logo-anchor">
            <PolarisLogo />
          </div>

          <a 
            href="#about" 
            onClick={(e) => handleScrollToSection(e, "about")}
            className="hover:text-white hover:bg-white/10 transition-all duration-300 py-1 px-2.5 rounded-full cursor-pointer"
          >
            About
          </a>

          <a 
            href="#contact" 
            onClick={(e) => handleScrollToSection(e, "contact")}
            className="hover:text-white hover:bg-white/10 transition-all duration-300 py-1 px-2.5 rounded-full cursor-pointer"
          >
            Contact
          </a>
        </div>
      </motion.header>

      {/* Home Section Wrapper */}
      <div id="home" className="relative w-full min-h-screen flex flex-col justify-between items-center z-20">
        {/* Main Core Layout Grid */}
        <main 
          className={`w-full ${isExploring ? "max-w-[540px] pt-36 pb-12 justify-center" : "max-w-[95%] sm:max-w-6xl px-4 sm:px-12 md:px-16 pt-36 pb-6 sm:pb-8 justify-end self-start mr-auto"} flex flex-col flex-grow relative transition-all duration-500`}
          id="polaris-main-content"
        >
        <AnimatePresence mode="wait">
          {!isExploring ? (
             <motion.div
              key="hero-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start w-full h-full gap-6 mt-16 sm:mt-24 md:mt-32"
              id="hero-initial-block"
            >
              {/* Headings Column */}
              <div className="space-y-1.5 text-left" id="hero-headings">
                <motion.h1 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[44px] md:text-[52px] font-holtwood font-normal tracking-tight text-white leading-none"
                  id="polaris-brand-title"
                >
                  Polaris
                </motion.h1>
                <motion.h2 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[44px] md:text-[52px] font-holtwood font-normal tracking-tight text-neutral-100 leading-none"
                  id="polaris-brand-subtitle"
                >
                  Navigate Your Style.
                </motion.h2>
                <motion.p
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="font-aldrich text-sm md:text-base text-neutral-200 leading-relaxed font-light tracking-wide max-w-md mt-4 text-shadow-sm"
                  id="polaris-brand-desc"
                >
                  Much like the North Star, Polaris is your ultimate style compass. Discover curated, avant-garde fashion designed to help you stand out and find your own direction.
                </motion.p>

                {/* Start Exploring Button & Hover Glow */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-6"
                  id="hero-button-block"
                >
                  <button
                    onClick={() => {
                      setIsExploring(true);
                      setResearchState("idle");
                    }}
                    className="relative group px-6 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[13px] md:text-sm font-normal text-white hover:border-white/35 hover:bg-white/20 active:scale-98 transition-all duration-300 shadow-lg shadow-black/40 overflow-hidden"
                    id="polaris-btn-start-exploring"
                  >
                    <span className="font-aldrich relative z-10 flex items-center gap-2">
                      Start Exploring
                      <Sparkles className="w-3.5 h-3.5 text-white/80 group-hover:text-white transition-colors duration-300" />
                    </span>
                    <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-white/10 to-transparent transition-transform duration-500 pointer-events-none" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* Interactive Exploration Console Sheet */
            <motion.div
              key="explorer-active-state"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
              id="explorer-console-block"
            >
              {/* Back button */}
              <button
                onClick={() => {
                  setIsExploring(false);
                  setSearchQuery("");
                  setResearchState("idle");
                  setActivePresetResult(null);
                }}
                className="flex items-center gap-1.5 text-neutral-500 hover:text-white transition-colors duration-200 text-xs py-1"
                id="btn-back-to-home"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to overview
              </button>

              <div className="space-y-2">
                <h3 className="text-xl font-normal tracking-tight text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-neutral-400" />
                  Explore Deeper
                </h3>
                <p className="text-xs text-neutral-500 leading-normal">
                  Type custom searches or select a curated knowledge node to test Polaris's real-time synthesis engine.
                </p>
              </div>

              {/* Inquiry Input Bar */}
              <form 
                onSubmit={handleCustomSearchSubmit}
                className="relative flex items-center w-full"
                id="inquiry-form"
              >
                <input
                  type="text"
                  placeholder="Ask a deep question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-850 px-4 py-3 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700 transition-all duration-200"
                />
                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="absolute right-2 px-3 py-1.5 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-semibold disabled:opacity-30 disabled:hover:bg-white transition-all duration-200 flex items-center gap-1"
                >
                  <Search className="w-3 h-3" />
                  Explore
                </button>
              </form>

              {/* Curated Nodes Lists */}
              {researchState === "idle" && (
                <div className="space-y-3" id="nodes-selector">
                  <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-widest block">
                    Curated Explorer Nodes
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {RESEARCH_PRESETS.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => triggerPresetSearch(preset)}
                        className="w-full border border-neutral-900 bg-neutral-950/40 p-3.5 rounded-xl text-left hover:bg-neutral-950 hover:border-neutral-800 transition-all duration-300 group"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                            {preset.topic}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </div>
                        <div className="flex gap-1.5 flex-wrap mt-2">
                          {preset.nodes.map((node, i) => (
                            <span key={i} className="text-[10px] text-neutral-500 bg-neutral-900/50 border border-neutral-900/60 px-2 py-0.5 rounded-full">
                              {node}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Research States Animator Output */}
              {researchState === "searching" && (
                <div className="border border-neutral-900 bg-neutral-950/30 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[220px] space-y-4" id="research-searching-block">
                  <div className="relative flex items-center justify-center">
                    {/* Ring loader */}
                    <div className="w-12 h-12 border-2 border-neutral-900 rounded-full" />
                    <div className="absolute w-12 h-12 border-t-2 border-white rounded-full animate-spin" />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-sm font-medium text-white">{steps[activeStepIndex]}</p>
                    <p className="text-xs text-neutral-500">Retrieving intelligence pathways...</p>
                  </div>
                </div>
              )}

              {/* Finished Synthesis Display */}
              {researchState === "completed" && activePresetResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-neutral-900 bg-neutral-950/80 rounded-2xl p-6 space-y-5"
                  id="research-completed-block"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-semibold text-white uppercase tracking-wider bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                        Polaris Insight
                      </span>
                      <h4 className="text-base font-medium text-white mt-2">
                        {activePresetResult.topic}
                      </h4>
                    </div>
                    {/* Tiny Check indicator */}
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  <p className="text-sm text-neutral-300 leading-relaxed font-light">
                    {activePresetResult.summary}
                  </p>

                  <div className="border-t border-neutral-900/80 pt-4 space-y-3">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] text-neutral-500 uppercase tracking-widest">
                        Validated Context Nodes
                      </span>
                      <div className="flex gap-2 flex-wrap">
                        {activePresetResult.nodes.map((node, i) => (
                          <span key={i} className="text-xs text-white bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-850">
                            {node}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 pt-1">
                      <span className="text-[11px] text-neutral-500 uppercase tracking-widest">
                        Trusted Citations
                      </span>
                      <div className="flex flex-col gap-1">
                        {activePresetResult.sources.map((src, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-neutral-400">
                            <div className="w-1 h-1 rounded-full bg-neutral-500" />
                            <span>{src}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setResearchState("idle")}
                      className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-medium text-white transition-colors"
                    >
                      Search Another Topic
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
         </AnimatePresence>
      </main>
    </div>

      {/* Clothes Section */}
      <section 
        id="clothes" 
        className="relative z-30 w-full bg-[#425873] py-24 sm:py-32 px-4 sm:px-8 md:px-12"
      >
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 bg-[#425873]">
          
          {/* Header Content */}
          <div className="space-y-4 max-w-2xl text-left">
            <span className="font-aldrich text-[10px] sm:text-xs font-semibold text-slate-300/90 tracking-widest uppercase block">
              Speculative Collection
            </span>
            <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-white leading-tight font-normal">
              Best Product
            </h2>
            <span className="font-aldrich text-slate-100 text-xs sm:text-sm md:text-base font-light leading-relaxed block">
              Every garment in the Polaris collection signifies an intersection of architectural form and tactile resilience. Engineered with modular memory-folds, hydrophobic shielding, and adaptive thermal channels, our apparel is built to synchronize with the human frame in transit.
            </span>
          </div>

          {/* Interactive Accordion Layout */}
          <div className="flex flex-col lg:flex-row gap-5 items-stretch min-h-[520px] w-full bg-[#425873]" id="products-accordion-root">
            {PRODUCTS.map((prod, index) => {
              const isActive = index === activeProductIndex;
              const IconComponent = prod.icon;
              
              return (
                <div
                  key={prod.id}
                  onClick={() => setActiveProductIndex(index)}
                  onMouseEnter={() => setActiveProductIndex(index)}
                  className={`group relative overflow-hidden rounded-[26px] border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none cursor-pointer flex flex-col justify-between backdrop-blur-md
                    ${isActive 
                      ? "lg:flex-[3.2] flex-[2.2] bg-black/25 border-white/20 shadow-2xl shadow-black/10" 
                      : "lg:flex-[0.7] flex-[0.8] bg-transparent border-white/10 hover:bg-black/10 hover:border-white/15"
                    }
                    h-[380px] lg:h-[520px] w-full`}
                >
                  {/* ID / Tag at top */}
                  <div className="p-5 flex justify-between items-center relative z-10 w-full">
                    <span className="text-[10px] font-mono text-slate-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5">
                      {prod.id} / {prod.tag}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-mono text-slate-300/80">
                        {prod.spec}
                      </span>
                    )}
                  </div>

                  {/* Center Image */}
                  <div className="absolute inset-x-4 top-14 bottom-16 flex items-center justify-center pointer-events-none">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className={`max-h-[82%] max-w-[90%] object-contain transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                        ${isActive 
                          ? "scale-105 -translate-y-2 filter drop-shadow-[0_20px_40px_rgba(255,255,255,0.06)]" 
                          : "scale-85 group-hover:scale-90 saturate-[0.85]"
                        }`}
                    />
                  </div>

                  {/* Dark shading mask */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none z-0" />
                  )}

                  {/* Bottom Text and Icon Badge */}
                  <div className="p-5 relative z-10 w-full flex flex-col justify-end">
                    
                    <div className="w-full flex items-center justify-between gap-4">
                      
                      {/* Left Block description content when Active */}
                      {isActive ? (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="flex-1 text-left pr-2"
                        >
                          <h3 className="text-lg font-medium text-white tracking-tight leading-tight">
                            {prod.name}
                          </h3>
                          <p className="font-aldrich text-[11px] text-slate-300 font-light mt-1 max-w-sm sm:max-w-md leading-relaxed hidden sm:block">
                            {prod.desc}
                          </p>
                          <p className="font-aldrich text-[11px] text-slate-200/90 font-light mt-1.5 max-w-sm sm:max-w-md leading-relaxed">
                            {prod.detail}
                          </p>
                          
                          <div className="flex items-center gap-2.5 mt-3">
                            <span className="text-sm font-semibold text-white tracking-tight">
                              {prod.price}
                            </span>
                            <span className="text-[9px] text-slate-400 font-mono tracking-wider uppercase">
                              Speculative Series
                            </span>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="lg:hidden block flex-1 text-left">
                          <h3 className="text-sm font-medium text-slate-100 leading-tight">
                            {prod.name}
                          </h3>
                        </div>
                      )}

                      {/* Beautiful rounded badge icon alignment */}
                      <div 
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300
                          ${isActive 
                            ? "bg-white border-white text-black shadow-lg" 
                            : "bg-black/30 border-white/10 text-slate-300 group-hover:text-white"
                          }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* About Us Section */}
      <section 
        id="about" 
        className="relative z-30 w-full bg-[#425873] py-20 sm:py-28 px-4 sm:px-8 md:px-12"
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 bg-[#425873]">
          
          {/* Card on the Left */}
          <div className="w-full lg:max-w-2xl xl:max-w-3xl flex-1 flex flex-col">
            <div className="border border-white/10 rounded-[22px] p-6 sm:p-8 md:p-10 bg-black/25 backdrop-blur-md flex flex-col space-y-6 sm:space-y-8">
              
              {/* Header Content */}
              <div className="space-y-4">
                <h2 className="font-holtwood font-normal text-3xl sm:text-4xl md:text-5xl text-white leading-[1.12] tracking-tight" id="about-us-title">
                  Polaris Fashion<br />Studio.
                </h2>
                <p className="text-slate-200 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl" id="about-us-text">
                  A speculative apparel experiment where high-fashion silhouettes meet technical physical engineering. We construct garments designed for the modern frontier—utilizing advanced functional textiles, generative draping patterns, and responsive ergonomics designed to adapt with your environment.
                </p>
              </div>

              {/* Subtle Divider */}
              <div className="w-full border-t border-white/10" />

              {/* Statistics Row (Tightened up and moved up) */}
              <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-2" id="about-us-stats">
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
                    12+
                  </h3>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-300 tracking-wider block uppercase">
                    Awards Won
                  </span>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
                    40B+
                  </h3>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-300 tracking-wider block uppercase">
                    Params Fine-Tuned
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Model Video on the Right (Outside the Card, Perfectly Level and Aligned) */}
          <div className="w-full lg:max-w-[330px] xl:max-w-[360px] flex-1">
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-none mx-auto lg:mx-0">
              <BoomerangVideo 
                src="https://res.cloudinary.com/dnp2iuquh/video/upload/v1779535963/kling_20260523_Image_to_Video__4950_0-ezremove_youdxg.mp4" 
                className="w-full aspect-[2.8/4] object-cover rounded-[22px] border border-white/10 bg-black/25 select-none transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="relative z-30 w-full bg-[#425873] py-24 sm:py-32 px-4 sm:px-8 md:px-12"
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Column - Contact Details */}
          <div className="w-full lg:max-w-xl flex-1 text-left space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] font-aldrich font-semibold text-neutral-400 uppercase tracking-widest block">
                WE'RE HERE TO HELP YOU
              </span>
              <h2 className="font-holtwood text-4xl sm:text-5xl lg:text-[54px] font-normal leading-tight tracking-tight text-white">
                Contact Us
              </h2>
              <p className="font-aldrich text-neutral-400 text-sm sm:text-base font-light leading-relaxed max-w-md pt-2">
                Have a question about our clothing or need assistance with your order? Reach out to our team.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {/* E-mail contact row */}
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 text-white shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-white/70 text-xs block font-medium uppercase tracking-wider">
                    E-mail
                  </span>
                  <a href="mailto:soluvent***@gmail.com" className="text-neutral-100 hover:text-white transition-colors text-sm sm:text-base font-semibold">
                    soluvent***@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone number contact row */}
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 text-white shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-white/70 text-xs block font-medium uppercase tracking-wider">
                    Phone number
                  </span>
                  <a href="tel:+1234567890" className="text-neutral-100 hover:text-white transition-colors text-sm sm:text-base font-semibold">
                    +123 - 456 - 7890
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div className="w-full lg:max-w-[480px] xl:max-w-[500px] flex-1">
            <div className="bg-white/5 backdrop-blur-lg rounded-[32px] p-8 sm:p-10 shadow-2xl border border-white/10 flex flex-col space-y-6">
              
              <AnimatePresence mode="wait">
                {!isSubmitSuccess ? (
                  <motion.form 
                    key="contact-form"
                    onSubmit={handleFormSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5 text-left"
                  >
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="text-neutral-400 text-xs font-semibold tracking-wide block">
                        Name
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="Jane Smith" 
                        value={formState.name}
                        onChange={(e) => {
                          setFormState({ ...formState, name: e.target.value });
                          if (formErrors.name) setFormErrors({ ...formErrors, name: false });
                        }}
                        className={`w-full bg-white/5 backdrop-blur-md border ${formErrors.name ? "border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-white/30 focus:ring-white/20"} px-4 py-3 placeholder-white/40 rounded-xl focus:outline-none focus:ring-2 text-white text-sm transition-all`}
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="text-neutral-400 text-xs font-semibold tracking-wide block">
                        Email
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="jane@frameo.com" 
                        value={formState.email}
                        onChange={(e) => {
                          setFormState({ ...formState, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: false });
                        }}
                        className={`w-full bg-white/5 backdrop-blur-md border ${formErrors.email ? "border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-white/30 focus:ring-white/20"} px-4 py-3 placeholder-white/40 rounded-xl focus:outline-none focus:ring-2 text-white text-sm transition-all`}
                      />
                    </div>

                    {/* Message Input */}
                    <div className="space-y-2">
                      <label className="text-neutral-400 text-xs font-semibold tracking-wide block">
                        Message
                      </label>
                      <textarea 
                        rows={4} 
                        placeholder="Type your message..." 
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full bg-white/5 backdrop-blur-md border border-white/10 focus:border-white/30 px-4 py-3 placeholder-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 text-white text-sm transition-all resize-none"
                      />
                    </div>

                    {/* Premium Button styled after reference image (circle chevron to fully expanded pill with horizontal arrow) */}
                    <div className="pt-4 flex justify-start">
                      <motion.button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="relative group h-14 w-[235px] rounded-full flex items-center justify-start border border-white/10 text-white select-none cursor-pointer overflow-hidden bg-white/5 backdrop-blur-md"
                        whileHover="hover"
                        initial="initial"
                        animate="animate"
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Dynamic underlay expanding from left badge to keyframe visual block fill */}
                        <motion.div 
                          className="absolute rounded-full z-0 bg-white/10 backdrop-blur-sm border border-white/20"
                          variants={{
                            initial: { 
                              width: "44px", 
                              height: "44px", 
                              left: "5px",
                              top: "5px",
                            },
                            hover: { 
                              width: "100%", 
                              height: "100%", 
                              left: "0px",
                              top: "0px",
                              backgroundColor: "#374b63"
                            }
                          }}
                          transition={{ type: "spring", stiffness: 380, damping: 26 }}
                        />

                        {/* Interactive overlay container ensuring alignment */}
                        <div className="relative w-full h-full z-10 flex items-center pointer-events-none">
                          {isSubmitting ? (
                            <div className="w-full flex items-center justify-center">
                              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            </div>
                          ) : (
                            <>
                              {/* Circle container for responsive icon state tracking */}
                              <div className="absolute left-[5px] top-[5px] w-[44px] h-[44px] flex items-center justify-center">
                                <div className="relative w-full h-full flex items-center justify-center">
                                  {/* Unhovered state: Chevron ">" */}
                                  <motion.span 
                                    className="absolute flex items-center justify-center"
                                    variants={{
                                      initial: { opacity: 1, scale: 1 },
                                      hover: { opacity: 0, scale: 0.7 }
                                    }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <svg className="w-4 h-4 text-neutral-200 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                  </motion.span>
                                  
                                  {/* Hovered state: Straight Arrow "->" */}
                                  <motion.span 
                                    className="absolute text-lg font-bold text-white flex items-center justify-center"
                                    variants={{
                                      initial: { opacity: 0, scale: 0.6, x: -6 },
                                      hover: { opacity: 1, scale: 1, x: 0 }
                                    }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    →
                                  </motion.span>
                                </div>
                              </div>

                              {/* Label text moves slightly toward center upon hovering to offset the expansion effect beautifully */}
                              <motion.span 
                                className="absolute left-[49px] right-0 text-center font-extrabold text-[11px] sm:text-xs tracking-[0.14em] text-white"
                                variants={{
                                  initial: { x: 0 },
                                  hover: { x: -8 }
                                }}
                                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                              >
                                GET A SOLUTION
                              </motion.span>
                            </>
                          )}
                        </div>
                      </motion.button>
                    </div>

                    {/* Validation indicator if fields are blank */}
                    {(formErrors.name || formErrors.email) && (
                      <p className="text-red-500 text-xs mt-1 text-left animate-pulse">
                        Please fill in the required name and e-mail fields!
                      </p>
                    )}
                  </motion.form>
                ) : (
                  <motion.div 
                    key="form-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-950/30 border border-green-900/50 text-green-400 flex items-center justify-center shadow-sm">
                      <Check className="w-8 h-8 stroke-[3.5]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-white">Request Received!</h4>
                      <p className="text-sm text-neutral-400 max-w-[280px] leading-relaxed">
                        Thank you, <span className="font-semibold text-neutral-200">{formState.name}</span>! We will analyze your requirements and get back to you shortly.
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsSubmitSuccess(false)}
                      className="text-xs font-semibold text-blue-500 hover:text-blue-400 transition-colors pt-4"
                    >
                      Send another request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

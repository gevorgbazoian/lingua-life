import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LANGUAGES = [
  {
    code: "EN",
    name: "English",
    native: "English",
    flag: "🇬🇧",
    accent: "from-blue-600/20 to-indigo-600/20 border-blue-500/30",
    glow: "rgba(59, 130, 246, 0.15)",
    badge: "Most Demanded",
    desc: "The universal language of global business, tech, aviation, and academia. Accelerate your career globally.",
    stats: { careers: "92%", difficulty: "Easy", students: "2,400+" }
  },
  {
    code: "DE",
    name: "German",
    native: "Deutsch",
    flag: "🇩🇪",
    accent: "from-yellow-600/20 to-red-600/20 border-red-500/30",
    glow: "rgba(220, 38, 38, 0.15)",
    badge: "Engineering & Innovation",
    desc: "Key to Europe's largest economy. Excel in engineering, research, automotive, and international trade.",
    stats: { careers: "85%", difficulty: "Medium", students: "950+" }
  },
  {
    code: "FR",
    name: "French",
    native: "Français",
    flag: "🇫🇷",
    accent: "from-blue-600/20 to-red-600/20 border-blue-400/30",
    glow: "rgba(37, 99, 235, 0.15)",
    badge: "Diplomacy & Luxury",
    desc: "The language of diplomacy, fashion, luxury, gastronomy, and international organizations.",
    stats: { careers: "80%", difficulty: "Medium", students: "780+" }
  },
  {
    code: "ES",
    name: "Spanish",
    native: "Español",
    flag: "🇪🇸",
    accent: "from-red-600/20 to-yellow-500/20 border-yellow-500/30",
    glow: "rgba(234, 179, 8, 0.15)",
    badge: "Global Communication",
    desc: "Second most spoken native language. Connect with vibrant markets across Spain and the Americas.",
    stats: { careers: "78%", difficulty: "Easy", students: "1,100+" }
  },
  {
    code: "RU",
    name: "Russian",
    native: "Русский",
    flag: "🇷🇺",
    accent: "from-indigo-600/20 to-red-600/20 border-gray-400/30",
    glow: "rgba(255, 255, 255, 0.1)",
    badge: "Eurasian Market",
    desc: "Essential for business, diplomacy, and science across Eurasia. Access literature and commerce.",
    stats: { careers: "70%", difficulty: "Hard", students: "1,350+" }
  },
  {
    code: "IT",
    name: "Italian",
    native: "Italiano",
    flag: "🇮🇹",
    accent: "from-green-600/20 to-red-600/20 border-green-500/30",
    glow: "rgba(22, 163, 74, 0.15)",
    badge: "Art & Culture",
    desc: "Immerse in design, arts, music, architecture, and luxury brands. The world's language of romance.",
    stats: { careers: "65%", difficulty: "Medium", students: "450+" }
  }
];

export default function LanguageShowcase() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  cardRefs.current = [];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    let ctx;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Calculate total horizontal scroll width
        const totalScrollWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -totalScrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            invalidateOnRefresh: true,
          }
        });

        // 3D Card Hover Tilts
        cardRefs.current.forEach((card) => {
          if (!card) return;

          const onMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xc = x / rect.width - 0.5;
            const yc = y / rect.height - 0.5;

            gsap.to(card.querySelector(".card-inner"), {
              rotateY: xc * 20,
              rotateX: -yc * 20,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(card.querySelector(".card-glow"), {
              x: xc * 100,
              y: yc * 100,
              duration: 0.3,
              ease: "power2.out"
            });
          };

          const onMouseLeave = () => {
            gsap.to(card.querySelector(".card-inner"), {
              rotateY: 0,
              rotateX: 0,
              duration: 0.6,
              ease: "power3.out"
            });
            gsap.to(card.querySelector(".card-glow"), {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "power3.out"
            });
          };

          card.addEventListener("mousemove", onMouseMove);
          card.addEventListener("mouseleave", onMouseLeave);
        });
      }, wrapper);
    }, 1200);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      id="languages"
      className="relative min-h-screen bg-[#030712] overflow-hidden flex flex-col justify-center"
    >
      {/* Dynamic Background Mesh Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(96,165,250,0.08),rgba(255,255,255,0))]" />

      {/* Header section inside the pinned screen */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-24 pb-8 flex flex-col md:flex-row items-start md:items-end justify-between z-10 select-none">
        <div>
          <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3 font-display">
            Global Programs
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight text-white">
            Choose Your Destination
          </h3>
        </div>
        <p className="text-gray-400 text-sm max-w-sm mt-4 md:mt-0 leading-relaxed font-sans">
          Swipe through our premium interactive programs. Move your mouse over each card to experience depth.
        </p>
      </div>

      {/* Horizontal Cards Container */}
      <div className="flex-1 flex items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-8 px-6 md:px-24 py-10 w-max"
        >
          {LANGUAGES.map((lang, idx) => (
            <div
              key={lang.code}
              ref={addToRefs}
              className="w-[320px] md:w-[420px] h-[520px] shrink-0 perspective-1000"
            >
              {/* Outer Wrapper for 3D */}
              <div
                className={`card-inner w-full h-full glass-card rounded-3xl p-8 border flex flex-col justify-between relative overflow-hidden transition-all duration-300 group bg-gradient-to-br ${lang.accent}`}
                style={{
                  boxShadow: `0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
                }}
              >
                {/* Glowing mesh background that tracks mouse */}
                <div
                  className="card-glow absolute inset-0 rounded-3xl pointer-events-none opacity-40 blur-[40px] mix-blend-screen transition-opacity duration-300 group-hover:opacity-60"
                  style={{
                    background: `radial-gradient(circle at center, ${lang.glow} 0%, transparent 70%)`,
                  }}
                />

                {/* Top Section */}
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold font-display uppercase tracking-widest text-blue-300 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      {lang.badge}
                    </span>
                    <h4 className="text-3xl font-bold font-display mt-4 text-white">
                      {lang.name}
                    </h4>
                    <span className="text-sm font-semibold text-gray-400 font-display mt-1 block">
                      {lang.native}
                    </span>
                  </div>
                  <span className="text-5xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                    {lang.flag}
                  </span>
                </div>

                {/* Description */}
                <p className="relative z-10 text-gray-300 text-sm leading-relaxed font-sans">
                  {lang.desc}
                </p>

                {/* Bottom stats details */}
                <div className="relative z-10 grid grid-cols-3 gap-2 border-t border-white/5 pt-6">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-display block">
                      Employment
                    </span>
                    <span className="text-lg font-bold font-display text-white">
                      {lang.stats.careers}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-display block">
                      Difficulty
                    </span>
                    <span className="text-lg font-bold font-display text-white">
                      {lang.stats.difficulty}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-display block">
                      Students
                    </span>
                    <span className="text-lg font-bold font-display text-white">
                      {lang.stats.students}
                    </span>
                  </div>
                </div>

                {/* Magnetic Hover Button inside Card */}
                <button
                  className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center border border-white/10 hover:border-white transition-all duration-300 shadow-lg relative z-20 group"
                  data-cursor="learn"
                >
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

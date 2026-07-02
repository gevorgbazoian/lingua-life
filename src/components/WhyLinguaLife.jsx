import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Compass, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FRAMES = [
  {
    id: "career",
    title: "Career Growth",
    subtitle: "Ավելի լավ աշխատանք",
    desc: "Multiply your earning potential. 87% of bilingual professionals receive salary increases or better remote job offers in tech, design, and project management.",
    badge: "Careers",
    icon: Briefcase,
    color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
    glow: "rgba(59, 130, 246, 0.2)",
    graphic: {
      type: "offer",
      title: "Job Offer Letter",
      company: "Stripe Inc. London",
      role: "Senior Engineering Manager",
      salary: "£140,000 / year",
      req: "Requirement: Fluent C1 English"
    }
  },
  {
    id: "study",
    title: "Study Abroad",
    subtitle: "Արտասահմանյան համալսարաններ",
    desc: "Pass IELTS, TOEFL, or TestDaF with flying colors. Unlock fully funded master programs and scholarships at Europe's leading tuition-free universities.",
    badge: "Education",
    icon: GraduationCap,
    color: "from-teal-500/20 to-emerald-500/20 border-teal-500/30",
    glow: "rgba(20, 184, 166, 0.2)",
    graphic: {
      type: "admission",
      title: "Letter of Acceptance",
      university: "Technical University of Munich",
      program: "M.Sc. in Computer Science",
      status: "Scholarship Approved: 100%"
    }
  },
  {
    id: "travel",
    title: "Travel Confidence",
    subtitle: "Ազատ շփում և ինտեգրացիա",
    desc: "Erase the language barrier. Explore the world without anxiety, connect with locals on a deeper level, and navigate airports or booking systems like a native.",
    badge: "Exploration",
    icon: Compass,
    color: "from-rose-500/20 to-orange-500/20 border-rose-500/30",
    glow: "rgba(244, 63, 94, 0.2)",
    graphic: {
      type: "passport",
      title: "Boarding Pass",
      from: "EVN Yerevan",
      to: "CDG Paris",
      gate: "A24",
      seat: "12A",
      status: "Ready for departure"
    }
  },
  {
    id: "business",
    title: "International Business",
    subtitle: "Միջազգային կապեր",
    desc: "Scale your business globally. Negotiate with foreign suppliers, build international partnerships, and manage remote teams in Berlin, New York, or Paris.",
    badge: "Scale",
    icon: Globe,
    color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
    glow: "rgba(6, 182, 212, 0.2)",
    graphic: {
      type: "zoom",
      title: "Active Board Meeting",
      participants: [
        { name: "Yerevan HQ (You)", active: true },
        { name: "Berlin office", active: false },
        { name: "New York Hub", active: false }
      ]
    }
  }
];

export default function WhyLinguaLife() {
  const containerRef = useRef(null);
  const textGroupRef = useRef(null);
  const graphicGroupRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Pinning container
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=3500",
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(
          FRAMES.length - 1,
          Math.floor(progress * FRAMES.length)
        );
        setActiveIndex(index);
      }
    });

    // GSAP animations to fade elements in/out
    const slides = textGroupRef.current?.children;
    const graphics = graphicGroupRef.current?.children;

    if (slides && graphics) {
      // Setup initial states
      gsap.set(slides, { opacity: 0, y: 50, display: "none" });
      gsap.set(graphics, { opacity: 0, scale: 0.8, display: "none" });

      // Animate active slide in
      gsap.killTweensOf([slides, graphics]);
      
      gsap.set(slides[activeIndex], { display: "block" });
      gsap.to(slides[activeIndex], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      });

      gsap.set(graphics[activeIndex], { display: "block" });
      gsap.to(graphics[activeIndex], {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.1)"
      });
    }

    return () => {
      scrollTrigger.kill();
    };
  }, [activeIndex]);

  return (
    <section
      ref={containerRef}
      id="why-us"
      className="relative min-h-screen bg-bg-dark flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_120%,rgba(96,165,250,0.05),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Side: Dynamic Pinned Text Content */}
        <div className="flex flex-col justify-center h-[400px]">
          <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3 font-display">
            Why Lingua Life
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight text-white mb-8">
            You don't buy a language.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              You buy a future.
            </span>
          </h3>

          {/* Text slides */}
          <div ref={textGroupRef} className="relative h-[220px]">
            {FRAMES.map((frame, idx) => {
              const Icon = frame.icon;
              return (
                <div key={frame.id} className="absolute inset-0 select-none">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold font-display text-white">
                        {frame.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-sans">
                        {frame.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-md font-sans">
                    {frame.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bullet navigators */}
          <div className="flex items-center gap-2 mt-8">
            {FRAMES.map((frame, idx) => (
              <button
                key={frame.id}
                onClick={() => setActiveIndex(idx)}
                className={`text-xs font-bold font-display uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all duration-300 ${
                  activeIndex === idx
                    ? "bg-white/10 text-white border-white/20"
                    : "bg-transparent text-gray-600 border-transparent hover:text-gray-400"
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Morphing Graphics Panel */}
        <div ref={graphicGroupRef} className="relative h-[400px] flex items-center justify-center">
          {FRAMES.map((frame, idx) => (
            <div
              key={frame.id}
              className={`absolute w-full max-w-[420px] h-[320px] glass-card rounded-3xl p-8 border flex flex-col justify-between bg-gradient-to-br ${frame.color} shadow-2xl overflow-hidden`}
              style={{
                boxShadow: `0 25px 60px -15px ${frame.glow}, inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
              }}
            >
              {/* Graphic Element type based */}
              
              {/* 1. Job Offer Letter Graphic */}
              {frame.graphic.type === "offer" && (
                <div className="flex flex-col h-full justify-between font-sans">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 font-display">
                      OFFER DETAILS
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <div className="my-4">
                    <h5 className="text-xs text-gray-400">Employer</h5>
                    <p className="text-lg font-bold text-white mb-2">{frame.graphic.company}</p>
                    <h5 className="text-xs text-gray-400">Position</h5>
                    <p className="text-sm font-semibold text-white mb-2">{frame.graphic.role}</p>
                    <h5 className="text-xs text-gray-400">Compensation</h5>
                    <p className="text-lg font-bold text-blue-400">{frame.graphic.salary}</p>
                  </div>
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-xs text-gray-500 italic">{frame.graphic.req}</p>
                  </div>
                </div>
              )}

              {/* 2. Acceptance Letter Graphic */}
              {frame.graphic.type === "admission" && (
                <div className="flex flex-col h-full justify-between font-sans">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-teal-400 font-display">
                      ADMISSION REGISTER
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] uppercase font-bold">
                      Verified
                    </span>
                  </div>
                  <div className="my-4">
                    <h5 className="text-xs text-gray-400">Institution</h5>
                    <p className="text-base font-bold text-white mb-2">{frame.graphic.university}</p>
                    <h5 className="text-xs text-gray-400">Selected Program</h5>
                    <p className="text-sm font-semibold text-white mb-2">{frame.graphic.program}</p>
                  </div>
                  <div className="border-t border-white/5 pt-4 bg-emerald-500/5 rounded-lg p-3 border border-emerald-500/10">
                    <p className="text-xs text-emerald-400 font-semibold">{frame.graphic.status}</p>
                  </div>
                </div>
              )}

              {/* 3. Boarding Pass Graphic */}
              {frame.graphic.type === "passport" && (
                <div className="flex flex-col h-full justify-between font-sans">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-rose-400 font-display">
                      BOARDING DETAILS
                    </span>
                    <span className="text-xs">✈️</span>
                  </div>
                  <div className="my-4 flex items-center justify-between border-y border-white/5 py-4">
                    <div>
                      <h5 className="text-[10px] text-gray-500 uppercase tracking-widest">From</h5>
                      <p className="text-xl font-extrabold text-white">{frame.graphic.from.split(" ")[0]}</p>
                      <span className="text-xs text-gray-400">{frame.graphic.from.split(" ")[1]}</span>
                    </div>
                    <div className="w-16 border-t border-dashed border-rose-400/30 relative flex justify-center">
                      <span className="absolute -top-2.5 text-xs">✈️</span>
                    </div>
                    <div className="text-right">
                      <h5 className="text-[10px] text-gray-500 uppercase tracking-widest">To</h5>
                      <p className="text-xl font-extrabold text-white">{frame.graphic.to.split(" ")[0]}</p>
                      <span className="text-xs text-gray-400">{frame.graphic.to.split(" ")[1]}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="text-gray-500">Gate:</span> <span className="text-white font-bold">{frame.graphic.gate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Seat:</span> <span className="text-white font-bold">{frame.graphic.seat}</span>
                    </div>
                    <span className="text-rose-400 font-semibold">{frame.graphic.status}</span>
                  </div>
                </div>
              )}

              {/* 4. Zoom Meeting Graphic */}
              {frame.graphic.type === "zoom" && (
                <div className="flex flex-col h-full justify-between font-sans">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 font-display">
                      GLOBAL CALL
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[9px] uppercase font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                      Live
                    </span>
                  </div>
                  
                  {/* Participant blocks */}
                  <div className="flex flex-col gap-2 flex-1 justify-center">
                    {frame.graphic.participants.map((p, pIdx) => (
                      <div
                        key={p.name}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${
                          p.active
                            ? "bg-blue-500/10 border-blue-500/20"
                            : "bg-white/5 border-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${p.active ? "bg-green-400" : "bg-gray-500"}`} />
                          <span className="text-xs text-white font-medium">{p.name}</span>
                        </div>
                        <span className="text-[9px] uppercase text-gray-400 tracking-wider">
                          {p.active ? "Speaking..." : "Muted"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/5 pt-3 text-center">
                    <span className="text-[10px] text-gray-500">Secure connection, crystal clear communication.</span>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>

      {/* Separator line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

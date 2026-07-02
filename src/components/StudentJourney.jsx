import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { BookOpen, Users, MessageSquare, Award, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_STEPS = [
  {
    id: 1,
    title: "Choose Language",
    subtitle: "Ընտրեք լեզուն",
    desc: "Select English, German, French, Spanish, Russian, or Italian based on your personal aspirations.",
    icon: BookOpen,
    badge: "Step 01"
  },
  {
    id: 2,
    title: "Meet Elite Instructor",
    subtitle: "Ծանոթացեք ուսուցչի հետ",
    desc: "Get paired with an elite tutor specializing in your chosen track (Business, IELTS, Conversational, or Academic).",
    icon: Users,
    badge: "Step 02"
  },
  {
    id: 3,
    title: "Immersive Practice",
    subtitle: "Ակտիվ խոսակցական փորձ",
    desc: "Engage in situational speaking simulations, bypass grammar blocks, and practice in small high-level groups.",
    icon: MessageSquare,
    badge: "Step 03"
  },
  {
    id: 4,
    title: "Get Certified",
    subtitle: "Ստացեք սերտիֆիկատ",
    desc: "Complete your program levels (A1 to C1) and receive a corporate-grade certificate aligned with CEFR standards.",
    icon: Award,
    badge: "Step 04"
  },
  {
    id: 5,
    title: "Achieve Goals",
    subtitle: "Հասեք նպատակներին",
    desc: "Step confidently into international business deals, academic admissions, relocations, or global careers.",
    icon: Rocket,
    badge: "Step 05"
  }
];

export default function StudentJourney() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);
  stepRefs.current = [];

  const addToRefs = (el) => {
    if (el && !stepRefs.current.includes(el)) {
      stepRefs.current.push(el);
    }
  };

  useEffect(() => {
    const line = lineRef.current;
    const container = containerRef.current;
    if (!line || !container) return;

    // Timeline line progress animation
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 40%",
          end: "bottom 60%",
          scrub: true,
        }
      }
    );

    // Timeline nodes activation triggers
    stepRefs.current.forEach((step) => {
      const circle = step.querySelector(".step-circle");
      const icon = step.querySelector(".step-icon");
      const content = step.querySelector(".step-content");

      gsap.fromTo(
        [circle, icon, content],
        { opacity: 0.25, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: step,
            start: "top 50%",
            end: "bottom 50%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });

  }, []);

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative py-24 md:py-36 bg-[#030712] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3 font-display">
            The Roadmap
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight text-white mb-6">
            Student Journey
          </h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed font-sans">
            How we take you from zero confidence to professional mastery of a new language.
          </p>
        </div>

        {/* Timeline representation */}
        <div className="relative">
          
          {/* Vertical central bar (background tracking) */}
          <div className="absolute left-[30px] md:left-1/2 -translate-x-[1px] top-4 bottom-4 w-[2px] bg-white/5" />

          {/* Vertical active filling bar */}
          <div
            ref={lineRef}
            className="absolute left-[30px] md:left-1/2 -translate-x-[1px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500 to-teal-400 origin-top"
          />

          {/* Timeline Steps */}
          <div className="flex flex-col gap-20">
            {JOURNEY_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.id}
                  ref={addToRefs}
                  className={`flex flex-col md:flex-row items-start relative md:justify-between w-full transition-all duration-300 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Space filler for desktop on opposite side */}
                  <div className="hidden md:block w-5/12" />

                  {/* Circle Pin Node */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="step-circle w-[60px] h-[60px] rounded-full bg-bg-dark border border-white/10 flex items-center justify-center transition-all duration-500 shadow-2xl relative group-hover:border-blue-500/50">
                      <div className="absolute inset-1 rounded-full bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Icon className="step-icon w-5 h-5 text-blue-400" />
                    </div>
                  </div>

                  {/* Step Content Box */}
                  <div className="step-content pl-20 md:pl-0 w-full md:w-5/12 pt-2 md:pt-4">
                    <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent shadow-xl">
                      <span className="text-[10px] font-bold font-display uppercase tracking-widest text-blue-400 mb-2 block">
                        {step.badge}
                      </span>
                      <h4 className="text-xl font-bold font-display text-white mb-1">
                        {step.title}
                      </h4>
                      <span className="text-xs text-gray-500 font-sans block mb-3">
                        {step.subtitle}
                      </span>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-sans">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Bottom separating line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

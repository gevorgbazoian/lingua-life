import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { target: 5000, suffix: "+", label: "Students Graduated" },
  { target: 12, suffix: "+", label: "Languages Taught" },
  { target: 10, suffix: " Years", label: "Teaching Excellence" },
  { target: 95, suffix: "%", label: "Success Rate" }
];

export default function Stats() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const counters = container.querySelectorAll(".counter-value");

    counters.forEach((counter) => {
      const targetVal = parseInt(counter.getAttribute("data-target"), 10);
      const obj = { value: 0 };

      gsap.to(obj, {
        value: targetVal,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        onUpdate: () => {
          if (counter) {
            counter.textContent = Math.floor(obj.value).toLocaleString();
          }
        }
      });
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-36 bg-[#030712] overflow-hidden"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[400px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className="glass-card rounded-3xl p-8 border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent flex flex-col justify-center items-center text-center shadow-lg relative group overflow-hidden"
              style={{
                boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.03)"
              }}
            >
              {/* Inner card hovering glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Numerical Value */}
              <div className="flex items-baseline justify-center mb-2">
                <span
                  className="counter-value text-4xl md:text-6xl font-extrabold font-display tracking-tight text-white"
                  style={{ textShadow: "0 0 30px rgba(96, 165, 250, 0.3)" }}
                  data-target={stat.target}
                >
                  0
                </span>
                <span className="text-2xl md:text-3xl font-bold font-display text-blue-400 ml-0.5">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="text-gray-400 text-xs md:text-sm font-medium tracking-wide uppercase font-display max-w-[150px]">
                {stat.label}
              </p>

              {/* Floating index */}
              <span className="absolute top-4 right-4 text-[9px] font-bold text-gray-700 tracking-wider">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Separator line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

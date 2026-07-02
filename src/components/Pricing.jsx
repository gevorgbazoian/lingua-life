import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Check, Users, User, Tv } from "lucide-react";

const PLANS = [
  {
    name: "Elite Group",
    icon: Users,
    price: "$120",
    period: "month",
    desc: "Collaborative learning in high-level micro groups.",
    features: [
      "Max 4-5 students per class",
      "2 live sessions per week (90 mins)",
      "Weekly interactive speaking club",
      "CEFR alignment & certificates",
      "Monthly progress tracking"
    ],
    popular: false,
    color: "from-blue-600/10 to-indigo-600/10 border-white/5",
    accent: "text-blue-400"
  },
  {
    name: "Individual Coach",
    icon: User,
    price: "$320",
    period: "month",
    desc: "1-on-1 fast-track coaching tailored to your industry.",
    features: [
      "1-on-1 private elite tutor",
      "Fully customized syllabus (Business, IT, etc.)",
      "Flexible schedule coordination",
      "24/7 direct tutor feedback channel",
      "Free Mock IELTS / CEFR examinations"
    ],
    popular: true,
    color: "from-teal-600/15 to-blue-600/15 border-teal-500/25",
    accent: "text-teal-400"
  },
  {
    name: "Online Stream",
    icon: Tv,
    price: "$75",
    period: "month",
    desc: "Hybrid live webinars and interactive speaking channels.",
    features: [
      "Unlimited access to speaking clubs",
      "2 streaming webinars per week",
      "Interactive learning app tools",
      "Access to global student channels",
      "Shared resource database library"
    ],
    popular: false,
    color: "from-rose-600/10 to-orange-600/10 border-white/5",
    accent: "text-rose-400"
  }
];

export default function Pricing() {
  const buttonsRef = useRef([]);
  buttonsRef.current = [];

  const addToRefs = (el) => {
    if (el && !buttonsRef.current.includes(el)) {
      buttonsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Attach magnetic effect to each CTA button
    buttonsRef.current.forEach((btn) => {
      if (!btn) return;

      const onMouseMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const onMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      };

      btn.addEventListener("mousemove", onMouseMove);
      btn.addEventListener("mouseleave", onMouseLeave);

      return () => {
        btn.removeEventListener("mousemove", onMouseMove);
        btn.removeEventListener("mouseleave", onMouseLeave);
      };
    });
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="pricing"
      className="relative py-24 md:py-36 bg-[#030712] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 select-none">
          <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3 font-display">
            Investment Plans
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight text-white mb-6">
            Flexible Pricing Plans
          </h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed font-sans">
            Choose the pace and structure that fits your goals. Try any format with a free 1-hour coaching trial.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={`glass-card rounded-3xl p-8 border flex flex-col justify-between relative overflow-hidden transition-all duration-500 shadow-2xl group ${
                  plan.popular ? "md:-translate-y-4" : ""
                } bg-gradient-to-br ${plan.color}`}
                style={{
                  boxShadow: plan.popular
                    ? `0 25px 60px -15px rgba(20, 184, 166, 0.15), inset 0 1px 1px rgba(255,255,255,0.08)`
                    : `0 20px 40px -15px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.04)`
                }}
              >
                {/* Popular Spotlight Glow */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-bl-full blur-xl pointer-events-none" />
                )}

                <div>
                  {/* Top line with Icon and Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${plan.accent}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {plan.popular && (
                      <span className="text-[9px] font-bold tracking-widest font-display text-teal-300 px-3 py-1 bg-teal-500/15 border border-teal-500/30 rounded-full uppercase">
                        Most Immersive
                      </span>
                    )}
                  </div>

                  {/* Plan Name */}
                  <h4 className="text-xl font-bold font-display text-white mb-2">
                    {plan.name}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-400 text-xs leading-relaxed mb-6 font-sans">
                    {plan.desc}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-8 border-b border-white/5 pb-6">
                    <span className="text-4xl md:text-5xl font-extrabold font-display text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs text-gray-500 font-sans">
                      / {plan.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="flex flex-col gap-4 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-xs md:text-sm text-gray-300 font-sans">
                        <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Magnetic Button CTA */}
                <button
                  ref={addToRefs}
                  onClick={() => scrollToSection("booking")}
                  className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest font-display transition-all duration-300 mt-4 relative z-10 border ${
                    plan.popular
                      ? "bg-teal-500 hover:bg-teal-400 text-gray-950 border-teal-400/20 shadow-[0_5px_20px_rgba(20,184,166,0.3)]"
                      : "bg-white/5 hover:bg-white text-white hover:text-black border-white/10 hover:border-white"
                  }`}
                  data-cursor={plan.popular ? "learn" : "explore"}
                >
                  Book Free Trial
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Separator line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

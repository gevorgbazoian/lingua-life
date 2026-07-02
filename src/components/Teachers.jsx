import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mic, Award, GraduationCap } from "lucide-react";

const TEACHERS = [
  {
    id: 1,
    name: "Anna Hovhannisyan",
    role: "English Instructor",
    exp: "8 Years Experience",
    specialty: "IELTS & Business Communication",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    audioLabel: "Listen to Accent (UK)"
  },
  {
    id: 2,
    name: "Sebastian Miller",
    role: "German Instructor",
    exp: "7 Years Experience",
    specialty: "TestDaF & Engineering Terminology",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    audioLabel: "Listen to Accent (Berlin)"
  },
  {
    id: 3,
    name: "Amélie Dupont",
    role: "French Instructor",
    exp: "6 Years Experience",
    specialty: "DELF/DALF & Diplomacy Prep",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    audioLabel: "Listen to Accent (Paris)"
  },
  {
    id: 4,
    name: "Carlos Ruiz",
    role: "Spanish Instructor",
    exp: "9 Years Experience",
    specialty: "DELE & Commercial Negotiations",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    audioLabel: "Listen to Accent (Madrid)"
  }
];

export default function Teachers() {
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xc = x / rect.width - 0.5;
        const yc = y / rect.height - 0.5;

        // Vision Pro floating depth effect
        gsap.to(card, {
          rotateY: xc * 15,
          rotateX: -yc * 15,
          scale: 1.02,
          z: 30, // push out in 3D space
          duration: 0.3,
          ease: "power2.out"
        });

        // Move avatar slightly inside
        gsap.to(card.querySelector(".teacher-avatar"), {
          x: xc * 15,
          y: yc * 15,
          duration: 0.3,
          ease: "power2.out"
        });

        // Move floating info card
        gsap.to(card.querySelector(".teacher-info-float"), {
          x: -xc * 25,
          y: -yc * 25,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          z: 0,
          duration: 0.5,
          ease: "power3.out"
        });
        gsap.to(card.querySelector(".teacher-avatar"), {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.out"
        });
        gsap.to(card.querySelector(".teacher-info-float"), {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.out"
        });
      };

      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);

      return () => {
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseleave", onMouseLeave);
      };
    });
  }, []);

  return (
    <section
      id="teachers"
      className="relative py-24 md:py-36 bg-[#030712] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(96,165,250,0.04),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 select-none">
          <div>
            <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3 font-display">
              Elite Mentors
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight text-white">
              Learn From The Best
            </h3>
          </div>
          <p className="text-gray-400 text-sm max-w-sm mt-4 md:mt-0 leading-relaxed font-sans">
            Our tutors aren't just teachers; they are certified linguists and coaches with extensive careers abroad.
          </p>
        </div>

        {/* Netflix/Grid Style horizontal listing with Apple Vision Pro cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
          {TEACHERS.map((teacher) => (
            <div
              key={teacher.id}
              ref={addToRefs}
              className="h-[480px] rounded-3xl glass-card border border-white/5 relative flex flex-col justify-end p-6 overflow-hidden transform-style-3d cursor-pointer shadow-2xl group"
            >
              {/* Teacher Image Background */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="teacher-avatar w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.7] group-hover:brightness-[0.8]"
                />
                {/* Dark gradient overlay bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/30 to-transparent" />
              </div>

              {/* Floating Specification Card inside (Vision Pro concept) */}
              <div className="teacher-info-float relative z-10 w-full glass-card rounded-2xl p-4 border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] transform-style-3d select-none">
                
                {/* Micro Details */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold tracking-wider text-blue-300 font-display uppercase">
                    {teacher.role}
                  </span>
                  <div className="flex gap-1 text-teal-400">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Name */}
                <h4 className="text-base font-bold font-display text-white mb-1">
                  {teacher.name}
                </h4>

                {/* Experience Label */}
                <span className="text-[10px] font-semibold text-gray-300 font-sans block mb-2">
                  {teacher.exp}
                </span>

                {/* Hover Reveal Block */}
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-3 border-t border-white/5 pt-3 transition-all duration-300 overflow-hidden">
                  <div className="flex items-start gap-1.5 mb-2 text-gray-400">
                    <GraduationCap className="w-3.5 h-3.5 shrink-0 text-blue-400 mt-0.5" />
                    <span className="text-[10px] leading-relaxed font-sans">{teacher.specialty}</span>
                  </div>

                  {/* Listening Accent Button */}
                  <button
                    className="w-full py-1.5 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center gap-1.5 text-[9px] uppercase font-bold tracking-wider transition-colors duration-300"
                    data-cursor="play"
                  >
                    <Mic className="w-3 h-3" />
                    {teacher.audioLabel}
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Separator line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

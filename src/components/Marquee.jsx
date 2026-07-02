const WORDS = [
  "ENGLISH",
  "GERMAN",
  "FRENCH",
  "SPANISH",
  "RUSSIAN",
  "ITALIAN",
  "ENGLISH",
  "GERMAN",
  "FRENCH",
  "SPANISH",
  "RUSSIAN",
  "ITALIAN"
];

export default function Marquee() {
  return (
    <section className="py-12 bg-[#030712] overflow-hidden border-y border-white/5 relative z-10 select-none">
      <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-transparent to-bg-dark z-10 pointer-events-none" />
      
      <div className="marquee-track flex gap-12 items-center">
        {/* Render twice for seamless loop */}
        {WORDS.map((w, idx) => (
          <div key={idx} className="flex items-center gap-12 shrink-0">
            <span
              className={`text-5xl md:text-8xl font-black font-display tracking-wider ${
                idx % 2 === 0
                  ? "text-white glow-text-blue"
                  : "text-stroke"
              }`}
            >
              {w}
            </span>
            <span className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          </div>
        ))}
      </div>
    </section>
  );
}

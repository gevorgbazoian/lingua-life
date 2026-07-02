import { useEffect, useRef } from "react";
import gsap from "gsap";

const GREETINGS = [
  "HELLO",      // English
  "BONJOUR",    // French
  "HOLA",       // Spanish
  "GUTEN TAG",  // German
  "ПРИВЕТ",     // Russian
  "ԲԱՐԵՎ",      // Armenian
  "HELLO"
];

export default function PageLoader({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const textContainerRef = useRef(null);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        if (onComplete) onComplete();
      }
    });

    // Cycle text through greetings
    GREETINGS.forEach((word, idx) => {
      tl.to(textRef.current, {
        duration: 0.18,
        opacity: 1,
        y: 0,
        ease: "power2.out",
        onStart: () => {
          if (textRef.current) {
            textRef.current.textContent = word;
          }
        }
      });
      
      // Short delay between words, except the last one
      if (idx < GREETINGS.length - 1) {
        tl.to(textRef.current, {
          duration: 0.05,
          opacity: 0,
          y: -10,
          ease: "power2.in"
        });
      }
    });

    // Scale up text container as final reveal prepares
    tl.to(textContainerRef.current, {
      scale: 1.2,
      letterSpacing: "12px",
      duration: 0.6,
      ease: "power3.inOut"
    });

    // Slide up/fade loader panel
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut"
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]"
      style={{ touchAction: "none" }}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-blue-500/15 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] h-[20vw] rounded-full bg-teal-500/10 blur-[80px]" />

      <div ref={textContainerRef} className="flex flex-col items-center">
        <h2
          ref={textRef}
          className="text-5xl md:text-8xl font-bold font-display tracking-wider text-white"
          style={{ textShadow: "0 0 20px rgba(96, 165, 250, 0.5)" }}
        >
          HELLO
        </h2>
        <div className="mt-4 w-12 h-[2px] bg-blue-400 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

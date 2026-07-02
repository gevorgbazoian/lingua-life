import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorGlobeRef = useRef(null);
  const [hoverLabel, setHoverLabel] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device is desktop/has cursor
    if (window.matchMedia("(max-width: 1024px)").matches) {
      return;
    }

    setIsVisible(true);
    document.documentElement.classList.add("custom-cursor-active");

    const dot = cursorDotRef.current;
    const globe = cursorGlobeRef.current;

    // Use GSAP quickSetter for ultra-smooth rendering
    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setGlobeX = gsap.quickSetter(globe, "x", "px");
    const setGlobeY = gsap.quickSetter(globe, "y", "px");

    const mouse = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const globePos = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Animation loop for custom physics lag effect
    const ticker = (time, ease) => {
      // Small dot follows mouse closely
      dotPos.x += (mouse.x - dotPos.x) * 0.25;
      dotPos.y += (mouse.y - dotPos.y) * 0.25;
      setDotX(dotPos.x);
      setDotY(dotPos.y);

      // Globe trailing with more lag
      globePos.x += (mouse.x - globePos.x) * 0.1;
      globePos.y += (mouse.y - globePos.y) * 0.1;
      setGlobeX(globePos.x);
      setGlobeY(globePos.y);
    };

    gsap.ticker.add(ticker);

    // Hover listener
    const onMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        const type = target.getAttribute("data-cursor");
        if (type === "explore") {
          setHoverLabel("Explore");
        } else if (type === "learn") {
          setHoverLabel("Start Learning");
        } else if (type === "play") {
          setHoverLabel("Watch Story");
        } else if (type === "submit") {
          setHoverLabel("Book Now");
        } else {
          setHoverLabel(type);
        }
        setIsHovered(true);
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        setIsHovered(false);
        setHoverLabel("");
      }
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      gsap.ticker.remove(ticker);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Tiny Core Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-blue-400 rounded-full z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />

      {/* Trailing Globe */}
      <div
        ref={cursorGlobeRef}
        className={`fixed top-0 left-0 flex items-center justify-center z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isHovered
            ? "w-24 h-24 bg-blue-500/10 border border-blue-400/40 rounded-full backdrop-blur-[2px]"
            : "w-10 h-10 border border-blue-400/20 rounded-full"
        }`}
      >
        {/* Globe Grid lines (SVG) */}
        <svg
          className={`absolute w-full h-full text-blue-400/30 animate-[spin_10s_linear_infinite] transition-opacity duration-300 ${
            isHovered ? "opacity-30 scale-125" : "opacity-100"
          }`}
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <ellipse cx="50" cy="50" rx="48" ry="18" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <ellipse cx="50" cy="50" rx="18" ry="48" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.8" />
          <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="0.8" />
        </svg>

        {/* Hover Label */}
        {isHovered && (
          <span className="text-[10px] uppercase font-bold tracking-widest text-blue-300 text-center select-none px-2 z-10 animate-fade-in">
            {hoverLabel}
          </span>
        )}
      </div>
    </>
  );
}

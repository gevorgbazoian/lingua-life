import { useEffect, useRef, useState } from "react";

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

    const mouse = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const globePos = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Ultra smooth requestAnimationFrame loop (No CSS transition conflicts)
    let frameId;
    const update = () => {
      // Small dot follows mouse closely
      dotPos.x += (mouse.x - dotPos.x) * 0.25;
      dotPos.y += (mouse.y - dotPos.y) * 0.25;
      if (dot) {
        dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;
      }

      // Globe trailing with lag
      globePos.x += (mouse.x - globePos.x) * 0.12;
      globePos.y += (mouse.y - globePos.y) * 0.12;
      if (globe) {
        globe.style.transform = `translate3d(${globePos.x}px, ${globePos.y}px, 0)`;
      }

      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);

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
      cancelAnimationFrame(frameId);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Tiny Core Dot Tracking Wrapper */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
      >
        <div 
          className="w-2.5 h-2.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* Trailing Globe Tracking Wrapper (Direct JS translation, no CSS transitions here) */}
      <div
        ref={cursorGlobeRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
      >
        {/* Inner visual elements (Width/Height CSS transitions here) */}
        <div
          className={`flex items-center justify-center rounded-full border transition-all duration-300 ${
            isHovered
              ? "w-24 h-24 bg-blue-500/10 border-blue-400/40 backdrop-blur-[2px]"
              : "w-10 h-10 border-blue-400/30"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {/* Globe Grid lines (SVG) */}
          <svg
            className={`absolute w-full h-full text-blue-400/40 animate-[spin_10s_linear_infinite] transition-opacity duration-300 ${
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
      </div>
    </>
  );
}

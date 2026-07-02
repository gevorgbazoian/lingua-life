import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Magnetic Button Effect
    const button = buttonRef.current;
    if (button) {
      const onMouseMove = (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      button.addEventListener("mousemove", onMouseMove);
      button.addEventListener("mouseleave", onMouseLeave);

      return () => {
        button.removeEventListener("mousemove", onMouseMove);
        button.removeEventListener("mouseleave", onMouseLeave);
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled
          ? "py-4 bg-bg-dark/75 backdrop-blur-md border-b border-white/5"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center font-bold font-display text-white text-sm shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-transform duration-300">
            LL
          </div>
          <span className="text-xl font-bold font-display tracking-wider text-white bg-gradient-to-r from-white via-white to-blue-400 bg-clip-text text-transparent">
            LINGUA LIFE
          </span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Languages", id: "languages" },
            { label: "Globe", id: "globe" },
            { label: "Journey", id: "journey" },
            { label: "Why Us", id: "why-us" },
            { label: "Team", id: "teachers" },
            { label: "Quiz", id: "quiz" },
            { label: "FAQ", id: "faq" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 relative py-1 group"
              data-cursor="explore"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-blue-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <button
            ref={buttonRef}
            onClick={() => scrollToSection("booking")}
            className="relative px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wider rounded-full shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-shadow duration-300 uppercase font-display border border-blue-400/20"
            data-cursor="learn"
          >
            Book Free Demo
          </button>
        </div>
      </div>
    </nav>
  );
}

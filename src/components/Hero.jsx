import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const GREETINGS = [
  { word: "HELLO", lang: "English" },
  { word: "HOLA", lang: "Spanish" },
  { word: "HALLO", lang: "German" },
  { word: "CIAO", lang: "Italian" },
  { word: "ПРИВЕТ", lang: "Russian" },
  { word: "ԲԱՐԵՎ", lang: "Armenian" },
  { word: "BONJOUR", lang: "French" }
];

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cycleTextRef = useRef(null);
  const ctaRef = useRef(null);
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

  // Background particle network simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.color = `rgba(96, 165, 250, ${Math.random() * 0.4 + 0.1})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#60a5fa";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${(1 - dist / 150) * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw a subtle radial gradient background to feel rich
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      gradient.addColorStop(0, "#081125");
      gradient.addColorStop(1, "#030712");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawLines();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    // 1. Split Text into Letters and Gather them from different directions
    const titleText = titleRef.current;
    if (titleText) {
      const words = titleText.textContent.split(" ");
      titleText.innerHTML = "";
      
      words.forEach((word) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "inline-block mr-4 whitespace-nowrap";
        
        word.split("").forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.textContent = char;
          charSpan.className = "inline-block letter";
          wordSpan.appendChild(charSpan);
        });
        
        titleText.appendChild(wordSpan);
      });

      const letters = titleText.querySelectorAll(".letter");
      
      gsap.fromTo(
        letters,
        {
          opacity: 0,
          scale: 0.2,
          y: () => Math.random() * 300 - 150,
          x: () => Math.random() * 400 - 200,
          rotation: () => Math.random() * 360 - 180,
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1.6,
          stagger: 0.02,
          ease: "power4.out",
        }
      );
    }

    // Subtitle & CTA Entrance
    gsap.fromTo(
      [subtitleRef.current, ctaRef.current],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.8, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  // Multilingual Text Swapper Timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const element = cycleTextRef.current;
    if (element) {
      gsap.fromTo(
        element,
        { opacity: 0, scale: 0.8, filter: "blur(4px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.4, ease: "power2.out" }
      );
    }
  }, [currentGreetingIndex]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Grid overlay for a premium tech touch */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      {/* Radiant glow spots */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl px-6 flex flex-col items-center">
        
        {/* Dynamic greeting tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <span ref={cycleTextRef} className="text-xs font-bold tracking-widest text-blue-400 font-display">
            {GREETINGS[currentGreetingIndex].word}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          <span className="text-[10px] uppercase tracking-wider text-gray-400">
            {GREETINGS[currentGreetingIndex].lang}
          </span>
        </div>

        {/* Hero Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-8xl font-extrabold font-display leading-[1.1] tracking-tight text-white mb-6 uppercase"
        >
          Speak Beyond Borders
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12 font-sans"
        >
          Unlock your future. Learn languages to advance your{" "}
          <span className="text-white font-semibold">career</span>, study{" "}
          <span className="text-white font-semibold">abroad</span>, travel with{" "}
          <span className="text-white font-semibold">confidence</span>, and close international deals.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection("quiz")}
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-950 font-bold tracking-wider rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:scale-105 transition-transform duration-300 uppercase text-xs font-display"
            data-cursor="learn"
          >
            Find Your Language
          </button>
          <button
            onClick={() => scrollToSection("languages")}
            className="w-full sm:w-auto px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold tracking-wider rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 uppercase text-xs font-display"
            data-cursor="explore"
          >
            Explore Courses
          </button>
        </div>
      </div>

      {/* Language Strip bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 text-xs md:text-sm text-gray-500 uppercase tracking-widest font-display z-10">
        <span>English</span>
        <span className="text-blue-500">•</span>
        <span>German</span>
        <span className="text-blue-500">•</span>
        <span>French</span>
        <span className="text-blue-500">•</span>
        <span>Spanish</span>
        <span className="text-blue-500">•</span>
        <span>Russian</span>
        <span className="text-blue-500">•</span>
        <span>Italian</span>
      </div>
    </section>
  );
}

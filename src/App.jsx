import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageLoader from "./components/PageLoader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Smooth scrolling using Lenis
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    // Link Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Animation Loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      {/* 1. Multilingual Page Entry Preloader */}
      {loading && <PageLoader onComplete={() => setLoading(false)} />}

      {/* 2. Custom Hover cursor (Globe theme) */}
      <CustomCursor />

      {/* 3. Global Navbar */}
      <Navbar />

      {/* 4. Page Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

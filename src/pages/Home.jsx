import Hero from "../components/Hero";
import LanguageShowcase from "../components/LanguageShowcase";
import InteractiveGlobe from "../components/InteractiveGlobe";
import WhyLinguaLife from "../components/WhyLinguaLife";
import Stats from "../components/Stats";
import StudentJourney from "../components/StudentJourney";
import Teachers from "../components/Teachers";
import LanguageQuiz from "../components/LanguageQuiz";
import Marquee from "../components/Marquee";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main className="bg-[#030712] relative z-10 w-full overflow-hidden">
      <Hero />
      <LanguageShowcase />
      <InteractiveGlobe />
      <WhyLinguaLife />
      <Stats />
      <StudentJourney />
      <Teachers />
      <LanguageQuiz />
      <Marquee />
      <Pricing />
      <Contact />
    </main>
  );
}

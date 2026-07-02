import { useState } from "react";
import { ChevronRight, RotateCcw, Check, Sparkles } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    text: "What is your main driving goal?",
    options: [
      { text: "Double my salary / Unlock high-paying remote job offers", val: "career" },
      { text: "Enroll in European universities / Secure academic grants", val: "education" },
      { text: "Relocate / Travel confidently without translators", val: "travel" }
    ]
  },
  {
    id: 2,
    text: "Which target destination attracts you most?",
    options: [
      { text: "Global remote hubs (UK, USA, international markets)", val: "en" },
      { text: "Germany, Austria, or Switzerland", val: "de" },
      { text: "France, Belgium, or Switzerland", val: "fr" },
      { text: "Spain, South America, or general Latin markets", val: "es" }
    ]
  },
  {
    id: 3,
    text: "What is your current weekly time investment capability?",
    options: [
      { text: "Light: 2-3 hours/week (Standard Group classes)", val: "standard" },
      { text: "Intensive: 5+ hours/week (Private fast-track tutor)", val: "intensive" }
    ]
  }
];

export default function LanguageQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (questionIdx, optionVal) => {
    const updated = { ...answers, [questionIdx]: optionVal };
    setAnswers(updated);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setStep(0);
    setIsCompleted(false);
  };

  // Logic to determine recommended course
  const getRecommendation = () => {
    const destination = answers[1]; // e.g. 'en', 'de', 'fr', 'es'
    const goal = answers[0]; // 'career', 'education', 'travel'
    const intensity = answers[2]; // 'standard', 'intensive'

    if (destination === "de") {
      return {
        title: "Academic German & TestDaF Prep",
        desc: "Designed for engineers, researchers, and students aiming to unlock fully funded master programs in Munich or Berlin.",
        badge: "German Standard/Intensive",
        accent: "border-red-500/30 text-red-400 bg-red-500/5",
        cta: "Lock Free German Lesson"
      };
    }
    if (destination === "fr") {
      return {
        title: "Diplomatic & Conversational French",
        desc: "Master the language of global organizations, international relations, luxury brands, and art.",
        badge: "French Elite Program",
        accent: "border-blue-400/30 text-blue-300 bg-blue-500/5",
        cta: "Lock Free French Lesson"
      };
    }
    if (destination === "es") {
      return {
        title: "Global Spanish & Commercial Negotiations",
        desc: "Focus on commercial communication, networking, and active tourism dialogues across Spain and LatAm.",
        badge: "Spanish Fast-Track",
        accent: "border-yellow-500/30 text-yellow-400 bg-yellow-500/5",
        cta: "Lock Free Spanish Lesson"
      };
    }

    // Default to English based on goal
    if (goal === "career") {
      return {
        title: "Premium Business English Course",
        desc: "Accelerate your career in remote IT, international finance, or product management. Accent reduction included.",
        badge: "English Corporate Standard",
        accent: "border-blue-500/30 text-blue-400 bg-blue-500/5",
        cta: "Lock Free English Lesson"
      };
    } else {
      return {
        title: "Elite IELTS Mastery Program",
        desc: "Fast-track your path to scores of 7.5+ required for relocating to Canada, the UK, or enrolling in elite European institutions.",
        badge: "IELTS Intensive focus",
        accent: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
        cta: "Lock Free IELTS Session"
      };
    }
  };

  const recommendation = isCompleted ? getRecommendation() : null;

  return (
    <section
      id="quiz"
      className="relative py-24 md:py-36 bg-[#030712] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 select-none">
          <h2 className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-3 font-display">
            Interactive Widget
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight text-white mb-6">
            Find Your Match
          </h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed font-sans">
            Spend 30 seconds answering our dynamic algorithm and get a personalized, career-focused language path recommendation.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl relative min-h-[400px] flex flex-col justify-between">
          
          {/* Top Progress bar */}
          {!isCompleted && (
            <div className="w-full mb-8">
              <div className="flex justify-between items-center text-xs text-gray-500 mb-2 font-display uppercase">
                <span>Progress</span>
                <span>
                  Question {step + 1} of {QUESTIONS.length}
                </span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-500 ease-out"
                  style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 flex flex-col justify-center">
            {!isCompleted ? (
              <div className="animate-fade-in">
                {/* Question Text */}
                <h4 className="text-lg md:text-2xl font-bold font-display text-white mb-8">
                  {QUESTIONS[step].text}
                </h4>

                {/* Options List */}
                <div className="flex flex-col gap-4">
                  {QUESTIONS[step].options.map((opt, optIdx) => (
                    <button
                      key={opt.text}
                      onClick={() => handleSelectOption(step, opt.val)}
                      className="w-full text-left p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-blue-500/30 text-gray-300 hover:text-white text-xs md:text-sm font-medium transition-all duration-300 flex justify-between items-center group relative overflow-hidden"
                      data-cursor="explore"
                    >
                      <span>{opt.text}</span>
                      <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-500/10 transition-all duration-300">
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-300 transform group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Results Reveal Screen
              <div className="text-center animate-fade-in flex flex-col items-center justify-center py-6 select-none">
                
                {/* Success Sparkle Badge */}
                <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 animate-bounce">
                  <Sparkles className="w-8 h-8" />
                </div>

                <span className={`text-[10px] font-bold font-display uppercase tracking-widest px-4 py-1.5 rounded-full border mb-4 block ${recommendation.accent}`}>
                  {recommendation.badge}
                </span>

                <h4 className="text-2xl md:text-4xl font-extrabold font-display text-white tracking-tight mb-4 uppercase">
                  {recommendation.title}
                </h4>

                <p className="text-gray-400 text-sm max-w-lg leading-relaxed mb-8 font-sans">
                  {recommendation.desc}
                </p>

                {/* Action CTA */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                  <button
                    onClick={() => {
                      const el = document.getElementById("booking");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wider rounded-full shadow-[0_10px_25px_rgba(37,99,235,0.3)] transition-transform duration-300 hover:scale-105 uppercase text-xs font-display flex items-center justify-center gap-2"
                    data-cursor="submit"
                  >
                    <Check className="w-4 h-4" />
                    {recommendation.cta}
                  </button>
                  
                  <button
                    onClick={resetQuiz}
                    className="w-full sm:w-auto px-6 py-4 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold uppercase font-display"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Start Over
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>

      {/* Separator line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

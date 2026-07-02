import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Plus, Minus, Calendar, Clock, MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

// FAQ Data
const FAQS = [
  {
    q: "Can I prepare for international exams (IELTS, TestDaF, DELF)?",
    a: "Absolutely. We offer specialized intensive programs for IELTS, TOEFL, TestDaF, Goethe-Zertifikat, DELF/DALF, and DELE. Over 93% of our students score band 7.5+ or B2/C1 levels on their first try."
  },
  {
    q: "How are the instructors at Lingua Life selected?",
    a: "We hire the top 3% of applicants. Our instructors hold international teaching qualifications (CELTA, DELTA, DAAD), have lived or worked abroad in native-speaking countries, and pass regular methodological training audits."
  },
  {
    q: "Is there a corporate curriculum for business teams?",
    a: "Yes. We design customized programs for IT, medical, and hospitality companies. This includes industry terminology, business email writing, and active client negotiation simulation modules."
  },
  {
    q: "Do you offer offline classes in Yerevan or just online?",
    a: "We offer both. You can attend physical classes in our central glassmorphic hub on Aram Street, Yerevan, or connect from anywhere globally via our custom interactive streaming systems."
  }
];

// Calendar Mocking Days
const DAYS = [
  { day: "Mon", date: 28 },
  { day: "Tue", date: 29 },
  { day: "Wed", date: 30 },
  { day: "Thu", date: 1 },
  { day: "Fri", date: 2 },
  { day: "Sat", date: 3 }
];

const TIME_SLOTS = ["10:00 AM", "12:30 PM", "3:00 PM", "6:30 PM"];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  
  // Booking Form State
  const [selectedLang, setSelectedLang] = useState("English");
  const [selectedDate, setSelectedDate] = useState(1);
  const [selectedTime, setSelectedTime] = useState("6:30 PM");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formBtnRef = useRef(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  useEffect(() => {
    // Magnetic Button Effect on Booking Submit
    const btn = formBtnRef.current;
    if (btn) {
      const onMouseMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      const onMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      };
      btn.addEventListener("mousemove", onMouseMove);
      btn.addEventListener("mouseleave", onMouseLeave);

      return () => {
        btn.removeEventListener("mousemove", onMouseMove);
        btn.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;
    setShowSuccessModal(true);
  };

  return (
    <section
      id="contact"
      className="relative bg-[#02050c] pt-24 md:pt-36 pb-12 overflow-hidden"
    >
      {/* Mesh glowing grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[450px] h-[450px] rounded-full bg-teal-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Row 1: FAQ Section */}
        <div id="faq" className="max-w-4xl mx-auto mb-32">
          <div className="text-center mb-16 select-none">
            <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3 font-display">
              Faq
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight text-white mb-6">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                    data-cursor="explore"
                  >
                    <span className="text-sm md:text-base font-bold font-display text-white pr-4">
                      {faq.q}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4 text-blue-400" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  
                  {/* Expanding body */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[200px] border-t border-white/5" : "max-h-0"
                    }`}
                  >
                    <p className="p-6 text-gray-400 text-xs md:text-sm leading-relaxed font-sans bg-black/10">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2: Booking Form & Yerevan Vector Coordinates Map */}
        <div id="booking" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          
          {/* Booking Widget (High fidelity mock booking form) */}
          <div className="glass-card rounded-3xl p-8 border border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent shadow-2xl relative">
            <h4 className="text-xl md:text-2xl font-bold font-display text-white mb-2 uppercase">
              Schedule Free Trial
            </h4>
            <p className="text-xs text-gray-400 mb-8 font-sans">
              Book a live 1-on-1 assessment and customized diagnostic consultation with our experts.
            </p>

            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-6">
              
              {/* 1. Language selector */}
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 font-display block mb-2">
                  Select Language
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["English", "German", "Spanish"].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setSelectedLang(lang)}
                      className={`py-2 rounded-xl text-xs font-semibold font-display border transition-colors ${
                        selectedLang === lang
                          ? "bg-blue-500/10 border-blue-500 text-blue-400"
                          : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Interactive Calendar Days picker */}
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 font-display block mb-2 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  Select Date
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {DAYS.map((d) => (
                    <button
                      key={d.date}
                      type="button"
                      onClick={() => setSelectedDate(d.date)}
                      className={`p-2 rounded-xl text-center border flex flex-col items-center transition-colors ${
                        selectedDate === d.date
                          ? "bg-blue-500/10 border-blue-500 text-blue-400"
                          : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
                      }`}
                    >
                      <span className="text-[9px] uppercase text-gray-500 font-display">{d.day}</span>
                      <span className="text-sm font-bold mt-0.5">{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Interactive Time Slots picker */}
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 font-display block mb-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-xl text-xs font-semibold transition-colors ${
                        selectedTime === t
                          ? "bg-blue-500/10 border-blue-500 text-blue-400"
                          : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                ref={formBtnRef}
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest font-display rounded-xl shadow-[0_5px_20px_rgba(37,99,235,0.3)] transition-colors mt-2"
                data-cursor="submit"
              >
                Confirm Reservation
              </button>

            </form>
          </div>

          {/* Yerevan Vector Coordinates Map (Right panel) */}
          <div className="flex flex-col h-full justify-between lg:pl-10">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-rose-400 font-display uppercase mb-3 block">
                Our Hub Location
              </span>
              <h4 className="text-3xl font-extrabold font-display text-white uppercase tracking-tight mb-4">
                VISIT OUR CENTER
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 font-sans">
                Located in the heart of Yerevan. Stop by for premium espresso, study materials, or meet our coaches.
              </p>
            </div>

            {/* Simulated coordinates node network representing Yerevan */}
            <div className="h-[200px] border border-white/5 rounded-3xl bg-black/40 relative overflow-hidden flex items-center justify-center mb-8">
              <svg className="w-full h-full text-blue-500/20" viewBox="0 0 400 200">
                <circle cx="200" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
                <circle cx="200" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.8" />
                
                {/* Connecting node points */}
                <line x1="200" y1="100" x2="160" y2="60" stroke="currentColor" strokeWidth="0.8" />
                <line x1="200" y1="100" x2="250" y2="80" stroke="currentColor" strokeWidth="0.8" />
                <line x1="200" y1="100" x2="180" y2="150" stroke="currentColor" strokeWidth="0.8" />
                
                {/* Yerevan Node Pin */}
                <g className="text-rose-500">
                  <circle cx="200" cy="100" r="6" fill="currentColor" />
                  <circle cx="200" cy="100" r="16" fill="none" stroke="currentColor" strokeWidth="1" className="animate-ping" />
                </g>
                <text x="210" y="105" fill="white" className="text-[10px] font-bold font-display tracking-widest">EVN HQ</text>
              </svg>
              
              <div className="absolute bottom-4 left-4 text-[9px] font-mono text-gray-500">
                LAT: 40.1792° N / LON: 44.5152° E
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white/[0.01] border border-white/5 rounded-2xl p-4">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block font-display">Call Us</span>
                  <a href="tel:+37499000000" className="text-xs font-bold text-white hover:text-blue-400 transition-colors font-sans">
                    +374 99 000000
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/[0.01] border border-white/5 rounded-2xl p-4">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block font-display">Email Us</span>
                  <a href="mailto:info@lingualife.com" className="text-xs font-bold text-white hover:text-blue-400 transition-colors font-sans">
                    info@lingualife.com
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="glass-card rounded-3xl p-8 border border-white/10 max-w-sm w-full text-center relative shadow-2xl animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h5 className="text-lg font-bold font-display text-white mb-2 uppercase">
                Consultation Reserved
              </h5>
              <p className="text-gray-400 text-xs leading-relaxed mb-6 font-sans">
                Thank you, <span className="text-white font-semibold">{name}</span>! We have reserved your free trial on{" "}
                <span className="text-blue-400 font-semibold">{selectedLang}</span> for date <span className="text-blue-400 font-semibold">{selectedDate}</span> at <span className="text-blue-400 font-semibold">{selectedTime}</span>. We will call you shortly on <span className="text-white">{phone}</span> to coordinate directions.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gray-200 transition-colors font-display"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Row 3: Corporate Footer info */}
        <div className="border-t border-white/5 pt-12 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center font-bold text-white text-[10px]">
              LL
            </div>
            <span className="text-xs font-bold tracking-widest text-white font-display">
              LINGUA LIFE
            </span>
          </div>
          
          <p className="text-[10px] text-gray-500 font-sans text-center md:text-right">
            © 2026 Lingua Life language center. All rights reserved. Designed as a premium international platform experience.
          </p>
        </div>

      </div>
    </section>
  );
}

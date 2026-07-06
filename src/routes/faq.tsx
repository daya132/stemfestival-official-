import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus, Minus } from "lucide-react";
import { Footer, Navigation } from "./index";

const COLORS = {
  purple: "#41065F",
  red: "#E40066",
  yellow: "#FEA82F",
  green: "#9DC42B",
};

const LOCATION = "Dr. Obi Wali International Conference Centre, Port Harcourt, Nigeria";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — STEM Festival 2026" },
      { name: "description", content: "Answers to frequently asked questions about STEM Festival 2026." },
      { property: "og:title", content: "FAQ — STEM Festival 2026" },
      { property: "og:description", content: "Everything you need to know about attending, competing, and partnering." },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  const faqs = [
    { q: "When and where is STEM Festival 2026?", a: `July 22-25, 2026 at ${LOCATION}.` },
    { q: "Who can participate?", a: "Innovators aged 8 to 40+, individually or in teams, from anywhere in the world." },
    { q: "How much does it cost to attend?", a: "Attendee passes are affordable; competitors register per category. Visit the Register portal for details." },
    { q: "What categories can I compete in?", a: "AI & Robotics, Software Development, IoT & Electronics, Animation & Game Development, Drone Tech, and Blockchain." },
    { q: "Are there scholarships?", a: "Yes — winners can earn university scholarships in the USA up to 60% tuition, plus cash, laptops, and STEM tools." },
    { q: "Can my company sponsor or exhibit?", a: "Absolutely. Reach out via the Partner, Vendor, or Advertise options in Get Involved." },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-white text-black overflow-x-hidden">
      <Navigation />
      <section className="relative min-h-screen pt-32 pb-24 overflow-hidden">
        {/* shared brand background motion */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full blur-3xl opacity-25 animate-drift"
            style={{ background: `radial-gradient(circle, ${COLORS.purple}, transparent 70%)` }}
          />
          <div
            className="absolute top-1/3 -right-40 h-[480px] w-[480px] rounded-full blur-3xl opacity-25 animate-drift"
            style={{ background: `radial-gradient(circle, ${COLORS.red}, transparent 70%)`, animationDelay: "3s" }}
          />
          <div
            className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full blur-3xl opacity-20 animate-drift"
            style={{ background: `radial-gradient(circle, ${COLORS.yellow}, transparent 70%)`, animationDelay: "6s" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-3xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: COLORS.red }}>
              Need Answers?
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-black">
              Frequently Asked{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.purple})` }}>
                Questions
              </span>
            </h1>
            <p className="mt-4 text-lg text-black/60">Everything you need to know before you register.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className={`rounded-2xl border transition-all ${isOpen ? "border-transparent shadow-xl bg-white" : "border-black/10 bg-white"}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle size={20} style={{ color: COLORS.red }} />
                      <span className="font-display font-bold text-black text-base md:text-lg">{f.q}</span>
                    </span>
                    <span className="shrink-0 w-8 h-8 grid place-items-center rounded-full text-white" style={{ background: isOpen ? COLORS.red : COLORS.purple }}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-black/70 leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
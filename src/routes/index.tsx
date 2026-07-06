import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MapPin, Mail, Phone, ChevronRight, ChevronLeft,
  Target, Award, Users, Zap, Globe, ArrowRight,
  Cpu, Code, Wifi, Gamepad2, Plane, Link2,
  GraduationCap, Briefcase, Brain, UserCheck, Trophy,
  Medal, BookOpen, Rocket, Heart, Sprout, Mic,
  Menu, X, Handshake, Atom, FlaskConical,
  Microscope, Laptop, Lightbulb, Sparkles, Quote,
  Store, Megaphone, Plus, Minus, HelpCircle, ChevronDown,
  Newspaper, FileText, Archive, Flag, Building2
} from "lucide-react";
import {
  FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaTiktok} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import stemLogo from "@/assets/stem-logo.png";
import stemRobot from "@/assets/stem-robot.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STEM Festival 2026 — Engineering Tomorrow" },
      { name: "description", content: "Africa's premier STEM innovation and problem-solving platform. Compete, innovate, and shape the future. October 28-31, 2026 — Nigeria." },
      { property: "og:title", content: "STEM Festival 2026" },
      { property: "og:description", content: "Innovate, compete, shape the future. Join the world's premier STEM platform." },
    ],
  }),
  component: Index,
});

const COLORS = {
  purple: "#41065F",
  red: "#E40066",
  yellow: "#FEA82F",
  green: "#9DC42B",
};

const partners = [
  { name: "NDDC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Coat_of_arms_of_Nigeria.svg/120px-Coat_of_arms_of_Nigeria.svg.png" },
  { name: "Rivers State Govt", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Coat_of_arms_of_Nigeria.svg/120px-Coat_of_arms_of_Nigeria.svg.png" },
  { name: "Anna Maria College", logo: "https://logo.clearbit.com/annamaria.edu" },
  { name: "Nigeria Computer Society", logo: "https://logo.clearbit.com/ncs.org.ng" },
  { name: "Qolrobotics", logo: "https://logo.clearbit.com/Qolrobotics.com" },
  { name: "Deashift", logo: "https://logo.clearbit.com/deashift.com" },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
  { name: "Google", logo: "https://logo.clearbit.com/google.com" },
  { name: "IBM", logo: "https://logo.clearbit.com/ibm.com" },
  { name: "Intel", logo: "https://logo.clearbit.com/intel.com" },
];

const sponsors = [
  { name: "UNESCO", logo: "https://logo.clearbit.com/unesco.org" },
  { name: "UNICEF", logo: "https://logo.clearbit.com/unicef.org" },
  { name: "MTN Foundation", logo: "https://logo.clearbit.com/mtn.com" },
  { name: "Shell", logo: "https://logo.clearbit.com/shell.com" },
  { name: "Chevron", logo: "https://logo.clearbit.com/chevron.com" },
  { name: "Dangote", logo: "https://logo.clearbit.com/dangote.com" },
  { name: "Access Bank", logo: "https://logo.clearbit.com/accessbankplc.com" },
  { name: "GTBank", logo: "https://logo.clearbit.com/gtbank.com" },
  { name: "Andela", logo: "https://logo.clearbit.com/andela.com" },
  { name: "Flutterwave", logo: "https://logo.clearbit.com/flutterwave.com" },
];

const LOCATION = "Dr. Obi Wali International Conference Centre, Port Harcourt, Nigeria";

// ---------- Animated Background ----------
function AnimatedBackground({ variant = "dark", grid = true }: { variant?: "dark" | "light"; grid?: boolean }) {
  const icons = [Atom, Cpu, Code, Rocket, Lightbulb];
  const colors = [COLORS.purple, COLORS.red, COLORS.yellow, COLORS.green];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden [contain:strict]">
      <div
        className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full blur-3xl opacity-30 animate-drift"
        style={{ background: `radial-gradient(circle, ${COLORS.purple}, transparent 70%)` }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[480px] w-[480px] rounded-full blur-3xl opacity-25 animate-drift"
        style={{ background: `radial-gradient(circle, ${COLORS.red}, transparent 70%)`, animationDelay: "3s" }}
      />
      {grid && <div
        className={`absolute inset-0 ${variant === "dark" ? "opacity-[0.07]" : "opacity-[0.05]"}`}
        style={{
          backgroundImage: `linear-gradient(${variant === "dark" ? "#fff" : "#000"} 1px, transparent 1px), linear-gradient(90deg, ${variant === "dark" ? "#fff" : "#000"} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />}
      {icons.map((Icon, i) => (
        <div
          key={`ico-${i}`}
          className="absolute animate-float-y will-change-transform"
          style={{
            left: `${(i * 19 + 8) % 90}%`,
            top: `${(i * 23 + 12) % 80}%`,
            color: colors[i % colors.length],
            opacity: variant === "dark" ? 0.16 : 0.1,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${9 + i}s`,
          }}
        >
          <Icon size={40} />
        </div>
      ))}
    </div>
  );
}

// ---------- 3D Cubes Background ----------
export function Cubes3D({ count = 7, opacity = 0.55 }: { count?: number; opacity?: number }) {
  const palette = [COLORS.red, COLORS.purple, COLORS.yellow, COLORS.green];
  const cubes = Array.from({ length: count }).map((_, i) => {
    const size = 60 + ((i * 37) % 90);
    const left = (i * 13 + 8) % 92;
    const top = (i * 29 + 11) % 85;
    const dur = 22 + ((i * 7) % 22);
    const floatDelay = (i * 1.3).toFixed(2);
    const color = palette[i % palette.length];
    return { size, left, top, dur, floatDelay, color, i };
  });
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden cubes-stage [contain:strict]"
      style={{ opacity }}
    >
      {cubes.map(({ size, left, top, dur, floatDelay, color, i }) => {
        const half = size / 2;
        return (
          <div
            key={i}
            className="cube-floater absolute"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animationDelay: `${floatDelay}s`,
            }}
          >
            <div
              className="cube-3d"
              style={{
                width: size,
                height: size,
                ...({ "--cube-dur": `${dur}s`, "--cube-color": color } as Record<string, string>),
              }}
            >
              <div className="face" style={{ transform: `translateZ(${half}px)` }} />
              <div className="face" style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
              <div className="face" style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
              <div className="face" style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
              <div className="face" style={{ transform: `rotateX(90deg) translateZ(${half}px)` }} />
              <div className="face" style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------- Navigation ----------

// ---------- Configuration & Types ----------
type NavLink = { label: string; href: string; I?: typeof Cpu };
type NavMenu = { label: string; items: NavLink[] };

const NAV_MENUS: NavMenu[] = [
  { label: "About", items: [
    { label: "STEM Festival Global Initiative", href: "/#about", I: Atom },
    { label: "Association", href: "/#about", I: Building2 },
    { label: "Board of Advisors", href: "/#advisors", I: Users },
    { label: "Member Countries & State", href: "/#members", I: Flag },
    { label: "Community", href: "/#community", I: Users }, 
    { label: "Governing Council", href: "/#council", I: Users },
    { label: "Partners", href: "/#partners", I: Handshake },
  ]},
  { label: "Join Us", items: [
    { label: "Get Involved", href: "/#get-involved", I: Users },
    { label: "Contact Us", href: "/#contact", I: Mail },
  ]},
  { label: "Competitions", items: [
    { label: "Competition Areas", href: "/#competitions", I: Trophy },
    { label: "Awards & Prizes", href: "/#awards", I: Medal },
    { label: "Previous Challenges", href: "/#previous", I: Archive },
  ]},
  { label: "Projects", items: [
    { label: "STEM Solutions", href: "/#projects", I: Rocket },
  ]},
  { label: "STEM Press", items: [
    { label: "Annual Reports", href: "/#reports", I: FileText },
    { label: "Subscribe", href: "/#contact", I: Mail },
    { label: "FAQ", href: "/faq", I: HelpCircle },
    { label: "Media Archive", href: "/#media", I: Newspaper },
  ]},
];

// ---------- Sub-Component for Mobile Accordion Row ----------
function MobileMenuRow({ m, onLinkClick }: { m: NavMenu; onLinkClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 py-1 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-white/85 text-sm font-semibold transition-colors"
      >
        <span>{m.label}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pl-4 flex flex-col gap-1 pb-2"
          >
            {m.items.map(({ label, href, I }) => (
              <a
                key={label}
                href={href}
                onClick={onLinkClick}
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                {I && <I size={16} style={{ color: COLORS.yellow }} />}
                <span className="text-sm">{label}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- Main Navigation Component ----------
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/85 backdrop-blur-xl border-b border-white/10 py-2" : "bg-transparent py-4"
      }`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <img src={stemLogo} alt="STEM Festival" className="h-10 md:h-12 brightness-0 invert" />
        </a>
        <div className="hidden lg:flex items-center gap-1">
          {NAV_MENUS.map((m) => {
            const isOpen = openMenu === m.label;
            return (
              <div key={m.label} className="relative" onMouseEnter={() => setOpenMenu(m.label)}>
                <button
                  className="text-white/85 hover:text-white text-sm font-semibold px-3 py-2 inline-flex items-center gap-1"
                  onClick={() => setOpenMenu(isOpen ? null : m.label)}
                >
                  {m.label}
                  <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 rounded-2xl bg-black/95 border border-white/10 backdrop-blur-xl shadow-2xl p-2"
                    >
                      {m.items.map(({ label, href, I }) => (
                        <a
                          key={label}
                          href={href}
                          onClick={() => setOpenMenu(null)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
                        >
                          {I && <I size={16} style={{ color: COLORS.yellow }} />}
                          {label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <Link
            to="/register"
            className="ml-3 px-5 py-2.5 rounded-full text-white text-sm font-bold shadow-lg hover:scale-105 transition-transform"
            style={{ background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.purple})` }}
          >
            Register Now
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button className="lg:hidden text-white p-2 focus:outline-none" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Accordion Drawer Container */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-black/95 border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1 max-h-[75vh] overflow-y-auto">
              {NAV_MENUS.map((m) => (
                <MobileMenuRow key={m.label} m={m} onLinkClick={() => setOpen(false)} />
              ))}
              
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="mt-4 px-5 py-3 rounded-full text-center text-white font-bold block"
                style={{ background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.purple})` }}
              >
                Register Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/// ---------- Countdown ----------
function useCountdown(target: string) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const d = +new Date(target) - +new Date();
      if (d > 0) {
        setT({
          days: Math.floor(d / 86400000),
          hours: Math.floor((d / 3600000) % 24),
          minutes: Math.floor((d / 60000) % 60),
          seconds: Math.floor((d / 1000) % 60),
        });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

// ---------- Hero with cinematic switch ----------
function Hero() {
  const [slide, setSlide] = useState(0);
  const t = useCountdown("October 28, 2026 00:00:00");
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % 2), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-black text-white">
      <AnimatedBackground variant="dark" />
      {/* <Cubes3D count={8} opacity={0.5} /> */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          
          {/* LEFT: switching text panels */}
          <div className="relative min-h-[520px] order-2 lg:order-1">
            <AnimatePresence mode="wait">
              {slide === 0 ? (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, x: -60, rotateY: -12 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 60, rotateY: 12 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20">
                    <Sparkles size={14} style={{ color: COLORS.yellow }} /> Africa's Global STEM Celebration
                  </span>
                  <h1 className="font-display mt-6 text-5xl md:text-7xl font-black leading-[0.95]">
                    STEM Festival{" "}
                    <span
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.yellow}, ${COLORS.green})` }}
                    >
                      2026
                    </span>
                  </h1>
                  <p className="font-display mt-3 text-xl md:text-2xl text-white/80 tracking-widest">ENGINEERING TOMORROW</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {[
                      { l: "Agriculture", c: COLORS.green, I: Sprout },
                      { l: "Education", c: COLORS.yellow, I: BookOpen },
                      { l: "Health", c: COLORS.red, I: Heart },
                    ].map(({ l, c, I }) => (
                      <div key={l} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5">
                        <I size={16} style={{ color: c }} />
                        <span className="text-sm font-semibold">{l}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-lg text-white/70 italic">…innovate, compete, shape the future!</p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="/register"
                      className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white shadow-2xl hover:shadow-[0_8px_40px_rgba(228,0,102,0.5)] transition-all hover:-translate-y-0.5"
                      style={{ background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.purple})` }}
                    >
                      Register<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>

                  </div>
                  <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/70">
                    <span className="flex items-center gap-2"><Calendar size={16} style={{ color: COLORS.yellow }} /> October 28-31, 2026</span>
                    <span className="flex items-center gap-2"><MapPin size={16} style={{ color: COLORS.green }} /> Nigeria</span>
                    <span className="flex items-center gap-2"><Globe size={16} style={{ color: COLORS.red }} /> Global Impact</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="what"
                  initial={{ opacity: 0, x: -60, rotateY: -12 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 60, rotateY: 12 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20">
                    <Brain size={14} style={{ color: COLORS.green }} /> What STEM Is About
                  </span>
                  <h1 className="font-display mt-6 text-4xl md:text-6xl font-black leading-[1.05]">
                    Build. Break.{" "}
                    <span
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: `linear-gradient(135deg, ${COLORS.yellow}, ${COLORS.red})` }}
                    >
                      Reimagine.
                    </span>
                  </h1>
                  <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">
                    STEM is the language of every breakthrough — from the chip in your pocket to the vaccine in your bloodstream.
                    The Festival is where Africa's sharpest minds, aged 8 to 40+, turn curiosity into invention.
                  </p>
                  
                  {/* STEM Categories Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      { I: FlaskConical, t: "Science", c: COLORS.red },
                      { I: Cpu, t: "Technology", c: COLORS.yellow },
                      { I: Lightbulb, t: "Engineering", c: COLORS.green },
                      { I: Brain, t: "Mathematics", c: COLORS.purple },
                    ].map(({ I, t, c }) => (
                      <div key={t} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="p-2 rounded-lg" style={{ background: `${c}22`, color: c }}>
                          <I size={20} />
                        </span>
                        <span className="font-semibold text-sm md:text-base">{t}</span>
                      </div>
                    ))}
                  </div>

                  <HeroCountdown t={t} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* slide controls */}
            <div className="absolute -bottom-6 left-0 flex items-center gap-3">
              <button
                onClick={() => setSlide((s) => (s - 1 + 2) % 2)}
                className="w-10 h-10 grid place-items-center rounded-full border border-white/20 bg-white/5 hover:bg-white/15 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-1.5">
                {[0, 1].map((i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${slide === i ? "w-8" : "w-3 bg-white/30"}`}
                    style={slide === i ? { background: COLORS.red } : undefined}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setSlide((s) => (s + 1) % 2)}
                className="w-10 h-10 grid place-items-center rounded-full border border-white/20 bg-white/5 hover:bg-white/15 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT: transparent robot, no frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative order-1 lg:order-2 lg:-mr-8 xl:-mr-16"
          >
            <div className="relative max-w-[760px] lg:max-w-none mx-auto lg:scale-[1.15] xl:scale-[1.25] origin-center">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-40"
                style={{ background: `radial-gradient(circle, ${COLORS.red}, transparent 60%)` }}
              />
              <motion.img
                src={stemRobot}
                alt="STEM Festival robot"
                width={2000}
                height={2000}
                fetchPriority="high"
                decoding="async"
                className="relative w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(228,0,102,0.35)]"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------- Premium Hero Countdown ----------
function HeroCountdown({ t }: { t: { days: number; hours: number; minutes: number; seconds: number } }) {
  const cells = [
    { v: t.days, l: "Days", c: COLORS.yellow },
    { v: t.hours, l: "Hours", c: COLORS.green },
    { v: t.minutes, l: "Minutes", c: COLORS.red },
    { v: t.seconds, l: "Seconds", c: COLORS.purple },
  ];
  return (
    <div className="mt-8 relative">
      <div
        className="absolute -inset-1 rounded-3xl blur-xl opacity-40"
        style={{ background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.purple}, ${COLORS.yellow})` }}
      />
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 sm:pr-5 sm:border-r border-white/10">
          <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: COLORS.red }} />
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/50 font-bold">Live Countdown</p>
            <p className="font-display text-sm font-bold text-white">Festival Begins</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-3 flex-1">
          {cells.map(({ v, l, c }) => (
            <div key={l} className="text-center">
              <div className="font-display font-mono-num text-3xl md:text-4xl font-black text-white leading-none tabular-nums">
                {String(v).padStart(2, "0")}
              </div>
              <div className="mt-1.5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: c }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Premium Partners loader bar ----------
function PartnersLoader() {
  return (
    <section className="relative py-10 bg-black border-y border-white/10 overflow-hidden">
      <div className="container mx-auto px-6 mb-4 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Premium Partners</p>
        <div className="hidden sm:block flex-1 mx-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="w-32 h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full animate-progress" style={{ background: `linear-gradient(90deg, ${COLORS.red}, ${COLORS.yellow}, ${COLORS.green})` }} />
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-black to-transparent" />
        <div className="flex gap-12 animate-scroll-x hover:[animation-play-state:paused] w-max">
          {[...partners, ...partners].map((p, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors min-w-[200px]">
              <img src={p.logo} alt={p.name} className="h-8 w-8 object-contain rounded bg-white/90 p-1" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              <span className="text-white/80 font-semibold whitespace-nowrap">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Stats Board (counters) ----------
function StatCounter({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    // Always animate on mount (every refresh).
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function StatsBoard() {
  const stats = [
    { v: 3, s: "+", l: "Years Running", c: COLORS.yellow, I: Calendar },
    { v: 4000, s: "+", l: "Innovations Built", c: COLORS.red, I: Lightbulb },
    { v: 50, s: "+", l: "Partner Schools", c: COLORS.green, I: GraduationCap },
    { v: 10000, s: "+", l: "USD In Prizes", c: COLORS.purple, I: Trophy, prefix: "$" },
  ];
  return (
    <div className="relative mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 md:divide-x divide-white/10">
      {stats.map(({ v, s, l, c, I, prefix }, i) => (
        <motion.div
          key={l}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="relative px-3 md:px-6 group"
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/50 mb-3">
            <I size={14} style={{ color: c }} />
            <span>0{i + 1}</span>
          </div>
          <div className="font-display font-mono-num text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none">
            {prefix}
            <StatCounter to={v} suffix={s} />
          </div>
          <p className="mt-3 text-xs md:text-sm font-semibold text-white/75 tracking-wide">{l}</p>
          <div
            className="mt-3 h-0.5 w-10 origin-left transition-all duration-500 group-hover:w-20"
            style={{ background: c }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ---------- Section title ----------
function SectionTitle({ eyebrow, title, sub, dark = false }: { eyebrow?: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      {eyebrow && (
        <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: COLORS.red }}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-4xl md:text-5xl font-black ${dark ? "text-white" : "text-black"}`}>{title}</h2>
      {sub && <p className={`mt-4 text-lg ${dark ? "text-white/70" : "text-black/60"}`}>{sub}</p>}
    </div>
  );
}

// ---------- About ----------
function About() {
  return (
    <section id="about" className="relative pt-24 pb-24 bg-white overflow-hidden">
      <AnimatedBackground variant="light" grid={false} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-14 md:mb-20 relative z-20">
          <IntroStats />
        </div>
        <SectionTitle eyebrow="Engineering Tomorrow" title="The Future of Africa Starts Here" />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-black/70 text-lg leading-relaxed">
            <p>
              STEM Festival is no longer just an event—it is a global movement ignited in Africa to disrupt the status quo.
              We call the brightest innovators, aged 8 to 40+, to descend upon Nigeria for four days of high-velocity invention.
            </p>
            <p>
              Transform Agriculture, Education, and Health through radical, problem-solving technology. Whether you compete
              or witness, your place in history is waiting.
            </p>
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white hover:-translate-y-0.5 transition-transform"
              style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.red})` }}
            >
              Download Challenge <ArrowRight size={18} />
            </a>
          </div>
          <div className="relative grid grid-cols-2 gap-4">
            {[
              "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80", // robotics
              "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", // AI / neural
              "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", // circuit board
              "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80", // coding screens
            ].map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt="STEM in action"
                className={`w-full h-44 md:h-56 object-cover rounded-2xl shadow-lg ${i % 2 ? "translate-y-6" : ""}`}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Intro Stats (light integration) ----------
function IntroStats() {
  const stats = [
    { v: 3, s: "+", l: "Years Running", c: COLORS.yellow, I: Calendar },
    { v: 4000, s: "+", l: "Innovations Built", c: COLORS.red, I: Lightbulb },
    { v: 50, s: "+", l: "Partner Schools", c: COLORS.green, I: GraduationCap },
    { v: 10000, s: "+", l: "USD In Prizes", c: COLORS.purple, I: Trophy, prefix: "$" },
  ];
  return (
    <div className="relative">
      <div className="absolute -inset-x-4 md:-inset-x-6 -inset-y-6 rounded-[2rem] bg-white/95 backdrop-blur-xl border border-black/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]" />
      <div
        className="absolute -inset-x-4 md:-inset-x-6 -inset-y-6 rounded-[2rem] opacity-[0.06] pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.red}, ${COLORS.yellow}, ${COLORS.green})` }}
      />
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:divide-x divide-black/10">
        {stats.map(({ v, s, l, c, I, prefix }, i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="relative px-3 md:px-6 group"
          >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-black/45 mb-3 font-bold">
              <I size={14} style={{ color: c }} />
              <span>0{i + 1}</span>
            </div>
            <div className="font-display font-mono-num text-4xl md:text-5xl lg:text-6xl font-black text-black leading-none">
              {prefix}
              <StatCounter to={v} suffix={s} />
            </div>
            <p className="mt-3 text-xs md:text-sm font-semibold text-black/60 tracking-wide">{l}</p>
            <div
              className="mt-3 h-0.5 w-10 origin-left transition-all duration-500 group-hover:w-20"
              style={{ background: c }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---------- Countdown Section ----------
function CountdownSection() {
  const t = useCountdown("October 28, 2026 00:00:00");
  const Box = ({ v, l, c }: { v: number; l: string; c: string }) => (
    <div className="relative">
      <div className="absolute inset-0 rounded-2xl blur-xl opacity-50" style={{ background: c }} />
      <div className="relative aspect-square min-w-[90px] flex flex-col items-center justify-center rounded-2xl bg-black/60 backdrop-blur-md border border-white/20">
        <div className="font-display text-4xl md:text-5xl font-black text-white">{String(v).padStart(2, "0")}</div>
        <div className="text-[10px] uppercase tracking-widest text-white/60 mt-1">{l}</div>
      </div>
    </div>
  );
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <AnimatedBackground variant="dark" />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <SectionTitle eyebrow="Mark Your Calendar" title="Countdown to Innovation" sub="Time remaining until STEM Festival 2026" dark />
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Box v={t.days} l="Days" c={COLORS.purple} />
          <Box v={t.hours} l="Hours" c={COLORS.red} />
          <Box v={t.minutes} l="Minutes" c={COLORS.yellow} />
          <Box v={t.seconds} l="Seconds" c={COLORS.green} />
        </div>
      </div>
    </section>
  );
}

// ---------- Highlights ----------
function Highlights() {
  // Mobile active item tracking state
  const [mobileIdx, setMobileIdx] = useState(0);

  const items = [
    { I: Trophy, t: "STEM Competitions", d: "Battle the best minds, win exciting prizes, and leave your mark before the globe.", c: COLORS.yellow },
    { I: UserCheck, t: "Expert Presentations", d: "Learn from visionaries. Uncover secrets of the future.", c: COLORS.red },
    { I: Rocket, t: "STEM Solutions", d: "Be amazed by brilliant innovations and sustainable solutions.", c: COLORS.green },
    { I: GraduationCap, t: "Scholarships", d: "Win a University Scholarship to study in the USA — up to 60% tuition.", c: COLORS.purple },
    { I: Globe, t: "Global Stage", d: "Qualify for international stages to showcase your genius.", c: COLORS.yellow },
    { I: Medal, t: "Win Awards", d: "Compete for cash prizes, laptops, recognition, and STEM tools.", c: COLORS.red },
  ];

  // Mobile rotation routine matching Endorsements execution
  useEffect(() => {
    const id = setInterval(() => {
      setMobileIdx((i) => (i + 1) % items.length);
    }, 4500);

    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <AnimatedBackground variant="light" grid={false} />
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle eyebrow="Why Attend" title="Highlights" />
        
        {/* MOBILE CAROUSEL WITH PRECISE CHEVRON POSITIONING */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileIdx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.45 }}
              className="group relative w-full p-7 rounded-2xl bg-white border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] min-h-[220px] overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-1" style={{ background: items[mobileIdx].c }} />
              <span className="inline-flex p-3 rounded-xl mb-4" style={{ background: `${items[mobileIdx].c}22`, color: items[mobileIdx].c }}>
                {React.createElement(items[mobileIdx].I, { size: 26 })}
              </span>
              <h3 className="font-display text-xl font-bold text-black">{items[mobileIdx].t}</h3>
              <p className="mt-2 text-black/60 text-sm leading-relaxed">{items[mobileIdx].d}</p>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation Interface Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => setMobileIdx((i) => (i - 1 + items.length) % items.length)}
              className="p-2 rounded-full border border-black/10 hover:bg-black hover:text-white transition text-black"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    mobileIdx === i ? "w-8" : "w-3 bg-black/20"
                  }`}
                  style={mobileIdx === i ? { background: items[i].c } : undefined}
                />
              ))}
            </div>

            <button
              onClick={() => setMobileIdx((i) => (i + 1) % items.length)}
              className="p-2 rounded-full border border-black/10 hover:bg-black hover:text-white transition text-black"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ I, t, d, c }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative p-7 rounded-2xl bg-white border border-black/5 hover:border-transparent shadow-sm hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-1 scale-x-0 group-hover:scale-x-100 origin-left transition-transform" style={{ background: c }} />
              <span className="inline-flex p-3 rounded-xl mb-4" style={{ background: `${c}22`, color: c }}>
                <I size={26} />
              </span>
              <h3 className="font-display text-xl font-bold text-black">{t}</h3>
              <p className="mt-2 text-black/60">{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Competition Areas ----------
function CompetitionAreas() {
  const areas = [
    { I: Cpu, t: "AI & Robotics", img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=900&q=80" },
    { I: Code, t: "Software Dev", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80" },
    { I: Wifi, t: "IoT & Electronics", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80" },
    { I: Gamepad2, t: "Animation & Game Development", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80" },
    { I: Plane, t: "Drone Tech", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80" },
    { I: Link2, t: "Blockchain", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&q=80" },
  ];
  return (
    <section id="competitions" className="relative py-24 bg-white overflow-hidden">
      <AnimatedBackground variant="light" grid={false} />
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle eyebrow="Pick Your Arena" title="Competition Areas" sub="Choose your tech battlefield and compete in cutting-edge technology categories" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map(({ I, t, img }, i) => {
            const gradients = [
              `linear-gradient(135deg, ${COLORS.red}, ${COLORS.purple})`,
              `linear-gradient(135deg, ${COLORS.yellow}, ${COLORS.red})`,
              `linear-gradient(135deg, ${COLORS.green}, ${COLORS.purple})`,
              `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.red})`,
              `linear-gradient(135deg, ${COLORS.red}, ${COLORS.yellow})`,
              `linear-gradient(135deg, ${COLORS.green}, ${COLORS.yellow})`,
            ];
            const g = gradients[i % gradients.length];
            return (
            <motion.div
              key={t}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative p-7 rounded-2xl border border-black/5 overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all min-h-[280px] flex flex-col justify-end shadow-md"
            >
              <img
                src={img}
                alt={t}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="relative">
              <span
                className="inline-flex p-3 rounded-xl mb-4 text-white"
                style={{ background: g }}
              >
                <I size={26} />
              </span>
              <h3 className="font-display text-xl font-bold text-white">{t}</h3>
              <p className="mt-2 text-white/85 text-sm">Build your solution for Agriculture, Education, or Health and compete to shape the future.</p>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- Endorsements / Testimonials carousel ----------
function Endorsements() {
  const items = [
    {
      n: "Dr. Adaeze Okonkwo",
      r: "Director, NDDC Innovation Hub",
      q: "STEM Festival is the most ambitious youth-tech movement the continent has seen in a decade.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    },
    {
      n: "Prof. Daniel Iwu",
      r: "Anna Maria College, USA",
      q: "Their finalists arrive in the US already thinking like founders. Genuinely world-class talent.",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    },
    {
      n: "Tomi Bello",
      r: "CTO, Qolrobotics",
      q: "We hire from STEM Festival every year. The bar keeps rising.",
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
    },
    {
      n: "Amara Eze",
      r: "2025 Overall Champion",
      q: "I walked in with an idea. I walked out with a scholarship and a co-founder.",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    },
    {
      n: "Engr. Musa Yakubu",
      r: "Nigeria Computer Society",
      q: "A national asset. Every government should be paying attention.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
  ];

  const [idx, setIdx] = useState(0);
  const [mobileIdx, setMobileIdx] = useState(0);

  // Desktop rotation
  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, 5000);

    return () => clearInterval(id);
  }, [items.length]);

  // Mobile auto carousel
  useEffect(() => {
    const id = setInterval(() => {
      setMobileIdx((i) => (i + 1) % items.length);
    }, 4500);

    return () => clearInterval(id);
  }, [items.length]);

  const visible = [
    items[idx % items.length],
    items[(idx + 1) % items.length],
    items[(idx + 2) % items.length],
  ];

  return (
    <section
      id="endorsements"
      className="relative py-24 bg-white overflow-hidden"
    >
      <AnimatedBackground variant="light" />

      <div className="container mx-auto px-6 relative z-10">

        <SectionTitle
          eyebrow="Endorsements"
          title="Trusted By The Best"
          sub="What leaders, partners, and champions are saying"
        />

        {/* MOBILE */}
        <div className="md:hidden relative">

          <AnimatePresence mode="wait">
            <motion.div
              key={mobileIdx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl bg-white border border-black/5 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] min-h-[280px]"
            >
              <Quote
                size={30}
                style={{ color: COLORS.red }}
                className="opacity-40"
              />

              <p className="mt-4 text-sm leading-relaxed text-black/80">
                "{items[mobileIdx].q}"
              </p>

              <div className="mt-6 flex items-center gap-3">

                <img
                  src={items[mobileIdx].img}
                  alt={items[mobileIdx].n}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <div className="font-bold text-black text-sm">
                    {items[mobileIdx].n}
                  </div>

                  <div className="text-xs text-black/60">
                    {items[mobileIdx].r}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">

            <button
              onClick={() =>
                setMobileIdx(
                  (i) => (i - 1 + items.length) % items.length
                )
              }
              className="p-2 rounded-full border border-black/10 hover:bg-black hover:text-white transition"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    mobileIdx === i
                      ? "w-8"
                      : "w-3 bg-black/20"
                  }`}
                  style={
                    mobileIdx === i
                      ? { background: COLORS.red }
                      : undefined
                  }
                />
              ))}
            </div>

            <button
              onClick={() =>
                setMobileIdx(
                  (i) => (i + 1) % items.length
                )
              }
              className="p-2 rounded-full border border-black/10 hover:bg-black hover:text-white transition"
            >
              <ChevronRight size={18} />
            </button>

          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 min-h-[300px]">

          <AnimatePresence mode="popLayout">

            {visible.map((it, i) => (
              <motion.div
                key={`${idx}-${i}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                }}
                className="relative p-7 rounded-2xl bg-white border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-shadow"
              >
                <Quote
                  size={32}
                  style={{ color: COLORS.red }}
                  className="opacity-40"
                />

                <p className="mt-3 text-black/80 leading-relaxed">
                  "{it.q}"
                </p>

                <div className="mt-6 flex items-center gap-3">

                  <img
                    src={it.img}
                    alt={it.n}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <div className="font-bold text-black">
                      {it.n}
                    </div>

                    <div className="text-xs text-black/60">
                      {it.r}
                    </div>
                  </div>

                </div>

              </motion.div>
            ))}

          </AnimatePresence>

        </div>

        {/* Desktop Controls */}
        <div className="mt-8 hidden md:flex items-center justify-center gap-3">

          <button
            onClick={() =>
              setIdx(
                (i) => (i - 1 + items.length) % items.length
              )
            }
            className="p-2 rounded-full border border-black/10 hover:bg-black hover:text-white transition"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i
                    ? "w-8"
                    : "w-3 bg-black/20"
                }`}
                style={
                  idx === i
                    ? { background: COLORS.red }
                    : undefined
                }
              />
            ))}
          </div>

          <button
            onClick={() =>
              setIdx(
                (i) => (i + 1) % items.length
              )
            }
            className="p-2 rounded-full border border-black/10 hover:bg-black hover:text-white transition"
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>
    </section>
  );
}

// ---------- Age Categories ----------
type AgeCat = {
  t: string;
  a: string;
  s: string;
  team: string;
  areas: string;
  reqs: string;
  tools: string;
  software: string;
  present?: string;
  special?: string;
  prizes?: string;
  c: string;
  I: typeof Sprout;
};

const AGE_CATS: AgeCat[] = [
  {
    t: "Early", a: "8–12 Years", s: "Primary / Basic",
    team: "3 Competitors",
    areas: "AI & Robotics, Software Dev, Animation & Game Development.",
    reqs: "In-school and Out-of-school teams and must be accompanied by a coach.",
    tools: "STEMBoter, LEGO Mindstorms, SPIKE Prime, Scratch, App Inventor, Kodu, etc.",
    software: "Free Choice.",
    c: COLORS.green, I: Sprout,
  },
  {
    t: "Junior", a: "11–15 Years", s: "JSS / Middle",
    team: "3 Competitors",
    areas: "AI & Robotics, Software Dev, Animation & Game Development, Drone Tech.",
    reqs: "In-school and Out-of-school teams and must be accompanied by a coach.",
    tools: "LEGO SPIKE Prime, Arduino, micro:bit, Scratch, MIT App Inventor, Tinkercad.",
    software: "Free Choice.",
    c: COLORS.yellow, I: BookOpen,
  },
  {
    t: "Senior", a: "14–19 Years", s: "SSS / High School",
    team: "3 Competitors",
    areas: "AI & Robotics, Software Dev, Animation & Game Dev, IoT & Electronics, Drone Tech, Blockchain.",
    reqs: "In-school and Out-of-school teams and must be accompanied by a coach.",
    tools: "Arduino, Raspberry Pi, VEX / TETRIX, Fusion 360, Unity, Python, C++.",
    software: "Free Choice.",
    c: COLORS.red, I: GraduationCap,
  },
  {
    t: "Advanced", a: "18–25 Years", s: "University / College",
    team: "2–3 Competitors",
    areas: "AI & Robotics, Software Dev,Animation & Game Dev, IoT & Electronics, Drone Tech, Blockchain.",
    reqs: "University teams or independent innovators with a faculty mentor.",
    tools: "ROS, Jetson Nano, Raspberry Pi, TensorFlow, PyTorch, Solidity, Unity.",
    software: "Free Choice.",
    c: COLORS.purple, I: Brain,
  },
  {
    t: "Expert", a: "25–35 Years", s: "Startups / Tech Hubs",
    team: "2–3 Competitors",
    areas: "AI & Robotics, Software Dev, Animation & Game Dev, IoT & Electronics, Drone Tech, Blockchain.",
    reqs: "Registered startup, tech hub team, or independent professional group.",
    tools: "Full production stack — cloud, edge devices, custom hardware.",
    software: "Free Choice.",
    c: COLORS.red, I: Rocket,
  },
  {
    t: "Pro", a: "35+ Years", s: "Working Professionals",
    team: "2–3 Competitors",
    areas: "AI & Robotics, Software Dev, Animation & Game Dev, IoT & Electronics, Drone Tech, Blockchain.",
    reqs: "Working professionals, researchers, or corporate innovation teams.",
    tools: "Enterprise-grade platforms, industrial robotics, custom pipelines.",
    software: "Free Choice.",
    c: COLORS.green, I: Briefcase,
  },
  {
    t: "Open", a: "All Ages", s: "Open Category / Independent",
    team: "1–3 Innovators",
    areas: "Any STEM discipline — cross-domain projects welcome (AI, Robotics, Software, IoT, Blockchain, Drone Tech, Game Dev).",
    reqs: "Open to participants from any category. Compete individually or in teams as entered into the competition.",
    tools: "Free Choice.",
    software: "Free Choice.",
    present: "Deliver an excellent presentation and practical demonstration of your solution before an energetic audience and judges. Solutions must be related to the year's focus on Agriculture, Education, Health ready for market consumption, with significant economic viability.",
    special: "The Best 10 competition projects will be selected by the Chief Judge in collaboration with the lead judges to vie for the Overall Star Award.",
    prizes: "the title of Best STEM Solution of the Year. The Grand Prize Winner will be determined by votes from the competition judges, elite attendees and dignitaries of STEM Festival.",
    c: COLORS.purple, I: Sparkles,
  },
];

function AgeCard({ cat, index, tickIdx }: { cat: AgeCat; index: number; tickIdx: number }) {
  const { t, a, s, team, areas, reqs, tools, software, c, I } = cat;
  const facts = [
    { k: "Team", v: team },
    { k: "Competition Areas", v: areas },
    { k: "Participation", v: reqs },
    { k: "Design Tools", v: tools },
    { k: "Software", v: software },
  ];
  const current = facts[tickIdx % facts.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group relative rounded-2xl bg-white border border-black/5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden p-6 flex flex-col"
    >
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: c }} />
      <div
        className="absolute -top-20 -right-20 h-52 w-52 rounded-full blur-3xl opacity-20"
        style={{ background: c }}
      />
      <div className="relative flex items-center justify-between">
        <span className="inline-flex p-3 rounded-xl" style={{ background: `${c}22`, color: c }}>
          <I size={24} />
        </span>
        <span className="text-[10px] uppercase tracking-[0.25em] font-bold" style={{ color: c }}>
          0{index + 1}
        </span>
      </div>
      <h3 className="font-display mt-5 text-2xl font-black text-black">{t}</h3>
      <p className="mt-1 font-mono-num font-bold text-black/80 text-base">{a}</p>
      <p className="mt-0.5 text-xs text-black/55">{s}</p>

      {/* Animated ticker: cross-fade + slight vertical slide, cycles through facts */}
      <div className="relative mt-5 pt-4 border-t border-black/5 min-h-[92px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.k}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <p className="text-[10px] uppercase tracking-[0.22em] font-bold" style={{ color: c }}>
              {current.k}
            </p>
            <p className="mt-1.5 text-sm text-black/80 leading-snug line-clamp-3">
              {current.v}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="absolute right-0 bottom-0 flex gap-1">
          {facts.map((_, i) => (
            <span
              key={i}
              className="h-1 w-1 rounded-full transition-all"
              style={{
                background: i === tickIdx % facts.length ? c : "rgba(0,0,0,0.15)",
                width: i === tickIdx % facts.length ? 10 : 4,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AgeCategories() {
  const [tickIdx, setTickIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTickIdx((n) => n + 1), 4200);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="ages" className="relative py-24 bg-white overflow-hidden">
      <AnimatedBackground variant="light" grid={false} />
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle
          eyebrow="For Every Age"
          title="Age Categories"
          sub="Details rotate through each card — team size, competition areas, requirements, tools and software."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGE_CATS.map((cat, i) => (
            <AgeCard key={cat.t} cat={cat} index={i} tickIdx={tickIdx} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Awards & Prizes ----------
function AwardsPrizes() {
  const items = [
    {
      t: "Win a Scholarship",
      d: "Scholarship support to study in the Oversees.",
      c: COLORS.yellow,
      I: GraduationCap,
    },
    {
      t: "Best Solution of the Year",
      d: "Win the prestigious title for the most innovative solution.",
      c: COLORS.red,
      I: Lightbulb,
    },
    {
      t: "Category Champion",
      d: "Earn the title of Overall Champion in your category.",
      c: COLORS.green,
      I: Trophy,
    },
    {
      t: "Certificate of Participation",
      d: "Receive a world-class certificate recognising your achievement.",
      c: COLORS.purple,
      I: Medal,
    },
  ];

  return (
    <section
      id="awards"
      className="relative py-24 bg-black overflow-hidden"
    >
      <AnimatedBackground variant="dark" />

      <div className="container mx-auto px-6 relative z-10">

        <SectionTitle
          eyebrow="Recognition & Rewards"
          title="Awards & Prizes"
          sub="Honor, opportunity, and a launchpad for what comes next."
          dark
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {items.map(({ t, d, c, I }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative p-7 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div
                className="absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                style={{ background: c }}
              />

              <span
                className="relative inline-flex p-3 rounded-xl text-white"
                style={{
                  background: `linear-gradient(135deg, ${c}, ${COLORS.purple})`,
                }}
              >
                <I size={26} />
              </span>
              <h3 className="relative font-display mt-5 text-xl font-bold text-white">
                {t}
              </h3>
              <p className="relative mt-2 text-white/70 text-sm leading-relaxed">
                {d}
              </p>
            </motion.div>
          ))}

        </div>

        {/* See More Button */}
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.35 }} className="mt-12 flex justify-center"
        >
          <button
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10
              bg-white/5 text-white/85 text-sm font-medium hover:bg-white hover:text-black transition-all
              duration-300 backdrop-blur-sm
            "
          >
            <span>See More</span>
            <ChevronRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>

      </div>
    </section>
  );
}

// ---------- Get Involved with action buttons ----------
function GetInvolved() {
  // Mobile index tracking state
  const [mobileIdx, setMobileIdx] = useState(0);

  const opts = [
    { I: Users, t: "Compete", d: "Join as a competitor.", c: COLORS.yellow, slug: "team", cta: "Register" },
    { I: UserCheck, t: "Attend", d: "Witness the innovation live.", c: COLORS.yellow, slug: "attendee", cta: "Get Pass" },
    { I: Heart, t: "Volunteer", d: "Power the event behind the scenes.", c: COLORS.yellow, slug: "volunteer", cta: "Apply" },
    { I: Briefcase, t: "Exhibit", d: "Showcase your products.", c: COLORS.yellow, slug: "exhibitor", cta: "Reserve Booth" },
    { I: Award, t: "Judge", d: "Evaluate the next breakthrough.", c: COLORS.yellow, slug: "judge", cta: "Become a Judge" },
    { I: Handshake, t: "Partner / Sponsor", d: "Support the future of STEM.", c: COLORS.yellow, slug: "sponsor", cta: "Talk to Us" },
    { I: Store, t: "Vendors", d: "Sell to thousands of attendees on-site.", c: COLORS.yellow, slug: "vendor", cta: "Become a Vendor" },
    { I: Megaphone, t: "Advertise", d: "Reach Africa's most engaged STEM audience.", c: COLORS.yellow, slug: "advertiser", cta: "Advertise With Us" },
    { I: Mic, t: "Speak", d: "Join as a speaker, facilitator or a panelist.", c: COLORS.yellow, slug: "speaker", cta: "Register" },
    { I: GraduationCap, t: "Coach", d: "Guide school teams through the competition.", c: COLORS.yellow, slug: "coach", cta: "Become a Coach" },
    { I: Brain, t: "Mentor", d: "Guide the next generation of innovators.", c: COLORS.yellow, slug: "mentor", cta: "Become a Mentor" },
  ];

  // Mobile auto carousel loop matching Endorsements timeline pattern
  useEffect(() => {
    const id = setInterval(() => {
      setMobileIdx((i) => (i + 1) % opts.length);
    }, 4500);

    return () => clearInterval(id);
  }, [opts.length]);

  return (
    <section id="get-involved" className="relative py-24 bg-black overflow-hidden">
      <AnimatedBackground variant="dark" />
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle eyebrow="Join the Movement" title="Get Involved" sub="Multiple ways to be part of this global movement" dark />
        
        {/* MOBILE CAROUSEL WITH PRECISE CHEVRON POSITIONING */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileIdx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.45 }}
            >
              <Link
                to="/register/$category"
                params={{ category: opts[mobileIdx].slug }}
                className="group relative block p-7 rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="inline-flex p-3 rounded-xl mb-4"
                    style={{
                      background: `${opts[mobileIdx].c}33`,
                      color: opts[mobileIdx].c,
                    }}
                  >
                    {React.createElement(opts[mobileIdx].I, { size: 24 })}
                  </span>

                  <ArrowRight className="text-white/40" />
                </div>

                <h3 className="font-display text-xl font-bold text-white">
                  {opts[mobileIdx].t}
                </h3>

                <p className="mt-1 text-white/60 text-sm">
                  {opts[mobileIdx].d}
                </p>

                <span
                  className="mt-5 inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${opts[mobileIdx].c}, ${COLORS.purple})`,
                  }}
                >
                  {opts[mobileIdx].cta}
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation Interface Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => setMobileIdx((i) => (i - 1 + opts.length) % opts.length)}
              className="p-2 rounded-full border border-white/10 hover:bg-white hover:text-black transition text-white"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2 flex-wrap justify-center max-w-[60%]">
              {opts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    mobileIdx === i ? "w-8" : "w-3 bg-white/20"
                  }`}
                  style={mobileIdx === i ? { background: COLORS.red } : undefined}
                />
              ))}
            </div>

            <button
              onClick={() => setMobileIdx((i) => (i + 1) % opts.length)}
              className="p-2 rounded-full border border-white/10 hover:bg-white hover:text-black transition text-white"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {opts.map(({ I, t, d, c, slug, cta }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to="/register/$category"
                params={{ category: slug }}
                className="group relative p-7 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all overflow-hidden flex flex-col h-full"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex p-3 rounded-xl mb-4" style={{ background: `${c}33`, color: c }}>
                    <I size={24} />
                  </span>
                  <ArrowRight className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">{t}</h3>
                <p className="mt-1 text-white/60 text-sm flex-1">{d}</p>
                <span
                  className="mt-5 inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${c}, ${COLORS.purple})` }}
                >
                  {cta}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Final CTA ----------
function SponsorsLoader() {
  return (
    <section className="relative py-10 bg-black border-y border-white/10 overflow-hidden">
      <div className="container mx-auto px-6 mb-4 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Partners & Supporters</p>
        <div className="hidden sm:block flex-1 mx-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="w-32 h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full animate-progress" style={{ background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.yellow}, ${COLORS.red})` }} />
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-black to-transparent" />
        {/* <div className="flex gap-12 animate-scroll-x w-max" style={{ animationDirection: "reverse" }}> */}
        <div className="flex gap-12 animate-scroll-x hover:[animation-play-state:paused] w-max">
          {[...sponsors, ...sponsors].map((p, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors min-w-[200px]">
              <img src={p.logo} alt={p.name} className="h-8 w-8 object-contain rounded bg-white/90 p-1" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              <span className="text-white/80 font-semibold whitespace-nowrap">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// function FAQ() {
//   const faqs = [
//     { q: "When and where is STEM Festival 2026?", a: `July 22-25, 2026 at ${LOCATION}.` },
//     { q: "Who can participate?", a: "Innovators aged 8 to 40+, individually or in teams, from anywhere in the world." },
//     { q: "How much does it cost to attend?", a: "Attendee passes are affordable; competitors register per category. Visit the Register section for details." },
//     { q: "What categories can I compete in?", a: "AI & Robotics, Software Development, IoT & Electronics, Animation & Game Developmenet, Drone Tech, and Blockchain." },
//     { q: "Are there scholarships?", a: "Yes — winners can earn university scholarships in the USA up to 60% tuition, plus cash, laptops, and STEM tools." },
//     { q: "Can my company sponsor or exhibit?", a: "Absolutely. Reach out via the Partner, Vendor, or Advertise options in Get Involved." },
//   ];
//   const [open, setOpen] = useState<number | null>(0);
//   return (
//     <section id="faq" className="relative py-24 bg-white overflow-hidden">
//       <AnimatedBackground variant="light" />
//       <div className="container mx-auto px-6 relative z-10 max-w-3xl">
//         <SectionTitle eyebrow="Need Answers?" title="Frequently Asked Questions" />
//         <div className="space-y-3">
//           {faqs.map((f, i) => {
//             const isOpen = open === i;
//             return (
//               <div key={i} className={`rounded-2xl border transition-all ${isOpen ? "border-transparent shadow-xl" : "border-black/10"}`}>
//                 <button
//                   onClick={() => setOpen(isOpen ? null : i)}
//                   className="w-full flex items-center justify-between gap-4 p-5 text-left"
//                 >
//                   <span className="flex items-center gap-3">
//                     <HelpCircle size={20} style={{ color: COLORS.red }} />
//                     <span className="font-display font-bold text-black text-base md:text-lg">{f.q}</span>
//                   </span>
//                   <span className="shrink-0 w-8 h-8 grid place-items-center rounded-full text-white" style={{ background: isOpen ? COLORS.red : COLORS.purple }}>
//                     {isOpen ? <Minus size={16} /> : <Plus size={16} />}
//                   </span>
//                 </button>
//                 <AnimatePresence initial={false}>
//                   {isOpen && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="overflow-hidden"
//                     >
//                       <p className="px-5 pb-5 text-black/70 leading-relaxed">{f.a}</p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


// ---------- Footer (white) ----------
type FooterLink = { label: string; href: string };
type FooterGroup = { title: string; links: FooterLink[] };

const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: "Competition",
    links: [
      { label: "Early Category", href: "/register/team" },
      { label: "Junior Category", href: "/register/team" },
      { label: "Senior Category", href: "/register/team" },
      { label: "Advanced Category", href: "/register/team" },
      { label: "Expert Category", href: "/register/team" },
      { label: "Pro Category", href: "/register/team" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Legal", href: "#legal" },
      { label: "Rules", href: "#rules" },
      { label: "Schedules", href: "#schedules" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Use", href: "#terms" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Volunteers", href: "/register/volunteer" },
      { label: "Coaches", href: "/register/school" },
      { label: "Judges", href: "/register/judge" },
      { label: "Mentors", href: "/register/judge" },
      { label: "Partners", href: "/register/sponsor" },
      { label: "Organizers", href: "#contact" },
    ],
  },
];

export function Footer() {
  const socials = [FaInstagram, FaXTwitter, FaFacebookF, FaLinkedinIn, FaYoutube, FaTiktok];
  return (
    <footer id="contact" className="relative bg-white text-black overflow-hidden">
       <AnimatedBackground variant="light" />
      <div className="container mx-auto px-6 pt-16 md:pt-20 pb-10 relative z-10">
        {/* Top: brand + newsletter */}
        <div className="grid gap-10 md:gap-14 lg:grid-cols-[1.4fr_1fr] pb-12 md:pb-16">
          <div className="max-w-md">
            <img src={stemLogo} alt="STEM Festival" className="h-12 mb-5" />
            <p className="text-black/60 text-[15px] leading-relaxed">
              Africa's global platform for innovation, creativity, and problem-solving —
              built for the next generation of world-changers.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-black/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} style={{ color: COLORS.red }} className="mt-0.5 shrink-0" />
                <span>Dr. Obi Wali International Conference Centre, Port Harcourt, Nigeria.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} style={{ color: COLORS.green }} /> innovate@stemfestival.org
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} style={{ color: COLORS.yellow }} /> +234 802 420 2720
              </li>
            </ul>
          </div>

          <div className="lg:pl-8">
            <h4 className="font-display font-black text-xl mb-2">Stay in the loop</h4>
            <p className="text-sm text-black/60 mb-5">
              Get festival updates, competition briefs, and partnership news.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-0" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 px-5 py-3 rounded-full sm:rounded-r-none border border-black/10 focus:outline-none focus:border-black text-sm bg-white"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full sm:rounded-l-none text-white font-bold text-sm inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform"
                style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.red})` }}
              >
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
            <div className="mt-6 flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-10 h-10 rounded-full bg-black/5 hover:bg-black hover:text-white flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle: link groups */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-8 py-12 md:py-14">
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title} className={group.title === "Community" ? "col-span-2 md:col-span-1" : ""}>
              <h4 className="font-display font-black text-sm uppercase tracking-[0.2em] mb-5 text-black">
                {group.title}
              </h4>
              <ul className="space-y-3 text-sm text-black/65">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="inline-flex items-center gap-1.5 hover:text-black transition-colors"
                    >
                      <ChevronRight size={12} className="opacity-40" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-black/50">
          <p>© 2024 STEM Festival. All Rights Reserved.</p>
          <div className="flex gap-5">
            <a href="#privacy" className="hover:text-black">Privacy</a>
            <a href="#terms" className="hover:text-black">Terms</a>
            <a href="#rules" className="hover:text-black">Rules</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


// ---------- Partners anchor wrapper for PartnersLoader ----------
function PartnersSection() {
  return (
    <div id="partners">
      <PartnersLoader />
    </div>
  );
}

function Index() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <PartnersSection />
      <About />
      <Highlights />
      <GetInvolved />
      <CompetitionAreas />
      <AwardsPrizes />
      <AgeCategories />
      <Endorsements />
      <SponsorsLoader />
      {/* <FAQ /> */}
      {/* <CTA /> */}
      <Footer />
    </div>
  );
}

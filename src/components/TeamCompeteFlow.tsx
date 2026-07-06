import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Flag, Globe, Sparkles, Wallet, Building2, Copy } from "lucide-react";
import { REG_COLORS } from "@/lib/register-data";

type Origin = "Nigerian Team" | "International Team";

interface Member { fullName: string; dob: string }
interface State {
  origin: Origin | null;
  team: { name: string; org: string; country: string; city: string };
  leader: { fullName: string; email: string; dob: string; phone: string };
  m2: Member;
  m3: Member;
  ageCategory: string;
  competitionArea: string;
  roboticsStage: string;
  innovationSector: string;
  projectName: string;
  projectDescription: string;
  paymentMethod: "" | "Pay Now" | "Pay Later";
  paymentOption: "" | "Pay Online" | "Direct Bank Transfer";
}

const emptyState: State = {
  origin: null,
  team: { name: "", org: "", country: "", city: "" },
  leader: { fullName: "", email: "", dob: "", phone: "" },
  m2: { fullName: "", dob: "" },
  m3: { fullName: "", dob: "" },
  ageCategory: "",
  competitionArea: "",
  roboticsStage: "",
  innovationSector: "",
  projectName: "",
  projectDescription: "",
  paymentMethod: "",
  paymentOption: "",
};

const AGE_OPTIONS = [
  "Elementary (8–12)",
  "Junior (11–15)",
  "Senior (14–19)",
  "Advanced (18–25)",
  "Expert (25–35)",
  "Pro (35+)",
];

const ELEMENTARY_AREAS = ["AI & Robotics", "Code Mission", "Animation/Game Dev"];
const JUNIOR_AREAS = [...ELEMENTARY_AREAS, "Drone Mission"];
const FULL_AREAS = [
  "AI & Robotics",
  "Code Mission (Software)",
  "Animation/Game Dev",
  "Iot & Electronics",
  "Drone Tech",
  "Blockchain",
];

const INNOVATION_SECTORS = [
  "Agriculture",
  "Education",
  "Health",
];

function areasFor(age: string): string[] {
  if (age.startsWith("Elementary")) return ELEMENTARY_AREAS;
  if (age.startsWith("Junior")) return JUNIOR_AREAS;
  if (!age) return [];
  return FULL_AREAS;
}

function roboticsStagesFor(age: string): string[] | null {
  if (age.startsWith("Elementary") || age.startsWith("Junior")) return ["RoboMission (WRO)", "Future Innovators (WRO)"];
  if (age.startsWith("Senior")) return ["RoboMission (WRO)", "Future Innovators (WRO)", "Future Engineering (WRO)"];
  return null; // Advanced / Expert / Pro → hidden
}

const STORAGE_KEY = "stem-reg:team-compete";

export default function TeamCompeteFlow({ accent = REG_COLORS.red }: { accent?: string }) {
  const [state, setState] = useState<State>(emptyState);
  const [step, setStep] = useState(0); // 0 = origin selection, 1..5 = form steps, 6 = success
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedAt, setSavedAt] = useState<number | null>(null);

  // Autosave load
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed.state) setState(parsed.state);
      if (typeof parsed.step === "number") setStep(parsed.step);
      if (parsed.savedAt) setSavedAt(parsed.savedAt);
    } catch {}
  }, []);

  // Autosave write
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (step === 6) return;
    const t = setTimeout(() => {
      const payload = { state, step, savedAt: Date.now() };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        setSavedAt(payload.savedAt);
      } catch {}
    }, 400);
    return () => clearTimeout(t);
  }, [state, step]);

  const totalSteps = 5;
  const progress = step === 0 ? 0 : ((Math.min(step, totalSteps) - 0) / totalSteps) * 100;

  const areas = useMemo(() => areasFor(state.ageCategory), [state.ageCategory]);
  const roboStages = useMemo(() => roboticsStagesFor(state.ageCategory), [state.ageCategory]);
  const showRobotics = state.competitionArea === "AI & Robotics" && roboStages !== null;

  // Reset competition area if age changes and current area no longer valid.
  useEffect(() => {
    if (state.competitionArea && !areas.includes(state.competitionArea)) {
      setState((s) => ({ ...s, competitionArea: "", roboticsStage: "" }));
    }
  }, [state.ageCategory]); // eslint-disable-line

  useEffect(() => {
    if (!showRobotics && state.roboticsStage) {
      setState((s) => ({ ...s, roboticsStage: "" }));
    }
  }, [showRobotics]); // eslint-disable-line

  function set<K extends keyof State>(key: K, value: State[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }
  function patch(key: keyof State, sub: Record<string, string>) {
    setState((s) => ({ ...s, [key]: { ...(s[key] as object), ...sub } }));
  }
  function err(id: string) { return errors[id]; }
  function clearErr(id: string) { if (errors[id]) setErrors((e) => ({ ...e, [id]: "" })); }

  function validateCurrent(): boolean {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!state.team.name) e["team.name"] = "Required";
      if (!state.team.org) e["team.org"] = "Required";
      if (!state.team.country) e["team.country"] = "Required";
      if (!state.team.city) e["team.city"] = "Required";
    }
    if (step === 2) {
      if (!state.leader.fullName) e["leader.fullName"] = "Required";
      if (!state.leader.email) e["leader.email"] = "Required";
      else if (!/^\S+@\S+\.\S+$/.test(state.leader.email)) e["leader.email"] = "Invalid email";
      if (!state.leader.dob) e["leader.dob"] = "Required";
      if (!state.leader.phone) e["leader.phone"] = "Required";
      if (!state.m2.fullName) e["m2.fullName"] = "Required";
      if (!state.m2.dob) e["m2.dob"] = "Required";
      if (!state.m3.fullName) e["m3.fullName"] = "Required";
      if (!state.m3.dob) e["m3.dob"] = "Required";
    }
    if (step === 3) {
      if (!state.ageCategory) e["ageCategory"] = "Required";
      if (!state.competitionArea) e["competitionArea"] = "Required";
      if (showRobotics && !state.roboticsStage) e["roboticsStage"] = "Required";
    }
    if (step === 4) {
      if (!state.innovationSector) e["innovationSector"] = "Required";
      if (!state.projectName) e["projectName"] = "Required";
      if (!state.projectDescription) e["projectDescription"] = "Required";
    }
    if (step === 5) {
      if (!state.paymentMethod) e["paymentMethod"] = "Required";
      if (state.paymentMethod === "Pay Now" && !state.paymentOption) e["paymentOption"] = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (step >= 1 && step <= 5 && !validateCurrent()) return;
    if (step === 5) {
      setStep(6);
      try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
      return;
    }
    setStep(step + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function back() { if (step > 0) setStep(step - 1); }

  function reset() {
    setState(emptyState);
    setStep(0);
    setErrors({});
    try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  // ---- UI helpers ----
  const inputBase = "w-full px-4 py-3 rounded-xl bg-black/40 border text-white placeholder:text-white/30 focus:outline-none transition-colors";
  const ring = (id: string) => (err(id) ? "border-red-400" : "border-white/10 focus:border-white/40");

  const stepTitles = ["Team Origin", "Team Information", "Team Members", "Competition & Category", "Project Details", "Registration Fees & Payment"];

  return (
    <div>
      {/* Progress */}
      {step !== 6 && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-white/60 font-semibold uppercase tracking-wider">
            <span>{step === 0 ? "Start" : `Step ${step} of ${totalSteps}`}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${accent}, #fff)` }}
            />
          </div>
          <div className="mt-3 flex gap-2 flex-wrap">
            {stepTitles.map((t, i) => (
              <span
                key={t}
                className={`text-[11px] px-3 py-1 rounded-full border ${
                  i === step
                    ? "bg-white text-black border-white"
                    : i < step
                    ? "bg-white/10 text-white border-white/20"
                    : "bg-transparent text-white/40 border-white/10"
                }`}
              >
                {i}. {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-10 shadow-[0_20px_80px_-20px_rgba(228,0,102,0.25)]">
        <AnimatePresence mode="wait">
          {/* STEP 0 — Origin */}
          {step === 0 && (
            <motion.div key="origin" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <div className="text-center max-w-xl mx-auto">
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/60">
                  <Sparkles size={12} style={{ color: accent }} /> Begin your registration
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-black mt-3">Where is your team from?</h2>
                <p className="mt-3 text-white/70">Innovation knows no borders. Tell us where your team is registering from.</p>
              </div>
              <div className="mt-8 grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
                {(["Nigerian Team", "International Team"] as Origin[]).map((o) => {
                  const active = state.origin === o;
                  const Icon = o === "Nigerian Team" ? Flag : Globe;
                  return (
                    <button
                      key={o}
                      onClick={() => set("origin", o)}
                      className={`group relative rounded-2xl p-6 text-left border transition-all hover:-translate-y-1 ${
                        active ? "border-white/60 bg-white/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                      }`}
                    >
                      <span className="inline-flex p-3 rounded-xl" style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}>
                        <Icon size={22} />
                      </span>
                      <h3 className="font-display text-xl font-bold mt-4 text-white">{o}</h3>
                      <p className="mt-1 text-sm text-white/60">
                        {o === "Nigerian Team" ? "Register your Nigerian team and get ready to compete, innovate, and excel." : "Register your international team and join innovators from around the world."}
                      </p>
                      {active && (
                        <span className="absolute top-4 right-4 inline-flex h-6 w-6 items-center justify-center rounded-full" style={{ background: accent }}>
                          <Check size={14} className="text-white" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  disabled={!state.origin}
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-white text-sm font-bold hover:-translate-y-0.5 transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: `linear-gradient(135deg, ${accent}, #41065F)` }}
                >
                  Continue <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1 — Team Info */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <StepHeader n={1} title="Team Information" desc="Tell us who you are and where you're based." accent={accent} />
              <div className="mt-6 grid sm:grid-cols-2 gap-5">
                <FieldWrap label="Team Name" required error={err("team.name")}>
                  <input className={`${inputBase} ${ring("team.name")}`} value={state.team.name}
                    onChange={(e) => { patch("team", { name: e.target.value }); clearErr("team.name"); }}
                    placeholder="The Innovators" />
                </FieldWrap>
                <FieldWrap label="School / Organization" required error={err("team.org")}>
                  <input className={`${inputBase} ${ring("team.org")}`} value={state.team.org}
                    onChange={(e) => { patch("team", { org: e.target.value }); clearErr("team.org"); }} />
                </FieldWrap>
                <FieldWrap label="Country" required error={err("team.country")}>
                  <input className={`${inputBase} ${ring("team.country")}`} value={state.team.country}
                    onChange={(e) => { patch("team", { country: e.target.value }); clearErr("team.country"); }} />
                </FieldWrap>
                <FieldWrap label="City" required error={err("team.city")}>
                  <input className={`${inputBase} ${ring("team.city")}`} value={state.team.city}
                    onChange={(e) => { patch("team", { city: e.target.value }); clearErr("team.city"); }} />
                </FieldWrap>
              </div>
            </motion.div>
          )}

          {/* STEP 2 — Members */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <StepHeader n={2} title="Team Members" desc="Add your team leader and two members." accent={accent} />

              <SubHeading>Team Leader</SubHeading>
              <div className="grid sm:grid-cols-2 gap-5">
                <FieldWrap label="Full Name" required error={err("leader.fullName")}>
                  <input className={`${inputBase} ${ring("leader.fullName")}`} value={state.leader.fullName}
                    onChange={(e) => { patch("leader", { fullName: e.target.value }); clearErr("leader.fullName"); }} />
                </FieldWrap>
                <FieldWrap label="Email" required error={err("leader.email")}>
                  <input type="email" className={`${inputBase} ${ring("leader.email")}`} value={state.leader.email}
                    onChange={(e) => { patch("leader", { email: e.target.value }); clearErr("leader.email"); }} />
                </FieldWrap>
                <FieldWrap label="Date of Birth" required error={err("leader.dob")}>
                  <input type="date" className={`${inputBase} ${ring("leader.dob")}`} value={state.leader.dob}
                    onChange={(e) => { patch("leader", { dob: e.target.value }); clearErr("leader.dob"); }} />
                </FieldWrap>
                <FieldWrap label="Phone Number" required error={err("leader.phone")}>
                  <input type="tel" className={`${inputBase} ${ring("leader.phone")}`} value={state.leader.phone}
                    onChange={(e) => { patch("leader", { phone: e.target.value }); clearErr("leader.phone"); }} placeholder="+234…" />
                </FieldWrap>
              </div>

              <SubHeading>Member 2</SubHeading>
              <div className="grid sm:grid-cols-2 gap-5">
                <FieldWrap label="Full Name" required error={err("m2.fullName")}>
                  <input className={`${inputBase} ${ring("m2.fullName")}`} value={state.m2.fullName}
                    onChange={(e) => { patch("m2", { fullName: e.target.value }); clearErr("m2.fullName"); }} />
                </FieldWrap>
                <FieldWrap label="Date of Birth" required error={err("m2.dob")}>
                  <input type="date" className={`${inputBase} ${ring("m2.dob")}`} value={state.m2.dob}
                    onChange={(e) => { patch("m2", { dob: e.target.value }); clearErr("m2.dob"); }} />
                </FieldWrap>
              </div>

              <SubHeading>Member 3</SubHeading>
              <div className="grid sm:grid-cols-2 gap-5">
                <FieldWrap label="Full Name" required error={err("m3.fullName")}>
                  <input className={`${inputBase} ${ring("m3.fullName")}`} value={state.m3.fullName}
                    onChange={(e) => { patch("m3", { fullName: e.target.value }); clearErr("m3.fullName"); }} />
                </FieldWrap>
                <FieldWrap label="Date of Birth" required error={err("m3.dob")}>
                  <input type="date" className={`${inputBase} ${ring("m3.dob")}`} value={state.m3.dob}
                    onChange={(e) => { patch("m3", { dob: e.target.value }); clearErr("m3.dob"); }} />
                </FieldWrap>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Competition & Category */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <StepHeader n={3} title="Competition & Category" desc="Choose your age category and competition track." accent={accent} />
              <div className="mt-6 grid sm:grid-cols-2 gap-5">
                <FieldWrap label="Age Category" required error={err("ageCategory")}>
                  <select className={`${inputBase} ${ring("ageCategory")}`} value={state.ageCategory}
                    onChange={(e) => { set("ageCategory", e.target.value); clearErr("ageCategory"); }}>
                    <option value="" disabled>Select an age category…</option>
                    {AGE_OPTIONS.map((o) => <option key={o} value={o} className="bg-[#07020F]">{o}</option>)}
                  </select>
                </FieldWrap>
                <FieldWrap label="Competition Area" required error={err("competitionArea")}>
                  <select
                    className={`${inputBase} ${ring("competitionArea")} disabled:opacity-40`}
                    value={state.competitionArea}
                    disabled={!state.ageCategory}
                    onChange={(e) => { set("competitionArea", e.target.value); clearErr("competitionArea"); }}
                  >
                    <option value="" disabled>{state.ageCategory ? "Select a competition area…" : "Pick an age category first"}</option>
                    {areas.map((o) => <option key={o} value={o} className="bg-[#07020F]">{o}</option>)}
                  </select>
                </FieldWrap>
                {showRobotics && (
                  <FieldWrap label="Robotics Stage" required error={err("roboticsStage")}>
                    <select className={`${inputBase} ${ring("roboticsStage")}`} value={state.roboticsStage}
                      onChange={(e) => { set("roboticsStage", e.target.value); clearErr("roboticsStage"); }}>
                      <option value="" disabled>Select a robotics stage…</option>
                      {(roboStages ?? []).map((o) => <option key={o} value={o} className="bg-[#07020F]">{o}</option>)}
                    </select>
                  </FieldWrap>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 4 — Project */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <StepHeader n={4} title="Project Details" desc="Tell us about the innovation you're building." accent={accent} />
              <div className="mt-6 grid sm:grid-cols-2 gap-5">
                <FieldWrap label="Innovation Sector" required error={err("innovationSector")}>
                  <select className={`${inputBase} ${ring("innovationSector")}`} value={state.innovationSector}
                    onChange={(e) => { set("innovationSector", e.target.value); clearErr("innovationSector"); }}>
                    <option value="" disabled>Select a sector…</option>
                    {INNOVATION_SECTORS.map((o) => <option key={o} value={o} className="bg-[#07020F]">{o}</option>)}
                  </select>
                </FieldWrap>
                <FieldWrap label="Project Name" required error={err("projectName")}>
                  <input className={`${inputBase} ${ring("projectName")}`} value={state.projectName}
                    onChange={(e) => { set("projectName", e.target.value); clearErr("projectName"); }} />
                </FieldWrap>
                <div className="sm:col-span-2">
                  <FieldWrap label="Project Description" required error={err("projectDescription")}>
                    <textarea rows={5} className={`${inputBase} ${ring("projectDescription")} resize-none`} value={state.projectDescription}
                      onChange={(e) => { set("projectDescription", e.target.value); clearErr("projectDescription"); }}
                      placeholder="What problem does it solve? Who does it serve? How does it work?" />
                  </FieldWrap>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5 — Payment */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <StepHeader n={5} title="Registration Fees & Payment" desc="Confirm your fee and choose how you'd like to pay." accent={accent} />

              <div className="mt-6 rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <span className="inline-flex p-3 rounded-xl" style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}>
                    <Wallet size={22} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-bold">Registration Fee</p>
                    <p className="font-display text-3xl md:text-4xl font-black text-white mt-1">
                      {state.origin === "Nigerian Team" ? "₦15,000" : "$100 USD"}
                    </p>
                    <p className="text-xs text-white/50 mt-1">{state.origin}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-5">
                <FieldWrap label="Payment Method" required error={err("paymentMethod")}>
                  <select className={`${inputBase} ${ring("paymentMethod")}`} value={state.paymentMethod}
                    onChange={(e) => {
                      const v = e.target.value as State["paymentMethod"];
                      setState((s) => ({ ...s, paymentMethod: v, paymentOption: "" }));
                      clearErr("paymentMethod");
                    }}>
                    <option value="" disabled>Choose…</option>
                    <option value="Pay Now" className="bg-[#07020F]">Pay Now</option>
                    <option value="Pay Later" className="bg-[#07020F]">Pay Later</option>
                  </select>
                </FieldWrap>

                {state.paymentMethod === "Pay Now" && (
                  <FieldWrap label="Payment Option" required error={err("paymentOption")}>
                    <select className={`${inputBase} ${ring("paymentOption")}`} value={state.paymentOption}
                      onChange={(e) => { set("paymentOption", e.target.value as State["paymentOption"]); clearErr("paymentOption"); }}>
                      <option value="" disabled>Select an option…</option>
                      <option value="Pay Online" className="bg-[#07020F]">Pay Online</option>
                      <option value="Direct Bank Transfer" className="bg-[#07020F]">Direct Bank Transfer</option>
                    </select>
                  </FieldWrap>
                )}
              </div>

              {state.paymentMethod === "Pay Now" && state.paymentOption === "Direct Bank Transfer" && (
                <BankDetails origin={state.origin!} accent={accent} />
              )}

              {state.paymentMethod === "Pay Later" && (
                <div className="mt-6 rounded-2xl p-5 border border-white/10 bg-white/[0.03] text-sm text-white/70">
                  You'll receive a payment link and reminders by email. Registration is only confirmed after payment is received.
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 6 — Success */}
          {step === 6 && (
            <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
              <div className="mx-auto inline-flex p-5 rounded-full" style={{ background: `${accent}22`, color: accent }}>
                <Check size={36} />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-black mt-5">Team registered!</h2>
              <p className="mt-3 text-white/70 max-w-md mx-auto">
                We've received <strong>{state.team.name || "your team"}</strong>'s registration. A confirmation and next steps are on the way to <strong>{state.leader.email}</strong>.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button onClick={reset} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm">
                  Register another team
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav */}
        {step >= 1 && step <= 5 && (
          <div className="mt-8 flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs text-white/40">
              {savedAt ? `Autosaved · ${new Date(savedAt).toLocaleTimeString()}` : "Your progress saves automatically"}
            </div>
            <div className="flex gap-3">
              <button onClick={back} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-bold">
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={next}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-white text-sm font-bold hover:-translate-y-0.5 transition-transform"
                style={{ background: `linear-gradient(135deg, ${accent}, #41065F)` }}
              >
                {step === 5 ? "Submit registration" : "Continue"} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepHeader({ n, title, desc, accent }: { n: number; title: string; desc: string; accent: string }) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/60">
        <Sparkles size={12} style={{ color: accent }} /> Step {n}
      </span>
      <h2 className="font-display text-2xl md:text-3xl font-bold mt-2">{title}</h2>
      <p className="mt-1 text-white/60">{desc}</p>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-sm uppercase tracking-[0.22em] text-white/70 mt-8 mb-3">{children}</h3>;
}

function FieldWrap({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
        {label} {required && <span style={{ color: REG_COLORS.red }}>*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function BankDetails({ origin, accent }: { origin: Origin; accent: string }) {
  const details = origin === "Nigerian Team"
    ? [
        { k: "Bank", v: "Zenith Bank" },
        { k: "Account Name", v: "STEM Festival Foundation" },
        { k: "Account Number", v: "1311683621" },
        { k: "Currency", v: "NGN" },
      ]
    : [
        { k: "Bank", v: "Standard Chartered" },
        { k: "Account Name", v: "STEM Festival Foundation" },
        { k: "Account Number", v: "0100234567890" },
        { k: "SWIFT / BIC", v: "SCBLNGLA" },
        { k: "Currency", v: "USD" },
      ];

  async function copy(v: string) {
    try { await navigator.clipboard.writeText(v); } catch {}
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="mt-6 rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01]">
      <div className="flex items-center gap-3">
        <span className="inline-flex p-2.5 rounded-lg" style={{ background: `${accent}22`, color: accent }}>
          <Building2 size={20} />
        </span>
        <div>
          <p className="font-display text-lg font-bold text-white">Bank Transfer Details</p>
          <p className="text-xs text-white/60">Transfer the exact registration fee. Use your team name as the payment reference.</p>
        </div>
      </div>
      <div className="mt-5 grid sm:grid-cols-2 gap-3">
        {details.map((d) => (
          <div key={d.k} className="flex items-center justify-between gap-3 rounded-xl bg-black/40 border border-white/10 px-4 py-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 font-bold">{d.k}</p>
              <p className="text-sm text-white truncate">{d.v}</p>
            </div>
            <button onClick={() => copy(d.v)} className="shrink-0 text-white/60 hover:text-white p-1.5 rounded-md hover:bg-white/10">
              <Copy size={14} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

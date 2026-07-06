import { Link, notFound, useNavigate, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Share2, RotateCcw, Sparkles } from "lucide-react";
import { getCategory, type RegField, type RegCategory } from "@/lib/register-data";
import TeamCompeteFlow from "@/components/TeamCompeteFlow";

export const Route = createFileRoute("/register/$category")({
  head: ({ params }) => {
    const cat = getCategory(params.category);
    const title = cat ? `${cat.title} — STEM Festival Registration` : "Register — STEM Festival";
    const desc = cat?.description ?? "Register for STEM Festival.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }) => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    return { cat };
  },
  notFoundComponent: NotFound,
  errorComponent: ({ error }) => (
    <div className="container mx-auto px-6 py-24 text-center text-white">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="mt-2 text-white/70">{error.message}</p>
      <Link to="/register" className="mt-6 inline-block underline">Back to registration</Link>
    </div>
  ),
  component: RegisterCategory,
});

function NotFound() {
  return (
    <div className="container mx-auto px-6 py-24 text-center text-white">
      <h1 className="font-display text-4xl">Registration path not found</h1>
      <p className="mt-3 text-white/70">That participation type doesn't exist.</p>
      <Link to="/register" className="mt-6 inline-block px-5 py-2.5 rounded-full bg-white text-black font-bold">
        See all options
      </Link>
    </div>
  );
}

type FormState = Record<string, string | boolean>;

export function RegisterCategory() {
  const { cat } = Route.useLoaderData() as { cat: RegCategory };
  const navigate = useNavigate();
  const storageKey = `stem-reg:${cat.slug}`;

  const [stepIdx, setStepIdx] = useState(0);
  const [form, setForm] = useState<FormState>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  // Load autosave
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as { form?: FormState; step?: number; savedAt?: number };
        if (parsed.form) setForm(parsed.form);
        if (typeof parsed.step === "number") setStepIdx(Math.min(parsed.step, cat.steps.length - 1));
        if (parsed.savedAt) setSavedAt(parsed.savedAt);
      }
    } catch {}
  }, [storageKey, cat.steps.length]);

  // Autosave
  useEffect(() => {
    if (typeof window === "undefined" || submitted) return;
    const t = setTimeout(() => {
      const payload = { form, step: stepIdx, savedAt: Date.now() };
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(payload));
        setSavedAt(payload.savedAt);
      } catch {}
    }, 400);
    return () => clearTimeout(t);
  }, [form, stepIdx, storageKey, submitted]);

  const step = cat.steps[stepIdx];
  const progress = ((stepIdx + (submitted ? 1 : 0)) / cat.steps.length) * 100;

  function update(id: string, value: string | boolean) {
    setForm((f) => ({ ...f, [id]: value }));
    if (errors[id]) setErrors((e) => ({ ...e, [id]: "" }));
  }

  function validateStep(): boolean {
    const next: Record<string, string> = {};
    for (const f of step.fields) {
      if (!f.required) continue;
      const v = form[f.id];
      if (v === undefined || v === null || v === "" || v === false) {
        next[f.id] = "Required";
      } else if (f.type === "email" && typeof v === "string" && !/^\S+@\S+\.\S+$/.test(v)) {
        next[f.id] = "Enter a valid email";
      } else if (f.type === "tel" && typeof v === "string") {
        const cleaned = v.replace(/[\s\-().]/g, "");
        if (!/^\+?[1-9]\d{7,14}$/.test(cleaned)) {
          const country = typeof form.country === "string" ? form.country : "";
          next[f.id] = country
            ? `Enter a valid ${country} phone number with country code (e.g. +234…)`
            : "Enter a valid phone number with country code (e.g. +234…)";
        }
      } else if (f.type === "url" && typeof v === "string" && v && !/^https?:\/\/\S+\.\S+/.test(v)) {
        next[f.id] = "Enter a valid URL (include https://)";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function next() {
    if (!validateStep()) return;
    if (stepIdx < cat.steps.length - 1) {
      setStepIdx(stepIdx + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSubmitted(true);
      try { window.localStorage.removeItem(storageKey); } catch {}
    }
  }

  function reset() {
    setForm({});
    setStepIdx(0);
    setErrors({});
    setSubmitted(false);
    try { window.localStorage.removeItem(storageKey); } catch {}
  }

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title: cat.title, text: cat.tagline, url }); return; } catch {}
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try { await navigator.clipboard.writeText(url); } catch {}
    }
  }

  const I = cat.icon;
  const dynamicFlow = (cat as RegCategory & { dynamicFlow?: string }).dynamicFlow;

  return (
    <div className="container mx-auto px-6 py-12 md:py-16 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/register" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white">
          <ArrowLeft size={16} /> All registration paths
        </Link>
        <button onClick={share} className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white">
          <Share2 size={14} /> Share this path
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-5">
        <span className="inline-flex p-4 rounded-2xl shrink-0" style={{ background: `${cat.color}22`, color: cat.color, border: `1px solid ${cat.color}55` }}>
          <I size={28} />
        </span>
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/60">
            <Sparkles size={11} style={{ color: cat.color }} /> {cat.group}
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-black mt-1">{cat.title}</h1>
          <p className="mt-2 text-white/70 max-w-2xl">{cat.description}</p>
        </div>
      </motion.div>

      {/* Dynamic bespoke flow (e.g. Compete as a Team) */}
      {dynamicFlow === "team-compete" ? (
        <div className="mt-10">
          <TeamCompeteFlow accent={cat.color} />
        </div>
      ) : (
        <>
      {/* Progress */}
      {!submitted && (
        <div className="mt-10">
          <div className="flex items-center justify-between text-xs text-white/60 font-semibold uppercase tracking-wider">
            <span>Step {stepIdx + 1} of {cat.steps.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${cat.color}, #fff)` }}
            />
          </div>
          <div className="mt-3 flex gap-2 flex-wrap">
            {cat.steps.map((s, i) => (
              <button
                key={s.title}
                onClick={() => i < stepIdx && setStepIdx(i)}
                className={`text-[11px] px-3 py-1 rounded-full border transition-all ${
                  i === stepIdx
                    ? "bg-white text-black border-white"
                    : i < stepIdx
                    ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                    : "bg-transparent text-white/40 border-white/10 cursor-default"
                }`}
              >
                {i + 1}. {s.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Form / Success */}
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-10 shadow-[0_20px_80px_-20px_rgba(228,0,102,0.25)]">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="text-center py-10"
            >
              <div className="mx-auto inline-flex p-5 rounded-full" style={{ background: `${cat.color}22`, color: cat.color }}>
                <Check size={36} />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-black mt-5">You're in!</h2>
              <p className="mt-3 text-white/70 max-w-md mx-auto">
                Thanks for registering as <strong>{cat.title}</strong>. We'll email confirmation and next steps within 24 hours.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm"
                >
                  <RotateCcw size={14} /> Register another
                </button>
                <button
                  onClick={() => navigate({ to: "/register" })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm"
                >
                  Explore other paths <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={stepIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold">{step.title}</h2>
              <p className="mt-1 text-white/60">{step.description}</p>

              <div className="mt-6 grid sm:grid-cols-2 gap-5">
                {step.fields.map((f) => (
                  <FieldRenderer
                    key={f.id}
                    field={f}
                    value={form[f.id]}
                    error={errors[f.id]}
                    onChange={(v) => update(f.id, v)}
                    accent={cat.color}
                  />
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3 flex-wrap">
                <div className="text-xs text-white/40">
                  {savedAt ? `Autosaved · ${new Date(savedAt).toLocaleTimeString()}` : "Your progress saves automatically"}
                </div>
                <div className="flex gap-3">
                  {stepIdx > 0 && (
                    <button
                      onClick={() => setStepIdx(stepIdx - 1)}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-bold"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                  )}
                  <button
                    onClick={next}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-white text-sm font-bold hover:-translate-y-0.5 transition-transform"
                    style={{ background: `linear-gradient(135deg, ${cat.color}, #41065F)` }}
                  >
                    {stepIdx === cat.steps.length - 1 ? "Submit registration" : "Continue"}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
        </>
      )}
    </div>
  );
}

function FieldRenderer({
  field, value, error, onChange, accent,
}: {
  field: RegField;
  value: string | boolean | undefined;
  error?: string;
  onChange: (v: string | boolean) => void;
  accent: string;
}) {
  const base =
    "w-full px-4 py-3 rounded-xl bg-black/40 border text-white placeholder:text-white/30 focus:outline-none transition-colors";
  const ring = error ? "border-red-400" : "border-white/10 focus:border-white/40";
  const full = field.type === "textarea" || field.type === "checkbox" ? "sm:col-span-2" : "";

  return (
    <div className={full}>
      {field.type !== "checkbox" && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
          {field.label} {field.required && <span style={{ color: accent }}>*</span>}
        </label>
      )}
      {field.type === "textarea" ? (
        <textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className={`${base} ${ring} resize-none`}
        />
      ) : field.type === "select" ? (
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} ${ring}`}
        >
          <option value="" disabled>Select an option…</option>
          {field.options?.map((o) => (
            <option key={o} value={o} className="bg-[#07020F]">{o}</option>
          ))}
        </select>
      ) : field.type === "checkbox" ? (
        <label className="inline-flex items-center gap-3 cursor-pointer select-none">
          <span
            className={`h-5 w-5 rounded-md border flex items-center justify-center transition-colors ${
              value ? "" : "border-white/30"
            }`}
            style={value ? { background: accent, borderColor: accent } : {}}
          >
            {value && <Check size={14} className="text-white" />}
          </span>
          <input
            type="checkbox"
            className="sr-only"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="text-sm text-white/80">{field.label}</span>
        </label>
      ) : (
        <input
          type={field.type}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`${base} ${ring}`}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      {field.helper && !error && <p className="mt-1 text-xs text-white/40">{field.helper}</p>}
    </div>
  );
}
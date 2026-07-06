import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { REG_CATEGORIES, REG_GROUPS, REG_COLORS } from "@/lib/register-data";

export const Route = createFileRoute("/register/")({
  component: RegisterLanding,
});

function RegisterLanding() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<string>("All");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return REG_CATEGORIES.filter((c) => {
      if (group !== "All" && c.group !== group) return false;
      if (!needle) return true;
      return (
        c.title.toLowerCase().includes(needle) ||
        c.tagline.toLowerCase().includes(needle) ||
        c.description.toLowerCase().includes(needle) ||
        c.group.toLowerCase().includes(needle)
      );
    });
  }, [q, group]);

  return (
    <div className="container mx-auto px-6 pt-16 pb-24">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-white/70">
          <Sparkles size={12} style={{ color: REG_COLORS.yellow }} /> Registration Portal
        </span>
        <h1 className="font-display mt-5 text-4xl md:text-6xl font-black leading-[1.05]">
          Choose your path into{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(135deg, ${REG_COLORS.red}, ${REG_COLORS.yellow}, ${REG_COLORS.green})` }}
          >
            STEM Festival 2026
          </span>
        </h1>
        <p className="mt-5 text-lg text-white/70 max-w-2xl">
          Compete, Attend, Volunteer, Exhibit, Judge, or Partner. Pick a path below and complete a short multi-step form — your progress autosaves as you go.
        </p>
      </motion.div>

      {/* Controls */}
      <div className="mt-10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="relative md:w-96">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search participation types…"
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none text-sm placeholder:text-white/40"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["All", ...REG_GROUPS] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGroup(g)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
                group === g
                  ? "bg-white text-black border-white"
                  : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c, i) => {
          const I = c.icon;
          return (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.5 }}
            >
              <Link
                to="/register/$category"
                params={{ category: c.slug }}
                className="group relative block h-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all hover:-translate-y-1 hover:border-white/25"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={c.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(180deg, transparent 0%, rgba(7,2,15,0.9) 100%), linear-gradient(135deg, ${c.color}55, transparent)` }}
                  />
                  <span
                    className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold backdrop-blur"
                    style={{ background: `${c.color}33`, color: "white", border: `1px solid ${c.color}66` }}
                  >
                    {c.group}
                  </span>
                  <span
                    className="absolute bottom-3 left-3 inline-flex p-2.5 rounded-xl"
                    style={{ background: `${c.color}EE`, color: "white" }}
                  >
                    <I size={20} />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold text-white">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-white/70 line-clamp-2">{c.tagline}</p>
                  <div className="mt-5 flex items-center justify-between text-sm">
                    <span className="text-white/50">{c.steps.length} quick steps</span>
                    <span className="inline-flex items-center gap-1.5 font-bold" style={{ color: c.color }}>
                      Start <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-white/50">
            No participation types match your search.
          </div>
        )}
      </div>
    </div>
  );
}
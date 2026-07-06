import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import stemLogo from "@/assets/stem-logo.png";
import { Footer, Cubes3D } from "@/routes/index";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — STEM Festival 2026" },
      { name: "description", content: "Register for STEM Festival 2026. Compete, Attend, Volunteer, Exhibit, Judge, Sponsor, or Partner with Africa's premier STEM platform." },
      { property: "og:title", content: "STEM Festival 2026 — Registration Portal" },
      { property: "og:description", content: "Your gateway to STEM Festival 2026. Choose your path and register in minutes." },
    ],
  }),
  component: RegisterShell,
});

function RegisterShell() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white font-body bg-[#07020F]">
      {/* Portal background */}
      <PortalBackdrop />

      {/* Top bar */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-xl bg-black/30">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={stemLogo} alt="STEM Festival" className="h-9 brightness-0 invert" />
            <span className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60 group-hover:text-white/80 transition-colors">
              <span className="h-1 w-1 rounded-full bg-[#FEA82F]" /> Registration Portal
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Main site
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <Outlet />
      </main>

      <div className="relative z-10 mt-10 [&_footer]:py-10 md:[&_footer]:py-14">
        <Footer />
      </div>
    </div>
  );
}

function PortalBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Animated conic gradient core */}
      <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[140vh] w-[140vh] rounded-full opacity-60 blur-3xl animate-portal-spin"
        style={{
          background:
            "conic-gradient(from 0deg, #41065F, #E40066, #FEA82F, #9DC42B, #41065F)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#07020F_70%)]" />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Floating orbs */}
      <div className="absolute top-20 -left-24 h-72 w-72 rounded-full blur-3xl opacity-40 animate-drift"
        style={{ background: "radial-gradient(circle, #E40066, transparent 70%)" }} />
      <div className="absolute bottom-10 -right-24 h-96 w-96 rounded-full blur-3xl opacity-30 animate-drift"
        style={{ background: "radial-gradient(circle, #9DC42B, transparent 70%)", animationDelay: "4s" }} />
      <div className="absolute top-1/2 left-1/3 h-80 w-80 rounded-full blur-3xl opacity-25 animate-drift"
        style={{ background: "radial-gradient(circle, #FEA82F, transparent 70%)", animationDelay: "8s" }} />
    </div>
  );
}
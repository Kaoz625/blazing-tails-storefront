import { Link } from "react-router-dom";
import { useCharacters } from "../context/CharacterContext";
import CharacterCard from "../components/CharacterCard";
import { GROUP_ICONS } from "../types/character";

const GROUPS = ["Creators", "Hustlers", "Students", "Professionals", "Gamers", "Explorers", "Nurturers"];

export default function Home() {
  const { characters, loading } = useCharacters();

  const featured = GROUPS.slice(0, 6)
    .map((group) => characters.find((c) => c.user_group === group && c.model === "Claude Opus"))
    .filter(Boolean) as typeof characters;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-5">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,111,239,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div
            className="inline-block text-xs font-mono px-3 py-1 rounded-full border mb-6"
            style={{
              borderColor: "rgba(124,111,239,0.4)",
              background: "rgba(124,111,239,0.08)",
              color: "rgba(124,111,239,0.9)",
            }}
          >
            84 AI-Generated Characters · Cycle 001
          </div>
          <h1
            className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Wear the
            <br />
            <span
              className="italic"
              style={{
                background: "linear-gradient(90deg, #7c6fef 0%, #4bb8a9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI you vibe with
            </span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            84 unique characters — one for every personality, one for every hustle.
            Each one backed by an AI model, each one made for your world.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/shop"
              className="px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #7c6fef 0%, #5b8dee 100%)",
                color: "white",
              }}
            >
              Browse all characters
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 rounded-xl font-semibold text-sm border transition-all hover:scale-105"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
                background: "transparent",
              }}
            >
              What is Blazing Tails?
            </Link>
          </div>
        </div>
      </section>

      {/* Group filter pills */}
      <section className="px-5 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {GROUPS.map((group) => (
              <Link
                key={group}
                to={`/shop?group=${group}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border transition-all hover:scale-105"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)",
                  background: "var(--card-bg)",
                }}
              >
                <span>{GROUP_ICONS[group]}</span>
                {group}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured characters */}
      <section className="px-5 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-xl font-semibold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Featured characters
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border animate-pulse"
                  style={{ height: "280px", background: "var(--card-bg)", borderColor: "var(--border)" }}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((c) => (
                <CharacterCard key={c.id} character={c} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-block px-8 py-3 rounded-xl font-semibold text-sm border transition-all hover:scale-105"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
                background: "var(--card-bg)",
              }}
            >
              See all 84 characters →
            </Link>
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <section
        className="border-t border-b py-12 px-5"
        style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: "var(--text-tertiary)" }}>
            Every character is
          </p>
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { icon: "🧠", label: "AI-powered", desc: "Built on real model personalities" },
              { icon: "🗽", label: "NYC-rooted", desc: "Every character from the five boroughs" },
              { icon: "✨", label: "Fully disclosed", desc: "AI-generated — transparent by design" },
            ].map(({ icon, label, desc }) => (
              <div key={label}>
                <div className="text-3xl mb-2">{icon}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{label}</div>
                <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5 text-center" style={{ background: "var(--bg)" }}>
        <p className="text-xs max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
          All Blazing Tails characters are 100% AI-generated synthetic personas and are not based
          on any real person's likeness. NY AI Transparency Act (effective June 9, 2026) compliant —
          all synthetic character content includes mandatory disclosure.
        </p>
        <p className="text-xs mt-2" style={{ color: "var(--text-tertiary)", opacity: 0.6 }}>
          © 2026 NYC Tailblazers ·{" "}
          <a href="mailto:nyctailblazers@nyctailblazers.com" style={{ color: "inherit" }}>
            nyctailblazers@nyctailblazers.com
          </a>
        </p>
      </footer>
    </div>
  );
}

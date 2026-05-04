import { useState } from "react";
import { Link } from "react-router-dom";
import { BRANDS, getSfwEditions, getNsfwEditions } from "../data/editions";
import EditionCard from "../components/EditionCard";

interface HomeProps {
  nsfw: boolean;
}

export default function Home({ nsfw }: HomeProps) {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  const allEditions = nsfw ? getNsfwEditions() : getSfwEditions();
  const filtered = activeBrand
    ? allEditions.filter((e) => e.brand === activeBrand)
    : allEditions;

  return (
    <div style={{ backgroundColor: "var(--bg-parchment)", minHeight: "100vh" }}>

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          borderBottom: "1px solid var(--border-warm)",
          padding: "clamp(3rem, 8vw, 6rem) 1.25rem clamp(2.5rem, 6vw, 5rem)",
        }}
      >
        {/* Subtle warm radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(201,100,66,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-overline mb-4" style={{ color: "var(--color-terracotta)" }}>
            NYC Tailblazers · Synthetic Editorial
          </p>

          <h1
            className="font-serif mb-4"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            Blazing Tails
          </h1>

          <p
            className="font-serif"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              fontStyle: "italic",
              color: "var(--text-secondary)",
              marginBottom: "2rem",
              fontWeight: 400,
            }}
          >
            Seven brands. Twenty-eight editions. Every shade of New York City.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#editions"
              className="font-sans font-medium px-8 py-3 rounded-lg transition-all"
              style={{
                backgroundColor: "var(--text-primary)",
                color: "var(--bg-parchment)",
                fontSize: "0.875rem",
                letterSpacing: "0.02em",
              }}
            >
              Browse all {allEditions.length} editions
            </a>
            <a
              href="mailto:nyctailblazers@nyctailblazers.com"
              className="font-sans font-medium px-8 py-3 rounded-lg transition-all border"
              style={{
                borderColor: "var(--border-warm)",
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
              }}
            >
              Wholesale inquiries
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div
        style={{
          borderBottom: "1px solid var(--border-warm)",
          backgroundColor: "var(--bg-ivory)",
        }}
      >
        <div className="max-w-4xl mx-auto px-5 py-5 flex flex-wrap justify-center gap-10">
          {[
            { value: "28", label: "Total editions" },
            { value: "168", label: "Performers" },
            { value: "7", label: "Brands" },
            { value: "$22.99", label: "Starting price" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="font-serif"
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 500,
                  color: "var(--color-terracotta)",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                className="text-overline mt-1"
                style={{ color: "var(--text-tertiary)", fontSize: "0.55rem" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand filter */}
      <div className="max-w-7xl mx-auto px-5 pt-8 pb-4">
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setActiveBrand(null)}
            className="font-sans font-medium text-xs px-4 py-1.5 rounded-full transition-all"
            style={
              activeBrand === null
                ? {
                    backgroundColor: "var(--text-primary)",
                    color: "var(--bg-parchment)",
                  }
                : {
                    backgroundColor: "var(--border-cream)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-warm)",
                  }
            }
          >
            All ({allEditions.length})
          </button>
          {BRANDS.map((brand) => {
            const count = allEditions.filter((e) => e.brand === brand).length;
            const isActive = activeBrand === brand;
            return (
              <button
                key={brand}
                onClick={() => setActiveBrand(isActive ? null : brand)}
                className="font-sans font-medium text-xs px-4 py-1.5 rounded-full transition-all"
                style={
                  isActive
                    ? {
                        backgroundColor: "var(--color-terracotta)",
                        color: "#fff",
                      }
                    : {
                        backgroundColor: "var(--border-cream)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-warm)",
                      }
                }
              >
                {brand} ({count})
              </button>
            );
          })}
          <span
            className="font-sans text-xs ml-auto hidden sm:block"
            style={{ color: "var(--text-tertiary)" }}
          >
            {nsfw ? "NSFW editions" : "SFW editions"} · toggle at top right
          </span>
        </div>
      </div>

      {/* Edition grid */}
      <section id="editions" className="max-w-7xl mx-auto px-5 pb-20">
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 180px), 1fr))",
          }}
        >
          {filtered.map((edition, i) => (
            <div
              key={edition.id}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <EditionCard edition={edition} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            className="text-center py-20 font-serif"
            style={{ color: "var(--text-tertiary)", fontSize: "1.1rem", fontStyle: "italic" }}
          >
            No editions in this brand yet.
          </div>
        )}
      </section>

      {/* Dark editorial band */}
      <section
        style={{
          backgroundColor: "var(--bg-near-black)",
          padding: "4rem 1.25rem",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-overline mb-4"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            About Blazing Tails
          </p>
          <h2
            className="font-serif mb-4"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 500,
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.2,
            }}
          >
            100% AI-generated synthetic characters.
            <br />
            Zero real people. All New York soul.
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.4)",
              maxWidth: "560px",
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}
          >
            Every performer in Blazing Tails is a fully synthetic AI-generated character.
            Seven brand lines. Paired SFW and NSFW editions for every issue.
            New content monthly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {BRANDS.map((brand) => (
              <Link
                key={brand}
                to={`/category/${brand.toLowerCase()}`}
                className="font-sans font-medium text-xs px-5 py-2 rounded-lg transition-all"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border-warm)",
          backgroundColor: "var(--bg-ivory)",
          padding: "2rem 1.25rem",
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="font-sans text-xs leading-relaxed mb-2"
            style={{ color: "var(--text-warm-silver)" }}
          >
            All Blazing Tails performers are 100% AI-generated synthetic characters and are not
            based on any real person's likeness. NY AI Transparency Act (effective June 9, 2026)
            compliant — all synthetic performer advertising includes mandatory disclosure.
            Adults 18+ only.
          </p>
          <p
            className="font-sans text-xs"
            style={{ color: "var(--text-warm-silver)", opacity: 0.6 }}
          >
            © 2026 NYC Tailblazers ·{" "}
            <a
              href="mailto:nyctailblazers@nyctailblazers.com"
              style={{ color: "inherit" }}
            >
              nyctailblazers@nyctailblazers.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

import { Link } from "react-router-dom";
import { CATEGORIES, EDITIONS } from "../data/editions";
import MagazineGrid from "../components/MagazineGrid";

interface HomeProps {
  nsfw: boolean;
}

export default function Home({ nsfw }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-yellow-500 text-xs tracking-[0.4em] uppercase font-bold mb-4">
            NYC's Premier Adult Magazine
          </p>
          <h1 className="text-5xl md:text-7xl font-black leading-none mb-4">
            <span className="text-white">Blazing</span>{" "}
            <span className="text-yellow-400">Tails</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            14 exclusive editions. 84 performers. Every shade of New York City.
            100% AI-generated synthetic characters.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#editions"
              className="px-8 py-3 rounded-lg bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-colors"
            >
              Browse All 14 Editions
            </a>
            <a
              href="mailto:nyctailblazers@nyctailblazers.com"
              className="px-8 py-3 rounded-lg border border-yellow-500/40 text-yellow-400 font-bold hover:bg-yellow-500/10 transition-colors"
            >
              Wholesale Inquiries
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y border-white/5 bg-gray-900/50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-8">
          {[
            { value: "14", label: "Editions" },
            { value: "84", label: "Performers" },
            { value: "7", label: "Categories" },
            { value: "$22.99", label: "Starting price" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-yellow-400 font-black text-2xl">{s.value}</div>
              <div className="text-gray-500 text-xs uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories nav */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <Link
            to="/"
            className="px-4 py-1.5 rounded-full text-sm bg-yellow-500 text-black font-semibold"
          >
            All ({EDITIONS.length})
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase()}`}
              className="px-4 py-1.5 rounded-full text-sm border border-white/10 text-gray-400 hover:border-yellow-500/40 hover:text-yellow-400 transition-colors"
            >
              {cat} (2)
            </Link>
          ))}
        </div>
      </div>

      {/* Edition grid */}
      <section id="editions" className="max-w-7xl mx-auto px-4 pb-16">
        <MagazineGrid nsfw={nsfw} />
      </section>

      {/* Disclosure footer */}
      <footer className="border-t border-white/5 bg-gray-900/30 py-8 px-4 text-center">
        <p className="text-gray-600 text-xs max-w-2xl mx-auto leading-relaxed">
          All Blazing Tails performers are 100% AI-generated synthetic characters and are not based on any real person's
          likeness. NY AI Transparency Act (effective June 9, 2026) compliant — all synthetic performer advertising
          includes mandatory disclosure. Adults 18+ only.
        </p>
        <p className="text-gray-700 text-xs mt-2">
          © 2026 NYC Tailblazers · nyctailblazers@nyctailblazers.com
        </p>
      </footer>
    </div>
  );
}

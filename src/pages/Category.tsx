import { useParams, Link } from "react-router-dom";
import { getEditionsByBrand, BRANDS, getSfwEditions, getNsfwEditions } from "../data/editions";
import MagazineGrid from "../components/MagazineGrid";

interface CategoryProps {
  nsfw: boolean;
}

export default function Category({ nsfw }: CategoryProps) {
  const { name } = useParams<{ name: string }>();
  const brand = BRANDS.find((b) => b.toLowerCase() === name?.toLowerCase());
  const brandEditions = brand ? getEditionsByBrand(brand) : [];
  const visibleCount = nsfw
    ? getNsfwEditions().filter((e) => e.brand === brand).length
    : getSfwEditions().filter((e) => e.brand === brand).length;

  if (!brand || brandEditions.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-parchment)" }}
      >
        <div className="text-center">
          <p className="font-serif mb-4" style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>
            Brand not found.
          </p>
          <Link to="/" className="font-sans text-sm" style={{ color: "var(--color-terracotta)" }}>
            ← Back to all editions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-parchment)" }}>
      <div className="max-w-7xl mx-auto px-5 py-8">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 font-sans text-sm mb-6"
          style={{ color: "var(--text-tertiary)" }}
        >
          <Link to="/" className="transition-colors" style={{ color: "var(--text-tertiary)" }}>
            Home
          </Link>
          <span>›</span>
          <span style={{ color: "var(--text-primary)" }}>{brand}</span>
        </nav>

        <div className="mb-8">
          <p className="text-overline mb-2" style={{ color: "var(--color-terracotta)" }}>
            Brand
          </p>
          <h1
            className="font-serif mb-1"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 500, color: "var(--text-primary)" }}
          >
            {brand}
          </h1>
          <p className="font-sans text-sm" style={{ color: "var(--text-secondary)" }}>
            {visibleCount} {nsfw ? "NSFW" : "SFW"} edition{visibleCount !== 1 ? "s" : ""} in this brand
          </p>
        </div>

        <MagazineGrid nsfw={nsfw} filterCategory={brand} />

        {/* Other brands */}
        <div
          className="mt-12 pt-8"
          style={{ borderTop: "1px solid var(--border-warm)" }}
        >
          <p className="font-sans text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>
            Other brands
          </p>
          <div className="flex flex-wrap gap-2">
            {BRANDS.filter((b) => b !== brand).map((b) => (
              <Link
                key={b}
                to={`/category/${b.toLowerCase()}`}
                className="font-sans font-medium text-xs px-4 py-1.5 rounded-full transition-all"
                style={{
                  backgroundColor: "var(--border-cream)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-warm)",
                }}
              >
                {b}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

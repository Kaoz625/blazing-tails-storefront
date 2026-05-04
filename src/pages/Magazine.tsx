import { useParams, Link } from "react-router-dom";
import { getEditionById } from "../data/editions";
import MagazineViewer from "../components/MagazineViewer";

interface MagazineProps {
  nsfw: boolean;
}

export default function Magazine({ nsfw }: MagazineProps) {
  const { id } = useParams<{ id: string }>();
  const edition = id ? getEditionById(id) : undefined;

  if (!edition) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-parchment)" }}
      >
        <div className="text-center">
          <p className="font-serif mb-4" style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>
            Edition not found.
          </p>
          <Link
            to="/"
            className="font-sans text-sm"
            style={{ color: "var(--color-terracotta)" }}
          >
            ← Back to all editions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-parchment)" }}>
      <div className="max-w-5xl mx-auto px-5 py-8">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 font-sans text-sm mb-6"
          style={{ color: "var(--text-tertiary)" }}
        >
          <Link
            to="/"
            className="transition-colors"
            style={{ color: "var(--text-tertiary)" }}
          >
            Home
          </Link>
          <span>›</span>
          <Link
            to={`/category/${edition.brand.toLowerCase()}`}
            className="transition-colors"
            style={{ color: "var(--text-tertiary)" }}
          >
            {edition.brand}
          </Link>
          <span>›</span>
          <span style={{ color: "var(--text-primary)" }}>{edition.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <p
            className="text-overline mb-2"
            style={{ color: "var(--color-terracotta)" }}
          >
            Blazing Tails · {edition.brand} · Issue {edition.issue} · {edition.edition.toUpperCase()}
          </p>
          <h1
            className="font-serif mb-2"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 500,
              color: "var(--text-primary)",
              lineHeight: 1.15,
            }}
          >
            {edition.title}
          </h1>
          <p
            className="font-serif"
            style={{ fontStyle: "italic", color: "var(--text-secondary)", fontSize: "1rem" }}
          >
            "{edition.tagline}"
          </p>
        </div>

        <MagazineViewer edition={edition} nsfw={nsfw} />

        {/* Disclosure */}
        <div
          className="mt-8 p-4 rounded-lg"
          style={{ border: "1px solid var(--border-warm)", backgroundColor: "var(--bg-ivory)" }}
        >
          <p
            className="font-sans text-xs leading-relaxed"
            style={{ color: "var(--text-warm-silver)" }}
          >
            <strong style={{ color: "var(--text-tertiary)" }}>Synthetic Performer Disclosure:</strong>{" "}
            All performers in this edition are 100% AI-generated fictional characters. They are not
            based on any real person's likeness. Compliant with the NY AI Transparency Act
            (effective June 9, 2026).
          </p>
        </div>
      </div>
    </div>
  );
}

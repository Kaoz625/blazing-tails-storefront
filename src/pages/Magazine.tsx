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
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Edition not found.</p>
          <Link to="/" className="text-yellow-400 hover:underline">
            ← Back to all editions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link
            to={`/category/${edition.category.toLowerCase()}`}
            className="hover:text-yellow-400 transition-colors"
          >
            {edition.category}
          </Link>
          <span>›</span>
          <span className="text-gray-300">{edition.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="text-yellow-500 text-xs tracking-widest uppercase font-bold mb-1">
            Blazing Tails · {edition.category} · Vol. {edition.volume}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{edition.title}</h1>
          <p className="text-gray-400 italic">"{edition.tagline}"</p>
        </div>

        <MagazineViewer edition={edition} nsfw={nsfw} />

        {/* Disclosure */}
        <div className="mt-8 p-4 rounded-lg border border-white/5 bg-gray-900/30">
          <p className="text-gray-600 text-xs leading-relaxed">
            <strong className="text-gray-500">Synthetic Performer Disclosure:</strong> All performers in this edition
            are 100% AI-generated fictional characters. They are not based on any real person's likeness.
            Compliant with the NY AI Transparency Act (effective June 9, 2026).
          </p>
        </div>
      </div>
    </div>
  );
}

import { useParams, Link } from "react-router-dom";
import { getEditionsByCategory, CATEGORIES } from "../data/editions";
import MagazineGrid from "../components/MagazineGrid";

interface CategoryProps {
  nsfw: boolean;
}

export default function Category({ nsfw }: CategoryProps) {
  const { name } = useParams<{ name: string }>();
  const categoryName = CATEGORIES.find((c) => c.toLowerCase() === name?.toLowerCase());
  const editions = categoryName ? getEditionsByCategory(categoryName) : [];

  if (!categoryName || editions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Category not found.</p>
          <Link to="/" className="text-yellow-400 hover:underline">
            ← Back to all editions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <span>›</span>
          <span className="text-gray-300">{categoryName}</span>
        </nav>

        <div className="mb-8">
          <div className="text-yellow-500 text-xs tracking-widest uppercase font-bold mb-1">
            Category
          </div>
          <h1 className="text-4xl font-black text-white mb-2">{categoryName}</h1>
          <p className="text-gray-400">{editions.length} editions in this collection</p>
        </div>

        <MagazineGrid nsfw={nsfw} filterCategory={categoryName} />

        {/* All categories */}
        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-gray-500 text-sm mb-4">Other categories</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c !== categoryName).map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat.toLowerCase()}`}
                className="px-4 py-1.5 rounded-full text-sm border border-white/10 text-gray-400 hover:border-yellow-500/40 hover:text-yellow-400 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

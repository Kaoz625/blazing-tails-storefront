import { Link } from "react-router-dom";
import type { Edition } from "../data/editions";

interface EditionCardProps {
  edition: Edition;
  nsfw: boolean;
}

export default function EditionCard({ edition, nsfw }: EditionCardProps) {
  return (
    <Link
      to={`/magazine/${edition.id}`}
      className="group block rounded-xl overflow-hidden border border-white/10 bg-gray-900 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-1"
    >
      {/* Cover image area */}
      <div
        className="relative aspect-[3/4] overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: edition.coverColor }}
      >
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            nsfw ? "" : "backdrop-blur-xl bg-black/60"
          }`}
        />
        <div className="relative z-10 text-center p-4">
          <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#d4af37" }}>
            {edition.category}
          </div>
          <div className="text-white font-black text-xl leading-tight mb-1">
            Blazing Tails
          </div>
          <div className="text-white/70 text-xs">Vol. {edition.volume}</div>
          {!nsfw && (
            <div className="mt-3 text-white/50 text-xs">
              [NSFW — toggle to view]
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="text-xs text-yellow-500 font-semibold tracking-wide uppercase mb-1">
          {edition.category} · Vol. {edition.volume}
        </div>
        <h3 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-yellow-400 transition-colors">
          {edition.title}
        </h3>
        <p className="text-gray-500 text-xs mb-3 italic">"{edition.tagline}"</p>
        <div className="flex items-center justify-between">
          <span className="text-yellow-400 font-bold text-lg">${edition.price.toFixed(2)}</span>
          <span className="text-xs text-gray-500">{edition.performers.length} performers</span>
        </div>
      </div>
    </Link>
  );
}

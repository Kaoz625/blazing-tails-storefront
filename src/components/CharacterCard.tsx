import { Link } from "react-router-dom";
import type { Character } from "../types/character";
import { MODEL_COLORS, GROUP_ICONS, MERCH_CATALOG } from "../types/character";
import { slugify } from "../data/characters";

interface Props {
  character: Character;
  featured?: boolean;
}

export default function CharacterCard({ character, featured = false }: Props) {
  const color = MODEL_COLORS[character.model] ?? "#888";
  const icon = GROUP_ICONS[character.user_group] ?? "✦";
  const slug = slugify(character);

  return (
    <Link
      to={`/character/${slug}`}
      className={`group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${featured ? "md:col-span-2" : ""}`}
      style={{ borderColor: `${color}33`, background: "var(--card-bg)" }}
    >
      {/* AI disclosure badge */}
      <span
        className="absolute top-3 right-3 z-10 text-[10px] font-mono px-2 py-0.5 rounded-full border"
        style={{
          background: "rgba(0,0,0,0.55)",
          borderColor: "rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.7)",
        }}
      >
        AI-generated character
      </span>

      {/* Color band + avatar placeholder */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: featured ? "220px" : "160px",
          background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
        }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl border-2 border-white/20 shadow-lg"
          style={{ background: `${color}33` }}
        >
          {icon}
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: color }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-base leading-tight" style={{ color: "var(--text-primary)" }}>
              {character.name}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
              {character.archetype} · {character.user_group}
            </p>
          </div>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-mono flex-shrink-0 mt-0.5"
            style={{ background: `${color}22`, color }}
          >
            {character.model}
          </span>
        </div>

        <p
          className="text-xs italic leading-relaxed line-clamp-2"
          style={{ color: "var(--text-secondary)" }}
        >
          "{character.signature_phrase}"
        </p>

        <div className="flex gap-1 flex-wrap mt-auto pt-2">
          {character.personality_traits.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: "var(--tag-bg)", color: "var(--text-secondary)" }}
            >
              {t}
            </span>
          ))}
        </div>

        <div
          className="flex items-center justify-between pt-3 border-t mt-1"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            From ${Math.min(...MERCH_CATALOG.map((m) => m.price))}
          </span>
          <span
            className="text-xs font-medium group-hover:underline"
            style={{ color }}
          >
            Shop →
          </span>
        </div>
      </div>
    </Link>
  );
}

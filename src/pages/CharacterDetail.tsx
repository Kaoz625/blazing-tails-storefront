import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useCharacters } from "../context/CharacterContext";
import { getCharacterBySlug } from "../data/characters";
import { MODEL_COLORS, GROUP_ICONS, MERCH_CATALOG, type MerchType } from "../types/character";
import { useCart } from "../context/CartContext";

export default function CharacterDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { characters, loading } = useCharacters();
  const { addItem } = useCart();
  const [selectedMerch, setSelectedMerch] = useState<MerchType>("tee");
  const [added, setAdded] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <p style={{ color: "var(--text-tertiary)" }}>Loading…</p>
      </div>
    );
  }

  const character = slug ? getCharacterBySlug(characters, slug) : undefined;

  if (!character) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "var(--bg)" }}>
        <p className="text-2xl">🔍</p>
        <p style={{ color: "var(--text-primary)" }}>Character not found</p>
        <Link to="/shop" style={{ color: "#7c6fef" }}>Browse all characters →</Link>
      </div>
    );
  }

  const color = MODEL_COLORS[character.model] ?? "#888";
  const icon = GROUP_ICONS[character.user_group] ?? "✦";
  const merch = MERCH_CATALOG.find((m) => m.type === selectedMerch)!;

  function handleAddToCart() {
    addItem({ character: character!, merchType: selectedMerch, price: merch.price });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Breadcrumb */}
      <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs" style={{ color: "var(--text-tertiary)" }}>
          <Link to="/" style={{ color: "var(--text-tertiary)" }}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: "var(--text-tertiary)" }}>Shop</Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>{character.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-12 grid md:grid-cols-2 gap-12">
        {/* Left — character visual */}
        <div>
          {/* Avatar card */}
          <div
            className="relative rounded-3xl overflow-hidden flex items-center justify-center mb-6"
            style={{
              height: "400px",
              background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
              border: `1px solid ${color}33`,
            }}
          >
            {/* AI disclosure */}
            <span
              className="absolute top-4 left-4 text-[10px] font-mono px-2 py-0.5 rounded-full border"
              style={{
                background: "rgba(0,0,0,0.55)",
                borderColor: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              AI-generated character
            </span>

            <div className="text-center">
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center text-6xl border-2 border-white/20 shadow-xl mx-auto mb-4"
                style={{ background: `${color}44` }}
              >
                {icon}
              </div>
              <p className="font-bold text-2xl" style={{ color: "var(--text-primary)" }}>
                {character.name}
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                {character.archetype}
              </p>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ background: color }}
            />
          </div>

          {/* Traits */}
          <div
            className="rounded-2xl border p-5"
            style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
          >
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              Character traits
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {character.personality_traits.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ background: `${color}22`, color }}
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {character.backstory}
            </p>
            <p
              className="text-xs mt-3 italic"
              style={{ color: "var(--text-tertiary)" }}
            >
              "{character.signature_phrase}"
            </p>
          </div>
        </div>

        {/* Right — product */}
        <div className="flex flex-col gap-6">
          <div>
            <div
              className="text-xs font-mono px-2 py-0.5 rounded-full inline-block mb-3"
              style={{ background: `${color}22`, color }}
            >
              {character.model} · {character.user_group}
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              {character.name}
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {character.location} · Age {character.age} · Cycle {String(character.cycle).padStart(3, "0")}
            </p>
          </div>

          {/* Merch selector */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "var(--text-tertiary)" }}>
              Choose merch
            </p>
            <div className="grid grid-cols-3 gap-3">
              {MERCH_CATALOG.map((item) => (
                <button
                  key={item.type}
                  onClick={() => setSelectedMerch(item.type)}
                  className="rounded-xl border p-3 text-left transition-all"
                  style={
                    selectedMerch === item.type
                      ? { borderColor: color, background: `${color}11` }
                      : { borderColor: "var(--border)", background: "var(--card-bg)" }
                  }
                >
                  <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
                    {item.label}
                  </p>
                  <p className="text-sm font-bold" style={{ color }}>
                    ${item.price}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Selected merch details */}
          <div
            className="rounded-2xl border p-4"
            style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              {merch.label}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {merch.description}
            </p>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              ${merch.price}
            </span>
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
              style={
                added
                  ? { background: "#22c55e", color: "white" }
                  : {
                      background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
                      color: "white",
                    }
              }
            >
              {added ? "Added to cart ✓" : "Add to cart"}
            </button>
          </div>

          {/* TODO: Stripe checkout */}
          <p className="text-xs text-center" style={{ color: "var(--text-tertiary)" }}>
            Checkout via Stripe — coming soon. Cart tracked locally.
          </p>

          {/* Info strips */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Communication style", value: character.communication_style },
              { label: "Pain point", value: character.primary_pain_point },
              { label: "Core values", value: character.core_values.join(", ") },
              { label: "Speaks like", value: character.group_language.join(", ") },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border p-3"
                style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
              >
                <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: "var(--text-tertiary)" }}>
                  {label}
                </p>
                <p className="text-xs capitalize" style={{ color: "var(--text-secondary)" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

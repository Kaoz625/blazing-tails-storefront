import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { MODEL_COLORS, GROUP_ICONS } from "../types/character";
import { slugify } from "../data/characters";

export default function Cart() {
  const { items, removeItem, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-5" style={{ background: "var(--bg)" }}>
        <p className="text-5xl">🛒</p>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Your cart is empty</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Find a character that speaks to you.</p>
        <Link
          to="/shop"
          className="mt-4 px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #7c6fef 0%, #5b8dee 100%)", color: "white" }}
        >
          Browse characters →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-3xl mx-auto px-5 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Your cart ({items.length})
          </h1>
          <button
            onClick={clearCart}
            className="text-xs"
            style={{ color: "var(--text-tertiary)" }}
          >
            Clear all
          </button>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          {items.map((item) => {
            const color = MODEL_COLORS[item.character.model] ?? "#888";
            const icon = GROUP_ICONS[item.character.user_group] ?? "✦";
            const slug = slugify(item.character);
            return (
              <div
                key={`${item.character.id}-${item.merchType}`}
                className="flex items-center gap-4 rounded-2xl border p-4"
                style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${color}22` }}
                >
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/character/${slug}`}
                    className="font-semibold text-sm hover:underline"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.character.name}
                  </Link>
                  <p className="text-xs mt-0.5 capitalize" style={{ color: "var(--text-secondary)" }}>
                    {item.merchType === "tee" ? "Character Tee" : item.merchType === "print" ? "Art Print" : "Sticker Pack"}
                    {" · "}Qty {item.qty}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                    {item.character.model} · {item.character.user_group}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold" style={{ color: "var(--text-primary)" }}>
                    ${item.price * item.qty}
                  </p>
                  <button
                    onClick={() => removeItem(item.character.id, item.merchType)}
                    className="text-xs mt-1"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div
          className="rounded-2xl border p-6"
          style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
        >
          <div className="flex justify-between mb-4">
            <span style={{ color: "var(--text-secondary)" }}>Subtotal</span>
            <span className="font-bold" style={{ color: "var(--text-primary)" }}>${total}</span>
          </div>
          <div className="flex justify-between mb-6 text-sm" style={{ color: "var(--text-tertiary)" }}>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          {/* TODO: Wire to Stripe — needs STRIPE_PUBLISHABLE_KEY in env */}
          <button
            disabled
            className="w-full py-3 rounded-xl font-semibold text-sm"
            style={{ background: "rgba(124,111,239,0.3)", color: "rgba(255,255,255,0.5)", cursor: "not-allowed" }}
          >
            Checkout via Stripe — coming soon
          </button>
          <p className="text-center text-xs mt-3" style={{ color: "var(--text-tertiary)" }}>
            Add <code>VITE_STRIPE_KEY</code> to .env to enable checkout
          </p>
        </div>
      </div>
    </div>
  );
}

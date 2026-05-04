import { useState } from "react";
import type { Edition } from "../data/editions";
import { QUANTITY_DISCOUNTS } from "../data/editions";

interface MagazineViewerProps {
  edition: Edition;
  nsfw: boolean;
}

type Page = "cover" | number; // number = performer index 0–5

export default function MagazineViewer({ edition, nsfw }: MagazineViewerProps) {
  const [currentPage, setCurrentPage] = useState<Page>("cover");
  const [flipping, setFlipping] = useState<"left" | "right" | null>(null);
  const [qty, setQty] = useState(1);

  const pages: Page[] = ["cover", 0, 1, 2, 3, 4, 5];
  const pageIndex = currentPage === "cover" ? 0 : (currentPage as number) + 1;
  const totalPages = pages.length;

  function goTo(dir: "prev" | "next") {
    const newIndex = dir === "next" ? pageIndex + 1 : pageIndex - 1;
    if (newIndex < 0 || newIndex >= totalPages) return;
    setFlipping(dir === "next" ? "right" : "left");
    setTimeout(() => {
      setCurrentPage(pages[newIndex]);
      setFlipping(null);
    }, 300);
  }

  const discount = QUANTITY_DISCOUNTS.find((d) => qty >= d.min && qty <= d.max) ?? QUANTITY_DISCOUNTS[0];
  const total = (discount.price * qty).toFixed(2);

  const mailSubject = encodeURIComponent(`Order: ${edition.title} (${edition.id}) × ${qty}`);
  const mailBody = encodeURIComponent(
    `Hi,\n\nI'd like to order:\n\nEdition: ${edition.title}\nEdition ID: ${edition.id}\nQuantity: ${qty}\nPrice per issue: $${discount.price}\nTotal: $${total}\n\nPlease send payment instructions.\n\nThank you.`
  );
  const mailHref = `mailto:nyctailblazers@nyctailblazers.com?subject=${mailSubject}&body=${mailBody}`;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Magazine viewer */}
      <div className="flex-1 min-w-0">
        {/* Page display */}
        <div className="relative flex items-center justify-center">
          {/* Prev arrow */}
          <button
            onClick={() => goTo("prev")}
            disabled={pageIndex === 0}
            className="absolute left-0 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-yellow-500 hover:text-black disabled:opacity-20 disabled:cursor-not-allowed transition-all -translate-x-2"
            aria-label="Previous page"
          >
            ‹
          </button>

          {/* Page content */}
          <div
            className={`w-full max-w-sm mx-10 transition-all duration-300 ${
              flipping === "right" ? "-translate-x-4 opacity-0" : ""
            } ${flipping === "left" ? "translate-x-4 opacity-0" : ""}`}
          >
            {currentPage === "cover" ? (
              <CoverPage edition={edition} nsfw={nsfw} />
            ) : (
              <PerformerPage
                name={edition.performers[currentPage as number]}
                index={currentPage as number}
                editionId={edition.id}
                nsfw={nsfw}
              />
            )}
          </div>

          {/* Next arrow */}
          <button
            onClick={() => goTo("next")}
            disabled={pageIndex === totalPages - 1}
            className="absolute right-0 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-yellow-500 hover:text-black disabled:opacity-20 disabled:cursor-not-allowed transition-all translate-x-2"
            aria-label="Next page"
          >
            ›
          </button>
        </div>

        {/* Page indicator dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(pages[i])}
              className={`w-2 h-2 rounded-full transition-all ${
                i === pageIndex ? "bg-yellow-400 w-4" : "bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
        <p className="text-center text-gray-500 text-xs mt-2">
          Page {pageIndex + 1} of {totalPages}
        </p>
      </div>

      {/* Order panel */}
      <div className="w-full lg:w-72 flex-shrink-0 bg-gray-900 border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-1">{edition.title}</h3>
        <p className="text-yellow-500 text-sm mb-4">
          {edition.category} · Vol. {edition.volume}
        </p>

        <div className="mb-4">
          <label className="text-gray-400 text-xs uppercase tracking-wide block mb-1">Quantity</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-8 h-8 rounded bg-gray-700 text-white hover:bg-gray-600 font-bold"
            >
              −
            </button>
            <span className="text-white font-bold w-8 text-center">{qty}</span>
            <button
              onClick={() => setQty(Math.min(14, qty + 1))}
              className="w-8 h-8 rounded bg-gray-700 text-white hover:bg-gray-600 font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Pricing tiers */}
        <div className="space-y-1 mb-4">
          {QUANTITY_DISCOUNTS.map((d) => (
            <div
              key={d.min}
              className={`flex justify-between text-xs rounded px-2 py-1 ${
                qty >= d.min && qty <= d.max
                  ? "bg-yellow-500/20 text-yellow-400 font-semibold"
                  : "text-gray-500"
              }`}
            >
              <span>{d.label}</span>
              <span>${d.price}/issue</span>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-4 mb-4">
          <div className="flex justify-between text-white">
            <span className="text-gray-400">Total</span>
            <span className="font-bold text-yellow-400 text-xl">${total}</span>
          </div>
        </div>

        <a
          href={mailHref}
          className="block w-full text-center py-3 rounded-lg bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-colors"
        >
          Order Now
        </a>
        <p className="text-gray-600 text-xs text-center mt-2">
          Orders via email · Stripe coming soon
        </p>

        {/* Performers list */}
        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">Performers</p>
          <ul className="space-y-1">
            {edition.performers.map((name, i) => (
              <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60 flex-shrink-0" />
                {name}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-gray-700 text-xs mt-4 leading-relaxed">
          All performers are 100% AI-generated synthetic characters. Not based on any real person.
          NY AI Transparency Act compliant.
        </p>
      </div>
    </div>
  );
}

function CoverPage({ edition, nsfw }: { edition: Edition; nsfw: boolean }) {
  return (
    <div
      className="relative aspect-[3/4] rounded-xl overflow-hidden flex flex-col items-center justify-center shadow-2xl"
      style={{ backgroundColor: edition.coverColor }}
    >
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          nsfw ? "opacity-0" : "backdrop-blur-2xl bg-black/70"
        }`}
      />
      <div className="relative z-10 text-center p-6">
        <div className="text-xs font-black tracking-[0.3em] uppercase mb-2 text-yellow-400">
          Blazing Tails
        </div>
        <div className="w-16 h-px bg-yellow-400/60 mx-auto mb-4" />
        <h2 className="text-white font-black text-2xl leading-tight mb-2">{edition.title}</h2>
        <p className="text-white/60 text-sm italic mb-4">"{edition.tagline}"</p>
        <div className="text-yellow-400/80 text-xs tracking-widest uppercase">
          {edition.category} · Vol. {edition.volume}
        </div>
        {!nsfw && (
          <div className="mt-6 text-white/40 text-xs border border-white/20 rounded px-3 py-1.5">
            Enable NSFW to view
          </div>
        )}
      </div>
    </div>
  );
}

function PerformerPage({
  name,
  index,
  editionId,
  nsfw,
}: {
  name: string;
  index: number;
  editionId: string;
  nsfw: boolean;
}) {
  // Derive char_id slug from name: "Mara Prescott" → "mara-prescott"
  const charSlug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const charId = `${editionId}-${charSlug}`;
  const imgSrc = `/outputs/${editionId}/${charId}/scene_1.jpg`;

  return (
    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-800 relative shadow-2xl">
      <img
        src={imgSrc}
        alt={nsfw ? name : ""}
        className={`w-full h-full object-cover transition-all duration-500 ${
          nsfw ? "" : "blur-2xl scale-105"
        }`}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      {/* Fallback / overlay */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-end p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent ${
          nsfw ? "" : "from-black/95"
        }`}
      >
        <div className="text-center">
          {!nsfw && (
            <div className="text-white/40 text-xs mb-2">Enable NSFW to view</div>
          )}
          <div className="text-white font-bold">{name}</div>
          <div className="text-yellow-400/60 text-xs">Performer {index + 1} of 6</div>
        </div>
      </div>
    </div>
  );
}

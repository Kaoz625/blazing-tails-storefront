import { useState, useEffect, useCallback } from "react";
import type { Edition } from "../data/editions";
import { QUANTITY_DISCOUNTS } from "../data/editions";

interface MagazineViewerProps {
  edition: Edition;
  nsfw: boolean;
}

// ── Page descriptor types ──────────────────────────────────────────────────

type PageDesc =
  | { type: "cover" }
  | { type: "editors-letter" }
  | { type: "toc" }
  | { type: "intro-spread" }
  | { type: "performer-portrait"; performerIdx: number }
  | { type: "performer-bio"; performerIdx: number }
  | { type: "performer-lifestyle"; performerIdx: number; variant: 1 | 2 | 3 }
  | { type: "performer-editorial"; performerIdx: number; variant: 1 | 2 | 3 }
  | { type: "performer-scene"; performerIdx: number; scene: 1 | 2 | 3 | 4 | 5 }
  | { type: "performer-outro"; performerIdx: number }
  | { type: "back-cover" };

function makePages(_edition: Edition): PageDesc[] {
  const pages: PageDesc[] = [
    { type: "cover" },
    { type: "editors-letter" },
    { type: "toc" },
    { type: "intro-spread" },
  ];
  for (let p = 0; p < 6; p++) {
    pages.push({ type: "performer-portrait", performerIdx: p });
    pages.push({ type: "performer-bio", performerIdx: p });
    pages.push({ type: "performer-lifestyle", performerIdx: p, variant: 1 });
    pages.push({ type: "performer-lifestyle", performerIdx: p, variant: 2 });
    pages.push({ type: "performer-lifestyle", performerIdx: p, variant: 3 });
    pages.push({ type: "performer-editorial", performerIdx: p, variant: 1 });
    pages.push({ type: "performer-editorial", performerIdx: p, variant: 2 });
    pages.push({ type: "performer-editorial", performerIdx: p, variant: 3 });
    pages.push({ type: "performer-scene", performerIdx: p, scene: 1 });
    pages.push({ type: "performer-scene", performerIdx: p, scene: 2 });
    pages.push({ type: "performer-scene", performerIdx: p, scene: 3 });
    pages.push({ type: "performer-scene", performerIdx: p, scene: 4 });
    pages.push({ type: "performer-scene", performerIdx: p, scene: 5 });
    pages.push({ type: "performer-outro", performerIdx: p });
  }
  pages.push({ type: "back-cover" });
  return pages;
}

function charSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function sceneFrames(editionId: string, name: string): string[] {
  const slug = `${editionId}-${charSlug(name)}`;
  return [
    `/outputs/${editionId}/${slug}/s01-intro.jpg`,
    `/outputs/${editionId}/${slug}/s01-mid1.jpg`,
    `/outputs/${editionId}/${slug}/s01-mid2.jpg`,
    `/outputs/${editionId}/${slug}/s01-peak1.jpg`,
    `/outputs/${editionId}/${slug}/s01-peak2.jpg`,
  ];
}

function sceneImg(editionId: string, name: string, scene: number): string {
  const slug = `${editionId}-${charSlug(name)}`;
  const roles = ["intro", "mid1", "mid2", "peak1", "peak2"];
  return `/outputs/${editionId}/${slug}/s0${scene}-${roles[(scene - 1) % 5]}.jpg`;
}

// ── ScenePlayer ────────────────────────────────────────────────────────────

function ScenePlayer({ frames, name }: { frames: string[]; name: string }) {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 1200);
    return () => clearInterval(id);
  }, [playing, frames.length]);

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "3/4",
        backgroundColor: "var(--bg-near-black)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {frames.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === frame ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ))}

      {/* Frame dots */}
      <div
        style={{
          position: "absolute",
          bottom: "0.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "4px",
        }}
      >
        {frames.map((_, i) => (
          <button
            key={i}
            onClick={() => setFrame(i)}
            style={{
              width: i === frame ? "14px" : "6px",
              height: "6px",
              borderRadius: "3px",
              backgroundColor: i === frame ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Play/pause */}
      <button
        onClick={() => setPlaying((p) => !p)}
        style={{
          position: "absolute",
          bottom: "0.75rem",
          right: "0.75rem",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          fontSize: "0.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {playing ? "⏸" : "▶"}
      </button>

      {/* Name label */}
      <div
        style={{
          position: "absolute",
          top: "0.75rem",
          left: "0.75rem",
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          borderRadius: "4px",
          padding: "2px 8px",
          fontSize: "0.6rem",
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)",
        }}
      >
        {name} · Scene preview
      </div>
    </div>
  );
}

// ── Page renderers ─────────────────────────────────────────────────────────

function CoverPage({ edition }: { edition: Edition }) {
  const firstPerformer = edition.performers[0];
  const slug = `${edition.id}-${charSlug(firstPerformer)}`;
  const coverImg = `/outputs/${edition.id}/${slug}/s01-intro.jpg`;

  return (
    <div
      style={{
        aspectRatio: "3/4",
        backgroundColor: edition.coverColor,
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}
    >
      <img
        src={coverImg}
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
        }}
      />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
            NYC Tailblazers
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "3px", padding: "2px 6px" }}>
            {edition.edition.toUpperCase()} · Issue {edition.issue}
          </span>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.2rem, 4vw, 1.75rem)", fontWeight: 500, color: "rgba(255,255,255,0.95)", lineHeight: 1.15, marginBottom: "0.5rem", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
            {edition.title}
          </div>
          <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.75rem" }}>
            "{edition.tagline}"
          </div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            {edition.brand}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorsLetterPage({ edition }: { edition: Edition }) {
  return (
    <div
      style={{
        aspectRatio: "3/4",
        backgroundColor: "var(--bg-ivory)",
        border: "1px solid var(--border-warm)",
        borderRadius: "8px",
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "1.5rem" }}>
        Editor's Letter
      </p>
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "1rem" }}>
        {edition.title}
      </h2>
      <div style={{ width: "2rem", height: "1px", backgroundColor: "var(--color-terracotta)", marginBottom: "1rem" }} />
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.75, flex: 1 }}>
        {edition.description}
        {" "}This edition celebrates everything that makes New York the most extraordinary city in the world —
        its people, their stories, and the energy that can't be manufactured anywhere else.
        Every performer in these pages is entirely AI-generated. Every soul is distinctly New York.
      </p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", color: "var(--text-tertiary)", marginTop: "1.5rem" }}>
        NYC Tailblazers · {edition.brand} Issue {edition.issue}
      </p>
    </div>
  );
}

function TocPage({ edition }: { edition: Edition }) {
  return (
    <div
      style={{
        aspectRatio: "3/4",
        backgroundColor: "var(--bg-parchment)",
        border: "1px solid var(--border-warm)",
        borderRadius: "8px",
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "1.5rem" }}>
        Contents
      </p>
      <div style={{ flex: 1 }}>
        {edition.performers.map((name, i) => (
          <div
            key={name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              borderBottom: "1px solid var(--border-cream)",
              padding: "0.5rem 0",
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "0.8rem", color: "var(--text-primary)" }}>{name}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.5rem", color: "var(--text-tertiary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Feature · 16 pages</div>
            </div>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", color: "var(--color-terracotta)" }}>
              {String(i * 16 + 6)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntroSpreadPage({ edition }: { edition: Edition }) {
  return (
    <div
      style={{
        aspectRatio: "3/4",
        backgroundColor: edition.coverColor,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2.5rem",
        textAlign: "center",
        boxShadow: "inset 0 0 60px rgba(0,0,0,0.2)",
      }}
    >
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.5rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "1rem" }}>
        {edition.brand} · Issue {edition.issue}
      </p>
      <div style={{ width: "3rem", height: "1px", backgroundColor: "rgba(255,255,255,0.3)", marginBottom: "1.5rem" }} />
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, color: "rgba(255,255,255,0.9)", lineHeight: 1.2, marginBottom: "1rem" }}>
        {edition.title}
      </h2>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
        {edition.tagline}
      </p>
      <div style={{ width: "3rem", height: "1px", backgroundColor: "rgba(255,255,255,0.3)", marginTop: "1.5rem", marginBottom: "1rem" }} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", justifyContent: "center" }}>
        {edition.performers.map((name) => (
          <span key={name} style={{ fontFamily: "var(--font-sans)", fontSize: "0.5rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

function PerformerPortraitPage({
  name,
  idx: _idx,
  edition,
  scene,
}: {
  name: string;
  idx: number;
  edition: Edition;
  scene: number;
}) {
  const imgSrc = sceneImg(edition.id, name, scene);
  return (
    <div
      style={{
        aspectRatio: "3/4",
        backgroundColor: "var(--bg-near-black)",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src={imgSrc}
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }} />
      <div style={{ position: "absolute", bottom: "1.25rem", left: "1.25rem" }}>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.25rem" }}>
          Performer {_idx + 1} of 6
        </div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 500, color: "rgba(255,255,255,0.95)" }}>
          {name}
        </div>
      </div>
    </div>
  );
}

function PerformerBioPage({ name, idx: _idx, edition }: { name: string; idx: number; edition: Edition }) {
  const frames = sceneFrames(edition.id, name);
  return (
    <div
      style={{
        aspectRatio: "3/4",
        backgroundColor: "var(--bg-ivory)",
        border: "1px solid var(--border-warm)",
        borderRadius: "8px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "0.25rem" }}>
          {edition.brand} · Feature
        </p>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 500, color: "var(--text-primary)" }}>{name}</h3>
        <div style={{ width: "1.5rem", height: "1px", backgroundColor: "var(--color-terracotta)", marginTop: "0.5rem" }} />
      </div>
      <div style={{ flex: "0 0 auto" }}>
        <ScenePlayer frames={frames} name={name} />
      </div>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.7rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
        One of six performers featured in {edition.title}. 100% AI-generated synthetic character —
        not based on any real person. Every detail conceived as an original New York story.
      </p>
    </div>
  );
}

function PerformerScenePage({
  name,
  edition,
  scene,
}: {
  name: string;
  edition: Edition;
  scene: number;
}) {
  const imgSrc = sceneImg(edition.id, name, scene);
  const sceneLabels = ["Intro", "Rising", "Midpoint", "Peak", "Outro"];
  return (
    <div
      style={{
        aspectRatio: "3/4",
        backgroundColor: "var(--bg-dark-surface)",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src={imgSrc}
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", borderRadius: "3px", padding: "2px 8px" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
          {sceneLabels[scene - 1]}
        </span>
      </div>
      <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
          {name}
        </span>
      </div>
    </div>
  );
}

function PerformerEditorialPage({ name, edition, variant }: { name: string; edition: Edition; variant: number }) {
  return (
    <div
      style={{
        aspectRatio: "3/4",
        backgroundColor: "var(--bg-parchment)",
        border: "1px solid var(--border-warm)",
        borderRadius: "8px",
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
        {name} · Editorial {variant}
      </div>
      <div style={{ width: "100%", aspectRatio: "4/3", backgroundColor: "var(--border-warm)", borderRadius: "4px", overflow: "hidden" }}>
        <img
          src={sceneImg(edition.id, name, variant)}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.7rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
        "{edition.tagline}"
      </p>
    </div>
  );
}

function BackCoverPage({ edition }: { edition: Edition }) {
  return (
    <div
      style={{
        aspectRatio: "3/4",
        backgroundColor: "var(--bg-near-black)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2.5rem",
        textAlign: "center",
        gap: "1rem",
      }}
    >
      <div style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
        Blazing Tails
      </div>
      <div style={{ width: "3rem", height: "1px", backgroundColor: "rgba(201,100,66,0.5)" }} />
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
        {edition.brand} · Issue {edition.issue} · {edition.edition.toUpperCase()}
      </p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.55rem", color: "rgba(255,255,255,0.2)", lineHeight: 1.6, maxWidth: "200px" }}>
        All performers are 100% AI-generated synthetic characters.
        NYC Tailblazers © 2026
      </p>
    </div>
  );
}

// ── Render dispatch ────────────────────────────────────────────────────────

function renderPage(page: PageDesc, edition: Edition) {
  switch (page.type) {
    case "cover":
      return <CoverPage edition={edition} />;
    case "editors-letter":
      return <EditorsLetterPage edition={edition} />;
    case "toc":
      return <TocPage edition={edition} />;
    case "intro-spread":
      return <IntroSpreadPage edition={edition} />;
    case "performer-portrait":
      return (
        <PerformerPortraitPage
          name={edition.performers[page.performerIdx]}
          idx={page.performerIdx}
          edition={edition}
          scene={1}
        />
      );
    case "performer-bio":
      return (
        <PerformerBioPage
          name={edition.performers[page.performerIdx]}
          idx={page.performerIdx}
          edition={edition}
        />
      );
    case "performer-lifestyle":
      return (
        <PerformerPortraitPage
          name={edition.performers[page.performerIdx]}
          idx={page.performerIdx}
          edition={edition}
          scene={page.variant}
        />
      );
    case "performer-editorial":
      return (
        <PerformerEditorialPage
          name={edition.performers[page.performerIdx]}
          edition={edition}
          variant={page.variant}
        />
      );
    case "performer-scene":
      return (
        <PerformerScenePage
          name={edition.performers[page.performerIdx]}
          edition={edition}
          scene={page.scene}
        />
      );
    case "performer-outro":
      return (
        <PerformerPortraitPage
          name={edition.performers[page.performerIdx]}
          idx={page.performerIdx}
          edition={edition}
          scene={5}
        />
      );
    case "back-cover":
      return <BackCoverPage edition={edition} />;
  }
}

function pageLabel(page: PageDesc, performers: string[]): string {
  switch (page.type) {
    case "cover": return "Cover";
    case "editors-letter": return "Editor's Letter";
    case "toc": return "Contents";
    case "intro-spread": return "Introduction";
    case "performer-portrait": return `${performers[page.performerIdx]} · Portrait`;
    case "performer-bio": return `${performers[page.performerIdx]} · Feature`;
    case "performer-lifestyle": return `${performers[page.performerIdx]} · Lifestyle`;
    case "performer-editorial": return `${performers[page.performerIdx]} · Editorial`;
    case "performer-scene": return `${performers[page.performerIdx]} · Scene ${page.scene}`;
    case "performer-outro": return `${performers[page.performerIdx]} · Closing`;
    case "back-cover": return "Back Cover";
  }
}

// ── Main viewer ────────────────────────────────────────────────────────────

export default function MagazineViewer({ edition, nsfw: _nsfw }: MagazineViewerProps) {
  const pages = makePages(edition);
  const [pageIdx, setPageIdx] = useState(0);
  const [flipping, setFlipping] = useState<"left" | "right" | null>(null);
  const [qty, setQty] = useState(1);

  const totalPages = pages.length;

  const goTo = useCallback(
    (dir: "prev" | "next") => {
      const next = dir === "next" ? pageIdx + 1 : pageIdx - 1;
      if (next < 0 || next >= totalPages) return;
      setFlipping(dir === "next" ? "right" : "left");
      setTimeout(() => {
        setPageIdx(next);
        setFlipping(null);
      }, 250);
    },
    [pageIdx, totalPages]
  );

  // Keyboard nav
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goTo("next");
      if (e.key === "ArrowLeft") goTo("prev");
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goTo]);

  const discount = QUANTITY_DISCOUNTS.find((d) => qty >= d.min && qty <= d.max) ?? QUANTITY_DISCOUNTS[0];
  const total = (discount.price * qty).toFixed(2);

  const mailSubject = encodeURIComponent(`Order: ${edition.title} (${edition.id}) × ${qty}`);
  const mailBody = encodeURIComponent(
    `Hi,\n\nI'd like to order:\n\nEdition: ${edition.title}\nEdition ID: ${edition.id}\nBrand: ${edition.brand} Issue ${edition.issue} (${edition.edition.toUpperCase()})\nQuantity: ${qty}\nPrice per issue: $${discount.price}\nTotal: $${total}\n\nPlease send payment instructions.\n\nThank you.`
  );
  const mailHref = `mailto:nyctailblazers@nyctailblazers.com?subject=${mailSubject}&body=${mailBody}`;

  // Section jump dots (one per performer + cover/editorial/back)
  const jumpPoints: number[] = [0]; // cover
  for (let p = 0; p < 6; p++) jumpPoints.push(4 + p * 14); // each performer portrait
  jumpPoints.push(totalPages - 1); // back cover

  const currentPage = pages[pageIdx];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Viewer panel */}
      <div className="flex-1 min-w-0">
        {/* Page label */}
        <div
          className="font-sans text-xs mb-3 text-center"
          style={{ color: "var(--text-tertiary)", letterSpacing: "0.05em" }}
        >
          {pageLabel(currentPage, edition.performers)}
        </div>

        {/* Page frame */}
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => goTo("prev")}
            disabled={pageIdx === 0}
            className="absolute left-0 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all -translate-x-1"
            style={{
              backgroundColor: "var(--border-warm)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-cream)",
              fontSize: "1.1rem",
              cursor: pageIdx === 0 ? "not-allowed" : "pointer",
              opacity: pageIdx === 0 ? 0.3 : 1,
            }}
            aria-label="Previous page"
          >
            ‹
          </button>

          <div
            className="mx-10 w-full"
            style={{
              maxWidth: "280px",
              opacity: flipping ? 0 : 1,
              transform: flipping === "right" ? "translateX(-8px)" : flipping === "left" ? "translateX(8px)" : "none",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            {renderPage(currentPage, edition)}
          </div>

          <button
            onClick={() => goTo("next")}
            disabled={pageIdx === totalPages - 1}
            className="absolute right-0 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all translate-x-1"
            style={{
              backgroundColor: "var(--border-warm)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-cream)",
              fontSize: "1.1rem",
              cursor: pageIdx === totalPages - 1 ? "not-allowed" : "pointer",
              opacity: pageIdx === totalPages - 1 ? 0.3 : 1,
            }}
            aria-label="Next page"
          >
            ›
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: "2px", backgroundColor: "var(--border-warm)", borderRadius: "1px", margin: "1rem 0 0.5rem" }}>
          <div
            style={{
              height: "100%",
              borderRadius: "1px",
              backgroundColor: "var(--color-terracotta)",
              width: `${((pageIdx + 1) / totalPages) * 100}%`,
              transition: "width 0.3s ease",
            }}
          />
        </div>

        {/* Jump dots */}
        <div className="flex justify-center gap-1.5 mt-2">
          {jumpPoints.map((target, i) => {
            const isActive = pageIdx >= target && (i === jumpPoints.length - 1 || pageIdx < jumpPoints[i + 1]);
            return (
              <button
                key={target}
                onClick={() => setPageIdx(target)}
                style={{
                  width: isActive ? "16px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: isActive ? "var(--color-terracotta)" : "var(--border-warm)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  padding: 0,
                }}
                aria-label={`Jump to section ${i + 1}`}
              />
            );
          })}
        </div>

        <p
          className="text-center font-sans mt-1.5"
          style={{ fontSize: "0.6rem", color: "var(--text-tertiary)" }}
        >
          Page {pageIdx + 1} of {totalPages} · ← → arrow keys to navigate
        </p>
      </div>

      {/* Order panel */}
      <div
        className="w-full lg:w-72 flex-shrink-0 rounded-xl p-6"
        style={{
          backgroundColor: "var(--bg-ivory)",
          border: "1px solid var(--border-warm)",
        }}
      >
        <h3
          className="font-serif font-medium text-lg mb-0.5"
          style={{ color: "var(--text-primary)" }}
        >
          {edition.title}
        </h3>
        <p
          className="font-sans text-sm mb-5"
          style={{ color: "var(--color-terracotta)" }}
        >
          {edition.brand} · Issue {edition.issue} · {edition.edition.toUpperCase()}
        </p>

        {/* Qty */}
        <label
          className="font-sans block mb-1"
          style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-tertiary)" }}
        >
          Quantity
        </label>
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-8 h-8 rounded font-bold transition-colors"
            style={{ backgroundColor: "var(--border-warm)", color: "var(--text-primary)", border: "1px solid var(--border-cream)" }}
          >
            −
          </button>
          <span className="font-sans font-bold w-8 text-center" style={{ color: "var(--text-primary)" }}>
            {qty}
          </span>
          <button
            onClick={() => setQty(Math.min(28, qty + 1))}
            className="w-8 h-8 rounded font-bold transition-colors"
            style={{ backgroundColor: "var(--border-warm)", color: "var(--text-primary)", border: "1px solid var(--border-cream)" }}
          >
            +
          </button>
        </div>

        {/* Tiers */}
        <div className="space-y-1 mb-4">
          {QUANTITY_DISCOUNTS.map((d) => {
            const active = qty >= d.min && qty <= d.max;
            return (
              <div
                key={d.min}
                className="flex justify-between text-xs rounded px-2 py-1 font-sans"
                style={
                  active
                    ? { backgroundColor: "rgba(201,100,66,0.1)", color: "var(--color-terracotta)", fontWeight: 600 }
                    : { color: "var(--text-tertiary)" }
                }
              >
                <span>{d.label}</span>
                <span>${d.price}/issue</span>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div
          className="flex justify-between items-baseline mb-4 pt-4"
          style={{ borderTop: "1px solid var(--border-warm)" }}
        >
          <span className="font-sans text-sm" style={{ color: "var(--text-secondary)" }}>Total</span>
          <span className="font-serif text-xl font-medium" style={{ color: "var(--color-terracotta)" }}>
            ${total}
          </span>
        </div>

        <a
          href={mailHref}
          className="block w-full text-center py-3 rounded-lg font-sans font-medium transition-all"
          style={{
            backgroundColor: "var(--text-primary)",
            color: "var(--bg-parchment)",
            fontSize: "0.875rem",
          }}
        >
          Order Now
        </a>
        <p className="font-sans text-center mt-2" style={{ fontSize: "0.6rem", color: "var(--text-tertiary)" }}>
          Orders via email · Stripe coming soon
        </p>

        {/* Performers */}
        <div
          className="mt-5 pt-4"
          style={{ borderTop: "1px solid var(--border-warm)" }}
        >
          <p
            className="font-sans mb-2"
            style={{ fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-tertiary)" }}
          >
            Performers
          </p>
          <ul className="space-y-1">
            {edition.performers.map((name, i) => (
              <li
                key={i}
                className="font-sans text-sm flex items-center gap-2"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="flex-shrink-0 rounded-full"
                  style={{ width: "5px", height: "5px", backgroundColor: "var(--color-terracotta)", opacity: 0.5 }}
                />
                {name}
              </li>
            ))}
          </ul>
        </div>

        <p
          className="font-sans mt-4 leading-relaxed"
          style={{ fontSize: "0.55rem", color: "var(--text-warm-silver)" }}
        >
          All performers are 100% AI-generated synthetic characters. Not based on any real person.
          NY AI Transparency Act compliant.
        </p>
      </div>
    </div>
  );
}

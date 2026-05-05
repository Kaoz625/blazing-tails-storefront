import { Link } from "react-router-dom";
import type { Edition } from "../data/editions";

interface EditionCardProps {
  edition: Edition;
}

function toPipelineId(editionId: string): string {
  const m = editionId.match(/^(.+?)-(\d+)-(sfw|nsfw)$/);
  return m ? `${m[1]}-vol${m[2]}` : editionId;
}

export default function EditionCard({ edition }: EditionCardProps) {
  const isNsfw = edition.edition === "nsfw";
  const pipelineId = toPipelineId(edition.id);

  return (
    <Link
      to={`/magazine/${edition.id}`}
      className="group block fade-up"
      style={{ textDecoration: "none" }}
    >
      {/* Magazine cover */}
      <div
        className="cover-ratio relative overflow-hidden mb-3"
        style={{
          backgroundColor: edition.coverColor,
          borderRadius: "4px",
          boxShadow: "rgba(0,0,0,0.08) 0px 2px 12px, 0 0 0 1px rgba(0,0,0,0.04)",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        {/* Cover image (shown when generated) */}
        <img
          src={`/outputs/${pipelineId}/${pipelineId}-${edition.performers[0].toLowerCase().replace(/\s+/g,"-")}/s01-intro.jpg`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.85 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />

        {/* Cover overlay text */}
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          {/* Top badge */}
          <div className="flex items-center justify-between">
            <span
              className="text-overline"
              style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.55rem" }}
            >
              NYC Tailblazers
            </span>
            <span
              className="text-xs font-sans font-medium px-2 py-0.5 rounded"
              style={{
                backgroundColor: isNsfw ? "rgba(201,100,66,0.85)" : "rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.95)",
                fontSize: "0.6rem",
                letterSpacing: "0.06em",
              }}
            >
              {isNsfw ? "NSFW" : "SFW"}
            </span>
          </div>

          {/* Bottom title area */}
          <div>
            <div
              className="font-serif font-medium leading-tight mb-1"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                color: "rgba(255,255,255,0.95)",
                textShadow: "0 1px 4px rgba(0,0,0,0.4)",
              }}
            >
              {edition.title}
            </div>
            <div
              className="font-sans"
              style={{
                fontSize: "0.625rem",
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {edition.brand} · Issue {edition.issue}
            </div>
          </div>
        </div>

        {/* Hover lift */}
        <style>{`
          .group:hover > div[style*="borderRadius"] {
            transform: translateY(-4px);
            box-shadow: rgba(0,0,0,0.15) 0px 8px 24px, 0 0 0 1px rgba(0,0,0,0.06);
          }
        `}</style>
      </div>

      {/* Below-cover info */}
      <div className="px-0.5">
        <div
          className="font-serif font-medium text-sm leading-snug mb-0.5"
          style={{ color: "var(--text-primary)" }}
        >
          {edition.title}
        </div>
        <div className="flex items-center justify-between">
          <span
            className="font-sans text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            {edition.brand} · Issue {edition.issue}
          </span>
          <span
            className="font-sans text-xs font-medium"
            style={{ color: "var(--color-terracotta)" }}
          >
            ${edition.price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}

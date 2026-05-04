import { getSfwEditions, getNsfwEditions } from "../data/editions";
import EditionCard from "./EditionCard";

interface MagazineGridProps {
  nsfw: boolean;
  filterCategory?: string;
}

export default function MagazineGrid({ nsfw, filterCategory }: MagazineGridProps) {
  const all = nsfw ? getNsfwEditions() : getSfwEditions();
  const editions = filterCategory
    ? all.filter((e) => e.brand === filterCategory)
    : all;

  return (
    <div
      className="grid gap-5"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 170px), 1fr))" }}
    >
      {editions.map((edition) => (
        <EditionCard key={edition.id} edition={edition} />
      ))}
    </div>
  );
}

import { EDITIONS } from "../data/editions";
import EditionCard from "./EditionCard";

interface MagazineGridProps {
  nsfw: boolean;
  filterCategory?: string;
}

export default function MagazineGrid({ nsfw, filterCategory }: MagazineGridProps) {
  const editions = filterCategory
    ? EDITIONS.filter((e) => e.category === filterCategory)
    : EDITIONS;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
      {editions.map((edition) => (
        <EditionCard key={edition.id} edition={edition} nsfw={nsfw} />
      ))}
    </div>
  );
}

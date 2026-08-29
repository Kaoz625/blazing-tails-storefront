import type { Character, CycleIndex } from "../types/character";

// Load cycle index and all characters from public/data/cycle-001/
// Vite fetches JSON from /data/ at runtime

export async function loadCycleIndex(cycle: number = 1): Promise<CycleIndex> {
  const pad = String(cycle).padStart(3, "0");
  const res = await fetch(`/data/cycle-${pad}/_index.json`);
  if (!res.ok) throw new Error(`Failed to load cycle index: ${res.status}`);
  return res.json();
}

export async function loadCharacter(id: string, cycle: number = 1): Promise<Character> {
  const pad = String(cycle).padStart(3, "0");
  // id format: "claude-opus-creators-cycle001" → file: "claude-opus-creators.json"
  const filename = id.replace(/-cycle\d+$/, "");
  const res = await fetch(`/data/cycle-${pad}/${filename}.json`);
  if (!res.ok) throw new Error(`Failed to load character ${id}: ${res.status}`);
  return res.json();
}

export async function loadAllCharacters(cycle: number = 1): Promise<Character[]> {
  const index = await loadCycleIndex(cycle);
  const results = await Promise.allSettled(
    index.characters.map((id) => loadCharacter(id, cycle))
  );
  return results
    .filter((r): r is PromiseFulfilledResult<Character> => r.status === "fulfilled")
    .map((r) => r.value);
}

export function slugify(character: Character): string {
  return character.id.replace(/-cycle\d+$/, "");
}

export function getCharacterBySlug(
  characters: Character[],
  slug: string
): Character | undefined {
  return characters.find((c) => c.id.replace(/-cycle\d+$/, "") === slug);
}

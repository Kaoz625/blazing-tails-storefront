import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Character } from "../types/character";
import { loadAllCharacters } from "../data/characters";

interface CharacterContextValue {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

const CharacterContext = createContext<CharacterContextValue>({
  characters: [],
  loading: true,
  error: null,
});

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAllCharacters(1)
      .then(setCharacters)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <CharacterContext.Provider value={{ characters, loading, error }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacters() {
  return useContext(CharacterContext);
}

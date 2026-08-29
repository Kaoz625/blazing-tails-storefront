import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useCharacters } from "../context/CharacterContext";
import CharacterCard from "../components/CharacterCard";
import { GROUP_ICONS } from "../types/character";

const GROUPS = ["Creators", "Hustlers", "Students", "Professionals", "Gamers", "Explorers", "Nurturers"];
const MODELS = ["Claude Opus", "Claude Sonnet", "Claude Haiku", "GPT-4o", "GPT-4o Mini", "Gemini Pro", "Gemini Flash", "Llama 3", "Mistral", "Grok", "Perplexity", "Command R+"];

export default function Shop() {
  const { characters, loading } = useCharacters();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const activeGroup = searchParams.get("group") ?? "All";
  const activeModel = searchParams.get("model") ?? "All";

  function setGroup(g: string) {
    const p = new URLSearchParams(searchParams);
    if (g === "All") p.delete("group"); else p.set("group", g);
    setSearchParams(p);
  }
  function setModel(m: string) {
    const p = new URLSearchParams(searchParams);
    if (m === "All") p.delete("model"); else p.set("model", m);
    setSearchParams(p);
  }

  const filtered = useMemo(() => {
    return characters.filter((c) => {
      if (activeGroup !== "All" && c.user_group !== activeGroup) return false;
      if (activeModel !== "All" && c.model !== activeModel) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) &&
          !c.archetype.toLowerCase().includes(search.toLowerCase()) &&
          !c.backstory.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [characters, activeGroup, activeModel, search]);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div className="px-5 py-12 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            All Characters
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {loading ? "Loading…" : `${filtered.length} of ${characters.length} characters`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="w-full lg:w-56 flex-shrink-0">
          {/* Search */}
          <input
            type="text"
            placeholder="Search characters…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl px-4 py-2 text-sm mb-6 border outline-none"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
          />

          {/* Group filter */}
          <div className="mb-6">
            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "var(--text-tertiary)" }}>
              User group
            </p>
            <div className="flex flex-col gap-1">
              {["All", ...GROUPS].map((g) => (
                <button
                  key={g}
                  onClick={() => setGroup(g)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all"
                  style={
                    activeGroup === g
                      ? { background: "rgba(124,111,239,0.15)", color: "#7c6fef", fontWeight: 600 }
                      : { color: "var(--text-secondary)" }
                  }
                >
                  {g !== "All" && <span>{GROUP_ICONS[g]}</span>}
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Model filter */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "var(--text-tertiary)" }}>
              AI Model
            </p>
            <div className="flex flex-col gap-1">
              {["All", ...MODELS].map((m) => (
                <button
                  key={m}
                  onClick={() => setModel(m)}
                  className="px-3 py-2 rounded-lg text-xs text-left transition-all"
                  style={
                    activeModel === m
                      ? { background: "rgba(124,111,239,0.15)", color: "#7c6fef", fontWeight: 600 }
                      : { color: "var(--text-secondary)" }
                  }
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border animate-pulse"
                  style={{ height: "280px", background: "var(--card-bg)", borderColor: "var(--border)" }}
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20" style={{ color: "var(--text-tertiary)" }}>
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg font-medium">No characters found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((c) => (
                <CharacterCard key={c.id} character={c} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

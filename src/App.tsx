import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import AgeGate from "./components/AgeGate";
import Home from "./pages/Home";
import Magazine from "./pages/Magazine";
import Category from "./pages/Category";

function Header({ nsfw, onToggleNsfw }: { nsfw: boolean; onToggleNsfw: () => void }) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-gray-950/95 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-yellow-400 font-black text-lg tracking-tight">Blazing Tails</span>
          <span className="text-gray-600 text-xs hidden sm:block">by NYC Tailblazers</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm text-gray-400">
          <Link
            to="/"
            className={`hover:text-white transition-colors ${location.pathname === "/" ? "text-white" : ""}`}
          >
            All Editions
          </Link>
          <a
            href="mailto:nyctailblazers@nyctailblazers.com"
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </nav>

        <button
          onClick={onToggleNsfw}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex-shrink-0 ${
            nsfw
              ? "bg-red-900/40 border-red-500/40 text-red-400 hover:bg-red-900/60"
              : "bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700"
          }`}
          title={nsfw ? "NSFW content visible — click to blur" : "NSFW content blurred — click to reveal"}
        >
          <span>{nsfw ? "OPEN" : "BLUR"}</span>
          <span className="hidden sm:inline">NSFW {nsfw ? "ON" : "OFF"}</span>
        </button>
      </div>
    </header>
  );
}

function AppInner() {
  const [nsfw, setNsfw] = useState(false);

  return (
    <>
      <Header nsfw={nsfw} onToggleNsfw={() => setNsfw((v) => !v)} />
      <main>
        <Routes>
          <Route path="/" element={<Home nsfw={nsfw} />} />
          <Route path="/magazine/:id" element={<Magazine nsfw={nsfw} />} />
          <Route path="/category/:name" element={<Category nsfw={nsfw} />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const handleConfirm = useCallback(() => setAgeConfirmed(true), []);

  return (
    <BrowserRouter>
      <AgeGate onConfirm={handleConfirm} />
      {ageConfirmed && <AppInner />}
    </BrowserRouter>
  );
}

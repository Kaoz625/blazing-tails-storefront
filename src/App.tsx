import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AgeGate from "./components/AgeGate";
import Home from "./pages/Home";
import Magazine from "./pages/Magazine";
import Category from "./pages/Category";
import { getEditionById } from "./data/editions";

function Header({ nsfw, onToggleNsfw }: { nsfw: boolean; onToggleNsfw: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();

  function handleToggle() {
    // If on a magazine page, navigate to the paired edition
    if (params.id) {
      const current = getEditionById(params.id);
      if (current) {
        navigate(`/magazine/${current.pairedId}`);
        return;
      }
    }
    onToggleNsfw();
  }

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{
        backgroundColor: "rgba(245,244,237,0.92)",
        borderColor: "var(--border-warm)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <span
            className="font-serif font-medium text-xl tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Blazing Tails
          </span>
          <span
            className="hidden sm:block text-xs font-sans"
            style={{ color: "var(--text-tertiary)" }}
          >
            by NYC Tailblazers
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-sans">
          {[
            { to: "/", label: "All Editions" },
            { to: "/category/pearls", label: "Browse" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="transition-colors"
              style={{
                color: location.pathname === to ? "var(--text-primary)" : "var(--text-secondary)",
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href="mailto:nyctailblazers@nyctailblazers.com"
            className="transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            Contact
          </a>
        </nav>

        {/* NSFW toggle */}
        <button
          onClick={handleToggle}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-sans font-medium transition-all flex-shrink-0 border"
          style={
            nsfw
              ? {
                  backgroundColor: "rgba(201,100,66,0.12)",
                  borderColor: "rgba(201,100,66,0.4)",
                  color: "var(--color-terracotta)",
                }
              : {
                  backgroundColor: "var(--border-warm)",
                  borderColor: "var(--border-cream)",
                  color: "var(--text-secondary)",
                }
          }
        >
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ backgroundColor: nsfw ? "var(--color-terracotta)" : "var(--text-tertiary)" }}
          />
          {nsfw ? "NSFW ON" : "SFW MODE"}
        </button>
      </div>
    </header>
  );
}

function AppInner() {
  const [nsfw, setNsfw] = useState(false);

  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
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
          }
        />
      </Routes>
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

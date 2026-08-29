import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { CharacterProvider } from "./context/CharacterContext";
import { CartProvider, useCart } from "./context/CartContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CharacterDetail from "./pages/CharacterDetail";
import About from "./pages/About";
import Cart from "./pages/Cart";

function Nav() {
  const location = useLocation();
  const { items } = useCart();
  const cartCount = items.reduce((s, i) => s + i.qty, 0);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
  ];

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{ background: "rgba(13,13,15,0.88)", borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <span
            className="font-bold text-lg tracking-tight"
            style={{
              background: "linear-gradient(90deg, #7c6fef 0%, #4bb8a9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Blazing Tails
          </span>
          <span className="hidden sm:block text-xs" style={{ color: "var(--text-tertiary)" }}>
            by NYC Tailblazers
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="transition-colors"
              style={{ color: isActive(to) ? "var(--text-primary)" : "var(--text-secondary)" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Cart */}
        <Link
          to="/cart"
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium border transition-all flex-shrink-0"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "var(--card-bg)" }}
        >
          Cart
          {cartCount > 0 && (
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ background: "#7c6fef", color: "white" }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CharacterProvider>
        <CartProvider>
          <Nav />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/character/:slug" element={<CharacterDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </CartProvider>
      </CharacterProvider>
    </BrowserRouter>
  );
}

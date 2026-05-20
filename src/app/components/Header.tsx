import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { ChevronDown, Menu, X, Search } from "lucide-react";
import { SearchModal } from "./SearchModal";
import logoGoku from "../../assets/logo.png";

type NavLink = {
  labelKey: string;
  href: string;
  label: string;
  dropdown?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { labelKey: "nav.home", href: "/", label: "Inicio" },
  { labelKey: "nav.about", href: "/nosotros", label: "Nosotros" },
  {
    labelKey: "nav.courses",
    href: "/cursos",
    label: "Cursos",
    dropdown: [
      { label: "🧒 Niñas, niños y adolescentes", href: "/cursos/ninos" },
      { label: "👨‍💼 Para adultos", href: "/cursos/adultos" },
      { label: "🏢 Empresas y gobierno", href: "/capacitaciones" },
    ],
  },
  { labelKey: "nav.methodology", href: "/metodologia", label: "Metodología" },
  { labelKey: "nav.events", href: "/eventos", label: "Eventos" },
  { labelKey: "nav.support", href: "/becas", label: "Apoyos" },
  { labelKey: "nav.contact", href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdown(null);
  }, [location]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-colors duration-300"
      style={{
        background: scrolled
          ? "rgba(255, 255, 255, 0.96)"
          : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.1)" : "none",
        transition: "all 0.3s ease",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={logoGoku}
              alt="Gōku Lab"
              className="h-10 sm:h-12 object-contain"
              style={{ transition: "all 0.2s ease" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setDropdown(link.labelKey)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    style={{ transition: "all 0.2s ease" }}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        size={14}
                        style={{
                          transition: "transform 0.2s",
                          transform: dropdown === link.labelKey
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.dropdown && dropdown === link.labelKey && (
                    <div
                      className="absolute top-full left-0 pt-2 w-64"
                      onMouseEnter={() => setDropdown(link.labelKey)}
                      onMouseLeave={() => setDropdown(null)}
                    >
                      <div
                        className="rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.98)",
                          border: "1px solid rgba(0,0,0,0.1)",
                          backdropFilter: "blur(12px)",
                          animation: "dropIn 0.2s ease",
                        }}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                            style={{ transition: "all 0.2s ease" }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* CTA + Controls */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/test"
              className="px-5 py-2 rounded-xl text-sm font-semibold border transition-all duration-300 text-gray-700 border-gray-300 hover:border-gray-500"
            >
              Diagnóstico
            </Link>
            <Link
              to="/contacto"
              className="px-5 py-2 rounded-xl text-sm text-white font-semibold"
              style={{
                background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 15px rgba(0,201,255,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,201,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,201,255,0.3)";
              }}
            >
              Agendar masterclass gratuita
            </Link>

            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              style={{ transition: "all 0.2s ease" }}
              aria-label="Buscar cursos"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              className="text-gray-900 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden"
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            borderTop: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  to={link.href}
                  className="block px-4 py-3 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  style={{ transition: "all 0.2s ease" }}
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className="pl-4">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/contacto"
              className="mt-2 text-center px-5 py-3 rounded-xl text-white font-semibold"
              style={{ background: "linear-gradient(135deg, #00C9FF, #7C3AED)" }}
            >
              Agendar masterclass gratuita
            </Link>
          </div>
        </div>
      )}

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
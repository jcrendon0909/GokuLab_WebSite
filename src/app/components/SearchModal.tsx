import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router";

interface Course {
  id: string;
  title: string;
  segment: string;
  age: string;
  category: string;
  emoji: string;
}

const allCourses: Course[] = [
  // Niños
  { id: "scratch-basico", title: "Scratch para Principiantes", segment: "ninos", age: "6–10 años", category: "Programación", emoji: "🐱" },
  { id: "minecraft-edu", title: "Minecraft Education", segment: "ninos", age: "8–12 años", category: "Programación", emoji: "⛏️" },
  { id: "robotica-basica", title: "Robótica con Micro:bit", segment: "ninos", age: "9–12 años", category: "Robótica", emoji: "🤖" },
  { id: "diseno-digital", title: "Diseño Digital Creativo", segment: "ninos", age: "8–12 años", category: "Diseño", emoji: "🎨" },
  { id: "verano-ninos", title: "Curso de Verano Intensivo", segment: "ninos", age: "7–12 años", category: "Verano", emoji: "☀️" },

  // Adolescentes
  { id: "app-inventor", title: "Crea tu App Móvil", segment: "adolescentes", age: "13–17 años", category: "Programación", emoji: "📱" },
  { id: "videojuegos-roblox", title: "Desarrollo de Juegos Roblox", segment: "adolescentes", age: "12–17 años", category: "Videojuegos", emoji: "🎮" },
  { id: "python-teen", title: "Python para Adolescentes", segment: "adolescentes", age: "13–17 años", category: "Programación", emoji: "🐍" },
  { id: "web-dev-teen", title: "Desarrollo Web Profesional", segment: "adolescentes", age: "13–17 años", category: "Programación", emoji: "🌐" },
  { id: "robotica-avanzada", title: "Robótica Avanzada", segment: "adolescentes", age: "13–17 años", category: "Robótica", emoji: "⚡" },
  { id: "diseno-ux", title: "Diseño UX/UI Digital", segment: "adolescentes", age: "13–17 años", category: "Diseño", emoji: "🎨" },

  // Adultos
  { id: "python-basico", title: "Python para Principiantes", segment: "adultos", age: "18+ años", category: "Programación", emoji: "🐍" },
  { id: "web-html-css", title: "Desarrollo Web: HTML, CSS y JS", segment: "adultos", age: "18+ años", category: "Web", emoji: "🌐" },
  { id: "ia-aplicada", title: "IA Aplicada con ChatGPT", segment: "adultos", age: "18+ años", category: "IA", emoji: "🧠" },
  { id: "data-analytics", title: "Análisis de Datos", segment: "adultos", age: "18+ años", category: "Datos", emoji: "📊" },
  { id: "alfabetizacion-digital", title: "Alfabetización Digital", segment: "adultos", age: "18+ años", category: "Programación", emoji: "💡" },
  { id: "react-advanced", title: "React Avanzado", segment: "adultos", age: "18+ años", category: "Web", emoji: "⚛️" },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCourses = query.trim()
    ? allCourses.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase()) ||
        course.age.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20"
      style={{
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl px-4"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideDown 0.3s ease" }}
      >
        {/* Search Input */}
        <div className="relative mb-6">
          <Search size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar cursos, categorías, edades..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-16 pr-16 py-5 rounded-2xl text-lg text-white placeholder-white/40"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "2px solid rgba(0,201,255,0.3)",
              outline: "none",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#00C9FF";
              e.target.style.background = "rgba(255,255,255,0.12)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(0,201,255,0.3)";
              e.target.style.background = "rgba(255,255,255,0.08)";
            }}
          />
          <button
            onClick={onClose}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Results */}
        {query.trim() && (
          <div
            className="rounded-2xl overflow-hidden shadow-2xl max-h-[60vh] overflow-y-auto"
            style={{
              background: "rgba(14, 24, 33, 0.98)",
              border: "1px solid rgba(0,201,255,0.2)",
            }}
          >
            {filteredCourses.length > 0 ? (
              <div className="grid gap-1 p-2">
                {filteredCourses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/cursos/${course.segment}/${course.id}`}
                    className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/10 transition-all duration-200"
                    onClick={onClose}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                      style={{
                        background: "rgba(0,201,255,0.1)",
                        border: "1px solid rgba(0,201,255,0.2)",
                      }}
                    >
                      {course.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-base font-semibold truncate mb-1">
                        {course.title}
                      </div>
                      <div className="text-white/50 text-sm">
                        {course.category} · {course.age}
                      </div>
                    </div>
                    <div
                      className="text-xs px-3 py-1.5 rounded-lg font-semibold"
                      style={{
                        background: "rgba(0,201,255,0.15)",
                        color: "#00C9FF",
                      }}
                    >
                      {course.segment === "ninos" ? "Niños" : course.segment === "adolescentes" ? "Adolescentes" : "Adultos"}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <div className="text-white/40 text-base mb-3">
                  No se encontraron cursos para "{query}"
                </div>
                <Link
                  to="/cursos"
                  className="text-[#00C9FF] hover:underline inline-flex items-center gap-2"
                  onClick={onClose}
                >
                  Ver todos los cursos →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Quick Links */}
        {!query.trim() && (
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(14, 24, 33, 0.98)",
              border: "1px solid rgba(0,201,255,0.2)",
            }}
          >
            <div className="text-white/60 text-sm mb-4">Accesos rápidos</div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: "Niñas, niños y adolescentes", href: "/cursos/ninos", emoji: "🧒" },
                { label: "Adultos", href: "/cursos/adultos", emoji: "👨‍💼" },
                { label: "Empresas", href: "/capacitaciones", emoji: "🏢" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                  onClick={onClose}
                >
                  <span className="text-2xl">{link.emoji}</span>
                  <span className="text-white text-sm font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

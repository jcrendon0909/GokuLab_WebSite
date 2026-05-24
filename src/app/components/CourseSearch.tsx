import { useState } from "react";
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

export function CourseSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredCourses = query.trim()
    ? allCourses.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase()) ||
        course.age.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  return (
    <div className="relative">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar cursos..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2 rounded-lg text-sm text-gray-800 placeholder-gray-400"
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            outline: "none",
            transition: "all 0.2s ease",
          }}
          onFocusCapture={(e) => {
            e.target.style.borderColor = "#00C9FF";
            e.target.style.background = "#ffffff";
          }}
          onBlur={(e) => {
            setTimeout(() => setIsOpen(false), 200);
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.background = "#ffffff";
          }}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && filteredCourses.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-50"
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            animation: "dropIn 0.2s ease",
          }}
        >
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/cursos/${course.segment}/${course.id}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
            >
              <span className="text-2xl">{course.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-gray-800 text-sm font-semibold truncate">{course.title}</div>
                <div className="text-gray-500 text-xs">
                  {course.category} · {course.age}
                </div>
              </div>
              <div
                className="text-xs px-2 py-1 rounded-md font-semibold"
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
      )}

      {isOpen && query && filteredCourses.length === 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 px-4 py-6 rounded-xl text-center"
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        >
          <div className="text-gray-400 text-sm">No se encontraron cursos</div>
          <Link
            to="/cursos"
            className="text-[#00C9FF] text-xs hover:underline mt-2 inline-block"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
          >
            Ver todos los cursos →
          </Link>
        </div>
      )}
    </div>
  );
}
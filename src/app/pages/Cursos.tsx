import { useState } from "react";
import { Link, useParams } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { useTheme } from "next-themes";
import { ChevronRight, Clock, Users, BarChart2, Monitor, MessageCircle, Filter, Award, Globe, Rocket, Star } from "lucide-react";
import algorithmicsLogo from "../../imports/image-0.png";

const KIDS_IMG = "https://images.unsplash.com/photo-1603354350266-a8de3496163b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHJvYm90JTIwc2NpZW5jZSUyMFNURU0lMjBsZWFybmluZyUyMGZ1bnxlbnwxfHx8fDE3NzU4NTYyNDF8MA&ixlib=rb-4.1.0&q=80&w=600";
const ADULT_IMG = "https://images.unsplash.com/photo-1724260793422-7754e5d06fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600";
const TEEN_IMG = "https://images.unsplash.com/photo-1635959952534-d99f969554a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600";

type Category = "todos" | "programacion" | "robotica" | "diseno" | "verano" | "expansion";

const allCourses = [
  // NIÑOS
  {
    id: "scratch-basico",
    segment: "ninos",
    title: "Scratch para Principiantes",
    desc: "Crea animaciones e historias interactivas con el lenguaje visual más popular para niños.",
    age: "6–10 años",
    level: "Básico",
    duration: "8 semanas",
    modality: "Presencial / Online",
    techs: ["Scratch", "Code.org"],
    category: "programacion" as Category,
    color: "#FF6B35",
    img: KIDS_IMG,
    emoji: "🐱",
    algorithmics: true,
  },
  {
    id: "minecraft-edu",
    segment: "ninos",
    title: "Minecraft Education",
    desc: "Programación y pensamiento computacional a través de Minecraft en un ambiente educativo.",
    age: "8–12 años",
    level: "Básico",
    duration: "10 semanas",
    modality: "Online",
    techs: ["Minecraft EDU", "Scratch"],
    category: "programacion" as Category,
    color: "#4CAF50",
    img: KIDS_IMG,
    emoji: "⛏️",
  },
  {
    id: "robotica-basica",
    segment: "ninos",
    title: "Robótica con Micro:bit",
    desc: "Construye y programa robots y gadgets con la tarjeta Micro:bit. ¡Aprende electrónica haciendo!",
    age: "9–14 años",
    level: "Básico-Intermedio",
    duration: "12 semanas",
    modality: "Presencial",
    techs: ["Micro:bit", "Tinkercad"],
    category: "robotica" as Category,
    color: "#1E88E5",
    img: KIDS_IMG,
    emoji: "🤖",
  },
  {
    id: "app-inventor",
    segment: "ninos",
    title: "Crea tu App con MIT",
    desc: "Diseña y publica tu propia aplicación móvil usando MIT App Inventor.",
    age: "11–16 años",
    level: "Intermedio",
    duration: "10 semanas",
    modality: "Online / Presencial",
    techs: ["MIT App Inventor", "Thunkable"],
    category: "programacion" as Category,
    color: "#E91E63",
    img: TEEN_IMG,
    emoji: "📱",
  },
  {
    id: "diseno-digital",
    segment: "ninos",
    title: "Diseño Digital Creativo",
    desc: "Crea logos, presentaciones y contenido visual con herramientas profesionales.",
    age: "10–16 años",
    level: "Básico",
    duration: "8 semanas",
    modality: "Online",
    techs: ["Canva", "VS Code"],
    category: "diseno" as Category,
    color: "#9C27B0",
    img: TEEN_IMG,
    emoji: "🎨",
  },
  {
    id: "videojuegos-roblox",
    segment: "ninos",
    title: "Videojuegos con Roblox Studio",
    desc: "Diseña y publica tus propios videojuegos en Roblox usando Lua básico.",
    age: "10–16 años",
    level: "Intermedio",
    duration: "12 semanas",
    modality: "Online",
    techs: ["Roblox Studio", "GameMaker"],
    category: "programacion" as Category,
    color: "#E53E3E",
    img: TEEN_IMG,
    emoji: "🎮",
    algorithmics: true,
  },
  {
    id: "verano-ninos",
    segment: "ninos",
    title: "Curso de Verano Intensivo",
    desc: "4 semanas de programación, robótica y diseño. El mejor verano tech para tus hijos.",
    age: "7–16 años",
    level: "Todos los niveles",
    duration: "4 semanas",
    modality: "Presencial",
    techs: ["Scratch", "Micro:bit", "Tinkercad"],
    category: "verano" as Category,
    color: "#FFE134",
    img: KIDS_IMG,
    emoji: "☀️",
  },
  // ADULTOS
  {
    id: "python-basico",
    segment: "adultos",
    title: "Python para Principiantes",
    desc: "Aprende el lenguaje de programación más popular del mundo. Sin experiencia previa requerida.",
    age: "18+ años",
    level: "Básico",
    duration: "12 semanas",
    modality: "Online / Presencial",
    techs: ["Python", "VS Code", "Google Colab"],
    category: "programacion" as Category,
    color: "#00C9FF",
    img: ADULT_IMG,
    emoji: "🐍",
    algorithmics: true,
  },
  {
    id: "web-html-css",
    segment: "adultos",
    title: "Desarrollo Web: HTML, CSS y JS",
    desc: "Construye sitios web modernos desde cero. Práctica real con proyectos desde el primer día.",
    age: "18+ años",
    level: "Básico-Intermedio",
    duration: "16 semanas",
    modality: "Online",
    techs: ["HTML", "CSS", "JavaScript", "VS Code"],
    category: "programacion" as Category,
    color: "#7C3AED",
    img: ADULT_IMG,
    emoji: "🌐",
    algorithmics: true,
  },
  {
    id: "ia-aplicada",
    segment: "adultos",
    title: "IA Aplicada con ChatGPT",
    desc: "Domina las herramientas de IA más relevantes del mercado. Perfecto para profesionales.",
    age: "18+ años",
    level: "Básico",
    duration: "8 semanas",
    modality: "Online",
    techs: ["ChatGPT", "Google Colab", "Python"],
    category: "expansion" as Category,
    color: "#10B981",
    img: ADULT_IMG,
    emoji: "🧠",
    algorithmics: true,
  },
  {
    id: "alfabetizacion-digital",
    segment: "adultos",
    title: "Alfabetización Digital",
    desc: "Para adultos mayores o principiantes absolutos. Domina la tecnología básica con confianza.",
    age: "18+ años",
    level: "Básico",
    duration: "6 semanas",
    modality: "Presencial",
    techs: ["Cloud Tools", "MS Office"],
    category: "expansion" as Category,
    color: "#FF6B35",
    img: ADULT_IMG,
    emoji: "💡",
  },
];

const categories: { id: Category | "todos"; label: string; emoji: string }[] = [
  { id: "todos", label: "Todos", emoji: "📚" },
  { id: "programacion", label: "Programación", emoji: "💻" },
  { id: "robotica", label: "Robótica", emoji: "🤖" },
  { id: "diseno", label: "Diseño", emoji: "🎨" },
  { id: "verano", label: "Verano", emoji: "☀️" },
  { id: "expansion", label: "Expansión", emoji: "🚀" },
];

const segmentConfig = {
  ninos: {
    title: "Cursos para Niños y Adolescentes",
    subtitle: "6 – 17 años",
    desc: "Aprendizaje dinámico, divertido y enfocado en crear con tecnología.",
    color: "#FF6B35",
    badge: "🧒",
    bgLight: "rgba(255,107,53,0.06)",
    bgDark: "rgba(255,107,53,0.06)",
  },
  adultos: {
    title: "Cursos para Adultos",
    subtitle: "18+ años",
    desc: "Actualízate profesionalmente y abre nuevas oportunidades de carrera.",
    color: "#00C9FF",
    badge: "👨‍💼",
    bgLight: "rgba(0,201,255,0.06)",
    bgDark: "rgba(0,201,255,0.06)",
  },
  todos: {
    title: "Todos los Cursos",
    subtitle: "Para todos",
    desc: "Explora nuestra oferta completa de cursos tecnológicos.",
    color: "#7C3AED",
    badge: "📚",
    bgLight: "rgba(124,58,237,0.06)",
    bgDark: "rgba(124,58,237,0.06)",
  },
};

export function Cursos() {
  const { segmento } = useParams<{ segmento?: string }>();
  const [activeCategory, setActiveCategory] = useState<Category | "todos">("todos");
  const { theme } = useTheme();

  const seg = (segmento as keyof typeof segmentConfig) || "todos";
  const config = segmentConfig[seg] || segmentConfig.todos;

  const filtered = allCourses.filter((c) => {
    const segMatch = seg === "todos" || c.segment === seg;
    const catMatch = activeCategory === "todos" || c.category === activeCategory;
    return segMatch && catMatch;
  });

  return (
    <div className="bg-white dark:bg-[#0A0F1E] transition-colors duration-300">
      {/* HERO */}
      <section
        className="pt-32 pb-16 px-4 relative overflow-hidden transition-colors duration-300"
        style={{
          background: seg === "ninos"
            ? (theme === "dark" ? "linear-gradient(180deg, #0A0F1E 0%, #1a1547 50%, #2d1b69 100%)" : "linear-gradient(180deg, #ffffff 0%, #f3ebfb 50%, #e6dcf3 100%)")
            : (theme === "dark" ? config.bgDark : config.bgLight)
        }}
      >
        {/* Space theme for kids */}
        {seg === "ninos" && (
          <>
            {/* Stars background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-indigo-500 dark:bg-white"
                  style={{
                    width: Math.random() * 3 + 1 + "px",
                    height: Math.random() * 3 + 1 + "px",
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                    opacity: Math.random() * 0.7 + 0.3,
                    animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                    animationDelay: Math.random() * 2 + "s"
                  }}
                />
              ))}
            </div>

            {/* Floating planets */}
            <div className="absolute top-20 right-10 w-32 h-32 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle at 30% 30%, #FFB347, #FF6B35)",
                boxShadow: "0 0 60px rgba(255,107,53,0.4)",
                animation: "floatPlanet 20s ease-in-out infinite"
              }}
            />
            <div className="absolute bottom-20 left-10 w-20 h-20 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle at 30% 30%, #4ECDC4, #00C9FF)",
                boxShadow: "0 0 40px rgba(0,201,255,0.4)",
                animation: "floatPlanet 15s ease-in-out infinite reverse"
              }}
            />

            {/* Rocket */}
            <div
              className="absolute top-1/2 right-1/4 text-6xl pointer-events-none"
              style={{
                animation: "floatRocket 25s linear infinite",
                opacity: 0.6
              }}
            >
              🚀
            </div>
          </>
        )}

        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-300"
          style={{
            background: seg === "ninos"
              ? "radial-gradient(ellipse at center, rgba(255,107,53,0.1) 0%, transparent 70%)"
              : `radial-gradient(ellipse at center, ${config.color}08 0%, transparent 70%)`,
          }}
        />
        <div className="max-w-5xl mx-auto text-center relative">
          <AnimatedSection>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-6"
              style={{
                background: `${config.color}15`,
                color: config.color,
                border: `1px solid ${config.color}30`,
              }}
            >
              <span>{config.badge}</span>
              <span>{config.subtitle}</span>
            </div>
            <h1
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 1.15,
              }}
            >
              {config.title}
            </h1>
            <p className="text-gray-600 dark:text-white/65 max-w-2xl mx-auto mb-8 transition-colors duration-300" style={{ fontSize: "1.1rem" }}>
              {config.desc}
            </p>

            {/* Segment switcher */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {[
                { href: "/cursos", label: "Todos", id: "todos" },
                { href: "/cursos/ninos", label: "🧒 Niños y adolescentes", id: "ninos" },
                { href: "/cursos/adultos", label: "👨‍💼 Para adultos", id: "adultos" },
                { href: "/capacitaciones", label: "🏢 Empresas y gobierno", id: "empresas" },
              ].map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className="px-5 py-2 rounded-xl text-sm font-semibold transition-colors duration-300"
                  style={{
                    background: seg === item.id ? config.color : (theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"),
                    color: seg === item.id ? "#fff" : (theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"),
                    border: `1px solid ${seg === item.id ? config.color : (theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)")}`,
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-6 px-4 sticky top-16 z-30 transition-colors duration-300" style={{ background: theme === "dark" ? "rgba(10,15,30,0.95)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: theme === "dark" ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <Filter size={16} className="text-gray-400 dark:text-white/40 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm shrink-0 transition-colors duration-300"
                style={{
                  background: activeCategory === cat.id ? config.color : (theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"),
                  color: activeCategory === cat.id ? "#fff" : (theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"),
                  border: `1px solid ${activeCategory === cat.id ? config.color : (theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)")}`,
                }}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES GRID */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-500 dark:text-white/50 transition-colors duration-300">No se encontraron cursos con esos filtros.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((course, i) => {
                const isKids = course.segment === "ninos";
                const isTeen = isKids && parseInt(course.age.match(/\d+/)?.[0] || "0") >= 11;

                return (
                <AnimatedSection key={course.id} delay={i * 60}>
                  <div
                    className={`rounded-3xl overflow-hidden flex flex-col h-full group ${isKids ? 'space-card' : ''} bg-white dark:bg-transparent`}
                    style={{
                      background: isKids
                        ? isTeen
                          ? (theme === "dark" ? "linear-gradient(135deg, rgba(20,20,30,0.95), rgba(10,15,30,0.95))" : "linear-gradient(135deg, rgba(245,245,250,0.95), rgba(255,255,255,0.95))")
                          : (theme === "dark" ? "linear-gradient(135deg, rgba(45,27,105,0.3), rgba(10,15,30,0.95))" : "linear-gradient(135deg, rgba(230,225,245,0.8), rgba(255,255,255,0.95))")
                        : (theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"),
                      border: isKids
                        ? isTeen
                          ? (theme === "dark" ? "1px solid rgba(0,201,255,0.2)" : "1px solid rgba(0,201,255,0.3)")
                          : `1px solid ${course.color}30`
                        : (theme === "dark" ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.1)"),
                      transition: "all 0.3s ease",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = isKids ? "translateY(-8px) scale(1.02)" : "translateY(-6px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = isKids
                        ? `0 25px 60px ${course.color}40, 0 0 40px ${course.color}20`
                        : `0 20px 50px ${course.color}20`;
                      (e.currentTarget as HTMLElement).style.borderColor = course.color + "60";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "none";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLElement).style.borderColor = isKids
                        ? isTeen
                          ? (theme === "dark" ? "rgba(0,201,255,0.2)" : "rgba(0,201,255,0.3)")
                          : course.color + "30"
                        : (theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)");
                    }}
                  >
                    {/* NASA/Tech grid pattern for teens */}
                    {isKids && isTeen && (
                      <div
                        className="absolute inset-0 pointer-events-none opacity-10"
                        style={{
                          backgroundImage: `
                            linear-gradient(rgba(0,201,255,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,201,255,0.3) 1px, transparent 1px)
                          `,
                          backgroundSize: "20px 20px",
                        }}
                      />
                    )}

                    {/* Sparkles for younger kids */}
                    {isKids && !isTeen && (
                      <div className="absolute top-2 right-2 pointer-events-none">
                        <div className="text-yellow-400 dark:text-yellow-300 text-xl animate-pulse">✨</div>
                      </div>
                    )}
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={course.img}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        style={{ transition: "transform 0.5s ease" }}
                      />
                      <div
                        className="absolute inset-0 transition-colors duration-300"
                        style={{ background: theme === "dark" ? `linear-gradient(to top, rgba(10,15,30,0.9), transparent)` : `linear-gradient(to top, rgba(255,255,255,0.9), transparent)` }}
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <span
                          className="text-xs px-2 py-1 rounded-full font-semibold"
                          style={{ background: course.color, color: "#fff" }}
                        >
                          {course.level}
                        </span>
                        {course.algorithmics && (
                          <span
                            className="text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1 shadow-sm"
                            style={{
                              background: "linear-gradient(135deg, #7C3AED, #00C9FF)",
                              color: "#fff"
                            }}
                          >
                            <Globe size={10} />
                            Algorithmics
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3 text-2xl drop-shadow-md">
                        {course.emoji}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1 relative z-10">
                      <h3
                        className="text-gray-900 dark:text-white mb-2 transition-colors duration-300"
                        style={{ fontWeight: 700, fontSize: "0.95rem" }}
                      >
                        {course.title}
                      </h3>
                      <p className="text-gray-600 dark:text-white/55 text-xs leading-relaxed mb-4 flex-1 transition-colors duration-300">
                        {course.desc}
                      </p>

                      {/* Meta */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {[
                          { icon: Users, text: course.age },
                          { icon: Clock, text: course.duration },
                          { icon: BarChart2, text: course.level },
                          { icon: Monitor, text: course.modality.split(" / ")[0] },
                        ].map(({ icon: Icon, text }) => (
                          <div key={text} className="flex items-center gap-1.5">
                            <Icon size={12} className="text-gray-400 dark:text-white/30" />
                            <span className="text-gray-500 dark:text-white/45 text-xs transition-colors duration-300">{text}</span>
                          </div>
                        ))}
                      </div>

                      {/* Techs */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {course.techs.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: `${course.color}15`,
                              color: course.color,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* CTAs */}
                      <div className="flex gap-2">
                        <Link
                          to={`/cursos/${course.segment}/${course.id}`}
                          className="flex-1 py-2.5 rounded-xl text-center text-sm font-semibold text-white"
                          style={{
                            background: course.color,
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = "0.88";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = "1";
                          }}
                        >
                          Ver curso
                        </Link>
                        <a
                          href={`https://wa.me/5612668168?text=Hola,%20me%20interesa%20el%20curso%20${encodeURIComponent(course.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl flex items-center justify-center"
                          style={{
                            background: "#25D36620",
                            color: "#25D366",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#25D366";
                            e.currentTarget.style.color = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#25D36620";
                            e.currentTarget.style.color = "#25D366";
                          }}
                        >
                          <MessageCircle size={15} />
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ALGORITHMICS SECTION - Only show for kids/todos */}
      {(seg === "ninos" || seg === "todos") && (
        <section className="py-16 px-4 transition-colors duration-300" style={{
          background: theme === "dark" ? "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(0,201,255,0.08))" : "linear-gradient(135deg, rgba(124,58,237,0.04), rgba(0,201,255,0.04))",
          borderTop: theme === "dark" ? "1px solid rgba(124,58,237,0.15)" : "1px solid rgba(124,58,237,0.1)",
          borderBottom: theme === "dark" ? "1px solid rgba(0,201,255,0.15)" : "1px solid rgba(0,201,255,0.1)"
        }}>
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Logo & Info */}
                <div>
                  <div className="mb-6">
                    <img
                      src={algorithmicsLogo}
                      alt="Algorithmics International School of Programming"
                      className="h-12 mb-4"
                      style={{ filter: theme === "dark" ? "brightness(1.1)" : "brightness(0.9) grayscale(100%)" }}
                    />
                    <div className="flex items-center gap-2 mb-2">
                      <Globe size={18} className="text-[#7C3AED]" />
                      <span className="text-gray-700 dark:text-white/80 font-semibold transition-colors duration-300">International School of Programming</span>
                    </div>
                  </div>

                  <h3
                    className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800 }}
                  >
                    Cursos potenciados por{" "}
                    <span style={{
                      background: "linear-gradient(90deg, #7C3AED, #00C9FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>
                      Algorithmics
                    </span>
                  </h3>

                  <p className="text-gray-600 dark:text-white/65 mb-6 leading-relaxed transition-colors duration-300">
                    Varios de nuestros cursos de programación utilizan la metodología internacional
                    de Algorithmics, una escuela global de programación con presencia en más de 70 países.
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Rocket, text: "Plataforma de aprendizaje 24/7", color: "#7C3AED" },
                      { icon: Award, text: "Metodología con reconocimientos internacionales", color: "#00C9FF" },
                      { icon: Star, text: "Contenido actualizado por expertos globales", color: "#10B981" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${item.color}15` }}
                        >
                          <item.icon size={18} style={{ color: item.color }} />
                        </div>
                        <div className="pt-2">
                          <p className="text-gray-700 dark:text-white/80 transition-colors duration-300">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                    style={{
                      background: "rgba(124,58,237,0.12)",
                      border: "1px solid rgba(124,58,237,0.3)",
                      color: theme === "dark" ? "#B794F4" : "#7C3AED"
                    }}
                  >
                    <Award size={14} />
                    <span className="font-semibold">Cursos con certificación internacional</span>
                  </div>
                </div>

                {/* Courses with Algorithmics */}
                <div>
                  <div
                    className="p-6 rounded-3xl transition-colors duration-300"
                    style={{
                      background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                      border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)"
                    }}
                  >
                    <h4 className="text-gray-500 dark:text-white font-bold mb-4 text-sm uppercase tracking-wider opacity-80 dark:opacity-60 transition-colors duration-300">
                      Cursos con Algorithmics
                    </h4>
                    <div className="space-y-2">
                      {allCourses
                        .filter(c => c.algorithmics && (seg === "todos" || c.segment === seg))
                        .slice(0, 6)
                        .map(course => (
                          <div
                            key={course.id}
                            className="flex items-center justify-between p-3 rounded-xl transition-colors duration-300 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-none"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{course.emoji}</span>
                              <div>
                                <p className="text-gray-900 dark:text-white/90 font-medium text-sm transition-colors duration-300">{course.title}</p>
                                <p className="text-gray-500 dark:text-white/40 text-xs transition-colors duration-300">{course.age}</p>
                              </div>
                            </div>
                            <Link
                              to={`/cursos/${course.segment}/${course.id}`}
                              className="text-xs px-3 py-1.5 rounded-lg font-semibold"
                              style={{
                                background: course.color,
                                color: "#fff"
                              }}
                            >
                              Ver
                            </Link>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section
        className="py-20 px-4 transition-colors duration-300"
        style={{
          background: theme === "dark" ? "linear-gradient(135deg, rgba(0,201,255,0.06), rgba(124,58,237,0.06))" : "linear-gradient(135deg, rgba(0,201,255,0.04), rgba(124,58,237,0.04))",
          borderTop: theme === "dark" ? "1px solid rgba(0,201,255,0.1)" : "1px solid rgba(0,201,255,0.05)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 800 }}
            >
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-gray-600 dark:text-white/60 mb-8 max-w-xl mx-auto transition-colors duration-300">
              Agenda una sesión gratuita y te orientamos al curso perfecto según tu perfil y objetivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5612668168"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold"
                style={{
                  background: "#25D366",
                  boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <MessageCircle size={18} />
                Asesoría por WhatsApp
              </a>
              <Link
                to="/test"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold border transition-colors duration-300 text-gray-900 dark:text-white border-gray-300 dark:border-white/25 hover:bg-gray-100 dark:hover:bg-white/10"
                style={{ transition: "all 0.2s ease" }}
              >
                Hacer el test orientación
                <ChevronRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes floatPlanet {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }

        @keyframes floatRocket {
          0% {
            transform: translate(0, 0) rotate(-45deg);
            opacity: 0;
          }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% {
            transform: translate(-100vw, -50vh) rotate(-45deg);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255,107,53,0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255,107,53,0.6), 0 0 60px rgba(0,201,255,0.4);
          }
        }

        .space-card {
          position: relative;
        }

        .space-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 24px;
          padding: 2px;
          background: linear-gradient(45deg, #FF6B35, #00C9FF, #7C3AED, #FF6B35);
          background-size: 300% 300%;
          animation: gradient-rotate 4s ease infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .space-card:hover::before {
          opacity: 0.6;
        }

        @keyframes gradient-rotate {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
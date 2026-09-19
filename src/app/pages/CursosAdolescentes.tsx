import { useState } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { useTheme } from "next-themes";
import { ChevronRight, Clock, Users, BarChart2, Monitor, MessageCircle, Filter, Award, Globe, Zap } from "lucide-react";
import algorithmicsLogo from "../../imports/image-0.png";

const TEEN_IMG = "https://images.unsplash.com/photo-1635959952534-d99f969554a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600";

type Category = "todos" | "programacion" | "robotica" | "diseno" | "videojuegos";

const courses = [
  {
    id: "app-inventor",
    title: "Crea tu App Móvil",
    desc: "Diseña y publica tu propia aplicación móvil usando MIT App Inventor. De la idea a la tienda de apps.",
    age: "13–17 años",
    level: "Intermedio",
    duration: "10 semanas",
    modality: "Online / Presencial",
    techs: ["MIT App Inventor", "Thunkable"],
    category: "programacion" as Category,
    color: "#00C9FF",
    img: TEEN_IMG,
    emoji: "📱",
  },
  {
    id: "videojuegos-roblox",
    title: "Desarrollo de Juegos Roblox",
    desc: "Diseña y monetiza tus propios videojuegos en Roblox usando Lua. Millones de jugadores esperan tu creación.",
    age: "12–17 años",
    level: "Intermedio",
    duration: "12 semanas",
    modality: "Online",
    techs: ["Roblox Studio", "Lua", "GameMaker"],
    category: "videojuegos" as Category,
    color: "#E53E3E",
    img: TEEN_IMG,
    emoji: "🎮",
    algorithmics: true,
  },
  {
    id: "python-teen",
    title: "Python para Adolescentes",
    desc: "Domina el lenguaje más poderoso del mundo tech. Desde lo básico hasta IA y automatización.",
    age: "13–17 años",
    level: "Básico-Intermedio",
    duration: "14 semanas",
    modality: "Online / Presencial",
    techs: ["Python", "VS Code", "Git"],
    category: "programacion" as Category,
    color: "#10B981",
    img: TEEN_IMG,
    emoji: "🐍",
    algorithmics: true,
  },
  {
    id: "web-dev-teen",
    title: "Desarrollo Web Profesional",
    desc: "Crea sitios web modernos con HTML, CSS y JavaScript. Portfolio real desde el primer día.",
    age: "13–17 años",
    level: "Intermedio",
    duration: "16 semanas",
    modality: "Online",
    techs: ["HTML", "CSS", "JavaScript", "React"],
    category: "programacion" as Category,
    color: "#7C3AED",
    img: TEEN_IMG,
    emoji: "🌐",
    algorithmics: true,
  },
  {
    id: "robotica-avanzada",
    title: "Robótica Avanzada",
    desc: "Arduino, sensores, motores y proyectos IoT. Construye tecnología que cambia el mundo.",
    age: "13–17 años",
    level: "Intermedio-Avanzado",
    duration: "12 semanas",
    modality: "Presencial",
    techs: ["Arduino", "Raspberry Pi", "IoT"],
    category: "robotica" as Category,
    color: "#F97316",
    img: TEEN_IMG,
    emoji: "⚡",
  },
  {
    id: "diseno-ux",
    title: "Diseño UX/UI Digital",
    desc: "Aprende a diseñar experiencias digitales profesionales con Figma y herramientas de la industria.",
    age: "13–17 años",
    level: "Básico-Intermedio",
    duration: "10 semanas",
    modality: "Online",
    techs: ["Figma", "Adobe XD", "Prototyping"],
    category: "diseno" as Category,
    color: "#E91E63",
    img: TEEN_IMG,
    emoji: "🎨",
  },
];

const categories: { id: Category | "todos"; label: string; emoji: string }[] = [
  { id: "todos", label: "Todos", emoji: "⚡" },
  { id: "programacion", label: "Programación", emoji: "💻" },
  { id: "robotica", label: "Robótica", emoji: "🤖" },
  { id: "videojuegos", label: "Videojuegos", emoji: "🎮" },
  { id: "diseno", label: "Diseño", emoji: "🎨" },
];

export function CursosAdolescentes() {
  const [activeCategory, setActiveCategory] = useState<Category | "todos">("todos");
  const { theme } = useTheme();

  const filtered = courses.filter((c) => {
    return activeCategory === "todos" || c.category === activeCategory;
  });

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-[#0A0F1E]">
      {/* HERO ESTILO NASA/TESLA */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden transition-colors duration-300" style={{
        background: theme === "dark" 
          ? "linear-gradient(180deg, #0A0F1E 0%, #141820 50%, #0A0F1E 100%)"
          : "linear-gradient(180deg, #f8fafc 0%, #e0f2fe 50%, #f8fafc 100%)"
      }}>
        {/* Grid pattern tech */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: theme === "dark" ? 0.2 : 0.4,
            backgroundImage: `
              linear-gradient(rgba(0,201,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,201,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Líneas diagonales tech */}
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ opacity: theme === "dark" ? 0.1 : 0.25 }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px"
              style={{
                width: "200%",
                background: "linear-gradient(90deg, transparent, #00C9FF, transparent)",
                top: `${i * 5}%`,
                left: "-50%",
                transform: `rotate(-15deg)`,
                animation: `slide ${10 + i * 0.5}s linear infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Elementos tech flotantes */}
        <div
          className="absolute top-20 right-10 w-32 h-32 rounded-xl pointer-events-none transition-colors duration-300"
          style={{
            background: theme === "dark" ? "linear-gradient(135deg, rgba(0,201,255,0.2), transparent)" : "linear-gradient(135deg, rgba(0,201,255,0.1), transparent)",
            border: theme === "dark" ? "2px solid rgba(0,201,255,0.3)" : "2px solid rgba(0,201,255,0.5)",
            animation: "float 8s ease-in-out infinite",
            boxShadow: theme === "dark" ? "0 0 60px rgba(0,201,255,0.3)" : "0 0 40px rgba(0,201,255,0.2)"
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-24 h-24 pointer-events-none transition-colors duration-300"
          style={{
            border: theme === "dark" ? "3px solid rgba(124,58,237,0.4)" : "3px solid rgba(124,58,237,0.6)",
            borderRadius: "50%",
            animation: "spin 20s linear infinite",
            boxShadow: theme === "dark" ? "0 0 40px rgba(124,58,237,0.3)" : "0 0 20px rgba(124,58,237,0.2)"
          }}
        />

        {/* Contenido Hero */}
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <AnimatedSection>
            {/* Badge tech */}
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm mb-6 relative bg-white/40 dark:bg-transparent backdrop-blur-sm transition-colors duration-300"
              style={{
                background: theme === "dark" ? "rgba(0,201,255,0.1)" : "rgba(0,201,255,0.15)",
                border: "1px solid rgba(0,201,255,0.3)",
                boxShadow: theme === "dark" ? "0 0 30px rgba(0,201,255,0.2)" : "0 4px 15px rgba(0,201,255,0.2)"
              }}
            >
              <Zap size={16} className="text-[#00C9FF]" />
              <span className="text-gray-900 dark:text-white font-bold transition-colors duration-300">13 – 17 años</span>
              <div className="w-2 h-2 rounded-full bg-[#00C9FF] animate-pulse" />
            </div>

            {/* Título tech */}
            <h1
              className="text-gray-900 dark:text-white mb-6 relative transition-colors duration-300"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-0.02em"
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "none"
                }}
              >
                BUILD THE FUTURE
              </span>
              <div className="text-gray-800 dark:text-white/90 mt-2 transition-colors duration-300" style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 700 }}>
                Cursos Tech para Adolescentes
              </div>
            </h1>

            <p className="text-gray-700 dark:text-white/65 max-w-2xl mx-auto mb-8 text-base leading-relaxed font-medium transition-colors duration-300">
              De creador de contenido a creador de tecnología. Domina las habilidades
              que las empresas tech están buscando ahora.
            </p>

            {/* Segment switcher tech */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[
                { href: "/cursos/ninos", label: "🧒 Niños (6-12)", id: "ninos", color: "#FF6B35" },
                { href: "/cursos/adolescentes", label: "⚡ Adolescentes (13-17)", id: "adolescentes", color: "#00C9FF" },
                { href: "/cursos/adultos", label: "👨‍💼 Adultos", id: "adultos", color: "#7C3AED" },
              ].map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className="px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300"
                  style={{
                    background: item.id === "adolescentes"
                      ? `linear-gradient(135deg, ${item.color}, #7C3AED)`
                      : (theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"),
                    color: item.id === "adolescentes" ? "#fff" : (theme === "dark" ? "#fff" : "#111827"),
                    border: item.id === "adolescentes" ? `1px solid ${item.color}` : (theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)"),
                    boxShadow: item.id === "adolescentes" ? `0 4px 15px ${item.color}40` : "none",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Stats tech */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-10">
              {[
                { number: "500+", label: "Proyectos creados" },
                { number: "95%", label: "Tasa de éxito" },
                { number: "15+", label: "Tecnologías" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-white dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300"
                  style={{
                    background: theme === "dark" ? "rgba(0,201,255,0.05)" : "rgba(255,255,255,0.6)",
                    border: theme === "dark" ? "1px solid rgba(0,201,255,0.15)" : "1px solid rgba(0,201,255,0.2)",
                  }}
                >
                  <div
                    className="mb-1 transition-colors duration-300"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-500 dark:text-white/50 text-xs font-medium transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ALGORITHMICS SECTION */}
      <section className="py-16 px-4 relative transition-colors duration-300" style={{
        background: theme === "dark" ? "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(0,201,255,0.08))" : "linear-gradient(135deg, rgba(124,58,237,0.04), rgba(0,201,255,0.04))",
        borderTop: theme === "dark" ? "1px solid rgba(124,58,237,0.2)" : "1px solid rgba(124,58,237,0.1)",
        borderBottom: theme === "dark" ? "1px solid rgba(0,201,255,0.2)" : "1px solid rgba(0,201,255,0.1)"
      }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                    <span className="text-gray-900 dark:text-white/80 font-semibold transition-colors duration-300">International School of Programming</span>
                  </div>
                </div>

                <h3
                  className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800 }}
                >
                  Metodología{" "}
                  <span style={{
                    background: "linear-gradient(90deg, #7C3AED, #00C9FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                    Internacional
                  </span>
                </h3>

                <p className="text-gray-600 dark:text-white/65 mb-6 leading-relaxed transition-colors duration-300">
                  Varios cursos utilizan el método de Algorithmics, reconocido globalmente
                  en más de 70 países por su enfoque práctico y orientado a resultados.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: Zap, text: "Plataforma 24/7 con proyectos reales", color: "#00C9FF" },
                    { icon: Award, text: "Certificación internacional reconocida", color: "#7C3AED" },
                    { icon: Globe, text: "Contenido actualizado por expertos globales", color: "#10B981" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                      >
                        <item.icon size={18} style={{ color: item.color }} />
                      </div>
                      <div className="pt-2">
                        <p className="text-gray-700 dark:text-white/80 font-medium transition-colors duration-300">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div
                  className="p-6 rounded-2xl bg-white dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300"
                  style={{
                    background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
                    border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
                    boxShadow: theme === "dark" ? "0 0 40px rgba(124,58,237,0.3)" : "0 10px 40px rgba(124,58,237,0.1)"
                  }}
                >
                  <h4 className="text-gray-500 dark:text-white font-bold mb-4 text-sm uppercase tracking-wider opacity-80 flex items-center gap-2 transition-colors duration-300">
                    <span>✨</span> Cursos con Algorithmics
                  </h4>
                  <div className="space-y-2">
                    {courses
                      .filter(c => c.algorithmics)
                      .map(course => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between p-3 rounded-xl transition-all duration-300 bg-white dark:bg-transparent border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none"
                          style={{
                            background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#ffffff",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{course.emoji}</span>
                            <div>
                              <p className="text-gray-900 dark:text-white/90 font-semibold text-sm transition-colors duration-300">{course.title}</p>
                              <p className="text-gray-500 dark:text-white/40 text-xs transition-colors duration-300">{course.age}</p>
                            </div>
                          </div>
                          <Link
                            to={`/cursos/adolescentes/${course.id}`}
                            className="text-xs px-3 py-1.5 rounded-lg font-semibold shadow-sm transition-shadow duration-300"
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

      {/* FILTERS */}
      <section className="py-6 px-4 sticky top-16 z-30 transition-colors duration-300" style={{
        background: theme === "dark" ? "rgba(10,15,30,0.98)" : "rgba(255,255,255,0.98)",
        backdropFilter: "blur(12px)",
        borderBottom: theme === "dark" ? "1px solid rgba(0,201,255,0.2)" : "1px solid rgba(0,201,255,0.1)",
        boxShadow: theme === "dark" ? "0 4px 20px rgba(255,107,53,0.2)" : "0 4px 15px rgba(0,0,0,0.05)"
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <Filter size={16} className="text-gray-400 dark:text-white/40 shrink-0 transition-colors duration-300" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold shrink-0 transition-all duration-300"
                style={{
                  background: activeCategory === cat.id
                    ? "linear-gradient(135deg, #00C9FF, #7C3AED)"
                    : (theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"),
                  color: activeCategory === cat.id ? "#fff" : (theme === "dark" ? "#fff" : "#111827"),
                  border: activeCategory === cat.id
                    ? "1px solid #00C9FF"
                    : (theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)"),
                  boxShadow: activeCategory === cat.id ? "0 0 20px rgba(0,201,255,0.4)" : "none"
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((course, i) => (
                <AnimatedSection key={course.id} delay={i * 60}>
                  <div
                    className="rounded-2xl overflow-hidden flex flex-col h-full group relative bg-white dark:bg-transparent shadow-md dark:shadow-none transition-all duration-300"
                    style={{
                      background: theme === "dark" 
                        ? `linear-gradient(135deg, ${course.color}20, rgba(10,15,30,0.95))`
                        : `linear-gradient(135deg, ${course.color}15, rgba(255,255,255,0.95))`,
                      border: theme === "dark" ? `2px solid ${course.color}50` : `1px solid ${course.color}30`,
                      boxShadow: theme === "dark" ? `0 0 30px ${course.color}30` : `0 10px 25px ${course.color}15`
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = theme === "dark" ? `0 25px 60px ${course.color}40, 0 0 40px ${course.color}20` : `0 20px 40px ${course.color}30`;
                      (e.currentTarget as HTMLElement).style.borderColor = course.color + "60";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "none";
                      (e.currentTarget as HTMLElement).style.boxShadow = theme === "dark" ? `0 0 30px ${course.color}30` : `0 10px 25px ${course.color}15`;
                      (e.currentTarget as HTMLElement).style.borderColor = theme === "dark" ? course.color + "30" : course.color + "30";
                    }}
                  >
                    {/* Grid pattern */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-10 transition-colors duration-300"
                      style={{
                        backgroundImage: `
                          linear-gradient(${course.color}50 1px, transparent 1px),
                          linear-gradient(90deg, ${course.color}50 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Estrellas decorativas */}
                    <div className="absolute top-3 right-3 pointer-events-none">
                      <div className="text-yellow-400 dark:text-yellow-300 text-2xl animate-pulse">✨</div>
                    </div>

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
                          className="text-xs px-2 py-1 rounded-lg font-semibold shadow-sm"
                          style={{ background: course.color, color: "#fff" }}
                        >
                          {course.level}
                        </span>
                        {course.algorithmics && (
                          <span
                            className="text-xs px-2 py-1 rounded-lg font-semibold flex items-center gap-1 shadow-sm"
                            style={{
                              background: "linear-gradient(135deg, #7C3AED, #00C9FF)",
                              color: "#fff"
                            }}
                          >
                            <Globe size={10} />
                            Global
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
                        className="text-gray-900 dark:text-white mb-2 font-black text-base transition-colors duration-300"
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
                            <span className="text-gray-600 dark:text-white/45 text-xs transition-colors duration-300">{text}</span>
                          </div>
                        ))}
                      </div>

                      {/* Techs */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {course.techs.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-3 py-1 rounded-full font-bold transition-colors duration-300"
                            style={{
                              background: theme === "dark" ? `${course.color}25` : `${course.color}15`,
                              color: course.color,
                              border: `1px solid ${course.color}50`
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* CTAs */}
                      <div className="flex gap-2">
                        <Link
                          to={`/cursos/adolescentes/${course.id}`}
                          className="flex-1 py-2.5 rounded-xl text-center text-sm font-black text-white"
                          style={{
                            background: `linear-gradient(135deg, ${course.color}, ${course.color}dd)`,
                            boxShadow: `0 4px 15px ${course.color}40`,
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
                          className="p-2.5 rounded-xl flex items-center justify-center bg-green-50 dark:bg-transparent"
                          style={{
                            background: theme === "dark" ? "#25D36620" : "#25D36615",
                            color: "#25D366",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#25D366";
                            e.currentTarget.style.color = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = theme === "dark" ? "#25D36620" : "#25D36615";
                            e.currentTarget.style.color = "#25D366";
                          }}
                        >
                          <MessageCircle size={15} />
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        className="py-20 px-4 relative overflow-hidden transition-colors duration-300"
        style={{
          background: theme === "dark" 
            ? "linear-gradient(135deg, rgba(0,201,255,0.08), rgba(124,58,237,0.08))"
            : "linear-gradient(135deg, rgba(0,201,255,0.04), rgba(124,58,237,0.04))",
          borderTop: theme === "dark" ? "1px solid rgba(0,201,255,0.2)" : "1px solid rgba(0,201,255,0.1)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 800 }}
            >
              ¿Listo para el siguiente nivel?
            </h2>
            <p className="text-gray-600 dark:text-white/60 mb-8 max-w-xl mx-auto transition-colors duration-300">
              Agenda una sesión de orientación gratuita. Te ayudamos a elegir el camino perfecto
              según tus objetivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5612668168"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold"
                style={{
                  background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                  boxShadow: "0 4px 20px rgba(0,201,255,0.3)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <MessageCircle size={18} />
                Asesoría gratuita
              </a>
              <Link
                to="/test"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border transition-all duration-300 text-gray-900 dark:text-white border-gray-300 dark:border-white/25 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                Diagnóstico de orientación
                <ChevronRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%) rotate(-15deg); }
          100% { transform: translateX(100%) rotate(-15deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
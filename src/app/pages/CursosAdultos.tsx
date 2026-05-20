import { useState } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { useTheme } from "next-themes";
import { ChevronRight, Clock, Users, BarChart2, Monitor, MessageCircle, Filter, Award, Globe, TrendingUp, Briefcase } from "lucide-react";
import algorithmicsLogo from "../../imports/image-0.png";
import heroImage from "figma:asset/b9b6a31b6ab0f80fc7f803edaca8cd213b948276.png";

const ADULT_IMG = "https://images.unsplash.com/photo-1724260793422-7754e5d06fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600";

type Category = "todos" | "alfabetizacion" | "ia";

// CATÁLOGO LIMPIO: Solo adultos individuales (Corporativo migró a su propia sección)
const courses = [
  {
    id: "alfabetizacion-adultos",
    title: "Alfabetización Digital (Adultos)",
    desc: "Se familiarizan paso a paso con computadoras, celulares y herramientas digitales básicas en un ambiente seguro y paciente.",
    age: "18-99 años",
    level: "Básico",
    duration: "8 meses +",
    modality: "Presencial",
    techs: ["Navegación", "Correo", "Apps"],
    category: "alfabetizacion" as Category,
    color: "#FF6B35",
    img: ADULT_IMG,
    emoji: "💻",
    algorithmics: false,
  },
  {
    id: "ia-adultos",
    title: "Inteligencia artificial (adultos)",
    desc: "Sesiones individuales y personalizadas (consultoría) para aplicar herramientas de IA en el contexto profesional.",
    age: "18+ años",
    level: "Personalizado",
    duration: "8 meses +",
    modality: "Presencial",
    techs: ["Herramientas IA", "Prompts", "Consultoría"],
    category: "ia" as Category,
    color: "#10B981",
    img: ADULT_IMG,
    emoji: "🧠",
    algorithmics: false,
  }
];

const categories: { id: Category | "todos"; label: string; emoji: string }[] = [
  { id: "todos", label: "Todos", emoji: "💼" },
  { id: "alfabetizacion", label: "Alfabetización", emoji: "💻" },
  { id: "ia", label: "Inteligencia Artificial", emoji: "🧠" },
];

export function CursosAdultos() {
  const [activeCategory, setActiveCategory] = useState<Category | "todos">("todos");
  const { theme } = useTheme();

  const filtered = courses.filter((c) => {
    return activeCategory === "todos" || c.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e1821] transition-colors duration-300">
      {/* HERO PROFESIONAL */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden bg-white dark:bg-[#0e1821] transition-colors duration-300">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-5 dark:opacity-5 transition-opacity duration-300"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, ${theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"} 1px, transparent 0)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background: theme === "dark" 
              ? "radial-gradient(ellipse at top right, rgba(0,201,255,0.03), transparent 50%), radial-gradient(ellipse at bottom left, rgba(124,58,237,0.03), transparent 50%)"
              : "radial-gradient(ellipse at top right, rgba(0,201,255,0.02), transparent 50%), radial-gradient(ellipse at bottom left, rgba(124,58,237,0.02), transparent 50%)"
          }}
        />

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00C9FF]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <AnimatedSection>
                {/* Badge profesional */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm mb-6 bg-blue-50 dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300"
                  style={{
                    background: theme === "dark" ? "rgba(0,201,255,0.08)" : "rgba(0,201,255,0.05)",
                    border: "1px solid rgba(0,201,255,0.2)",
                  }}
                >
                  <Briefcase size={14} className="text-[#00C9FF]" />
                  <span className="text-[#00C9FF] font-semibold">Educación Continua</span>
                </div>

                {/* Título */}
                <h1
                  className="text-gray-900 dark:text-white mb-6 transition-colors duration-300"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em"
                  }}
                >
                  Impulsa tu{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Desarrollo Digital
                  </span>
                </h1>

                <p className="text-gray-600 dark:text-white/60 mb-8 text-lg leading-relaxed max-w-xl transition-colors duration-300">
                  Programas diseñados para adultos que buscan actualizarse, perder el miedo a la tecnología, 
                  dominar la Inteligencia Artificial o lograr inclusión digital a su propio ritmo.
                </p>

                {/* Stats profesionales */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { number: "100%", label: "Atención paciente", icon: Users },
                    { number: "8 meses +", label: "Duración de planes", icon: Clock },
                    { number: "Tech", label: "Inclusión Digital", icon: TrendingUp },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-4 rounded-lg bg-gray-50 dark:bg-transparent transition-colors duration-300"
                      style={{
                        background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                        border: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <stat.icon size={16} className="text-[#00C9FF] mb-2" />
                      <div
                        className="text-gray-900 dark:text-white mb-1 transition-colors duration-300"
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: 700,
                        }}
                      >
                        {stat.number}
                      </div>
                      <div className="text-gray-500 dark:text-white/50 text-xs transition-colors duration-300">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Segment switcher */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {[
                    { href: "/cursos/ninos", label: "Niños", id: "ninos" },
                    { href: "/cursos/adolescentes", label: "Adolescentes", id: "adolescentes" },
                    { href: "/cursos/adultos", label: "Adultos", id: "adultos" },
                  ].map((item) => (
                    <Link
                      key={item.id}
                      to={item.href}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
                      style={{
                        background: item.id === "adultos"
                          ? "linear-gradient(135deg, #00C9FF, #7C3AED)"
                          : (theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"),
                        color: item.id === "adultos" ? "#fff" : (theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)"),
                        border: item.id === "adultos" ? "1px solid #00C9FF" : (theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)"),
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/5612668168"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                      color: "#fff",
                      boxShadow: "0 4px 20px rgba(0,201,255,0.2)"
                    }}
                  >
                    <MessageCircle size={18} />
                    Agendar Consulta
                  </a>
                  <Link
                    to="/test"
                    className="flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 bg-gray-50 dark:bg-transparent"
                    style={{
                      background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                      color: theme === "dark" ? "#fff" : "#111827",
                      border: theme === "dark" ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)"
                    }}
                  >
                    Diagnóstico Inicial
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* Right image */}
            <AnimatedSection direction="right">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,201,255,0.1), rgba(124,58,237,0.1))",
                    filter: "blur(40px)",
                  }}
                />
                <img
                  src={heroImage}
                  alt="Educación Profesional"
                  className="relative rounded-2xl w-full"
                  style={{
                    border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
                    boxShadow: theme === "dark" ? "0 20px 60px rgba(0,0,0,0.4)" : "0 20px 60px rgba(0,0,0,0.1)"
                  }}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-transparent transition-colors duration-300" style={{
        background: theme === "dark" ? "rgba(255,255,255,0.02)" : "#f9fafb",
        borderTop: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)",
        borderBottom: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)"
      }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-gray-900 dark:text-white mb-4 transition-colors duration-300" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
                ¿Por qué elegir GŌKU LAB?
              </h2>
              <p className="text-gray-600 dark:text-white/60 max-w-2xl mx-auto transition-colors duration-300">
                Soluciones enfocadas en resultados reales y atención con máxima paciencia.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: "💼", title: "Enfoque Práctico", desc: "Clases dinámicas desde el primer día enfocadas en entornos reales." },
                { icon: "🎓", title: "Mentores Expertos", desc: "Aprende de profesionales con paciencia y experiencia en el sector digital." },
                { icon: "⏰", title: "Horarios Flexibles", desc: "Planes diseñados para adaptarse perfectamente a tus ritmos diarios." },
                { icon: "🚀", title: "Inclusión Total", desc: "Pierde el miedo a la tecnología en un ambiente cómodo y seguro." }
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg transition-all duration-300 bg-white dark:bg-transparent shadow-sm dark:shadow-none"
                  style={{
                    background: theme === "dark" ? "rgba(255,255,255,0.02)" : "#ffffff",
                    border: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)"
                  }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-2 transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed transition-colors duration-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-6 px-4 sticky top-16 z-30 transition-colors duration-300" style={{
        background: theme === "dark" ? "rgba(14,24,33,0.98)" : "rgba(255,255,255,0.98)",
        backdropFilter: "blur(12px)",
        borderBottom: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)"
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <Filter size={16} className="text-gray-400 dark:text-white/40 shrink-0 transition-colors duration-300" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shrink-0 transition-all duration-300"
                style={{
                  background: activeCategory === cat.id
                    ? "linear-gradient(135deg, #00C9FF, #7C3AED)"
                    : (theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"),
                  color: activeCategory === cat.id ? "#fff" : (theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)"),
                  border: activeCategory === cat.id
                    ? "1px solid #00C9FF"
                    : (theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)"),
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
      <section className="py-16 px-4 bg-white dark:bg-[#0e1821] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-500 dark:text-white/50 transition-colors duration-300">No se encontraron cursos con esos filtros.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {filtered.map((course, i) => (
                <AnimatedSection key={course.id} delay={i * 60}>
                  <div
                    className="rounded-lg overflow-hidden flex flex-col h-full group bg-white dark:bg-transparent shadow-md dark:shadow-none transition-all duration-300"
                    style={{
                      background: theme === "dark" ? "rgba(255,255,255,0.02)" : "#ffffff",
                      border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = theme === "dark" ? `0 12px 40px ${course.color}20` : `0 12px 25px rgba(0,0,0,0.1)`;
                      (e.currentTarget as HTMLElement).style.borderColor = theme === "dark" ? course.color + "40" : course.color + "60";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "none";
                      (e.currentTarget as HTMLElement).style.boxShadow = theme === "dark" ? "none" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                      (e.currentTarget as HTMLElement).style.borderColor = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
                    }}
                  >
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
                        style={{ background: theme === "dark" ? `linear-gradient(to top, rgba(14,24,33,0.95), transparent)` : `linear-gradient(to top, rgba(255,255,255,0.9), transparent)` }}
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                          <span
                            className="text-xs px-2 py-1 rounded-md font-semibold"
                            style={{ background: course.color, color: "#fff" }}
                          >
                            {course.level}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-md font-semibold bg-gray-950 text-white dark:bg-white dark:text-black shadow-sm">
                            desde $1600
                          </span>
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 text-2xl drop-shadow-md">
                        {course.emoji}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1 relative z-10">
                      <h3
                        className="text-gray-900 dark:text-white mb-2 transition-colors duration-300"
                        style={{ fontWeight: 600, fontSize: "0.95rem" }}
                      >
                        {course.title}
                      </h3>
                      <p className="text-gray-500 dark:text-white/50 text-xs leading-relaxed mb-4 flex-1 transition-colors duration-300">
                        {course.desc}
                      </p>

                      {/* Meta */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {[
                          { icon: Clock, text: course.duration },
                          { icon: BarChart2, text: course.level },
                          { icon: Monitor, text: course.modality.split(" / ") },
                          { icon: Users, text: "Personalizado" },
                        ].map(({ icon: Icon, text }) => (
                          <div key={text} className="flex items-center gap-1.5">
                            <Icon size={12} className="text-gray-400 dark:text-white/30 transition-colors duration-300" />
                            <span className="text-gray-500 dark:text-white/40 text-xs transition-colors duration-300">{text}</span>
                          </div>
                        ))}
                      </div>

                      {/* Techs */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {course.techs.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-0.5 rounded-md transition-colors duration-300"
                            style={{
                              background: theme === "dark" ? `${course.color}15` : `${course.color}10`,
                              color: course.color,
                              border: `1px solid ${course.color}20`
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* CTAs */}
                      <div className="flex gap-2">
                        <Link
                          to={`/cursos/adultos/${course.id}`}
                          className="flex-1 py-2.5 rounded-lg text-center text-sm font-semibold text-white"
                          style={{
                            background: course.color,
                            transition: "all 0.2s ease",
                          }}
                        >
                          Ver Programa
                        </Link>
                        <a
                          href={`https://wa.me/5612668168?text=Hola,%20me%20interesa%20el%20servicio%20de%20${encodeURIComponent(course.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg flex items-center justify-center bg-green-50 dark:bg-transparent transition-colors duration-300"
                          style={{
                            background: theme === "dark" ? "rgba(37,211,102,0.15)" : "rgba(37,211,102,0.1)",
                            color: "#25D366",
                            border: theme === "dark" ? "1px solid rgba(37,211,102,0.2)" : "1px solid rgba(37,211,102,0.1)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#25D366";
                            e.currentTarget.style.color = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = theme === "dark" ? "rgba(37,211,102,0.15)" : "rgba(37,211,102,0.1)";
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
        className="py-20 px-4 bg-gray-50 dark:bg-transparent transition-colors duration-300"
        style={{
          background: theme === "dark" ? "rgba(255,255,255,0.02)" : "#f9fafb",
          borderTop: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 700 }}
            >
              Invierte en tu Futuro Profesional
            </h2>
            <p className="text-gray-600 dark:text-white/60 mb-8 max-w-xl mx-auto transition-colors duration-300">
              Agenda una consulta gratuita y descubre cuál es el programa ideal para tus objetivos de desarrollo digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5612668168"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold"
                style={{
                  background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(0,201,255,0.2)",
                  transition: "all 0.2s ease",
                }}
              >
                <MessageCircle size={18} />
                Consulta Gratuita
              </a>
              <Link
                to="/test"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold bg-white dark:bg-transparent transition-colors duration-300"
                style={{
                  background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#ffffff",
                  color: theme === "dark" ? "#fff" : "#111827",
                  border: theme === "dark" ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease"
                }}
              >
                Diagnóstico Consultivo
                <ChevronRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
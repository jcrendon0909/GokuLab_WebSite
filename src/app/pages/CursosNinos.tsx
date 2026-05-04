import { useState } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { ChevronRight, Clock, Users, BarChart2, Monitor, MessageCircle, Filter, Award, Globe } from "lucide-react";
import algorithmicsLogo from "../../imports/image-0.png";
import spaceKid1 from "figma:asset/682fbdfa00c35d4aa6927f7319bb8a55934fd3ab.png";
import spaceKid2 from "figma:asset/deaf7c38543ee8f85172ca916516af3a27f1a710.png";

const KIDS_IMG = "https://images.unsplash.com/photo-1603354350266-a8de3496163b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHJvYm90JTIwc2NpZW5jZSUyMFNURU0lMjBsZWFybmluZyUyMGZ1bnxlbnwxfHx8fDE3NzU4NTYyNDF8MA&ixlib=rb-4.1.0&q=80&w=600";

type Category = "todos" | "programacion" | "robotica" | "diseno" | "verano";

const courses = [
  {
    id: "scratch-basico",
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
    title: "Robótica con Micro:bit",
    desc: "Construye y programa robots y gadgets con la tarjeta Micro:bit. ¡Aprende electrónica haciendo!",
    age: "9–12 años",
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
    id: "diseno-digital",
    title: "Diseño Digital Creativo",
    desc: "Crea logos, presentaciones y contenido visual con herramientas profesionales.",
    age: "8–12 años",
    level: "Básico",
    duration: "8 semanas",
    modality: "Online",
    techs: ["Canva", "VS Code"],
    category: "diseno" as Category,
    color: "#9C27B0",
    img: KIDS_IMG,
    emoji: "🎨",
  },
  {
    id: "verano-ninos",
    title: "Curso de Verano Intensivo",
    desc: "4 semanas de programación, robótica y diseño. El mejor verano tech para tus hijos.",
    age: "7–12 años",
    level: "Todos los niveles",
    duration: "4 semanas",
    modality: "Presencial",
    techs: ["Scratch", "Micro:bit", "Tinkercad"],
    category: "verano" as Category,
    color: "#FFE134",
    img: KIDS_IMG,
    emoji: "☀️",
  },
];

const categories: { id: Category | "todos"; label: string; emoji: string }[] = [
  { id: "todos", label: "Todos", emoji: "📚" },
  { id: "programacion", label: "Programación", emoji: "💻" },
  { id: "robotica", label: "Robótica", emoji: "🤖" },
  { id: "diseno", label: "Diseño", emoji: "🎨" },
  { id: "verano", label: "Verano", emoji: "☀️" },
];

export function CursosNinos() {
  const [activeCategory, setActiveCategory] = useState<Category | "todos">("todos");

  const filtered = courses.filter((c) => {
    return activeCategory === "todos" || c.category === activeCategory;
  });

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0A0F1E 0%, #1a1547 30%, #2d1b69 70%, #0A0F1E 100%)" }}>
      {/* HERO ESPACIAL COLORIDO */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        {/* Fondo de estrellas animadas */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 4 + 1 + "px",
                height: Math.random() * 4 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.8 + 0.2,
                animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: Math.random() * 2 + "s"
              }}
            />
          ))}
        </div>

        {/* Planetas coloridos flotantes */}
        <div
          className="absolute top-20 right-10 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 30%, #FFB347, #FF6B35)",
            boxShadow: "0 0 80px rgba(255,107,53,0.6), inset -10px -10px 30px rgba(0,0,0,0.3)",
            animation: "floatPlanet 25s ease-in-out infinite"
          }}
        />
        <div
          className="absolute bottom-32 left-10 w-28 h-28 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 30%, #4ECDC4, #00C9FF)",
            boxShadow: "0 0 60px rgba(0,201,255,0.6), inset -8px -8px 20px rgba(0,0,0,0.3)",
            animation: "floatPlanet 20s ease-in-out infinite reverse"
          }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 30%, #A78BFA, #7C3AED)",
            boxShadow: "0 0 50px rgba(124,58,237,0.5), inset -6px -6px 15px rgba(0,0,0,0.3)",
            animation: "floatPlanet 18s ease-in-out infinite"
          }}
        />
        <div
          className="absolute bottom-20 right-1/3 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 30%, #FB923C, #F97316)",
            boxShadow: "0 0 70px rgba(249,115,22,0.5), inset -8px -8px 25px rgba(0,0,0,0.3)",
            animation: "floatPlanet 22s ease-in-out infinite reverse"
          }}
        />

        {/* Astronautas y cohetes flotantes */}
        <div
          className="absolute top-1/3 right-1/5 text-7xl pointer-events-none"
          style={{
            animation: "floatAstronaut 30s linear infinite",
            filter: "drop-shadow(0 0 20px rgba(255,255,255,0.5))"
          }}
        >
          🚀
        </div>
        <div
          className="absolute bottom-1/4 left-1/3 text-6xl pointer-events-none"
          style={{
            animation: "spinFloat 25s ease-in-out infinite",
            filter: "drop-shadow(0 0 15px rgba(255,255,255,0.4))"
          }}
        >
          👨‍🚀
        </div>
        <div
          className="absolute top-2/3 right-1/4 text-5xl pointer-events-none"
          style={{
            animation: "bounce 3s ease-in-out infinite",
            filter: "drop-shadow(0 0 10px rgba(255,107,53,0.6))"
          }}
        >
          🌟
        </div>

        {/* Contenido Hero */}
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <AnimatedSection>
            {/* Badge con brillo */}
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm mb-6 relative"
              style={{
                background: "linear-gradient(135deg, rgba(255,107,53,0.25), rgba(255,225,52,0.25))",
                border: "2px solid rgba(255,107,53,0.5)",
                boxShadow: "0 0 30px rgba(255,107,53,0.4), inset 0 0 20px rgba(255,225,52,0.2)"
              }}
            >
              <span className="text-3xl animate-bounce">🧒</span>
              <span className="text-white font-bold">6 – 12 años</span>
              <span className="text-2xl">✨</span>
            </div>

            {/* Título con efecto rainbow */}
            <h1
              className="text-white mb-6 relative"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                textShadow: "0 0 40px rgba(255,107,53,0.6), 0 0 20px rgba(0,201,255,0.4)"
              }}
            >
              <span
                style={{
                  background: "linear-gradient(90deg, #FF6B35, #FFE134, #00C9FF, #7C3AED, #E91E63, #FF6B35)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "rainbowGradient 3s ease infinite"
                }}
              >
                ¡Aprende Creando!
              </span>
              <div className="text-white mt-2" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                Cursos Tech para Niños
              </div>
            </h1>

            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
              Convierte tu imaginación en realidad con programación, robótica y diseño.
              ¡Diversión garantizada! 🎮🤖🎨
            </p>

            {/* Segment switcher colorido */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[
                { href: "/cursos/ninos", label: "🧒 Niños (6-12)", id: "ninos", color: "#FF6B35" },
                { href: "/cursos/adolescentes", label: "🚀 Adolescentes (13-17)", id: "adolescentes", color: "#00C9FF" },
                { href: "/cursos/adultos", label: "👨‍💼 Adultos", id: "adultos", color: "#7C3AED" },
              ].map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className="px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300"
                  style={{
                    background: item.id === "ninos"
                      ? `linear-gradient(135deg, ${item.color}, ${item.color}dd)`
                      : "rgba(255,255,255,0.08)",
                    color: "#fff",
                    border: item.id === "ninos" ? `2px solid ${item.color}` : "2px solid rgba(255,255,255,0.15)",
                    boxShadow: item.id === "ninos" ? `0 0 30px ${item.color}60` : "none",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ALGORITHMICS SECTION */}
      <section className="py-16 px-4 relative" style={{
        background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(0,201,255,0.15))",
        borderTop: "2px solid rgba(124,58,237,0.3)",
        borderBottom: "2px solid rgba(0,201,255,0.3)"
      }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <img
                    src={algorithmicsLogo}
                    alt="Algorithmics International School of Programming"
                    className="h-14 mb-4"
                    style={{ filter: "brightness(1.2) drop-shadow(0 0 10px rgba(124,58,237,0.5))" }}
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={20} className="text-[#7C3AED]" />
                    <span className="text-white font-bold text-lg">International School of Programming</span>
                    <span className="text-2xl">🌍</span>
                  </div>
                </div>

                <h3
                  className="text-white mb-4"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800 }}
                >
                  Cursos con metodología{" "}
                  <span style={{
                    background: "linear-gradient(90deg, #7C3AED, #00C9FF, #FFE134)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                    Internacional 🌟
                  </span>
                </h3>

                <p className="text-white/75 mb-6 leading-relaxed text-lg">
                  ¡Aprende con el mejor método del mundo! Algorithmics está en más de 70 países
                  enseñando a niños como tú. 🚀
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: "🎮", text: "Plataforma interactiva 24/7", color: "#7C3AED" },
                    { icon: "🏆", text: "Certificados reconocidos internacionalmente", color: "#00C9FF" },
                    { icon: "⭐", text: "Contenido actualizado y súper divertido", color: "#FFE134" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-2xl"
                      style={{
                        background: `${item.color}20`,
                        border: `2px solid ${item.color}40`
                      }}
                    >
                      <div className="text-4xl">{item.icon}</div>
                      <p className="text-white font-semibold">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div
                  className="p-6 rounded-3xl"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "2px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 0 40px rgba(124,58,237,0.3)"
                  }}
                >
                  <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider opacity-80 flex items-center gap-2">
                    <span>✨</span> Cursos con Algorithmics
                  </h4>
                  <div className="space-y-3">
                    {courses
                      .filter(c => c.algorithmics)
                      .map(course => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between p-4 rounded-2xl transition-all duration-300"
                          style={{
                            background: `${course.color}15`,
                            border: `2px solid ${course.color}30`
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{course.emoji}</span>
                            <div>
                              <p className="text-white font-bold text-sm">{course.title}</p>
                              <p className="text-white/50 text-xs">{course.age}</p>
                            </div>
                          </div>
                          <Link
                            to={`/cursos/ninos/${course.id}`}
                            className="text-xs px-4 py-2 rounded-xl font-bold text-white"
                            style={{
                              background: course.color,
                              boxShadow: `0 4px 15px ${course.color}50`
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
      <section className="py-6 px-4 sticky top-16 z-30" style={{
        background: "rgba(10,15,30,0.98)",
        backdropFilter: "blur(12px)",
        borderBottom: "2px solid rgba(255,107,53,0.3)",
        boxShadow: "0 4px 20px rgba(255,107,53,0.2)"
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <Filter size={18} className="text-white/50 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold shrink-0 transition-all duration-300"
                style={{
                  background: activeCategory === cat.id
                    ? "linear-gradient(135deg, #FF6B35, #FFE134)"
                    : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: activeCategory === cat.id
                    ? "2px solid #FF6B35"
                    : "2px solid rgba(255,255,255,0.1)",
                  boxShadow: activeCategory === cat.id ? "0 0 25px rgba(255,107,53,0.5)" : "none"
                }}
              >
                <span className="text-lg">{cat.emoji}</span>
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
              <div className="text-7xl mb-4">🔍</div>
              <p className="text-white/60 text-xl">No se encontraron cursos con esos filtros.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((course, i) => (
                <AnimatedSection key={course.id} delay={i * 60}>
                  <div
                    className="rounded-3xl overflow-hidden flex flex-col h-full group relative"
                    style={{
                      background: `linear-gradient(135deg, ${course.color}20, rgba(10,15,30,0.95))`,
                      border: `3px solid ${course.color}50`,
                      transition: "all 0.3s ease",
                      boxShadow: `0 0 30px ${course.color}30`
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-10px) scale(1.03) rotate(-1deg)";
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 30px 70px ${course.color}60, 0 0 50px ${course.color}40`;
                      (e.currentTarget as HTMLElement).style.borderColor = course.color;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "none";
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${course.color}30`;
                      (e.currentTarget as HTMLElement).style.borderColor = course.color + "50";
                    }}
                  >
                    {/* Estrellas decorativas */}
                    <div className="absolute top-3 right-3 pointer-events-none">
                      <div className="text-yellow-300 text-2xl animate-pulse">✨</div>
                    </div>

                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={course.img}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        style={{ transition: "transform 0.5s ease" }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top, ${course.color}dd, transparent)`
                        }}
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <span
                          className="text-xs px-3 py-1.5 rounded-full font-bold"
                          style={{
                            background: course.color,
                            color: "#fff",
                            boxShadow: `0 4px 15px ${course.color}70`
                          }}
                        >
                          {course.level}
                        </span>
                        {course.algorithmics && (
                          <span
                            className="text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1"
                            style={{
                              background: "linear-gradient(135deg, #7C3AED, #00C9FF)",
                              color: "#fff",
                              boxShadow: "0 4px 15px rgba(124,58,237,0.7)"
                            }}
                          >
                            <Globe size={10} />
                            Global
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3 text-4xl drop-shadow-lg">
                        {course.emoji}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3
                        className="text-white mb-2 font-black text-base"
                      >
                        {course.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-4 flex-1">
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
                          <div key={text} className="flex items-center gap-2">
                            <Icon size={14} className="text-white/40" />
                            <span className="text-white/60 text-xs font-medium">{text}</span>
                          </div>
                        ))}
                      </div>

                      {/* Techs */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.techs.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-3 py-1 rounded-full font-bold"
                            style={{
                              background: `${course.color}25`,
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
                          to={`/cursos/ninos/${course.id}`}
                          className="flex-1 py-3 rounded-2xl text-center text-sm font-black text-white"
                          style={{
                            background: `linear-gradient(135deg, ${course.color}, ${course.color}dd)`,
                            boxShadow: `0 6px 20px ${course.color}60`,
                            transition: "all 0.2s ease",
                          }}
                        >
                          ¡Quiero este! 🚀
                        </Link>
                        <a
                          href={`https://wa.me/5612668168?text=Hola,%20me%20interesa%20el%20curso%20${encodeURIComponent(course.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-2xl flex items-center justify-center"
                          style={{
                            background: "#25D36630",
                            color: "#25D366",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <MessageCircle size={18} />
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
        className="py-20 px-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,107,53,0.2), rgba(255,225,52,0.2))",
          borderTop: "3px solid rgba(255,107,53,0.4)",
          borderBottom: "3px solid rgba(255,225,52,0.4)"
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 text-6xl opacity-30 animate-bounce">🎮</div>
        <div className="absolute bottom-10 left-10 text-6xl opacity-30 animate-pulse">🤖</div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="text-7xl mb-4">🚀</div>
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900 }}
            >
              ¿Listo para la aventura?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto text-lg">
              Agenda una clase gratis y descubre todo lo que puedes crear. ¡Será súper divertido! 🎉
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5612668168"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-white font-black text-lg"
                style={{
                  background: "linear-gradient(135deg, #25D366, #20BA5A)",
                  boxShadow: "0 8px 30px rgba(37,211,102,0.5)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <MessageCircle size={22} />
                ¡Quiero mi clase gratis! 🎁
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        @keyframes floatPlanet {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(180deg); }
        }

        @keyframes floatAstronaut {
          0% {
            transform: translate(0, 0) rotate(-20deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translate(-120vw, -60vh) rotate(-20deg);
            opacity: 0;
          }
        }

        @keyframes spinFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(360deg);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.1); }
        }

        @keyframes rainbowGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

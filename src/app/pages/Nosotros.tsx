import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { MessageCircle, Heart, Zap, Globe, Award, ChevronRight } from "lucide-react";

const TEAM_IMG_1 = "https://images.unsplash.com/photo-1732210038531-9cefab37885a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwZGV2ZWxvcGVyJTIwc21pbGluZyUyMHRlY2h8ZW58MXx8fHwxNzc1ODU2MjQ1fDA&ixlib=rb-4.1.0&q=80&w=400";
const TEAM_IMG_2 = "https://images.unsplash.com/photo-1755548180551-2bac52d9467e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjB0ZWFjaGVyJTIwdGVjaG5vbG9neSUyMGVkdWNhdGlvbiUyMHdvcmtzaG9wfGVufDF8fHx8MTc3NTg1NjI0NXww&ixlib=rb-4.1.0&q=80&w=400";
const TEAM_IMG_3 = "https://images.unsplash.com/photo-1758270705172-07b53627dfcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBsZWFybmluZyUyMGNvbXB1dGVyJTIwc2NpZW5jZSUyMHVuaXZlcnNpdHl8ZW58MXx8fHwxNzc1ODU2MjQ2fDA&ixlib=rb-4.1.0&q=80&w=400";

const team = [
  {
    name: "Ana Torres",
    role: "Directora General",
    bio: "Ingeniera en sistemas con 12 años en educación tecnológica. Fundadora de GOKU LAB.",
    img: TEAM_IMG_1,
    emoji: "👩‍💼",
  },
  {
    name: "Luis Mendoza",
    role: "Director Pedagógico",
    bio: "Especialista en metodologías activas y gamificación educativa.",
    img: TEAM_IMG_2,
    emoji: "👨‍🏫",
  },
  {
    name: "Mariana Díaz",
    role: "Coord. Niños y Adolescentes",
    bio: "Maestra con posgrado en tecnología educativa y 8 años de experiencia.",
    img: TEAM_IMG_3,
    emoji: "👩‍🏫",
  },
  {
    name: "Roberto Flores",
    role: "Instructor Senior – IA",
    bio: "Data Scientist con experiencia en Google. Apasionado por democratizar la IA.",
    img: TEAM_IMG_2,
    emoji: "👨‍💻",
  },
  {
    name: "Sofía Castro",
    role: "Instructora – Robótica",
    bio: "Ingeniera mecatrónica. Ha guiado más de 500 proyectos de robótica con niños.",
    img: TEAM_IMG_1,
    emoji: "👩‍🔬",
  },
  {
    name: "Eduardo Vega",
    role: "Instructor – Desarrollo Web",
    bio: "Full-stack developer con 10+ años. Cree que cualquier persona puede aprender a programar.",
    img: TEAM_IMG_2,
    emoji: "👨‍💻",
  },
  {
    name: "Valeria Ruiz",
    role: "Instructora – Diseño Digital",
    bio: "Diseñadora UX/UI con portafolio en startups de LATAM.",
    img: TEAM_IMG_1,
    emoji: "👩‍🎨",
  },
  {
    name: "Carlos Nava",
    role: "Instructor – Empresas",
    bio: "Consultor empresarial especializado en transformación digital corporativa.",
    img: TEAM_IMG_2,
    emoji: "👨‍💼",
  },
  {
    name: "Diana Ortiz",
    role: "Coordinadora de Eventos",
    bio: "Organizadora de hackathons y talleres tecnológicos en 8 ciudades de México.",
    img: TEAM_IMG_3,
    emoji: "👩‍💻",
  },
  {
    name: "Miguel Ángel Reyes",
    role: "Instructor – Programación Avanzada",
    bio: "Desarrollador de videojuegos y apps con 15+ años de experiencia.",
    img: TEAM_IMG_2,
    emoji: "🧑‍💻",
  },
];

const values = [
  {
    icon: Zap,
    title: "Innovación constante",
    desc: "Actualizamos nuestros currículos constantemente para estar a la vanguardia tecnológica.",
    color: "#00C9FF",
  },
  {
    icon: Heart,
    title: "Aprendizaje con propósito",
    desc: "Cada curso tiene un objetivo claro: crear, resolver problemas y abrir oportunidades.",
    color: "#FF6B35",
  },
  {
    icon: Globe,
    title: "Acceso para todos",
    desc: "Becas, planes flexibles y metodologías adaptadas a cada perfil y contexto.",
    color: "#7C3AED",
  },
  {
    icon: Award,
    title: "Excelencia y resultados",
    desc: "Más del 95% de satisfacción. Nuestros alumnos llegan con objetivos y los cumplen.",
    color: "#10B981",
  },
];

export function Nosotros() {
  return (
    <div>
      {/* HERO */}
      <section
        className="relative py-32 px-4 overflow-hidden"
        style={{ paddingTop: "120px", background: "#050A14" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(0,201,255,0.07) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(124,58,237,0.06) 0%, transparent 60%)",
          }}
        />

        {/* Polaroid-style collage bg */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-40 rounded-lg overflow-hidden"
              style={{
                top: `${10 + (i % 3) * 30}%`,
                left: `${5 + i * 16}%`,
                transform: `rotate(${-8 + i * 3}deg)`,
                background: "rgba(255,255,255,0.1)",
                animation: `floatCard ${4 + i}s ease-in-out infinite ${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          <AnimatedSection>
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-6"
              style={{
                background: "rgba(0,201,255,0.1)",
                color: "#00C9FF",
                border: "1px solid rgba(0,201,255,0.25)",
              }}
            >
              Nuestra historia
            </div>
            <h1
              className="text-white mb-6"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1.15,
              }}
            >
              Creemos en{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                superpoderes
              </span>
              <br />
              para un{" "}
              <span style={{ color: "#FFE134" }}>superfuturo</span>
            </h1>
            <p
              className="text-white/65 max-w-2xl mx-auto"
              style={{ fontSize: "1.15rem", lineHeight: 1.75 }}
            >
              GOKU LAB nació de la convicción de que la tecnología puede y debe
              estar al alcance de todos: niños que sueñan, jóvenes que exploran,
              adultos que se reinventan y empresas que evolucionan.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm mb-6"
                style={{
                  background: "rgba(255,107,53,0.1)",
                  color: "#FF6B35",
                  border: "1px solid rgba(255,107,53,0.25)",
                }}
              >
                Nuestra filosofía
              </div>
              <h2
                className="text-white mb-6"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                Tecnología como herramienta de{" "}
                <span style={{ color: "#FF6B35" }}>desarrollo humano</span>
              </h2>
              <p
                className="text-white/65 mb-6 leading-relaxed"
                style={{ fontSize: "1.05rem" }}
              >
                No enseñamos tecnología por enseñar tecnología. La usamos como
                vehículo para desarrollar pensamiento crítico, creatividad,
                colaboración y resiliencia.
              </p>
              <p
                className="text-white/65 mb-8 leading-relaxed"
                style={{ fontSize: "1.05rem" }}
              >
                Cada alumno que sale de GOKU LAB no solo sabe programar. Sabe
                pensar diferente, crear soluciones y enfrentar los retos del
                mundo digital con confianza.
              </p>
              <Link
                to="/metodologia"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
                style={{
                  background: "#FF6B35",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Conocer metodología
                <ChevronRight size={16} />
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={100}>
              <div className="grid grid-cols-2 gap-4">
                {values.map((val) => (
                  <div
                    key={val.title}
                    className="p-5 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        val.color + "40";
                      (e.currentTarget as HTMLElement).style.background =
                        val.color + "08";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.03)";
                    }}
                  >
                    <val.icon
                      size={24}
                      className="mb-3"
                      style={{ color: val.color }}
                    />
                    <h4
                      className="text-white mb-1"
                      style={{ fontSize: "0.9rem", fontWeight: 700 }}
                    >
                      {val.title}
                    </h4>
                    <p className="text-white/50 text-xs leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL */}
      <section
        className="py-24 px-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,201,255,0.05), rgba(124,58,237,0.05))",
          borderTop: "1px solid rgba(0,201,255,0.1)",
          borderBottom: "1px solid rgba(0,201,255,0.1)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800 }}
            >
              Texto institucional
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Misión",
                icon: "🎯",
                text: "Democratizar el acceso a la educación tecnológica de calidad, formando creadores de tecnología que impacten positivamente a su entorno y al mundo.",
              },
              {
                title: "Visión",
                icon: "🔭",
                text: "Ser la academia tecnológica de referencia en América Latina, reconocida por transformar vidas a través del aprendizaje activo, la innovación y el desarrollo humano integral.",
              },
              {
                title: "Compromiso",
                icon: "🤝",
                text: "Cada alumno, sin importar su edad o punto de partida, merece un aprendizaje personalizado, significativo y con resultados reales.",
              },
              {
                title: "Impacto",
                icon: "🌎",
                text: "Más de 3,200 alumnos formados, 85 empresas capacitadas y comunidades impactadas en múltiples ciudades de México y LATAM.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 80}>
                <div
                  className="p-7 rounded-3xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3
                    className="text-white mb-3"
                    style={{ fontWeight: 700, fontSize: "1.1rem" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              ¿Quieres ser parte de la historia?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto" style={{ fontSize: "1.1rem" }}>
              Agenda tu masterclass gratuita y conoce en persona a nuestro
              equipo. Estamos listos para acompañarte.
            </p>
            <a
              href="https://wa.me/5612668168"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-bold"
              style={{
                background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                boxShadow: "0 8px 30px rgba(0,201,255,0.35)",
                transition: "all 0.2s ease",
                fontSize: "1.05rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <MessageCircle size={20} />
              Agendar masterclass gratuita
            </a>
          </AnimatedSection>
        </div>
      </section>

      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0) rotate(var(--rot, -4deg)); }
          50% { transform: translateY(-12px) rotate(var(--rot, -4deg)); }
        }
      `}</style>
    </div>
  );
}

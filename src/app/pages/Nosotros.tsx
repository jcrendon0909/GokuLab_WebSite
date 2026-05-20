import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { MessageCircle, Heart, Zap, Globe, Award, ChevronRight, Users } from "lucide-react";
import { useTheme } from "next-themes";

// Placeholders de avatares neutros para las fotos circulares
const AVATAR_PLACEHOLDER = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200";

const team = [
  {
    name: "Profesor Ejemplo 1",
    role: "Especialidad Tech",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    img: AVATAR_PLACEHOLDER,
    emoji: "💻",
  },
  {
    name: "Profesor Ejemplo 2",
    role: "Especialidad Robótica",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    img: AVATAR_PLACEHOLDER,
    emoji: "🦾",
  },
  {
    name: "Profesor Ejemplo 3",
    role: "Especialidad Diseño",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    img: AVATAR_PLACEHOLDER,
    emoji: "🎨",
  },
  {
    name: "Profesor Ejemplo 4",
    role: "Especialidad Ciencias / IA",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    img: AVATAR_PLACEHOLDER,
    emoji: "🧠",
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
  const { theme } = useTheme();

  return (
    <div className="bg-white dark:bg-[#0A0F1E] transition-colors duration-300">
      {/* HERO */}
      <section
        className="relative py-32 px-4 overflow-hidden bg-slate-50 dark:bg-[#050A14] transition-colors duration-300"
        style={{ paddingTop: "120px" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(0,201,255,0.07) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(124,58,237,0.06) 0%, transparent 60%)",
          }}
        />

        {/* Polaroid-style collage bg */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-40 rounded-lg overflow-hidden bg-gray-300 dark:bg-white/10"
              style={{
                top: `${10 + (i % 3) * 30}%`,
                left: `${5 + i * 16}%`,
                transform: `rotate(${-8 + i * 3}deg)`,
                animation: `floatCard ${4 + i}s ease-in-out infinite ${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          <AnimatedSection>
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-6 bg-blue-50 dark:bg-blue-900/20"
              style={{
                color: "#00C9FF",
                border: "1px solid rgba(0,201,255,0.25)",
              }}
            >
              Nuestra historia
            </div>
            <h1
              className="text-gray-900 dark:text-white mb-6 transition-colors duration-300"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1.15,
              }}
            >
              Creemos en <span style={{ color: "#7C3AED" }}>superpoderes</span>
              <br />
              para un <span style={{ color: "#f8b50e" }}>superfuturo</span>
            </h1>
            <p
              className="text-gray-600 dark:text-white/65 max-w-2xl mx-auto transition-colors duration-300"
              style={{ fontSize: "1.15rem", lineHeight: 1.75 }}
            >
              GŌKU LAB nació de la convicción de que la tecnología puede y debe
              estar al alcance de todos: niños que sueñan, jóvenes que exploran,
              adultos que se reinventan y empresas que evolucionan.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 px-4 bg-white dark:bg-[#0A0F1E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm mb-6 bg-orange-50 dark:bg-orange-900/20"
                style={{
                  color: "#FF6B35",
                  border: "1px solid rgba(255,107,53,0.25)",
                }}
              >
                Nuestra filosofía
              </div>
              <h2
                className="text-gray-900 dark:text-white mb-6 transition-colors duration-300"
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
                className="text-gray-600 dark:text-white/65 mb-6 leading-relaxed transition-colors duration-300"
                style={{ fontSize: "1.05rem" }}
              >
                No enseñamos tecnología por enseñar tecnología. La usamos como
                vehículo para desarrollar pensamiento crítico, creatividad,
                colaboración y resiliencia.
              </p>
              <p
                className="text-gray-600 dark:text-white/65 mb-8 leading-relaxed transition-colors duration-300"
                style={{ fontSize: "1.05rem" }}
              >
                Cada alumno que sale de GŌKU LAB no solo sabe programar. Sabe
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
                    className="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 transition-all duration-300"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = val.color + "40";
                      (e.currentTarget as HTMLElement).style.background = val.color + "08";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "";
                      (e.currentTarget as HTMLElement).style.background = "";
                    }}
                  >
                    <val.icon
                      size={24}
                      className="mb-3"
                      style={{ color: val.color }}
                    />
                    <h4
                      className="text-gray-900 dark:text-white mb-1 transition-colors duration-300"
                      style={{ fontSize: "0.9rem", fontWeight: 700 }}
                    >
                      {val.title}
                    </h4>
                    <p className="text-gray-500 dark:text-white/50 text-xs leading-relaxed transition-colors duration-300">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SOBRE EL EQUIPO — Tarjetas Simétricas Corregidas (El badge ya no se corta) */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-[#050A14] transition-colors duration-300 border-t border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-4 bg-purple-50 dark:bg-purple-900/20"
              style={{
                color: "#7C3AED",
                border: "1px solid rgba(124,58,237,0.25)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <Users size={14} />
                <span>Sobre el equipo</span>
              </div>
            </div>
            <h2
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800 }}
            >
              Nuestro equipo
            </h2>
            <p className="text-gray-600 dark:text-white/60 max-w-2xl mx-auto text-sm transition-colors duration-300">
              Conoce a los profesionales y guías dedicados a potenciar el desarrollo integral dentro de nuestra comunidad.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <AnimatedSection key={idx} delay={idx * 80}>
                <div
                  className="p-6 rounded-3xl flex flex-col items-center text-center h-full bg-white dark:bg-[#0A0F1E] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "none";
                  }}
                >
                  {/* Foto Contenedora RELATIVA externa sin overflow-hidden para que el badge flote libremente */}
                  <div className="relative w-24 h-24 mb-4 shrink-0">
                    {/* Contenedor INTERNO circular que sí tiene overflow-hidden para recortar la foto */}
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-purple-500/20 flex items-center justify-center bg-gray-100 dark:bg-white/5">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Badge absoluto exterior (visible y exacto al diseño de Figma) */}
                    <span className="absolute -bottom-1 -right-1 bg-white dark:bg-[#111827] rounded-full shadow-md border border-gray-100 dark:border-white/10 flex items-center justify-center w-8 h-8 z-10 text-base transition-colors duration-300">
                      {member.emoji}
                    </span>
                  </div>

                  <h3 className="text-gray-900 dark:text-white font-extrabold text-base mb-1 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <span className="text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider block mb-4">
                    {member.role}
                  </span>
                  <p className="text-gray-600 dark:text-white/60 text-xs leading-relaxed transition-colors duration-300">
                    {member.bio}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL */}
      <section
        className="py-24 px-4 transition-colors duration-300 bg-white dark:bg-transparent"
        style={{
          background: "linear-gradient(135deg, rgba(0,201,255,0.05), rgba(124,58,237,0.05))",
        }}
      >
        <div className="max-w-5xl mx-auto">
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
                  className="p-7 rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none transition-all duration-300"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3
                    className="text-gray-900 dark:text-white mb-3 transition-colors duration-300"
                    style={{ fontWeight: 700, fontSize: "1.1rem" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-white/60 leading-relaxed transition-colors duration-300">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-4 bg-white dark:bg-[#0A0F1E] transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              ¿Quieres ser parte de la historia?
            </h2>
            <p className="text-gray-600 dark:text-white/60 mb-8 max-w-xl mx-auto transition-colors duration-300" style={{ fontSize: "1.1rem" }}>
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
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import {
  Target, Lightbulb, Cpu, Award, Users, CheckCircle,
  MessageCircle, ArrowRight, BookOpen, Layers, Zap
} from "lucide-react";

const phases = [
  {
    number: "01",
    title: "Diagnóstico personalizado",
    icon: Target,
    color: "#FF6B35",
    desc: "Todo comienza entendiendo quién eres, qué quieres lograr y desde dónde partes.",
    items: [
      "Entrevista de orientación (30 min)",
      "Test de intereses y habilidades",
      "Definición de objetivos claros",
      "Recomendación de ruta personalizada",
    ],
  },
  {
    number: "02",
    title: "Aprendizaje activo",
    icon: Lightbulb,
    color: "#00C9FF",
    desc: "La teoría al servicio de la práctica. Cada concepto se aplica en el mismo momento.",
    items: [
      "Clases dinámicas y participativas",
      "Proyectos aplicados desde el primer día",
      "Aprendizaje basado en problemas reales",
      "Feedback inmediato y constructivo",
    ],
  },
  {
    number: "03",
    title: "Creación con tecnología",
    icon: Cpu,
    color: "#7C3AED",
    desc: "No solo aprender a usar herramientas, sino crear soluciones con ellas.",
    items: [
      "Proyectos personales con libertad creativa",
      "Trabajo en equipo en proyectos complejos",
      "Uso de herramientas de industria real",
      "Publicación y presentación de resultados",
    ],
  },
  {
    number: "04",
    title: "Resultados medibles",
    icon: Award,
    color: "#10B981",
    desc: "Cada alumno sale con logros concretos y habilidades demostradas.",
    items: [
      "Portafolio de proyectos reales",
      "Certificado digital verificable",
      "Seguimiento post-curso",
      "Acceso continuo a la comunidad",
    ],
  },
];

const principles = [
  {
    icon: Users,
    title: "Grupos pequeños",
    desc: "Máximo 8 alumnos por instructor. Atención real, no masiva.",
    color: "#FF6B35",
  },
  {
    icon: BookOpen,
    title: "Contenido actualizado",
    desc: "Currículos revisados cada trimestre para estar siempre a la vanguardia.",
    color: "#00C9FF",
  },
  {
    icon: Layers,
    title: "Rutas progresivas",
    desc: "Cada curso lleva a un siguiente nivel. El crecimiento nunca se detiene.",
    color: "#7C3AED",
  },
  {
    icon: Zap,
    title: "Motivación continua",
    desc: "Gamificación, retos semanales y celebración de logros para mantener el momentum.",
    color: "#FFE134",
  },
];

export function Metodologia() {
  return (
    <div>
      {/* HERO */}
      <section
        className="pt-32 pb-20 px-4 relative overflow-hidden"
        style={{ background: "#050A14" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(0,201,255,0.07) 0%, transparent 60%)",
          }}
        />
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
              Metodología GOKU LAB
            </div>
            <h1
              className="text-white mb-6"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1.15,
              }}
            >
              Aprender haciendo.{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Crecer creando.
              </span>
            </h1>
            <p
              className="text-white/65 max-w-2xl mx-auto"
              style={{ fontSize: "1.15rem", lineHeight: 1.75 }}
            >
              Nuestra metodología combina lo mejor de la educación activa, el
              aprendizaje basado en proyectos y el desarrollo humano para crear
              experiencias que transforman.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* PHASES */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              El proceso GOKU LAB
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              4 fases diseñadas para llevar a cada alumno desde donde está hasta
              donde quiere llegar.
            </p>
          </AnimatedSection>

          <div className="relative">
            {/* Connector line */}
            <div
              className="hidden lg:block absolute top-16 left-1/2 w-px h-[calc(100%-8rem)]"
              style={{ background: "linear-gradient(to bottom, #00C9FF20, #7C3AED20)" }}
            />

            <div className="flex flex-col gap-8">
              {phases.map((phase, i) => (
                <AnimatedSection key={phase.number} delay={i * 100}>
                  <div
                    className={`grid lg:grid-cols-2 gap-8 items-center ${
                      i % 2 !== 0 ? "lg:direction-rtl" : ""
                    }`}
                  >
                    {/* Card */}
                    <div
                      className={`p-8 rounded-3xl ${i % 2 !== 0 ? "lg:order-2" : ""}`}
                      style={{
                        background: `${phase.color}08`,
                        border: `1px solid ${phase.color}25`,
                      }}
                    >
                      <div className="flex items-start gap-4 mb-5">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                          style={{ background: `${phase.color}18` }}
                        >
                          <phase.icon size={26} style={{ color: phase.color }} />
                        </div>
                        <div>
                          <div
                            className="text-xs font-bold mb-1"
                            style={{ color: phase.color }}
                          >
                            FASE {phase.number}
                          </div>
                          <h3
                            className="text-white"
                            style={{ fontWeight: 700, fontSize: "1.25rem" }}
                          >
                            {phase.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-white/60 leading-relaxed mb-5">
                        {phase.desc}
                      </p>
                      <div className="flex flex-col gap-2.5">
                        {phase.items.map((item) => (
                          <div key={item} className="flex items-center gap-2.5">
                            <CheckCircle
                              size={16}
                              style={{ color: phase.color, flexShrink: 0 }}
                            />
                            <span className="text-white/65 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Number display */}
                    <div
                      className={`hidden lg:flex items-center justify-center ${
                        i % 2 !== 0 ? "lg:order-1" : ""
                      }`}
                    >
                      <div
                        className="relative"
                        style={{
                          fontSize: "8rem",
                          fontWeight: 900,
                          background: `linear-gradient(135deg, ${phase.color}40, ${phase.color}05)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          lineHeight: 1,
                        }}
                      >
                        {phase.number}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section
        className="py-24 px-4"
        style={{
          background: "#050A14",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              Principios que nos{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                distinguen
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {principles.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 80}>
                <div
                  className="p-6 rounded-3xl h-full text-center"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                    (e.currentTarget as HTMLElement).style.borderColor = p.color + "40";
                    (e.currentTarget as HTMLElement).style.background = p.color + "08";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "none";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${p.color}15` }}
                  >
                    <p.icon size={24} style={{ color: p.color }} />
                  </div>
                  <h3
                    className="text-white mb-2"
                    style={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ADAPTATIONS */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              Adaptado a cada{" "}
              <span style={{ color: "#FF6B35" }}>perfil</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🧒",
                title: "Para niños y adolescentes",
                color: "#FF6B35",
                desc: "Gamificación, proyectos creativos, ritmo dinámico y mucha diversión. Aprendizaje que no se siente como escuela.",
                points: [
                  "Sesiones de 60-90 min con actividades variadas",
                  "Retos semanales y recompensas",
                  "Proyectos propios con libertad creativa",
                  "Reporte de progreso para padres",
                ],
              },
              {
                emoji: "👨‍💼",
                title: "Para adultos",
                color: "#00C9FF",
                desc: "Enfoque profesional, aplicación inmediata al trabajo y mentoría personalizada para resultados reales.",
                points: [
                  "Sesiones flexibles en horario profesional",
                  "Proyectos aplicados a tu trabajo actual",
                  "Mentoría individual semanal",
                  "Portafolio y preparación para entrevistas",
                ],
              },
              {
                emoji: "🏢",
                title: "Para empresas",
                color: "#7C3AED",
                desc: "Capacitaciones diseñadas a medida, con diagnóstico previo, formatos flexibles y métricas de impacto.",
                points: [
                  "Diagnóstico de necesidades previo",
                  "Contenido 100% personalizado",
                  "Modalidad in-company o remota",
                  "Reporte de impacto post-capacitación",
                ],
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div
                  className="p-7 rounded-3xl h-full"
                  style={{
                    background: `${item.color}06`,
                    border: `1px solid ${item.color}20`,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${item.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "none";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="text-3xl mb-4">{item.emoji}</div>
                  <h3
                    className="text-white mb-3"
                    style={{ fontWeight: 700, fontSize: "1.1rem" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    {item.desc}
                  </p>
                  <div className="flex flex-col gap-2">
                    {item.points.map((pt) => (
                      <div key={pt} className="flex items-start gap-2.5 text-sm">
                        <span style={{ color: item.color }} className="mt-0.5">✦</span>
                        <span className="text-white/60">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-4"
        style={{
          background: "#050A14",
          borderTop: "1px solid rgba(0,201,255,0.1)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              ¿Quieres vivirla en persona?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto" style={{ fontSize: "1.1rem" }}>
              Agenda tu masterclass gratuita y experimenta nuestra metodología
              de primera mano. Sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5612668168"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-10 py-4 rounded-2xl text-white font-bold"
                style={{
                  background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                  boxShadow: "0 8px 30px rgba(0,201,255,0.3)",
                  transition: "all 0.2s ease",
                  fontSize: "1.05rem",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <MessageCircle size={20} />
                Agendar masterclass gratuita
              </a>
              <Link
                to="/cursos"
                className="flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-white font-semibold border border-white/25"
                style={{ transition: "all 0.2s ease" }}
              >
                Explorar cursos
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

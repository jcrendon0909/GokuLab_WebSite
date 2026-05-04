import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { CheckCircle, MessageCircle, ArrowRight, Star, Globe, Award, Users } from "lucide-react";

const becas = [
  {
    title: "Beca Talento Digital",
    emoji: "🌟",
    desc: "Para jóvenes de 10 a 18 años con demostrado interés en tecnología y situación económica limitante.",
    coverage: "Hasta 80% de descuento",
    req: ["Carta de motivación", "Documentación socioeconómica", "Entrevista de selección"],
    color: "#00C9FF",
    type: "Beca",
  },
  {
    title: "Beca Mujer Tech",
    emoji: "👩‍💻",
    desc: "Promovemos la equidad de género en tecnología. Apoyo especial para mujeres que quieren iniciar en el sector tech.",
    coverage: "Hasta 70% de descuento",
    req: ["Autodeclaración de género", "Carta de objetivos", "Disponibilidad de horario"],
    color: "#E91E63",
    type: "Beca",
  },
  {
    title: "Beca Comunidad",
    emoji: "🤝",
    desc: "Para comunidades rurales, indígenas o en situación de vulnerabilidad que quieran acceder a educación tecnológica.",
    coverage: "Hasta 100% de descuento",
    req: ["Documentación comunitaria", "Carta de intención", "Disponibilidad online"],
    color: "#10B981",
    type: "Beca",
  },
  {
    title: "Plan Hermanos",
    emoji: "👨‍👩‍👧‍👦",
    desc: "Inscribe a dos o más hijos y recibe un descuento automático en la segunda y tercera inscripción.",
    coverage: "20-30% descuento adicional",
    req: ["Registro de ambos alumnos", "Mismo núcleo familiar", "Aplicable a todos los cursos"],
    color: "#FFE134",
    type: "Plan",
  },
  {
    title: "Plan Alumni",
    emoji: "🎓",
    desc: "Si ya eres egresado de GOKU LAB, tienes acceso especial para continuar tu formación con precios preferenciales.",
    coverage: "15-25% descuento permanente",
    req: ["Haber completado un curso previo", "Certificado de egreso", "Sin condición adicional"],
    color: "#FF6B35",
    type: "Plan",
  },
  {
    title: "Financiamiento mensual",
    emoji: "💳",
    desc: "Paga en cómodas mensualidades sin intereses para que la inversión en tu educación no sea una barrera.",
    coverage: "Hasta 12 meses sin intereses",
    req: ["Disponible para todos los cursos", "Sin buró de crédito", "Aprobación inmediata"],
    color: "#7C3AED",
    type: "Financiamiento",
  },
];

const allies = [
  { name: "British Council", emoji: "🇬🇧", desc: "Programa de inglés tecnológico en colaboración" },
  { name: "Google for Education", emoji: "🌐", desc: "Herramientas Google Workspace para todos los alumnos" },
  { name: "Microsoft Learn", emoji: "💻", desc: "Certificaciones oficiales de Microsoft" },
  { name: "Codecademy", emoji: "👨‍💻", desc: "Acceso a plataforma de práctica en línea" },
  { name: "Fundación Televisa", emoji: "📺", desc: "Becas para comunidades vulnerables" },
  { name: "INADEM / SE", emoji: "🏛️", desc: "Apoyo gubernamental para PyMEs en capacitación" },
];

export function Becas() {
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
              "radial-gradient(ellipse at center, rgba(16,185,129,0.07) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-5xl mx-auto text-center relative">
          <AnimatedSection>
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-6"
              style={{
                background: "rgba(16,185,129,0.1)",
                color: "#10B981",
                border: "1px solid rgba(16,185,129,0.25)",
              }}
            >
              🎓 Becas y alianzas
            </div>
            <h1
              className="text-white mb-6"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.8rem)",
                fontWeight: 900,
                lineHeight: 1.15,
              }}
            >
              La tecnología es para{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #10B981, #00C9FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                todos
              </span>
            </h1>
            <p
              className="text-white/65 max-w-2xl mx-auto"
              style={{ fontSize: "1.15rem", lineHeight: 1.75 }}
            >
              Creemos que el dinero no debería ser un obstáculo para aprender.
              Tenemos becas, planes flexibles y alianzas para que nadie se quede
              sin acceso.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* PROGRAMA NACIONAL */}
      <section className="py-20 px-4" style={{ background: "#050A14" }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-6"
              style={{
                background: "rgba(255,107,53,0.1)",
                color: "#FF6B35",
                border: "1px solid rgba(255,107,53,0.25)",
              }}
            >
              🎯 Programa Nacional
            </div>
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1 }}
            >
              <span
                style={{
                  background: "linear-gradient(90deg, #FF6B35, #E91E63)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                "Abriendo Caminos Digitales"
              </span>
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto text-lg">
              Proyecto nacional para la disminución de la brecha educativa y tecnológica
              entre México y los países desarrollados
            </p>
          </AnimatedSection>

          {/* Problema */}
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            <AnimatedSection direction="left">
              <div
                className="p-8 rounded-3xl h-full"
                style={{
                  background: "rgba(255,107,53,0.05)",
                  border: "1px solid rgba(255,107,53,0.2)",
                }}
              >
                <h3 className="text-white text-2xl font-bold mb-6">
                  La situación STEAM en México 🇲🇽
                </h3>
                <div className="flex flex-col gap-5">
                  {[
                    {
                      num: "01",
                      stat: "52/78",
                      desc: "México ocupó el lugar 52/78 en el Índice Global de Competitividad del Talento (INSEAD 2023)",
                      color: "#FF6B35",
                    },
                    {
                      num: "02",
                      stat: "25%",
                      desc: "Solo el 25% de estudiantes de secundaria tiene acceso a educación STEAM de calidad en zonas vulnerables, bajo el 5% (Mexico 2024)",
                      color: "#00C9FF",
                    },
                    {
                      num: "03",
                      stat: "18%",
                      desc: "Brecha de género: niñas representan solo el 18% en carreras STEAM (OCDE 2025)",
                      color: "#E91E63",
                    },
                    {
                      num: "04",
                      stat: "40%",
                      desc: "Población vulnerable (Vivat socioeconómico bajo): 40% de niños sin acceso a internet y dispositivos (ENDUTIH 2025)",
                      color: "#7C3AED",
                    },
                  ].map((item) => (
                    <div key={item.num} className="flex gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${item.color}20`, border: `2px solid ${item.color}` }}
                      >
                        <span className="text-sm font-bold" style={{ color: item.color }}>
                          {item.num}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-bold text-xl mb-1" style={{ color: item.color }}>
                          {item.stat}
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Solución */}
            <AnimatedSection direction="right">
              <div
                className="p-8 rounded-3xl h-full"
                style={{
                  background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(0,201,255,0.08))",
                  border: "1px solid rgba(16,185,129,0.3)",
                }}
              >
                <h3 className="text-white text-2xl font-bold mb-6">
                  Nuestra Propuesta ✨
                </h3>
                <div className="mb-8">
                  <div
                    className="inline-block px-4 py-2 rounded-xl text-white font-bold mb-4"
                    style={{ background: "linear-gradient(135deg, #10B981, #00C9FF)" }}
                  >
                    Becas Variables · Alta Cobertura · Escalable
                  </div>
                </div>

                {/* Comparativa */}
                <div className="space-y-4">
                  {[
                    {
                      label: "Cobertura Geográfica",
                      value: "Alta - Meta 100%",
                      icon: "🌎",
                    },
                    {
                      label: "Tipo de apoyo",
                      value: "Becas con % variable",
                      icon: "💚",
                    },
                    {
                      label: "Escalabilidad",
                      value: "Sí - Modelo replicable",
                      icon: "📈",
                    },
                    {
                      label: "Habilidades Siglo XXI",
                      value: "Sí - Enfoque integral",
                      icon: "🚀",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-4 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-white/70 text-sm">{item.label}</span>
                      </div>
                      <span className="text-white font-bold text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(16,185,129,0.15)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={18} className="text-[#10B981]" />
                    <span className="text-white font-semibold text-sm">
                      Impacto Social Medible
                    </span>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">
                    Becas con porcentajes asignados según perfil socioeconómico para comunidades
                    vulnerables, cerrando la brecha digital con metodología STEAM adaptada a la
                    realidad mexicana.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* CTA del programa */}
          <AnimatedSection>
            <div
              className="p-10 rounded-3xl text-center"
              style={{
                background: "linear-gradient(135deg, rgba(255,107,53,0.1), rgba(233,30,99,0.1))",
                border: "1px solid rgba(255,107,53,0.3)",
              }}
            >
              <h3 className="text-white text-2xl font-bold mb-3">
                ¿Tu comunidad califica para el programa?
              </h3>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Escríbenos para saber si tu escuela, comunidad u organización puede participar
                en "Abriendo Caminos Digitales" con becas de porcentajes variables según perfil.
              </p>
              <a
                href="https://wa.me/5612668168?text=Quiero%20información%20sobre%20el%20programa%20Abriendo%20Caminos%20Digitales"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl text-white font-bold"
                style={{
                  background: "linear-gradient(135deg, #FF6B35, #E91E63)",
                  boxShadow: "0 8px 30px rgba(255,107,53,0.3)",
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
                Solicitar información del programa
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BECAS */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-12">
            <h2
              className="text-white"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}
            >
              Programas de apoyo
            </h2>
            <p className="text-white/60 mt-2">
              Elige el programa que mejor se adapte a tu situación.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {becas.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 80}>
                <div
                  className="p-7 rounded-3xl h-full flex flex-col"
                  style={{
                    background: `${b.color}06`,
                    border: `1px solid ${b.color}20`,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px ${b.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "none";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ fontSize: "2rem" }}>{b.emoji}</span>
                    <span
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{ background: `${b.color}20`, color: b.color }}
                    >
                      {b.type}
                    </span>
                  </div>
                  <h3
                    className="text-white mb-2"
                    style={{ fontWeight: 700, fontSize: "1.1rem" }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                    {b.desc}
                  </p>
                  <div
                    className="px-4 py-2 rounded-xl mb-4 text-center font-bold"
                    style={{ background: `${b.color}15`, color: b.color }}
                  >
                    {b.coverage}
                  </div>
                  <div className="flex flex-col gap-2 mb-5">
                    {b.req.map((r) => (
                      <div key={r} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={14} style={{ color: b.color, marginTop: 1, flexShrink: 0 }} />
                        <span className="text-white/55">{r}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={`https://wa.me/5612668168?text=Quiero%20información%20sobre%3A%20${encodeURIComponent(b.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm"
                    style={{
                      background: b.color,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                  >
                    <MessageCircle size={15} />
                    Solicitar información
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800 }}
            >
              ¿Cómo solicito una beca?
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Escríbenos",
                desc: "Contáctanos por WhatsApp o formulario indicando que te interesa una beca.",
                color: "#00C9FF",
                emoji: "💬",
              },
              {
                step: "02",
                title: "Valoración",
                desc: "Alguien del equipo te contactará para conocer tu perfil y orientarte al programa adecuado.",
                color: "#7C3AED",
                emoji: "🗣️",
              },
              {
                step: "03",
                title: "¡Aprobación!",
                desc: "Recibirás la respuesta en máximo 72 horas hábiles. Inscripción y bienvenida.",
                color: "#10B981",
                emoji: "🎉",
              },
            ].map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 100}>
                <div
                  className="p-7 rounded-3xl text-center"
                  style={{
                    background: `${s.color}08`,
                    border: `1px solid ${s.color}20`,
                  }}
                >
                  <div className="text-4xl mb-4">{s.emoji}</div>
                  <div
                    className="text-xs font-bold mb-2"
                    style={{ color: s.color }}
                  >
                    PASO {s.step}
                  </div>
                  <h3
                    className="text-white mb-3"
                    style={{ fontWeight: 700, fontSize: "1.1rem" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
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
          borderTop: "1px solid rgba(16,185,129,0.15)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              ¿No encuentras el apoyo que necesitas?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto" style={{ fontSize: "1.1rem" }}>
              Hablemos directamente. Siempre encontramos una solución para que
              el acceso a la tecnología no sea una barrera.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5612668168?text=Hola,%20necesito%20información%20sobre%20becas%20y%20apoyos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-10 py-4 rounded-2xl text-white font-bold"
                style={{
                  background: "#25D366",
                  boxShadow: "0 6px 25px rgba(37,211,102,0.3)",
                  transition: "all 0.2s ease",
                  fontSize: "1.05rem",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <MessageCircle size={20} />
                Hablar con el equipo
              </a>
              <Link
                to="/contacto"
                className="flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-white font-semibold border border-white/25"
                style={{ transition: "all 0.2s ease" }}
              >
                Formulario de contacto
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { useTheme } from "next-themes";
import {
  CheckCircle, MessageCircle, ArrowRight, BarChart2, Users, Clock,
  Shield, Zap, Globe, Cpu, Code, Layers
} from "lucide-react";

const CORP_IMG = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900";

const areas = [
  {
    icon: Cpu,
    title: "Inteligencia Artificial",
    items: ["ChatGPT para equipos", "Automatización con IA", "Análisis de datos con Python"],
    color: "#10B981",
  },
  {
    icon: Code,
    title: "Desarrollo Digital",
    items: ["Fundamentos de programación", "Herramientas de productividad digital", "Cloud computing básico"],
    color: "#00C9FF",
  },
  {
    icon: Globe,
    title: "Marketing Digital",
    items: ["Redes sociales avanzadas", "Estrategia de contenido", "Analytics y métricas"],
    color: "#7C3AED",
  },
  {
    icon: Shield,
    title: "Ciberseguridad",
    items: ["Cultura de seguridad digital", "Protección de datos", "Prevención de fraudes"],
    color: "#FF6B35",
  },
  {
    icon: Layers,
    title: "Transformación Digital",
    items: ["Diagnóstico digital organizacional", "Roadmap tecnológico", "Cambio cultural tech"],
    color: "#E91E63",
  },
  {
    icon: BarChart2,
    title: "Data & Analytics",
    items: ["Excel avanzado y Power BI", "Dashboards ejecutivos", "Toma de decisiones con datos"],
    color: "#FFE134",
  },
];

const formats = [
  {
    title: "Taller Intensivo",
    duration: "4–8 horas",
    desc: "Sesión única de alto impacto para un tema específico.",
    icon: "⚡",
    color: "#FF6B35",
  },
  {
    title: "Programa Modular",
    duration: "4–12 semanas",
    desc: "Aprendizaje progresivo con seguimiento y métricas.",
    icon: "📚",
    color: "#00C9FF",
  },
  {
    title: "In-Company",
    duration: "Flexible",
    desc: "Llevamos el programa directamente a tus instalaciones.",
    icon: "🏢",
    color: "#7C3AED",
  },
  {
    title: "Online Asíncrono",
    duration: "A tu ritmo",
    desc: "Contenido grabado + soporte vivo. Ideal para equipos remotos.",
    icon: "🌐",
    color: "#10B981",
  },
];

const clients = [
  { name: "TechStartup MX", emoji: "🚀", sector: "Tecnología" },
  { name: "Banco Regional", emoji: "🏦", sector: "Finanzas" },
  { name: "Grupo Industrial Norte", emoji: "🏭", sector: "Manufactura" },
  { name: "Clínica Salud+", emoji: "🏥", sector: "Salud" },
  { name: "EdTech Latam", emoji: "📚", sector: "Educación" },
  { name: "Retail Nacional", emoji: "🛒", sector: "Comercio" },
];

export function Capacitaciones() {
  const { theme } = useTheme();

  return (
    <div className="bg-white dark:bg-[#0A0F1E] transition-colors duration-300">
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden bg-gray-50 dark:bg-[#0e1821] transition-colors duration-300"
        style={{ paddingTop: "80px" }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={CORP_IMG}
            alt="Empresas y gobierno"
            className="w-full h-full object-cover"
            style={{ opacity: theme === "dark" ? 0.08 : 0.05 }}
          />
          <div
            className="absolute inset-0 transition-colors duration-300"
            style={{
              background: theme === "dark" 
                ? "linear-gradient(135deg, rgba(14,24,33,0.98) 0%, rgba(14,24,33,0.85) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.85) 100%)",
            }}
          />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10 transition-colors duration-300"
          style={{
            backgroundImage: theme === "dark"
              ? "linear-gradient(rgba(0,201,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,201,255,0.3) 1px, transparent 1px)"
              : "linear-gradient(rgba(0,201,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,201,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8 bg-blue-50 dark:bg-blue-900/10"
                style={{
                  color: "#00C9FF",
                  border: "1px solid rgba(0,201,255,0.25)",
                }}
              >
                <Zap size={14} />
                <span>Soluciones para empresas</span>
              </div>

              <h1
                className="text-gray-900 dark:text-white mb-6 transition-colors duration-300"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Transforma tu equipo.
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Transforma tu empresa.
                </span>
              </h1>

              <p
                className="text-gray-600 dark:text-white/65 mb-8 transition-colors duration-300"
                style={{ fontSize: "1.15rem", lineHeight: 1.7 }}
              >
                Soluciones tecnológicas 100% personalizadas para empresas y gobierno.
                Diagnóstico previo, contenido relevante y resultados medibles.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  "85+ empresas capacitadas",
                  "Contenido 100% personalizado",
                  "Formatos flexibles",
                  "Métricas de impacto post-capacitación",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#00C9FF] shrink-0" />
                    <span className="text-gray-600 dark:text-white/65 text-sm transition-colors duration-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/5612668168?text=Hola,%20quiero%20información%20sobre%20soluciones%20para%20mi%20organización"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-bold"
                  style={{
                    background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                    boxShadow: "0 8px 30px rgba(0,201,255,0.3)",
                    transition: "all 0.2s ease",
                    fontSize: "1rem",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                >
                  <MessageCircle size={18} />
                  Solicitar cotización
                </a>
                <Link
                  to="/contacto"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold border transition-all duration-300 text-gray-900 dark:text-white border-gray-300 dark:border-white/25 hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  Formulario de contacto
                  <ArrowRight size={16} />
                </Link>
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection direction="right" delay={100}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "85+", label: "Empresas", sub: "capacitadas con éxito", color: "#00C9FF" },
                  { number: "5,000+", label: "Profesionales", sub: "capacitados en total", color: "#7C3AED" },
                  { number: "93%", label: "Satisfacción", sub: "promedio corporativo", color: "#10B981" },
                  { number: "6", label: "Modalidades", sub: "de entrega disponibles", color: "#FF6B35" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-6 rounded-3xl bg-white dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300"
                    style={{
                      background: theme === "dark" ? `${s.color}08` : `${s.color}15`,
                      border: theme === "dark" ? `1px solid ${s.color}20` : `1px solid ${s.color}30`,
                    }}
                  >
                    <div
                      className="mb-1"
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: 900,
                        color: s.color,
                        lineHeight: 1,
                      }}
                    >
                      {s.number}
                    </div>
                    <div className="text-gray-900 dark:text-white font-semibold transition-colors duration-300">{s.label}</div>
                    <div className="text-gray-500 dark:text-white/40 text-xs mt-0.5 transition-colors duration-300">{s.sub}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section
        className="py-20 px-4 bg-gray-50 dark:bg-[#050A14] transition-colors duration-300"
        style={{
          borderTop: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <p className="text-gray-400 dark:text-white/40 text-sm uppercase tracking-widest transition-colors duration-300">
              Empresas que confían en GOKU LAB
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {clients.map((c, i) => (
              <AnimatedSection key={c.name} delay={i * 60}>
                <div
                  className="flex flex-col items-center gap-2 p-5 rounded-2xl text-center bg-white dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300"
                  style={{
                    background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
                    border: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = theme === "dark" ? "rgba(0,201,255,0.25)" : "rgba(0,201,255,0.4)";
                    (e.currentTarget as HTMLElement).style.background = theme === "dark" ? "rgba(0,201,255,0.05)" : "rgba(0,201,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
                    (e.currentTarget as HTMLElement).style.background = theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff";
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>{c.emoji}</span>
                  <span className="text-gray-900 dark:text-white text-xs font-semibold transition-colors duration-300">{c.name}</span>
                  <span className="text-gray-500 dark:text-white/30 text-xs transition-colors duration-300">{c.sector}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 px-4 bg-white dark:bg-[#0A0F1E] transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm mb-6 bg-orange-50 dark:bg-orange-900/10"
                style={{
                  color: "#FF6B35",
                  border: "1px solid rgba(255,107,53,0.25)",
                }}
              >
                El reto actual
              </div>
              <h2
                className="text-gray-900 dark:text-white mb-6 transition-colors duration-300"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800 }}
              >
                Tu equipo necesita{" "}
                <span style={{ color: "#FF6B35" }}>tecnología real</span>,
                no cursos genéricos
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  "Programas masivos sin impacto real en productividad",
                  "Contenido desactualizado que no refleja el trabajo diario",
                  "Falta de adopción tecnológica después de los programas",
                  "Equipos con diferentes niveles sin atención personalizada",
                ].map((p, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl transition-colors duration-300"
                    style={{
                      background: theme === "dark" ? "rgba(255,107,53,0.06)" : "rgba(255,107,53,0.1)",
                      border: theme === "dark" ? "1px solid rgba(255,107,53,0.15)" : "1px solid rgba(255,107,53,0.2)",
                    }}
                  >
                    <span className="text-[#FF6B35] mt-0.5 font-bold">✗</span>
                    <span className="text-gray-600 dark:text-white/65 text-sm transition-colors duration-300">{p}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={100}>
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm mb-6 bg-blue-50 dark:bg-blue-900/10"
                style={{
                  color: "#00C9FF",
                  border: "1px solid rgba(0,201,255,0.25)",
                }}
              >
                La solución GOKU LAB
              </div>
              <h2
                className="text-gray-900 dark:text-white mb-6 transition-colors duration-300"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800 }}
              >
                Programas{" "}
                <span style={{ color: "#00C9FF" }}>que transforman</span>
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  "Diagnóstico previo de necesidades y niveles del equipo",
                  "Contenido 100% diseñado para tu industria y objetivos",
                  "Formatos flexibles: presencial, híbrido u online",
                  "Métricas de impacto y seguimiento continuo",
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl transition-colors duration-300"
                    style={{
                      background: theme === "dark" ? "rgba(0,201,255,0.05)" : "rgba(0,201,255,0.1)",
                      border: theme === "dark" ? "1px solid rgba(0,201,255,0.15)" : "1px solid rgba(0,201,255,0.2)",
                    }}
                  >
                    <CheckCircle size={18} className="text-[#00C9FF] mt-0.5 shrink-0" />
                    <span className="text-gray-600 dark:text-white/65 text-sm transition-colors duration-300">{s}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section
        className="py-20 px-4 bg-gray-50 dark:bg-[#050A14] transition-colors duration-300"
        style={{
          borderTop: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              Áreas de{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                especialización
              </span>
            </h2>
            <p className="text-gray-600 dark:text-white/60 max-w-xl mx-auto transition-colors duration-300">
              Diseñamos programas en múltiples áreas tecnológicas adaptados al
              nivel y objetivos de tu organización.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {areas.map((area, i) => (
              <AnimatedSection key={area.title} delay={i * 80}>
                <div
                  className="p-7 rounded-3xl h-full bg-white dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300"
                  style={{
                    background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
                    border: theme === "dark" ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                    (e.currentTarget as HTMLElement).style.borderColor = area.color + "40";
                    (e.currentTarget as HTMLElement).style.background = theme === "dark" ? area.color + "06" : area.color + "12";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "none";
                    (e.currentTarget as HTMLElement).style.borderColor = theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
                    (e.currentTarget as HTMLElement).style.background = theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff";
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-white dark:bg-transparent"
                    style={{ background: `${area.color}15` }}
                  >
                    <area.icon size={22} style={{ color: area.color }} />
                  </div>
                  <h3
                    className="text-gray-900 dark:text-white mb-3 transition-colors duration-300"
                    style={{ fontWeight: 700, fontSize: "1.05rem" }}
                  >
                    {area.title}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {area.items.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm">
                        <span style={{ color: area.color, fontSize: "8px" }}>●</span>
                        <span className="text-gray-600 dark:text-white/60 transition-colors duration-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section className="py-20 px-4 bg-white dark:bg-[#0A0F1E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              Formatos{" "}
              <span style={{ color: "#00C9FF" }}>flexibles</span>
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {formats.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 80}>
                <div
                  className="p-6 rounded-3xl text-center h-full bg-white dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300"
                  style={{
                    background: theme === "dark" ? `${f.color}08` : `${f.color}06`,
                    border: theme === "dark" ? `1px solid ${f.color}20` : `1px solid ${f.color}30`,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${f.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "none";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "2.5rem" }} className="mb-4">
                    {f.icon}
                  </div>
                  <h3
                    className="text-gray-900 dark:text-white mb-1 transition-colors duration-300"
                    style={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {f.title}
                  </h3>
                  <div
                    className="text-sm mb-3"
                    style={{ color: f.color, fontWeight: 600 }}
                  >
                    {f.duration}
                  </div>
                  <p className="text-gray-600 dark:text-white/55 text-sm leading-relaxed transition-colors duration-300">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="py-24 px-4 bg-gray-50 dark:bg-[#0e1821] transition-colors duration-300"
        style={{
          borderTop: theme === "dark" ? "1px solid rgba(0,201,255,0.1)" : "1px solid rgba(0,201,255,0.2)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }}
            >
              Solicita tu{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                cotización personalizada
              </span>
            </h2>
            <p
              className="text-gray-600 dark:text-white/60 mb-10 max-w-2xl mx-auto transition-colors duration-300"
              style={{ fontSize: "1.1rem" }}
            >
              Sin precios genéricos. Cada empresa es diferente y merece una
              propuesta a su medida. Contáctanos y diseñamos el programa perfecto
              para tu equipo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="https://wa.me/5612668168?text=Hola,%20quiero%20una%20cotización%20para%20mi%20organización"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-white font-bold"
                style={{
                  background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                  boxShadow: "0 8px 40px rgba(0,201,255,0.4)",
                  fontSize: "1.1rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <MessageCircle size={22} />
                Solicitar cotización gratis
              </a>
              <Link
                to="/contacto"
                className="flex items-center justify-center gap-2 px-10 py-5 rounded-2xl font-semibold border transition-all duration-300 text-gray-900 dark:text-white border-gray-300 dark:border-white/25 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                Formulario de contacto
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-white/40 transition-colors duration-300">
              {["✅ Sin costo de diagnóstico", "✅ Propuesta en 48 hrs", "✅ Sin compromiso de contrato"].map(
                (i) => <span key={i}>{i}</span>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
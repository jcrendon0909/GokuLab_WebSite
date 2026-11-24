import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { useTheme } from "next-themes";
import {
  CheckCircle, MessageCircle, ArrowRight, BarChart2, Users, Clock,
  Shield, Zap, Globe, Cpu, Code, Layers, Monitor
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

// CATÁLOGO DE TARJETAS CORPORATIVAS (Como se muestra en la imagen)
const corporateCourses = [
  {
    id: "capacitacion-corporativa",
    title: "Capacitación Corporativa",
    desc: "Programas de formación tecnológica, liderazgo e inclusión digital diseñados a la medida de los objetivos de tu empresa.",
    duration: "8 meses +",
    level: "Profesional",
    modality: "Presencial",
    assignment: "Personalizado",
    techs: ["A medida", "Certificación", "Tecnología"],
    color: "#547384", // Color pizarra idéntico al botón de la imagen
    img: CORP_IMG,
    emoji: "🏢",
    price: "desde $1600"
  }
];

const formats = [
  {
    title: "Programa Modular Online",
    duration: "8 meses +",
    desc: "Aprendizaje progresivo con seguimiento y métricas para tu equipo remoto.",
    icon: "🌐",
    color: "#00C9FF",
  },
  {
    title: "In-Company",
    duration: "8 meses +",
    desc: "Llevamos el programa directamente a tus instalaciones con instructores en vivo.",
    icon: "🏢",
    color: "#7C3AED",
  },
  {
    title: "Híbrido Corporativo",
    duration: "8 meses +",
    desc: "Combinación perfecta entre sesiones presenciales y plataforma 24/7.",
    icon: "📚",
    color: "#10B981",
  },
  {
    title: "Alta Dirección",
    duration: "8 meses +",
    desc: "Consultoría tecnológica estratégica enfocada en líderes y toma de decisiones.",
    icon: "⚡",
    color: "#FF6B35",
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
                Capacitación Corporativa.
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  A la medida de tu empresa.
                </span>
              </h1>

              <p
                className="text-gray-600 dark:text-white/65 mb-8 transition-colors duration-300"
                style={{ fontSize: "1.15rem", lineHeight: 1.7 }}
              >
                Programas de formación tecnológica, liderazgo e inclusión digital diseñados a la medida de los objetivos de tu empresa.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  "85+ empresas capacitadas",
                  "Planes desde $1600",
                  "Duración de 8 meses +",
                  "Formación 100% Personalizada",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#00C9FF] shrink-0" />
                    <span className="text-gray-600 dark:text-white/65 text-sm font-semibold transition-colors duration-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#oferta-planes"
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-bold animate-pulse"
                  style={{
                    background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                    boxShadow: "0 8px 30px rgba(0,201,255,0.3)",
                    transition: "all 0.2s ease",
                    fontSize: "1rem",
                  }}
                >
                  Ver planes disponibles
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
                  { number: "8 m+", label: "Duración", sub: "garantizada de programa", color: "#10B981" },
                  { number: "$1600", label: "Inversión", sub: "planes desde", color: "#FF6B35" },
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
              Empresas que confían en GŌKU LAB
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

      {/* SECCIÓN NUEVA: NUESTRA OFERTA EN TARJETAS (Idéntica a la imagen subida) */}
      <section id="oferta-planes" className="py-20 px-4 bg-white dark:bg-[#0A0F1E] transition-colors duration-300 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-4 bg-blue-50 dark:bg-blue-900/10"
              style={{
                color: "#00C9FF",
                border: "1px solid rgba(0,201,255,0.25)",
              }}
            >
              Programas oficiales
            </div>
            <h2 className="text-gray-900 dark:text-white mb-4 transition-colors duration-300" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}>
              Planes de Capacitación Disponibles
            </h2>
          </AnimatedSection>

          {/* Grid contenedor de las tarjetas */}
          <div className="flex justify-center max-w-md mx-auto">
            {corporateCourses.map((course) => (
              <AnimatedSection key={course.id}>
                <div
                  className="rounded-[24px] overflow-hidden flex flex-col h-full bg-white dark:bg-transparent shadow-lg transition-all duration-300 border border-gray-100 dark:border-white/10"
                  style={{
                    maxWidth: "380px"
                  }}
                >
                  {/* Contenedor Imagen + Badges Flotantes */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.img}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Badges superiores idénticos a la imagen */}
                    <div className="absolute top-4 left-4 flex gap-2 items-center">
                      <span className="text-xs px-3 py-1.5 rounded-md font-bold text-white bg-[#4A6475] shadow-sm">
                        {course.level}
                      </span>
                      <span className="text-xs px-3 py-1.5 rounded-md font-bold text-white bg-black/80 shadow-sm">
                        {course.price}
                      </span>
                    </div>

                    {/* Icono de edificio flotante a la derecha */}
                    <div className="absolute bottom-4 right-4 text-3xl drop-shadow-md">
                      {course.emoji}
                    </div>
                  </div>

                  {/* Cuerpo de la Tarjeta */}
                  <div className="p-6 flex flex-col flex-1 bg-white dark:bg-[#0e1821]">
                    <h3 className="text-gray-900 dark:text-white mb-3 font-bold text-lg leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed mb-6 flex-1">
                      {course.desc}
                    </p>

                    {/* Meta Layout Grid 2x2 exacto de la captura de pantalla */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6 border-t border-b border-gray-100 dark:border-white/5 py-4">
                      <div className="flex items-center gap-2">
                        <Clock size={15} className="text-gray-400 dark:text-white/30" />
                        <span className="text-gray-600 dark:text-white/70 text-xs font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart2 size={15} className="text-gray-400 dark:text-white/30" />
                        <span className="text-gray-600 dark:text-white/70 text-xs font-medium">{course.level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Monitor size={15} className="text-gray-400 dark:text-white/30" />
                        <span className="text-gray-600 dark:text-white/70 text-xs font-medium">{course.modality}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={15} className="text-gray-400 dark:text-white/30" />
                        <span className="text-gray-600 dark:text-white/70 text-xs font-medium">{course.assignment}</span>
                      </div>
                    </div>

                    {/* Tecnologías/Tags inferiores */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {course.techs.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-md font-medium bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-white/70 border border-gray-200/50 dark:border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Botones de acción inferiores */}
                    <div className="flex gap-2">
                      <Link
                        to={`/cursos/adultos/${course.id}`}
                        className="flex-1 py-3 rounded-xl text-center text-sm font-bold text-white transition-opacity duration-200 hover:opacity-90"
                        style={{ background: course.color }}
                      >
                        Ver Programa
                      </Link>
                      <a
                        href={`https://wa.me/5612668168?text=Hola,%20me%20interesa%20la%20${encodeURIComponent(course.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl flex items-center justify-center border transition-colors duration-250"
                        style={{
                          background: "#E8FBF0",
                          color: "#25D366",
                          borderColor: "#C6F6D5"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#25D366"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#E8FBF0"; e.currentTarget.style.color = "#25D366"; }}
                      >
                        <MessageCircle size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS DE ESPECIALIZACIÓN */}
      <section
        className="py-20 px-4 bg-gray-50 dark:bg-[#050A14] transition-colors duration-300 border-t border-gray-100 dark:border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-gray-900 dark:text-white mb-4 transition-colors duration-300" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}>
              Áreas de <span style={{ background: "linear-gradient(90deg, #00C9FF, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>especialización</span>
            </h2>
            <p className="text-gray-600 dark:text-white/60 max-w-xl mx-auto transition-colors duration-300">
              Diseñamos programas en múltiples áreas tecnológicas adaptados al nivel y objetivos de tu organización.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {areas.map((area, i) => (
              <AnimatedSection key={area.title} delay={i * 80}>
                <div
                  className="p-7 rounded-3xl h-full bg-white dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300 border border-gray-100 dark:border-white/5"
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
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-white dark:bg-transparent" style={{ background: `${area.color}15` }}>
                    <area.icon size={22} style={{ color: area.color }} />
                  </div>
                  <h3 className="text-gray-900 dark:text-white mb-3 font-bold text-base">{area.title}</h3>
                  <div className="flex flex-col gap-2">
                    {area.items.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm">
                        <span style={{ color: area.color, fontSize: "8px" }}>●</span>
                        <span className="text-gray-600 dark:text-white/65 transition-colors duration-300">{item}</span>
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
      <section className="py-20 px-4 bg-white dark:bg-[#0A0F1E] transition-colors duration-300 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-gray-900 dark:text-white mb-4 transition-colors duration-300" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}>
              Formatos <span style={{ color: "#00C9FF" }}>flexibles</span>
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {formats.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 80}>
                <div
                  className="p-6 rounded-3xl text-center h-full transition-colors duration-300"
                  style={{
                    background: theme === "dark" ? `${f.color}08` : `${f.color}06`,
                    border: theme === "dark" ? `1px solid ${f.color}20` : `1px solid ${f.color}30`,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${f.color}15`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: "2.5rem" }} className="mb-4">{f.icon}</div>
                  <h3 className="text-gray-900 dark:text-white mb-1 font-bold text-base">{f.title}</h3>
                  <div className="text-sm mb-3" style={{ color: f.color, fontWeight: 600 }}>{f.duration}</div>
                  <p className="text-gray-600 dark:text-white/55 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-[#0e1821] transition-colors duration-300 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-block px-6 py-2 rounded-full text-sm font-bold mb-6" style={{ background: "rgba(0,201,255,0.1)", color: "#00C9FF", border: "1px solid rgba(0,201,255,0.3)" }}>
              🚀 Planes corporativos desde $1600
            </div>
            <h2 className="text-gray-900 dark:text-white mb-4 transition-colors duration-300" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }}>
              Solicita tu <span style={{ background: "linear-gradient(90deg, #00C9FF, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>cotización</span>
            </h2>
            <p className="text-gray-600 dark:text-white/60 mb-10 max-w-2xl mx-auto transition-colors duration-300" style={{ fontSize: "1.1rem" }}>
              Cada empresa es diferente y merece una propuesta tecnológica a su medida. Contáctanos y diseñamos el programa perfecto para tu equipo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="https://wa.me/5612668168?text=Hola,%20quiero%20una%20cotización%20para%20mi%20organización"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-white font-bold"
                style={{ background: "linear-gradient(135deg, #00C9FF, #7C3AED)", boxShadow: "0 8px 40px rgba(0,201,255,0.4)", fontSize: "1.1rem", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <MessageCircle size={22} />
                Contactar a un asesor
              </a>
              <Link to="/contacto" className="flex items-center justify-center gap-2 px-10 py-5 rounded-2xl font-semibold border transition-all duration-300 text-gray-900 dark:text-white border-gray-300 dark:border-white/25 hover:bg-gray-100 dark:hover:bg-white/10">
                Formulario de contacto
                <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
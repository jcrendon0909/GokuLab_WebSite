import { useState } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { useTheme } from "next-themes";
import { Calendar, Clock, MapPin, Users, MessageCircle, ArrowRight, Filter, ExternalLink } from "lucide-react";

const EVENTS_IMG = "https://images.unsplash.com/photo-1756273488840-d585a91cbb99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800";

type EventFilter = "todos" | "proximos" | "talleres" | "verano";

const events = [
  {
    id: 1,
    title: "Taller de Scratch para Niños",
    type: "talleres",
    date: "15 Abr 2026",
    time: "10:00 AM – 1:00 PM",
    place: "GŌKU LAB – CDMX",
    capacity: "12 lugares",
    color: "#FF6B35",
    emoji: "🐱",
    desc: "Un taller intensivo de 3 horas donde los niños de 6 a 12 años crearán su primer videojuego usando Scratch. Incluye materiales y diploma digital.",
    tags: ["Niños", "Programación", "Scratch"],
    status: "Disponible",
    featured: true,
  },
  {
    id: 2,
    title: "Hackathon de Inteligencia Artificial",
    type: "proximos",
    date: "22 Abr 2026",
    time: "9:00 AM – 9:00 AM (+1)",
    place: "Online / CDMX",
    capacity: "30 equipos",
    color: "#00C9FF",
    emoji: "🧠",
    desc: "24 horas de desafío para crear soluciones con IA. Teams de 3-5 personas. Mentores disponibles durante todo el evento. Premios para los 3 primeros lugares.",
    tags: ["IA", "Hackathon", "18+"],
    status: "Últimos lugares",
    featured: true,
  },
  {
    id: 3,
    title: "Webinar: Python para Principiantes",
    type: "proximos",
    date: "25 Abr 2026",
    time: "7:00 PM – 9:00 PM",
    place: "Online (Zoom)",
    capacity: "Sin límite",
    color: "#7C3AED",
    emoji: "🐍",
    desc: "Introducción práctica a Python en vivo. Aprenderás los fundamentos y crearás tu primer script. Perfecto para adultos sin experiencia previa.",
    tags: ["Adultos", "Python", "Gratis"],
    status: "Gratis",
    featured: false,
  },
  {
    id: 4,
    title: "Curso de Verano: Tech Camp",
    type: "verano",
    date: "2 Jun – 25 Jun 2026",
    time: "9:00 AM – 2:00 PM",
    place: "GŌKU LAB – CDMX",
    capacity: "20 lugares",
    color: "#FFE134",
    emoji: "☀️",
    desc: "4 semanas de inmersión tecnológica total. Programación, robótica, diseño e IA para jóvenes de 7 a 16 años. La experiencia de verano más completa.",
    tags: ["Niños", "Verano", "Intensivo"],
    status: "Inscripciones abiertas",
    featured: true,
  },
  {
    id: 5,
    title: "Taller de Robótica con Micro:bit",
    type: "talleres",
    date: "3 May 2026",
    time: "10:00 AM – 2:00 PM",
    place: "GŌKU LAB – CDMX",
    capacity: "10 lugares",
    color: "#1E88E5",
    emoji: "🤖",
    desc: "Construye y programa tu propio robot en un taller de 4 horas. Para jóvenes de 9 a 15 años. Incluye kit de Micro:bit para llevarte a casa.",
    tags: ["Adolescentes", "Robótica"],
    status: "Disponible",
    featured: false,
  },
  {
    id: 6,
    title: "Masterclass: IA para Empresas",
    type: "proximos",
    date: "10 May 2026",
    time: "11:00 AM – 1:00 PM",
    place: "Online",
    capacity: "50 lugares",
    color: "#10B981",
    emoji: "📈",
    desc: "Descubre cómo tu empresa puede implementar IA de forma práctica y sin necesidad de un equipo técnico grande. Casos reales de éxito.",
    tags: ["Empresas", "IA", "Gratis"],
    status: "Gratis",
    featured: false,
  },
  {
    id: 7,
    title: "Taller de Diseño con Canva Pro",
    type: "talleres",
    date: "17 May 2026",
    time: "3:00 PM – 6:00 PM",
    place: "Online",
    capacity: "25 lugares",
    color: "#E91E63",
    emoji: "🎨",
    desc: "Aprende a crear contenido visual profesional para redes sociales y marketing. Útil para emprendedores, adultos y adolescentes creativos.",
    tags: ["Adultos", "Diseño"],
    status: "Disponible",
    featured: false,
  },
  {
    id: 8,
    title: "Verano: Minecraft Education",
    type: "verano",
    date: "7 Jul – 18 Jul 2026",
    time: "9:00 AM – 1:00 PM",
    place: "GŌKU LAB – CDMX",
    capacity: "15 lugares",
    color: "#4CAF50",
    emoji: "⛏️",
    desc: "Dos semanas aprendiendo programación y lógica computacional a través de Minecraft Education. Para niños de 8 a 13 años.",
    tags: ["Niños", "Verano", "Minecraft"],
    status: "Disponible",
    featured: false,
  },
];

const externalEvents = [
  {
    id: 101,
    title: "DevFest CDMX 2026",
    organizer: "Google Developers Group",
    date: "12 May 2026",
    time: "9:00 AM – 7:00 PM",
    place: "Centro Citibanamex – CDMX",
    color: "#4285F4",
    emoji: "🎪",
    desc: "El evento tech más grande de México. Conferencias, talleres y networking con expertos en desarrollo web, móvil, cloud e IA.",
    tags: ["Conferencia", "Gratis", "Todos"],
    url: "https://devfest.gdg.mx",
  },
  {
    id: 102,
    title: "Talent Land 2026",
    organizer: "Talently",
    date: "5-9 Jun 2026",
    time: "Todo el día",
    place: "Expo Guadalajara – GDL",
    color: "#FF6B6B",
    emoji: "🚀",
    desc: "Festival de innovación y talento. 5 días de conferencias, talleres, hackathons y networking para emprendedores y desarrolladores.",
    tags: ["Festival", "Pago", "Todos"],
    url: "https://talent-land.mx",
  },
  {
    id: 103,
    title: "Startup Weekend CDMX",
    organizer: "Techstars",
    date: "24-26 May 2026",
    time: "Viernes 6 PM – Domingo 9 PM",
    place: "WeWork – CDMX",
    color: "#00C9FF",
    emoji: "💡",
    desc: "54 horas para crear una startup desde cero. Forma equipo, valida tu idea y presenta ante inversionistas. Para emprendedores tech.",
    tags: ["Startup", "Pago", "18+"],
    url: "https://startupweekend.org",
  },
  {
    id: 104,
    title: "Hack MTY 2026",
    organizer: "Tec de Monterrey",
    date: "18-20 Oct 2026",
    time: "36 horas continuas",
    place: "Tec de Monterrey – MTY",
    color: "#0064B0",
    emoji: "🏆",
    desc: "El hackathon estudiantil más grande de Latinoamérica. +1,500 participantes. Desafíos reales de empresas. Premios en efectivo.",
    tags: ["Hackathon", "Estudiantes", "Gratis"],
    url: "https://hackmty.com",
  },
  {
    id: 105,
    title: "PlatziConf México",
    organizer: "Platzi",
    date: "15 Ago 2026",
    time: "9:00 AM – 6:00 PM",
    place: "Frontón México – CDMX",
    color: "#98CA3F",
    emoji: "🎓",
    desc: "Conferencia de educación online y tecnología. Charlas de líderes tech, networking y actividades interactivas.",
    tags: ["Conferencia", "Pago", "Todos"],
    url: "https://platzi.com/conf",
  },
  {
    id: 106,
    title: "Campus Party México",
    organizer: "Campus Party",
    date: "15-19 Jul 2026",
    time: "24/7 durante 5 días",
    place: "Expo Santa Fe – CDMX",
    color: "#FF2D55",
    emoji: "⛺",
    desc: "Experiencia de inmersión total en tecnología. Puedes dormir en el evento. Talleres, conferencias y gaming las 24 horas.",
    tags: ["Festival", "Pago", "Jóvenes"],
    url: "https://campus-party.org/mexico",
  },
];

const filters: { id: EventFilter; label: string; emoji: string }[] = [
  { id: "todos", label: "Todos", emoji: "📅" },
  { id: "proximos", label: "Próximos", emoji: "🚀" },
  { id: "talleres", label: "Talleres", emoji: "🛠️" },
  { id: "verano", label: "Verano", emoji: "☀️" },
];

export function Eventos() {
  const [activeFilter, setActiveFilter] = useState<EventFilter>("todos");
  const { theme } = useTheme();

  const filtered = events.filter(
    (e) => activeFilter === "todos" || e.type === activeFilter
  );

  const featured = events.filter((e) => e.featured).slice(0, 2);

  return (
    <div className="bg-white dark:bg-[#0A0F1E] transition-colors duration-300">
      {/* HERO */}
      <section
        className="relative pt-32 pb-20 px-4 overflow-hidden bg-gray-50 dark:bg-[#050A14] transition-colors duration-300"
      >
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-300"
          style={{
            background: theme === "dark"
              ? "radial-gradient(ellipse at 60% 40%, rgba(255,107,53,0.07) 0%, transparent 60%)"
              : "radial-gradient(ellipse at 60% 40%, rgba(255,107,53,0.05) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-5xl mx-auto text-center relative">
          <AnimatedSection>
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-6 bg-orange-50 dark:bg-orange-900/10"
              style={{
                color: "#FF6B35",
                border: "1px solid rgba(255,107,53,0.25)",
              }}
            >
              📅 Eventos y talleres
            </div>
            <h1
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 1.15,
              }}
            >
              Aprende, comparte y{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #FF6B35, #FFE134)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                crea juntos
              </span>
            </h1>
            <p className="text-gray-600 dark:text-white/65 max-w-2xl mx-auto transition-colors duration-300" style={{ fontSize: "1.1rem" }}>
              Talleres, hackathons, webinars y cursos de verano. Eventos para
              todos los niveles y edades.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-12 px-4 bg-white dark:bg-[#0A0F1E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-8">
            <h2
              className="text-gray-900 dark:text-white transition-colors duration-300"
              style={{ fontWeight: 700, fontSize: "1.3rem" }}
            >
              🌟 Destacados
            </h2>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-5">
            {featured.map((ev, i) => (
              <AnimatedSection key={ev.id} delay={i * 80}>
                <div
                  className="relative overflow-hidden rounded-3xl p-7 h-full bg-white dark:bg-transparent shadow-sm dark:shadow-none"
                  style={{
                    background: theme === "dark" ? `linear-gradient(135deg, ${ev.color}15, ${ev.color}05)` : `linear-gradient(135deg, ${ev.color}10, ${ev.color}03)`,
                    border: theme === "dark" ? `1px solid ${ev.color}30` : `1px solid ${ev.color}20`,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 50px ${ev.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "none";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: "2rem" }}>{ev.emoji}</span>
                      <div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{ background: ev.color, color: "#fff" }}
                        >
                          {ev.status}
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-500 dark:text-white/40 text-sm transition-colors duration-300">{ev.date}</span>
                  </div>
                  <h3
                    className="text-gray-900 dark:text-white mb-3 transition-colors duration-300"
                    style={{ fontWeight: 800, fontSize: "1.3rem" }}
                  >
                    {ev.title}
                  </h3>
                  <p className="text-gray-600 dark:text-white/60 mb-5 leading-relaxed transition-colors duration-300">{ev.desc}</p>
                  <div className="flex flex-wrap gap-3 mb-5 text-sm text-gray-500 dark:text-white/50 transition-colors duration-300">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} />
                      {ev.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      {ev.place}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={13} />
                      {ev.capacity}
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/5612668168?text=Quiero%20inscribirme%20al%20evento%3A%20${encodeURIComponent(ev.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold"
                    style={{
                      background: ev.color,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.88";
                      e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <MessageCircle size={16} />
                    Inscribirme ahora
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER + LIST */}
      <section className="py-8 px-4 bg-white dark:bg-[#0A0F1E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div
            className="flex items-center gap-3 mb-8 p-4 rounded-2xl transition-colors duration-300 bg-gray-50 dark:bg-transparent"
            style={{
              background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              border: theme === "dark" ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Filter size={16} className="text-gray-400 dark:text-white/40 transition-colors duration-300" />
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                style={{
                  background:
                    activeFilter === f.id
                      ? "linear-gradient(135deg, #00C9FF, #7C3AED)"
                      : (theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"),
                  color: activeFilter === f.id ? "#fff" : (theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"),
                  transition: "all 0.2s ease",
                }}
              >
                <span>{f.emoji}</span>
                <span>{f.label}</span>
              </button>
            ))}
          </div>

          {/* Events list */}
          <div className="flex flex-col gap-4">
            {filtered.map((ev, i) => (
              <AnimatedSection key={ev.id} delay={i * 60}>
                <div
                  className="p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 bg-white dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300"
                  style={{
                    background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
                    border: theme === "dark" ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = ev.color + "40";
                    (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
                    (e.currentTarget as HTMLElement).style.transform = "none";
                  }}
                >
                  {/* Date badge */}
                  <div
                    className="shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-gray-900 dark:text-white"
                    style={{ background: `${ev.color}15`, border: `1px solid ${ev.color}30` }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>{ev.emoji}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3
                        className="text-gray-900 dark:text-white transition-colors duration-300"
                        style={{ fontWeight: 700, fontSize: "1rem" }}
                      >
                        {ev.title}
                      </h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full shrink-0 font-semibold"
                        style={{
                          background: `${ev.color}15`,
                          color: ev.color,
                        }}
                      >
                        {ev.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-white/40 mb-2 transition-colors duration-300">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {ev.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {ev.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {ev.place}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {ev.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full transition-colors duration-300"
                          style={{
                            background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                            color: theme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={`https://wa.me/5612668168?text=Quiero%20inscribirme%20a%20${encodeURIComponent(ev.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
                    style={{
                      background: ev.color,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    Inscribirme
                    <ArrowRight size={14} />
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* EXTERNAL EVENTS */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-transparent transition-colors duration-300" style={{ marginTop: "2rem" }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <h2
                className="text-gray-900 dark:text-white transition-colors duration-300"
                style={{ fontWeight: 700, fontSize: "1.3rem" }}
              >
                🌍 Eventos externos recomendados
              </h2>
            </div>
            <p className="text-gray-500 dark:text-white/50 text-sm transition-colors duration-300">
              Eventos de la comunidad tech que creemos que te pueden interesar
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {externalEvents.map((ev, i) => (
              <AnimatedSection key={ev.id} delay={i * 70}>
                <div
                  className="relative overflow-hidden rounded-2xl p-5 h-full flex flex-col bg-white dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300"
                  style={{
                    background: theme === "dark" ? "rgba(255,255,255,0.02)" : "#ffffff",
                    border: theme === "dark" ? `1px solid rgba(255,255,255,0.06)` : `1px solid rgba(0,0,0,0.06)`,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = ev.color + "40";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${ev.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
                    (e.currentTarget as HTMLElement).style.transform = "none";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white dark:bg-transparent"
                      style={{
                        background: `${ev.color}10`,
                        border: `1px solid ${ev.color}25`,
                      }}
                    >
                      {ev.emoji}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 dark:text-white/40 text-xs transition-colors duration-300">
                      <ExternalLink size={11} />
                      <span>Externo</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-gray-900 dark:text-white mb-2 transition-colors duration-300"
                    style={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {ev.title}
                  </h3>
                  <p
                    className="text-xs mb-3"
                    style={{ color: ev.color, fontWeight: 600 }}
                  >
                    {ev.organizer}
                  </p>
                  <p className="text-gray-600 dark:text-white/55 text-sm mb-4 leading-relaxed flex-1 transition-colors duration-300">
                    {ev.desc}
                  </p>

                  {/* Meta info */}
                  <div className="flex flex-col gap-2 text-xs text-gray-500 dark:text-white/40 mb-4 transition-colors duration-300">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} />
                      {ev.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={11} />
                      {ev.place}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {ev.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: `${ev.color}12`,
                          color: ev.color,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border bg-white dark:bg-transparent"
                    style={{
                      color: ev.color,
                      borderColor: `${ev.color}30`,
                      background: `${ev.color}05`,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${ev.color}15`;
                      e.currentTarget.style.borderColor = `${ev.color}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${ev.color}05`;
                      e.currentTarget.style.borderColor = `${ev.color}30`;
                    }}
                  >
                    Ver evento
                    <ExternalLink size={13} />
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-4 bg-gray-50 dark:bg-[#050A14] transition-colors duration-300"
        style={{
          borderTop: theme === "dark" ? "1px solid rgba(255,107,53,0.1)" : "1px solid rgba(255,107,53,0.15)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-300"
          style={{
            background: theme === "dark" 
              ? "linear-gradient(135deg, rgba(255,107,53,0.06), rgba(255,225,52,0.06))"
              : "linear-gradient(135deg, rgba(255,107,53,0.03), rgba(255,225,52,0.03))",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 800 }}
            >
              ¿Tienes un grupo o empresa?
            </h2>
            <p className="text-gray-600 dark:text-white/60 mb-8 max-w-xl mx-auto transition-colors duration-300">
              Organizamos talleres y eventos privados para empresas, escuelas e
              instituciones. Cotización personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5612668168?text=Quiero%20organizar%20un%20evento%20privado%20con%20GOKU%20LAB"
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
                Solicitar evento privado
              </a>
              <Link
                to="/contacto"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold border transition-all duration-300 text-gray-900 dark:text-white border-gray-300 dark:border-white/25 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                Contactar
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
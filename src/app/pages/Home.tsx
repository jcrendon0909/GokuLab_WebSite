import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { TechScroll } from "../components/TechScroll";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  BookOpen,
  Zap,
  MessageCircle,
  ChevronRight,
  Target,
  Lightbulb,
  Cpu,
} from "lucide-react";

// Importar imágenes de Figma
import imgKidsHero from "../../imports/03HomepageV3/94c9da7f14245899ba192ebc2e34fd7686ea710b.png";
import imgKidsSection from "../../imports/03HomepageV3/bddc569ae394f99d6e20497e0ca7b59d36c54997.png";
import imgKidsBottom from "../../imports/03HomepageV3/044b589933d402106ef8541547b60fdeff9c753f.png";

const HERO_IMG = imgKidsHero;
const TEEN_IMG = "https://images.unsplash.com/photo-1635959952534-d99f969554a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlciUyMHByb2dyYW1taW5nJTIwbGFwdG9wJTIwdGVjaCUyMGNyZWF0aXZlfGVufDF8fHx8MT75ODU2MjQwfHA&ixlib=rb-4.1.0&q=80&w=1080";
const ADULT_IMG = "https://images.unsplash.com/photo-1724260793422-7754e5d06fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHVsdCUyMHByb2Zlc3Npb25hbCUyMGNvZGluZyUyMGNvbXB1dGVyJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3NTg1NjI0MXww&ixlib=rb-4.1.0&q=80&w=1080";
const CORP_IMG = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0ZWNobm9sb2d5JTIwdHJhaW5pbmclMjB0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NzU4NTYyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080";

function SegmentCards() {
  const { t } = useLanguage();
  const segments = [
    {
      titleKey: "segment.kids.title",
      subtitleKey: "segment.kids.subtitle",
      descKey: "segment.kids.desc",
      color: "#FF6B35",
      bg: "rgba(255,107,53,0.08)",
      border: "rgba(255,107,53,0.25)",
      href: "/cursos/ninos",
      img: imgKidsSection,
      tags: ["Programación", "Robótica", "Diseño", "IA"],
      emoji: "🧒",
    },
    {
      titleKey: "segment.adults.title",
      subtitleKey: "segment.adults.subtitle",
      descKey: "segment.adults.desc",
      color: "#00C9FF",
      bg: "rgba(0,201,255,0.08)",
      border: "rgba(0,201,255,0.25)",
      href: "/cursos/adultos",
      img: ADULT_IMG,
      tags: ["Alfabetización", "Inclusión Digital", "IA Consultoría"],
      emoji: "👨‍💼",
    },
    {
      titleKey: "segment.corporate.title",
      subtitleKey: "segment.corporate.subtitle",
      descKey: "segment.corporate.desc",
      color: "#7C3AED",
      bg: "rgba(124,58,237,0.08)",
      border: "rgba(124,58,237,0.25)",
      href: "/capacitaciones",
      img: CORP_IMG,
      tags: ["Corporativo", "In-company", "Custom"],
      emoji: "🏢",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {segments.map((seg, i) => (
        <AnimatedSection key={seg.titleKey} delay={i * 120}>
          <div
            className="group rounded-3xl overflow-hidden h-full flex flex-col bg-white dark:bg-transparent"
            style={{
              background: seg.bg,
              border: `1px solid ${seg.border}`,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px ${seg.color}25`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "none";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={seg.img}
                alt={t(seg.titleKey)}
                className="w-full h-full object-cover"
                style={{ transition: "transform 0.5s ease" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${seg.color}90, transparent)`,
                }}
              />
              <div className="absolute bottom-4 left-4">
                <span className="text-3xl">{seg.emoji}</span>
              </div>
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold"
                style={{ background: seg.color, color: "#fff" }}
              >
                {t(seg.subtitleKey)}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3
                className="text-gray-900 dark:text-white mb-2 transition-colors duration-300"
                style={{ fontWeight: 700, fontSize: "1.2rem" }}
              >
                {t(seg.titleKey)}
              </h3>
              <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed mb-4 flex-1 transition-colors duration-300">
                {t(seg.descKey)}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {seg.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: `${seg.color}18`,
                      color: seg.color,
                      border: `1px solid ${seg.color}30`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={seg.href}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold"
                style={{
                  background: seg.color,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                {t("common.viewCourses")}
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}

const methodSteps = [
  {
    icon: Target,
    title: "Diagnóstico personalizado",
    desc: "Analizamos tus objetivos y nivel actual para diseñar el camino ideal.",
    color: "#FF6B35",
  },
  {
    icon: Lightbulb,
    title: "Aprendizaje activo",
    desc: "Proyectos reales desde el primer día. La teoría refuerza la práctica, no al revés.",
    color: "#00C9FF",
  },
  {
    icon: Cpu,
    title: "Creación con tecnología",
    desc: "No solo consumes tecnología: la creas. Apps, juegos, robots y más.",
    color: "#7C3AED",
  },
  {
    icon: Award,
    title: "Resultados medibles",
    desc: "Portafolio real, certificados y seguimiento continuo de tu progreso.",
    color: "#10B981",
  },
];

export function Home() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className="bg-white dark:bg-[#0A0F1E] transition-colors duration-300">
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: "80px" }}
      >
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background: theme === "dark" 
              ? "radial-gradient(ellipse at center, rgba(0,201,255,0.08) 0%, rgba(10,15,30,0.98) 70%)"
              : "radial-gradient(ellipse at center, rgba(0,201,255,0.05) 0%, rgba(255,255,255,0.98) 70%)",
          }}
        />

        {/* Floating orbs */}
        <div
          className="absolute top-20 right-10 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,201,255,0.12), transparent 70%)",
            animation: "floatOrb 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-60 h-60 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)",
            animation: "floatOrb 10s ease-in-out infinite reverse",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Background image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('src/assets/hero imagen.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.5,
            }}
          />
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-blue-50 dark:bg-blue-990/10"
            style={{
              border: "1px solid rgba(0,201,255,0.3)",
              animation: "fadeUp 0.6s ease both",
            }}
          >
            <Zap size={14} className="text-[#00C9FF]" />
            <span className="text-[#00C9FF] text-sm font-medium">
              {t("hero.badge")}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-gray-900 dark:text-white mb-6 transition-colors duration-300"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 5rem)",
              fontWeight: 900,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              animation: "fadeUp 0.6s ease 0.1s both",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span style={{ color: "#f8b50e" }}>
              Juega,
            </span>
            <br />
            <span style={{ color: "#d61a1f" }}>
              Aprende y
            </span>
            <br />
            <span style={{ color: "#67a934" }}>
              Emprende
            </span>
          </h1>

          <p
            className="text-gray-600 dark:text-white/70 mb-10 max-w-2xl transition-colors duration-300"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              lineHeight: 1.7,
              animation: "fadeUp 0.6s ease 0.2s both",
            }}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 items-center mb-12"
            style={{ animation: "fadeUp 0.6s ease 0.3s both" }}
          >
            <a
              href="https://wa.me/5612668168?text=Hola,%20quiero%20agendar%20mi%20clase%20muestra%20gratuita"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold"
              style={{
                background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                boxShadow: "0 8px 30px rgba(0,201,255,0.35)",
                transition: "all 0.2s ease",
                fontSize: "1.05rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,201,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,201,255,0.35)";
              }}
            >
              <MessageCircle size={20} />
              {t("hero.cta.whatsapp")}
            </a>
            <Link
              to="/test"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold border transition-all duration-300 text-gray-900 dark:text-white border-gray-300 dark:border-white/25 hover:bg-gray-100 dark:hover:bg-white/10"
              style={{ fontSize: "1.05rem" }}
            >
              {t("hero.cta.test")}
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* TECHNOLOGIES */}
          <div className="mt-20 max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm mb-4 bg-purple-50 dark:bg-purple-900/10"
                style={{
                  color: "#7C3AED",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
              >
                Tecnologías
              </div>
              <h2
                className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
              >
                No solo consumen tecnología,{" "}
                <span style={{ color: "#26aaa3" }}>
                  la crean
                </span>
              </h2>
              <p className="text-gray-600 dark:text-white/60 max-w-xl mx-auto transition-colors duration-300">
                15+ tecnologías reales usadas en la industria, adaptadas a cada
                nivel de aprendizaje.
              </p>
            </AnimatedSection>
            <TechScroll />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ animation: "bounce 2s infinite" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-white/20 flex items-start justify-center p-1">
            <div
              className="w-1.5 h-3 rounded-full bg-[#00C9FF]"
              style={{ animation: "scrollDot 2s infinite" }}
            />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-[#050A14] transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-4 bg-orange-50 dark:bg-orange-900/10"
              style={{
                color: "#FF6B35",
                border: "1px solid rgba(255,107,53,0.25)",
              }}
            >
              El problema real
            </div>
            <h2
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              La brecha digital crece{" "}
              <span style={{ color: "#FF6B35" }}>cada día</span>
            </h2>
            <p className="text-gray-600 dark:text-white/60 max-w-2xl mx-auto transition-colors duration-300" style={{ fontSize: "1.1rem" }}>
              Millones de personas consumen tecnología sin entenderla, sin poder
              crearla, sin poder beneficiarse de ella profesionalmente.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stat: "72%",
                desc: "de los empleos del futuro requerirán habilidades digitales avanzadas",
                color: "#FF6B35",
              },
              {
                stat: "1 de 5",
                desc: "jóvenes tiene acceso real a educación tecnológica de calidad en LATAM",
                color: "#00C9FF",
              },
              {
                stat: "60%",
                desc: "de las empresas reportan falta de talento digital en sus equipos",
                color: "#7C3AED",
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div
                  className="p-8 rounded-3xl h-full transition-colors duration-300"
                  style={{
                    background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                    border: theme === "dark" ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    className="mb-3"
                    style={{
                      fontSize: "3rem",
                      fontWeight: 900,
                      color: item.color,
                    }}
                  >
                    {item.stat}
                  </div>
                  <p className="text-gray-600 dark:text-white/60 leading-relaxed transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-24 px-4 bg-white dark:bg-[#0A0F1E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-4 bg-blue-50 dark:bg-blue-900/10"
              style={{
                color: "#00C9FF",
                border: "1px solid rgba(0,201,255,0.25)",
              }}
            >
              Nuestra solución
            </div>
            <h2
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              Tecnología que se{" "}
              <span style={{ color: "#26aaa3" }}>
                crea, no solo se consume
              </span>
            </h2>
            <p className="text-gray-600 dark:text-white/60 max-w-2xl mx-auto transition-colors duration-300" style={{ fontSize: "1.1rem" }}>
              En GŌKU LAB transformamos la manera en que aprenden las niñas, niños,
              adolescentes, adultos y empresas con metodología práctica y
              proyectos reales.
            </p>
          </AnimatedSection>

          {/* Segment Cards */}
          <SegmentCards />
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-[#0A0F1E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-4 bg-emerald-50 dark:bg-emerald-900/10"
              style={{
                color: "#10B981",
                border: "1px solid rgba(16,185,129,0.25)",
              }}
            >
              Metodología
            </div>
            <h2
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              Nuestro método{" "}
              <span style={{ color: "#10B981" }}>funciona</span>
            </h2>
            <p className="text-gray-600 dark:text-white/60 max-w-2xl mx-auto transition-colors duration-300" style={{ fontSize: "1.1rem" }}>
              Un proceso claro desde el diagnóstico hasta los resultados medibles.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodSteps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 100}>
                <div
                  className="p-6 rounded-3xl h-full transition-all duration-300"
                  style={{
                    background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                    border: theme === "dark" ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.borderColor = step.color + "50";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "none";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)";
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-white dark:bg-transparent"
                    style={{ background: `${step.color}18` }}
                  >
                    <step.icon size={22} style={{ color: step.color }} />
                  </div>
                  <div
                    className="text-xs mb-3 font-bold"
                    style={{ color: step.color }}
                  >
                    PASO {i + 1}
                  </div>
                  <h3
                    className="text-gray-900 dark:text-white mb-2 transition-colors duration-300"
                    style={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-white/55 text-sm leading-relaxed transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10" delay={400}>
            <Link
              to="/metodologia"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all duration-300 text-gray-900 dark:text-white border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/5"
            >
              Conocer la metodología completa
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="py-24 px-4 bg-white dark:bg-[#0A0F1E] transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold mb-6"
              style={{ background: "#10B981", color: "#fff" }}
            >
              <span className="w-2 h-2 bg-white rounded-sm" />
              Próximos eventos
            </div>
          </AnimatedSection>

          <div className="space-y-0">
            {[
              {
                day: "Mar",
                dayNum: "15",
                month: "Abril, 2026",
                title: "Taller de Scratch para niños",
                time: "10:00AM",
                location: "Sede CDMX",
                type: "Taller",
                color: "#FF6B35",
                description: "Aprende a crear tu primer videojuego animado con Scratch. Ideal para niños de 6 a 12 años.",
                ctaText: "Reservar mi lugar",
              },
              {
                day: "Jue",
                dayNum: "17",
                month: "Abril, 2026",
                title: "Hackathon de IA",
                time: "9:00AM",
                location: "Online",
                type: "Evento",
                color: "#00C9FF",
                description: "24 horas de programación intensiva. Crea soluciones innovadoras con inteligencia artificial.",
                ctaText: "Inscribirme ahora",
              },
              {
                day: "Sáb",
                dayNum: "22",
                month: "Abril, 2026",
                title: "Demostración de Robótica",
                time: "11:00AM",
                location: "Sede Lomas Verdes",
                type: "Demo",
                color: "#7C3AED",
                description: "Descubre cómo programar robots reales. Demostración en vivo con LEGO y Micro:bit.",
                ctaText: "Asistir gratis",
              },
            ].map((ev, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div
                  className="flex gap-6 py-6 transition-all duration-300"
                  style={{
                    borderBottom: i < 2 ? (theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)") : "none",
                  }}
                >
                  <div className="flex-shrink-0 w-28">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{
                          background: ev.color,
                          boxShadow: `0 0 8px ${ev.color}`,
                          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                        }}
                      />
                      <div
                        className="inline-block px-2 py-1 rounded-md text-xs font-bold"
                        style={{ background: ev.color, color: "#fff" }}
                      >
                        {ev.day}
                      </div>
                    </div>
                    <div
                      className="text-gray-900 dark:text-white transition-colors duration-300"
                      style={{
                        fontSize: "3.5rem",
                        fontWeight: 900,
                        lineHeight: 1,
                        letterSpacing: "-0.03em"
                      }}
                    >
                      {ev.dayNum}
                    </div>
                    <div className="text-gray-500 dark:text-white/50 text-xs mt-1 transition-colors duration-300">
                      {ev.month}
                    </div>
                  </div>

                  <div
                    className="w-px flex-shrink-0 transition-colors duration-300"
                    style={{
                      background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                    }}
                  />

                  <div className="flex-1 pt-1">
                    <h3
                      className="text-gray-900 dark:text-white mb-3 transition-colors duration-300"
                      style={{ fontWeight: 700, fontSize: "1.1rem" }}
                    >
                      {ev.title}
                    </h3>
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-white/60 text-sm transition-colors duration-300">
                        <span className="w-1 h-1 rounded-full bg-current" />
                        {ev.type}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-white/60 text-sm transition-colors duration-300">
                        <span className="w-1 h-1 rounded-full bg-current" />
                        {ev.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-white/60 text-sm transition-colors duration-300">
                        <span className="w-1 h-1 rounded-full bg-current" />
                        {ev.time}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-white/70 text-sm mb-4 leading-relaxed transition-colors duration-300">
                      {ev.description}
                    </p>
                    <a
                      href={`https://wa.me/5612668168?text=Hola,%20quiero%20información%20sobre%20${encodeURIComponent(ev.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                      style={{ background: ev.color, color: "#fff" }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                    >
                      {ev.ctaText}
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10" delay={400}>
            <Link
              to="/eventos"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border transition-all duration-300"
              style={{
                background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                color: theme === "dark" ? "#fff" : "#111827",
                border: theme === "dark" ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)",
              }}
            >
              Ver todos los eventos
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* GALLERY SECTION — ✅ Seccion Mosaico/Grid Asimetrico Moderno */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-[#050A14] transition-colors duration-300 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-4 bg-purple-50 dark:bg-purple-900/10"
              style={{
                color: "#7C3AED",
                border: "1px solid rgba(124,58,237,0.25)",
              }}
            >
              Galería
            </div>
            <h2
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              Nuestra comunidad en <span style={{ color: "#7C3AED" }}>acción</span>
            </h2>
            <p className="text-gray-600 dark:text-white/60 max-w-xl mx-auto transition-colors duration-300">
              Explora momentos de nuestros talleres, clases presenciales y proyectos creados por nuestros alumnos.
            </p>
          </AnimatedSection>

          {/* Grid de mosaico moderno con alturas controladas por spans de Tailwind */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=crop&w=600&h=450", span: "md:col-span-2 md:row-span-2" },
              { url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=crop&w=600&h=600", span: "" },
              { url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?crop=entropy&cs=tinysrgb&fit=crop&w=600&h=600", span: "" },
              { url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?crop=entropy&cs=tinysrgb&fit=crop&w=600&h=450", span: "" },
              { url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=crop&w=600&h=450", span: "md:col-span-2" }
            ].map((img, index) => (
              <AnimatedSection key={index} className={img.span} delay={index * 80}>
                <div className="relative rounded-3xl overflow-hidden h-full min-h-[240px] group shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5">
                  <img
                    src={img.url}
                    alt={`Galería GOKU LAB ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-purple-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 px-4 relative overflow-hidden bg-gray-50 dark:bg-[#050A14] transition-colors duration-300">
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-300"
          style={{
            background: theme === "dark" 
              ? "radial-gradient(ellipse at center, rgba(0,201,255,0.07) 0%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(0,201,255,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <AnimatedSection>
            <h2
              className="text-gray-900 dark:text-white mb-6 transition-colors duration-300"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }}
            >
              Tu <span style={{ color: "#26aaa3" }}>superfuturo</span> empieza hoy
            </h2>
            <p
              className="text-gray-600 dark:text-white/60 mb-10 max-w-2xl mx-auto transition-colors duration-300"
              style={{ fontSize: "1.15rem" }}
            >
              Agenda tu diagnóstico gratuito y descubre cómo GŌKU LAB puede
              transformar tu futuro (o el de tus hijos). Sin compromiso. Sin costo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5612668168?text=Quiero%20agendar%20mi%20clase%20muestra%20gratuita"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-white font-bold"
                style={{
                  background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                  boxShadow: "0 8px 40px rgba(0,201,255,0.4)",
                  fontSize: "1.1rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 12px 50px rgba(0,201,255,0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,201,255,0.4)";
                }}
              >
                <MessageCircle size={22} />
                Agendar diagnóstico gratuito
              </a>
              <Link
                to="/contacto"
                className="flex items-center justify-center gap-2 px-10 py-5 rounded-2xl font-semibold border transition-all duration-300 text-gray-900 dark:text-white border-gray-300 dark:border-white/25 hover:bg-gray-200 dark:hover:bg-white/10"
                style={{ fontSize: "1.1rem" }}
              >
                Hablar con el equipo
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes scrollDot {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(6px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }

        /* Video background smooth transitions */
        video {
          transition: opacity 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
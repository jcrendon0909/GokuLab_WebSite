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
const TEEN_IMG = "https://images.unsplash.com/photo-1635959952534-d99f969554a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlciUyMHByb2dyYW1taW5nJTIwbGFwdG9wJTIwdGVjaCUyMGNyZWF0aXZlfGVufDF8fHx8MTc3NTg1NjI0MHww&ixlib=rb-4.1.0&q=80&w=1080";
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
      tags: ["Python", "Web Dev", "IA Aplicada"],
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
            className="group rounded-3xl overflow-hidden h-full flex flex-col"
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
                className="text-white dark:text-white light:text-gray-900 mb-2"
                style={{ fontWeight: 700, fontSize: "1.2rem" }}
              >
                {t(seg.titleKey)}
              </h3>
              <p className="text-white/60 dark:text-white/60 light:text-gray-600 text-sm leading-relaxed mb-4 flex-1">
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

const testimonials = [
  {
    name: "Ana García",
    age: "28 años",
    bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    bgImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    name: "Roberto Mendoza",
    age: "32 años",
    bgGradient: "linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.5))",
    bgImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    name: "María Torres",
    age: "25 años",
    bgGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    bgImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  {
    name: "Carlos Ramírez",
    age: "35 años",
    bgGradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    bgImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  },
];

function HoverTypewriter({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      setCurrentIndex(0);
      setDisplayedText("");
    }
  };

  const resetTyping = () => {
    setIsTyping(false);
    setCurrentIndex(0);
    setDisplayedText(text);
  };

  useEffect(() => {
    if (!isTyping) {
      setDisplayedText(text);
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 80);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isTyping]);

  return (
    <span onMouseEnter={startTyping} onMouseLeave={resetTyping}>
      {displayedText}
      {isTyping && currentIndex < text.length && (
        <span
          className="inline-block w-0.5 h-[0.9em] ml-1 animate-blink"
          style={{
            background: "#fff",
            verticalAlign: "middle",
          }}
        />
      )}
    </span>
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
  const [videoError, setVideoError] = useState(false);

  return (
    <div style={{ background: "#000000" }}>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: "80px", background: "#000000" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,201,255,0.08) 0%, rgba(0,0,0,0.98) 70%)",
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
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "rgba(0,201,255,0.1)",
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
            className="text-white dark:text-white light:text-gray-900 mb-6"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 5rem)",
              fontWeight: 900,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              animation: "fadeUp 0.6s ease 0.1s both",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span
              style={{
                background: "linear-gradient(90deg, #00C9FF, #7C3AED, #FF6B35)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Crea,
            </span>
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #00C9FF, #7C3AED, #FF6B35)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Aprende y
            </span>
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #00C9FF, #7C3AED, #FF6B35)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Emprende
            </span>
          </h1>

          <p
            className="text-white/70 dark:text-white/70 light:text-gray-600 mb-10 max-w-2xl"
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
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-white dark:text-white light:text-gray-900 font-semibold border border-white/25 dark:border-white/25 light:border-gray-300 hover:border-white/50 hover:bg-white/8 dark:hover:bg-white/8 light:hover:bg-gray-100"
              style={{ transition: "all 0.2s ease", fontSize: "1.05rem" }}
            >
              {t("hero.cta.test")}
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* TECHNOLOGIES */}
          <div className="mt-20 max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm mb-4"
                style={{
                  background: "rgba(124,58,237,0.1)",
                  color: "#7C3AED",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
              >
                Tecnologías
              </div>
              <h2
                className="text-white dark:text-white light:text-gray-900 mb-4 transition-colors duration-300"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
              >
                No solo consumen tecnología,{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  la crean
                </span>
              </h2>
              <p className="text-white/60 dark:text-white/60 light:text-gray-600 max-w-xl mx-auto transition-colors duration-300">
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
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <div
              className="w-1.5 h-3 rounded-full bg-[#00C9FF]"
              style={{ animation: "scrollDot 2s infinite" }}
            />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 px-4 dark:bg-[#050A14] light:bg-gray-50 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-4"
              style={{
                background: "rgba(255,107,53,0.1)",
                color: "#FF6B35",
                border: "1px solid rgba(255,107,53,0.25)",
              }}
            >
              El problema real
            </div>
            <h2
              className="text-white dark:text-white light:text-gray-900 mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              La brecha digital crece{" "}
              <span style={{ color: "#FF6B35" }}>cada día</span>
            </h2>
            <p className="text-white/60 dark:text-white/60 light:text-gray-600 max-w-2xl mx-auto" style={{ fontSize: "1.1rem" }}>
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
                  <p className="text-white/60 dark:text-white/60 light:text-gray-600 leading-relaxed transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-24 px-4 dark:bg-[#0A0F1E] light:bg-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-4"
              style={{
                background: "rgba(0,201,255,0.1)",
                color: "#00C9FF",
                border: "1px solid rgba(0,201,255,0.25)",
              }}
            >
              Nuestra solución
            </div>
            <h2
              className="text-white dark:text-white light:text-gray-900 mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              Tecnología que se{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                crea, no solo se consume
              </span>
            </h2>
            <p className="text-white/60 dark:text-white/60 light:text-gray-600 max-w-2xl mx-auto transition-colors duration-300" style={{ fontSize: "1.1rem" }}>
              En GOKU LAB transformamos la manera en que aprenden los niños,
              adolescentes, adultos y empresas con metodología práctica y
              proyectos reales.
            </p>
          </AnimatedSection>

          {/* Segment Cards */}
          <SegmentCards />
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="py-24 px-4 dark:bg-[#0A0F1E] light:bg-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-4"
              style={{
                background: "rgba(16,185,129,0.1)",
                color: "#10B981",
                border: "1px solid rgba(16,185,129,0.25)",
              }}
            >
              Metodología
            </div>
            <h2
              className="text-white dark:text-white light:text-gray-900 mb-4 transition-colors duration-300"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              Nuestro método{" "}
              <span style={{ color: "#10B981" }}>funciona</span>
            </h2>
            <p className="text-white/60 dark:text-white/60 light:text-gray-600 max-w-2xl mx-auto transition-colors duration-300" style={{ fontSize: "1.1rem" }}>
              Un proceso claro desde el diagnóstico hasta los resultados
              medibles.
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
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
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
                    className="text-white dark:text-white light:text-gray-900 mb-2 transition-colors duration-300"
                    style={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-white/55 dark:text-white/55 light:text-gray-600 text-sm leading-relaxed transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10" delay={400}>
            <Link
              to="/metodologia"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all duration-300
                text-white dark:text-white light:text-gray-900
                border-white/20 dark:border-white/20 light:border-gray-300
                hover:border-white/40 dark:hover:border-white/40 light:hover:border-gray-500
                hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-gray-100"
              style={{ transition: "all 0.2s ease" }}
            >
              Conocer la metodología completa
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="py-24 px-4 dark:bg-[#0A0F1E] light:bg-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold mb-6"
              style={{
                background: "#10B981",
                color: "#fff",
              }}
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
              {
                day: "Lun",
                dayNum: "02",
                month: "Junio, 2026",
                title: "Inicio Curso de Verano",
                time: "9:00AM",
                location: "Ambas sedes",
                type: "Verano",
                color: "#FFE134",
                description: "4 semanas intensivas de programación, robótica y diseño para niños y adolescentes.",
                ctaText: "Ver programa",
              },
              {
                day: "Mié",
                dayNum: "04",
                month: "Junio, 2026",
                title: "Webinar Gratuito: IA para Todos",
                time: "7:00PM",
                location: "Online",
                type: "Webinar",
                color: "#10B981",
                description: "Introducción práctica a ChatGPT y herramientas de IA. Abierto para todos los niveles.",
                ctaText: "Registrarme gratis",
              },
            ].map((ev, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div
                  className="flex gap-6 py-6 transition-all duration-300"
                  style={{
                    borderBottom: i < 4 ? (theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)") : "none",
                  }}
                >
                  {/* Date Section */}
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
                        style={{
                          background: ev.color,
                          color: "#fff",
                        }}
                      >
                        {ev.day}
                      </div>
                    </div>
                    <div
                      className="text-white dark:text-white light:text-gray-900"
                      style={{
                        fontSize: "3.5rem",
                        fontWeight: 900,
                        lineHeight: 1,
                        letterSpacing: "-0.03em"
                      }}
                    >
                      {ev.dayNum}
                    </div>
                    <div className="text-white/50 dark:text-white/50 light:text-gray-600 text-xs mt-1">
                      {ev.month}
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="w-px flex-shrink-0"
                    style={{
                      background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                    }}
                  />

                  {/* Content Section */}
                  <div className="flex-1 pt-1">
                    <h3
                      className="text-white dark:text-white light:text-gray-900 mb-3"
                      style={{ fontWeight: 700, fontSize: "1.1rem" }}
                    >
                      {ev.title}
                    </h3>
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-2 text-white/60 dark:text-white/60 light:text-gray-600 text-sm">
                        <span className="w-1 h-1 rounded-full bg-current" />
                        {ev.type}
                      </div>
                      <div className="flex items-center gap-2 text-white/60 dark:text-white/60 light:text-gray-600 text-sm">
                        <span className="w-1 h-1 rounded-full bg-current" />
                        {ev.location}
                      </div>
                      <div className="flex items-center gap-2 text-white/60 dark:text-white/60 light:text-gray-600 text-sm">
                        <span className="w-1 h-1 rounded-full bg-current" />
                        {ev.time}
                      </div>
                    </div>
                    <p className="text-white/70 dark:text-white/70 light:text-gray-600 text-sm mb-4 leading-relaxed">
                      {ev.description}
                    </p>
                    <a
                      href={`https://wa.me/5612668168?text=Hola,%20quiero%20información%20sobre%20${encodeURIComponent(ev.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                      style={{
                        background: ev.color,
                        color: "#fff",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.9";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              style={{
                background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                color: theme === "dark" ? "#fff" : "#000",
                border: theme === "dark" ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)",
              }}
            >
              Ver todos los eventos
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="py-28 px-4 relative overflow-hidden dark:bg-[#050A14] light:bg-gray-50 transition-colors duration-300"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,201,255,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <AnimatedSection>
            <h2
              className="text-white dark:text-white light:text-gray-900 mb-6 transition-colors duration-300"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }}
            >
              Tu{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                superfuturo
              </span>{" "}
              empieza hoy
            </h2>
            <p
              className="text-white/60 dark:text-white/60 light:text-gray-600 mb-10 max-w-2xl mx-auto transition-colors duration-300"
              style={{ fontSize: "1.15rem" }}
            >
              Agenda tu diagnóstico gratuito y descubre cómo GOKU LAB puede
              transformar tu futuro (o el de tus hijos). Sin compromiso. Sin
              costo.
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
                  e.currentTarget.style.boxShadow =
                    "0 12px 50px rgba(0,201,255,0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 40px rgba(0,201,255,0.4)";
                }}
              >
                <MessageCircle size={22} />
                Agendar diagnóstico gratuito
              </a>
              <Link
                to="/contacto"
                className="flex items-center justify-center gap-2 px-10 py-5 rounded-2xl font-semibold border transition-all duration-300
                  text-white dark:text-white light:text-gray-900
                  border-white/25 dark:border-white/25 light:border-gray-300"
                style={{ transition: "all 0.2s ease", fontSize: "1.1rem" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "";
                }}
              >
                Hablar con el equipo
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white/40">
              {[
                "✅ Sin compromiso",
                "✅ 100% gratuito",
                "✅ Respuesta en minutos",
                "✅ Atención personalizada",
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
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
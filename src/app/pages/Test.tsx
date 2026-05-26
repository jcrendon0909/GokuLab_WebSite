import { useState } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { useTheme } from "next-themes";
import { ArrowRight, RotateCcw, MessageCircle, CheckCircle } from "lucide-react";

type Answer = {
  step0?: string;
  step1?: string;
  step2?: string;
  step3?: string;
};

const questions = [
  {
    id: "step0",
    title: "¿Para quién es este curso?",
    subtitle: "Cuéntanos sobre ti para orientarte mejor.",
    emoji: "👤",
    options: [
      { id: "kids", label: "Para mis hijos", emoji: "🧒", color: "#FF6B35" },
      { id: "teen", label: "Para mí (soy joven, 13-17)", emoji: "🎮", color: "#FFE134" },
      { id: "adult", label: "Para mí (soy adulto, 18+)", emoji: "👨‍💼", color: "#00C9FF" },
      { id: "company", label: "Para mi empresa/equipo", emoji: "🏢", color: "#7C3AED" },
    ],
  },
  {
    id: "step1",
    title: "¿Cuál es el nivel de experiencia?",
    subtitle: "Esto nos ayuda a recomendar el nivel adecuado.",
    emoji: "📊",
    options: [
      { id: "zero", label: "Cero experiencia", emoji: "🌱", color: "#4CAF50" },
      { id: "basic", label: "Sé algunas cosas básicas", emoji: "📚", color: "#00C9FF" },
      { id: "inter", label: "Tengo nivel intermedio", emoji: "💪", color: "#7C3AED" },
      { id: "adv", label: "Quiero especializarme", emoji: "🚀", color: "#FF6B35" },
    ],
  },
  {
    id: "step2",
    title: "¿Qué área te interesa más?",
    subtitle: "Puedes elegir la que más te emocione.",
    emoji: "✨",
    options: [
      { id: "prog", label: "Programación / Apps", emoji: "💻", color: "#00C9FF" },
      { id: "robot", label: "Robótica / Hardware", emoji: "🤖", color: "#FF6B35" },
      { id: "design", label: "Diseño / Creatividad", emoji: "🎨", color: "#9C27B0" },
      { id: "ai", label: "Inteligencia Artificial", emoji: "🧠", color: "#10B981" },
    ],
  },
  {
    id: "step3",
    title: "¿Cuál es tu objetivo principal?",
    subtitle: "Esto nos ayuda a darte la mejor orientación.",
    emoji: "🎯",
    options: [
      { id: "fun", label: "Aprender y divertirme", emoji: "🎉", color: "#FFE134" },
      { id: "job", label: "Conseguir trabajo o freelance", emoji: "💼", color: "#00C9FF" },
      { id: "biz", label: "Mejorar mi empresa", emoji: "📈", color: "#7C3AED" },
      { id: "study", label: "Prepararme para la universidad", emoji: "🎓", color: "#10B981" },
    ],
  },
];

type CourseResult = {
  title: string;
  desc: string;
  color: string;
  emoji: string;
  href: string;
  hrefLabel: string;
};

function getResult(answers: Answer): CourseResult {
  const { step0, step2, step3 } = answers;

  if (step0 === "company") {
    return {
      title: "Capacitación Empresarial Personalizada",
      desc: "Diseñamos un programa 100% a la medida de tu equipo. Diagnóstico previo, contenido relevante y métricas de impacto.",
      color: "#7C3AED",
      emoji: "🏢",
      href: "/capacitaciones",
      hrefLabel: "Ver capacitaciones",
    };
  }
  if (step0 === "kids") {
    if (step2 === "robot") {
      return {
        title: "Robótica con Micro:bit",
        desc: "Tu hijo aprenderá a construir y programar robots reales. ¡La aventura más emocionante de la tecnología!",
        color: "#1E88E5",
        emoji: "🤖",
        href: "/cursos/ninos/robotica-basica",
        hrefLabel: "Ver curso",
      };
    }
    return {
      title: "Scratch para Principiantes",
      desc: "El primer paso perfecto para tu hijo. Crea animaciones, historias y videojuegos de manera divertida.",
      color: "#FF6B35",
      emoji: "🐱",
      href: "/cursos/ninos/scratch-basico",
      hrefLabel: "Ver curso",
    };
  }
  if (step2 === "ai") {
    return {
      title: "IA Aplicada con ChatGPT",
      desc: "Aprende a usar las herramientas de IA más importantes del mercado para potenciar tu trabajo y carrera.",
      color: "#10B981",
      emoji: "🧠",
      href: "/cursos/adultos/ia-aplicada",
      hrefLabel: "Ver curso",
    };
  }
  if (step2 === "prog" && (step3 === "job" || step3 === "study")) {
    return {
      title: "Python para Principiantes",
      desc: "El lenguaje más demandado del mercado. Aprende desde cero hasta crear proyectos reales.",
      color: "#00C9FF",
      emoji: "🐍",
      href: "/cursos/adultos/python-basico",
      hrefLabel: "Ver curso",
    };
  }
  if (step2 === "prog") {
    return {
      title: "Desarrollo Web: HTML, CSS y JS",
      desc: "Crea sitios web modernos desde cero. El camino más directo hacia una carrera digital.",
      color: "#7C3AED",
      emoji: "🌐",
      href: "/cursos/adultos/web-html-css",
      hrefLabel: "Ver curso",
    };
  }
  return {
    title: "Diagnóstico personalizado gratuito",
    desc: "Habla directamente con nuestro equipo para que diseñemos el camino perfecto para ti.",
    color: "#00C9FF",
    emoji: "🎯",
    href: "/contacto",
    hrefLabel: "Contactar con el equipo",
  };
}

export function TestPage() {
  const [step, setStep] = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState<Answer>({});
  const [done, setDone] = useState(false);
  const { theme } = useTheme();

  const currentQ = questions[step];
  const progress = step < 0 ? 0 : ((step + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    const key = currentQ.id as keyof Answer;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setDone(true);
      }
    }, 300);
  };

  const reset = () => {
    setStep(-1);
    setAnswers({});
    setDone(false);
  };

  const result = done ? getResult(answers) : null;

  return (
    <div className="bg-gray-50 dark:bg-[#0A0F1E] min-h-screen transition-colors duration-300">
      {/* HERO */}
      <section
        className="pt-32 pb-16 px-4 relative overflow-hidden bg-white dark:bg-[#050A14] transition-colors duration-300"
      >
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-300"
          style={{
            background: theme === "dark" 
              ? "radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(124,58,237,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-6 bg-purple-50 dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300"
              style={{
                background: theme === "dark" ? "rgba(124,58,237,0.1)" : "rgba(124,58,237,0.08)",
                color: "#7C3AED",
                border: "1px solid rgba(124,58,237,0.25)",
              }}
            >
              🎯 Diagnóstico de orientación
            </div>
            <h1
              className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 1.15,
              }}
            >
              Encuentra tu curso{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                perfecto
              </span>
            </h1>
            <p className="text-gray-600 dark:text-white/65 max-w-xl mx-auto transition-colors duration-300" style={{ fontSize: "1.1rem" }}>
              4 preguntas. 2 minutos. Una recomendación personalizada para ti.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* TEST CARD */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          {step >= 0 && !done && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 dark:text-white/40 text-sm transition-colors duration-300">
                  Pregunta {step + 1} de {questions.length}
                </span>
                <span className="text-gray-500 dark:text-white/40 text-sm transition-colors duration-300">
                  {Math.round(progress)}%
                </span>
              </div>
              <div
                className="w-full h-2 rounded-full overflow-hidden transition-colors duration-300"
                style={{ background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
          )}

          {/* INTRO */}
          {step === -1 && !done && (
            <div
              className="p-8 rounded-3xl text-center bg-white dark:bg-transparent shadow-md dark:shadow-none transition-colors duration-300"
              style={{
                background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
                border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{ fontSize: "4rem" }}
                className="mb-6 drop-shadow-sm"
              >
                🎮
              </div>
              <h2
                className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
                style={{ fontWeight: 800, fontSize: "1.5rem" }}
              >
                ¿Estás listo?
              </h2>
              <p className="text-gray-600 dark:text-white/60 mb-8 leading-relaxed transition-colors duration-300">
                Responde 4 preguntas rápidas y te diremos exactamente qué curso
                de GŌKU LAB es el indicado para ti o para tu familia.
              </p>
              <div className="flex flex-col gap-3 text-sm text-gray-500 dark:text-white/50 mb-8 transition-colors duration-300">
                {["✅ Solo 4 preguntas", "✅ Resultado inmediato", "✅ 100% personalizado"].map(
                  (i) => (
                    <span key={i}>{i}</span>
                  )
                )}
              </div>
              <button
                onClick={() => setStep(0)}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-bold"
                style={{
                  background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                  boxShadow: "0 6px 25px rgba(0,201,255,0.3)",
                  transition: "all 0.2s ease",
                  fontSize: "1.05rem",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                Comenzar el diagnóstico
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* QUESTION */}
          {step >= 0 && !done && currentQ && (
            <div
              className="p-8 rounded-3xl bg-white dark:bg-transparent shadow-md dark:shadow-none transition-colors duration-300"
              style={{
                background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
                border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                animation: "slideIn 0.35s ease",
              }}
            >
              <div className="text-4xl mb-5 drop-shadow-sm">{currentQ.emoji}</div>
              <h2
                className="text-gray-900 dark:text-white mb-2 transition-colors duration-300"
                style={{ fontWeight: 800, fontSize: "1.5rem" }}
              >
                {currentQ.title}
              </h2>
              <p className="text-gray-500 dark:text-white/55 mb-8 transition-colors duration-300">{currentQ.subtitle}</p>

              <div className="grid grid-cols-2 gap-3">
                {currentQ.options.map((opt) => {
                  const key = currentQ.id as keyof Answer;
                  const selected = answers[key] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswer(opt.id)}
                      className="p-5 rounded-2xl text-left flex flex-col gap-2 bg-gray-50 dark:bg-transparent shadow-sm dark:shadow-none"
                      style={{
                        background: selected
                          ? `${opt.color}15`
                          : (theme === "dark" ? "rgba(255,255,255,0.04)" : "#f9fafb"),
                        border: `2px solid ${selected ? opt.color : (theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)")}`,
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!selected) {
                          (e.currentTarget as HTMLElement).style.borderColor = opt.color + "60";
                          (e.currentTarget as HTMLElement).style.background = theme === "dark" ? `${opt.color}10` : `${opt.color}08`;
                          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!selected) {
                          (e.currentTarget as HTMLElement).style.borderColor = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
                          (e.currentTarget as HTMLElement).style.background = theme === "dark" ? "rgba(255,255,255,0.04)" : "#f9fafb";
                          (e.currentTarget as HTMLElement).style.transform = "none";
                        }
                      }}
                    >
                      <span style={{ fontSize: "1.75rem" }} className="drop-shadow-sm">{opt.emoji}</span>
                      <span
                        className="text-sm leading-snug transition-colors duration-300"
                        style={{ 
                          color: selected ? opt.color : (theme === "dark" ? "rgba(255,255,255,0.7)" : "#4b5563"), 
                          fontWeight: selected ? 700 : 500 
                        }}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Back */}
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-5 text-sm text-gray-400 dark:text-white/30 hover:text-gray-700 dark:hover:text-white/60 transition-colors duration-300"
                >
                  ← Volver
                </button>
              )}
            </div>
          )}

          {/* RESULT */}
          {done && result && (
            <div
              className="rounded-3xl overflow-hidden bg-white dark:bg-transparent shadow-lg dark:shadow-none transition-colors duration-300"
              style={{
                background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
                border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                animation: "slideIn 0.35s ease",
              }}
            >
              {/* Header */}
              <div
                className="p-8 text-center transition-colors duration-300"
                style={{
                  background: theme === "dark" 
                    ? `linear-gradient(135deg, ${result.color}15, ${result.color}05)`
                    : `linear-gradient(135deg, ${result.color}10, transparent)`,
                  borderBottom: theme === "dark" ? `1px solid ${result.color}20` : `1px solid ${result.color}15`,
                }}
              >
                <div style={{ fontSize: "4rem" }} className="mb-4 drop-shadow-md">
                  {result.emoji}
                </div>
                <div
                  className="inline-block px-4 py-1 rounded-full text-sm mb-4 font-semibold shadow-sm"
                  style={{ background: result.color, color: "#fff" }}
                >
                  Tu recomendación
                </div>
                <h2
                  className="text-gray-900 dark:text-white mb-3 transition-colors duration-300"
                  style={{ fontWeight: 800, fontSize: "1.5rem" }}
                >
                  {result.title}
                </h2>
                <p className="text-gray-600 dark:text-white/65 leading-relaxed transition-colors duration-300">{result.desc}</p>
              </div>

              {/* Actions */}
              <div className="p-8">
                <div className="flex flex-col gap-4 mb-8">
                  <a
                    href={`https://wa.me/5612668168?text=Hice%20el%20test%20y%20me%20recomendaron%3A%20${encodeURIComponent(result.title)}%2C%20quiero%20agendar%20mi%20clase%20muestra`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-bold"
                    style={{
                      background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                      boxShadow: "0 6px 25px rgba(0,201,255,0.3)",
                      transition: "all 0.2s ease",
                      fontSize: "1.05rem",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    <MessageCircle size={20} />
                    Agendar masterclass gratuita
                  </a>
                  <Link
                    to={result.href}
                    className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold border transition-all duration-300 text-gray-900 dark:text-white border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/5"
                  >
                    {result.hrefLabel}
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl transition-colors duration-300 bg-gray-50 dark:bg-transparent" style={{ background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#f9fafb" }}>
                  <CheckCircle size={18} className="text-[#10B981] shrink-0" />
                  <p className="text-gray-600 dark:text-white/55 text-sm transition-colors duration-300">
                    Alguien del equipo GŌKU LAB revisará tus respuestas y te dará orientación personalizada.
                  </p>
                </div>

                <button
                  onClick={reset}
                  className="mt-5 flex items-center gap-2 text-sm text-gray-400 dark:text-white/30 hover:text-gray-700 dark:hover:text-white/60 mx-auto transition-colors duration-300"
                >
                  <RotateCcw size={14} />
                  Repetir el diagnóstico
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
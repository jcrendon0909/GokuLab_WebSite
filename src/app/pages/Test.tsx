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

// Convertimos las preguntas en una función dinámica que recibe las respuestas actuales
const getQuestions = (answers: Answer) => {
  // Configuración dinámica del Paso 3 según quién sea el usuario
  let step3Title = "¿Cuál es tu objetivo principal?";
  let step3Subtitle = "Esto nos ayuda a darte la mejor orientación.";
  let step3Options = [
    { id: "fun", label: "Aprender algo nuevo por gusto", emoji: "🎉", color: "#FFE134" },
    { id: "job", label: "Impulso profesional / Emprender", emoji: "💼", color: "#00C9FF" },
    { id: "school", label: "Mejorar en la escuela / Idiomas", emoji: "📚", color: "#10B981" },
    { id: "study", label: "Prepararme para la universidad", emoji: "🎓", color: "#7C3AED" },
  ];

  if (answers.step0 === "kids") {
    step3Title = "¿Qué buscas para tu hijo/a?";
    step3Subtitle = "Selecciona la meta que tienes en mente.";
    step3Options = [
      { id: "fun", label: "Que aprenda jugando", emoji: "🎉", color: "#FFE134" },
      { id: "school", label: "Herramientas útiles para la escuela", emoji: "📚", color: "#10B981" },
      { id: "logic", label: "Desarrollo lógico / Matemático", emoji: "🧩", color: "#00C9FF" },
      { id: "create", label: "Que exprese su creatividad", emoji: "🎨", color: "#9C27B0" },
    ];
  } else if (answers.step0 === "company") {
    step3Title = "¿Qué objetivo tiene tu empresa?";
    step3Subtitle = "Para entender mejor sus necesidades.";
    step3Options = [
      { id: "train", label: "Capacitar al personal", emoji: "📈", color: "#00C9FF" },
      { id: "innovate", label: "Innovación / Nuevas tecnologías", emoji: "🚀", color: "#7C3AED" },
      { id: "digital", label: "Inclusión / Alfabetización digital", emoji: "💻", color: "#4CAF50" },
      { id: "other", label: "Otro objetivo en específico", emoji: "🎯", color: "#FF6B35" },
    ];
  }

  return [
    {
      id: "step0",
      title: "¿Para quién es este curso?",
      subtitle: "Cuéntanos sobre ti para orientarte mejor.",
      emoji: "👤",
      options: [
        { id: "kids", label: "Para mis hijos (5-11 años)", emoji: "🧒", color: "#FF6B35" },
        { id: "teen", label: "Para mí (soy joven, 12-17)", emoji: "🎮", color: "#FFE134" },
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
        { id: "prog", label: "Programación / Web", emoji: "💻", color: "#00C9FF" },
        { id: "games", label: "Crear Videojuegos", emoji: "🕹️", color: "#FFE134" },
        { id: "design", label: "Diseño / Contenido", emoji: "🎨", color: "#9C27B0" },
        { id: "ai", label: "Inteligencia Artificial", emoji: "🧠", color: "#10B981" },
        { id: "robot", label: "Robótica / Hardware", emoji: "🤖", color: "#FF6B35" },
      ],
    },
    {
      id: "step3",
      title: step3Title,
      subtitle: step3Subtitle,
      emoji: "🎯",
      options: step3Options,
    },
  ];
};

type CourseResult = {
  title: string;
  desc: string;
  color: string;
  emoji: string;
  href: string;
  hrefLabel: string;
};

// Función refactorizada para cubrir todo el catálogo de la academia
function getResult(answers: Answer): CourseResult {
  const { step0, step1, step2, step3 } = answers;

  // 1. Ruta Corporativa
  if (step0 === "company") {
    return {
      title: "Capacitación corporativa",
      desc: "Diseñamos un programa con horarios y duración personalizados a las necesidades de tu empresa o entidad.",
      color: "#7C3AED",
      emoji: "🏢",
      href: "/capacitaciones",
      hrefLabel: "Ver capacitaciones",
    };
  }

  // 2. Ruta Niños (5-11 años)
  if (step0 === "kids") {
    if (step3 === "school") {
      return {
        title: "Alfabetización digital (Peques)",
        desc: "Aprenderán a usar dispositivos de forma segura aplicando herramientas útiles para la escuela, como la Suite de Google.",
        color: "#10B981",
        emoji: "📱",
        href: "/cursos/ninos/alfabetizacion",
        hrefLabel: "Ver curso",
      };
    }
    if (step2 === "robot") {
      return {
        title: "Robótica I",
        desc: "Construyen y programan robots iniciales, aprendiendo principios de mecánica y sensores.",
        color: "#FF6B35",
        emoji: "🤖",
        href: "/cursos/ninos/robotica",
        hrefLabel: "Ver curso",
      };
    }
    if (step2 === "design" || step3 === "create") {
      return {
        title: "Diseño gráfico",
        desc: "Crean proyectos visuales con ilustraciones, vectores y gráficos 3D desde la primera clase.",
        color: "#9C27B0",
        emoji: "🎨",
        href: "/cursos/ninos/diseno",
        hrefLabel: "Ver curso",
      };
    }
    if (step1 === "zero") {
      return {
        title: "Fundamentos de la programación",
        desc: "Se inician mediante ejercicios y retos gamificados en Scratch Jr. y cuadernillos de Algorithmics.",
        color: "#00C9FF",
        emoji: "🧩",
        href: "/cursos/ninos/fundamentos",
        hrefLabel: "Ver curso",
      };
    }
    return {
      title: "Programación visual",
      desc: "Comienzan a crear sus primeras animaciones y juegos complejos usando programación por bloques y Scratch.",
      color: "#FFE134",
      emoji: "🐱",
      href: "/cursos/ninos/programacion",
      hrefLabel: "Ver curso",
    };
  }

  // 3. Ruta Jóvenes (12-17 años)
  if (step0 === "teen") {
    if (step3 === "study") {
      return {
        title: "Preparación para Universidad",
        desc: "Resuelven guías y simulacros de exámenes de admisión (UNAM, IPN, UAM) trabajando por áreas clave.",
        color: "#7C3AED",
        emoji: "🎓",
        href: "/cursos/universidad",
        hrefLabel: "Ver preparación",
      };
    }
    if (step3 === "school") {
      return {
        title: "Regularización en Matemáticas o Inglés",
        desc: "Resuelven problemas de matemáticas de acuerdo con su grado o aprenden inglés con dinámicas orales y visuales.",
        color: "#10B981",
        emoji: "📚",
        href: "/cursos/academico",
        hrefLabel: "Ver apoyo escolar",
      };
    }
    if (step2 === "games") {
      return {
        title: "Diseño de videojuegos: Roblox o Unity",
        desc: "Crean mundos programando en Lua con Roblox Studio, o publican juegos usando C# y Animator en Unity.",
        color: "#FFE134",
        emoji: "🕹️",
        href: "/cursos/jovenes/videojuegos",
        hrefLabel: "Ver videojuegos",
      };
    }
    if (step2 === "design") {
      return {
        title: "Animación Digital o Creación de video",
        desc: "Dibujo digital y fotogramas, o grabación y edición de videos para TikTok, Shorts y Reels de forma guiada.",
        color: "#9C27B0",
        emoji: "🎬",
        href: "/cursos/jovenes/creativo",
        hrefLabel: "Ver cursos creativos",
      };
    }
    if (step2 === "ai") {
      return {
        title: "Inteligencia artificial (niños)",
        desc: "Desarrollan proyectos usando IA para generar texto, código, audio, video y modelos 3D.",
        color: "#10B981",
        emoji: "✨",
        href: "/cursos/jovenes/ia",
        hrefLabel: "Ver curso de IA",
      };
    }
    if (step3 === "job") {
      return {
        title: "Emprendimiento (intrapreneurship)",
        desc: "Desarrollan actitud emprendedora, generan modelos de negocio y aplican la metodología ágil lean startup.",
        color: "#FF6B35",
        emoji: "🚀",
        href: "/cursos/emprendimiento",
        hrefLabel: "Ver emprendimiento",
      };
    }
    return {
      title: "Diseño web o Python Start I",
      desc: "Crean sus propias páginas web con foco en UX/UI sin programar, o aprenden algoritmos modernos y PyGame en Python.",
      color: "#00C9FF",
      emoji: "💻",
      href: "/cursos/jovenes/programacion",
      hrefLabel: "Ver programación",
    };
  }

  // 4. Ruta Adultos (18+)
  if (step0 === "adult") {
    if (step1 === "zero" && step2 !== "ai") {
      return {
        title: "Alfabetización Digital (Adultos)",
        desc: "Se familiarizan paso a paso con computadoras, celulares y herramientas digitales en un ambiente seguro y paciente.",
        color: "#4CAF50",
        emoji: "📱",
        href: "/cursos/adultos/alfabetizacion",
        hrefLabel: "Ver curso",
      };
    }
    if (step2 === "ai") {
      return {
        title: "Inteligencia artificial (adultos)",
        desc: "Son sesiones individuales y personalizadas a las necesidades de cada estudiante a modo de consultoría.",
        color: "#10B981",
        emoji: "🧠",
        href: "/cursos/adultos/ia",
        hrefLabel: "Ver consultoría",
      };
    }
    if (step3 === "school") {
      return {
        title: "Inglés",
        desc: "Practican escuchar, hablar, leer y escribir, y avanzan hasta explicar temas y dar miniclases en inglés.",
        color: "#7C3AED",
        emoji: "🌍",
        href: "/cursos/adultos/ingles",
        hrefLabel: "Ver curso de inglés",
      };
    }
    if (step2 === "design") {
       return {
        title: "Creación de contenido y video",
        desc: "Aprende a planear, grabar y editar contenido para redes sociales desde la idea inicial hasta la edición final.",
        color: "#9C27B0",
        emoji: "🎥",
        href: "/cursos/adultos/contenido",
        hrefLabel: "Ver curso",
      };
    }
    return {
      title: "Python Start I o Emprendimiento",
      desc: "Aplica conocimientos prácticos en programación moderna o desarrolla planes y modelos de negocios efectivos.",
      color: "#00C9FF",
      emoji: "💼",
      href: "/cursos/adultos/profesional",
      hrefLabel: "Ver cursos profesionales",
    };
  }

  // Fallback final
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
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answer>({});
  const [done, setDone] = useState(false);
  const { theme } = useTheme();

  // Llamamos a la función dinámica pasándole el estado actual de las respuestas
  const questionsList = getQuestions(answers);
  const currentQ = questionsList[step];
  const progress = step < 0 ? 0 : ((step + 1) / questionsList.length) * 100;

  const handleAnswer = (value: string) => {
    const key = currentQ.id as keyof Answer;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (step < questionsList.length - 1) {
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
      <section className="pt-32 pb-16 px-4 relative overflow-hidden bg-white dark:bg-[#050A14] transition-colors duration-300">
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
                  Pregunta {step + 1} de {questionsList.length}
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
              <div style={{ fontSize: "4rem" }} className="mb-6 drop-shadow-sm">🎮</div>
              <h2
                className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
                style={{ fontWeight: 800, fontSize: "1.5rem" }}
              >
                ¿Estás listo?
              </h2>
              <p className="text-gray-600 dark:text-white/60 mb-8 leading-relaxed transition-colors duration-300">
                Responde 4 preguntas rápidas y te diremos exactamente qué curso
                de GOKU LAB es el indicado para ti o para tu familia.
              </p>
              <div className="flex flex-col gap-3 text-sm text-gray-500 dark:text-white/50 mb-8 transition-colors duration-300">
                {["✅ Solo 4 preguntas", "✅ Resultado dinámico e inmediato", "✅ 100% personalizado"].map((i) => (
                  <span key={i}>{i}</span>
                ))}
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
                    Alguien del equipo GOKU LAB revisará tus respuestas y te dará orientación personalizada.
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
import { useState } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { useTheme } from "next-themes";
import { ArrowRight, RotateCcw, MessageCircle, CheckCircle } from "lucide-react";

type Answers = Record<string, string>;

type Option = {
  id: string;
  label: string;
  emoji: string;
  color: string;
};

type Question = {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  options: Option[];
};

// ─── Flujo de preguntas dinámico ───────────────────────────────────────────
function getQuestion(step: number, answers: Answers): Question | null {
  // PASO 0 — siempre igual
  if (step === 0) {
    return {
      id: "who",
      title: "¿Para quién es este curso?",
      subtitle: "Cuéntanos sobre ti para orientarte mejor.",
      emoji: "👤",
      options: [
        { id: "kids",    label: "Para mis hijos",              emoji: "🧒", color: "#FF6B35" },
        { id: "teen",    label: "Para mí (soy joven, 13–17)",  emoji: "🎮", color: "#FFE134" },
        { id: "adult",   label: "Para mí (soy adulto, 18+)",   emoji: "👨‍💼", color: "#00C9FF" },
        { id: "company", label: "Para mi empresa / equipo",    emoji: "🏢", color: "#7C3AED" },
      ],
    };
  }

  // ── NIÑOS ────────────────────────────────────────────────────────────────
  if (answers.who === "kids") {
    if (step === 1) {
      return {
        id: "age",
        title: "¿Qué edad tienen tus hijos?",
        subtitle: "Así encontramos el nivel ideal para ellos.",
        emoji: "🎂",
        options: [
          { id: "5-7",   label: "5 a 7 años",  emoji: "🌱", color: "#4CAF50" },
          { id: "7-11",  label: "7 a 11 años", emoji: "⭐", color: "#00C9FF" },
          { id: "10-14", label: "10 a 14 años",emoji: "🔥", color: "#FF6B35" },
          { id: "12-17", label: "12 a 17 años",emoji: "🚀", color: "#7C3AED" },
        ],
      };
    }

    if (step === 2) {
      const age = answers.age;
      const optionsByAge: Record<string, Option[]> = {
        "5-7": [
          { id: "scratch-jr", label: "Programación con Scratch Jr",  emoji: "🐱", color: "#FF6B35" },
          { id: "digital",    label: "Alfabetización digital",        emoji: "💡", color: "#00C9FF" },
        ],
        "7-11": [
          { id: "scratch",   label: "Programación visual (Scratch)", emoji: "🐱", color: "#FF6B35" },
          { id: "robotics",  label: "Robótica",                      emoji: "🤖", color: "#00C9FF" },
          { id: "design",    label: "Diseño gráfico",                emoji: "🎨", color: "#9C27B0" },
          { id: "digital",   label: "Alfabetización digital",         emoji: "💡", color: "#4CAF50" },
        ],
        "10-14": [
          { id: "roblox",   label: "Videojuegos con Roblox",         emoji: "🎮", color: "#FF6B35" },
          { id: "robotics", label: "Robótica",                       emoji: "🤖", color: "#00C9FF" },
          { id: "design",   label: "Diseño gráfico / Animación",     emoji: "🎨", color: "#9C27B0" },
          { id: "ai",       label: "Inteligencia Artificial",        emoji: "🧠", color: "#10B981" },
        ],
        "12-17": [
          { id: "python",  label: "Python / Programación",           emoji: "🐍", color: "#00C9FF" },
          { id: "web",     label: "Diseño web",                      emoji: "🌐", color: "#7C3AED" },
          { id: "ai",      label: "Inteligencia Artificial",         emoji: "🧠", color: "#10B981" },
          { id: "unity",   label: "Unity / Videojuegos 3D",          emoji: "🎮", color: "#FF6B35" },
        ],
      };
      return {
        id: "area",
        title: "¿Qué área le interesa más?",
        subtitle: "Elige la que más le emocione.",
        emoji: "✨",
        options: optionsByAge[age] ?? optionsByAge["7-11"],
      };
    }

    if (step === 3) {
      return {
        id: "goal",
        title: "¿Cuál es el objetivo principal?",
        subtitle: "Así te damos la mejor recomendación.",
        emoji: "🎯",
        options: [
          { id: "fun",        label: "Diversión y creatividad",        emoji: "🎉", color: "#FFE134" },
          { id: "future",     label: "Habilidades para el futuro",     emoji: "🚀", color: "#00C9FF" },
          { id: "logic",      label: "Pensamiento lógico",             emoji: "🧩", color: "#7C3AED" },
          { id: "expression", label: "Expresión digital / artística",  emoji: "🎨", color: "#9C27B0" },
        ],
      };
    }
  }

  // ── JOVEN (13–17) ────────────────────────────────────────────────────────
  if (answers.who === "teen") {
    if (step === 1) {
      return {
        id: "area",
        title: "¿Qué área te interesa más?",
        subtitle: "Elige la que más te llame la atención.",
        emoji: "✨",
        options: [
          { id: "prog",   label: "Programación / Apps",      emoji: "💻", color: "#00C9FF" },
          { id: "games",  label: "Videojuegos / Diseño 3D",  emoji: "🎮", color: "#FF6B35" },
          { id: "ai",     label: "Inteligencia Artificial",  emoji: "🧠", color: "#10B981" },
          { id: "other",  label: "Inglés / Matemáticas",     emoji: "📚", color: "#7C3AED" },
        ],
      };
    }

    if (step === 2) {
      return {
        id: "level",
        title: "¿Cuál es tu nivel de experiencia?",
        subtitle: "Esto nos ayuda a recomendarte el nivel adecuado.",
        emoji: "📊",
        options: [
          { id: "zero",  label: "Sin experiencia previa",    emoji: "🌱", color: "#4CAF50" },
          { id: "basic", label: "Sé algunas cosas básicas",  emoji: "📚", color: "#00C9FF" },
          { id: "inter", label: "Tengo nivel intermedio",    emoji: "💪", color: "#7C3AED" },
          { id: "adv",   label: "Quiero especializarme",     emoji: "🚀", color: "#FF6B35" },
        ],
      };
    }

    if (step === 3) {
      return {
        id: "goal",
        title: "¿Cuál es tu objetivo principal?",
        subtitle: "Así te damos la mejor recomendación.",
        emoji: "🎯",
        options: [
          { id: "fun",        label: "Divertirme y crear proyectos",         emoji: "🎉", color: "#FFE134" },
          { id: "university", label: "Prepararme para la universidad",       emoji: "🎓", color: "#10B981" },
          { id: "job",        label: "Conseguir trabajo o ir de freelance",  emoji: "💼", color: "#00C9FF" },
          { id: "project",    label: "Lanzar mi propio proyecto",            emoji: "🚀", color: "#7C3AED" },
        ],
      };
    }
  }

  // ── ADULTO (18+) ─────────────────────────────────────────────────────────
  if (answers.who === "adult") {
    if (step === 1) {
      return {
        id: "area",
        title: "¿Qué área te interesa?",
        subtitle: "Te orientamos según tu interés.",
        emoji: "✨",
        options: [
          { id: "prog",    label: "Programación / Web",        emoji: "💻", color: "#00C9FF" },
          { id: "ai",      label: "Inteligencia Artificial",   emoji: "🧠", color: "#10B981" },
          { id: "design",  label: "Diseño / Contenido digital",emoji: "🎨", color: "#9C27B0" },
          { id: "digital", label: "Alfabetización digital",    emoji: "📱", color: "#FF6B35" },
        ],
      };
    }

    if (step === 2) {
      return {
        id: "level",
        title: "¿Cuál es tu nivel de experiencia?",
        subtitle: "Esto nos ayuda a recomendarte el nivel adecuado.",
        emoji: "📊",
        options: [
          { id: "zero",  label: "Sin experiencia previa",    emoji: "🌱", color: "#4CAF50" },
          { id: "basic", label: "Sé algunas cosas básicas",  emoji: "📚", color: "#00C9FF" },
          { id: "inter", label: "Tengo nivel intermedio",    emoji: "💪", color: "#7C3AED" },
          { id: "adv",   label: "Quiero especializarme",     emoji: "🚀", color: "#FF6B35" },
        ],
      };
    }

    if (step === 3) {
      return {
        id: "goal",
        title: "¿Cuál es tu objetivo?",
        subtitle: "Así te damos la mejor recomendación.",
        emoji: "🎯",
        options: [
          { id: "job",     label: "Conseguir trabajo / freelance",     emoji: "💼", color: "#00C9FF" },
          { id: "improve", label: "Mejorar en mi trabajo actual",      emoji: "📈", color: "#7C3AED" },
          { id: "project", label: "Mi propio proyecto o negocio",      emoji: "🚀", color: "#FF6B35" },
          { id: "hobby",   label: "Aprendizaje personal / curiosidad", emoji: "🌟", color: "#10B981" },
        ],
      };
    }
  }

  return null;
}

// ─── Resultado final ────────────────────────────────────────────────────────
type CourseResult = {
  title: string;
  desc: string;
  color: string;
  emoji: string;
  href: string;
  hrefLabel: string;
};

function getResult(answers: Answers): CourseResult {
  const { who, age, area, goal } = answers;

  // Empresa
  if (who === "company") {
    return {
      title: "Capacitación Corporativa Personalizada",
      desc: "Diseñamos un programa 100% a la medida de tu equipo con diagnóstico previo, contenido relevante y métricas de impacto. Horarios y duración flexibles.",
      color: "#7C3AED", emoji: "🏢",
      href: "/capacitaciones", hrefLabel: "Ver capacitaciones",
    };
  }

  // ── Niños ──
  if (who === "kids") {
    if (age === "5-7") {
      if (area === "digital") return {
        title: "Alfabetización Digital (Peques)",
        desc: "Aprenden a usar dispositivos e Internet de forma segura y divertida con proyectos prácticos: documentos, presentaciones, correo y navegación segura.",
        color: "#00C9FF", emoji: "💡", href: "/cursos/ninos", hrefLabel: "Ver cursos",
      };
      return {
        title: "Fundamentos de Programación",
        desc: "Se inician en programación con Scratch Jr y ejercicios gamificados. Aprenden algoritmos, ciclos y eventos creando sus primeras animaciones y juegos.",
        color: "#FF6B35", emoji: "🐱", href: "/cursos/ninos/scratch-basico", hrefLabel: "Ver curso",
      };
    }

    if (age === "7-11") {
      if (area === "robotics") return {
        title: "Robótica I",
        desc: "Construyen y programan robots reales para resolver retos. Aprenden mecánica, sensores y lógica de programación de forma práctica y en equipo.",
        color: "#00C9FF", emoji: "🤖", href: "/cursos/ninos/robotica-basica", hrefLabel: "Ver curso",
      };
      if (area === "design") return {
        title: "Diseño Gráfico",
        desc: "Crean proyectos visuales con ilustraciones, collages, vectores y gráficos 3D desde la primera clase. Potencia su creatividad y expresión visual.",
        color: "#9C27B0", emoji: "🎨", href: "/cursos/ninos", hrefLabel: "Ver cursos",
      };
      if (area === "digital") return {
        title: "Alfabetización Digital (Peques)",
        desc: "Aprenden a usar dispositivos e Internet de forma segura y divertida, creando proyectos prácticos y manejando herramientas de Google.",
        color: "#4CAF50", emoji: "💡", href: "/cursos/ninos", hrefLabel: "Ver cursos",
      };
      return {
        title: "Programación Visual con Scratch",
        desc: "Crean animaciones y juegos complejos con bloques en Scratch. Aprenden los fundamentos de la programación desarrollando proyectos reales desde el primer día.",
        color: "#FF6B35", emoji: "🐱", href: "/cursos/ninos/scratch-basico", hrefLabel: "Ver curso",
      };
    }

    if (age === "10-14") {
      if (area === "roblox") return {
        title: "Diseño de Videojuegos con Roblox",
        desc: "Crean mundos y juegos desde cero, programan en Lua y presentan sus proyectos ante compañeros y la comunidad digital de Roblox.",
        color: "#FF6B35", emoji: "🎮", href: "/cursos/ninos/minecraft-edu", hrefLabel: "Ver curso",
      };
      if (area === "ai") return {
        title: "Inteligencia Artificial para Jóvenes",
        desc: "Desarrollan proyectos usando IA para generar texto, código, imágenes, audio y video. Aprenden ingeniería de prompts y ética de la IA.",
        color: "#10B981", emoji: "🧠", href: "/cursos/ninos", hrefLabel: "Ver cursos",
      };
      if (area === "design") return {
        title: "Diseño Gráfico / Animación Digital",
        desc: "Crean ilustraciones, collages, vectores y animaciones digitales. Aprenden a dar movimiento a personajes y logos con software profesional.",
        color: "#9C27B0", emoji: "🎨", href: "/cursos/ninos", hrefLabel: "Ver cursos",
      };
      return {
        title: "Robótica I",
        desc: "Construyen y programan robots para resolver retos, desde movimientos básicos hasta misiones en equipo. Desarrollan pensamiento lógico y creatividad.",
        color: "#00C9FF", emoji: "🤖", href: "/cursos/ninos/robotica-basica", hrefLabel: "Ver curso",
      };
    }

    if (age === "12-17") {
      if (area === "ai") return {
        title: "Inteligencia Artificial para Jóvenes",
        desc: "Usan IA para generar texto, código, imágenes y modelos 3D. Aprenden ingeniería de prompts y construyen un portafolio innovador.",
        color: "#10B981", emoji: "🧠", href: "/cursos/ninos", hrefLabel: "Ver cursos",
      };
      if (area === "web") return {
        title: "Diseño Web",
        desc: "Crean páginas web y portafolios digitales desde cero con enfoque en UX/UI. Aprenden a planificar, diseñar y estructurar sitios responsivos.",
        color: "#7C3AED", emoji: "🌐", href: "/cursos/ninos", hrefLabel: "Ver cursos",
      };
      if (area === "unity") return {
        title: "Unity — Desarrollo de Videojuegos",
        desc: "Trabajan en un entorno que simula un estudio profesional, creando prototipos con C#, diseño de niveles 3D, animación y publicación en Android.",
        color: "#FF6B35", emoji: "🎮", href: "/cursos/ninos", hrefLabel: "Ver cursos",
      };
      return {
        title: "Python Start I",
        desc: "Aprenden programación moderna con Python: gráficos con Turtle, juegos con PyGame y proyectos reales desde la primera clase.",
        color: "#00C9FF", emoji: "🐍", href: "/cursos/ninos", hrefLabel: "Ver cursos",
      };
    }
  }

  // ── Joven ──
  if (who === "teen") {
    if (area === "ai") return {
      title: "Inteligencia Artificial para Jóvenes",
      desc: "Aprenden ingeniería de prompts, generación de código, imágenes y audio asistidos por IA. Proyectos reales y portafolio innovador.",
      color: "#10B981", emoji: "🧠", href: "/cursos/adolescentes", hrefLabel: "Ver cursos",
    };
    if (area === "games") return {
      title: "Videojuegos con Roblox / Unity",
      desc: "Con Roblox crean mundos y programan en Lua. Con Unity aprenden C# en un entorno que simula un estudio profesional y publican en Android.",
      color: "#FF6B35", emoji: "🎮", href: "/cursos/adolescentes/videojuegos-roblox", hrefLabel: "Ver curso",
    };
    if (area === "other") {
      if (goal === "university") return {
        title: "Preparación para Universidad",
        desc: "Resuelven simulacros de exámenes de admisión (UNAM, IPN, UAM) con estrategias de tiempo, manejo de nervios y técnicas de resolución.",
        color: "#7C3AED", emoji: "🎓", href: "/cursos/adolescentes", hrefLabel: "Ver cursos",
      };
      return {
        title: "Inglés o Regularización en Matemáticas",
        desc: "Aprenden inglés desde su nivel actual con proyectos reales, o refuerzan matemáticas (álgebra, geometría, funciones) con guía personalizada.",
        color: "#7C3AED", emoji: "📚", href: "/cursos/adolescentes", hrefLabel: "Ver cursos",
      };
    }
    // prog
    if (goal === "university" || goal === "job") return {
      title: "Python Start I",
      desc: "El lenguaje más demandado del mercado. Aprenden desde cero hasta crear proyectos reales con gráficos e interfaces interactivas.",
      color: "#00C9FF", emoji: "🐍", href: "/cursos/adolescentes/python-teen", hrefLabel: "Ver curso",
    };
    return {
      title: "Diseño Web",
      desc: "Crean páginas web atractivas desde cero con enfoque en UX/UI, construyendo un portafolio digital con proyectos propios.",
      color: "#7C3AED", emoji: "🌐", href: "/cursos/adolescentes/web-dev-teen", hrefLabel: "Ver curso",
    };
  }

  // ── Adulto ──
  if (who === "adult") {
    if (area === "ai") return {
      title: "IA Aplicada — Sesiones Personalizadas",
      desc: "Sesiones individuales diseñadas a tus necesidades: automatización, generación de contenido, análisis de datos con IA y herramientas como ChatGPT.",
      color: "#10B981", emoji: "🧠", href: "/cursos/adultos/ia-aplicada", hrefLabel: "Ver curso",
    };
    if (area === "digital") return {
      title: "Alfabetización Digital para Adultos",
      desc: "Aprende a manejar correo, apps esenciales, navegación segura e Internet en un ambiente paciente, paso a paso y sin presiones.",
      color: "#FF6B35", emoji: "💡", href: "/cursos/adultos/alfabetizacion-digital", hrefLabel: "Ver curso",
    };
    if (area === "design") return {
      title: "Diseño Web o Creación de Contenido",
      desc: "Crea páginas web con foco en UX/UI o produce video y contenido digital profesional. Ideal para potenciar tu marca personal o negocio.",
      color: "#9C27B0", emoji: "🎨", href: "/cursos/adultos", hrefLabel: "Ver cursos",
    };
    // prog
    if (goal === "job" || goal === "project") return {
      title: "Python para Principiantes",
      desc: "El lenguaje más demandado. Aprende desde cero hasta crear proyectos reales: análisis de datos, automatización y aplicaciones prácticas.",
      color: "#00C9FF", emoji: "🐍", href: "/cursos/adultos/python-basico", hrefLabel: "Ver curso",
    };
    return {
      title: "Desarrollo Web: HTML, CSS y JS",
      desc: "Crea sitios web modernos desde cero. El camino más directo hacia una carrera digital o tu propio proyecto en internet.",
      color: "#7C3AED", emoji: "🌐", href: "/cursos/adultos/web-html-css", hrefLabel: "Ver curso",
    };
  }

  return {
    title: "Diagnóstico personalizado gratuito",
    desc: "Habla directamente con nuestro equipo para que diseñemos el camino perfecto para ti.",
    color: "#00C9FF", emoji: "🎯", href: "/contacto", hrefLabel: "Contactar con el equipo",
  };
}

// ─── Componente principal ───────────────────────────────────────────────────
export function TestPage() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const { theme } = useTheme();

  // Empresa termina al responder paso 0; el resto siempre son 4 pasos
  const totalSteps = answers.who === "company" ? 1 : 4;
  const progress = step < 0 ? 0 : ((step + 1) / totalSteps) * 100;
  const currentQ = step >= 0 ? getQuestion(step, answers) : null;

  const handleAnswer = (value: string) => {
    if (!currentQ) return;
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    const isDone = newAnswers.who === "company" || step === 3;
    setTimeout(() => {
      if (isDone) setDone(true);
      else setStep(step + 1);
    }, 300);
  };

  const handleBack = () => {
    if (step <= 0) return;
    // Limpia la respuesta del paso actual al retroceder
    const prevQ = getQuestion(step, answers);
    if (prevQ) {
      const cleaned = { ...answers };
      delete cleaned[prevQ.id];
      setAnswers(cleaned);
    }
    setStep(step - 1);
  };

  const reset = () => {
    setStep(-1);
    setAnswers({});
    setDone(false);
  };

  const result = done ? getResult(answers) : null;

  // ── Estilos reutilizables según tema ──
  const cardBg = theme === "dark"
    ? { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }
    : { background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" };

  const progressTrack = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  return (
    <div className="bg-gray-50 dark:bg-[#0A0F1E] min-h-screen transition-colors duration-300">

      {/* HERO */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden bg-white dark:bg-[#050A14] transition-colors duration-300">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: theme === "dark"
              ? "radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(124,58,237,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-6"
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
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15 }}
            >
              Encuentra tu curso{" "}
              <span style={{ background: "linear-gradient(90deg, #00C9FF, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                perfecto
              </span>
            </h1>
            <p className="text-gray-600 dark:text-white/65 max-w-xl mx-auto transition-colors duration-300" style={{ fontSize: "1.1rem" }}>
              4 preguntas. 2 minutos. Una recomendación 100% personalizada para ti.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* TEST CARD */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Barra de progreso */}
          {step >= 0 && !done && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 dark:text-white/40 text-sm transition-colors duration-300">
                  Pregunta {step + 1} de {totalSteps}
                </span>
                <span className="text-gray-500 dark:text-white/40 text-sm transition-colors duration-300">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: progressTrack }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${progress}%`, background: "linear-gradient(90deg, #00C9FF, #7C3AED)", transition: "width 0.5s ease" }}
                />
              </div>
            </div>
          )}

          {/* INTRO */}
          {step === -1 && !done && (
            <div className="p-8 rounded-3xl text-center shadow-md dark:shadow-none transition-colors duration-300" style={cardBg}>
              <div style={{ fontSize: "4rem" }} className="mb-6">🎮</div>
              <h2 className="text-gray-900 dark:text-white mb-4 transition-colors duration-300" style={{ fontWeight: 800, fontSize: "1.5rem" }}>
                ¿Estás listo?
              </h2>
              <p className="text-gray-600 dark:text-white/60 mb-8 leading-relaxed transition-colors duration-300">
                Responde algunas preguntas rápidas y te diremos exactamente qué curso de GŌKU LAB es el indicado para ti o para tu familia.
              </p>
              <div className="flex flex-col gap-3 text-sm text-gray-500 dark:text-white/50 mb-8 transition-colors duration-300">
                {["✅ Preguntas adaptadas a tu perfil", "✅ Resultado inmediato", "✅ 100% personalizado"].map((i) => (
                  <span key={i}>{i}</span>
                ))}
              </div>
              <button
                onClick={() => setStep(0)}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-bold"
                style={{ background: "linear-gradient(135deg, #00C9FF, #7C3AED)", boxShadow: "0 6px 25px rgba(0,201,255,0.3)", fontSize: "1.05rem", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                Comenzar el diagnóstico
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* PREGUNTA */}
          {step >= 0 && !done && currentQ && (
            <div
              className="p-8 rounded-3xl shadow-md dark:shadow-none transition-colors duration-300"
              style={{ ...cardBg, animation: "slideIn 0.35s ease" }}
            >
              <div className="text-4xl mb-5">{currentQ.emoji}</div>
              <h2 className="text-gray-900 dark:text-white mb-2 transition-colors duration-300" style={{ fontWeight: 800, fontSize: "1.5rem" }}>
                {currentQ.title}
              </h2>
              <p className="text-gray-500 dark:text-white/55 mb-8 transition-colors duration-300">{currentQ.subtitle}</p>

              <div className={`grid gap-3 ${currentQ.options.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2"}`}>
                {currentQ.options.map((opt) => {
                  const selected = answers[currentQ.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswer(opt.id)}
                      className="p-5 rounded-2xl text-left flex flex-col gap-2"
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
                      <span style={{ fontSize: "1.75rem" }}>{opt.emoji}</span>
                      <span
                        className="text-sm leading-snug transition-colors duration-300"
                        style={{ color: selected ? opt.color : (theme === "dark" ? "rgba(255,255,255,0.7)" : "#4b5563"), fontWeight: selected ? 700 : 500 }}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {step > 0 && (
                <button
                  onClick={handleBack}
                  className="mt-5 text-sm text-gray-400 dark:text-white/30 hover:text-gray-700 dark:hover:text-white/60 transition-colors duration-300"
                >
                  ← Volver
                </button>
              )}
            </div>
          )}

          {/* RESULTADO */}
          {done && result && (
            <div
              className="rounded-3xl overflow-hidden shadow-lg dark:shadow-none transition-colors duration-300"
              style={{ ...cardBg, animation: "slideIn 0.35s ease" }}
            >
              {/* Header del resultado */}
              <div
                className="p-8 text-center"
                style={{
                  background: theme === "dark"
                    ? `linear-gradient(135deg, ${result.color}15, ${result.color}05)`
                    : `linear-gradient(135deg, ${result.color}10, transparent)`,
                  borderBottom: theme === "dark" ? `1px solid ${result.color}20` : `1px solid ${result.color}15`,
                }}
              >
                <div style={{ fontSize: "4rem" }} className="mb-4">{result.emoji}</div>
                <div className="inline-block px-4 py-1 rounded-full text-sm mb-4 font-semibold" style={{ background: result.color, color: "#fff" }}>
                  Tu recomendación
                </div>
                <h2 className="text-gray-900 dark:text-white mb-3 transition-colors duration-300" style={{ fontWeight: 800, fontSize: "1.5rem" }}>
                  {result.title}
                </h2>
                <p className="text-gray-600 dark:text-white/65 leading-relaxed transition-colors duration-300">{result.desc}</p>
              </div>

              {/* Acciones */}
              <div className="p-8">
                <div className="flex flex-col gap-4 mb-8">
                  <a
                    href={`https://wa.me/5612668168?text=Hice%20el%20test%20y%20me%20recomendaron%3A%20${encodeURIComponent(result.title)}%2C%20quiero%20agendar%20mi%20clase%20muestra`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-bold"
                    style={{ background: "linear-gradient(135deg, #00C9FF, #7C3AED)", boxShadow: "0 6px 25px rgba(0,201,255,0.3)", fontSize: "1.05rem", transition: "all 0.2s ease" }}
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

                <div
                  className="flex items-center gap-3 p-4 rounded-2xl transition-colors duration-300"
                  style={{ background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#f9fafb" }}
                >
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
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

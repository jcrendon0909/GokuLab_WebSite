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

// ─── Flujo dinámico de preguntas ────────────────────────────────────────────
function getQuestion(step: number, answers: Answers): Question | null {

  // PASO 0 — siempre igual
  if (step === 0) {
    return {
      id: "who",
      title: "¿Para quién es este curso?",
      subtitle: "Cuéntanos para orientarte mejor.",
      emoji: "👤",
      options: [
        { id: "kids",    label: "Para mis hijos",             emoji: "🧒", color: "#FF6B35" },
        { id: "teen",    label: "Para mí (soy joven, 13–17)", emoji: "🎮", color: "#FFE134" },
        { id: "adult",   label: "Para mí (soy adulto, 18+)",  emoji: "👨‍💼", color: "#00C9FF" },
        { id: "company", label: "Para mi empresa / equipo",   emoji: "🏢", color: "#7C3AED" },
      ],
    };
  }

  // ── EMPRESA (2 preguntas) ─────────────────────────────────────────────────
  if (answers.who === "company") {
    if (step === 1) {
      return {
        id: "companyArea",
        title: "¿En qué área quieres capacitar a tu equipo?",
        subtitle: "Así diseñamos un programa relevante para tu negocio.",
        emoji: "🏢",
        options: [
          { id: "tech",    label: "Programación / Tecnología",   emoji: "💻", color: "#00C9FF" },
          { id: "ai",      label: "Inteligencia Artificial",     emoji: "🧠", color: "#10B981" },
          { id: "digital", label: "Habilidades digitales básicas",emoji: "📱", color: "#FF6B35" },
          { id: "design",  label: "Diseño / Comunicación digital",emoji: "🎨", color: "#9C27B0" },
        ],
      };
    }
    return null;
  }

  // ── NIÑOS (4 preguntas) ───────────────────────────────────────────────────
  if (answers.who === "kids") {
    if (step === 1) {
      return {
        id: "age",
        title: "¿Qué edad tienen tus hijos?",
        subtitle: "Así encontramos el nivel ideal para ellos.",
        emoji: "🎂",
        options: [
          { id: "5-7",   label: "5 a 7 años",   emoji: "🌱", color: "#4CAF50" },
          { id: "7-11",  label: "7 a 11 años",  emoji: "⭐", color: "#00C9FF" },
          { id: "10-14", label: "10 a 14 años", emoji: "🔥", color: "#FF6B35" },
          { id: "12-17", label: "12 a 17 años", emoji: "🚀", color: "#7C3AED" },
        ],
      };
    }

    if (step === 2) {
      const age = answers.age;
      const optionsByAge: Record<string, Option[]> = {
        "5-7": [
          { id: "scratch-jr", label: "Programación con Scratch Jr", emoji: "🐱", color: "#FF6B35" },
          { id: "digital",    label: "Alfabetización digital",       emoji: "💡", color: "#00C9FF" },
        ],
        "7-11": [
          { id: "scratch",  label: "Programación visual (Scratch)", emoji: "🐱", color: "#FF6B35" },
          { id: "robotics", label: "Robótica",                      emoji: "🤖", color: "#00C9FF" },
          { id: "design",   label: "Diseño gráfico",                emoji: "🎨", color: "#9C27B0" },
          { id: "digital",  label: "Alfabetización digital",        emoji: "💡", color: "#4CAF50" },
        ],
        "10-14": [
          { id: "roblox",   label: "Videojuegos con Roblox", emoji: "🎮", color: "#FF6B35" },
          { id: "robotics", label: "Robótica",               emoji: "🤖", color: "#00C9FF" },
          { id: "design",   label: "Diseño / Animación",     emoji: "🎨", color: "#9C27B0" },
          { id: "ai",       label: "Inteligencia Artificial",emoji: "🧠", color: "#10B981" },
        ],
        "12-17": [
          { id: "python",   label: "Programación (Python)",        emoji: "🐍", color: "#00C9FF" },
          { id: "web",      label: "Diseño web",                   emoji: "🌐", color: "#7C3AED" },
          { id: "content",  label: "Contenido digital / Video",    emoji: "🎬", color: "#FF6B35" },
          { id: "ai",       label: "Inteligencia Artificial",      emoji: "🧠", color: "#10B981" },
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
        subtitle: "Así damos la recomendación más acertada.",
        emoji: "🎯",
        options: [
          { id: "fun",        label: "Diversión y creatividad",       emoji: "🎉", color: "#FFE134" },
          { id: "future",     label: "Habilidades para el futuro",    emoji: "🚀", color: "#00C9FF" },
          { id: "logic",      label: "Pensamiento lógico",            emoji: "🧩", color: "#7C3AED" },
          { id: "expression", label: "Expresión digital / artística", emoji: "🎨", color: "#9C27B0" },
        ],
      };
    }
  }

  // ── JOVEN 13–17 (4 preguntas) ─────────────────────────────────────────────
  if (answers.who === "teen") {
    if (step === 1) {
      return {
        id: "area",
        title: "¿Qué área te interesa más?",
        subtitle: "Elige la que más te llame la atención.",
        emoji: "✨",
        options: [
          { id: "prog",    label: "Programación / Apps",       emoji: "💻", color: "#00C9FF" },
          { id: "games",   label: "Videojuegos / Diseño 3D",   emoji: "🎮", color: "#FF6B35" },
          { id: "design",  label: "Diseño y contenido digital",emoji: "🎨", color: "#9C27B0" },
          { id: "other",   label: "Inglés / Matemáticas",      emoji: "📚", color: "#7C3AED" },
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
          { id: "zero",  label: "Sin experiencia previa",   emoji: "🌱", color: "#4CAF50" },
          { id: "basic", label: "Sé algunas cosas básicas", emoji: "📚", color: "#00C9FF" },
          { id: "inter", label: "Tengo nivel intermedio",   emoji: "💪", color: "#7C3AED" },
          { id: "adv",   label: "Quiero especializarme",    emoji: "🚀", color: "#FF6B35" },
        ],
      };
    }
    if (step === 3) {
      return {
        id: "goal",
        title: "¿Cuál es tu objetivo principal?",
        subtitle: "Así damos la recomendación más acertada.",
        emoji: "🎯",
        options: [
          { id: "fun",        label: "Divertirme y crear proyectos",        emoji: "🎉", color: "#FFE134" },
          { id: "university", label: "Prepararme para la universidad",      emoji: "🎓", color: "#10B981" },
          { id: "job",        label: "Conseguir trabajo o ir de freelance", emoji: "💼", color: "#00C9FF" },
          { id: "project",    label: "Lanzar mi propio proyecto",           emoji: "🚀", color: "#7C3AED" },
        ],
      };
    }
  }

  // ── ADULTO 18+ (4 preguntas) ──────────────────────────────────────────────
  if (answers.who === "adult") {
    if (step === 1) {
      return {
        id: "area",
        title: "¿Qué área te interesa?",
        subtitle: "Te orientamos según tu interés.",
        emoji: "✨",
        options: [
          { id: "prog",    label: "Programación / Web",         emoji: "💻", color: "#00C9FF" },
          { id: "ai",      label: "Inteligencia Artificial",    emoji: "🧠", color: "#10B981" },
          { id: "design",  label: "Diseño / Contenido digital", emoji: "🎨", color: "#9C27B0" },
          { id: "digital", label: "Alfabetización digital",     emoji: "📱", color: "#FF6B35" },
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
          { id: "zero",  label: "Sin experiencia previa",   emoji: "🌱", color: "#4CAF50" },
          { id: "basic", label: "Sé algunas cosas básicas", emoji: "📚", color: "#00C9FF" },
          { id: "inter", label: "Tengo nivel intermedio",   emoji: "💪", color: "#7C3AED" },
          { id: "adv",   label: "Quiero especializarme",    emoji: "🚀", color: "#FF6B35" },
        ],
      };
    }
    if (step === 3) {
      return {
        id: "goal",
        title: "¿Cuál es tu objetivo?",
        subtitle: "Así damos la recomendación más acertada.",
        emoji: "🎯",
        options: [
          { id: "job",     label: "Conseguir trabajo / freelance",    emoji: "💼", color: "#00C9FF" },
          { id: "improve", label: "Mejorar en mi trabajo actual",     emoji: "📈", color: "#7C3AED" },
          { id: "project", label: "Mi propio proyecto o negocio",     emoji: "🚀", color: "#FF6B35" },
          { id: "hobby",   label: "Aprendizaje personal / curiosidad",emoji: "🌟", color: "#10B981" },
        ],
      };
    }
  }

  return null;
}

// ─── Resultado final ─────────────────────────────────────────────────────────
type CourseResult = {
  title: string;
  desc: string;
  color: string;
  emoji: string;
  href: string;
  hrefLabel: string;
};

function getResult(answers: Answers): CourseResult {
  const { who, age, area, level, goal, companyArea } = answers;

  // ── Empresa ───────────────────────────────────────────────────────────────
  if (who === "company") {
    const focus: Record<string, string> = {
      tech:    "programación, desarrollo web y automatización de procesos con tecnología.",
      ai:      "IA aplicada, uso de ChatGPT, automatización y análisis de datos para mejorar la productividad.",
      digital: "manejo de correo, Google Workspace, seguridad digital y herramientas esenciales del día a día.",
      design:  "diseño gráfico, comunicación visual, creación de contenido y presencia digital de la marca.",
    };
    return {
      title: "Capacitación Corporativa Personalizada",
      desc: `Diseñamos un programa 100% a la medida enfocado en ${focus[companyArea] ?? "las necesidades específicas de tu equipo."} Diagnóstico previo, horarios flexibles y métricas de impacto.`,
      color: "#7C3AED", emoji: "🏢",
      href: "/capacitaciones", hrefLabel: "Ver capacitaciones",
    };
  }

  // ── Niños ─────────────────────────────────────────────────────────────────
  if (who === "kids") {
    if (age === "5-7") {
      if (area === "digital") return {
        title: "Alfabetización Digital (Peques)",
        desc: "Aprenden a usar dispositivos e Internet de forma segura y divertida. Documentos, presentaciones, navegación segura y Google Workspace.",
        color: "#00C9FF", emoji: "💡",
        href: "/cursos/ninos", hrefLabel: "Ver cursos",
      };
      return {
        title: "Fundamentos de Programación",
        desc: "Se inician con Scratch Jr y ejercicios gamificados. Aprenden algoritmos, ciclos y eventos creando sus primeras animaciones y juegos desde los 5 años.",
        color: "#FF6B35", emoji: "🐱",
        href: "/cursos/ninos/scratch-basico", hrefLabel: "Ver curso",
      };
    }

    if (age === "7-11") {
      if (area === "robotics") return {
        title: "Robótica I",
        desc: "Construyen y programan robots reales para resolver retos. Mecánica, sensores y lógica de programación de forma práctica y en equipo.",
        color: "#00C9FF", emoji: "🤖",
        href: "/cursos/ninos/robotica-basica", hrefLabel: "Ver curso",
      };
      if (area === "design") return {
        title: "Diseño Gráfico",
        desc: "Crean proyectos visuales con ilustraciones, collages, vectores y gráficos 3D desde la primera clase. Potencia su creatividad y expresión visual.",
        color: "#9C27B0", emoji: "🎨",
        href: "/cursos/ninos/diseno-digital", hrefLabel: "Ver curso",
      };
      if (area === "digital") return {
        title: "Alfabetización Digital (Peques)",
        desc: "Aprenden a usar dispositivos e Internet de forma segura. Documentos, presentaciones, correo y navegación responsable.",
        color: "#4CAF50", emoji: "💡",
        href: "/cursos/ninos", hrefLabel: "Ver cursos",
      };
      return {
        title: "Programación Visual con Scratch",
        desc: "Crean animaciones y juegos con Scratch. Aprenden los fundamentos de la programación construyendo proyectos reales desde el primer día.",
        color: "#FF6B35", emoji: "🐱",
        href: "/cursos/ninos/scratch-basico", hrefLabel: "Ver curso",
      };
    }

    if (age === "10-14") {
      if (area === "roblox") return {
        title: "Diseño de Videojuegos con Roblox",
        desc: "Crean mundos y juegos desde cero, programan en Lua y presentan sus proyectos ante compañeros y la comunidad de Roblox.",
        color: "#FF6B35", emoji: "🎮",
        href: "/cursos/ninos/minecraft-edu", hrefLabel: "Ver curso",
      };
      if (area === "ai") return {
        title: "Inteligencia Artificial para Jóvenes",
        desc: "Desarrollan proyectos usando IA para generar texto, código e imágenes. Aprenden ingeniería de prompts y ética de la IA.",
        color: "#10B981", emoji: "🧠",
        href: "/cursos/ninos", hrefLabel: "Ver cursos",
      };
      if (area === "design") return {
        title: "Diseño Gráfico y Animación Digital",
        desc: "Crean ilustraciones, collages, vectores y animaciones. Aprenden a dar movimiento a personajes y logos con herramientas profesionales.",
        color: "#9C27B0", emoji: "🎨",
        href: "/cursos/ninos/diseno-digital", hrefLabel: "Ver curso",
      };
      return {
        title: "Robótica I",
        desc: "Construyen y programan robots para resolver retos: desde movimientos básicos hasta misiones en equipo. Desarrollan lógica y trabajo colaborativo.",
        color: "#00C9FF", emoji: "🤖",
        href: "/cursos/ninos/robotica-basica", hrefLabel: "Ver curso",
      };
    }

    // 12-17 kids
    if (area === "ai") return {
      title: "Inteligencia Artificial para Jóvenes",
      desc: "Usan IA para generar texto, código, imágenes y modelos 3D. Ingeniería de prompts, ética de la IA y portafolio de proyectos innovadores.",
      color: "#10B981", emoji: "🧠",
      href: "/cursos/ninos", hrefLabel: "Ver cursos",
    };
    if (area === "content") return {
      title: "Creación de Contenido y Video",
      desc: "Graban videos, aprenden a editar y publican en redes. Guion, producción y edición con herramientas profesionales.",
      color: "#FF6B35", emoji: "🎬",
      href: "/cursos/ninos", hrefLabel: "Ver cursos",
    };
    if (area === "web") return {
      title: "Diseño Web",
      desc: "Crean páginas web y portafolios digitales desde cero con enfoque en UX/UI, adaptados a cualquier dispositivo.",
      color: "#7C3AED", emoji: "🌐",
      href: "/cursos/ninos", hrefLabel: "Ver cursos",
    };
    return {
      title: "Python Start I",
      desc: "Programación moderna con Python: gráficos con Turtle, juegos con PyGame y proyectos reales desde la primera clase.",
      color: "#00C9FF", emoji: "🐍",
      href: "/cursos/ninos", hrefLabel: "Ver cursos",
    };
  }

  // ── Joven 13–17 ───────────────────────────────────────────────────────────
  if (who === "teen") {
    if (area === "other") {
      if (goal === "university") return {
        title: "Preparación para Universidad",
        desc: "Simulacros de exámenes de admisión (UNAM, IPN, UAM) con estrategias de tiempo, técnicas de resolución y manejo de nervios.",
        color: "#7C3AED", emoji: "🎓",
        href: "/cursos/adolescentes", hrefLabel: "Ver cursos",
      };
      return {
        title: "Inglés o Regularización en Matemáticas",
        desc: "Aprende inglés desde tu nivel con proyectos reales, o refuerza matemáticas (álgebra, geometría, funciones) con guía personalizada.",
        color: "#7C3AED", emoji: "📚",
        href: "/cursos/adolescentes", hrefLabel: "Ver cursos",
      };
    }

    if (area === "games") {
      // Nivel intermedio/avanzado → Unity; básico/cero → Roblox
      if (level === "inter" || level === "adv") return {
        title: "Unity — Desarrollo de Videojuegos 3D",
        desc: "Simulan un estudio profesional: C#, diseño de niveles 3D, animación y publicación en Android. Para quienes ya tienen base.",
        color: "#FF6B35", emoji: "🎮",
        href: "/cursos/adolescentes/videojuegos-roblox", hrefLabel: "Ver curso",
      };
      return {
        title: "Diseño de Videojuegos con Roblox",
        desc: "Crean mundos y juegos desde cero, programan en Lua y comparten sus proyectos con la comunidad de Roblox.",
        color: "#FF6B35", emoji: "🎮",
        href: "/cursos/adolescentes/videojuegos-roblox", hrefLabel: "Ver curso",
      };
    }

    if (area === "design") {
      // Goal de trabajo/proyecto → UX/UI Diseño Web; fun/expresión → Contenido y video
      if (goal === "job" || goal === "project") return {
        title: "Diseño UX/UI Digital",
        desc: "Diseñan interfaces atractivas y usables. Figma, prototipado, pensamiento de diseño y portafolio para destacar profesionalmente.",
        color: "#9C27B0", emoji: "🎨",
        href: "/cursos/adolescentes/diseno-ux", hrefLabel: "Ver curso",
      };
      return {
        title: "Creación de Contenido y Video",
        desc: "Graban, editan y publican videos en TikTok, YouTube o Reels. Guion, producción y edición con herramientas accesibles desde el celular.",
        color: "#FF6B35", emoji: "🎬",
        href: "/cursos/adolescentes", hrefLabel: "Ver cursos",
      };
    }

    // area === "prog"
    if (goal === "project") return {
      title: "Emprendimiento e Intrapreneurship",
      desc: "Desarrollan actitud emprendedora: modelo de negocio, plan lean startup, estrategias de venta y metodologías ágiles para lanzar su propio proyecto.",
      color: "#7C3AED", emoji: "🚀",
      href: "/cursos/adolescentes", hrefLabel: "Ver cursos",
    };
    if (level === "adv" || (level === "inter" && goal === "job")) return {
      title: "Python Start I",
      desc: "El lenguaje más demandado. Variables, funciones, POO, gráficos con Turtle y juegos con PyGame. Proyectos reales para tu portafolio.",
      color: "#00C9FF", emoji: "🐍",
      href: "/cursos/adolescentes/python-teen", hrefLabel: "Ver curso",
    };
    return {
      title: "Desarrollo Web Profesional",
      desc: "HTML, CSS y JavaScript desde cero. Crean sitios web modernos y responsivos con proyectos reales en cada clase.",
      color: "#7C3AED", emoji: "🌐",
      href: "/cursos/adolescentes/web-dev-teen", hrefLabel: "Ver curso",
    };
  }

  // ── Adulto 18+ ────────────────────────────────────────────────────────────
  if (who === "adult") {
    if (area === "digital") return {
      title: "Alfabetización Digital para Adultos",
      desc: "Manejo de correo, apps esenciales y navegación segura en Internet. Un ambiente paciente, paso a paso y sin presiones.",
      color: "#FF6B35", emoji: "💡",
      href: "/cursos/adultos/alfabetizacion-digital", hrefLabel: "Ver curso",
    };

    if (area === "ai") return {
      title: "IA Aplicada — Sesiones Personalizadas",
      desc: "Sesiones individuales diseñadas a tus necesidades: automatización, ChatGPT, generación de contenido y análisis de datos con IA.",
      color: "#10B981", emoji: "🧠",
      href: "/cursos/adultos/ia-aplicada", hrefLabel: "Ver curso",
    };

    if (area === "design") {
      // Nivel básico/cero → contenido y video (más accesible); inter/adv → diseño web
      if (level === "inter" || level === "adv") return {
        title: "Desarrollo Web: HTML, CSS y JS",
        desc: "Diseña y construye sitios web modernos. Ideal para llevar tu marca, negocio o portafolio al siguiente nivel.",
        color: "#7C3AED", emoji: "🌐",
        href: "/cursos/adultos/web-html-css", hrefLabel: "Ver curso",
      };
      return {
        title: "Creación de Contenido y Video",
        desc: "Graba, edita y publica contenido profesional desde tu celular. Guion, producción y estrategia para redes sociales.",
        color: "#9C27B0", emoji: "🎬",
        href: "/cursos/adultos", hrefLabel: "Ver cursos",
      };
    }

    // area === "prog"
    if (goal === "project") return {
      title: "Emprendimiento e Intrapreneurship",
      desc: "Modelo de negocio, plan lean startup, investigación de mercados y estrategias de venta. Para quien quiere lanzar su propio proyecto.",
      color: "#7C3AED", emoji: "🚀",
      href: "/cursos/adultos", hrefLabel: "Ver cursos",
    };
    if (level === "adv") return {
      title: "React Avanzado",
      desc: "Lleva tu desarrollo web al siguiente nivel con React, hooks, estado global y patrones profesionales usados en la industria.",
      color: "#00C9FF", emoji: "⚛️",
      href: "/cursos/adultos/react-advanced", hrefLabel: "Ver curso",
    };
    if (level === "inter" && (goal === "job" || goal === "improve")) return {
      title: "Python para Principiantes",
      desc: "El lenguaje más demandado del mercado. Análisis de datos, automatización y proyectos reales con aplicación inmediata.",
      color: "#00C9FF", emoji: "🐍",
      href: "/cursos/adultos/python-basico", hrefLabel: "Ver curso",
    };
    return {
      title: "Desarrollo Web: HTML, CSS y JS",
      desc: "Crea sitios web modernos desde cero. El camino más directo hacia una carrera digital o tu propio proyecto en internet.",
      color: "#7C3AED", emoji: "🌐",
      href: "/cursos/adultos/web-html-css", hrefLabel: "Ver curso",
    };
  }

  return {
    title: "Diagnóstico personalizado gratuito",
    desc: "Habla con nuestro equipo para que diseñemos el camino perfecto para ti.",
    color: "#00C9FF", emoji: "🎯",
    href: "/contacto", hrefLabel: "Contactar con el equipo",
  };
}

// ─── Componente principal ────────────────────────────────────────────────────
export function TestPage() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const { theme } = useTheme();

  const totalSteps = answers.who === "company" ? 2 : 4;
  const progress = step < 0 ? 0 : ((step + 1) / totalSteps) * 100;
  const currentQ = step >= 0 ? getQuestion(step, answers) : null;

  const handleAnswer = (value: string) => {
    if (!currentQ) return;
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    const isDone =
      (newAnswers.who === "company" && step === 1) ||
      (newAnswers.who !== "company" && step === 3);

    setTimeout(() => {
      if (isDone) setDone(true);
      else setStep(step + 1);
    }, 300);
  };

  const handleBack = () => {
    if (step <= 0) return;
    const q = getQuestion(step, answers);
    if (q) {
      const cleaned = { ...answers };
      delete cleaned[q.id];
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

  const cardBg = {
    background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
    border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
  };

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
              Preguntas adaptadas a tu perfil. Resultado inmediato y 100% personalizado.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* TEST */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Barra de progreso */}
          {step >= 0 && !done && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 dark:text-white/40 text-sm">
                  Pregunta {step + 1} de {totalSteps}
                </span>
                <span className="text-gray-500 dark:text-white/40 text-sm">
                  {Math.round(progress)}%
                </span>
              </div>
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${progress}%`, background: "linear-gradient(90deg, #00C9FF, #7C3AED)", transition: "width 0.5s ease" }}
                />
              </div>
            </div>
          )}

          {/* INTRO */}
          {step === -1 && !done && (
            <div className="p-8 rounded-3xl text-center shadow-md dark:shadow-none" style={cardBg}>
              <div style={{ fontSize: "4rem" }} className="mb-6">🎮</div>
              <h2 className="text-gray-900 dark:text-white mb-4" style={{ fontWeight: 800, fontSize: "1.5rem" }}>
                ¿Estás listo?
              </h2>
              <p className="text-gray-600 dark:text-white/60 mb-8 leading-relaxed">
                Responde algunas preguntas rápidas y te diremos exactamente qué curso de GŌKU LAB es el indicado para ti o tu familia.
              </p>
              <div className="flex flex-col gap-3 text-sm text-gray-500 dark:text-white/50 mb-8">
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
              className="p-8 rounded-3xl shadow-md dark:shadow-none"
              style={{ ...cardBg, animation: "slideIn 0.35s ease" }}
            >
              <div className="text-4xl mb-5">{currentQ.emoji}</div>
              <h2 className="text-gray-900 dark:text-white mb-2" style={{ fontWeight: 800, fontSize: "1.5rem" }}>
                {currentQ.title}
              </h2>
              <p className="text-gray-500 dark:text-white/55 mb-8">{currentQ.subtitle}</p>

              <div className={`grid gap-3 ${currentQ.options.length === 2 ? "grid-cols-2" : "grid-cols-2"}`}>
                {currentQ.options.map((opt) => {
                  const selected = answers[currentQ.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswer(opt.id)}
                      className="p-5 rounded-2xl text-left flex flex-col gap-2"
                      style={{
                        background: selected ? `${opt.color}15` : (theme === "dark" ? "rgba(255,255,255,0.04)" : "#f9fafb"),
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
                        className="text-sm leading-snug"
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
            <div className="rounded-3xl overflow-hidden shadow-lg dark:shadow-none" style={{ ...cardBg, animation: "slideIn 0.35s ease" }}>
              <div
                className="p-8 text-center"
                style={{
                  background: theme === "dark"
                    ? `linear-gradient(135deg, ${result.color}15, ${result.color}05)`
                    : `linear-gradient(135deg, ${result.color}10, transparent)`,
                  borderBottom: `1px solid ${result.color}20`,
                }}
              >
                <div style={{ fontSize: "4rem" }} className="mb-4">{result.emoji}</div>
                <div className="inline-block px-4 py-1 rounded-full text-sm mb-4 font-semibold" style={{ background: result.color, color: "#fff" }}>
                  Tu recomendación
                </div>
                <h2 className="text-gray-900 dark:text-white mb-3" style={{ fontWeight: 800, fontSize: "1.5rem" }}>
                  {result.title}
                </h2>
                <p className="text-gray-600 dark:text-white/65 leading-relaxed">{result.desc}</p>
              </div>

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
                  className="flex items-center gap-3 p-4 rounded-2xl"
                  style={{ background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#f9fafb" }}
                >
                  <CheckCircle size={18} className="text-[#10B981] shrink-0" />
                  <p className="text-gray-600 dark:text-white/55 text-sm">
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

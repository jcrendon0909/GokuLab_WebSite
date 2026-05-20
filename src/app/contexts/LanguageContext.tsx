import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Header
    "nav.home": "Inicio",
    "nav.about": "Nosotros",
    "nav.courses": "Cursos",
    "nav.methodology": "Metodología",
    "nav.test": "Diagnóstico",
    "nav.events": "Eventos",
    "nav.support": "Apoyos",
    "nav.contact": "Contacto",
    "nav.kids": "🧒 Niñas, niños y adolescentes",
    "nav.adults": "👨‍💼 Para adultos",
    "nav.corporate": "🏢 Empresas y gobierno",
    "cta.test": "Diagnóstico",
    "cta.schedule": "Agendar masterclass gratuita",
    "cta.schedule.free": "Agendar masterclass gratuita",

    // Hero
    "hero.badge": "Academia tecnológica para todos",
    "hero.title.1": "Activa tu",
    "hero.title.2": "superpoder",
    "hero.title.3": "tecnológico",
    "hero.subtitle": "Niños, adolescentes, adultos y empresas. Aprende programación, robótica, diseño e inteligencia artificial con proyectos reales desde el primer día.",
    "hero.cta.whatsapp": "Agenda tu masterclass gratuita",
    "hero.cta.test": "Diagnóstico",

    // Stats
    "stats.students": "Alumnos formados",
    "stats.satisfaction": "Satisfacción general",
    "stats.companies": "Organizaciones capacitadas",
    "stats.technologies": "Tecnologías activas",

    // Segments Corregidos de acuerdo al Documento Oficial
    "segment.kids.title": "Niñas, niños y adolescentes",
    "segment.kids.subtitle": "5 - 18 años",
    "segment.kids.desc": "Se inician en programación, robótica, diseño, Python e IA. Aprendizaje dinámico enfocado en crear con tecnología a través de atractivos retos gamiﬁcados.",
    "segment.adults.title": "Para adultos",
    "segment.adults.subtitle": "18+ años",
    "segment.adults.desc": "Se familiarizan paso a paso con computadoras, celulares, herramientas digitales básicas e Inteligencia Artificial en sesiones de consultoría personalizadas.",
    "segment.corporate.title": "Empresas y gobierno",
    "segment.corporate.subtitle": "Soluciones corporativas",
    "segment.corporate.desc": "Programas de formación tecnológica, liderazgo e inclusión digital diseñados a la medida, con horarios y duración personalizados según los objetivos de la organización.",

    // Common
    "common.viewCourses": "Ver cursos",
    "common.viewMore": "Ver más",
    "common.viewAll": "Ver todos",
  },
  en: {
    // Header
    "nav.home": "Home",
    "nav.about": "About",
    "nav.courses": "Courses",
    "nav.methodology": "Methodology",
    "nav.test": "Diagnostic",
    "nav.events": "Events",
    "nav.support": "Support",
    "nav.contact": "Contact",
    "nav.kids": "🧒 Kids & Teens",
    "nav.adults": "👨‍💼 For Adults",
    "nav.corporate": "🏢 Enterprise & Government",
    "cta.test": "Diagnostic",
    "cta.schedule": "Schedule free masterclass",
    "cta.schedule.free": "Schedule free masterclass",

    // Hero
    "hero.badge": "Technology academy for everyone",
    "hero.title.1": "Activate your",
    "hero.title.2": "tech",
    "hero.title.3": "superpower",
    "hero.subtitle": "Kids, teens, adults and companies. Learn programming, robotics, design and artificial intelligence with real projects from day one.",
    "hero.cta.whatsapp": "Schedule your free masterclass",
    "hero.cta.test": "Diagnostic",

    // Stats
    "stats.students": "Students trained",
    "stats.satisfaction": "Overall satisfaction",
    "stats.companies": "Organizations trained",
    "stats.technologies": "Active technologies",

    // Segments Corrected in English
    "segment.kids.title": "Kids & Teens",
    "segment.kids.subtitle": "5 - 18 years",
    "segment.kids.desc": "Get started in programming, robotics, design, Python, and AI. Dynamic learning focused on creating with technology through attractive gamified challenges.",
    "segment.adults.title": "For Adults",
    "segment.adults.subtitle": "18+ years",
    "segment.adults.desc": "Get familiar step by step with computers, cell phones, basic digital tools, and Artificial Intelligence in personalized consultation sessions.",
    "segment.corporate.title": "Enterprise & Government",
    "segment.corporate.subtitle": "Corporate solutions",
    "segment.corporate.desc": "Technology training, leadership, and digital inclusion programs tailored to your needs, with customized schedules and durations based on organizational goals.",

    // Common
    "common.viewCourses": "View courses",
    "common.viewMore": "View more",
    "common.viewAll": "View all",
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
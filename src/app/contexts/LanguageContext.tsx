import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en" | "pt";

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
    "nav.test": "Test",
    "nav.events": "Eventos",
    "nav.support": "Apoyos",
    "nav.contact": "Contacto",
    "nav.kids": "🧒 Niños y adolescentes",
    "nav.adults": "👨‍💼 Para adultos",
    "nav.corporate": "🏢 Empresas y gobierno",
    "cta.test": "Hacer test",
    "cta.schedule": "Agendar masterclass gratuita",
    "cta.schedule.free": "Agendar masterclass gratuita",

    // Hero
    "hero.badge": "Academia tecnológica para todos",
    "hero.title.1": "Activa tu",
    "hero.title.2": "superpoder",
    "hero.title.3": "tecnológico",
    "hero.subtitle": "Niños, adolescentes, adultos y empresas. Aprende programación, robótica, diseño e inteligencia artificial con proyectos reales desde el primer día.",
    "hero.cta.whatsapp": "Agenda tu masterclass gratuita",
    "hero.cta.test": "Hacer el test",

    // Stats
    "stats.students": "Alumnos formados",
    "stats.satisfaction": "Satisfacción general",
    "stats.companies": "Organizaciones capacitadas",
    "stats.technologies": "Tecnologías activas",

    // Segments
    "segment.kids.title": "Niños y adolescentes",
    "segment.kids.subtitle": "6 - 17 años",
    "segment.kids.desc": "Scratch, Robótica, Minecraft EDU, App Inventor y más. Aprendizaje dinámico y divertido.",
    "segment.adults.title": "Para adultos",
    "segment.adults.subtitle": "18+ años",
    "segment.adults.desc": "Python, JavaScript, diseño web y más. Actualízate profesionalmente y abre nuevas oportunidades.",
    "segment.corporate.title": "Empresas y gobierno",
    "segment.corporate.subtitle": "Soluciones corporativas",
    "segment.corporate.desc": "Transforma tu organización con tecnología. Formatos presencial, híbrido o en línea. Cotización personalizada.",

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
    "nav.test": "Test",
    "nav.events": "Events",
    "nav.support": "Support",
    "nav.contact": "Contact",
    "nav.kids": "🧒 Kids & Teens",
    "nav.adults": "👨‍💼 For Adults",
    "nav.corporate": "🏢 Enterprise & Government",
    "cta.test": "Take test",
    "cta.schedule": "Schedule free masterclass",
    "cta.schedule.free": "Schedule free masterclass",

    // Hero
    "hero.badge": "Technology academy for everyone",
    "hero.title.1": "Activate your",
    "hero.title.2": "tech",
    "hero.title.3": "superpower",
    "hero.subtitle": "Kids, teens, adults and companies. Learn programming, robotics, design and artificial intelligence with real projects from day one.",
    "hero.cta.whatsapp": "Schedule your free masterclass",
    "hero.cta.test": "Take the test",

    // Stats
    "stats.students": "Students trained",
    "stats.satisfaction": "Overall satisfaction",
    "stats.companies": "Organizations trained",
    "stats.technologies": "Active technologies",

    // Segments
    "segment.kids.title": "Kids & Teens",
    "segment.kids.subtitle": "6 - 17 years",
    "segment.kids.desc": "Scratch, Robotics, Minecraft EDU, App Inventor and more. Dynamic and fun learning.",
    "segment.adults.title": "For Adults",
    "segment.adults.subtitle": "18+ years",
    "segment.adults.desc": "Python, JavaScript, web design and more. Update yourself professionally and open new opportunities.",
    "segment.corporate.title": "Enterprise & Government",
    "segment.corporate.subtitle": "Corporate solutions",
    "segment.corporate.desc": "Transform your organization with technology. In-person, hybrid or online formats. Customized quotes.",

    // Common
    "common.viewCourses": "View courses",
    "common.viewMore": "View more",
    "common.viewAll": "View all",
  },
  pt: {
    // Header
    "nav.home": "Início",
    "nav.about": "Sobre nós",
    "nav.courses": "Cursos",
    "nav.methodology": "Metodologia",
    "nav.test": "Teste",
    "nav.events": "Eventos",
    "nav.support": "Apoios",
    "nav.contact": "Contato",
    "nav.kids": "🧒 Crianças e adolescentes",
    "nav.adults": "👨‍💼 Para adultos",
    "nav.corporate": "🏢 Empresas e governo",
    "cta.test": "Fazer teste",
    "cta.schedule": "Agendar masterclass gratuita",
    "cta.schedule.free": "Agendar masterclass gratuita",

    // Hero
    "hero.badge": "Academia de tecnologia para todos",
    "hero.title.1": "Ative seu",
    "hero.title.2": "superpoder",
    "hero.title.3": "tecnológico",
    "hero.subtitle": "Crianças, adolescentes, adultos e empresas. Aprenda programação, robótica, design e inteligência artificial com projetos reais desde o primeiro dia.",
    "hero.cta.whatsapp": "Agende sua masterclass gratuita",
    "hero.cta.test": "Fazer o teste",

    // Stats
    "stats.students": "Alunos formados",
    "stats.satisfaction": "Satisfação geral",
    "stats.companies": "Organizações capacitadas",
    "stats.technologies": "Tecnologias ativas",

    // Segments
    "segment.kids.title": "Crianças e adolescentes",
    "segment.kids.subtitle": "6 - 17 anos",
    "segment.kids.desc": "Scratch, Robótica, Minecraft EDU, App Inventor e mais. Aprendizado dinâmico e divertido.",
    "segment.adults.title": "Para adultos",
    "segment.adults.subtitle": "18+ anos",
    "segment.adults.desc": "Python, JavaScript, design web e mais. Atualize-se profissionalmente e abra novas oportunidades.",
    "segment.corporate.title": "Empresas e governo",
    "segment.corporate.subtitle": "Soluções corporativas",
    "segment.corporate.desc": "Transforme sua organização com tecnologia. Formatos presencial, híbrido ou online. Orçamento personalizado.",

    // Common
    "common.viewCourses": "Ver cursos",
    "common.viewMore": "Ver mais",
    "common.viewAll": "Ver todos",
  },
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

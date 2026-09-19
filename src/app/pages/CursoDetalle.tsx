import { Link, useParams } from "react-router";
import { useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { useTheme } from "next-themes";
import {
  Clock, Users, BarChart2, Monitor, CheckCircle, Star,
  MessageCircle, ChevronLeft, Zap
} from "lucide-react";

const KIDS_IMG = "https://images.unsplash.com/photo-1603354350266-a8de3496163b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800";
const ADULT_IMG = "https://images.unsplash.com/photo-1724260793422-7754e5d06fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800";
const TEEN_IMG = "https://images.unsplash.com/photo-1635959952534-d99f969554a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800";

const courses: Record<string, any> = {
  "fundamentos-programacion": {
    title: "Fundamentos de la programación",
    subtitle: "Aprende creando desde el primer día",
    color: "#FF6B35",
    img: KIDS_IMG,
    emoji: "🧩",
    age: "5-7 años",
    level: "Básico",
    duration: "8 meses +",
    modality: "Presencial",
    price: "desde $1600",
    techs: ["Scratch Jr", "Lógica", "Algorithmics"],
    learns: [
      "Dar sentido a algoritmos",
      "Secuencias lineales y no lineales",
      "Crear juegos y animaciones con bloques en Scratch Jr",
      "Emplear ciclos",
      "Eventos y condicionales",
      "Colaborar y presentar sus proyectos",
      "Resolver problemas con pensamiento lógico"
    ],
    benefits: [
      "Refuerzan el pensamiento computacional",
      "Mejoran comunicación y trabajo en equipo",
      "Desarrollan creatividad y conﬁanza",
      "Fomentan la curiosidad y el aprendizaje autónomo"
    ],
    results: ["Desarrollo del pensamiento computacional", "Creación de proyectos interactivos en Scratch Jr", "Bases de lógica de programación"],
    testimonials: [{ name: "Familia GOKU LAB", text: "Excelente aproximación a la lógica desde pequeños.", rating: 5 }]
  },
  "alfabetizacion-peques": {
    title: "Alfabetización digital (Peques)",
    subtitle: "Aprende creando desde el primer día",
    color: "#4CAF50",
    img: KIDS_IMG,
    emoji: "🖱️",
    age: "7-14 años",
    level: "Básico",
    duration: "8 meses +",
    modality: "Presencial",
    price: "desde $1600",
    techs: ["Google Suite", "Mecanografía", "Ciberseguridad"],
    learns: [
      "Manejo de documentos",
      "Presentaciones y tablas con infografías",
      "Mecanografía",
      "Navegación segura",
      "Ciberseguridad y detección de fake news",
      "Uso de correo electrónico",
      "Registro web y almacenamiento en la nube",
      "Creación de imágenes digitales y conceptos básicos de diseño",
      "Manejo de aplicaciones de la Suite de Google (Excel, Word, PPT…)"
    ],
    benefits: [
      "Refuerzan la autonomía y competencias digitales",
      "Desarrollan seguridad y responsabilidad Online",
      "Potencian pensamiento crítico y organización",
      "Adquieren habilidades útiles para el cole y la vida diaria"
    ],
    results: ["Uso seguro y responsable de internet", "Manejo eficiente de herramientas digitales", "Agilidad en mecanografía y Suite de Google"],
    testimonials: [{ name: "Mamá GOKU LAB", text: "Muy útil para las tareas diarias de la escuela.", rating: 5 }]
  },
  "programacion-visual": {
    title: "Programación visual",
    subtitle: "Aprende creando desde el primer día",
    color: "#1E88E5",
    img: KIDS_IMG,
    emoji: "🐱",
    age: "7-11 años",
    level: "Básico-Intermedio",
    duration: "8 meses +",
    modality: "Presencial, Online, Hibrido",
    price: "desde $1600",
    techs: ["Scratch", "Bloques", "Animación"],
    learns: [
      "Estructurar un proyecto para llevarlo a cabo",
      "Aplicaciones de la programación en diferentes formatos",
      "El funcionamiento de todos los bloques de Scratch",
      "Contar historias con imágenes y sonidos",
      "Los fundamentos de la programación"
    ],
    benefits: [
      "Refuerzan el pensamiento lógico-matemático y la resolución de problemas",
      "Descubrirán un formato nuevo con el que expresar sus ideas",
      "Trabajan la paciencia, resiliencia y tolerancia a la frustración",
      "Construyen un porfolio de proyectos reales desde el primer día",
      "Adquieren unas competencias lógicas que en un futuro les permitirán aprender nuevos lenguajes"
    ],
    results: ["Construcción de animaciones y juegos complejos", "Porfolio de proyectos reales activos", "Desarrollo de competencias lógicas"],
    testimonials: [{ name: "Alumno de Bloques", text: "Me encanta diseñar mis propios videojuegos.", rating: 5 }]
  },
  "diseno-grafico": {
    title: "Diseño gráfico",
    subtitle: "Aprende creando desde el primer día",
    color: "#E91E63",
    img: TEEN_IMG,
    emoji: "🎨",
    age: "9-18 años",
    level: "Todos los niveles",
    duration: "8 meses +",
    modality: "Presencial, Online, Hibrido",
    price: "desde $1600",
    techs: ["Vectores", "3D", "Collage", "Diseño"],
    learns: [
      "Componer diseños equilibrados con color y espacio",
      "Retocar imágenes y montar collages creativos",
      "Dibujar en vector",
      "Diseñar logotipos e infografías",
      "Modelar en 3D y ajustar luces y sombras"
    ],
    benefits: [
      "Potencian la creatividad y el pensamiento visual",
      "Refuerzan la comunicación y la transmisión de ideas",
      "Adquieren competencias técnicas de diseño gráﬁco",
      "Ganan conﬁanza al presentar y compartir sus creaciones",
      "Trabajan el concepto de armonía"
    ],
    results: ["Proyectos visuales vectoriales e ilustraciones", "Modelados iniciales en entornos 3D", "Comprensión técnica del diseño gráfico"],
    testimonials: [{ name: "Papá de Sofía", text: "Ha mejorado muchísimo su expresión visual.", rating: 5 }]
  },
  "videojuegos-roblox": {
    title: "Diseño de videojuegos con Roblox",
    subtitle: "Aprende creando desde el primer día",
    color: "#E53E3E",
    img: TEEN_IMG,
    emoji: "🎮",
    age: "10 años en adelante",
    level: "Intermedio",
    duration: "8 meses +",
    modality: "Presencial, Online, Hibrido",
    price: "desde $1600",
    techs: ["Roblox Studio", "Lua", "Diseño 3D"],
    learns: [
      "Dominan Roblox Studio para diseñar escenarios, mundos y personajes 3D",
      "Escribir scripts en Lua para puzzles, misiones, etc…",
      "Dominar conceptos importantes de la física a través de un entorno virtual",
      "Estructurar historias y niveles resolviendo acertijos y desafíos lógicos",
      "Colaborar en equipo, presentar proyectos y dar y recibir feedback"
    ],
    benefits: [
      "Desarrollan pensamiento lógico",
      "Potencia tanto la creatividad como el diseño",
      "Mejoran la colaboración y comunicación",
      "Fomenta el pensamiento espacial y potencia las habilidades de ingeniería"
    ],
    results: ["Mundos virtuales funcionales publicados", "Lógica de scripts desarrollados en Lua", "Habilidades aplicadas de diseño de niveles"],
    testimonials: [{ name: "Mamá de Mateo", text: "Pasó de solo jugar a crear sus propias mecánicas.", rating: 5 }]
  },
  "unity": {
    title: "Unity",
    subtitle: "Aprende creando desde el primer día",
    color: "#9C27B0",
    img: TEEN_IMG,
    emoji: "👾",
    age: "10 años en adelante",
    level: "Avanzado",
    duration: "8 meses +",
    modality: "Presencial, Online, Hibrido",
    price: "desde $1600",
    techs: ["Unity", "C#", "Animator", "Android"],
    learns: [
      "Unity: manejo de objetos, prefabs, materiales y prototipos",
      "C#: lógica, bucles, clases y eventos de usuario",
      "Diseño de niveles 3D con iluminación y efectos",
      "Animación 2D y 3D con Animator",
      "Publicación de juegos en Android y Play Market"
    ],
    benefits: [
      "Potencian su creatividad y pensamiento crítico",
      "Refuerzan organización y trabajo en equipo",
      "Desarrollan competencias técnicas con un motor profesio-nal",
      "Construyen un portafolio real que impulsa su conﬁanza"
    ],
    results: ["Creación y gestión de prototipos complejos", "Estructuración de scripts de videojuegos en C#", "Publicación autónoma en plataformas móviles"],
    testimonials: [{ name: "Daniel R.", text: "Es como trabajar en un estudio real de programación.", rating: 5 }]
  },
  "ia-ninos": {
    title: "Inteligencia artificial (niños)",
    subtitle: "Aprende creando desde el primer día",
    color: "#00C9FF",
    img: TEEN_IMG,
    emoji: "🤖",
    age: "12 años en adelante",
    level: "Intermedio",
    duration: "8 meses +",
    modality: "Presencial, Online, Hibrido",
    price: "desde $1600",
    techs: ["Prompts", "Blender", "IA Generativa", "Código"],
    learns: [
      "Ingeniería de prompts y generación de texto",
      "Producción de código y prototipos web asistidos por IA",
      "Creación de gráﬁcos, música y vídeo generativo",
      "Modelado 3D en Blender bajo el apoyo de IA",
      "Aplicación de IA a retos escolares y cotidianos"
    ],
    benefits: [
      "Dominan herramientas del futuro y pensamiento crítico",
      "Potencian creatividad y habilidades multidisciplinares",
      "Mejoran comunicación y trabajo en equipo",
      "Construyen un portafolio innovador con proyectos de IA",
      "Entenderán cómo funciona la IA y el porqué de sus resultados",
      "Cómo aplicarla de forma ética y creativa"
    ],
    results: ["Prototipos multimedia generados éticamente", "Optimización de proyectos con asistencia técnica", "Portafolio vanguardista de Inteligencia Artificial"],
    testimonials: [{ name: "Instructor GOKU LAB", text: "Sorprende la velocidad con la que aplican los prompts.", rating: 5 }]
  },
  "diseno-web": {
    title: "Diseño web",
    subtitle: "Aprende creando desde el primer día",
    color: "#7C3AED",
    img: TEEN_IMG,
    emoji: "🌐",
    age: "12 años en adelante",
    level: "Básico",
    duration: "8 meses +",
    modality: "Presencial, Online, Hibrido",
    price: "desde $1600",
    techs: ["UX/UI", "Portafolio", "Diseño web"],
    learns: [
      "A diseñar sitios web visualmente atractivos y fáciles de usar, con foco en UX/UI",
      "A crear contenido para su portafolio personal y adaptarlo a dispositivos móviles",
      "A planiﬁcar, diseñar y estructurar una web, sin necesidad de saber programar",
      "A trabajar en equipo: compartir ideas, organizar tareas y dar y recibir feedback"
    ],
    benefits: [
      "Desarrollan habilidades digitales clave para cualquier carrera del futuro",
      "Potencian su creatividad, autonomía y capacidad para resolver problemas",
      "Se expresan a través de proyectos propios y únicos",
      "Ganan conﬁanza al ver sus ideas hechas realidad en Internet"
    ],
    results: ["Portafolios web funcionales publicados", "Diseño web estructurado responsivo", "Habilidades prácticas en layouts interactivos"],
    testimonials: [{ name: "Papá de Clara", text: "Creó su propia página web desde cero.", rating: 5 }]
  },
  "robotica-1": {
    title: "Robótica I",
    subtitle: "Aprende creando desde el primer día",
    color: "#FF9800",
    img: KIDS_IMG,
    emoji: "🦾",
    age: "8 - 15 años",
    level: "Básico",
    duration: "8 meses +",
    modality: "Presencial",
    price: "desde $1600",
    techs: ["Sensores", "Mecánica", "Programación"],
    learns: [
      "Aprenden principios de mecánica",
      "Sensores y programación lógica para que el robot responda a instrucciones y estímulos del entorno"
    ],
    benefits: [
      "Desarrollan pensamiento lógico",
      "Creatividad y trabajo en equipo",
      "Habilidades clave para la solución de problemas en cualquier área de la empresa o entidad educativa"
    ],
    results: ["Construcción y calibración de prototipos mecánicos", "Programación lógica aplicada a componentes físicos", "Trabajo en equipo en misiones de robótica"],
    testimonials: [{ name: "Familia GOKU LAB", text: "Le encanta ver cómo responde el robot en la pista.", rating: 5 }]
  },
  "animacion-digital": {
    title: "Animación Digital",
    subtitle: "Aprende creando desde el primer día",
    color: "#F44336",
    img: TEEN_IMG,
    emoji: "🎬",
    age: "12 años en adelante",
    level: "Básico",
    duration: "8 meses +",
    modality: "Presencial",
    price: "desde $1600",
    techs: ["Fotogramas", "Dibujo digital", "Movimiento"],
    learns: [
      "Aprenden conceptos básicos de dibujo digital",
      "Fotogramas, movimiento y tiempo",
      "Técnicas para dar vida a ideas visuales"
    ],
    benefits: [
      "Pueden diseñar materiales animados para comunicar mejor procesos, campañas internas o mensajes de seguridad",
      "Haciendo la información más clara y memorable"
    ],
    results: ["Animaciones funcionales de objetos y personajes", "Manejo básico de software de dibujo digital", "Creación de cortometrajes animados guiados"],
    testimonials: [{ name: "Estudiante GOKU LAB", text: "Darle vida a mis propios dibujos es lo mejor.", rating: 5 }]
  },
  "creacion-contenido": {
    title: "Creación de contenido y video",
    subtitle: "Aprende creando desde el primer día",
    color: "#E91E63",
    img: TEEN_IMG,
    emoji: "📱",
    age: "12 años en adelante",
    level: "Todos los niveles",
    duration: "8 meses +",
    modality: "Presencial",
    price: "desde $1600",
    techs: ["Edición", "Guión", "Storyboard"],
    learns: [
      "Aprenden a planear contenido (guion, storyboard, mensaje clave)",
      "A grabar con buena imagen y audio",
      "A editar con apps amigables para su edad",
      "Desarrollan criterios para publicar de manera responsable: derechos de autor básicos, privacidad, seguridad digital y cómo transmitir mensajes claros y positivos"
    ],
    benefits: [
      "Ganan seguridad para expresarse frente a la cámara",
      "Comunicar ideas, proyectos escolares o causas que les importan",
      "Desarrollan creatividad, pensamiento crítico y habilidades digitales que pueden usar en la escuela",
      "Emprendimientos futuros o contenidos para iniciativas como GOKU LAB + ALGORITHMICS y programas sociales aliados"
    ],
    results: ["Edición y postproducción de clips de video cortos", "Estructuración correcta de guiones y storyboards", "Criterio ético y seguro de publicación digital"],
    testimonials: [{ name: "Papá de Leo", text: "Edita sus videos con mucha calidad y cuidado.", rating: 5 }]
  },
  "python-start-1": {
    title: "Python Start I",
    subtitle: "Aprende creando desde el primer día",
    color: "#4CAF50",
    img: TEEN_IMG,
    emoji: "🐍",
    age: "12 años en adelante",
    level: "Intermedio",
    duration: "8 meses +",
    modality: "Presencial",
    price: "desde $1600",
    techs: ["Python", "PyGame", "Turtle"],
    learns: [
      "Comprenden los conceptos básicos de los algoritmos y la programación orientada a objetos",
      "Trabajan con gráficos y usan la biblioteca Turtle",
      "Desarrollan juegos gráficos interactivos para PC utilizando la biblioteca PyGame",
      "Resuelven tareas reales y problemas matemáticos usando Python, aplicando un enfoque iterativo",
      "Aplican los principios del trabajo por proyectos"
    ],
    benefits: [
      "Refuerzan el pensamiento lógico y la resolución de problemas",
      "Construyen un porfolio de proyectos reales desde el primer día",
      "Ganan experiencia con herramientas profesionales de desarrollo",
      "Mejoran la comunicación y la colaboración en equipo",
      "Desarrollan confianza al presentar y defender sus creaciones"
    ],
    results: ["Desarrollo de videojuegos de escritorio interactivos", "Lógica algorítmica estructurada en código puro", "Porfolio de proyectos técnicos iniciales"],
    testimonials: [{ name: "Alumno de Python", text: "Resolver problemas reales con código es genial.", rating: 5 }]
  },
  "emprendimiento": {
    title: "Emprendimiento (intrapreneurship)",
    subtitle: "Aprende creando desde el primer día",
    color: "#FFC107",
    img: TEEN_IMG,
    emoji: "🚀",
    age: "12 años en adelante",
    level: "Básico-Intermedio",
    duration: "8 meses +",
    modality: "Presencial",
    price: "desde $1600",
    techs: ["Lean Startup", "Modelo de negocios", "Ventas"],
    learns: [
      "Aplican metodologías para el desarrollo de oportunidades de emprendimiento",
      "Profesionalizan proyectos de emprendimiento: generan modelo de negocios, plan de negocios y metodología ágil lean startup",
      "Adquieren herramientas para las ventas efectivas"
    ],
    benefits: [
      "Aplican sus conocimientos en productos y/o servicios de organizaciones a las que pertenezcan o bien para su propio proyecto de emprendimiento",
      "Desarrollan la guía de trabajo para echar a andar proyectos propios o de entidades económicas a las que pertenecen",
      "Aprenden a observar y perfilar el mercado objetivo, para dirigir la investigación de mercados, estrategias de mercadotecnia y la publicidad para ventas efectivas"
    ],
    results: ["Validación de modelos de negocio ágiles", "Estructuración formal de planes de negocio", "Técnicas profesionales de ventas estratégicas"],
    testimonials: [{ name: "Emprendedor Joven", text: "Me dio orden y estructura para mis proyectos.", rating: 5 }]
  },
  "ingles": {
    title: "Inglés",
    subtitle: "Aprende creando desde el primer día",
    color: "#3F51B5",
    img: TEEN_IMG,
    emoji: "🗣️",
    age: "12 años en adelante",
    level: "Todos los niveles",
    duration: "8 meses +",
    modality: "Presencial",
    price: "desde $1600",
    techs: ["Gramática", "Conversación", "Comprensión"],
    learns: [
      "Aprenden vocabulario y gramática desde lo cotidiano (presentarse, hablar de gustos, escuela y familia) hasta temas académicos y profesionales",
      "Desarrollan comprensión auditiva y de lectura, escritura clara de textos y correos",
      "En niveles tipo teacher aprenden a explicar reglas, dar instrucciones, corregir errores y planear actividades sencillas para otros"
    ],
    benefits: [
      "Ganan confianza para comunicarse en inglés en viajes, escuela, exámenes y contextos internacionales, desde los primeros niveles",
      "Al llegar a los niveles tipo teacher, desarrollan un dominio sólido del idioma",
      "Habilidades de liderazgo y de comunicación que pueden usar para tutorías, apoyo escolar, presentaciones profesionales y futuros estudios relacionados con la enseñanza"
    ],
    results: ["Fluidez interactiva oral y escrita", "Comprensión analítica de textos auténticos", "Habilidades comunicativas y de liderazgo avanzado"],
    testimonials: [{ name: "Estudiante Inglés", text: "Las dinámicas orales son sumamente dinámicas.", rating: 5 }]
  },
  "regularizacion-matematicas": {
    title: "Regularización en Matemáticas",
    subtitle: "Aprende creando desde el primer día",
    color: "#00BCD4",
    img: TEEN_IMG,
    emoji: "➗",
    age: "12 años en adelante",
    level: "Personalizado",
    duration: "8 meses +",
    modality: "Presencial",
    price: "desde $1600",
    techs: ["Álgebra", "Geometría", "Fracciones"],
    learns: [
      "Aprenden a dominar operaciones básicas, fracciones, álgebra, geometría, funciones y otros temas clave según su nivel escolar",
      "Desarrollan métodos claros para resolver problemas, interpretar enunciados, comprobar resultados y usar estrategias que les permiten avanzar solos"
    ],
    benefits: [
      "Mejoran sus calificaciones",
      "Recuperan confianza en su capacidad para las matemáticas y dejan de ver la materia como un “problema imposible”",
      "Desarrollan pensamiento lógico, atención al detalle y perseverancia",
      "Habilidades que se trasladan a otras materias, a exámenes de ingreso y a proyectos de vida académica y profesional"
    ],
    results: ["Comprensión clara de enunciados complejos", "Estrategias autónomas de resolución matemática", "Nivelación escolar e incremento de notas"],
    testimonials: [{ name: "Mamá de Andrea", text: "Es una gran guía personalizada.", rating: 5 }]
  },
  "preparacion-universidad": {
    title: "Preparación para Universidad",
    subtitle: "Aprende creando desde el primer día",
    color: "#8BC34A",
    img: TEEN_IMG,
    emoji: "🎓",
    age: "12 años en adelante",
    level: "Avanzado",
    duration: "8 meses +",
    modality: "Presencial",
    price: "desde $1600",
    techs: ["Simulacros", "Razonamiento", "Matemáticas"],
    learns: [
      "Aprenden los contenidos fundamentales que más se preguntan en estos exámenes (álgebra, aritmética, lectura crítica, gramática, ciencias, etc.)",
      "Cómo se formulan las preguntas tipo opción múltiple",
      "Desarrollan técnicas de estudio, organización del tiempo, manejo de nervios",
      "Estrategias específicas para contestar cuando dudan entre varias respuestas"
    ],
    benefits: [
      "Aumentan significativamente sus posibilidades de obtener un buen puntaje y lograr el ingreso a la universidad de su elección",
      "Ganan seguridad, disciplina de estudio y habilidades de razonamiento que les sirven tanto para el examen como para iniciar la vida universitaria con una base académica más sólida"
    ],
    results: ["Manejo estratégico de tiempos en pruebas simuladas", "Dominio temático de áreas clave de ingreso", "Técnicas de control de nervios y descarte"],
    testimonials: [{ name: "Aspirante UNAM", text: "Los simulacros son idénticos a los reales.", rating: 5 }]
  },
  "alfabetizacion-adultos": {
    title: "Alfabetización Digital (Adultos)",
    subtitle: "Aprende creando desde el primer día",
    color: "#FF6B35",
    img: ADULT_IMG,
    emoji: "💻",
    age: "18-99 años",
    level: "Básico",
    duration: "8 meses +",
    modality: "Presencial",
    price: "desde $1600",
    techs: ["Navegación", "Correo", "Apps"],
    learns: [
      "Aprenden a manejar correo electrónico",
      "Aplicaciones esenciales",
      "Navegación segura en internet",
      "Uso de plataformas que la empresa utiliza"
    ],
    benefits: [
      "Pierden el miedo a la tecnología",
      "Se vuelven más autónomos",
      "Pueden integrarse mejor a procesos digitales dentro y fuera del trabajo",
      "INCLUSIÓN DIGITAL"
    ],
    results: ["Independencia en navegación y uso de dispositivos", "Manejo completo de canales de comunicación digital", "Inclusión digital en entornos sociales y profesionales"],
    testimonials: [{ name: "Don Roberto", text: "Excelente paciencia para explicar paso a paso.", rating: 5 }]
  },
  "ia-adultos": {
    title: "Inteligencia artificial (adultos)",
    subtitle: "Aprende creando desde el primer día",
    color: "#10B981",
    img: ADULT_IMG,
    emoji: "🧠",
    age: "18 años en adelante",
    level: "Personalizado",
    duration: "8 meses +",
    modality: "Presencial",
    price: "desde $1600",
    techs: ["Herramientas IA", "Prompts", "Consultoría"],
    learns: [
      "Son individuales y personalizados a las necesidades de cada estudiante (consultoría)"
    ],
    benefits: [
      "Atención 100% personalizada basada en un enfoque interactivo adaptado al entorno del usuario"
    ],
    results: ["Consultoría práctica directa y aplicada", "Resolución de requerimientos específicos del estudiante", "Adopción de herramientas profesionales avanzadas"],
    testimonials: [{ name: "Carlos M.", text: "Aumenté mi productividad al doble.", rating: 5 }]
  },
  "capacitacion-corporativa": {
    title: "Capacitación Corporativa",
    subtitle: "Aprende creando desde el primer día",
    color: "#607D8B",
    img: ADULT_IMG,
    emoji: "🏢",
    age: "Adultos",
    level: "Profesional",
    duration: "8 meses +",
    modality: "Presencial / Online",
    price: "desde $1600",
    techs: ["A medida", "Certificación", "Tecnología"],
    learns: [
      "Formación tecnológica, liderazgo e inclusión digital adaptada a los objetivos de tu empresa",
      "Casos de uso aplicados directamente a la productividad organizacional"
    ],
    benefits: [
      "Personalizados horarios, duración"
    ],
    results: ["Formación técnica a la medida organizacional", "Actualización laboral eficiente", "Optimización de tiempos y horarios corporativos"],
    testimonials: [{ name: "Gerente corporativo", text: "Excelente flexibilidad y respuesta técnica.", rating: 5 }]
  }
};

const defaultCourse = {
  title: "Curso GŌKU LAB",
  subtitle: "Aprende creando desde el primer día",
  color: "#7C3AED",
  img: KIDS_IMG,
  emoji: "🚀",
  age: "Todos",
  level: "Básico",
  duration: "8 meses +",
  modality: "Online / Presencial",
  price: "desde $1600",
  techs: ["VS Code", "Python"],
  learns: [
    "Fundamentos del área tecnológica",
    "Proyectos prácticos desde el inicio",
    "Herramientas usadas en la industria real",
    "Metodología activa de aprendizaje"
  ],
  benefits: [
    "Grupos pequeños y atención personalizada",
    "Material actualizado constantemente",
    "Certificado digital de finalización"
  ],
  results: [
    "Portfolio real de proyectos",
    "Habilidades aplicables inmediatamente"
  ],
  testimonials: [{ name: "Alumno GŌKU LAB", text: "La mejor inversión en mi educación.", rating: 5 }]
};

function getAgeSegment(age: string): "kids" | "adults" {
  const match = age.match(/\d+/);
  const firstNumber = parseInt(match ? match[0] : "0");
  return firstNumber > 0 && firstNumber < 18 ? "kids" : "adults";
}

function getRelatedCourses(currentCourseId: string, currentAge: string) {
  const segment = getAgeSegment(currentAge);
  return Object.entries(courses)
    .filter(([id, course]) =>
      id !== currentCourseId &&
      getAgeSegment(course.age) === segment
    )
    .slice(0, 3)
    .map(([id, course]) => ({ id, ...course }));
}

export function CursoDetalle() {
  const { id } = useParams<{ id: string }>();
  const course = (id && courses[id]) ? courses[id] : defaultCourse;
  const relatedCourses = getRelatedCourses(id || "", course.age);
  const { theme } = useTheme();

  const whatsappMsg = encodeURIComponent(
    `Hola, quiero agendar una masterclass del curso: ${course.title}`
  );

  return (
    <div className="bg-white dark:bg-[#0A0F1E] transition-colors duration-300">
      {/* HERO SECTION */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden bg-gray-50 dark:bg-[#050A14] transition-colors duration-300">
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-300"
          style={{
            background: theme === "dark" 
              ? `radial-gradient(ellipse at 20% 50%, ${course.color}10 0%, transparent 60%)`
              : `radial-gradient(ellipse at 20% 50%, ${course.color}08 0%, transparent 60%)`,
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Breadcrumb */}
          <AnimatedSection className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/40 transition-colors duration-300">
              <Link to="/cursos" className="hover:text-gray-900 dark:hover:text-white/70 flex items-center gap-1 transition-colors duration-300">
                <ChevronLeft size={14} />
                Cursos
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-white/60 transition-colors duration-300">{course.title}</span>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4 shadow-sm font-bold"
                style={{
                  background: `${course.color}15`,
                  color: course.color,
                  border: `1px solid ${course.color}30`,
                }}
              >
                <Zap size={12} />
                <span>{course.level} · {getAgeSegment(course.age) === 'kids' ? 'Niños' : 'Adultos'}</span>
              </div>

              <h1
                className="text-gray-900 dark:text-white mb-2 transition-colors duration-300"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 900,
                  lineHeight: 1.15,
                }}
              >
                {course.title}
              </h1>
              <p className="text-gray-500 dark:text-white/60 mb-6 transition-colors duration-300 text-sm">
                {course.subtitle}
              </p>

              {/* Layout Grid 2x2 exacto de la interfaz */}
              <div className="grid grid-cols-2 gap-3 mb-6 bg-white dark:bg-transparent p-1 rounded-2xl">
                {[
                  { icon: Users, label: "Edad", value: course.age },
                  { icon: BarChart2, label: "Nivel", value: course.level },
                  { icon: Clock, label: "Duración", value: course.duration },
                  { icon: Monitor, label: "Modalidad", value: course.modality },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-0.5 p-3.5 rounded-2xl bg-gray-50/70 dark:bg-white/5 border border-gray-100/50 dark:border-white/5 transition-colors duration-300"
                  >
                    <div className="text-gray-400 dark:text-white/30 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 transition-colors duration-300">
                      <Icon size={11} className="text-purple-500" />
                      {label}
                    </div>
                    <div className="text-gray-800 dark:text-white/90 text-sm font-extrabold transition-colors duration-300">{value}</div>
                  </div>
                ))}
              </div>

              {/* Caja de Inversión Morada exacto del diseño */}
              <div className="p-4 rounded-2xl mb-6 bg-purple-50/50 dark:bg-purple-950/10 border border-purple-100/70 dark:border-purple-900/20 transition-colors duration-300">
                <div className="text-purple-600 dark:text-purple-400 text-[10px] uppercase font-black tracking-wider block">Inversión</div>
                <div className="font-black text-purple-800 dark:text-purple-300 block text-lg mt-0.5">
                  Planes {course.price}...
                </div>
                <div className="text-gray-400 dark:text-white/40 text-xs mt-1 transition-colors duration-300">
                  Solicita información de planes y becas disponibles
                </div>
              </div>

              {/* Botones principales de la UI */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/5612668168?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-sm transition-all hover:opacity-95 shadow-md shadow-purple-500/10"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  }}
                >
                  <MessageCircle size={16} />
                  Agendar masterclass
                </a>
                <a
                  href={`https://wa.me/5612668168?text=Solicito%20información%20del%20curso%20${encodeURIComponent(course.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-2xl font-bold text-sm border transition-all duration-300 text-center text-gray-700 dark:text-white/80 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  Solicitar info
                </a>
              </div>
            </AnimatedSection>

            {/* Columna derecha: Imagen */}
            <AnimatedSection direction="right" delay={100} className="flex justify-center">
              <div className="w-full max-w-[540px] aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl border border-gray-100 dark:border-white/5">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SECCIÓN INFERIOR DINÁMICA */}
      <section className="py-16 px-4 bg-white dark:bg-[#0A0F1E] transition-colors duration-300 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12">
            
            {/* Lado izquierdo: ¿Qué aprenderá? */}
            <div className="md:col-span-7">
              <h2 className="text-gray-900 dark:text-white text-xl font-extrabold mb-6 transition-colors duration-300">
                ¿Qué <span className="text-purple-600 dark:text-purple-400">aprenderá</span>?
              </h2>
              <div className="space-y-4">
                {course.learns.map((item: string, i: number) => (
                  <AnimatedSection key={i} delay={i * 50}>
                    <div className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        className="text-purple-500 shrink-0 mt-0.5"
                      />
                      <span className="text-gray-600 dark:text-white/70 text-sm leading-relaxed transition-colors duration-300">{item}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Lado derecho: Tecnologías y Beneficios */}
            <div className="md:col-span-5 space-y-10">
              {/* Tecnologías */}
              <div>
                <h3 className="text-gray-900 dark:text-white text-base font-bold mb-4 transition-colors duration-300">
                  Tecnologías del <span className="text-purple-600 dark:text-purple-400">curso</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.techs.map((tech: string) => (
                    <span
                      key={tech}
                      className="text-xs px-4 py-2 rounded-xl font-bold bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border border-purple-100/50 dark:border-purple-900/10 shadow-sm transition-colors duration-300"
                    >
                      ✦ {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Beneficios */}
              <div>
                <h3 className="text-gray-900 dark:text-white text-base font-bold mb-4 transition-colors duration-300">
                  Beneficios del programa
                </h3>
                <div className="space-y-3">
                  {course.benefits.map((b: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5 text-gray-600 dark:text-white/65 text-xs leading-relaxed transition-colors duration-300">
                      <span className="text-purple-500 font-bold shrink-0 mt-0.5">✦</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section
        className="py-16 px-4 bg-gray-50 dark:bg-transparent transition-colors duration-300"
        style={{
          borderTop: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)",
          borderBottom: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <h2
              className="text-gray-900 dark:text-white mb-10 transition-colors duration-300"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800 }}
            >
              Resultados <span style={{ color: course.color }}>garantizados</span>
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-4">
            {course.results.map((result: string, i: number) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div
                  className="p-5 rounded-2xl text-left shadow-sm dark:shadow-none transition-colors duration-300"
                  style={{
                    background: theme === "dark" ? `${course.color}08` : "#ffffff",
                    border: theme === "dark" ? `1px solid ${course.color}20` : `1px solid ${course.color}15`,
                  }}
                >
                  <div className="text-xl mb-2">🎯</div>
                  <p className="text-gray-700 dark:text-white/75 leading-relaxed text-xs font-semibold transition-colors duration-300">{result}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-4 bg-white dark:bg-[#050A14] transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2
              className="text-gray-900 dark:text-white transition-colors duration-300"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800 }}
            >
              Lo que dicen nuestros <span style={{ color: "#FFE134" }}>alumnos</span>
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-5">
            {course.testimonials.map((t: any, i: number) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div
                  className="p-6 rounded-3xl bg-gray-50 dark:bg-transparent transition-colors duration-300"
                  style={{
                    background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                    border: theme === "dark" ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="flex mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={14} style={{ color: "#FFE134", fill: "#FFE134" }} />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-white/70 leading-relaxed italic mb-4 text-xs transition-colors duration-300">"{t.text}"</p>
                  <p className="text-gray-500 dark:text-white/50 text-xs font-bold transition-colors duration-300">— {t.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED COURSES */}
      {relatedCourses.length > 0 && (
        <section className="py-16 px-4 bg-gray-50 dark:bg-[#0A0F1E] transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <div
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4"
                style={{
                  background: `${course.color}15`,
                  color: course.color,
                  border: `1px solid ${course.color}30`,
                }}
              >
                Cursos relacionados
              </div>
              <h2
                className="text-gray-900 dark:text-white mb-4 transition-colors duration-300"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800 }}
              >
                Otros cursos{" "}
                <span style={{ color: course.color }}>
                  {getAgeSegment(course.age) === "kids" ? "para niños y adolescentes" : "para adultos"}
                </span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedCourses.map((relCourse, i) => (
                <AnimatedSection key={relCourse.id} delay={i * 100}>
                  <Link
                    to={`/cursos/${getAgeSegment(course.age) === 'kids' ? 'ninos' : 'adultos'}/${relCourse.id}`}
                    className="block group rounded-3xl overflow-hidden h-full bg-white dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300"
                    style={{
                      background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
                      border: theme === "dark" ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                      (e.currentTarget as HTMLElement).style.borderColor = `${relCourse.color}40`;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px ${relCourse.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "none";
                      (e.currentTarget as HTMLElement).style.borderColor = theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={relCourse.img}
                        alt={relCourse.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top, ${relCourse.color}40, transparent)`,
                        }}
                      />
                      <div className="absolute bottom-3 left-3">
                        <span className="text-3xl">{relCourse.emoji}</span>
                      </div>
                    </div>

                    <div className="p-5 relative z-10">
                      <h3
                        className="text-gray-900 dark:text-white mb-2 transition-colors duration-300"
                        style={{ fontWeight: 700, fontSize: "1.05rem" }}
                      >
                        {relCourse.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span
                          className="text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm"
                          style={{
                            background: theme === "dark" ? `${relCourse.color}15` : `${relCourse.color}10`,
                            color: relCourse.color,
                          }}
                        >
                          {relCourse.age}
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
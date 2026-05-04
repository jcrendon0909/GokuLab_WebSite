import { Link, useParams } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import {
  Clock, Users, BarChart2, Monitor, CheckCircle, Star,
  MessageCircle, ArrowRight, ChevronLeft, Zap
} from "lucide-react";

const KIDS_IMG = "https://images.unsplash.com/photo-1603354350266-a8de3496163b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800";
const ADULT_IMG = "https://images.unsplash.com/photo-1724260793422-7754e5d06fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800";

const courses: Record<string, any> = {
  "scratch-basico": {
    title: "Scratch para Principiantes",
    subtitle: "El primer paso en el mundo de la programación",
    color: "#FF6B35",
    img: KIDS_IMG,
    emoji: "🐱",
    age: "6–10 años",
    level: "Básico",
    duration: "8 semanas",
    modality: "Presencial / Online",
    sessions: "2 sesiones por semana",
    price: "Planes desde...",
    techs: ["Scratch", "Code.org"],
    learns: [
      "Pensamiento computacional y lógica de programación",
      "Crear animaciones e historias interactivas",
      "Diseñar videojuegos simples con personajes",
      "Colaborar en proyectos creativos con compañeros",
      "Depurar y mejorar proyectos propios",
      "Publicar proyectos en la comunidad Scratch",
    ],
    benefits: [
      "Clases en grupos pequeños (máx. 8 alumnos)",
      "Proyectos personales semanales",
      "Acceso a plataforma de práctica 24/7",
      "Certificado digital de finalización",
      "Comunidad de alumnos activa",
    ],
    results: [
      "Tu hijo creará su primer videojuego en semana 3",
      "Publicará al menos 2 proyectos en la plataforma Scratch",
      "Desarrollará pensamiento lógico y resolutivo",
      "Tendrá un portafolio de 5+ proyectos propios",
    ],
    testimonials: [
      {
        name: "Mamá de Emiliano, 8 años",
        text: "No lo creía posible pero Emiliano hizo su propio juego. ¡Estaba tan orgulloso!",
        rating: 5,
      },
      {
        name: "Papá de Valeria, 9 años",
        text: "Valeria me pidió que le comprara más horas de clase. Nunca había visto eso con ninguna actividad.",
        rating: 5,
      },
    ],
  },
  "python-basico": {
    title: "Python para Principiantes",
    subtitle: "El lenguaje del futuro al alcance de todos",
    color: "#00C9FF",
    img: ADULT_IMG,
    emoji: "🐍",
    age: "18+ años",
    level: "Básico",
    duration: "12 semanas",
    modality: "Online / Presencial",
    sessions: "3 sesiones por semana",
    price: "Planes desde...",
    techs: ["Python", "VS Code", "Google Colab"],
    learns: [
      "Fundamentos de Python: variables, funciones y estructuras",
      "Manipulación de datos con pandas y numpy",
      "Automatización de tareas repetitivas",
      "Proyectos web con Flask básico",
      "Introducción al análisis de datos",
      "Buenas prácticas de programación profesional",
    ],
    benefits: [
      "Instructor con experiencia en industria",
      "Proyectos aplicados a casos reales",
      "Mentoría personalizada semanal",
      "Acceso de por vida al material del curso",
      "Certificado profesional verificable",
    ],
    results: [
      "Crearás scripts funcionales desde la semana 2",
      "Automatizarás al menos 3 tareas de tu trabajo o vida",
      "Tendrás un portafolio de proyectos reales en GitHub",
      "Estarás listo para puestos junior de desarrollo",
    ],
    testimonials: [
      {
        name: "Carlos M., 34 años",
        text: "Sin saber nada de programación, en 12 semanas ya tenía trabajo freelance. Increíble.",
        rating: 5,
      },
      {
        name: "Diana R., 28 años",
        text: "El método práctico hace toda la diferencia. Nunca me aburrí en una sola clase.",
        rating: 5,
      },
    ],
  },
  "robotica-basico": {
    title: "Robótica Educativa",
    subtitle: "Construye y programa tus propios robots",
    color: "#FF6B35",
    img: KIDS_IMG,
    emoji: "🤖",
    age: "8–14 años",
    level: "Básico",
    duration: "10 semanas",
    modality: "Presencial",
    sessions: "2 sesiones por semana",
    price: "Planes desde...",
    techs: ["LEGO Education", "MakeBlock", "Arduino Jr"],
    learns: [
      "Construcción de robots con LEGO y sensores",
      "Programación visual de movimientos",
      "Trabajo en equipo en desafíos robóticos",
      "Resolución creativa de problemas técnicos",
      "Presentación de proyectos ante grupo",
    ],
    benefits: [
      "Kit de robótica incluido durante el curso",
      "Grupos reducidos de máximo 6 alumnos",
      "Competencias internas mensuales",
      "Certificado de participación",
    ],
    results: [
      "Construirás 5+ robots funcionales",
      "Participarás en competencia final de robótica",
      "Desarrollarás habilidades STEM completas",
      "Portfolio de proyectos robóticos",
    ],
    testimonials: [
      {
        name: "Mamá de Diego, 10 años",
        text: "Diego construyó un robot que seguía líneas. No podía creer que lo había hecho él solo.",
        rating: 5,
      },
    ],
  },
  "minecraft-edu": {
    title: "Programación con Minecraft EDU",
    subtitle: "Aprende código mientras juegas",
    color: "#FF6B35",
    img: KIDS_IMG,
    emoji: "⛏️",
    age: "7–12 años",
    level: "Básico",
    duration: "8 semanas",
    modality: "Online / Presencial",
    sessions: "2 sesiones por semana",
    price: "Planes desde...",
    techs: ["Minecraft Education", "Code Builder", "MakeCode"],
    learns: [
      "Comandos básicos de programación en Minecraft",
      "Crear construcciones automáticas con código",
      "Resolver desafíos lógicos en mundos personalizados",
      "Trabajo colaborativo en proyectos grupales",
      "Pensamiento espacial y matemático",
    ],
    benefits: [
      "Licencia de Minecraft Education incluida",
      "Mundos educativos exclusivos de GOKU LAB",
      "Proyectos guardados en la nube",
      "Sesiones grabadas disponibles",
    ],
    results: [
      "Crearás tu propio mundo programado",
      "Automatizarás construcciones complejas",
      "Aprenderás lógica programando lo que amas",
      "Portfolio de 8+ mundos creativos",
    ],
    testimonials: [
      {
        name: "Papá de Sofía, 9 años",
        text: "Convertir Minecraft en aprendizaje fue genial. Ahora Sofía programa sin darse cuenta.",
        rating: 5,
      },
    ],
  },
  "javascript-web": {
    title: "JavaScript y Desarrollo Web",
    subtitle: "Crea aplicaciones web interactivas desde cero",
    color: "#00C9FF",
    img: ADULT_IMG,
    emoji: "💻",
    age: "18+ años",
    level: "Intermedio",
    duration: "14 semanas",
    modality: "Online / Presencial",
    sessions: "3 sesiones por semana",
    price: "Planes desde...",
    techs: ["JavaScript", "React", "Node.js", "Git"],
    learns: [
      "JavaScript moderno (ES6+) y DOM manipulation",
      "Desarrollo de interfaces con React",
      "Backend con Node.js y Express",
      "Integración de APIs y bases de datos",
      "Deploy y publicación de aplicaciones web",
      "Mejores prácticas de desarrollo profesional",
    ],
    benefits: [
      "Proyectos reales de portfolio",
      "Mentoría 1-on-1 semanal",
      "Acceso a comunidad de desarrolladores",
      "Certificado profesional",
      "Bolsa de trabajo exclusiva",
    ],
    results: [
      "Desarrollarás 3+ aplicaciones web completas",
      "Tendrás portfolio en GitHub listo para empleadores",
      "Dominarás stack completo JavaScript",
      "Estarás listo para roles de Frontend/Fullstack",
    ],
    testimonials: [
      {
        name: "Luis A., 26 años",
        text: "Pasé de marketing a desarrollo web. En 6 meses ya tenía mi primer trabajo tech.",
        rating: 5,
      },
    ],
  },
  "diseno-ux": {
    title: "Diseño UX/UI + Figma",
    subtitle: "Diseña experiencias digitales profesionales",
    color: "#00C9FF",
    img: ADULT_IMG,
    emoji: "🎨",
    age: "18+ años",
    level: "Básico",
    duration: "10 semanas",
    modality: "Online",
    sessions: "2 sesiones por semana",
    price: "Planes desde...",
    techs: ["Figma", "Adobe XD", "Miro", "Notion"],
    learns: [
      "Fundamentos de diseño centrado en usuario",
      "Investigación UX y metodologías ágiles",
      "Wireframing y prototipado en Figma",
      "Sistemas de diseño escalables",
      "Presentación de proyectos a stakeholders",
      "Handoff a desarrolladores",
    ],
    benefits: [
      "Portfolio de casos reales",
      "Feedback de diseñadores senior",
      "Plantillas y recursos premium",
      "Certificado verificable",
    ],
    results: [
      "Portfolio con 4+ casos de estudio",
      "Dominio completo de Figma profesional",
      "Proceso UX estructurado y probado",
      "Listo para roles junior/mid de diseño",
    ],
    testimonials: [
      {
        name: "Ana P., 31 años",
        text: "De cero diseño a conseguir mi primer cliente freelance en 8 semanas. Increíble.",
        rating: 5,
      },
    ],
  },
};

const defaultCourse = {
  title: "Curso GOKU LAB",
  subtitle: "Aprende creando desde el primer día",
  color: "#7C3AED",
  img: KIDS_IMG,
  emoji: "🚀",
  age: "Todos",
  level: "Básico",
  duration: "10 semanas",
  modality: "Online / Presencial",
  sessions: "2 sesiones por semana",
  price: "Planes desde...",
  techs: ["VS Code", "Python"],
  learns: [
    "Fundamentos del área tecnológica",
    "Proyectos prácticos desde el inicio",
    "Herramientas usadas en la industria real",
    "Metodología activa de aprendizaje",
  ],
  benefits: [
    "Grupos pequeños y atención personalizada",
    "Material actualizado constantemente",
    "Certificado digital de finalización",
  ],
  results: [
    "Portfolio real de proyectos",
    "Habilidades aplicables inmediatamente",
    "Base sólida para continuar aprendiendo",
  ],
  testimonials: [
    {
      name: "Alumno GOKU LAB",
      text: "La mejor inversión que hice en mi educación. El equipo es increíble.",
      rating: 5,
    },
  ],
};

// Helper function to get age segment
function getAgeSegment(age: string): "kids" | "adults" {
  // Extract first number from age string
  const firstNumber = parseInt(age.match(/\d+/)?.[0] || "0");
  return firstNumber < 18 ? "kids" : "adults";
}

// Get related courses based on age segment
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
  const { id, segmento } = useParams<{ id: string; segmento: string }>();
  const course = (id && courses[id]) ? courses[id] : defaultCourse;
  const relatedCourses = getRelatedCourses(id || "", course.age);

  const whatsappMsg = encodeURIComponent(
    `Hola, quiero agendar una masterclass del curso: ${course.title}`
  );

  return (
    <div>
      {/* HERO */}
      <section
        className="relative pt-28 pb-16 px-4 overflow-hidden"
        style={{ background: "#050A14" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 20% 50%, ${course.color}10 0%, transparent 60%)`,
          }}
        />
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <AnimatedSection className="mb-8">
            <div className="flex items-center gap-2 text-sm text-white/40">
              <Link to="/cursos" className="hover:text-white/70 flex items-center gap-1">
                <ChevronLeft size={14} />
                Cursos
              </Link>
              <span>/</span>
              <span className="text-white/60">{course.title}</span>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-6"
                style={{
                  background: `${course.color}15`,
                  color: course.color,
                  border: `1px solid ${course.color}30`,
                }}
              >
                <span>{course.emoji}</span>
                <span>{course.level} · {course.age}</span>
              </div>

              <h1
                className="text-white mb-3"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                  fontWeight: 900,
                  lineHeight: 1.15,
                }}
              >
                {course.title}
              </h1>
              <p className="text-white/60 mb-8" style={{ fontSize: "1.1rem" }}>
                {course.subtitle}
              </p>

              {/* Quick meta */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: Users, label: "Edad", value: course.age },
                  { icon: BarChart2, label: "Nivel", value: course.level },
                  { icon: Clock, label: "Duración", value: course.duration },
                  { icon: Monitor, label: "Modalidad", value: course.modality },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 p-3 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <Icon size={16} style={{ color: course.color, marginTop: 2 }} />
                    <div>
                      <div className="text-white/40 text-xs">{label}</div>
                      <div className="text-white text-sm font-semibold">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price note */}
              <div
                className="p-4 rounded-2xl mb-6"
                style={{
                  background: `${course.color}10`,
                  border: `1px solid ${course.color}25`,
                }}
              >
                <div className="text-white/50 text-sm mb-1">Inversión</div>
                <div
                  className="font-bold"
                  style={{ color: course.color, fontSize: "1.1rem" }}
                >
                  {course.price}
                </div>
                <div className="text-white/40 text-xs mt-1">
                  Solicita información de planes y becas disponibles
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/5612668168?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold"
                  style={{
                    background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                    boxShadow: "0 6px 25px rgba(0,201,255,0.3)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                >
                  <MessageCircle size={18} />
                  Agendar masterclass
                </a>
                <a
                  href={`https://wa.me/5612668168?text=Solicito%20información%20del%20curso%20${encodeURIComponent(course.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-2xl text-white font-semibold border border-white/25 hover:border-white/50 text-center"
                  style={{ transition: "all 0.2s ease" }}
                >
                  Solicitar info
                </a>
              </div>
            </AnimatedSection>

            {/* Image */}
            <AnimatedSection direction="right" delay={100}>
              <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${course.color}30, transparent)`,
                  }}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* WHAT THEY'LL LEARN */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <h2
                className="text-white mb-8"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800 }}
              >
                ¿Qué{" "}
                <span style={{ color: course.color }}>aprenderá</span>?
              </h2>
              <div className="flex flex-col gap-3">
                {course.learns.map((item: string, i: number) => (
                  <AnimatedSection key={i} delay={i * 60}>
                    <div className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        style={{ color: course.color, marginTop: 2, flexShrink: 0 }}
                      />
                      <span className="text-white/70 leading-relaxed">{item}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <h2
                className="text-white mb-8"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800 }}
              >
                Tecnologías del{" "}
                <span style={{ color: course.color }}>curso</span>
              </h2>
              <div className="flex flex-wrap gap-3 mb-10">
                {course.techs.map((tech: string) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
                    style={{
                      background: `${course.color}12`,
                      border: `1px solid ${course.color}30`,
                      color: course.color,
                    }}
                  >
                    <Zap size={14} />
                    <span className="font-semibold">{tech}</span>
                  </div>
                ))}
              </div>

              <h3
                className="text-white mb-5"
                style={{ fontWeight: 700, fontSize: "1.2rem" }}
              >
                Beneficios del programa
              </h3>
              <div className="flex flex-col gap-2">
                {course.benefits.map((b: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-white/65 text-sm">
                    <span style={{ color: course.color }}>✦</span>
                    {b}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section
        className="py-20 px-4"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <h2
              className="text-white mb-10"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800 }}
            >
              Resultados{" "}
              <span style={{ color: course.color }}>garantizados</span>
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-4">
            {course.results.map((result: string, i: number) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div
                  className="p-5 rounded-2xl text-left"
                  style={{
                    background: `${course.color}08`,
                    border: `1px solid ${course.color}20`,
                  }}
                >
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-white/75 leading-relaxed">{result}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4" style={{ background: "#050A14" }}>
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2
              className="text-white"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800 }}
            >
              Lo que dicen nuestros{" "}
              <span style={{ color: "#FFE134" }}>alumnos</span>
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-5">
            {course.testimonials.map((t: any, i: number) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div
                  className="p-6 rounded-3xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={14} style={{ color: "#FFE134", fill: "#FFE134" }} />
                    ))}
                  </div>
                  <p className="text-white/70 leading-relaxed italic mb-4">"{t.text}"</p>
                  <p className="text-white/50 text-sm font-semibold">— {t.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED COURSES */}
      {relatedCourses.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm mb-4"
                style={{
                  background: `${course.color}15`,
                  color: course.color,
                  border: `1px solid ${course.color}30`,
                }}
              >
                Cursos relacionados
              </div>
              <h2
                className="text-white mb-4"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}
              >
                Otros cursos{" "}
                <span style={{ color: course.color }}>
                  {getAgeSegment(course.age) === "kids" ? "para niños y adolescentes" : "para adultos"}
                </span>
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                Continúa tu aprendizaje con estos cursos diseñados para tu grupo de edad
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedCourses.map((relCourse, i) => (
                <AnimatedSection key={relCourse.id} delay={i * 100}>
                  <Link
                    to={`/curso/${relCourse.id}`}
                    className="block group rounded-3xl overflow-hidden h-full"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                      (e.currentTarget as HTMLElement).style.borderColor = `${relCourse.color}40`;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px ${relCourse.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "none";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relCourse.img}
                        alt={relCourse.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top, ${relCourse.color}90, transparent)`,
                        }}
                      />
                      <div className="absolute bottom-4 left-4">
                        <span className="text-4xl">{relCourse.emoji}</span>
                      </div>
                      <div
                        className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{ background: relCourse.color, color: "#fff" }}
                      >
                        {relCourse.level}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3
                        className="text-white mb-2 group-hover:text-white transition-colors"
                        style={{ fontWeight: 700, fontSize: "1.15rem" }}
                      >
                        {relCourse.title}
                      </h3>
                      <p className="text-white/50 text-sm mb-4 line-clamp-2">
                        {relCourse.subtitle}
                      </p>

                      {/* Meta info */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: `${relCourse.color}15`,
                            color: relCourse.color,
                            border: `1px solid ${relCourse.color}25`,
                          }}
                        >
                          {relCourse.age}
                        </span>
                        <span
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: `${relCourse.color}15`,
                            color: relCourse.color,
                            border: `1px solid ${relCourse.color}25`,
                          }}
                        >
                          {relCourse.duration}
                        </span>
                      </div>

                      {/* CTA */}
                      <div
                        className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                        style={{ color: relCourse.color }}
                      >
                        Ver curso completo
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800 }}
            >
              ¿Listo para dar el primer paso?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto" style={{ fontSize: "1.1rem" }}>
              Agenda tu masterclass gratuita hoy. Sin compromiso. Sin costo.
              Con atención personalizada del equipo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/5612668168?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-white font-bold"
                style={{
                  background: "linear-gradient(135deg, #00C9FF, #7C3AED)",
                  boxShadow: "0 8px 30px rgba(0,201,255,0.35)",
                  fontSize: "1.05rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <MessageCircle size={20} />
                Agendar masterclass gratis
              </a>
              <Link
                to="/cursos"
                className="flex items-center justify-center gap-2 px-10 py-5 rounded-2xl text-white font-semibold border border-white/25"
                style={{ transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
              >
                Ver más cursos
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm text-white/40">
              {["✅ Gratis", "✅ Sin compromiso", "✅ Atención personalizada"].map((i) => (
                <span key={i}>{i}</span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

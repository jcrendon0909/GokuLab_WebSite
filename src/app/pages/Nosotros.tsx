import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { 
  ArrowRight, GraduationCap, Users, Briefcase, FileText, Linkedin, Mail, 
  Palette, Compass, HeartHandshake, Heart, Gamepad2, ShieldCheck, Lightbulb, Globe 
} from "lucide-react";
import { PROFESORES } from "../../Data/images";

// --- DATOS DE LOS FUNDADORES ---
const FUNDADORES = [
  {
    nombre: "Juan Carlos Rendón",
    rol: "Cofundador · Director de Innovación y Tecnología",
    bio: "Líder en Inteligencia Artificial, analítica y transformación digital con experiencia en Microsoft e IBM. Matemático y catedrático de la UNAM FES Acatlán durante más de 30 años, ha dedicado su carrera a formar talento, impulsar la innovación y acercar la tecnología de vanguardia a empresas y personas.",
    imagen: PROFESORES.jcrendon,
    linkedin: "https://linkedin.com/in/jcrendon0909",
    email: "mailto:jcrendon@gokulab.mx",
    cvUrl: "https://media.gokulab.mx/Profesores/CV%20JCRendo%CC%81n%202026.pdf"
  }, // <--- AQUÍ ESTABA EL ERROR, FALTABA ESTA COMA
  {
    nombre: "Claudia Sierra",
    rol: "Cofundadora · Directora General",
    bio: "Actuaria, escritora, empresaria, conferencista internacional y catedrática de la UNAM FES Acatlán durante más de 25 años. Reconocida entre las 50 mujeres líderes de México, ha impulsado el crecimiento de empresas, emprendedores y proyectos de alto impacto mediante la innovación, la investigación de mercados y el desarrollo de negocios.",
    imagen: PROFESORES.csierra,
    linkedin: "https://linkedin.com/in/claudiasierramagana",
    email: "mailto:claudiasierra@gokulab.mx",
    cvUrl: "https://media.gokulab.mx/Profesores/CV%20Claudia%20Sierra%202026.pdf"
  }
];

// --- DATOS DEL EQUIPO DOCENTE ---
const PROFESORES_DATA = [
  {
    nombre: "Ana Karina Matías",
    rol: "Instructora de Robótica y Programación",
    especialidad: "Scratch, Arduino, Python",
    bio: "Educadora apasionada por despertar el potencial de cada alumno. Especialista en programación visual, Python, videoblogging y alfabetización digital, transforma el aprendizaje en experiencias dinámicas, creativas y significativas para estudiantes de todas las edades.",
    imagen: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    cvUrl: "https://media.gokulab.mx/Profesores/CV%20-%20Ana%20Karina%20Mati%CC%81as%20Rodri%CC%81guez.pdf"
  },
  {
    nombre: "Eduardo Castro",
    rol: "Instructor de Diseño y Videojuegos",
    especialidad: "Unity, Blender, Photoshop",
    bio: "Diseñador de videojuegos indie. Ha lanzado 3 títulos en Steam y ahora enseña a los adolescentes a crear sus propios mundos digitales.",
    imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    cvUrl: "#"
  }
];

// --- LOS 8 VALORES DEL IDEARIO ---
const VALORES = [
  { icon: Palette, title: "Creatividad", desc: "Impulsamos que cada estudiante imagine, experimente y construya soluciones propias, usando la tecnología como un lenguaje para expresar ideas y emociones." },
  { icon: Compass, title: "Curiosidad", desc: "Fomentamos el deseo de preguntar, explorar y comprender cómo funcionan las cosas, desde el código hasta el mundo que les rodea." },
  { icon: HeartHandshake, title: "Respeto", desc: "Promovemos el respeto a las personas, a la diversidad de ideas, ritmos de aprendizaje y contextos familiares, así como al entorno físico y digital." },
  { icon: Heart, title: "Empatía", desc: "Acompañamos las emociones y experiencias de niñas, niños, jóvenes y familias, priorizando el trato digno, la escucha y la comprensión." },
  { icon: Gamepad2, title: "Juego y disfrute", desc: "Diseñamos el aprendizaje como una experiencia lúdica, activa y participativa. Creemos en el poder del juego serio para desarrollar disciplina y perseverancia." },
  { icon: ShieldCheck, title: "Responsabilidad", desc: "Enseñamos a los estudiantes a hacerse responsables de sus procesos de aprendizaje, de sus decisiones en proyectos y del impacto de lo que crean." },
  { icon: Lightbulb, title: "Innovación", desc: "Buscamos que nuestra comunidad cuestione, analice y mejore lo que ya existe, en lugar de solo consumir tecnología." },
  { icon: Globe, title: "Inclusión", desc: "Trabajamos para que el acceso a la tecnología no sea un privilegio, sino una oportunidad para más niñas, niños, jóvenes y adultos." }
];

export function Nosotros() {
  return (
    <div className="bg-[#050A14] text-white min-h-screen selection:bg-[#00C9FF] selection:text-black">
      
      {/* 1. HERO */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-[#7C3AED] blur-[120px] opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-6 bg-white/5 border border-white/10 text-[#00C9FF] font-black uppercase tracking-widest">
              <Users size={14} /> Nuestra Historia
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              Somos Gōku<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#7C3AED]">Lab</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              No solo somos una academia. Somos una comunidad obedeciendo a un mismo ideal: transformar a las personas de consumidoras de tecnología a creadoras del futuro.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. EL IDEARIO (Misión, Visión y Valores) */}
      <section className="py-20 px-4 bg-[#0A0F1E] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          
          {/* Misión y Visión */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <AnimatedSection>
              <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#00C9FF]/10 to-transparent border border-[#00C9FF]/20 h-full">
                <h3 className="text-2xl font-black text-[#00C9FF] mb-4">Misión</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  GOKULAB es un espacio educativo donde niñas, niños, jóvenes y adultos descubren la tecnología como herramienta para imaginar, crear y transformar su realidad, a través de experiencias prácticas, lúdicas y significativas en ciencia, programación y arte digital.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#7C3AED]/10 to-transparent border border-[#7C3AED]/20 h-full">
                <h3 className="text-2xl font-black text-[#A78BFA] mb-4">Visión</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Ser la academia de tecnología y creatividad de referencia para las familias, reconocida por formar generaciones curiosas, críticas y sensibles, capaces de diseñar soluciones innovadoras para los retos de su entorno.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Los 8 Valores */}
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
              Nuestros <span className="text-[#FFE134]">Valores</span>
            </h2>
            <p className="text-lg text-gray-400">Los pilares que guían cada clase que impartimos.</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALORES.map((valor, i) => (
              <AnimatedSection key={i} delay={i * 50}>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00C9FF]/40 transition-colors h-full group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#00C9FF]/10 text-[#00C9FF] group-hover:scale-110 transition-transform">
                    <valor.icon size={24} />
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">{valor.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{valor.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      {/* 3. FUNDADORES */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
              Detrás de la <span className="text-[#00C9FF]">Misión</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {FUNDADORES.map((fundador, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="flex flex-col md:flex-row gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 items-center md:items-start">
                  <img 
                    src={fundador.imagen} 
                    alt={fundador.nombre} 
                    className="w-32 h-32 rounded-2xl object-cover shadow-lg shrink-0" 
                  />
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-black text-white mb-1">{fundador.nombre}</h3>
                    <p className="text-[#00C9FF] text-sm font-bold mb-4">{fundador.rol}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{fundador.bio}</p>
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <a href={fundador.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="LinkedIn">
                        <Linkedin size={18} />
                      </a>
                      <a href={fundador.email} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Correo">
                        <Mail size={18} />
                      </a>
                      <a href={fundador.cvUrl} target="_blank" rel="noopener noreferrer" className="ml-2 flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded-lg">
                        <FileText size={14} /> Ver CV
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EL EQUIPO DOCENTE (CVs) */}
      <section className="py-24 px-4 bg-[#0A0F1E] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4 bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] font-black uppercase tracking-widest">
              <GraduationCap size={14} /> Nuestros Expertos
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
              El Equipo <span className="text-[#10B981]">Docente</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              No son solo profesores, son profesionales activos en la industria. Conoce a quienes guiarán a los alumnos.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROFESORES_DATA.map((profe, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 group hover:border-[#10B981]/50 transition-colors h-full flex flex-col">
                  <div className="h-64 overflow-hidden relative">
                    <img src={profe.imagen} alt={profe.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-black text-white">{profe.nombre}</h3>
                      <p className="text-[#10B981] text-sm font-bold">{profe.rol}</p>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                      {profe.bio}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <Briefcase size={14} /> Especialidad
                      </div>
                      <p className="text-sm text-gray-300 font-medium">{profe.especialidad}</p>
                      
                      <a 
                        href={profe.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold text-white transition-colors border border-white/10"
                      >
                        <FileText size={16} /> Ver CV completo
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection className="text-center mt-12">
             <p className="text-gray-500 text-sm">¿Quieres formar parte de nuestro equipo? <a href="mailto:contacto@gokulab.mx" className="text-[#00C9FF] hover:underline">Envíanos tu CV</a></p>
          </AnimatedSection>
        </div>
      </section>

      {/* 5. CTA FINAL */}
      <section className="py-24 px-4 text-center">
        <AnimatedSection className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black mb-6">
            El futuro no se espera, <span className="text-[#FF6B35]">se construye</span>.
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Únete a la comunidad de GōkuLab. Tú pones las ganas, nosotros los expertos y la tecnología.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-black font-black text-lg transition-transform hover:scale-105 shadow-xl bg-white"
          >
            Hablar con el equipo
            <ArrowRight size={22} />
          </Link>
        </AnimatedSection>
      </section>

    </div>
  );
}
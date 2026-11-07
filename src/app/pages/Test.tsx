import { useState } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { ArrowRight, RotateCcw, MessageCircle, CheckCircle, ChevronLeft, Sparkles, ShieldCheck, Zap, Brain, Target } from "lucide-react";

type Answer = { step0?: string; step1?: string; step2?: string; step3?: string; };

type CourseResult = {
  title: string; desc: string; color: string; emoji: string; href: string;
  softSkills: string[]; techSkills: string[]; finalProject: string;
};

const SEDES = ["Naucalpan", "Ezequiel Montes"];

const getQuestions = (answers: Answer) => {
  let step3Title = "¿Qué te gustaría lograr?";
  let step3Options = [
    { id: "job", label: "Mejorar mis oportunidades profesionales", emoji: "💼" },
    { id: "create", label: "Crear mis propios proyectos", emoji: "🎨" },
    { id: "learn", label: "Aprender algo nuevo por curiosidad", emoji: "🧠" },
  ];

  if (answers.step0 === "kids" || answers.step0 === "teen") {
    step3Title = "¿Qué te gustaría que fortaleciera?";
    step3Options = [
      { id: "logic", label: "Pensamiento lógico y resolución de problemas", emoji: "🧩" },
      { id: "confidence", label: "Confianza en sí mismo y comunicación", emoji: "🗣️" },
      { id: "creativity", label: "Creatividad y expresión personal", emoji: "🎨" },
      { id: "teamwork", label: "Trabajo en equipo y colaboración", emoji: "🤝" },
    ];
  }

  return [
    {
      id: "step0", title: "¿Para quién es este curso?", subtitle: "Cuéntanos para orientarte mejor.", emoji: "👤",
      options: [
        { id: "kids", label: "Para mis hijos (5-11 años)", emoji: "🧒" },
        { id: "teen", label: "Para mí (12-17 años)", emoji: "🎮" },
        { id: "adult", label: "Para mí (18+)", emoji: "👨‍💼" },
        { id: "company", label: "Para mi empresa", emoji: "🏢" },
      ],
    },
    {
      id: "step1", title: "¿Qué es lo que más disfruta hacer?", subtitle: "Elige lo que más se parezca a su personalidad.", emoji: "🌟",
      options: [
        { id: "play", label: "Jugar videojuegos / Minecraft", emoji: "🎮" },
        { id: "draw", label: "Dibujar, crear historias o videos", emoji: "🎨" },
        { id: "build", label: "Armar cosas, robots o Lego", emoji: "🤖" },
        { id: "solve", label: "Resolver acertijos y retos", emoji: "🧩" },
      ],
    },
    {
      id: "step2", title: "¿Cuál es su nivel de experiencia?", subtitle: "No hay respuestas incorrectas.", emoji: "📊",
      options: [
        { id: "zero", label: "Cero experiencia, empezar desde cero", emoji: "🌱" },
        { id: "basic", label: "Ya sabe lo básico", emoji: "📚" },
        { id: "adv", label: "Quiere especializarse", emoji: "🚀" },
      ],
    },
    {
      id: "step3", title: step3Title, subtitle: "Esto define el enfoque del curso.", emoji: "🎯",
      options: step3Options,
    },
  ];
};

function getResults(answers: Answer) {
  const { step0, step1, step3 } = answers;
  let primary: CourseResult = {} as CourseResult;
  let secondary: CourseResult[] = [];

  if (step0 === "company") {
    primary = { title: "Capacitación Corporativa", desc: "Transforma a tu equipo con mentalidad innovadora.", color: "#10B981", emoji: "🏢", href: "/capacitaciones", softSkills: ["Liderazgo digital", "Adaptabilidad"], techSkills: ["Automatización", "IA"], finalProject: "Roadmap de transformación digital" };
  } else if (step0 === "kids") {
    if (step1 === "play") {
      primary = { title: "Minecraft Education", desc: "Aprende lógica en un mundo de bloques.", color: "#4CAF50", emoji: "⛏️", href: "/cursos/ninos/diseno-videojuegos-minecraft", softSkills: ["Creatividad", "Resolución de Problemas"], techSkills: ["MakeCode", "Lógica"], finalProject: "Mundo interactivo" };
      secondary = [{ title: "Programación Visual", desc: "Crea sus primeros juegos.", color: "#1E88E5", emoji: "🐱", href: "/cursos/ninos/programacion-visual", softSkills: ["Lógica"], techSkills: ["Scratch"], finalProject: "Primer videojuego" }];
    } else if (step1 === "build") {
      primary = { title: "Robótica Inicial", desc: "Construye y programa robots.", color: "#FF6B35", emoji: "🤖", href: "/cursos/ninos/robotica-principiantes", softSkills: ["Lógica", "Trabajo en Equipo"], techSkills: ["Sensores"], finalProject: "Robot de trayectoria" };
      secondary = [{ title: "El Caballero del Código", desc: "Aventuras lógicas.", color: "#FFE134", emoji: "⚔️", href: "/cursos/ninos/caballero-del-codigo", softSkills: ["Lógica"], techSkills: ["Scratch"], finalProject: "Juego de lógica" }];
    } else if (step1 === "draw") {
      primary = { title: "Diseño Gráfico", desc: "Despierta su creatividad visual.", color: "#E91E63", emoji: "🖌️", href: "/cursos/ninos/diseno-grafico-ninos", softSkills: ["Creatividad"], techSkills: ["Vectores"], finalProject: "Portafolio" };
      secondary = [{ title: "Taller Creatividad", desc: "El arte detrás del código.", color: "#FFE134", emoji: "🎨", href: "/cursos/ninos/taller-creatividad", softSkills: ["Creatividad"], techSkills: ["Diseño"], finalProject: "Proyecto artístico" }];
    } else {
      primary = { title: "Programación Visual", desc: "Convertirá sus ideas en videojuegos.", color: "#1E88E5", emoji: "🐱", href: "/cursos/ninos/programacion-visual", softSkills: ["Lógica", "Tolerancia a la frustración"], techSkills: ["Scratch"], finalProject: "Primer videojuego" };
      secondary = [{ title: "Matemáticas Divertidas", desc: "Lógica y retos.", color: "#00C9FF", emoji: "➗", href: "/cursos/ninos/regularizacion-matematicas", softSkills: ["Pensamiento Analítico"], techSkills: ["Método Singapur"], finalProject: "Resolución de retos" }];
    }
  } else if (step0 === "teen") {
    if (step1 === "play") {
      primary = { title: "Roblox Studio", desc: "Crea tus propios mundos.", color: "#E53E3E", emoji: "🎮", href: "/cursos/adolescentes/diseno-videojuegos-roblox", softSkills: ["Trabajo en equipo", "Liderazgo"], techSkills: ["Lua", "3D"], finalProject: "Juego multijugador" };
      secondary = [{ title: "Unity", desc: "Videojuegos profesionales.", color: "#9C27B0", emoji: "👾", href: "/cursos/adolescentes/diseno-videojuegos-unity", softSkills: ["Pensamiento Crítico"], techSkills: ["C#"], finalProject: "Juego 3D" }];
    } else if (step1 === "solve") {
      primary = { title: "Python Pro", desc: "Desarrolla aplicaciones reales.", color: "#4CAF50", emoji: "🐍", href: "/cursos/adolescentes/python-pro", softSkills: ["Resolución de Problemas"], techSkills: ["Python", "APIs"], finalProject: "App web" };
      secondary = [{ title: "Unity", desc: "Lógica avanzada en videojuegos.", color: "#9C27B0", emoji: "👾", href: "/cursos/adolescentes/diseno-videojuegos-unity", softSkills: ["Abstracción"], techSkills: ["C#"], finalProject: "Juego 3D" }];
    } else {
      primary = { title: "Next Gen Creators", desc: "Creación de videos y contenido.", color: "#E91E63", emoji: "🎬", href: "/cursos/adolescentes/video-blogging", softSkills: ["Comunicación"], techSkills: ["Edición"], finalProject: "Canal de video" };
    }
  } else if (step0 === "adult") {
    if (step1 === "solve" || step3 === "job") {
      primary = { title: "IA Zero to Hero", desc: "Domina la IA para tu profesión.", color: "#10B981", emoji: "🤖", href: "/cursos/adultos/inteligencia-artificial-adultos", softSkills: ["Liderazgo", "Adaptabilidad"], techSkills: ["ChatGPT", "Automatización"], finalProject: "Flujo automatizado" };
    } else if (step1 === "draw") {
      primary = { title: "Next Gen Creators", desc: "Crea contenido de alto impacto.", color: "#E91E63", emoji: "🎥", href: "/cursos/adultos/video-blogging", softSkills: ["Comunicación"], techSkills: ["Video"], finalProject: "Marca personal" };
    } else {
      primary = { title: "Alfabetización Digital", desc: "Independencia en el mundo digital.", color: "#00C9FF", emoji: "💻", href: "/cursos/adultos/alfabetizacion-digital", softSkills: ["Autonomía", "Confianza"], techSkills: ["Office", "Internet"], finalProject: "Trámites digitales" };
    }
  } else {
    primary = { title: "Programación Visual", desc: "El mejor inicio en el mundo tech.", color: "#00C9FF", emoji: "🚀", href: "/cursos/ninos/programacion-visual", softSkills: ["Lógica"], techSkills: ["Scratch"], finalProject: "Primer videojuego" };
  }

  return { primary, secondary };
}

export function TestPage() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answer>({});
  const [isFinished, setIsFinished] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [selectedSede, setSelectedSede] = useState<string>("Naucalpan");

  const questionsList = getQuestions(answers);
  const currentQ = questionsList[step];
  const progress = step < 0 ? 0 : ((step + 1) / questionsList.length) * 100;

  const handleAnswer = (value: string) => {
    const key = currentQ.id as keyof Answer;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (step < questionsList.length - 1) setStep(step + 1);
      else setIsFinished(true);
    }, 300);
  };

  const reset = () => {
    setStep(-1);
    setAnswers({});
    setIsFinished(false);
    setLeadCaptured(false);
    setLeadName("");
    setLeadPhone("");
    setSelectedSede("Naucalpan");
  };

  const results = isFinished ? getResults(answers) : null;
  const result = results?.primary;

  const generateWhatsAppLink = () => {
    if (!result || !results) return "";

    const answerLabel = (questionId: string, answerId: string | undefined) => {
      if (!answerId) return "No respondida";
      const q = questionsList.find((q) => q.id === questionId);
      const opt = q?.options.find((o) => o.id === answerId);
      return opt ? opt.label : answerId;
    };

    const lines: string[] = [
      `Hola equipo de GōkuLab. Soy ${leadName}.`,
      `Teléfono: ${leadPhone}`,
      `Sede de interés: ${selectedSede}`,
      "",
      `Acabo de hacer el test y me recomendó el curso: *${result.title}*.`,
    ];

    if (results.secondary.length > 0) {
      lines.push(`Cursos alternativos: ${results.secondary.map((s) => s.title).join(", ")}`);
    }

    lines.push("");
    lines.push("Respuestas del test:");
    questionsList.forEach((q) => {
      const answerId = answers[q.id as keyof Answer];
      lines.push(`- ${q.title}: ${answerLabel(q.id, answerId)}`);
    });

    lines.push("");
    lines.push(`Me interesa desarrollar habilidades como: ${result.softSkills.join(", ")}.`);
    lines.push("");
    lines.push("Quiero agendar una masterclass gratuita.");
    lines.push("— Enviado desde el Test de Orientación de GōkuLab");

    const text = lines.join("\n");
    return `https://wa.me/5612668168?text=${encodeURIComponent(text)}`;
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;
    setLeadCaptured(true);
  };

  return (
    <div className="bg-[#050A14] text-white min-h-screen selection:bg-[#00C9FF] selection:text-black">
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-[#7C3AED] blur-[120px] opacity-20 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-6 bg-white/5 border border-white/10 text-[#00C9FF] font-black uppercase tracking-widest">
              <Sparkles size={14} /> Diagnóstico de Orientación
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              Encuentra su <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00C9FF] to-[#7C3AED]">superpoder</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              4 preguntas. 2 minutos. Una recomendación personalizada para dar el primer paso hacia el futuro.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 px-4 max-w-3xl mx-auto relative z-10">
        {step >= 0 && !isFinished && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3 text-sm font-bold text-gray-500 uppercase tracking-widest">
              <span>Pregunta {step + 1} de {questionsList.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#00C9FF] to-[#7C3AED] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {step === -1 && !isFinished && (
          <AnimatedSection className="p-8 md:p-12 rounded-[3rem] bg-white/5 border border-white/10 text-center backdrop-blur-sm">
            <div className="text-7xl mb-8">🚀</div>
            <h2 className="text-3xl font-black text-white mb-4">¿Listo para descubrirlo?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              No te preocupes por los términos técnicos. Solo dinos qué le gusta hacer y nosotros encontramos el curso perfecto.
            </p>

            <div className="mb-8">
              <p className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">Elige tu sede</p>
              <div className="flex gap-3 justify-center flex-wrap">
                {SEDES.map((sede) => (
                  <button
                    key={sede}
                    type="button"
                    onClick={() => setSelectedSede(sede)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all border ${
                      selectedSede === sede
                        ? "bg-white text-black border-white shadow-md"
                        : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {sede}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setStep(0)} className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl text-black font-black text-lg transition-transform hover:scale-105" style={{ background: "linear-gradient(135deg, #00C9FF, #7C3AED)", color: "#fff", boxShadow: "0 10px 30px rgba(0,201,255,0.3)" }}>
              Comenzar el diagnóstico <ArrowRight size={20} />
            </button>
          </AnimatedSection>
        )}

        {step >= 0 && !isFinished && currentQ && (
          <AnimatedSection key={step} className="p-8 md:p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-5xl mb-6">{currentQ.emoji}</div>
            <h2 className="text-3xl font-black text-white mb-2">{currentQ.title}</h2>
            <p className="text-gray-400 mb-8">{currentQ.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((opt) => (
                <button key={opt.id} onClick={() => handleAnswer(opt.id)} className={`p-6 rounded-2xl text-left flex items-center gap-4 transition-all duration-300 border ${answers[currentQ.id as keyof Answer] === opt.id ? "bg-[#7C3AED]/20 border-[#7C3AED] scale-[1.02]" : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30"}`}>
                  <span className="text-3xl">{opt.emoji}</span>
                  <span className="font-bold text-white/90">{opt.label}</span>
                </button>
              ))}
            </div>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="mt-8 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-colors">
                <ChevronLeft size={16} /> Volver atrás
              </button>
            )}
          </AnimatedSection>
        )}

        {isFinished && result && results && (
          <AnimatedSection className="rounded-[3rem] overflow-hidden bg-[#0A0F1E] border border-white/10 shadow-2xl">
            <div className="p-10 text-center border-b border-white/10" style={{ background: `linear-gradient(180deg, ${result.color}20 0%, transparent 100%)` }}>
              <div className="text-7xl mb-6 drop-shadow-2xl">{result.emoji}</div>
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4" style={{ background: result.color, color: "#fff" }}>Recomendación Principal</div>
              <h2 className="text-4xl font-black text-white mb-4">{result.title}</h2>
              <p className="text-gray-300 text-lg max-w-md mx-auto">{result.desc}</p>
            </div>

            <div className="p-8 border-b border-white/10 bg-white/5">
              <h3 className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Lo que desarrollará</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/20">
                  <div className="flex items-center gap-2 mb-4"><Brain className="text-[#7C3AED]" size={20} /><h4 className="font-black text-white">Soft Skills (El Superpoder)</h4></div>
                  <ul className="space-y-2">{result.softSkills.map(skill => <li key={skill} className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle size={14} className="text-[#7C3AED]" /> {skill}</li>)}</ul>
                </div>
                <div className="p-6 rounded-2xl bg-[#00C9FF]/10 border border-[#00C9FF]/20">
                  <div className="flex items-center gap-2 mb-4"><Zap className="text-[#00C9FF]" size={20} /><h4 className="font-black text-white">Tech Skills (La Herramienta)</h4></div>
                  <ul className="space-y-2">{result.techSkills.map(skill => <li key={skill} className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle size={14} className="text-[#00C9FF]" /> {skill}</li>)}</ul>
                </div>
              </div>
              <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
                <Target className="text-[#FFE134] mt-1 shrink-0" size={24} />
                <div><h4 className="font-bold text-white mb-1">El Proyecto Final</h4><p className="text-sm text-gray-400">{result.finalProject}</p></div>
              </div>
            </div>

            {results.secondary.length > 0 && (
              <div className="p-8 border-b border-white/10 bg-[#0A0F1E]">
                <h3 className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">También te podría interesar</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {results.secondary.map((sec, idx) => (
                    <Link key={idx} to={sec.href} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors flex items-center gap-4">
                      <span className="text-3xl">{sec.emoji}</span>
                      <div><h4 className="font-bold text-white text-sm">{sec.title}</h4><p className="text-xs text-gray-400 mt-1 line-clamp-1">{sec.desc}</p></div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {!leadCaptured ? (
              <div className="p-10 bg-[#050A14]">
                <div className="flex items-center gap-3 mb-6"><ShieldCheck className="text-[#10B981]" /><h3 className="text-xl font-bold text-white">¡Ya casi terminamos!</h3></div>
                <p className="text-gray-400 mb-8">Déjanos tus datos para enviarte el temario completo y agendar tu masterclass gratuita.</p>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-400 mb-2">Confirma tu sede</label>
                  <div className="flex gap-3 flex-wrap">
                    {SEDES.map((sede) => (
                      <button
                        key={sede}
                        type="button"
                        onClick={() => setSelectedSede(sede)}
                        className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl font-bold transition-all border ${
                          selectedSede === sede
                            ? "bg-white text-black border-white shadow-md"
                            : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {sede}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold text-gray-400 mb-2">Nombre completo</label><input type="text" required value={leadName} onChange={(e) => setLeadName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00C9FF]" placeholder="Ej. María González" /></div>
                    <div><label className="block text-sm font-bold text-gray-400 mb-2">WhatsApp</label><input type="tel" required value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00C9FF]" placeholder="Ej. 5512345678" /></div>
                  </div>
                  <button type="submit" className="w-full mt-4 flex items-center justify-center gap-2 py-5 rounded-xl text-black font-black text-lg transition-transform hover:scale-[1.02]" style={{ background: `linear-gradient(135deg, ${result.color}, #ffffff)`, color: "#000" }}>Ver mi plan y agendar <ArrowRight size={20} /></button>
                </form>
              </div>
            ) : (
              <div className="p-10 text-center bg-[#050A14]">
                <div className="w-20 h-20 bg-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-[#10B981]" /></div>
                <h3 className="text-2xl font-black text-white mb-4">¡Listo, {leadName.split(' ')[0]}!</h3>
                <p className="text-gray-400 mb-10">Tu recomendación está lista. Da el siguiente paso para asegurar tu lugar en el curso de <strong>{result.title}</strong>.</p>
                <div className="flex flex-col gap-4">
                  <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 py-5 rounded-2xl text-white font-black text-lg transition-transform hover:scale-105" style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 10px 30px rgba(37,211,102,0.3)" }}><MessageCircle size={24} /> Agendar por WhatsApp</a>
                  <Link to={result.href} className="flex items-center justify-center gap-2 py-5 rounded-2xl font-bold border-2 border-white/20 text-white hover:bg-white/5 transition-colors">Ver el temario completo (Syllabus) <ArrowRight size={18} /></Link>
                </div>
                <button onClick={reset} className="mt-8 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white mx-auto transition-colors"><RotateCcw size={16} /> Hacer el test de nuevo</button>
              </div>
            )}
          </AnimatedSection>
        )}
      </section>
    </div>
  );
}
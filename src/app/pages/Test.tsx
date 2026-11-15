import { useState, useEffect } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { ArrowRight, RotateCcw, MessageCircle, CheckCircle, ChevronLeft } from "lucide-react";
import { fetchAllCourses } from "../../Data/courseService";
import { CourseData } from "../../Data/courses";
import { useUTMs } from "../../hooks/useUTMs";

type Answer = { step0?: string; step1?: string; step2?: string; step3?: string; };

const SEDES = ["Naucalpan", "Ezequiel Montes"];

const getQuestions = (answers: Answer) => {
  const audience = answers.step0;

  const baseQuestion = {
    id: "step0", title: "¿Para quién es este curso?", subtitle: "Cuéntanos para orientarte mejor.", emoji: "👤",
    options: [
      { id: "kids", label: "Para mis hijos (5-11 años)", emoji: "🧒" },
      { id: "teen", label: "Para mí (12-17 años)", emoji: "🎮" },
      { id: "adult", label: "Para mí (18+)", emoji: "👨‍💼" },
      { id: "company", label: "Para mi empresa", emoji: "🏢" },
    ],
  };

  if (!audience) return [baseQuestion];

  if (audience === "kids" || audience === "teen") {
    return [
      baseQuestion,
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
        id: "step3", title: "¿Qué te gustaría que fortaleciera?", subtitle: "Esto define el enfoque del curso.", emoji: "🎯",
        options: [
          { id: "logic", label: "Pensamiento lógico y resolución de problemas", emoji: "🧩" },
          { id: "confidence", label: "Confianza en sí mismo y comunicación", emoji: "🗣️" },
          { id: "creativity", label: "Creatividad y expresión personal", emoji: "🎨" },
          { id: "teamwork", label: "Trabajo en equipo y colaboración", emoji: "🤝" },
        ],
      },
    ];
  }

  if (audience === "adult") {
    return [
      baseQuestion,
      {
        id: "step1", title: "¿Cuál es tu objetivo principal?", subtitle: "Esto nos ayuda a recomendarte el programa ideal.", emoji: "🎯",
        options: [
          { id: "career", label: "Mejorar mi carrera profesional", emoji: "📈" },
          { id: "ai", label: "Aprender Inteligencia Artificial", emoji: "🧠" },
          { id: "business", label: "Emprender mi propio negocio", emoji: "🚀" },
          { id: "leadership", label: "Liderazgo y gestión de proyectos", emoji: "💼" },
        ],
      },
      {
        id: "step2", title: "¿Cuál es tu nivel de experiencia?", subtitle: "No hay respuestas incorrectas.", emoji: "📊",
        options: [
          { id: "zero", label: "Cero experiencia, empezar desde cero", emoji: "🌱" },
          { id: "basic", label: "Ya sé lo básico", emoji: "📚" },
          { id: "adv", label: "Quiero especializarme", emoji: "🚀" },
        ],
      },
      {
        id: "step3", title: "¿Cuánto tiempo puedes dedicar?", subtitle: "Para ajustar la intensidad del programa.", emoji: "⏳",
        options: [
          { id: "short", label: "1-2 horas por semana", emoji: "⏱️" },
          { id: "medium", label: "3-5 horas por semana", emoji: "📅" },
          { id: "intense", label: "Más de 5 horas por semana", emoji: "🔥" },
        ],
      },
    ];
  }

  // FLUJO PARA EMPRESAS
  return [
    baseQuestion,
    {
      id: "step1", title: "¿Qué área necesita capacitar?", subtitle: "Selecciona el enfoque principal.", emoji: "🏢",
      options: [
        { id: "ai", label: "Inteligencia Artificial y automatización", emoji: "🤖" },
        { id: "security", label: "Ciberseguridad y gobernanza de IA", emoji: "🛡️" },
        { id: "leadership", label: "Liderazgo y gestión de proyectos", emoji: "💼" },
        { id: "digital", label: "Alfabetización digital para el equipo", emoji: "💻" },
      ],
    },
    {
      id: "step2", title: "¿Cuántos empleados participarán?", subtitle: "Para dimensionar el programa.", emoji: "👥",
      options: [
        { id: "small", label: "1-10 personas", emoji: "👤" },
        { id: "medium", label: "11-50 personas", emoji: "👥" },
        { id: "large", label: "Más de 50 personas", emoji: "🏢" },
      ],
    },
    {
      id: "step3", title: "¿Cuál es el objetivo principal?", subtitle: "Esto define el enfoque del programa.", emoji: "🎯",
      options: [
        { id: "reskill", label: "Reconversión laboral del equipo", emoji: "🔄" },
        { id: "upskill", label: "Potenciar habilidades existentes", emoji: "🚀" },
        { id: "innovation", label: "Innovación y transformación digital", emoji: "💡" },
      ],
    },
  ];
};

function getResults(answers: Answer) {
  const { step0, step1 } = answers;
  let primaryId = "";
  let secondaryIds: string[] = [];

  if (step0 === "company") {
    if (step1 === "ai" || step1 === "security") primaryId = "taller-gobernanza-ia-ciberseguridad";
    else if (step1 === "leadership") primaryId = "adminitracion-de-proyectos";
    else primaryId = "taller-resolucion-de-conflictos";
  } else if (step0 === "adult") {
    if (step1 === "ai") primaryId = "inteligencia-artificial-adultos";
    else if (step1 === "business") primaryId = "adminitracion-de-proyectos"; 
    else if (step1 === "leadership") primaryId = "taller-prompt-engeneering";
    else primaryId = "alfabetizacion-digital";
  } else if (step0 === "kids") {
    if (step1 === "play") { primaryId = "diseno-videojuegos-minecraft"; secondaryIds = ["programacion-visual"]; }
    else if (step1 === "build") primaryId = "robotica-principiantes";
    else if (step1 === "draw") primaryId = "diseno-grafico-ninos";
    else primaryId = "programacion-visual";
  } else {
    if (step1 === "play") primaryId = "diseno-videojuegos-roblox";
    else if (step1 === "solve") primaryId = "python-pro";
    else primaryId = "video-blogging";
  }

  return { primaryId, secondaryIds };
}

export function TestPage() {
  const utms = useUTMs();
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answer>({});
  const [isFinished, setIsFinished] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [selectedSede, setSelectedSede] = useState("Naucalpan");
  
  const [allCourses, setAllCourses] = useState<CourseData[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    fetchAllCourses().then(data => {
      setAllCourses(data);
      setIsDataLoading(false);
    });
  }, []);

  const questionsList = getQuestions(answers);
  const currentQ = questionsList[step];
  const progress = step < 0 ? 0 : ((step + 1) / questionsList.length) * 100;

  const handleAnswer = (value: string) => {
    const key = currentQ.id as keyof Answer;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    
    const nextQuestionsList = getQuestions(newAnswers);
    
    setTimeout(() => {
      if (step < nextQuestionsList.length - 1) {
        setStep(step + 1);
      } else {
        setIsFinished(true);
      }
    }, 300);
  };

  const reset = () => {
    setStep(-1); setAnswers({}); setIsFinished(false); setLeadCaptured(false); setLeadName(""); setLeadPhone(""); setSelectedSede("Naucalpan");
  };

  const resultsData = isFinished ? getResults(answers) : null;
  const primaryCourse = allCourses.find(c => c.id === resultsData?.primaryId);

  const getAnswerText = (questionId: string, answerId?: string) => {
    if (!answerId) return "No especificado";
    const q = questionsList.find((q) => q.id === questionId);
    const opt = q?.options.find((o) => o.id === answerId);
    return opt ? opt.label : answerId;
  };

  const generateWhatsAppLink = () => {
    if (!primaryCourse) return "";
    
    const text = `Hola equipo de GōkuLab.\n\nSoy ${leadName}.\nTeléfono: ${leadPhone}\nSede de interés: ${selectedSede}\n\n*Resultado del Test de Orientación:*\nCurso recomendado: *${primaryCourse.title}*\n\n*Mis respuestas:*\n- Perfil: ${getAnswerText("step0", answers.step0)}\n- Objetivo/Interés: ${getAnswerText("step1", answers.step1)}\n- Nivel: ${getAnswerText("step2", answers.step2)}\n- Enfoque: ${getAnswerText("step3", answers.step3)}\n\nQuiero agendar una masterclass gratuita.${utms}\n— Enviado desde el Test de Orientación de GōkuLab`;
    
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
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Encuentra su <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00C9FF] to-[#7C3AED]">superpoder</span></h1>
            <p className="text-xl text-gray-400 max-w-xl mx-auto">4 preguntas. 2 minutos. Una recomendación personalizada.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 px-4 max-w-3xl mx-auto relative z-10">
        {step >= 0 && !isFinished && (
          <div className="mb-10">
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#00C9FF] to-[#7C3AED] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {step === -1 && !isFinished && (
          <AnimatedSection className="p-8 md:p-12 rounded-[3rem] bg-white/5 border border-white/10 text-center backdrop-blur-sm">
            <div className="text-7xl mb-8">🚀</div>
            <h2 className="text-3xl font-black text-white mb-4">¿Listo para descubrirlo?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Solo dinos para quién es el curso y nosotros encontramos el programa perfecto.</p>
            <div className="mb-8">
              <p className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">Elige tu sede</p>
              <div className="flex gap-3 justify-center flex-wrap">
                {SEDES.map((sede) => (
                  <button key={sede} type="button" onClick={() => setSelectedSede(sede)} className={`px-6 py-3 rounded-xl font-bold transition-all border ${selectedSede === sede ? "bg-white text-black border-white shadow-md" : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"}`}>{sede}</button>
                ))}
              </div>
            </div>
            <button onClick={() => setStep(0)} className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl text-black font-black text-lg transition-transform hover:scale-105" style={{ background: "linear-gradient(135deg, #00C9FF, #7C3AED)", color: "#fff" }}>Comenzar el diagnóstico <ArrowRight size={20} /></button>
          </AnimatedSection>
        )}

        {step >= 0 && !isFinished && currentQ && (
          <AnimatedSection key={step} className="p-8 md:p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-5xl mb-6">{currentQ.emoji}</div>
            <h2 className="text-3xl font-black text-white mb-2">{currentQ.title}</h2>
            <p className="text-gray-400 mb-8">{currentQ.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((opt) => (
                <button key={opt.id} onClick={() => handleAnswer(opt.id)} className={`p-6 rounded-2xl text-left flex items-center gap-4 transition-all duration-300 border ${answers[currentQ.id as keyof Answer] === opt.id ? "bg-[#7C3AED]/20 border-[#7C3AED] scale-[1.02]" : "bg-white/5 border-white/10 hover:bg-white/10"}`}>
                  <span className="text-3xl">{opt.emoji}</span>
                  <span className="font-bold text-white/90">{opt.label}</span>
                </button>
              ))}
            </div>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="mt-8 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-colors"><ChevronLeft size={16} /> Volver atrás</button>
            )}
          </AnimatedSection>
        )}

        {isFinished && isDataLoading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00C9FF] mx-auto mb-4"></div>
            <p className="text-gray-400">Buscando tu curso ideal en nuestra base de datos...</p>
          </div>
        )}

        {isFinished && !isDataLoading && primaryCourse && resultsData && (
          <AnimatedSection className="rounded-[3rem] overflow-hidden bg-[#0A0F1E] border border-white/10 shadow-2xl">
            <div className="p-10 text-center border-b border-white/10" style={{ background: `linear-gradient(180deg, ${primaryCourse.color}20 0%, transparent 100%)` }}>
              <div className="text-7xl mb-6">{primaryCourse.emoji}</div>
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4" style={{ background: primaryCourse.color, color: "#fff" }}>Recomendación Principal</div>
              <h2 className="text-4xl font-black text-white mb-4">{primaryCourse.title}</h2>
              <p className="text-gray-300 text-lg max-w-md mx-auto">{primaryCourse.subtitle}</p>
            </div>

            <div className="p-8 border-b border-white/10 bg-white/5">
              <h3 className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Lo que desarrollará</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {primaryCourse.valueProps && primaryCourse.valueProps.length > 0 ? (
                  primaryCourse.valueProps.slice(0, 3).map((vp, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/20">
                      <h4 className="font-black text-white mb-2">{vp.icon} {vp.title}</h4>
                      <p className="text-sm text-gray-300">{vp.desc}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center col-span-2">Habilidades disponibles en el temario completo.</p>
                )}
              </div>
            </div>

            {!leadCaptured ? (
              <div className="p-10 bg-[#050A14]">
                <h3 className="text-xl font-bold text-white mb-4">¡Ya casi terminamos!</h3>
                <p className="text-gray-400 mb-6">Déjanos tus datos para enviarte el temario y agendar tu masterclass gratuita.</p>
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-400 mb-2">Confirma tu sede</p>
                  <div className="flex gap-2">{SEDES.map(s => <button key={s} onClick={() => setSelectedSede(s)} className={`px-4 py-2 rounded-xl text-sm font-bold border ${selectedSede === s ? "bg-white text-black" : "bg-white/5 text-gray-400"}`}>{s}</button>)}</div>
                </div>
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <input type="text" required placeholder="Nombre completo" value={leadName} onChange={e => setLeadName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C9FF]" />
                  <input type="tel" required placeholder="WhatsApp" value={leadPhone} onChange={e => setLeadPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C9FF]" />
                  <button type="submit" className="w-full py-4 rounded-xl text-black font-black text-lg" style={{ background: `linear-gradient(135deg, ${primaryCourse.color}, #fff)` }}>Ver mi plan y agendar <ArrowRight size={20} className="inline ml-2" /></button>
                </form>
              </div>
            ) : (
              <div className="p-10 text-center bg-[#050A14]">
                <CheckCircle size={48} className="text-[#10B981] mx-auto mb-4" />
                <h3 className="text-2xl font-black text-white mb-2">¡Listo, {leadName.split(' ')[0]}!</h3>
                <p className="text-gray-400 mb-8">Tu recomendación está lista. Agenda tu masterclass por WhatsApp.</p>
                <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-black text-lg" style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}><MessageCircle size={24} /> Agendar por WhatsApp</a>
                <div className="mt-6"><Link to={primaryCourse.targetAudience[0] === "company" ? `/cursos/empresas/${primaryCourse.id}` : primaryCourse.targetAudience[0] === "adults" ? `/cursos/adultos/${primaryCourse.id}` : primaryCourse.targetAudience[0] === "teens" ? `/cursos/adolescentes/${primaryCourse.id}` : `/cursos/ninos/${primaryCourse.id}`} className="text-[#00C9FF] font-bold hover:underline">Ver temario completo</Link></div>
                <button onClick={reset} className="mt-8 flex items-center gap-2 text-sm text-gray-500 hover:text-white mx-auto"><RotateCcw size={16} /> Hacer el test de nuevo</button>
              </div>
            )}
          </AnimatedSection>
        )}

        {isFinished && !isDataLoading && !primaryCourse && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <p className="text-gray-400 mb-4">No pudimos cargar la recomendación en este momento.</p>
            <button onClick={reset} className="text-[#00C9FF] font-bold hover:underline">Intentar de nuevo</button>
          </div>
        )}
      </section>
    </div>
  );
}
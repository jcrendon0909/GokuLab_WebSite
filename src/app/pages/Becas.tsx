import { useState } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { useTheme } from "next-themes";
import { HeartHandshake, CheckCircle2, ArrowRight, MessageCircle, FileText, Send, ShieldCheck, Sparkles } from "lucide-react";

export function Becas() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    edadAlumno: "",
    motivo: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Creamos el mensaje estructurado para la solicitud de beca
    const mensajeWa = `Hola equipo de GōkuLab. 👋\n\nQuiero solicitar información sobre las *Becas y Apoyos*.\n\n*Nombre del solicitante:* ${formData.nombre}\n*Edad del alumno:* ${formData.edadAlumno}\n*Mi WhatsApp:* ${formData.telefono}\n\n*Motivo / Situación:* ${formData.motivo}`;
    
    // Abrimos WhatsApp
    window.open(`https://wa.me/5612668168?text=${encodeURIComponent(mensajeWa)}`, "_blank");
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#050A14] text-white min-h-screen selection:bg-[#00C9FF] selection:text-black">
      
      {/* 1. HERO */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF6B35] blur-[150px] opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-6 bg-white/5 border border-white/10 text-[#FF6B35] font-black uppercase tracking-widest">
              <HeartHandshake size={14} /> Apoyo a nuestra comunidad
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              El talento no tiene <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFE134]">límites</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              En GōkuLab creemos que la situación económica no debe ser un obstáculo para aprender tecnología. 
              Conoce nuestro programa de becas y apoyos.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. FILOSOFÍA DE LA BECA */}
      <section className="py-20 px-4 bg-[#0A0F1E] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                ¿Cómo funcionan nuestras <span className="text-[#00C9FF]">becas</span>?
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                No tenemos un proceso automatizado e impersonal. En GōkuLab evaluamos cada caso de forma particular porque sabemos que cada familia tiene circunstancias y necesidades distintas.
              </p>
              <ul className="space-y-4">
                {[
                  "Evaluación caso a caso por nuestro comité.",
                  "Apoyos parciales o totales según el estudio socioeconómico.",
                  "Flexibilidad en planes de pago para alumnos destacados.",
                  "Renovación semestral basada en rendimiento y asistencia."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#10B981] mt-1 shrink-0" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={100} className="relative">
              <div className="p-8 rounded-[3rem] bg-gradient-to-br from-[#FF6B35]/20 to-[#7C3AED]/10 border border-white/10 text-center relative overflow-hidden">
                <Sparkles className="text-[#FFE134] mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-black text-white mb-4">Un compromiso social</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  "Buscamos que el acceso a experiencias de tecnología y creatividad no sea un privilegio, sino una oportunidad para más niñas, niños, jóvenes y adultos. Especialmente en contextos con menos recursos."
                </p>
                <p className="text-[#00C9FF] font-bold text-xs mt-4 uppercase tracking-widest">— Ideario GōkuLab</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. FORMULARIO DE SOLICITUD */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="bg-white/5 p-8 md:p-12 rounded-[3rem] border border-white/10 relative overflow-hidden">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-black mb-2">Inicia tu solicitud</h2>
                  <p className="text-gray-400">Déjanos tus datos y el equipo de admisiones se pondrá en contacto contigo por WhatsApp para guiarte en el proceso.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2">Nombre del padre/madre o tutor *</label>
                      <input required type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35]" placeholder="Ej. María González" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2">WhatsApp de contacto *</label>
                      <input required type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35]" placeholder="Ej. 5512345678" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Edad del alumno(a) *</label>
                    <select required name="edadAlumno" value={formData.edadAlumno} onChange={handleInputChange} className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35]">
                      <option value="">Selecciona una edad...</option>
                      <option value="5-7 años">5 a 7 años (Niños)</option>
                      <option value="8-11 años">8 a 11 años (Niños)</option>
                      <option value="12-17 años">12 a 17 años (Adolescentes)</option>
                      <option value="18+ años">18+ años (Adultos)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Cuéntanos brevemente tu situación (Opcional)</label>
                    <textarea name="motivo" value={formData.motivo} onChange={handleInputChange} rows={4} className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35]" placeholder="Ej. Buscamos apoyo para el curso de verano, somos familia monoparental..."></textarea>
                  </div>

                  <button type="submit" className="w-full py-5 rounded-xl text-white font-black text-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-4" style={{ background: "linear-gradient(135deg, #FF6B35, #FFE134)", color: "#000", boxShadow: "0 10px 30px rgba(255,107,53,0.2)" }}>
                    <MessageCircle size={20} /> Enviar solicitud por WhatsApp
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                    <ShieldCheck size={14} /> Tu información es 100% confidencial.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-[#10B981]" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">¡Solicitud iniciada!</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">Hemos abierto WhatsApp en otra pestaña con tu información. Solo presiona "Enviar" y un asesor te contactará para evaluar tu caso.</p>
                <button onClick={() => setIsSubmitted(false)} className="text-[#FF6B35] font-bold hover:underline">
                  Volver a llenar el formulario
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>
      </section>

      {/* 4. CTA FINAL */}
      <section className="py-20 px-4 text-center border-t border-white/5">
        <AnimatedSection className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black mb-4">¿Aún tienes dudas?</h2>
          <p className="text-gray-400 mb-8">Consulta nuestras preguntas frecuentes o contáctanos directamente.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Ir a Contacto <ArrowRight size={18} />
            </Link>
            <Link
              to="/cursos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors"
            >
              Ver todos los cursos
            </Link>
          </div>
        </AnimatedSection>
      </section>
      
    </div>
  );
}
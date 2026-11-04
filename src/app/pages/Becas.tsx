import { useState } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { 
  HeartHandshake, ArrowRight, MessageCircle, ShieldCheck, Users, 
  GraduationCap, Sparkles, CheckCircle2, Star, Compass
} from "lucide-react";

export function Becas() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    programa: "Programa Abriendo Caminos Digitales",
    mensaje: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mensaje estructurado para WhatsApp/Kommo
    const mensajeWa = `Hola equipo de GōkuLab. 👋\n\nEstoy interesado(a) en aplicar a los apoyos de GōkuLab.\n\n*Nombre:* ${formData.nombre}\n*Mi WhatsApp:* ${formData.telefono}\n*Programa / Beneficio de interés:* ${formData.programa}\n\n*Detalles adicionales:* ${formData.mensaje}`;
    
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
              <Compass size={14} /> Accesibilidad y Comunidad
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              Abriendo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFE134]">Caminos</span> Digitales
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Creemos firmemente que el talento y las ganas de aprender no deberían tener barreras. Descubre nuestro programa de inclusión y nuestros beneficios exclusivos para nuestra comunidad.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. EL PROGRAMA */}
      <section className="py-20 px-4 bg-[#0A0F1E] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF6B35]/20 text-[#FF6B35] mb-6">
                <HeartHandshake size={32} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                Programa "Abriendo Caminos Digitales"
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                Nacimos con la misión de llevar la tecnología a todos los rincones. A través de este programa, otorgamos apoyos económicos parciales o totales a estudiantes con gran potencial y ganas de aprender que enfrentan barreras socioeconómicas.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Evaluación de casos por nuestro comité de inclusión.",
                  "Apoyo para materiales y plataformas educativas.",
                  "Mentorías personalizadas para alumnos destacados."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#10B981] mt-1 shrink-0" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={100} className="relative">
              <div className="p-8 md:p-10 rounded-[3rem] bg-gradient-to-br from-[#FF6B35]/10 to-transparent border border-[#FF6B35]/20 text-center">
                <Sparkles className="text-[#FFE134] mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-black text-white mb-4">Nuestro Compromiso</h3>
                <p className="text-gray-300 leading-relaxed italic">
                  "Trabajamos para que el acceso a experiencias de tecnología y creatividad no sea un privilegio, sino una oportunidad para más niñas, niños, jóvenes y adultos. Especialmente en contextos con menos recursos."
                </p>
                <p className="text-[#FF6B35] font-bold text-xs mt-6 uppercase tracking-widest">— Ideario GōkuLab</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. DESCUENTOS EXCLUSIVOS */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
            Beneficios de la <span className="text-[#00C9FF]">Comunidad</span>
          </h2>
          <p className="text-lg text-gray-400">Recompensamos la lealtad y el crecimiento de nuestras familias.</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Descuento Hermanos */}
          <AnimatedSection delay={100}>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#00C9FF]/50 transition-colors h-full">
              <div className="w-14 h-14 rounded-2xl bg-[#00C9FF]/10 text-[#00C9FF] flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Descuento para Hermanos</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                El aprendizaje es mejor en equipo. Si inscribes a más de un hijo o familiar directo, obtienes un descuento especial en la mensualidad del segundo alumno en adelante.
              </p>
              <div className="bg-[#00C9FF]/5 border border-[#00C9FF]/20 rounded-xl p-4">
                <p className="text-sm font-bold text-[#00C9FF]">Consulta los porcentajes de descuento vigentes al inscribirte.</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Descuento Alumni */}
          <AnimatedSection delay={200}>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#7C3AED]/50 transition-colors h-full">
              <div className="w-14 h-14 rounded-2xl bg-[#7C3AED]/10 text-[#A78BFA] flex items-center justify-center mb-6">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Descuento Alumni (Exalumnos)</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                En GōkuLab, tu camino no termina al graduarte. Si ya cursaste un programa con nosotros y quieres continuar con un siguiente nivel, tienes un beneficio exclusivo para seguir creciendo.
              </p>
              <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/20 rounded-xl p-4">
                <p className="text-sm font-bold text-[#A78BFA]">Aplica para cursos avanzados o nuevos programas.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. FORMULARIO DE CONTACTO PARA APLICAR */}
      <section className="py-24 px-4 bg-[#0A0F1E] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="bg-white/5 p-8 md:p-12 rounded-[3rem] border border-white/10 relative overflow-hidden">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-black mb-2">Aplica a un beneficio</h2>
                    <p className="text-gray-400">Déjanos tus datos y un asesor te contactará por WhatsApp para revisar tu caso en particular.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Nombre completo *</label>
                        <input required type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="w-full bg-[#050A14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35]" placeholder="Ej. María González" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">WhatsApp de contacto *</label>
                        <input required type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} className="w-full bg-[#050A14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35]" placeholder="Ej. 5512345678" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2">¿Qué apoyo te interesa? *</label>
                      <select required name="programa" value={formData.programa} onChange={handleInputChange} className="w-full bg-[#050A14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35]">
                        <option value="Programa Abriendo Caminos Digitales">Programa Abriendo Caminos Digitales (Apoyo socioeconómico)</option>
                        <option value="Descuento para Hermanos">Descuento para Hermanos</option>
                        <option value="Descuento Alumni">Descuento para Exalumnos (Alumni)</option>
                        <option value="Otro">Otro beneficio / Tengo dudas generales</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2">Cuéntanos brevemente tu situación o duda (Opcional)</label>
                      <textarea name="mensaje" value={formData.mensaje} onChange={handleInputChange} rows={4} className="w-full bg-[#050A14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35]" placeholder="Comparte cualquier detalle que nos ayude a entender tu caso..."></textarea>
                    </div>

                    <button type="submit" className="w-full py-5 rounded-xl text-white font-black text-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-4" style={{ background: "linear-gradient(135deg, #FF6B35, #FFE134)", color: "#000", boxShadow: "0 10px 30px rgba(255,107,53,0.2)" }}>
                      <MessageCircle size={20} /> Enviar solicitud por WhatsApp
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                      <ShieldCheck size={14} /> Tu información es 100% confidencial y será evaluada por un humano.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-[#10B981]" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">¡Solicitud iniciada!</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">Hemos abierto WhatsApp en otra pestaña con tu información. Solo presiona "Enviar" y un asesor se pondrá en contacto contigo.</p>
                  <button onClick={() => setIsSubmitted(false)} className="text-[#FF6B35] font-bold hover:underline">
                    Volver a llenar el formulario
                  </button>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 5. CTA FINAL */}
      <section className="py-20 px-4 text-center">
        <AnimatedSection className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors"
            >
              Contactar al equipo <ArrowRight size={18} />
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
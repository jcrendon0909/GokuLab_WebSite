import { useState } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { useTheme } from "next-themes";
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, CheckCircle, ArrowRight, Building2 } from "lucide-react";

// --- DATOS DE LAS SEDES ---
const SEDES = [
  {
    id: "naucalpan",
    nombre: "Sede Naucalpan (Plaza San Mateo)",
    direccion: "Av. Adolfo López Mateos 201-418, MZ 001, Sta Cruz Acatlán, 53150 Naucalpan de Juárez, Méx.",
    referencias: "A un costado de Sodimac, arriba de Cinemex y Toks.",
    horarios: "Lunes a Viernes: 9:00 AM - 7:00 PM\nSábados: 9:00 AM - 2:00 PM",
    mapSrc: "https://www.google.com/maps?q=Av.+Adolfo+L%C3%B3pez+Mateos+201-418,+Sta+Cruz+Acatl%C3%A1n,+53150+Naucalpan+de+Ju%C3%A1rez,+M%C3%A9x.&output=embed"
  },
  {
    id: "queretaro",
    nombre: "Centro S. C. Ezequiel Montes",
    direccion: "Calle Benito Juárez 204, 76650 Ezequiel Montes, Querétaro.",
    referencias: "Centro de la ciudad.",
    horarios: "Lunes: 16:00 - 17:30\nViernes: 16:00 - 17:30",
    mapSrc: "https://www.google.com/maps?q=Calle+Benito+Ju%C3%A1rez+204,+76650+Ezequiel+Montes,+Quer%C3%A9taro&output=embed"
  }
];

export function Contacto() {
  const { theme } = useTheme();
  const [activeSede, setActiveSede] = useState(SEDES[0]);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    interes: "Cursos para niños",
    mensaje: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Creamos el mensaje estructurado para WhatsApp (Kommo)
    const mensajeWa = `Hola equipo de GōkuLab. 👋\n\nMi nombre es: *${formData.nombre}*\n\nEstoy interesado en: *${formData.interes}*\n\nMi WhatsApp es: ${formData.telefono}\nMi correo es: ${formData.email}\n\nMensaje: ${formData.mensaje}`;
    
    // Abrimos WhatsApp en una nueva pestaña
    window.open(`https://wa.me/5612668168?text=${encodeURIComponent(mensajeWa)}`, "_blank");
    
    // Mostramos el estado de éxito en la interfaz
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#050A14] text-white min-h-screen selection:bg-[#00C9FF] selection:text-black">
      
      {/* 1. HERO */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00C9FF] blur-[150px] opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-6 bg-white/5 border border-white/10 text-[#00C9FF] font-black uppercase tracking-widest">
              <MessageCircle size={14} /> Estamos para ayudarte
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              Hablemos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#7C3AED]">tu futuro</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              ¿Dudas sobre cursos, costos o empresas? Escríbenos y un asesor humano (o Gōku) te responderá en minutos.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. TARJETAS DE CONTACTO RÁPIDO */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: MessageCircle, title: "WhatsApp", desc: "Respuesta inmediata", link: "https://wa.me/5612668168", color: "#25D366" },
            { icon: Phone, title: "Llamar", desc: "Lun a Vie (9am - 7pm)", link: "tel:+525612668168", color: "#00C9FF" },
            { icon: Mail, title: "Correo", desc: "Información detallada", link: "mailto:contacto@gokulab.mx", color: "#7C3AED" }
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <a 
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="group block p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: `${item.color}20`, color: item.color }}>
                  <item.icon size={24} />
                </div>
                <h3 className="font-black text-white text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* 3. FORMULARIO + MAPA/SEDES */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Formulario */}
          <AnimatedSection className="bg-white/5 p-8 md:p-10 rounded-[3rem] border border-white/10 relative overflow-hidden">
            {!isSubmitted ? (
              <>
                <h2 className="text-3xl font-black mb-2">Envíanos un mensaje</h2>
                <p className="text-gray-400 mb-8">Llena el formulario y te contactaremos por WhatsApp.</p>
                
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2">Nombre completo *</label>
                      <input required type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C9FF]" placeholder="Ej. María González" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2">WhatsApp *</label>
                      <input required type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C9FF]" placeholder="Ej. 5512345678" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Correo electrónico *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C9FF]" placeholder="tu@correo.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">¿En qué te podemos ayudar? *</label>
                    <select name="interes" value={formData.interes} onChange={handleInputChange} className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C9FF]">
                      <option value="Cursos para niños">Cursos para niños (5-11 años)</option>
                      <option value="Cursos para adolescentes">Cursos para adolescentes (12-17 años)</option>
                      <option value="Cursos para adultos">Cursos para adultos (18+)</option>
                      <option value="Empresas">Capacitación para empresas</option>
                      <option value="Otro">Otro / Tengo una duda general</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Mensaje (Opcional)</label>
                    <textarea name="mensaje" value={formData.mensaje} onChange={handleInputChange} rows={3} className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C9FF]" placeholder="Cuéntanos qué curso te interesa..."></textarea>
                  </div>

                  <button type="submit" className="w-full py-4 rounded-xl text-black font-black text-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-4" style={{ background: "linear-gradient(135deg, #00C9FF, #7C3AED)", color: "#fff", boxShadow: "0 10px 30px rgba(0,201,255,0.2)" }}>
                    <Send size={20} /> Enviar por WhatsApp
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-[#10B981]" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">¡Mensaje preparado!</h3>
                <p className="text-gray-400 mb-8">Hemos abierto WhatsApp en otra pestaña con tu información. Solo presiona "Enviar" en WhatsApp y te responderemos al instante.</p>
                <button onClick={() => setIsSubmitted(false)} className="text-[#00C9FF] font-bold hover:underline">
                  Enviar otro mensaje
                </button>
              </div>
            )}
          </AnimatedSection>

          {/* Sedes (Selector + Mapa) */}
          <AnimatedSection delay={200} className="flex flex-col gap-6">
            
            {/* Selector de Sede */}
            <div className="flex bg-white/5 p-2 rounded-2xl border border-white/10">
              {SEDES.map((sede) => (
                <button
                  key={sede.id}
                  onClick={() => setActiveSede(sede)}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                    activeSede.id === sede.id
                      ? "bg-white text-black shadow-md"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {sede.id === "naucalpan" ? "Naucalpan" : "Ezequiel Montes"}
                </button>
              ))}
            </div>

            {/* Mapa Dinámico */}
            <div className="rounded-[3rem] overflow-hidden border border-white/10 relative h-[300px] bg-[#0A0F1E]">
              <iframe 
                src={activeSede.mapSrc} 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: theme === "dark" ? "invert(90%) hue-rotate(180deg) contrast(1.2)" : "none" }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title={`Ubicación ${activeSede.nombre}`}
              />
            </div>

            {/* Info de la sede seleccionada */}
            <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 flex-1">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                <Building2 className="text-[#00C9FF]" /> {activeSede.nombre}
              </h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="text-[#FF6B35]" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Dirección</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {activeSede.direccion}
                      {activeSede.referencias && (
                        <span className="text-xs text-gray-500 italic mt-1 block">({activeSede.referencias})</span>
                      )}
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <Clock className="text-[#10B981]" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Horarios de Atención</h4>
                    <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                      {activeSede.horarios}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* 4. CTA FINAL (Empresas) */}
      <section className="py-20 px-4 text-center border-t border-white/5">
        <AnimatedSection className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black mb-4">¿Necesitas capacitación corporativa?</h2>
          <p className="text-gray-400 mb-8">Conoce nuestra área de soluciones para empresas y gobierno.</p>
          <Link
            to="/capacitaciones"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors"
          >
            Ir a Empresas <ArrowRight size={18} />
          </Link>
        </AnimatedSection>
      </section>
      
    </div>
  );
}
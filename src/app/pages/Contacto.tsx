import { useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, Clock } from "lucide-react";

const countryOptions = [
  { code: "+52", flag: "🇲🇽", name: "México" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "+593", flag: "🇪🇨", name: "Ecuador" },
  { code: "+34", flag: "🇪🇸", name: "España" },
  { code: "+58", flag: "🇻🇪", name: "Venezuela" },
  { code: "+51", flag: "🇵🇪", name: "Perú" },
  { code: "+55", flag: "🇧🇷", name: "Brasil" },
];

export function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipo: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Track form submit
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "form_submit", { event_category: "Lead" });
    }
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    color: "#fff",
    padding: "12px 16px",
    width: "100%",
    outline: "none",
    fontSize: "0.9rem",
    transition: "border-color 0.2s ease",
  };

  return (
    <div>
      {/* HERO */}
      <section
        className="pt-32 pb-16 px-4 relative overflow-hidden"
        style={{ background: "#050A14" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,201,255,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-5xl mx-auto text-center relative">
          <AnimatedSection>
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-6"
              style={{
                background: "rgba(0,201,255,0.1)",
                color: "#00C9FF",
                border: "1px solid rgba(0,201,255,0.25)",
              }}
            >
              📩 Contáctanos
            </div>
            <h1
              className="text-white mb-4"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 1.15,
              }}
            >
              Hablemos de tu{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                superfuturo
              </span>
            </h1>
            <p className="text-white/65 max-w-xl mx-auto" style={{ fontSize: "1.1rem" }}>
              Alguien de nuestro equipo te contactará en menos de 24 horas. Sin robots,
              sin scripts. Solo personas que quieren ayudarte.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <AnimatedSection direction="left">
              {/* Quick options */}
              <div className="mb-10">
                <h2
                  className="text-white mb-6"
                  style={{ fontWeight: 700, fontSize: "1.3rem" }}
                >
                  Contacto directo
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      icon: MessageCircle,
                      label: "WhatsApp",
                      value: "+52 (55) 1234-5678",
                      color: "#25D366",
                      href: "https://wa.me/5612668168?text=Hola%20GOKU%20LAB,%20quiero%20agendar%20mi%20clase%20muestra",
                      action: "Escribir ahora",
                    },
                    {
                      icon: Phone,
                      label: "Llamada",
                      value: "+52 (55) 1234-5678",
                      color: "#00C9FF",
                      href: "tel:+525612668168",
                      action: "Llamar",
                    },
                    {
                      icon: Mail,
                      label: "Correo",
                      value: "hola@gokulab.mx",
                      color: "#7C3AED",
                      href: "mailto:hola@gokulab.mx",
                      action: "Enviar email",
                    },
                  ].map(({ icon: Icon, label, value, color, href, action }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl group"
                      style={{
                        background: `${color}08`,
                        border: `1px solid ${color}20`,
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = `${color}15`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
                        (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = `${color}08`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${color}20`;
                        (e.currentTarget as HTMLElement).style.transform = "none";
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${color}18` }}
                      >
                        <Icon size={22} style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white/40 text-xs mb-0.5">{label}</div>
                        <div className="text-white text-sm font-semibold truncate">
                          {value}
                        </div>
                      </div>
                      <span
                        className="text-xs font-semibold shrink-0 opacity-0 group-hover:opacity-100"
                        style={{ color, transition: "opacity 0.2s ease" }}
                      >
                        {action} →
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-10">
                <h2
                  className="text-white mb-4"
                  style={{ fontWeight: 700, fontSize: "1.1rem" }}
                >
                  Ubicación
                </h2>

                {/* Sede Principal */}
                <div
                  className="p-5 rounded-2xl mb-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin size={18} className="text-[#00C9FF] mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold">
                        GOKU LAB – Sede Principal
                      </div>
                      <div className="text-white/50 text-sm mt-0.5">
                        Av. Insurgentes Sur 1234, Col. Del Valle,<br />
                        Ciudad de México, CDMX, 03100
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <Clock size={16} className="text-[#00C9FF] shrink-0" />
                    <span className="text-white/50 text-sm">
                      Lunes–Viernes 10:00–18:00 · Sábados 9:00–13:00
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <a
                      href="https://waze.com/ul?ll=19.3728,-99.1707&navigate=yes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold"
                      style={{
                        background: "rgba(51,193,243,0.1)",
                        color: "#33C1F3",
                        border: "1px solid rgba(51,193,243,0.2)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(51,193,243,0.18)";
                        e.currentTarget.style.borderColor = "rgba(51,193,243,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(51,193,243,0.1)";
                        e.currentTarget.style.borderColor = "rgba(51,193,243,0.2)";
                      }}
                    >
                      Waze
                    </a>
                    <a
                      href="https://maps.google.com/?q=19.3728,-99.1707"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold"
                      style={{
                        background: "rgba(66,133,244,0.1)",
                        color: "#4285F4",
                        border: "1px solid rgba(66,133,244,0.2)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(66,133,244,0.18)";
                        e.currentTarget.style.borderColor = "rgba(66,133,244,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(66,133,244,0.1)";
                        e.currentTarget.style.borderColor = "rgba(66,133,244,0.2)";
                      }}
                    >
                      Google
                    </a>
                    <a
                      href="https://maps.apple.com/?q=19.3728,-99.1707"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.15)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                      }}
                    >
                      Apple
                    </a>
                  </div>
                </div>

                {/* Sede Lomas Verdes */}
                <div
                  className="p-5 rounded-2xl mb-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin size={18} className="text-[#7C3AED] mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold">
                        GOKU LAB – Lomas Verdes
                      </div>
                      <div className="text-white/50 text-sm mt-0.5">
                        Irun 123, Lomas Verdes,<br />
                        Naucalpan, Estado de México
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="https://waze.com/ul?ll=19.5169,-99.2394&navigate=yes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold"
                      style={{
                        background: "rgba(51,193,243,0.1)",
                        color: "#33C1F3",
                        border: "1px solid rgba(51,193,243,0.2)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(51,193,243,0.18)";
                        e.currentTarget.style.borderColor = "rgba(51,193,243,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(51,193,243,0.1)";
                        e.currentTarget.style.borderColor = "rgba(51,193,243,0.2)";
                      }}
                    >
                      Waze
                    </a>
                    <a
                      href="https://maps.google.com/?q=19.5169,-99.2394"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold"
                      style={{
                        background: "rgba(66,133,244,0.1)",
                        color: "#4285F4",
                        border: "1px solid rgba(66,133,244,0.2)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(66,133,244,0.18)";
                        e.currentTarget.style.borderColor = "rgba(66,133,244,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(66,133,244,0.1)";
                        e.currentTarget.style.borderColor = "rgba(66,133,244,0.2)";
                      }}
                    >
                      Google
                    </a>
                    <a
                      href="https://maps.apple.com/?q=19.5169,-99.2394"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.15)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                      }}
                    >
                      Apple
                    </a>
                  </div>
                </div>

                {/* Centro Ezequiel Montes */}
                <div
                  className="p-5 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin size={18} className="text-[#10B981] mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold">
                        Centro S. C. Ezequiel Montes
                      </div>
                      <div className="text-white/50 text-sm mt-0.5">
                        Calle Benito Juárez 204,<br />
                        76650 Ezequiel Montes, Querétaro
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <Clock size={16} className="text-[#10B981] shrink-0" />
                    <span className="text-white/50 text-sm">
                      Lunes 16:00–17:30
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="https://waze.com/ul?ll=20.8067,-99.9006&navigate=yes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold"
                      style={{
                        background: "rgba(51,193,243,0.1)",
                        color: "#33C1F3",
                        border: "1px solid rgba(51,193,243,0.2)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(51,193,243,0.18)";
                        e.currentTarget.style.borderColor = "rgba(51,193,243,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(51,193,243,0.1)";
                        e.currentTarget.style.borderColor = "rgba(51,193,243,0.2)";
                      }}
                    >
                      Waze
                    </a>
                    <a
                      href="https://maps.google.com/?q=20.8067,-99.9006"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold"
                      style={{
                        background: "rgba(66,133,244,0.1)",
                        color: "#4285F4",
                        border: "1px solid rgba(66,133,244,0.2)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(66,133,244,0.18)";
                        e.currentTarget.style.borderColor = "rgba(66,133,244,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(66,133,244,0.1)";
                        e.currentTarget.style.borderColor = "rgba(66,133,244,0.2)";
                      }}
                    >
                      Google
                    </a>
                    <a
                      href="https://maps.apple.com/?q=20.8067,-99.9006"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.15)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                      }}
                    >
                      Apple
                    </a>
                  </div>
                </div>
              </div>

              {/* Response time */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.2)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle size={18} className="text-[#10B981]" />
                  <span className="text-white font-semibold">
                    Respuesta garantizada
                  </span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Respondemos todos los mensajes en menos de{" "}
                  <span className="text-[#10B981] font-semibold">24 horas hábiles</span>.
                  Por WhatsApp, en minutos.
                </p>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection direction="right" delay={100}>
              <div
                className="p-8 rounded-3xl"
                id="contacto-form"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {!submitted ? (
                  <>
                    <h2
                      className="text-white mb-2"
                      style={{ fontWeight: 700, fontSize: "1.3rem" }}
                    >
                      Contacto
                    </h2>
                    <p className="text-white/50 text-sm mb-6">
                      Completa el formulario y alguien del equipo te contactará pronto.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/60 text-xs mb-1.5">
                            Nombre completo *
                          </label>
                          <input
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                            required
                            style={inputStyle}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#00C9FF";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "rgba(255,255,255,0.12)";
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-white/60 text-xs mb-1.5">
                            Teléfono *
                          </label>
                          <div className="flex gap-2">
                            {/* Country selector */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setCountryMenuOpen(!countryMenuOpen)}
                                className="flex items-center gap-2 px-3 py-3 rounded-lg"
                                style={{
                                  ...inputStyle,
                                  width: "auto",
                                  minWidth: "110px",
                                }}
                              >
                                <span className="text-base">{selectedCountry.flag}</span>
                                <span className="text-white/70 text-sm">{selectedCountry.code}</span>
                                <svg
                                  width="12"
                                  height="12"
                                  fill="none"
                                  className="text-white/40"
                                  style={{
                                    transform: countryMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "transform 0.2s",
                                  }}
                                >
                                  <path
                                    d="M2 4l4 4 4-4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>

                              {countryMenuOpen && (
                                <div
                                  className="absolute top-full left-0 mt-1 w-48 rounded-xl overflow-hidden shadow-2xl z-50"
                                  style={{
                                    background: "rgba(14, 24, 33, 0.98)",
                                    border: "1px solid rgba(0,201,255,0.2)",
                                    backdropFilter: "blur(12px)",
                                    maxHeight: "240px",
                                    overflowY: "auto",
                                  }}
                                >
                                  {countryOptions.map((country) => (
                                    <button
                                      key={country.code}
                                      type="button"
                                      onClick={() => {
                                        setSelectedCountry(country);
                                        setCountryMenuOpen(false);
                                      }}
                                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/10 transition-colors duration-200"
                                      style={{
                                        background: selectedCountry.code === country.code ? "rgba(0,201,255,0.1)" : "transparent",
                                      }}
                                    >
                                      <span className="text-lg">{country.flag}</span>
                                      <div className="flex-1">
                                        <div className="text-white/80 text-sm">{country.name}</div>
                                        <div className="text-white/40 text-xs">{country.code}</div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Phone input */}
                            <input
                              name="telefono"
                              value={form.telefono}
                              onChange={handleChange}
                              placeholder="Número de teléfono"
                              required
                              className="flex-1"
                              style={inputStyle}
                              onFocus={(e) => {
                                e.target.style.borderColor = "#00C9FF";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = "rgba(255,255,255,0.12)";
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/60 text-xs mb-1.5">
                          Correo electrónico *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="tucorreo@ejemplo.com"
                          required
                          style={inputStyle}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#00C9FF";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(255,255,255,0.12)";
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-white/60 text-xs mb-1.5">
                          ¿Qué te interesa?
                        </label>
                        <select
                          name="tipo"
                          value={form.tipo}
                          onChange={handleChange}
                          style={{ ...inputStyle, cursor: "pointer" }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#00C9FF";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(255,255,255,0.12)";
                          }}
                        >
                          <option value="" style={{ background: "#0A0F1E" }}>
                            Selecciona una opción
                          </option>
                          <option value="ninos" style={{ background: "#0A0F1E" }}>
                            Cursos para mis hijos
                          </option>
                          <option value="adultos" style={{ background: "#0A0F1E" }}>
                            Cursos para adultos
                          </option>
                          <option value="empresa" style={{ background: "#0A0F1E" }}>
                            Capacitación empresarial
                          </option>
                          <option value="beca" style={{ background: "#0A0F1E" }}>
                            Beca o apoyo económico
                          </option>
                          <option value="evento" style={{ background: "#0A0F1E" }}>
                            Inscripción a evento
                          </option>
                          <option value="otro" style={{ background: "#0A0F1E" }}>
                            Otro
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/60 text-xs mb-1.5">
                          Mensaje (opcional)
                        </label>
                        <textarea
                          name="mensaje"
                          value={form.mensaje}
                          onChange={handleChange}
                          placeholder="Cuéntanos más sobre lo que buscas..."
                          rows={4}
                          style={{ ...inputStyle, resize: "none" }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#00C9FF";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(255,255,255,0.12)";
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-bold"
                        style={{
                          background: loading
                            ? "rgba(255,255,255,0.1)"
                            : "linear-gradient(135deg, #00C9FF, #7C3AED)",
                          boxShadow: loading
                            ? "none"
                            : "0 6px 25px rgba(0,201,255,0.3)",
                          transition: "all 0.2s ease",
                          fontSize: "1rem",
                          cursor: loading ? "not-allowed" : "pointer",
                        }}
                        onMouseEnter={(e) => {
                          if (!loading)
                            e.currentTarget.style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        {loading ? (
                          <>
                            <div
                              className="w-5 h-5 border-2 border-white/30 rounded-full"
                              style={{
                                borderTopColor: "#fff",
                                animation: "spin 0.8s linear infinite",
                              }}
                            />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Enviar y agendar masterclass
                          </>
                        )}
                      </button>

                      <p className="text-white/30 text-xs text-center">
                        Al enviar aceptas que alguien del equipo te contacte. Sin spam. Sin compromiso.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-10">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{
                        background: "rgba(16,185,129,0.15)",
                        border: "2px solid #10B981",
                      }}
                    >
                      <CheckCircle size={36} className="text-[#10B981]" />
                    </div>
                    <h3
                      className="text-white mb-3"
                      style={{ fontWeight: 800, fontSize: "1.5rem" }}
                    >
                      ¡Mensaje recibido! 🎉
                    </h3>
                    <p className="text-white/60 mb-6 leading-relaxed">
                      Alguien del equipo GOKU LAB te contactará en las próximas
                      24 horas hábiles. Para respuesta inmediata, escríbenos
                      por WhatsApp.
                    </p>
                    <a
                      href="https://wa.me/5612668168"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white font-semibold mx-auto"
                      style={{ background: "#25D366", width: "fit-content" }}
                    >
                      <MessageCircle size={18} />
                      Escribir por WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

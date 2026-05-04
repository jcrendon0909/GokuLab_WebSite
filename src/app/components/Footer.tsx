import { Link } from "react-router";
import { Zap, MessageCircle, Instagram, Youtube, Mail, Phone, MapPin, Facebook } from "lucide-react";
import { useTheme } from "next-themes";

export function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className="transition-colors duration-300"
      style={{
        background: isDark ? "#040810" : "#f9fafb",
        borderTop: isDark ? "1px solid rgba(0,201,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
      }}
    >
      {/* CTA Banner */}
      <div
        className="py-16 px-4 transition-colors duration-300"
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(0,201,255,0.08), rgba(124,58,237,0.08))"
            : "linear-gradient(135deg, rgba(0,201,255,0.05), rgba(124,58,237,0.05))",
          borderBottom: isDark
            ? "1px solid rgba(0,201,255,0.1)"
            : "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-white dark:text-white light:text-gray-900 mb-4 transition-colors duration-300"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 800 }}
          >
            ¿Listo para desbloquear el{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              superpoder
            </span>{" "}
            de la tecnología?
          </h2>
          <p
            className="text-white/60 dark:text-white/60 light:text-gray-600 mb-8 transition-colors duration-300"
            style={{ fontSize: "1.1rem" }}
          >
            Agenda una masterclass gratuita y descubre el camino perfecto para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5612668168?text=Hola,%20quiero%20mi%20clase%20muestra%20gratuita"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold"
              style={{
                background: "#25D366",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <MessageCircle size={20} />
              Agendar por WhatsApp
            </a>
            <Link
              to="/contacto"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold border transition-all duration-300
                text-white dark:text-white light:text-gray-900
                border-white/30 dark:border-white/30 light:border-gray-300
                hover:border-white/60 dark:hover:border-white/60 light:hover:border-gray-500"
              style={{ transition: "all 0.2s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "";
              }}
            >
              Ver todos los cursos
            </Link>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #00C9FF, #7C3AED)" }}
              >
                <Zap size={18} className="text-white" />
              </div>
              <span
                className="text-white dark:text-white light:text-gray-900 transition-colors duration-300"
                style={{ fontSize: "1.1rem", fontWeight: 800 }}
              >
                GOKU{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #00C9FF, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  LAB
                </span>
              </span>
            </div>
            <p className="text-white/50 dark:text-white/50 light:text-gray-600 text-sm leading-relaxed mb-5 transition-colors duration-300">
              Academia tecnológica para niños, adolescentes, adultos y empresas.
              Creemos en superpoderes para un superfuturo.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/goku_lab/" },
                { Icon: Facebook, href: "https://www.facebook.com/GokuLabMx/" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0,201,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Cursos */}
          <div>
            <h4
              className="text-white dark:text-white light:text-gray-900 mb-4 transition-colors duration-300"
              style={{ fontWeight: 600 }}
            >
              Cursos
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Niños y adolescentes", href: "/cursos/ninos" },
                { label: "Para adultos", href: "/cursos/adultos" },
                { label: "Capacitaciones empresariales", href: "/capacitaciones" },
                { label: "Programación", href: "/cursos" },
                { label: "Robótica", href: "/cursos" },
                { label: "Diseño", href: "/cursos" },
              ].map((item) => (
                <Link
                  key={item.href + item.label}
                  to={item.href}
                  className="text-sm text-white/50 dark:text-white/50 light:text-gray-600 hover:text-white/90 dark:hover:text-white/90 light:hover:text-gray-900 transition-colors duration-300"
                  style={{ transition: "color 0.2s ease" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Sitio */}
          <div>
            <h4
              className="text-white dark:text-white light:text-gray-900 mb-4 transition-colors duration-300"
              style={{ fontWeight: 600 }}
            >
              Sitio
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Nosotros", href: "/nosotros" },
                { label: "Metodología", href: "/metodologia" },
                { label: "Test vocacional", href: "/test" },
                { label: "Eventos", href: "/eventos" },
                { label: "Becas y alianzas", href: "/becas" },
                { label: "Contacto", href: "/contacto" },
              ].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-white/50 dark:text-white/50 light:text-gray-600 hover:text-white/90 dark:hover:text-white/90 light:hover:text-gray-900 transition-colors duration-300"
                  style={{ transition: "color 0.2s ease" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4
              className="text-white dark:text-white light:text-gray-900 mb-4 transition-colors duration-300"
              style={{ fontWeight: 600 }}
            >
              Contacto
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { icon: Phone, text: "+52 (55) 1234-5678" },
                { icon: Mail, text: "hola@gokulab.mx" },
                { icon: MapPin, text: "Ciudad de México, México", isBold: true },
                { icon: MapPin, text: "Lomas Verdes: Irun 123, Lomas Verdes, Naucalpan, Méx", noIcon: true },
              ].map(({ icon: Icon, text, isBold, noIcon }, idx) => (
                <div key={text} className="flex items-start gap-3">
                  {!noIcon && <Icon size={16} className="text-[#00C9FF] mt-0.5 shrink-0" />}
                  {noIcon && <div className="w-4" />}
                  <span
                    className={`text-sm text-white/50 dark:text-white/50 light:text-gray-600 transition-colors duration-300 ${
                      isBold ? "font-semibold" : ""
                    }`}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/5612668168"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white font-semibold"
              style={{
                background: "#25D366",
                width: "fit-content",
                transition: "all 0.2s ease",
              }}
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300"
          style={{
            borderTop: isDark
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <p className="text-white/30 dark:text-white/30 light:text-gray-500 text-sm transition-colors duration-300">
            © 2026 GOKU LAB. Todos los derechos reservados.
          </p>
          <div className="flex gap-5">
            {["Privacidad", "Términos", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-white/30 dark:text-white/30 light:text-gray-500 hover:text-white/60 dark:hover:text-white/60 light:hover:text-gray-700 transition-colors duration-300"
                style={{ transition: "color 0.2s ease" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

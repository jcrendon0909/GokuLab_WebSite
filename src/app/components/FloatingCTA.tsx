"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, Phone, X, ChevronUp, Bot, WifiOff, RefreshCw, ExternalLink, Maximize2, Minimize2 } from "lucide-react";
import { useTheme } from "next-themes";

// ─── Constantes ────────────────────────────────────────────────────────────────
const CHATBOT_URL = "https://chatbot-gokulab-valeria.onrender.com";
const WHATSAPP_URL =
  "https://wa.me/5612668168?text=Hola,%20me%20interesa%20agendar%20una%20clase%20muestra%20gratuita%20en%20GOKU%20LAB";
const PHONE_NUMBER = "tel:+5612668168";

// Tiempo máximo de espera antes de mostrar el aviso de "servidor iniciando" (ms)
const COLD_START_THRESHOLD = 6000;
// Tiempo de timeout total del iframe (ms)
const LOAD_TIMEOUT = 60000;

type ChatStatus = "idle" | "loading" | "cold_start" | "ready" | "error";

// ─── Helpers ───────────────────────────────────────────────────────────────────
function trackEvent(eventName: string) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, { event_category: "CTA" });
  }
}

// ─── Sub-componente: barra de estado del chat ──────────────────────────────────
function ChatStatusBar({ status, onRetry }: { status: ChatStatus; onRetry: () => void }) {
  if (status === "ready") return null;

  return (
    <div
      style={{
        padding: "8px 16px",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background:
          status === "error"
            ? "rgba(239,68,68,0.08)"
            : status === "cold_start"
            ? "rgba(234,179,8,0.08)"
            : "rgba(124,58,237,0.05)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        color:
          status === "error"
            ? "#b91c1c"
            : status === "cold_start"
            ? "#92400e"
            : "#5b21b6",
        minHeight: "36px",
      }}
    >
      {status === "loading" && (
        <>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#7c3aed",
              animation: "pulse 1.4s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <span>Conectando con el asistente…</span>
        </>
      )}

      {status === "cold_start" && (
        <>
          <WifiOff size={13} style={{ flexShrink: 0 }} />
          <span>
            El servidor está iniciando (puede tardar ~30 s la primera vez). Por favor espera…
          </span>
        </>
      )}

      {status === "error" && (
        <>
          <WifiOff size={13} style={{ flexShrink: 0 }} />
          <span style={{ flex: 1 }}>No se pudo conectar.</span>
          <button
            onClick={onRetry}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "1px solid currentColor",
              borderRadius: "6px",
              padding: "2px 8px",
              cursor: "pointer",
              color: "inherit",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            <RefreshCw size={11} />
            Reintentar
          </button>
        </>
      )}
    </div>
  );
}

// ─── Sub-componente: skeleton de carga ────────────────────────────────────────
function ChatSkeleton() {
  const shimmer: React.CSSProperties = {
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
    borderRadius: "12px",
  };

  return (
    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <style>{`
        @keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
        @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.4 } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(6px) } to { opacity:1; transform:translateY(0) } }
        @keyframes slideUp { from { opacity:0; transform: translateY(16px) scale(0.97) } to { opacity:1; transform: translateY(0) scale(1) } }
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes badgePop { 0%,100% { transform: scale(1) } 50% { transform: scale(1.15) } }
      `}</style>

      {/* Bot message */}
      <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#e9d5ff", flexShrink: 0 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          <div style={{ ...shimmer, height: "36px", width: "75%" }} />
        </div>
      </div>

      {/* Bot message 2 */}
      <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#e9d5ff", flexShrink: 0 }} />
        <div style={{ ...shimmer, height: "52px", width: "88%" }} />
      </div>

      {/* User message (right) */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ ...shimmer, height: "32px", width: "55%", borderRadius: "16px 4px 16px 16px" }} />
      </div>

      {/* Bot message 3 */}
      <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#e9d5ff", flexShrink: 0 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          <div style={{ ...shimmer, height: "28px", width: "90%" }} />
          <div style={{ ...shimmer, height: "28px", width: "60%" }} />
        </div>
      </div>

      {/* Input bar skeleton */}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          background: "#f5f5f5",
          borderRadius: "16px",
          padding: "10px 14px",
        }}
      >
        <div style={{ ...shimmer, flex: 1, height: "18px" }} />
        <div style={{ ...shimmer, width: "32px", height: "32px", borderRadius: "50%" }} />
      </div>
    </div>
  );
}

// ─── Componente principal ──────────────────────────────────────────────────────
export function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [expanded, setExpanded] = useState(false); // modo expandido
  const [chatStatus, setChatStatus] = useState<ChatStatus>("idle");
  const [iframeKey, setIframeKey] = useState(0); // para forzar reload
  const [unread, setUnread] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const coldStartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // ─── Limpiar timers ────────────────────────────────────────────────────────
  const clearTimers = useCallback(() => {
    if (coldStartTimerRef.current) clearTimeout(coldStartTimerRef.current);
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
  }, []);

  // ─── Iniciar carga del iframe ──────────────────────────────────────────────
  const startLoading = useCallback(() => {
    clearTimers();
    setChatStatus("loading");

    // Si tarda más de COLD_START_THRESHOLD → mostrar aviso de cold start
    coldStartTimerRef.current = setTimeout(() => {
      setChatStatus((prev) => (prev === "loading" ? "cold_start" : prev));
    }, COLD_START_THRESHOLD);

    // Si tarda más de LOAD_TIMEOUT → error
    loadTimeoutRef.current = setTimeout(() => {
      setChatStatus((prev) =>
        prev === "loading" || prev === "cold_start" ? "error" : prev
      );
    }, LOAD_TIMEOUT);
  }, [clearTimers]);

  // ─── Cuando el iframe carga correctamente ──────────────────────────────────
  const handleIframeLoad = useCallback(() => {
    clearTimers();
    setChatStatus("ready");
    // Pequeño delay para que el iframe pinte antes de ocultar el skeleton
  }, [clearTimers]);

  // ─── Cuando el iframe falla ────────────────────────────────────────────────
  const handleIframeError = useCallback(() => {
    clearTimers();
    setChatStatus("error");
  }, [clearTimers]);

  // ─── Abrir el chat ─────────────────────────────────────────────────────────
  const openChat = useCallback(() => {
    setChatOpen(true);
    setOpen(false);
    setUnread(false);
    trackEvent("open_chatbot");

    if (chatStatus === "idle" || chatStatus === "error") {
      startLoading();
    }
  }, [chatStatus, startLoading]);

  // ─── Cerrar el chat ────────────────────────────────────────────────────────
  const closeChat = useCallback(() => {
    setChatOpen(false);
  }, []);

  // ─── Reintentar ───────────────────────────────────────────────────────────
  const retryLoad = useCallback(() => {
    setIframeKey((k) => k + 1);
    startLoading();
  }, [startLoading]);

  // ─── Limpiar timers al desmontar ──────────────────────────────────────────
  useEffect(() => () => clearTimers(), [clearTimers]);

  // ─── Badge de "nueva respuesta" al estar cerrado (simulado) ───────────────
  useEffect(() => {
    if (!chatOpen && chatStatus === "idle") {
      const t = setTimeout(() => setUnread(true), 8000);
      return () => clearTimeout(t);
    }
  }, [chatOpen, chatStatus]);

  // ─── Toggle principal ─────────────────────────────────────────────────────
  const handleToggle = () => {
    if (chatOpen) {
      closeChat();
    } else {
      setOpen((v) => !v);
    }
  };

  // ─── Colores según tema ───────────────────────────────────────────────────
  const darkBg = isDark ? "#0e1821" : "#1f2937";

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.4} }
        @keyframes shimmer { 0%{background-position:200% 0}100%{background-position:-200% 0} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes badgePop { 0%,100%{transform:scale(1)}50%{transform:scale(1.2)} }
        @keyframes ping { 0%{transform:scale(1);opacity:.75}100%{transform:scale(2.2);opacity:0} }
        .fcta-btn { transition: transform .18s ease, box-shadow .18s ease; }
        .fcta-btn:hover { transform: scale(1.05); }
        .fcta-btn:active { transform: scale(0.95); }
        .fcta-icon-spin { animation: spin 1s linear infinite; }
      `}</style>

      {/* ── Menú flotante ─────────────────────────────────────────────────── */}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        role="region"
        aria-label="Contacto rápido Goku Lab"
      >
        {/* Opciones */}
        <div
          style={{
            opacity: open && !chatOpen ? 1 : 0,
            transform: open && !chatOpen ? "translateY(0) scale(1)" : "translateY(12px) scale(0.93)",
            pointerEvents: open && !chatOpen ? "all" : "none",
            transition: "opacity 0.25s ease, transform 0.25s ease",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {/* WhatsApp */}
          <button
            onClick={() => {
              trackEvent("click_whatsapp");
              window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
            }}
            className="fcta-btn flex items-center gap-3 text-white px-4 py-3 rounded-2xl shadow-xl"
            style={{ background: "#25D366", boxShadow: "0 4px 14px rgba(37,211,102,0.35)" }}
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span className="text-sm font-medium whitespace-nowrap">WhatsApp</span>
          </button>

          {/* Llamar */}
          <button
            onClick={() => {
              trackEvent("click_call");
              window.location.href = PHONE_NUMBER;
            }}
            className="fcta-btn flex items-center gap-3 text-white px-4 py-3 rounded-2xl shadow-xl"
            style={{ background: darkBg, boxShadow: "0 4px 14px rgba(0,0,0,0.25)" }}
            aria-label="Llamar ahora"
          >
            <Phone size={18} aria-hidden="true" />
            <span className="text-sm font-medium whitespace-nowrap">Llamar ahora</span>
          </button>

          {/* Chatbot */}
          <button
            onClick={openChat}
            className="fcta-btn group relative overflow-hidden flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border border-purple-400/20"
            style={{
              background: "linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)",
              boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
            }}
            aria-label="Abrir chatbot Goku Lab"
          >
            {/* Shimmer */}
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
              style={{ transition: "transform 0.7s ease" }}
            />
            <Bot size={18} className="relative z-10 text-white" aria-hidden="true" />
            <span className="text-sm font-semibold whitespace-nowrap text-white relative z-10 tracking-wide">
              Chatea con Gōku
            </span>
            {/* Indicador online */}
            <div className="relative flex items-center justify-center w-2.5 h-2.5 ml-0.5 z-10">
              <span
                className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75"
                style={{ animation: "ping 1.4s cubic-bezier(0,0,.2,1) infinite" }}
              />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400 border border-white/30" />
            </div>
          </button>
        </div>

        {/* Botón principal */}
        <div className="relative">
          {/* Badge de no leído */}
          {unread && !chatOpen && !open && (
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "#ef4444",
                border: "2px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9px",
                color: "white",
                fontWeight: 700,
                animation: "badgePop 2s ease-in-out infinite",
                zIndex: 10,
              }}
              aria-label="Nuevo mensaje"
            >
              1
            </span>
          )}

          <button
            onClick={handleToggle}
            className="fcta-btn w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white"
            style={{
              background:
                open || chatOpen
                  ? "linear-gradient(135deg, #ef4444, #dc2626)"
                  : "linear-gradient(135deg, #00C9FF, #7C3AED)",
              transition: "background 0.3s ease",
              boxShadow:
                open || chatOpen
                  ? "0 8px 28px rgba(239,68,68,0.45)"
                  : "0 8px 28px rgba(0,201,255,0.4)",
            }}
            aria-label={chatOpen ? "Cerrar chatbot" : open ? "Cerrar menú" : "Abrir opciones de contacto"}
            aria-expanded={open || chatOpen}
          >
            {open || chatOpen ? <X size={22} /> : <ChevronUp size={22} />}
          </button>
        </div>

        {/* Etiqueta debajo */}
        {!open && !chatOpen && (
          <span
            className="text-xs text-white px-2.5 py-1 rounded-full"
            style={{
              background: isDark ? "rgba(14,24,33,0.85)" : "rgba(31,41,55,0.85)",
              backdropFilter: "blur(6px)",
              animation: "fadeIn 0.4s ease",
            }}
          >
            ¡Agenda gratis!
          </span>
        )}
      </div>

      {/* ── Ventana del chatbot ────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Asistente virtual Goku Lab"
        className="fixed z-40 rounded-2xl overflow-hidden flex flex-col"
        style={{
          // Modo expandido: casi toda la pantalla. Modo normal: más grande que antes.
          bottom: expanded ? "16px" : "112px",
          right: expanded ? "16px" : "24px",
          left: expanded ? "16px" : "auto",
          top: expanded ? "16px" : "auto",
          width: expanded ? "auto" : "min(calc(100vw - 48px), 460px)",
          height: expanded ? "auto" : "min(78vh, 680px)",
          maxWidth: expanded ? "none" : "460px",
          opacity: chatOpen ? 1 : 0,
          transform: chatOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          pointerEvents: chatOpen ? "all" : "none",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: isDark
            ? "0 24px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)"
            : "0 24px 48px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.06)",
          background: isDark ? "#111827" : "#fff",
          willChange: "transform, opacity",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 text-white flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
            minHeight: "52px",
          }}
        >
          <div className="flex items-center gap-2.5">
            {/* Avatar */}
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-sm leading-tight">Asistente Virtual</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                {/* Indicador de estado */}
                {chatStatus === "ready" ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    <span className="text-xs text-white/70">En línea</span>
                  </>
                ) : chatStatus === "error" ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="text-xs text-white/70">Sin conexión</span>
                  </>
                ) : (
                  <>
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0"
                      style={{ animation: "pulse 1.2s ease-in-out infinite" }}
                    />
                    <span className="text-xs text-white/70">Conectando…</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Abrir en nueva pestaña */}
            <a
              href={CHATBOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir en pantalla completa"
              onClick={() => trackEvent("open_chatbot_fullscreen")}
              className="flex items-center justify-center w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Abrir chatbot en pantalla completa"
            >
              <ExternalLink size={14} />
            </a>

            {/* Expandir / contraer */}
            <button
              onClick={() => setExpanded((v) => !v)}
              title={expanded ? "Reducir" : "Expandir"}
              className="flex items-center justify-center w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={expanded ? "Reducir chatbot" : "Expandir chatbot"}
            >
              {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>

            {/* Botón de recargar (solo si hay error o está listo) */}
            {(chatStatus === "error" || chatStatus === "ready") && (
              <button
                onClick={retryLoad}
                title="Recargar chatbot"
                className="flex items-center justify-center w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Recargar chatbot"
              >
                <RefreshCw size={14} className={chatStatus === "loading" ? "fcta-icon-spin" : ""} />
              </button>
            )}

            <button
              onClick={closeChat}
              className="flex items-center justify-center w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Cerrar chatbot"
            >
              <X size={16} />
            </button>
          </div>
        </div>
          {/* Skeleton visible mientras carga */}
          {chatStatus !== "ready" && (
            <div
              className="absolute inset-0 z-10"
              style={{
                background: isDark ? "#111827" : "#fff",
                animation: "fadeIn 0.2s ease",
              }}
            >
              {(chatStatus === "loading" || chatStatus === "cold_start") && (
                <ChatSkeleton />
              )}

              {chatStatus === "error" && (
                <div
                  className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center"
                  style={{ animation: "fadeIn 0.3s ease" }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(239,68,68,0.08)" }}
                  >
                    <WifiOff size={24} style={{ color: "#ef4444" }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: isDark ? "#f3f4f6" : "#111827" }}
                    >
                      No se pudo conectar
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
                    >
                      El servidor puede estar iniciando. Intenta de nuevo en unos segundos.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <button
                      onClick={retryLoad}
                      className="fcta-btn flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white text-sm font-medium"
                      style={{ background: "linear-gradient(135deg, #8B5CF6, #5B21B6)" }}
                    >
                      <RefreshCw size={14} />
                      Reintentar
                    </button>
                    <button
                      onClick={() => {
                        closeChat();
                        setTimeout(() => {
                          window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
                        }, 300);
                      }}
                      className="fcta-btn flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white text-sm font-medium"
                      style={{ background: "#25D366" }}
                    >
                      <MessageCircle size={14} />
                      Contactar por WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Iframe */}
          {chatStatus !== "idle" && (
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={CHATBOT_URL}
              title="Chatbot Goku Lab"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              className="w-full h-full border-none"
              style={{
                background: isDark ? "#111827" : "#fff",
                // Visible solo cuando está listo (evita flash del iframe vacío)
                opacity: chatStatus === "ready" ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
              allow="microphone; camera"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          )}
        </div>
>>>>>>> temporal/main
      </div>
    </>
  );
}

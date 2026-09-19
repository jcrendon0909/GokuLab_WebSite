import { useState } from "react";

const technologies = [
  { 
    name: "Scratch", 
    image: "https://cdn.simpleicons.org/scratch/4D97FF", 
    color: "#FF8C00" 
  },
  { 
    name: "Python", 
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", 
    color: "#3776AB" 
  },
  { 
    name: "Roblox", 
    image: "https://cdn.simpleicons.org/roblox/111111", 
    color: "#000000" 
  },
  { 
    name: "Unity", 
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg", 
    color: "#424242" 
  },
  { 
    name: "HTML / CSS", 
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", 
    color: "#E34F26" 
  },
  { 
    name: "JavaScript", 
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", 
    color: "#F7DF1E" 
  },
  { 
    name: "Canva", 
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg", 
    color: "#00C4CC" 
  },
  { 
    name: "Tinkercad", 
    image: "https://cdn.iconscout.com/icon/free/png-256/free-tinkercad-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-6-pack-logos-icons-2945199.png?f=webp&w=256", 
    color: "#0055A4" 
  },
  { 
    // CORRECCIÓN: Se cambió de Wikimedia (bloqueado) a SimpleIcons (permitido por tu red)
    name: "Micro:bit", 
    image: "https://cdn.simpleicons.org/microbit/00D800", 
    color: "#00D800" 
  },
  { 
    // CORRECCIÓN: Se usa la G clásica de Google desde Devicon que es 100% estable
    name: "Google Suite", 
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg", 
    color: "#4285F4" 
  },
{ 
    name: "ChatGPT / OpenAI", 
    // ALTERNATIVA: Usando Icons8 si el anterior es bloqueado por el firewall
    image: "https://img.icons8.com/ios-filled/512/10A37F/chatgpt.png", 
    color: "#10A37F" 
  },
];

// Duplicate for infinite loop
const allTechs = [...technologies, ...technologies];

export function TechScroll() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div 
      className="relative overflow-hidden" 
      style={{ 
        padding: "8px 0",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
      }}
    >
      <div
        className="flex gap-4 items-center"
        style={{
          animation: "scrollTech 35s linear infinite",
          width: "max-content",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.animationPlayState = "running")
        }
      >
        {allTechs.map((tech, i) => {
          const isHovered = hoveredIndex === i;
          
          return (
            <div
              key={`${tech.name}-${i}`}
              className={`flex flex-col items-center justify-center gap-2 px-5 py-4 w-28 h-28 rounded-2xl cursor-pointer shrink-0 transition-all duration-300 
                ${!isHovered && "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 border"}`}
              style={{
                background: isHovered
                  ? `rgba(${hexToRgb(tech.color)}, 0.15)`
                  : "var(--tw-bg-opacity, transparent)",
                border: `1px solid ${
                  isHovered ? tech.color + "55" : "transparent"
                }`,
                transform: isHovered ? "translateY(-4px)" : "none",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img 
                src={tech.image} 
                alt={`${tech.name} logo`} 
                className="w-10 h-10 object-contain drop-shadow-sm transition-transform duration-300"
                style={{
                  transform: isHovered ? "scale(1.1)" : "scale(1)"
                }}
              />
              <span
                className="text-xs whitespace-nowrap transition-colors duration-300"
                style={{
                  color: isHovered ? tech.color : "currentColor",
                  fontWeight: isHovered ? 600 : 400,
                  opacity: isHovered ? 1 : 0.6,
                }}
              >
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes scrollTech {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result, 16)}, ${parseInt(result, 16)}, ${parseInt(result, 16)}`
    : "0,0,0";
}
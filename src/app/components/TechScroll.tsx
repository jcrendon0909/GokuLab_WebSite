import { useState } from "react";

const technologies = [
  { name: "Scratch", emoji: "🐱", color: "#FF8C00" },
  { name: "VS Code", emoji: "💻", color: "#007ACC" },
  { name: "Tinkercad", emoji: "🔧", color: "#FF6B35" },
  { name: "Minecraft EDU", emoji: "⛏️", color: "#4CAF50" },
  { name: "LEGO Education", emoji: "🧱", color: "#FFCF00" },
  { name: "MakeBlock", emoji: "🤖", color: "#00A3E0" },
  { name: "Thunkable", emoji: "📱", color: "#7C3AED" },
  { name: "MIT App Inventor", emoji: "📲", color: "#E91E63" },
  { name: "Code.org", emoji: "🌐", color: "#00BCD4" },
  { name: "Roblox Studio", emoji: "🎮", color: "#E53E3E" },
  { name: "British Council", emoji: "🇬🇧", color: "#002D7E" },
  { name: "Micro:bit", emoji: "⚡", color: "#1E88E5" },
  { name: "Cloud Tools", emoji: "☁️", color: "#00ACC1" },
  { name: "ChatGPT / AI", emoji: "🧠", color: "#10A37F" },
  { name: "GameMaker", emoji: "🕹️", color: "#9C27B0" },
  { name: "Google Colab", emoji: "📊", color: "#F4B400" },
  { name: "Unity", emoji: "🎯", color: "#424242" },
];

// Duplicate for infinite loop
const allTechs = [...technologies, ...technologies];

export function TechScroll() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden" style={{ padding: "8px 0" }}>
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #0A0F1E, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, #0A0F1E, transparent)",
        }}
      />

      <div
        className="flex gap-4"
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
        {allTechs.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl cursor-pointer shrink-0"
            style={{
              background:
                hoveredIndex === i
                  ? `rgba(${hexToRgb(tech.color)}, 0.15)`
                  : "rgba(255,255,255,0.04)",
              border: `1px solid ${
                hoveredIndex === i
                  ? tech.color + "55"
                  : "rgba(255,255,255,0.08)"
              }`,
              transition: "all 0.3s ease",
              transform: hoveredIndex === i ? "translateY(-4px)" : "none",
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span style={{ fontSize: "1.8rem" }}>{tech.emoji}</span>
            <span
              className="text-xs whitespace-nowrap"
              style={{
                color: hoveredIndex === i ? tech.color : "rgba(255,255,255,0.4)",
                transition: "color 0.3s ease",
                fontWeight: hoveredIndex === i ? 600 : 400,
              }}
            >
              {tech.name}
            </span>
          </div>
        ))}
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
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "0,0,0";
}

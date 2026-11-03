import { Link } from "react-router";
import { useTheme } from "next-themes";

type Audience = "ninos" | "adolescentes" | "adultos" | "empresas";

const tabs = [
  { id: "ninos", label: "Niños", emoji: "🧒", href: "/cursos/ninos", color: "#FF6B35" },
  { id: "adolescentes", label: "Adolescentes", emoji: "🎮", href: "/cursos/adolescentes", color: "#7C3AED" },
  { id: "adultos", label: "Adultos", emoji: "👨‍💼", href: "/cursos/adultos", color: "#00C9FF" },
  { id: "empresas", label: "Empresas", emoji: "🏢", href: "/cursos/empresas", color: "#10B981" },
];

export function AudienceTabs({ active }: { active: Audience }) {
  const { theme } = useTheme();
  
  return (
    <div className="sticky top-[64px] z-40 py-3 px-4 shadow-sm" style={{ background: theme === "dark" ? "rgba(5,10,20,0.95)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)" }}>
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <Link
              key={tab.id}
              to={tab.href}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold shrink-0 transition-all duration-300"
              style={{
                background: isActive ? `linear-gradient(135deg, ${tab.color}, ${tab.color}dd)` : (theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"),
                color: isActive ? "#fff" : (theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"),
                border: isActive ? `2px solid ${tab.color}` : (theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)"),
              }}
            >
              <span className="text-lg">{tab.emoji}</span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
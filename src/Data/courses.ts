// src/Data/courses.ts

export interface CourseData {
  id: string;
  title: string;
  subtitle: string;
  age: string;
  level: string;
  duration: string;
  modality: string;
  price: string; // Aquí puedes escribir "desde $1,600 al mes", "Gratis", "$2,500", etc.
  emoji: string;
  color: string;
  imgKey: string;
  // AQUÍ ESTÁ LA MAGIA: Ahora es un arreglo que acepta múltiples categorías
  targetAudience: ("kids" | "teens" | "adults" | "company")[];
  valueProps: { title: string; desc: string; icon: string }[];
  modules: { id: string; title: string; lessons: number; topics: string[] }[];
  techs: string[];
}

const defaultVP = [
  { title: "Pensamiento Crítico", desc: "Resuelve problemas de forma estructurada.", icon: "🧠" },
  { title: "Creatividad Aplicada", desc: "Transforma ideas en proyectos reales.", icon: "🎨" },
  { title: "Trabajo en Equipo", desc: "Colabora y comunica ideas efectivamente.", icon: "🤝" }
];

export const coursesData: Record<string, CourseData> = {
  // --- KIDS & TEENS (Ejemplo de curso compartido) ---
  "programacion-visual": { id: "programacion-visual", title: "Programación Visual", subtitle: "De consumidor pasivo a creador digital.", age: "6 años en adelante", level: "Básico", duration: "90 min", modality: "Presencial, Online", price: "desde $1,600 al mes", emoji: "🐱", color: "#1E88E5", imgKey: "programacionVisual", targetAudience: ["kids", "teens"], valueProps: defaultVP, modules: [{ id: "m1", title: "Fundamentos", lessons: 10, topics: ["Scratch"] }], techs: ["Scratch"] },
  
  // --- SOLO KIDS ---
  "robotica-principiantes": { id: "robotica-principiantes", title: "Curso Básico de Robótica", subtitle: "Construye y programa tus primeros robots.", age: "8 años en adelante", level: "Básico", duration: "90 min", modality: "Presencial", price: "desde $1,650 al mes", emoji: "🤖", color: "#FF6B35", imgKey: "robotica", targetAudience: ["kids"], valueProps: defaultVP, modules: [{ id: "m1", title: "Mecánica", lessons: 10, topics: ["Sensores"] }], techs: ["Arduino"] },
  "taller-creatividad": { id: "taller-creatividad", title: "Creadores Digitales", subtitle: "El arte detrás del código.", age: "8 años en adelante", level: "Todos", duration: "90 min", modality: "Presencial", price: "desde $1,650 al mes", emoji: "🎨", color: "#FFE134", imgKey: "creacionContenido", targetAudience: ["kids"], valueProps: defaultVP, modules: [{ id: "m1", title: "Arte", lessons: 6, topics: ["Diseño"] }], techs: ["Diseño"] },
  "regularizacion-matematicas": { id: "regularizacion-matematicas", title: "Matemáticas Divertidas", subtitle: "Suma y resta con Método Singapur.", age: "Niños", level: "Básico", duration: "90 min", modality: "Presencial", price: "desde $1,650 al mes", emoji: "➗", color: "#00C9FF", imgKey: "regularizacion", targetAudience: ["kids"], valueProps: defaultVP, modules: [{ id: "m1", title: "Lógica", lessons: 10, topics: ["Fracciones"] }], techs: ["Matemáticas"] },
  "caballero-del-codigo": { id: "caballero-del-codigo", title: "El Caballero del Código", subtitle: "Aventuras lógicas para pequeños.", age: "Niños", level: "Básico", duration: "90 min", modality: "Presencial", price: "desde $1,650 al mes", emoji: "⚔️", color: "#FFE134", imgKey: "programacionVisual", targetAudience: ["kids"], valueProps: defaultVP, modules: [{ id: "m1", title: "Lógica", lessons: 8, topics: ["Scratch"] }], techs: ["Scratch"] },
  "diseno-grafico-ninos": { id: "diseno-grafico-ninos", title: "Diseño Gráfico para Niños", subtitle: "Despierta su creatividad visual.", age: "8 años en adelante", level: "Básico", duration: "90 min", modality: "Presencial", price: "desde $1,650 al mes", emoji: "🖌️", color: "#E91E63", imgKey: "disenoGrafico", targetAudience: ["kids"], valueProps: defaultVP, modules: [{ id: "m1", title: "Arte", lessons: 8, topics: ["Vectores"] }], techs: ["Illustrator"] },
  "programacion-visual-avanzada": { id: "programacion-visual-avanzada", title: "Programación Visual Avanzada", subtitle: "Lleva sus juegos al siguiente nivel.", age: "10 años en adelante", level: "Avanzado", duration: "90 min", modality: "Online", price: "desde $1,650 al mes", emoji: "🚀", color: "#1E88E5", imgKey: "programacionVisual", targetAudience: ["kids"], valueProps: defaultVP, modules: [{ id: "m1", title: "Scratch Pro", lessons: 10, topics: ["Clones"] }], techs: ["Scratch"] },
  "diseno-videojuegos-minecraft": { id: "diseno-videojuegos-minecraft", title: "Minecraft Education", subtitle: "Aprende lógica en un mundo de bloques.", age: "8 años en adelante", level: "Básico", duration: "90 min", modality: "Presencial", price: "desde $1,650 al mes", emoji: "⛏️", color: "#4CAF50", imgKey: "disenoVideojuegos", targetAudience: ["kids"], valueProps: defaultVP, modules: [{ id: "m1", title: "Mundos", lessons: 8, topics: ["Redstone"] }], techs: ["Minecraft"] },

  // --- SOLO TEENS ---
  "diseno-videojuegos-roblox": { id: "diseno-videojuegos-roblox", title: "Roblox Studio", subtitle: "Crea tus propios mundos.", age: "10 años en adelante", level: "Intermedio", duration: "90 min", modality: "Presencial, Online", price: "desde $1,750 al mes", emoji: "🎮", color: "#E53E3E", imgKey: "disenoVideojuegos", targetAudience: ["teens"], valueProps: defaultVP, modules: [{ id: "m1", title: "Lua", lessons: 12, topics: ["3D"] }], techs: ["Roblox", "Lua"] },
  "diseno-videojuegos-unity": { id: "diseno-videojuegos-unity", title: "Unity", subtitle: "Videojuegos profesionales con C#.", age: "12 años en adelante", level: "Avanzado", duration: "90 min", modality: "Presencial, Online", price: "desde $1,750 al mes", emoji: "👾", color: "#9C27B0", imgKey: "unity", targetAudience: ["teens"], valueProps: defaultVP, modules: [{ id: "m1", title: "C#", lessons: 15, topics: ["Física 3D"] }], techs: ["Unity", "C#"] },
  "python-pro": { id: "python-pro", title: "Python Pro", subtitle: "Desarrollo profesional para adolescentes.", age: "14 años en adelante", level: "Avanzado", duration: "90 min", modality: "Presencial", price: "desde $1,800 al mes", emoji: "🐍", color: "#4CAF50", imgKey: "pythonStart", targetAudience: ["teens"], valueProps: defaultVP, modules: [{ id: "m1", title: "Python", lessons: 15, topics: ["APIs"] }], techs: ["Python", "Git"] },
  "diseno-videojuegos-lua-roblox": { id: "diseno-videojuegos-lua-roblox", title: "Programación en Lua", subtitle: "Domina el código detrás de Roblox.", age: "12 años en adelante", level: "Intermedio", duration: "90 min", modality: "Online", price: "desde $1,750 al mes", emoji: "🌙", color: "#E53E3E", imgKey: "disenoVideojuegos", targetAudience: ["teens"], valueProps: defaultVP, modules: [{ id: "m1", title: "Lua", lessons: 10, topics: ["Funciones"] }], techs: ["Lua"] },
  "diseno-2d-y-3d": { id: "diseno-2d-y-3d", title: "Diseño 2D a 3D", subtitle: "Del concepto al objeto físico.", age: "12 años en adelante", level: "Intermedio", duration: "90 min", modality: "Presencial", price: "desde $1,750 al mes", emoji: "🖨️", color: "#FF6B35", imgKey: "disenoGrafico", targetAudience: ["teens"], valueProps: defaultVP, modules: [{ id: "m1", title: "3D", lessons: 10, topics: ["Blender"] }], techs: ["Blender"] },
  "taller-impresion-3d": { id: "taller-impresion-3d", title: "Curso de Impresión 3D", subtitle: "Crea objetos tangibles.", age: "12 años en adelante", level: "Intermedio", duration: "90 min", modality: "Presencial", price: "desde $1,750 al mes", emoji: "🖨️", color: "#9C27B0", imgKey: "disenoGrafico", targetAudience: ["teens"], valueProps: defaultVP, modules: [{ id: "m1", title: "3D", lessons: 6, topics: ["Cura"] }], techs: ["Fusion 360"] },
  "video-blogging": { id: "video-blogging", title: "Next Gen Creators", subtitle: "Creación de videos y contenido.", age: "12 años en adelante", level: "Básico", duration: "90 min", modality: "Online", price: "desde $1,750 al mes", emoji: "🎬", color: "#E91E63", imgKey: "creacionContenido", targetAudience: ["teens"], valueProps: defaultVP, modules: [{ id: "m1", title: "Video", lessons: 8, topics: ["Edición"] }], techs: ["CapCut"] },
  "python-start-avanzado": { id: "python-start-avanzado", title: "Python Start", subtitle: "El siguiente paso en su carrera tech.", age: "12 años en adelante", level: "Intermedio", duration: "90 min", modality: "Presencial", price: "desde $1,800 al mes", emoji: "🐍", color: "#4CAF50", imgKey: "pythonStart", targetAudience: ["teens"], valueProps: defaultVP, modules: [{ id: "m1", title: "PyGame", lessons: 12, topics: ["Turtle"] }], techs: ["Python"] },

  // --- ADULTS & TEENS (Ejemplo de curso compartido) ---
  "taller-prompt-engeneering": { id: "taller-prompt-engeneering", title: "Prompt Engineering", subtitle: "Crea retos mágicos con IA.", age: "Adolescentes y Adultos", level: "Todos", duration: "90 min", modality: "Online", price: "desde $1,800 al mes", emoji: "✨", color: "#7C3AED", imgKey: "iaAdultos", targetAudience: ["teens", "adults"], valueProps: defaultVP, modules: [{ id: "m1", title: "Prompts", lessons: 4, topics: ["Casos"] }], techs: ["ChatGPT"] },

  // --- SOLO ADULTS ---
  "inteligencia-artificial-adultos": { id: "inteligencia-artificial-adultos", title: "IA Zero to Hero", subtitle: "Domina la IA para tu profesión.", age: "18 años en adelante", level: "Básico", duration: "90 min", modality: "Presencial, Online", price: "desde $1,800 al mes", emoji: "🧠", color: "#10B981", imgKey: "iaAdultos", targetAudience: ["adults"], valueProps: defaultVP, modules: [{ id: "m1", title: "IA", lessons: 8, topics: ["Prompts"] }], techs: ["ChatGPT"] },
  "taller-design-thinking": { id: "taller-design-thinking", title: "Design Thinking", subtitle: "Resolución creativa de problemas.", age: "Adultos", level: "Todos", duration: "90 min", modality: "Online", price: "desde $1,800 al mes", emoji: "💡", color: "#FF6B35", imgKey: "creacionContenido", targetAudience: ["adults"], valueProps: defaultVP, modules: [{ id: "m1", title: "Ideación", lessons: 4, topics: ["Prototipado"] }], techs: ["Design Thinking"] },
  "alfabetizacion-digital": { id: "alfabetizacion-digital", title: "Alfabetización Digital", subtitle: "Para la vida y el trabajo.", age: "Adultos", level: "Básico", duration: "90 min", modality: "Presencial", price: "desde $1,800 al mes", emoji: "💻", color: "#4CAF50", imgKey: "alfabetizacion", targetAudience: ["adults"], valueProps: defaultVP, modules: [{ id: "m1", title: "Computación", lessons: 10, topics: ["Excel"] }], techs: ["Office"] },

  // --- SOLO COMPANY ---
  "administracion-de-proyectos": { id: "administracion-de-proyectos", title: "Gestión de Proyectos", subtitle: "Liderazgo y administración.", age: "Adultos", level: "Avanzado", duration: "90 min", modality: "Online", price: "Cotizar", emoji: "✈️", color: "#607D8B", imgKey: "corporativo", targetAudience: ["company"], valueProps: defaultVP, modules: [{ id: "m1", title: "PMI", lessons: 8, topics: ["Agile"] }], techs: ["PMP"] },
  "taller-gobernanza-ia-ciberseguridad": { id: "taller-gobernanza-ia-ciberseguridad", title: "Gobernanza de IA", subtitle: "Protege tu empresa.", age: "Adultos", level: "Avanzado", duration: "90 min", modality: "Online", price: "Cotizar", emoji: "🛡️", color: "#7C3AED", imgKey: "corporativo", targetAudience: ["company"], valueProps: defaultVP, modules: [{ id: "m1", title: "Riesgos", lessons: 4, topics: ["ISO 42001"] }], techs: ["NIST"] },
  "taller-resolucion-de-conflictos": { id: "taller-resolucion-de-conflictos", title: "Resolución de Conflictos", subtitle: "Habilidades blandas.", age: "Adultos", level: "Todos", duration: "90 min", modality: "Online", price: "Cotizar", emoji: "🕊️", color: "#10B981", imgKey: "corporativo", targetAudience: ["company"], valueProps: defaultVP, modules: [{ id: "m1", title: "Comunicación", lessons: 4, topics: ["Empatía"] }], techs: ["Soft Skills"] }
};

export function getCourseById(id: string): CourseData | null {
  return coursesData[id] || null;
}
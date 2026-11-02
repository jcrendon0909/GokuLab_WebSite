// src/Data/courses.ts

export interface Module {
  id: string;
  title: string;
  lessons: number;
  topics: string[];
}

export interface CourseData {
  id: string;
  title: string;
  subtitle: string;
  age: string;
  level: string;
  duration: string;
  modality: string;
  price: string;
  emoji: string;
  color: string;
  imgKey: string;
  videoUrl?: string;
  valueProps: {
    title: string;
    desc: string;
    icon: string;
  }[];
  modules: Module[];
  techs: string[];
}

export const coursesData: Record<string, CourseData> = {
  "programacion-visual": {
    id: "programacion-visual",
    title: "Programación Visual",
    subtitle: "De consumidor pasivo a creador digital del futuro.",
    age: "6 años en adelante",
    level: "Básico",
    duration: "90 min por clase",
    modality: "Presencial, Online, Híbrida",
    price: "desde $1,600",
    emoji: "🐱",
    color: "#1E88E5",
    imgKey: "programacionVisual",
    valueProps: [
      { title: "Pensamiento Lógico", desc: "Entiende cómo descomponer problemas complejos en pasos simples.", icon: "🧠" },
      { title: "Resolución de Problemas", desc: "Aprende a iterar y encontrar soluciones creativas.", icon: "🛠️" },
      { title: "Creatividad", desc: "Crea sus propias historias y juegos desde cero.", icon: "🎨" }
    ],
    modules: [
      { id: "m1", title: "Lo que dominará", lessons: 5, topics: ["Lenguaje de bloques", "Estructurar proyectos", "Fundamentos de programación"] }
    ],
    techs: ["Scratch", "code.org", "Lógica Computacional"]
  },
  "roblox": {
    id: "roblox",
    title: "Diseño de Videojuegos (Roblox)",
    subtitle: "Crea tus propios mundos mientras aprendes a programar.",
    age: "10 años en adelante",
    level: "Intermedio",
    duration: "90 min por clase",
    modality: "Presencial, Online, Híbrida",
    price: "desde $1,600",
    emoji: "🎮",
    color: "#E53E3E",
    imgKey: "disenoVideojuegos",
    valueProps: [
      { title: "Pensamiento Lógico", desc: "Programación en Lua aplicada a entornos virtuales.", icon: "🧠" },
      { title: "Creatividad y diseño", desc: "Diseño de mundos y personajes 3D.", icon: "🎨" }
    ],
    modules: [
      { id: "m1", title: "Lo que dominará", lessons: 6, topics: ["Uso de Roblox Studio", "Programación en Lua", "Diseño de mundos"] }
    ],
    techs: ["Roblox Studio", "Lua", "Diseño 3D"]
  }
};

export function getCourseById(id: string): CourseData | null {
  return coursesData[id] || null;
}
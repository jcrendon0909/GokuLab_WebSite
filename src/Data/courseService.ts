// src/Data/courseService.ts
import { CourseData } from './courses';
import { API_URL } from '../config';

// 🔥 MAPEO POR ID ÚNICO: Garantiza que cada curso use su foto correcta
const MAPEO_POR_ID: Record<string, string> = {
  // KIDS
  "programacion-visual": "ninos-programando1.jpeg",
  "robotica-principiantes": "robotica1.jpeg",
  "taller-creatividad": "taller-creatividad.jpg",
  "regularizacion-matematicas": "regularizacion-matematicas1.jpg",
  "caballero-del-codigo": "fundamentos-programacion1.jpeg",
  "diseno-grafico-ninos": "diseno-grafico1.jpeg",
  "programacion-visual-avanzada": "programacion-visual-peques2.JPG",
  "diseno-videojuegos-minecraft": "diseño-videojuegos2.jpeg",

  // TEENS
  "diseno-videojuegos-roblox": "diseno-videojuegos1.jpg",
  "diseno-videojuejos-lua-roblox": "clases-adolescentes1.jpg",
  "diseno-videojuegos-unity": "unity1.jpg",
  "python-pro": "python-start1.jpg",
  "python-start-avanzado": "python-start1.jpg",
  "diseno-2d-y-3d": "diseno-web1.jpg",
  "taller_impresion-3D": "Lumy.jpeg",
  "video-blogging": "creacion-contenido-video1.jpg",
  "taller-prompt-engeneering": "preparacion-universidad.jpg",

  // ADULTS / EMPRESAS
  "inteligencia-artificial-adultos": "ia-adultos.png",
  "alfabetizacion-digital": "alfabetizacion-digital-adultos1.jpg",
  "adminitracion-de-proyectos": "empresas-gobierno1.jpg",
  "taller-gobernanza-IA-ciberseguridad": "clases-adultos1.jpg",
  "taller-resolucion-de-conflictos": "trabajo-en-equipo1.jpg",
  "taller-design-thinking": "trabajo-en-equipo1.jpg"
};

// Función auxiliar para adivinar la audiencia
function inferAudience(age: string = ""): ("kids" | "teens" | "adults" | "company")[] {
  const a = age.toLowerCase();
  if (a.includes("empresa") || a.includes("docente")) return ["company"];
  if (a.includes("niño") || a.includes("niña") || a.includes("kids") || a.match(/[5-9]\s*(a|-)\s*1[0-1]/)) return ["kids"];
  if (a.includes("adolescente") || a.includes("teen") || a.match(/1[2-7]\s*(a|-)\s*/)) return ["teens", "adults"];
  if (a.includes("adulto") || a.includes("18") || a.includes("30") || a.includes("profesional")) return ["adults"];
  return ["kids"];
}

function mapCurso(cursoEncontrado: any): CourseData {
  const idCurso = cursoEncontrado.id;
  const imgKeyOriginal = cursoEncontrado.imgKey || cursoEncontrado.imagen_key || "";
  
  // 🔥 PRIORIDAD 1: El diccionario por ID. Si no está, usa lo de Mongo.
  const imgKeyReal = MAPEO_POR_ID[idCurso] || imgKeyOriginal || "pagina-principal1.jpg";

  return {
    id: idCurso,
    title: cursoEncontrado.title || cursoEncontrado.nombreCurso || "",
    subtitle: cursoEncontrado.subtitle || cursoEncontrado.descripcionCorta || "",
    age: cursoEncontrado.age || cursoEncontrado.edad_dirigida || "",
    level: cursoEncontrado.level || cursoEncontrado.nivel || "",
    duration: cursoEncontrado.duration || cursoEncontrado.duracion || "",
    modality: cursoEncontrado.modality || (Array.isArray(cursoEncontrado.modalidad) ? cursoEncontrado.modalidad.join(", ") : cursoEncontrado.modalidad) || "",
    price: cursoEncontrado.price || (cursoEncontrado.precio_desde ? `desde $${cursoEncontrado.precio_desde}` : ""),
    emoji: cursoEncontrado.emoji || "🚀",
    color: cursoEncontrado.color || "#00C9FF",
    imgKey: imgKeyReal,
    targetAudience: inferAudience(cursoEncontrado.age || cursoEncontrado.edad_dirigida),
    techs: cursoEncontrado.techs || cursoEncontrado.tecnologias || ["Tecnología", "Creatividad"],
    modules: (cursoEncontrado.modules || cursoEncontrado.modulos || []).map((mod: any) => ({
      id: mod.id || Math.random().toString(),
      title: mod.titulo || mod.title || "",
      lessons: mod.lecciones || mod.lessons || 0,
      topics: mod.temas || mod.topics || []
    })),
    valueProps: (cursoEncontrado.valueProps || cursoEncontrado.propuestasValor || []).map((vp: any) => ({
      title: vp.title || vp.titulo || "",
      desc: vp.desc || vp.descripcion || "",
      icon: vp.icon || vp.icono || "✨"
    }))
  };
}

export async function fetchAllCourses(): Promise<CourseData[]> {
  try {
    const response = await fetch(`${API_URL}/api/cursos`);
    if (!response.ok) throw new Error('Error al obtener cursos');
    const data = await response.json();
    return data.map(mapCurso);
  } catch (error) {
    console.error("Error conectando a la API:", error);
    const { coursesData } = await import('./courses');
    return Object.values(coursesData);
  }
}

export async function fetchCourseById(id: string): Promise<CourseData | null> {
  try {
    const response = await fetch(`${API_URL}/api/cursos`);
    if (!response.ok) throw new Error('Error al obtener cursos');
    const data = await response.json();
    const cursoEncontrado = data.find((c: any) => c.id === id);
    if (!cursoEncontrado) return null;
    return mapCurso(cursoEncontrado);
  } catch (error) {
    console.error("Error conectando a la API:", error);
    const { getCourseById } = await import('./courses');
    return getCourseById(id);
  }
}
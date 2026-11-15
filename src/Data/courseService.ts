// src/Data/courseService.ts
import { CourseData } from './courses';
import { API_URL } from '../config';

// 🔥 MAPEO ESTRICTO (Basado en tu script de Python)
const AUDIENCIA_POR_ID: Record<string, ("kids" | "teens" | "adults" | "company")[]> = {
  // KIDS
  "programacion-visual": ["kids", "teens"],
  "robotica-principiantes": ["kids", "teens"],
  "taller-creatividad": ["kids", "teens"],
  "regularizacion-matematicas": ["kids", "teens"],
  "caballero-del-codigo": ["kids", "teens"],
  "diseno-grafico-ninos": ["kids", "teens"],
  "programacion-visual-avanzada": ["kids", "teens"],
  "diseno-videojuegos-minecraft": ["kids", "teens"],

  // TEENS
  "diseno-videojuegos-roblox": ["teens"],
  "diseno-videojuejos-lua-roblox": ["teens"],
  "diseno-videojuegos-unity": ["teens"],
  "python-pro": ["teens"],
  "python-start-avanzado": ["teens"],
  "diseno-2d-y-3d": ["teens"],
  "taller_impresion-3d": ["kids", "teens"],
  "video-blogging": ["kids", "teens"],

  // ADULTS
  "taller-prompt-engeneering": ["adults"],
  "inteligencia-artificial-adultos": ["adults"],
  "alfabetizacion-digital": ["adults"],
  
  // COMPANY & ADULTS
  "adminitracion-de-proyectos": ["adults", "company"],
  "taller-gobernanza-ia-ciberseguridad": ["company", "adults"],
  "taller-resolucion-de-conflictos": ["company", "adults"],
  "taller-design-thinking": ["company", "adults"]
};

function mapCurso(cursoEncontrado: any): CourseData {
  // Normalizamos el ID a minúsculas para que haga match con el diccionario
  const idCurso = (cursoEncontrado.id || cursoEncontrado.slug || "").toLowerCase();
  
  const imgKeyReal = cursoEncontrado.imgKey || cursoEncontrado.imagen_key || `${idCurso}.jpg`;
  
  // 🔥 FORZAMOS LA AUDIENCIA: Si está en el diccionario, usamos esa. Si es nuevo, intentamos leer de Mongo.
  let audience = AUDIENCIA_POR_ID[idCurso];
  
  if (!audience) {
    // Fallback solo para cursos nuevos que no estén en el diccionario
    const rawAudience = cursoEncontrado.targetAudience || cursoEncontrado.audiencia || [];
    if (typeof rawAudience === "string") {
      audience = rawAudience.split(",").map((s: string) => s.trim().toLowerCase() as any);
    } else if (Array.isArray(rawAudience) && rawAudience.length > 0) {
      audience = rawAudience.map((s: string) => String(s).trim().toLowerCase() as any);
    } else {
      // Fallback de emergencia por edad
      const ageText = (cursoEncontrado.age || cursoEncontrado.edad_dirigida || "").toLowerCase();
      if (ageText.includes("adulto") || ageText.includes("18") || ageText.includes("empresa") || ageText.includes("docente")) audience = ["adults"];
      else if (ageText.includes("adolescente") || ageText.includes("12") || ageText.includes("13") || ageText.includes("14") || ageText.includes("15") || ageText.includes("16") || ageText.includes("17")) audience = ["teens"];
      else audience = ["kids"];
    }
  }

  return {
    id: cursoEncontrado.id || cursoEncontrado.slug || "",
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
    targetAudience: audience as any,
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
    const cursoEncontrado = data.find((c: any) => (c.id || c.slug).toLowerCase() === id.toLowerCase());
    if (!cursoEncontrado) return null;
    return mapCurso(cursoEncontrado);
  } catch (error) {
    console.error("Error conectando a la API:", error);
    const { getCourseById } = await import('./courses');
    return getCourseById(id);
  }
}
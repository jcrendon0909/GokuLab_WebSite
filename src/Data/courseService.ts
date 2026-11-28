// src/Data/courseService.ts
import { CourseData } from './courses';
import { API_URL } from '../config';

const AUDIENCIA_FALLBACK: Record<string, string[]> = {
  "programacion-visual": ["kids", "teens"], "robotica-principiantes": ["kids"], "taller-creatividad": ["kids"],
  "regularizacion-matematicas": ["kids"], "caballero-del-codigo": ["kids"], "diseno-grafico-ninos": ["kids"],
  "programacion-visual-avanzada": ["kids"], "diseno-videojuegos-minecraft": ["kids"],
  "diseno-videojuegos-roblox": ["teens"], "diseno-videojuejos-lua-roblox": ["teens"], "diseno-videojuegos-unity": ["teens"],
  "python-pro": ["teens"], "python-start-avanzado": ["teens"], "diseno-2d-y-3d": ["teens"],
  "taller_impresion-3d": ["teens"], "video-blogging": ["teens"],
  "taller-prompt-engeneering": ["adults"], "inteligencia-artificial-adultos": ["adults"], "alfabetizacion-digital": ["adults"],
  "adminitracion-de-proyectos": ["adults", "company"], "taller-gobernanza-ia-ciberseguridad": ["company", "adults"],
  "taller-resolucion-de-conflictos": ["company", "adults"], "taller-design-thinking": ["company", "adults"]
};

function mapCurso(cursoEncontrado: any): CourseData {
  const idCurso = String(cursoEncontrado.id || cursoEncontrado.slug || "").trim().toLowerCase();
  
  // 🔥 Ahora usamos DIRECTAMENTE lo que dice Mongo. Si no hay, usamos el slug + .jpg
  let imgKeyReal = cursoEncontrado.imgKey || cursoEncontrado.imagen_key || `${idCurso}.jpg`;
  
  // Cache Busting
  const version = cursoEncontrado.imgVersion || 1;
  if (!imgKeyReal.includes("?v=")) {
    imgKeyReal = `${imgKeyReal}?v=${version}`;
  }

  let audience = cursoEncontrado.targetAudience || cursoEncontrado.audiencia;
  if (!audience || !Array.isArray(audience) || audience.length === 0) {
    audience = AUDIENCIA_FALLBACK[idCurso] || ["kids"];
  } else {
    audience = audience.map((a: string) => a.toLowerCase().trim());
  }

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
    targetAudience: audience as ("kids" | "teens" | "adults" | "company")[],
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
    })),
    audiencia_principal: cursoEncontrado.audiencia_principal ? cursoEncontrado.audiencia_principal.toLowerCase() : undefined,
    orden_kids: cursoEncontrado.orden_kids,
    orden_teens: cursoEncontrado.orden_teens,
    orden_adults: cursoEncontrado.orden_adults,
    orden_company: cursoEncontrado.orden_company
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
    
    const idBuscado = decodeURIComponent(id).trim().toLowerCase();
    const cursoEncontrado = data.find((c: any) => {
      const idMongo = String(c.id || c.slug || "").trim().toLowerCase();
      return idMongo === idBuscado;
    });

    if (!cursoEncontrado) return null;
    return mapCurso(cursoEncontrado);
  } catch (error) {
    console.error("Error conectando a la API:", error);
    const { getCourseById } = await import('./courses');
    return getCourseById(id);
  }
}
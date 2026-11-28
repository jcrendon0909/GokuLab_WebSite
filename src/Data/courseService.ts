// src/Data/courseService.ts
import { CourseData } from './courses';
import { API_URL } from '../config';

const MAPEO_IMAGENES: Record<string, string> = {
  "programacion-visual": "ninos-programando1.jpeg", "robotica-principiantes": "robotica1.jpeg",
  "taller-creatividad": "taller-creatividad.jpg", "regularizacion-matematicas": "regularizacion-matematicas1.jpg",
  "caballero-del-codigo": "fundamentos-programacion1.jpeg", "diseno-grafico-ninos": "diseno-grafico1.jpeg",
  "programacion-visual-avanzada": "programacion-visual-peques2.JPG", "diseno-videojuegos-minecraft": "diseño-videojuegos2.jpeg",
  "diseno-videojuegos-roblox": "diseno-videojuegos1.jpg", "diseno-videojuejos-lua-roblox": "clases-adolescentes1.jpg",
  "diseno-videojuegos-unity": "unity1.jpg", "python-pro": "python-start1.jpg", "python-start-avanzado": "clases-adolescentes2.jpg",
  "diseno-2d-y-3d": "diseno-web1.jpg", "taller_impresion-3d": "Lumy.jpeg", "video-blogging": "creacion-contenido-video1.jpg",
  "taller-prompt-engeneering": "preparacion-universidad.jpg", "inteligencia-artificial-adultos": "ia-adultos.png",
  "alfabetizacion-digital": "alfabetizacion-digital-adultos1.jpg", "adminitracion-de-proyectos": "empresas-gobierno1.jpg",
  "taller-gobernanza-ia-ciberseguridad": "clases-adultos1.jpg", "taller-resolucion-de-conflictos": "trabajo-en-equipo1.jpg",
  "taller-design-thinking": "trabajo-en-equipo1.jpg"
};

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
  
  // 🔥 FIX: Priorizamos lo que viene de la API (MongoDB). El diccionario es solo el último recurso.
  const rawImgKey = cursoEncontrado.imgKey || cursoEncontrado.imagen_key;
  let imgKeyReal = rawImgKey || MAPEO_IMAGENES[idCurso] || `${idCurso}.jpg`;
  
  // 🔥 CACHE BUSTING: Añadimos ?v=version para forzar recarga en Cloudflare
  const version = cursoEncontrado.imgVersion || 1;
  // Evitamos duplicar el ?v si ya lo tiene
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
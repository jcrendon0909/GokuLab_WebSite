// src/Data/courseService.ts
import { CourseData } from './courses';
import { API_URL } from '../config';

// 🔥 EL DICCIONARIO MÁGICO: Traduce los IDs de Mongo a los nombres REALES en R2
const MAPEO_IMAGENES: Record<string, string> = {
  "programacion-visual": "ninos-programando1.jpeg",
  "robotica-principiantes": "robotica1.jpeg",
  "taller-creatividad": "taller-creatividad.jpg",
  "regularizacion-matematicas": "regularizacion-matematicas1.jpg",
  "caballero-del-codigo": "fundamentos-programacion1.jpeg",
  "diseno-grafico-ninos": "diseno-grafico1.jpeg",
  "programacion-visual-avanzada": "programacion-visual-peques2.JPG",
  "diseno-videojuegos-minecraft": "diseño-videojuegos2.jpeg",
  "diseno-videojuegos-roblox": "diseno-videojuegos1.jpg",
  "diseno-videojuejos-lua-roblox": "clases-adolescentes1.jpg",
  "diseno-videojuegos-unity": "unity1.jpg",
  "python-pro": "python-start1.jpg",
  "python-start-avanzado": "clases-adolescentes2.jpg",
  "diseno-2d-y-3d": "diseno-web1.jpg",
  "taller_impresion-3d": "Lumy.jpeg",
  "video-blogging": "creacion-contenido-video1.jpg",
  "taller-prompt-engeneering": "preparacion-universidad.jpg",
  "inteligencia-artificial-adultos": "ia-adultos.png",
  "alfabetizacion-digital": "alfabetizacion-digital-adultos1.jpg",
  "adminitracion-de-proyectos": "empresas-gobierno1.jpg",
  "taller-gobernanza-ia-ciberseguridad": "clases-adultos1.jpg",
  "taller-resolucion-de-conflictos": "trabajo-en-equipo1.jpg",
  "taller-design-thinking": "trabajo-en-equipo1.jpg"
};

function mapCurso(cursoEncontrado: any): CourseData {
  const idCurso = (cursoEncontrado.id || cursoEncontrado.slug || "").toLowerCase();
  
  // 🔥 LÓGICA: Si el curso está en el diccionario, usamos el nombre real de R2.
  // Si es un curso NUEVO (que subiste hoy), usamos lo que diga Mongo.
  const imgKeyOriginal = cursoEncontrado.imgKey || cursoEncontrado.imagen_key || `${idCurso}.jpg`;
  const imgKeyReal = MAPEO_IMAGENES[idCurso] || imgKeyOriginal;

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
    imgKey: imgKeyReal, // 🔥 Aquí se inyecta el nombre traducido
    targetAudience: cursoEncontrado.targetAudience || ["kids"],
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
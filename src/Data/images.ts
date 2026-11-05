// ============================================================
// CONFIGURACIÓN CENTRAL DE IMÁGENES — GOKULAB
// ============================================================

const R2 = (folder: string, file: string, width = 1200) =>
  `https://media.gokulab.mx/cdn-cgi/image/width=${width},format=auto,quality=80/${folder}/${encodeURIComponent(file)}`;
// Función para videos (acceso directo a R2, sin transformación)
const R2Video = (folder: string, file: string) =>
  `https://media.gokulab.mx/${folder}/${encodeURIComponent(file)}`;

// ─── PROFESORES ────────────────────────────────────────────
export const PROFESORES = {
  jcrendon: R2("Profesores", "jcrendon.jpg", 400),
  csierra:  R2("Profesores", "csierra.jpg", 400),
};

// ─── HERO / SECCIONES PRINCIPALES ─────────────────────────
export const HERO = {
  portada:     R2("Galery", "pagina-principal1.jpg", 1600),
  ninos:       R2("Galery", "clases-peques1.jpg", 800),
  adultos:     R2("Galery", "clases-adultos1.jpg", 800),
  corporativo: R2("Galery", "empresas-gobierno1.jpg", 800),
};

// ─── GALERÍA HOME (mockup original, se mantiene)
export const GALERIA_HOME = [
  {
    src:  R2("Galery", "programacion-visual-peques1.JPG", 1200),
    span: "md:col-span-2 md:row-span-2",
    alt:  "Clase de Programación Visual",
  },
  {
    src:  R2("Galery", "robotica1.jpeg", 800),
    span: "",
    alt:  "Taller de Robótica",
  },
  {
    src:  R2("Galery", "clases-generales1.jpeg", 800),
    span: "",
    alt:  "Clase General GOKU LAB",
  },
  {
    src:  R2("Galery", "clases-adultos1.jpg", 800),
    span: "",
    alt:  "Clases para Adultos",
  },
  {
    src:  R2("Galery", "python-start1.jpg", 1200),
    span: "md:col-span-2",
    alt:  "Curso de Python",
  },
];

// ─── CURSOS (Ahora las llaves coinciden con el "slug" o "imagen_key" de MongoDB) ───
export const CURSOS: Record<string, string> = {
  // Mapeamos los nombres de Mongo a las fotos reales de tu R2
  "taller-creatividad": R2("Galery", "taller-creatividad.jpg", 800), // Si tu foto se llama distinto, cámbialo aquí
  "taller-prompt-engeneering": R2("Galery", "taller-prompt-engeneering.jpg", 800),
  "regularizacion-matematicas": R2("Galery", "regularizacion-matematicas1.jpg", 800),
  "adminitracion-de-proyectos": R2("Galery", "capacitacion-orporativa.jpeg", 800),
  "diseno-videojuegos-unity": R2("Galery", "unity1.jpg", 800),
  "python-pro": R2("Galery", "python-start1.jpg", 800),
  "diseno-videojuejos-lua-roblox": R2("Galery", "diseno-videojuegos1.jpg", 800),
  "alfabetizacion-digital": R2("Galery", "alfabetizacion-digital-adultos1.jpg", 800),
  "caballero-del-codigo": R2("Galery", "programacion-visual-peques1.JPG", 800), // Usando de respaldo por ahora
  "diseno-videojuegos-roblox": R2("Galery", "diseno-videojuegos1.jpg", 800),
  "diseno-grafico-ninos": R2("Galery", "diseno-grafico1.jpeg", 800),
  "programacion-visual-avanzada": R2("Galery", "programacion-visual-peques1.JPG", 800),
  "diseno-2d-y-3d": R2("Galery", "diseno-grafico1.jpeg", 800),
  "programacion-visual": R2("Galery", "programacion-visual.jpg", 800),
  "taller-gobernanza-IA-ciberseguridad": R2("Galery", "capacitacion-orporativa.jpeg", 800),
  "taller-resolucion-de-conflictos": R2("Galery", "capacitacion-orporativa.jpeg", 800),
  "robotica-principiantes": R2("Galery", "robotica1.jpeg", 800),
  "diseno-videojuegos-minecraft": R2("Galery", "diseno-videojuegos1.jpg", 800),
  "taller_impresion-3D": R2("Galery", "diseno-grafico1.jpeg", 800),
  "video-blogging": R2("Galery", "creacion-contenido-video1.jpg", 800),
  "python-start-avanzado": R2("Galery", "python-start1.jpg", 800),
  "inteligencia-artificial-adultos": R2("Galery", "ia-adultos.png", 800),
};

export const ALUMNOS: { src: string; alt: string }[] = [];
export const ALGORITHMICS_LOGO = R2("Galery", "algorithmics-logo.png", 200);

// ============================================================
// HOME - HERO Y SEGMENTOS (para Home.tsx)
// ============================================================
export const HOME_IMAGES = {
  hero:        R2("Galery", "pagina-principal1.jpg", 1600),
  ninos:       R2("Galery", "clases-peques1.jpg", 800),
  adultos:     R2("Galery", "clases-adultos1.jpg", 800),
  corporativo: R2("Galery", "empresas-gobierno1.jpg", 800),
};

// ============================================================
// GALERÍA HOME (versión para Home.tsx)
// ============================================================
export const GALERIA_HOME_IMAGES = {
  clasePV:      R2("Galery", "hero2.jpg", 1200),
  robotica:     R2("Galery", "robotica1.jpeg", 800),
  diseño:       R2("Galery", "Lumy.jpeg", 800),
  adultosClase: R2Video("Galery", "caballerocodigo.mp4"), // Video directo sin transformación
  python:       R2("Galery", "python-start1.jpg", 1200),
};
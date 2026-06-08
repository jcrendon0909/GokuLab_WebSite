// ============================================================
// CONFIGURACIÓN CENTRAL DE IMÁGENES — GOKULAB
// ============================================================

const R2 = (folder: string, file: string, width = 1200) =>
  `https://media.gokulab.mx/cdn-cgi/image/width=${width},format=auto,quality=80/${folder}/${encodeURIComponent(file)}`;

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

// ─── CURSOS ────────────────────────────────────────────────
export const CURSOS = {
  fundamentos:        R2("Galery", "fundamentos-programacion1.jpeg", 800),
  programacionVisual: R2("Galery", "programacion-visual-peques1.JPG", 800),
  disenoGrafico:      R2("Galery", "diseno-grafico1.jpeg", 800),
  robotica:           R2("Galery", "robotica1.jpeg", 800),
  animacion:          R2("Galery", "animacion-digital1.JPG", 800),
  ingles:             R2("Galery", "regularizacion-ingles.jpeg", 800),
  alfabetizacion:     R2("Galery", "alfabetizacion-digital-adultos1.jpg", 800),
  corporativo:        R2("Galery", "capacitacion-orporativa.jpeg", 800),
  creacionContenido:  R2("Galery", "creacion-contenido-video1.jpg", 800),
  disenoVideojuegos:  R2("Galery", "diseno-videojuegos1.jpg", 800),
  disenoWeb:          R2("Galery", "diseno-web1.jpg", 800),
  emprendimiento:     R2("Galery", "emprendimiento1.jpg", 800),
  iaNinos:            R2("Galery", "clases-niños1.jpg", 800),
  preparacionUni:     R2("Galery", "preparacion-universidad.jpg", 800),
  pythonStart:        R2("Galery", "python-start1.jpg", 800),
  regularizacion:     R2("Galery", "regularizacion-matematicas1.jpg", 800),
  unity:              R2("Galery", "unity1.jpg", 800),
  iaAdultos:          R2("Galery", "ia-adultos.png", 800),
};

export const ALUMNOS: { src: string; alt: string }[] = [];
export const ALGORITHMICS_LOGO = R2("Galery", "algorithmics-logo.png", 200);

// ============================================================
// HOME - HERO Y SEGMENTOS (para Home.tsx)
// ============================================================
export const HOME_IMAGES = {
  hero:        R2("Galery", "pagina-principal1.jpg", 1600),
  ninos:       R2("Galery", "clases-peques1.jpg", 800),     // ✅ usa la misma que HERO.ninos
  adultos:     R2("Galery", "clases-adultos1.jpg", 800),    // ✅ usa la misma que HERO.adultos
  corporativo: R2("Galery", "empresas-gobierno1.jpg", 800), // ✅ usa la misma que HERO.corporativo
};

// ============================================================
// GALERÍA HOME (versión para Home.tsx)
// ============================================================
export const GALERIA_HOME_IMAGES = {
  clasePV:      R2("Galery", "hero2.jpg", 1200),
  robotica:     R2("Galery", "robotica1.jpeg", 800),
  diseño:       R2("Galery", "Lumy.jpeg", 800),
  adultosClase: R2("Galery", "caballerodelcodigo.mp4", 800),
  python:       R2("Galery", "python-start1.jpg", 1200),
};
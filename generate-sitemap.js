import fs from 'fs';
import path from 'path';

const API_URL = 'https://agentevirtual-gokulab.onrender.com/api/cursos';
const BASE_URL = 'https://gokulab.mx';

// 🔥 DICCIONARIO ESTRICTO: Garantiza la URL correcta aunque la API falle
const AUDIENCIA_POR_ID = {
  // KIDS
  "programacion-visual": "ninos", 
  "robotica-principiantes": "ninos",
  "taller-creatividad": "ninos",
  "regularizacion-matematicas": "ninos",
  "caballero-del-codigo": "ninos",
  "diseno-grafico-ninos": "ninos",
  "programacion-visual-avanzada": "ninos",
  "diseno-videojuegos-minecraft": "ninos",
  // TEENS
  "diseno-videojuegos-roblox": "adolescentes",
  "diseno-videojuejos-lua-roblox": "adolescentes",
  "diseno-videojuegos-unity": "adolescentes",
  "python-pro": "adolescentes",
  "python-start-avanzado": "adolescentes",
  "diseno-2d-y-3d": "adolescentes",
  "taller_impresion-3d": "adolescentes",
  "video-blogging": "adolescentes",
  "taller-prompt-engeneering": "adultos",
  // ADULTS
  "inteligencia-artificial-adultos": "adultos",
  "alfabetizacion-digital": "adultos",
  "adminitracion-de-proyectos": "adultos",
  // COMPANY
  "taller-gobernanza-ia-ciberseguridad": "empresas",
  "taller-resolucion-de-conflictos": "empresas",
  "taller-design-thinking": "empresas"
};

async function generateSitemap() {
  try {
    console.log("Obteniendo cursos para el sitemap...");
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`La API falló con estado: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`La API no devolvió JSON. Devolvió: ${contentType}`);
    }

    const cursos = await response.json();
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const staticRoutes = [
      '/', '/nosotros', '/cursos', '/cursos/ninos', 
      '/cursos/adolescentes', '/cursos/adultos', '/cursos/empresas', 
      '/contacto', '/test', '/eventos', '/becas'
    ];
    
    staticRoutes.forEach(route => {
      xml += `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    cursos.forEach(curso => {
      const idLower = (curso.id || "").toLowerCase();
      
      // 🔥 Usamos el diccionario estricto
      let segment = AUDIENCIA_POR_ID[idLower];

      // Si es un curso nuevo que no está en el diccionario, usamos el fallback
      if (!segment) {
        const audience = curso.targetAudience || curso.audiencia || [];
        if (Array.isArray(audience) && audience.length > 0) {
          if (audience.includes("company")) segment = "empresas";
          else if (audience.includes("adults")) segment = "adultos";
          else if (audience.includes("teens")) segment = "adolescentes";
          else segment = "ninos";
        } else {
          segment = "ninos"; // Fallback final
        }
      }

      xml += `  <url>\n    <loc>${BASE_URL}/cursos/${segment}/${curso.id}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;

    const distDir = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
    
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
    console.log("✅ sitemap.xml generado exitosamente en /dist con categorías correctas");
  } catch (error) {
    console.error("❌ ERROR FATAL generando sitemap:", error.message);
    process.exit(1); 
  }
}

generateSitemap();
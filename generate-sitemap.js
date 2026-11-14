import fs from 'fs';
import path from 'path';

const API_URL = 'https://agentevirtual-gokulab.onrender.com/api/cursos';
const BASE_URL = 'https://gokulab.mx';

async function generateSitemap() {
  try {
    console.log("Obteniendo cursos para el sitemap...");
    const response = await fetch(API_URL);
    const cursos = await response.json();

    // Rutas estáticas
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const staticRoutes = ['/', '/nosotros', '/cursos', '/cursos/ninos', '/cursos/adolescentes', '/cursos/adultos', '/cursos/empresas', '/contacto', '/test', '/eventos', '/becas'];
    
    staticRoutes.forEach(route => {
      xml += `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    // Rutas dinámicas (Cursos)
    cursos.forEach(curso => {
      const segment = curso.targetAudience.includes("kids") ? "ninos" : curso.targetAudience.includes("teens") ? "adolescentes" : "adultos";
      xml += `  <url>\n    <loc>${BASE_URL}/cursos/${segment}/${curso.id}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
    
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
    console.log("✅ sitemap.xml generado exitosamente en /public");
  } catch (error) {
    console.error("❌ Error generando sitemap:", error);
  }
}

generateSitemap();
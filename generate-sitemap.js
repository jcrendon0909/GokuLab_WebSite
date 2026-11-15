import fs from 'fs';
import path from 'path';

const API_URL = 'https://agentevirtual-gokulab.onrender.com/api/cursos';
const BASE_URL = 'https://gokulab.mx';

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
    if (!Array.isArray(cursos) || cursos.length === 0) {
      throw new Error("La API devolvió un arreglo vacío o inválido de cursos.");
    }

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

    // Rutas dinámicas (Cursos)
    cursos.forEach(curso => {
      // 🔥 BLINDAJE: Si targetAudience no existe, usamos un plan B por edad
      let segment = "ninos"; // Default
      const audience = curso.targetAudience || curso.audiencia || [];
      const ageText = (curso.age || curso.edad_dirigida || "").toLowerCase();

      if (Array.isArray(audience) && audience.length > 0) {
        if (audience.includes("company")) segment = "empresas";
        else if (audience.includes("adults")) segment = "adultos";
        else if (audience.includes("teens")) segment = "adolescentes";
      } else {
        // Fallback por si el curso no tiene el arreglo
        if (ageText.includes("adulto") || ageText.includes("18") || ageText.includes("empresa")) segment = "adultos";
        else if (ageText.includes("adolescente") || ageText.includes("12")) segment = "adolescentes";
      }

      xml += `  <url>\n    <loc>${BASE_URL}/cursos/${segment}/${curso.id}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;

    const distDir = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
    console.log("✅ sitemap.xml generado exitosamente en /dist");
  } catch (error) {
    console.error("❌ ERROR FATAL generando sitemap:", error.message);
    process.exit(1); 
  }
}

generateSitemap();
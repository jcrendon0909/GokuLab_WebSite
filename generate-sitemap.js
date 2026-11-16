import fs from 'fs';
import path from 'path';

const API_URL = 'https://agentevirtual-gokulab.onrender.com/api/cursos';
const BASE_URL = 'https://gokulab.mx';

// Diccionario para evitar errores de clasificación
const AUDIENCIA_POR_ID = {
  "programacion-visual": "ninos", 
  "robotica-principiantes": "ninos",
  "taller-creatividad": "ninos",
  "regularizacion-matematicas": "ninos",
  "caballero-del-codigo": "ninos",
  "diseno-grafico-ninos": "ninos",
  "programacion-visual-avanzada": "ninos",
  "diseno-videojuegos-minecraft": "ninos",
  "diseno-videojuegos-roblox": "adolescentes",
  "diseno-videojuejos-lua-roblox": "adolescentes",
  "diseno-videojuegos-unity": "adolescentes",
  "python-pro": "adolescentes",
  "python-start-avanzado": "adolescentes",
  "diseno-2d-y-3d": "adolescentes",
  "taller_impresion-3d": "adolescentes",
  "video-blogging": "adolescentes",
  "taller-prompt-engeneering": "adultos",
  "inteligencia-artificial-adultos": "adultos",
  "alfabetizacion-digital": "adultos",
  "adminitracion-de-proyectos": "adultos",
  "taller-gobernanza-ia-ciberseguridad": "empresas",
  "taller-resolucion-de-conflictos": "empresas",
  "taller-design-thinking": "empresas"
};

async function generateSEOAssets() {
  try {
    console.log("Obteniendo cursos para el sitemap y pre-renderizado...");
    const response = await fetch(API_URL);
    
    if (!response.ok) throw new Error(`API falló: ${response.status}`);
    const cursos = await response.json();
    if (!Array.isArray(cursos)) throw new Error("La API no devolvió un arreglo válido.");

    // 1. GENERAR SITEMAP.XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    const staticRoutes = ['/', '/nosotros', '/cursos', '/cursos/ninos', '/cursos/adolescentes', '/cursos/adultos', '/cursos/empresas', '/contacto', '/test', '/eventos', '/becas'];
    staticRoutes.forEach(route => {
      xml += `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    // 2. GENERAR PÁGINAS HTML ESTÁTICAS
    const distDir = path.join(process.cwd(), 'dist');
    const baseHtmlPath = path.join(distDir, 'index.html');
    
    // Verificamos que el index.html exista (Vite ya lo creó)
    if (!fs.existsSync(baseHtmlPath)) {
        throw new Error("No se encontró dist/index.html. ¿Falló Vite?");
    }
    const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

    cursos.forEach(curso => {
      // Clasificación del segmento
      const idLower = (curso.id || "").toLowerCase();
      let segment = AUDIENCIA_POR_ID[idLower];
      if (!segment) {
        const audience = curso.targetAudience || curso.audiencia || [];
        if (Array.isArray(audience) && audience.length > 0) {
          if (audience.includes("company")) segment = "empresas";
          else if (audience.includes("adults")) segment = "adultos";
          else if (audience.includes("teens")) segment = "adolescentes";
          else segment = "ninos";
        } else {
          segment = "ninos";
        }
      }

      // Añadir al sitemap
      xml += `  <url>\n    <loc>${BASE_URL}/cursos/${segment}/${curso.id}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;

      // Generar HTML estático
      const imgUrl = curso.imgKey ? `https://media.gokulab.mx/Galery/${curso.imgKey}` : "https://media.gokulab.mx/Galery/pagina-principal1.jpg";
      const courseTitle = curso.title || "Curso en GōkuLab";
      const courseDesc = curso.subtitle || "Descubre nuestros cursos de tecnología.";
      
      let courseHtml = baseHtml;

      // Reemplazos de metadatos (Regex seguro para evitar problemas de comillas)
      courseHtml = courseHtml.replace(/<title>.*?<\/title>/, `<title>${courseTitle} | GōkuLab</title>`);
      courseHtml = courseHtml.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${courseDesc.replace(/"/g, '&quot;')}" />`);
      
      // Open Graph
      courseHtml = courseHtml.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${courseTitle.replace(/"/g, '&quot;')} | GōkuLab" />`);
      courseHtml = courseHtml.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${courseDesc.replace(/"/g, '&quot;')}" />`);
      courseHtml = courseHtml.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${imgUrl}" />`);
      courseHtml = courseHtml.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${BASE_URL}/cursos/${segment}/${curso.id}" />`);

      // Twitter Card
      courseHtml = courseHtml.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${courseTitle.replace(/"/g, '&quot;')} | GōkuLab" />`);
      courseHtml = courseHtml.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${courseDesc.replace(/"/g, '&quot;')}" />`);
      courseHtml = courseHtml.replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${imgUrl}" />`);

      // Schema.org específico del curso
      const schemaCourse = `
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "${courseTitle.replace(/"/g, '&quot;')}",
        "description": "${courseDesc.replace(/"/g, '&quot;')}",
        "provider": {
          "@type": "Organization",
          "name": "GōkuLab",
          "sameAs": "https://gokulab.mx"
        }
      }
      </script>
      `;
      courseHtml = courseHtml.replace('</head>', `${schemaCourse}\n</head>`);

      // Crear directorios y guardar el archivo (ej: dist/cursos/ninos/programacion-visual/index.html)
      const courseDir = path.join(distDir, 'cursos', segment, curso.id);
      if (!fs.existsSync(courseDir)) {
        fs.mkdirSync(courseDir, { recursive: true });
      }
      fs.writeFileSync(path.join(courseDir, 'index.html'), courseHtml);
    });

    xml += `</urlset>`;

    // Guardar sitemap
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
    
    console.log(`✅ Sitemap generado con ${cursos.length} cursos.`);
    console.log(`✅ HTML estáticos generados para ${cursos.length} cursos (Pre-renderizado Build Time).`);
    
  } catch (error) {
    console.error("❌ ERROR FATAL en la generación de SEO:", error.message);
    process.exit(1); 
  }
}

generateSEOAssets();
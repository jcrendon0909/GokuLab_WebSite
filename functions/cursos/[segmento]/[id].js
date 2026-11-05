export async function onRequest(context) {
  const { request, params, next } = context;
  const url = new URL(request.url);
  const userAgent = request.headers.get("User-Agent") || "";

  // 1. Detectar si quien entra es un Bot (WhatsApp, Facebook, Twitter)
  const isBot = /facebookexternalhit|twitterbot|whatsapp|linkedinbot|slackbot|telegrambot|discordbot/i.test(userAgent);

  // Si es un humano, dejamos que React cargue normal
  if (!isBot) {
    return next(); 
  }

  // 2. Si es un bot, buscamos la info del curso
  const courseId = params.id; // ej: "programacion-visual"

  try {
    // Hacemos fetch a tu API en Render
    const apiRes = await fetch("https://agentevirtual-gokulab.onrender.com/api/cursos");
    const courses = await apiRes.json();
    const course = courses.find(c => c.id === courseId);

    if (course) {
      // 3. Obtenemos el HTML original
      const response = await next();
      let html = await response.text();

      // 4. Preparamos los datos
      const title = `${course.title} | GōkuLab`;
      const description = course.subtitle;
      // Usamos la imagen del curso en R2 (si falla, usa la portada)
      const imageUrl = course.imgKey 
        ? `https://media.gokulab.mx/cdn-cgi/image/width=1200,format=auto,quality=80/Galery/${course.imgKey}.jpg`
        : "https://media.gokulab.mx/Galery/pagina-principal1.jpg";

      // 5. Reemplazamos las etiquetas meta en el HTML
      html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      html = html.replace(/<meta property="og:title" content=".*?" \/>/g, `<meta property="og:title" content="${title}" />`);
      html = html.replace(/<meta property="og:description" content=".*?" \/>/g, `<meta property="og:description" content="${description}" />`);
      html = html.replace(/<meta property="og:image" content=".*?" \/>/g, `<meta property="og:image" content="${imageUrl}" />`);
      html = html.replace(/<meta name="description" content=".*?" \/>/g, `<meta name="description" content="${description}" />`);

      // 6. Devolvemos el HTML modificado al bot
      return new Response(html, {
        headers: response.headers,
        status: response.status,
      });
    }
  } catch (e) {
    console.error("Error fetching course for bot:", e);
  }

  // Si algo falla o no es un curso, devolvemos el HTML normal
  return next();
}
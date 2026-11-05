export async function onRequest(context) {
  const { request, params, next } = context;
  const userAgent = request.headers.get("User-Agent") || "";

  const isBot = /facebookexternalhit|twitterbot|whatsapp|linkedinbot|slackbot|telegrambot|discordbot/i.test(userAgent);

  if (!isBot) return next(); 

  const courseId = params.id;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const apiRes = await fetch("https://agentevirtual-gokulab.onrender.com/api/cursos", { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!apiRes.ok) throw new Error("Render no responde");
    
    const courses = await apiRes.json();
    const course = courses.find(c => c.id === courseId || c.slug === courseId);

    if (course) {
      const response = await next();
      let html = await response.text();

      const title = `${course.title} | GōkuLab`;
      const description = `${course.subtitle || "Aprende creando desde el primer día."} Descubre nuestro curso en GōkuLab.`;
      
      // LA MAGIA: Usamos course.imgKey TAL CUAL, porque ya incluye el .jpg
      const imageUrl = (course.imgKey && course.imgKey !== "") 
            ? `https://media.gokulab.mx/Galery/${course.imgKey}` 
            : "https://media.gokulab.mx/Galery/pagina-principal1.jpg";

      const currentUrl = `https://gokulab.mx/cursos/${params.segmento}/${courseId}`;

      html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      html = html.replace(/<meta property="og:title" content=".*?" \/>/g, `<meta property="og:title" content="${title}" />`);
      html = html.replace(/<meta property="og:description" content=".*?" \/>/g, `<meta property="og:description" content="${description}" />`);
      html = html.replace(/<meta property="og:image" content=".*?" \/>/g, `<meta property="og:image" content="${imageUrl}" />`);
      html = html.replace(/<meta property="og:url" content=".*?" \/>/g, `<meta property="og:url" content="${currentUrl}" />`);
      html = html.replace(/<meta name="description" content=".*?" \/>/g, `<meta name="description" content="${description}" />`);
      html = html.replace(/<link rel="canonical" href=".*?" \/>/g, `<link rel="canonical" href="${currentUrl}" />`);

      return new Response(html, {
        headers: { ...response.headers, "content-type": "text/html;charset=UTF-8" },
        status: 200,
      });
    }
  } catch (e) {
    console.error("Error en Cloudflare Function:", e);
  }

  return next();
}
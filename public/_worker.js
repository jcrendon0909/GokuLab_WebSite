export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 1. Si la URL tiene una extensión de archivo (ej. .js, .css, .png, .jpg), 
    // simplemente entregamos el archivo estático. 
    // NUNCA redirigimos esto al index.html para evitar errores de MIME type.
    if (pathname.includes('.')) {
      return env.ASSETS.fetch(request);
    }

    // 2. Si es una ruta (ej. /cursos/ninos o /debug-cursos), intentamos buscar
    // el HTML pre-renderizado que generamos.
    let response = await env.ASSETS.fetch(request);

    // 3. Si la ruta no existe (404), significa que es una ruta que maneja React Router.
    // Entregamos el index.html de la raíz para que React cargue la vista.
    if (response.status === 404) {
      const indexRequest = new Request(new URL('/', url).toString(), request);
      return env.ASSETS.fetch(indexRequest);
    }

    // 4. Si el archivo pre-renderizado existe, lo entregamos (mantiene el SEO intacto)
    return response;
  },
};
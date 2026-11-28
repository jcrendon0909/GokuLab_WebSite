export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 1. Intentamos servir el archivo estático solicitado
    //    (ej. /cursos/ninos/taller-creatividad/index.html o /assets/index.js)
    let response = await env.ASSETS.fetch(request);
    
    // 2. Si el archivo existe (status 200), lo devolvemos tal cual.
    //    Esto preserva el HTML pre-renderizado para SEO y redes sociales.
    if (response.status === 200) {
      return response;
    }
    
    // 3. Si no existe (404), significa que es una ruta de React Router
    //    que no tiene HTML estático. Servimos el index.html de la raíz
    //    para que React cargue y muestre la página correcta.
    //    Esto arregla el error al recargar o compartir links.
    const indexRequest = new Request(new URL('/', url).toString(), request);
    return env.ASSETS.fetch(indexRequest);
  },
};
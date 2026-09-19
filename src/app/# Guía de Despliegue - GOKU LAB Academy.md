# Guía de Despliegue - GOKU LAB Academy

Esta guía explica cómo hacer cambios en el sitio web `gokulab.mx` y publicarlos correctamente.

---

## 📋 Flujo de trabajo resumido
📝 Contenido para copiar (todo el bloque de abajo)
Copias desde la línea que dice # Guía de Despliegue - GOKU LAB Academy hasta el final.

markdown
# Guía de Despliegue - GOKU LAB Academy

Esta guía explica cómo hacer cambios en el sitio web `gokulab.mx` y publicarlos correctamente.

---

## 📋 Flujo de trabajo resumido
Editas archivo → Guardas → Commit en GitHub Desktop → Push → Esperas 2-3 min → Refrescas página

text

**Tiempo total:** Aproximadamente 5 minutos desde que guardas el cambio hasta que se ve en internet.

---

## 🔧 Paso a paso detallado

### 1. Abre el proyecto en VS Code

Abre VS Code y selecciona la carpeta del proyecto, o usa la terminal:

```bash
cd ~/Desktop/GokuLab_WebSite
code .
2. Edita el archivo que necesitas cambiar
Ejemplos comunes:

src/app/pages/Nosotros.tsx → Equipo, misión, visión

src/app/pages/Inicio.tsx → Página principal

src/app/components/Header.tsx → Menú de navegación

3. Guarda el archivo
Presiona Cmd + S (Mac) o Ctrl + S (Windows)

4. Abre GitHub Desktop
Verás el archivo modificado en la lista de "Changes"

Escribe un mensaje descriptivo (ej: "Actualiza nombre del equipo")

Haz clic en "Commit to main"

Luego haz clic en "Push origin" (arriba a la derecha)

5. Espera a que Cloudflare despliegue
2-3 minutos aproximadamente

Cloudflare detecta el push, construye el sitio y lo publica automáticamente

6. Verifica el cambio
Abre una ventana de incógnito/privada (para evitar caché)

Ve a https://gokulab.mx

Refresca con Cmd + Shift + R (refresco forzado)

Confirma que el cambio se ve correctamente

⚠️ Solución de problemas comunes
Problema	Posible causa	Solución
No veo el cambio después de 10 min	Caché del navegador	Usa ventana de incógnito o Cmd + Shift + R
GitHub Desktop no muestra cambios	No guardaste el archivo	Guarda en VS Code y revisa de nuevo
Cloudflare muestra error rojo	Build command incorrecto	Verifica que en Cloudflare esté npm install && npm run build
El cambio afecta otra página	Editaste el archivo equivocado	Verifica la ruta del archivo
🚀 Verificar que el despliegue fue exitoso
Ve a https://dash.cloudflare.com

Workers & Pages → gokulab-official-site

Deployments → busca el último despliegue

Debe decir "Active" en verde

📁 Archivos comunes y qué controlan
Archivo	Qué parte del sitio controla
src/app/pages/Inicio.tsx	Página principal
src/app/pages/Nosotros.tsx	Equipo, misión, visión
src/app/pages/Contacto.tsx	Formulario de contacto
src/app/components/Header.tsx	Menú de navegación
src/app/components/Footer.tsx	Pie de página
💡 Tips importantes
No necesitas hacer npm run build localmente — Cloudflare lo hace por ti

No necesitas purgar caché — Cloudflare lo maneja automáticamente

Usa ventana de incógnito para verificar cambios sin caché

Si el cambio es urgente, después del push haz "Retry deployment" en Cloudflare

🔗 Enlaces útiles
Recurso	URL
Sitio en vivo	https://gokulab.mx
Repositorio GitHub	https://github.com/jcrendon0909/GokuLab_WebSite
Cloudflare Dashboard	https://dash.cloudflare.com
✅ Checklist antes de considerar un cambio "publicado"
El archivo está guardado en VS Code

El commit se hizo en GitHub Desktop

El push se completó (botón "Push origin" gris)

Cloudflare muestra "Active" en Deployments

El cambio se ve en ventana de incógnito

Última actualización: 20 de mayo de 2026

text

---

## 📂 Cómo crear el archivo en VS Code

### **Paso 1: Abre VS Code en tu proyecto**

### **Paso 2: Crea un nuevo archivo**
- En el explorador de archivos (barra izquierda), haz clic derecho
- Selecciona **"New File"**
- Escribe exactamente: `GUIA-DEPLOY.md`

### **Paso 3: Copia el contenido**
- Selecciona TODO el texto que está arriba (desde `# Guía de Despliegue` hasta `*Última actualización: 20 de mayo de 2026*`)
- Cópialo (`Cmd + C` en Mac)
- Pégalo en el archivo nuevo en VS Code (`Cmd + V`)

### **Paso 4: Guarda**
- `Cmd + S`

### **Paso 5: Sube a GitHub**
- Abre GitHub Desktop
- Verás el archivo nuevo en la lista
- Escribe mensaje: "Agrega guía de despliegue"
- **Commit to main**
- **Push origin**

---

**¿Ya lo lograste? ¿Ves el archivo en tu repositorio de GitHub?** 🚀
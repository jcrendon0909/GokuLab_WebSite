# Videos de Fondo para GŌKU LAB

## 📹 Hero Background Video

Coloca aquí tu video de fondo para la sección hero del Home.

**Nombre del archivo requerido:** `hero-background.mp4`

---

## 🎬 Especificaciones Técnicas

### Formato y Calidad
- **Formato:** MP4 (H.264 codec)
- **Resolución:** 1920x1080 (Full HD) mínimo
- **Duración:** 10-30 segundos (se reproducirá en loop continuo)
- **Tamaño:** Máximo 10MB (optimizado para web)
- **Frame rate:** 30fps
- **Audio:** No necesario (el video se reproduce en mute)

### Contenido Sugerido
El video debe reflejar el ambiente y la esencia de GŌKU LAB:

- ✅ Niñas, niños y adolescentes programando
- ✅ Robótica educativa en acción
- ✅ Código en pantallas
- ✅ Ambiente de clase tecnológica
- ✅ Estudiantes trabajando en proyectos
- ✅ Tecnología educativa (LEGO, robots, tablets, etc.)
- ✅ Ambiente colaborativo y dinámico

---

## 🔧 Optimización de Video

Si tu video es muy pesado, usa FFmpeg para optimizarlo:

```bash
# Optimizar video manteniendo calidad
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -vf scale=1920:1080 -c:a aac -b:a 128k -movflags +faststart hero-background.mp4
```

### Parámetros explicados:
- `-crf 28`: Controla la calidad (18-28 es óptimo, menor = mejor calidad)
- `-preset slow`: Mayor compresión, toma más tiempo procesar
- `-movflags +faststart`: Optimiza para streaming web

---

## 📂 Ubicación del Archivo

```
/workspaces/default/code/public/videos/hero-background.mp4
```

Una vez colocado el archivo en esta ubicación, el video se mostrará automáticamente en el fondo del hero.

---

## 🔄 Fallback Automático

Si el video no se encuentra o no carga correctamente:
- El sistema **automáticamente** mostrará la imagen estática de respaldo
- No se mostrará ningún error al usuario
- La experiencia visual se mantiene intacta

---

## 💡 Recursos para Obtener Videos

### Videos de Stock Gratuitos:
1. **Pexels Videos** - https://www.pexels.com/videos/
2. **Pixabay Videos** - https://pixabay.com/videos/
3. **Coverr** - https://coverr.co/
4. **Videvo** - https://www.videvo.net/

### Búsquedas recomendadas:
- "kids coding"
- "children programming"
- "robotics education"
- "technology classroom"
- "stem education"

---

## ✨ Resultado Esperado

El video de fondo se verá con:
- Opacidad reducida (20% en modo oscuro, 12% en modo claro)
- Gradiente radial superpuesto para no interferir con el texto
- Reproducción automática en loop
- Sin sonido
- Transiciones suaves al cambiar de tema (oscuro/claro)

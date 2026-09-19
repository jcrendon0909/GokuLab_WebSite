# Procedimiento Oficial de Fusión de Código

**GOKU LAB Academy**  
Versión: 2.0 (Final)  
Fecha: 26 de mayo de 2026  
Autor: Juan Carlos Rendón Aguilar  
Estado: ✅ Aprobado

---

## 1. Propósito

Establecer el procedimiento estándar para fusionar los últimos cambios del desarrollador externo en el repositorio principal antes de su salida definitiva del proyecto.

---

## 2. Responsables

| Rol | Nombre |
|-----|--------|
| Responsable Técnico | Juan Carlos Rendón Aguilar |
| Desarrollador Externo | Arturo Daniel Méndez Amel |

---

## 3. Requisitos Previos

- [ ] Tener acceso a la terminal de VS Code
- [ ] Tener GitHub Desktop instalado
- [ ] Verificar conexión a internet
- [ ] Tener a la mano la URL del repositorio del desarrollador:
      `https://github.com/kaiijiultsur-star/gokulab-website.git`
- [ ] Confirmar que el sitio `gokulab.mx` está funcionando

---

## 4. Procedimiento Paso a Paso

### FASE 1: Preparación

```bash
cd ~/Documents/Proyectos/GokuLab_WebSite
git status

FASE 2: Conectar repositorio del desarrollador (solo una vez)
bash
git remote add temporal https://github.com/kaiijiultsur-star/gokulab-website.git
git remote -v   # Verificar

FASE 3: Traer cambios

git fetch temporal
git branch -r   # Opcional: ver ramas

FASE 4: Fusión
git merge temporal/main --allow-unrelated-histories

FASE 5: Resolver conflictos
git status   # Listar archivos en conflicto

Para archivos de configuración (package-lock.json, pnpm-workspace.yaml, vite.config.ts):
git checkout --theirs package-lock.json pnpm-workspace.yaml vite.config.ts
git add package-lock.json pnpm-workspace.yaml vite.config.ts

Para archivos raíz (README.md, index.html):
git checkout --ours README.md index.html
git add README.md index.html

Para páginas y componentes (abrir en VS Code uno por uno):
code src/app/pages/Nosotros.tsx
code src/app/pages/Home.tsx
code src/app/pages/Cursos.tsx
code src/app/pages/Contacto.tsx
code src/app/components/FloatingCTA.tsx
code src/app/components/SearchModal.tsx
code src/app/components/CourseSearch.tsx

En cada archivo en VS Code:

Buscar marcas <<<<<<<, =======, >>>>>>>
Hacer clic en "Accept Current Change" o "Accept Incoming Change"

Guardar (Cmd + S)

Finalizar resolución:
git add .
git status   # Debe decir "All conflicts fixed"

FASE 6: Finalizar
git commit -m "Fusiona últimos cambios del desarrollador - Versión final 2026-05-26"
git push origin main
git remote remove temporal

5. Comandos de Rescate
Situación	Comando
Abortar todo	git merge --abort
Usar mi versión para todo	git merge --abort + git merge temporal/main --allow-unrelated-histories -X ours
Usar su versión para todo	git merge --abort + git merge temporal/main --allow-unrelated-histories -X theirs
Limpiar remote temporal	git remote remove temporal

6. Tabla de Decisión por Archivo
Archivo	Decisión	Comando/Acción
package-lock.json	Usar el de él	git checkout --theirs
pnpm-workspace.yaml	Usar el de él	git checkout --theirs
vite.config.ts	Usar el de él	git checkout --theirs
README.md	Usar el mío	git checkout --ours
index.html	Usar el mío	git checkout --ours
src/app/pages/*.tsx	Evaluar caso por caso	Abrir en VS Code
src/app/components/*.tsx	Mayoría mi versión	Abrir en VS Code

7. Verificación Post-Operación
git status muestra "working tree clean"

El commit aparece en GitHub

El sitio gokulab.mx muestra los cambios (ventana de incógnito + Cmd+Shift+R)

Fotos del equipo visibles

Página Nosotros correcta

Página Cursos correcta

Página Contacto correcta

Botón flotante de WhatsApp funciona

8. Notas Importantes
Esta es la ÚLTIMA fusión con el desarrollador externo.

Después de este proceso, el repositorio del desarrollador puede ser archivado.

El remote "temporal" debe eliminarse después de la fusión.

Siempre usar ventana de incógnito para verificar despliegues.

9. Aprobaciones
Rol	Nombre	Fecha
Responsable Técnico	Juan Carlos Rendón Aguilar	26/05/2026
Desarrollador Externo	Arturo Daniel Méndez Amel	26/05/2026

Fin del Documento


### **Paso 4: Pega y guarda**
- Pega el contenido en el editor de GitHub
- **Baja hasta el final de la página**
- Escribe mensaje: `Agrega procedimiento oficial de fusión de código`
- Selecciona **"Commit directly to the main branch"**
- Haz clic en **"Commit new file"**

✅ **Listo.** El documento ahora está en:  
`https://github.com/jcrendon0909/GokuLab_WebSite/blob/main/docs/PROCEDIMIENTO-FUSION.md`

---

## 🚀 Método 2: Subir desde VS Code (si prefieres)

### **Paso 1: Abre VS Code en tu proyecto**
```bash
cd ~/Documents/Proyectos/GokuLab_WebSite
code .


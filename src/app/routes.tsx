import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Nosotros } from "./pages/Nosotros";
import { Cursos } from "./pages/Cursos";
import { CursosNinos } from "./pages/CursosNinos";
import { CursosAdolescentes } from "./pages/CursosAdolescentes";
import { CursosAdultos } from "./pages/CursosAdultos";
import { CursosEmpresas } from "./pages/CursosEmpresas";
import { CursoDetalle } from "./pages/CursoDetalle";
import { Metodologia } from "./pages/Metodologia";
import { TestPage } from "./pages/Test";
import { Eventos } from "./pages/Eventos";
import { Becas } from "./pages/Becas";
import { Contacto } from "./pages/Contacto";
import { Auditoria } from "./pages/Auditoria";
import { DebugCursos } from "./pages/DebugCursos";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    // 🔥 Si hay un error inesperado en cualquier ruta, muestra esta pantalla
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Home },
      { path: "nosotros", Component: Nosotros },
      { path: "cursos", Component: Cursos },
      
      // Rutas específicas de categorías
      { path: "cursos/ninos", Component: CursosNinos },
      { path: "cursos/adolescentes", Component: CursosAdolescentes },
      { path: "cursos/adultos", Component: CursosAdultos },
      { path: "cursos/empresas", Component: CursosEmpresas },

      // Rutas dinámicas de detalle de curso
      { path: "cursos/ninos/:id", Component: CursoDetalle },
      { path: "cursos/adolescentes/:id", Component: CursoDetalle },
      { path: "cursos/adultos/:id", Component: CursoDetalle },
      { path: "cursos/empresas/:id", Component: CursoDetalle },
      
      // Atrapa cualquier otra combinación de curso
      { path: "cursos/:segmento/:id", Component: CursoDetalle },
      { path: "curso/:id", Component: CursoDetalle },
      { path: "cursos/:segmento", Component: Cursos },

      // Otras páginas
      { path: "metodologia", Component: Metodologia },
      { path: "test", Component: TestPage },
      { path: "eventos", Component: Eventos },
      { path: "becas", Component: Becas },
      { path: "contacto", Component: Contacto },
      { path: "auditoria", Component: Auditoria },
      { path: "debug-cursos", Component: DebugCursos },

      // Redirección de la ruta vieja
      { path: "capacitaciones", element: <Navigate to="/cursos/empresas" replace /> },

      // 🔥 RUTA COMODÍN: Si la URL no existe, va a la página 404
      { path: "*", Component: NotFound },
    ],
  },
]);
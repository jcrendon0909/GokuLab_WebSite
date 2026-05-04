import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Nosotros } from "./pages/Nosotros";
import { Cursos } from "./pages/Cursos";
import { CursosNinos } from "./pages/CursosNinos";
import { CursosAdolescentes } from "./pages/CursosAdolescentes";
import { CursosAdultos } from "./pages/CursosAdultos";
import { CursoDetalle } from "./pages/CursoDetalle";
import { Metodologia } from "./pages/Metodologia";
import { TestPage } from "./pages/Test";
import { Eventos } from "./pages/Eventos";
import { Becas } from "./pages/Becas";
import { Contacto } from "./pages/Contacto";
import { Capacitaciones } from "./pages/Capacitaciones";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "nosotros", Component: Nosotros },
      { path: "cursos", Component: Cursos },
      { path: "cursos/ninos", Component: CursosNinos },
      { path: "cursos/adolescentes", Component: CursosAdolescentes },
      { path: "cursos/adultos", Component: CursosAdultos },
      { path: "cursos/:segmento", Component: Cursos },
      { path: "cursos/ninos/:id", Component: CursoDetalle },
      { path: "cursos/adolescentes/:id", Component: CursoDetalle },
      { path: "cursos/adultos/:id", Component: CursoDetalle },
      { path: "cursos/:segmento/:id", Component: CursoDetalle },
      { path: "curso/:id", Component: CursoDetalle },
      { path: "metodologia", Component: Metodologia },
      { path: "test", Component: TestPage },
      { path: "eventos", Component: Eventos },
      { path: "becas", Component: Becas },
      { path: "contacto", Component: Contacto },
      { path: "capacitaciones", Component: Capacitaciones },
    ],
  },
]);

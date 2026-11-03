import { coursesData } from "../../Data/courses";
import { Link } from "react-router";

export function Auditoria() {
  const cursos = Object.values(coursesData || {});
  
  const porAudiencia = {
    kids: cursos.filter(c => c.targetAudience.includes("kids")),
    teens: cursos.filter(c => c.targetAudience.includes("teens")),
    adults: cursos.filter(c => c.targetAudience.includes("adults")),
    company: cursos.filter(c => c.targetAudience.includes("company")),
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black mb-2">Auditoría de Catálogo</h1>
        <p className="text-gray-600 mb-8">Total de cursos: <strong>{cursos.length}</strong>. (Algunos aparecen en varias columnas).</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(porAudiencia).map(([audiencia, lista]) => (
            <div key={audiencia} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="font-black text-xl mb-4 capitalize border-b pb-2 flex justify-between">
                <span>{audiencia}</span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">{lista.length}</span>
              </h2>
              <ul className="space-y-4">
                {lista.map(c => {
                  // Determinamos la ruta correcta según la audiencia
                  const ruta = c.targetAudience.includes("company") 
                    ? "/capacitaciones"
                    : c.targetAudience.includes("kids") 
                      ? `/cursos/ninos/${c.id}` 
                      : c.targetAudience.includes("teens")
                        ? `/cursos/adolescentes/${c.id}`
                        : `/cursos/adultos/${c.id}`;
                  
                  return (
                    <li key={c.id} className="text-sm border-l-4 pl-3" style={{ borderColor: c.color }}>
                      <span className="font-bold block text-gray-900 leading-tight mb-1">{c.title}</span>
                      <span className="text-gray-500 font-mono text-xs block">ID: {c.id}</span>
                      <span className="text-green-600 font-bold block mt-1">Precio: {c.price}</span>
                      <Link to={ruta} className="text-blue-600 hover:underline text-xs font-bold mt-1 inline-block">
                        Probar enlace →
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
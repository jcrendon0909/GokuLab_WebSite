import { useState, useEffect } from "react";
import { fetchAllCourses } from "../../Data/courseService";
import { CourseData } from "../../Data/courses";

export function DebugCursos() {
  const [cursos, setCursos] = useState<CourseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchAllCourses().then(data => {
      setCursos(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <div className="p-10 text-white bg-[#050A14] min-h-screen">Cargando datos...</div>;

  return (
    <div className="p-10 text-white bg-[#050A14] min-h-screen font-sans">
      <h1 className="text-3xl font-black mb-4">🛠️ Auditoría de Imágenes (Mapeo Aplicado)</h1>
      <p className="text-gray-400 mb-8">Si el recuadro está en rojo, esa imagen aún no existe en R2 con ese nombre.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos.map((curso) => {
          const imgUrl = `https://media.gokulab.mx/Galery/${curso.imgKey}`;
          const hasError = errorImages[curso.id];

          return (
            <div key={curso.id} className={`border rounded-2xl p-4 flex flex-col gap-4 ${hasError ? 'bg-red-900/20 border-red-500' : 'bg-white/5 border-white/10'}`}>
              <div>
                <p className="text-xs text-gray-400 mb-1">ID: <span className="font-mono text-white select-all">{curso.id}</span></p>
                <p className="text-xs text-gray-400">Buscando en R2: <span className="font-mono text-green-400 select-all">{curso.imgKey}</span></p>
              </div>
              
              <div className="relative h-40 bg-black/50 rounded-xl overflow-hidden">
                {imgUrl && curso.imgKey ? (
                  <img 
                    src={imgUrl} 
                    className="w-full h-full object-cover" 
                    onError={() => setErrorImages(prev => ({ ...prev, [curso.id]: true }))}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-red-400 text-sm">❌ Sin imgKey</div>
                )}
                {hasError && <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-red-400 font-bold">❌ 404 NOT FOUND</div>}
              </div>
              <p className="text-sm font-bold text-center line-clamp-2">{curso.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
import { Link } from "react-router";
import { CourseData } from "../../Data/courses";

export function CourseCard({ curso }: { curso: any }) {
  // 1. Construimos la URL apuntando al R2 con el nombre exacto que viene de Mongo
  const imgUrl = curso.imgKey 
    ? `https://media.gokulab.mx/Galery/${curso.imgKey}` 
    : "https://media.gokulab.mx/Galery/pagina-principal1.jpg";

  return (
    <Link to={`/cursos/${curso.id}`} className="group block bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={imgUrl} 
          alt={curso.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback si la foto no existe en R2
            (e.target as HTMLImageElement).src = "https://media.gokulab.mx/Galery/pagina-principal1.jpg";
          }}
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">
          {curso.level}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-black text-white mb-2">{curso.title}</h3>
        <p className="text-sm text-gray-400 mb-4 flex-1">{curso.subtitle}</p>
        
        <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-4">
          <span className="text-xs text-gray-500 font-bold uppercase">{curso.age}</span>
          <span className="text-sm font-black text-[#00C9FF]">{curso.price}</span>
        </div>
      </div>
    </Link>
  );
}
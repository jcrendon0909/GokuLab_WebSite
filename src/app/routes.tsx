import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#050A14] flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-9xl font-black text-[#7C3AED] mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6 text-center">¡Ups! Parece que este curso no existe.</h2>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        La página que buscas puede haber sido movida, o el enlace está roto.
      </p>
      <Link 
        to="/" 
        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform"
      >
        <ArrowLeft size={18} /> Volver al inicio
      </Link>
    </div>
  );
}
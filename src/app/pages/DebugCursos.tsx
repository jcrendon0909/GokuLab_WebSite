import { useState, useEffect } from "react";
import { fetchAllCourses } from "../../Data/courseService";
import { CourseData } from "../../Data/courses";
import { API_URL } from "../../config";
import { Edit3, Save, X, RefreshCw, Lock, Search, CheckCircle, AlertCircle } from "lucide-react";

export function DebugCursos() {
  const [cursos, setCursos] = useState<CourseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [adminToken, setAdminToken] = useState("");
  const [search, setSearch] = useState("");
  const [saveStatus, setSaveStatus] = useState<Record<string, "saving" | "ok" | "error">>({});

  useEffect(() => {
    const savedToken = localStorage.getItem("goku_admin_token") || "";
    setAdminToken(savedToken);
    cargarCursos();
  }, []);

  const cargarCursos = () => {
    setIsLoading(true);
    fetchAllCourses().then(data => {
      setCursos(data);
      setIsLoading(false);
    });
  };

  const handleSaveToken = (token: string) => {
    setAdminToken(token);
    localStorage.setItem("goku_admin_token", token);
  };

  const startEdit = (curso: CourseData) => {
    setEditingId(curso.id);
    setEditData({
      targetAudience: curso.targetAudience || [],
      audiencia_principal: (curso as any).audiencia_principal || "kids",
      orden_kids: (curso as any).orden_kids || "",
      orden_teens: (curso as any).orden_teens || "",
      orden_adults: (curso as any).orden_adults || "",
      orden_company: (curso as any).orden_company || "",
      edad_dirigida: curso.age || "",
      precio_desde: parseInt(curso.price.replace(/[^0-9]/g, "")) || 0,
      imgKey: curso.imgKey || "",
      nombreCurso: curso.title || "",
      descripcionCorta: curso.subtitle || "",
      publicable: true
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleFieldChange = (field: string, value: any) => {
    setEditData((prev: any) => ({ ...prev, [field]: value }));
  };

  const toggleAudience = (aud: string) => {
    const current = editData.targetAudience || [];
    const updated = current.includes(aud) 
      ? current.filter((a: string) => a !== aud)
      : [...current, aud];
    handleFieldChange("targetAudience", updated);
  };

  const saveChanges = async (slug: string) => {
    if (!adminToken) {
      alert("Necesitas ingresar el ADMIN_TOKEN para guardar cambios.");
      return;
    }

    setSaveStatus(prev => ({ ...prev, [slug]: "saving" }));

    const payload: any = { ...editData };
    Object.keys(payload).forEach(k => {
      if (payload[k] === "" || payload[k] === null) delete payload[k];
    });

    try {
      const response = await fetch(`${API_URL}/api/cursos/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Token": adminToken
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Error al guardar");

      setSaveStatus(prev => ({ ...prev, [slug]: "ok" }));
      setTimeout(() => setSaveStatus(prev => ({ ...prev, [slug]: "ok" })), 2000);
      setEditingId(null);
      cargarCursos();
    } catch (error) {
      console.error(error);
      setSaveStatus(prev => ({ ...prev, [slug]: "error" }));
    }
  };

  const filteredCursos = cursos.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div className="pt-32 px-10 text-white bg-[#050A14] min-h-screen">Cargando datos...</div>;

  return (
    /* 🔥 FIX: pt-32 para esquivar el Header fixed */
    <div className="pt-32 pb-10 px-6 md:px-10 text-white bg-[#050A14] min-h-screen font-sans">
      
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black mb-2">🛠️ Panel de Administración de Cursos</h1>
            <p className="text-gray-400">Edita campos básicos. Los cambios se guardan en MongoDB al instante.</p>
          </div>
          {/* Token Input con relative y z-10 para asegurar clics */}
          <div className="relative z-10 flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/20 hover:border-white/40 transition-colors">
            <Lock size={18} className={adminToken ? "text-green-400" : "text-red-400"} />
            <input 
              type="password"
              placeholder="Pega tu ADMIN_TOKEN aquí"
              value={adminToken}
              onChange={(e) => handleSaveToken(e.target.value)}
              className="bg-transparent outline-none text-sm w-64 px-2 text-white placeholder-gray-500"
            />
            <button onClick={cargarCursos} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        <div className="mt-6 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar curso por nombre o ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-[#00C9FF]"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCursos.map((curso) => {
          const imgUrl = `https://media.gokulab.mx/Galery/${curso.imgKey}`;
          const hasError = errorImages[curso.id];
          const isEditing = editingId === curso.id;
          const status = saveStatus[curso.id];

          return (
            <div key={curso.id} className={`border rounded-3xl p-5 flex flex-col gap-4 transition-all ${hasError && !isEditing ? 'bg-red-900/10 border-red-500/30' : 'bg-white/5 border-white/10'}`}>
              
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-400">ID: <span className="font-mono text-white select-all">{curso.id}</span></p>
                  <p className="text-xs text-gray-400">Target: <span className="font-mono text-green-400">{(curso as any).audiencia_principal || "—"}</span></p>
                </div>
                {!isEditing && (
                  <button onClick={() => startEdit(curso)} className="p-2 bg-[#00C9FF]/20 text-[#00C9FF] rounded-lg hover:bg-[#00C9FF]/30 transition-colors">
                    <Edit3 size={16} />
                  </button>
                )}
              </div>

              <div className="relative h-40 bg-black/50 rounded-xl overflow-hidden">
                <img 
                  src={imgUrl} 
                  className="w-full h-full object-cover" 
                  onError={() => setErrorImages(prev => ({ ...prev, [curso.id]: true }))}
                  alt={curso.title}
                />
                {hasError && <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-red-400 font-bold text-sm">❌ 404 - No está en R2</div>}
              </div>

              {!isEditing && (
                <>
                  <h3 className="text-lg font-black">{curso.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{curso.subtitle}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                    <div><span className="text-gray-500">Edad:</span> {curso.age}</div>
                    <div><span className="text-gray-500">Precio:</span> {curso.price}</div>
                    <div><span className="text-gray-500">Nivel:</span> {curso.level}</div>
                    <div><span className="text-gray-500">Modalidad:</span> {curso.modality}</div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {curso.targetAudience.map(a => (
                      <span key={a} className="text-[10px] bg-[#7C3AED]/20 text-[#A78BFA] px-2 py-1 rounded-md uppercase font-bold">{a}</span>
                    ))}
                  </div>
                </>
              )}

              {isEditing && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Nombre del Curso</label>
                    <input type="text" value={editData.nombreCurso} onChange={(e) => handleFieldChange("nombreCurso", e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#00C9FF]" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Descripción Corta</label>
                    <textarea value={editData.descripcionCorta} onChange={(e) => handleFieldChange("descripcionCorta", e.target.value)} rows={2} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#00C9FF]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Edad</label>
                      <input type="text" value={editData.edad_dirigida} onChange={(e) => handleFieldChange("edad_dirigida", e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#00C9FF]" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Precio (MXN)</label>
                      <input type="number" value={editData.precio_desde} onChange={(e) => handleFieldChange("precio_desde", parseInt(e.target.value))} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#00C9FF]" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Nombre del archivo en R2</label>
                    <input type="text" value={editData.imgKey} onChange={(e) => handleFieldChange("imgKey", e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#00C9FF]" />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Target Audience (puede ser múltiple)</label>
                    <div className="flex flex-wrap gap-2">
                      {["kids", "teens", "adults", "company"].map(aud => (
                        <button key={aud} onClick={() => toggleAudience(aud)} className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${editData.targetAudience.includes(aud) ? "bg-[#00C9FF] text-black" : "bg-white/10 text-gray-400"}`}>
                          {aud}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Audiencia Principal (SEO)</label>
                    <select value={editData.audiencia_principal} onChange={(e) => handleFieldChange("audiencia_principal", e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#00C9FF]">
                      <option value="kids">Kids</option>
                      <option value="teens">Teens</option>
                      <option value="adults">Adults</option>
                      <option value="company">Company</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Órdenes por Categoría</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="number" placeholder="Orden Kids" value={editData.orden_kids} onChange={(e) => handleFieldChange("orden_kids", parseInt(e.target.value))} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none" />
                      <input type="number" placeholder="Orden Teens" value={editData.orden_teens} onChange={(e) => handleFieldChange("orden_teens", parseInt(e.target.value))} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none" />
                      <input type="number" placeholder="Orden Adults" value={editData.orden_adults} onChange={(e) => handleFieldChange("orden_adults", parseInt(e.target.value))} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none" />
                      <input type="number" placeholder="Orden Company" value={editData.orden_company} onChange={(e) => handleFieldChange("orden_company", parseInt(e.target.value))} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none" />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button onClick={() => saveChanges(curso.id)} disabled={status === "saving"} className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#10B981] text-white font-bold rounded-lg hover:bg-[#059669] transition-colors disabled:opacity-50">
                      {status === "saving" ? "Guardando..." : status === "ok" ? <><CheckCircle size={16}/> Guardado</> : status === "error" ? <><AlertCircle size={16}/> Error</> : <><Save size={16}/> Guardar</>}
                    </button>
                    <button onClick={cancelEdit} className="px-4 py-2 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
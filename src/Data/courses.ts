// src/Data/courses.ts
export interface CourseData {
  id: string;
  title: string;
  subtitle: string;
  age: string;
  level: string;
  duration: string;
  modality: string;
  price: string;
  emoji: string;
  color: string;
  imgKey: string;
  targetAudience: ("kids" | "teens" | "adults" | "company")[];
  valueProps: { title: string; desc: string; icon: string }[];
  modules: { id: string; title: string; lessons: number; topics: string[] }[];
  techs: string[];

  // 🔥 NUEVOS CAMPOS PARA SEO Y ORDEN
  audiencia_principal?: "kids" | "teens" | "adults" | "company";
  orden_kids?: number;
  orden_teens?: number;
  orden_adults?: number;
  orden_company?: number;
}

export const coursesData: Record<string, CourseData> = {
  // ... (Tu objeto coursesData se queda exactamente igual)
};
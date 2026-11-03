// src/Data/courseService.ts
import { CourseData, coursesData } from './courses';
import { API_URL } from '../config';

export async function fetchCourseById(id: string): Promise<CourseData | null> {
  try {
    // Hacemos la petición a tu backend en Render (Python)
    const response = await fetch(`${API_URL}/api/cursos`);
    if (!response.ok) throw new Error('Error al obtener cursos');
    
    const data = await response.json();
    // Buscamos el curso por su ID o por su slug (por si acaso)
    const cursoEncontrado = data.find((c: any) => c.id === id);
    
    return cursoEncontrado || null;
  } catch (error) {
    console.error("Error conectando a la API de cursos:", error);
    // Fallback local (por si Render está dormido o falla)
    const { getCourseById } = await import('./courses');
    return getCourseById(id);
  }
}
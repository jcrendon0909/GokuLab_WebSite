import os
import json
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient
from groq import Groq
from pypdf import PdfReader

# 1. Cargar variables de entorno
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
GROQ_API_KEY = os.getenv("GROQ_API_KEY_1")

if not MONGO_URI or not GROQ_API_KEY:
    raise ValueError("❌ Faltan MONGO_URI o GROQ_API_KEY_1 en el archivo .env")

# 2. Conexiones
print("🔌 Conectando a MongoDB y Groq...")
cliente_mongo = MongoClient(MONGO_URI)
db = cliente_mongo["chatbot_Goku_lab"]
coleccion_cursos = db["cursos"]
coleccion_conocimiento = db["conocimiento"]
cliente_groq = Groq(api_key=GROQ_API_KEY)

# 3. El Prompt para Groq (El "Traductor" de PDF a JSON)
SYSTEM_PROMPT = """
Eres un experto pedagogo y diseñador instruccional de Gōku Lab. 
Tu tarea es leer el texto de un syllabus de curso y extraer la información en un formato JSON estricto.
Debes enfocarte en el VALOR para los padres y alumnos (soft skills, transformación), no solo en lo técnico.
Si el texto no tiene información clara de módulos, inventa una estructura lógica basada en el contenido.

Devuelve EXCLUSIVAMENTE un objeto JSON con esta estructura exacta (sin markdown, sin texto adicional):
{
  "nombreCurso": "Nombre del curso",
  "descripcionCorta": "Una frase atractiva que resuma el valor (máx 15 palabras)",
  "edad_dirigida": "Ej. 6 a 13 años",
  "nivel": "Básico, Intermedio o Avanzado",
  "duracion": "Ej. 36 lecciones (1 año)",
  "modalidad": ["Presencial", "Online"],
  "precio_desde": 1600,
  "emoji": "Un emoji representativo",
  "color": "Un código hex para el diseño (ej. #1E88E5)",
  "valueProps": [
    { "title": "Nombre de la Soft Skill", "desc": "Beneficio explicado para el padre", "icon": "Emoji" }
  ],
  "modulos": [
    { "id": "m1", "titulo": "Módulo 1: Nombre", "lecciones": 5, "temas": ["Tema 1", "Tema 2"] }
  ],
  "resumen_rag": "Un párrafo de 3 oraciones para el chatbot que explique qué es el curso, a quién va dirigido y qué soft skills desarrolla."
}
"""

def extraer_texto_pdf(ruta_pdf):
    try:
        reader = PdfReader(ruta_pdf)
        texto = ""
        for page in reader.pages:
            texto += page.extract_text() + "\n"
        return texto.strip()
    except Exception as e:
        print(f"❌ Error leyendo {ruta_pdf.name}: {e}")
        return None

def procesar_pdf(ruta_pdf):
    slug = ruta_pdf.stem # Nombre del archivo sin extensión (ej. programacion-visual)
    print(f"\n⏳ Procesando: {ruta_pdf.name} (slug: {slug})...")

    texto = extraer_texto_pdf(ruta_pdf)
    if not texto or len(texto) < 100:
        print(f"⚠️ Saltando {ruta_pdf.name}: El PDF no tiene texto extraíble (posible escaneo).")
        return

    # Llamar a Groq
    try:
        respuesta = cliente_groq.chat.completions.create(
            model="llama-3.3-70b-versatile", # Modelo rápido y potente
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Texto del syllabus:\n\n{texto[:10000]}"} 
            ],
            temperature=0.1,
            response_format={"type": "json_object"}
        )
        
        contenido_json = respuesta.choices[0].message.content
        datos_extraidos = json.loads(contenido_json)
    except Exception as e:
        print(f"❌ Error con Groq en {ruta_pdf.name}: {e}")
        return

    # Armar documento para la colección "cursos" (Para la página web)
    doc_curso = {
        "idCurso": slug.upper().replace("-", ""),
        "slug": slug,
        "nombreCurso": datos_extraidos.get("nombreCurso", ruta_pdf.stem),
        "descripcionCorta": datos_extraidos.get("descripcionCorta", ""),
        "edad_dirigida": datos_extraidos.get("edad_dirigida", ""),
        "nivel": datos_extraidos.get("nivel", ""),
        "duracion": datos_extraidos.get("duracion", ""),
        "modalidad": datos_extraidos.get("modalidad", ["Presencial"]),
        "precio_desde": datos_extraidos.get("precio_desde", 1600),
        "emoji": datos_extraidos.get("emoji", "🚀"),
        "color": datos_extraidos.get("color", "#1E88E5"),
        "imagen_key": slug,
        "is_express": False,
        "valueProps": datos_extraidos.get("valueProps", []),
        "modulos": datos_extraidos.get("modulos", []),
        "publicable": True
    }

    # Armar documento para la colección "conocimiento" (Para el Chatbot)
    doc_conocimiento = {
        "tema": f"curso_{slug.replace('-', '_')}",
        "palabras_clave": [datos_extraidos.get("nombreCurso", "").lower(), slug.replace("-", " ")],
        "contenido": datos_extraidos.get("resumen_rag", ""),
        "publicable": True
    }

    # Guardar en Mongo (upsert=True actualiza si ya existe)
    try:
        coleccion_cursos.update_one({"slug": slug}, {"$set": doc_curso}, upsert=True)
        coleccion_conocimiento.update_one({"tema": doc_conocimiento["tema"]}, {"$set": doc_conocimiento}, upsert=True)
        print(f"✅ Guardado exitoso: {doc_curso['nombreCurso']}")
    except Exception as e:
        print(f"❌ Error guardando en Mongo {ruta_pdf.name}: {e}")

if __name__ == "__main__":
    carpeta = Path("sylabus_pdfs")
    if not carpeta.exists():
        print(f"❌ La carpeta '{carpeta}' no existe. Crea una y pon tus PDFs ahí.")
    else:
        pdfs = list(carpeta.glob("*.pdf"))
        print(f"🔍 Encontrados {len(pdfs)} archivos PDF para procesar.")
        for pdf in pdfs:
            procesar_pdf(pdf)
        print("\n🎉 Proceso de migración terminado. Revisa tu MongoDB Atlas.")
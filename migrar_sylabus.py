import os
import json
import glob
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient
from groq import Groq
from pypdf import PdfReader
import docx # <-- Nueva librería para leer Word

# 1. Cargar variables de entorno
load_dotenv()
# Acepta tanto MONGO_URI como MONGODB_URI
MONGO_URI = os.getenv("MONGO_URI") or os.getenv("MONGODB_URI")
GROQ_API_KEY = os.getenv("GROQ_API_KEY_1")

if not MONGO_URI or not GROQ_API_KEY:
    raise ValueError("❌ Faltan MONGO_URI o GROQ_API_KEY_1 en el archivo .env")

# 2. Conexiones
print("🔌 Conectando a MongoDB y Groq...", flush=True)
cliente_mongo = MongoClient(MONGO_URI)
db = cliente_mongo["chatbot_Goku_lab"]
coleccion_cursos = db["cursos"]
coleccion_conocimiento = db["conocimiento"]
cliente_groq = Groq(api_key=GROQ_API_KEY)

# 3. El Prompt para Groq
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

def extraer_texto(ruta_archivo):
    try:
        texto = ""
        if ruta_archivo.suffix.lower() == '.pdf':
            reader = PdfReader(ruta_archivo)
            for page in reader.pages:
                texto += page.extract_text() + "\n"
        elif ruta_archivo.suffix.lower() == '.docx':
            doc = docx.Document(ruta_archivo)
            for para in doc.paragraphs:
                texto += para.text + "\n"
        return texto.strip()
    except Exception as e:
        print(f"❌ Error leyendo {ruta_archivo.name}: {e}", flush=True)
        return None

def procesar_archivo(ruta_archivo):
    slug = ruta_archivo.stem
    print(f"\n⏳ Procesando: {ruta_archivo.name} (slug: {slug})...", flush=True)

    texto = extraer_texto(ruta_archivo)
    if not texto or len(texto) < 50:
        print(f"⚠️ Saltando {ruta_archivo.name}: No tiene texto suficiente.", flush=True)
        return

    # Llamar a Groq
    try:
        respuesta = cliente_groq.chat.completions.create(
            model="openai/gpt-oss-120b",
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
        print(f"❌ Error con Groq en {ruta_archivo.name}: {e}", flush=True)
        return

    # Armar documento para MongoDB
    doc_curso = {
        "idCurso": slug.upper().replace("-", ""),
        "slug": slug,
        "nombreCurso": datos_extraidos.get("nombreCurso", slug),
        "descripcionCorta": datos_extraidos.get("descripcionCorta", ""),
        "edad_dirigida": datos_extraidos.get("edad_dirigida", ""),
        "nivel": datos_extraidos.get("nivel", ""),
        "duracion": datos_extraidos.get("duracion", ""),
        "modalidad": datos_extraidos.get("modalidad", ["Presencial"]),
        "precio_desde": datos_extraidos.get("precio_desde", 1600),
        "emoji": datos_extraidos.get("emoji", "🚀"),
        "color": datos_extraidos.get("color", "#00C9FF"),
        "imagen_key": slug,
        "videoUrl": "", # Aquí puedes agregar el link del video después en Mongo
        "is_express": False,
        "valueProps": datos_extraidos.get("valueProps", []),
        "modules": datos_extraidos.get("modulos", []), # Ojo: mapeado a 'modules' para React
        "techs": ["Tecnología", "Creatividad"],
        "publicable": True
    }

    doc_conocimiento = {
        "tema": f"curso_{slug.replace('-', '_')}",
        "palabras_clave": [datos_extraidos.get("nombreCurso", "").lower(), slug.replace("-", " ")],
        "contenido": datos_extraidos.get("resumen_rag", ""),
        "publicable": True
    }

    try:
        coleccion_cursos.update_one({"slug": slug}, {"$set": doc_curso}, upsert=True)
        coleccion_conocimiento.update_one({"tema": doc_conocimiento["tema"]}, {"$set": doc_conocimiento}, upsert=True)
        print(f"✅ Guardado exitoso: {doc_curso['nombreCurso']}", flush=True)
    except Exception as e:
        print(f"❌ Error guardando en Mongo {ruta_archivo.name}: {e}", flush=True)

if __name__ == "__main__":
    carpeta = Path("sylabus_pdfs")
    if not carpeta.exists():
        print(f"❌ La carpeta '{carpeta}' no existe.", flush=True)
    else:
        # Busca PDFs y DOCX en la carpeta
        archivos = list(carpeta.glob("*.pdf")) + list(carpeta.glob("*.docx"))
        print(f"🔍 Encontrados {len(archivos)} archivos para procesar.", flush=True)
        for archivo in archivos:
            procesar_archivo(archivo)
        print("\n🎉 Proceso de migración terminado.", flush=True)
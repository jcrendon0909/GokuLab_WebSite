import os
import json
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient
from groq import Groq
from pypdf import PdfReader
import docx

# 1. Cargar variables de entorno
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI") or os.getenv("MONGODB_URI")
GROQ_API_KEY = os.getenv("GROQ_API_KEY_1")

if not MONGO_URI or not GROQ_API_KEY:
    raise ValueError("❌ Faltan MONGO_URI o GROQ_API_KEY_1 en el archivo .env")

# 2. Conexiones
cliente_mongo = MongoClient(MONGO_URI)
db = cliente_mongo["chatbot_Goku_lab"]
coleccion = db["eventos"]
cliente_groq = Groq(api_key=GROQ_API_KEY)

# 3. Lista Curada de Eventos Externos (AI Curation)
# Aquí tú o yo vamos actualizando estos eventos externos.
EVENTOS_EXTERNOS = [
    {
        "titulo": "Campus Party México 2026",
        "descripcion": "El festival de innovación y tecnología más grande de Latinoamérica. Talleres, conferencias, drones y gaming.",
        "fecha": "2026-08-20",
        "hora": "10:00 - 20:00",
        "lugar": "Centro Citibanamex, CDMX",
        "tipo": "externo",
        "audiencia": ["teens", "adults"],
        "link": "https://www.campus-party.com.mx",
        "precio": "Registro gratuito",
        "destacado": True
    },
    {
        "titulo": "Hackatón de IA para Jóvenes (UNAM)",
        "descripcion": "Competencia de 24 horas donde equipos de adolescentes crean soluciones con Inteligencia Artificial.",
        "fecha": "2026-09-15",
        "hora": "9:00 AM",
        "lugar": "Facultad de Ingeniería, UNAM",
        "tipo": "externo",
        "audiencia": ["teens"],
        "link": "https://www.unam.mx",
        "precio": "Gratis (previa selección)",
        "destacado": False
    },
    {
        "titulo": "Feria de Ciencia y Robótica para Niños",
        "descripcion": "Exhibición de robots, talleres de programación con Scratch y experimentos científicos para los más pequeños.",
        "fecha": "2026-06-05",
        "hora": "11:00 - 17:00",
        "lugar": "Universum, Museo de las Ciencias",
        "tipo": "externo",
        "audiencia": ["kids", "parents"],
        "link": "https://www.universum.unam.mx",
        "precio": "Entrada al museo",
        "destacado": False
    },
    {
        "titulo": "PyDay CDMX (Comunidad Python)",
        "descripcion": "Conferencias y talleres gratuitos sobre Python, Ciencia de Datos y desarrollo web para profesionales.",
        "fecha": "2026-10-10",
        "hora": "9:00 - 18:00",
        "lugar": "Tec de Monterrey, Campus CDMX",
        "tipo": "externo",
        "audiencia": ["adults"],
        "link": "https://www.python.org",
        "precio": "Gratis",
        "destacado": False
    }
]

# 4. El Prompt para Groq (Extraer eventos internos del PDF)
SYSTEM_PROMPT = """
Eres un asistente de eventos para Gōku Lab. Tu tarea es leer el texto de un documento (PDF/Word) 
que contiene eventos internos (campamentos, talleres, webinars) y extraerlos en un formato JSON estricto.

Devuelve EXCLUSIVAMENTE un arreglo JSON (una lista) con este formato (sin markdown extra, sin texto adicional):
[
  {
    "titulo": "Nombre del evento",
    "descripcion": "Una descripción atractiva de máximo 2 oraciones.",
    "fecha": "YYYY-MM-DD (si no está, estima una fecha lógica)",
    "hora": "Ej. 10:00 AM - 2:00 PM",
    "lugar": "Ej. Instalaciones GōkuLab o Virtual",
    "tipo": "interno",
    "audiencia": ["kids", "teens", "adults", "parents"], // Elige las que apliquen
    "link": "URL de registro (si no hay, pon un link de WhatsApp)",
    "precio": "Ej. $1500, Gratis, etc.",
    "destacado": true // Pon true si parece un evento masivo o importante
  }
]
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
        print(f"❌ Error leyendo {ruta_archivo.name}: {e}")
        return None

def procesar_pdf(ruta_pdf):
    print(f"\n⏳ Procesando eventos internos desde: {ruta_pdf.name}...")

    texto = extraer_texto(ruta_pdf)
    if not texto or len(texto) < 50:
        print(f"⚠️ Saltando {ruta_pdf.name}: No tiene texto suficiente.")
        return []

    try:
        respuesta = cliente_groq.chat.completions.create(
            model="openai/gpt-oss-120b", # Usando el modelo que ya te funciona
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Texto del documento:\n\n{texto[:10000]}"} 
            ],
            temperature=0.1,
            response_format={"type": "json_object"}
        )
        
        contenido_json = respuesta.choices[0].message.content
        datos_extraidos = json.loads(contenido_json)
        
        # Groq puede devolver un objeto o un arreglo. Lo normalizamos.
        if isinstance(datos_extraidos, dict) and "eventos" in datos_extraidos:
            return datos_extraidos["eventos"]
        elif isinstance(datos_extraidos, list):
            return datos_extraidos
        else:
            return [datos_extraidos]
            
    except Exception as e:
        print(f"❌ Error con Groq: {e}")
        return []

if __name__ == "__main__":
    # Buscamos cualquier archivo que se llame eventos_internos
    carpeta = Path(".")
    archivos_eventos = list(carpeta.glob("*eventos*.pdf")) + list(carpeta.glob("*eventos*.docx"))

    if not archivos_eventos:
        print("⚠️ No se encontró ningún PDF o Word que contenga la palabra 'eventos'. Usando solo externos.")
        eventos_internos = []
    else:
        eventos_internos = procesar_pdf(archivos_eventos[0])

    print(f"✅ Extraídos {len(eventos_internos)} eventos internos con IA.")
    print(f"✅ Cargados {len(EVENTOS_EXTERNOS)} eventos externos curados.")

    # Unimos ambas listas
    todos_los_eventos = eventos_internos + EVENTOS_EXTERNOS

    # Limpiamos la colección actual (opcional, para no duplicar)
    coleccion.delete_many({})
    
    # Insertamos en Mongo
    if todos_los_eventos:
        coleccion.insert_many(todos_los_eventos)
        print(f"\n🎉 ¡Éxito! {len(todos_los_eventos)} eventos guardados en MongoDB.")
    else:
        print("\n❌ No hay eventos para guardar.")
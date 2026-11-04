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
print("🔌 Conectando a MongoDB...")
try:
    cliente_mongo = MongoClient(MONGO_URI)
    db = cliente_mongo["chatbot_Goku_lab"]
    coleccion = db["eventos"]
    # Prueba de conexión
    cliente_mongo.server_info()
    print("✅ Conexión a MongoDB exitosa.")
except Exception as e:
    print(f"❌ Error conectando a MongoDB: {e}")
    exit(1)

print("🔌 Conectando a Groq...")
cliente_groq = Groq(api_key=GROQ_API_KEY)

# 3. Lista Curada de Eventos Externos
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
        "titulo": "PyDay CDMX (Comunidad Python)",
        "descripcion": "Conferencias y talleres gratuitos sobre Python, Ciencia de Datos y desarrollo web.",
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
    print(f"\n⏳ Extrayendo eventos internos de: {ruta_pdf.name}...")
    texto = extraer_texto(ruta_pdf)
    if not texto or len(texto) < 50:
        print(f"⚠️ El archivo no tiene texto suficiente.")
        return []

    SYSTEM_PROMPT = """
    Eres un asistente. Extrae los eventos del texto y devuélvelos en JSON estricto.
    Formato JSON (lista): [{"titulo": "...", "descripcion": "...", "fecha": "YYYY-MM-DD", "hora": "...", "lugar": "...", "tipo": "interno", "audiencia": ["kids"], "link": "https://wa.me/5612668168", "precio": "Gratis", "destacado": false}]
    """
    try:
        respuesta = cliente_groq.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[{"role": "system", "content": SYSTEM_PROMPT}, {"role": "user", "content": texto[:10000]}],
            temperature=0.1,
            response_format={"type": "json_object"}
        )
        datos = json.loads(respuesta.choices[0].message.content)
        return datos.get("eventos", []) if isinstance(datos, dict) else datos
    except Exception as e:
        print(f"❌ Error con Groq: {e}")
        return []

if __name__ == "__main__":
    carpeta = Path(".")
    archivos_eventos = list(carpeta.glob("*eventos*.pdf")) + list(carpeta.glob("*eventos*.docx"))

    eventos_internos = []
    if archivos_eventos:
        eventos_internos = procesar_pdf(archivos_eventos[0])
    else:
        print("⚠️ No se encontró PDF/Word con 'eventos' en el nombre. Solo se subirán los externos.")

    todos_los_eventos = eventos_internos + EVENTOS_EXTERNOS

    print(f"\n📦 Total de eventos a subir: {len(todos_los_eventos)}")
    
    # Limpiamos e insertamos
    if todos_los_eventos:
        coleccion.delete_many({}) # Borra lo viejo para no duplicar
        resultado = coleccion.insert_many(todos_los_eventos)
        print(f"🎉 ¡Éxito! Se insertaron {len(resultado.inserted_ids)} eventos en la colección 'eventos'.")
    else:
        print("❌ No hay eventos para insertar.")
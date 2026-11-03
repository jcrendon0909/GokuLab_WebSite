import os
from dotenv import load_dotenv
from pymongo import MongoClient
from groq import Groq

load_dotenv()

print("1. Verificando variables de entorno...")
mongo_uri = os.getenv("MONGO_URI")
groq_key = os.getenv("GROQ_API_KEY_1")

if not mongo_uri or not groq_key:
    print("❌ ERROR: No se encontraron MONGO_URI o GROQ_API_KEY_1 en el archivo .env")
    exit()

print(f"   MONGO_URI: {mongo_uri[:20]}... (oculto por seguridad)")
print(f"   GROQ_KEY:  {groq_key[:10]}... (oculto por seguridad)")

print("\n2. Probando conexión a MongoDB (máx 5 segundos)...")
try:
    # serverSelectionTimeoutMS=5000 evita que se quede colgado
    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
    client.server_info() 
    print("✅ ¡MongoDB conectado exitosamente!")
except Exception as e:
    print(f"❌ ERROR conectando a MongoDB: {e}")
    print("👉 Revisa que tu IP esté agregada en MongoDB Atlas (Network Access).")

print("\n3. Probando conexión a Groq (máx 5 segundos)...")
try:
    client_groq = Groq(api_key=groq_key)
    client_groq.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": "Di hola"}],
        max_tokens=5
    )
    print("✅ ¡Groq conectado exitosamente!")
except Exception as e:
    print(f"❌ ERROR conectando a Groq: {e}")
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI") or os.getenv("MONGODB_URI")

if not MONGO_URI:
    raise ValueError("❌ Falta MONGO_URI en el archivo .env")

cliente = MongoClient(MONGO_URI)
db = cliente["chatbot_Goku_lab"]
coleccion = db["cursos"]

# Diccionario con la audiencia y la foto exacta para cada curso
MAPEO_CURSOS = {
    # KIDS
    "programacion-visual": {"audiencia": ["kids", "teens"], "img": "programacion-visual.jpg"},
    "robotica-principiantes": {"audiencia": ["kids"], "img": "robotica-principiantes.jpg"},
    "taller-creatividad": {"audiencia": ["kids"], "img": "taller-creatividad.jpg"},
    "regularizacion-matematicas": {"audiencia": ["kids"], "img": "regularizacion-matematicas.jpg"},
    "caballero-del-codigo": {"audiencia": ["kids"], "img": "caballero-del-codigo.jpg"},
    "diseno-grafico-ninos": {"audiencia": ["kids"], "img": "diseno-grafico-ninos.jpg"},
    "programacion-visual-avanzada": {"audiencia": ["kids"], "img": "programacion-visual-avanzada.jpg"},
    "diseno-videojuegos-minecraft": {"audiencia": ["kids"], "img": "diseno-videojuegos-minecraft.jpg"},

    # TEENS
    "diseno-videojuegos-roblox": {"audiencia": ["teens"], "img": "diseno-videojuegos-roblox.jpg"},
    "diseno-videojuejos-lua-roblox": {"audiencia": ["teens"], "img": "diseno-videojuejos-lua-roblox.jpg"},
    "diseno-videojuegos-unity": {"audiencia": ["teens"], "img": "diseno-videojuegos-unity.jpg"},
    "python-pro": {"audiencia": ["teens"], "img": "python-pro.jpg"},
    "python-start-avanzado": {"audiencia": ["teens"], "img": "python-start-avanzado.jpg"},
    "diseno-2d-y-3d": {"audiencia": ["teens"], "img": "diseno-2d-y-3d.jpg"},
    "taller_impresion-3D": {"audiencia": ["teens"], "img": "taller_impresion-3D.jpg"},
    "video-blogging": {"audiencia": ["teens"], "img": "video-blogging.jpg"},
    "taller-prompt-engeneering": {"audiencia": ["teens", "adults"], "img": "taller-prompt-engeneering.jpg"},

    # ADULTS / COMPANY
    "inteligencia-artificial-adultos": {"audiencia": ["adults"], "img": "inteligencia-artificial-adultos.jpg"},
    "alfabetizacion-digital": {"audiencia": ["adults"], "img": "alfabetizacion-digital.jpg"},
    "adminitracion-de-proyectos": {"audiencia": ["adults"], "img": "adminitracion-de-proyectos.jpg"},
    "taller-gobernanza-IA-ciberseguridad": {"audiencia": ["company", "adults"], "img": "taller-gobernanza-IA-ciberseguridad.jpg"},
    "taller-resolucion-de-conflictos": {"audiencia": ["company", "adults"], "img": "taller-resolucion-de-conflictos.jpg"},
    "taller-design-thinking": {"audiencia": ["company", "adults"], "img": "taller-design-thinking.jpg"}
}

print("🔄 Iniciando actualización de cursos en MongoDB...")

for curso in coleccion.find():
    curso_id = curso.get("id")
    
    if curso_id in MAPEO_CURSOS:
        info = MAPEO_CURSOS[curso_id]
        coleccion.update_one(
            {"_id": curso["_id"]},
            {
                "$set": {
                    "targetAudience": info["audiencia"],
                    "imgKey": info["img"], # Forzamos que la imagen se llame como el ID pero con .jpg
                    "publicable": True
                }
            }
        )
        print(f"✅ Actualizado: {curso_id} -> Audiencia: {info['audiencia']} | Foto: {info['img']}")
    else:
        print(f"⚠️ Curso no mapeado: {curso_id} (se requiere agregar manualmente al script)")

print("\n🎉 Proceso terminado. Todos los cursos han sido re-categorizados.")
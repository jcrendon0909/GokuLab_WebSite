import os
from dotenv import load_dotenv
from pymongo import MongoClient

# 1. Cargar variables de entorno (lee tu archivo .env)
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI") or os.getenv("MONGODB_URI")

if not MONGO_URI:
    raise ValueError("❌ Falta MONGO_URI en el archivo .env")

# 2. Conexión a la base de datos
cliente = MongoClient(MONGO_URI)
db = cliente["chatbot_Goku_lab"]
coleccion = db["cursos"]

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
    "taller_impresion-3d": {"audiencia": ["teens"], "img": "taller_impresion-3d.jpg"},
    "video-blogging": {"audiencia": ["teens"], "img": "video-blogging.jpg"},
    "taller-prompt-engeneering": {"audiencia": ["teens", "adults"], "img": "taller-prompt-engeneering.jpg"},
    # ADULTS / COMPANY
    "inteligencia-artificial-adultos": {"audiencia": ["adults"], "img": "inteligencia-artificial-adultos.jpg"},
    "alfabetizacion-digital": {"audiencia": ["adults"], "img": "alfabetizacion-digital.jpg"},
    "adminitracion-de-proyectos": {"audiencia": ["adults"], "img": "adminitracion-de-proyectos.jpg"},
    "taller-gobernanza-ia-ciberseguridad": {"audiencia": ["company", "adults"], "img": "taller-gobernanza-ia-ciberseguridad.jpg"},
    "taller-resolucion-de-conflictos": {"audiencia": ["company", "adults"], "img": "taller-resolucion-de-conflictos.jpg"},
    "taller-design-thinking": {"audiencia": ["company", "adults"], "img": "taller-design-thinking.jpg"}
    }
    

print("🔄 Iniciando actualización de cursos en MongoDB...\n")

# Contadores para el reporte
actualizados = 0
no_mapeados = 0

# 4. Iterar y actualizar cada curso
for curso in coleccion.find():
    # 🔥 LA MAGIA: Buscamos el ID en cualquier campo donde se pueda encontrar
    curso_id = curso.get("id") or curso.get("slug") or curso.get("idCurso")
    
    # Si el ID guardado tiene mayúsculas (como en idCurso), lo pasamos a minúsculas para que haga match
    if curso_id:
        curso_id = str(curso_id).lower()

    if curso_id in MAPEO_CURSOS:
        info = MAPEO_CURSOS[curso_id]
        coleccion.update_one(
            {"_id": curso["_id"]},
            {
                "$set": {
                    "targetAudience": info["audiencia"],
                    "imgKey": info["img"],
                    "publicable": True
                }
            }
        )
        print(f"✅ Actualizado: {curso_id} -> Audiencia: {info['audiencia']} | Foto: {info['img']}")
        actualizados += 1
    else:
        print(f"⚠️ Curso no mapeado. ID detectado: '{curso_id}' (Revisa si es un curso nuevo)")
        no_mapeados += 1

print(f"\n🎉 Proceso terminado. {actualizados} cursos actualizados, {no_mapeados} no mapeados.")
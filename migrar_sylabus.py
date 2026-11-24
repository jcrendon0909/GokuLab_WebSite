#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GōkuLab · Migrador incremental de sílabus (PDF/DOCX) -> MongoDB

Colecciones destino:
    - chatbot_Goku_lab.cursos        (datos para React)
    - chatbot_Goku_lab.conocimiento  (datos para el RAG del chatbot)

Instalación:
    pip install pymongo groq python-dotenv pypdf python-docx

.env requerido:
    MONGO_URI  o  MONGODB_URI
    GROQ_API_KEY_1  (o GROQ_API_KEY)
    GROQ_MODEL       (opcional, default: openai/gpt-oss-120b)

Uso:
    python migrar_sylabus.py                  # incremental
    python migrar_sylabus.py --dry-run        # simula sin escribir
    python migrar_sylabus.py --force          # reprocesa todo (usa cache si existe)
    python migrar_sylabus.py --no-cache       # ignora cache (gasta tokens Groq)
    python migrar_sylabus.py --file x.pdf     # solo un archivo
    python migrar_sylabus.py --limit 3        # máximo N archivos
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
import time
import unicodedata
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

# --------------------------------------------------------------------------- #
# Dependencias
# --------------------------------------------------------------------------- #
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

try:
    from pymongo import MongoClient
    from pymongo.collection import Collection
    from pymongo.errors import PyMongoError
except ImportError:
    sys.exit("❌ Falta pymongo: pip install pymongo")

try:
    from groq import Groq
    from groq import APIConnectionError, APIStatusError, APITimeoutError, RateLimitError
except ImportError:
    sys.exit("❌ Falta groq: pip install groq")


# --------------------------------------------------------------------------- #
# Consola con color
# --------------------------------------------------------------------------- #
class C:
    RESET = "\033[0m"
    BOLD = "\033[1m"
    GREY = "\033[90m"
    RED = "\033[91m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    BLUE = "\033[94m"
    MAGENTA = "\033[95m"
    CYAN = "\033[96m"


def _supports_color() -> bool:
    if os.getenv("NO_COLOR"):
        return False
    if os.name == "nt":
        os.system("")
        return True
    return sys.stdout.isatty()


USE_COLOR = _supports_color()


def paint(text: str, color: str) -> str:
    return f"{color}{text}{C.RESET}" if USE_COLOR else text


def log(msg: str, color: str = "", icon: str = "·") -> None:
    ts = datetime.now().strftime("%H:%M:%S")
    print(f"{paint(ts, C.GREY)} {icon} {paint(msg, color) if color else msg}", flush=True)


def log_ok(msg: str) -> None:   log(msg, C.GREEN, "✅")
def log_skip(msg: str) -> None: log(msg, C.YELLOW, "⏭️ ")
def log_warn(msg: str) -> None: log(msg, C.YELLOW, "⚠️ ")
def log_err(msg: str) -> None:  log(msg, C.RED, "❌")
def log_info(msg: str) -> None: log(msg, C.CYAN, "ℹ️ ")
def log_ai(msg: str) -> None:   log(msg, C.MAGENTA, "🤖")
def log_db(msg: str) -> None:   log(msg, C.BLUE, "🗄️ ")


# --------------------------------------------------------------------------- #
# Constantes
# --------------------------------------------------------------------------- #
PROMPT_VERSION = "v2-audiencias"
DEFAULT_MODEL = "openai/gpt-oss-120b"
DB_NAME = "chatbot_Goku_lab"
COL_CURSOS = "cursos"
COL_CONOCIMIENTO = "conocimiento"

PROMPT_CHAR_LIMIT = 12_000
AUDIENCIAS_VALIDAS = ("kids", "teens", "adults", "company")

ORDEN_FIELD_BY_AUD = {
    "kids": "orden_kids",
    "teens": "orden_teens",
    "adults": "orden_adults",
    "company": "orden_company",
}

DEFAULT_COLOR = "#00C9FF"
DEFAULT_EMOJI = "🚀"
DEFAULT_TECHS = ["Tecnología", "Creatividad"]
DEFAULT_PRICE = 1600


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #
def utcnow() -> datetime:
    return datetime.now(timezone.utc)


def md5_of_file(path: Path) -> str:
    h = hashlib.md5()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", str(value))
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "curso-sin-nombre"


def as_text(v: Any, default: str = "") -> str:
    if v is None:
        return default
    if isinstance(v, (list, tuple)):
        v = " ".join(str(x) for x in v)
    return str(v).strip() or default


def as_str_list(v: Any) -> List[str]:
    if v is None:
        return []
    if isinstance(v, str):
        return [p.strip() for p in re.split(r"[,;/|]", v) if p.strip()]
    if isinstance(v, (list, tuple, set)):
        out: List[str] = []
        for item in v:
            if isinstance(item, dict):
                item = item.get("nombre") or item.get("title") or ""
            item = as_text(item)
            if item:
                out.append(item)
        return out
    return []


def as_number(v: Any, default: float = 0) -> float:
    if isinstance(v, bool):
        return default
    if isinstance(v, (int, float)):
        return v
    if isinstance(v, str):
        cleaned = re.sub(r"[^\d.,-]", "", v).replace(",", ".")
        try:
            return float(cleaned) if cleaned else default
        except ValueError:
            return default
    return default


def as_int(v: Any, default: int = 0) -> int:
    try:
        return int(round(as_number(v, default)))
    except (TypeError, ValueError):
        return default


def as_bool(v: Any, default: bool = True) -> bool:
    if isinstance(v, bool):
        return v
    if isinstance(v, str):
        return v.strip().lower() in ("true", "1", "si", "sí", "yes", "verdadero")
    if isinstance(v, (int, float)):
        return bool(v)
    return default


def normalize_audiencia(v: Any) -> Optional[str]:
    text = as_text(v).lower()
    if not text:
        return None
    mapping = {
        "kids": ("kid", "niñ", "nin", "child", "infantil", "junior", "peques"),
        "teens": ("teen", "adolescen", "puber", "juvenil", "teenager"),
        "adults": ("adult", "mayor", "profesional", "grown"),
        "company": ("compan", "empresa", "corporativ", "business", "b2b", "equipo"),
    }
    for aud, needles in mapping.items():
        if any(n in text for n in needles):
            return aud
    return None


def infer_audiencia_from_edad(edad: str) -> Optional[str]:
    if not edad:
        return None
    nums = [int(n) for n in re.findall(r"\d{1,2}", edad)]
    if not nums:
        return normalize_audiencia(edad)
    low, high = min(nums), max(nums)
    if high <= 12:
        return "kids"
    if low >= 13 and high <= 17:
        return "teens"
    if low >= 18:
        return "adults"
    if high <= 17:
        return "kids" if low <= 9 else "teens"
    return "adults"


def normalize_modules(v: Any) -> List[Dict[str, Any]]:
    out: List[Dict[str, Any]] = []
    if not isinstance(v, list):
        return out
    for i, item in enumerate(v, start=1):
        if isinstance(item, str):
            item = {"titulo": item}
        if not isinstance(item, dict):
            continue
        out.append({
            "id": as_text(item.get("id"), f"m{i}"),
            "titulo": as_text(item.get("titulo") or item.get("title"), f"Módulo {i}"),
            "lecciones": as_int(item.get("lecciones") or item.get("lessons"), 1),
            "temas": as_str_list(item.get("temas") or item.get("topics")),
        })
    return out


def normalize_value_props(v: Any) -> List[Dict[str, str]]:
    out: List[Dict[str, str]] = []
    if not isinstance(v, list):
        return out
    for item in v:
        if isinstance(item, str):
            item = {"title": item, "desc": "", "icon": "✨"}
        if not isinstance(item, dict):
            continue
        title = as_text(item.get("title") or item.get("titulo"))
        if not title:
            continue
        out.append({
            "title": title,
            "desc": as_text(item.get("desc") or item.get("descripcion")),
            "icon": as_text(item.get("icon") or item.get("emoji"), "✨"),
        })
    return out


# --------------------------------------------------------------------------- #
# Extracción de texto
# --------------------------------------------------------------------------- #
def extract_pdf(path: Path) -> str:
    from pypdf import PdfReader
    reader = PdfReader(str(path))
    return "\n".join((p.extract_text() or "") for p in reader.pages)


def extract_docx(path: Path) -> str:
    import docx
    doc = docx.Document(str(path))
    parts = [p.text for p in doc.paragraphs if p.text.strip()]
    for table in doc.tables:
        for row in table.rows:
            cells = [c.text.strip() for c in row.cells if c.text.strip()]
            if cells:
                parts.append(" | ".join(cells))
    return "\n".join(parts)


def extract_text(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix == ".pdf":
        raw = extract_pdf(path)
    elif suffix == ".docx":
        raw = extract_docx(path)
    elif suffix in (".txt", ".md"):
        raw = path.read_text(encoding="utf-8", errors="ignore")
    else:
        raise RuntimeError(f"Extensión no soportada: {suffix}")
    raw = re.sub(r"[ \t]+", " ", raw)
    raw = re.sub(r"\n{3,}", "\n\n", raw)
    return raw.strip()


# --------------------------------------------------------------------------- #
# Prompt de Groq
# --------------------------------------------------------------------------- #
SYSTEM_PROMPT = f"""Eres un experto pedagogo y diseñador instruccional de Gōku Lab.
Lees sílabus de cursos y extraes información en JSON estricto.
Enfócate en el VALOR para padres/alumnos (soft skills, transformación), no solo en lo técnico.

Devuelve EXCLUSIVAMENTE un objeto JSON válido (sin markdown, sin explicaciones) con esta forma:
{{
  "nombreCurso": "string",
  "descripcionCorta": "frase atractiva, máx. 15 palabras",
  "edad_dirigida": "ej. '6 a 13 años'",
  "nivel": "Básico | Intermedio | Avanzado",
  "duracion": "ej. '36 lecciones (1 año)'",
  "modalidad": ["Presencial", "Online", "Híbrido"],
  "precio_desde": 1600,
  "emoji": "un solo emoji representativo",
  "color": "#HEX recomendado",
  "techs": ["máx. 5 etiquetas técnicas/creativas"],
  "targetAudience": ["kids", "teens", "adults", "company"],
  "audiencia_principal": "kids | teens | adults | company",
  "publicable": true,
  "valueProps": [
    {{"title": "Soft skill", "desc": "Beneficio para el padre", "icon": "emoji"}}
  ],
  "modulos": [
    {{"id": "m1", "titulo": "Módulo 1: nombre", "lecciones": 5, "temas": ["Tema 1"]}}
  ],
  "resumen_rag": "3 oraciones para el chatbot: qué es, a quién va dirigido, qué soft skills desarrolla"
}}

REGLAS OBLIGATORIAS:
1. "audiencia_principal": SOLO una de: "kids", "teens", "adults", "company".
   - kids ≈ 5-12 años; teens ≈ 13-17; adults ≈ 18+; company = empresas, equipos, B2B, corporativo.
   - Dedúcela del texto y las edades. NUNCA la dejes vacía.
2. "targetAudience": array con TODAS las audiencias compatibles. Debe incluir siempre la principal.
3. "techs": etiquetas cortas (ej. "Robótica", "Python", "Arte Digital").
4. "valueProps": entre 3 y 4, cada uno con emoji en "icon".
5. "modulos": respeta los del sílabus; si no los detalla, inventa una estructura lógica (mínimo 3).
6. "resumen_rag": exactamente 3 oraciones claras.
7. No contradigas el documento. No inventes precios si no aparecen (usa 1600 como placeholder).
"""


def build_user_prompt(text: str, filename: str) -> str:
    return (
        f"Archivo: {filename}\n"
        f"--- INICIO DEL SÍLABUS ---\n{text[:PROMPT_CHAR_LIMIT]}\n--- FIN DEL SÍLABUS ---\n"
        "Devuelve únicamente el JSON."
    )


# --------------------------------------------------------------------------- #
# Groq + cache
# --------------------------------------------------------------------------- #
def parse_json_loose(content: str) -> Dict[str, Any]:
    content = content.strip()
    if content.startswith("```"):
        content = re.sub(r"^```[a-zA-Z]*\s*", "", content)
        content = re.sub(r"\s*```$", "", content)
    try:
        data = json.loads(content)
    except json.JSONDecodeError:
        i, j = content.find("{"), content.rfind("}")
        if i == -1 or j <= i:
            raise
        data = json.loads(content[i:j + 1])
    if not isinstance(data, dict):
        raise ValueError("La respuesta de Groq no es un objeto JSON")
    return data


def call_groq(client: Groq, model: str, text: str, filename: str) -> Dict[str, Any]:
    last_err: Optional[Exception] = None
    for attempt in range(1, 4):
        try:
            resp = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": build_user_prompt(text, filename)},
                ],
                temperature=0.1,
                max_tokens=4096,
                response_format={"type": "json_object"},
            )
            return parse_json_loose(resp.choices[0].message.content or "{}")
        except (RateLimitError, APIConnectionError, APITimeoutError, APIStatusError) as exc:
            last_err = exc
            wait = 2 ** attempt
            log_warn(f"Groq falló (intento {attempt}/3): {exc}. Reintento en {wait}s…")
            time.sleep(wait)
        except (json.JSONDecodeError, ValueError) as exc:
            last_err = exc
            log_warn(f"JSON inválido (intento {attempt}/3): {exc}")
            time.sleep(2 ** attempt)
    raise RuntimeError(f"Groq no respondió correctamente: {last_err}")


def cache_file(cfg: "Config", digest: str) -> Path:
    return cfg.cache_dir / f"{digest}_{PROMPT_VERSION}_{cfg.groq_model.replace('/', '_')}.json"


def read_cache(cfg: "Config", digest: str) -> Optional[Dict[str, Any]]:
    if not cfg.use_cache:
        return None
    path = cache_file(cfg, digest)
    if not path.exists():
        return None
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return None
    if payload.get("prompt_version") != PROMPT_VERSION:
        return None
    if payload.get("model") != cfg.groq_model:
        return None
    return payload.get("data")


def write_cache(cfg: "Config", digest: str, data: Dict[str, Any]) -> None:
    if not cfg.use_cache:
        return
    try:
        cfg.cache_dir.mkdir(parents=True, exist_ok=True)
        cache_file(cfg, digest).write_text(
            json.dumps(
                {"prompt_version": PROMPT_VERSION, "model": cfg.groq_model, "data": data},
                ensure_ascii=False, indent=2,
            ),
            encoding="utf-8",
        )
    except OSError as exc:
        log_warn(f"No se pudo escribir cache para {digest[:8]}: {exc}")


# --------------------------------------------------------------------------- #
# Config
# --------------------------------------------------------------------------- #
class Config:
    def __init__(self, args: argparse.Namespace) -> None:
        self.mongo_uri: str = os.getenv("MONGO_URI") or os.getenv("MONGODB_URI") or ""
        self.groq_key: str = os.getenv("GROQ_API_KEY_1") or os.getenv("GROQ_API_KEY") or ""
        self.groq_model: str = os.getenv("GROQ_MODEL", DEFAULT_MODEL)
        self.sylabus_dir = Path(args.folder or os.getenv("SYLABUS_DIR", "sylabus_pdfs"))
        self.cache_dir = Path(os.getenv("SYLABUS_CACHE_DIR", ".cache_sylabus"))

        self.dry_run: bool = args.dry_run
        self.force: bool = args.force
        self.use_cache: bool = not args.no_cache
        self.limit: Optional[int] = args.limit
        self.only_file: Optional[str] = args.file


# --------------------------------------------------------------------------- #
# Mongo (una sola conexión, dos colecciones)
# --------------------------------------------------------------------------- #
def get_collections(cfg: Config) -> Tuple[MongoClient, Collection, Collection]:
    if not cfg.mongo_uri:
        sys.exit("❌ Falta MONGO_URI o MONGODB_URI en el .env")
    client = MongoClient(cfg.mongo_uri, serverSelectionTimeoutMS=8000)
    client.admin.command("ping")
    db = client[DB_NAME]
    cursos = db[COL_CURSOS]
    conocimiento = db[COL_CONOCIMIENTO]

    try:
        cursos.create_index([("slug", 1)], unique=True, name="uniq_slug")
    except PyMongoError as exc:
        log_warn(f"No se pudo crear índice único de slug: {exc}")
    cursos.create_index([("_meta.hash", 1)], name="idx_meta_hash")
    cursos.create_index([("_meta.file_name", 1)], name="idx_meta_file")
    conocimiento.create_index([("tema", 1)], unique=True, name="uniq_tema")
    conocimiento.create_index([("_meta.hash", 1)], name="idx_cono_meta_hash")
    return client, cursos, conocimiento


def find_existing_course(col: Collection, slug: str, digest: str, filename: str) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    doc = col.find_one({"slug": slug})
    if doc:
        return doc, "slug"
    doc = col.find_one({"_meta.hash": digest})
    if doc:
        return doc, "hash"
    doc = col.find_one({"_meta.file_name": filename})
    if doc:
        return doc, "file_name"
    return None, None


def find_existing_conocimiento(col: Collection, tema: str, old_tema: Optional[str]) -> Optional[Dict[str, Any]]:
    if old_tema and old_tema != tema:
        doc = col.find_one({"tema": old_tema})
        if doc:
            return doc
    return col.find_one({"tema": tema})


def next_order(col: Collection, field: str) -> int:
    doc = col.find_one({field: {"$ne": None}}, sort=[(field, -1)])
    return as_int(doc.get(field), 0) + 1 if doc else 1


# --------------------------------------------------------------------------- #
# Construcción de documentos
# --------------------------------------------------------------------------- #
def build_ai_fields(ai: Dict[str, Any]) -> Dict[str, Any]:
    edad = as_text(ai.get("edad_dirigida"))

    audiencia = normalize_audiencia(ai.get("audiencia_principal"))
    if not audiencia:
        target_hint = as_str_list(ai.get("targetAudience"))
        for t in target_hint:
            a = normalize_audiencia(t)
            if a:
                audiencia = a
                break
    if not audiencia:
        audiencia = infer_audiencia_from_edad(edad) or "kids"

    target: List[str] = []
    for t in as_str_list(ai.get("targetAudience")):
        a = normalize_audiencia(t)
        if a and a not in target:
            target.append(a)
    if audiencia not in target:
        target.insert(0, audiencia)

    # mapear 'modulos' (AI) -> 'modules' (Mongo)
    modulos = ai.get("modulos") if "modulos" in ai else ai.get("modules")

    return {
        "nombreCurso": as_text(ai.get("nombreCurso")),
        "descripcionCorta": as_text(ai.get("descripcionCorta"))[:200],
        "edad_dirigida": edad,
        "nivel": as_text(ai.get("nivel"), "Básico"),
        "duracion": as_text(ai.get("duracion"), "Por definir"),
        "modalidad": as_str_list(ai.get("modalidad")) or ["Presencial"],
        "valueProps": normalize_value_props(ai.get("valueProps")),
        "modules": normalize_modules(modulos),
        "targetAudience": target,
        "audiencia_principal": audiencia,
    }


def build_deterministic_fields(slug: str) -> Dict[str, Any]:
    id_curso = re.sub(r"[^A-Z0-9]", "", slug.upper())
    img_key = f"{slug}.jpg"
    return {
        "id": slug,
        "slug": slug,
        "idCurso": id_curso,
        "imgKey": img_key,
        "imagen_key": img_key,
    }


def build_curated_defaults(ai: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "precio_desde": as_number(ai.get("precio_desde"), DEFAULT_PRICE),
        "publicable": as_bool(ai.get("publicable"), True),
        "videoUrl": "",
        "color": as_text(ai.get("color")) or DEFAULT_COLOR,
        "emoji": as_text(ai.get("emoji")) or DEFAULT_EMOJI,
        "is_express": False,
        "techs": as_str_list(ai.get("techs")) or DEFAULT_TECHS,
    }


def build_meta(path: Path, digest: str, model: str) -> Dict[str, Any]:
    st = path.stat()
    return {
        "file_name": path.name,
        "hash": digest,
        "size_bytes": st.st_size,
        "mtime": datetime.fromtimestamp(st.st_mtime, tz=timezone.utc),
        "prompt_version": PROMPT_VERSION,
        "model": model,
        "migrated_at": utcnow(),
    }


def build_missing_curated(existing: Dict[str, Any], ai: Dict[str, Any], target: List[str], cursos_col: Collection) -> Dict[str, Any]:
    """Campos curados que faltan en el doc y deben añadirse sin pisar ediciones."""
    defaults = build_curated_defaults(ai)
    missing: Dict[str, Any] = {k: v for k, v in defaults.items() if k not in existing or existing[k] is None}
    for aud in target:
        field = ORDEN_FIELD_BY_AUD.get(aud)
        if not field:
            continue
        if field not in existing or existing.get(field) is None:
            missing[field] = next_order(cursos_col, field)
    return missing


# --------------------------------------------------------------------------- #
# ¿Procesar o saltar?
# --------------------------------------------------------------------------- #
def should_process(existing: Optional[Dict[str, Any]], digest: str, force: bool) -> Tuple[bool, str]:
    if force:
        return True, "force"
    if not existing:
        return True, "nuevo"
    meta = existing.get("_meta") or {}
    if meta.get("hash") != digest:
        return True, "hash_cambiado"
    if meta.get("prompt_version") != PROMPT_VERSION:
        return True, "prompt_actualizado"
    if not existing.get("audiencia_principal"):
        return True, "campo_faltante"
    # Si falta algún orden correspondiente a targetAudience, reprocesar para rellenarlo
    for aud in existing.get("targetAudience") or []:
        field = ORDEN_FIELD_BY_AUD.get(aud)
        if field and existing.get(field) is None:
            return True, "orden_faltante"
    return False, "sin_cambios"


# --------------------------------------------------------------------------- #
# Escritura en Mongo
# --------------------------------------------------------------------------- #
def upsert_curso(
    col: Collection,
    existing: Optional[Dict[str, Any]],
    match_by: Optional[str],
    ai_data: Dict[str, Any],
    path: Path,
    digest: str,
    model: str,
    dry_run: bool,
) -> str:
    slug = path.stem  # filename es la fuente de verdad del slug
    ai_fields = build_ai_fields(ai_data)
    det_fields = build_deterministic_fields(slug)
    meta = build_meta(path, digest, model)

    if existing:
        # Detección de renombrado
        renamed = existing.get("slug") != slug
        old_slug = existing.get("slug")

        # Construir $set (AI + deterministas + meta)
        update_set: Dict[str, Any] = {**ai_fields, **det_fields, "_meta": meta, "updatedAt": utcnow()}
        # Rellenar curados faltantes (orden incluido) sin pisar existentes
        update_set.update(build_missing_curated(existing, ai_data, ai_fields["targetAudience"], col))

        if dry_run:
            return f"[DRY-RUN] actualizar {slug} (match: {match_by}{', rename: ' + old_slug + '→' + slug if renamed else ''})"

        col.update_one({"_id": existing["_id"]}, {"$set": update_set})
        if renamed:
            log_warn(f"Renombrado detectado: {old_slug} → {slug}. Recuerda renombrar también la imagen a {slug}.jpg")
        return f"actualizado {slug}"
    else:
        full_doc = {
            **ai_fields,
            **det_fields,
            **build_curated_defaults(ai_data),
            "createdAt": utcnow(),
            "updatedAt": utcnow(),
            "_meta": meta,
        }
        # Órdenes iniciales para cada audiencia del target
        for aud in ai_fields["targetAudience"]:
            field = ORDEN_FIELD_BY_AUD.get(aud)
            if field and field not in full_doc:
                full_doc[field] = next_order(col, field)

        if dry_run:
            ords = {k: v for k, v in full_doc.items() if k.startswith("orden_")}
            return f"[DRY-RUN] insertar {slug} (aud: {ai_fields['audiencia_principal']}, ords: {ords})"

        col.insert_one(full_doc)
        return f"insertado {slug}"


def upsert_conocimiento(
    col: Collection,
    existing_curso: Optional[Dict[str, Any]],
    ai_data: Dict[str, Any],
    path: Path,
    digest: str,
    model: str,
    dry_run: bool,
) -> str:
    slug = path.stem
    tema = f"curso_{slug.replace('-', '_')}"
    old_tema: Optional[str] = None
    if existing_curso and existing_curso.get("slug") and existing_curso["slug"] != slug:
        old_tema = f"curso_{existing_curso['slug'].replace('-', '_')}"

    existing = find_existing_conocimiento(col, tema, old_tema)
    nombre = as_text(ai_data.get("nombreCurso"))
    palabras = [nombre.lower()] if nombre else []
    palabras.append(slug.replace("-", " "))

    fields = {
        "tema": tema,
        "palabras_clave": palabras,
        "contenido": as_text(ai_data.get("resumen_rag")),
        "updatedAt": utcnow(),
        "_meta": build_meta(path, digest, model),
    }

    if existing:
        if dry_run:
            return f"[DRY-RUN] actualizar conocimiento {tema}"
        col.update_one({"_id": existing["_id"]}, {"$set": fields})
        return f"conocimiento actualizado {tema}"
    else:
        full_doc = {**fields, "publicable": True, "createdAt": utcnow()}
        if dry_run:
            return f"[DRY-RUN] insertar conocimiento {tema}"
        col.insert_one(full_doc)
        return f"conocimiento insertado {tema}"


# --------------------------------------------------------------------------- #
# Procesar un archivo
# --------------------------------------------------------------------------- #
def process_file(
    path: Path,
    cfg: Config,
    cursos: Collection,
    conocimiento: Collection,
    groq_client: Optional[Groq],
    stats: Dict[str, int],
) -> None:
    stats["total"] += 1
    log_info(f"Procesando {paint(path.name, C.BOLD)}")

    try:
        digest = md5_of_file(path)
    except OSError as exc:
        log_err(f"No se pudo leer {path.name}: {exc}")
        stats["errores"] += 1
        return

    try:
        existing, match_by = find_existing_course(cursos, path.stem, digest, path.name)
    except PyMongoError as exc:
        log_err(f"Mongo no responde buscando {path.name}: {exc}")
        stats["errores"] += 1
        return

    needs, reason = should_process(existing, digest, cfg.force)
    if not needs:
        log_skip(f"{path.name} sin cambios (hash {digest[:8]}) — omitido")
        stats["omitidos"] += 1
        return

    # Cache -> Groq
    ai_data = read_cache(cfg, digest)
    if ai_data:
        log_ai(f"Cache IA para {path.name}")
        stats["cache_hits"] += 1
    else:
        if groq_client is None:
            log_err("No hay GROQ_API_KEY_1 ni cache para este archivo.")
            stats["errores"] += 1
            return
        try:
            text = extract_text(path)
        except Exception as exc:  # noqa: BLE001
            log_err(f"Error extrayendo {path.name}: {exc}")
            stats["errores"] += 1
            return
        if len(text) < 50:
            log_warn(f"{path.name} con muy poco texto ({len(text)} chars), omitido.")
            stats["errores"] += 1
            return
        try:
            ai_data = call_groq(groq_client, cfg.groq_model, text, path.name)
            write_cache(cfg, digest, ai_data)
            stats["groq_calls"] += 1
        except Exception as exc:  # noqa: BLE001
            log_err(f"Groq falló para {path.name}: {exc}")
            stats["errores"] += 1
            return

    try:
        r1 = upsert_curso(cursos, existing, match_by, ai_data, path, digest, cfg.groq_model, cfg.dry_run)
        log_db(r1)
        if existing:
            stats["actualizados"] += 1
        else:
            stats["insertados"] += 1
    except PyMongoError as exc:
        log_err(f"Error escribiendo curso {path.name}: {exc}")
        stats["errores"] += 1
        return

    try:
        r2 = upsert_conocimiento(conocimiento, existing, ai_data, path, digest, cfg.groq_model, cfg.dry_run)
        log_db(r2)
    except PyMongoError as exc:
        log_err(f"Error escribiendo conocimiento {path.name}: {exc}")
        stats["errores"] += 1


# --------------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------------- #
def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Migra sílabus a MongoDB de forma incremental.")
    p.add_argument("--folder", help="Carpeta con los sílabus (default: sylabus_pdfs)")
    p.add_argument("--file", help="Procesar solo este archivo (nombre exacto)")
    p.add_argument("--force", action="store_true", help="Reprocesar aunque el hash no cambie")
    p.add_argument("--dry-run", action="store_true", help="No escribe en Mongo, solo simula")
    p.add_argument("--no-cache", action="store_true", help="Ignora la cache local de IA")
    p.add_argument("--limit", type=int, help="Procesar como máximo N archivos")
    return p.parse_args()


def collect_files(cfg: Config) -> List[Path]:
    if not cfg.sylabus_dir.exists():
        sys.exit(f"❌ No existe la carpeta {cfg.sylabus_dir.resolve()}")
    exts = {".pdf", ".docx", ".txt", ".md"}
    files = sorted(
        p for p in cfg.sylabus_dir.iterdir()
        if p.is_file() and p.suffix.lower() in exts and not p.name.startswith("~$")
    )
    if cfg.only_file:
        files = [p for p in files if p.name == cfg.only_file]
        if not files:
            sys.exit(f"❌ No se encontró {cfg.only_file} en {cfg.sylabus_dir}")
    return files


def main() -> None:
    args = parse_args()
    cfg = Config(args)

    print(paint("\n╔══════════════════════════════════════════════╗", C.MAGENTA))
    print(paint("║  GōkuLab · Migrador incremental de sílabus  ║", C.MAGENTA))
    print(paint("╚══════════════════════════════════════════════╝\n", C.MAGENTA))
    log_info(f"Carpeta:  {cfg.sylabus_dir.resolve()}")
    log_info(f"Mongo:    {DB_NAME}  (cursos + conocimiento)")
    log_info(f"Modelo:   {cfg.groq_model} · prompt {PROMPT_VERSION}")
    if cfg.dry_run:
        log_warn("Modo DRY-RUN: no se escribirá nada en MongoDB")

    groq_client: Optional[Groq] = Groq(api_key=cfg.groq_key) if cfg.groq_key else None
    if not groq_client:
        log_warn("Sin GROQ_API_KEY_1: solo se podrá usar la cache local.")

    files = collect_files(cfg)
    if not files:
        sys.exit("❌ No hay archivos para procesar.")
    if cfg.limit:
        files = files[: cfg.limit]
    log_info(f"Archivos encontrados: {len(files)}\n")

    try:
        mongo_client, cursos, conocimiento = get_collections(cfg)
    except PyMongoError as exc:
        sys.exit(f"❌ No se pudo conectar a MongoDB: {exc}")

    stats = {
        "total": 0, "insertados": 0, "actualizados": 0, "omitidos": 0,
        "errores": 0, "groq_calls": 0, "cache_hits": 0,
    }
    started = time.time()

    try:
        for path in files:
            process_file(path, cfg, cursos, conocimiento, groq_client, stats)
    except KeyboardInterrupt:
        log_warn("Interrumpido por el usuario.")
    finally:
        mongo_client.close()

    elapsed = time.time() - started
    print()
    print(paint("─" * 48, C.GREY))
    log_info(f"Resumen en {elapsed:.1f}s")
    print(f"   📄 Archivos              : {stats['total']}")
    print(paint(f"   🆕 Insertados            : {stats['insertados']}", C.GREEN))
    print(paint(f"   ♻️  Actualizados          : {stats['actualizados']}", C.BLUE))
    print(paint(f"   ⏭️  Omitidos (sin cambios): {stats['omitidos']}", C.YELLOW))
    print(paint(f"   🤖 Llamadas a Groq       : {stats['groq_calls']}", C.MAGENTA))
    print(paint(f"   💾 Cache hits            : {stats['cache_hits']}", C.CYAN))
    print(paint(f"   ❌ Errores               : {stats['errores']}", C.RED if stats["errores"] else C.GREY))
    print(paint("─" * 48, C.GREY))
    print(paint("✨ Migración finalizada\n", C.GREEN))


if __name__ == "__main__":
    main()
/**
 * Genera (o recupera) un identificador de sesión único y persistente
 * para el visitante actual. Se guarda en localStorage bajo la clave
 * "gokulab_userId" y sobrevive a recargas de página.
 *
 * El backend de GōkuLab (AgenteVirtual_Gokulab) usa el campo "numero"
 * como clave de sesión en MongoDB y no valida su formato, por lo que
 * cualquier string único es válido.
 */
export function getSessionId(): string {
  const key = "gokulab_userId";
  let id = localStorage.getItem(key);
  if (!id) {
    const uuid =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    id = `gokulab_user_${uuid}`;
    localStorage.setItem(key, id);
  }
  return id;
}
// src/hooks/useUTMs.ts
import { useEffect, useState } from "react";

export function useUTMs() {
  const [utms, setUtms] = useState("");

  useEffect(() => {
    // 1. Leemos los parámetros de la URL actual
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");
    const medium = params.get("utm_medium");
    const campaign = params.get("utm_campaign");

    // 2. Si vienen en la URL, los guardamos en localStorage para no perderlos si el usuario navega
    if (source) localStorage.setItem("goku_utm_source", source);
    if (medium) localStorage.setItem("goku_utm_medium", medium);
    if (campaign) localStorage.setItem("goku_utm_campaign", campaign);

    // 3. Recuperamos los valores (ya sea de la URL o de la memoria)
    const savedSource = localStorage.getItem("goku_utm_source");
    const savedMedium = localStorage.getItem("goku_utm_medium");
    const savedCampaign = localStorage.getItem("goku_utm_campaign");

    // 4. Si hay datos de campaña, formateamos el texto para WhatsApp
    if (savedSource || savedCampaign) {
      setUtms(`\n\n[Origen: ${savedSource || "directo"} | Medio: ${savedMedium || "N/A"} | Campaña: ${savedCampaign || "N/A"}]`);
    }
  }, []);

  return utms;
}
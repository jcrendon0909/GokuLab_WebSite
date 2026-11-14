import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: Record<string, any>;
}

export function SEO({ title, description, image, url, type = "website", schema }: SEOProps) {
  useEffect(() => {
    // 1. Actualizar Title
    document.title = title;

    // 2. Función auxiliar para actualizar/crear meta tags
    const updateMeta = (name: string, property: string, content: string) => {
      let element = document.querySelector(`meta[${property}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(property, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Meta básicos
    updateMeta("description", "name", description);
    
    // Open Graph (Facebook / WhatsApp)
    updateMeta("og:title", "property", title);
    updateMeta("og:description", "property", description);
    updateMeta("og:type", "property", type);
    if (image) updateMeta("og:image", "property", image);
    if (url) updateMeta("og:url", "property", url);

    // Twitter Card
    updateMeta("twitter:card", "name", "summary_large_image");
    updateMeta("twitter:title", "name", title);
    updateMeta("twitter:description", "name", description);
    if (image) updateMeta("twitter:image", "name", image);

    // 3. Canonical URL (Crucial para SEO)
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url || window.location.href.split('?')[0]);

    // 4. Schema.org (JSON-LD)
    let scriptSchema = document.querySelector('script[id="dynamic-schema"]');
    if (scriptSchema) {
      scriptSchema.remove();
    }
    if (schema) {
      scriptSchema = document.createElement("script");
      scriptSchema.setAttribute("type", "application/ld+json");
      scriptSchema.setAttribute("id", "dynamic-schema");
      scriptSchema.textContent = JSON.stringify(schema);
      document.head.appendChild(scriptSchema);
    }

  }, [title, description, image, url, type, schema]);

  return null;
}
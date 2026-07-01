import { useState, useEffect } from "react";
import { AnimatedSection } from "./AnimatedSection";

interface FacebookPost {
  id: string;
  message?: string;
  full_picture?: string;
  permalink_url?: string;
}

export function SocialMediaFeed() {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN;
        if (!token) {
          throw new Error("Falta el token de Facebook en el archivo .env");
        }

        const pageId = "me"; // o el ID de tu página
        const url = `https://graph.facebook.com/v19.0/${pageId}/posts?fields=id,message,full_picture,permalink_url&limit=6&access_token=${token}`;

        const response = await fetch(url);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response from Facebook:", errorText);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); // ✅ Único parseo

        if (!data.data || !Array.isArray(data.data)) {
          throw new Error("Formato de respuesta inesperado");
        }

        const postsWithImages = data.data
          .filter((post: FacebookPost) => post.full_picture)
          .slice(0, 6);

        setPosts(postsWithImages);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl max-w-lg mx-auto">
        <p className="font-bold">⚠️ Error al cargar el feed</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No hay publicaciones recientes con imágenes.
      </div>
    );
  }

  return (
    <div className="relative py-10 w-full">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00C9FF] rounded-full blur-[128px] opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7C3AED] rounded-full blur-[128px] opacity-20 animate-pulse" />

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <AnimatedSection key={post.id} delay={index * 100}>
            <a
              href={post.permalink_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={post.full_picture}
                alt="Publicación de GOKU LAB"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {post.message && (
                <p className="absolute bottom-4 left-4 right-4 text-white text-sm line-clamp-2 drop-shadow">
                  {post.message.substring(0, 120)}
                </p>
              )}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
            </a>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
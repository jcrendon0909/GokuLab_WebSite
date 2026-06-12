import { useState, useEffect } from "react";
import { AnimatedSection } from "./AnimatedSection";

export function SocialMediaFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const pageId = "me"; 
        const token = import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN;

        if (!token) {
          throw new Error("Falta el token de Facebook en el archivo .env.");
        }

        const response = await fetch(
          `https://graph.facebook.com/v19.0/${pageId}/posts?fields=id,message,full_picture,permalink_url&limit=10&access_token=${token}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("🚨 ERROR COMPLETO DE FACEBOOK:", errorData);
          throw new Error(errorData.error?.message || "Error desconocido del servidor");
        }

        const data = await response.json();
        
        const postsWithImages = data.data
          .filter(post => post.full_picture)
          .slice(0, 6);

        setPosts(postsWithImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 relative z-10">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-[#00C9FF] animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-[#7C3AED] animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 relative z-10">
        <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 shadow-xl">
          <div className="bg-white dark:bg-[#0A0F1E] p-6 rounded-xl">
            <p className="text-red-500 font-black mb-2 text-xl tracking-tight">Conexión pendiente</p>
            <p className="text-gray-600 dark:text-gray-400 font-mono text-xs max-w-lg mx-auto">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-10 w-full">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00C9FF] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7C3AED] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts.map((post, index) => (
          <AnimatedSection key={post.id} delay={index * 100}>
            <a
              href={post.permalink_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-900 shadow-xl hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] transition-all duration-700 ease-out"
            >
              <img
                src={post.full_picture}
                alt="Galería GOKU LAB"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/10 to-transparent opacity-80"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#7C3AED]/90 via-[#00C9FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out mix-blend-overlay"></div>
              <div className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-700 ease-out flex flex-col justify-end">
                <div className="flex gap-4 mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/20">
                    <span className="text-sm">👍</span>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/20">
                    <span className="text-sm">💬</span>
                  </div>
                </div>
                {post.message && (
                  <p className="text-white font-medium text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 drop-shadow-lg">
                    {post.message}
                  </p>
                )}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-150 transform translate-y-4 group-hover:translate-y-0">
                  <span className="flex items-center justify-between w-full py-3 px-5 rounded-xl bg-white/20 backdrop-blur-lg border border-white/40 text-white font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-white hover:text-[#7C3AED] transition-colors">
                    Ver en Facebook
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
// src/config.ts

// Aquí definimos la URL de tu backend.
// Si en tu archivo .env tienes VITE_API_URL, usará esa. 
// Si no, usará la URL de Render que pongas aquí por defecto.
export const API_URL = import.meta.env.VITE_API_URL || 'https://chatbot-gokulab-valeria.onrender.com'; 
// ^^^ Asegúrate de cambiar esta URL por la URL real de tu Render si es diferente.

export const APP_NAME = 'GōkuLab';
export const WHATSAPP_NUMBER = '5612668168';
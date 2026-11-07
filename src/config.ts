// src/config.ts

// URL oficial del backend del asistente virtual de GōkuLab.
// Si en .env existe VITE_API_URL, se usa esa. Si no, esta.
export const API_URL = import.meta.env.VITE_API_URL || 'https://agentevirtual-gokulab.onrender.com';

export const APP_NAME = 'GōkuLab';
export const WHATSAPP_NUMBER = '5612668168';
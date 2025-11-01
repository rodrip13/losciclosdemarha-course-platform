import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import './utils/clearSupabaseStorage'; // Importar utilidades de limpieza

console.log('🚀 [MAIN] Iniciando aplicación...');
console.log('🔧 [MAIN] Modo:', import.meta.env.DEV ? 'DESARROLLO' : 'PRODUCCIÓN');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

console.log('✅ [MAIN] Aplicación renderizada');

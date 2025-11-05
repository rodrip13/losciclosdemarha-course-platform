import { useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import Spinner from './Spinner';

export default function AuthCallback() {
  useEffect(() => {
    console.log('✅ [AUTH CALLBACK] Usuario llegó a la página de callback');
    console.log('🔗 [AUTH CALLBACK] URL actual:', window.location.href);
    
    // Esperar 1.5 segundos para que Supabase procese el token
    // El AuthContext.onAuthStateChange se encargará de actualizar el estado
    const timer = setTimeout(() => {
      console.log('🔄 [AUTH CALLBACK] Redirigiendo a la raíz...');
      window.location.href = '/';
    }, 1500);

    return () => {
      console.log('🧹 [AUTH CALLBACK] Limpiando timer');
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-contessa-100 via-contessa-200 to-contessa-300 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-contessa-600 rounded-2xl mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          
          {/* Título */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Bienvenida!
          </h2>
          
          {/* Mensaje */}
          <p className="text-gray-600 mb-6">
            Estamos confirmando tu cuenta...
          </p>
          
          {/* Spinner */}
          <div className="flex justify-center mb-4">
            <Spinner className="h-8 w-8 text-contessa-600" />
          </div>
          
          {/* Info adicional */}
          <p className="text-sm text-gray-500">
            Serás redirigida a la plataforma de cursos de Los Ciclos de Marha automáticamente
          </p>
        </div>
      </div>
    </div>
  );
}

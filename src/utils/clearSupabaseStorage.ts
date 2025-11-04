/**
 * Utilidad para limpiar el localStorage de tokens antiguos de Supabase
 * Esto es útil cuando cambias de proyecto de Supabase
 * 
 * USO:
 *   clearSupabaseStorage() - Limpia TODOS los datos de Supabase
 *   clearSupabaseStorage('aiyvpzyslfsuodxbuadb.supabase.co') - Limpia solo tokens del proyecto específico
 */

export function clearSupabaseStorage(projectUrl?: string) {
  const keysToRemove: string[] = [];
  
  // Buscar todas las keys relacionadas con Supabase
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.includes('supabase')) {
      if (projectUrl) {
        // Modo específico: solo eliminar si contiene la URL del proyecto
        const value = localStorage.getItem(key);
        if (value && value.includes(projectUrl)) {
          keysToRemove.push(key);
        }
      } else {
        // Modo completo: eliminar todas las keys de Supabase
        keysToRemove.push(key);
      }
    }
  }
  
  if (keysToRemove.length > 0) {
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    return keysToRemove.length;
  } else {
    return 0;
  }
}

export function inspectSupabaseStorage() {
  const supabaseKeys: { [key: string]: any } = {};
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.includes('supabase')) {
      try {
        const value = localStorage.getItem(key);
        supabaseKeys[key] = value ? JSON.parse(value) : value;
      } catch {
        supabaseKeys[key] = localStorage.getItem(key);
      }
    }
  }
  
  return supabaseKeys;
}

// Auto-ejecutar en desarrollo si detecta proyecto antiguo
if (import.meta.env.DEV) {
  const oldProjectUrl = 'aiyvpzyslfsuodxbuadb.supabase.co';

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.includes('supabase')) {
      const value = localStorage.getItem(key);
      if (value && value.includes(oldProjectUrl)) {
        clearSupabaseStorage();
        break;
      }
    }
  }
}

// Exponer funciones globalmente en desarrollo para fácil acceso desde consola
if (import.meta.env.DEV) {
  (window as any).clearSupabaseStorage = clearSupabaseStorage;
  (window as any).inspectSupabaseStorage = inspectSupabaseStorage;
}

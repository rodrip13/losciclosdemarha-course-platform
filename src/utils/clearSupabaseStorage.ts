/**
 * Utilidad para limpiar el localStorage de tokens antiguos de Supabase
 * Esto es útil cuando cambias de proyecto de Supabase
 * 
 * USO:
 *   clearSupabaseStorage() - Limpia TODOS los datos de Supabase
 *   clearSupabaseStorage('aiyvpzyslfsuodxbuadb.supabase.co') - Limpia solo tokens del proyecto específico
 */

export function clearSupabaseStorage(projectUrl?: string) {
  console.log('🧹 [CLEAR STORAGE] Iniciando limpieza de localStorage...');
  
  if (projectUrl) {
    console.log(`🎯 [CLEAR STORAGE] Modo específico: limpiando proyecto ${projectUrl}`);
  } else {
    console.log('🎯 [CLEAR STORAGE] Modo completo: limpiando TODOS los datos de Supabase');
  }
  
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
  
  console.log(`🔍 [CLEAR STORAGE] Encontradas ${keysToRemove.length} keys de Supabase`);
  
  if (keysToRemove.length > 0) {
    console.log('📋 [CLEAR STORAGE] Keys a eliminar:', keysToRemove);
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ [CLEAR STORAGE] Removida: ${key}`);
    });
    
    console.log('✅ [CLEAR STORAGE] Limpieza completada');
    console.log('🔄 [CLEAR STORAGE] Recarga la página para aplicar cambios');
    
    return keysToRemove.length;
  } else {
    console.log('ℹ️ [CLEAR STORAGE] No se encontraron keys de Supabase para limpiar');
    return 0;
  }
}

export function inspectSupabaseStorage() {
  console.log('🔍 [INSPECT STORAGE] Inspeccionando localStorage...');
  
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
  
  console.log('📦 [INSPECT STORAGE] Datos de Supabase en localStorage:');
  console.table(Object.keys(supabaseKeys));
  console.log('📋 [INSPECT STORAGE] Detalles:', supabaseKeys);
  
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
        console.warn('🚨 [AUTO CLEAN] ¡PROYECTO VIEJO DETECTADO EN localStorage!');
        console.warn('🚨 [AUTO CLEAN] URL antigua encontrada:', oldProjectUrl);
        console.warn('🚨 [AUTO CLEAN] Esto está causando errores ERR_NAME_NOT_RESOLVED');
        console.warn('🚨 [AUTO CLEAN] Limpiando automáticamente...');

        // Limpiar TODOS los datos de Supabase para evitar conflictos
        clearSupabaseStorage();
        console.warn('✅ [AUTO CLEAN] Limpieza automática completada');
        console.warn('🔄 [AUTO CLEAN] Recarga la página si los errores persisten');
        break;
      }
    }
  }
}

// Exponer funciones globalmente en desarrollo para fácil acceso desde consola
if (import.meta.env.DEV) {
  (window as any).clearSupabaseStorage = clearSupabaseStorage;
  (window as any).inspectSupabaseStorage = inspectSupabaseStorage;
  console.log('🛠️ [DEV TOOLS] Funciones disponibles en consola:');
  console.log('  - clearSupabaseStorage() - Limpiar TODOS los datos de Supabase');
  console.log('  - clearSupabaseStorage("url-proyecto") - Limpiar proyecto específico');
  console.log('  - inspectSupabaseStorage() - Inspeccionar datos almacenados');
}

import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

// Cache simple en memoria
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

const CACHE_TTL = {
  COMPLETED_LESSONS: 5 * 60 * 1000, // 5 minutos
  USER_SESSIONS: 2 * 60 * 1000,     // 2 minutos
};

function getCacheKey(prefix: string, ...params: string[]): string {
  return `${prefix}:${params.join(':')}`;
}

function setCache(key: string, data: any, ttl: number): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl
  });
}

function getCache<T>(key: string): T | null {
  const cached = cache.get(key);
  if (!cached) return null;
  
  if (Date.now() - cached.timestamp > cached.ttl) {
    cache.delete(key);
    return null;
  }
  
  return cached.data;
}

function clearUserCache(userId: string): void {
  for (const key of cache.keys()) {
    if (key.includes(userId)) {
      cache.delete(key);
    }
  }
}

export interface DBResult<T = any> {
  success: boolean;
  data?: T;
  error?: PostgrestError | Error | null;
}

// Obtiene los IDs de lecciones completadas por el usuario (CON CACHÉ)
export async function getCompletedLessons(userId: string): Promise<string[]> {
  console.log('📚 [GET COMPLETED] Buscando lecciones completadas...');
  console.log('📚 [GET COMPLETED] User ID:', userId);
  
  const cacheKey = getCacheKey('completed_lessons', userId);
  const cached = getCache<string[]>(cacheKey);
  
  if (cached) {
    console.log('🚀 [GET COMPLETED] Cache HIT - Retornando datos en cache');
    console.log('📦 [GET COMPLETED] Lecciones:', cached.length);
    return cached;
  }

  console.log('📡 [GET COMPLETED] Cache MISS - Consultando base de datos...');
  
  try {
    const { data, error } = await supabase
      .from("module_completions")
      .select("module_id")
      .eq("user_id", userId);
    
    if (error) {
      console.error('❌ [GET COMPLETED] Error en consulta:', error);
      return [];
    }
    
    if (!data) {
      console.warn('⚠️ [GET COMPLETED] Sin datos retornados');
      return [];
    }
    
    const result = data.map((row: { module_id: string }) => row.module_id);
    setCache(cacheKey, result, CACHE_TTL.COMPLETED_LESSONS);
    
    console.log('✅ [GET COMPLETED] Datos obtenidos y cacheados');
    console.log('📦 [GET COMPLETED] Lecciones completadas:', result.length);
    
    return result;
  } catch (err) {
    console.error('❌ [GET COMPLETED] Error inesperado:', err);
    return [];
  }
}

// Registra una lección como completada para un usuario
export async function registerLessonCompletion(userId: string, lessonId: string): Promise<DBResult> {
  console.log('✏️ [REGISTER COMPLETION] Registrando lección completada...');
  console.log('✏️ [REGISTER COMPLETION] User ID:', userId);
  console.log('✏️ [REGISTER COMPLETION] Lesson ID:', lessonId);
  
  try {
    const { error, data } = await supabase.from("module_completions").insert({
      user_id: userId,
      module_id: lessonId,
    });
    
    if (error) {
      console.error('❌ [REGISTER COMPLETION] Error:', error);
      return { success: false, error };
    }
    
    clearUserCache(userId);
    console.log('🗑️ [REGISTER COMPLETION] Cache limpiado para usuario:', userId);
    console.log('✅ [REGISTER COMPLETION] Lección registrada exitosamente');
    
    return { success: true, data };
  } catch (err) {
    console.error('❌ [REGISTER COMPLETION] Error inesperado:', err);
    return { success: false, error: err as Error };
  }
}

export async function registerSession(userId: string, userAgent: string): Promise<DBResult> {
  console.log('🔓 [REGISTER SESSION] Registrando sesión de usuario...');
  console.log('🔓 [REGISTER SESSION] User ID:', userId);
  console.log('🔓 [REGISTER SESSION] User Agent:', userAgent.substring(0, 50) + '...');
  
  try {
    const { error, data } = await supabase.from("user_sessions").insert({
      user_id: userId,
      user_agent: userAgent,
    });
    
    if (error) {
      console.error('❌ [REGISTER SESSION] Error:', error);
      return { success: false, error };
    }
    
    console.log('✅ [REGISTER SESSION] Sesión registrada exitosamente');
    return { success: true, data };
  } catch (err) {
    console.error('❌ [REGISTER SESSION] Error inesperado:', err);
    return { success: false, error: err as Error };
  }
}

export async function closeSession(userId: string): Promise<DBResult> {
  console.log('🔒 [CLOSE SESSION] Cerrando sesión de usuario...');
  console.log('🔒 [CLOSE SESSION] User ID:', userId);
  
  try {
    console.log('🔍 [CLOSE SESSION] Buscando sesión abierta...');
    
    const { data, error } = await supabase
      .from("user_sessions")
      .select("id, login_at")
      .eq("user_id", userId)
      .is("logout_at", null)
      .order("login_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('❌ [CLOSE SESSION] Error buscando sesión:', error);
      return { success: false, error };
    }
    
    if (data) {
      console.log('📋 [CLOSE SESSION] Sesión encontrada, ID:', data.id);
      
      const now = new Date();
      const loginAt = new Date(data.login_at);
      const duration = Math.floor((now.getTime() - loginAt.getTime()) / 1000);
      
      console.log('⏱️ [CLOSE SESSION] Duración de sesión:', duration, 'segundos');
      
      const { error: updateError, data: updateData } = await supabase
        .from("user_sessions")
        .update({
          logout_at: now.toISOString(),
          duration_seconds: duration,
        })
        .eq("id", data.id);
        
      if (updateError) {
        console.error('❌ [CLOSE SESSION] Error actualizando sesión:', updateError);
        return { success: false, error: updateError };
      }
      
      console.log('✅ [CLOSE SESSION] Sesión cerrada exitosamente');
      return { success: true, data: updateData };
    }
    
    console.warn('⚠️ [CLOSE SESSION] No se encontró sesión abierta');
    return { success: false, error: new Error("Sesión abierta NO encontrada") };
  } catch (err) {
    console.error('❌ [CLOSE SESSION] Error inesperado:', err);
    return { success: false, error: err as Error };
  }
}

// Función adicional para limpiar caché manualmente si es necesario
export function clearAllCache(): void {
  cache.clear();
  console.log('🗑️ All cache limpio');
}

export function getUserCacheStats(userId: string): { keys: string[]; size: number } {
  const userKeys = Array.from(cache.keys()).filter(key => key.includes(userId));
  return {
    keys: userKeys,
    size: userKeys.length
  };
}

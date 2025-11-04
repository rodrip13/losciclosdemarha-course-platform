/**
 * Sistema de persistencia para el progreso del usuario
 * Almacena las lecciones completadas por usuario en LocalStorage
 */

interface UserProgress {
  email: string;
  completedLessons: string[]; // IDs de lecciones completadas
  lastUpdated: string; // ISO timestamp
}

const STORAGE_KEY = 'toti_course_progress';

/**
 * Obtiene el progreso completo del usuario desde LocalStorage
 */
export const getUserProgress = (email: string): UserProgress | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const allProgress: Record<string, UserProgress> = JSON.parse(data);
    return allProgress[email] || null;
  } catch (error) {
    console.error('Error leyendo progreso del usuario:', error);
    return null;
  }
};

/**
 * Guarda o actualiza el progreso del usuario
 */
export const saveUserProgress = (email: string, completedLessons: string[]): void => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const allProgress: Record<string, UserProgress> = data ? JSON.parse(data) : {};

    allProgress[email] = {
      email,
      completedLessons,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Error guardando progreso del usuario:', error);
  }
};

/**
 * Marca una lección como completada
 */
export const markLessonComplete = (email: string, lessonId: string): void => {
  try {
    const progress = getUserProgress(email);
    const completedLessons = progress?.completedLessons || [];

    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }

    saveUserProgress(email, completedLessons);
  } catch (error) {
    console.error('Error marcando lección como completada:', error);
  }
};

/**
 * Desmarca una lección como completada
 */
export const unmarkLessonComplete = (email: string, lessonId: string): void => {
  try {
    const progress = getUserProgress(email);
    const completedLessons = progress?.completedLessons || [];

    const filtered = completedLessons.filter(id => id !== lessonId);
    saveUserProgress(email, filtered);
  } catch (error) {
    console.error('Error desmarcando lección como completada:', error);
  }
};

/**
 * Obtiene todas las lecciones completadas de un usuario
 */
export const getCompletedLessons = (email: string): string[] => {
  const progress = getUserProgress(email);
  return progress?.completedLessons || [];
};

/**
 * Limpia el progreso de un usuario (útil para logout)
 */
export const clearUserProgress = (email: string): void => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;

    const allProgress: Record<string, UserProgress> = JSON.parse(data);
    delete allProgress[email];

    if (Object.keys(allProgress).length === 0) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    }
  } catch (error) {
    console.error('Error limpiando progreso del usuario:', error);
  }
};

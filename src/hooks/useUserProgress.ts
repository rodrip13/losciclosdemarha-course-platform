/**
 * Hook personalizado para gestionar el progreso del usuario
 * Proporciona funciones para guardar/cargar lecciones completadas
 */

import { useCallback } from 'react';
import {
  markLessonComplete,
  unmarkLessonComplete,
  getCompletedLessons,
} from '../utils/storage';

export const useUserProgress = (email: string | undefined) => {
  /**
   * Obtiene las lecciones completadas del usuario actual
   */
  const getCompleted = useCallback(() => {
    if (!email) return [];
    return getCompletedLessons(email);
  }, [email]);

  /**
   * Marca una lección como completada y persiste
   */
  const markComplete = useCallback(
    (lessonId: string) => {
      if (!email) return;
      markLessonComplete(email, lessonId);
    },
    [email]
  );

  /**
   * Desmarca una lección como completada y persiste
   */
  const unmarkComplete = useCallback(
    (lessonId: string) => {
      if (!email) return;
      unmarkLessonComplete(email, lessonId);
    },
    [email]
  );

  /**
   * Verifica si una lección específica está completada
   */
  const isLessonComplete = useCallback(
    (lessonId: string): boolean => {
      if (!email) return false;
      const completed = getCompletedLessons(email);
      return completed.includes(lessonId);
    },
    [email]
  );

  return {
    getCompleted,
    markComplete,
    unmarkComplete,
    isLessonComplete,
  };
};

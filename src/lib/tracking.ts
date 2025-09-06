import { supabase } from './supabaseClient';

// A placeholder for getting the actual user ID.
// In a real application, you would get this from your authentication system.
const getUserId = (): string => {
  // For now, we'll use a hardcoded mock user ID.
  // TODO: Replace this with the actual user ID from the session when auth is implemented.
  return 'mock-user-12345';
};

/**
 * Logs an event to Supabase.
 * @param eventType - The type of the event (e.g., 'LESSON_COMPLETE').
 * @param eventData - A JSON object containing details about the event.
 */
export const logEvent = async (eventType: string, eventData: object): Promise<void> => {
  try {
    const userId = getUserId();

    const { error } = await supabase
      .from('user_events')
      .insert([
        {
          user_id: userId,
          event_type: eventType,
          event_data: eventData,
        },
      ]);

    if (error) {
      // Don't throw the error, just log it to the console.
      // This prevents the user-facing application from breaking if tracking fails.
      console.error('Error logging event to Supabase:', error.message);
    }
  } catch (error) {
    if (error instanceof Error) {
        console.error('An unexpected error occurred while logging the event:', error.message);
    } else {
        console.error('An unexpected error occurred while logging the event:', error);
    }
  }
};

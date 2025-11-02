
import { mockCourse } from '../data/mockData';
import { Course } from '../types/course';

export const fetchCourse = async (): Promise<Course> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCourse);
    }, 1000);
  });
};

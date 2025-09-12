export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
  completed: boolean;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'download' | 'audio' | 'video' | 'quiz' | 'exercise';
  url: string;
  description?: string;
}
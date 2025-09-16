import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CourseOverview from './components/CourseOverview';
import LessonViewer from './components/LessonViewer';
import LoginForm from './components/LoginForm';
import { mockCourse } from './data/mockData';
import { Lesson } from './types/course';
import { supabase } from './supabaseClient';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'overview' | 'lesson'>('overview');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Obtener todas las lecciones en orden
  const allLessons = mockCourse.modules.flatMap(module => 
    module.lessons.sort((a, b) => a.order - b.order)
  );

  const handleStartCourse = () => {
    // Buscar la primera lección no completada o la primera lección
    const firstIncompleteLesson = allLessons.find(lesson => !lesson.completed) || allLessons[0];
    if (firstIncompleteLesson) {
      setSelectedLesson(firstIncompleteLesson);
      setCurrentView('lesson');
    }
  };

  const handleLessonSelect = (lessonId: string) => {
    const lesson = allLessons.find(l => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
      setCurrentView('lesson');
    }
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
    setSelectedLesson(null);
  };

  const handleNextLesson = () => {
    if (!selectedLesson) return;
    const currentIndex = allLessons.findIndex(l => l.id === selectedLesson.id);
    if (currentIndex < allLessons.length - 1) {
      setSelectedLesson(allLessons[currentIndex + 1]);
    }
  };

  const handlePrevLesson = () => {
    if (!selectedLesson) return;
    const currentIndex = allLessons.findIndex(l => l.id === selectedLesson.id);
    if (currentIndex > 0) {
      setSelectedLesson(allLessons[currentIndex - 1]);
    }
  };

  const getCurrentLessonIndex = () => {
    if (!selectedLesson) return -1;
    return allLessons.findIndex(l => l.id === selectedLesson.id);
  };

  const hasNextLesson = () => {
    const currentIndex = getCurrentLessonIndex();
    return currentIndex >= 0 && currentIndex < allLessons.length - 1;
  };

  const hasPrevLesson = () => {
    const currentIndex = getCurrentLessonIndex();
    return currentIndex > 0;
  };

  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Si está en la vista overview, mostrar solo el overview
  if (currentView === 'overview') {
    return <CourseOverview course={mockCourse} onStartCourse={handleStartCourse} />;
  }

  // Vista de lección con sidebar
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        course={mockCourse}
        selectedLessonId={selectedLesson?.id || null}
        onLessonSelect={handleLessonSelect}
        onHomeClick={handleBackToOverview}
      />
      <main className="ml-80 flex-1 p-8">
        {selectedLesson && (
          <LessonViewer
            course={mockCourse}
            lesson={selectedLesson}
            onBack={handleBackToOverview}
            onNextLesson={handleNextLesson}
            onPrevLesson={handlePrevLesson}
            hasNext={hasNextLesson()}
            hasPrev={hasPrevLesson()}
          />
        )}
      </main>
    </div>
  );
}

export default App;
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import CourseOverview from "./components/CourseOverview";
import LessonViewer from "./components/LessonViewer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { mockCourse } from "./data/mockData";
import { Lesson } from "./types/course";
import { Course } from "./types/course";
import { useAuth } from "./context/AuthContext";
import { registerLessonCompletion, getCompletedLessons } from "./api/userActivity";
import Spinner from "./components/Spinner";

function App() {
  const { session, user, loading } = useAuth();
  // Importante: todos los hooks deben declararse siempre en el mismo orden
  const [currentView, setCurrentView] = useState<"overview" | "lesson">("overview");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course>(mockCourse);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // Cargar progreso de lecciones completadas al iniciar sesión
  useEffect(() => {
    const fetchCompleted = async () => {
      if (!user) return;
      const completedIds = await getCompletedLessons(user.id);
      setCourse((prevCourse) => {
        // Asegura que todas las lecciones tengan el campo completed
        const newCourse = { ...prevCourse };
        newCourse.modules = newCourse.modules.map((module) => ({
          ...module,
          lessons: module.lessons.map((lesson) => ({
            ...lesson,
            completed: completedIds.includes(lesson.id),
          })),
        }));
        return newCourse;
      });
    };
    fetchCompleted();
  }, [user, mockCourse]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-contessa-100 via-contessa-200 to-contessa-300">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-700 font-medium">Verificando autenticación...</p>
          <p className="mt-2 text-sm text-gray-600">Esto solo debería tomar unos segundos</p>
        </div>
      </div>
    );
  }

  if (!session) {
    // Routing manual: mostrar RegisterForm en /registro-curso
    if (window.location.pathname === "/registro-curso") {
      return <RegisterForm />;
    }
    return <LoginForm />;
  }

  // Obtener todas las lecciones en orden
  const allLessons = course.modules.flatMap((module) =>
    module.lessons.sort((a, b) => a.order - b.order)
  );

  const handleToggleLessonComplete = async (lessonId: string) => {
    if (!user) return;
    const newCourse = { ...course };
    const moduleIndex = newCourse.modules.findIndex((m) =>
      m.lessons.some((l) => l.id === lessonId)
    );
    if (moduleIndex === -1) return;

    const lessonIndex = newCourse.modules[moduleIndex].lessons.findIndex(
      (l) => l.id === lessonId
    );
    if (lessonIndex === -1) return;

    const lesson = newCourse.modules[moduleIndex].lessons[lessonIndex];
    // Si ya está completada, no registrar de nuevo
    if (!lesson.completed) {
      await registerLessonCompletion(user.id, lessonId);
    }
    lesson.completed = !lesson.completed;
    setCourse(newCourse);
  };

  const handleStartCourse = () => {
    // Buscar la primera lección no completada o la primera lección
    const firstIncompleteLesson =
      allLessons.find((lesson) => !lesson.completed) || allLessons[0];
    if (firstIncompleteLesson) {
      setSelectedLesson(firstIncompleteLesson);
      setCurrentView("lesson");
    }
  };

  const handleLessonSelect = (lessonId: string) => {
    const lesson = allLessons.find((l) => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
      setCurrentView("lesson");
      // Cerrar sidebar en mobile después de seleccionar
      setSidebarOpen(false);
    }
  };

  const handleBackToOverview = () => {
    setCurrentView("overview");
    setSelectedLesson(null);
  };

  const handleNextLesson = () => {
    if (!selectedLesson) return;
    const currentIndex = allLessons.findIndex(
      (l) => l.id === selectedLesson.id
    );
    if (currentIndex < allLessons.length - 1) {
      setSelectedLesson(allLessons[currentIndex + 1]);
    }
  };

  const handlePrevLesson = () => {
    if (!selectedLesson) return;
    const currentIndex = allLessons.findIndex(
      (l) => l.id === selectedLesson.id
    );
    if (currentIndex > 0) {
      setSelectedLesson(allLessons[currentIndex - 1]);
    }
  };

  const getCurrentLessonIndex = () => {
    if (!selectedLesson) return -1;
    return allLessons.findIndex((l) => l.id === selectedLesson.id);
  };

  const hasNextLesson = () => {
    const currentIndex = getCurrentLessonIndex();
    return currentIndex >= 0 && currentIndex < allLessons.length - 1;
  };

  const hasPrevLesson = () => {
    const currentIndex = getCurrentLessonIndex();
    return currentIndex > 0;
  };

  // Si está en la vista overview, mostrar solo el overview
  if (currentView === "overview") {
    return (
    <CourseOverview course={course} onStartCourse={handleStartCourse} />
    );
  }

  // Vista de lección con sidebar
  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Overlay backdrop para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      <Sidebar
        course={course}
        selectedLessonId={selectedLesson?.id || null}
        onLessonSelect={handleLessonSelect}
        onHomeClick={handleBackToOverview}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 flex flex-col">
        {selectedLesson && (
          <LessonViewer
            course={course}
            lesson={selectedLesson}
            onBack={handleBackToOverview}
            onNextLesson={handleNextLesson}
            onPrevLesson={handlePrevLesson}
            hasNext={hasNextLesson()}
            hasPrev={hasPrevLesson()}
            onToggleLessonComplete={handleToggleLessonComplete}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
        )}
      </main>
    </div>
  );
}

export default App;

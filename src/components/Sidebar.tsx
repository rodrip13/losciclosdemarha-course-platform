import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText,
  Download,
  CheckCircle,
  Circle,
  LogOut,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Course } from '../types/course';

interface SidebarProps {
  course: Course;
  selectedLessonId: string | null;
  onLessonSelect: (lessonId: string) => void;
  onHomeClick: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  course, 
  selectedLessonId, 
  onLessonSelect,
  onHomeClick,
  isOpen = false,
  onClose
}) => {
  const { user, signOut } = useAuth();
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter(lesson => lesson.completed).length,
    0
  );

  const [openModules, setOpenModules] = useState<string[]>(() => course.modules.map(m => m.id));

  const toggleModule = (moduleId: string) => {
    setOpenModules(prevOpenModules => 
      prevOpenModules.includes(moduleId)
        ? prevOpenModules.filter(id => id !== moduleId)
        : [...prevOpenModules, moduleId]
    );
  };

  return (
    <div className={`
      fixed lg:relative
      inset-y-0 left-0
      z-40
      w-80
      bg-white
      border-r border-gray-200
      h-screen
      flex flex-col
      overflow-hidden
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <button 
          onClick={() => {
            onHomeClick();
            onClose?.();
          }}
          className="flex items-center space-x-3 mb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors w-full"
        >
          <div className="w-10 h-10 bg-contessa-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-lg font-bold text-gray-900">Nacer acompañadas</h1>
            <p className="text-gray-500 text-sm">Los ciclos de Marha</p>
          </div>
        </button>
        
        {/* Progress */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso del curso</span>
            <span className="text-sm text-gray-600">{Math.round((completedLessons / totalLessons) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-contessa-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{completedLessons} de {totalLessons} lecciones completadas</p>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Contenido del Curso
          </h3>
          <div className="space-y-2">
            {course.modules.map((module) => {
              const isOpen = !openModules.includes(module.id);
              return (
                <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full bg-gray-50 px-4 py-3 border-b-2 border-gray-200 flex justify-between items-center hover:bg-gray-100 transition-colors"
                  >
                    <div className='text-left'>
                      <h4 className="font-medium text-gray-900 text-sm">{module.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{module.lessons.length} lecciones</p>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="divide-y divide-gray-100">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => onLessonSelect(lesson.id)}
                          className={`w-full text-left p-3 hover:bg-contessa-50 transition-colors ${
                            selectedLessonId === lesson.id ? 'bg-contessa-50 border-r-4 border-r-contessa-600' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            {lesson.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 text-sm leading-tight">{lesson.title}</p>
                              <p className="text-xs text-gray-600 mt-1">{lesson.duration}</p>
                              {lesson.resources && lesson.resources.length > 0 && (
                                <div className="flex items-center mt-1">
                                  <Download className="w-3 h-3 text-contessa-600 mr-1" />
                                  <span className="text-xs text-contessa-600">{lesson.resources.length} recursos</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )})}
          </div>
        </div>
      </div>

      {/* Footer: User info and logout */}
      <div className="p-4 border-t border-gray-200 bg-white space-y-3">
        {/* WhatsApp Support Button */}
        <a
          href="https://chat.whatsapp.com/ED539Xk06SG8vexxUoEYkn?mode=wwt"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Grupo de Soporte</span>
        </a>

        {user && (
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600 truncate max-w-[140px]">
              <span className="font-semibold text-gray-800 block">{user.email}</span>
              <span className="text-gray-400">Conectado</span>
            </div>
            <button
              onClick={signOut}
              className="flex items-center text-contessa-600 hover:text-contessa-800 text-xs font-semibold px-2 py-1 rounded transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4 mr-1" />Salir
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
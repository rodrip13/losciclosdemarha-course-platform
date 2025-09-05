import React from 'react';
import { 
  BookOpen, 
  Home,
  FileText,
  Download,
  CheckCircle,
  Circle
} from 'lucide-react';
import { Course } from '../types/course';

interface SidebarProps {
  course: Course;
  selectedLessonId: string | null;
  onLessonSelect: (lessonId: string) => void;
  onHomeClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  course, 
  selectedLessonId, 
  onLessonSelect,
  onHomeClick 
}) => {
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter(lesson => lesson.completed).length,
    0
  );

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-40 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <button 
          onClick={onHomeClick}
          className="flex items-center space-x-3 mb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors w-full"
        >
          <div className="w-10 h-10 bg-contessa-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-lg font-bold text-gray-900">Los ciclos de Marha</h1>
            <p className="text-gray-500 text-sm">Nombre del Curso</p>
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
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Contenido del Curso
        </h3>
        
        <div className="space-y-2">
          {course.modules.map((module) => (
            <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h4 className="font-medium text-gray-900 text-sm">{module.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{module.lessons.length} lecciones</p>
              </div>
              
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
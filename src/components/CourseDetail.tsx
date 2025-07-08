import React, { useState } from 'react';
import { ArrowLeft, Play, Users, Clock, CheckCircle, Circle, Plus, Edit } from 'lucide-react';
import { Course } from '../types/course';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack }) => {
  const [selectedLesson, setSelectedLesson] = useState(course.modules[0]?.lessons[0] || null);
  const [activeModule, setActiveModule] = useState(course.modules[0]?.id || '');

  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter(lesson => lesson.completed).length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-600 mt-1">{course.description}</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
          <Edit className="w-4 h-4" />
          <span>Editar Curso</span>
        </button>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">Estudiantes</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{course.studentsCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">Duración</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{course.duration}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Play className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-600">Lecciones</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalLessons}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-gray-600">Completado</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{Math.round((completedLessons / totalLessons) * 100)}%</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {selectedLesson ? (
              <>
                <div className="aspect-video bg-black">
                  <iframe
                    src={getYouTubeEmbedUrl(selectedLesson.videoUrl)}
                    title={selectedLesson.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {selectedLesson.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{selectedLesson.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Duración: {selectedLesson.duration}</span>
                      <span>•</span>
                      <span className={selectedLesson.completed ? 'text-green-600' : 'text-gray-500'}>
                        {selectedLesson.completed ? 'Completada' : 'Pendiente'}
                      </span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      Marcar como completada
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Selecciona una lección para comenzar</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Course Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Contenido del Curso</h3>
              <button className="text-blue-600 hover:text-blue-700 p-1 rounded transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {course.modules.map((module) => (
              <div key={module.id} className="border-b border-gray-100 last:border-b-0">
                <button
                  onClick={() => setActiveModule(activeModule === module.id ? '' : module.id)}
                  className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{module.title}</h4>
                    <span className="text-sm text-gray-500">
                      {module.lessons.length} lecciones
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                </button>
                
                {activeModule === module.id && (
                  <div className="bg-gray-50">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className={`w-full text-left p-4 border-t border-gray-200 hover:bg-gray-100 transition-colors ${
                          selectedLesson?.id === lesson.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {lesson.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{lesson.title}</p>
                            <p className="text-sm text-gray-600">{lesson.duration}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
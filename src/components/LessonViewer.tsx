import React from 'react';
import { ArrowLeft, CheckCircle, Download, ExternalLink, FileText, ChevronRight, ChevronLeft, FileAudio, Video, HelpCircle, ScrollText, Menu } from 'lucide-react';
import { Course, Lesson } from '../types/course';

interface LessonViewerProps {
  course: Course;
  lesson: Lesson;
  onBack: () => void;
  onNextLesson: () => void;
  onPrevLesson: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  onToggleLessonComplete: (lessonId: string) => void;
  onToggleSidebar?: () => void;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ 
  lesson, 
  onBack, 
  onNextLesson, 
  onPrevLesson,
  hasNext,
  hasPrev,
  onToggleLessonComplete,
  onToggleSidebar
}) => {
  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  };

  const getPdfUrl = (pdfName: string) => {
    return `/pdfs/${encodeURIComponent(pdfName)}`;
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'download':
        return <Download className="w-5 h-5 text-contessa-600" />;
      case 'link':
        return <ExternalLink className="w-5 h-5 text-green-600" />;
      case 'audio':
        return <FileAudio className="w-5 h-5 text-purple-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-blue-600" />;
      case 'quiz':
        return <HelpCircle className="w-5 h-5 text-yellow-600" />;
      case 'exercise':
        return <ScrollText className="w-5 h-5 text-pink-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const markAsCompleted = () => {
    // Aquí implementarías la lógica para marcar como completada
    onToggleLessonComplete(lesson.id);
  };

  return (
        <div className="space-y-6 p-4 sm:p-6 lg:p-6">
          {/* Header */}
          <div className="flex flex-col sm:justify-between gap-4">
            <div className="flex justify-between sm:justify-between md:justify-between lg:justify-end gap-2">
              {/* Hamburguesa visible solo en mobile (lg: hidden) */}
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Abrir menú"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>

              <div className="flex gap-2">
                <button
                  onClick={onPrevLesson}
                  disabled={!hasPrev}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    hasPrev 
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>
                
                <button
                  onClick={onNextLesson}
                  disabled={!hasNext}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    hasNext 
                      ? 'bg-contessa-600 hover:bg-contessa-700 text-white' 
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Video Player - Solo mostrar si hay videoUrl */}
          {lesson.videoUrl && (
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="aspect-square sm:aspect-video bg-gradient-to-br from-contessa-50 via-contessa-100 to-contessa-300 flex items-center justify-center">
                <iframe
                  src={getYouTubeEmbedUrl(lesson.videoUrl)}
                  title={lesson.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Lesson Info */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{lesson.description}</p>
              </div>
              <div className="flex-shrink-0 w-full sm:w-auto">
                {lesson.completed ? (
                  <div className="flex items-center justify-center sm:justify-end space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium text-sm">Completada</span>
                  </div>
                ) : (
                  <button
                    onClick={markAsCompleted}
                    className="w-full sm:w-auto bg-contessa-600 hover:bg-contessa-700 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
                  >
                    Marcar completada
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 border-t border-gray-200 pt-4">
              {lesson.resources && lesson.resources.length > 0 && (
                <span>{lesson.resources.length} recursos disponibles</span>
              )}
            </div>
          </div>

          {/* Resources */}
          {lesson.resources && lesson.resources.length > 0 && (
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Download className="w-5 h-5 mr-2 text-contessa-600" />
                Recursos de la Lección
              </h2>
              
              <div className="grid gap-2 sm:gap-3">
                {lesson.resources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.type === 'pdf' ? getPdfUrl(resource.url) : resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 group-hover:text-contessa-600 transition-colors text-sm sm:text-base truncate">
                        {resource.title}
                      </h3>
                      {resource.description && (
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{resource.description}</p>
                      )}
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-contessa-600 transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
    </div>
  );
};

export default LessonViewer;
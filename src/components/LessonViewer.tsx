import React from 'react';
import { ArrowLeft, CheckCircle, Download, ExternalLink, FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import { Course, Lesson } from '../types/course';
import { logEvent } from '../lib/tracking';
import YouTubePlayer from './YouTubePlayer';

interface LessonViewerProps {
  course: Course;
  lesson: Lesson;
  onBack: () => void;
  onNextLesson: () => void;
  onPrevLesson: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ 
  course, 
  lesson, 
  onBack, 
  onNextLesson, 
  onPrevLesson,
  hasNext,
  hasPrev 
}) => {
  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'download':
        return <Download className="w-5 h-5 text-contessa-600" />;
      case 'link':
        return <ExternalLink className="w-5 h-5 text-green-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const markAsCompleted = async () => {
    // Aquí implementarías la lógica para marcar como completada
    console.log('Marcar lección como completada:', lesson.id);
    await logEvent('LESSON_COMPLETE', {
      lesson_id: lesson.id,
      course_id: course.id,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al curso</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onPrevLesson}
            disabled={!hasPrev}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              hasPrev 
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>
          
          <button
            onClick={onNextLesson}
            disabled={!hasNext}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              hasNext 
                ? 'bg-contessa-600 hover:bg-contessa-700 text-white' 
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Video Player */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="aspect-video bg-black">
          <YouTubePlayer
            videoId={lesson.videoUrl}
            courseId={course.id}
            lessonId={lesson.id}
          />
        </div>
        
        {/* Lesson Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
              <p className="text-gray-600 leading-relaxed">{lesson.description}</p>
            </div>
            <div className="ml-6 flex-shrink-0">
              {lesson.completed ? (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Completada</span>
                </div>
              ) : (
                <button
                  onClick={markAsCompleted}
                  className="bg-contessa-600 hover:bg-contessa-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Marcar como completada
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500 border-t border-gray-200 pt-4">
            <span>Duración: {lesson.duration}</span>
            {lesson.resources && lesson.resources.length > 0 && (
              <span>{lesson.resources.length} recursos disponibles</span>
            )}
          </div>
        </div>
      </div>

      {/* Resources */}
      {lesson.resources && lesson.resources.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Download className="w-5 h-5 mr-2 text-contessa-600" />
            Recursos de la Lección
          </h2>
          
          <div className="grid gap-3">
            {lesson.resources.map((resource) => (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => logEvent('DOWNLOAD', { resource_id: resource.id, lesson_id: lesson.id, course_id: course.id })}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex-shrink-0">
                  {getResourceIcon(resource.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 group-hover:text-contessa-600 transition-colors">
                    {resource.title}
                  </h3>
                  {resource.description && (
                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                  )}
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-contessa-600 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonViewer;
import React from 'react';
import { Play, Clock, BookOpen, Award } from 'lucide-react';
import { Course } from '../types/course';

interface CourseOverviewProps {
  course: Course;
  onStartCourse: (moduleId?: string) => void;
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ course, onStartCourse }) => {
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter(lesson => lesson.completed).length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br  from-contessa-50 via-contessa-100 to-contessa-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {course.description}
            </p>
            
            {/* Course Stats */}
            <div className="flex justify-center space-x-8 mb-10">
              <div className="text-center">
                <div className="bg-white rounded-full p-4 shadow-lg mb-2 inline-block">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Duración</p>
                <p className="font-semibold text-gray-900">{course.duration}</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full p-4 shadow-lg mb-2 inline-block">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Lecciones</p>
                <p className="font-semibold text-gray-900">{totalLessons}</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full p-4 shadow-lg mb-2 inline-block">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600">Progreso</p>
                <p className="font-semibold text-gray-900">{Math.round((completedLessons / totalLessons) * 100)}%</p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onStartCourse()}
              className="bg-contessa-600 hover:bg-contessa-700 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center space-x-3 mx-auto transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Play className="w-6 h-6" />
              <span>{completedLessons > 0 ? 'Continuar Curso' : 'Comenzar Curso'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Course Preview */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-video bg-gray-900 relative">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => onStartCourse()}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-6 transition-all duration-200 transform hover:scale-110"
              >
                <Play className="w-12 h-12 text-contessa-600" />
              </button>
            </div>
          </div>
          
          {/* Course Modules Preview */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contenido del Curso</h2>
            <div className="grid gap-4">
              {course.modules.map((module, index) => (
                <div
                  key={module.id}
                  onClick={() => onStartCourse(module.id)}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer hover:border-contessa-400 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {index + 1}. {module.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{module.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{module.lessons.length} lecciones</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
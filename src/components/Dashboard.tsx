import React from 'react';
import { Users, BookOpen, TrendingUp, Award } from 'lucide-react';
import { mockCourses, mockStudents } from '../data/mockData';

const Dashboard: React.FC = () => {
  const totalStudents = mockStudents.length;
  const totalCourses = mockCourses.length;
  const publishedCourses = mockCourses.filter(c => c.status === 'published').length;
  const avgProgress = Math.round(mockStudents.reduce((acc, s) => acc + s.progress, 0) / totalStudents);

  const stats = [
    {
      title: 'Total Estudiantes',
      value: totalStudents,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Cursos Activos',
      value: publishedCourses,
      icon: BookOpen,
      color: 'bg-green-500',
      change: '+5%'
    },
    {
      title: 'Progreso Promedio',
      value: `${avgProgress}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+8%'
    },
    {
      title: 'Certificados',
      value: 23,
      icon: Award,
      color: 'bg-orange-500',
      change: '+15%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Bienvenido de vuelta, Prof. Juan Pérez</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} vs mes anterior</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estudiantes Recientes</h3>
          <div className="space-y-4">
            {mockStudents.slice(0, 3).map((student) => (
              <div key={student.id} className="flex items-center space-x-4">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-500">Progreso: {student.progress}%</p>
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${student.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento de Cursos</h3>
          <div className="space-y-4">
            {mockCourses.slice(0, 3).map((course) => (
              <div key={course.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{course.title}</p>
                    <p className="text-sm text-gray-500">{course.studentsCount} estudiantes</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{course.progress}%</p>
                  <p className="text-xs text-gray-500">completado</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">¿Listo para crear contenido?</h3>
        <p className="text-contessa-100 mb-4">Sube nuevos videos y organiza tus lecciones de manera efectiva</p>
        <button className="bg-white text-contessa-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Crear Nuevo Curso
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
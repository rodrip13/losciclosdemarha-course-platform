import { Course } from '../types/course';

export const mockCourse: Course = {
  id: '1',
  title: 'Desarrollo Web Completo con React',
  description: 'Aprende React desde cero hasta nivel avanzado con proyectos reales y recursos descargables',
  thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
  duration: '12h 30m',
  modules: [
    {
      id: 'm1',
      title: 'Fundamentos de React',
      description: 'Conceptos básicos y configuración inicial',
      order: 1,
      lessons: [
        {
          id: 'l1',
          title: 'Introducción a React',
          description: 'Qué es React y por qué usarlo en el desarrollo web moderno',
          videoUrl: 'dQw4w9WgXcQ',
          duration: '15:30',
          order: 1,
          completed: true,
          resources: [
            {
              id: 'r1',
              title: 'Guía de instalación React',
              type: 'pdf',
              url: '#',
              description: 'Documento PDF con pasos detallados'
            },
            {
              id: 'r2',
              title: 'Documentación oficial',
              type: 'link',
              url: 'https://react.dev',
              description: 'Enlace a la documentación oficial de React'
            }
          ]
        },
        {
          id: 'l2',
          title: 'Configuración del entorno',
          description: 'Instalación y configuración de herramientas de desarrollo',
          videoUrl: 'dQw4w9WgXcQ',
          duration: '22:15',
          order: 2,
          completed: true,
          resources: [
            {
              id: 'r3',
              title: 'Plantilla de proyecto',
              type: 'download',
              url: '#',
              description: 'Archivo ZIP con configuración inicial'
            }
          ]
        },
        {
          id: 'l3',
          title: 'Tu primer componente',
          description: 'Creando y entendiendo la estructura de componentes',
          videoUrl: 'dQw4w9WgXcQ',
          duration: '18:45',
          order: 3,
          completed: false
        }
      ]
    },
    {
      id: 'm2',
      title: 'Componentes y Props',
      description: 'Creación y uso de componentes reutilizables',
      order: 2,
      lessons: [
        {
          id: 'l4',
          title: 'Props y comunicación entre componentes',
          description: 'Cómo pasar datos entre componentes padre e hijo',
          videoUrl: 'dQw4w9WgXcQ',
          duration: '25:30',
          order: 1,
          completed: false,
          resources: [
            {
              id: 'r4',
              title: 'Ejercicios prácticos',
              type: 'pdf',
              url: '#',
              description: 'Ejercicios para practicar props'
            }
          ]
        },
        {
          id: 'l5',
          title: 'Estado y eventos',
          description: 'Manejo del estado local y eventos en React',
          videoUrl: 'dQw4w9WgXcQ',
          duration: '28:15',
          order: 2,
          completed: false
        }
      ]
    },
    {
      id: 'm3',
      title: 'Hooks y Estado Global',
      description: 'Hooks de React y manejo de estado avanzado',
      order: 3,
      lessons: [
        {
          id: 'l6',
          title: 'useState y useEffect',
          description: 'Los hooks más importantes de React',
          videoUrl: 'dQw4w9WgXcQ',
          duration: '32:20',
          order: 1,
          completed: false
        },
        {
          id: 'l7',
          title: 'Context API',
          description: 'Compartir estado entre componentes sin prop drilling',
          videoUrl: 'dQw4w9WgXcQ',
          duration: '26:45',
          order: 2,
          completed: false
        }
      ]
    }
  ]
};
import { Course } from '../types/course';

export const mockCourse: Course = {
  id: '1',
  title: 'Titulo de cursos de Marhita',
  description: 'Aprende todo lo que Marha te quiere enseñar y ademas con recursos descargables',
  thumbnail: 'public/images/portada-video.jpg',
  duration: '4 semanas',
  modules: [
    {
      id: 'm1',
      title: 'Fundamentos de la embarazada',
      description: 'Conceptos básicos y lineamientos iniciales del curso',
      order: 1,
      lessons: [
        {
          id: 'l1',
          title: 'Introducción',
          description: 'Qué es ser madre',
          videoUrl: 'dQw4w9WgXcQ',
          duration: '15:30',
          order: 1,
          completed: true,
          resources: [
            {
              id: 'r1',
              title: 'Guía de embarazo',
              type: 'pdf',
              url: '#',
              description: 'Documento PDF con pasos detallados'
            },
            {
              id: 'r2',
              title: 'Link a un blog',
              type: 'link',
              url: 'https://losciclosdemarha.uy',
              description: 'Enlace a la página oficial del curso'
            }
          ]
        },
        {
          id: 'l2',
          title: 'Configuración del embarazo',
          description: 'Configuración y herramientas de desarrollo',
          videoUrl: 'dQw4w9WgXcQ',
          duration: '22:15',
          order: 2,
          completed: true,
          resources: [
            {
              id: 'r3',
              title: 'Plantilla de guias',
              type: 'download',
              url: '#',
              description: 'Archivo ZIP con guias iniciales'
            }
          ]
        },
        {
          id: 'l3',
          title: 'Tu primer Bebe',
          description: 'Creando y entendiendo la vida',
          videoUrl: 'dQw4w9WgXcQ',
          duration: '18:45',
          order: 3,
          completed: false
        }
      ]
    },
    {
      id: 'm2',
      title: 'Nace un bebe, nace una familia',
      description: 'Creación y uso de los bebes',
      order: 2,
      lessons: [
        {
          id: 'l4',
          title: 'Titulo 1',
          description: 'Descripcion del titulo 1',
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
              description: 'Ejercicios para practicar'
            }
          ]
        },
        {
          id: 'l5',
          title: 'Estado del bebe',
          description: 'Manejo del bebe y su entorno',
          videoUrl: 'dQw4w9WgXcQ',
          duration: '28:15',
          order: 2,
          completed: false
        }
      ]
    },
    {
      id: 'm3',
      title: 'La familia crece',
      description: 'Eventos que no anticipaste',
      order: 3,
      lessons: [
        {
          id: 'l6',
          title: 'Visitas familiares',
          description: 'Se abordan las visitas y su manejo',
          videoUrl: 'dQw4w9WgXcQ',
          duration: '32:20',
          order: 1,
          completed: false
        },
        {
          id: 'l7',
          title: 'Contexto familiar',
          description: 'Conocer el entorno del bebe',
          videoUrl: 'dQw4w9WgXcQ',
          duration: '26:45',
          order: 2,
          completed: false
        }
      ]
    }
  ]
};
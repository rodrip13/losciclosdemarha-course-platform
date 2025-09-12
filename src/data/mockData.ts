import { Course } from "../types/course";

export const mockCourse: Course = {
  id: "1",
  title: "Bitácora de una familia que nace",
  description:
    "Programa digital de acompañamiento para embarazadas y sus parejas o referentes afectivos.",
  thumbnail: "images/portada-video.jpg",
  duration: "4 semanas",
  modules: [
    {
      id: "m1",
      title: "1- Bienvenida al curso",
      description: "Bienvenida al curso - clase en vivo",
      order: 0,
      lessons: [
        {
          id: "l1",
          title: "Bienvenida",
          description:
            "Clase en vivo, para conocer a las familias y que ellas me conozcan a mí",
          videoUrl: "dQw4w9WgXcQ",
          duration: "15:00",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "Guía de embarazo",
              type: "pdf",
              url: "#",
              description: "Documento PDF con pasos detallados",
            },
            {
              id: "r2",
              title: "Link a un blog",
              type: "link",
              url: "https://losciclosdemarha.uy",
              description: "Enlace a la página oficial del curso",
            },
          ],
        },
        {
          id: "l2",
          title: "Te hablo a ti, pareja o papá",
          description: "Entendiendo el rol del acompañante",
          videoUrl: "dQw4w9WgXcQ",
          duration: "10:00",
          order: 2,
          completed: false,
          resources: [
            {
              id: "r3",
              title: "Sobre el acompañante",
              type: "link",
              url: "losciclosdemarha.uy",
              description: "Blog con información para el acompañante",
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "2- Conectar con tu bebé",
      description:
        "Fortalecer el vínculo desde el útero y habilitar ese canal de conexión y comunicación entre mamá y bebé (y pareja, papá o acompañante si la hubiera)",
      order: 1,
      lessons: [
        {
          id: "l3",
          title: "Importancia del vínculo con el bebé",
          description:
            "Fortalecer el vínculo desde el útero y habilitar ese canal de conexión y comunicación entre mamá y bebé (y pareja, papá o acompañante si la hubiera)",
          videoUrl: "dQw4w9WgXcQ",
          duration: "60:00",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r4",
              title: "Encuentro con el bebé",
              type: "audio",
              url: "#",
              description: "Audio encuentro con el bebé",
            },
            {
              id: "r5",
              title: "Vínculo con el bebé desde la panza",
              type: "pdf",
              url: "#",
              description: "Vínculo con el bebé desde la panza",
            },
          ],
        },
        {
          id: "l4",
          title: "Habilitar el cuerpo que gesta",
          description: "Conectar con el cuerpo gestante",
          videoUrl: "dQw4w9WgXcQ",
          duration: "60:00",
          order: 2,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "El cuerpo que sostiene",
              type: "pdf",
              url: "#",
              description: "El cuerpo que sostiene",
            },
            {
              id: "r2",
              title: "Meditación contacto con tu cuerpo",
              type: "audio",
              url: "https://losciclosdemarha.uy",
              description: "Meditación contacto con tu cuerpo",
            },
            {
              id: "r3",
              title: "Carta a mi cuerpo",
              type: "exercise",
              url: "https://losciclosdemarha.uy",
              description: "Meditación contacto con tu cuerpo",
            },
          ],
        },
      ],
    },
    {
      id: "m3",
      title: "3- Conociendo nuestro cuerpo y la fisiología del nacimiento",
      description: "Conocer el cuerpo y el proceso de parto",
      order: 2,
      lessons: [
        {
          id: "l5",
          title:
            "Cómo es nuestro cuerpo y la fisiología del nacimiento, cómo son las contracciones",
          description: "Se abordan las visitas y su manejo",
          videoUrl: "dQw4w9WgXcQ",
          duration: "32:20",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "Miedos en el embarazo",
              type: "pdf",
              url: "#",
              description: "Miedos en el embarazo",
            },
            {
              id: "r2",
              title: "Motivos de consulta",
              type: "pdf",
              url: "https://losciclosdemarha.uy",
              description: "Motivos de consulta",
            },
            {
              id: "r3",
              title: "Ejercicio de conexión",
              type: "exercise",
              url: "https://losciclosdemarha.uy",
              description: "Ejercicio de conexión",
            },
          ],
        },
      ],
    },
    {
      id: "m4",
      title: "4- Nacimiento ",
      description:
        "Conocer el proceso de parto, la información, las formas de mitigar el dolor",
      order: 3,
      lessons: [
        {
          id: "l6",
          title: "Clase en vivo",
          description:
            "Trabajo de parto y parto, cuando ir a la institución de salud, cómo mitigar el dolor naturalmente y farmacológicamente",
          videoUrl: "dQw4w9WgXcQ",
          duration: "60:00",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "Derechos en el nacimiento",
              type: "pdf",
              url: "#",
              description: "Derechos en el nacimiento",
            },
            {
              id: "r2",
              title: "Apuntes sobre la clase",
              type: "pdf",
              url: "https://losciclosdemarha.uy",
              description: "Puntos clave de la clase",
            },
          ],
        },
      ],
    },
    {
      id: "m5",
      title: "5- Prepara la vuelta a casa",
      description:
        "organizar la vuelta a casa con el bebé, generar un entorno que acompañe",
      order: 2,
      lessons: [
        {
          id: "l7",
          title:
            "Por qué es importante organizar la vuelta a casa, cosas a organizar",
          description:
            "Por qué es importante organizar la vuelta a casa, cosas a organizar",
          videoUrl: "dQw4w9WgXcQ",
          duration: "32:20",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "Check list vuelta a casa",
              type: "pdf",
              url: "#",
              description: "Check list vuelta a casa",
            },
            {
              id: "r2",
              title: "Quien me va a sostener",
              type: "exercise",
              url: "https://losciclosdemarha.uy",
              description: "Quien me va a sostener",
            },
          ],
        },
      ],
    },
    {
      id: "m6",
      title: "6- El posparto, prepararse para el después",
      description:
        "Anticipar el puerperio con honestidad, información y contención",
      order: 2,
      lessons: [
        {
          id: "l8",
          title: "Qué es el puerperio",
          description: "Qué es el puerperio",
          videoUrl: "dQw4w9WgXcQ",
          duration: "32:20",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "La madre que nace",
              type: "audio",
              url: "#",
              description: "Check list vuelta a casa",
            },
            {
              id: "r2",
              title: "Guía del puerperio",
              type: "exercise",
              url: "https://losciclosdemarha.uy",
              description: "Quien me va a sostener",
            },
            {
              id: "r2",
              title: "actividad en pareja",
              type: "exercise",
              url: "https://losciclosdemarha.uy",
              description: "Lo que necesito de vos",
            },
          ],
        },
      ],
    },
  ],
};

import { Course } from "../types/course";

export const mockCourse: Course = {
  id: "1",
  title: "Nacer acompañadas",
  description: "Programa integral para antes, durante y después del nacimiento. Preparación integral para el nacimiento y el puerperio dirigida a familias. Basado en el Método Ciclos de Marha: Información clara + Trabajo corporal + Contención emocional.",
  thumbnail: "images/portada-video.jpg",
  duration: "4 semanas",
  modules: [
    {
      id: "m1",
      title: "Bienvenida",
      description: "Bienvenida al curso",
      order: 0,
      lessons: [
        {
          id: "l1",
          title: "Bienvenida al curso",
          description:
            "",
          videoUrl: "JbAl14zs1SU",
          duration: "",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "Link a mi blog",
              type: "link",
              url: "https://losciclosdemarha.uy/blog",
              description: "Enlace a mi blog personal",
            },
          ],
        },
        {
          id: "l2",
          title: "Te hablo a ti, pareja o papá",
          description: "Entendiendo el rol del acompañante",
          videoUrl: "",
          duration: "",
          order: 2,
          completed: false,
          resources: [
            {
              id: "r3",
              title: "Sobre el acompañante",
              type: "link",
              url: "losciclosdemarha.uy/blog",
              description: "Blog con información para el acompañante",
            },
          ],
        },
        {
          id: "l3",
          title: "Clase en vivo",
          description: "Clase en vivo, para conocer a las familias y que ellas me conozcan a mí - martes 11 de noviembre a las 19:30",
          videoUrl: "",
          duration: "",
          order: 2,
          completed: false,
          resources: [
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Conectar con tu bebé",
      description: "Fortalecer el vínculo desde el útero y habilitar ese canal de conexión y comunicación entre mamá y bebé (y pareja, papá o acompañante si la hubiera)",
      order: 1,
      lessons: [
        {
          id: "l4",
          title: "Clase en vivo",
          description: "Vínculo con tu bebé: creando conexión con tu hijo/a desde la gestación. Clase en vivo el 14 de noviembre a las 19:30",
          videoUrl: "",
          duration: "",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r4",
              title: "Vínculo con el bebé desde la panza",
              type: "pdf",
              url: "actividades-vinculo-con-tu-bebe.pdf",
              description: "Vínculo con el bebé desde la panza",
            },
          ],
        },
        {
          id: "l5",
          title: "Habitar el cuerpo que gesta",
          description: "Conectar con el cuerpo gestante",
          videoUrl: "JbAl14zs1SU",
          duration: "60:00",
          order: 2,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "Tu cuerpo sabio",
              type: "pdf",
              url: "tu-cuerpo-sabio.pdf",
              description: "Desarrolla la confianza hacia vos misma y tu poder de dar lugar al nacimiento de tu hijo",
            },
            {
              id: "r2",
              title: "Meditación guiada para conectar con tu cuerpo",
              type: "audio",
              url: "audios/meditacion-conexion-con-tu-cuerpo.mp3",
              description: "Meditación guiada para conectar con tu cuerpo",
            }
          ],
        },
      ],
    },
    {
      id: "m3",
      title: "Conociendo nuestro cuerpo y la fisiología del nacimiento",
      description: "Conocer el cuerpo y el proceso de parto",
      order: 2,
      lessons: [
        {
          id: "l6",
          title: "Clase en vivo",
          description: "Tu Cuerpo, Tu Aliado. Descubriendo tu poder natural para el nacimiento. -Clase en vivo el 21 de noviembre a las 19:30.",
          videoUrl: "JbAl14zs1SU",
          duration: "",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "Miedos en el embarazo",
              type: "pdf",
              url: "miedos-en-el-embarazo.pdf",
              description: "Transformando temores en tranquilidad",
            },
            {
              id: "r2",
              title: "Motivos de consulta",
              type: "pdf",
              url: "motivos-de-consulta-en-emergencia.pdf",
              description: "Motivos de consulta en emergencia. Cuándo, cómo y por qué pedir ayuda médica a tiempo.",
            }
          ],
        },
      ],
    },
    {
      id: "m4",
      title: "Nacimiento ",
      description: "Conocer el proceso de parto, la información, las formas de mitigar el dolor",
      order: 3,
      lessons: [
        {
          id: "l7",
          title: "Clase en vivo -Taller de nacimiento.",
          description: "Clase en vivo el 28 de noviembre a las 19:30 (quedará grabada y disponible en la plataforma) Taller de Nacimiento",
          videoUrl: "JbAl14zs1SU",
          duration: "",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "Mi parto, mis decisiones. -Uruguay-",
              type: "pdf",
              url: "derechos-en-el-embarazo-y-parto-uruguay.pdf",
              description: "Mi parto, mis decisiones. Derechos en el nacimiento.",
            },
            {
              id: "r2",
              title: "Mi parto, mis decisiones. -Argentina-",
              type: "pdf",
              url: "derechos-en-el-embarazo-y-parto-argentina.pdf",
              description: "Mi parto, mis decisiones. Derechos en el nacimiento.",
            },
            {
              id: "r3",
              title: "Tu guía para el gran día.",
              type: "pdf",
              url: "nacimiento-tu-guia-para-el-gran-dia.pdf",
              description: "Puntos esenciales para recordar lo que necesitas antes del nacimiento.",
            },
          ],
        },
      ],
    },
    {
      id: "m5",
      title: "Prepara la vuelta a casa",
      description: "Organizar la vuelta a casa con el bebé, generar un entorno que acompañe",
      order: 4,
      lessons: [
        {
          id: "l8",
          title: "Clase en vivo -Vuelta a casa. Tu hogar preparado para el bebé y vos.",
          description: "Clase en vivo el 5 de diciembre a las 19:30 (quedará grabada y disponible en la plataforma) Vuelta a casa. Tu hogar preparado para el bebé y vos.",
          videoUrl: "JbAl14zs1SU",
          duration: "",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "Check list vuelta a casa",
              type: "pdf",
              url: "check-list-vuelta-a-casa-organizada.pdf",
              description: "Check list vuelta a casa organizada",
            }
          ],
        },
      ],
    },
    {
      id: "m6",
      title: "El posparto, prepararse para el después",
      description: "Anticipar el puerperio con honestidad, información y contención",
      order: 5,
      lessons: [
        {
          id: "l9",
          title: "Clase en vivo -Puerperio",
          description: "Clase en vivo el 12 de diciembre a las 19:30 (quedará grabada y disponible en la plataforma) Puerperio. Una guía para transitar el postparto con herramientas.",
          videoUrl: "JbAl14zs1SU",
          duration: "",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "La madre que nace. Descubriendo tu esencia maternal.",
              type: "audio",
              url: "audios/meditacion-mama-que-nace.mp3",
              description: "Meditación para la madre que nace.",
            },
            {
              id: "r2",
              title: "El puerperio inmediato.",
              type: "pdf",
              url: "puerperio-inmediato.pdf",
              description: "Tus primeros 40 días como mamá. Guía completa para transitar tus cambios corporales y emocionales.",
            }
          ],
        },
      ],
    },
    {
      id: "m7",
      title: "Final",
      description: "Modulo final",
      order: 5,
      lessons: [
        {
          id: "l10",
          title: "Clase en vivo -Final",
          description: "Clase en vivo el 16 de diciembre a las 19:30 (quedará grabada y disponible en la plataforma) Puerperio. Una guía para transitar el postparto con herramientas.",
          videoUrl: "JbAl14zs1SU",
          duration: "",
          order: 1,
          completed: false,
          resources: [
          ],
        },
      ],
    },
        {
      id: "m8",
      title: "BONUS",
      description: "Modulo Bonus",
      order: 5,
      lessons: [
        {
          id: "l11",
          title: "Meditación",
          description: "Meditación despedida de la panza grabada",
          videoUrl: "",
          duration: "",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "Meditación despedida de la panza grabada",
              type: "audio",
              url: "audios/despedida-de-la-panza.mp3",
              description: "Meditación despedida de la panza grabada.",
            },
          ],
        },
        {
          id: "l12",
          title: "Bitácora de la familia.",
          description: "Bitácora de la familia: manual imprimible de preparación completo para el nacimiento.",
          videoUrl: "",
          duration: "",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "Bitácora de la familia.",
              type: "pdf",
              url: "pdfs/bitacora-de-una-madre-que-nace.pdf",
              description: "Bitácora de la familia: manual imprimible de preparación completo para el nacimiento.",
            },
          ],
        },
        {
          id: "l13",
          title: "Pack de afirmaciones imprimibles para embarazo, nacimiento y puerperio.",
          description: "Pack de afirmaciones imprimibles para embarazo, nacimiento y puerperio.",
          videoUrl: "",
          duration: "",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "Pack de afirmaciones imprimibles para embarazo, nacimiento y puerperio.",
              type: "pdf",
              url: "pdfs/pack-de-afirmaciones-imprimibles.pdf",
              description: "Pack de afirmaciones imprimibles para embarazo, nacimiento y puerperio.",
            },
          ],
        },
        {
          id: "l14",
          title: "Compras esenciales y presupuesto inteligente para el bebé.",
          description: "Masterclass.",
          videoUrl: "Rpj1D5ywTVM",
          duration: "",
          order: 1,
          completed: false,
          resources: [
          ],
        },
        {
          id: "l15",
          title: "Guía para la comunicación y acuerdos con la pareja y la familia.",
          description: "Para poder ser equipo de crianza, y además adaptarse a la nueva etapa sin generar distancia.",
          videoUrl: "",
          duration: "",
          order: 1,
          completed: false,
          resources: [
            {
              id: "r1",
              title: "Guía para la comunicación y acuerdos con la pareja y la familia.",
              type: "pdf",
              url: "pdfs/comunicacion-con-la-pareja.pdf",
              description: "Guía para la comunicación y acuerdos con la pareja y la familia.",
            },
          ],
        },
        {
          id: "l16",
          title: "Minicurso: Primeros 30 días del bebé.",
          description: "Primeros 30 días del bebé: lactancia, colecho sí o no, decisiones importantes y cuidados básicos.",
          videoUrl: "RGQUYeC9F4g",
          duration: "",
          order: 1,
          completed: false,
          resources: [
          ],
        },
        {
          id: "l17",
          title: "Cuidar a quien cuida: hablemos de puerperio",
          description: "Taller en vivo online grupal.",
          videoUrl: "",
          duration: "",
          order: 1,
          completed: false,
          resources: [
          ],
        },
      ],
    },
  ],
};

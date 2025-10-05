# Documentación Técnica del Proyecto

## 1. Descripción General del Proyecto

Este proyecto es una plataforma de visualización de cursos en línea, diseñada para ofrecer una experiencia de aprendizaje interactiva. La aplicación permite a los usuarios navegar por los módulos y lecciones de un curso, ver videos, acceder a recursos y seguir su progreso.

### Tecnologías Utilizadas

*   **Framework:** React
*   **Lenguaje:** TypeScript
*   **Herramienta de Build:** Vite
*   **Estilos:** Tailwind CSS

## 2. "Endpoints" de la Aplicación (Vistas)

Dado que esta es una aplicación de frontend que utiliza datos de prueba (mock data), no existen "endpoints" de API en el sentido tradicional. En su lugar, la aplicación se compone de varias vistas que cargan datos localmente. A continuación, se describen las vistas principales y los datos que utilizan.

### 2.1. Vista de Login

*   **Propósito:** Autenticar al usuario para acceder a la plataforma.
*   **Acceso:** Es la primera pantalla que se muestra al abrir la aplicación.
*   **Ejemplo de Credenciales (JavaScript):**
    ```javascript
    const credentials = {
      email: "rodrip@demo.com",
      password: "rodrip"
    };
    ```

### 2.2. Vista General del Curso (`CourseOverview`)

*   **Propósito:** Mostrar una visión general del curso, incluyendo su título, descripción y la lista de módulos y lecciones. Desde aquí, el usuario puede iniciar el curso.
*   **Acceso:** Se muestra después de que el usuario se autentica correctamente.
*   **Ejemplo de Datos del Curso (JavaScript):**
    ```javascript
    const course = {
      id: "1",
      title: "Bitácora de una familia que nace",
      description: "Programa digital de acompañamiento para embarazadas y sus parejas o referentes afectivos.",
      thumbnail: "images/portada-video.jpg",
      duration: "4 semanas",
      modules: [
        {
          id: "m1",
          title: "1- Bienvenida al curso",
          lessons: [
            {
              id: "l1",
              title: "Bienvenida",
              completed: false
            }
          ]
        }
      ]
    };
    ```

### 2.3. Visor de Lecciones (`LessonViewer`)

*   **Propósito:** Mostrar el contenido de una lección específica, incluyendo el video y los recursos asociados. Permite al usuario marcar una lección como completada y navegar a la lección anterior o siguiente.
*   **Acceso:** Se accede a esta vista al hacer clic en una lección desde la vista general del curso o desde la barra lateral.
*   **Ejemplo de Datos de la Lección (JavaScript):**
    ```javascript
    const lesson = {
      id: "l1",
      title: "Bienvenida",
      description: "Clase en vivo, para conocer a las familias y que ellas me conozcan a mí",
      videoUrl: "dQw4w9WgXcQ",
      duration: "15:00",
      completed: false,
      resources: [
        {
          id: "r1",
          title: "Guía de embarazo",
          type: "pdf",
          url: "#"
        }
      ]
    };
    ```

## 3. Aclaración sobre `curl`

Debido a que la aplicación no se comunica con un servidor a través de una API REST, no es posible proporcionar ejemplos de `curl`. Toda la información se carga desde el archivo `src/data/mockData.ts`, y las interacciones del usuario actualizan el estado de la aplicación localmente.

## 4. Modelo de Base de Datos Sugerido

A continuación, se presenta un modelo de base de datos relacional que podría respaldar esta aplicación. Este diseño está basado en la estructura de los datos de prueba y está pensado para ser escalable.

### Tabla: `Courses`

Almacena la información principal de cada curso.

| Columna     | Tipo         | Descripción                               |
|-------------|--------------|-------------------------------------------|
| `id`        | `SERIAL`     | Clave primaria (autoincremental)          |
| `title`     | `VARCHAR(255)`| Título del curso.                         |
| `description`| `TEXT`       | Descripción detallada del curso.          |
| `thumbnail` | `VARCHAR(255)`| URL de la imagen de portada.              |
| `duration`  | `VARCHAR(100)`| Duración total estimada del curso.        |

### Tabla: `Modules`

Organiza las lecciones en módulos dentro de un curso.

| Columna     | Tipo         | Descripción                               |
|-------------|--------------|-------------------------------------------|
| `id`        | `SERIAL`     | Clave primaria.                           |
| `course_id` | `INTEGER`    | Clave foránea que referencia a `Courses(id)`.|
| `title`     | `VARCHAR(255)`| Título del módulo.                        |
| `description`| `TEXT`       | Descripción del contenido del módulo.     |
| `module_order`| `INTEGER`    | Orden del módulo dentro del curso.        |

### Tabla: `Lessons`

Contiene el contenido de cada lección individual.

| Columna     | Tipo         | Descripción                               |
|-------------|--------------|-------------------------------------------|
| `id`        | `SERIAL`     | Clave primaria.                           |
| `module_id` | `INTEGER`    | Clave foránea que referencia a `Modules(id)`.|
| `title`     | `VARCHAR(255)`| Título de la lección.                     |
| `description`| `TEXT`       | Descripción del contenido de la lección.  |
| `video_url` | `VARCHAR(255)`| URL del video de la lección.              |
| `duration`  | `VARCHAR(50)`| Duración del video.                       |
| `lesson_order`| `INTEGER`    | Orden de la lección dentro del módulo.    |

### Tabla: `Resources`

Almacena los recursos adicionales asociados a cada lección.

| Columna     | Tipo         | Descripción                               |
|-------------|--------------|-------------------------------------------|
| `id`        | `SERIAL`     | Clave primaria.                           |
| `lesson_id` | `INTEGER`    | Clave foránea que referencia a `Lessons(id)`.|
| `title`     | `VARCHAR(255)`| Título del recurso.                       |
| `type`      | `VARCHAR(50)`| Tipo de recurso (ej. 'pdf', 'link', 'audio').|
| `url`       | `VARCHAR(255)`| URL para acceder al recurso.              |
| `description`| `TEXT`       | Descripción del recurso.                  |

### Tabla: `UserLessonProgress`

Realiza un seguimiento del progreso de cada usuario en cada lección. Esto permite un seguimiento individualizado, a diferencia del booleano `completed` en los datos de prueba.

| Columna     | Tipo      | Descripción                               |
|-------------|-----------|-------------------------------------------|
| `user_id`   | `INTEGER` | Clave foránea que referencia a una tabla `Users`. |
| `lesson_id` | `INTEGER` | Clave foránea que referencia a `Lessons(id)`. |
| `completed` | `BOOLEAN` | `true` si el usuario completó la lección.   |
| **Clave Primaria Compuesta:** (`user_id`, `lesson_id`) | | |
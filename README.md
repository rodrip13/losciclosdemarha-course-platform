# EduPlatform - Plataforma de Cursos

Este es el frontend para una plataforma de gestión y visualización de cursos, construida con tecnologías web modernas. La aplicación permite a los usuarios (estudiantes o instructores) iniciar sesión, ver el progreso, navegar por los cursos y lecciones, y gestionar estudiantes.

El proyecto está desarrollado con React, TypeScript y Vite, y utiliza Tailwind CSS para un diseño rápido y moderno.

 <!-- Reemplaza con una captura de pantalla real -->

## ✨ Características Principales

*   **Autenticación de Usuario:** Formulario de inicio de sesión con validación y credenciales de demostración.
*   **Dashboard Principal:** Vista general con estadísticas clave como total de estudiantes, cursos activos y progreso promedio.
*   **Gestión de Cursos:** Interfaz para visualizar una lista de cursos en formato de tarjetas, mostrando su estado, progreso y estadísticas.
*   **Vista de Curso Detallada:** Navegación a través de módulos y lecciones de un curso específico.
*   **Visor de Lecciones:** Reproductor de video para lecciones, con navegación entre la lección anterior y la siguiente.
*   **Gestión de Estudiantes:** Tabla para visualizar, buscar y ordenar la lista de estudiantes y su progreso.
*   **Diseño Moderno y Responsivo:** Interfaz limpia construida con Tailwind CSS y componentes reutilizables.

## 🛠️ Tecnologías Utilizadas

*   **Framework:** [React](https://reactjs.org/)
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
*   **Herramienta de Build:** [Vite](https://vitejs.dev/)
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
*   **Iconos:** [Lucide React](https://lucide.dev/)
*   **Linting:** [ESLint](https://eslint.org/)

## 📂 Estructura del Proyecto

La estructura de carpetas principal es la siguiente:

```
/src
|-- /assets         # Archivos estáticos como imágenes
|-- /components     # Componentes reutilizables de React
|-- /data           # Datos de prueba (mock data)
|-- /types          # Definiciones de tipos de TypeScript
|-- App.tsx         # Componente principal y lógica de navegación
|-- main.tsx        # Punto de entrada de la aplicación
```

## 🚀 Cómo Empezar

Sigue estos pasos para tener una copia del proyecto corriendo en tu máquina local.

### Prerrequisitos

Asegúrate de tener [Node.js](https://nodejs.org/) (versión 18 o superior) instalado.

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd Toti-cursos
    ```

2.  **Instala las dependencias:**
    Se instalarán todas las librerías necesarias para el proyecto.
    ```bash
    npm install
    ```

3.  **Ejecuta el servidor de desarrollo:**
    Este comando iniciará la aplicación en modo de desarrollo con hot-reloading.
    ```bash
    npm run dev
    ```

    Abre [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal) en tu navegador para ver la aplicación.

### 🔑 Credenciales de Demostración

Para acceder a la plataforma, utiliza las siguientes credenciales en el formulario de login:

*   **Email:** `estudiante@demo.com`
*   **Contraseña:** `demo123`

## 📜 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

*   `npm run dev`: Inicia la aplicación en modo de desarrollo.
*   `npm run build`: Compila la aplicación para producción en la carpeta `dist`.
*   `npm run lint`: Ejecuta el linter para encontrar y corregir problemas en el código.
*   `npm run preview`: Sirve localmente la build de producción para previsualizarla.

---

*Este README fue generado para ayudarte a entender y empezar a trabajar en el proyecto.*
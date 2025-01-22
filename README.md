# Documentación de la Aplicación Web "Escuela"

## Descripción General
La aplicación web **"Escuela"** es una plataforma diseñada para gestionar información académica, incluyendo grupos, estudiantes y asignaturas. Desarrollada por **JPLY-XYZ**, esta herramienta facilita la administración y consulta de datos educativos de manera eficiente.

---

## Funcionalidades Principales

- **Gestión de Grupos**: Permite la visualización de diferentes grupos académicos.
- **Administración de Estudiantes**: Facilita la visualizacion de estudiantes asociados a cada grupo.
- **Manejo de Asignaturas**: Ofrece la capacidad de visualizar las materias correspondientes a cada grupo o estudiante.

---

## Tecnologías Utilizadas

- **Next.js**: Framework de React que permite la generación de aplicaciones web optimizadas y con renderizado del lado del servidor.
- **Prisma**: ORM (Object-Relational Mapping) que simplifica las operaciones con bases de datos, proporcionando una interfaz intuitiva para interactuar con los datos.
- **Vercel**: Plataforma de despliegue que facilita la implementación y hosting de aplicaciones web con alta disponibilidad y rendimiento.

---

## Estructura del Proyecto

El proyecto está estructurado para mantener una separación clara entre las diferentes funcionalidades:

- **Páginas**: Contiene las rutas principales de la aplicación, como `/grupos`, `/estudiantes` y `/asignaturas`.
- **Componentes**: Incluye componentes reutilizables que conforman la interfaz de usuario, garantizando consistencia y modularidad.
- **Prisma**: Directorio que alberga el esquema de la base de datos y las configuraciones relacionadas con el ORM.

---

## Instalación y Despliegue

### Ejecución Local
Sigue los siguientes pasos para ejecutar la aplicación localmente:

1. **Clonar el repositorio**:
    ```bash
    git clone https://github.com/JPLY-XYZ/escuela.git
    ```

2. **Instalar las dependencias**:
    ```bash
    cd escuela
    npm install
    ```

3. **Configurar las variables de entorno**: Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
    ```env
    DATABASE_URL="url_de_tu_base_de_datos"
    ```

4. **Ejecutar las migraciones de Prisma**:
    ```bash
    npx prisma migrate dev --name init
    ```

5. **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Despliegue en Vercel

1. **Importar el proyecto**: Inicia sesión en [Vercel](https://vercel.com) y selecciona la opción para importar un nuevo proyecto desde GitHub.
2. **Configurar las variables de entorno**: En el panel de configuración del proyecto en Vercel, establece las variables de entorno necesarias, como `DATABASE_URL`.
3. **Definir el comando de build**:
    ```bash
    prisma generate && next build
    ```
4. **Iniciar el despliegue**: Confirma la configuración y despliega la aplicación.

Una vez desplegada, la aplicación estará accesible en el dominio proporcionado por Vercel.

---

## Contribuciones

Las contribuciones al proyecto son bienvenidas. Para reportar errores o proponer mejoras, por favor abre un **issue** en el [repositorio oficial](https://github.com/JPLY-XYZ/PrismaNextProject-JPLY).

---

## Licencia

CREADO PARA DAW-2º 2024-25 

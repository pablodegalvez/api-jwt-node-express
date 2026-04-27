# API REST con Autenticación JWT 

Este proyecto es una API REST desarrollada con **Node.js** y **Express** para la gestión de usuarios y autenticación segura mediante tokens.

##  Mejoras y Actualizaciones
Realizado en base a un curso, este proyecto ha sido actualizado con tecnologías modernas:
- **Day.js**: Implementado para el manejo de fechas y expiración de tokens (sustituyendo a Moment.js).
- **Multer**: Utilizado para la gestión de subida de archivos/avatares (sustituyendo a connect-multiparty).
- **Dotenv**: Protección de claves sensibles mediante variables de entorno.

##  Tecnologías utilizadas
*   Node.js & Express
*   MongoDB & Mongoose
*   JWT (JSON Web Tokens)
*   Bcryptjs (Encriptación de contraseñas)

##  Instalación y uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz basado en el archivo `.env.example`.
4. Levanta el servidor:
   ```bash
   npm start
   ```

##  Funcionalidades
- **Users**: Registro, Login y gestión de perfil (Avatar).
- **Tasks**: CRUD completo (Crear, Leer, Actualizar y Borrar tareas) vinculado al usuario autenticado.

##  Pruebas con Insomnia

Para facilitar las pruebas de la API, se incluye una colección con todas las peticiones listas para importar (Users y Tasks).

1. Descarga el archivo que se encuentra en: [`/docs/Insomnia_collection.yaml`](./docs/Insomnia_collection.yaml)
2. Abre **Insomnia**.
3. Haz clic en **Import** -> **File** y selecciona el archivo descargado.


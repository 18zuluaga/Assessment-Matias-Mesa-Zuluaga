
# Sistema de Gestión de Citas para Clínica 🏥

## Descripción del Proyecto 💡
Este proyecto es una solución para la gestión de citas médicas en una clínica privada. Está desarrollado con **NestJS** y proporciona funcionalidades como el agendamiento de citas, gestión de disponibilidad de médicos, historial de citas y más.

### Características ✨
- **Gestión de Citas**: Permite crear, ver y modificar citas 📅.
- **Gestión de Usuarios**: Diferentes roles de usuario (Administrador, Médico, Paciente) 👩‍⚕️👨‍⚕️👨‍💻.
- **Autenticación JWT**: Login con JWT para seguridad en los endpoints 🔒.
- **Control de Disponibilidad**: Los médicos pueden gestionar sus horarios para evitar citas duplicadas ⏰.
- **Historial de Citas**: Los pacientes y médicos pueden ver el historial de citas pasadas 🗂️.

## Variables de Entorno ⚙️

Este proyecto utiliza variables de entorno para configurar aspectos como la base de datos y la clave secreta para el JWT. Asegúrate de crear un archivo `.env` en la raíz de tu proyecto con las siguientes variables:

```plaintext
JWT_SECRET=your-secret-key
DATABASE_URL=urlbased
```

**Explicación:**
- `JWT_SECRET`: Es la clave secreta utilizada para firmar los tokens JWT. Asegúrate de usar una clave secreta fuerte y única 🔑.
- `DATABASE_URL`: La URL de tu base de datos. Puede ser algo como `postgresql://user:password@localhost:5432/mydb` 🌐.

## Instalación 🛠️

### Requisitos 📜
- Node.js (recomendado v14 o superior) ⚙️
- PostgreSQL o cualquier otra base de datos que uses 🗃️
- NestJS CLI ⚡

### Paso 1: Clonar el repositorio 📥
```bash
git clone https://github.com/tuusuario/proyecto.git
cd proyecto
```

### Paso 2: Instalar dependencias 🧩
```bash
npm install
```

### Paso 3: Configurar las variables de entorno 📝
Crea un archivo `.env` en la raíz del proyecto con las siguientes líneas:

```plaintext
JWT_SECRET=your-secret-key
DATABASE_URL=urlbased
```

### Paso 4: Iniciar la aplicación 🚀
```bash
npm run start:dev
```

La aplicación se ejecutará en `http://localhost:3000`.

## Swagger 📜

Una vez que la aplicación esté en funcionamiento, puedes acceder a la documentación de la API a través de Swagger en la siguiente URL:

```
http://localhost:3000/api
```

## Endpoints 📌

### Usuarios 🧑‍💻

- **POST** `/users`: Crear un nuevo usuario.
- **GET** `/users`: Obtener todos los usuarios.
- **GET** `/users/{id}`: Obtener un usuario por ID.
- **PATCH** `/users/{id}`: Actualizar un usuario.
- **DELETE** `/users/{id}`: Eliminar un usuario.

### Citas 📅

- **POST** `/appointments`: Crear una nueva cita.
- **GET** `/appointments/DoctorAvailability`: Ver disponibilidad de los médicos.
- **GET** `/appointments/findMyAppointment`: Ver citas de un paciente.
- **GET** `/appointments/findByPatient{id}`: Ver citas por paciente.
- **GET** `/appointments/findByDoctor{id}`: Ver citas por médico.
- **GET** `/appointments/findByStartTime{StartTime}`: Ver citas por horario de inicio.
- **GET** `/appointments/{id}`: Ver detalles de una cita por ID.
- **PATCH** `/appointments/{id}`: Actualizar una cita.
- **DELETE** `/appointments/{id}`: Eliminar una cita.
- **PATCH** `/appointments/ChangesStatus{id}`: Cambiar el estado de una cita.

### Autenticación 🔑

- **POST** `/auth/login`: Login.
- **POST** `/auth/register`: Registro de usuario.

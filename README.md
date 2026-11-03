# Dulce Aroma - Aplicación Full-Stack

## Descripción
Aplicación web full-stack para gestionar el catálogo de una pastelería. Los usuarios se registran, inician sesión y administran sus propios productos (listar, crear, editar y eliminar). Cada usuario solo ve y modifica los registros que él creó.

## Tecnologías
- **Frontend:** React, TypeScript, Vite, React Router, TanStack Query, Tailwind CSS
- **Backend:** Node.js, Express
- **Base de datos:** MongoDB con Mongoose
- **Seguridad:** bcryptjs (hash de contraseñas) y JSON Web Token (JWT)

## Requisitos previos
- Node.js 18 o superior
- npm
- MongoDB instalado localmente, o una cuenta gratuita en MongoDB Atlas
- Git

## Instalación

1. Clona el repositorio:
   ```bash
   git clone git clone [https://github.com/Warpath-afk/proyecto-fullstack.git]
   cd proyecto-fullstack
   ```
2. Instala las dependencias del backend:
   ```bash
   cd server
   npm install
   ```
3. Instala las dependencias del frontend:
   ```bash
   cd ../client
   npm install
   ```

## Variables de entorno

Copia cada archivo `.env.example` como `.env` y completa los valores.

**`server/.env`**
```
PORT=3001
MONGO_URI=mongodb://localhost:27017/pasteleria_db
JWT_SECRET=una_clave_larga_y_secreta
```

**`client/.env`**
```
VITE_API_URL=http://localhost:3001
```

## Conexión a MongoDB

- **Local:** instala MongoDB, verifica que el servicio esté corriendo y usa `mongodb://localhost:27017/pasteleria_db`.
- **MongoDB Atlas:** crea un cluster gratuito, un usuario de base de datos y permite tu IP. Copia la cadena de conexión en `MONGO_URI`, con tu usuario y contraseña reales.

## Ejecución en modo desarrollo

Abre dos terminales:

```bash
# Terminal 1 - backend (http://localhost:3001)
cd server
npm run dev

# Terminal 2 - frontend (http://localhost:5173)
cd client
npm run dev
```

## Funcionalidades

- Registro de usuarios con contraseña cifrada (bcrypt)
- Inicio de sesión con token JWT
- Rutas del backend protegidas con middleware (`Authorization: Bearer <token>`)
- Rutas del frontend protegidas: `/menu` exige sesión
- CRUD de pasteles: listar, crear, editar y eliminar (con confirmación)
- Cada usuario solo accede a sus propios registros
- Validación de formularios y mensajes de error y de éxito

## API

| Método | Ruta | Descripción | Requiere token |
|--------|------|-------------|----------------|
| POST | `/api/auth/registro` | Crear cuenta | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/pasteles` | Listar mis pasteles | Sí |
| POST | `/api/pasteles` | Crear pastel | Sí |
| PUT | `/api/pasteles/:id` | Editar pastel | Sí |
| DELETE | `/api/pasteles/:id` | Eliminar pastel | Sí |

## Repositorio
[https://github.com/Warpath-afk/proyecto-fullstack]
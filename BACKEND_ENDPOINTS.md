# Lista de Endpoints para el Backend

## Configuración Inicial

### Variables de Entorno Requeridas
```bash
# Frontend
REACT_APP_API_URL=http://localhost:3001/api  # URL del backend

# Backend (sugerencias)
PORT=3001
JWT_SECRET=tu_jwt_secret_key
DB_URL=tu_database_url
CORS_ORIGIN=http://localhost:3000  # URL del frontend
```

### Headers Requeridos
Todas las peticiones autenticadas deben incluir:
```json
{
  "Authorization": "Bearer {jwt_token}",
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

---

## 🔐 ENDPOINTS DE AUTENTICACIÓN

### 1. Login
**POST** `/api/auth/login`
```json
// Request Body
{
  "email": "usuario@universidadeuropea.es",
  "password": "password123"
}

// Response (200)
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "name": "Ana García",
    "email": "ana.garcia@universidadeuropea.es",
    "role": "coordinador"  // o "profesor"
  }
}

// Error (401)
{
  "error": "Credenciales inválidas",
  "message": "Email o contraseña incorrectos"
}
```

### 2. Logout
**POST** `/api/auth/logout`
```json
// Headers: Authorization required
// Response (200)
{
  "message": "Sesión cerrada correctamente"
}
```

### 3. Obtener Usuario Actual
**GET** `/api/auth/me`
```json
// Headers: Authorization required
// Response (200)
{
  "id": "1",
  "name": "Ana García",
  "email": "ana.garcia@universidadeuropea.es",
  "role": "coordinador"
}

// Error (401)
{
  "error": "Token inválido",
  "message": "Token expirado o inválido"
}
```

### 4. Renovar Token
**POST** `/api/auth/refresh`
```json
// Headers: Authorization required
// Response (200)
{
  "token": "nuevo_jwt_token_string",
  "user": {
    "id": "1",
    "name": "Ana García",
    "email": "ana.garcia@universidadeuropea.es",
    "role": "coordinador"
  }
}
```

---

## 📚 ENDPOINTS DE MEMORIAS (TITULACIONES)

### 5. Obtener Todas las Memorias
**GET** `/api/memorias`
```json
// Headers: Authorization required
// Response (200)
[
  {
    "id": "1",
    "nombre": "Grado en Ingeniería Informática",
    "descripcion": "Titulación en Ingeniería Informática",
    "fechaCreacion": "2024-01-15T10:00:00Z",
    "estado": "activa",
    "materias": [
      {
        "id": "1",
        "nombre": "Programación I",
        "codigo": "INFO101",
        "creditos": 6,
        "curso": 1,
        "semestre": 1
      }
    ]
  }
]
```

### 6. Obtener Memoria por ID
**GET** `/api/memorias/{id}`
```json
// Headers: Authorization required
// Response (200)
{
  "id": "1",
  "nombre": "Grado en Ingeniería Informática",
  "descripcion": "Titulación en Ingeniería Informática",
  "fechaCreacion": "2024-01-15T10:00:00Z",
  "estado": "activa",
  "materias": [
    {
      "id": "1",
      "nombre": "Programación I",
      "codigo": "INFO101",
      "creditos": 6,
      "curso": 1,
      "semestre": 1,
      "guias": [
        {
          "id": "1",
          "titulo": "Guía de Programación I",
          "estado": "borrador",
          "fechaModificacion": "2024-01-20T15:30:00Z"
        }
      ]
    }
  ]
}
```

### 7. Crear Nueva Memoria (Solo Coordinadores)
**POST** `/api/memorias`
```json
// Headers: Authorization required
// Content-Type: multipart/form-data para archivos
// Request Body (FormData)
{
  "nombre": "Nueva Titulación",
  "descripcion": "Descripción de la titulación",
  "archivo": File  // PDF o DOCX
}

// Response (201)
{
  "id": "2",
  "nombre": "Nueva Titulación",
  "descripcion": "Descripción de la titulación",
  "fechaCreacion": "2024-01-25T10:00:00Z",
  "estado": "activa"
}

// Error (403)
{
  "error": "Acceso denegado",
  "message": "Solo los coordinadores pueden crear memorias"
}
```

### 8. Eliminar Memoria (Solo Coordinadores)
**DELETE** `/api/memorias/{id}`
```json
// Headers: Authorization required
// Response (200)
{
  "message": "Memoria eliminada correctamente"
}
```

---

## 📖 ENDPOINTS DE MATERIAS

### 9. Obtener Materias de una Memoria
**GET** `/api/memorias/{memoriaId}/materias`
```json
// Headers: Authorization required
// Response (200)
[
  {
    "id": "1",
    "nombre": "Programación I",
    "codigo": "INFO101",
    "creditos": 6,
    "curso": 1,
    "semestre": 1,
    "memoriaId": "1"
  }
]
```

### 10. Obtener Materia por ID
**GET** `/api/materias/{id}`
```json
// Headers: Authorization required
// Response (200)
{
  "id": "1",
  "nombre": "Programación I",
  "codigo": "INFO101",
  "creditos": 6,
  "curso": 1,
  "semestre": 1,
  "memoriaId": "1",
  "guias": [
    {
      "id": "1",
      "titulo": "Guía de Programación I",
      "estado": "borrador",
      "fechaModificacion": "2024-01-20T15:30:00Z"
    }
  ]
}
```

---

## 📝 ENDPOINTS DE GUÍAS DE APRENDIZAJE

### 11. Obtener Guías de una Materia
**GET** `/api/materias/{materiaId}/guias`
```json
// Headers: Authorization required
// Response (200)
[
  {
    "id": "1",
    "titulo": "Guía de Programación I",
    "estado": "borrador",  // "borrador", "completada", "publicada"
    "fechaCreacion": "2024-01-15T10:00:00Z",
    "fechaModificacion": "2024-01-20T15:30:00Z",
    "materiaId": "1"
  }
]
```

### 12. Obtener Guía Completa por ID
**GET** `/api/guias/{id}`
```json
// Headers: Authorization required
// Response (200)
{
  "id": "1",
  "titulo": "Guía de Programación I",
  "estado": "borrador",
  "fechaCreacion": "2024-01-15T10:00:00Z",
  "fechaModificacion": "2024-01-20T15:30:00Z",
  "materiaId": "1",
  
  // Campos específicos de la guía
  "cursoAcademico": "2024/2025",
  "docenteCoordinador": "Dr. Juan Pérez",
  "presentacion": "Introducción a la programación estructurada y orientada a objetos...",
  "comentarioVersion": "Versión inicial de la guía",
  
  // Sistema de evaluación
  "evaluacion": {
    "criterios": [
      {
        "id": "1",
        "nombre": "Examen Final",
        "porcentaje": 60,
        "descripcion": "Examen teórico-práctico final"
      },
      {
        "id": "2",
        "nombre": "Proyectos",
        "porcentaje": 40,
        "descripcion": "Proyectos de programación durante el semestre"
      }
    ]
  },
  
  // Resultados de aprendizaje
  "resultadosAprendizaje": [
    {
      "id": "1",
      "codigo": "RA1",
      "descripcion": "Conocer los fundamentos de la programación estructurada",
      "competencias": ["CB1", "CB2", "CG3"]
    }
  ],
  
  // Contenidos del programa
  "contenidos": [
    {
      "id": "1",
      "tema": "Introducción a la programación",
      "duracion": "2 semanas",
      "objetivos": ["Entender conceptos básicos de programación"],
      "contenidosTeoricos": "Variables, tipos de datos, operadores...",
      "contenidosPracticos": "Ejercicios de programación básica...",
      "bibliografia": "Libro de programación en C++, Capítulo 1-3"
    }
  ]
}
```

### 13. Actualizar Guía de Aprendizaje
**PUT** `/api/guias/{id}`
```json
// Headers: Authorization required
// Request Body
{
  "titulo": "Guía de Programación I - Actualizada",
  "cursoAcademico": "2024/2025",
  "docenteCoordinador": "Dr. Juan Pérez",
  "presentacion": "Introducción actualizada a la programación...",
  "comentarioVersion": "Actualización de contenidos según nuevo plan",
  "evaluacion": {
    "criterios": [
      {
        "nombre": "Examen Final",
        "porcentaje": 50,
        "descripcion": "Examen teórico-práctico"
      },
      {
        "nombre": "Proyectos",
        "porcentaje": 30,
        "descripcion": "Proyectos individuales"
      },
      {
        "nombre": "Participación",
        "porcentaje": 20,
        "descripcion": "Participación en clase"
      }
    ]
  },
  "resultadosAprendizaje": [...],
  "contenidos": [...]
}

// Response (200)
{
  "id": "1",
  "titulo": "Guía de Programación I - Actualizada",
  "estado": "borrador",
  "fechaModificacion": "2024-01-25T10:00:00Z",
  "message": "Guía actualizada correctamente"
}
```

### 14. Publicar Guía
**POST** `/api/guias/{id}/publish`
```json
// Headers: Authorization required
// Response (200)
{
  "id": "1",
  "estado": "publicada",
  "fechaPublicacion": "2024-01-25T10:00:00Z",
  "message": "Guía publicada correctamente"
}

// Error (400)
{
  "error": "Guía incompleta",
  "message": "La guía debe tener todos los campos requeridos completados",
  "missingFields": ["docenteCoordinador", "evaluacion.criterios"]
}
```

---

## 📊 ENDPOINTS DE DASHBOARD Y ESTADÍSTICAS

### 15. Estadísticas del Coordinador
**GET** `/api/dashboard/stats`
```json
// Headers: Authorization required (solo coordinadores)
// Response (200)
{
  "totalMemorias": 15,
  "totalGuias": 120,
  "guiasEnProgreso": 25,
  "guiasCompletadas": 95,
  "guiasPublicadas": 80,
  
  // Estadísticas detalladas
  "memoriasPorEstado": {
    "activas": 12,
    "inactivas": 3
  },
  "guiasPorEstado": {
    "borrador": 25,
    "completadas": 15,
    "publicadas": 80
  },
  
  // Tendencias mensuales (últimos 6 meses)
  "tendencias": {
    "guiasCreadas": [8, 12, 15, 20, 18, 25],
    "guiasPublicadas": [5, 8, 10, 15, 12, 20],
    "meses": ["Ago", "Sep", "Oct", "Nov", "Dic", "Ene"]
  }
}
```

### 16. Estadísticas del Profesor
**GET** `/api/profesores/stats`
```json
// Headers: Authorization required
// Response (200)
{
  "guiasAsignadas": 12,
  "totalEstudiantes": 245,
  "guiasPendientes": 3,
  "guiasCompletadas": 9,
  
  // Guías del profesor
  "misGuias": [
    {
      "id": "1",
      "titulo": "Programación I",
      "materia": "Programación I",
      "estado": "borrador",
      "fechaLimite": "2024-02-15T00:00:00Z",
      "progreso": 75
    }
  ]
}
```

---

## 👥 ENDPOINTS DE GESTIÓN DE USUARIOS

### 17. Obtener Todos los Usuarios (Solo Coordinadores)
**GET** `/api/users`
```json
// Headers: Authorization required (solo coordinadores)
// Response (200)
[
  {
    "id": "1",
    "name": "Ana García",
    "email": "ana.garcia@universidadeuropea.es",
    "role": "coordinador",
    "fechaCreacion": "2024-01-01T00:00:00Z",
    "ultimoAcceso": "2024-01-25T15:30:00Z",
    "activo": true
  },
  {
    "id": "2",
    "name": "Carlos Martínez",
    "email": "carlos.martinez@universidadeuropea.es",
    "role": "profesor",
    "fechaCreacion": "2024-01-05T00:00:00Z",
    "ultimoAcceso": "2024-01-24T10:15:00Z",
    "activo": true
  }
]
```

### 18. Crear Nuevo Usuario (Solo Coordinadores)
**POST** `/api/users`
```json
// Headers: Authorization required (solo coordinadores)
// Request Body
{
  "name": "Nuevo Profesor",
  "email": "nuevo.profesor@universidadeuropea.es",
  "role": "profesor",
  "password": "temporal123"
}

// Response (201)
{
  "id": "3",
  "name": "Nuevo Profesor",
  "email": "nuevo.profesor@universidadeuropea.es",
  "role": "profesor",
  "fechaCreacion": "2024-01-25T10:00:00Z",
  "message": "Usuario creado correctamente"
}
```

### 19. Actualizar Usuario
**PUT** `/api/users/{id}`
```json
// Headers: Authorization required
// Los coordinadores pueden editar cualquier usuario
// Los profesores solo pueden editar su propio perfil

// Request Body
{
  "name": "Nombre Actualizado",
  "email": "email.actualizado@universidadeuropea.es",
  "role": "profesor"  // Solo coordinadores pueden cambiar roles
}

// Response (200)
{
  "id": "2",
  "name": "Nombre Actualizado",
  "email": "email.actualizado@universidadeuropea.es",
  "role": "profesor",
  "fechaModificacion": "2024-01-25T10:00:00Z",
  "message": "Usuario actualizado correctamente"
}
```

### 20. Eliminar Usuario (Solo Coordinadores)
**DELETE** `/api/users/{id}`
```json
// Headers: Authorization required (solo coordinadores)
// Response (200)
{
  "message": "Usuario eliminado correctamente"
}

// Error (400)
{
  "error": "No se puede eliminar",
  "message": "No se puede eliminar el único coordinador del sistema"
}
```

---

## ⚠️ CÓDIGOS DE ERROR COMUNES

| Código | Descripción | Ejemplo de Respuesta |
|--------|-------------|---------------------|
| 400 | Bad Request | `{"error": "Datos inválidos", "message": "Email ya existe"}` |
| 401 | Unauthorized | `{"error": "No autorizado", "message": "Token inválido o expirado"}` |
| 403 | Forbidden | `{"error": "Acceso denegado", "message": "No tiene permisos para esta acción"}` |
| 404 | Not Found | `{"error": "No encontrado", "message": "Recurso no existe"}` |
| 422 | Validation Error | `{"error": "Validación fallida", "fields": {"email": "Email es requerido"}}` |
| 500 | Server Error | `{"error": "Error interno", "message": "Error interno del servidor"}` |

---

## 🔒 SISTEMA DE PERMISOS

### Coordinador
- ✅ Acceso completo a todas las funcionalidades
- ✅ Crear, editar y eliminar memorias
- ✅ Gestionar usuarios (crear, editar, eliminar)
- ✅ Ver dashboard con estadísticas completas
- ✅ Acceder a todas las guías de aprendizaje

### Profesor
- ✅ Ver y editar sus guías asignadas
- ✅ Acceder a las titulaciones y materias
- ✅ Ver su dashboard personalizado
- ✅ Editar su propio perfil
- ❌ No puede crear/eliminar memorias
- ❌ No puede gestionar otros usuarios
- ❌ No puede ver estadísticas globales

---

## 🚀 NOTAS DE IMPLEMENTACIÓN

### Middleware de Autenticación
```javascript
// Ejemplo de middleware para verificar JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};
```

### Middleware de Autorización
```javascript
const requireRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole && req.user.role !== 'coordinador') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
  };
};
```

### Estructura de Base de Datos Sugerida

#### Tabla `users`
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('coordinador', 'profesor') NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_access TIMESTAMP NULL
);
```

#### Tabla `memorias`
```sql
CREATE TABLE memorias (
  id VARCHAR(36) PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  archivo_path VARCHAR(500),
  estado ENUM('activa', 'inactiva') DEFAULT 'activa',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Tabla `materias`
```sql
CREATE TABLE materias (
  id VARCHAR(36) PRIMARY KEY,
  memoria_id VARCHAR(36) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  codigo VARCHAR(50) NOT NULL,
  creditos INT NOT NULL,
  curso INT NOT NULL,
  semestre INT NOT NULL,
  FOREIGN KEY (memoria_id) REFERENCES memorias(id) ON DELETE CASCADE
);
```

#### Tabla `guias`
```sql
CREATE TABLE guias (
  id VARCHAR(36) PRIMARY KEY,
  materia_id VARCHAR(36) NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  estado ENUM('borrador', 'completada', 'publicada') DEFAULT 'borrador',
  curso_academico VARCHAR(20),
  docente_coordinador VARCHAR(255),
  presentacion TEXT,
  comentario_version TEXT,
  datos_json JSON,  -- Para almacenar evaluación, contenidos, etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_at TIMESTAMP NULL,
  FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE
);
```

### Validaciones Importantes

1. **Email único** en el sistema
2. **Roles válidos** solo 'coordinador' o 'profesor'
3. **Estados de guía** solo 'borrador', 'completada', 'publicada'
4. **Porcentajes de evaluación** deben sumar 100%
5. **Campos requeridos** para publicar una guía

### CORS Configuration
```javascript
// Configuración CORS para desarrollo
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
```

---

**Fecha de creación:** ${new Date().toLocaleDateString()}
**Versión:** 1.0
**Frontend URL:** http://localhost:3000
**Backend URL sugerida:** http://localhost:3001
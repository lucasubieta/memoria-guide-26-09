/**
 * Lista completa de endpoints necesarios para el backend
 */

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  description: string;
  requestBody?: any;
  responseExample: any;
  requiresAuth: boolean;
}

export const API_ENDPOINTS: ApiEndpoint[] = [
  // ==================== AUTENTICACIÓN ====================
  {
    method: 'POST',
    endpoint: '/api/auth/login',
    description: 'Iniciar sesión con email y contraseña',
    requiresAuth: false,
    requestBody: {
      email: 'usuario@universidadeuropea.es',
      password: 'password123'
    },
    responseExample: {
      token: 'jwt_token_string',
      user: {
        id: '1',
        name: 'Ana García',
        email: 'ana.garcia@universidadeuropea.es',
        role: 'coordinador' // o 'profesor'
      }
    }
  },
  {
    method: 'POST',
    endpoint: '/api/auth/logout',
    description: 'Cerrar sesión del usuario',
    requiresAuth: true,
    responseExample: {
      message: 'Sesión cerrada correctamente'
    }
  },
  {
    method: 'GET',
    endpoint: '/api/auth/me',
    description: 'Obtener información del usuario autenticado',
    requiresAuth: true,
    responseExample: {
      id: '1',
      name: 'Ana García',
      email: 'ana.garcia@universidadeuropea.es',
      role: 'coordinador'
    }
  },
  {
    method: 'POST',
    endpoint: '/api/auth/refresh',
    description: 'Renovar el token de autenticación',
    requiresAuth: true,
    responseExample: {
      token: 'new_jwt_token_string',
      user: {
        id: '1',
        name: 'Ana García',
        email: 'ana.garcia@universidadeuropea.es',
        role: 'coordinador'
      }
    }
  },

  // ==================== MEMORIAS (TITULACIONES) ====================
  {
    method: 'GET',
    endpoint: '/api/memorias',
    description: 'Obtener lista de todas las memorias/titulaciones',
    requiresAuth: true,
    responseExample: [
      {
        id: '1',
        nombre: 'Grado en Ingeniería Informática',
        descripcion: 'Titulación en Ingeniería Informática',
        fechaCreacion: '2024-01-15T10:00:00Z',
        estado: 'activa',
        materias: [
          {
            id: '1',
            nombre: 'Programación I',
            codigo: 'INFO101',
            creditos: 6,
            curso: 1,
            semestre: 1
          }
        ]
      }
    ]
  },
  {
    method: 'GET',
    endpoint: '/api/memorias/{id}',
    description: 'Obtener detalles de una memoria específica',
    requiresAuth: true,
    responseExample: {
      id: '1',
      nombre: 'Grado en Ingeniería Informática',
      descripcion: 'Titulación en Ingeniería Informática',
      fechaCreacion: '2024-01-15T10:00:00Z',
      estado: 'activa',
      materias: [
        {
          id: '1',
          nombre: 'Programación I',
          codigo: 'INFO101',
          creditos: 6,
          curso: 1,
          semestre: 1,
          guias: [
            {
              id: '1',
              titulo: 'Guía de Programación I',
              estado: 'borrador',
              fechaModificacion: '2024-01-20T15:30:00Z'
            }
          ]
        }
      ]
    }
  },
  {
    method: 'POST',
    endpoint: '/api/memorias',
    description: 'Crear nueva memoria (solo coordinadores)',
    requiresAuth: true,
    requestBody: {
      nombre: 'Nueva Titulación',
      descripcion: 'Descripción de la titulación',
      archivo: 'archivo_pdf_o_docx' // FormData
    },
    responseExample: {
      id: '2',
      nombre: 'Nueva Titulación',
      descripcion: 'Descripción de la titulación',
      fechaCreacion: '2024-01-25T10:00:00Z',
      estado: 'activa'
    }
  },
  {
    method: 'DELETE',
    endpoint: '/api/memorias/{id}',
    description: 'Eliminar memoria (solo coordinadores)',
    requiresAuth: true,
    responseExample: {
      message: 'Memoria eliminada correctamente'
    }
  },

  // ==================== MATERIAS ====================
  {
    method: 'GET',
    endpoint: '/api/memorias/{memoriaId}/materias',
    description: 'Obtener materias de una memoria específica',
    requiresAuth: true,
    responseExample: [
      {
        id: '1',
        nombre: 'Programación I',
        codigo: 'INFO101',
        creditos: 6,
        curso: 1,
        semestre: 1,
        memoriaId: '1'
      }
    ]
  },
  {
    method: 'GET',
    endpoint: '/api/materias/{id}',
    description: 'Obtener detalles de una materia específica',
    requiresAuth: true,
    responseExample: {
      id: '1',
      nombre: 'Programación I',
      codigo: 'INFO101',
      creditos: 6,
      curso: 1,
      semestre: 1,
      memoriaId: '1',
      guias: [
        {
          id: '1',
          titulo: 'Guía de Programación I',
          estado: 'borrador',
          fechaModificacion: '2024-01-20T15:30:00Z'
        }
      ]
    }
  },

  // ==================== GUÍAS DE APRENDIZAJE ====================
  {
    method: 'GET',
    endpoint: '/api/materias/{materiaId}/guias',
    description: 'Obtener guías de una materia específica',
    requiresAuth: true,
    responseExample: [
      {
        id: '1',
        titulo: 'Guía de Programación I',
        estado: 'borrador', // 'borrador', 'completada', 'publicada'
        fechaCreacion: '2024-01-15T10:00:00Z',
        fechaModificacion: '2024-01-20T15:30:00Z',
        materiaId: '1'
      }
    ]
  },
  {
    method: 'GET',
    endpoint: '/api/guias/{id}',
    description: 'Obtener detalles completos de una guía de aprendizaje',
    requiresAuth: true,
    responseExample: {
      id: '1',
      titulo: 'Guía de Programación I',
      estado: 'borrador',
      fechaCreacion: '2024-01-15T10:00:00Z',
      fechaModificacion: '2024-01-20T15:30:00Z',
      materiaId: '1',
      // Campos específicos de la guía
      cursoAcademico: '2024/2025',
      docenteCoordinador: 'Dr. Juan Pérez',
      presentacion: 'Introducción a la programación...',
      comentarioVersion: 'Versión inicial de la guía',
      // Evaluación
      evaluacion: {
        criterios: [
          {
            id: '1',
            nombre: 'Examen Final',
            porcentaje: 60,
            descripcion: 'Examen teórico-práctico'
          },
          {
            id: '2',
            nombre: 'Proyectos',
            porcentaje: 40,
            descripcion: 'Proyectos de programación'
          }
        ]
      },
      // Resultados de aprendizaje
      resultadosAprendizaje: [
        {
          id: '1',
          codigo: 'RA1',
          descripcion: 'Conocer los fundamentos de programación',
          competencias: ['CB1', 'CB2']
        }
      ],
      // Contenidos
      contenidos: [
        {
          id: '1',
          tema: 'Introducción a la programación',
          duracion: '2 semanas',
          objetivos: ['Entender conceptos básicos'],
          contenidosTeoricos: 'Variables, tipos de datos...',
          contenidosPracticos: 'Ejercicios de programación...',
          bibliografia: 'Libro de programación...'
        }
      ]
    }
  },
  {
    method: 'PUT',
    endpoint: '/api/guias/{id}',
    description: 'Actualizar guía de aprendizaje',
    requiresAuth: true,
    requestBody: {
      titulo: 'Guía de Programación I - Actualizada',
      cursoAcademico: '2024/2025',
      docenteCoordinador: 'Dr. Juan Pérez',
      presentacion: 'Introducción actualizada...',
      comentarioVersion: 'Actualización de contenidos',
      // ... otros campos
    },
    responseExample: {
      id: '1',
      titulo: 'Guía de Programación I - Actualizada',
      estado: 'borrador',
      fechaModificacion: '2024-01-25T10:00:00Z',
      // ... campos actualizados
    }
  },
  {
    method: 'POST',
    endpoint: '/api/guias/{id}/publish',
    description: 'Publicar guía de aprendizaje (cambiar estado a publicada)',
    requiresAuth: true,
    responseExample: {
      id: '1',
      estado: 'publicada',
      fechaPublicacion: '2024-01-25T10:00:00Z',
      message: 'Guía publicada correctamente'
    }
  },

  // ==================== DASHBOARD Y ESTADÍSTICAS ====================
  {
    method: 'GET',
    endpoint: '/api/dashboard/stats',
    description: 'Obtener estadísticas para el dashboard (solo coordinadores)',
    requiresAuth: true,
    responseExample: {
      totalMemorias: 15,
      totalGuias: 120,
      guiasEnProgreso: 25,
      guiasCompletadas: 95,
      guiasPublicadas: 80,
      // Estadísticas adicionales
      memoriasPorEstado: {
        activas: 12,
        inactivas: 3
      },
      guiasPorEstado: {
        borrador: 25,
        completadas: 15,
        publicadas: 80
      }
    }
  },
  {
    method: 'GET',
    endpoint: '/api/profesores/stats',
    description: 'Obtener estadísticas para profesores',
    requiresAuth: true,
    responseExample: {
      guiasAsignadas: 12,
      totalEstudiantes: 245,
      guiasPendientes: 3,
      guiasCompletadas: 9
    }
  },

  // ==================== USUARIOS Y ROLES ====================
  {
    method: 'GET',
    endpoint: '/api/users',
    description: 'Obtener lista de usuarios (solo coordinadores)',
    requiresAuth: true,
    responseExample: [
      {
        id: '1',
        name: 'Ana García',
        email: 'ana.garcia@universidadeuropea.es',
        role: 'coordinador',
        fechaCreacion: '2024-01-01T00:00:00Z',
        ultimoAcceso: '2024-01-25T15:30:00Z'
      },
      {
        id: '2',
        name: 'Carlos Martínez',
        email: 'carlos.martinez@universidadeuropea.es',
        role: 'profesor',
        fechaCreacion: '2024-01-05T00:00:00Z',
        ultimoAcceso: '2024-01-24T10:15:00Z'
      }
    ]
  },
  {
    method: 'POST',
    endpoint: '/api/users',
    description: 'Crear nuevo usuario (solo coordinadores)',
    requiresAuth: true,
    requestBody: {
      name: 'Nuevo Profesor',
      email: 'nuevo.profesor@universidadeuropea.es',
      role: 'profesor',
      password: 'temporal123'
    },
    responseExample: {
      id: '3',
      name: 'Nuevo Profesor',
      email: 'nuevo.profesor@universidadeuropea.es',
      role: 'profesor',
      fechaCreacion: '2024-01-25T10:00:00Z'
    }
  },
  {
    method: 'PUT',
    endpoint: '/api/users/{id}',
    description: 'Actualizar usuario (solo coordinadores o el propio usuario)',
    requiresAuth: true,
    requestBody: {
      name: 'Nombre Actualizado',
      email: 'email.actualizado@universidadeuropea.es',
      role: 'profesor' // solo coordinadores pueden cambiar roles
    },
    responseExample: {
      id: '2',
      name: 'Nombre Actualizado',
      email: 'email.actualizado@universidadeuropea.es',
      role: 'profesor',
      fechaModificacion: '2024-01-25T10:00:00Z'
    }
  },
  {
    method: 'DELETE',
    endpoint: '/api/users/{id}',
    description: 'Eliminar usuario (solo coordinadores)',
    requiresAuth: true,
    responseExample: {
      message: 'Usuario eliminado correctamente'
    }
  }
];

// Configuración de autenticación
export const AUTH_CONFIG = {
  tokenKey: 'auth_token',
  refreshEndpoint: '/api/auth/refresh',
  loginRedirect: '/login',
  defaultRedirects: {
    coordinador: '/dashboard',
    profesor: '/profesores'
  }
};

// Headers requeridos
export const REQUIRED_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {token}', // Reemplazar {token} con el JWT
  'Accept': 'application/json'
};

// Códigos de estado HTTP esperados
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;
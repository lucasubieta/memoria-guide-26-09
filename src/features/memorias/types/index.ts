// Domain types for UI (stable, no problematic characters)

export type EstadoMemoria = "UPLOADED" | "EXTRACTING" | "COMPLETED" | "FAILED";
export type EstadoMateria = "GENERADA" | "EN_PROGRESO";
export type EstadoGuia = "GENERADA" | "COMPLETADA";

export interface Memoria {
  id: string;            // uuid (memoria_id)
  filename: string;      // derived from input_blob_uri, fallback "memoria_{id}.pdf"
  titulacion: string;
  uploadedBy: string;    // from Audit_Log or "sistema"
  uploadedAt: string;    // ISO (created_at)
  status: EstadoMemoria; // mapped from Memorias.status
  progress: number;      // % derived from materias_ready/materias_count
  materias: number;      // materias_count
  guiasGeneradas: number;// count of published guides
  fileSize: string;      // from blob metadata or "N/A"
}

export interface ErrorDetectado {
  materia: string;
  tipoError: string;
  mensaje: string;
  fecha: string;
}

export interface MateriaResumen {
  id: string;
  codigo: string;
  nombre: string;
  ects: number;
  caracter: string;       // from published JSON
  cursoSemestre: string;  // "1º - S1" from JSON (curso, semestre)
  estado: EstadoMateria;  // mapped from Materias.status
}

export interface MemoriaDetalle extends Omit<Memoria, 'materias'> {
  cursoAcademico: string;
  escuela: string;
  plan: string;           // from globals_blob_uri JSON
  totalMaterias: number;
  guiasCompletadas: number;
  guiasPendientes: number;
  errores: number;
  materias: MateriaResumen[];
  erroresDetectados: ErrorDetectado[]; // from q_events, last_error
}

export interface ActividadFormativa {
  actividad: string;
  horas: number;
}

export interface SistemaEvaluacion {
  sistema: string;
  porcentaje: string;
  descripcion: string;
}

export interface MateriaDetalle {
  id: string;
  codigo: string;
  nombre: string;
  ects: number;
  caracter: string;
  curso: number;
  semestre: number;
  idioma: string;
  modalidad: string;
  docenteCoordinador: string;
  cursoAcademico: string;
  presentacion: string;
  competencias: string[];
  resultadosAprendizaje: string[];
  contenidos: string;
  actividadesFormativas: ActividadFormativa[];
  sistemaEvaluacion: SistemaEvaluacion[];
  versionComment?: string;  // Comentario de versión del usuario
  metadata: {
    ultimaModificacion?: string;
    version?: string;
    estado?: string;
    generadaPor?: string;
    fechaGeneracion?: string;
  };
}

export interface Guia {
  id: string;
  memoriaId: string;
  materiaId: string;
  titulo: string;
  descripcion: string;
  archivo: string;
  fechaCreacion: string;
  estado: EstadoGuia;
  tamano: string;        // no ñ
}
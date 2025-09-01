// DTO types - what comes from API/SQL
export interface MemoriaDTO {
  memoria_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  retry_count: number;
  last_error?: string;
  input_blob_uri?: string;
  di_result_blob_uri?: string;
  json_blob_uri?: string;
  globals_blob_uri?: string;
  globals_blob_version_id?: string;
  titulacion: string;
  materias_count: number;
  materias_ready: number;
  materias_blocked: number;
}

export interface MemoriaDetalleDTO extends MemoriaDTO {
  cursoAcademico?: string;
  escuela?: string;
  plan?: string;
  materias?: MateriaResumenDTO[];
  erroresDetectados?: ErrorDetectadoDTO[];
}

export interface MateriaResumenDTO {
  materia_id: string;
  memoria_id: string;
  denominacion: string;
  ects: number;
  status: string;
  codigo?: string;
  caracter?: string;
  curso?: number;
  semestre?: number;
}

export interface ErrorDetectadoDTO {
  materia: string;
  tipoError: string;
  mensaje: string;
  fecha: string;
}
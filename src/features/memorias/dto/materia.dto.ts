// Materia DTO types
export interface MateriaDTO {
  materia_id: string;
  memoria_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  retry_count: number;
  last_error?: string;
  draft_blob_uri?: string;
  draft_blob_version_id?: string;
  published_blob_uri?: string;
  published_blob_version_id?: string;
  denominacion: string;
  ects: number;
  guide_pdf_uri?: string;
  last_gen_id?: string;
  codigo?: string;
  caracter?: string;
  curso?: number;
  semestre?: number;
}

export interface MateriaDetalleDTO extends MateriaDTO {
  codigo?: string;
  caracter?: string;
  curso?: number;
  semestre?: number;
  idioma?: string;
  modalidad?: string;
  docenteCoordinador?: string;
  cursoAcademico?: string;
  presentacion?: string;
  competencias?: string[];
  resultadosAprendizaje?: string[];
  contenidos?: string;
  actividadesFormativas?: {
    actividad: string;
    horas: number;
  }[];
  sistemaEvaluacion?: {
    sistema: string;
    porcentaje: string;
    descripcion: string;
  }[];
  metadata?: {
    ultimaModificacion?: string;
    version?: string;
    estado?: string;
    generadaPor?: string;
    fechaGeneracion?: string;
  };
}
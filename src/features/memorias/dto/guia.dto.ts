// Guia DTO types
export interface GuiaDTO {
  gen_id?: string;
  memoria_id: string;
  materia_id: string;
  generated_at: string;
  generated_by?: string;
  template_blob_uri?: string;
  template_blob_version_id?: string;
  published_blob_uri?: string;
  published_blob_version_id?: string;
  pdf_blob_uri?: string;
  pdf_blob_version_id?: string;
  meta_blob_uri?: string;
  generator_version?: string;
  language?: string;
  duration_ms?: number;
  status: string;
  error_summary?: string;
  titulo?: string;
  descripcion?: string;
  archivo?: string;
  "tamaño"?: string; // puede venir así del backend
}
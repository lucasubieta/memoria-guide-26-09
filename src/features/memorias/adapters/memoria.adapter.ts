// Memoria adapters - DTO ↔ Domain mappings
import { Memoria, MemoriaDetalle, EstadoMemoria, MateriaResumen, ErrorDetectado } from "../types";
import { MemoriaDTO, MemoriaDetalleDTO } from "../dto/memoria.dto";
import { MateriaAdapter } from "./materia.adapter";

export class MemoriaAdapter {
  static toDomain(dto: MemoriaDTO): Memoria {
    return {
      id: dto.memoria_id,
      filename: this.extractFilename(dto.input_blob_uri) || `memoria_${dto.memoria_id}.pdf`,
      titulacion: dto.titulacion,
      uploadedBy: "sistema", // TODO: get from Audit_Log
      uploadedAt: dto.created_at,
      status: this.mapStatus(dto.status),
      progress: this.calculateProgress(dto.materias_ready, dto.materias_count),
      materias: dto.materias_count,
      guiasGeneradas: dto.materias_ready, // simplified
      fileSize: "N/A", // TODO: get from blob metadata
    };
  }

  static toDetalleDomain(dto: MemoriaDetalleDTO): MemoriaDetalle {
    const base = this.toDomain(dto);
    
    return {
      ...base,
      cursoAcademico: dto.cursoAcademico || "",
      escuela: dto.escuela || "",
      plan: dto.plan || "",
      totalMaterias: dto.materias_count,
      guiasCompletadas: dto.materias_ready,
      guiasPendientes: dto.materias_count - dto.materias_ready,
      errores: dto.materias_blocked,
      materias: dto.materias?.map(MateriaAdapter.toResumenDomain) || [],
      erroresDetectados: dto.erroresDetectados?.map(this.mapError) || [],
    };
  }

  private static extractFilename(uri?: string): string | null {
    if (!uri) return null;
    const parts = uri.split('/');
    return parts[parts.length - 1] || null;
  }

  private static mapStatus(status: string): EstadoMemoria {
    const statusMap: Record<string, EstadoMemoria> = {
      'UPLOADED': 'UPLOADED',
      'EXTRACTING': 'EXTRACTING',
      'COMPLETED': 'COMPLETED',
      'FAILED': 'FAILED',
    };
    return statusMap[status] || 'UPLOADED';
  }

  private static calculateProgress(ready: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((ready / total) * 100);
  }

  private static mapError(dto: any): ErrorDetectado {
    return {
      materia: dto.materia,
      tipoError: dto.tipoError,
      mensaje: dto.mensaje,
      fecha: dto.fecha,
    };
  }
}

export const memoriaAdapter = new MemoriaAdapter();
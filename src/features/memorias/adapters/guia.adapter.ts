// Guia adapters - DTO ↔ Domain mappings
import { Guia, EstadoGuia } from "../types";
import { GuiaDTO } from "../dto/guia.dto";

export class GuiaAdapter {
  static toDomain(dto: GuiaDTO): Guia {
    return {
      id: dto.gen_id || `${dto.memoria_id}-${dto.materia_id}`,
      memoriaId: dto.memoria_id,
      materiaId: dto.materia_id,
      titulo: dto.titulo || "Guía de Aprendizaje",
      descripcion: dto.descripcion || "",
      archivo: this.extractFilename(dto.pdf_blob_uri || dto.published_blob_uri) || "guia.pdf",
      fechaCreacion: dto.generated_at,
      estado: this.mapStatus(dto.status),
      tamano: dto["tamaño"] || "N/A", // mapeo desde ñ
    };
  }

  static toDTO(domain: Guia): GuiaDTO {
    return {
      gen_id: domain.id,
      memoria_id: domain.memoriaId,
      materia_id: domain.materiaId,
      generated_at: domain.fechaCreacion,
      status: this.mapStatusToDTO(domain.estado),
      titulo: domain.titulo,
      descripcion: domain.descripcion,
      archivo: domain.archivo,
      "tamaño": domain.tamano, // mapeo hacia ñ
    };
  }

  private static extractFilename(uri?: string): string | null {
    if (!uri) return null;
    const parts = uri.split('/');
    return parts[parts.length - 1] || null;
  }

  private static mapStatus(status: string): EstadoGuia {
    const statusMap: Record<string, EstadoGuia> = {
      'GENERATED': 'GENERADA',
      'PUBLISHED': 'COMPLETADA',
      'COMPLETED': 'COMPLETADA',
      'READY': 'COMPLETADA',
    };
    return statusMap[status] || 'GENERADA';
  }

  private static mapStatusToDTO(status: EstadoGuia): string {
    const statusMap: Record<EstadoGuia, string> = {
      'GENERADA': 'GENERATED',
      'COMPLETADA': 'COMPLETED',
    };
    return statusMap[status] || 'GENERATED';
  }
}

export const guiaAdapter = new GuiaAdapter();
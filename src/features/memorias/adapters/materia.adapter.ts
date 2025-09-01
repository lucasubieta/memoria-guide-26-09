// Materia adapters - DTO ↔ Domain mappings
import { MateriaResumen, MateriaDetalle, EstadoMateria } from "../types";
import { MateriaDTO, MateriaDetalleDTO } from "../dto/materia.dto";

export class MateriaAdapter {
  static toResumenDomain(dto: MateriaDTO): MateriaResumen {
    return {
      id: dto.materia_id,
      codigo: dto.codigo || "",
      nombre: dto.denominacion,
      ects: dto.ects,
      caracter: dto.caracter || "",
      cursoSemestre: this.formatCursoSemestre(dto.curso, dto.semestre),
      estado: this.mapStatus(dto.status),
    };
  }

  static toDetalleDomain(dto: MateriaDetalleDTO): MateriaDetalle {
    return {
      id: dto.materia_id,
      codigo: dto.codigo || "",
      nombre: dto.denominacion,
      ects: dto.ects,
      caracter: dto.caracter || "",
      curso: dto.curso || 1,
      semestre: dto.semestre || 1,
      idioma: dto.idioma || "",
      modalidad: dto.modalidad || "",
      docenteCoordinador: dto.docenteCoordinador || "",
      cursoAcademico: dto.cursoAcademico || "",
      presentacion: dto.presentacion || "",
      competencias: dto.competencias || [],
      resultadosAprendizaje: dto.resultadosAprendizaje || [],
      contenidos: dto.contenidos || "",
      actividadesFormativas: dto.actividadesFormativas || [],
      sistemaEvaluacion: dto.sistemaEvaluacion || [],
      metadata: dto.metadata || {},
    };
  }

  static toDTO(domain: Partial<MateriaDetalle>): Partial<MateriaDetalleDTO> {
    return {
      denominacion: domain.nombre,
      ects: domain.ects,
      codigo: domain.codigo,
      caracter: domain.caracter,
      curso: domain.curso,
      semestre: domain.semestre,
      idioma: domain.idioma,
      modalidad: domain.modalidad,
      docenteCoordinador: domain.docenteCoordinador,
      cursoAcademico: domain.cursoAcademico,
      presentacion: domain.presentacion,
      competencias: domain.competencias,
      resultadosAprendizaje: domain.resultadosAprendizaje,
      contenidos: domain.contenidos,
      actividadesFormativas: domain.actividadesFormativas,
      sistemaEvaluacion: domain.sistemaEvaluacion,
      metadata: domain.metadata,
    };
  }

  private static formatCursoSemestre(curso?: number, semestre?: number): string {
    if (!curso || !semestre) return "";
    return `${curso}º - S${semestre}`;
  }

  private static mapStatus(status: string): EstadoMateria {
    const statusMap: Record<string, EstadoMateria> = {
      'READY': 'GENERADA',
      'GENERATED': 'GENERADA',
      'PROCESSING': 'EN_PROGRESO',
      'EXTRACTING': 'EN_PROGRESO',
      'FAILED': 'EN_PROGRESO',
    };
    return statusMap[status] || 'EN_PROGRESO';
  }
}

export const materiaAdapter = new MateriaAdapter();
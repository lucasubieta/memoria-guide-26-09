// Repository interface - single contract for data access
import { Memoria, MemoriaDetalle, MateriaResumen, MateriaDetalle, Guia } from "../types";

export interface MemoriasRepository {
  // Memorias
  listarMemorias(): Promise<Memoria[]>;
  listarRecientes(): Promise<Memoria[]>;
  obtenerMemoria(id: string): Promise<Memoria>;
  detalleMemoria(id: string): Promise<MemoriaDetalle>;
  subirMemoria(file: File): Promise<Memoria>;
  procesarMemoria(id: string): Promise<void>;
  eliminarMemoria(id: string): Promise<void>;

  // Materias
  listarMaterias(memoriaId: string): Promise<MateriaResumen[]>;
  obtenerMateria(memoriaId: string, materiaId: string): Promise<MateriaDetalle>;
  actualizarMateria(memoriaId: string, materiaId: string, patch: Partial<MateriaDetalle>): Promise<MateriaDetalle>;
  eliminarMateria(memoriaId: string, materiaId: string): Promise<void>;

  // Guias
  listarGuias(memoriaId: string): Promise<Guia[]>;
  generarGuia(memoriaId: string, materiaId: string): Promise<Guia>;
  aprobarGuia(memoriaId: string, materiaId: string): Promise<void>;
  rechazarGuia(memoriaId: string, materiaId: string, reason?: string): Promise<void>;

  // Downloads
  descargarGuiaPDF(memoriaId: string, materiaId: string): Promise<Blob>;
  descargarGuiaWord(memoriaId: string, materiaId: string): Promise<Blob>;
  descargarTodasGuias(memoriaId: string): Promise<Blob>;
}
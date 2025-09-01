// HTTP implementation of MemoriasRepository
import { HttpClient } from "@/lib/http/client";
import { MemoriasRepository } from "./index";
import { Memoria, MemoriaDetalle, MateriaResumen, MateriaDetalle, Guia } from "../types";
import { MemoriaAdapter } from "../adapters/memoria.adapter";
import { MateriaAdapter } from "../adapters/materia.adapter";
import { GuiaAdapter } from "../adapters/guia.adapter";

export class HttpMemoriasRepository implements MemoriasRepository {
  constructor(private http: HttpClient) {}

  async listarMemorias(): Promise<Memoria[]> {
    const dtos = await this.http.get<any[]>("/memorias");
    return dtos.map(dto => MemoriaAdapter.toDomain(dto));
  }

  async listarRecientes(): Promise<Memoria[]> {
    const dtos = await this.http.get<any[]>("/memorias/recent");
    return dtos.map(dto => MemoriaAdapter.toDomain(dto));
  }

  async obtenerMemoria(id: string): Promise<Memoria> {
    const dto = await this.http.get<any>(`/memorias/${id}`);
    return MemoriaAdapter.toDomain(dto);
  }

  async detalleMemoria(id: string): Promise<MemoriaDetalle> {
    const dto = await this.http.get<any>(`/memorias/${id}/detail`);
    return MemoriaAdapter.toDetalleDomain(dto);
  }

  async subirMemoria(file: File): Promise<Memoria> {
    const formData = new FormData();
    formData.append('file', file);
    const dto = await this.http.postFormData<any>("/memorias/upload", formData);
    return MemoriaAdapter.toDomain(dto);
  }

  async procesarMemoria(id: string): Promise<void> {
    await this.http.post(`/memorias/${id}/process`);
  }

  async eliminarMemoria(id: string): Promise<void> {
    await this.http.delete(`/memorias/${id}`);
  }

  async listarMaterias(memoriaId: string): Promise<MateriaResumen[]> {
    const dtos = await this.http.get<any[]>(`/memorias/${memoriaId}/materias`);
    return dtos.map(dto => MateriaAdapter.toResumenDomain(dto));
  }

  async obtenerMateria(memoriaId: string, materiaId: string): Promise<MateriaDetalle> {
    const dto = await this.http.get<any>(`/memorias/${memoriaId}/materias/${materiaId}`);
    return MateriaAdapter.toDetalleDomain(dto);
  }

  async actualizarMateria(memoriaId: string, materiaId: string, patch: Partial<MateriaDetalle>): Promise<MateriaDetalle> {
    const dtoData = MateriaAdapter.toDTO(patch);
    const dto = await this.http.put<any>(`/memorias/${memoriaId}/materias/${materiaId}`, dtoData);
    return MateriaAdapter.toDetalleDomain(dto);
  }

  async eliminarMateria(memoriaId: string, materiaId: string): Promise<void> {
    await this.http.delete(`/memorias/${memoriaId}/materias/${materiaId}`);
  }

  async listarGuias(memoriaId: string): Promise<Guia[]> {
    const dtos = await this.http.get<any[]>(`/memorias/${memoriaId}/guias`);
    return dtos.map(dto => GuiaAdapter.toDomain(dto));
  }

  async generarGuia(memoriaId: string, materiaId: string): Promise<Guia> {
    const dto = await this.http.post<any>(`/memorias/${memoriaId}/materias/${materiaId}/generate-guia`);
    return GuiaAdapter.toDomain(dto);
  }

  async aprobarGuia(memoriaId: string, materiaId: string): Promise<void> {
    await this.http.post(`/memorias/${memoriaId}/materias/${materiaId}/approve`);
  }

  async rechazarGuia(memoriaId: string, materiaId: string, reason?: string): Promise<void> {
    await this.http.post(`/memorias/${memoriaId}/materias/${materiaId}/reject`, { reason });
  }

  async descargarGuiaPDF(memoriaId: string, materiaId: string): Promise<Blob> {
    return await this.http.download(`/memorias/${memoriaId}/materias/${materiaId}/download/pdf`);
  }

  async descargarGuiaWord(memoriaId: string, materiaId: string): Promise<Blob> {
    return await this.http.download(`/memorias/${memoriaId}/materias/${materiaId}/download/word`);
  }

  async descargarTodasGuias(memoriaId: string): Promise<Blob> {
    return await this.http.download(`/memorias/${memoriaId}/download-all-guias`);
  }
}
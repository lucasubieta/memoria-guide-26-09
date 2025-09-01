// Materias hooks using Repository
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { memoriasRepo } from "../repository/factory";
import { MateriaDetalle } from "../types";

export const useMaterias = (memoriaId: string) => {
  return useQuery({
    queryKey: ["memorias", memoriaId, "materias"],
    queryFn: () => memoriasRepo.listarMaterias(memoriaId),
    enabled: !!memoriaId,
  });
};

export const useMateriaDetail = (memoriaId: string, materiaId: string) => {
  const queryClient = useQueryClient();

  const detailQuery = useQuery({
    queryKey: ["memorias", memoriaId, "materias", materiaId],
    queryFn: () => memoriasRepo.obtenerMateria(memoriaId, materiaId),
    enabled: !!memoriaId && !!materiaId,
  });

  const updateMutation = useMutation({
    mutationFn: (patch: Partial<MateriaDetalle>) => 
      memoriasRepo.actualizarMateria(memoriaId, materiaId, patch),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["memorias", memoriaId, "materias", materiaId] 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => memoriasRepo.eliminarMateria(memoriaId, materiaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["memorias", memoriaId, "materias"] 
      });
    },
  });

  return {
    materia: detailQuery.data,
    isLoading: detailQuery.isLoading,
    isError: detailQuery.isError,
    error: detailQuery.error,
    updateMateria: updateMutation.mutate,
    deleteMateria: deleteMutation.mutate,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
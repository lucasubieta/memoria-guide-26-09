// Memorias hooks using Repository
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { memoriasRepo } from "../repository/factory";

export const useMemorias = () => {
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: ["memorias"],
    queryFn: () => memoriasRepo.listarMemorias(),
  });

  const recentQuery = useQuery({
    queryKey: ["memorias", "recent"],
    queryFn: () => memoriasRepo.listarRecientes(),
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => memoriasRepo.subirMemoria(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memorias"] });
    },
  });

  const processMutation = useMutation({
    mutationFn: (id: string) => memoriasRepo.procesarMemoria(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memorias"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => memoriasRepo.eliminarMemoria(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memorias"] });
    },
  });

  return {
    memorias: listQuery.data || [],
    recentMemorias: recentQuery.data || [],
    isLoading: listQuery.isLoading || recentQuery.isLoading,
    isError: listQuery.isError || recentQuery.isError,
    error: listQuery.error || recentQuery.error,
    uploadMemoria: uploadMutation.mutate,
    processMemoria: processMutation.mutate,
    deleteMemoria: deleteMutation.mutate,
    isUploading: uploadMutation.isPending,
    isProcessing: processMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export const useMemoriaDetail = (id: string) => {
  return useQuery({
    queryKey: ["memorias", id, "detail"],
    queryFn: () => memoriasRepo.detalleMemoria(id),
    enabled: !!id,
  });
};
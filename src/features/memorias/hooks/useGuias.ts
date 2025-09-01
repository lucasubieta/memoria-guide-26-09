// Guias hooks using Repository
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { memoriasRepo } from "../repository/factory";

export const useGuias = (memoriaId: string) => {
  return useQuery({
    queryKey: ["memorias", memoriaId, "guias"],
    queryFn: () => memoriasRepo.listarGuias(memoriaId),
    enabled: !!memoriaId,
  });
};

export const useGuiaActions = (memoriaId: string, materiaId: string) => {
  const queryClient = useQueryClient();

  const generateMutation = useMutation({
    mutationFn: () => memoriasRepo.generarGuia(memoriaId, materiaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memorias", memoriaId, "guias"] });
    },
  });

  const approveMutation = useMutation({
    mutationFn: () => memoriasRepo.aprobarGuia(memoriaId, materiaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memorias", memoriaId, "guias"] });
      queryClient.invalidateQueries({ queryKey: ["memorias", memoriaId, "materias", materiaId] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (reason?: string) => memoriasRepo.rechazarGuia(memoriaId, materiaId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memorias", memoriaId, "guias"] });
      queryClient.invalidateQueries({ queryKey: ["memorias", memoriaId, "materias", materiaId] });
    },
  });

  return {
    generateGuia: generateMutation.mutate,
    approveGuia: approveMutation.mutate,
    rejectGuia: rejectMutation.mutate,
    isGenerating: generateMutation.isPending,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
  };
};

export const useGuiaDownloads = () => {
  const downloadPDF = async (memoriaId: string, materiaId: string) => {
    const blob = await memoriasRepo.descargarGuiaPDF(memoriaId, materiaId);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guia_${materiaId}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadWord = async (memoriaId: string, materiaId: string) => {
    const blob = await memoriasRepo.descargarGuiaWord(memoriaId, materiaId);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guia_${materiaId}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = async (memoriaId: string) => {
    const blob = await memoriasRepo.descargarTodasGuias(memoriaId);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guias_${memoriaId}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    downloadPDF,
    downloadWord,
    downloadAll,
  };
};
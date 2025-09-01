import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FileText, Search, Eye, Trash2, Calendar, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import type { Memoria } from "../types";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
interface MemoriasTableProps {
  memorias: Memoria[];
  isLoading: boolean;
  onDelete?: (memoriaId: string) => void;
  onUpload?: (files: FileList | null) => void;
  isDeleting?: boolean;
  title?: string;
  description?: string;
  emptyMessage?: string;
}
export default function MemoriasTable({
  memorias,
  isLoading,
  onDelete,
  onUpload,
  isDeleting = false,
  title = "Memorias",
  description = "Gestión de las memorias académicas",
  emptyMessage = "No se encontraron memorias"
}: MemoriasTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    canDeleteMemoria
  } = useUser();
  const {
    toast
  } = useToast();
  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "COMPLETED":
        return "default";
      case "EXTRACTING":
        return "secondary";
      case "UPLOADED":
        return "outline";
      case "FAILED":
        return "destructive";
      default:
        return "secondary";
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "Completada";
      case "EXTRACTING":
        return "En progreso";
      case "UPLOADED":
        return "Subida";
      case "FAILED":
        return "Error";
      default:
        return "Desconocido";
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const handleDeleteMemoria = async (memoriaId: string, filename: string) => {
    if (!onDelete) return;
    try {
      onDelete(memoriaId);
      toast({
        title: "Memoria eliminada",
        description: `${filename} ha sido eliminada correctamente.`
      });
    } catch (error) {
      toast({
        title: "Error al eliminar",
        description: `Error al eliminar ${filename}`,
        variant: "destructive"
      });
    }
  };
  const filteredMemorias = (memorias || []).filter(memoria => {
    const matchesSearch = memoria.filename.toLowerCase().includes(searchTerm.toLowerCase()) || memoria.titulacion.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  if (isLoading) {
    return <Card>
        <CardHeader>
          <CardTitle className="animate-pulse">
            <div className="h-6 bg-muted rounded w-1/3"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded"></div>
              </div>)}
          </div>
        </CardContent>
      </Card>;
  }
  return <Card>
        <CardHeader>
          
          <div className="flex items-center gap-4">
            {/* Search Filter */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Buscar por nombre de archivo o titulación..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            {onUpload && <Button asChild>
                <label className="cursor-pointer">
                  <Plus className="w-4 h-4 mr-2" />
                  Añadir Memoria
                  <input type="file" className="hidden" accept=".pdf,.docx" multiple onChange={e => onUpload(e.target.files)} />
                </label>
              </Button>}
          </div>
        </CardHeader>
        <CardContent>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titulación</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Progreso</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMemorias.map(memoria => <TableRow key={memoria.id}>
                    <TableCell>
                      <div className="max-w-xs truncate text-foreground">
                        {memoria.titulacion}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(memoria.status)}>
                        {getStatusText(memoria.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="text-foreground">{memoria.guiasGeneradas}/{memoria.materias}</div>
                        <div className="text-muted-foreground">guías</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{formatDate(memoria.uploadedAt)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/memorias/${memoria.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver guías
                          </Link>
                        </Button>
                        {canDeleteMemoria() && onDelete && <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" disabled={isDeleting}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar memoria?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Se eliminará permanentemente la memoria "{memoria.filename}" y todas sus guías asociadas.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteMemoria(memoria.id, memoria.filename)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>}
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </div>
          
          {filteredMemorias.length === 0 && <div className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">{emptyMessage}</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Intenta ajustar la búsqueda" : "No hay memorias disponibles en este momento"}
              </p>
            </div>}
        </CardContent>
    </Card>;
}
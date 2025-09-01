
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ArrowLeft,
  FileText,
  Download,
  Eye,
  AlertTriangle,
  User,
  Calendar,
  Building,
  BookOpen,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import { useMemoriaDetail } from "../hooks/useMemorias";
import { useMaterias } from "../hooks/useMaterias";
import { useGuias, useGuiaDownloads } from "../hooks/useGuias";
import type { Memoria, MateriaResumen } from "../types";
import { useToast } from "@/hooks/use-toast";

export default function GuiasList() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const memoriaDetail = useMemoriaDetail(id || "");
  const { downloadAll, downloadPDF } = useGuiaDownloads();

  const handleMassiveDownload = async () => {
    if (!id) return;
    try {
      await downloadAll(id);
      toast({
        title: "Descarga iniciada",
        description: "Se están descargando todas las guías",
      });
    } catch (error) {
      toast({
        title: "Error al descargar",
        description: "No se pudieron descargar las guías",
        variant: "destructive"
      });
    }
  };

  const handleDownloadGuia = async (materiaId: string) => {
    if (!id) return;
    try {
      await downloadPDF(id, materiaId);
    } catch (error) {
      toast({
        title: "Error al descargar",
        description: "No se pudo descargar la guía",
        variant: "destructive"
      });
    }
  };

  const getEstadoVariant = (estado: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (estado) {
      case "GENERADA": return "default";
      case "READY": return "default";
      case "EN_PROGRESO": return "secondary";
      case "PROCESSING": return "secondary";
      case "FAILED": return "destructive";
      default: return "outline";
    }
  };

  const getEstadoText = (estado: string) => {
    switch (estado) {
      case "GENERADA": return "Generada";
      case "READY": return "Generada";
      case "EN_PROGRESO": return "En progreso";
      case "PROCESSING": return "En progreso";
      case "FAILED": return "Error";
      default: return estado;
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

  const { data: memoriaDetalle, isLoading: loading } = memoriaDetail;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!memoriaDetalle) {
    return (
      <div className="text-center py-8">
        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Memoria no encontrada</h3>
        <p className="text-muted-foreground mb-4">
          La memoria solicitada no existe o no está disponible
        </p>
        <Button asChild>
          <Link to="/memorias">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Memorias
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/memorias">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Link>
        </Button>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">{memoriaDetalle.titulacion}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={memoriaDetalle.status === "COMPLETED" ? "default" : "secondary"}>
            {memoriaDetalle.status === "COMPLETED" ? "COMPLETED" : memoriaDetalle.status}
          </Badge>
        </div>
      </div>

      {/* Información General */}
      <Card>
        <CardHeader>
          <CardTitle>Información General</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Curso Académico</p>
              <p className="text-foreground">{memoriaDetalle.cursoAcademico}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Escuela/Facultad</p>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-muted-foreground" />
                <p className="text-foreground">{memoriaDetalle.escuela}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Plan</p>
              <p className="text-foreground">{memoriaDetalle.plan}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progreso de Guías */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso de Guías</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">{memoriaDetalle.guiasGeneradas}/{memoriaDetalle.totalMaterias}</span>
              </div>
              <p className="text-sm text-muted-foreground">Guías generadas</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold text-foreground">{memoriaDetalle.guiasCompletadas}</span>
              </div>
              <p className="text-sm text-muted-foreground">Completadas</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-2xl font-bold text-foreground">{memoriaDetalle.guiasPendientes}</span>
              </div>
              <p className="text-sm text-muted-foreground">En progreso</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-destructive" />
                <span className="text-2xl font-bold text-foreground">{memoriaDetalle.errores}</span>
              </div>
              <p className="text-sm text-muted-foreground">Errores</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Materias */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Materias</CardTitle>
            <Button variant="outline" size="sm" onClick={handleMassiveDownload}>
              <Download className="w-4 h-4 mr-2" />
              Descargar titulación
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>ECTS</TableHead>
                  <TableHead>Carácter</TableHead>
                  <TableHead>Curso/Semestre</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {memoriaDetalle.materias.map((materia) => (
                  <TableRow key={materia.id}>
                    <TableCell className="font-medium">{materia.codigo}</TableCell>
                    <TableCell>{materia.nombre}</TableCell>
                    <TableCell>{materia.ects}</TableCell>
                    <TableCell>{materia.caracter}</TableCell>
                    <TableCell>{materia.cursoSemestre}</TableCell>
                    <TableCell>
                      <Badge variant={getEstadoVariant(materia.estado)}>
                        {getEstadoText(materia.estado)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {materia.estado === "GENERADA" && (
                          <>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/memorias/${memoriaDetalle.id}/materias/${materia.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                Ver guía
                              </Link>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDownloadGuia(materia.id)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Errores Detectados */}
      {memoriaDetalle.erroresDetectados.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Errores Detectados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Materia</TableHead>
                    <TableHead>Tipo de Error</TableHead>
                    <TableHead>Mensaje</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {memoriaDetalle.erroresDetectados.map((error, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{error.materia}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{error.tipoError}</Badge>
                      </TableCell>
                      <TableCell>{error.mensaje}</TableCell>
                      <TableCell>{formatDate(error.fecha)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

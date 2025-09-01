import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Download,
  Eye,
  Edit,
  Save,
  XCircle,
  Clock,
  User,
  BookOpen,
  FileDown,
  FileText
} from "lucide-react";
import { useMateriaDetail } from "../hooks/useMaterias";
import { useMemoriaDetail } from "../hooks/useMemorias";
import { useGuiaDownloads } from "../hooks/useGuias";
import type { MateriaDetalle } from "../types";
import { useToast } from "@/hooks/use-toast";

export default function GuiaDetail() {
  const { memoriaId, materiaId } = useParams();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<MateriaDetalle>>({});
  const [evaluacionValues, setEvaluacionValues] = useState<{[key: number]: number}>({});
  const [versionComment, setVersionComment] = useState("");
  const [lastSavedComment, setLastSavedComment] = useState("");
  const { materia, isLoading, error, updateMateria } = useMateriaDetail(memoriaId || "", materiaId || "");
  const { data: memoriaData, isLoading: isLoadingMemoria } = useMemoriaDetail(memoriaId || "");
  const { downloadPDF } = useGuiaDownloads();

  // Inicializar el comentario guardado desde los datos de la API
  useEffect(() => {
    if (materia?.versionComment) {
      setLastSavedComment(materia.versionComment);
    }
  }, [materia?.versionComment]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleSave = async () => {
    if (!memoriaId || !materiaId) return;
    
    // Validar campos requeridos
    const cursoAcademico = editedData.cursoAcademico || materia.cursoAcademico || "2025-26";
    const docenteCoordinador = editedData.docenteCoordinador !== undefined 
      ? editedData.docenteCoordinador 
      : (materia.docenteCoordinador || "");
    
    console.log("Validando campos:", {
      cursoAcademico,
      docenteCoordinador,
      editedData: editedData,
      materiaOriginal: {
        cursoAcademico: materia.cursoAcademico,
        docenteCoordinador: materia.docenteCoordinador
      }
    });
    
    if (!cursoAcademico || cursoAcademico.trim() === "") {
      toast({
        title: "Campo requerido",
        description: "El campo 'Curso Académico' es obligatorio",
        variant: "destructive"
      });
      return;
    }
    
    if (!docenteCoordinador || docenteCoordinador.trim() === "") {
      toast({
        title: "Campo requerido",
        description: "El campo 'Docente Coordinador' es obligatorio",
        variant: "destructive"
      });
      return;
    }
    
    // Validar que los valores de evaluación sumen 100%
    const totalEvaluacion = Object.values(evaluacionValues).reduce((sum, val) => sum + (val || 0), 0);
    if (totalEvaluacion !== 100) {
      toast({
        title: "Error de validación",
        description: "Los porcentajes de evaluación deben sumar exactamente 100%",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Incluir el comentario de versión y curso académico en los datos guardados
      const dataWithComment = {
        ...editedData,
        versionComment: versionComment.trim(),
        cursoAcademicoVersion: editedData.cursoAcademico || materia.cursoAcademico
      };
      
      updateMateria(dataWithComment);
      
      // Actualizar el comentario guardado si se proporcionó uno
      if (versionComment.trim()) {
        setLastSavedComment(versionComment.trim());
      }
      
      setIsEditing(false);
      setVersionComment(""); // Limpiar el campo después de guardar
      toast({
        title: "Cambios guardados",
        description: "La guía se ha actualizado correctamente",
      });
      console.log("Guardando cambios:", dataWithComment);
      console.log("Valores de evaluación:", evaluacionValues);
    } catch (error) {
      toast({
        title: "Error al guardar",
        description: "No se pudieron guardar los cambios",
        variant: "destructive"
      });
    }
  };


  const exportToPDF = async () => {
    if (!memoriaId || !materiaId) return;
    try {
      await downloadPDF(memoriaId, materiaId);
      console.log("Exportando a PDF...");
    } catch (error) {
      toast({
        title: "Error al exportar",
        description: "No se pudo exportar a PDF",
        variant: "destructive"
      });
    }
  };


  if (isLoading || isLoadingMemoria) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/4"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-40 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !materia) {
    return (
      <div className="text-center py-8">
        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Materia no encontrada</h3>
        <p className="text-muted-foreground mb-4">
          La materia solicitada no existe o no está disponible
        </p>
        <Button asChild>
           <Link to={`/memorias/${memoriaId}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/memorias" className="hover:text-foreground">Memorias</Link>
        <span>/</span>
         <Link to={`/memorias/${memoriaId}`} className="hover:text-foreground">Detalle</Link>
        <span>/</span>
        <span className="text-foreground">Guía de {materia.nombre}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
               <Link to={`/memorias/${memoriaId}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Guía de Aprendizaje - {materia.nombre}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{materia.codigo}</span>
            <span>•</span>
            <span>{materia.ects} ECTS</span>
            <span>•</span>
            <span>{materia.caracter}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Versión {materia?.metadata?.version || "1.0"}</Badge>
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            </>
          ) : null}
        </div>
      </div>

      {/* Campo de comentario de versión - Solo visible en modo edición */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Comentario de Versión</CardTitle>
            <CardDescription>
              Describe los cambios que estás realizando en esta versión
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Textarea
                placeholder="Ejemplo: Actualización de sistema de evaluación, presentación, etc."
                value={versionComment}
                onChange={(e) => setVersionComment(e.target.value)}
                rows={3}
                className="resize-none border-2 border-[hsl(var(--editing-border))]"
              />
              <Edit className="w-4 h-4 text-muted-foreground absolute top-2 right-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`transition-colors ${
            isEditing 
              ? "cursor-not-allowed opacity-50" 
              : "cursor-pointer hover:bg-muted/50"
          }`} 
          onClick={isEditing ? undefined : () => setIsEditing(true)}
        >
          <CardContent className="p-4 text-center">
            <Edit className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Editar Contenido</p>
          </CardContent>
        </Card>
        
        <Card 
          className={`transition-colors ${
            isEditing 
              ? "cursor-not-allowed opacity-50" 
              : "cursor-pointer hover:bg-muted/50"
          }`} 
          onClick={isEditing ? undefined : exportToPDF}
        >
          <CardContent className="p-4 text-center">
            <FileDown className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Exportar PDF</p>
          </CardContent>
        </Card>
        
        {/* Vista Previa - Comentado para uso futuro
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="p-4 text-center">
            <Eye className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Vista Previa</p>
          </CardContent>
        </Card>
        */}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="contenido" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contenido">Contenido</TabsTrigger>
          <TabsTrigger value="metadatos">Metadatos</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="contenido" className="space-y-6">
          {/* Información básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Asignatura</Label>
                <p className="text-foreground">{materia.nombre}</p>
              </div>
              <div className="space-y-2">
                <Label>Titulación</Label>
                <p className="text-foreground">{memoriaData?.titulacion || "No disponible"}</p>
              </div>
              <div className="space-y-2">
                <Label>Escuela/Facultad</Label>
                <p className="text-foreground">{memoriaData?.escuela || "No disponible"}</p>
              </div>
              <div className="space-y-2">
                <Label>Curso</Label>
                <p className="text-foreground">{materia.curso}º</p>
              </div>
              <div className="space-y-2">
                <Label>ECTS</Label>
                <p className="text-foreground">{materia.ects}</p>
              </div>
              <div className="space-y-2">
                <Label>Carácter</Label>
                <p className="text-foreground">{materia.caracter}</p>
              </div>
              <div className="space-y-2">
                <Label>Idioma/s</Label>
                <p className="text-foreground">{materia.idioma}</p>
              </div>
              <div className="space-y-2">
                <Label>Modalidad</Label>
                <p className="text-foreground">{materia.modalidad}</p>
              </div>
              <div className="space-y-2">
                <Label>Semestre</Label>
                <p className="text-foreground">{materia.semestre}º</p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-1">
                  <span>Curso Académico</span>
                  {isEditing && <Edit className="w-3 h-3 text-muted-foreground" />}
                </Label>
                {isEditing ? (
                  <select
                    value={editedData.cursoAcademico || materia.cursoAcademico || "2025-26"}
                    onChange={(e) => setEditedData({...editedData, cursoAcademico: e.target.value})}
                    className="w-full h-10 px-3 rounded-md border-2 border-[hsl(var(--editing-border))] bg-background text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="2025-26">2025-26</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2023-24">2023-24</option>
                  </select>
                ) : (
                  <p className="text-foreground">{materia.cursoAcademico}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-1">
                  <span>Docente Coordinador</span>
                  {isEditing && <Edit className="w-3 h-3 text-muted-foreground" />}
                </Label>
                {isEditing ? (
                  <Input 
                    value={editedData.docenteCoordinador !== undefined 
                      ? editedData.docenteCoordinador 
                      : (materia.docenteCoordinador || "")}
                    onChange={(e) => setEditedData({...editedData, docenteCoordinador: e.target.value})}
                    className="border-2 border-[hsl(var(--editing-border))]"
                    placeholder="Nombre del docente coordinador"
                  />
                ) : (
                  <p className="text-foreground">{materia.docenteCoordinador}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Presentación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Presentación de la Materia</span>
                {isEditing && <Edit className="w-4 h-4 text-muted-foreground" />}
              </CardTitle>
              <CardDescription>
                Descripción general de la asignatura y sus objetivos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  rows={5}
                  value={materia.presentacion}
                  onChange={(e) => setEditedData({...editedData, presentacion: e.target.value})}
                  className="resize-none border-2 border-[hsl(var(--editing-border))]"
                />
              ) : (
                <p className="text-foreground whitespace-pre-wrap">{materia.presentacion}</p>
              )}
            </CardContent>
          </Card>

          {/* Competencias */}
          <Card>
            <CardHeader>
              <CardTitle>Competencias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {materia.competencias.map((competencia, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-foreground">{competencia}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resultados de Aprendizaje */}
          <Card>
            <CardHeader>
              <CardTitle>Resultados de Aprendizaje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {materia.resultadosAprendizaje.map((resultado, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-foreground">{resultado}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contenidos */}
          <Card>
            <CardHeader>
              <CardTitle>Contenidos de la Asignatura</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground whitespace-pre-wrap">{materia.contenidos}</p>
            </CardContent>
          </Card>

          {/* Actividades Formativas */}
          <Card>
            <CardHeader>
              <CardTitle>Actividades Formativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 text-sm font-medium text-muted-foreground">Actividad</th>
                      <th className="text-right p-2 text-sm font-medium text-muted-foreground">Horas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materia.actividadesFormativas.map((actividad, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 text-sm text-foreground">{actividad.actividad}</td>
                        <td className="p-2 text-sm text-foreground text-right">{actividad.horas}h</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="p-2 text-sm font-bold text-foreground">Total</td>
                      <td className="p-2 text-sm font-bold text-foreground text-right">
                        {materia.actividadesFormativas.reduce((sum, act) => sum + act.horas, 0)}h
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Sistema de Evaluación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Sistema de Evaluación</span>
                {isEditing && <Edit className="w-4 h-4 text-muted-foreground" />}
              </CardTitle>
              <CardDescription>
                Los rangos indican los límites permitidos. Ingresa un valor único dentro de cada rango.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materia.sistemaEvaluacion.map((sistema, index) => {
                  const range = sistema.porcentaje.split('-');
                  const min = parseInt(range[0]);
                  const max = range.length > 1 ? parseInt(range[1]) : min;
                  const currentValue = evaluacionValues[index] || 0;
                  const isOutOfRange = currentValue < min || currentValue > max;
                  
                  return (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-foreground">{sistema.sistema}</h4>
                           <div className="flex items-center space-x-2">
                             <Badge variant="outline" className="text-xs">
                               Rango: {sistema.porcentaje}
                             </Badge>
                             {isEditing && (
                               <div className="flex items-center space-x-1">
                                 <Input 
                                   type="number"
                                   min={min}
                                   max={max}
                                   value={evaluacionValues[index] || ''}
                                   onChange={(e) => {
                                     const value = parseInt(e.target.value) || 0;
                                     setEvaluacionValues(prev => ({
                                       ...prev,
                                       [index]: value
                                     }));
                                   }}
                                    className={`w-16 h-8 text-xs border-2 ${
                                      isOutOfRange && currentValue > 0 ? 'border-destructive' : 'border-[hsl(var(--editing-border))]'
                                    }`}
                                   placeholder={min.toString()}
                                 />
                              <span className="text-xs text-muted-foreground">%</span>
                                 <Edit className="w-3 h-3 text-muted-foreground" />
                               </div>
                             )}
                           </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{sistema.descripcion}</p>
                        {isEditing && isOutOfRange && currentValue > 0 && (
                          <p className="text-xs text-destructive mt-1">
                            El valor debe estar entre {min}% y {max}%
                          </p>
                        )}
                      </div>
                  );
                })}
                
                {/* Total */}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-foreground">Total</h4>
                    <div className="flex flex-col items-end space-y-1">
                      {isEditing && (
                        <>
                          <span className={`font-bold text-sm ${
                            Object.values(evaluacionValues).reduce((sum, val) => sum + (val || 0), 0) === 100
                              ? 'text-success'
                              : 'text-destructive'
                          }`}>
                            {Object.values(evaluacionValues).reduce((sum, val) => sum + (val || 0), 0)}%
                          </span>
                          {Object.values(evaluacionValues).reduce((sum, val) => sum + (val || 0), 0) !== 100 && (
                            <p className="text-xs text-destructive">
                              La suma de los valores debe ser 100%
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </TabsContent>

        <TabsContent value="metadatos">
          <Card>
            <CardHeader>
              <CardTitle>Metadatos de la Guía</CardTitle>
              <CardDescription>
                Información técnica sobre la generación y estado de la guía
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                   <div className="flex items-center space-x-2">
                     <Clock className="w-4 h-4 text-muted-foreground" />
                     <span className="text-sm text-muted-foreground">Última modificación:</span>
                     <span className="text-sm text-foreground">{materia?.metadata?.ultimaModificacion ? formatDate(materia.metadata.ultimaModificacion) : "No disponible"}</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <User className="w-4 h-4 text-muted-foreground" />
                     <span className="text-sm text-muted-foreground">Estado:</span>
                     <Badge variant="secondary">{materia?.metadata?.estado || "Sin estado"}</Badge>
                   </div>
                 </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

<TabsContent value="historial">
  <Card>
    <CardHeader>
      <CardTitle>Historial de Versiones</CardTitle>
      <CardDescription>
        Registro de cambios y versiones de la guía
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="border border-border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium text-foreground">Versión {materia?.metadata?.version || "1.0"} (Actual)</h4>
              <p className="text-sm text-muted-foreground">
                {lastSavedComment || "Sin comentarios de versión"}
              </p>
            </div>
            <Badge variant="default">Actual</Badge>
          </div>
           <div className="flex items-center space-x-4 text-sm text-muted-foreground">
             <span>{materia?.metadata?.ultimaModificacion ? formatDate(materia.metadata.ultimaModificacion) : "No disponible"}</span>
             <span>•</span>
             <span>Sistema</span>
             <span>•</span>
             <span>Curso: {materia?.cursoAcademico || "No disponible"}</span>
           </div>
        </div>
      </div>
    </CardContent>
  </Card>
</TabsContent>

      </Tabs>
    </div>
  );
}
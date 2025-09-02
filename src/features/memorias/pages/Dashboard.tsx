
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle,
  Plus,
  Upload
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemorias } from "../hooks/useMemorias";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { MemoriasTable } from "../components";

export default function Dashboard() {
  const { toast } = useToast();
  const { memorias, isLoading, uploadMemoria, deleteMemoria, isDeleting } = useMemorias();
  const { canUploadMemoria } = useUser();

  // Calcular estadísticas desde los datos reales
  const totalMemorias = memorias?.length || 0;
  const guiasGeneradas = memorias?.reduce((sum, m) => sum + m.guiasGeneradas, 0) || 0;
  const enProceso = memorias?.filter(m => m.status === "EXTRACTING").length || 0;
  const completadas = memorias?.filter(m => m.status === "COMPLETED").length || 0;

  const stats = [
    {
      title: "Total Memorias",
      value: totalMemorias.toString(),
      description: "Memorias en el sistema",
      icon: FileText,
      trend: `${totalMemorias > 0 ? '+' + totalMemorias : '0'}`
    },
    {
      title: "Guías Generadas", 
      value: guiasGeneradas.toString(),
      description: "Guías completadas",
      icon: BookOpen,
      trend: `+${guiasGeneradas}`
    },
    {
      title: "En Proceso",
      value: enProceso.toString(), 
      description: "En progreso",
      icon: AlertTriangle,
      trend: enProceso > 0 ? `${enProceso}` : "0"
    },
    {
      title: "Completadas",
      value: completadas.toString(),
      description: "Listas para descarga",
      icon: CheckCircle,
      trend: `+${completadas}`
    }
  ];

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    for (const file of Array.from(files)) {
      if (file.type === "application/pdf" || file.name.endsWith('.docx')) {
        try {
          uploadMemoria(file);
          toast({
            title: "Memoria subida",
            description: `${file.name} se ha subido correctamente.`,
          });
        } catch (error) {
          toast({
            title: "Error al subir", 
            description: `Error al subir ${file.name}`,
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Formato no válido",
          description: "Solo se permiten archivos PDF y DOCX.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Panel de control</h1>
        <p className="text-muted-foreground mt-2">
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">
          Estadísticas del sistema
        </h2>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">{stat.trend}</span> {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
              </div>


      {/* Gestión de Memorias */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">
          Gestión de titulaciones
        </h2>
        <MemoriasTable
          memorias={memorias}
          isLoading={isLoading}
          onDelete={deleteMemoria}
          isDeleting={isDeleting}
          onUpload={canUploadMemoria() ? handleFileUpload : undefined}
          title="Gestión de Memorias"
          emptyMessage="No hay memorias en el sistema"
        />
      </div>

    </div>
  );
}

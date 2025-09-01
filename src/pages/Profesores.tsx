import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, FileText, Settings } from "lucide-react";

export default function Profesores() {
  const { user } = useUser();

  const profesorStats = [
    {
      title: "Guías Asignadas",
      value: "12",
      icon: BookOpen,
      description: "Guías de aprendizaje asignadas"
    },
    {
      title: "Estudiantes",
      value: "245",
      icon: Users,
      description: "Total de estudiantes en mis asignaturas"
    },
    {
      title: "Pendientes",
      value: "3",
      icon: FileText,
      description: "Guías pendientes por completar"
    }
  ];

  const quickActions = [
    {
      title: "Ver Mis Guías",
      description: "Acceder a las guías de aprendizaje asignadas",
      icon: BookOpen,
      href: "/memorias"
    },
    {
      title: "Gestionar Perfil",
      description: "Actualizar información personal y preferencias",
      icon: Settings,
      href: "#"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel del Profesor</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Bienvenido, {user?.name}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profesorStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Card key={action.title} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Icon className="h-5 w-5" />
                  {action.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{action.description}</p>
                <Button variant="outline" className="w-full">
                  Acceder
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
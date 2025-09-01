import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/contexts/UserContext";
import Layout from "./components/Layout";
import Dashboard from "./features/memorias/pages/Dashboard";
import MemoriasList from "./features/memorias/pages/MemoriasList";
import GuiasList from "./features/memorias/pages/GuiasList";
import GuiaDetail from "./features/memorias/pages/GuiaDetail";
import Profesores from "./pages/Profesores";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Componente para manejar las rutas protegidas y redirección por rol
function ProtectedRoutes() {
  const { user, isLoading, isAuthenticated } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout />
  );
}

// Componente para redirección automática según el rol
function RoleBasedRedirect() {
  const { user } = useUser();
  
  if (user?.role === "coordinador") {
    return <Navigate to="/dashboard" replace />;
  } else if (user?.role === "profesor") {
    return <Navigate to="/profesores" replace />;
  }
  
  return <Navigate to="/dashboard" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoutes />}>
              <Route index element={<RoleBasedRedirect />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profesores" element={<Profesores />} />
              <Route path="memorias" element={<MemoriasList />} />
              <Route path="memorias/:id" element={<GuiasList />} />
              <Route path="memorias/:memoriaId/materias/:materiaId" element={<GuiaDetail />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;

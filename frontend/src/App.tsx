import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";

// Importação das páginas
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";
import EditProject from "./pages/EditProject";
import EventsPage from "./pages/EventsPage";
import EventDetail from "./pages/EventDetail";
import UserManagement from "./pages/UserManagement";
import SystemSettings from "./pages/SystemSettings";
import CreateGroup from "./pages/CreateGroup";
import JoinGroup from "./pages/JoinGroup";
import GroupChat from "./pages/GroupChat";
import NotFound from "./pages/NotFound";

// Importação da rota privada
import PrivateRoute from "./routes/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        {/* O AuthProvider envolve toda a aplicação para fornecer o contexto de autenticação */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/auth/:type" element={<Auth />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />

          {/* Rotas privadas (qualquer usuário logado) */}
          <Route path="/dashboard/:role" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/projects/create" element={
            <PrivateRoute allowedRoles={['student']}>
              <CreateProject />
            </PrivateRoute>
          } />

          <Route path="/projects/:projectId/edit" element={
            <PrivateRoute allowedRoles={['student']}>
              <EditProject />
            </PrivateRoute>
          } />

          <Route path="/group/create" element={
            <PrivateRoute allowedRoles={['student']}>
              <CreateGroup />
            </PrivateRoute>
          } />

          <Route path="/group/join" element={
            <PrivateRoute allowedRoles={['student']}>
              <JoinGroup />
            </PrivateRoute>
          } />

          <Route path="/group/chat" element={
            <PrivateRoute allowedRoles={['student']}>
              <GroupChat />
            </PrivateRoute>
          } />

          {/* Rotas apenas para administradores */}
          <Route path="/users" element={
            <PrivateRoute allowedRoles={['admin']}>
              <UserManagement />
            </PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute allowedRoles={['admin']}>
              <SystemSettings />
            </PrivateRoute>
          } />

          {/* Página de erro para rotas inexistentes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

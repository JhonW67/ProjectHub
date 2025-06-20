import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { UserCircle, BookOpen, Star, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  evaluations?: { professorId: string; score?: number }[];
  eventId?: string;
}

interface Event {
  id: string;
  title: string;
  theme: string;
  isActive: boolean;
}

interface ProjectCardProps {
  project: Project;
  buttonLabel: string;
  onClick: () => void;
  score?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, buttonLabel, onClick, score }) => (
  <div className="p-4 border rounded mb-2 flex justify-between items-center">
    <div>
      <h3 className="font-semibold">{project.title}</h3>
      <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
      {score !== undefined && (
        <div className="flex items-center gap-1 mt-1 text-yellow-600">
          <Star size={16} /> <span className="text-sm">{score.toFixed(1)}</span>
        </div>
      )}
    </div>
    <Button size="sm" onClick={onClick}>{buttonLabel}</Button>
  </div>
);

const ProfessorDashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('currentUser') || '{}');
    } catch {
      return {};
    }
  }, []);

  const { data: events = [], isLoading: loadingEvents } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: () => api.get('/events').then(res => res.data),
  });

  const { data: projects = [], isLoading: loadingProjects } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then(res => res.data),
  });

  if (!isAuthenticated || !user.id) {
    navigate('/login');
    return null;
  }

  if (loadingEvents || loadingProjects) return <p className="text-center text-muted">Carregando dados…</p>;

  const activeEvents = events.filter(e => e.isActive);

  const projectsToEvaluate = projects.filter(p => {
    const hasEval = p.evaluations?.some(ev => ev.professorId === user.id);
    return !hasEval && activeEvents.some(ev => ev.id === p.eventId);
  });

  const evaluatedProjects = projects.filter(p =>
    p.evaluations?.some(ev => ev.professorId === user.id)
  );

  return (
    <div className="space-y-6">
      {/* Info do Professor */}
      <Card className="univag-card md:w-1/3">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <UserCircle size={20} /> Informações do Professor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Curso:</strong> {user.course}</p>
        </CardContent>
      </Card>

      {/* Eventos Ativos */}
      <Card className="univag-card md:w-2/3">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar size={20} /> Eventos Ativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeEvents.length > 0 ? (
            activeEvents.map(ev => (
              <div key={ev.id} className="p-4 border rounded mb-2 flex justify-between">
                <div>
                  <h3 className="font-semibold">{ev.title}</h3>
                  <p className="text-sm text-gray-500">{ev.theme}</p>
                </div>
                <Button size="sm" onClick={() => navigate(`/events/${ev.id}`)}>Ver</Button>
              </div>
            ))
          ) : (
            <p>Nenhum evento ativo</p>
          )}
        </CardContent>
      </Card>

      {/* Projetos para Avaliação */}
      <Card className="univag-card">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen size={20} /> Projetos para Avaliação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending">Pendentes ({projectsToEvaluate.length})</TabsTrigger>
              <TabsTrigger value="evaluated">Avaliados ({evaluatedProjects.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              {projectsToEvaluate.length > 0 ? (
                projectsToEvaluate.map(p => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    buttonLabel="Avaliar"
                    onClick={() => navigate(`/projects/${p.id}`)}
                  />
                ))
              ) : (
                <p>Nenhum projeto pendente</p>
              )}
            </TabsContent>

            <TabsContent value="evaluated">
              {evaluatedProjects.length > 0 ? (
                evaluatedProjects.map(p => {
                  const ev = p.evaluations?.find(e => e.professorId === user.id);
                  return (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      score={ev?.score}
                      buttonLabel="Ver"
                      onClick={() => navigate(`/projects/${p.id}`)}
                    />
                  );
                })
              ) : (
                <p>Nenhum projeto avaliado</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessorDashboard;

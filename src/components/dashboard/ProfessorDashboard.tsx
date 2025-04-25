
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCircle, BookOpen, FileText, Star, Calendar, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User, Project, projects, Event, events } from '@/lib/data';

interface ProfessorDashboardProps {
  user: User;
}

const ProfessorDashboard: React.FC<ProfessorDashboardProps> = ({ user }) => {
  const navigate = useNavigate();
  
  // Get the active events
  const activeEvents = events.filter(event => event.isActive);
  
  // Get projects that need evaluation
  const projectsToEvaluate = projects.filter(project => {
    const hasEvaluated = project.evaluations.some(evaluation => evaluation.professorId === user.id);
    return !hasEvaluated && activeEvents.some(event => event.id === project.eventId);
  });
  
  // Get projects already evaluated by this professor
  const evaluatedProjects = projects.filter(project => 
    project.evaluations.some(evaluation => evaluation.professorId === user.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Professor Info Card */}
        <Card className="univag-card md:w-1/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              Informações do Professor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Nome completo</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">E-mail</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Curso</p>
              <p className="font-medium">{user.course}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Disciplinas</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.classes?.map((className, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {className}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Active Events Card */}
        <Card className="univag-card md:w-2/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Eventos Ativos
            </CardTitle>
            <CardDescription>
              Eventos que estão ocorrendo atualmente
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeEvents.length > 0 ? (
              <div className="space-y-4">
                {activeEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-univag-navy">{event.title}</h3>
                        <p className="text-sm text-gray-500">Tema: {event.theme}</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-univag-navy hover:bg-univag-darknavy"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/events/${event.id}`);
                        }}
                      >
                        Ver Evento
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">Nenhum evento ativo no momento</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Projects for Evaluation */}
      <Card className="univag-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Projetos para Avaliação
          </CardTitle>
          <CardDescription>
            Gerencie as avaliações dos projetos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="pending">Pendentes ({projectsToEvaluate.length})</TabsTrigger>
              <TabsTrigger value="evaluated">Avaliados ({evaluatedProjects.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending" className="space-y-4">
              {projectsToEvaluate.length > 0 ? (
                projectsToEvaluate.map(project => (
                  <div 
                    key={project.id} 
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-univag-navy">{project.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pendente</Badge>
                        <Button 
                          size="sm" 
                          onClick={() => navigate(`/projects/${project.id}`)}
                          className="bg-univag-navy hover:bg-univag-darknavy"
                        >
                          <Star className="h-4 w-4 mr-2" /> Avaliar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">Nenhum projeto pendente para avaliação</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="evaluated" className="space-y-4">
              {evaluatedProjects.length > 0 ? (
                evaluatedProjects.map(project => {
                  const evaluation = project.evaluations.find(
                    evaluation => evaluation.professorId === user.id
                  );
                  
                  return (
                    <div 
                      key={project.id} 
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-univag-navy">{project.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{evaluation?.score.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Avaliado</Badge>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/projects/${project.id}`)}
                          >
                            <Eye className="h-4 w-4 mr-2" /> Ver Projeto
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-6 text-center">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">Nenhum projeto foi avaliado ainda</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessorDashboard;

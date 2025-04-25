
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, Users, FileText, Plus, School, Calendar, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Group, Project, User, getUserById, getProjectsByGroupId } from '@/lib/data';

interface StudentDashboardProps {
  user: User;
  group?: Group;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, group }) => {
  const navigate = useNavigate();
  const projects = group ? getProjectsByGroupId(group.id) : [];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Student Info Card */}
        <Card className="univag-card md:w-1/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              Informações do Aluno
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
              <p className="text-sm text-gray-500">Matrícula</p>
              <p className="font-medium">{user.registration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Curso</p>
              <p className="font-medium">{user.course}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Semestre</p>
              <p className="font-medium">{user.semester}º semestre</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Group Info Card */}
        <Card className="univag-card md:w-2/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Informações do Grupo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {group ? (
              <>
                <div>
                  <p className="text-sm text-gray-500">Nome do grupo</p>
                  <p className="font-medium">{group.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Curso</p>
                  <p className="font-medium">{group.course}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Semestre</p>
                  <p className="font-medium">{group.semester}º semestre</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Membros</p>
                  <div className="space-y-2">
                    {group.members.map(memberId => {
                      const member = getUserById(memberId);
                      return (
                        <div key={memberId} className="flex items-center gap-2">
                          <Badge className="bg-gray-100 text-gray-800">{member?.name}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <Button 
                    onClick={() => navigate('/group/chat')}
                    className="bg-univag-navy hover:bg-univag-darknavy"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" /> Chat do Grupo
                  </Button>
                </div>
              </>
            ) : (
              <div className="py-6 text-center">
                <School className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 mb-4">Você ainda não está em um grupo</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Button 
                    onClick={() => navigate('/group/create')}
                    className="bg-univag-navy hover:bg-univag-darknavy"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Criar Grupo
                  </Button>
                  <Button 
                    onClick={() => navigate('/group/join')}
                    variant="outline"
                  >
                    Solicitar Entrada em Grupo
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Projects Section */}
      <Card className="univag-card">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Projetos do Grupo
              </CardTitle>
              <CardDescription>
                Gerencie os projetos do seu grupo
              </CardDescription>
            </div>
            <Button 
              onClick={() => navigate('/projects/create')}
              className="bg-univag-navy hover:bg-univag-darknavy"
              disabled={!group}
            >
              <Plus className="h-4 w-4 mr-2" /> Novo Projeto
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {group && projects.length > 0 ? (
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Projetos Ativos</TabsTrigger>
                <TabsTrigger value="all">Todos os Projetos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="space-y-4">
                {projects.filter(p => true).map(project => (
                  <div 
                    key={project.id} 
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-univag-navy">{project.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Ativo</Badge>
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="all" className="space-y-4">
                {projects.map(project => (
                  <div 
                    key={project.id} 
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-univag-navy">{project.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Ativo</Badge>
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="py-6 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600 mb-4">Nenhum projeto criado ainda</p>
              {group ? (
                <Button 
                  onClick={() => navigate('/projects/create')}
                  className="bg-univag-navy hover:bg-univag-darknavy"
                >
                  <Plus className="h-4 w-4 mr-2" /> Criar Projeto
                </Button>
              ) : (
                <p className="text-sm text-gray-500">Entre em um grupo para criar projetos</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;

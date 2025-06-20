import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, Users, FileText, Plus, School, MessageSquare } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface Group {
  id: number;
  name: string;
  course: string;
  semester: number;
  members: number[];
}

interface User {
  id: number;
  name: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  progress?: number;
  tasks?: { id: number; title: string; completed: boolean }[];
  comments?: { id: number; user: string; message: string }[];
}

const StudentDashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const { data: group, isLoading: loadingGroup, error: errorGroup } = useQuery<Group>({
    queryKey: ['group', user.id],
    queryFn: () => api.get(`/users/${user.id}/group`).then(res => res.data),
    enabled: isAuthenticated,
  });

  const groupId = group?.id;
  const { data: projects = [], isLoading: loadingProjects, error: errorProjects } = useQuery<Project[]>({
    queryKey: ['groupProjects', groupId],
    queryFn: () => api.get(`/groups/${groupId}/projects`).then(res => res.data),
    enabled: !!groupId,
  });

  const { data: memberDetails = [] } = useQuery<User[]>({
    queryKey: ['groupMembers', group?.members],
    queryFn: () => Promise.all(group?.members.map(id => api.get(`/users/${id}`).then(res => res.data))) ?? [],
    enabled: !!group,
  });

  if (!isAuthenticated) return <p className="text-center text-red-500">Você precisa estar logado.</p>;
  if (loadingGroup) return <p className="text-center">Carregando informações do grupo…</p>;
  if (errorGroup) return <p className="text-center text-red-500">Erro ao carregar informações do grupo.</p>;

  return (
    <div className="space-y-6">
      <Card className="univag-card">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2"><UserCircle /> Informações do Aluno</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Matrícula:</strong> {user.registration}</p>
          <p><strong>Curso:</strong> {user.course}</p>
          <p><strong>Semestre:</strong> {user.semester}º</p>
        </CardContent>
      </Card>

      <Card className="univag-card">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2"><Users /> Informações do Grupo</CardTitle>
        </CardHeader>
        <CardContent>
          {group ? (
            <>
              <p><strong>Nome do grupo:</strong> {group.name}</p>
              <p><strong>Curso:</strong> {group.course}</p>
              <p><strong>Semestre:</strong> {group.semester}º</p>
              <div className="mt-2">
                <strong>Membros:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {memberDetails.map(m => (
                    <Badge key={m.id}>{m.name}</Badge>
                  ))}
                </div>
              </div>
              <Button onClick={() => navigate('/group/chat')} className="mt-4">
                <MessageSquare className="mr-2" /> Chat do Grupo
              </Button>
            </>
          ) : (
            <div className="text-center py-6">
              <School className="mx-auto mb-2" />
              <p>Você ainda não está em um grupo</p>
              <div className="flex justify-center gap-3 mt-4">
                <Button onClick={() => navigate('/group/create')}>
                  <Plus className="mr-2" /> Criar Grupo
                </Button>
                <Button variant="outline" onClick={() => navigate('/group/join')}>
                  Entrar em Grupo
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="univag-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2"><FileText /> Projetos do Grupo</CardTitle>
            <Button onClick={() => navigate('/projects/create')} disabled={!group}>
              <Plus className="mr-2" /> Novo Projeto
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loadingProjects ? (
            <p>Carregando projetos…</p>
          ) : errorProjects ? (
            <p className="text-red-500">Erro ao carregar projetos.</p>
          ) : group && projects.length > 0 ? (
            <Tabs defaultValue="active">
              <TabsList>
                <TabsTrigger value="active">Ativos</TabsTrigger>
                <TabsTrigger value="all">Todos</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {projects.filter(p => p.isActive).map(p => (
                  <Link
                    key={p.id}
                    to={`/projects/${p.id}`}
                    className="block p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-univag-navy">{p.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{p.description}</p>
                        <div className="text-xs mt-1 text-gray-600">Progresso: {p.progress ?? 0}%</div>
                        {p.progress !== undefined && (
                          <div className="w-full bg-gray-200 rounded h-2 mt-2">
                            <div className="bg-univag-navy h-2 rounded" style={{ width: `${p.progress}%` }} />
                          </div>
                        )}
                        {p.tasks && p.tasks.length > 0 && (
                          <ul className="list-disc list-inside text-sm mt-1">
                            {p.tasks.slice(0, 3).map(task => (
                              <li key={task.id} className={task.completed ? "line-through text-gray-400" : ""}>{task.title}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                    </div>
                  </Link>
                ))}
              </TabsContent>

              <TabsContent value="all" className="space-y-4">
                {projects.map(p => (
                  <Link
                    key={p.id}
                    to={`/projects/${p.id}`}
                    className="block p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <h3 className="font-semibold text-univag-navy">{p.title}</h3>
                    <p className="text-sm text-gray-500">{p.description}</p>
                    {p.isActive ? (
                      <Badge className="bg-green-100 text-green-800 mt-1">Ativo</Badge>
                    ) : (
                      <Badge className="bg-gray-200 text-gray-700 mt-1">Finalizado</Badge>
                    )}
                    {p.comments && p.comments.length > 0 && (
                      <div className="mt-2 text-sm text-gray-600">
                        Último comentário: "{p.comments[p.comments.length - 1].message}"
                      </div>
                    )}
                  </Link>
                ))}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center py-6">
              <p>Nenhum projeto criado ainda</p>
              {group && (
                <Button onClick={() => navigate('/projects/create')} className="mt-4">
                  <Plus className="mr-2" /> Criar Projeto
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;

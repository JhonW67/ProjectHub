import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, FileText, Settings, AlertTriangle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from '@/components/ui/input';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: events = [], isLoading: loadingEvents } = useQuery({
    queryKey: ['events'],
    queryFn: () => api.get('/events').then(res => res.data),
  });

  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users').then(res => res.data),
  });

  const { data: projects = [], isLoading: loadingProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then(res => res.data),
  });

  const isLoading = loadingEvents || loadingUsers || loadingProjects;

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjects = projects.filter(project =>
    project.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartData = [
    { name: "Usuários", total: filteredUsers.length },
    { name: "Projetos", total: filteredProjects.length },
    { name: "Eventos", total: events.length },
  ];

  if (isLoading) {
    return <p className="text-center text-gray-500">Carregando painel…</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-univag-navy dark:text-white mb-2">
          Painel Administrativo
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Gerencie todos os aspectos da plataforma ProjectHub
        </p>
      </div>

      {/* Campo de filtro global */}
      <div className="max-w-md">
        <Input
          placeholder="Filtrar por nome, email ou título de projeto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-univag-navy dark:bg-gray-800"
        />
      </div>

      <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-900 dark:text-white">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Aviso importante</AlertTitle>
        <AlertDescription>
          Existem eventos próximos que ainda não foram confirmados. Verifique a aba de eventos.
        </AlertDescription>
      </Alert>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Visão Geral</CardTitle>
          <CardDescription>
            Estatísticas resumidas da plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="total" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-900 dark:text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-univag-navy dark:text-blue-300" />
              Gestão de Eventos
            </CardTitle>
            <CardDescription>Gerencie os eventos e suas datas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Total de eventos: {events.length}
            </p>
            <Button
              variant="outline"
              className="w-full border-univag-navy text-univag-navy hover:bg-univag-navy hover:text-white"
              onClick={() => navigate('/events')}
            >
              Ver Eventos
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-900 dark:text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-univag-navy dark:text-blue-300" />
              Gestão de Usuários
            </CardTitle>
            <CardDescription>Gerencie alunos e professores</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Total de usuários: {filteredUsers.length}
            </p>
            <Button
              variant="outline"
              className="w-full border-univag-navy text-univag-navy hover:bg-univag-navy hover:text-white"
              onClick={() => navigate('/users')}
            >
              Gerenciar Usuários
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-900 dark:text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-univag-navy dark:text-blue-300" />
              Gestão de Projetos
            </CardTitle>
            <CardDescription>Controle todos os projetos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Total de projetos: {filteredProjects.length}
            </p>
            <Button
              variant="outline"
              className="w-full border-univag-navy text-univag-navy hover:bg-univag-navy hover:text-white"
              onClick={() => navigate('/projects')}
            >
              Ver Projetos
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-900 dark:text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-univag-navy dark:text-blue-300" />
              Configurações do Sistema
            </CardTitle>
            <CardDescription>Ajuste as configurações da plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Personalize os parâmetros gerais do sistema
            </p>
            <Button
              variant="outline"
              className="w-full border-univag-navy text-univag-navy hover:bg-univag-navy hover:text-white"
              onClick={() => navigate('/settings')}
            >
              Configurar Sistema
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

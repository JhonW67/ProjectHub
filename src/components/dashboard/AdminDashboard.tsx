
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, FileText, Settings } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-univag-navy mb-2">Painel Administrativo</h2>
        <p className="text-gray-600">Gerencie todos os aspectos da plataforma ProjectHub</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-univag-navy" />
              Gestão de Eventos
            </CardTitle>
            <CardDescription>Gerencie os eventos e suas datas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600">
              Controle a disponibilidade e datas dos eventos de apresentação de projetos.
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
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-univag-navy" />
              Gestão de Usuários
            </CardTitle>
            <CardDescription>Gerencie alunos e professores</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600">
              Controle o acesso e as permissões dos usuários da plataforma.
            </p>
            <Button 
              variant="outline" 
              className="w-full border-univag-navy text-univag-navy hover:bg-univag-navy hover:text-white"
            >
              Gerenciar Usuários
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-univag-navy" />
              Gestão de Projetos
            </CardTitle>
            <CardDescription>Controle todos os projetos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600">
              Visualize e gerencie todos os projetos submetidos na plataforma.
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
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-univag-navy" />
              Configurações do Sistema
            </CardTitle>
            <CardDescription>Ajuste as configurações da plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600">
              Configure aspectos técnicos e de funcionamento da plataforma.
            </p>
            <Button 
              variant="outline" 
              className="w-full border-univag-navy text-univag-navy hover:bg-univag-navy hover:text-white"
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

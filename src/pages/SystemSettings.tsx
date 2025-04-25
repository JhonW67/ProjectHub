
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Settings, 
  Save, 
  Calendar, 
  Shield, 
  Database, 
  Mail, 
  Bell
} from 'lucide-react';

const SystemSettings = () => {
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'ProjectHub UNIVAG',
    siteDescription: 'Plataforma de apresentação e avaliação de projetos da disciplina Projeto Extensionista Integrador',
    contactEmail: 'contato@univag.edu.br',
    maxFileSizeMB: 10,
    enableRegistrations: true,
    enablePublicProjects: true
  });
  
  const [eventSettings, setEventSettings] = useState({
    defaultEventDuration: 7,
    allowMultipleSubmissions: false,
    requireApproval: true,
    notifyBeforeEventDays: 3
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeoutMinutes: 60,
    passwordMinLength: 8,
    requireStrongPasswords: true,
    adminOnlyProjectDeletion: true,
  });
  
  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === 'number' ? Number(value) : value
    });
  };
  
  const handleGeneralToggleChange = (name: string, checked: boolean) => {
    setGeneralSettings({
      ...generalSettings,
      [name]: checked
    });
  };
  
  const handleEventSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setEventSettings({
      ...eventSettings,
      [name]: type === 'number' ? Number(value) : value
    });
  };
  
  const handleEventToggleChange = (name: string, checked: boolean) => {
    setEventSettings({
      ...eventSettings,
      [name]: checked
    });
  };
  
  const handleSecuritySettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === 'number' ? Number(value) : value
    });
  };
  
  const handleSecurityToggleChange = (name: string, checked: boolean) => {
    setSecuritySettings({
      ...securitySettings,
      [name]: checked
    });
  };
  
  const saveSettings = (settingType: string) => {
    toast({
      title: "Configurações salvas",
      description: `As configurações de ${settingType} foram atualizadas com sucesso.`,
      duration: 3000,
    });
  };
  
  return (
    <>
      <Helmet>
        <title>Configurações do Sistema | ProjectHub UNIVAG</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-univag-navy mb-2">Configurações do Sistema</h1>
              <p className="text-gray-600">Configure os parâmetros do ProjectHub UNIVAG</p>
            </div>
            
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Painel de Configurações
                </CardTitle>
                <CardDescription>
                  Ajuste as configurações do sistema para personalizar a experiência da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="general">
                  <TabsList className="mb-6">
                    <TabsTrigger value="general">Geral</TabsTrigger>
                    <TabsTrigger value="events">Eventos</TabsTrigger>
                    <TabsTrigger value="security">Segurança</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="general">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="siteName">Nome da Plataforma</Label>
                          <Input 
                            id="siteName" 
                            name="siteName"
                            value={generalSettings.siteName} 
                            onChange={handleGeneralSettingsChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactEmail">Email de Contato</Label>
                          <Input 
                            id="contactEmail" 
                            name="contactEmail"
                            type="email"
                            value={generalSettings.contactEmail} 
                            onChange={handleGeneralSettingsChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="siteDescription">Descrição da Plataforma</Label>
                        <Textarea 
                          id="siteDescription" 
                          name="siteDescription"
                          value={generalSettings.siteDescription} 
                          onChange={handleGeneralSettingsChange}
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="maxFileSizeMB">Tamanho Máximo de Arquivo (MB)</Label>
                        <Input 
                          id="maxFileSizeMB" 
                          name="maxFileSizeMB"
                          type="number"
                          value={generalSettings.maxFileSizeMB} 
                          onChange={handleGeneralSettingsChange}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="enableRegistrations">Permitir Cadastros</Label>
                            <p className="text-sm text-gray-500">Habilitar novos cadastros na plataforma</p>
                          </div>
                          <Switch 
                            id="enableRegistrations" 
                            checked={generalSettings.enableRegistrations}
                            onCheckedChange={(checked) => handleGeneralToggleChange('enableRegistrations', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="enablePublicProjects">Projetos Públicos</Label>
                            <p className="text-sm text-gray-500">Permitir que projetos sejam visíveis publicamente</p>
                          </div>
                          <Switch 
                            id="enablePublicProjects" 
                            checked={generalSettings.enablePublicProjects}
                            onCheckedChange={(checked) => handleGeneralToggleChange('enablePublicProjects', checked)}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        className="bg-univag-navy hover:bg-univag-darknavy"
                        onClick={() => saveSettings('gerais')}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Configurações
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="events">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="defaultEventDuration">Duração Padrão de Eventos (dias)</Label>
                          <Input 
                            id="defaultEventDuration" 
                            name="defaultEventDuration"
                            type="number"
                            value={eventSettings.defaultEventDuration} 
                            onChange={handleEventSettingsChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notifyBeforeEventDays">Notificar Antes do Evento (dias)</Label>
                          <Input 
                            id="notifyBeforeEventDays" 
                            name="notifyBeforeEventDays"
                            type="number"
                            value={eventSettings.notifyBeforeEventDays} 
                            onChange={handleEventSettingsChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="allowMultipleSubmissions">Múltiplas Submissões</Label>
                            <p className="text-sm text-gray-500">Permitir que grupos enviem mais de um projeto por evento</p>
                          </div>
                          <Switch 
                            id="allowMultipleSubmissions" 
                            checked={eventSettings.allowMultipleSubmissions}
                            onCheckedChange={(checked) => handleEventToggleChange('allowMultipleSubmissions', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="requireApproval">Aprovação de Projetos</Label>
                            <p className="text-sm text-gray-500">Exigir aprovação administrativa para submissões</p>
                          </div>
                          <Switch 
                            id="requireApproval" 
                            checked={eventSettings.requireApproval}
                            onCheckedChange={(checked) => handleEventToggleChange('requireApproval', checked)}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        className="bg-univag-navy hover:bg-univag-darknavy"
                        onClick={() => saveSettings('eventos')}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Salvar Configurações
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="sessionTimeoutMinutes">Tempo Limite da Sessão (minutos)</Label>
                          <Input 
                            id="sessionTimeoutMinutes" 
                            name="sessionTimeoutMinutes"
                            type="number"
                            value={securitySettings.sessionTimeoutMinutes} 
                            onChange={handleSecuritySettingsChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="passwordMinLength">Comprimento Mínimo da Senha</Label>
                          <Input 
                            id="passwordMinLength" 
                            name="passwordMinLength"
                            type="number"
                            value={securitySettings.passwordMinLength} 
                            onChange={handleSecuritySettingsChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="requireStrongPasswords">Senhas Fortes</Label>
                            <p className="text-sm text-gray-500">Exigir senhas com caracteres especiais, números e letras maiúsculas</p>
                          </div>
                          <Switch 
                            id="requireStrongPasswords" 
                            checked={securitySettings.requireStrongPasswords}
                            onCheckedChange={(checked) => handleSecurityToggleChange('requireStrongPasswords', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="adminOnlyProjectDeletion">Exclusão de Projetos</Label>
                            <p className="text-sm text-gray-500">Apenas administradores podem excluir projetos</p>
                          </div>
                          <Switch 
                            id="adminOnlyProjectDeletion" 
                            checked={securitySettings.adminOnlyProjectDeletion}
                            onCheckedChange={(checked) => handleSecurityToggleChange('adminOnlyProjectDeletion', checked)}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        className="bg-univag-navy hover:bg-univag-darknavy"
                        onClick={() => saveSettings('segurança')}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Salvar Configurações
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SystemSettings;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Settings, ShieldCheck, CalendarDays } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { SettingInput } from "../components/settings/SettingInput";
import { SettingSwitch } from "../components/settings/SettingSwitch";

export default function SystemSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "ProjectHub UNIVAG",
    siteDescription: "Sistema de gerenciamento de projetos acadêmicos.",
    contactEmail: "contato@univag.edu.br",
    maxFileSizeMB: 10,
    enableRegistrations: true,
    enablePublicProjects: false,
  });

  const [eventSettings, setEventSettings] = useState({
    defaultEventDuration: 14,
    allowEventEditing: true,
    eventReminderDays: 3,
  });

  const [securitySettings, setSecuritySettings] = useState({
    enable2FA: true,
    maxLoginAttempts: 5,
    passwordExpirationDays: 90,
  });

  const saveSettings = async (type: string, settings: object) => {
    try {
      await axios.post(`/api/settings/${type}`, settings);
      toast({
        title: "Configurações salvas",
        description: `As configurações de ${type} foram atualizadas com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: `Falha ao salvar configurações de ${type}.`,
      });
    }
  };

  return (
    <div className="p-6 space-y-4">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general"><Settings className="mr-2 h-4 w-4" />Geral</TabsTrigger>
          <TabsTrigger value="eventos"><CalendarDays className="mr-2 h-4 w-4" />Eventos</TabsTrigger>
          <TabsTrigger value="seguranca"><ShieldCheck className="mr-2 h-4 w-4" />Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingInput label="Nome do sistema" id="siteName" name="siteName" value={generalSettings.siteName} onChange={e => setGeneralSettings({ ...generalSettings, siteName: e.target.value })} />
              <SettingInput label="Descrição" id="siteDescription" name="siteDescription" value={generalSettings.siteDescription} onChange={e => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })} />
              <SettingInput label="Email de contato" id="contactEmail" name="contactEmail" value={generalSettings.contactEmail} onChange={e => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })} type="email" />
              <SettingInput label="Tamanho máximo de arquivo (MB)" id="maxFileSizeMB" name="maxFileSizeMB" value={generalSettings.maxFileSizeMB} onChange={e => setGeneralSettings({ ...generalSettings, maxFileSizeMB: Number(e.target.value) })} type="number" />
              <SettingSwitch id="enableRegistrations" label="Permitir registros de novos usuários" description="Controla se novos usuários podem se registrar no sistema." checked={generalSettings.enableRegistrations} onChange={checked => setGeneralSettings({ ...generalSettings, enableRegistrations: checked })} />
              <SettingSwitch id="enablePublicProjects" label="Projetos públicos" description="Permite que projetos sejam visualizados publicamente." checked={generalSettings.enablePublicProjects} onChange={checked => setGeneralSettings({ ...generalSettings, enablePublicProjects: checked })} />
              <Button onClick={() => saveSettings("geral", generalSettings)}>Salvar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eventos">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Eventos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingInput label="Duração padrão dos eventos (dias)" id="defaultEventDuration" name="defaultEventDuration" value={eventSettings.defaultEventDuration} onChange={e => setEventSettings({ ...eventSettings, defaultEventDuration: Number(e.target.value) })} type="number" />
              <SettingInput label="Lembrete de evento (dias antes)" id="eventReminderDays" name="eventReminderDays" value={eventSettings.eventReminderDays} onChange={e => setEventSettings({ ...eventSettings, eventReminderDays: Number(e.target.value) })} type="number" />
              <SettingSwitch id="allowEventEditing" label="Permitir edição de eventos" description="Permite que administradores editem eventos após a criação." checked={eventSettings.allowEventEditing} onChange={checked => setEventSettings({ ...eventSettings, allowEventEditing: checked })} />
              <Button onClick={() => saveSettings("eventos", eventSettings)}>Salvar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingSwitch id="enable2FA" label="Habilitar autenticação de dois fatores (2FA)" description="Aumenta a segurança exigindo um segundo fator na autenticação." checked={securitySettings.enable2FA} onChange={checked => setSecuritySettings({ ...securitySettings, enable2FA: checked })} />
              <SettingInput label="Tentativas máximas de login" id="maxLoginAttempts" name="maxLoginAttempts" value={securitySettings.maxLoginAttempts} onChange={e => setSecuritySettings({ ...securitySettings, maxLoginAttempts: Number(e.target.value) })} type="number" />
              <SettingInput label="Expiração de senha (dias)" id="passwordExpirationDays" name="passwordExpirationDays" value={securitySettings.passwordExpirationDays} onChange={e => setSecuritySettings({ ...securitySettings, passwordExpirationDays: Number(e.target.value) })} type="number" />
              <Button onClick={() => saveSettings("seguranca", securitySettings)}>Salvar</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

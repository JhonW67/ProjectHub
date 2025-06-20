import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Download, MessageSquare, Star, QrCode, User, Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Project, Feedback, Evaluation, User as UserType, getUserById, formatDate, formatDateIN } from '@/lib/data';

interface ProjectDetailTabsProps {
  project: Project;
  currentUser?: UserType;
  isProfessor: boolean;
  role: string;
}

const FeedbackCard = ({ userName, comment, createdAt }: { userName: string, comment: string, createdAt: Date }) => (
  <div className="p-4 border rounded-lg">
    <div className="flex justify-between mb-2">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-gray-500" />
        <span className="font-medium">{userName}</span>
      </div>
      <span className="text-sm text-gray-500">{formatDateIN(createdAt)}</span>
    </div>
    <p className="text-gray-700">{comment}</p>
  </div>
);

const ProjectDetailTabs: React.FC<ProjectDetailTabsProps> = ({ project, currentUser, isProfessor }) => {
  const { toast } = useToast();
  const [newFeedback, setNewFeedback] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const canViewEvaluation = isProfessor || project.group?.some(member => member.id === currentUser?.id);
  const professorEvaluation = currentUser && isProfessor
    ? project.evaluations.find(e => e.professorId === currentUser.id)
    : undefined;

  useEffect(() => {
    if (project.id) {
      const projectUrl = `${window.location.origin}/projects/${project.id}`;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(projectUrl)}`;
      setQrCodeUrl(qrUrl);
    }
  }, [project.id]);

  const handleSubmitFeedback = () => {
    if (!newFeedback.trim()) return;
    setSubmittingFeedback(true);

    setTimeout(() => {
      toast({
        title: "Feedback enviado",
        description: "Seu feedback foi enviado com sucesso!",
      });
      setNewFeedback('');
      setSubmittingFeedback(false);
    }, 1000);
  };

  const handleDownloadQrCode = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `project-${project.id}-qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Download iniciado",
      description: "O QR code está sendo baixado!",
    });
  };

  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="about">Sobre o Projeto</TabsTrigger>
        <TabsTrigger value="documents">Documentação</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
        <TabsTrigger value="qrcode">QR Code</TabsTrigger>
        {isProfessor && <TabsTrigger value="evaluation">Avaliação</TabsTrigger>}
      </TabsList>

      <TabsContent value="about">
        <Card>
          <CardHeader>
            <CardTitle>Sobre o Projeto</CardTitle>
            <CardDescription>Informações detalhadas sobre o projeto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Descrição</h3>
              <p className="text-gray-700">{project.description}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Data de Criação</h3>
              <p className="text-gray-700">{formatDate(project.createdAt)}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Tags</h3>
              {project.tags && project.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Nenhuma tag cadastrada</p>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="documents">
        <Card>
          <CardHeader>
            <CardTitle>Documentação</CardTitle>
            <CardDescription>Documentos relacionados ao projeto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-univag-navy" />
                <span className="font-medium">Documentação do Projeto</span>
              </div>
              <Button variant="outline" className="text-univag-navy">
                <Download className="h-4 w-4 mr-2" /> Baixar PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="feedback">
        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
            <CardDescription>Comentários e feedback sobre o projeto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {project.feedback.length > 0 ? (
              <div className="space-y-4">
                {project.feedback.map((fb) => (
                  <FeedbackCard key={fb.id} userName={fb.userName} comment={fb.comment} createdAt={new Date(fb.createdAt)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">Nenhum feedback ainda</p>
              </div>
            )}

            <div className="pt-4 border-t">
              <Label htmlFor="new-feedback" className="mb-2 block">Deixe seu feedback</Label>
              <div className="flex gap-2">
                <Textarea 
                  id="new-feedback"
                  placeholder="Escreva seu comentário sobre este projeto..."
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  className="flex-grow"
                />
                <Button 
                  onClick={handleSubmitFeedback}
                  disabled={!newFeedback.trim() || submittingFeedback}
                  className="self-end bg-univag-navy hover:bg-univag-darknavy"
                >
                  <Send className="h-4 w-4 mr-2" /> Enviar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="qrcode">
        <Card>
          <CardHeader>
            <CardTitle>QR Code</CardTitle>
            <CardDescription>QR Code para acesso rápido ao projeto</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-8">
            {qrCodeUrl ? (
              <div className="mb-6 border p-4 rounded-md bg-white">
                <img src={qrCodeUrl} alt="QR Code para este projeto" className="w-48 h-48" />
              </div>
            ) : (
              <div className="mb-6">
                <QrCode className="h-16 w-16 text-univag-navy" />
              </div>
            )}
            <div className="text-center">
              <p className="text-gray-700 mb-4">
                Escaneie o QR Code para acessar este projeto de qualquer dispositivo.
                <br />
                <span className="text-sm text-gray-500">
                  Link: {window.location.origin}/projects/{project.id}
                </span>
              </p>
              <Button variant="outline" className="text-univag-navy" onClick={handleDownloadQrCode}>
                <Download className="h-4 w-4 mr-2" /> Baixar QR Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {isProfessor && (
        <TabsContent value="evaluation">
          <Card>
            <CardHeader>
              <CardTitle>Avaliação do Projeto</CardTitle>
              <CardDescription>Avalie este projeto como professor</CardDescription>
            </CardHeader>
            <CardContent>
              {professorEvaluation ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 flex items-center justify-center rounded-full bg-univag-navy text-white">
                      <span className="text-2xl font-bold">{professorEvaluation.score.toFixed(1)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">Nota Final</h3>
                      <p className="text-gray-600">Avaliado em {formatDate(professorEvaluation.createdAt)}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Critérios de Avaliação</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['innovation', 'execution', 'presentation', 'impact'].map((key) => (
                        <div key={key} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium capitalize">{key}</span>
                            <Badge className="bg-blue-100 text-blue-800">
                              {professorEvaluation.criteria[key]}/10
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <h3 className="font-semibold text-lg mb-2">Comentários</h3>
                      <p className="p-4 bg-gray-50 rounded-lg">{professorEvaluation.comment}</p>
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-univag-navy hover:bg-univag-darknavy">
                        <Star className="h-4 w-4 mr-2" /> Editar Avaliação
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-700 mb-6">
                    Você ainda não avaliou este projeto. Avalie agora para fornecer feedback ao grupo.
                  </p>
                  <Button className="bg-univag-navy hover:bg-univag-darknavy">
                    <Star className="h-4 w-4 mr-2" /> Avaliar Projeto
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      )}
    </Tabs>
  );
};

export default ProjectDetailTabs;

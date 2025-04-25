
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Upload, File, AlertCircle } from 'lucide-react';
import { events, Project } from '@/lib/data';

interface EditProjectFormProps {
  project: Project;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({ project }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [eventId, setEventId] = useState(project.eventId);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Get all events for editing (not just active ones)
  const allEvents = events;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !eventId) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Projeto atualizado com sucesso!",
        description: "As alterações foram salvas.",
      });
      setLoading(false);
      navigate(`/projects/${project.id}`);
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card className="univag-card">
          <CardHeader>
            <CardTitle className="text-xl text-univag-navy">Informações Básicas</CardTitle>
            <CardDescription>
              Edite as informações básicas do seu projeto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Projeto *</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título do seu projeto"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva seu projeto em detalhes..."
                rows={5}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="event">Evento *</Label>
              <Select value={eventId} onValueChange={setEventId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o evento" />
                </SelectTrigger>
                <SelectContent>
                  {allEvents.map(event => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="univag-card">
          <CardHeader>
            <CardTitle className="text-xl text-univag-navy">Mídia e Documentação</CardTitle>
            <CardDescription>
              Atualize o banner e a documentação do seu projeto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="banner">Banner do Projeto</Label>
              <div className="mb-2">
                <img 
                  src={project.banner} 
                  alt="Banner atual" 
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <p className="text-sm text-gray-500 mt-1">Banner atual</p>
              </div>
              <div className="flex items-center justify-center w-full">
                <label 
                  htmlFor="banner-upload" 
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {bannerFile ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <File className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        {bannerFile.name}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG ou GIF (Máx. 5MB)
                      </p>
                    </div>
                  )}
                  <input 
                    id="banner-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => e.target.files && setBannerFile(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="document">Documentação do Projeto (PDF)</Label>
              <div className="mb-2 flex items-center text-gray-500">
                <File className="h-5 w-5 mr-2" />
                <span className="text-sm">Documento atual: documentacao-projeto.pdf</span>
              </div>
              <div className="flex items-center justify-center w-full">
                <label 
                  htmlFor="document-upload" 
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {documentFile ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <File className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        {documentFile.name}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF (Máx. 10MB)
                      </p>
                    </div>
                  )}
                  <input 
                    id="document-upload" 
                    type="file" 
                    className="hidden" 
                    accept=".pdf"
                    onChange={(e) => e.target.files && setDocumentFile(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="bg-univag-navy hover:bg-univag-darknavy"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditProjectForm;

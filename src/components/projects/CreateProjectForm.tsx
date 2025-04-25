
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Upload, File, AlertCircle } from 'lucide-react';
import { events } from '@/lib/data';

const CreateProjectForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventId, setEventId] = useState('');
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Get only active events
  const activeEvents = events.filter(event => event.isActive);
  
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
        title: "Projeto criado com sucesso!",
        description: "Seu projeto foi criado e está pronto para ser avaliado.",
      });
      setLoading(false);
      navigate('/dashboard/student');
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card className="univag-card">
          <CardHeader>
            <CardTitle className="text-xl text-univag-navy">Informações Básicas</CardTitle>
            <CardDescription>
              Preencha as informações básicas do seu projeto
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
                  {activeEvents.map(event => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {activeEvents.length === 0 && (
                <div className="flex items-center gap-2 text-amber-600 mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">Não há eventos ativos no momento.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="univag-card">
          <CardHeader>
            <CardTitle className="text-xl text-univag-navy">Mídia e Documentação</CardTitle>
            <CardDescription>
              Faça upload do banner e da documentação do seu projeto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="banner">Banner do Projeto *</Label>
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
              <Label htmlFor="document">Documentação do Projeto (PDF) *</Label>
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
            onClick={() => navigate('/dashboard/student')}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="bg-univag-navy hover:bg-univag-darknavy"
            disabled={loading}
          >
            {loading ? "Criando..." : "Criar Projeto"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateProjectForm;

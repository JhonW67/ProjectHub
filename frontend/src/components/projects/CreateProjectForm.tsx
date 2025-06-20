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

  const activeEvents = events.filter(event => event.isActive);

  const handleBannerUpload = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O banner deve ter no máximo 5MB.",
        variant: "destructive",
      });
      return;
    }
    setBannerFile(file);
  };

  const handleDocumentUpload = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "A documentação deve ter no máximo 10MB.",
        variant: "destructive",
      });
      return;
    }
    setDocumentFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !eventId || !bannerFile || !documentFile) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

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
        {/* INFORMAÇÕES BÁSICAS */}
        <Card className="univag-card">
          <CardHeader>
            <CardTitle className="text-xl text-univag-navy">Informações Básicas</CardTitle>
            <CardDescription>Preencha as informações básicas do seu projeto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Projeto *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Sistema de Irrigação Inteligente"
                required
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event">Evento *</Label>
              <Select value={eventId} onValueChange={setEventId} disabled={loading}>
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
                <div className="flex items-center gap-2 text-amber-600 mt-2 text-sm italic">
                  <AlertCircle className="h-4 w-4" />
                  Não há eventos ativos no momento.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* UPLOAD */}
        <Card className="univag-card">
          <CardHeader>
            <CardTitle className="text-xl text-univag-navy">Mídia e Documentação</CardTitle>
            <CardDescription>
              Faça upload do banner e da documentação do seu projeto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Banner */}
            <div className="space-y-2">
              <Label htmlFor="banner">Banner do Projeto *</Label>
              <label
                htmlFor="banner-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                {bannerFile ? (
                  <div className="flex flex-col items-center pt-4">
                    <File className="w-6 h-6 mb-1 text-gray-500" />
                    <p className="text-sm text-gray-600">{bannerFile.name}</p>
                    <img
                      src={URL.createObjectURL(bannerFile)}
                      alt="Prévia do banner"
                      className="h-20 mt-2 object-contain rounded"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500 text-center">
                      <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG ou GIF (Máx. 5MB)</p>
                  </div>
                )}
                <input
                  id="banner-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files && handleBannerUpload(e.target.files[0])}
                  disabled={loading}
                />
              </label>
            </div>

            {/* Documentação */}
            <div className="space-y-2">
              <Label htmlFor="document">Documentação do Projeto (PDF) *</Label>
              <label
                htmlFor="document-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                {documentFile ? (
                  <div className="flex flex-col items-center pt-4">
                    <File className="w-6 h-6 mb-1 text-gray-500" />
                    <p className="text-sm text-gray-600">{documentFile.name}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500 text-center">
                      <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                    </p>
                    <p className="text-xs text-gray-500">PDF (Máx. 10MB)</p>
                  </div>
                )}
                <input
                  id="document-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={(e) => e.target.files && handleDocumentUpload(e.target.files[0])}
                  disabled={loading}
                />
              </label>
            </div>
          </CardContent>
        </Card>

        {/* BOTÕES */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/dashboard/student')}
            disabled={loading}
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

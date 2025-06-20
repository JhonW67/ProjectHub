import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { UsersRound, ArrowLeft } from 'lucide-react';

const CreateGroup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [groupName, setGroupName] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [description, setDescription] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const courses = [
    'Administração', 'Arquitetura e Urbanismo', 'Ciências Contábeis',
    'Direito', 'Engenharia Civil', 'Engenharia de Software',
    'Medicina', 'Psicologia'
  ];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupName || !course || !semester) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    const groupCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    toast({
      title: 'Grupo criado com sucesso!',
      description: `Seu código de grupo é: ${groupCode}. Compartilhe com os colegas que deseja convidar.`,
      duration: 5000,
    });

    // Reset fields
    setGroupName('');
    setCourse('');
    setSemester('');
    setDescription('');

    navigate('/dashboard/student');
  };

  return (
    <>
      <Helmet>
        <title>Criar Grupo | ProjectHub UNIVAG</title>
      </Helmet>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <Button
              variant="outline"
              className="mb-6"
              onClick={() => navigate('/dashboard/student')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Button>

            <h1 className="text-3xl font-bold text-univag-navy dark:text-white mb-2">Criar Novo Grupo</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Crie seu grupo de trabalho para projetos extensionistas
            </p>

            <Card className="max-w-2xl mx-auto shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <UsersRound className="h-5 w-5" />
                  Informações do Grupo
                </CardTitle>
                <CardDescription>
                  Preencha os dados do grupo que você deseja criar
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" role="form" aria-label="Formulário de criação de grupo">
                  <div className="space-y-2">
                    <Label htmlFor="group-name">Nome do Grupo</Label>
                    <Input
                      id="group-name"
                      ref={inputRef}
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder="Ex: TechInnovators"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="course">Curso</Label>
                      <Select value={course} onValueChange={setCourse} required>
                        <SelectTrigger id="course">
                          <SelectValue placeholder="Selecione o curso" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="semester">Semestre</Label>
                      <Select value={semester} onValueChange={setSemester} required>
                        <SelectTrigger id="semester">
                          <SelectValue placeholder="Selecione o semestre" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              {i + 1}º
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição do Grupo (opcional)</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descreva brevemente o propósito do grupo e/ou a área de interesse"
                      rows={4}
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-univag-navy hover:bg-univag-darknavy text-white"
                    >
                      Criar Grupo
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CreateGroup;

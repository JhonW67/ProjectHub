
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UsersRound, ArrowLeft, LogIn } from 'lucide-react';

const JoinGroup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [groupCode, setGroupCode] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!groupCode) {
      toast({
        title: "Código obrigatório",
        description: "Por favor, insira o código do grupo.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate group join request
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação para entrar no grupo foi enviada com sucesso. Aguarde a aprovação do líder do grupo.",
      duration: 3000,
    });
    
    navigate('/dashboard/student');
  };
  
  return (
    <>
      <Helmet>
        <title>Entrar em Grupo | ProjectHub UNIVAG</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Button 
                variant="outline" 
                className="mb-6"
                onClick={() => navigate('/dashboard/student')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Dashboard
              </Button>
              
              <h1 className="text-3xl font-bold text-univag-navy mb-2">Entrar em um Grupo</h1>
              <p className="text-gray-600">Entre em um grupo existente usando o código fornecido pelo líder</p>
            </div>
            
            <Card className="max-w-md mx-auto shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <UsersRound className="h-5 w-5" />
                  Solicitar Entrada
                </CardTitle>
                <CardDescription>
                  Insira o código do grupo que você deseja entrar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Input 
                      placeholder="Código do grupo (ex: ABC123)" 
                      value={groupCode} 
                      onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
                      className="text-center text-lg tracking-widest uppercase"
                      maxLength={6}
                      required
                    />
                    <p className="text-sm text-gray-500 text-center">
                      O código do grupo é fornecido pelo líder do grupo
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-univag-navy hover:bg-univag-darknavy"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Solicitar Entrada
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

export default JoinGroup;

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Link } from 'react-router-dom';
import { Lock, LogIn, ArrowLeft } from 'lucide-react';
import {useAuth }from '@/hooks/useAuth';

const AdminLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check hardcoded credentials
    if (username === 'admin01' && password === 'adm1982!@') {
      const fakeToken = 'admin-token-123456';
      const adminRole = 'admin';

      login(fakeToken, adminRole, 'admin01'); // saves to context and localStorage

      toast({
        title: "Login administrativo bem-sucedido",
        description: "Bem-vindo ao painel administrativo",
        duration: 3000,
      });

      navigate('/dashboard/admin');
    } else {
      toast({
        title: "Erro de login",
        description: "Credenciais administrativas inválidas",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg animate-scale-in relative">
      <Link to="/" className="absolute top-4 left-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <Lock className="h-12 w-12 text-univag-navy" />
        </div>
        <CardTitle className="text-2xl font-bold text-center text-univag-navy">Acesso Administrativo</CardTitle>
        <CardDescription className="text-center">
          Entre com suas credenciais de administrador
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-username">Nome de usuário</Label>
            <Input 
              id="admin-username" 
              placeholder="Nome de usuário admin" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="univag-input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Senha</Label>
            <Input 
              id="admin-password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="univag-input"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-univag-navy hover:bg-univag-darknavy">
            <LogIn className="h-4 w-4 mr-2" />
            Acessar Sistema
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          <a href="/auth/login" className="text-univag-navy font-semibold hover:underline">Voltar para login de usuário</a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AdminLoginForm;
 
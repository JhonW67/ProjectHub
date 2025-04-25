
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Link } from 'react-router-dom';
import { authenticateUser, getCurrentUser } from '@/lib/users';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Verificar se usuário já está logado
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      // Redirecionar para o dashboard apropriado de acordo com o perfil
      switch(currentUser.role) {
        case 'student':
          navigate('/dashboard/student');
          break;
        case 'professor':
          navigate('/dashboard/professor');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
      }
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        const user = authenticateUser(email, password);
        
        if (user) {
          toast({
            title: "Login bem-sucedido",
            description: `Bem-vindo, ${user.name}!`,
            duration: 3000,
          });
          
          switch(user.role) {
            case 'student':
              navigate('/dashboard/student');
              break;
            case 'professor':
              navigate('/dashboard/professor');
              break;
            case 'admin':
              navigate('/dashboard/admin');
              break;
          }
        } else {
          toast({
            title: "Erro de login",
            description: "Email ou senha inválidos",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Erro no login:", error);
        toast({
          title: "Erro no sistema",
          description: "Ocorreu um erro ao tentar fazer login. Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 800); // Simulação de tempo de resposta do servidor
  };

  return (
    <Card className="w-full max-w-md shadow-lg animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
        <CardDescription className="text-center">
          Entre com seu email e senha
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="seuemail@email.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
          <div className="text-sm text-center mt-2">
            <span className="text-gray-500">Usuários para teste:</span>
            <div className="text-xs text-muted-foreground mt-1">
              <div>Admin: admin@univag.edu.br / admin123</div>
              <div>Professor: professor@univag.edu.br / prof123</div>
              <div>Aluno: aluno@univag.edu.br / aluno123</div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Não tem uma conta? <Link to="/auth/register" className="text-blue-500 hover:underline">Registre-se</Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;

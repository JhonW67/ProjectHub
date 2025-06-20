// src/components/auth/LoginForm.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {useAuth }from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      const { user, token } = response.data;

      // ✅ Usando AuthContext para setar autenticação global
      const userId = user?._id ?? user?.id;
      login(token, user.userType, userId);

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a), ${user.name}`,
        duration: 3000,
      });

      navigate(`/dashboard/${user.userType}`);
    } catch (error: unknown) {
      const msg = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Erro ao fazer login. Verifique suas credenciais.";

      toast({
        title: "Erro no login",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-univag-navy">Bem-vindo ao ProjectHub</CardTitle>
        <CardDescription className="text-center">Insira suas credenciais para continuar</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="univag-input"
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
              className="univag-input"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-univag-navy hover:bg-univag-darknavy"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Ainda não tem uma conta?{" "}
          <Link to="/auth/register" className="text-univag-navy font-semibold">
            Cadastre-se
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
 
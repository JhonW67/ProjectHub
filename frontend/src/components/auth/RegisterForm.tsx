import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {useAuth }from '@/hooks/useAuth';

const RegisterForm: React.FC = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "student",
    course: "",
    registration: "",
    semester: "",
    classes: [] as string[],
  });

  

  const courses = [
    "Administração",
    "Arquitetura e Urbanismo",
    "Ciências Contábeis",
    "Direito",
    "Engenharia Civil",
    "Engenharia de Software",
    "Medicina",
    "Psicologia",
  ];

  const availableClasses = [
    "Algoritmos e Programação",
    "Banco de Dados",
    "Desenvolvimento Web",
    "Engenharia de Software",
    "Inteligência Artificial",
    "Matemática Computacional",
    "Programação Orientada a Objetos",
    "Redes de Computadores",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (key: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSelectClass = (className: string) => {
    setFormData((prev) => ({
      ...prev,
      classes: prev.classes.includes(className)
        ? prev.classes.filter((c) => c !== className)
        : [...prev.classes, className],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.course) {
      toast({ title: "Preencha todos os campos obrigatórios", variant: "destructive" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Senhas não coincidem", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      // Prepare payload based on userType
      const payload = { ...formData };
      if (formData.userType === "student") {
        delete payload.classes;
      } else if (formData.userType === "professor") {
        delete payload.registration;
        delete payload.semester;
      }
      const response = await axios.post("http://localhost:5000/api/users/register", payload);

      if (response.status === 201) {
        const { token, role } = response.data;

        const userId = response.data.userId; // Authentication context
        login(token, role, userId);

        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Você já está autenticado.",
          duration: 3000,
        });

        navigate(`/dashboard/${role}`);
      }
    } catch (error) {
      const msg =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Erro ao registrar. Tente novamente.";
      toast({
        title: "Erro no cadastro",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
        <CardTitle className="text-2xl font-bold text-center text-univag-navy">Cadastre-se no ProjectHub</CardTitle>
        <CardDescription className="text-center">Preencha o formulário abaixo para criar sua conta</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" value={formData.name} onChange={handleChange} className="univag-input" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail institucional</Label>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@univag.edu.br"
              value={formData.email}
              onChange={handleChange}
              className="univag-input"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="univag-input"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="univag-input"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Eu sou:</Label>
            <RadioGroup
              value={formData.userType}
              onValueChange={(value) => handleSelectChange("userType", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Estudante</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="professor" id="professor" />
                <Label htmlFor="professor">Professor</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Curso</Label>
            <Select
              value={formData.course}
              onValueChange={(value) => handleSelectChange("course", value)}
              required
            >
              <SelectTrigger className="univag-input">
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

          {formData.userType === "student" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="registration">Número de matrícula</Label>
                <Input
                  id="registration"
                  value={formData.registration}
                  onChange={handleChange}
                  className="univag-input"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="semester">Semestre</Label>
                <Select
                  value={formData.semester}
                  onValueChange={(value) => handleSelectChange("semester", value)}
                  required
                >
                  <SelectTrigger className="univag-input">
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
            </>
          )}

          {formData.userType === "professor" && (
            <div className="space-y-2">
              <Label>Disciplinas ministradas</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {availableClasses.map((className) => (
                  <div key={className} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={className}
                      checked={formData.classes.includes(className)}
                      onChange={() => handleSelectClass(className)}
                    />
                    <Label htmlFor={className}>{className}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;

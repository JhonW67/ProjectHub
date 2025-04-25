
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface RegisterFormProps {
  onSwitchForm?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [course, setCourse] = useState('');
  const [registration, setRegistration] = useState('');
  const [semester, setSemester] = useState('');
  const [classes, setClasses] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const courses = [
    "Administração",
    "Arquitetura e Urbanismo",
    "Ciências Contábeis",
    "Direito",
    "Engenharia Civil",
    "Engenharia de Software",
    "Medicina",
    "Psicologia"
  ];

  const availableClasses = [
    "Algoritmos e Programação",
    "Banco de Dados",
    "Desenvolvimento Web",
    "Engenharia de Software",
    "Inteligência Artificial",
    "Matemática Computacional",
    "Programação Orientada a Objetos",
    "Redes de Computadores"
  ];

  const handleSelectClass = (className: string) => {
    if (classes.includes(className)) {
      setClasses(classes.filter(c => c !== className));
    } else {
      setClasses([...classes, className]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    // For demo purpose, simulate registration
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Você já pode fazer login com suas credenciais",
      duration: 3000,
    });
    
    navigate('/auth/login');
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
        <CardDescription className="text-center">
          Preencha o formulário abaixo para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="univag-input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail institucional</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="seuemail@univag.edu.br" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="univag-input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Eu sou:</Label>
            <RadioGroup 
              value={userType} 
              onValueChange={setUserType} 
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
            <Select value={course} onValueChange={setCourse} required>
              <SelectTrigger className="univag-input">
                <SelectValue placeholder="Selecione o curso" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {userType === 'student' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="registration">Número de matrícula</Label>
                <Input 
                  id="registration" 
                  value={registration} 
                  onChange={(e) => setRegistration(e.target.value)}
                  className="univag-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semestre</Label>
                <Select value={semester} onValueChange={setSemester} required>
                  <SelectTrigger className="univag-input">
                    <SelectValue placeholder="Selecione o semestre" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}º</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {userType === 'professor' && (
            <div className="space-y-2">
              <Label>Disciplinas ministradas</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {availableClasses.map((className) => (
                  <div key={className} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`class-${className}`}
                      checked={classes.includes(className)}
                      onChange={() => handleSelectClass(className)}
                      className="rounded border-gray-300 text-univag-navy focus:ring-univag-navy"
                    />
                    <Label htmlFor={`class-${className}`} className="text-sm">{className}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="univag-input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirme a senha</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="univag-input"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-univag-navy hover:bg-univag-darknavy">
            Cadastrar
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Já tem uma conta? <Button variant="link" className="p-0 h-auto text-univag-navy font-semibold" onClick={onSwitchForm}>Faça login</Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;

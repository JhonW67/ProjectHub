
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  User, 
  UserCheck, 
  UserX, 
  Search, 
  Edit, 
  Trash, 
  UserCog, 
  Plus, 
  UserPlus 
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  // Mock users data for demonstration
  const students = [
    { id: 1, name: 'Ana Silva', email: 'ana.silva@univag.edu.br', course: 'Engenharia de Software', status: 'active' },
    { id: 2, name: 'João Costa', email: 'joao.costa@univag.edu.br', course: 'Engenharia Civil', status: 'active' },
    { id: 3, name: 'Maria Santos', email: 'maria.santos@univag.edu.br', course: 'Medicina', status: 'inactive' },
    { id: 4, name: 'Pedro Oliveira', email: 'pedro.oliveira@univag.edu.br', course: 'Psicologia', status: 'active' },
    { id: 5, name: 'Carla Mendes', email: 'carla.mendes@univag.edu.br', course: 'Direito', status: 'active' },
  ];
  
  const professors = [
    { id: 1, name: 'Dr. Roberto Almeida', email: 'roberto.almeida@univag.edu.br', department: 'Engenharia', status: 'active' },
    { id: 2, name: 'Dra. Júlia Ferreira', email: 'julia.ferreira@univag.edu.br', department: 'Medicina', status: 'active' },
    { id: 3, name: 'Dr. Carlos Souza', email: 'carlos.souza@univag.edu.br', department: 'Direito', status: 'inactive' },
  ];
  
  const handleStatusChange = (userId: number, userType: string, newStatus: string) => {
    toast({
      title: "Status atualizado",
      description: `O status do usuário foi alterado para ${newStatus === 'active' ? 'ativo' : 'inativo'}.`,
      duration: 3000,
    });
  };
  
  const handleDeleteUser = (userId: number, userType: string) => {
    toast({
      title: "Usuário removido",
      description: "O usuário foi removido com sucesso.",
      duration: 3000,
    });
  };
  
  const handleAddUser = () => {
    toast({
      title: "Adicionar usuário",
      description: "Funcionalidade em desenvolvimento.",
      duration: 3000,
    });
  };
  
  const handleEditUser = (userId: number, userType: string) => {
    toast({
      title: "Editar usuário",
      description: "Funcionalidade em desenvolvimento.",
      duration: 3000,
    });
  };
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredProfessors = professors.filter(professor => 
    professor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    professor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <Helmet>
        <title>Gestão de Usuários | ProjectHub UNIVAG</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-univag-navy mb-2">Gestão de Usuários</h1>
              <p className="text-gray-600">Gerencie os usuários da plataforma ProjectHub</p>
            </div>
            
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <UserCog className="h-5 w-5" />
                      Usuários do Sistema
                    </CardTitle>
                    <CardDescription>
                      Visualize e gerencie todos os usuários registrados na plataforma
                    </CardDescription>
                  </div>
                  <Button onClick={handleAddUser} className="bg-univag-navy hover:bg-univag-darknavy">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Adicionar Usuário
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar usuários..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Tabs defaultValue="students">
                  <TabsList className="mb-6">
                    <TabsTrigger value="students" className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Alunos ({students.length})
                    </TabsTrigger>
                    <TabsTrigger value="professors" className="flex items-center gap-1">
                      <UserCheck className="h-4 w-4" />
                      Professores ({professors.length})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="students">
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Curso</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                              <TableRow key={student.id}>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.course}</TableCell>
                                <TableCell>
                                  <Badge className={student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                    {student.status === 'active' ? 'Ativo' : 'Inativo'}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline" size="sm" onClick={() => handleEditUser(student.id, 'student')}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleStatusChange(student.id, 'student', student.status === 'active' ? 'inactive' : 'active')}>
                                      {student.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteUser(student.id, 'student')}>
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                                Nenhum aluno encontrado com os critérios de busca.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="professors">
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Departamento</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProfessors.length > 0 ? (
                            filteredProfessors.map((professor) => (
                              <TableRow key={professor.id}>
                                <TableCell className="font-medium">{professor.name}</TableCell>
                                <TableCell>{professor.email}</TableCell>
                                <TableCell>{professor.department}</TableCell>
                                <TableCell>
                                  <Badge className={professor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                    {professor.status === 'active' ? 'Ativo' : 'Inativo'}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline" size="sm" onClick={() => handleEditUser(professor.id, 'professor')}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleStatusChange(professor.id, 'professor', professor.status === 'active' ? 'inactive' : 'active')}>
                                      {professor.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteUser(professor.id, 'professor')}>
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                                Nenhum professor encontrado com os critérios de busca.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default UserManagement;

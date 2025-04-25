
import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Send, 
  Users, 
  MessageSquare, 
  File, 
  Paperclip, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  PlusCircle,
  UserCircle
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isFile?: boolean;
  filename?: string;
}

interface Task {
  id: number;
  title: string;
  assignedTo: string[];
  dueDate: Date;
  completed: boolean;
}

const GroupChat = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock data
  const groupName = "TechInnovators";
  const groupMembers = [
    { id: 'u1', name: 'Ana Silva' },
    { id: 'u2', name: 'João Costa' },
    { id: 'u3', name: 'Maria Santos' },
    { id: 'u4', name: 'Pedro Oliveira' },
  ];
  
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, senderId: 'u2', senderName: 'João Costa', content: 'Olá pessoal, tudo bem?', timestamp: new Date(Date.now() - 3600000 * 2) },
    { id: 2, senderId: 'u3', senderName: 'Maria Santos', content: 'Tudo ótimo! Vamos começar a discutir o projeto?', timestamp: new Date(Date.now() - 3600000 * 1.5) },
    { id: 3, senderId: 'u1', senderName: 'Ana Silva', content: 'Sim, eu estava pensando em focarmos em sustentabilidade ambiental.', timestamp: new Date(Date.now() - 3600000) },
    { id: 4, senderId: 'u4', senderName: 'Pedro Oliveira', content: 'Achei uma ótima ideia!', timestamp: new Date(Date.now() - 1800000) },
    { id: 5, senderId: 'u2', senderName: 'João Costa', content: 'Encontrei esse artigo que pode nos ajudar com o embasamento teórico', timestamp: new Date(Date.now() - 1200000), isFile: true, filename: 'artigo-sustentabilidade.pdf' },
  ]);
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Pesquisar referências bibliográficas', assignedTo: ['u1', 'u2'], dueDate: new Date(Date.now() + 3600000 * 48), completed: false },
    { id: 2, title: 'Criar o esboço do projeto', assignedTo: ['u3'], dueDate: new Date(Date.now() + 3600000 * 72), completed: false },
    { id: 3, title: 'Desenvolver apresentação inicial', assignedTo: ['u4'], dueDate: new Date(Date.now() + 3600000 * 96), completed: false },
    { id: 4, title: 'Revisão da fundamentação teórica', assignedTo: ['u1', 'u3'], dueDate: new Date(Date.now() - 3600000 * 24), completed: true },
  ]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      senderId: 'u1', // Assume current user is Ana Silva
      senderName: 'Ana Silva',
      content: message,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };
  
  const handleFileUpload = () => {
    // Simulate file upload
    toast({
      title: "Upload de arquivo",
      description: "Funcionalidade em desenvolvimento.",
      duration: 3000,
    });
  };
  
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTaskTitle || !newTaskDueDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Título e data de entrega são obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    const newTask: Task = {
      id: tasks.length + 1,
      title: newTaskTitle,
      assignedTo: newTaskAssignee ? [newTaskAssignee] : ['u1'],
      dueDate: new Date(newTaskDueDate),
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskAssignee('');
    setNewTaskDueDate('');
    setShowTaskForm(false);
    
    toast({
      title: "Tarefa criada",
      description: "A tarefa foi criada com sucesso.",
      duration: 3000,
    });
  };
  
  const toggleTaskStatus = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Hoje, ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Ontem, ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('pt-BR') + ', ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
  };
  
  const getNameInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  const getMemberById = (id: string) => {
    return groupMembers.find(member => member.id === id);
  };
  
  return (
    <>
      <Helmet>
        <title>Grupo {groupName} | ProjectHub UNIVAG</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-univag-navy mb-2">Grupo: {groupName}</h1>
              <div className="flex items-center gap-2">
                <p className="text-gray-600">Membros:</p>
                <div className="flex -space-x-2">
                  {groupMembers.map((member) => (
                    <Avatar key={member.id} className="border-2 border-white h-8 w-8">
                      <AvatarFallback>{getNameInitials(member.name)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="shadow-md h-[calc(100vh-250px)] flex flex-col">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Chat do Grupo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.senderId === 'u1' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className="flex max-w-[80%]">
                            {msg.senderId !== 'u1' && (
                              <Avatar className="h-8 w-8 mr-2 mt-1">
                                <AvatarFallback>{getNameInitials(msg.senderName)}</AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              {msg.senderId !== 'u1' && (
                                <p className="text-xs text-gray-500 mb-1">{msg.senderName}</p>
                              )}
                              <div 
                                className={`rounded-lg p-3 ${
                                  msg.senderId === 'u1' 
                                    ? 'bg-univag-navy text-white' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {msg.isFile ? (
                                  <div className="flex items-center gap-2">
                                    <File className="h-5 w-5" />
                                    <span className="underline">{msg.filename}</span>
                                  </div>
                                ) : (
                                  <p>{msg.content}</p>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1 text-right">
                                {formatDate(msg.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={handleFileUpload}
                      >
                        <Paperclip className="h-5 w-5" />
                      </Button>
                      <Input 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder="Digite sua mensagem..."
                        className="flex-grow"
                      />
                      <Button type="submit">
                        <Send className="h-5 w-5" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="shadow-md h-[calc(100vh-250px)] flex flex-col">
                  <CardHeader className="pb-4">
                    <Tabs defaultValue="tasks">
                      <TabsList className="w-full">
                        <TabsTrigger value="tasks" className="flex-1">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Tarefas
                        </TabsTrigger>
                        <TabsTrigger value="members" className="flex-1">
                          <Users className="h-4 w-4 mr-1" />
                          Membros
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-y-auto">
                    <TabsContent value="tasks" className="mt-0 h-full">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Tarefas do Grupo</h3>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setShowTaskForm(!showTaskForm)}
                          >
                            <PlusCircle className="h-4 w-4 mr-1" />
                            Nova
                          </Button>
                        </div>
                        
                        {showTaskForm && (
                          <form onSubmit={handleCreateTask} className="space-y-3 p-3 border rounded-lg bg-gray-50">
                            <Input 
                              placeholder="Título da tarefa" 
                              value={newTaskTitle} 
                              onChange={(e) => setNewTaskTitle(e.target.value)}
                              required
                            />
                            <select 
                              className="w-full px-3 py-2 border rounded-md text-sm"
                              value={newTaskAssignee}
                              onChange={(e) => setNewTaskAssignee(e.target.value)}
                            >
                              <option value="">Atribuir a (opcional)</option>
                              {groupMembers.map(member => (
                                <option key={member.id} value={member.id}>{member.name}</option>
                              ))}
                            </select>
                            <div className="flex items-center gap-2">
                              <label className="text-sm">Data limite:</label>
                              <Input 
                                type="date" 
                                value={newTaskDueDate} 
                                onChange={(e) => setNewTaskDueDate(e.target.value)}
                                required
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button type="submit" className="flex-1 bg-univag-navy">Salvar</Button>
                              <Button type="button" variant="outline" onClick={() => setShowTaskForm(false)}>Cancelar</Button>
                            </div>
                          </form>
                        )}
                        
                        <div className="space-y-3">
                          {tasks.filter(task => !task.completed).map((task) => (
                            <div 
                              key={task.id} 
                              className="p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-grow">
                                  <div className="flex items-center gap-2">
                                    <input 
                                      type="checkbox" 
                                      id={`task-${task.id}`} 
                                      checked={task.completed}
                                      onChange={() => toggleTaskStatus(task.id)}
                                      className="rounded border-gray-300"
                                    />
                                    <label htmlFor={`task-${task.id}`} className="font-medium cursor-pointer">
                                      {task.title}
                                    </label>
                                  </div>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {task.assignedTo.map(memberId => {
                                      const member = getMemberById(memberId);
                                      return member ? (
                                        <Badge key={memberId} variant="outline" className="flex items-center gap-1">
                                          <UserCircle className="h-3 w-3" />
                                          {member.name}
                                        </Badge>
                                      ) : null;
                                    })}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {tasks.some(task => task.completed) && (
                          <div className="mt-6">
                            <h3 className="font-semibold text-sm text-gray-500 mb-2">Concluídas</h3>
                            <div className="space-y-2">
                              {tasks.filter(task => task.completed).map((task) => (
                                <div 
                                  key={task.id} 
                                  className="p-2 border rounded-lg bg-gray-50"
                                >
                                  <div className="flex items-center gap-2">
                                    <input 
                                      type="checkbox" 
                                      id={`task-${task.id}`} 
                                      checked={task.completed}
                                      onChange={() => toggleTaskStatus(task.id)}
                                      className="rounded border-gray-300"
                                    />
                                    <label htmlFor={`task-${task.id}`} className="text-gray-500 line-through text-sm">
                                      {task.title}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="members" className="mt-0 h-full">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Membros do Grupo</h3>
                        <div className="space-y-3">
                          {groupMembers.map((member) => (
                            <div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg">
                              <Avatar>
                                <AvatarFallback>{getNameInitials(member.name)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-gray-500">
                                  {member.id === 'u1' ? 'Você (Líder do grupo)' : 'Membro'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="p-4 border rounded-lg bg-gray-50 mt-6">
                          <h3 className="font-semibold mb-2">Convite para o Grupo</h3>
                          <p className="text-sm mb-2">Compartilhe este código com novos membros:</p>
                          <div className="bg-white p-3 rounded border text-center font-mono text-lg tracking-widest">
                            TI1928
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Novos membros podem entrar usando este código na página "Entrar em Grupo"
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default GroupChat;

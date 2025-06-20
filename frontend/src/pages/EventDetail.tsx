import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getEventById, getProjectsByEventId, events, Event } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventProjectsGrid from "@/components/events/EventProjectsGrid";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { CalendarIcon, MapPinIcon, GraduationCapIcon, BrushIcon, ClockIcon, ChevronLeft } from "lucide-react";
import { z } from "zod";
import { format, parse } from "date-fns";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const eventSchema = z.object({
  id: z.string(),
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  theme: z.string().min(3, { message: "Theme must be at least 3 characters." }),
  semester: z.string(),
  date: z.string(),
  location: z.string().min(3, { message: "Location must be at least 3 characters." }),
  banner: z.string(),
  isActive: z.boolean(),
});

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    description: "",
    theme: "",
    semester: "",
    date: "",
    location: "",
    banner: "",
    isActive: false,
  });
  const projects = getProjectsByEventId(eventId || "");

  useEffect(() => {
    if (eventId) {
      const foundEvent = getEventById(eventId);
      if (foundEvent) {
        setEvent(foundEvent);
        setEditForm({
          id: foundEvent.id,
          title: foundEvent.title,
          description: foundEvent.description,
          theme: foundEvent.theme,
          semester: foundEvent.semester,
          date: foundEvent.date,
          location: foundEvent.location,
          banner: foundEvent.banner,
          isActive: foundEvent.isActive,
        });
      } else {
        setEvent(undefined);
      }
      setIsLoading(false);
    }
  }, [eventId]);

  const handleFormChange = (key: keyof typeof editForm, value: string | boolean) => {
    setEditForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveEvent = () => {
    try {
      eventSchema.parse(editForm);
  
      const eventIndex = events.findIndex(e => e.id === eventId);
  
      if (eventIndex === -1) {
        toast({
          title: "Error",
          description: "Event not found.",
          variant: "destructive",
        });
        return;
      }
  
      events[eventIndex] = {
        ...editForm,
      };
  
      setEvent({ ...editForm });
      setIsEditDialogOpen(false);
      toast({
        title: "Success",
        description: "Event updated successfully.",
      });
    } catch (error: unknown) {
      console.error("Validation Error:", error);
      toast({
        title: "Error",
        description: "Please correct the errors in the form.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLoading ? "Loading..." : event ? event.title : "Event Not Found"} | ProjectHub</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto py-8 px-4">
          <div className="mb-6">
            <Button
              variant="outline"
              className="flex items-center gap-2 mb-4"
              onClick={() => navigate('/events')}
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar para Eventos
            </Button>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          ) : event ? (
            <>
              <section className="mb-8 bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 text-univag-navy">{event.title}</h1>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center text-gray-700">
                        <CalendarIcon className="h-5 w-5 mr-2 text-univag-navy" />
                        <span>Data: {format(parse(event.date.split('T')[0], "yyyy-MM-dd", new Date()), "dd/MM/yyyy")}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <ClockIcon className="h-5 w-5 mr-2 text-univag-navy" />
                        <span>Horário: {event.date.includes('T') ? event.date.split('T')[1].substring(0, 5) : '00:00'}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <MapPinIcon className="h-5 w-5 mr-2 text-univag-navy" />
                        <span>Local: {event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <GraduationCapIcon className="h-5 w-5 mr-2 text-univag-navy" />
                        <span>Semestre: {event.semester}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <BrushIcon className="h-5 w-5 mr-2 text-univag-navy" />
                        <span>Tema: {event.theme}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <div className={`h-3 w-3 rounded-full mr-2 ${event.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span>Status: {event.isActive ? 'Ativo' : 'Inativo'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Button onClick={() => setIsEditDialogOpen(true)} className="bg-univag-navy hover:bg-univag-darknavy">
                      Editar Evento
                    </Button>
                  </div>
                </div>
              </section>
              
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Editar Informações do Evento</DialogTitle>
                    <DialogDescription>
                      Faça alterações nas informações do evento aqui. Clique em salvar quando terminar.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Título
                      </Label>
                      <Input
                        id="title"
                        value={editForm.title}
                        onChange={(e) => handleFormChange("title", e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="theme" className="text-right">
                        Tema
                      </Label>
                      <Input
                        id="theme"
                        value={editForm.theme}
                        onChange={(e) => handleFormChange("theme", e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Descrição
                      </Label>
                      <Textarea
                        id="description"
                        value={editForm.description}
                        onChange={(e) => handleFormChange("description", e.target.value)}
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Data
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={editForm.date.split('T')[0]}
                        onChange={(e) => {
                          const dateValue = e.target.value;
                          const timeValue = editForm.date.includes('T') 
                            ? editForm.date.split('T')[1] 
                            : '00:00';
                          handleFormChange("date", `${dateValue}T${timeValue}`);
                        }}
                        className="col-span-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="time" className="text-right">
                        Horário
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={editForm.date.includes('T') 
                          ? editForm.date.split('T')[1].substring(0, 5) 
                          : '00:00'}
                        onChange={(e) => {
                          const dateValue = editForm.date.split('T')[0];
                          const timeValue = e.target.value;
                          handleFormChange("date", `${dateValue}T${timeValue}`);
                        }}
                        className="col-span-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="location" className="text-right">
                        Local
                      </Label>
                      <Input
                        id="location"
                        value={editForm.location}
                        onChange={(e) => handleFormChange("location", e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="semester" className="text-right">
                        Semestre
                      </Label>
                      <Input
                        id="semester"
                        value={editForm.semester}
                        onChange={(e) => handleFormChange("semester", e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="isActive" className="text-right">
                        Status
                      </Label>
                      <div className="flex items-center space-x-2 col-span-3">
                        <Switch
                          id="isActive"
                          checked={editForm.isActive}
                          onCheckedChange={(checked) => handleFormChange("isActive", checked)}
                        />
                        <Label htmlFor="isActive" className={cn(
                          editForm.isActive ? "text-green-600" : "text-red-600"
                        )}>
                          {editForm.isActive ? "Ativo" : "Inativo"}
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="button" onClick={handleSaveEvent} className="bg-univag-navy hover:bg-univag-darknavy">
                      Salvar Alterações
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <section className="mt-8">
                <Tabs defaultValue="projects" className="w-full">
                  <TabsList className="w-full sm:w-auto">
                    <TabsTrigger value="projects" className="flex-1 sm:flex-initial">Projetos</TabsTrigger>
                    <TabsTrigger value="details" className="flex-1 sm:flex-initial">Detalhes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="projects" className="mt-6">
                    <EventProjectsGrid projects={projects} isEventActive={event.isActive} />
                  </TabsContent>
                  <TabsContent value="details" className="mt-6">
                    <Card className="bg-white shadow-md">
                      <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-4 text-univag-navy">Detalhes do Evento</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg bg-gray-50">
                            <p className="font-semibold text-gray-700">Tema</p>
                            <p>{event.theme}</p>
                          </div>
                          <div className="p-4 border rounded-lg bg-gray-50">
                            <p className="font-semibold text-gray-700">Semestre</p>
                            <p>{event.semester}</p>
                          </div>
                          <div className="p-4 border rounded-lg bg-gray-50">
                            <p className="font-semibold text-gray-700">Local</p>
                            <p>{event.location}</p>
                          </div>
                          <div className="p-4 border rounded-lg bg-gray-50">
                            <p className="font-semibold text-gray-700">Data</p>
                            <p>{format(parse(event.date.split('T')[0], "yyyy-MM-dd", new Date()), "dd/MM/yyyy")}</p>
                          </div>
                          <div className="p-4 border rounded-lg bg-gray-50">
                            <p className="font-semibold text-gray-700">Horário</p>
                            <p>{event.date.includes('T') ? event.date.split('T')[1].substring(0, 5) : '00:00'}</p>
                          </div>
                          <div className="p-4 border rounded-lg bg-gray-50">
                            <p className="font-semibold text-gray-700">Status</p>
                            <div className="flex items-center mt-1">
                              <div className={`h-3 w-3 rounded-full mr-2 ${event.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <span>{event.isActive ? 'Ativo' : 'Inativo'}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </section>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Evento Não Encontrado</h2>
              <p className="text-gray-600 mb-6">O evento que você está procurando não existe.</p>
              <Button asChild className="bg-univag-navy hover:bg-univag-darknavy">
                <Link to="/events">Voltar para Eventos</Link>
              </Button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default EventDetail;

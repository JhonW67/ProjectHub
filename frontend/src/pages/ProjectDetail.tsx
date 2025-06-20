import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProjectDetailTabs from '@/components/projects/ProjectDetailTabs';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Edit, Users } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';


// Import the correct Project, Evaluation, and Feedback types
import type { Project as ProjectType, Evaluation, Feedback } from '@/lib/data';

// Define interfaces for project, group, and event
type Project = ProjectType;

interface Group {
  id: string;
  name: string;
  // add other fields as needed
}

interface Event {
  id: string;
  title: string;
  // add other fields as needed
}

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { role, userId, isLoading } = useAuth();
  const isProfessor = role === 'professor';
  const [project, setProject] = useState<Project | null>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!projectId) return;

        const projectRes = await axios.get(`/api/projects/${projectId}`);
        const projectData = projectRes.data;
        setProject(projectData);

        const groupRes = await axios.get(`/api/groups/${projectData.groupId}`);
        setGroup(groupRes.data);

        const eventRes = await axios.get(`/api/events/${projectData.eventId}`);
        setEvent(eventRes.data);

        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar dados do projeto:', err);
        setError(true);
      }
    };

    fetchData();
  }, [projectId]);

  const handleEditProject = () => {
    if (projectId) {
      navigate(`/projects/${projectId}/edit`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando projeto...</p>
      </div>
    );
  }

  if (error || !project) {
    return <Navigate to="/projects" replace />;
  }

  interface UserWithType {
    type: string;
    [key: string]: unknown;
  }

  function isUserWithType(u: unknown): u is UserWithType {
    return typeof u === 'object' && u !== null && 'type' in u && typeof (u as { type: unknown }).type === 'string';
  }

  function hasTypeProperty(user: unknown): user is { type: string } {
    return typeof user === 'object' && user !== null && 'type' in user && typeof (user as { type: unknown }).type === 'string';
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | ProjectHub UNIVAG</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="relative h-64 md:h-80 overflow-hidden rounded-xl mb-8">
              <img 
                src={project.banner} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-6 text-white w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <Badge className="mb-3 bg-univag-navy">{event?.title}</Badge>
                      <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
                      <div className="flex flex-wrap items-center gap-4 text-sm opacity-90">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{group?.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Criado em {formatDate(project.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    {isProfessor && (
                      <Button 
                        onClick={handleEditProject}
                        className="bg-univag-navy hover:bg-univag-darknavy"
                      >
                        <Edit className="h-4 w-4 mr-2" /> Editar Projeto
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <ProjectDetailTabs 
              project={project} 
              currentUser={{ id: userId ?? '', role }} 
              isProfessor={role === 'professor'} 
              role={role}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProjectDetail;

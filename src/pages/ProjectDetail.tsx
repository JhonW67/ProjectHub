
import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProjectDetailTabs from '@/components/projects/ProjectDetailTabs';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Users, Calendar, Edit } from 'lucide-react';
import { getProjectById, getGroupById, getEventById, formatDate, users } from '@/lib/data';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = projectId ? getProjectById(projectId) : undefined;
  
  // For demo, we'll use the first professor user
  const professorUser = users.find(user => user.type === 'professor');
  const isProfessor = true; // For demo purposes
  
  // Get project group and event
  const group = project ? getGroupById(project.groupId) : undefined;
  const event = project ? getEventById(project.eventId) : undefined;
  
  // Handle edit button click
  const handleEditProject = () => {
    if (projectId) {
      navigate(`/projects/${projectId}/edit`);
    }
  };
  
  // Redirect if project not found
  if (!project) {
    return <Navigate to="/projects" replace />;
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
            {/* Project Banner */}
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
                    <Button 
                      onClick={handleEditProject}
                      className="bg-univag-navy hover:bg-univag-darknavy"
                    >
                      <Edit className="h-4 w-4 mr-2" /> Editar Projeto
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Project Tabs */}
            <ProjectDetailTabs project={project} currentUser={professorUser} isProfessor={isProfessor} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProjectDetail;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCode, ExternalLink, LockIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Project } from '@/lib/data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EventProjectsGridProps {
  projects: Project[];
  isEventActive?: boolean;
}

const EventProjectsGrid: React.FC<EventProjectsGridProps> = ({ projects, isEventActive = true }) => {
  const navigate = useNavigate();
  
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card 
          key={project.id} 
          className={`univag-card overflow-hidden h-full flex flex-col ${!isEventActive ? 'opacity-80' : ''}`}
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
        >
          <div className="relative">
            <img 
              src={project.banner} 
              alt={project.title}
              className="w-full h-40 object-cover"
            />
            <div className={`absolute inset-0 bg-univag-navy bg-opacity-80 flex items-center justify-center transition-opacity duration-300 ${
              hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="text-center text-white p-4">
                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <div className="flex justify-center gap-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-white border-white hover:bg-white hover:text-univag-navy"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" /> Ver Detalhes
                  </Button>
                </div>
              </div>
            </div>
            {!isEventActive && (
              <div className="absolute top-2 right-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-gray-800 text-white p-1 rounded-full">
                        <LockIcon className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Evento encerrado - Avaliações fechadas</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
          <CardContent className="p-4 flex-grow">
            <h3 className="font-semibold text-lg text-univag-navy line-clamp-1">
              {project.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 mt-2">
              {project.description}
            </p>
            <div className="flex justify-between items-center mt-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Stand #{project.id.slice(-1)}
              </Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-univag-navy"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/projects/${project.id}/qr`);
                }}
              >
                <QrCode className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {projects.length === 0 && (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-600">
            Não há projetos cadastrados para este evento.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventProjectsGrid;

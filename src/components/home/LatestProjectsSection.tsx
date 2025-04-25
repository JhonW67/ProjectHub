
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import ProjectList from '../projects/ProjectList';
import { projects } from '@/lib/data';

const LatestProjectsSection = () => {
  const navigate = useNavigate();
  const latestProjects = projects.slice(0, 3); // Get the 3 most recent projects

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-univag-navy mb-2">Projetos Recentes</h2>
            <p className="text-gray-600">
              Conheça os últimos projetos desenvolvidos pelos alunos do UNIVAG.
            </p>
          </div>
          <Button 
            onClick={() => navigate('/projects')}
            variant="outline" 
            className="mt-4 lg:mt-0 border-univag-navy text-univag-navy hover:bg-univag-navy hover:text-white"
          >
            Ver Todos <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <ProjectList projects={latestProjects} />
      </div>
    </section>
  );
};

export default LatestProjectsSection;

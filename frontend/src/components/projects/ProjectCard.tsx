import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Project, formatDate } from '@/lib/data';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  showEvaluation?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, showEvaluation = false }) => {
  const navigate = useNavigate();

  const averageScore = project.evaluations.length > 0
    ? project.evaluations.reduce((acc, evaluation) => acc + evaluation.score, 0) / project.evaluations.length
    : 0;

  return (
    <Card className="univag-card hover:scale-in overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.banner}
          alt={`Banner do projeto ${project.title}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg text-univag-navy line-clamp-2">{project.title}</h3>
          <div className="flex items-center text-xs text-gray-500">
            <span>Criado em {formatDate(project.createdAt)}</span>
          </div>
          {project.eventTitle && (
            <div className="text-xs text-gray-500 italic">
              Evento: {project.eventTitle}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {project.type === "extension" ? "Projeto Extensionista" : "Projeto de Pesquisa"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {showEvaluation && (
          averageScore > 0 ? (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">{averageScore.toFixed(1)}</span>
            </div>
          ) : (
            <span className="text-sm text-gray-400 italic">Sem avaliações</span>
          )
        )}

        <motion.div whileTap={{ scale: 0.95 }} className="ml-auto">
          <Button
            onClick={() => navigate(`/projects/${project.id}`)}
            className="bg-univag-navy hover:bg-univag-darknavy"
          >
            <Eye className="h-4 w-4 mr-2" /> Ver Projeto
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;

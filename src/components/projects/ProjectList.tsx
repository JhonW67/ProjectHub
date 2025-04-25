
import React from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/lib/data';

interface ProjectListProps {
  projects: Project[];
  showEvaluation?: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, showEvaluation = false }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} showEvaluation={showEvaluation} />
      ))}
    </div>
  );
};

export default ProjectList;

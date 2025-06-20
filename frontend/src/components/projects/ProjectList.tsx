import React, { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/lib/data';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectListProps {
  projects: Project[];
  currentUserId: string | null;
  currentUserRole: string | null;
  showEvaluation?: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  currentUserId,
  currentUserRole,
  showEvaluation = false
}) => {
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('latest');

  const filteredProjects = useMemo(() => {
    const result = projects
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return orderBy === 'latest' ? dateB - dateA : dateA - dateB;
      });

    return result.map(project => ({
      ...project,
      canViewEvaluation: showEvaluation ||
        currentUserRole === 'professor' ||
        (
          typeof project.groupId === 'object' &&
          Array.isArray((project.groupId as { members: { id: string }[] }).members) &&
          ((project.groupId as { members: { id: string }[] }).members.some(
            (member: { id: string }) => member.id === currentUserId
          ))
        )
    }));
  }, [projects, search, orderBy, currentUserId, currentUserRole, showEvaluation]);

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex-1">
          <Label htmlFor="search">Buscar projeto</Label>
          <Input
            id="search"
            placeholder="Digite o título do projeto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-48">
          <Label htmlFor="order">Ordenar por</Label>
          <Select value={orderBy} onValueChange={setOrderBy}>
            <SelectTrigger id="order" className="w-full" />
            <SelectContent>
              <SelectItem value="latest">Mais recentes</SelectItem>
              <SelectItem value="oldest">Mais antigos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lista de Projetos */}
      {filteredProjects.length === 0 ? (
        <p className="text-center text-gray-500 py-12">Nenhum projeto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map(({ canViewEvaluation, ...project }) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard 
                  project={project} 
                  showEvaluation={canViewEvaluation}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
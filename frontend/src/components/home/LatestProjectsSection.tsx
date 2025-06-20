import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import ProjectList from '../projects/ProjectList';
import { projects } from '@/lib/data';
import { motion } from 'framer-motion';

const LatestProjectsSection = () => {
  const navigate = useNavigate();
  const latestProjects = projects.slice(0, 3);

  return (
    <section
      className="py-16 bg-gray-50 dark:bg-gray-900"
      aria-labelledby="latest-projects-title"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <h2
              id="latest-projects-title"
              className="text-3xl font-bold text-univag-navy dark:text-white mb-2"
            >
              Projetos Recentes
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl">
              Conheça os últimos projetos desenvolvidos pelos alunos do UNIVAG.
            </p>
          </div>
          <Button
            onClick={() => navigate('/projects')}
            variant="outline"
            className="border-univag-navy text-univag-navy hover:bg-univag-navy hover:text-white dark:hover:bg-white/10 dark:border-white dark:text-white"
            aria-label="Ver todos os projetos"
          >
            Ver Todos <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <ProjectList projects={latestProjects} />
        </motion.div>
      </div>
    </section>
  );
};

export default LatestProjectsSection;

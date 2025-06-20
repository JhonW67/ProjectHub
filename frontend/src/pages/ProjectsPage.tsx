// src/pages/projects.tsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProjectList from '@/components/projects/ProjectList';
import axios from 'axios';
import { Project } from '@/lib/data';
import { useAuth } from '@/hooks/useAuth';

const ProjectsPage = () => {
  const { token, role, userId } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Projetos | ProjectHub UNIVAG</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl font-bold text-univag-navy mb-4">Projetos</h1>
              <p className="text-xl text-gray-600">
                Conheça os projetos desenvolvidos pelos alunos do UNIVAG no âmbito
                da disciplina Projeto Extensionista Integrador.
              </p>
            </div>

            {loading ? (
              <p className="text-center">Carregando projetos...</p>
            ) : (
              <ProjectList
                projects={projects}
                currentUserId={userId}
                currentUserRole={role}
              />
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProjectsPage;

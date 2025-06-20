import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EditProjectForm from '@/components/projects/EditProjectForm';
import { getProjectById } from '@/lib/data';

const EditProject = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProjectById(projectId) : undefined;

  // Redirect if project not found
  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Editar Projeto | ProjectHub UNIVAG</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h1 className="text-3xl font-bold text-univag-navy dark:text-white mb-4">
                Editar Projeto
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Edite as informações do seu projeto
              </p>
            </div>

            <EditProjectForm project={project} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default EditProject;

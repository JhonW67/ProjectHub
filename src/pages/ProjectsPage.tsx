
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProjectList from '@/components/projects/ProjectList';
import { projects } from '@/lib/data';

const ProjectsPage = () => {
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
            
            <ProjectList projects={projects} showEvaluation={true} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProjectsPage;

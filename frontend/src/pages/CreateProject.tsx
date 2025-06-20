import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CreateProjectForm from '@/components/projects/CreateProjectForm';

const CreateProject = () => {
  return (
    <>
      <Helmet>
        <title>Criar Projeto | ProjectHub UNIVAG</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-univag-navy dark:text-white mb-2">
              Criar Novo Projeto
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Preencha o formulário abaixo para criar um novo projeto para seu grupo
            </p>

            <CreateProjectForm />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CreateProject;

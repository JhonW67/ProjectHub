import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import AdminLoginForm from '@/components/auth/AdminLoginForm';
import { Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Auth = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [direction, setDirection] = useState(0);
  const [prevType, setPrevType] = useState(type);

  useEffect(() => {
    if (prevType === 'login' && type === 'register') {
      setDirection(1);
    } else if (prevType === 'register' && type === 'login') {
      setDirection(-1);
    }
    setPrevType(type);
  }, [type, prevType]);

  // Mensagem e fallback antes de redirecionar se o tipo for inválido
  if (type !== 'login' && type !== 'register' && type !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300 text-lg">Redirecionando...</p>
        <Navigate to="/auth/login" replace />
      </div>
    );
  }

  const handleSwitchForm = (formType: string) => {
    setDirection(formType === 'login' ? -1 : 1);
    navigate(`/auth/${formType}`);
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-white dark:bg-gray-900 transition-colors">
      {/* Left Section - Formulários */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={type}
          initial={{ x: 100 * direction, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100 * direction, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8"
        >
          <div className="w-full max-w-md" role="form" aria-label="Formulário de autenticação">
            {type === 'login' && <LoginForm />}
            {type === 'register' && <RegisterForm onSwitchForm={() => handleSwitchForm('login')} />}
            {type === 'admin' && <AdminLoginForm />}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Right Section - Branding */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`info-${type}`}
          initial={{ x: -100 * direction, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100 * direction, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="hidden md:flex md:w-1/2 bg-univag-navy items-center justify-center"
        >
          <div className="text-center text-white dark:text-gray-100 p-8">
            <div className="flex justify-center mb-6">
              <Layers className="h-20 w-20 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">ProjectHub UNIVAG</h1>
            <p className="text-xl">
              Plataforma de apresentação e avaliação de projetos da disciplina Projeto Extensionista Integrador
            </p>
            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-lg">
              <p className="text-lg font-medium mb-3">
                {type === 'login'
                  ? 'Faça parte da comunidade acadêmica'
                  : type === 'register'
                  ? 'Junte-se à nossa comunidade'
                  : 'Área restrita para administradores'}
              </p>
              <p className="text-sm">
                {type === 'login'
                  ? 'O ProjectHub permite que alunos e professores colaborem nos projetos extensionistas do UNIVAG, promovendo a inovação e o aprendizado prático.'
                  : type === 'register'
                  ? 'Crie sua conta para acessar todas as funcionalidades do ProjectHub e começar a trabalhar em projetos inovadores.'
                  : 'Esta área é destinada apenas para administradores do sistema.'}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Auth;

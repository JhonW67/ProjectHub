
import React from 'react';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-univag-navy text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="h-6 w-6" />
              <span className="font-bold text-xl">ProjectHub</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Plataforma de apresentação e avaliação de projetos extensionistas do UNIVAG.
            </p>
          </div>
          
          <div className="hidden md:block">
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Início</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-white">Projetos</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white">Eventos</Link></li>
            </ul>
          </div>
          
          <div className="hidden md:block">
            <h3 className="font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><Link to="/auth/login" className="text-gray-300 hover:text-white">Entrar</Link></li>
              <li><Link to="/auth/register" className="text-gray-300 hover:text-white">Cadastrar</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Ajuda</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <p className="text-gray-300 text-sm mb-1">Centro Universitário de Várzea Grande</p>
            <p className="text-gray-300 text-sm mb-3">Várzea Grande, MT</p>
            <p className="text-gray-300 text-sm">contato@univag.edu.br</p>
            <div className="mt-4 text-xs">
              <Link to="/auth/admin" className="text-gray-400 hover:text-gray-300">Acesso Administrativo</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} UNIVAG - Centro Universitário de Várzea Grande. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

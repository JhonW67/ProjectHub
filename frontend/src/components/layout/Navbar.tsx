import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home, User, FileText, Calendar, Menu, X,
  LogOut, Settings, Users, Shield, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {useAuth }from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

// Componente de item de navegação reutilizável
interface NavItemProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isMobile?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isMobile, onClick }) => {
  const baseClasses = 'px-3 py-2 rounded-md transition-colors flex items-center gap-2';
  const hoverClasses = 'hover:text-gray-200 hover:bg-univag-darknavy';
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses}`}
      aria-label={label}
    >
      <Icon className={isMobile ? 'h-5 w-5' : 'h-4 w-4'} />
      <span>{label}</span>
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, role, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isAuthenticated = !!token;

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logout realizado',
      description: 'Você foi desconectado com sucesso',
      duration: 3000,
    });
    navigate('/');
  };

  const commonLinks = [
    { to: '/', icon: Home, label: 'Início' },
    { to: '/events', icon: Calendar, label: 'Eventos' },
    { to: '/projects', icon: FileText, label: 'Projetos' },
  ];

  const roleBasedLinks = {
    admin: [
      { to: '/dashboard/admin', icon: Shield, label: 'Admin' },
      { to: '/users', icon: Users, label: 'Usuários' },
      { to: '/settings', icon: Settings, label: 'Configurações' },
    ],
    professor: [
      { to: '/dashboard/professor', icon: User, label: 'Dashboard' },
    ],
    student: [
      { to: '/dashboard/student', icon: User, label: 'Dashboard' },
      { to: '/group/chat', icon: MessageSquare, label: 'Grupo' },
    ],
  };

  return (
    <nav className="bg-univag-navy text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2" aria-label="Página inicial">
            <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
            <span className="font-bold text-xl">ProjectHub</span>
            <span className="bg-white text-univag-navy text-xs px-2 py-1 rounded-md">UNIVAG</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {commonLinks.map(link => (
              <NavItem key={link.to} {...link} />
            ))}
            {isAuthenticated && roleBasedLinks[role]?.map(link => (
              <NavItem key={link.to} {...link} />
            ))}
            {isAuthenticated ? (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="hover:bg-red-700 text-white flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            ) : (
              <Link to="/auth/login">
                <Button className="bg-white text-univag-navy hover:bg-gray-100">Entrar</Button>
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menu"
              className="focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 pb-4 space-y-2"
            >
              {commonLinks.map(link => (
                <NavItem key={link.to} {...link} isMobile onClick={() => setIsOpen(false)} />
              ))}
              {isAuthenticated && roleBasedLinks[role]?.map(link => (
                <NavItem key={link.to} {...link} isMobile onClick={() => setIsOpen(false)} />
              ))}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left hover:text-gray-200 px-3 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sair</span>
                </button>
              ) : (
                <Link to="/auth/login">
                  <Button className="w-full bg-white text-univag-navy hover:bg-gray-100">Entrar</Button>
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Home, 
  User, 
  FileText, 
  Calendar, 
  Layers, 
  Menu, 
  X,
  LogOut,
  Settings,
  Users,
  Shield,
  MessageSquare
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is on a protected page
  const isLoggedIn = location.pathname.includes('/dashboard') || 
                     location.pathname.includes('/projects/create') ||
                     location.pathname.includes('/group') ||
                     (location.pathname.includes('/projects') && location.pathname.includes('/edit'));
  
  // Detect user role based on URL
  const isAdmin = location.pathname.includes('/dashboard/admin') || 
                  location.pathname.includes('/users') || 
                  location.pathname.includes('/settings');
  
  const isProfessor = location.pathname.includes('/dashboard/professor') && !isAdmin;
  const isStudent = (location.pathname.includes('/dashboard/student') || 
                    location.pathname.includes('/group')) && !isAdmin && !isProfessor;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
      duration: 3000,
    });
    navigate('/');
  };

  return (
    <nav className="bg-univag-navy text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Layers className="h-6 w-6" />
            <span className="font-bold text-xl">ProjectHub</span>
            <span className="bg-white text-univag-navy text-xs px-2 py-1 rounded-md">UNIVAG</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Início</span>
            </Link>
            <Link to="/events" className="hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Eventos</span>
            </Link>
            <Link to="/projects" className="hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Projetos</span>
            </Link>
            
            {isLoggedIn && (
              <>
                {isAdmin && (
                  <>
                    <Link to="/dashboard/admin" className="hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                    <Link to="/users" className="hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Usuários</span>
                    </Link>
                    <Link to="/settings" className="hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors flex items-center gap-1">
                      <Settings className="h-4 w-4" />
                      <span>Configurações</span>
                    </Link>
                  </>
                )}
                
                {isProfessor && (
                  <Link to="/dashboard/professor" className="hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                
                {isStudent && (
                  <>
                    <Link to="/dashboard/student" className="hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link to="/group/chat" className="hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>Grupo</span>
                    </Link>
                  </>
                )}
                
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="hover:bg-red-700 text-white flex items-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Button>
              </>
            )}
            
            {!isLoggedIn && (
              <Link to="/auth/login">
                <Button className="bg-white text-univag-navy hover:bg-gray-100">
                  Entrar
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in">
            <Link to="/" className="block hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors">
              <span className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Início
              </span>
            </Link>
            <Link to="/events" className="block hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Eventos
              </span>
            </Link>
            <Link to="/projects" className="block hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Projetos
              </span>
            </Link>
            
            {isLoggedIn && (
              <>
                {isAdmin && (
                  <>
                    <Link to="/dashboard/admin" className="block hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors">
                      <span className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Admin
                      </span>
                    </Link>
                    <Link to="/users" className="block hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors">
                      <span className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Usuários
                      </span>
                    </Link>
                    <Link to="/settings" className="block hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors">
                      <span className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Configurações
                      </span>
                    </Link>
                  </>
                )}
                
                {isProfessor && (
                  <Link to="/dashboard/professor" className="block hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors">
                    <span className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Dashboard
                    </span>
                  </Link>
                )}
                
                {isStudent && (
                  <>
                    <Link to="/dashboard/student" className="block hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors">
                      <span className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Dashboard
                      </span>
                    </Link>
                    <Link to="/group/chat" className="block hover:text-gray-200 px-3 py-2 rounded-md hover:bg-univag-darknavy transition-colors">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Grupo
                      </span>
                    </Link>
                  </>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="w-full text-left hover:text-gray-200 px-3 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <LogOut className="h-5 w-5" />
                    Sair
                  </span>
                </button>
              </>
            )}
            
            {!isLoggedIn && (
              <Link to="/auth/login" className="block">
                <Button className="w-full bg-white text-univag-navy hover:bg-gray-100">
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

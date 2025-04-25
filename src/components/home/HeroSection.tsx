
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-univag-navy to-univag-darknavy text-white py-16 md:py-24">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 animate-slide-in">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Projetos Extensionistas e Inovação no UNIVAG
          </h1>
          <p className="text-lg md:text-xl text-gray-100">
            Apresente seus projetos, receba feedback e avaliações em um ambiente virtual inovador
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-white text-univag-navy hover:bg-gray-100 transition-colors px-6 py-6 text-lg font-medium"
              onClick={() => navigate('/auth/register')}
            >
              Começar Agora <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              className="bg-transparent border-2 border-white hover:bg-white/10 transition-colors px-6 py-6 text-lg font-medium"
              onClick={() => navigate('/events')}
            >
              Ver Eventos
            </Button>
          </div>
        </div>
        <div className="hidden md:block">
          <img 
            src="/placeholder.svg" 
            alt="Projeto Extensionista" 
            className="rounded-lg shadow-xl animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

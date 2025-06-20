import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="bg-gradient-to-r from-univag-navy to-univag-darknavy text-white py-16 md:py-24"
      aria-labelledby="hero-title"
    >
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            id="hero-title"
            className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl"
          >
            Projetos Extensionistas e Inovação no UNIVAG
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
            Apresente seus projetos, receba feedback e avaliações em um ambiente virtual inovador
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              aria-label="Registrar agora"
              className="bg-white text-univag-navy hover:bg-gray-100 transition-colors px-6 py-6 text-lg font-medium"
              onClick={() => navigate('/auth/register')}
            >
              Começar Agora <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              aria-label="Ver eventos"
              className="bg-transparent border-2 border-white hover:bg-white/10 transition-colors px-6 py-6 text-lg font-medium"
              onClick={() => navigate('/events')}
            >
              Ver Eventos
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img
            src="/placeholder.svg"
            alt="Representação de um projeto extensionista"
            className="rounded-lg shadow-xl w-full h-auto"
            role="img"
            aria-label="Imagem de projeto extensionista"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

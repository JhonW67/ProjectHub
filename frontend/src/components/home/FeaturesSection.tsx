import React from 'react';
import {
  FileText, Award, QrCode, MessageCircle, Users, Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Apresente seus Projetos",
    description: "Crie páginas atraentes para seus projetos com descrições, imagens e documentos.",
    icon: FileText
  },
  {
    title: "Avaliações dos Professores",
    description: "Receba avaliações detalhadas e construtivas dos professores avaliadores.",
    icon: Award
  },
  {
    title: "QR Codes para Projetos",
    description: "Acesso rápido aos projetos através de QR codes exclusivos.",
    icon: QrCode
  },
  {
    title: "Feedback Interativo",
    description: "Comente e receba feedback sobre os projetos apresentados.",
    icon: MessageCircle
  },
  {
    title: "Trabalho em Equipe",
    description: "Forme grupos e colabore com outros estudantes nos projetos.",
    icon: Users
  },
  {
    title: "Eventos Semestrais",
    description: "Participe dos eventos semestrais de apresentação de projetos.",
    icon: Calendar
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" aria-labelledby="features-title">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="features-title" className="text-3xl font-bold text-univag-navy dark:text-white mb-4">
            Recursos do ProjectHub
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Conheça todas as funcionalidades que o ProjectHub oferece para alunos e professores do UNIVAG.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ title, description, icon: Icon }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">
                <Icon className="h-10 w-10 text-univag-navy dark:text-white" aria-label={title} />
              </div>
              <h3 className="text-lg font-semibold text-univag-navy dark:text-white mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

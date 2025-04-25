
import React from 'react';
import { FileText, Award, QrCode, MessageCircle, Users, Calendar } from 'lucide-react';

const features = [
  {
    title: "Apresente seus Projetos",
    description: "Crie páginas atraentes para seus projetos com descrições, imagens e documentos.",
    icon: <FileText className="h-10 w-10 text-univag-navy" />
  },
  {
    title: "Avaliações dos Professores",
    description: "Receba avaliações detalhadas e construtivas dos professores avaliadores.",
    icon: <Award className="h-10 w-10 text-univag-navy" />
  },
  {
    title: "QR Codes para Projetos",
    description: "Acesso rápido aos projetos através de QR codes exclusivos.",
    icon: <QrCode className="h-10 w-10 text-univag-navy" />
  },
  {
    title: "Feedback Interativo",
    description: "Comente e receba feedback sobre os projetos apresentados.",
    icon: <MessageCircle className="h-10 w-10 text-univag-navy" />
  },
  {
    title: "Trabalho em Equipe",
    description: "Forme grupos e colabore com outros estudantes nos projetos.",
    icon: <Users className="h-10 w-10 text-univag-navy" />
  },
  {
    title: "Eventos Semestrais",
    description: "Participe dos eventos semestrais de apresentação de projetos.",
    icon: <Calendar className="h-10 w-10 text-univag-navy" />
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-univag-navy mb-4">Recursos do ProjectHub</h2>
          <p className="text-gray-600">
            Conheça todas as funcionalidades que o ProjectHub oferece para alunos e professores do UNIVAG.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-in"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-univag-navy mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

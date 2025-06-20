import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { events, formatDate } from '@/lib/data';
import { motion } from 'framer-motion';

const UpcomingEventsSection = () => {
  const navigate = useNavigate();
  const today = new Date();

  // Filtrando os eventos diretamente no render
  const activeEvents = events.filter(event => new Date(event.date) >= today);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" aria-labelledby="upcoming-events-title">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10">
          <div>
            <h2 id="upcoming-events-title" className="text-3xl font-bold text-univag-navy dark:text-white mb-2">
              Próximos Eventos
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Confira os eventos ativos e programe-se para participar.
            </p>
          </div>
          <Button 
            onClick={() => navigate('/events')}
            variant="outline" 
            className="border-univag-navy text-univag-navy hover:bg-univag-navy hover:text-white dark:border-white dark:text-white dark:hover:bg-white/10"
          >
            Ver Todos <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {activeEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="univag-card overflow-hidden hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-40 md:h-auto">
                    <img 
                      src={event.banner} 
                      alt={`Banner do evento ${event.title}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 flex flex-col">
                    <CardHeader className="p-4 pb-2">
                      <Badge className="mb-2 bg-green-500 hover:bg-green-600">
                        Avaliações Abertas
                      </Badge>
                      <h3 className="font-bold text-lg text-univag-navy dark:text-white">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mt-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                        {event.description}
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button 
                        onClick={() => navigate(`/events/${event.id}`)}
                        className="bg-univag-navy hover:bg-univag-darknavy text-white"
                      >
                        Ver Detalhes
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {activeEvents.length === 0 && (
            <motion.div
              className="col-span-2 text-center py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col items-center justify-center">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
                  Não há eventos ativos no momento.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Os administradores podem atualizar as datas dos eventos na página de detalhes.
                </p>
                <Button 
                  onClick={() => navigate('/events')}
                  className="mt-4 bg-univag-navy hover:bg-univag-darknavy"
                >
                  Ver Todos os Eventos
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;

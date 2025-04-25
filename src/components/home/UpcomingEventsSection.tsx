
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { events, formatDate } from '@/lib/data';

const UpcomingEventsSection = () => {
  const navigate = useNavigate();
  const activeEvents = events.filter(event => event.isActive);
  
  // We need to update the active events calculation
  // Check if dates are still in the future
  React.useEffect(() => {
    // Update isActive status for events based on current date
    const today = new Date();
    events.forEach(event => {
      const eventDate = new Date(event.date);
      // Set isActive status based on date comparison
      event.isActive = eventDate >= today;
    });
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-univag-navy mb-2">Próximos Eventos</h2>
            <p className="text-gray-600">
              Confira os eventos ativos e programe-se para participar.
            </p>
          </div>
          <Button 
            onClick={() => navigate('/events')}
            variant="outline" 
            className="mt-4 lg:mt-0 border-univag-navy text-univag-navy hover:bg-univag-navy hover:text-white"
          >
            Ver Todos <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {activeEvents.map(event => (
            <Card key={event.id} className="univag-card hover:scale-in overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-40 md:h-auto">
                  <img 
                    src={event.banner} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 flex flex-col">
                  <CardHeader className="p-4 pb-2">
                    <div>
                      <Badge className="mb-2 bg-green-500 hover:bg-green-600">Avaliações Abertas</Badge>
                      <h3 className="font-bold text-lg text-univag-navy">{event.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-grow">
                    <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="bg-univag-navy hover:bg-univag-darknavy"
                    >
                      Ver Detalhes
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
          
          {activeEvents.length === 0 && (
            <div className="col-span-2 text-center py-10">
              <div className="flex flex-col items-center justify-center">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
                <p className="text-gray-600 text-lg mb-2">
                  Não há eventos ativos no momento.
                </p>
                <p className="text-gray-500">
                  Os administradores podem atualizar as datas dos eventos na página de detalhes.
                </p>
                <Button 
                  onClick={() => navigate('/events')}
                  className="mt-4 bg-univag-navy hover:bg-univag-darknavy"
                >
                  Ver Todos os Eventos
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;


import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventList from '@/components/events/EventList';
import { events } from '@/lib/data';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EventsPage = () => {
  // We now use the isActive property which is updated based on the date
  const activeEvents = events.filter(event => event.isActive);
  const pastEvents = events.filter(event => !event.isActive);
  
  const handleSwitchToPastEvents = () => {
    // Find the past events tab trigger by its value and programmatically select it
    const pastTabTrigger = document.querySelector('[data-value="past"]') as HTMLButtonElement;
    if (pastTabTrigger) {
      pastTabTrigger.click();
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Eventos | ProjectHub UNIVAG</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl font-bold text-univag-navy mb-4">Eventos</h1>
              <p className="text-xl text-gray-600">
                Descubra os eventos de apresentação de projetos do UNIVAG, onde a
                inovação e o conhecimento se encontram.
              </p>
            </div>
            
            <Tabs defaultValue="active" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="active">Eventos Ativos</TabsTrigger>
                  <TabsTrigger value="past">Eventos Encerrados</TabsTrigger>
                  <TabsTrigger value="all">Todos os Eventos</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="active" className="animate-fade-in">
                {activeEvents.length > 0 ? (
                  <>
                    <div className="mb-6 text-center">
                      <p className="text-gray-600">
                        Eventos ativos permitem avaliação e feedback de projetos.
                      </p>
                    </div>
                    <EventList events={activeEvents} />
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">Não há eventos ativos no momento.</p>
                    <Button 
                      variant="outline" 
                      onClick={handleSwitchToPastEvents}
                      className="border-univag-navy text-univag-navy hover:bg-univag-navy hover:text-white"
                    >
                      Ver eventos anteriores
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past" className="animate-fade-in">
                {pastEvents.length > 0 ? (
                  <>
                    <div className="mb-6 text-center">
                      <p className="text-gray-600">
                        Eventos encerrados não permitem novas avaliações ou feedback.
                      </p>
                    </div>
                    <EventList events={pastEvents} />
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Não há eventos anteriores registrados.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="all" className="animate-fade-in">
                <EventList events={events} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default EventsPage;

import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventList from '@/components/events/EventList';
import { events } from '@/lib/data';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const EventsPage = () => {
  const [semestreSelecionado, setSemestreSelecionado] = useState('todos');
  const [temaSelecionado, setTemaSelecionado] = useState('todos');
  const [termoBusca, setTermoBusca] = useState('');

  const activeEvents = events.filter(event => event.isActive);
  const pastEvents = events.filter(event => !event.isActive);

  const eventosOrdenados = useMemo(() => {
    return [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const filtrarEventos = (lista: typeof events) => {
    return lista.filter(event => {
      const matchSemestre = semestreSelecionado === 'todos' || event.semester === semestreSelecionado;
      const matchTema = temaSelecionado === 'todos' || event.theme === temaSelecionado;
      const matchBusca = event.title.toLowerCase().includes(termoBusca.toLowerCase());
      return matchSemestre && matchTema && matchBusca;
    });
  };

  const semestresDisponiveis = [...new Set(events.map(e => e.semester))];
  const temasDisponiveis = [...new Set(events.map(e => e.theme))];

  const handleSwitchToPastEvents = () => {
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

            {/* Filtros */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <select
                aria-label="Filtrar por semestre"
                value={semestreSelecionado}
                onChange={(e) => setSemestreSelecionado(e.target.value)}
                className="px-3 py-2 rounded border border-gray-300"
              >
                <option value="todos">Todos os Semestres</option>
                {semestresDisponiveis.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <select
                aria-label="Filtrar por tema"
                value={temaSelecionado}
                onChange={(e) => setTemaSelecionado(e.target.value)}
                className="px-3 py-2 rounded border border-gray-300"
              >
                <option value="todos">Todos os Temas</option>
                {temasDisponiveis.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <input
                type="search"
                aria-label="Buscar por título"
                placeholder="Buscar por título..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="px-3 py-2 rounded border border-gray-300 w-64"
              />
            </div>

            <Tabs defaultValue="active" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="active">Eventos Ativos</TabsTrigger>
                  <TabsTrigger value="past">Eventos Encerrados</TabsTrigger>
                  <TabsTrigger value="all">Todos os Eventos</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="active">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {filtrarEventos(activeEvents).length > 0 ? (
                    <>
                      <div className="mb-6 text-center">
                        <p className="text-gray-600">
                          Eventos ativos permitem avaliação e feedback de projetos.
                        </p>
                      </div>
                      <EventList events={filtrarEventos(activeEvents)} />
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
                </motion.div>
              </TabsContent>

              <TabsContent value="past">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {filtrarEventos(pastEvents).length > 0 ? (
                    <>
                      <div className="mb-6 text-center">
                        <p className="text-gray-600">
                          Eventos encerrados não permitem novas avaliações ou feedback.
                        </p>
                      </div>
                      <EventList events={filtrarEventos(pastEvents)} />
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-600">Não há eventos anteriores registrados.</p>
                    </div>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="all">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <EventList events={filtrarEventos(eventosOrdenados)} />
                </motion.div>
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

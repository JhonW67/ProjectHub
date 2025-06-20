import React, { useState, useMemo } from 'react';
import EventCard from './EventCard';
import { Event } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [sortByDate, setSortByDate] = useState<'asc' | 'desc'>('desc');

  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSemester) {
      filtered = filtered.filter((event) => event.semester === selectedSemester);
    }

    if (selectedTheme) {
      filtered = filtered.filter((event) => event.theme === selectedTheme);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortByDate === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [events, searchTerm, selectedSemester, selectedTheme, sortByDate]);

  const uniqueSemesters = [...new Set(events.map((e) => e.semester))];
  const uniqueThemes = [...new Set(events.map((e) => e.theme))];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Buscar por título"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:col-span-2"
        />

        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por semestre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            {uniqueSemesters.map((semester) => (
              <SelectItem key={semester} value={semester}>{semester}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTheme} onValueChange={setSelectedTheme}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por tema" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            {uniqueThemes.map((theme) => (
              <SelectItem key={theme} value={theme}>{theme}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-right">
        <Select value={sortByDate} onValueChange={(value) => setSortByDate(value as 'asc' | 'desc')}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Ordenar por data" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Mais recentes</SelectItem>
            <SelectItem value="asc">Mais antigos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            Nenhum evento encontrado.
          </div>
        ) : (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;

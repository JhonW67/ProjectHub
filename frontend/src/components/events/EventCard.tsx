
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Event, formatDate } from '@/lib/data';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  return (
   <Card className="univag-card hover:scale-[1.02] hover:shadow-lg transition-transform duration-300 overflow-hidden h-full flex flex-col">
    <div className="relative h-48 overflow-hidden">
    <img 
      src={event.banner} 
      alt={`Banner do evento ${event.title}`}
      loading="lazy"
      role="img"
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
    />
    <Badge
      className={`absolute top-3 right-3 ${
        event.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
      }`}
    >
      {event.isActive ? 'Ativo' : 'Encerrado'}
    </Badge>
    </div>
    <CardHeader className="p-4 pb-2">
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-lg text-univag-navy">{event.title}</h3>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Calendar className="h-4 w-4" />
        <span>{formatDate(event.date)}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin className="h-4 w-4" />
        <span>{event.location}</span>
      </div>
    </div>
    </CardHeader>
    <CardContent className="p-4 pt-0 flex-grow">
    <p className="text-gray-600 text-sm line-clamp-3 min-h-[60px] mb-3">
      {event.description}
    </p>
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{event.theme}</Badge>
      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">{event.semester}</Badge>
    </div>
    </CardContent>
    <CardFooter className="p-4 pt-0">
    <Button 
      onClick={() => navigate(`/events/${event.id}`)} 
      className="w-full bg-univag-navy hover:bg-univag-darknavy flex items-center justify-center gap-2"
    >
      Ver Evento
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l3-3m-3 3l3 3" />
      </svg>
    </Button>
  </CardFooter>
</Card>

  );
};

export default EventCard;

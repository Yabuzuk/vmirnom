import { Calendar, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Концерт симфонического оркестра',
    date: '28 февраля',
    location: 'Концертный зал',
    image: 'https://images.unsplash.com/photo-1620935189009-a820429b03d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwZXZlbnQlMjBjb25jZXJ0fGVufDF8fHx8MTc3MTkxNTI1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    title: 'Выставка современного искусства',
    date: '1 марта',
    location: 'Музей искусств',
    image: 'https://images.unsplash.com/photo-1569342380852-035f42d9ca41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9uJTIwZ2FsbGVyeXxlbnwxfHx8fDE3NzE5MTUyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    title: 'Спортивный турнир',
    date: '5 марта',
    location: 'Стадион "Мирный"',
    image: 'https://images.unsplash.com/photo-1764050359179-517599dab87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwZXZlbnR8ZW58MXx8fHwxNzcxODEyODQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    title: 'IT-конференция 2026',
    date: '10 марта',
    location: 'Бизнес-центр',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NzE5MDU5MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function EventsSection() {
  return (
    <section id="events" className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl text-gray-900">Афиша Мирного</h2>
          <Button variant="outline" className="hidden sm:flex">
            Все мероприятия
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-2 shadow-md">
                  <div className="text-2xl text-[#2196F3]">
                    {event.date.split(' ')[0]}
                  </div>
                  <div className="text-xs text-gray-600">
                    {event.date.split(' ')[1]}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg text-gray-900 line-clamp-2 group-hover:text-[#2196F3] transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Button variant="outline" className="w-full">
            Все мероприятия
          </Button>
        </div>
      </div>
    </section>
  );
}

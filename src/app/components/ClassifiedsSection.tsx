import { useState } from 'react';
import { Plus, SlidersHorizontal, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Classified {
  id: number;
  title: string;
  price: string;
  category: string;
  date: string;
  image: string;
  isPaid?: boolean;
}

const classifieds: Classified[] = [
  {
    id: 1,
    title: '3-комнатная квартира в центре',
    price: '4 500 000 ₽',
    category: 'Недвижимость',
    date: '24 февраля',
    image: 'https://images.unsplash.com/photo-1707484687082-9493754d389f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBmb3IlMjBzYWxlfGVufDF8fHx8MTc3MTkxNTI1NHww&ixlib=rb-4.1.0&q=80&w=1080',
    isPaid: true,
  },
  {
    id: 2,
    title: 'Винтажный автомобиль, 1975 года',
    price: '850 000 ₽',
    category: 'Транспорт',
    date: '23 февраля',
    image: 'https://images.unsplash.com/photo-1657093416463-28ba3bf295c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FyJTIwY2xhc3NpY3xlbnwxfHx8fDE3NzE4Mjg3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isPaid: true,
  },
  {
    id: 3,
    title: 'Современная мебель для гостиной',
    price: '65 000 ₽',
    category: 'Мебель',
    date: '22 февраля',
    image: 'https://images.unsplash.com/photo-1698417945941-002d5764e98b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NzE5MTUyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    title: 'Коммерческое помещение в торговом центре',
    price: '25 000 ₽/мес',
    category: 'Недвижимость',
    date: '21 февраля',
    image: 'https://images.unsplash.com/photo-1737913785137-c2a957ae7565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGJ1c2luZXNzJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzcxOTE1MjU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    isPaid: true,
  },
  {
    id: 5,
    title: 'Офисное оборудование',
    price: '12 000 ₽',
    category: 'Электроника',
    date: '20 февраля',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NzE5MDU5MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    title: 'Детская коляска, новая',
    price: '8 500 ₽',
    category: 'Детские товары',
    date: '19 февраля',
    image: 'https://images.unsplash.com/photo-1764096535288-506c575296e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBhbm5vdW5jZW1lbnQlMjBib2FyZHxlbnwxfHx8fDE3NzE5MTUyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function ClassifiedsSection() {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  return (
    <section id="classifieds" className="bg-[#F2F2F2] py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl text-gray-900">Объявления Мирного</h2>
          <Button className="bg-[#2196F3] hover:bg-[#1976D2] w-full sm:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Добавить объявление
          </Button>
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-white rounded-lg">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              <SelectItem value="realestate">Недвижимость</SelectItem>
              <SelectItem value="transport">Транспорт</SelectItem>
              <SelectItem value="furniture">Мебель</SelectItem>
              <SelectItem value="electronics">Электроника</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">По дате</SelectItem>
              <SelectItem value="price-asc">Цена: возрастание</SelectItem>
              <SelectItem value="price-desc">Цена: убывание</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="w-full sm:w-auto">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Фильтры
          </Button>
        </div>

        {/* Сетка объявлений */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classifieds.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {item.isPaid && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-[#F9A825] text-white hover:bg-[#F57F17]">
                      Платное
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg text-gray-900 line-clamp-2 group-hover:text-[#2196F3] transition-colors">
                  {item.title}
                </h3>

                <div className="mt-2 text-2xl text-[#2196F3]">
                  {item.price}
                </div>

                <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Плавающая кнопка для мобильных */}
        <div className="fixed bottom-6 right-6 sm:hidden z-40">
          <Button
            size="lg"
            className="bg-[#2196F3] hover:bg-[#1976D2] rounded-full shadow-lg h-14 w-14 p-0"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}

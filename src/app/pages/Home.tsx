import { Link } from "react-router";
import { 
  TrendingUp, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  ShoppingBag,
  Home as HomeIcon,
  Briefcase,
  Car
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  const news = [
    {
      id: 1,
      title: "Открытие нового парка в центре города",
      excerpt: "В субботу состоится торжественное открытие парка отдыха с современной детской площадкой и спортивными зонами.",
      image: "https://images.unsplash.com/photo-1625862175216-6e341d74839f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFyayUyMGZhbWlseXxlbnwxfHx8fDE3NzE0Njk1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "20 февраля 2026",
      category: "События"
    },
    {
      id: 2,
      title: "Новые возможности для предпринимателей",
      excerpt: "Городская администрация запустила программу поддержки малого бизнеса с льготными кредитами.",
      image: "https://images.unsplash.com/photo-1672917187338-7f81ecac3d3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzcxNDY5NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "19 февраля 2026",
      category: "Бизнес"
    }
  ];

  const categories = [
    { name: "Недвижимость", icon: HomeIcon, count: 1243, color: "bg-blue-100 text-blue-600" },
    { name: "Транспорт", icon: Car, count: 856, color: "bg-green-100 text-green-600" },
    { name: "Работа", icon: Briefcase, count: 432, color: "bg-purple-100 text-purple-600" },
    { name: "Товары", icon: ShoppingBag, count: 2167, color: "bg-orange-100 text-orange-600" }
  ];

  const events = [
    {
      id: 1,
      title: "Ярмарка выходного дня",
      date: "22 февраля",
      location: "Центральная площадь"
    },
    {
      id: 2,
      title: "Концерт городского оркестра",
      date: "25 февраля",
      location: "Дворец культуры"
    },
    {
      id: 3,
      title: "Спортивный марафон",
      date: "1 марта",
      location: "Парк Победы"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1767884898868-c065de85553c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NzE0NDg3NzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="City" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Добро пожаловать в ГородПортал
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Современная платформа для размещения объявлений, новостей и событий вашего города
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/classifieds">
                <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50">
                  Смотреть объявления
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/post-ad">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Разместить объявление
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Популярные категории</h2>
              <p className="text-slate-600 mt-2">Найдите то, что вам нужно</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.name} to="/classifieds">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-slate-500">{category.count} объявлений</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* News */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Новости города</h2>
              <p className="text-slate-600 mt-2">Будьте в курсе последних событий</p>
            </div>
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 mb-4">{item.excerpt}</p>
                  <Button variant="link" className="p-0 text-blue-600">
                    Читать далее
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Events */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Предстоящие события</h2>
              <p className="text-slate-600 mt-2">Не пропустите интересные мероприятия</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

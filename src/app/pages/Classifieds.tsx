import { useState } from "react";
import { Link } from "react-router";
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Clock,
  Star,
  Home as HomeIcon,
  Car,
  Briefcase,
  ShoppingBag,
  Smartphone,
  Sofa,
  TrendingUp,
  ChevronRight
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const classifiedsData = [
  {
    id: 1,
    title: "Современная 2-х комнатная квартира",
    price: "6 500 000 ₽",
    category: "Недвижимость",
    location: "Центральный район",
    image: "https://images.unsplash.com/photo-1520106392146-ef585c111254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NzEzNzY0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2 часа назад",
    featured: true,
    icon: HomeIcon
  },
  {
    id: 2,
    title: "Toyota Camry 2023, полная комплектация",
    price: "3 200 000 ₽",
    category: "Транспорт",
    location: "Северный район",
    image: "https://images.unsplash.com/photo-1712799842088-70e1623243b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB2ZWhpY2xlJTIwc2FsZXxlbnwxfHx8fDE3NzE0Njk1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "5 часов назад",
    featured: true,
    icon: Car
  },
  {
    id: 3,
    title: "Ноутбук MacBook Pro M3, новый",
    price: "189 000 ₽",
    category: "Электроника",
    location: "Западный район",
    image: "https://images.unsplash.com/photo-1729496281796-8a86a171939b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGxhcHRvcCUyMGNvbXB1dGVyfGVufDF8fHx8MTc3MTQ2OTUwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "1 день назад",
    featured: false,
    icon: Smartphone
  },
  {
    id: 4,
    title: "Менеджер по продажам в IT компанию",
    price: "от 80 000 ₽",
    category: "Работа",
    location: "Центральный район",
    image: "https://images.unsplash.com/photo-1672917187338-7f81ecac3d3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzcxNDY5NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "1 день назад",
    featured: false,
    icon: Briefcase
  },
  {
    id: 5,
    title: "Угловой диван, состояние отличное",
    price: "25 000 ₽",
    category: "Мебель",
    location: "Южный район",
    image: "https://images.unsplash.com/photo-1520106392146-ef585c111254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NzEzNzY0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2 дня назад",
    featured: false,
    icon: Sofa
  },
  {
    id: 6,
    title: "iPhone 15 Pro Max 256GB",
    price: "119 000 ₽",
    category: "Электроника",
    location: "Центральный район",
    image: "https://images.unsplash.com/photo-1729496281796-8a86a171939b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGxhcHRvcCUyMGNvbXB1dGVyfGVufDF8fHx8MTc3MTQ2OTUwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2 дня назад",
    featured: false,
    icon: Smartphone
  }
];

const categories = [
  { name: "Все категории", value: "all" },
  { name: "Недвижимость", value: "property" },
  { name: "Транспорт", value: "transport" },
  { name: "Электроника", value: "electronics" },
  { name: "Работа", value: "jobs" },
  { name: "Мебель", value: "furniture" },
  { name: "Товары", value: "goods" }
];

export function Classifieds() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Объявления</h1>
              <p className="text-slate-600 mt-2">Найдите то, что вам нужно</p>
            </div>
            <Link to="/post-ad">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                Подать объявление
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Поиск объявлений..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64 h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-12">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Фильтры
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Ads */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-xl font-semibold text-slate-900">Премиум объявления</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classifiedsData.filter(item => item.featured).map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-5">
                    <div className="md:col-span-2 aspect-[4/3] md:aspect-auto relative overflow-hidden">
                      <ImageWithFallback 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-amber-500 text-white">
                        <Star className="w-3 h-3 mr-1 fill-white" />
                        Премиум
                      </Badge>
                    </div>
                    <div className="md:col-span-3 p-6">
                      <Badge variant="outline" className="mb-3">
                        {item.category}
                      </Badge>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                      <div className="text-2xl font-bold text-blue-600 mb-4">{item.price}</div>
                      <div className="space-y-2 text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {item.date}
                        </div>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Подробнее
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Regular Ads */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Все объявления</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classifiedsData.filter(item => !item.featured).map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <ImageWithFallback 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="outline" className="mb-2">
                      {item.category}
                    </Badge>
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{item.title}</h3>
                    <div className="text-xl font-bold text-blue-600 mb-3">{item.price}</div>
                    <div className="space-y-1 text-sm text-slate-600 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {item.date}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Показать еще объявления
          </Button>
        </div>
      </div>
    </div>
  );
}

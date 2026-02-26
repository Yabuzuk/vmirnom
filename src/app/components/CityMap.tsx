import { useState } from 'react';
import { MapPin, Search, Building2, GraduationCap, ShoppingCart, Bus, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface MapLocation {
  id: number;
  name: string;
  category: string;
  address: string;
  icon: React.ReactNode;
}

const locations: MapLocation[] = [
  {
    id: 1,
    name: 'Городская больница',
    category: 'Медицина',
    address: 'ул. Ленина, 25',
    icon: <Heart className="w-4 h-4" />,
  },
  {
    id: 2,
    name: 'Школа №1',
    category: 'Образование',
    address: 'ул. Школьная, 10',
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    id: 3,
    name: 'Торговый центр "Мирный"',
    category: 'Торговля',
    address: 'пр. Мира, 5',
    icon: <ShoppingCart className="w-4 h-4" />,
  },
  {
    id: 4,
    name: 'Администрация города',
    category: 'Госструктуры',
    address: 'пл. Центральная, 1',
    icon: <Building2 className="w-4 h-4" />,
  },
  {
    id: 5,
    name: 'Автовокзал',
    category: 'Транспорт',
    address: 'ул. Вокзальная, 2',
    icon: <Bus className="w-4 h-4" />,
  },
];

const categories = [
  { name: 'Медицина', color: 'bg-red-100 text-red-700' },
  { name: 'Образование', color: 'bg-blue-100 text-blue-700' },
  { name: 'Торговля', color: 'bg-green-100 text-green-700' },
  { name: 'Госструктуры', color: 'bg-purple-100 text-purple-700' },
  { name: 'Транспорт', color: 'bg-orange-100 text-orange-700' },
];

export function CityMap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  const filteredLocations = locations.filter((location) => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || location.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="map" className="bg-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl mb-6 text-gray-900">Карта города</h2>

        {/* Mobile: кнопка открытия карты */}
        <div className="md:hidden mb-4">
          <Button
            onClick={() => setShowMap(!showMap)}
            className="w-full bg-[#2196F3] hover:bg-[#1976D2]"
          >
            <MapPin className="w-5 h-5 mr-2" />
            {showMap ? 'Скрыть карту' : 'Открыть карту'}
          </Button>
        </div>

        {/* Поиск и фильтры */}
        {(showMap || window.innerWidth >= 768) && (
          <>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Поиск по организациям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Фильтры по категориям */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge
                variant={selectedCategory === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                Все
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category.name}
                  variant="outline"
                  className={`cursor-pointer ${
                    selectedCategory === category.name ? category.color : ''
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>

            {/* Макет карты */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Интерактивная карта (макет) */}
              <div className="lg:col-span-2 bg-gray-200 rounded-lg overflow-hidden aspect-[16/10] relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
                  <div className="text-center p-6">
                    <MapPin className="w-16 h-16 text-[#2196F3] mx-auto mb-4" />
                    <p className="text-gray-600">
                      Здесь будет интерактивная карта города
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      с метками организаций и учреждений
                    </p>
                  </div>
                </div>

                {/* Маркеры на карте (декоративные) */}
                <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <ShoppingCart className="w-5 h-5" />
                </div>
              </div>

              {/* Список организаций */}
              <div className="bg-gray-50 rounded-lg p-4 max-h-[500px] overflow-y-auto">
                <h3 className="text-lg mb-4 text-gray-900">Организации</h3>
                <div className="space-y-3">
                  {filteredLocations.map((location) => {
                    const category = categories.find(c => c.name === location.category);
                    return (
                      <div
                        key={location.id}
                        className="bg-white p-3 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-8 h-8 ${category?.color} rounded-full flex items-center justify-center`}>
                            {location.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-gray-900 line-clamp-1">
                              {location.name}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {location.address}
                            </div>
                            <Badge variant="outline" className="text-xs mt-2">
                              {location.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {filteredLocations.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Ничего не найдено
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

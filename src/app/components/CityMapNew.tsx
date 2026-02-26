import { useEffect, useRef, useState } from 'react';
import { MapPin, Search, Building2, GraduationCap, ShoppingCart, Bus, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { businessLocationsAPI } from '../../services/api';

interface MapLocation {
  id: number;
  name: string;
  category: string;
  address: string;
  coordinates: [number, number];
  icon: React.ReactNode;
  isPremium?: boolean;
}

const locations: MapLocation[] = [];

const categoryIcons: any = {
  'Медицина': <Heart className="w-4 h-4" />,
  'Образование': <GraduationCap className="w-4 h-4" />,
  'Торговля': <ShoppingCart className="w-4 h-4" />,
  'Госструктуры': <Building2 className="w-4 h-4" />,
  'Транспорт': <Bus className="w-4 h-4" />,
};

const categories = [
  { name: 'Медицина', color: 'bg-red-100 text-red-700' },
  { name: 'Образование', color: 'bg-blue-100 text-blue-700' },
  { name: 'Торговля', color: 'bg-green-100 text-green-700' },
  { name: 'Госструктуры', color: 'bg-purple-100 text-purple-700' },
  { name: 'Транспорт', color: 'bg-orange-100 text-orange-700' },
];

export function CityMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [locations, setLocations] = useState<MapLocation[]>([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await businessLocationsAPI.getAll();
      const data = response.data.map((loc: any) => ({
        id: loc.id,
        name: loc.name,
        category: loc.category,
        address: loc.address,
        coordinates: [loc.latitude, loc.longitude],
        icon: categoryIcons[loc.category] || <MapPin className="w-4 h-4" />,
        isPremium: loc.plan_type === 'premium',
      }));
      setLocations(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (!mapRef.current || locations.length === 0) return;

    // @ts-ignore
    if (typeof ymaps === 'undefined') {
      console.error('Яндекс.Карты не загружены');
      return;
    }

    // @ts-ignore
    ymaps.ready(() => {
      if (mapInstance) {
        mapInstance.destroy();
      }
      
      // @ts-ignore
      const map = new ymaps.Map(mapRef.current, {
        center: [62.544, 113.956],
        zoom: 13,
        controls: ['zoomControl', 'searchControl', 'typeSelector', 'fullscreenControl'],
      });

      // Добавляем метки
      locations.forEach((location) => {
        // @ts-ignore
        const placemark = new ymaps.Placemark(
          location.coordinates,
          {
            balloonContent: `
              <div style="padding: 15px; min-width: 250px;">
                <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: bold;">${location.name}</h3>
                <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${location.address}</p>
                <div style="margin-bottom: 8px;">
                  <span style="display: inline-block; padding: 4px 12px; background: #2196F3; color: white; border-radius: 4px; font-size: 12px;">${location.category}</span>
                  ${location.isPremium ? '<span style="display: inline-block; margin-left: 4px; padding: 4px 12px; background: #ffd700; color: #000; border-radius: 4px; font-size: 12px; font-weight: bold;">⭐ ПРЕМИУМ</span>' : ''}
                </div>
                <p style="margin: 8px 0 0 0; padding-top: 8px; border-top: 1px solid #eee; font-size: 11px; color: #999;">
                  ${location.isPremium ? 'Премиум размещение' : 'Платное размещение на карте'}
                </p>
              </div>
            `,
          },
          {
            preset: location.isPremium ? 'islands#redStretchyIcon' : 'islands#blueStretchyIcon',
            iconContentLayout: ymaps.templateLayoutFactory.createClass(
              `<div style="color: white; font-weight: bold; padding: 5px;">${location.name}</div>`
            )
          }
        );

        map.geoObjects.add(placemark);
      });

      setMapInstance(map);
    });
  }, [locations]);

  const filteredLocations = locations.filter((location) => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || location.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLocationClick = (location: MapLocation) => {
    if (mapInstance) {
      mapInstance.setCenter(location.coordinates, 15, { duration: 300 });
    }
  };

  return (
    <section id="map" className="bg-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl mb-6 text-gray-900">Карта города</h2>

        {/* Поиск */}
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

        {/* Фильтры */}
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

        {/* Карта и список */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Яндекс.Карта */}
          <div className="lg:col-span-2 rounded-lg overflow-hidden">
            <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
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
                    onClick={() => handleLocationClick(location)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 ${category?.color} rounded-full flex items-center justify-center`}>
                        {location.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900 line-clamp-1 flex items-center gap-2">
                          {location.name}
                          {location.isPremium && <span className="text-xs">⭐</span>}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

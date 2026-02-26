import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { businessLocationsAPI } from '../../services/api';

// Скрываем копирайт
const style = document.createElement('style');
style.textContent = '.leaflet-control-attribution { display: none !important; }';
document.head.appendChild(style);

// Исправляем иконки Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Кастомные иконки
const premiumIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const standardIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapLocation {
  id: number;
  name: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  isPremium: boolean;
  phone?: string;
}

const categories = [
  { name: 'Медицина', color: 'bg-red-100 text-red-700' },
  { name: 'Красота', color: 'bg-pink-100 text-pink-700' },
  { name: 'Образование', color: 'bg-blue-100 text-blue-700' },
  { name: 'Торговля', color: 'bg-green-100 text-green-700' },
  { name: 'Госструктуры', color: 'bg-purple-100 text-purple-700' },
  { name: 'Транспорт', color: 'bg-orange-100 text-orange-700' },
];

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
}

export function CityMap() {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([62.544, 113.956]);

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
        latitude: loc.latitude,
        longitude: loc.longitude,
        isPremium: loc.plan_type === 'premium',
        phone: loc.phone,
      }));
      setLocations(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredLocations = locations.filter((location) => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || location.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLocationClick = (location: MapLocation) => {
    setMapCenter([location.latitude, location.longitude]);
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
          {/* Leaflet карта */}
          <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-lg">
            <MapContainer
              center={[62.544, 113.956]}
              zoom={13}
              style={{ height: '500px', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapController center={mapCenter} />
              {filteredLocations.map((location) => (
                <Marker
                  key={location.id}
                  position={[location.latitude, location.longitude]}
                  icon={location.isPremium ? premiumIcon : standardIcon}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg mb-2">{location.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{location.address}</p>
                      <div className="flex gap-2 mb-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {location.category}
                        </span>
                        {location.isPremium && (
                          <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded font-bold">
                            ⭐ ПРЕМИУМ
                          </span>
                        )}
                      </div>
                      {location.phone && (
                        <p className="text-sm">📞 {location.phone}</p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Список организаций */}
          <div className="bg-gray-50 rounded-lg p-4 max-h-[500px] overflow-y-auto">
            <h3 className="text-lg mb-4 text-gray-900">Организации ({filteredLocations.length})</h3>
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
                        <MapPin className="w-4 h-4" />
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

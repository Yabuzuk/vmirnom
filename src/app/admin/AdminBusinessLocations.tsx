import { useState, useEffect } from 'react';
import { businessLocationsAPI, uploadAPI } from '../../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Plus, Trash2, Edit, MapPin } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export function AdminBusinessLocations() {
  const [locations, setLocations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    name: '',
    description: '',
    category: '',
    address: '',
    latitude: '',
    longitude: '',
    phone: '',
    website: '',
    email: '',
    working_hours: '',
    images: [],
    plan_type: 'free',
  });
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const categories = ['Медицина', 'Красота', 'Образование', 'Торговля', 'Госструктуры', 'Транспорт', 'Развлечения', 'Спорт'];
  const planTypes = [
    { value: 'free', label: 'Бесплатный', price: '0₽' },
    { value: 'standard', label: 'Стандарт', price: '2000₽/мес' },
    { value: 'premium', label: 'Премиум', price: '7000₽/мес' },
  ];

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleAddressChange = async (address: string) => {
    console.log('Address changed:', address);
    setCurrentLocation({ ...currentLocation, address });
    
    if (address.length < 3) {
      setAddressSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    console.log('Trying to get suggestions...');
    
    try {
      // @ts-ignore
      if (typeof ymaps !== 'undefined') {
        // @ts-ignore
        ymaps.ready(() => {
          // @ts-ignore
          const suggestView = new ymaps.SuggestView('address-input', {
            results: 5,
            provider: {
              suggest: (request: string) => {
                // @ts-ignore
                return ymaps.suggest('Мирный, Якутия, ' + request);
              }
            }
          });
          
          suggestView.events.add('select', (e: any) => {
            const selectedItem = e.get('item');
            selectAddress({ value: selectedItem.value });
          });
        });
      }
    } catch (error) {
      console.error('Suggest error:', error);
    }
  };

  const selectAddress = async (suggestion: any) => {
    const fullAddress = suggestion.value;
    setCurrentLocation({ ...currentLocation, address: fullAddress });
    setShowSuggestions(false);
    setIsGeocoding(true);
    
    try {
      // @ts-ignore
      if (typeof ymaps !== 'undefined') {
        // @ts-ignore
        ymaps.ready(() => {
          // @ts-ignore
          const geocoder = ymaps.geocode(fullAddress);
          geocoder.then((result: any) => {
            const firstGeoObject = result.geoObjects.get(0);
            if (firstGeoObject) {
              const coords = firstGeoObject.geometry.getCoordinates();
              setCurrentLocation(prev => ({
                ...prev,
                address: fullAddress,
                latitude: coords[0].toFixed(6),
                longitude: coords[1].toFixed(6),
              }));
              alert('Координаты определены!');
            }
            setIsGeocoding(false);
          });
        });
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      setIsGeocoding(false);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await businessLocationsAPI.getAll();
      setLocations(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentLocation.latitude || !currentLocation.longitude) {
      alert('Координаты не определены! Выберите адрес из подсказок.');
      return;
    }
    
    try {
      const data = {
        ...currentLocation,
        latitude: parseFloat(currentLocation.latitude),
        longitude: parseFloat(currentLocation.longitude),
        is_active: true,
      };
      
      if (currentLocation.id) {
        await businessLocationsAPI.update(currentLocation.id, data);
      } else {
        await businessLocationsAPI.create(data);
      }
      
      alert('Размещение добавлено!');
      fetchLocations();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Удалить размещение?')) {
      try {
        await businessLocationsAPI.delete(id);
        fetchLocations();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleEdit = (item) => {
    setCurrentLocation({
      ...item,
      latitude: item.latitude.toString(),
      longitude: item.longitude.toString(),
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setCurrentLocation({
      name: '',
      description: '',
      category: '',
      address: '',
      latitude: '',
      longitude: '',
      phone: '',
      website: '',
      email: '',
      working_hours: '',
      images: [],
      plan_type: 'free',
    });
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-8">Управление бизнес-размещениями на карте</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl mb-4">{isEditing ? 'Редактировать' : 'Добавить'} размещение</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Название организации"
            value={currentLocation.name}
            onChange={(e) => setCurrentLocation({ ...currentLocation, name: e.target.value })}
            required
          />
          
          <Select
            value={currentLocation.category}
            onValueChange={(value) => setCurrentLocation({ ...currentLocation, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Textarea
          placeholder="Описание"
          value={currentLocation.description}
          onChange={(e) => setCurrentLocation({ ...currentLocation, description: e.target.value })}
          className="mt-4"
        />

        <div className="relative">
          <Input
            id="address-input"
            placeholder="Адрес (начните вводить для подсказок)"
            value={currentLocation.address}
            onChange={(e) => handleAddressChange(e.target.value)}
            className="mt-4"
            required
          />
        </div>
        {isGeocoding && (
          <p className="text-sm text-gray-500 mt-1">Определение координат...</p>
        )}

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            type="number"
            step="0.000001"
            placeholder="Широта (авто)"
            value={currentLocation.latitude}
            className="bg-gray-50"
            readOnly
          />
          <Input
            type="number"
            step="0.000001"
            placeholder="Долгота (авто)"
            value={currentLocation.longitude}
            className="bg-gray-50"
            readOnly
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Input
            placeholder="Телефон"
            value={currentLocation.phone}
            onChange={(e) => setCurrentLocation({ ...currentLocation, phone: e.target.value })}
          />
          <Input
            placeholder="Сайт"
            value={currentLocation.website}
            onChange={(e) => setCurrentLocation({ ...currentLocation, website: e.target.value })}
          />
          <Input
            placeholder="Email"
            type="email"
            value={currentLocation.email}
            onChange={(e) => setCurrentLocation({ ...currentLocation, email: e.target.value })}
          />
        </div>

        <Input
          placeholder="Часы работы (например: Пн-Пт 9:00-18:00)"
          value={currentLocation.working_hours}
          onChange={(e) => setCurrentLocation({ ...currentLocation, working_hours: e.target.value })}
          className="mt-4"
        />

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Тарифный план</label>
          <div className="grid grid-cols-3 gap-4">
            {planTypes.map(plan => (
              <div
                key={plan.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                  currentLocation.plan_type === plan.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setCurrentLocation({ ...currentLocation, plan_type: plan.value })}
              >
                <div className="font-semibold">{plan.label}</div>
                <div className="text-sm text-gray-600">{plan.price}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2 mt-6">
          <Button type="submit">
            <Plus className="w-4 h-4 mr-2" />
            {isEditing ? 'Обновить' : 'Добавить'}
          </Button>
          {isEditing && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Отмена
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {locations.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <Badge variant={item.plan_type === 'premium' ? 'default' : 'outline'}>
                  {planTypes.find(p => p.value === item.plan_type)?.label}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                {item.address}
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{item.category}</Badge>
                {item.phone && <span className="text-xs text-gray-500">📞 {item.phone}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

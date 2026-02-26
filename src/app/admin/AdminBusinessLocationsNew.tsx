import { useState, useEffect, useRef } from 'react';
import { businessLocationsAPI } from '../../services/api';
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
  const [showMapModal, setShowMapModal] = useState(false);
  const mapModalRef = useRef<HTMLDivElement>(null);
  const [tempMap, setTempMap] = useState<any>(null);

  const categories = ['Медицина', 'Красота', 'Образование', 'Торговля', 'Госструктуры', 'Транспорт', 'Развлечения', 'Спорт'];
  const planTypes = [
    { value: 'free', label: 'Бесплатный', price: '0₽' },
    { value: 'standard', label: 'Стандарт', price: '2000₽/мес' },
    { value: 'premium', label: 'Премиум', price: '7000₽/мес' },
  ];

  useEffect(() => {
    fetchLocations();
  }, []);

  const geocodeAddress = async () => {
    if (!currentLocation.address || currentLocation.address.length < 5) {
      alert('Введите адрес');
      return;
    }
    
    setIsGeocoding(true);
    try {
      // @ts-ignore
      if (typeof ymaps !== 'undefined') {
        // @ts-ignore
        ymaps.ready(() => {
          // @ts-ignore
          ymaps.geocode('Мирный, Якутия, ' + currentLocation.address, {
            results: 1
          }).then((result: any) => {
            const firstGeoObject = result.geoObjects.get(0);
            if (firstGeoObject) {
              const coords = firstGeoObject.geometry.getCoordinates();
              setCurrentLocation(prev => ({
                ...prev,
                latitude: coords[0].toFixed(6),
                longitude: coords[1].toFixed(6),
              }));
              alert('Координаты найдены!');
            } else {
              alert('Адрес не найден. Попробуйте уточнить.');
            }
            setIsGeocoding(false);
          });
        });
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Ошибка поиска адреса');
      setIsGeocoding(false);
    }
  };

  const openMapPicker = () => {
    setShowMapModal(true);
    setTimeout(() => {
      if (mapModalRef.current) {
        // @ts-ignore
        ymaps.ready(() => {
          // @ts-ignore
          const map = new ymaps.Map(mapModalRef.current, {
            center: [62.544, 113.956],
            zoom: 13,
            controls: ['zoomControl', 'searchControl'],
          });

          map.events.add('click', (e: any) => {
            const coords = e.get('coords');
            map.geoObjects.removeAll();
            
            // @ts-ignore
            const placemark = new ymaps.Placemark(coords, {}, {
              preset: 'islands#redIcon',
              draggable: true
            });
            
            map.geoObjects.add(placemark);
            
            // @ts-ignore
            ymaps.geocode(coords).then((res: any) => {
              const firstGeoObject = res.geoObjects.get(0);
              const address = firstGeoObject.getAddressLine();
              
              setCurrentLocation(prev => ({
                ...prev,
                address: address,
                latitude: coords[0].toFixed(6),
                longitude: coords[1].toFixed(6),
              }));
            });
          });

          setTempMap(map);
        });
      }
    }, 100);
  };

  const closeMapPicker = () => {
    setShowMapModal(false);
    if (tempMap) {
      tempMap.destroy();
      setTempMap(null);
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
      alert('Нажмите "Найти координаты" для определения местоположения');
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

        <div className="flex gap-2 items-end mt-4">
          <div className="flex-1">
            <Input
              placeholder="Адрес (например: ул. Ленина, 35)"
              value={currentLocation.address}
              onChange={(e) => setCurrentLocation({ ...currentLocation, address: e.target.value })}
              required
            />
          </div>
          <Button
            type="button"
            onClick={geocodeAddress}
            disabled={isGeocoding}
            variant="outline"
          >
            {isGeocoding ? 'Поиск...' : 'Найти'}
          </Button>
          <Button
            type="button"
            onClick={openMapPicker}
            variant="default"
          >
            Выбрать на карте
          </Button>
        </div>

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

      {/* Модальное окно с картой */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] h-[80%] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Выберите место на карте</h3>
              <Button onClick={closeMapPicker} variant="outline">Закрыть</Button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Кликните на карте чтобы выбрать местоположение</p>
            <div ref={mapModalRef} className="flex-1 rounded-lg overflow-hidden" />
          </div>
        </div>
      )}
    </div>
  );
}

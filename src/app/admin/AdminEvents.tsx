import { useState, useEffect } from 'react';
import { eventsAPI, uploadAPI } from '../../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Plus, Trash2, Edit } from 'lucide-react';

export function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    image: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll();
      setEvents(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: currentEvent.title,
        description: currentEvent.description,
        event_date: currentEvent.event_date,
        location: currentEvent.location || null,
        image: currentEvent.image || null,
      };
      
      if (currentEvent.id) {
        await eventsAPI.update(currentEvent.id, data);
      } else {
        await eventsAPI.create(data);
      }
      
      alert('Событие добавлено!');
      fetchEvents();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Удалить событие?')) {
      try {
        await eventsAPI.delete(id);
        fetchEvents();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleEdit = (item) => {
    setCurrentEvent({
      ...item,
      event_date: item.event_date ? new Date(item.event_date).toISOString().slice(0, 16) : '',
    });
    setIsEditing(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const response = await uploadAPI.uploadImage(file);
        const imageUrl = `http://localhost:5000${response.data.url}`;
        setCurrentEvent({ ...currentEvent, image: imageUrl });
        alert('Изображение загружено!');
      } catch (error) {
        console.error('Error:', error);
        alert('Ошибка загрузки: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setCurrentEvent({ title: '', description: '', event_date: '', location: '', image: '' });
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-8">Управление событиями</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl mb-4">{isEditing ? 'Редактировать' : 'Добавить'} событие</h2>
        
        <Input
          placeholder="Название события"
          value={currentEvent.title}
          onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
          className="mb-4"
          required
        />
        
        <Textarea
          placeholder="Описание"
          value={currentEvent.description}
          onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
          className="mb-4"
          required
        />
        
        <Input
          type="datetime-local"
          value={currentEvent.event_date}
          onChange={(e) => setCurrentEvent({ ...currentEvent, event_date: e.target.value })}
          className="mb-4"
          required
        />
        
        <Input
          placeholder="Место проведения"
          value={currentEvent.location}
          onChange={(e) => setCurrentEvent({ ...currentEvent, location: e.target.value })}
          className="mb-4"
        />
        
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4"
        />
        
        <Input
          placeholder="Или вставьте URL изображения"
          value={currentEvent.image}
          onChange={(e) => setCurrentEvent({ ...currentEvent, image: e.target.value })}
          className="mb-4"
        />
        
        {currentEvent.image && (
          <img src={currentEvent.image} alt="Preview" className="w-32 h-32 object-cover mb-4" />
        )}
        
        <div className="flex gap-2">
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
        {events.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                📅 {new Date(item.event_date).toLocaleString('ru-RU')}
              </p>
              {item.location && (
                <p className="text-sm text-gray-500">📍 {item.location}</p>
              )}
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

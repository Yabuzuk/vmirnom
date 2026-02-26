import { useState, useEffect } from 'react';
import { classifiedsAPI, uploadAPI } from '../../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Plus, Trash2, Edit } from 'lucide-react';

export function AdminClassifieds() {
  const [classifieds, setClassifieds] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentClassified, setCurrentClassified] = useState({
    title: '',
    description: '',
    category: '',
    contact_info: '',
    price: '',
    image: '',
    expires_at: '',
  });

  useEffect(() => {
    fetchClassifieds();
  }, []);

  const fetchClassifieds = async () => {
    try {
      const response = await classifiedsAPI.getAll();
      setClassifieds(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: currentClassified.title,
        description: currentClassified.description,
        category: currentClassified.category || null,
        contact_info: currentClassified.contact_info || null,
        price: currentClassified.price ? parseFloat(currentClassified.price) : null,
        image: currentClassified.image || null,
        expires_at: currentClassified.expires_at || null,
      };
      
      if (currentClassified.id) {
        await classifiedsAPI.update(currentClassified.id, data);
      } else {
        await classifiedsAPI.create(data);
      }
      
      alert('Объявление добавлено!');
      fetchClassifieds();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Удалить объявление?')) {
      try {
        await classifiedsAPI.delete(id);
        fetchClassifieds();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleEdit = (item) => {
    setCurrentClassified({
      ...item,
      price: item.price || '',
      expires_at: item.expires_at ? new Date(item.expires_at).toISOString().slice(0, 16) : '',
    });
    setIsEditing(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const response = await uploadAPI.uploadImage(file);
        const imageUrl = `http://localhost:5000${response.data.url}`;
        setCurrentClassified({ ...currentClassified, image: imageUrl });
        alert('Изображение загружено!');
      } catch (error) {
        console.error('Error:', error);
        alert('Ошибка загрузки: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setCurrentClassified({ title: '', description: '', category: '', contact_info: '', price: '', image: '', expires_at: '' });
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-8">Управление объявлениями</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl mb-4">{isEditing ? 'Редактировать' : 'Добавить'} объявление</h2>
        
        <Input
          placeholder="Заголовок"
          value={currentClassified.title}
          onChange={(e) => setCurrentClassified({ ...currentClassified, title: e.target.value })}
          className="mb-4"
          required
        />
        
        <Textarea
          placeholder="Описание"
          value={currentClassified.description}
          onChange={(e) => setCurrentClassified({ ...currentClassified, description: e.target.value })}
          className="mb-4"
          required
        />
        
        <Input
          placeholder="Категория"
          value={currentClassified.category}
          onChange={(e) => setCurrentClassified({ ...currentClassified, category: e.target.value })}
          className="mb-4"
        />
        
        <Input
          placeholder="Контактная информация"
          value={currentClassified.contact_info}
          onChange={(e) => setCurrentClassified({ ...currentClassified, contact_info: e.target.value })}
          className="mb-4"
        />
        
        <Input
          type="number"
          placeholder="Цена"
          value={currentClassified.price}
          onChange={(e) => setCurrentClassified({ ...currentClassified, price: e.target.value })}
          className="mb-4"
        />
        
        <Input
          type="datetime-local"
          placeholder="Срок действия"
          value={currentClassified.expires_at}
          onChange={(e) => setCurrentClassified({ ...currentClassified, expires_at: e.target.value })}
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
          value={currentClassified.image}
          onChange={(e) => setCurrentClassified({ ...currentClassified, image: e.target.value })}
          className="mb-4"
        />
        
        {currentClassified.image && (
          <img src={currentClassified.image} alt="Preview" className="w-32 h-32 object-cover mb-4" />
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
        {classifieds.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              {item.price && (
                <p className="text-lg font-bold text-green-600 mt-2">{item.price} ₽</p>
              )}
              {item.contact_info && (
                <p className="text-sm text-gray-500 mt-1">📞 {item.contact_info}</p>
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

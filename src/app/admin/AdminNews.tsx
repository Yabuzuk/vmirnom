import { useState, useEffect } from 'react';
import { newsAPI, uploadAPI } from '../../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Plus, Trash2, Edit } from 'lucide-react';

export function AdminNews() {
  const [news, setNews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState({
    title: '',
    description: '',
    tags: '',
    image: '',
    category: '',
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await newsAPI.getAll();
      setNews(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', currentNews);
    try {
      const data = {
        title: currentNews.title,
        description: currentNews.description,
        tags: currentNews.tags ? currentNews.tags.split(',').map(t => t.trim()) : [],
        image: currentNews.image || null,
        category: currentNews.category || null,
      };
      
      console.log('Data to send:', data);
      
      if (currentNews.id) {
        await newsAPI.update(currentNews.id, data);
      } else {
        await newsAPI.create(data);
      }
      
      alert('Новость добавлена!');
      fetchNews();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Удалить новость?')) {
      try {
        await newsAPI.delete(id);
        fetchNews();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleEdit = (item) => {
    setCurrentNews({
      ...item,
      tags: item.tags.join(', '),
    });
    setIsEditing(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        console.log('Uploading file:', file.name);
        const response = await uploadAPI.uploadImage(file);
        console.log('Upload response:', response.data);
        const imageUrl = `http://localhost:5000${response.data.url}`;
        setCurrentNews({ ...currentNews, image: imageUrl });
        alert('Изображение загружено!');
      } catch (error) {
        console.error('Error:', error);
        alert('Ошибка загрузки: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setCurrentNews({ title: '', description: '', tags: '', image: '', category: '' });
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-8">Управление новостями</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl mb-4">{isEditing ? 'Редактировать' : 'Добавить'} новость</h2>
        
        <Input
          placeholder="Заголовок"
          value={currentNews.title}
          onChange={(e) => setCurrentNews({ ...currentNews, title: e.target.value })}
          className="mb-4"
          required
        />
        
        <Textarea
          placeholder="Описание"
          value={currentNews.description}
          onChange={(e) => setCurrentNews({ ...currentNews, description: e.target.value })}
          className="mb-4"
          required
        />
        
        <Input
          placeholder="Категория"
          value={currentNews.category}
          onChange={(e) => setCurrentNews({ ...currentNews, category: e.target.value })}
          className="mb-4"
        />
        
        <Input
          placeholder="Теги (через запятую)"
          value={currentNews.tags}
          onChange={(e) => setCurrentNews({ ...currentNews, tags: e.target.value })}
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
          value={currentNews.image}
          onChange={(e) => setCurrentNews({ ...currentNews, image: e.target.value })}
          className="mb-4"
        />
        
        {currentNews.image && (
          <img src={currentNews.image} alt="Preview" className="w-32 h-32 object-cover mb-4" />
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
        {news.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <div className="flex gap-2 mt-2">
                {item.tags?.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-200 px-2 py-1 rounded">{tag}</span>
                ))}
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

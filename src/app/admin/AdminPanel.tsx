import { useState } from 'react';
import { AdminNews } from './AdminNews';
import { AdminEvents } from './AdminEvents';
import { AdminClassifieds } from './AdminClassifieds';
import { AdminBusinessLocations } from './AdminBusinessLocationsNew';
import { Button } from '../components/ui/button';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('news');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Админ-панель портала Мирный</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === 'news' ? 'default' : 'outline'}
            onClick={() => setActiveTab('news')}
          >
            Новости
          </Button>
          <Button
            variant={activeTab === 'events' ? 'default' : 'outline'}
            onClick={() => setActiveTab('events')}
          >
            События
          </Button>
          <Button
            variant={activeTab === 'classifieds' ? 'default' : 'outline'}
            onClick={() => setActiveTab('classifieds')}
          >
            Объявления
          </Button>
          <Button
            variant={activeTab === 'business' ? 'default' : 'outline'}
            onClick={() => setActiveTab('business')}
          >
            Бизнес на карте
          </Button>
        </div>

        {activeTab === 'news' && <AdminNews />}
        {activeTab === 'events' && <AdminEvents />}
        {activeTab === 'classifieds' && <AdminClassifieds />}
        {activeTab === 'business' && <AdminBusinessLocations />}
      </div>
    </div>
  );
}

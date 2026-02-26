import { useState } from 'react';
import { Menu, Search, User, X } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuItems = [
    { label: 'Новости', href: '#news' },
    { label: 'Объявления', href: '#classifieds' },
    { label: 'Афиша', href: '#events' },
    { label: 'Справочник', href: '#directory' },
    { label: 'Карта', href: '#map' },
    { label: 'Контакты', href: '#contacts' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-[72px] items-center justify-between">
          {/* Логотип */}
          <div className="flex items-center">
            <div className="text-[#0A3A66] text-2xl">
              <span className="font-bold">Мирный</span>
              <span className="text-[#2196F3]"> Онлайн</span>
            </div>
          </div>

          {/* Главное меню - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-[#2196F3] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-3">
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Поиск"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            {!isLoggedIn ? (
              <Button
                className="bg-[#2196F3] hover:bg-[#1976D2] hidden sm:flex"
                onClick={() => setIsLoggedIn(true)}
              >
                Войти
              </Button>
            ) : (
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Профиль"
              >
                <User className="w-5 h-5 text-gray-700" />
              </button>
            )}

            {/* Мобильное меню */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Меню"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-3 text-gray-700 hover:text-[#2196F3] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {!isLoggedIn && (
              <Button
                className="w-full mt-3 bg-[#2196F3] hover:bg-[#1976D2]"
                onClick={() => {
                  setIsLoggedIn(true);
                  setIsMenuOpen(false);
                }}
              >
                Войти
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

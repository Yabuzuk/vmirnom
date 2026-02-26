import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { label: 'О проекте', href: '#about' },
      { label: 'Команда', href: '#team' },
      { label: 'Вакансии', href: '#jobs' },
    ],
    services: [
      { label: 'Реклама', href: '#advertising' },
      { label: 'Размещение объявлений', href: '#classifieds' },
      { label: 'Партнерам', href: '#partners' },
    ],
    contacts: [
      { label: 'Контакты', href: '#contacts' },
      { label: 'Обратная связь', href: '#feedback' },
      { label: 'Техподдержка', href: '#support' },
    ],
    legal: [
      { label: 'Политика конфиденциальности', href: '#privacy' },
      { label: 'Пользовательское соглашение', href: '#terms' },
      { label: 'Правила публикации', href: '#rules' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-[#0A3A66] text-white">
      <div className="container mx-auto px-4 py-10">
        {/* Основные колонки */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* О проекте */}
          <div>
            <h3 className="text-lg mb-4">О проекте</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Услуги */}
          <div>
            <h3 className="text-lg mb-4">Услуги</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg mb-4">Контакты</h3>
            <ul className="space-y-2">
              {footerLinks.contacts.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Правовая информация */}
          <div>
            <h3 className="text-lg mb-4">Правовая информация</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-white/20 my-8"></div>

        {/* Нижняя часть */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Копирайт */}
          <div className="text-gray-300 text-sm">
            © {currentYear} Мирный Онлайн. Все права защищены.
          </div>

          {/* Социальные сети */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

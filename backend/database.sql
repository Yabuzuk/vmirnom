-- Создание базы данных
-- DROP DATABASE IF EXISTS vmirno_portal;
-- CREATE DATABASE vmirno_portal
--   WITH ENCODING 'UTF8'
--   LC_COLLATE = 'Russian_Russia.1251'
--   LC_CTYPE = 'Russian_Russia.1251'
--   TEMPLATE template0;

-- Подключаемся к базе
-- \c vmirno_portal;

-- Таблица новостей
CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[],
  image VARCHAR(500),
  category VARCHAR(100),
  ai_summary TEXT,
  ai_processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица событий
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP NOT NULL,
  location VARCHAR(255),
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица объявлений
CREATE TABLE classifieds (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100),
  contact_info VARCHAR(255),
  price DECIMAL(10, 2),
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Таблица бизнес-размещений на карте
CREATE TABLE business_locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  phone VARCHAR(50),
  website VARCHAR(255),
  email VARCHAR(255),
  working_hours TEXT,
  images TEXT[],
  plan_type VARCHAR(50) DEFAULT 'free',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Вставка тестовых данных
INSERT INTO news (title, description, tags, image, category, ai_summary, ai_processed) VALUES
('Городской парк готовится к летнему сезону', 'В парке культуры и отдыха начались работы по благоустройству. Будут установлены новые скамейки, детские площадки и фонтан.', ARRAY['Благоустройство', 'Парки'], 'https://images.unsplash.com/photo-1684937992702-731308f498ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXNzaWFuJTIwY2l0eSUyMHBhcmt8ZW58MXx8fHwxNzcxOTE1MjU1fDA&ixlib=rb-4.1.0&q=80&w=1080', 'Городская жизнь', 'Городской парк начинает обновление инфраструктуры: новые скамейки, детские площадки и фонтан появятся к летнему сезону.', TRUE),
('Открытие выставки современного искусства', 'В городском музее открывается выставка работ местных художников. Экспозиция будет доступна для посетителей в течение месяца.', ARRAY['Культура', 'Выставки'], 'https://images.unsplash.com/photo-1569342380852-035f42d9ca41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9uJTIwZ2FsbGVyeXxlbnwxfHx8fDE3NzE5MTUyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080', 'Культура', 'Музей представляет работы местных художников на новой выставке современного искусства, доступной для посещения целый месяц.', TRUE);

INSERT INTO events (title, description, event_date, location, image) VALUES
('Летний кинофестиваль', 'Показ лучших фильмов под открытым небом', '2026-07-15 19:00:00', 'Центральный парк', 'https://images.unsplash.com/photo-1620935189009-a820429b03d4'),
('Концерт городского оркестра', 'Классическая музыка в исполнении местных музыкантов', '2026-06-20 18:00:00', 'Дом культуры', 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4');

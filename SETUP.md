# Портал города Мирный

## Структура проекта

```
vmirnomonline/
├── backend/          # Backend API (Node.js + Express + PostgreSQL)
├── src/             # Frontend (React + Vite)
│   ├── app/
│   │   ├── admin/   # Админ-панель
│   │   └── components/
│   └── services/    # API клиент
```

## Установка и запуск

### 1. Установка PostgreSQL

Скачайте и установите PostgreSQL с официального сайта.

### 2. Создание базы данных

```bash
# Войдите в PostgreSQL
psql -U postgres

# Выполните SQL скрипт
\i backend/database.sql
```

### 3. Настройка Backend

```bash
cd backend

# Отредактируйте .env файл с вашими данными БД
# DB_PASSWORD=ваш_пароль

# Запустите сервер
npm run dev
```

Backend запустится на `http://localhost:5000`

### 4. Запуск Frontend

```bash
# В корневой папке проекта
npm run dev
```

Frontend запустится на `http://localhost:5173`

## Доступ

- **Главная страница**: http://localhost:5173
- **Админ-панель**: http://localhost:5173/admin

## API Endpoints

- `GET /api/news` - Все новости
- `POST /api/news` - Создать новость
- `PUT /api/news/:id` - Обновить новость
- `DELETE /api/news/:id` - Удалить новость
- `GET /api/events` - Все события
- `GET /api/classifieds` - Все объявления
- `POST /api/upload` - Загрузить изображение

## Следующие шаги

После сборки сервера:
1. Перенести проект на сервер
2. Настроить Nginx
3. Подключить домен
4. Интегрировать локальную ИИ через VPN (Tailscale/WireGuard)

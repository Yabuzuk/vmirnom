# Backend API для портала Мирный

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Установите PostgreSQL (если не установлен)

3. Создайте базу данных:
```bash
psql -U postgres -f database.sql
```

4. Настройте `.env` файл с вашими данными

5. Запустите сервер:
```bash
npm run dev
```

## API Endpoints

### Новости
- `GET /api/news` - Получить все новости
- `GET /api/news/:id` - Получить новость по ID
- `POST /api/news` - Создать новость
- `PUT /api/news/:id` - Обновить новость
- `DELETE /api/news/:id` - Удалить новость

### События
- `GET /api/events` - Получить все события
- `POST /api/events` - Создать событие
- `PUT /api/events/:id` - Обновить событие
- `DELETE /api/events/:id` - Удалить событие

### Объявления
- `GET /api/classifieds` - Получить все объявления
- `POST /api/classifieds` - Создать объявление
- `PUT /api/classifieds/:id` - Обновить объявление
- `DELETE /api/classifieds/:id` - Удалить объявление

### Загрузка изображений
- `POST /api/upload` - Загрузить изображение

## Структура проекта
```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── upload.js
│   ├── controllers/
│   │   ├── newsController.js
│   │   ├── eventsController.js
│   │   └── classifiedsController.js
│   ├── routes/
│   │   ├── news.js
│   │   ├── events.js
│   │   ├── classifieds.js
│   │   └── upload.js
│   └── server.js
├── uploads/
├── .env
└── database.sql
```

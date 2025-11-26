# 🌟 Social Network Backend API

<div align="center">

![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey?style=for-the-badge&logo=express)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-blue?style=for-the-badge&logo=jsonwebtokens)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)

_Мощный бэкенд для социальной сети с Express.js, аутентификацией и медиа-функционалом_

</div>

## 📋 Оглавление

- [🚀 Быстрый старт](#-быстрый-старт)
- [🐳 Запуск с Docker](#-запуск-с-docker)
- [💻 Локальная разработка](#-локальная-разработка)
- [🛠 Доступные команды](#-доступные-команды)
- [📡 API Эндпоинты](#-api-эндпоинты)
- [🔐 Аутентификация](#-аутентификация)
- [🧪 Тестирование](#-тестирование)

## 🚀 Быстрый старт

### Предварительные требования

| Инструмент  | Версия | Назначение                 |
| ----------- | ------ | -------------------------- |
| **Docker**  | 20.10+ | 🐳 Основной способ запуска |
| **Node.js** | 18+    | 💻 Локальная разработка    |
| **MongoDB** | 6.0+   | 🗄 Основная база данных    |

## 🐳 Запуск с Docker

### Development окружение 🛠

```bash
# Запуск development окружения
npm run docker:dev

# Запуск с пересборкой
npm run docker:dev:build

# Просмотр логов в реальном времени
npm run docker:dev:logs

# Остановка сервисов
npm run docker:dev:down

# Полная очистка (с удалением volumes)
npm run docker:dev:clean
```

### Production окружение 🚀

```bash
# Запуск production окружения
npm run docker:prod

# Запуск с пересборкой
npm run docker:prod:build

# Просмотр логов
npm run docker:prod:logs

# Остановка сервисов
npm run docker:prod:down

# Полная очистка
npm run docker:prod:clean
```

## 💻 Локальная разработка

### 1. Установка зависимостей

```bash
npm install --force
```

### 2. Настройка окружения

```bash
# Копируем примеры файлов окружения
cp .env.example .env
cp .env.example .env.development
cp .env.example .env.production

# Редактируем файлы под ваше окружение
```

### 3. Запуск базы данных

```bash
# Запуск MongoDB
docker run -d -p 27017:27017 --name mongodb-dev mongo:6

# Запуск Redis (опционально)
docker run -d -p 6379:6379 --name redis-dev redis:7-alpine
```

### 4. Запуск приложения

```bash
# Development режим с hot-reload
npm run dev

# Production сборка
npm run build && npm start
```

## 🛠 Доступные команды

### Docker команды 🐳

| Команда                     | Назначение            |
| --------------------------- | --------------------- |
| `npm run docker:dev`        | Запуск dev окружения  |
| `npm run docker:prod`       | Запуск prod окружения |
| `npm run docker:dev:build`  | Пересборка dev        |
| `npm run docker:prod:build` | Пересборка prod       |

### Команды разработки 🔧

| Команда            | Назначение             |
| ------------------ | ---------------------- |
| `npm run dev`      | Запуск в dev режиме    |
| `npm run start`    | Запуск production      |
| `npm run build`    | Сборка проекта         |
| `npm run lint`     | Проверка кода ESLint   |
| `npm run lint:fix` | Автоисправление ESLint |

### Примеры запросов

```bash
# Регистрация пользователя
curl -X POST "http://localhost:3001/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Создание поста
curl -X POST "http://localhost:3001/api/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "content": "Это мой первый пост в социальной сети! 🎉",
    "media": ["image1.jpg", "image2.jpg"]
  }'
```

## 🔐 Аутентификация

Система использует JWT токены для аутентификации:

- **Access Token**: Короткоживущий токен (15 минут)
- **Refresh Token**: Долгоживущий токен (30 дней)

### Заголовки запросов

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

## 🏗 Архитектура проекта

```
backend/
├── ⚙️ config/              # Конфигурация приложения
│   ├── swagger/           # Документация API
│   │   ├── auth.swagger.js
│   │   └── index.js
│   ├── db.js              # Конфигурация базы данных
│   └── jwt.js             # Настройки JWT
│
├── 🎮 controllers/         # Обработчики запросов
│   └── auth.controller.js # Контроллер аутентификации
│
├── ⚙️ middlewares/         # Промежуточное ПО
│   ├── auth.js            # Проверка аутентификации
│   └── me.js              # Получение текущего пользователя
│
├── 🗃 models/              # Модели данных MongoDB
│   ├── User.js            # Пользователи
│   ├── Post.js            # Посты
│   ├── Content.js         # Контент
│   ├── Chat.js            # Чаты
│   ├── Message.js         # Сообщения
│   ├── Comment.js         # Комментарии
│   ├── Like.js            # Лайки
│   └── Favorite.js        # Избранное
│
├── 🛣 routes/              # Маршруты API
│   └── auth.routes.js     # Маршруты аутентификации
│
├── 🛠 services/            # Бизнес-логика
│   └── auth.service.js    # Сервис аутентификации
│
├── 🧪 tests/               # Тесты
│   ├── authHelper.js      # Хелперы для тестов
│   ├── get_user.test.js   # Тесты получения пользователя
│   ├── login.test.js      # Тесты входа
│   ├── me.test.js         # Тесты текущего пользователя
│   ├── register.test.js   # Тесты регистрации
│   └── utils/
│       └── generateUser.js # Генерация тестовых пользователей
│
├── 🔧 utils/               # Вспомогательные функции
├── ⚡ .github/
│   └── workflows/
│       └── node.js.yml    # CI/CD пайплайн
│
├── 🐳 docker-compose.yml   # Docker конфигурация
├── 📝 package.json         # Зависимости и скрипты
└── 🚀 app.js               # Точка входа приложения
```

## 🔧 Конфигурация

### Основные переменные окружения

```env
# Сервер
NODE_ENV=development
PORT=3001
HOST=0.0.0.0

# База данных
MONGODB_URI=mongodb://localhost:27017/social_network
DB_NAME=social_network

# JWT
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Файловый сервис
FILE_SERVICE_URL=http://localhost:8080
UPLOAD_LIMIT=10mb

# CORS
CLIENT_URL=http://localhost:3000
```

## 🧪 Тестирование

```bash
# Запуск unit тестов
npm run test

```

## 📊 Мониторинг

---

<div align="center">

**⭐ Не забудьте поставить звездочку репозиторию!**

**🐛 Нашли баг? [Создайте issue](issues)**

</div>

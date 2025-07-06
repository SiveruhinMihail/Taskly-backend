# Taskly Backend - Руководство по установке с Docker

## Сервер
```
http://localhost:3000/docs
```

## Требования
- Установленный Docker
- Установленный Docker Compose
- Базовые знания работы с терминалом

## Быстрый старт

### 1. Инициализация окружения
```bash
cp .env.example .env
```

**Важно:** После создания файла `.env` необходимо отредактировать:
- Данные для подключения к MongoDB
- Секретный ключ JWT
- Порт приложения
- URL для подключения к MongoDB

### 2. Запуск сервисов
```bash
docker-compose up -d --build
```

### 3. Проверка статуса сервисов
```bash
docker-compose ps
```

### 4. Остановка всех сервисов
```bash
docker-compose down -v
```

## Управление сервисами

### Просмотр логов
```bash
docker-compose logs -f
```

### Пересборка контейнеров
```bash
docker-compose up -d --build --force-recreate
```

### Полная остановка и удаление
```bash
docker-compose down -v --rmi all
```
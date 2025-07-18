# Сервер

## app

```bash
http://localhost:<POST>
```

## swagger

```bash
http://localhost:<POST>/docs
```

# ESLint

```bash
npm i --force
```

```bash
npx eslint .
```

# Руководство по установке с Docker

## Требования

- Установленный Docker Desktop
- Открытый Docker Desktop

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

**Первый раз**

```bash
docker-compose up -d --build
```

**Во время работы**

```bash
docker-compose up -d
```

### 3. Остановка всех сервисов

**Во время работы**

```bash
docker-compose down
```

**Стереть данные**

```bash
docker-compose down -v
```

### 4. Пересборка контейнера

```bash
docker-compose up -d --build --force-recreate
```

## Управление сервисами

### Проверка данных в бд

#### Открыть сервис бд (данные взяты из `.env`)

```bash
docker exec -it mongodb mongosh -u <username> -p <password> --authenticationDatabase admin
```

#### Использовать бд

```bash
use taskly
```

#### посмотреть все коллекции бд

```bash
show collections
```

#### посмотреть содержимое коллекции

```
db.<collection>.find()
```

#### Удалить содержимое коллекции

```
db.<collection>.deleteMany({})
```

### отправка тестовых данных

#### с помощью jest

```bash
npm test
```

#### с помощью CURL

```bash
curl -X "POST" "http://localhost:<PORT>/api/auth/register" -H "accept: application/json" -H "Content-Type: application/json" -d '{
  "name": "Weah MeahoBe",
  "email": "userr@example.com",
  "password": "Password123!", "use":"1234"
}'
```

# Локальный запуск серверов

## Установка комонентов

```bash
npm i --force
```

## Запуск бд

### создать в корне папку data/db/

### зайти в mongoDB Compass

### export connections в data/db/

### Меняем путь в config/db на mongodb://localhost:27017?authSource=admin

## Запуск проекта

```bash
npm run dev
```

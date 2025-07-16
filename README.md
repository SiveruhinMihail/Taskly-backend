# Сервер
```bash
http://localhost:3000/docs
```
# ESLint

```bash
npx eslint .
```
# Руководство по установке с Docker

## Требования

- Установленный Docker
- Установленный Docker Compose

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

**Первый раз**
```bash
docker-compose down -v
```
**Во время работы**
```bash
docker-compose down
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

### отправка тестовых данных

#### с помощью CURL
```bash
curl -X 'POST'   'http://localhost:<POST>/api/auth/register'   -H 'accept: application/json'   -H 'Content-Type: application/json'   -d '{
  "name": "Иван Иванов",
  "email": "user@example.com",
  "password": "Password123!", 
  "use":"123"
}'
```
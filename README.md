# MathSolve

**MathSolve** — образовательная платформа для решения задач по математике, физике и информатике с автоматической проверкой и подробными решениями.  
Проект состоит из фронтенда на Next.js и бэкенда на Go (Gin + GORM).

---

## 🚀 Возможности

- Регистрация и авторизация пользователей
- Решение задач по математике, физике, информатике
- Автоматическая проверка ответов
- Просмотр подробных решений
- Админ-панель для добавления задач
- Адаптивный дизайн
- JWT-аутентификация (access/refresh токены)
- Защита API и ролевая модель (админ/пользователь)

---

## 📦 Структура репозитория

```
backend/    # Go backend (Gin, GORM, PostgreSQL)
frontend/   # Next.js frontend (React, TailwindCSS)
nginx/      # Конфигурация nginx для продакшена
```

---

## ⚙️ Быстрый старт

### 1. Клонирование репозитория

```bash
git clone https://github.com/yourusername/MathSolve.git
cd MathSolve
```

### 2. Запуск backend

```bash
cd backend
Настроить env
go mod tidy
go run ./cmd/app/main.go
```

- По умолчанию backend стартует на `:8080` (или `:8081` — проверьте в main.go)
- Требуется PostgreSQL (укажите DSN в .env)

### 3. Запуск frontend

```bash
cd frontend/math-solve
npm install
npm run dev
```

- Фронтенд доступен на [http://localhost:3000](http://localhost:3000)

### 4. (Опционально) nginx

- Используйте конфиг из папки nginx для проксирования запросов и HTTPS.

## 🧩 Стек технологий

- **Frontend:** Next.js, React, TailwindCSS, Shadcn UI
- **Backend:** Go, Gin, GORM, PostgreSQL, JWT
- **DevOps:** nginx, Docker (опционально)

---

## 🛡️ Безопасность

- Refresh токен хранится только в httpOnly cookie
- Access токен — в localStorage
- Защита приватных роутов и API через middleware
- Валидация данных на сервере и клиенте

---

## 🗂️ Структура каталогов

### Backend

- `cmd/app/` — точка входа, main.go
- `internal/models/` — модели данных
- `internal/repository/` — работа с БД
- `internal/delivery/http/v1/` — HTTP-обработчики
- `internal/middleware/` — middleware (JWT, CORS и др.)

### Frontend

- `src/app/` — страницы и роуты Next.js
- `components/` — UI-компоненты
- `src/features/api/` — работа с API

---

## 📝 Лицензия

MIT License

---

## 🤝 Контакты и вклад

- Pull requests и issues приветствуются!
- Для связи: [your-email@example.com](mailto:your-email@example.com)

---

## 🌐 Демонстрация

- [https://math-solve.ru](https://math-solve.ru)

---

**MathSolve — не тратьте время на поиск задач! Решайте, учитесь, побеждайте!**

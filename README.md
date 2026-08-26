# Foodies

Командний фінальний проєкт курсу **React + Node.js**: застосунок рецептів за макетом [Foodies](https://www.figma.com/design/TKl7kDNvwtz62RsuWNnQ5E/Foodies).

| | |
| --- | --- |
| **Live (GitHub Pages)** | https://lilianalukash.github.io/Foodies/ |
| **API (Render)** | https://foodies-backend-bklu.onrender.com/api |
| **Swagger** | https://foodies-backend-bklu.onrender.com/api-docs/ |
| **Frontend** | цей репозиторій → [`frontend/`](./frontend) |
| **Backend** | [blavikensbutcher/foodies_backend](https://github.com/blavikensbutcher/foodies_backend) |
| **Figma** | [Foodies design](https://www.figma.com/design/TKl7kDNvwtz62RsuWNnQ5E/Foodies) |

## Мета проєкту

- Реалізувати фінальний продукт з блоків **React** і **Node.js** у заданий термін
- Попрактикувати командну роботу, Git (гілки, merge, конфлікти), планування задач і Trello
- Підготувати й презентувати робочий продукт з деплоєм FE + BE

## Реалізований функціонал

### Frontend

| Блок ТЗ | Що зроблено |
| --- | --- |
| FE-1 | Базова структура, спільні компоненти, lazy routes, `pages` / `components` / `redux` |
| FE-2 | Header, Footer, навігація, Logo, AuthBar / UserBar |
| FE-3 | SignUp / SignIn / LogOut (Modal, Formik + Yup, toast, JWT) |
| FE-4 | Home: Hero, Categories, Recipes, фільтри, пагінація |
| FE-5 | Сторінка рецепта (інфо, інгредієнти, preparation, popular) |
| FE-6 | Створення рецепта (FormData, фото, інгредієнти) |
| FE-6.1 | Редагування та видалення власного рецепта |
| FE-7 | Профіль користувача (статистика, таби) |
| FE-8 | Власні рецепти та favorites |
| FE-9 | Followers / following, follow / unfollow |
| FE-10 | Testimonials (Swiper) та фінальне UI-доопрацювання |

### Backend

| Блок ТЗ | Що зроблено |
| --- | --- |
| BE-1 | Express + TypeScript, Postgres (Prisma), CORS, error handler, Swagger |
| BE-2 | Auth: register / login / logout / refresh, JWT middleware |
| BE-3 | Categories, areas, ingredients, testimonials |
| BE-4 | Пошук / фільтрація рецептів + пагінація |
| BE-5 | Деталі рецепта, popular (за кількістю favorites) |
| BE-6 | Створення / видалення / own recipes (+ edit) |
| BE-7 | Favorites add / remove / list |
| BE-8 | Профіль поточного та іншого користувача, avatar |
| BE-9 | Followers / following, follow / unfollow |

Деталі ендпоінтів і компонентів — у README фронту та бекенду.

## Критерії допуску (чекліст)

| Критерій | Статус |
| --- | --- |
| Семантична верстка, 3 брейкпоінти (mobile / tablet / desktop), відповідність макету | ✅ |
| `modern-normalize` | ✅ |
| Підключені шрифти (Mulish) | ✅ |
| Оптимізовані статичні зображення / retina | ✅ |
| Favicon | ✅ |
| PageSpeed ≥ 70% по кожному показнику | перевірити на [pagespeed.web.dev](https://pagespeed.web.dev/) для live URL |
| Немає помилок і `console.log` у проді | ✅ (lint / code review) |
| Імена файлів: латиниця, без пробілів і зайвих Caps у шляхах | ✅ |
| Naming: camelCase / PascalCase / UPPER_SNAKE_CASE | ✅ |
| Сторінки в `pages/`, компоненти в `components/`, Redux у `redux/` | ✅ |
| Routes через **lazy load** | ✅ |
| Секрети в `.env`, шаблон для клонування | ✅ `.env.example` (аналог `.env.template`) |
| Обовʼязковий FE + BE функціонал за ТЗ | ✅ |
| Swagger-документація API | ✅ |
| FE на GitHub Pages, BE на Render | ✅ |
| Код-ревʼю менторів FE / BE | за процесом команди |

> **Примітка:** замість Create React App використано **Vite + React** (актуальний шаблон курсу / homework template). Бекенд на **PostgreSQL + Prisma** (дані з sql/csv seed), не MongoDB.

## Репозиторії та деплой

| Частина | Репозиторій | Деплой |
| --- | --- | --- |
| Frontend | [LilianaLukash/Foodies](https://github.com/LilianaLukash/Foodies) → `frontend/` | GitHub Pages |
| Backend | [blavikensbutcher/foodies_backend](https://github.com/blavikensbutcher/foodies_backend) | Render |

Робочі гілки для здачі: залишаються `main` (і за потреби `dev` / `gh-pages`); feature-гілки після merge видаляються.

## Швидкий старт

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Документація: [`frontend/README.md`](./frontend/README.md)

### Backend

Див. [foodies_backend README](https://github.com/blavikensbutcher/foodies_backend/blob/main/README.md):

```bash
npm install
cp .env.example .env
docker compose up -d
npm run prisma:generate && npm run prisma:migrate && npm run prisma:seed
npm run dev
```

## Стек

**Frontend:** Vite · React 19 · React Router · Redux Toolkit · Axios · Formik + Yup · CSS Modules · Swiper · react-hot-toast · modern-normalize  

**Backend:** Express 5 · TypeScript · Prisma · PostgreSQL · JWT · Zod · Multer · Cloudinary · Swagger · Winston

## Документація

- [Frontend README](./frontend/README.md) — компоненти, маршрути, env, деплой Pages
- [Backend README](https://github.com/blavikensbutcher/foodies_backend/blob/main/README.md) — ендпоінти за ТЗ, БД, seed, Render
- [Swagger UI](https://foodies-backend-bklu.onrender.com/api-docs/)

## Корисні матеріали ТЗ

- Figma: https://www.figma.com/design/TKl7kDNvwtz62RsuWNnQ5E/Foodies
- Seed data (Mongo JSON): [Google Drive](https://drive.google.com/file/d/1qaJTbOMQq-7w4omz1sjDxa5qrVhyOyvU/view?usp=sharing)
- Seed data (SQL / CSV): [Google Drive](https://drive.google.com/drive/folders/18PA4F-uMFJYNz50L21KV0KipcT-cpPcs?usp=drive_link)

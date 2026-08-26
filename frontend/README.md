# Foodies frontend

React-застосунок за макетом [Foodies](https://www.figma.com/design/TKl7kDNvwtz62RsuWNnQ5E/Foodies) і ТЗ курсу.

**Live:** https://lilianalukash.github.io/Foodies/  
**API / Swagger:** https://foodies-backend-bklu.onrender.com/api-docs/

## Стек

- Vite + React 19
- React Router
- Redux Toolkit + redux-persist
- Axios, Formik, Yup
- CSS Modules, Swiper, react-hot-toast, react-select

## Запуск

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

За замовчуванням у `.env.example` стоїть підключення до **локального бекенду** (`VITE_USE_MOCK=false`).

Щоб працювати без бекенду, у `.env`:

```
VITE_USE_MOCK=true
```

### Демо-акаунти

Mock API:

- email: `nadiia@foodies.test`
- password: `12345678`

Локальний бекенд (після `npm run prisma:seed` з `SEED_USER_PASSWORD`):

- email: `goit@gmail.com`
- password: `12345678`

На Render seed-логін може не працювати, якщо не задано `SEED_USER_PASSWORD` — тоді використовуй Sign up.

## Підключення API

У `frontend/.env`:

**Локальний бекенд:**

```
VITE_API_URL=http://localhost:3000/api
VITE_USE_MOCK=false
```

**Production (Render):**

```
VITE_API_URL=https://foodies-backend-bklu.onrender.com/api
VITE_USE_MOCK=false
```

Приватні запити йдуть з `Authorization: Bearer <accessToken>`.

### Основні ендпоінти (префікс `/api`)

**Auth**

- `POST /auth/register` `{ name, email, password }` → `{ accessToken, refreshToken, user }`
- `POST /auth/login` `{ email, password }` → `{ accessToken, refreshToken, user }`
- `POST /auth/refresh` `{ refreshToken }` → `{ accessToken }`
- `POST /auth/logout`

**Users**

- `GET /users/me`
- `GET /users/:id`
- `PATCH /users/me/avatar` (FormData `avatar`)
- `GET /users/:id/followers` `GET /users/:id/following`
- `POST /users/:id/follow` `DELETE /users/:id/follow`

**Catalog**

- `GET /categories` `GET /areas` `GET /ingredients` `GET /testimonials`

**Recipes**

- `GET /recipes?category&ingredient&area&page&limit` — фільтри за **id**
- `GET /recipes/popular` `GET /recipes/:id`
- `POST /recipes` FormData (`categoryId`, `areaId`, `mainImage`, `ingredients` як JSON `[{ id, measure }]`)
- `PATCH /recipes/:id` FormData (оновлення власного рецепта)
- `DELETE /recipes/:id`
- `GET /recipes/own` `GET /recipes/favorites` `GET /recipes/user/:id`
- `POST /recipes/:id/favorite` `DELETE /recipes/:id/favorite`

## Маршрути

| Шлях | Сторінка | Доступ |
| --- | --- | --- |
| `/` | HomePage (категорії; `?category=:id` — список рецептів) | public |
| `/recipe/:id` | RecipePage | public |
| `/recipe/add` | AddRecipePage | private (`/add` → redirect сюди) |
| `/recipe/:id/edit` | EditRecipePage | private (лише власник) |
| `/user/:id` | UserPage | private |
| `*` | NotFoundPage | public |

## Скрипти

```bash
npm run dev       # локальна розробка
npm run build     # production build
npm run preview   # перегляд build
npm run lint      # oxlint
```

## Структура

```
frontend/src
  api/           # http client, services, mock
  components/    # UI-компоненти
  features/      # feature-модулі (наприклад AddRecipeForm)
  pages/         # сторінки роутера
  redux/         # store, slices
  constants/     # константи, category images
  styles/        # глобальні стилі
  utils/         # хелпери
```

## GitHub Pages

Після пуша в `main` GitHub Actions збирає фронт і публікує на https://lilianalukash.github.io/Foodies/ (підключено до Render API).

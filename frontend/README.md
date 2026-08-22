# Foodies frontend

React-додаток за макетом [Foodies](https://www.figma.com/design/TKl7kDNvwtz62RsuWNnQ5E/Foodies) і ТЗ курсу.

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
npm run dev
```

За замовчуванням увімкнений **mock API** (`VITE_USE_MOCK=true`), щоб інтерфейс можна було зібрати без бекенду.

Демо-акаунт (mock API):
- email: `nadiia@foodies.test`
- password: `12345678`

Локальный бэкенд (после `npm run prisma:seed` с `SEED_USER_PASSWORD`):
- email: `goit@gmail.com`
- password: `12345678`

## Підключення API

У `frontend/.env`:

**Локальный бэкенд:**
```
VITE_API_URL=http://localhost:3000/api
VITE_USE_MOCK=false
```

**Production (Render):**
```
VITE_API_URL=https://foodies-backend-bklu.onrender.com/api
VITE_USE_MOCK=false
```

Swagger: https://foodies-backend-bklu.onrender.com/api-docs/

Очікувані ендпоінти (префікс `/api`):

- `POST /auth/register` `{ name, email, password }` → `{ accessToken, refreshToken, user }`
- `POST /auth/login` `{ email, password }` → `{ accessToken, refreshToken, user }`
- `POST /auth/logout`
- `GET /users/current`
- `GET /users/:id`
- `PATCH /users/avatar` (FormData `avatar`)
- `GET /users/:id/followers` `GET /users/:id/following`
- `POST /users/:id/follow` `DELETE /users/:id/follow`
- `GET /categories` `GET /areas` `GET /ingredients` `GET /testimonials`
- `GET /recipes?category&ingredient&area&page&limit` — фильтры по **id**
- `GET /recipes/popular` `GET /recipes/:id`
- `POST /recipes` FormData (`categoryId`, `areaId`, `mainImage`, `ingredients` как JSON `[{ id, measure }]`)
- `DELETE /recipes/:id`
- `GET /recipes/own` `GET /recipes/favorites` `GET /recipes/user/:id`
- `POST /recipes/:id/favorite` `DELETE /recipes/:id/favorite`

Приватні запити йдуть з `Authorization: Bearer <token>`.

## Маршрути

- `/` — HomePage
- `/recipe/:id` — RecipePage
- `/recipe/add` — AddRecipePage (private; `/add` redirects here)
## GitHub Pages

Після пуша в `main` сайт збирається і публікується на https://lilianalukash.github.io/Foodies/ (підключено до Render API).

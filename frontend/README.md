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

Демо-акаунт:
- email: `nadiia@foodies.test`
- password: `12345678`

## Підключення свого Node.js API

У `.env`:

```
VITE_API_URL=http://localhost:3000/api
VITE_USE_MOCK=false
```

Очікувані ендпоінти (префікс `/api`):

- `POST /auth/register` `{ name, email, password }` → `{ token, user }`
- `POST /auth/login` `{ email, password }` → `{ token, user }`
- `POST /auth/logout`
- `GET /users/current`
- `GET /users/:id`
- `PATCH /users/avatar` (FormData `avatar`)
- `GET /users/:id/followers` `GET /users/:id/following`
- `POST /users/:id/follow` `DELETE /users/:id/follow`
- `GET /categories` `GET /areas` `GET /ingredients` `GET /testimonials`
- `GET /recipes?category&ingredient&area&page&limit`
- `GET /recipes/popular` `GET /recipes/:id`
- `POST /recipes` FormData
- `DELETE /recipes/:id`
- `GET /recipes/own` `GET /recipes/favorites` `GET /recipes/user/:id`
- `POST /recipes/:id/favorite` `DELETE /recipes/:id/favorite`

Приватні запити йдуть з `Authorization: Bearer <token>`.

## Маршрути

- `/` — HomePage
- `/recipe/:id` — RecipePage
- `/recipe/add` — AddRecipePage (private; `/add` redirects here)
- `/user/:id` — UserPage (private)

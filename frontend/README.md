# Foodies — Frontend

React-клієнт фінального проєкту **Foodies** (макет + ТЗ курсу React).

| | |
| --- | --- |
| **Live** | https://lilianalukash.github.io/Foodies/ |
| **API** | https://foodies-backend-bklu.onrender.com/api |
| **Swagger** | https://foodies-backend-bklu.onrender.com/api-docs/ |
| **Backend** | [foodies_backend](https://github.com/blavikensbutcher/foodies_backend) |
| **Root / паспорт проєкту** | [../README.md](../README.md) |
| **Figma** | [Foodies](https://www.figma.com/design/TKl7kDNvwtz62RsuWNnQ5E/Foodies) |

## Що реалізовано (відповідність ТЗ)

| Ticket | Опис |
| --- | --- |
| **FE-1** | Базова структура, спільні UI-компоненти, aliases, lazy pages |
| **FE-2** | Header, Footer, Nav, Logo, AuthBar / UserBar |
| **FE-3** | Реєстрація, вхід, вихід (модалки + Formik/Yup + toast) |
| **FE-4** | Home: Hero, Categories, Recipes, фільтри ingredient/area, пагінація |
| **FE-5** | Сторінка рецепта |
| **FE-6** | Створення рецепта (фото, інгредієнти, category/area) |
| **FE-6.1** | Редагування та видалення власного рецепта |
| **FE-7** | Профіль користувача |
| **FE-8** | Власні рецепти та обране |
| **FE-9** | Підписники / підписки, follow / unfollow |
| **FE-10** | Testimonials + фінальне UI |

### Компоненти auth за ТЗ

| Компонент | Поведінка |
| --- | --- |
| **Modal** | `children` + кнопка закриття; закриття по іконці, backdrop, `Escape` |
| **SignUpModal** | заголовок + `SignUpForm` + кнопка Sign in → `SignInModal` |
| **SignUpForm** | Name / Email / Password (show/hide), Formik + Yup, toast на помилку API, автологін і закриття Modal після успіху |
| **SignInModal** | заголовок + `SignInForm` + Create an account → `SignUpModal` |
| **SignInForm** | Email / Password, Formik + Yup, toast, закриття Modal після успіху |
| **LogOutModal** | Cancel / Log out → `POST /auth/logout`, очищення store + localStorage, редірект на Home |

## Стек

| Технологія | Навіщо |
| --- | --- |
| **Vite 8 + React 19** | збірка (замість CRA — сучасний шаблон) |
| React Router 7 | маршрути, **lazy load** сторінок |
| Redux Toolkit + redux-persist | auth, filters, modals |
| Axios | API + JWT refresh |
| Formik + Yup | форми auth / recipe |
| CSS Modules + PostCSS custom media | стилі, 3 брейкпоінти |
| modern-normalize | нормалізація стилів |
| Mulish (Google Fonts) | типографіка макету |
| Swiper | testimonials |
| react-select | селекти |
| react-hot-toast | notifications |
| oxlint | лінт |

Брейкпоінти: mobile → tablet **768px** → desktop **1440px** (див. CSS variables).

## Вимоги

- Node.js **22+**
- npm
- (опційно) локальний [бекенд](https://github.com/blavikensbutcher/foodies_backend) на `:3000`

## Запуск

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

→ `http://localhost:5173`

### Режими `.env`

**Локальний API:**

```env
VITE_API_URL=http://localhost:3000/api
VITE_USE_MOCK=false
```

**Production (Render):**

```env
VITE_API_URL=https://foodies-backend-bklu.onrender.com/api
VITE_USE_MOCK=false
```

**Без бекенду (mock UI):**

```env
VITE_USE_MOCK=true
```

Шаблон змінних: [`.env.example`](./.env.example) (роль `.env.template` з критеріїв допуску).  
Секрети / URL лише через env, не в репозиторії.

### Демо-акаунти

| Режим | Email | Password |
| --- | --- | --- |
| Mock | `nadiia@foodies.test` | `12345678` |
| Local seed | `goit@gmail.com` | значення `SEED_USER_PASSWORD` на бекенді |

На Render без `SEED_USER_PASSWORD` — Sign up.

## Маршрути

| Шлях | Page | Доступ |
| --- | --- | --- |
| `/` | `HomePage` | public |
| `/recipe/:id` | `RecipePage` | public |
| `/recipe/add` | `AddRecipePage` | private |
| `/add` | redirect → `/recipe/add` | — |
| `/recipe/:id/edit` | `EditRecipePage` | private (власник) |
| `/user/:id` | `UserPage` | private |
| `*` | `NotFoundPage` | public |

`PrivateRoute` без токена відкриває Sign in. Сторінки підключаються через `React.lazy` + `Suspense`.

## Структура (за критеріями курсу)

```
frontend/src
  pages/          # усі сторінки
  components/     # усі UI-компоненти
  redux/          # store, slices (auth, filters, modals)
  features/       # feature-модулі (напр. AddRecipeForm)
  api/            # http, services, mock
  constants/
  styles/         # global + breakpoints, modern-normalize
  utils/
  App.jsx         # Routes + lazy
  main.jsx
```

Aliases Vite: `@`, `@components`, `@pages`-рівень через відносні імпорти, `@redux`, `@api`, `@utils`, `@features`, `@constants`.

## Скрипти

```bash
npm run dev       # розробка
npm run build     # production → dist/
npm run preview   # перегляд build
npm run lint      # oxlint
```

## API, які викликає фронт

База: `VITE_API_URL` (префікс `/api`). Приватні запити: `Authorization: Bearer <accessToken>`; при 401 — refresh.

**Auth:** `POST /auth/register` · `/auth/login` · `/auth/refresh` · `/auth/logout`  

**Users:** `GET /users/me` · `GET /users/:id` · `PATCH /users/me/avatar` ·  
`GET …/followers` · `GET …/following` · `POST|DELETE /users/:id/follow`  

**Catalog:** `GET /categories` · `/areas` · `/ingredients` · `/testimonials`  

**Recipes:**  
`GET /recipes` (фільтри `category` / `ingredient` / `area` + page/limit — **за id**) ·  
`GET /recipes/popular` · `GET /recipes/:id` ·  
`POST|PATCH /recipes` (FormData) · `DELETE /recipes/:id` ·  
`GET /recipes/own` · `/recipes/favorites` · `/recipes/user/:id` ·  
`POST|DELETE /recipes/:id/favorite`

Повний контракт: [Swagger](https://foodies-backend-bklu.onrender.com/api-docs/).

## Критерії допуску (frontend)

- [x] Adaptive layout (mobile / tablet / desktop), семантична розмітка, відповідність Figma
- [x] `modern-normalize`
- [x] Шрифти (Mulish)
- [x] Favicon (`public/favicon.svg`)
- [x] Оптимізація статичних зображень / retina-ассети в `public/`
- [x] Pages у `pages/`, компоненти у `components/`, Redux у `redux/`
- [x] Lazy load routes
- [x] Env через `.env` + `.env.example`
- [x] Naming conventions (camelCase / PascalCase / UPPER_SNAKE_CASE)
- [x] Deploy на **GitHub Pages**
- [ ] PageSpeed ≥ 70% — перевірити live: [pagespeed.web.dev](https://pagespeed.web.dev/) → URL сайту
- [x] Без зайвих `console.log` / помилок у консолі (підтримувати на ревʼю)

## Деплой (GitHub Pages)

Workflow: [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)

На push у `main`:

1. `npm ci` у `frontend/`
2. Build з `GITHUB_PAGES=true` і production `VITE_API_URL`
3. SPA fallback: `404.html` ← `index.html`
4. Deploy artifact на Pages

Base path у проді: `/Foodies/`.

## Командна робота

Планування задач — **Trello** (картки FE-1…FE-10).  
Git: feature-гілки → PR / merge у `main` (або `dev`); після злиття feature-гілки видаляються. Залишаються `main` (+ за потреби `dev` / `gh-pages`).

## Корисні посилання

- [Root README](../README.md)
- [Backend README](https://github.com/blavikensbutcher/foodies_backend/blob/main/README.md)
- [Swagger](https://foodies-backend-bklu.onrender.com/api-docs/)
- [Figma](https://www.figma.com/design/TKl7kDNvwtz62RsuWNnQ5E/Foodies)

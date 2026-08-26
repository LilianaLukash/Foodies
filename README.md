# Foodies

Командний фінальний проєкт: застосунок рецептів за макетом [Foodies](https://www.figma.com/design/TKl7kDNvwtz62RsuWNnQ5E/Foodies).

**Сайт:** https://lilianalukash.github.io/Foodies/  
**Swagger:** https://foodies-backend-bklu.onrender.com/api-docs/

## Репозиторії

| Частина | Репозиторій / папка | Деплой |
| --- | --- | --- |
| Frontend | цей репо → [`frontend/`](./frontend/README.md) | GitHub Pages |
| Backend | [blavikensbutcher/foodies_backend](https://github.com/blavikensbutcher/foodies_backend) | Render |

## Швидкий старт (frontend)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Деталі запуску, env і API — у [`frontend/README.md`](./frontend/README.md).

## Основний функціонал

- Категорії, фільтри рецептів (ingredient / area), popular recipes
- Сторінка рецепта, favorites
- Auth (register / login / logout), профіль користувача
- Follow / unfollow, own recipes
- Add / edit / delete recipe (з завантаженням фото)

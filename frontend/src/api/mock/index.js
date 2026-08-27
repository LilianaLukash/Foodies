import { DEFAULT_AVATAR } from '../../utils/helpers';

const STORAGE_KEY = 'foodies-mock-db-v2';

const img = {
  beef: 'https://www.themealdb.com/images/category/beef.png',
  breakfast: 'https://www.themealdb.com/images/category/breakfast.png',
  dessert: 'https://www.themealdb.com/images/category/dessert.png',
  goat: 'https://www.themealdb.com/images/category/goat.png',
  lamb: 'https://www.themealdb.com/images/category/lamb.png',
  miscellaneous: 'https://www.themealdb.com/images/category/miscellaneous.png',
  pasta: 'https://www.themealdb.com/images/category/pasta.png',
  pork: 'https://www.themealdb.com/images/category/pork.png',
  seafood: 'https://www.themealdb.com/images/category/seafood.png',
  side: 'https://www.themealdb.com/images/category/side.png',
  starter: 'https://www.themealdb.com/images/category/starter.png',
  chicken: 'https://www.themealdb.com/images/category/chicken.png',
  vegan: 'https://www.themealdb.com/images/category/vegan.png',
  vegetarian: 'https://www.themealdb.com/images/category/vegetarian.png',
  meal: (id) => `https://www.themealdb.com/images/media/meals/${id}.jpg`,
  ingredient: (name) =>
    `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}.png`,
};

const seedIngredients = [
  'Chicken',
  'Salmon',
  'Beef',
  'Pork',
  'Avocado',
  'Tomato',
  'Garlic',
  'Olive Oil',
  'Lemon',
  'Basil',
  'Egg',
  'Flour',
  'Milk',
  'Cheese',
  'Rice',
  'Onion',
  'Potato',
  'Spinach',
  'Mushroom',
  'Coriander',
].map((name, index) => ({
  id: `ing-${index + 1}`,
  name,
  img: img.ingredient(name),
  desc: name,
}));

const seedCategories = [
  { id: 'cat-1', name: 'Beef', img: img.beef },
  { id: 'cat-2', name: 'Breakfast', img: img.breakfast },
  { id: 'cat-3', name: 'Desserts', img: img.dessert },
  { id: 'cat-4', name: 'Goat', img: img.goat },
  { id: 'cat-5', name: 'Lamb', img: img.lamb },
  { id: 'cat-6', name: 'Miscellaneous', img: img.miscellaneous },
  { id: 'cat-7', name: 'Pasta', img: img.pasta },
  { id: 'cat-8', name: 'Pork', img: img.pork },
  { id: 'cat-9', name: 'Seafood', img: img.seafood },
  { id: 'cat-10', name: 'Side', img: img.side },
  { id: 'cat-11', name: 'Starter', img: img.starter },
  { id: 'cat-12', name: 'Chicken', img: img.chicken },
  { id: 'cat-13', name: 'Vegetarian', img: img.vegetarian },
];

const seedAreas = [
  'Ukrainian',
  'Italian',
  'French',
  'Asian',
  'American',
  'Mexican',
  'Indian',
  'Greek',
  'Spanish',
  'British',
].map((name, index) => ({ id: `area-${index + 1}`, name }));

const usersSeed = [
  {
    id: 'u1',
    name: 'Nadiia Doe',
    email: 'nadiia@foodies.test',
    password: '12345678',
    avatar: '',
    followingIds: ['u2', 'u4', 'u5', 'u6', 'u7', 'u8'],
    favoriteIds: ['r1', 'r4'],
  },
  {
    id: 'u2',
    name: 'Marina',
    email: 'marina@foodies.test',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/160?img=32',
    followingIds: ['u1'],
    favoriteIds: ['r2'],
  },
  {
    id: 'u3',
    name: 'Oleh Cook',
    email: 'oleh@foodies.test',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/160?img=12',
    followingIds: [],
    favoriteIds: ['r1'],
  },
  {
    id: 'u4',
    name: 'Sofia',
    email: 'sofia@foodies.test',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/160?img=5',
    followingIds: ['u1'],
    favoriteIds: [],
  },
  {
    id: 'u5',
    name: 'Taras',
    email: 'taras@foodies.test',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/160?img=15',
    followingIds: ['u1'],
    favoriteIds: [],
  },
  {
    id: 'u6',
    name: 'Iryna',
    email: 'iryna@foodies.test',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/160?img=20',
    followingIds: ['u1'],
    favoriteIds: [],
  },
  {
    id: 'u7',
    name: 'Andrii',
    email: 'andrii@foodies.test',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/160?img=33',
    followingIds: ['u1'],
    favoriteIds: [],
  },
  {
    id: 'u8',
    name: 'Oksana',
    email: 'oksana@foodies.test',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/160?img=47',
    followingIds: ['u1'],
    favoriteIds: [],
  },
];

const recipesSeed = [
  {
    id: 'r1',
    title: 'Baked salmon',
    category: 'Seafood',
    area: 'French',
    time: 40,
    description:
      'A wholesome blend of protein-rich chickpeas, fresh spinach and creamy avocado, tossed with a light vinaigrette.',
    instructions:
      'Season the salmon with salt, pepper and lemon. Bake at 180°C for 18 minutes. Serve with a warm salad of chickpeas, spinach and avocado.',
    thumb: img.meal('eyounx1612807486'),
    ownerId: 'u2',
    ingredients: [
      { id: 'ing-2', name: 'Salmon', measure: '400 g', img: img.ingredient('Salmon') },
      { id: 'ing-9', name: 'Lemon', measure: '1 pc', img: img.ingredient('Lemon') },
      { id: 'ing-8', name: 'Olive Oil', measure: '2 tbsp', img: img.ingredient('Olive Oil') },
    ],
  },
  {
    id: 'r2',
    title: 'Chicken tikka',
    category: 'Chicken',
    area: 'Indian',
    time: 50,
    description:
      'Tender marinated chicken pieces grilled until charred and served with fragrant spices and a cooling yogurt dip.',
    instructions:
      'Marinate chicken in yogurt and spices for 2 hours. Grill until cooked through. Rest for 5 minutes and serve with naan.',
    thumb: img.meal('wyxwsp1486979827'),
    ownerId: 'u1',
    ingredients: [
      { id: 'ing-1', name: 'Chicken', measure: '600 g', img: img.ingredient('Chicken') },
      { id: 'ing-7', name: 'Garlic', measure: '3 cloves', img: img.ingredient('Garlic') },
      { id: 'ing-16', name: 'Yogurt', measure: '150 g', img: img.ingredient('Yogurt') },
    ],
  },
  {
    id: 'r3',
    title: 'Avocado toast',
    category: 'Breakfast',
    area: 'American',
    time: 15,
    description:
      'Crispy sourdough topped with smashed avocado, chili flakes and a squeeze of lemon — a bright start to the day.',
    instructions:
      'Toast the bread. Mash avocado with lemon, salt and chili. Spread generously and finish with olive oil.',
    thumb: img.meal('uypkoi1625563909'),
    ownerId: 'u3',
    ingredients: [
      { id: 'ing-5', name: 'Avocado', measure: '1 pc', img: img.ingredient('Avocado') },
      { id: 'ing-9', name: 'Lemon', measure: '1/2 pc', img: img.ingredient('Lemon') },
    ],
  },
  {
    id: 'r4',
    title: 'Pasta primavera',
    category: 'Pasta',
    area: 'Italian',
    time: 35,
    description:
      'A garden-fresh pasta with seasonal vegetables, basil and a silky olive oil sauce that tastes like summer.',
    instructions:
      'Boil pasta until al dente. Sauté vegetables, toss with pasta, basil and olive oil. Season and serve immediately.',
    thumb: img.meal('llxvnn1511294491'),
    ownerId: 'u1',
    ingredients: [
      { id: 'ing-12', name: 'Flour', measure: '400 g pasta', img: img.ingredient('Flour') },
      { id: 'ing-10', name: 'Basil', measure: '1 bunch', img: img.ingredient('Basil') },
      { id: 'ing-6', name: 'Tomato', measure: '2 pcs', img: img.ingredient('Tomato') },
    ],
  },
  {
    id: 'r5',
    title: 'Beef stew',
    category: 'Beef',
    area: 'Ukrainian',
    time: 120,
    description:
      'Slow-cooked beef with root vegetables in a rich broth — the definition of a comforting homemade dinner.',
    instructions:
      'Brown the beef, add onions, potatoes and stock. Simmer covered for 2 hours until the meat is tender.',
    thumb: img.meal('sypxpx1515365095'),
    ownerId: 'u3',
    ingredients: [
      { id: 'ing-3', name: 'Beef', measure: '800 g', img: img.ingredient('Beef') },
      { id: 'ing-17', name: 'Potato', measure: '4 pcs', img: img.ingredient('Potato') },
      { id: 'ing-16', name: 'Onion', measure: '2 pcs', img: img.ingredient('Onion') },
    ],
  },
  {
    id: 'r6',
    title: 'Lemon tart',
    category: 'Desserts',
    area: 'French',
    time: 70,
    description:
      'Buttery pastry filled with a bright lemon custard and finished with a light dusting of sugar.',
    instructions:
      'Blind-bake the tart shell. Whisk lemon filling, bake until just set, cool completely before slicing.',
    thumb: img.meal('yysv4e1511295687'),
    ownerId: 'u2',
    ingredients: [
      { id: 'ing-9', name: 'Lemon', measure: '3 pcs', img: img.ingredient('Lemon') },
      { id: 'ing-11', name: 'Egg', measure: '4 pcs', img: img.ingredient('Egg') },
      { id: 'ing-12', name: 'Flour', measure: '250 g', img: img.ingredient('Flour') },
    ],
  },
  {
    id: 'r7',
    title: 'Greek salad',
    category: 'Vegetarian',
    area: 'Greek',
    time: 20,
    description:
      'Crisp vegetables, briny olives and creamy feta with a simple olive oil dressing.',
    instructions:
      'Chop vegetables, crumble feta, drizzle with olive oil and oregano. Toss gently and serve chilled.',
    thumb: img.meal('dgg7dq1612925912'),
    ownerId: 'u1',
    ingredients: [
      { id: 'ing-6', name: 'Tomato', measure: '3 pcs', img: img.ingredient('Tomato') },
      { id: 'ing-14', name: 'Cheese', measure: '150 g feta', img: img.ingredient('Cheese') },
    ],
  },
  {
    id: 'r8',
    title: 'Pork ribs',
    category: 'Pork',
    area: 'American',
    time: 180,
    description:
      'Fall-off-the-bone ribs glazed with a smoky sauce, perfect for a slow weekend cook.',
    instructions:
      'Rub the ribs, slow-cook for 3 hours, glaze and finish under the grill until sticky and caramelised.',
    thumb: img.meal('xuquu61536561354'),
    ownerId: 'u3',
    ingredients: [
      { id: 'ing-4', name: 'Pork', measure: '1.2 kg', img: img.ingredient('Pork') },
      { id: 'ing-7', name: 'Garlic', measure: '4 cloves', img: img.ingredient('Garlic') },
    ],
  },
  {
    id: 'r9',
    title: 'Berry parfait',
    category: 'Desserts',
    area: 'American',
    time: 15,
    description: 'Layers of yogurt and berries for a light finish.',
    instructions: 'Layer yogurt and berries. Chill and serve.',
    thumb: img.meal('rqvwxt1511382804'),
    ownerId: 'u4',
    ingredients: [{ id: 'ing-16', name: 'Yogurt', measure: '200 g', img: img.ingredient('Yogurt') }],
  },
  {
    id: 'r10',
    title: 'Herb omelette',
    category: 'Breakfast',
    area: 'French',
    time: 10,
    description: 'A quick omelette with fresh herbs.',
    instructions: 'Beat eggs, cook gently, fold in herbs.',
    thumb: img.meal('hqeco91645297366'),
    ownerId: 'u5',
    ingredients: [{ id: 'ing-11', name: 'Egg', measure: '3 pcs', img: img.ingredient('Egg') }],
  },
  {
    id: 'r11',
    title: 'Tomato bruschetta',
    category: 'Starter',
    area: 'Italian',
    time: 20,
    description: 'Toasted bread with tomatoes and basil.',
    instructions: 'Toast bread, top with tomatoes and basil.',
    thumb: img.meal('uypkoi1625563909'),
    ownerId: 'u6',
    ingredients: [{ id: 'ing-6', name: 'Tomato', measure: '2 pcs', img: img.ingredient('Tomato') }],
  },
];

const testimonialsSeed = [
  {
    id: 't1',
    testimonial:
      'Foodies has become my daily cookbook. I found recipes that actually work for a busy week and they still feel special.',
    ownerId: 'u1',
    owner: { name: 'Nadiia Doe' },
  },
  {
    id: 't2',
    testimonial:
      'The categories and filters are spot on. I can jump from Ukrainian classics to a quick pasta without leaving the kitchen mood.',
    ownerId: 'u2',
    owner: { name: 'Marina' },
  },
  {
    id: 't3',
    testimonial:
      'Saving favorites and following other cooks made this feel like a community, not just another recipe dump.',
    ownerId: 'u3',
    owner: { name: 'Oleh Cook' },
  },
];

const createSeed = () => ({
  users: usersSeed.map((user) => ({ ...user, followingIds: [...user.followingIds], favoriteIds: [...user.favoriteIds] })),
  recipes: recipesSeed.map((recipe) => ({ ...recipe, ingredients: [...recipe.ingredients] })),
  sessions: {},
  resetTokens: {},
});

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

const readDb = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const db = JSON.parse(raw);
      db.resetTokens = db.resetTokens || {};
      return db;
    }
  } catch {
    /* ignore */
  }
  const seed = createSeed();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
};

const writeDb = (db) => localStorage.setItem(STORAGE_KEY, JSON.stringify(db));

const delay = (ms = 280) => new Promise((resolve) => setTimeout(resolve, ms));

const httpError = (status, message) => {
  const error = new Error(message);
  error.response = { status, data: { message } };
  return error;
};

const tokenFor = (id) => `mock.${id}.${Date.now()}`;

const userFromToken = (db, token) => {
  if (!token) return null;
  const userId = Object.entries(db.sessions).find(([, value]) => value === token)?.[0];
  return db.users.find((user) => user.id === userId) ?? null;
};

const publicUser = (db, user, currentUser = null) => {
  const recipesCount = db.recipes.filter((recipe) => recipe.ownerId === user.id).length;
  const followersCount = db.users.filter((item) => item.followingIds.includes(user.id)).length;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    recipesCount,
    favoritesCount: user.favoriteIds.length,
    followersCount,
    followingCount: user.followingIds.length,
    isFollowing: Boolean(currentUser?.followingIds.includes(user.id)),
  };
};

const withOwner = (db, recipe) => {
  const owner = db.users.find((user) => user.id === recipe.ownerId);
  return {
    ...recipe,
    owner: owner
      ? { id: owner.id, name: owner.name, avatar: owner.avatar }
      : { id: '', name: 'Foodies', avatar: '' },
  };
};

const paginate = (items, page = 1, limit = 12) => {
  const safePage = Number(page) || 1;
  const safeLimit = Number(limit) || 12;
  const start = (safePage - 1) * safeLimit;
  return {
    recipes: items.slice(start, start + safeLimit),
    users: items.slice(start, start + safeLimit),
    items: items.slice(start, start + safeLimit),
    total: items.length,
    page: safePage,
    limit: safeLimit,
    totalPages: Math.max(1, Math.ceil(items.length / safeLimit)),
  };
};

const requireAuth = (db, headers = {}) => {
  const header = headers.Authorization || headers.authorization || '';
  const token = header.replace('Bearer ', '');
  const user = userFromToken(db, token);
  if (!user) throw httpError(401, 'Not authorized');
  return user;
};

export const mockRequest = async ({ method, url, data, params, headers }) => {
  await delay();
  const db = readDb();
  const verb = method.toLowerCase();
  const path = url.replace(/\/$/, '');

  const match = (pattern) => path.match(pattern);

  if (verb === 'post' && path === '/auth/register') {
    const { name, email, password } = data;
    if (db.users.some((user) => user.email === email)) throw httpError(409, 'Email already in use');
    const user = {
      id: `u${Date.now()}`,
      name,
      email,
      password,
      avatar: '',
      followingIds: [],
      favoriteIds: [],
    };
    db.users.push(user);
    const token = tokenFor(user.id);
    db.sessions[user.id] = token;
    writeDb(db);
    return {
      accessToken: token,
      refreshToken: token,
      user: publicUser(db, user, user),
    };
  }

  if (verb === 'post' && path === '/auth/login') {
    const user = db.users.find((item) => item.email === data.email && item.password === data.password);
    if (!user) throw httpError(401, 'Email or password is wrong');
    const token = tokenFor(user.id);
    db.sessions[user.id] = token;
    writeDb(db);
    return {
      accessToken: token,
      refreshToken: token,
      user: publicUser(db, user, user),
    };
  }

  if (verb === 'post' && path === '/auth/refresh') {
    const user = userFromToken(db, data?.refreshToken);
    if (!user) throw httpError(401, 'Invalid refresh token');
    const token = tokenFor(user.id);
    db.sessions[user.id] = token;
    writeDb(db);
    return { accessToken: token };
  }

  if (verb === 'post' && path === '/auth/forgot-password') {
    const user = db.users.find((item) => item.email === data?.email);
    if (user) {
      const token = `reset.${user.id}.${Date.now()}`;
      db.resetTokens[token] = { userId: user.id, expiresAt: Date.now() + RESET_TOKEN_TTL_MS };
      writeDb(db);
      const resetUrl = `${window.location.origin}/reset-password?token=${token}`;
      // No real mailbox in mock mode — surface the link so it can still be tested end to end.
      console.info(`[mock] Password reset link for ${user.email}: ${resetUrl}`);
    }
    return { message: 'If this email is registered, a reset link has been sent' };
  }

  if (verb === 'post' && path === '/auth/reset-password') {
    const entry = db.resetTokens[data?.token];
    if (!entry || entry.expiresAt < Date.now()) {
      throw httpError(401, 'Invalid or expired reset token');
    }
    const user = db.users.find((item) => item.id === entry.userId);
    if (!user) throw httpError(401, 'Invalid or expired reset token');
    user.password = data.password;
    delete db.resetTokens[data.token];
    delete db.sessions[user.id];
    writeDb(db);
    return { message: 'Password has been reset successfully' };
  }

  if (verb === 'post' && path === '/auth/logout') {
    const user = requireAuth(db, headers);
    delete db.sessions[user.id];
    writeDb(db);
    return { message: 'Logged out' };
  }

  if (verb === 'get' && path === '/users/me') {
    const user = requireAuth(db, headers);
    return publicUser(db, user, user);
  }

  const otherUser = match(/^\/users\/([^/]+)$/);
  if (verb === 'get' && otherUser) {
    const current = userFromToken(db, (headers.Authorization || '').replace('Bearer ', ''));
    const user = db.users.find((item) => item.id === otherUser[1]);
    if (!user) throw httpError(404, 'User not found');
    return publicUser(db, user, current);
  }

  if (verb === 'patch' && path === '/users/me/avatar') {
    const user = requireAuth(db, headers);
    user.avatar = typeof data === 'string' ? data : user.avatar || DEFAULT_AVATAR;
    writeDb(db);
    return publicUser(db, user, user);
  }

  const followers = match(/^\/users\/([^/]+)\/followers$/);
  if (verb === 'get' && followers) {
    const current = requireAuth(db, headers);
    const list = db.users.filter((item) => item.followingIds.includes(followers[1])).map((item) => {
      const recipes = db.recipes.filter((recipe) => recipe.ownerId === item.id);
      return {
        ...publicUser(db, item, current),
        recipesCount: recipes.length,
        recipes: recipes.slice(0, 4).map((recipe) => ({ id: recipe.id, title: recipe.title, thumb: recipe.thumb })),
      };
    });
    return paginate(list, params?.page, params?.limit);
  }

  const following = match(/^\/users\/([^/]+)\/following$/);
  if (verb === 'get' && following) {
    const current = requireAuth(db, headers);
    const owner = db.users.find((item) => item.id === following[1]);
    const list = (owner?.followingIds || [])
      .map((id) => db.users.find((item) => item.id === id))
      .filter(Boolean)
      .map((item) => {
        const recipes = db.recipes.filter((recipe) => recipe.ownerId === item.id);
        return {
          ...publicUser(db, item, current),
          recipesCount: recipes.length,
          recipes: recipes.slice(0, 4).map((recipe) => ({ id: recipe.id, title: recipe.title, thumb: recipe.thumb })),
        };
      });
    return paginate(list, params?.page, params?.limit);
  }

  const follow = match(/^\/users\/([^/]+)\/follow$/);
  if (follow && (verb === 'post' || verb === 'delete')) {
    const current = requireAuth(db, headers);
    const targetId = follow[1];
    if (targetId === current.id) throw httpError(400, 'Cannot follow yourself');
    if (verb === 'post' && !current.followingIds.includes(targetId)) current.followingIds.push(targetId);
    if (verb === 'delete') current.followingIds = current.followingIds.filter((id) => id !== targetId);
    writeDb(db);
    return publicUser(db, db.users.find((item) => item.id === targetId), current);
  }

  if (verb === 'get' && path === '/categories') return seedCategories;
  if (verb === 'get' && path === '/areas') return seedAreas;
  if (verb === 'get' && path === '/ingredients') return seedIngredients;
  if (verb === 'get' && path === '/testimonials') return testimonialsSeed;

  if (verb === 'get' && path === '/recipes/popular') {
    const current = userFromToken(db, (headers.Authorization || '').replace('Bearer ', ''));
    const ranked = [...db.recipes].sort((a, b) => {
      const aCount = db.users.filter((user) => user.favoriteIds.includes(a.id)).length;
      const bCount = db.users.filter((user) => user.favoriteIds.includes(b.id)).length;
      return bCount - aCount;
    });
    return ranked.slice(0, 4).map((recipe) => ({
      ...withOwner(db, recipe),
      isFavorite: Boolean(current?.favoriteIds.includes(recipe.id)),
    }));
  }

  if (verb === 'get' && path === '/recipes/own') {
    const current = requireAuth(db, headers);
    const list = db.recipes.filter((recipe) => recipe.ownerId === current.id).map((recipe) => withOwner(db, recipe));
    return paginate(list, params?.page, params?.limit);
  }

  if (verb === 'get' && path === '/recipes/favorites') {
    const current = requireAuth(db, headers);
    const list = db.recipes
      .filter((recipe) => current.favoriteIds.includes(recipe.id))
      .map((recipe) => withOwner(db, recipe));
    return paginate(list, params?.page, params?.limit);
  }

  const userRecipes = match(/^\/recipes\/user\/([^/]+)$/);
  if (verb === 'get' && userRecipes) {
    const list = db.recipes.filter((recipe) => recipe.ownerId === userRecipes[1]).map((recipe) => withOwner(db, recipe));
    return paginate(list, params?.page, params?.limit);
  }

  if (verb === 'get' && path === '/recipes') {
    const current = userFromToken(db, (headers.Authorization || '').replace('Bearer ', ''));
    let list = db.recipes.map((recipe) => withOwner(db, recipe));
    if (params?.category) list = list.filter((recipe) => recipe.category === params.category);
    if (params?.ingredient) {
      list = list.filter((recipe) =>
        recipe.ingredients.some((item) => item.id === params.ingredient || item.name === params.ingredient),
      );
    }
    if (params?.area) list = list.filter((recipe) => recipe.area === params.area);
    const page = paginate(list, params?.page, params?.limit);
    page.recipes = page.recipes.map((recipe) => ({
      ...recipe,
      isFavorite: Boolean(current?.favoriteIds.includes(recipe.id)),
    }));
    return page;
  }

  const favorite = match(/^\/recipes\/([^/]+)\/favorite$/);
  if (favorite && (verb === 'post' || verb === 'delete')) {
    const current = requireAuth(db, headers);
    const recipeId = favorite[1];
    if (verb === 'post' && !current.favoriteIds.includes(recipeId)) current.favoriteIds.push(recipeId);
    if (verb === 'delete') current.favoriteIds = current.favoriteIds.filter((id) => id !== recipeId);
    writeDb(db);
    return { message: 'ok', isFavorite: current.favoriteIds.includes(recipeId) };
  }

  const oneRecipe = match(/^\/recipes\/([^/]+)$/);
  if (verb === 'get' && oneRecipe) {
    const current = userFromToken(db, (headers.Authorization || '').replace('Bearer ', ''));
    const recipe = db.recipes.find((item) => item.id === oneRecipe[1]);
    if (!recipe) throw httpError(404, 'Recipe not found');
    return { ...withOwner(db, recipe), isFavorite: Boolean(current?.favoriteIds.includes(recipe.id)) };
  }

  if (verb === 'delete' && oneRecipe) {
    const current = requireAuth(db, headers);
    const recipe = db.recipes.find((item) => item.id === oneRecipe[1]);
    if (!recipe) throw httpError(404, 'Recipe not found');
    if (recipe.ownerId !== current.id) throw httpError(403, 'Forbidden');
    db.recipes = db.recipes.filter((item) => item.id !== recipe.id);
    db.users.forEach((user) => {
      user.favoriteIds = user.favoriteIds.filter((id) => id !== recipe.id);
    });
    writeDb(db);
    return { message: 'Deleted' };
  }

  if (verb === 'post' && path === '/recipes') {
    const current = requireAuth(db, headers);
    const fields = data instanceof FormData ? Object.fromEntries(data.entries()) : data;
    const ingredients = typeof fields.ingredients === 'string' ? JSON.parse(fields.ingredients) : fields.ingredients;
    const recipe = {
      id: `r${Date.now()}`,
      title: fields.title,
      description: fields.description,
      category: fields.category,
      area: fields.area,
      time: Number(fields.time),
      instructions: fields.instructions,
      thumb: fields.thumbPreview || img.meal('ustsqw1469097804'),
      ownerId: current.id,
      ingredients: (ingredients || []).map((item) => ({
        ...item,
        img: item.img || img.ingredient(item.name),
      })),
    };
    db.recipes.unshift(recipe);
    writeDb(db);
    return withOwner(db, recipe);
  }

  throw httpError(404, `Mock endpoint not found: ${verb.toUpperCase()} ${path}`);
};

export const resetMockDb = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getId = (item) => item?.id ?? item?._id ?? item?.userId ?? '';

export const getErrorMessage = (error, fallback = 'Something went wrong') => {
  const data = error?.response?.data;
  return (
    data?.message ||
    data?.error ||
    (Array.isArray(data?.errors) ? data.errors[0]?.message : null) ||
    error?.message ||
    fallback
  );
};

export const unwrapList = (payload, keys = []) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  for (const key of [...keys, 'items', 'results', 'data', 'rows']) {
    if (Array.isArray(payload[key])) return payload[key];
  }
  return [];
};

export const unwrapPage = (payload, listKeys = ['recipes', 'users', 'followers', 'following']) => {
  const items = unwrapList(payload, listKeys);
  return {
    items,
    total: payload?.total ?? payload?.totalItems ?? payload?.count ?? items.length,
    page: Number(payload?.page ?? 1),
    limit: Number(payload?.limit ?? payload?.perPage ?? items.length),
    totalPages:
      payload?.totalPages ??
      Math.max(1, Math.ceil((payload?.total ?? items.length) / (payload?.limit || 12))),
  };
};

export const normalizeUser = (user = {}) => ({
  id: String(getId(user)),
  name: user.name ?? user.userName ?? '',
  email: user.email ?? '',
  avatar: user.avatar ?? user.avatarURL ?? user.avatarUrl ?? '',
  recipesCount: user.recipesCount ?? user.createdRecipesCount ?? user.ownRecipes ?? 0,
  favoritesCount: user.favoritesCount ?? user.favoriteRecipesCount ?? 0,
  followersCount: user.followersCount ?? user.followers ?? 0,
  followingCount: user.followingCount ?? user.following ?? 0,
  isFollowing: Boolean(user.isFollowing ?? user.followingMe ?? false),
});

export const recipeImage = (recipe = {}) =>
  recipe.mainImage || recipe.thumb || recipe.preview || recipe.img || '';

export const PAGE_LIMIT = 12;

export const assetUrl = (path) => `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`;

export const DEFAULT_AVATAR = assetUrl('images/avatar-default.svg');

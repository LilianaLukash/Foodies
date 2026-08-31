import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import MainTitle from '../MainTitle/MainTitle';
import Subtitle from '../Subtitle/Subtitle';
import RecipeFilters from '../RecipeFilters/RecipeFilters';
import RecipeList from '../RecipeList/RecipeList';
import RecipePagination from '../RecipePagination/RecipePagination';
import Loader from '../Loader/Loader';
import { asPage, getRecipes } from '../../api/services';
import { getErrorMessage, getId, PAGE_LIMIT } from '../../utils/helpers';
import css from './Recipes.module.css';

const Recipes = ({ category, onBack }) => {
  const [filters, setFilters] = useState({ ingredient: '', area: '' });
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const categoryId = category?.id;
  const categoryName = category?.name ?? category;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const payload = await getRecipes({
          category: categoryId || undefined,
          ingredient: filters.ingredient || undefined,
          area: filters.area || undefined,
          page,
          limit: PAGE_LIMIT,
        });
        const parsed = asPage(payload, ['recipes']);
        setData(parsed);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [categoryId, filters, page]);

  const onFavoriteChange = (recipeId, isFavorite) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        getId(item) === recipeId ? { ...item, isFavorite } : item,
      ),
    }));
  };

  return (
    <section className={css.section}>
      <div className="container">
        <button className={css.back} type="button" onClick={onBack}>
          ← Back
        </button>
        <MainTitle>{categoryName}</MainTitle>
        <Subtitle>
          Go on a taste journey, finding unique recipes that reflect the diversity of local cuisines.
        </Subtitle>
        <div className={css.layout}>
          <RecipeFilters
            ingredient={filters.ingredient}
            area={filters.area}
            onChange={(next) => {
              setFilters(next);
              setPage(1);
            }}
          />
          <div>
            {loading ? <Loader /> : (
              <RecipeList
                recipes={data.items}
                variant="feed"
                onFavoriteChange={onFavoriteChange}
              />
            )}
            <RecipePagination page={page} totalPages={data.totalPages} onChange={setPage} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recipes;

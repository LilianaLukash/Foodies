import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import Recipes from '../../components/Recipes/Recipes';
import Testimonials from '../../components/Testimonials/Testimonials';
import { useAppSelector } from '../../redux/hooks';
import { selectCategories } from '../../redux/filters/slice';
import { getRecipes } from '../../api/services';
import { getId } from '../../utils/helpers';

const ALL_CATEGORIES = { name: 'All categories' };
const ALL_CATEGORY_PARAM = 'all';

const HomePage = () => {
  const categories = useAppSelector(selectCategories);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const selectedCategory = useMemo(() => {
    if (!categoryParam) return null;
    if (categoryParam === ALL_CATEGORY_PARAM) return ALL_CATEGORIES;

    const found = categories.find((item) => getId(item) === categoryParam);
    if (found) return found;

    // Categories still loading — keep id so Recipes can fetch immediately.
    if (!categories.length) return { id: categoryParam, name: '' };

    return null;
  }, [categoryParam, categories]);

  useEffect(() => {
    if (!categoryParam || categoryParam === ALL_CATEGORY_PARAM || !categories.length) return;
    const exists = categories.some((item) => getId(item) === categoryParam);
    if (!exists) setSearchParams({}, { replace: true });
  }, [categoryParam, categories, setSearchParams]);

  const onSelect = async (category) => {
    const id = getId(category);
    const data = await getRecipes({
      category: id || undefined,
      page: 1,
      limit: 12,
    });
    if (data === undefined || data === null) {
      throw new Error('Failed to load recipes');
    }

    setSearchParams(id ? { category: id } : { category: ALL_CATEGORY_PARAM });
  };

  const onBack = () => setSearchParams({});

  return (
    <>
      <Hero />
      {selectedCategory ? (
        <Recipes category={selectedCategory} onBack={onBack} />
      ) : (
        <>
          <Categories categories={categories} onSelect={onSelect} />
          <Testimonials />
        </>
      )}
    </>
  );
};

export default HomePage;

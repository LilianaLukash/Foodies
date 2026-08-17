import { useState } from 'react';
import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import Recipes from '../../components/Recipes/Recipes';
import Testimonials from '../../components/Testimonials/Testimonials';
import { useAppSelector } from '../../redux/hooks';
import { selectCategories } from '../../redux/filters/slice';
import { getRecipes } from '../../api/services';

const HomePage = () => {
  const categories = useAppSelector(selectCategories);
  const [selectedCategory, setSelectedCategory] = useState('');

  const onSelect = async (category) => {
    const data = await getRecipes({
      category: category.name === 'All categories' ? undefined : category.name,
      page: 1,
      limit: 12,
    });
    if (data === undefined || data === null) {
      throw new Error('Failed to load recipes');
    }
    setSelectedCategory(category.name);
  };

  return (
    <>
      <Hero />
      {selectedCategory ? (
        <Recipes category={selectedCategory} onBack={() => setSelectedCategory('')} />
      ) : (
        <Categories categories={categories} onSelect={onSelect} />
      )}
      <Testimonials />
    </>
  );
};

export default HomePage;

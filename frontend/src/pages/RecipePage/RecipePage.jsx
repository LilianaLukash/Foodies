import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import PathInfo from '../../components/PathInfo/PathInfo';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
import PopularRecipes from '../../components/PopularRecipes/PopularRecipes';
import Loader from '../../components/Loader/Loader';
import { asList, getPopularRecipes, getRecipeById } from '../../api/services';
import { getErrorMessage } from '../../utils/helpers';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [details, popularList] = await Promise.all([getRecipeById(id), getPopularRecipes()]);
        setRecipe(details);
        setPopular(asList(popularList, ['recipes']).slice(0, 4));
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <div className="container">
      <PathInfo page={recipe?.title || 'Recipe'} />
      {loading || !recipe ? <Loader /> : <RecipeInfo recipe={recipe} />}
      {!loading ? <PopularRecipes recipes={popular} /> : null}
    </div>
  );
};

export default RecipePage;

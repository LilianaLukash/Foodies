import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import PathInfo from '@components/PathInfo/PathInfo';
import MainTitle from '@components/MainTitle/MainTitle';
import { Subtitle } from '@components';
import Loader from '@components/Loader/Loader';
import { AddRecipeForm } from '@features/recipes';
import { getRecipeById } from '@api/services';
import { getErrorMessage } from '@utils/helpers';
import css from '../AddRecipePage/AddRecipePage.module.css';

const EditRecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const details = await getRecipeById(id);
        setRecipe(details);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  return (
    <div className={`container ${css.page}`}>
      <PathInfo page="Edit recipe" />
      <MainTitle>Edit recipe</MainTitle>
      <Subtitle>
        Update your recipe details and share the latest version with the Foodies community.
      </Subtitle>
      {loading || !recipe ? <Loader /> : <AddRecipeForm recipe={recipe} />}
    </div>
  );
};

export default EditRecipePage;

import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import PathInfo from '@components/PathInfo/PathInfo';
import MainTitle from '@components/MainTitle/MainTitle';
import { Subtitle } from '@components';
import Loader from '@components/Loader/Loader';
import { AddRecipeForm } from '@features/recipes';
import { getRecipeById } from '@api/services';
import { useAppSelector } from '@redux/hooks';
import { selectUser } from '@redux/auth/slice';
import { getErrorMessage, isRecipeOwner } from '@utils/helpers';
import pageCss from '../AddRecipePage/AddRecipePage.module.css';
import css from './EditRecipePage.module.css';

const EditRecipePage = () => {
  const { id } = useParams();
  const user = useAppSelector(selectUser);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');
      setRecipe(null);

      try {
        const details = await getRecipeById(id);
        if (!cancelled) setRecipe(details);
      } catch (err) {
        if (!cancelled) {
          const message = getErrorMessage(err);
          setError(message);
          toast.error(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className={`container ${pageCss.page}`}>
        <PathInfo page="Edit recipe" />
        <MainTitle>Edit recipe</MainTitle>
        <Subtitle>
          Update your recipe details and share the latest version with the Foodies community.
        </Subtitle>
        <Loader />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className={`container ${pageCss.page}`}>
        <PathInfo page="Edit recipe" />
        <MainTitle>Edit recipe</MainTitle>
        <div className={css.state}>
          <p>{error || 'Recipe not found'}</p>
          <Link to="/">Back home</Link>
        </div>
      </div>
    );
  }

  if (!isRecipeOwner(recipe, user)) {
    return <Navigate to={`/recipe/${id}`} replace />;
  }

  return (
    <div className={`container ${pageCss.page}`}>
      <PathInfo page="Edit recipe" />
      <MainTitle>Edit recipe</MainTitle>
      <Subtitle>
        Update your recipe details and share the latest version with the Foodies community.
      </Subtitle>
      <AddRecipeForm recipe={recipe} />
    </div>
  );
};

export default EditRecipePage;

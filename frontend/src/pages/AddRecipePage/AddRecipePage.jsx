import PathInfo from '@components/PathInfo/PathInfo';
import MainTitle from '@components/MainTitle/MainTitle';
import { Subtitle } from '@components';
import { AddRecipeForm } from '@features/recipes';

const AddRecipePage = () => (
  <div className="container">
    <PathInfo page="Add recipe" />
    <MainTitle>Add recipe</MainTitle>
    <Subtitle>
    Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
    </Subtitle>
    <AddRecipeForm />
  </div>
);

export default AddRecipePage;

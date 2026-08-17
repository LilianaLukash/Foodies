import RecipePreview from '../RecipePreview/RecipePreview';
import UserCard from '../UserCard/UserCard';
import css from './ListItems.module.css';

const ListItems = ({ type, items, onDelete, onFollow, emptyText, showUnfollowOnly = false }) => {
  if (!items.length) {
    return <p className={css.empty}>{emptyText}</p>;
  }

  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li key={item.id || item._id}>
          {type === 'users' ? (
            <UserCard user={item} onFollow={onFollow} showUnfollowOnly={showUnfollowOnly} />
          ) : (
            <RecipePreview recipe={item} onDelete={onDelete} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListItems;

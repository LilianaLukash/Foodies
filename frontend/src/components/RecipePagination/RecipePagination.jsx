import clsx from 'clsx';
import css from './RecipePagination.module.css';

const RecipePagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const items = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li key={item}>
          <button
            className={clsx(css.btn, item === page && css.active)}
            type="button"
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RecipePagination;

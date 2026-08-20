import RecipePagination from '../RecipePagination/RecipePagination';
import css from './ListPagination.module.css';

const ListPagination = ({ page, totalPages, onChange }) => (
  <div className={css.wrap}>
    <RecipePagination page={page} totalPages={totalPages} onChange={onChange} />
  </div>
);

export default ListPagination;

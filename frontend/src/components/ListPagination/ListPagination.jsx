import RecipePagination from '../RecipePagination/RecipePagination';

const ListPagination = ({ page, totalPages, onChange }) => (
  <RecipePagination page={page} totalPages={totalPages} onChange={onChange} />
);

export default ListPagination;

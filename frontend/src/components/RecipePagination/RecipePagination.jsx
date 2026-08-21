import clsx from "clsx";
import css from "./RecipePagination.module.css";

const GAP = "gap";
const SIBLINGS = 1;

const range = (from, to) =>
  Array.from(
    { length: Math.max(to - from + 1, 0) },
    (_, index) => from + index,
  );

const buildPages = (page, totalPages) => {
  const from = Math.max(2, page - SIBLINGS);
  const to = Math.min(totalPages - 1, page + SIBLINGS);

  return [
    1,
    ...(from > 2 ? [GAP] : []),
    ...range(from, to),
    ...(to < totalPages - 1 ? [GAP] : []),
    ...(totalPages > 1 ? [totalPages] : []),
  ];
};

const RecipePagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <ul className={css.list}>
      {buildPages(page, totalPages).map((item, index) =>
        item === GAP ? (
          <li
            key={`${GAP}-${index}`}
            className={css.ellipsis}
            aria-hidden="true"
          >
            …
          </li>
        ) : (
          <li key={item}>
            <button
              className={clsx(css.btn, item === page && css.active)}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={item === page ? "page" : undefined}
              onClick={() => onChange(item)}
            >
              {item}
            </button>
          </li>
        ),
      )}
    </ul>
  );
};

export default RecipePagination;

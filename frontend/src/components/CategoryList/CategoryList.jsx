import clsx from 'clsx';
import toast from 'react-hot-toast';
import Icon from '../Icon/Icon';
import { getErrorMessage, getId } from '../../utils/helpers';
import css from './CategoryList.module.css';

const FIGMA_ORDER = [
  'Beef',
  'Breakfast',
  'Desserts',
  'Lamb',
  'Goat',
  'Miscellaneous',
  'Pasta',
  'Pork',
  'Seafood',
  'Side',
  'Starter',
];

const WIDE_DESKTOP = new Set(['Desserts', 'Lamb', 'Pork', 'Side']);
const WIDE_TABLET = new Set(['Desserts', 'Pork']);

const sortCategories = (categories = []) =>
  [...categories].sort((a, b) => {
    const ai = FIGMA_ORDER.indexOf(a.name);
    const bi = FIGMA_ORDER.indexOf(b.name);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

const CategoryList = ({ categories, onSelect }) => {
  const handleSelect = async (category) => {
    try {
      await onSelect(category);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to load recipes'));
    }
  };

  return (
    <ul className={css.list}>
      {sortCategories(categories).map((category) => {
        const name = category.name;
        const id = getId(category);
        const image = category.img || category.thumb;
        return (
          <li
            key={id || name}
            className={clsx(
              css.item,
              WIDE_TABLET.has(name) && css.wideTablet,
              WIDE_DESKTOP.has(name) && css.wideDesktop,
            )}
          >
            <button
              type="button"
              className={css.card}
              onClick={() => handleSelect(category)}
              aria-label={`Open ${name}`}
            >
              <img src={image} alt="" loading="lazy" decoding="async" />
              <div className={css.label}>
                <span>{name}</span>
                <span className={css.arrow} aria-hidden="true">
                  <Icon name="icon-arrow-up-right" size={18} />
                </span>
              </div>
            </button>
          </li>
        );
      })}
      <li className={css.item}>
        <button className={css.allBtn} type="button" onClick={() => handleSelect({ name: 'All categories' })}>
          All categories
        </button>
      </li>
    </ul>
  );
};

export default CategoryList;

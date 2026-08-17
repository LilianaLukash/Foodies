import clsx from 'clsx';
import css from './TabsList.module.css';

const TabsList = ({ tabs, active, onChange }) => (
  <ul className={css.list}>
    {tabs.map((tab) => (
      <li key={tab.value}>
        <button
          className={clsx(css.tab, active === tab.value && css.active)}
          type="button"
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      </li>
    ))}
  </ul>
);

export default TabsList;

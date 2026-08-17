import css from './MainTitle.module.css';

const MainTitle = ({ children }) => <h2 className={css.title}>{children}</h2>;

export default MainTitle;

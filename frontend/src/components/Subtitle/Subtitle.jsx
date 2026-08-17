import css from './Subtitle.module.css';

const Subtitle = ({ children }) => <p className={css.text}>{children}</p>;

export default Subtitle;

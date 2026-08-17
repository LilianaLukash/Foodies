import css from './Loader.module.css';

const Loader = () => (
  <div className={css.wrap} role="status" aria-label="Loading">
    <span className={css.spinner} />
  </div>
);

export default Loader;

import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <section className={`container ${css.wrap}`}>
    <h1>404</h1>
    <p>This page is not on the menu.</p>
    <Link to="/">Back home</Link>
  </section>
);

export default NotFoundPage;

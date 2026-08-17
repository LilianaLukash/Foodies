import MainTitle from '../MainTitle/MainTitle';
import Subtitle from '../Subtitle/Subtitle';
import CategoryList from '../CategoryList/CategoryList';
import css from './Categories.module.css';

const Categories = ({ categories, onSelect }) => (
  <section className={css.section}>
    <div className="container">
      <MainTitle>Categories</MainTitle>
      <Subtitle>
        Discover a limitless world of culinary possibilities and enjoy exquisite recipes that
        combine taste, style and the warm atmosphere of the kitchen.
      </Subtitle>
      <div className={css.list}>
        <CategoryList categories={categories} onSelect={onSelect} />
      </div>
    </div>
  </section>
);

export default Categories;

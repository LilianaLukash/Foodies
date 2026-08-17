import css from './RecipeIngredients.module.css';

const PLACEHOLDER = '/images/ingredient-placeholder.svg';

const RecipeIngredients = ({ ingredients = [] }) => (
  <section className={css.section}>
    <h3 className={css.title}>Ingredients</h3>
    <ul className={css.list}>
      {ingredients.map((item) => (
        <li className={css.item} key={item.id || item._id || item.name}>
          <img
            src={item.img || item.thumb || PLACEHOLDER}
            alt={item.name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = PLACEHOLDER;
            }}
          />
          <div>
            <p>{item.name}</p>
            <span>{item.measure}</span>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default RecipeIngredients;

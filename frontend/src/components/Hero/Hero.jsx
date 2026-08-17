import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import Header from '../Header/Header';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsLoggedIn } from '../../redux/auth/slice';
import { openModal } from '../../redux/modals/slice';
import css from './Hero.module.css';

const Hero = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAdd = () => {
    if (isLoggedIn) navigate('/recipe/add');
    else dispatch(openModal('signIn'));
  };

  return (
    <section className={css.section}>
      <div className={css.inner}>
        <Header embedded />
        <div className={css.content}>
          <h1 className={css.title}>Improve Your Culinary Talents</h1>
          <p className={css.subtitle}>
            Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
            tastes of various cuisines.
          </p>
          <Button className={css.cta} type="button" variant="outlineLight" onClick={onAdd}>
            Add recipe
          </Button>
        </div>
        <div className={css.gallery} aria-hidden="true">
          <div className={css.dishSmallWrap}>
            <img
              className={css.dishSmall}
              src="/images/hero/dish-small-1x.jpg"
              srcSet="/images/hero/dish-small-1x.jpg 1x, /images/hero/dish-small-2x.jpg 2x"
              alt=""
              width="128"
              height="116"
              decoding="async"
            />
          </div>
          <div className={css.dishLargeWrap}>
            <img
              className={css.dishLarge}
              src="/images/hero/dish-large-1x.jpg"
              srcSet="/images/hero/dish-large-1x.jpg 1x, /images/hero/dish-large-2x.jpg 2x"
              alt=""
              width="302"
              height="273"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

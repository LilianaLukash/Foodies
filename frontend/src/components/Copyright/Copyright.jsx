import css from './Copyright.module.css';

const Copyright = () => (
  <p className={css.text}>
    ©{new Date().getFullYear()}, Foodies. All rights reserved
  </p>
);

export default Copyright;

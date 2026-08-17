import Logo from '../Logo/Logo';
import NetworkLinks from '../NetworkLinks/NetworkLinks';
import Copyright from '../Copyright/Copyright';
import css from './Footer.module.css';

const Footer = () => (
  <footer className={css.footer}>
    <div className={`container ${css.bottom}`}>
      <div className={css.row}>
        <Logo />
        <NetworkLinks />
      </div>
      <div className={css.copy}>
        <Copyright />
      </div>
    </div>
  </footer>
);

export default Footer;

import Icon from '../Icon/Icon';
import css from './NetworkLinks.module.css';

const links = [
  { name: 'Facebook', href: 'https://www.facebook.com/goITclub/', icon: 'icon-facebook' },
  { name: 'Instagram', href: 'https://www.instagram.com/goitclub/', icon: 'icon-instagram' },
  { name: 'YouTube', href: 'https://www.youtube.com/c/GoIT', icon: 'icon-youtube' },
];

const NetworkLinks = () => (
  <ul className={css.list}>
    {links.map((link) => (
      <li key={link.name}>
        <a
          className={css.link}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
        >
          <Icon name={link.icon} size={20} sizeTablet={20} />
        </a>
      </li>
    ))}
  </ul>
);

export default NetworkLinks;

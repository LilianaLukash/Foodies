import css from './Subtitle.module.css';

const toCssSize = (value) => (typeof value === 'number' ? `${value}px` : value);

const Subtitle = ({ children, maxWidth }) => (
  <p
    className={css.text}
    style={
      maxWidth
        ? {
            '--subtitle-max-tablet': toCssSize(maxWidth.tablet),
            '--subtitle-max-desktop': toCssSize(maxWidth.desktop),
          }
        : undefined
    }
  >
    {children}
  </p>
);

export default Subtitle;

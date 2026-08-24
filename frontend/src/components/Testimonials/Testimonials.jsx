import { useEffect, useRef, useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import toast from 'react-hot-toast';
import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';
import { asList, getTestimonials } from '../../api/services';
import { getErrorMessage } from '../../utils/helpers';
import css from './Testimonials.module.css';

const Testimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swiperReady, setSwiperReady] = useState(false);
  const paginationRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    getTestimonials()
      .then((data) => {
        if (!cancelled) setItems(asList(data, ['testimonials']));
      })
      .catch((error) => {
        if (!cancelled) {
          setItems([]);
          toast.error(getErrorMessage(error, 'Failed to load testimonials'));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loading && items.length) setSwiperReady(true);
  }, [loading, items.length]);

  if (loading) {
    return (
      <section className={css.section}>
        <div className="container">
          <Loader />
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.root}>
          <div className={css.reviews}>
            <div className={css.header}>
              <p className={css.eyebrow}>What our customer say</p>
              <h2 className={css.title}>Testimonials</h2>
            </div>

            <span className={css.quotes}>
              <Icon name="icon-quotes" className={css.quotesIcon} width={59} height={48} />
            </span>

            {swiperReady ? (
              <Swiper
                className={css.swiper}
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{
                  el: paginationRef.current,
                  clickable: true,
                }}
                autoHeight
                onSwiper={(swiper) => {
                  const syncHeight = () => swiper.updateAutoHeight(0);
                  syncHeight();
                  requestAnimationFrame(syncHeight);
                  document.fonts?.ready?.then(syncHeight);
                }}
                onSlideChange={(swiper) => swiper.updateAutoHeight(0)}
              >
                {items.map((item) => (
                  <SwiperSlide key={item.id || item._id}>
                    <blockquote className={css.quote}>
                      <p>{item.testimonial || item.quote}</p>
                      <cite>{item.owner?.name || item.author}</cite>
                    </blockquote>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null}
          </div>

          <div ref={paginationRef} className={css.pagination} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

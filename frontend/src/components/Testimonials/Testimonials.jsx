import { useEffect, useState } from 'react';
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
        <div className={css.header}>
          <p className={css.eyebrow}>What our customer say</p>
          <h2 className={css.title}>Testimonials</h2>
        </div>

        <div className={css.body}>
          <Icon name="icon-quotes" className={css.quotes} width={59} height={48} />

          <div className={css.carousel}>
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              autoHeight
              loop={items.length > 1}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

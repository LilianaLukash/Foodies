import { useEffect, useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Icon from '../Icon/Icon';
import { asList, getTestimonials } from '../../api/services';
import css from './Testimonials.module.css';

const Testimonials = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getTestimonials()
      .then((data) => setItems(asList(data, ['testimonials'])))
      .catch(() => setItems([]));
  }, []);

  if (!items.length) return null;

  return (
    <section className={css.section}>
      <div className="container">
        <p className={css.eyebrow}>What our customer say</p>
        <h2 className={css.title}>Testimonials</h2>
        <div className={css.slider}>
          <Icon name="icon-quotes" className={css.quotes} width={59} height={48} />
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
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
    </section>
  );
};

export default Testimonials;

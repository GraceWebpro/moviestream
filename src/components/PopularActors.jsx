import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/Main.css';

const PopularActorsCarousel = () => {
  const popularActors = [
    { id: 1, name: 'Lee Min Ho', imageUrl: 'https://www.90daykorean.com/wp-content/webp-express/webp-images/uploads/2021/01/479px-140120_minho_lee_c-min.jpg.webp' },
    { id: 2, name: 'Kim Soo Hyun', imageUrl: 'https://www.90daykorean.com/wp-content/webp-express/webp-images/uploads/2019/07/IqFjJrXCR_8MQ3uYAnWOH-YLRPHU-1024x683-min-768x512-min.jpg.webp' },
    { id: 3, name: 'Soo Ji Sub', imageUrl: 'https://www.90daykorean.com/wp-content/webp-express/webp-images/uploads/2021/01/So_Ji-sub-min.jpg.webp' },
    { id: 4, name: 'Lee Jong Suk', imageUrl: 'https://www.90daykorean.com/wp-content/webp-express/webp-images/uploads/2019/07/884eff572d154a8c808930bba89cc3be.jpeg.webp' },
    { id: 5, name: 'Ji Chang Wook', imageUrl: 'https://www.90daykorean.com/wp-content/uploads/2019/07/Ji-Chang-Wook-768x512.jpeg' },
    { id: 6, name: 'Kim Woo Bin', imageUrl: 'https://www.90daykorean.com/wp-content/uploads/2019/07/kim-woo-bin-min.jpg' },
    // Add more if you want
  ];

  return (
    <div className="popular-actors-carousel">
      <h2 className="section-title">Popular Actors</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {popularActors.map(actor => (
          <SwiperSlide key={actor.id}>
            <div className="actor-card">
              <img src={actor.imageUrl} alt={actor.name} className="actor-image" />
              <p className="actor-name">{actor.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularActorsCarousel;

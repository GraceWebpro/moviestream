import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/Main.css';

const PopularActorsCarousel = () => {
  const popularActors = [
    { id: 1, name: 'Tom Cruise', imageUrl: 'https://link-to-tomcruise.jpg' },
    { id: 2, name: 'Zendaya', imageUrl: 'https://link-to-zendaya.jpg' },
    { id: 3, name: 'Chris Hemsworth', imageUrl: 'https://link-to-chris.jpg' },
    { id: 4, name: 'Florence Pugh', imageUrl: 'https://link-to-florence.jpg' },
    { id: 5, name: 'Leonardo DiCaprio', imageUrl: 'https://link-to-leonardo.jpg' },
    { id: 6, name: 'Anya Taylor-Joy', imageUrl: 'https://link-to-anya.jpg' },
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

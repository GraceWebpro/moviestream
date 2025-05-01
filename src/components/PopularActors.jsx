import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/Main.css';

const PopularActorsCarousel = () => {
  const popularActors = [
    { id: 1, name: 'Lee Min Ho', tag: 'Hallyuwood Actor', imageUrl: 'https://www.90daykorean.com/wp-content/webp-express/webp-images/uploads/2021/01/479px-140120_minho_lee_c-min.jpg.webp' },
    { id: 2, name: 'Femi Adebayo', tag: 'Nollywood Actor', imageUrl: 'https://image.api.sportal365.com/process//smp-images-production/pulse.ng/27122024/d02a001e-c3cc-49fa-83dc-82006a843805.jpg?operations=fit(1042:)'},
    { id: 3, name: 'Kim Soo Hyun', tag: 'Hallyuwood Actor', imageUrl: 'https://www.90daykorean.com/wp-content/webp-express/webp-images/uploads/2019/07/IqFjJrXCR_8MQ3uYAnWOH-YLRPHU-1024x683-min-768x512-min.jpg.webp' },
    { id: 4, name: 'Genevieve Nnaji', tag: 'Nollywood Actress', imageUrl: 'https://cdn.pmnewsnigeria.com/2021/05/Veteran-Nollywood-Actress-Genevieve-Nnaji-1-e1620807350197.jpg'},
    { id: 5, name: 'Soo Ji Sub', tag: 'Hallyuwood Actor', imageUrl: 'https://www.90daykorean.com/wp-content/webp-express/webp-images/uploads/2021/01/So_Ji-sub-min.jpg.webp' },
    { id: 6, name: 'Lateef Adedimaji', tag: 'Nollywood Actor', imageUrl: 'https://image.api.sportal365.com/process//smp-images-production/pulse.ng/27122024/4822f805-625e-40a0-aa24-f4f2931a3b80.jpg?operations=fit(1042:)'},
    { id: 7, name: 'Lee Jong Suk', tag: 'Hallyuwood Actor', imageUrl: 'https://www.90daykorean.com/wp-content/webp-express/webp-images/uploads/2019/07/884eff572d154a8c808930bba89cc3be.jpeg.webp' },
    { id: 8, name: 'Ji Chang Wook', tag: 'Hallyuwood Actor', imageUrl: 'https://www.90daykorean.com/wp-content/uploads/2019/07/Ji-Chang-Wook-768x512.jpeg' },
    { id: 9, name: 'Kim Woo Bin', tag: 'Hallyuwood Actor', imageUrl: 'https://www.90daykorean.com/wp-content/uploads/2019/07/kim-woo-bin-min.jpg' },
    
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
              <p className="actor-name" style={{ fontWeight: 'bold'}}>{actor.name}</p>
              <p className="actor-name" style={{ marginTop: '-10px', fontSize: '12px'}}>{actor.tag}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularActorsCarousel;

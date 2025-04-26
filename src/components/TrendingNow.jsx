import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/Main.css';
import useFetchMovies from '../hooks/useFetchMovies'; // adjust path if needed

const TrendingNowCarousel = () => {
  const { movies, loading } = useFetchMovies();

  const trendingMovies = movies.filter(movie => movie.trending === true);

  if (loading) {
    return <div>Loading trending movies...</div>;
  }

  if (trendingMovies.length === 0) {
    return <div>No trending movies found.</div>;
  }

  return (
    <div className="trending-now-carousel">
      <h2 className="section-title">Trending Now</h2>
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
        {trendingMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="movie-card">
              <img
                src={movie.thumbnailUrl}
                alt={movie.title}
                className="movie-image"
              />
              <p className="movie-title">{movie.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingNowCarousel;

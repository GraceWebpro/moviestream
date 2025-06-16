import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/Main.css';
import useFetchMovies from '../hooks/useFetchMovies'; // adjust path if needed
import { Link } from 'react-router-dom';

const NewRelease = () => {
  const { movies, loading } = useFetchMovies();

  const newReleaseMovies = movies.filter(movie => movie.newRelease === true);

  if (loading) {
    return <div>Loading trending movies...</div>;
  }

  if (newReleaseMovies.length === 0) {
    return <div>No trending movies found.</div>;
  }

  return (
    <div className="trending-now-carousel">
      <h2 className="section-title">New Release</h2>
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
        {newReleaseMovies.map((movie) => (
          <SwiperSlide key={movie.id} style={{ color: 'var(--accent-color)'}}>
            
            <div className="movie-card">
            <Link to={`/movies/${movie.slug}`}>
              <img
                src={movie.thumbnailUrl}
                alt={movie.title}
                className="movie-image"
              />
             <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year-genre">
            {movie.releaseYear} • {movie.category}
          </p>
          <p className="movie-year-genre">
            {movie.status}
          </p>
          {movie.rating && (
            <p className="movie-rating">⭐ {movie.rating}/10</p>
          )}
        </div>
        </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewRelease;

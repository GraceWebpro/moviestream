import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../../styles/Main.css';
import { Link } from 'react-router-dom';
import useFetchMusic from '../../../hooks/useFetchMusic';

const LatestUpload = () => {
  const { musics, loading } = useFetchMusic();

  const latestUpload = [...musics]
  .filter(music => music.createdAt) // Ensure timestamp exists
  .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds) // Sort by most recent
  .slice(0, 5); // Take top 5 recent items (you can change this number)


  if (loading) {
    return <div>Loading latest musics...</div>;
  }

  if (latestUpload.length === 0) {
    return <div>No trending movies found.</div>;
  }

  return (
    <div className="trending-now-carousel">
      <h2 className="section-title">Latest Upload</h2>
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
        {latestUpload.map((music) => (
          <SwiperSlide key={music.id}>
            
            <div className="music-card">
            <Link to={`/music/${music.id}`}>
              <img
                src={music.coverImageUrl}
                alt={music.title}
                className="movie-image"
              />
             <div className="movie-info">
          <h3 className="movie-title">{music.title}</h3>
          <p className="movie-year-genre">
           {music.artist}
          </p>
          <p className="movie-year-genre">
            {music.genre}
          </p>
       
        </div>
        </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LatestUpload;

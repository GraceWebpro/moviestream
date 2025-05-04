import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../../styles/Main.css';
import { Link } from 'react-router-dom';
import useFetchMusic from '../../../hooks/useFetchMusic';


const Album = () => {
  const { musics, loading } = useFetchMusic();

  const albums = musics.filter(music => music.album === true);

  if (loading) {
    return <div>Loading albums...</div>;
  }

  if (albums.length === 0) {
    return <div>No album found.</div>;
  }

  return (
    <div className="trending-now-carousel">
      <h2 className="section-title">Albums</h2>
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
        {albums.map((music) => (
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

export default Album;

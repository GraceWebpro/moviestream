import React from 'react';
import Slider from "react-slick";
import '../../../styles/Main.css';

const HeroPoster = () => {
  const movies = [
    "https://image.tmdb.org/t/p/original/8I37NtDffNV7AZlDa7uDvvqhovU.jpg",
    "https://media.themoviedb.org/t/p/w500_and_h282_face/2kmVjjuAJqx7SQwMLHgkWCCHVSi.jpg",
    "https://media.themoviedb.org/t/p/w500_and_h282_face/pj3zCnPXI5Bh3lblZAgfzWUAn5v.jpg",
    
  ];

  const settings = {
    autoplay: true,         // Enable automatic sliding
    autoplaySpeed: 2000,    // Set slide speed (in milliseconds)
    infinite: true,         // Infinite loop
    speed: 500,             // Transition speed
    slidesToShow: 1,        // Number of genres to display at once
    slidesToScroll: 1,      // Scroll one genre at a time
  };

  return (
    <div className="genre-slider-container">
      <Slider {...settings}>
        {movies.map((genre, index) => (
          <div key={index} className="hero-slide">
            <img src={genre} alt='genre' />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroPoster;

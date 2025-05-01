import React from 'react';
import Slider from "react-slick";
import '../styles/Main.css';

const MovieGenreSlider = () => {
  const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Fantasy",
    "Thriller",
    "History",
    "Family"
  ];

  const settings = {
    autoplay: true,         // Enable automatic sliding
    autoplaySpeed: 2000,    // Set slide speed (in milliseconds)
    infinite: true,         // Infinite loop
    speed: 500,             // Transition speed
    slidesToShow: 8,        // Number of genres to display at once
    slidesToScroll: 1,      // Scroll one genre at a time
    responsive: [
      {
        breakpoint: 1024,  // For tablets and above
        settings: {
          slidesToShow: 6
        }
      },
      {
        breakpoint: 992,  // For mobile devices
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 768,  // For mobile devices
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 555,  // For mobile devices
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint:470,  // For mobile devices
        settings: {
          slidesToShow: 3
        }
      }
    ]
  };

  return (
    <div className="genre-slider-container">
      <Slider {...settings}>
        {genres.map((genre, index) => (
          <div key={index} className="genre-item">
            <span>{genre}</span>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieGenreSlider;

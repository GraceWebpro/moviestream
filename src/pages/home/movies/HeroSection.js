import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import "../../../styles/Main.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const q = query(collection(db, "movies"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const allMovies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Filter for movies with poster and take the first 7
      const posterMovies = allMovies.filter(
        movie => movie.heroPosterUrl
      ).slice(0, 15);

      setMovies(posterMovies);
    };

    fetchMovies();
  }, []);

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
  };

  return (
    <div className="hero-container">
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <div key={index} className="hero-slide">
            <img
              src={movie.heroPosterUrl || movie.thumbnailUrl}
              alt={movie.title}
            />
            <div className="hero-info">
              <div className="hero-title">{movie.title}</div>
              <div className="hero-buttons">
                <button className="play-btn">Watch Trailer</button>
                <button className="download-btn">Download</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;

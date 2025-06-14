import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import logo from '../../assets/logo.png';
import '../../styles/Main.css';

const FlashPage = () => {
  return (
    <div className="flashpage-container">
      {/* 🔗 SEO Metadata */}
      <Helmet>
        <title>PlayBox | Stream Movies & Music Instantly</title>
        <meta
          name="description"
          content="Welcome to PlayBox – your one-stop hub for movies and music. Instantly stream, discover, and enjoy entertainment on any device."
        />
        <meta
          name="keywords"
          content="movies, music, download, streaming, PlayBox, entertainment, free movies, free music"
        />
      </Helmet>

      <div className="flashpage-content">
        <div className="flash-logo-container">
          <div className="flash-logo-border">
            <img src={logo} alt="PlayBox" className="flash-logo-icon" />
          </div>
        </div>

        <div className="headline-container">
          <h1 className="headline">Welcome to PlayBox</h1>
          <p className="subheadline">Your one-stop hub for movies and music</p>
        </div>

        <div className="button-container">
          <Link to="/movie-homepage">
            <button className="btn-primary"><span>Movies</span></button>
          </Link>
          <Link to="/music-homepage">
            <button className="btn-secondary">Music</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlashPage;

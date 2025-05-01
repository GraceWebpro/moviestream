import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'

import '../../styles/Main.css'; // Make sure to create this CSS file for the styles

const FlashPage = () => {

  return (
    <div className="flashpage-container">
      <div className="flashpage-content">
        {/* Logo Container with Gradient Border */}
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
          {/* Use Link component to navigate to different routes */}
          <Link to="/movie-homepage">
            <button className="btn-primary">Movies</button>
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

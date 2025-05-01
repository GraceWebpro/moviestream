import React from 'react';
import '../../../styles/Music.css'; // Import the accompanying CSS file for styling

const HeroSection = () => {
  return (
    <div className="music-hero-container">
      <div className="music-hero-content">
        <h1 className="music-hero-title">Discover Your Next Favorite Tune</h1>
        <p className="music-hero-subtitle">Explore endless music genres, artists, and albums. Let the music take you on a journey.</p>
        <div className="music-hero-buttons">
          <button className="music-cta-button">Browse Music</button>
          <button className="music-cta-button secondary">Join Now</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

import React, { useState, useEffect } from 'react';
import './HeroCarousel.css'; // Import the CSS file

const items = [
  {
    title: "Unleash the Beat",
    subtitle: "Discover soundscapes that move your mind and body.",
    heroBg: "/images/bg2.jpg",
  },
  {
    title: "Feel Every Frequency",
    subtitle: "Let the rhythm guide you through every heartbeat.",
    heroBg: "/images/bg1.jpg",
  },
  {
    title: "Chill With Purpose",
    subtitle: "Relax and unwind with vibes crafted for the soul.",
    heroBg: "/images/bg3.jpg",
  },
  {
    title: "Dive Into The Vibe",
    subtitle: "Experience music the way it was meant to be heard.",
    heroBg: "/images/bg4.jpg",
  },
];


const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { title, subtitle, heroBg } = items[current];

  return (
    <section className="hero-section" style={{ backgroundImage: `url('${heroBg}')` }}>
      {/* Overlay */}
      <div className="hero-overlay">
        {/* Left: Static Slanted Image */}
        

        {/* Right: Main Content */}
        <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '2rem 2rem',
        borderRadius: '16px',
        maxWidth: '550px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ fontSize: '2.5rem' }}>{title}</h1>
        <p style={{ margin: '1rem 0' }}>{subtitle}</p>
        
        <div className="music-hero-buttons">
          <button className="music-cta-button">Browse Music</button>
          <button className="music-cta-button secondary">Join Now</button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default HeroCarousel;

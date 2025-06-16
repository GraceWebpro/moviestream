// HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.carousel}>
        <div style={{ ...styles.slide, ...styles.slide1 }}></div>
        <div style={{ ...styles.slide, ...styles.slide2 }}></div>
        <div style={{ ...styles.slide, ...styles.slide3 }}></div>
      </div>
      <div style={styles.overlay}>
        <button style={styles.button}>Browse Movies</button>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    position: 'relative',
    overflow: 'hidden',
    height: '80vh',
    width: '100%',
  },
  carousel: {
    display: 'flex',
    height: '100%',
    width: '300%',
    animation: 'slide 15s infinite',
  },
  slide: {
    flex: '1 0 100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  slide1: {
    backgroundImage: "url('https://media.themoviedb.org/t/p/w500_and_h282_face/4KHamTjwejO0eYvjLIQuMiNuYsX.jpg')",
  },
  slide2: {
    backgroundImage: "url('https://media.themoviedb.org/t/p/w500_and_h282_face/4ujt0hVOC5gOJBNYq2tgFa1ypNu.jpg')",
  },
  slide3: {
    backgroundImage: "url('https://media.themoviedb.org/t/p/w220_and_h330_face/q2IiPRSXPOZ6qVRj36WRAYEQyHs.jpg')",
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%', height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1.25rem',
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default HeroSection;

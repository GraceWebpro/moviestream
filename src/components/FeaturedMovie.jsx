import React from 'react';
import { motion } from 'framer-motion'; // for animations
import useFetchMovies from '../hooks/useFetchMovies'; // adjust path if needed
import '../styles/Main.css';
import { Link } from 'react-router-dom';

const FeaturedMovies = ({ movie }) => {
    const { movies, loading, error } = useFetchMovies();

    // 🔧 Slugify function
  const slugify = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');


    if (loading) return <p>Loading featured movies...</p>;
    if (error) return <p>Failed to load movies.</p>;
    console.log('All Movies:', movies);
    // Filter only the movies marked as featured
  const featuredMovies = movies.filter(movie => movie.featured === true);

  if (featuredMovies.length === 0) {
    return <p>No featured movies available.</p>;
  }

  // Main big movie = first featured movie
  const mainFeatured = featuredMovies[0];
  // Other movies for the grid
  const otherFeatured = featuredMovies.slice(1, 5);

  return (
    <section className="featured-section">
      <h2 className="featured-title section-title">Featured Movies</h2>
      <div className="movie-grid">
  {featuredMovies.slice(0, 5).map((movie, index) => (
    <motion.div 
      key={movie.id} 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="movie-card"
    >
      {/* ✅ Use slugified title here */}
      <Link to={`/movies/${movie.slug}`}>        
      <img 
          src={movie.thumbnailUrl} 
          alt={movie.title} 
          className="movie-thumbnail"
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year-genre">
            {movie.releaseYear} • {movie.category}
          </p>
          <p className="movie-year-genre">
            {movie.status}
          </p>
          {movie.rating && (
            <p className="movie-rating">⭐ {movie.rating}/10</p>
          )}
        </div>
      </Link>
    </motion.div>
  ))}
</div>

    </section>
  );
};

export default FeaturedMovies;

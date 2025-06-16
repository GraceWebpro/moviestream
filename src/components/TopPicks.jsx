import React from 'react';
import { motion } from 'framer-motion'; // for animations
import useFetchMovies from '../hooks/useFetchMovies'; // adjust path if needed
import '../styles/Main.css';
import { Link } from 'react-router-dom';


const TopPicks = () => {
    const { movies, loading, error } = useFetchMovies();

    if (loading) return <p>Loading featured movies...</p>;
    if (error) return <p>Failed to load movies.</p>;
    console.log('All Movies:', movies);
    // Filter only the movies marked as featured
  const topPicks = movies.filter(movie => movie.topPick === true);

  if (topPicks.length === 0) {
    return <p>No featured movies available.</p>;
  }

  
  return (
    <section className="top-picks-section">
      <div className="top-picks-header">
        <h2 className='section-title'>Top Picks</h2>
        <p>Handpicked favorites just for you</p>
      </div>
      <div className="movie-grid">
  {topPicks.slice(0, 5).map((movie, index) => (
    <motion.div 
      key={movie.id} 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="movie-card"
    >
      <Link to={`/movies/${movie.slug}`}> {/* Fix: use movie.id, not mainFeatured.id */}
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
}

export default TopPicks

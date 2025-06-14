import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/Main.css'; // You can style this separately

const SearchResultsPage = () => {
  const location = useLocation();
  const { results = [], query = '' } = location.state || {};

  return (
    <div className="search-results-page">
      <Helmet>
        <title>Search Results for "{query}" | PlayBox</title>
        <meta
          name="description"
          content={`Explore search results for "${query}" on PlayBox. Find movies that match your interest.`}
        />
      </Helmet>

      <div className="results-header">
        <h2>Search Results for: <span>"{query}"</span></h2>
        {results.length === 0 && <p className="no-results">No movies found matching your search.</p>}
      </div>

      <div className="results-list">
        {results.map((movie) => (
          <Link to={`/movies/${movie.id}`} className="result-card" key={movie.id}>
            <img src={movie.thumbnailUrl || '/default-poster.jpg'} alt={movie.title} />
            <div className="movie-info">
              <h4>{movie.title}</h4>
              <p>{movie.genre}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;

import useFetchMovies from '../../../hooks/useFetchMovies';
import MovieCard from '../../../components/MovieCard';
import '../../../styles/Main.css';

const HomeMovieList = () => {
  const { movies, loading } = useFetchMovies();

  if (loading) return <p>Loading movies...</p>;

  return (
    <div className="home-page">
      <h2>Latest Movies</h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomeMovieList;

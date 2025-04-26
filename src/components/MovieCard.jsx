import '../styles/Main.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.thumbnailUrl} alt={movie.title} />
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;

import '../styles/Main.css';
import { Link } from 'react-router-dom'; // Import Link component from React Router

const MovieCard = ({ movie }) => {
  console.log('Movie ID:', movie.id); // Add this to debug
  
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link"> {/* Add Link here */}
      <div className="movie-card">
        <img src={movie.thumbnailUrl} alt={movie.title} />
        <h3>{movie.title}</h3>
      </div>
    </Link>
  );
};

export default MovieCard;

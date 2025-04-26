// MoviesPage.js
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase"; // Import Firebase configuration
import { collection, query, where, getDocs } from "firebase/firestore";
import "../styles/MoviesPage.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedTag = searchParams.get("category"); // Using 'category' as the query parameter for filtering by tag

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const moviesCollection = collection(db, "movies");

      // Query Firestore to filter movies by tags
      const q = query(moviesCollection, where("tags", "array-contains", selectedTag));

      try {
        const querySnapshot = await getDocs(q);
        const movieList = querySnapshot.docs.map((doc) => doc.data());
        setMovies(movieList);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedTag) {
      fetchMovies();
    }
  }, [selectedTag]);

  return (
    <div className="movies-page">
      <h1>{selectedTag} Movies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movies-list">
          {movies.map((movie, index) => (
            <div key={index} className="movie-card">
              <img src={movie.image} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;

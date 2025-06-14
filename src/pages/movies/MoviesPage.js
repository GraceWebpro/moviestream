import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import '../../styles/Main.css';
import { Helmet } from "react-helmet";

const categories = [
  { name: "Action" },
  { name: "Comedy" },
  { name: "Drama" },
  { name: "Sci-Fi" },
  { name: "Romance" },
  { name: "Thriller" },
];

const MoviesPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("relevant");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFromURL = searchParams.get("category");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoryFromURL && !selectedCategories.includes(categoryFromURL)) {
      setSelectedCategories([categoryFromURL]);
    }
  }, [categoryFromURL]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      const moviesCollection = collection(db, "movies");
      let q = query(moviesCollection);

      if (selectedCategories.length > 0) {
        q = query(q, where("tags", "array-contains-any", selectedCategories));
      }

      try {
        const querySnapshot = await getDocs(q);
        const movieList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMovies(movieList);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedCategories]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((cat) => cat !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const sortedMovies = movies.sort((a, b) => {
    if (sortOption === "popular") {
      return b.popularity - a.popularity;
    }
    if (sortOption === "new") {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    }
    return 0;
  });

  // 🔍 Dynamic SEO Text
  const pageTitle = selectedCategories.length > 0
    ? `${selectedCategories.join(", ")} Movies | Movie Collection`
    : "All Movies | Movie Collection";

  const pageDescription = selectedCategories.length > 0
    ? `Browse popular ${selectedCategories.join(", ")} movies. Stream, sort, and download movies in your favorite genres.`
    : "Discover the full movie collection. Browse by category, popularity, or release date.";

  return (
    <div className="movies-page">
      {/* 🔗 SEO Metadata */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="movies, download, genres, latest, free, stream, action, drama, comedy, thriller" />
      </Helmet>

      <div className="movie-hero-section">
        <div className="movie-hero-content">
          <h1>Discover Movies</h1>
          <p>Browse through the movies. Use filters or sort options to find what you need!</p>
          <h4>
            {selectedCategories.length > 0
              ? `${selectedCategories.join(", ")} Movies`
              : "All Movies"}
          </h4>
        </div>
      </div>

      <div className="template-actions">
        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="sort-dropdown">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Relevant</option>
            <option value="popular">Popular</option>
            <option value="new">New</option>
          </select>
        </div>
      </div>

      <div className={`template-content ${showFilters ? 'with-filters' : 'no-filters'}`}>
        {showFilters && (
          <aside className="filters">
            <h3>Categories</h3>
            {categories.map((category) => (
              <label key={category.name} className="category-item">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                />
                <span>{category.name}</span>
              </label>
            ))}
          </aside>
        )}

        <div className="movie-grid">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : sortedMovies.length > 0 ? (
            sortedMovies.map((movie, index) => (
              <div key={index} className="movie-card">
                <Link to={`/movie/${movie.id}`}>
                  <img src={movie.thumbnailUrl} alt={movie.title} />
                  <div className="movie-info">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p className="movie-year-genre">
                      {movie.releaseYear} • {movie.category}
                    </p>
                    <p className="movie-year-genre">{movie.status}</p>
                    {movie.rating && (
                      <p className="movie-rating">⭐ {movie.rating}/10</p>
                    )}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;

// MusicPage.js
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import "../../styles/Main.css";

const genres = [
  { name: "Afrobeat" },
  { name: "Hip-Hop" },
  { name: "Pop" },
  { name: "Jazz" },
  { name: "R&B" },
  { name: "Rock" },
];

const MusicPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("relevant");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genreFromURL = searchParams.get("genre");

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (genreFromURL && !selectedGenres.includes(genreFromURL)) {
      setSelectedGenres([genreFromURL]);
    }
  }, [genreFromURL]);

  useEffect(() => {
    const fetchMusics = async () => {
      setLoading(true);
      setError(null);

      const musicsCollection = collection(db, "music");

      let q = musicsCollection;

      if (selectedGenres.length > 0) {
        q = query(musicsCollection, where("genre", "in", selectedGenres));
      }

      try {
        const querySnapshot = await getDocs(q);
        const musicList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMusics(musicList);
      } catch (err) {
        console.error("Error fetching music:", err);
        setError("Failed to fetch music.");
      } finally {
        setLoading(false);
      }
    };

    fetchMusics();
  }, [selectedGenres]);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre)
        ? prevSelected.filter((g) => g !== genre)
        : [...prevSelected, genre]
    );
  };

  const sortedMusics = musics.sort((a, b) => {
    if (sortOption === "popular") {
      return b.popularity - a.popularity;
    }
    if (sortOption === "new") {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    }
    return 0;
  });

  return (
    <div className="music-page">
      <div className="movie-hero-section">
        <div className="movie-hero-content">
          <h1>Discover Music</h1>
          <p>Browse and filter by genre or sort to find trending tracks!</p>
          <h4>
            {selectedGenres.length > 0
              ? `${selectedGenres.join(", ")} Music`
              : "All Music"}
          </h4>
        </div>
      </div>

      <div className="template-actions">
        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
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

      <div className={`template-content ${showFilters ? "with-filters" : "no-filters"}`}>
        {showFilters && (
          <aside className="filters">
            <h3>Genres</h3>
            {genres.map((genre) => (
              <label key={genre.name} className="category-item">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre.name)}
                  onChange={() => handleGenreChange(genre.name)}
                />
                <span>{genre.name}</span>
              </label>
            ))}
          </aside>
        )}

        <div className="music-grid">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : sortedMusics.length > 0 ? (
            sortedMusics.map((music, index) => (
              <div key={index} className="movie-card">
                <Link to={`/music/${music.id}`}>
                  <img src={music.coverImageUrl} alt={music.title} />
                  <div className="movie-info">
                    <h3 className="movie-title">{music.title}</h3>
                    <p className="movie-year-genre">{music.artist}</p>
                    <p className="movie-year-genre">{music.genre}</p>
                    {music.rating && (
                      <p className="movie-rating">⭐ {music.rating}/10</p>
                    )}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No music found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;

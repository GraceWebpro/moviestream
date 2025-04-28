// AnalyticsPage.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig'; // Assuming you use Firebase
import { collection, getDocs } from 'firebase/firestore';

const AnalyticsPage = () => {
  const [totalMovies, setTotalMovies] = useState(0);
  const [featuredMovies, setFeaturedMovies] = useState(0);
  const [topPickMovies, setTopPickMovies] = useState(0);
  const [newReleaseMovies, setNewReleaseMovies] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetching the movies data
        const moviesCollection = collection(db, 'movies');
        const movieSnapshot = await getDocs(moviesCollection);
        const movies = movieSnapshot.docs.map(doc => doc.data());

        // Calculating the statistics
        setTotalMovies(movies.length);
        setFeaturedMovies(movies.filter(movie => movie.Featured).length);
        setTopPickMovies(movies.filter(movie => movie.topPick).length);
        setNewReleaseMovies(movies.filter(movie => movie.newRelease).length);
        setTrendingMovies(movies.filter(movie => movie.trending).length);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="analytics-page">
      <h2>Movie Analytics</h2>

      <div className="analytics-stats">
        <div className="stat-item">
          <h3>Total Movies</h3>
          <p>{totalMovies}</p>
        </div>
        <div className="stat-item">
          <h3>Featured Movies</h3>
          <p>{featuredMovies}</p>
        </div>
        <div className="stat-item">
          <h3>Top Pick Movies</h3>
          <p>{topPickMovies}</p>
        </div>
        <div className="stat-item">
          <h3>New Release Movies</h3>
          <p>{newReleaseMovies}</p>
        </div>
        <div className="stat-item">
          <h3>Trending Movies</h3>
          <p>{trendingMovies}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

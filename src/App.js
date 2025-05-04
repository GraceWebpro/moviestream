import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/home/movies/MovieHome';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/Main.css';
import MoviesPage from './pages/movies/MoviesPage';
import AdminLogin from './admin/AdminLogin';
import AdminRegister from './admin/AdminRegister';
import ProtectedRoute from './firebase/protedtedRoute';
import AdminDashboard from './admin/AdminDashboard';
import MovieDetails from "./pages/movies/MovieDetails";
import EpisodePage from "./pages/movies/EpisodePage";
import HowTo from "./pages/movies/HowTo";
import About from "./pages/about/About";
import FlashPage from "./pages/flashScreen/FlashPage";
import MusicHomepage from "./pages/home/music/MusicHomepage";
import MusicPage from "./pages/music/MusicPage";
import MusicDetails from "./pages/music/MusicDetail";
//import EpisodeDownload from "./pages/movies/EpisodeDownload";

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Determine if the current route is for the admin page
  const isAdminPage = location.pathname.startsWith('/admin');

  // Determine if the current route is for the flash page
  const isFlashPage = location.pathname === "/";

  return (
    <ThemeProvider>

      {!isFlashPage && !isAdminPage && <Navbar />}
        <Routes>
          <Route eaxct path="/" element={<FlashPage />} />
          <Route path="/movie-homepage" element={<Home />} />
          <Route path="/music-homepage" element={<MusicHomepage />} />

          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/songs" element={<MusicPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/music/:id" element={<MusicDetails />} />

          {/*<Route path="/movie/:movieId/episode/:episodeNumber" component={EpisodePage} />*/}
          <Route path="/movie/:title/:episodeNumber" element={<EpisodePage />} />
          <Route path='/how-to-download' element={<HowTo />} />

          {/* Admin Routes */}
          <Route path='/admin/login' element={<AdminLogin onUserChange={setUser} />} />   
          <Route path="/admin/register" element={<AdminRegister />} />       
          {/*<Route path="/movie/:title/episode/:episodeNumber" element={<EpDownload />} />*/}
          
          {/* Protected Admin Dashboard */}
          <Route path="/admin/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />

          
          {/* Redirect to home for unmatched routes */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
        {!isFlashPage && !isAdminPage && <Footer />}
 
    </ThemeProvider>
  );
}

export default App;

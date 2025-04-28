import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/home/Home';
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
//import EpisodeDownload from "./pages/movies/EpisodeDownload";

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Determine if the current route is for the admin page
  const isAdminPage = location.pathname.startsWith('/admin');
  const isTemplatePage = location.pathname.startsWith("/templates");

  return (
    <ThemeProvider>

  
      {!isAdminPage && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          {/*<Route path="/movie/:movieId/episode/:episodeNumber" component={EpisodePage} />*/}
          <Route path="/movie/:title/episode/:episodeNumber" element={<EpisodePage />} />
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
        {!isAdminPage && <Footer />}
 
    </ThemeProvider>
  );
}

export default App;

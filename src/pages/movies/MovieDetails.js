import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig'; // Import from the updated firebase setup
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, collection, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import Image from '../../assets/Dramakey-ad.jpeg';
import { ref, getStorage, getDownloadURL } from 'firebase/storage';
import CommentSection from '../../components/comment/Comment';
import { TbLetterI, TbLetterISmall } from 'react-icons/tb';
import { AiFillQuestionCircle } from 'react-icons/ai';
import Search from '../../components/search/Search'
import { fetchSimilarMovies } from './SimilarMovoie';
import { IoIosArrowForward } from 'react-icons/io';
import '../../styles/Main.css'
import { motion } from 'framer-motion'; // for animations
import { Helmet } from 'react-helmet';




const MovieDetail = () => {
  const { slug } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);
  const storage = getStorage();

  const [showNotice, setShowNotice] = useState(true);
  const navigate = useNavigate();

    const handleCancel = () => {
        setShowNotice(false);
    };

    const handleMovieClick = (movieId) => {
      navigate(`movies/${movieId}/episode`);
    };
  
  


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        console.log("Fetching movie with ID:", slug); // Log the ID

        const q = query(collection(db, 'movies'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0];
          const movieData = docSnapshot.data();
          const movieId = docSnapshot.id;
          setMovie({ ...movieData, id: movieId });
        
          const episodesRef = collection(db, 'movies', movieId, 'episodes');
          const qEpisodes = query(episodesRef, orderBy('episodeNumber', 'asc'));
          const episodesSnapshot = await getDocs(qEpisodes);
          const episodeList = episodesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setEpisodes(episodeList);
        
          const similar = await fetchSimilarMovies(movieData.tags, movieId);
          setSimilarMovies(similar);
        } else {
          console.error("No movie found with that slug.");
          setMovie(null);
        }
      } catch (error) {
        console.error("Error fetching movie: ", error);
        setMovie(null); // Handle errors by setting movie to null
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [slug]);

  const downloadEpisode = async (episodeNumber) => {
    try {
      const episode = episodes[episodeNumber];
      const videoRef = ref(storage, episode.videoUrl);
      const downloadUrl = await getDownloadURL(videoRef);

      window.location.href = downloadUrl;
    } catch (error) {
      console.error('Error downloading episode:', error.message);
    }
  }

  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

const cast = movie.cast || [];
const tags = movie.tags || [];

const getYouTubeId = (url) => {
  const match = url?.match(
    /(?:youtube\.com.*(?:\/|v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};



  return (
    <>
      <Helmet>
        <title>{movie.title} - Watch & Download | PlayBox</title>
        <meta name="description" content={`Watch and download ${movie.title}, a ${movie.category} movie released in ${movie.releaseYear}.`} />
        <meta name="keywords" content={`download ${movie.title}, ${movie.category}, ${movie.tags?.join(', ')}`} />
      </Helmet>

<div className='center' style={{ paddingLeft: '0px', paddingRight: '0px'}}>

      
      <div className="movie-hero-section" style={{ marginTop: '80px'}}>
        <div className="movie-hero-content">
          <h1>Explore This Movie</h1>
          <p>Dive into the story, watch episodes, and enjoy everything this movie offers!</p>
          <h4>{movie.title}</h4>
        </div>
      </div>

      <Search />
      <div className='mov-det-flex'>
        <div className='detail-left'>
          <div className='content'>
          <Helmet>
  <title>{movie.title} - Watch & Download | MovieStream</title>
  <meta name="description" content={`Watch and download ${movie.title}, a ${movie.category} movie released in ${movie.releaseYear}.`} />
  <meta name="keywords" content={`download ${movie.title}, ${movie.category}, ${movie.tags?.join(', ')}`} />
</Helmet>
            <p className='p-title'>Download Korean {movie.title} ({movie.category})</p>
            <img src={movie.thumbnailUrl} alt={movie.title} style={{ width: '250px', height: '320px' }} />
            
            {movie.trailerUrl && (
            <div className="trailer-section" style={{ marginTop: '30px', alignSelf: 'flex-start' }}>
              <h3>Watch Trailer</h3>
              {getYouTubeId(movie.trailerUrl) ? (
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${getYouTubeId(movie.trailerUrl)}`}
                  title="YouTube Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: '10px', marginTop: '10px', maxWidth: '100%' }}
                ></iframe>
              ) : (
                <video
                  width="100%"
                  height="400"
                  controls
                  style={{ borderRadius: '10px', marginTop: '10px', maxWidth: '100%' }}
                >
                  <source src={movie.trailerUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}

            <div className='flex' style={{ alignSelf: 'flex-start', display: 'flex', alignSelf: 'flex-start', marginTop: '30px' }}>
              <h4>TAGS : {movie.tags.length > 0 ? tags.join(', ') : 'No tags information available'}</h4>
            </div>

            <div style={{ alignSelf: 'flex-start' }}>
              <h3>Synopsis</h3>
              <p className='cont-p'>{movie.description}</p>
            </div>

            <div className='flex' style={{ alignSelf: 'flex-start', display: 'flex' }}>
              <h3>Cast :{''} <span style={{ color: 'orange' }}> {movie.cast.length > 0 ? cast.join(', ') : 'No cast information available'} </span></h3>
            </div>

            <div className='flex' style={{ alignSelf: 'flex-start', display: 'flex' }}>
              <h3>Status : ongoing</h3>
            </div>

            <div className='flex' style={{ alignSelf: 'flex-start', display: 'flex' }}>
              <h3>Year : 2024</h3>
            </div>

            <div className="notice-section">
              <div className='left'>
                <p style={{ fontSize: '18px', fontWeight: '700'}}>Download Size</p>
                <p style={{ fontSize: '15px', marginTop: '10px' }}>These videos are around 130 MB</p>
              </div>
            </div>

            <h3 style={{ marginTop: '20px', justifyContent: 'center' }}>Download link for {movie.title} ({movie.category})</h3>
        
            <Link to='/how-to-download' style={{ alignSelf: 'flex-start', marginTop: '30px' }}><button className='card-btn'><AiFillQuestionCircle /> How To Download</button></Link>
        
            <h3 style={{ alignSelf: 'flex-start' }}>Episodes</h3>

            {showNotice && (
                <div className="notice-section">
                  <div className='left'>
                    <p>Notice:</p>
                    <p>Video is encoded in x265 and it may not play on some phones without VLC or MX video player. It might not play on some TVs.</p>
                  </div>
                  <button onClick={handleCancel} className="cancel-n-btn" style={{ marginTop: '-45px', color: '#fff'}}>x</button>
                </div>
            )}
            <ul style={{ alignSelf: 'flex-start' }}>
              {episodes.map((episode) => (
              <li key={episode.id}>
                  <h3>Episode {episode.episodeNumber}</h3>
                  <Link to={`/movies/${movie.slug}/${episode.episodeNumber}?videoUrl=${encodeURIComponent(episode.videoUrl)}&thumbnailUrl=${encodeURIComponent(movie.thumbnailUrl)}`}>

                  <button className='card-btn' style={{ marginTop: '10px' }}>Download Episode</button>
                  </Link>
              </li>
              ))}
            </ul>
          </div>
        </div>

        
        <CommentSection movieId={movie.id} />
        
      </div>

      <div className='detail-bottom'>
          <div style={{ alignSelf: 'flex-start', marginTop: '20px' }}>
            <h3 style={{ fontSize: '18px', opacity: '90%' }}><IoIosArrowForward style={{ color: 'var(--first-color)'}}/>YOU MIGHT ALSO LIKE</h3>
          
            {similarMovies.length > 0 ? (
            <div className="movie-grid">
              {similarMovies.slice(0, 5).map((movie, index) => (
                <motion.div 
                  key={movie.id} 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="movie-card"
                >
                <Link to={`/movies/${movie.slug}`}>
                  <img 
                    src={movie.thumbnailUrl} 
                    alt={movie.title} 
                    className="movie-thumbnail"
                  />
                  <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year-genre">
            {movie.releaseYear} • {movie.category}
          </p>
          <p className="movie-year-genre">
            {movie.status}
          </p>
          {movie.rating && (
            <p className="movie-rating">⭐ {movie.rating}/10</p>
          )}
        </div>
                  </Link>
                </motion.div>
              ))}
      </div>
            ): (
              <p>No similar movies found.</p>
            )}
          </div>

      

          

          <div className="disclaimer-section">
            <p style={{ display: 'flex', color: 'var(--first-color)', fontWeight: 'bold' }}>| Disclaimer</p>
            <p style={{ fontSize: '15px', marginLeft: '10px' }}>Moviestream.com doees not claim ownership of any movie on this site. If your copyrighted material has been uploaded or links to your copyrighted material has been uploaded, kindly click here to file a take down notice.</p>
          </div>
          <div style={{ marginTop: '60px', height: '100px', backgroundColor: 'black', opacity: '80%' }}>

          </div>
      </div>
    </div>
    </>
  );
};

export default MovieDetail;
//<button onClick={() => downloadEpisode(number)}>Download</button>

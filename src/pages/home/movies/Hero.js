import React, { useState }  from 'react'
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../../styles/Main.css'

const Hero = () => {
    const [showNotice, setShowNotice] = useState(true);

  const handleCloseNotice = () => setShowNotice(false);
  return (
    <section className="hero">
        
        {/* Notice Inside Hero */}
        {showNotice && (
          <div className="notice-banner">
            <div className="notice-content">
                <div className='notice-block'>
                    <p className="notice-text">🎉 Welcome to our movie site! New movies are added every week. Stay tuned!</p>
                    <p className="notice-text p2">Join our telegram channel to receive live updates and be among the first to know once a movie is uploaded. You can also use the chat box below for movie requests, suggestions and feedback ❤️. Most importantly please stay safe 🤗🤗.</p>
                </div>
              <button className="close-btn" onClick={handleCloseNotice}>X</button>
            </div>
          </div>
        )}

        <div className="hero-content">
          <h1>Unlimited Movies, TV Shows, and More</h1>
          <p>Stream and download your favorite movies anytime, anywhere.</p>
          <Link to="/movies">
            <button className="movies-btn">Browse Movies</button>
          </Link>

        </div>
    </section>
  )
}

export default Hero

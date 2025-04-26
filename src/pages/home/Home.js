import React from 'react'
import HomeMovieList from './HomeMovieList'
import Hero from './Hero';



const Home = () => {
    
    return (
        <div className='home-page'>

        {/* Notice Banner *
        {showNotice && (
            <div className="notice-banner">
            <p>🚨 Welcome to our new movie site! Stay tuned for updates.</p>
            <button className="close-btn" onClick={handleCloseNotice}>❌</button>
            </div>
        )}*/}

        <Hero />
        <HomeMovieList />
        </div>
    )
}

export default Home

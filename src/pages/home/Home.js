import React from 'react'
import HomeMovieList from './HomeMovieList'
import Hero from './Hero';
import MovieGenreSlider from '../../components/MovieGenreSlider';
import CategoriesSection from './Categories';



const Home = () => {
    
    return (
        <div className='home-page'>
            <Hero />
            <MovieGenreSlider />
            <CategoriesSection />
            <HomeMovieList />
        </div>
    )
}

export default Home

import React from 'react'
import HomeMovieList from './HomeMovieList'
import Hero from './Hero';
import MovieGenreSlider from '../../components/MovieGenreSlider';
import CategoriesSection from './Categories';
import FeaturedMovies from '../../components/FeaturedMovie';
import TopPicks from '../../components/TopPicks';
import PopularActors from '../../components/PopularActors';
import TrendingNowCarousel from '../../components/TrendingNow';
import NewRelease from '../../components/NewRelease';
import Subscribe from '../../components/Subscribe';
import HomeContact from './HomeContact';
import Search from '../../components/search/Search';



const Home = () => {
    
    return (
        <div className='home-page'>
            <Hero />
            <MovieGenreSlider />
            <Search />
            <NewRelease />
            <CategoriesSection />
            <FeaturedMovies />
            <TopPicks />
            <PopularActors />
            <TrendingNowCarousel />
            <HomeContact />
            <Subscribe />
           
        </div>
    )
}

export default Home

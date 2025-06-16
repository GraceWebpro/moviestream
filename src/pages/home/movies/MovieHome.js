import React from 'react'
//import Hero from './Hero';
import MovieGenreSlider from '../../../components/MovieGenreSlider';
import CategoriesSection from './Categories';
import FeaturedMovies from '../../../components/FeaturedMovie';
import TopPicks from '../../../components/TopPicks';
import PopularActors from '../../../components/PopularActors';
import TrendingNowCarousel from '../../../components/TrendingNow';
import NewRelease from '../../../components/NewRelease';
import Subscribe from '../../../components/Subscribe';
import HomeContact from './HomeContact';
import Search from '../../../components/search/Search';
import { Helmet } from 'react-helmet';
import HomeFAQ from '../HomeFAQ';
//import HeroSection from './Hero1';
import HeroSection from './HeroSection';
import HeroPoster from './HeroPoster';



const Home = () => {
    
    return (
        <div className='home-page'>
            <Helmet>
                <title>Movie Homepage - Stream and Download the Latest Movies | PlayBox</title>
                <meta
                    name="description"
                    content="Browse and download the latest, trending, and classic movies across all genres. Stream directly or download in high quality on PlayBox."
                />
                <meta
                    name="keywords"
                    content="movies, latest movies, download movies, stream movies, trending films, movie collection"
                />
            </Helmet>

            <HeroSection />
            <MovieGenreSlider />
            <Search />
            <NewRelease />
            <CategoriesSection />
            <FeaturedMovies />
            <TopPicks />
            <PopularActors />
            <TrendingNowCarousel />
            <HomeFAQ />
            <HomeContact />
            <Subscribe />
           
        </div>
    )
}

export default Home

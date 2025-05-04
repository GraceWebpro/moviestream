import React from 'react'
import HeroCarousel from './Hero'
import SearchMusic from './Search'
import TrendingNowCarousel from './TrendingNow'
import Genre from './Genre'
import LatestUpload from './LatestUploads'
import HomeContact from '../movies/HomeContact'
import Subscribe from '../../../components/Subscribe'
import Album from './Album'
import DjMix from './DjMix'


const MusicHomepage = () => {
  return (
    <div>
      <HeroCarousel />
      <SearchMusic />
      <LatestUpload />
      <Genre />
      <TrendingNowCarousel />
      <Album />
      <DjMix />
      <HomeContact />
      <Subscribe />
    </div>
  )
}

export default MusicHomepage

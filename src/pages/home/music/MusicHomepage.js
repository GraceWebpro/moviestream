import React from 'react';
import { Helmet } from 'react-helmet';

import HeroCarousel from './Hero';
import SearchMusic from './Search';
import TrendingNowCarousel from './TrendingNow';
import Genre from './Genre';
import LatestUpload from './LatestUploads';
import HomeContact from '../movies/HomeContact';
import Subscribe from '../../../components/Subscribe';
import Album from './Album';
import DjMix from './DjMix';
import HomeFAQ from '../HomeFAQ';

const MusicHomepage = () => {
  return (
    <div>
      <Helmet>
        <title>Music - PlayBox</title>
        <meta name="description" content="Discover and download the latest music, DJ mixes, albums, and trending songs on PlayBox. No account needed." />
        <meta name="keywords" content="music download, DJ mixes, trending songs, PlayBox music, free music" />
        <meta name="author" content="PlayBox Team" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="PlayBox - Free Music Downloads" />
        <meta property="og:description" content="Browse and download trending music, DJ mixes, and albums for free." />
        <meta property="og:image" content="https://yourdomain.com/your-music-preview-image.jpg" />
        <meta property="og:url" content="https://yourdomain.com/music-homepage" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:title" content="PlayBox - Free Music Downloads" />
        <meta name="twitter:description" content="Browse and download trending music, DJ mixes, and albums for free." />
        <meta name="twitter:image" content="https://yourdomain.com/your-music-preview-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <HeroCarousel />
      <SearchMusic />
      <LatestUpload />
      <Genre />
      <TrendingNowCarousel />
      <Album />
      <DjMix />
      <HomeFAQ />
      <HomeContact />
      <Subscribe />
    </div>
  );
};

export default MusicHomepage;

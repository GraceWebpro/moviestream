import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';

const EpisodeDownload = () => {
  const { title, episodeNumber } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoUrl = queryParams.get('videoUrl');

  return (
    <div className="episode-page">
      <h3>{title} - Episode {episodeNumber}</h3>
      <a
        href={videoUrl}
        download={`${title}-${episodeNumber}.(MovieStream).mp4`}
        className="download-link"
      >
        <FaDownload /> Create Download Link
      </a>
    </div>
  );
};

export default EpisodeDownload;

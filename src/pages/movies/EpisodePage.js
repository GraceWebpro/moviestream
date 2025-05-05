import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';

const EpisodePage = () => {
  const { title, episodeNumber } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoUrl = queryParams.get('videoUrl');
  const thumbnailUrl = queryParams.get('thumbnailUrl'); // ✅ get thumbnail from URL

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const siteName = 'PlayBox';
  const paddedEpisode = episodeNumber.toString().padStart(2, '0');

  const getFileExtension = (url) => {
    const match = url.match(/\.(mp4|mkv|mov|avi|webm)(?=\?|$)/i);
    return match ? match[0] : '.mp4';
  };

  const handleDownload = () => {
    if (!videoUrl) {
      setError('No video URL available');
      return;
    }

    const fileExtension = getFileExtension(videoUrl);
    const fileName = `${title}-${paddedEpisode}(${siteName})${fileExtension}`;

    const anchor = document.createElement('a');
    anchor.href = videoUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
      <h2>{title} - Episode {paddedEpisode}</h2>

      {thumbnailUrl ? (
        
        <img
          src={thumbnailUrl}
          alt="Thumbnail"
          style={{
    width: '100%',  // Adjust the width
    height: 'auto', // Maintain aspect ratio
    maxWidth: '200px', // Maximum width
    borderRadius: '10px',
    marginTop: '1rem',
  }}
        />
      ) : (
        <p style={{ color: 'red' }}>No thumbnail available</p>
      )}

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleDownload}
          disabled={loading}
          className='download-btn'
          style={{
            backgroundColor: '#1db954',
            color: '#fff',
            padding: '15px 20px',
            fontSize: '18px',
            borderRadius: '8px',
            marginTop: '20px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            justifyContent: 'center',
          }}
        >
          {loading ? 'Downloading...' : <><FaDownload /> Download Episode</>}
        </button>
      </div>
    </div>
  );
};

export default EpisodePage;

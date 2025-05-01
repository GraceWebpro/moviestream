import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';

const EpisodePage = () => {
  const { title, episodeNumber } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoUrl = queryParams.get('videoUrl'); // Video URL passed via query params

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle video download
  const handleDownload = async () => {
    if (!videoUrl) {
      setError('No video URL available');
      return;
    }

    setLoading(true);

    try {
      // Fetch video data
      const response = await fetch(videoUrl);
      const blob = await response.blob();

      // Create a temporary anchor element to trigger the download
      const downloadLink = document.createElement('a');
      const fileName = `${title}-Episode-${episodeNumber}.mp4`; // Custom file name

      // Create a Blob URL and set it as href for the anchor
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = fileName; // Custom file name

      // Trigger download
      downloadLink.click();

      // Clean up the URL after download
      URL.revokeObjectURL(url);
    } catch (error) {
      setError('Error downloading the video');
      console.error('Error downloading the video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="download-page" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ marginTop: '300px', marginBottom: '20px', color: '#000' }}>
        {title} - Episode {episodeNumber}
      </h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        onClick={handleDownload}
        disabled={loading || !videoUrl}
        style={{
          backgroundColor: 'var(--first-color)',
          color: '#fff',
          padding: '15px 20px',
          fontSize: '18px',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      >
        {loading ? 'Downloading...' : <><FaDownload /> Download Video</>}
      </button>
    </div>
  );
};

export default EpisodePage;

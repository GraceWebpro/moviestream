import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { saveAs } from "file-saver";

const MusicDetails = () => {
  const { id } = useParams();
  const [music, setMusic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMusic = async () => {
      setLoading(true);
      try {
        const musicDoc = await getDoc(doc(db, "music", id));
        if (musicDoc.exists()) {
          setMusic({ id: musicDoc.id, ...musicDoc.data() });
        } else {
          setError("Music not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load music.");
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [id]);

  const handleDownload = async () => {
    if (!music.musicUrl) {
      alert("Invalid file URL.");
      return;
    }
  
    try {
      const response = await fetch(music.musicUrl);
      const blob = await response.blob();
      saveAs(blob, `${music.title}.mp3`);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download the file.");
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!music) return null;

  return (
    <div className="music-details-container">
        <h1>{music.title}</h1>
      <div className="music-cover">
        <img src={music.coverImageUrl} alt={music.title} />
      </div>
      <div className="music-info">
        
        <p><strong>Artist:</strong> {music.artist}</p>
        <p><strong>Genre:</strong> {music.genre}</p>
        <p><strong>Year:</strong> {music.releaseYear}</p>

        <audio controls style={{ width: "100%", marginTop: "20px" }}>
          <source src={music.musicUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <button onClick={handleDownload} className="download-btn">
          ⬇️ Download
        </button>
      </div>

      <style>
        {`
        .music-details-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30px;
            color: #fff;
            background-color: #111;
            border-radius: 10px;
          }
          
          .music-cover img {
            width: 300px;
            height: 300px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 20px;
          }
          
          .music-info {
            text-align: center;
          }
          
          .download-btn {
            display: inline-block;
            margin-top: 15px;
            padding: 12px 24px;
            background-color: #1db954;
            color: white;
            font-weight: bold;
            text-decoration: none;
            border-radius: 6px;
            transition: background-color 0.3s;
          }
          
          .download-btn:hover {
            background-color: #17a44b;
          }
          
        `}
      </style>
    </div>
  );
};

export default MusicDetails;

import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db, auth, storage } from '../firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const UploadEpisode = () => {
  const [movieId, setMovieId] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [file, setFile] = useState(null);
  const [movies, setMovies] = useState([]);
  //const [selectedMovieId, setSelectedMovieId] = useState(null);

  //const [videoUrl, setVideoUrl] = useState('');
  //const [duration, setDuration] = useState('');
  const [airDate, setAirDate] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const user = auth.currentUser; // Access user from context

  const movieCollectionRef = collection(db, 'movies')
  useEffect(() => {
    const fetchVideos = async () => {
      const q = query(movieCollectionRef);
      const querySnapshot = await getDocs(q);
      const videoList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(videoList);
    };

    fetchVideos();
  }, []);

  


  const adminName = user ? user.displayName || 'Admin' : 'Admin'; // Use displayName if available
  const adminInitial = adminName ? adminName[0] : ''; // Extract the first letter for initials


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !episodeNumber) {
      alert("Please select a video file and episode number to upload.");
      return;
    }
  
    const selectedMovie = movies.find(m => m.id === movieId);
    const movieTitle = selectedMovie?.title?.replace(/\s+/g, '.').toLowerCase() || 'movie';
  
    // ➕ Pad the episode number to 2 digits (e.g., 01, 02, ..., 10)
    const paddedEpisode = episodeNumber.toString().padStart(2, '0');
  
    // ➕ Use the padded number in the file name
    const customFileName = `${movieTitle}-episode-${paddedEpisode}-(PlayBox).mp4`;
    const renamedFile = new File([file], customFileName, { type: file.type });
  
    const videoRef = ref(storage, `videos/${customFileName}`);
    const uploadTask = uploadBytesResumable(videoRef, renamedFile);
  
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    }, (error) => {
      console.error('Error uploading video:', error);
    }, async () => {
      const videoUrl = await getDownloadURL(videoRef);
  
      try {
        const epCollRef = collection(db, `movies/${movieId}/episodes`);
        await addDoc(epCollRef, {
          episodeNumber: Number(episodeNumber),
          paddedEpisode: paddedEpisode, // ➕ Optionally store it for display or sorting
          airDate,
          videoUrl: videoUrl,
          createdAt: serverTimestamp(),
        });
  
        alert('Video uploaded successfully!');
        setEpisodeNumber('');
        setAirDate('');
        setFile(null);
        setUploadProgress(0);
      } catch (error) {
        console.error('Error saving video metadata:', error);
        alert("Error uploading video. Please try again.");
      }
    });
  };
  
  
  
  const getNextVideoNumber = async (episodeDocRef) => {
    const videoRef = collection(episodeDocRef, 'videos');
    const videoQuery = query(videoRef, orderBy('episodeNo', 'desc'), limit(1));

    const querySnapshot = await getDocs(videoQuery);
    if (querySnapshot.empty) {
      return 1;
    } else {
      const lastVideo = querySnapshot.docs[0];
      return lastVideo.data().episodeNo + 1;
    }
  };

  return (
    <div className='upload-container' style={{ color: '#000'}}>
     
     <h2>Upload New Episode</h2>
       
         
            <form onSubmit={handleSubmit}>
              
              <select value={movieId} onChange={(e) => setMovieId(e.target.value)} style={{ marginBottom: '10px', width: '50%', height: '30px'}} disabled={movieId}>
                <option value='' disabled>Select a movie</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.id}>{movie.title}</option>
                ))}
              </select>
              <label>
                Movie ID:
                <input type="text" className="input-field" value={movieId} onChange={(e) => setMovieId(e.target.value)} required />
              </label>
              <br />
              <label>
                Episode Number:
                <input type="number" className="input-field" value={episodeNumber} onChange={(e) => setEpisodeNumber(e.target.value)} required />
              </label>
              <br />
              
              <label>
                Video URL:
                <input type="file" className="input-field" accept="video/*" onChange={handleFileChange} required />
              </label>
              <br />
          
              <label>
                Air Date:
                <input type="date" className="input-field" value={airDate} onChange={(e) => setAirDate(e.target.value)} required />
              </label>
              <br />
              {uploadProgress > 0 && <p>Upload Progress: {Math.round(uploadProgress)}%</p>}

              <button type="submit" className="submit-btn">Add Episode</button>
            </form>
        
        
    </div>
  );
};

export default UploadEpisode;

import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, query, serverTimestamp } from 'firebase/firestore';
import { db, auth, storage } from '../firebase/firebaseConfig';

const UploadContent = () => {
  const [selectedMode, setSelectedMode] = useState('movie'); // 'movie', 'episode', or 'music'
  
  // Movie upload states
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState('');
  const [cast, setCast] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTopPick, setIsTopPick] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isNewRelease, setIsNewRelease] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Episode upload states
  const [movieId, setMovieId] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [file, setFile] = useState(null);
  const [airDate, setAirDate] = useState('');
  const [movies, setMovies] = useState([]);

  // Music upload states
  const [musicFile, setMusicFile] = useState(null);
  const [artist, setArtist] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [album, setAlbum] = useState(false);
  const [genre, setGenre] = useState('');
  const [trending, setTrending] = useState(false); // boolean
  const [isDjMix, setIsDjMix] = useState(false);

  const user = auth.currentUser;


  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };
  // Fetch movies for episode upload
  useEffect(() => {
    const fetchMovies = async () => {
      const q = query(collection(db, 'movies'));
      const querySnapshot = await getDocs(q);
      const movieList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(movieList);
    };

    fetchMovies();
  }, []);

  const handleFileChange = (e) => {
    console.log('File selected:', e.target.files[0]); // Check the file selected
    if (selectedMode === 'movie') {
      setThumbnailFile(e.target.files[0]);
    } else if (selectedMode === 'episode') {
      setFile(e.target.files[0]);
    } else if (selectedMode === 'music') {
      setMusicFile(e.target.files[0]);
    }
  };

  const handleMovieSubmit = async (e) => {
    e.preventDefault();
    if (!thumbnailFile) return;

    const thumbnailRef = ref(storage, `thumbnails/${thumbnailFile.name}`);
    const uploadTask = uploadBytesResumable(thumbnailRef, thumbnailFile);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    }, (error) => {
      console.error('Error uploading video:', error);
    }, async () => {
      const thumbnailURL = await getDownloadURL(thumbnailRef);

      try {
        const movieCollectionRef = collection(db, 'movies');
        await addDoc(movieCollectionRef, {
          title,
          description,
          releaseYear,
          status,
          category,
          tags: tags.split(',').map(name => name.trim()),
          cast: cast.split(',').map(name => name.trim()),
          thumbnailUrl: thumbnailURL,
          isFeatured,
          isTopPick,
          isTrending,
          isNewRelease,
          createdAt: serverTimestamp(),
        });
        alert('Movie uploaded successfully!');
        setTitle('');
        setDescription('');
        setCast('');
        setTags('');
        setCategory('');
        setReleaseYear('');
        setStatus('');
        setIsFeatured(false);
        setIsTopPick(false);
        setIsTrending(false);
        setIsNewRelease(false);
        setThumbnailFile(null);
        setUploadProgress(0);
      } catch (error) {
        console.error('Error saving video metadata:', error);
      }
    });
  };

  const handleEpisodeSubmit = async (e) => {
    e.preventDefault();
    if (!file || !episodeNumber) {
      alert("Please select a video file and episode number to upload.");
      return;
    }

    const selectedMovie = movies.find(m => m.id === movieId);
    const movieTitle = selectedMovie?.title?.replace(/\s+/g, '.').toLowerCase() || 'movie';
    const paddedEpisode = episodeNumber.toString().padStart(2, '0');
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
          paddedEpisode,
          airDate,
          videoUrl: videoUrl,
          createdAt: serverTimestamp(),
        });
        alert('Episode uploaded successfully!');
        setEpisodeNumber('');
        setAirDate('');
        setFile(null);
        setUploadProgress(0);
      } catch (error) {
        console.error('Error saving episode metadata:', error);
      }
    });
  };

  const handleMusicSubmit = async (e) => {
    e.preventDefault();
  
    // Validate all required fields
    if (!musicFile || !coverImage || !artist || !title) {
      alert('Please fill out all fields and select a music file and cover image.');
      return;
    }
  
    // Debugging: Check if the values are correct
    console.log({ musicFile, coverImage, artist, title });
  
    // Start uploading the cover image
    const coverRef = ref(storage, `covers/${coverImage.name}`);
    const coverUploadTask = uploadBytesResumable(coverRef, coverImage);
    
    coverUploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress); // Track progress for cover image upload
      },
      (error) => {
        console.error('Error uploading cover image:', error);
      },
      async () => {
        const coverImageUrl = await getDownloadURL(coverRef);
    
        // Start uploading the music file
        const musicRef = ref(storage, `music/${musicFile.name}`);
        const musicUploadTask = uploadBytesResumable(musicRef, musicFile);
    
        musicUploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress); // Track progress for music file upload
          },
          (error) => {
            console.error('Error uploading music file:', error);
          },
          async () => {
            const musicUrl = await getDownloadURL(musicRef);
    
            try {
              // Save metadata to Firestore
              const musicCollectionRef = collection(db, 'music');
              await addDoc(musicCollectionRef, {
                title,
                artist,
                genre,
                musicUrl,
                album,          // ✅ now included
                trending,
                isDjMix,
                coverImageUrl,
                createdAt: serverTimestamp(),
              });
              alert('Music uploaded successfully!');
    
              // Reset form fields
              setTitle('');
              setArtist('');
              setGenre('');
              setAlbum(false);           // ✅ reset album
              setTrending(false);
              setIsDjMix(false);  
              setMusicFile(null);
              setCoverImage(null);
              setUploadProgress(0);
            } catch (error) {
              console.error('Error saving music metadata:', error);
            }
          }
        );
      }
    );
  };
  
  

  return (
    <div className='upload-container' style={{ color: '#000'}}>
      <div className='mode-toggle'>
        <button onClick={() => setSelectedMode('movie')} className={selectedMode === 'movie' ? 'active' : ''}>Movie</button>
        <button onClick={() => setSelectedMode('episode')} className={selectedMode === 'episode' ? 'active' : ''}>Episode</button>
        <button onClick={() => setSelectedMode('music')} className={selectedMode === 'music' ? 'active' : ''}>Music</button>
      </div>

      {selectedMode === 'movie' && (
        <>
          <h2>Upload Movie</h2>
          <form onSubmit={handleMovieSubmit}>
            {/* Movie upload form fields */}
            <label>
              Title:
              <input
                type="text"
                placeholder="Movie title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </label>
            {/* Genre Dropdown */}
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Rock">K drama</option>
              <option value="Gospel">Nollywood</option>
              <option value="Pop">Bollywood</option>
              <option value="Hip Hop">Hollywood</option>
              <option value="Jazz">Chinese Cinema</option>
              <option value="Afrobeats">French Cinema</option>
              {/* Add more as needed */}
            </select>
            <label>
              Tags:
              <textarea
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
              />
            </label>
            <label>
              Cast:
              <textarea
                value={cast}
                onChange={(e) => setCast(e.target.value)}
                required
              />
            </label>
            <label>
              Status:
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
            </label>
            <label>
              Release Year:
              <input
                type="text"
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value)}
                required
              />
            </label>
            <label>
              Thumbnail Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </label>
            <button type="submit">Upload Movie</button>
          </form>
        </>
      )}

      {selectedMode === 'episode' && (
        <>
          <h2>Upload Episode</h2>
          <form onSubmit={handleEpisodeSubmit}>
            {/* Episode upload form fields */}
            <select value={movieId} onChange={(e) => setMovieId(e.target.value)} required>
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>{movie.title}</option>
              ))}
            </select>
            <label>
              Episode Number:
              <input
                type="number"
                value={episodeNumber}
                onChange={(e) => setEpisodeNumber(e.target.value)}
                required
              />
            </label>
            <label>
              Video URL:
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                required
              />
            </label>
            <label>
              Air Date:
              <input
                type="date"
                value={airDate}
                onChange={(e) => setAirDate(e.target.value)}
                required
              />
            </label>
            <button type="submit">Upload Episode</button>
          </form>
        </>
      )}

      {selectedMode === 'music' && (
        <>
          <h2>Upload Music</h2>
          <form onSubmit={handleMusicSubmit}>
            <label>
              Title:
              <input
                type="text"
                placeholder="Song title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label>
              Artist:
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
              />
            </label>
        
            {/* Album Checkbox */}
            <label>
            Album:
              <input
                type="checkbox"
                checked={album}
                onChange={(e) => setAlbum(e.target.checked)}
              />
              Mark as Album
            </label>
            <label>
            <input
              type="checkbox"
              checked={isDjMix}
              onChange={(e) => setIsDjMix(e.target.checked)}
            />
            DJ Mix
          </label>
          <label>
              Trending:
              <input
                type="checkbox"
                checked={trending}
                onChange={(e) => setTrending(e.target.checked)}
              />
              Mark as Trending
            </label>

            {/* Genre Dropdown */}
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="">Select Genre</option>
              <option value="Rock">Rock</option>
              <option value="Gospel">Gospel</option>
              <option value="Pop">Pop</option>
              <option value="Hip Hop">Hip Hop</option>
              <option value="Jazz">Jazz</option>
              <option value="Afrobeats">Afrobeats</option>
              {/* Add more as needed */}
            </select>
            {/* Trending Checkbox */}
            <br />
            <label>
              Music File:
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                required
              />
            </label>
            <label>
              Cover Image:
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleCoverImageChange}                
                required
              />
            </label>
            <button type="submit">Upload Music</button>
          </form>
        </>
      )}

      {uploadProgress > 0 && <p>Upload Progress: {Math.round(uploadProgress)}%</p>}
    
    <style>
      {`
      .mode-toggle {
        display: flex;
        justify-content: center;
        gap: 10px;  /* Space between buttons */
        margin-bottom: 20px;
        margin-left: 10px;
      }
      
      .mode-toggle button {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s ease;
        font-weight: bold;
      }
      
      .mode-toggle button:hover {
        background-color: #ddd;
      }
      
      .mode-toggle button.active {
        background-color: #4CAF50;  /* Green color for active state */
        color: white;
        border-color: #4CAF50;
      }
      
      .mode-toggle button:focus {
        outline: none;
      }
      
      .mode-toggle button:active {
        transform: scale(0.98); /* Button shrink effect when clicked */
      }
      
      `}
    </style>
    
    </div>
  );
};

export default UploadContent;

<style>
{`
.mode-toggle {
  display: flex;
  justify-content: center;
  gap: 15px;  /* Space between buttons */
  margin-bottom: 20px;
}

.mode-toggle button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-weight: bold;
}

.mode-toggle button:hover {
  background-color: #ddd;
}

.mode-toggle button.active {
  background-color: #4CAF50;  /* Green color for active state */
  color: white;
  border-color: #4CAF50;
}

.mode-toggle button:focus {
  outline: none;
}

.mode-toggle button:active {
  transform: scale(0.98); /* Button shrink effect when clicked */
}

`}
</style>











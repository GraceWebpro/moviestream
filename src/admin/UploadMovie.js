import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { storage } from '..//firebase/firebaseConfig';
import { auth, db } from '../firebase/firebaseConfig';

const UploadMovie = () => {
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
  const user = auth.currentUser;

  const handleFileChange = (e) => {
    if (e.target.name === 'thumbnail') {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!thumbnailFile) return;

    // Upload thumbnail file
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

  return (
    <div className='upload-container'>
      <h2>Upload Movie Video</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            placeholder="Movie title"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            placeholder="Movie description"
            className="textarea-field"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            placeholder="Movie category"
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <label>
          Tags:
          <textarea
            value={tags}
            placeholder="Movie tags"
            className="textarea-field"
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </label>
        <label>
          Cast:
          <textarea
            value={cast}
            placeholder="Movie casts"
            className="textarea-field"
            onChange={(e) => setCast(e.target.value)}
            required
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            placeholder="Movie status"
            className="input-field"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </label>
        <label>
          Release Year:
          <input
            type="text"
            placeholder="Movie release year"
            className="input-field"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            required
          />
        </label>
        <label>
          Thumbnail Image:
          <input
            type="file"
            className="input-field"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label>
        
        {/* Add the new checkboxes for Featured, TopPick, Trending, and New Release */}
        <div className='checkbox-group'>
        <label>
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={() => setIsFeatured(!isFeatured)}
          />
          Featured
        </label>
        <label>
          <input
            type="checkbox"
            checked={isTopPick}
            onChange={() => setIsTopPick(!isTopPick)}
          />
          Top Pick
        </label>
        <label>
          <input
            type="checkbox"
            checked={isTrending}
            onChange={() => setIsTrending(!isTrending)}
          />
          Trending
        </label>
        <label>
          <input
            type="checkbox"
            checked={isNewRelease}
            onChange={() => setIsNewRelease(!isNewRelease)}
          />
          New Release
        </label>
</div>
        <br />
        {uploadProgress > 0 && <p>Upload Progress: {Math.round(uploadProgress)}%</p>}

        <button type="submit" className="submit-btn">Upload Video</button>
      </form>
    </div>
  );
};

export default UploadMovie;

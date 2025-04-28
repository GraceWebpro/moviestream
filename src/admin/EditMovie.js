import { useState, useEffect } from "react";
import { db, storage } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function EditMovie({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCast, setNewCast] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newReleaseYear, setNewReleaseYear] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTopPick, setIsTopPick] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isNewRelease, setIsNewRelease] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedMovie) {
      const movie = movies.find((p) => p.id === selectedMovie);
      if (movie) {
        setNewTitle(movie.title || "");
        setNewCategory(movie.category || "");
        setNewDescription(movie.description || "");
        setNewCast(movie.cast ? movie.cast.join(", ") : "");
        setNewTags(movie.tags ? movie.tags.join(", ") : "");
        setNewReleaseYear(movie.releaseYear || "");
        setNewStatus(movie.status || "");
        setIsFeatured(movie.isFeatured || false);
        setIsTopPick(movie.isTopPick || false);
        setIsTrending(movie.isTrending || false);
        setIsNewRelease(movie.isNewRelease || false);
      }
    }
  }, [selectedMovie, movies]);

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    if (!selectedMovie) return alert("Please select a movie to edit.");

    setLoading(true);

    try {
      const movieRef = doc(db, "movies", selectedMovie);

      let updatedData = {
        title: newTitle,
        description: newDescription,
        category: newCategory,
        cast: newCast.split(",").map((name) => name.trim()),
        tags: newTags.split(",").map((tag) => tag.trim()),
        releaseYear: newReleaseYear,
        status: newStatus,
        isFeatured,
        isTopPick,
        isTrending,
        isNewRelease,
      };

      if (thumbnailFile) {
        const thumbnailRef = ref(storage, `thumbnails/${thumbnailFile.name}`);
        const uploadTask = uploadBytesResumable(thumbnailRef, thumbnailFile);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              const thumbnailURL = await getDownloadURL(thumbnailRef);
              updatedData.thumbnailUrl = thumbnailURL;
              resolve();
            }
          );
        });
      }

      await updateDoc(movieRef, updatedData);

      alert("Movie updated successfully!");
      setSelectedMovie("");
      resetForm();
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Failed to update movie.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewTitle("");
    setNewCategory("");
    setNewDescription("");
    setNewCast("");
    setNewTags("");
    setNewReleaseYear("");
    setNewStatus("");
    setIsFeatured(false);
    setIsTopPick(false);
    setIsTrending(false);
    setIsNewRelease(false);
    setThumbnailFile(null);
  };

  return (
    <div className="upload-container">
      <h2>Edit Movie</h2>

      <select onChange={(e) => setSelectedMovie(e.target.value)} value={selectedMovie}>
        <option value="">Select a movie</option>
        {movies.map((movie) => (
          <option key={movie.id} value={movie.id}>
            {movie.title}
          </option>
        ))}
      </select>

      <div className="input-group">
        <input
          type="text"
          placeholder="New Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          disabled={loading}
          className="input-field"
        />
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          disabled={loading}
          className="input-field"
        />
      </div>

      <div className="input-group">
        <textarea
          placeholder="New Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          disabled={loading}
          className="textarea-field"
        />
      </div>

      <div className="input-group">
        <textarea
          placeholder="New Cast (comma separated)"
          value={newCast}
          onChange={(e) => setNewCast(e.target.value)}
          disabled={loading}
          className="textarea-field"
        />
      </div>

      <div className="input-group">
        <textarea
          placeholder="New Tags (comma separated)"
          value={newTags}
          onChange={(e) => setNewTags(e.target.value)}
          disabled={loading}
          className="textarea-field"
        />
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="New Release Year"
          value={newReleaseYear}
          onChange={(e) => setNewReleaseYear(e.target.value)}
          disabled={loading}
          className="input-field"
        />
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="New Status"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          disabled={loading}
          className="input-field"
        />
      </div>

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={() => setIsFeatured(!isFeatured)}
            disabled={loading}
          /> Featured
        </label>
        <label>
          <input
            type="checkbox"
            checked={isTopPick}
            onChange={() => setIsTopPick(!isTopPick)}
            disabled={loading}
          /> Top Pick
        </label>
        <label>
          <input
            type="checkbox"
            checked={isTrending}
            onChange={() => setIsTrending(!isTrending)}
            disabled={loading}
          /> Trending
        </label>
        <label>
          <input
            type="checkbox"
            checked={isNewRelease}
            onChange={() => setIsNewRelease(!isNewRelease)}
            disabled={loading}
          /> New Release
        </label>
      </div>

      <div className="input-group">
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          disabled={loading}
          className="input-field"
        />
      </div>

      {loading && <div className="progress-bar"><div className="progress"></div></div>}

      <button 
        className="submit-btn"
        onClick={handleUpdate} 
        disabled={loading || !newTitle || !newCategory || !newDescription || !selectedMovie}
      >
        {loading ? "Updating..." : "Update Movie"}
      </button>

      <style>
        {`
          .progress-bar {
            width: 100%;
            height: 5px;
            background: #ddd;
            margin-top: 10px;
            margin-bottom: 15px;
            border-radius: 5px;
            overflow: hidden;
          }
          .progress {
            width: 100%;
            height: 100%;
            background: #4CAF50;
            animation: progressAnimation 1.5s infinite linear;
          }
          @keyframes progressAnimation {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
}

export default EditMovie;

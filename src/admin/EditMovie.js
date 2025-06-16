import { useState, useEffect } from "react";
import { db, storage } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function EditContent({ movies, music }) {
  const [selectedContent, setSelectedContent] = useState(""); // Content ID for movie or music
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTags, setNewTags] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMovie, setIsMovie] = useState(true); // Toggle between movie and music edit
  const [newSlug, setNewSlug] = useState("");
  const [newHeroPosterUrl, setNewHeroPosterUrl] = useState("");
  const [newTrailerUrl, setNewTrailerUrl] = useState("");

  
  useEffect(() => {
    if (selectedContent) {
      const content = isMovie
        ? movies.find((p) => p.id === selectedContent)
        : music.find((p) => p.id === selectedContent);

      if (content) {
        setNewTitle(content.title || "");
        setNewCategory(content.category || "");
        setNewDescription(content.description || "");
        setNewTags(content.tags ? content.tags.join(", ") : "");
        setNewHeroPosterUrl(content.heroPosterUrl || "");
        setNewTrailerUrl(content.trailerUrl || "");
        setNewSlug(content.slug || "");
        setNewTags(content.tags ? content.tags.join(", ") : "");
      }
    }
  }, [selectedContent, movies, music, isMovie]);

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    if (!selectedContent) return alert("Please select content to edit.");
  
    setLoading(true);
  
    try {
      const contentRef = doc(
        db,
        isMovie ? "movies" : "music",
        selectedContent
      );
  
      const slug = newSlug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
  
      let updatedData = {
        title: newTitle,
        description: newDescription,
        category: newCategory,
        tags: newTags.split(",").map((tag) => tag.trim()),
        slug,
        heroPosterUrl: newHeroPosterUrl,
      };
  
      // ✅ Optional thumbnail upload
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
  
      // ✅ Add YouTube trailer URL if provided
      if (newTrailerUrl) {
        updatedData.trailerUrl = newTrailerUrl.trim();
      }
  
      await updateDoc(contentRef, updatedData);
  
      alert(`${isMovie ? "Movie" : "Music"} updated successfully!`);
      setSelectedContent("");
      resetForm();
    } catch (error) {
      console.error(`Error updating ${isMovie ? "movie" : "music"}:`, error);
      alert(`Failed to update ${isMovie ? "movie" : "music"}.`);
    } finally {
      setLoading(false);
    }
  };
  
  

  const resetForm = () => {
    setNewTitle("");
    setNewCategory("");
    setNewDescription("");
    setNewTags("");
    setThumbnailFile(null);
    setNewSlug("");
    setNewHeroPosterUrl("")
  };

  return (
    <div className="upload-container">
      <h2>{isMovie ? "Edit Movie" : "Edit Music"}</h2>

      {/* Buttons to switch between Edit Movie and Edit Music */}
      <div className="button-group">
        <button
          onClick={() => setIsMovie(true)}
          className={isMovie ? "active" : ""}
        >
          Edit Movie
        </button>
        <button
          onClick={() => setIsMovie(false)}
          className={!isMovie ? "active" : ""}
        >
          Edit Music
        </button>
      </div>

      {/* Dropdown to select content to edit */}
      <select onChange={(e) => setSelectedContent(e.target.value)} value={selectedContent}>
        <option value="">Select a {isMovie ? "movie" : "music"}</option>
        {(isMovie ? movies || [] : music || []).map((content) => (
          <option key={content.id} value={content.id}>
            {content.title}
          </option>
        ))}

      </select>

      {/* Input fields for content details */}
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
          placeholder="Slug (e.g., black-panther)"
          value={newSlug}
          onChange={(e) => setNewSlug(e.target.value)}
          disabled={loading}
          className="input-field"
        />
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Hero Poster URL"
          value={newHeroPosterUrl}
          onChange={(e) => setNewHeroPosterUrl(e.target.value)}
          disabled={loading}
          className="input-field"
        />
      </div>

      <div className='input-group'>
      <input 
       type="text"
       placeholder="YouTube Trailer URL"
       value={newTrailerUrl}
       onChange={(e) => setNewTrailerUrl(e.target.value)}       
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
          placeholder="New Tags (comma separated)"
          value={newTags}
          onChange={(e) => setNewTags(e.target.value)}
          disabled={loading}
          className="textarea-field"
        />
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
        disabled={loading || !newTitle || !newCategory || !newDescription || !selectedContent}
      >
        {loading ? "Updating..." : `Update ${isMovie ? "Movie" : "Music"}`}
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

          .button-group button.active {
            background-color: #4CAF50;
            color: white;
            margin-right: 10px;
          }
          
        `}
      </style>
    </div>
  );
}

export default EditContent;

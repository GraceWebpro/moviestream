import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

function DeleteContent({ movies, music }) {
  const [isMovie, setIsMovie] = useState(true);  // Toggle between movie and music
  const [selectedContent, setSelectedContent] = useState("");

  const handleDelete = async () => {
    if (!selectedContent) return;
    
    try {
      const collectionName = isMovie ? "movies" : "music";
      await deleteDoc(doc(db, collectionName, selectedContent));
      alert(`${isMovie ? "Movie" : "Music"} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting content:", error);
      alert(`Failed to delete ${isMovie ? "movie" : "music"}.`);
    }
  };

  return (
    <div className="upload-container">
      <h2>{isMovie ? "Delete Movie" : "Delete Music"}</h2>
      
      <div>
        <button onClick={() => setIsMovie(true)} className={`toggle-btn ${isMovie ? "active" : ""}`}>
          Delete Movie
        </button>
        <button onClick={() => setIsMovie(false)} className={`toggle-btn ${!isMovie ? "active" : ""}`}>
          Delete Music
        </button>
      </div>

      <select onChange={(e) => setSelectedContent(e.target.value)} value={selectedContent}>
        <option value="">Select {isMovie ? "Movie" : "Music"}</option>
        {(isMovie ? movies : music).map((content) => (
          <option key={content.id} value={content.id}>
            {content.title}
          </option>
        ))}
      </select>

      <button onClick={handleDelete} className="delete-btn">Delete</button>

      <style>
        {`
          .toggle-btn {
            margin-right: 10px;
            padding: 8px 12px;
            cursor: pointer;
          }
          .toggle-btn.active {
            background-color: #4CAF50;
            color: white;
          }
          .delete-btn {
            margin-top: 20px;
            background-color: red;
            color: white;
            padding: 10px 15px;
            cursor: pointer;
            border: none;
            border-radius: 5px;
          }
        `}
      </style>
    </div>
  );
}

export default DeleteContent;

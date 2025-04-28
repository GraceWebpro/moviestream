import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

function DeleteMovie({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState("");

  const handleDelete = async () => {
    if (!selectedMovie) return;
    await deleteDoc(doc(db, "projects", selectedMovie));
    alert("Movie deleted successfully!");
  };

  return (
    <div className="upload-container">
      <h2>Delete Movie</h2>
      <select onChange={(e) => setSelectedMovie(e.target.value)} value={selectedMovie}>
        <option value="">Select Movie</option>
        {movies.map((movie) => (
          <option key={movie.id} value={movie.id}>{movie.title}</option>
        ))}
      </select>
      <button onClick={handleDelete} className="delete-btn">Delete</button>
    </div>
  );
}

export default DeleteMovie;

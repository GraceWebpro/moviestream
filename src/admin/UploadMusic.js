import { useState } from "react";
import { db, storage } from "../firebase/firebaseConfig"; // Your Firebase config
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const MusicUpload = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !artist || !coverFile || !audioFile) {
      alert("All fields are required.");
      return;
    }

    setUploading(true);

    try {
      // Upload cover image
      const coverRef = ref(storage, `covers/${coverFile.name}`);
      await uploadBytes(coverRef, coverFile);
      const coverUrl = await getDownloadURL(coverRef);

      // Upload audio
      const audioRef = ref(storage, `audios/${audioFile.name}`);
      await uploadBytes(audioRef, audioFile);
      const audioUrl = await getDownloadURL(audioRef);

      // Save metadata to Firestore
      await addDoc(collection(db, "songs"), {
        title,
        artist,
        coverUrl,
        audioUrl,
        createdAt: serverTimestamp(),
        downloads: 0 // For trending logic
      });

      alert("Upload successful!");
      setTitle("");
      setArtist("");
      setCoverFile(null);
      setAudioFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed.");
    }

    setUploading(false);
  };

  return (
    <section className="upload-section">
      <div className="container">
        <h2>Upload New Music</h2>
        <form onSubmit={handleUpload} className="upload-form">
          <input
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Artist Name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
          <label>Cover Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files[0])}
            required
          />
          <label>Audio File (mp3):</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
            required
          />
          <button type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Song"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default MusicUpload;

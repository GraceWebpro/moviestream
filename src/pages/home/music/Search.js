import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig'; // Your Firebase config file
import '../../../styles/Music.css'
import { Link } from 'react-router-dom';

const SearchMusic = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
  
    setLoading(true);
    setResults([]);
  
    try {
      const musicRef = collection(db, 'music');
      const querySnapshot = await getDocs(musicRef);
  
      // Get all music and filter client-side (case-insensitive)
      const allMusic = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filtered = allMusic.filter(music =>
        music.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      setResults(filtered);
    } catch (error) {
      console.error('Search error:', error);
    }
  
    setLoading(false);
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a song..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px', backgroung: 'var(--accent-color)' }} className='primary-btn'>Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {results.length > 0 ? (
        <ul>
          {results.map((music) => (
            <li key={music.id}>
              <Link to={`/music/${music.id}`}>
              <strong>{music.title}</strong> by {music.artist} — <a href={music.downloadUrl} target="_blank" rel="noreferrer">Download</a>
            </Link>
            </li>
          ))}
        </ul>
      ) : (
        !loading && searchTerm && <p>No music found.</p>
      )}
    </div>
  );
};

export default SearchMusic;

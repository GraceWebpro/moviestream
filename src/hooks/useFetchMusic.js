import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const useFetchMusic = () => {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusics = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "music"));
        const musicList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMusics(musicList);
      } catch (error) {
        console.error('Error fetching musics:', error);
      }
      setLoading(false);
    };

    fetchMusics();
  }, []);

  return { musics, loading };
};

export default useFetchMusic;

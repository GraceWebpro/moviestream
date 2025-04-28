import { getDocs, query, where, limit } from 'firebase/firestore';
import { collection } from "@firebase/firestore";
import { db } from "../../firebase/firebaseConfig";


export const fetchSimilarMovies = async (tags, id) => {

  const COMMENTS_LIMIT = 6;
  const movieCollectionRef = collection(db, 'movies')
  const q = query(movieCollectionRef, where('tags', 'array-contains-any', tags), limit(COMMENTS_LIMIT));

  const querySnapshot = await getDocs(q);
  const similarMovies = [];
  querySnapshot.forEach((doc) => {
      if (doc.id !== id) {
        similarMovies.push({ id: doc.id, ...doc.data() });

      }
  });
  return similarMovies;
};
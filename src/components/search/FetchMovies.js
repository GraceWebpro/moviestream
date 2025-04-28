import { getDocs } from 'firebase/firestore';
import { collection } from "@firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const movieCollectionRef = collection(db, 'movies')
export const fetchMovies = async (searchTerm) => {
  //const q = query(movieCollectionRef);
  const movieCollectionRef = collection(db, 'movies')

  const querySnapshot = await getDocs(movieCollectionRef);
  const movies = [];
  querySnapshot.forEach((doc) => {
    movies.push({ id: doc.id, ...doc.data() });
  });
  return movies;
};

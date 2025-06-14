import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where
} from 'firebase/firestore';
import '../../styles/Main.css';

const categories = ['All', 'Movies', 'Music', 'News', 'Tech'];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const observer = useRef();

  const pageSize = 5;

  const fetchPosts = useCallback(
    async (initial = false) => {
      try {
        if (initial) {
          setLoading(true);
          setLastVisible(null);
        }

        let q = query(
          collection(db, 'blogs'),
          orderBy('createdAt', 'desc'),
          limit(pageSize)
        );

        if (category !== 'All') {
          q = query(
            collection(db, 'blogs'),
            where('category', '==', category),
            orderBy('createdAt', 'desc'),
            limit(pageSize)
          );
        }

        if (lastVisible && !initial) {
          q = query(q, startAfter(lastVisible));
        }

        const snapshot = await getDocs(q);
        const newPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(prev =>
          initial ? newPosts : [...prev, ...newPosts]
        );

        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        setLastVisible(lastDoc);
        setHasMore(snapshot.docs.length === pageSize);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    },
    [category, lastVisible]
  );

  // Fetch blogs on mount and when category changes
  useEffect(() => {
    fetchPosts(true);
  }, [category]);

  // Infinite scroll trigger
  const lastPostRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchPosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchPosts]
  );

  return (
    <div className="blog-container">
      <h2 className="blog-title">PlayBox Blog</h2>

      {/* Filter Category */}
      <div className="filter-buttons">
        {categories.map(cat => (
          <button
            key={cat}
            className={category === cat ? 'active' : ''}
            onClick={() => {
              setCategory(cat);
              setPosts([]);
              setLastVisible(null);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Posts */}
      <div className="blog-grid">
        {posts.map((post, idx) => {
          const isLast = posts.length === idx + 1;
          return (
            <div
              key={post.id}
              className="blog-card"
              ref={isLast ? lastPostRef : null}
            >
              <h3>{post.title}</h3>
              <p className="date">
                {post.createdAt?.toDate().toLocaleDateString()}
              </p>
              <p>{post.excerpt || post.content?.slice(0, 100) + '...'}</p>
              <Link to={`/blog/${post.slug}`} className="read-more">
                Read More
              </Link>
            </div>
          );
        })}
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {!hasMore && !loading && <p style={{ textAlign: 'center' }}>No more posts</p>}
    </div>
  );
};

export default Blog;

import React, { useState, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import { db, storage } from '../firebase/firebaseConfig';
import {
  addDoc,
  collection,
  Timestamp,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import slugify from 'slugify';
import 'react-quill/dist/quill.snow.css';

const UploadBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Movies');
  const [uploading, setUploading] = useState(false);
  const quillRef = useRef();

  const [showPreview, setShowPreview] = useState(false); // 🆕


  const categories = ['Movies', 'Music', 'News', 'Tech', 'Tutorials'];

  const generateUniqueSlug = async (baseTitle) => {
    const baseSlug = slugify(baseTitle, { lower: true, strict: true });
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (true) {
      const q = query(collection(db, 'blogs'), where('slug', '==', uniqueSlug));
      const existing = await getDocs(q);
      if (existing.empty) break;
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    return uniqueSlug;
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const storageRef = ref(storage, `blogImages/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          null,
          (err) => console.error(err),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', downloadURL);
          }
        );
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) return alert('All fields are required');
    setUploading(true);

    try {
      const slug = await generateUniqueSlug(title);

      await addDoc(collection(db, 'blogs'), {
        title,
        slug,
        category,
        content,
        createdAt: Timestamp.now(),
      });

      alert('Blog posted successfully!');
      setTitle('');
      setContent('');
      setCategory('Movies');
    } catch (err) {
      console.error(err);
      alert('Error posting blog');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h2>Upload New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
        >
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          modules={modules}
          placeholder="Write your blog content here..."
          style={{ height: '300px', marginBottom: '1rem' }}
        />

        <button
        type="button"
        onClick={() => setShowPreview(true)} // 🆕
        style={{
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px 20px',
            marginLeft: '1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
        }}
        >
        Preview Blog
        </button>

        <button
          type="submit"
          disabled={uploading}
          style={{
            backgroundColor: '#1db954',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          {uploading ? 'Uploading...' : 'Post Blog'}
        </button>
      </form>

      {showPreview && (
        <div className="modal-overlay">
            <div className="modal-content">
            <button className="modal-close" onClick={() => setShowPreview(false)}>✕</button>
            <h2>{title || '[Blog Title]'}</h2>
            <p style={{ fontStyle: 'italic', color: '#666' }}>
                Category: {category || '[Category]'}
            </p>
            <div
                dangerouslySetInnerHTML={{ __html: content || '<p>Your blog content will show here...</p>' }}
                style={{ marginTop: '1rem' }}
            />
            </div>
        </div>
        )}
    </div>
  );
};

export default UploadBlog;

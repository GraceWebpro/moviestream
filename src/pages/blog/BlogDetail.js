import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../styles/Main.css';

const posts = [
  {
    id: 1,
    title: "Top 10 Free Movie Download Sites (2025)",
    content: `
      Looking for the best places to download movies? We've compiled a list of the top free and reliable sites that offer HD downloads with no sign-ups.
      
      1. PlayBox
      2. FZMovies
      3. TFPDL
      4. Netnaija
      5. ToxicWap
      6. O2tvseries
      7. NollyLand
      8. YouTube (with downloader)
      9. Telegram Channels
      10. Archive.org

      Always use a VPN and avoid clicking suspicious ads. Happy downloading!
    `,
    date: "June 10, 2025"
  },
  {
    id: 2,
    title: "How to Download Music Legally for Free",
    content: `
      Music doesn't have to cost a fortune. Here are legal platforms where you can get music:

      - SoundCloud
      - Jamendo
      - Free Music Archive
      - YouTube Audio Library
      - Bandcamp (some tracks)

      Make sure you’re downloading tracks licensed for reuse or personal use only.
    `,
    date: "June 8, 2025"
  },
  {
    id: 3,
    title: "Best VPNs to Use When Downloading Media",
    content: `
      Using a VPN is crucial when downloading files. Here are the best ones:

      - NordVPN
      - ExpressVPN
      - ProtonVPN
      - Surfshark
      - CyberGhost

      Don’t compromise your privacy — especially when browsing shady websites.
    `,
    date: "June 5, 2025"
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return <div className="blog-container"><p style={{ color: 'red' }}>Post not found.</p></div>;
  }

  return (
    <div className="blog-container">
      <h2 className="blog-title">{post.title}</h2>
      <p className="date">{post.date}</p>
      <pre className="blog-content">{post.content}</pre>

      <Link to="/blog" className="read-more">← Back to Blog</Link>
    </div>
  );
};

export default BlogPost;

import { Link } from 'react-router-dom'; 
import '../styles/Main.css';


const Footer = () => {
  return (
    <footer class="site-footer">
  <div class="footer-container">
    <div class="footer-brand">
      <h2>PlayBox</h2>
      <p>© 2025 GraceTech</p>
      <p>Your one-stop hub for movies and music.</p>
    </div>

    <div class="footer-links">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/services">Services</a>
      <a href="/contact">Contact</a>
    </div>

    <div class="footer-social">
      <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
      <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
      <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
    </div>
  </div>
  <div
  style={{
    display: 'flex',
    gap: '20px',
    color: '#fff',
    justifyContent: 'center', // centers horizontally
    alignItems: 'center',     // centers vertically (if parent has height)
    textAlign: 'center',      // optional, for text alignment
  }}
>  
  <Link to="/terms" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.8rem' }}>Terms & Conditions</Link>
  <Link to="/privacy" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.8rem' }}>Privacy Policy</Link>
  <Link to="/disclaimer" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.8rem' }}>Disclaimer</Link>
</div>


  <div class="footer-bottom">
    <p>&copy; 2025 PlayBox. All rights reserved.</p>
  </div>
</footer>

  );
};

export default Footer;

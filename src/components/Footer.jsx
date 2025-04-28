import '../styles/Main.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p>© 2025 Movie Stream</p>
          <p>All rights reserved.</p>
        </div>
        
        <div className="footer-center">
          <a href="/">Home</a>
          <a href="/movies">Movies</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy</a>
        </div>
        
        <div className="footer-right">
          <p>Follow us:</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

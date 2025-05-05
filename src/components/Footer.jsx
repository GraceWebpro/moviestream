import '../styles/Main.css';

const Footer = () => {
  return (
    <footer class="site-footer">
  <div class="footer-container">
    <div class="footer-brand">
      <h2>PlayBox</h2>
      <p>© 2025 GraceTech</p>
      <p>Your Box of Nonstop Entertainment.</p>
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

  <div class="footer-bottom">
    <p>&copy; 2025 PlayBox. All rights reserved.</p>
  </div>
</footer>

  );
};

export default Footer;

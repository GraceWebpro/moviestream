import { Helmet } from 'react-helmet';
import '../../styles/About.css'; // optional: if you want to style separately

const About = () => {
  return (
    <div className="about-container">
      {/* 🔗 SEO Metadata */}
      <Helmet>
        <title>About | PlayBox – Discover & Download Movies</title>
        <meta
          name="description"
          content="Learn more about PlayBox – your go-to platform for discovering, streaming, and downloading high-quality movies across genres. Enjoy a smooth and safe movie experience."
        />
        <meta
          name="keywords"
          content="about PlayBox, movie downloads, PlayBox movies, PlayBox info, safe movie streaming"
        />
      </Helmet>

      <h1>About Us</h1>
      <p className="about-intro" style={{ textAlign: 'left' }}>
        Welcome to <strong>PlayBox</strong> – your ultimate destination for discovering and downloading movies effortlessly!
      </p>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our goal is to make it easy for movie lovers to find and enjoy their favorite films. 
          We offer a growing collection of movies across different genres, curated carefully for every taste.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Offer</h2>
        <ul>
          <li>High-quality movie downloads</li>
          <li>Trending and featured movies</li>
          <li>Easy-to-use movie search and categories</li>
          <li>Secure and fast downloads</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <p>
          We are committed to providing the best user experience with a smooth and beautiful website interface, 
          safe downloads, and a frequently updated movie collection.
        </p>
      </section>

      <p className="about-thankyou">
        Thank you for choosing <strong>PlayBox</strong> – your movie journey starts here!
      </p>
    </div>
  );
};

export default About;

import React from 'react';
import { Helmet } from 'react-helmet';

const Disclaimer = () => {
  return (
    <div style={styles.container}>
      <Helmet>
        <title>Disclaimer | PlayBox</title>
        <meta
          name="description"
          content="Disclaimer for PlayBox - understand how content is provided and our responsibility regarding external links and media."
        />
      </Helmet>

      <div style={styles.content}>
        <h1 style={styles.heading}>Disclaimer</h1>
        <p style={styles.paragraph}>
          The information and content provided on <strong>PlayBox</strong> is for general informational and entertainment purposes only. While we strive to provide accurate and up-to-date content, we make no guarantees of any kind about the completeness, accuracy, reliability, suitability, or availability of the content, media, or services contained on this site.
        </p>

        <h2 style={styles.subheading}>External Links</h2>
        <p style={styles.paragraph}>
          PlayBox may contain links to external websites that are not provided or maintained by us. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
        </p>

        <h2 style={styles.subheading}>Media Ownership</h2>
        <p style={styles.paragraph}>
          We do not host any files on our server. All media content (videos, music, etc.) available for streaming or download on PlayBox is either embedded from third-party sources or provided by users. If you believe your copyrighted material is being used inappropriately, please contact us for removal.
        </p>

        <h2 style={styles.subheading}>Consent</h2>
        <p style={styles.paragraph}>
          By using our website, you hereby consent to our disclaimer and agree to its terms.
        </p>

        <section>
          <h3>Data Sources & Attribution</h3>
          <p>
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/stacked-blue-green-e3a5c375b8a2c1258bb6f6a0bfcdf408d86dd164870d0d42b982802c5b9d74db.svg"
              alt="TMDB Logo"
              width="100"
            />
          </a>
        </section>


        <h2 style={styles.subheading}>Updates</h2>
        <p style={styles.paragraph}>
          We may update this disclaimer from time to time. Any changes will be posted on this page.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#111',
    color: '#fff',
    fontFamily: 'sans-serif',
    lineHeight: '1.6',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  subheading: {
    fontSize: '1.4rem',
    marginTop: '25px',
  },
  paragraph: {
    fontSize: '1rem',
    marginBottom: '15px',
    textAlign: 'justify',
  },
};

export default Disclaimer;

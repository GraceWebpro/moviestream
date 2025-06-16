import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <Helmet>
        <title>404 - Page Not Found | PlayBox</title>
        <meta name="description" content="Oops! The page you're looking for doesn't exist on PlayBox." />
      </Helmet>

      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you’re looking for doesn’t exist.</p>

      <Link to="/" style={styles.button}>
        Go Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  title: {
    fontSize: '6rem',
    marginBottom: '1rem',
    color: '#e50914',
  },
  message: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
  },
  button: {
    backgroundColor: '#e50914',
    color: '#fff',
    padding: '12px 24px',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: 'background 0.3s',
  },
};

export default NotFound;

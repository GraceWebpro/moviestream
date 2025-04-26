import { useState } from 'react';
import axios from 'axios';
import '../styles/Main.css';

function Subscribe() {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const API_KEY = process.env.REACT_APP_BREVO_API_KEY;
  const LIST_ID = process.env.REACT_APP_BREVO_LIST_ID;
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      return;
    }

    try {
      const response = await axios.post('https://api.brevo.com/v3/contacts', 
        {
            email: email,
            listIds: [parseInt(LIST_ID)],  // listId must be a number
            attributes: {
            FIRSTNAME: '',
            LASTNAME: ''
            }
        },
        {
            headers: {
            'accept': 'application/json',
            'api-key': API_KEY,
            'content-type': 'application/json'
            }
        }
      );

      console.log(response.data);
      setSuccessMessage(true);      
      setEmail('');
      setError(false);

      // Hide success message after 5 seconds (optional)
      setTimeout(() => {
        setSuccessMessage(false);
      }, 5000);

    } catch (error) {
      console.error('Subscription failed:', error);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div className="subscribe-section">
      <h2>Subscribe to get the latest updates</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {successMessage && (
        <p className="success-message">Thank you for subscribing!</p>
      )}
      {error && <div style={{ color: 'red', marginTop: '20px' }}>Subscription failed. Try again.</div>}

    </div>
  );
}

export default Subscribe;

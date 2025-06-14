// PrivacyPolicy.js
import React from 'react';
import { Helmet } from 'react-helmet';


const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
              <Helmet>
        <title>Privacy Policy | PlayBox</title>
        <meta
          name="description"
          content="Read PlayBox's privacy policy to understand how we handle your data and ensure your privacy."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <h1>Privacy Policy</h1>

      <p>Your privacy is important to us. This Privacy Policy explains how PlayBox collects, uses, and protects your information.</p>

      <section className="privacy-section">
        <h2>1. Information We Collect</h2>
        <p>
          We may collect basic information such as your email address if you contact us.
          We do not collect personal data like name, address, or payment details.
        </p>
      </section>

      <section className="privacy-section">
        <h2>2. How We Use Your Information</h2>
        <p>
          Any information you provide is used to respond to your inquiries or improve your experience with PlayBox.
          We do not sell or share your personal data with third parties.
        </p>
      </section>

      <section className="privacy-section">
        <h2>3. Cookies</h2>
        <p>
          We may use cookies to enhance your browsing experience. These cookies help us understand usage patterns and improve our site.
          You can disable cookies through your browser settings.
        </p>
      </section>

      <section className="privacy-section">
        <h2>4. Data Security</h2>
        <p>
          We use reasonable security measures to protect your data. However, no online platform is 100% secure.
        </p>
      </section>

      <section className="privacy-section">
        <h2>5. Third-Party Services</h2>
        <p>
          Our site may link to third-party websites (e.g., external download links). We are not responsible for the privacy practices of those sites.
        </p>
      </section>

      <section className="privacy-section">
        <h2>6. Children's Privacy</h2>
        <p>
          PlayBox is not intended for users under the age of 13. We do not knowingly collect data from children.
        </p>
      </section>

      <section className="privacy-section">
        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy occasionally. We encourage you to review it periodically.
        </p>
      </section>

      <section className="privacy-section">
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this policy, please email us at 
          <a href="mailto:playbox@gmail.com"> playbox@gmail.com</a>.
        </p>
      </section>

      <style>
        {`
          .privacy-container {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background-color: #111;
            color: #fff;
            border-radius: 10px;
            line-height: 1.6;
          }

          .privacy-container h1 {
            text-align: center;
            margin-bottom: 30px;
          }

          .privacy-section {
            margin-bottom: 30px;
          }

          .privacy-section h2 {
            font-size: 1.5rem;
            margin-bottom: 10px;
            color: #1db954;
          }

          a {
            color: #1db954;
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  );
};

export default PrivacyPolicy;

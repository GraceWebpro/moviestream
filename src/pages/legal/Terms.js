// TermsAndConditions.js
import React from 'react';
import { Helmet } from 'react-helmet';


const TermsAndConditions = () => {
  return (
    <div className="terms-container">
         <Helmet>
        <title>Terms & Conditions | PlayBox</title>
        <meta 
          name="description" 
          content="Review the terms and conditions for using PlayBox. Understand your rights and responsibilities when using our platform." 
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <h1>Terms & Conditions</h1>

      <p>Welcome to PlayBox. By using our website, you agree to the following terms and conditions. Please read them carefully.</p>

      <section className="terms-section">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using PlayBox, you acknowledge that you have read, understood, and agree to be bound by these terms.</p>
      </section>

      <section className="terms-section">
        <h2>2. Use of Content</h2>
        <p>
          All content available on PlayBox, including movies and music, is for personal use only.
          You agree not to reproduce, distribute, or exploit any content for commercial purposes.
        </p>
      </section>

      <section className="terms-section">
        <h2>3. Copyright</h2>
        <p>
          We respect copyright laws. If you believe your copyrighted material has been used improperly,
          please contact us immediately at <a href="mailto:playbox@gmail.com">playbox@gmail.com</a>.
        </p>
      </section>

      <section className="terms-section">
        <h2>4. User Responsibility</h2>
        <p>
          You agree to use this website legally and responsibly. Any misuse of content or attempt to harm the site may result in termination of access.
        </p>
      </section>

      <section className="terms-section">
        <h2>5. Changes to Terms</h2>
        <p>
          We may update these Terms & Conditions at any time. Continued use of the site implies acceptance of the updated terms.
        </p>
      </section>

      <section className="terms-section">
        <h2>6. Contact Us</h2>
        <p>If you have any questions about these Terms, please email us at <a href="mailto:playbox@gmail.com">playbox@gmail.com</a>.</p>
      </section>

      <style>
        {`
          .terms-container {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background-color: #111;
            color: #fff;
            border-radius: 10px;
            line-height: 1.6;
          }

          .terms-container h1 {
            text-align: center;
            margin-bottom: 30px;
          }

          .terms-section {
            margin-bottom: 30px;
          }

          .terms-section h2 {
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

export default TermsAndConditions;

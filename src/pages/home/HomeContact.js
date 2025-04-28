import React from 'react'

const HomeContact = () => {
  return (
    <section className="contact-section" id="contact">
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>If you have any questions, suggestions, or issues, feel free to reach out!</p>
      <a 
        href="mailto:gracetechagency@example.com?subject=I%20have%20a%20question%20about%20your%20movies&body=Hello,%20I%20would%20like%20to%20ask%20about..." 
        className="contact-button"
        >
        Send us an Email
      </a>

    </div>
  </section>
  )
}

export default HomeContact

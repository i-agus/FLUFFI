import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-card">
        {/* Contact Info */}
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          <div className="contact-methods">
            <div className="contact-item instagram">
              <img src="/images/contactpage_photos/instagram.png" alt="Instagram" />
              <span>@fluffi_pets</span>
            </div>
            <div className="contact-item email">
              <img src="/images/contactpage_photos/gmail.png" alt="Gmail" />
              <span>contact@furever.com</span>
            </div>
            <div className="contact-item linkedin">
              <img src="/images/contactpage_photos/linkedin.png" alt="LinkedIn" />
              <span>Furever Pet Adoption</span>
            </div>
            <div className="contact-item phone">
              <img src="/images/contactpage_photos/phone.png" alt="Phone" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

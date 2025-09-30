import React from 'react';
import NavbarRes from './NavbarRes';
import Footer from './Footer';

function Contactpage() {
  return (
    <>
      <NavbarRes />
      <div className="page-wrapper"> {/* full page dark background */}
        <div className="container my-5 py-5 bg-dark-grey text-light rounded-5 shadow-lg contact-container">
          <div className="text-center mb-5 px-md-5">
            <h1 className="display-4 fw-bold text-warning contact-title">
              Contact Us
            </h1>
            <p className="lead text-light opacity-90 contact-subtitle mx-auto">
              We'd love to hear from you! Reach out for reservations, inquiries, or feedback.
            </p>
          </div>

          <div className="row text-center mb-5 g-4 px-md-5">
            {[
              {
                title: 'Email Us',
                content: (
                  <a href="mailto:info@thegoldenspoon.com" className="contact-link">
                    info@thegoldenspoon.com
                  </a>
                ),
                icon: 'fas fa-envelope',
              },
              {
                title: 'Call Us',
                content: (
                  <a href="tel:+97141234567" className="contact-link">
                    +971 4 123 4567
                  </a>
                ),
                icon: 'fas fa-phone',
              },
              {
                title: 'Our Location',
                content: (
                  <p className="mb-0 text-light fs-5 opacity-75">
                    Downtown Dubai, UAE<br />
                    (Near Burj Khalifa)
                  </p>
                ),
                icon: 'fas fa-map-marker-alt',
              },
            ].map(({ title, content, icon }) => (
              <div key={title} className="col-md-4">
                <div className="contact-card p-5 rounded-4 shadow-sm border border-warning-subtle">
                  <i className={`${icon} text-warning fs-1 mb-4`}></i>
                  <h4 className="fw-bold text-warning mb-3">{title}</h4>
                  {content}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-4 px-md-5">
            <h2 className="fs-2 fw-bold text-warning d-inline-block px-5 py-3 bg-dark rounded-pill shadow-sm map-header">
              Find Us Here
            </h2>
          </div>

          <div className="row justify-content-center px-md-5">
            <div className="col-12">
              <div className="rounded-5 overflow-hidden shadow map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.623403212891!2d55.27092921500331!3d25.19719738388914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e61ce7b7!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1678912345678!5m2!1sen!2sae"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Restaurant Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        /* Full page wrapper with dark background */
        .page-wrapper {
          background-color: #121417; /* a bit darker than container bg */
          min-height: 100vh;
          padding-top: 1rem;
          padding-bottom: 1rem;
        }
        .bg-dark-grey {
          background-color: #212529;
          color: #ccc;
        }
        .contact-title {
          letter-spacing: 0.15em;
          color: #b8860b; /* dark goldenrod */
          text-shadow: 0 2px 6px rgb(0 0 0 / 0.3);
        }
        .contact-subtitle {
          font-size: 1.25rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.85;
          line-height: 1.5;
          color: #ddd;
        }
        .contact-card {
          background: #2a2a2a;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
          user-select: none;
          border-color: #f9d976;
          color: #ccc;
        }
        .contact-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px #f9d976aa;
          border-color: #f9d976;
          background: #3a3a3a;
          color: #fff;
        }
        .contact-link {
          color: #b8860b;
          font-weight: 600;
          font-size: 1.15rem;
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .contact-link:hover {
          color: #d4af37;
          text-decoration: underline;
        }
        .map-header {
          letter-spacing: 0.1em;
          background: #212529;
          box-shadow: 0 5px 15px #f9d976bb;
          user-select: none;
          color: #b8860b;
        }
        .map-container iframe {
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px #f9d97666;
        }
        @media (max-width: 767px) {
          .contact-card {
            padding: 3rem 2rem !important;
          }
          .contact-title {
            font-size: 2.5rem;
          }
          .contact-subtitle {
            font-size: 1.1rem;
          }
          .contact-link {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </> 
  );
}

export default Contactpage;
